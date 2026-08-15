import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v4'
import { getServerSession } from 'next-auth'
import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import type { BookingItem } from '@/lib/types'

// ─── Validation schema ──────────────────────────────────────────────────────

const bookingSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.email(),
  services: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  address: z.string().min(5),
  message: z.string().optional(),
  totalPrice: z.string().min(1),
})

// ─── HTML helpers ───────────────────────────────────────────────────────────

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function buildAdminHtml(d: {
  name: string; phone: string; email: string; date: string; time: string;
  address: string; message: string; totalPrice: string; items: BookingItem[]; bookingId: string
}): string {
  const rows = d.items.map((it, i) =>
    `<tr style="${i % 2 === 0 ? 'background:#f9fafb;' : ''}"><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;font-weight:500">${esc(it.serviceName)}</td><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;text-align:center">${it.quantity}</td><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;text-align:right">${it.price}</td><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;color:#059669">${it.subtotal}</td></tr>`
  ).join('')
  const n = d.items.reduce((s, i) => s + i.quantity, 0)
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
body{font-family:'Segoe UI',system-ui,sans-serif;background:#f3f4f6;margin:0;padding:20px;color:#1f2937}
.c{max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)}
.h{background:linear-gradient(135deg,#059669,#047857);color:#fff;padding:24px 32px}.h h1{margin:0;font-size:22px;font-weight:700}.h p{margin:4px 0 0;opacity:.9;font-size:14px}
.b{padding:24px 32px}.st{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#6b7280;margin:24px 0 12px;padding-bottom:8px;border-bottom:2px solid #e5e7eb}.st:first-child{margin-top:0}
table{width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden}
th{background:#f0fdf4;color:#059669;padding:10px 16px;text-align:left;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.3px}
th:nth-child(3),th:nth-child(4){text-align:right}
.tr{background:#f0fdf4}.tr td{padding:14px 16px;font-size:16px;font-weight:700;color:#059669;text-align:right}.tr td:first-child{text-align:left;color:#1f2937}
.dg{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px}.di{font-size:14px}.di .l{color:#6b7280;font-size:12px;margin-bottom:2px}.di .v{font-weight:500}
.f{background:#f9fafb;padding:16px 32px;text-align:center;font-size:12px;color:#9ca3af;border-top:1px solid #e5e7eb}
.id{font-family:monospace;background:#f3f4f6;padding:2px 8px;border-radius:4px;font-size:12px;color:#6b7280}
</style></head><body><div class="c">
<div class="h"><h1>🧹 New Booking Received</h1><p>${esc(d.name)} — ${esc(d.date)} at ${esc(d.time)}</p></div>
<div class="b">
<div class="st">Booking ID: <span class="id">${d.bookingId}</span></div>
<div class="st">Order Details (${n} ${n === 1 ? 'item' : 'items'})</div>
<table><thead><tr><th>Service</th><th style="text-align:center">Qty</th><th style="text-align:right">Price</th><th style="text-align:right">Subtotal</th></tr></thead>
<tbody>${rows}<tr class="tr"><td colspan="3">Grand Total</td><td>${d.totalPrice}</td></tr></tbody></table>
<div class="st">Customer Information</div>
<div class="dg"><div class="di"><div class="l">Name</div><div class="v">${esc(d.name)}</div></div><div class="di"><div class="l">Phone</div><div class="v">${esc(d.phone)}</div></div><div class="di"><div class="l">Email</div><div class="v">${esc(d.email)}</div></div><div class="di"><div class="l">Date & Time</div><div class="v">${esc(d.date)}, ${esc(d.time)}</div></div></div>
<div class="di" style="margin-top:8px"><div class="l">Address</div><div class="v">${esc(d.address)}</div></div>
${d.message ? `<div class="di" style="margin-top:8px"><div class="l">Message</div><div class="v">${esc(d.message)}</div></div>` : ''}
</div><div class="f">Urban Safai — Reliable, Daily Cleaning – Right to Your Door!<br/>Ludhiana, Punjab, India · admin@urbansafai.in · +91 72789 22229</div>
</div></body></html>`
}

function buildCustomerHtml(d: {
  name: string; date: string; time: string; totalPrice: string;
  items: BookingItem[]; bookingId: string
}): string {
  const rows = d.items.map((it) =>
    `<tr><td style="padding:8px 16px;border-bottom:1px solid #e5e7eb">${esc(it.serviceName)}</td><td style="padding:8px 16px;border-bottom:1px solid #e5e7eb;text-align:center">${it.quantity}</td><td style="padding:8px 16px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;color:#059669">${it.subtotal}</td></tr>`
  ).join('')
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
body{font-family:'Segoe UI',system-ui,sans-serif;background:#f3f4f6;margin:0;padding:20px;color:#1f2937}
.c{max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)}
.h{background:linear-gradient(135deg,#059669,#047857);color:#fff;padding:24px 32px;text-align:center}.h h1{margin:0;font-size:22px;font-weight:700}.h p{margin:8px 0 0;opacity:.9;font-size:14px}
.b{padding:24px 32px}
.id{font-family:monospace;background:#f3f4f6;padding:4px 10px;border-radius:6px;font-size:13px;color:#374151;display:inline-block;margin-bottom:16px}
table{width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:20px}
th{background:#f0fdf4;color:#059669;padding:10px 16px;text-align:left;font-size:13px;font-weight:600}td{padding:10px 16px;font-size:14px}
.total{background:#f0fdf4;padding:14px 16px;font-size:18px;font-weight:700;color:#059669;text-align:right;border-top:2px solid #059669}
.f{background:#f9fafb;padding:16px 32px;text-align:center;font-size:12px;color:#9ca3af;border-top:1px solid #e5e7eb}
</style></head><body><div class="c">
<div class="h"><h1>✅ Booking Confirmed!</h1><p>Thank you for choosing Urban Safai</p></div>
<div class="b">
<p>Hi <strong>${esc(d.name)}</strong>,</p>
<p>Your cleaning service has been booked successfully.</p>
<p style="margin-top:16px">Booking ID: <span class="id">${d.bookingId}</span></p>
<table><thead><tr><th>Service</th><th style="text-align:center">Qty</th><th style="text-align:right">Subtotal</th></tr></thead>
<tbody>${rows}</tbody><tfoot><tr><td colspan="2" style="padding:14px 16px;font-weight:600">Total</td><td class="total">${d.totalPrice}</td></tr></tfoot></table>
<p><strong>📅 Date:</strong> ${esc(d.date)}&nbsp;&nbsp;<strong>🕐 Time:</strong> ${esc(d.time)}</p>
<p style="margin-top:16px;color:#6b7280;font-size:14px">Our team will contact you shortly. For queries, call <strong>+91 72789 22229</strong>.</p>
</div>
<div class="f">Urban Safai · Ludhiana, Punjab, India · <a href="tel:+917278922229">+91 72789 22229</a></div>
</div></body></html>`
}

// ─── Email sender (fire-and-forget, never blocks the response) ──────────────

function fireEmails(payload: Parameters<typeof buildAdminHtml>[0] & { email: string }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) { console.log('[Email] Skipped — no RESEND_API_KEY'); return }

  setTimeout(async () => {
    try {
      const { Resend } = await import('resend')
      const r = new Resend(apiKey)
      const from = 'Urban Safai <onboarding@resend.dev>'

      // Admin notification
      await r.emails.send({
        from, to: 'admin@urbansafai.in', bcc: 'info@quickwebworks.com',
        subject: `[Urban Safai] New Booking: ${payload.name} - ${payload.date}`,
        html: buildAdminHtml(payload),
      })
      // Customer confirmation
      await r.emails.send({
        from, to: payload.email,
        subject: `Booking Confirmed — Urban Safai (${payload.bookingId.slice(0, 8)})`,
        html: buildCustomerHtml(payload),
      })
      console.log('[Email] Sent admin + customer emails for', payload.bookingId)
    } catch (e) {
      console.error('[Email Error]', e instanceof Error ? e.message : e)
    }
  }, 0)
}

// ─── Detect missing table ─────────────────────────────────────────────────

function isTableMissing(msg: string): boolean {
  return /relation "[^"]+" does not exist|Table '[^']+' doesn't exist|no such table|does not exist/i.test(msg)
}

// ─── POST: Create booking (public) ───────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = bookingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data: ' + parsed.error.issues.map(i => i.message).join(', ') }, { status: 400 })
    }

    const { name, phone, email, services, date, time, address, message, totalPrice } = parsed.data

    let items: BookingItem[]
    try {
      items = JSON.parse(services) as BookingItem[]
      if (!Array.isArray(items) || items.length === 0) throw new Error()
    } catch {
      return NextResponse.json({ error: 'Invalid services data format' }, { status: 400 })
    }

    // Save to database
    const booking = await db.booking.create({
      data: { name, phone, email, services, date, time, address, message: message || null, totalPrice },
    })

    // Fire emails (never blocks response)
    fireEmails({ name, phone, email, date, time, address, message: message || '', totalPrice, items, bookingId: booking.id })

    return NextResponse.json({ success: true, message: 'Booking submitted successfully', bookingId: booking.id }, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[Booking POST]', msg)

    if (isTableMissing(msg)) {
      return NextResponse.json({ error: 'Database not initialized. Visit /api/setup first.', setupUrl: '/api/setup' }, { status: 503 })
    }
    return NextResponse.json({ error: 'Internal server error', detail: msg }, { status: 500 })
  }
}

// ─── GET: List bookings (auth-protected, optional CSV) ─────────────────────

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const bookings = await db.booking.findMany({ orderBy: { createdAt: 'desc' } })

    if (searchParams.get('format') === 'csv') {
      const header = 'S.No,Name,Phone,Email,Services,Date,Time,Address,Total,Status,Booked At'
      const rows = bookings.map((b, i) => {
        let svc = b.services
        try { svc = (JSON.parse(b.services) as BookingItem[]).map(it => `${it.serviceName} (${it.quantity})`).join('; ') } catch {}
        return [i+1, csv(b.name), csv(b.phone), csv(b.email||''), csv(svc), csv(b.date), csv(b.time), csv(b.address), csv(b.totalPrice), csv(b.status), csv(b.createdAt.toISOString())].join(',')
      })
      return new NextResponse([header, ...rows].join('\n'), { status: 200, headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="bookings-${new Date().toISOString().slice(0,10)}.csv"` } })
    }

    return NextResponse.json({ bookings }, { status: 200 })
  } catch (err) {
    console.error('[Booking GET]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function csv(v: string): string {
  if (v.includes(',') || v.includes('"') || v.includes('\n')) return '"' + v.replace(/"/g, '""') + '"'
  return v
}
