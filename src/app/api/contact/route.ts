import { NextResponse } from 'next/server'
import type { ContactFormData } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactFormData

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In production, this would send an email, save to DB, or notify via webhook.
    // For now we log the contact form submission.
    console.log('[Contact Form Submission]', {
      name: body.name,
      email: body.email,
      phone: body.phone || 'N/A',
      subject: body.subject,
      message: body.message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
