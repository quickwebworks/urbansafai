import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'

// PostgreSQL CREATE TABLE statements matching the Prisma schema
// These are used for the self-setup endpoint so users don't need Prisma CLI on Hostinger
const TABLES: { name: string; sql: string }[] = [
  {
    name: 'Booking',
    sql: `
      CREATE TABLE IF NOT EXISTS "Booking" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "email" TEXT,
        "services" TEXT NOT NULL,
        "date" TEXT NOT NULL,
        "time" TEXT NOT NULL,
        "address" TEXT NOT NULL,
        "message" TEXT,
        "totalPrice" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'pending',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      );
    `,
  },
  {
    name: 'ContactSubmission',
    sql: `
      CREATE TABLE IF NOT EXISTS "ContactSubmission" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT,
        "subject" TEXT NOT NULL,
        "message" TEXT NOT NULL,
        "isRead" BOOLEAN NOT NULL DEFAULT FALSE,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `,
  },
  {
    name: 'Review',
    sql: `
      CREATE TABLE IF NOT EXISTS "Review" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "rating" INTEGER NOT NULL,
        "comment" TEXT NOT NULL,
        "service" TEXT,
        "isApproved" BOOLEAN NOT NULL DEFAULT FALSE,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `,
  },
  {
    name: 'NewsletterSubscriber',
    sql: `
      CREATE TABLE IF NOT EXISTS "NewsletterSubscriber" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "NewsletterSubscriber_email_key" UNIQUE ("email")
      );
    `,
  },
]

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL
    if (!dbUrl) {
      return NextResponse.json(
        { success: false, error: 'DATABASE_URL not set' },
        { status: 500 },
      )
    }

    const created: string[] = []
    const existing: string[] = []

    for (const t of TABLES) {
      try {
        // Check if table already exists
        const result = await db.$queryRawUnsafe(
          `SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_name = '${t.name.toLowerCase()}'
          )`,
        )

        const exists = (result as Array<{ exists: boolean }>)[0]?.exists

        if (!exists) {
          await db.$executeRawUnsafe(t.sql)
          created.push(t.name)
        } else {
          existing.push(t.name)
        }
      } catch (tableErr) {
        console.error(`[Setup] Error on table ${t.name}:`, tableErr)
        // If table check fails, try creating anyway
        try {
          await db.$executeRawUnsafe(t.sql)
          created.push(t.name)
        } catch {
          existing.push(t.name)
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database ready (Supabase / PostgreSQL)',
      tables: { created, existing },
      total: TABLES.length,
    })
  } catch (err: unknown) {
    const message =
      err instanceof Prisma.PrismaClientKnownRequestError
        ? err.message
        : err instanceof Error
          ? err.message
          : String(err)

    console.error('[Setup Error]', message)
    return NextResponse.json(
      { success: false, error: 'Database setup failed: ' + message },
      { status: 500 },
    )
  }
}
