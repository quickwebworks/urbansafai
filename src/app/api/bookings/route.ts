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

// ─── HTML entity escape helper ──────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// ─── Email HTML builder ─────────────────────────────────────────────────────

function buildEmailHtml(data: {
  name: string
  phone: string
  email: string
  date: string
  time: string
  address: string
  message: string
  totalPrice: string
  items: BookingItem[]
}): string {
  const rows = data.items
    .map(
      (item, i) => `
      <tr style="${i % 2 === 0 ? 'background:#f9fafb;' : ''}">
        <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;font-weight:500;">${escapeHtml(item.serviceName)}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;text-align:right;">${item.price}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;color:#059669;">${item.subtotal}</td>
      </tr>`
    )
    .join('')

  const totalItems = data.items.reduce((s, i) => s + i.quantity, 0)

  // Sanitize user-provided fields
  const safeName = escapeHtml(data.name)
  const safePhone = escapeHtml(data.phone)
  const safeEmail = escapeHtml(data.email)
  const safeDate = escapeHtml(data.date)
  const safeTime = escapeHtml(data.time)
  const safeAddress = escapeHtml(data.address)
  const safeMessage = data.message ? escapeHtml(data.message) : ''

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background:#f3f4f6; margin:0; padding:20px; color:#1f2937; }
    .container { max-width:600px; margin:0 auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.1); }
    .header { background:linear-gradient(135deg,#059669,#047857); color:#fff; padding:24px 32px; }
    .header h1 { margin:0; font-size:22px; font-weight:700; }
    .header p { margin:4px 0 0; opacity:0.9; font-size:14px; }
    .body { padding:24px 32px; }
    .section-title { font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:#6b7280; margin:24px 0 12px; padding-bottom:8px; border-bottom:2px solid #e5e7eb; }
    .section-title:first-child { margin-top:0; }
    table { width:100%; border-collapse:collapse; border-radius:8px; overflow:hidden; border:1px solid #e5e7eb; }
    th { background:#f0fdf4; color:#059669; padding:10px 16px; text-align:left; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:0.3px; }
    th:nth-child(3), th:nth-child(4) { text-align:right; }
    .total-row { background:#f0fdf4; }
    .total-row td { padding:14px 16px; font-size:16px; font-weight:700; color:#059669; text-align:right; }
    .total-row td:first-child { text-align:left; color:#1f2937; }
    .detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px 16px; }
    .detail-item { font-size:14px; }
    .detail-item .label { color:#6b7280; font-size:12px; margin-bottom:2px; }
    .detail-item .value { font-weight:500; }
    .footer { background:#f9fafb; padding:16px 32px; text-align:center; font-size:12px; color:#9ca3af; border-top:1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🧹 New Booking Received</h1>
      <p>${safeName} — ${safeDate} at ${safeTime}</p>
    </div>
    <div class="body">
      <div class="section-title">Order Details (${totalItems} ${totalItems === 1 ? 'item' : 'items'})</div>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th style="text-align:center;">Qty</th>
            <th style="text-align:right;">Price</th>
            <th style="text-align:right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
          <tr class="total-row">
            <td colspan="3">Grand Total</td>
            <td>${data.totalPrice}</td>
          </tr>
        </tbody>
      </table>

      <div class="section-title">Customer Information</div>
      <div class="detail-grid">
        <div class="detail-item"><div class="label">Name</div><div class="value">${safeName}</div></div>
        <div class="detail-item"><div class="label">Phone</div><div class="value">${safePhone}</div></div>
        <div class="detail-item"><div class="label">Email</div><div class="value">${safeEmail}</div></div>
        <div class="detail-item"><div class="label">Date & Time</div><div class="value">${safeDate}, ${safeTime}</div></div>
      </div>
      <div class="detail-item" style="margin-top:8px;"><div class="label">Address</div><div class="value">${safeAddress}</div></div>
      ${safeMessage ? `<div class="detail-item" style="margin-top:8px;"><div class="label">Message</div><div class="value">${safeMessage}</div></div>` : ''}
    </div>
    <div class="footer">
      Urban Safai — Reliable, Daily Cleaning – Right to Your Door!<br />
      Ludhiana, Punjab, India · admin@urbansafai.in · 072789 22229
    </div>
  </div>
</body>
</html>`
}

// ─── POST: Create booking (public — no auth required) ───────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = bookingSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data: ' + parsed.error.issues.map((i) => i.message).join(', ') },
        { status: 400 }
      )
    }

    const { name, phone, email, services, date, time, address, message, totalPrice } = parsed.data

    // Parse services to validate JSON
    let items: BookingItem[]
    try {
      items = JSON.parse(services) as BookingItem[]
      if (!Array.isArray(items) || items.length === 0) {
        throw new Error('Services must be a non-empty array')
      }
    } catch {
      return NextResponse.json(
        { error: 'Invalid services data format' },
        { status: 400 }
      )
    }

    // Save to database
    const booking = await db.booking.create({
      data: {
        name,
        phone,
        email,
        services,
        date,
        time,
        address,
        message: message || null,
        totalPrice,
      },
    })

    // Send email via Resend (fire-and-forget — never block or crash the booking)
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey) {
      // Use setTimeout to fully isolate from request lifecycle
      setTimeout(async () => {
        try {
          const { Resend } = await import('resend')
          const resend = new Resend(apiKey)
          await resend.emails.send({
            from: 'Urban Safai <admin@urbansafai.in>',
            to: 'admin@urbansafai.in',
            bcc: 'info@quickwebworks.com',
            subject: `[Urban Safai] New Booking: ${name} - ${date}`,
            html: buildEmailHtml({ name, phone, email, date, time, address, message: message || '', totalPrice, items }),
          })
        } catch (err) {
          console.error('[Booking Email Error]', err)
        }
      }, 0)
    }

    return NextResponse.json({
      success: true,
      message: 'Booking submitted successfully',
      bookingId: booking.id,
    }, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[Booking POST Error]', message)

    // Detect common first-deploy issues
    if (message.includes('no such table') || message.includes('SQLITE_CANTOPEN') || message.includes('Failed to open database') || message.includes("Table '")) {
      return NextResponse.json(
        { error: 'Database not initialized. Please visit /api/setup first.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error', detail: message },
      { status: 500 }
    )
  }
}

// ─── GET: List bookings (auth-protected, with optional CSV export) ──────────

export async function GET(request: NextRequest) {
  try {
    // Auth check — require authenticated admin session
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format')

    const bookings = await db.booking.findMany({
      orderBy: { createdAt: 'desc' },
    })

    // CSV export
    if (format === 'csv') {
      const header =
        'S.No,Name,Phone,Email,Services,Date,Time,Address,Total Price,Status,Booked At'
      const rows = bookings.map((b, i) => {
        let serviceNames = ''
        try {
          const items: BookingItem[] = JSON.parse(b.services)
          serviceNames = items
            .map((it) => `${it.serviceName} (${it.quantity})`)
            .join('; ')
        } catch {
          serviceNames = b.services
        }

        return [
          i + 1,
          csvEscape(b.name),
          csvEscape(b.phone),
          csvEscape(b.email || ''),
          csvEscape(serviceNames),
          csvEscape(b.date),
          csvEscape(b.time),
          csvEscape(b.address),
          csvEscape(b.totalPrice),
          csvEscape(b.status),
          csvEscape(b.createdAt.toISOString()),
        ].join(',')
      })

      const csv = [header, ...rows].join('\n')

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition':
            'attachment; filename="bookings-export-' +
            new Date().toISOString().slice(0, 10) +
            '.csv"',
        },
      })
    }

    // JSON response
    return NextResponse.json({ bookings }, { status: 200 })
  } catch (err) {
    console.error('[Booking GET Error]', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function csvEscape(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return '"' + value.replace(/"/g, '""') + '"'
  }
  return value
}
