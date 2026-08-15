import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v4'
import { db } from '@/lib/db'
import type { ContactFormData } from '@/lib/types'

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(5),
})

function isTableMissing(msg: string): boolean {
  return /relation "[^"]+" does not exist|Table '[^']+' doesn't exist|no such table|does not exist/i.test(msg)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data: ' + parsed.error.issues.map(i => i.message).join(', ') }, { status: 400 })
    }

    const { name, email, phone, subject, message } = parsed.data

    // Save to database
    await db.contactSubmission.create({ data: { name, email, phone: phone || null, subject, message } })

    // Send email notification (fire-and-forget)
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey) {
      setTimeout(async () => {
        try {
          const { Resend } = await import('resend')
          const resend = new Resend(apiKey)
          await resend.emails.send({
            from: 'Urban Safai <onboarding@resend.dev>',
            to: 'admin@urbansafai.in',
            bcc: 'info@quickwebworks.com',
            subject: `[Contact] ${subject} — from ${name}`,
            html: `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
body{font-family:'Segoe UI',system-ui,sans-serif;background:#f3f4f6;margin:0;padding:20px;color:#1f2937}
.c{max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)}
.h{background:linear-gradient(135deg,#059669,#047857);color:#fff;padding:24px 32px}.h h1{margin:0;font-size:20px;font-weight:700}
.b{padding:24px 32px;font-size:14px;line-height:1.7}
.label{color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px;margin-bottom:2px}
.value{font-weight:500;margin-bottom:16px}
.f{background:#f9fafb;padding:16px 32px;text-align:center;font-size:12px;color:#9ca3af;border-top:1px solid #e5e7eb}
</style></head><body><div class="c">
<div class="h"><h1>📬 New Contact Message</h1></div>
<div class="b">
<div class="label">Name</div><div class="value">${name.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
<div class="label">Email</div><div class="value">${email.replace(/</g,'&lt;')}</div>
${phone ? `<div class="label">Phone</div><div class="value">${phone.replace(/</g,'&lt;')}</div>` : ''}
<div class="label">Subject</div><div class="value">${subject.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
<div class="label">Message</div><div class="value" style="white-space:pre-wrap">${message.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
</div>
<div class="f">Urban Safai · admin@urbansafai.in · +91 72789 22229</div>
</div></body></html>`,
          })
          console.log('[Contact Email] Sent for', subject)
        } catch (e) {
          console.error('[Contact Email Error]', e instanceof Error ? e.message : e)
        }
      }, 0)
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[Contact POST]', msg)

    if (isTableMissing(msg)) {
      return NextResponse.json({ error: 'Database not initialized. Visit /api/setup first.' }, { status: 503 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
