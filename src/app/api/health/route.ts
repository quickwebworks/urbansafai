import { NextResponse } from 'next/server'

export async function GET() {
  const checks = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
    ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    NODE_ENV: process.env.NODE_ENV || 'NOT SET',
  }

  const missing = Object.entries(checks)
    .filter(([key, val]) => typeof val === 'boolean' && !val)
    .map(([key]) => key)

  return NextResponse.json({
    status: missing.length === 0 ? 'ok' : 'missing_vars',
    checks,
    missing,
    hint: missing.length > 0
      ? `Set these (Supabase dashboard / Hostinger env): ${missing.join(', ')}`
      : 'All configured correctly',
  })
}
