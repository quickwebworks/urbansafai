import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

const TABLES = [
  { name: 'Booking', sql: `
    CREATE TABLE IF NOT EXISTS Booking (
      id VARCHAR(30) PRIMARY KEY,
      name VARCHAR(191) NOT NULL,
      phone VARCHAR(191) NOT NULL,
      email VARCHAR(191),
      services TEXT NOT NULL,
      date VARCHAR(191) NOT NULL,
      time VARCHAR(191) NOT NULL,
      address TEXT NOT NULL,
      message TEXT,
      totalPrice VARCHAR(191) NOT NULL,
      status VARCHAR(191) NOT NULL DEFAULT 'pending',
      createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
    )` },
  { name: 'ContactSubmission', sql: `
    CREATE TABLE IF NOT EXISTS ContactSubmission (
      id VARCHAR(30) PRIMARY KEY,
      name VARCHAR(191) NOT NULL,
      email VARCHAR(191) NOT NULL,
      phone VARCHAR(191),
      subject VARCHAR(191) NOT NULL,
      message TEXT NOT NULL,
      isRead BOOLEAN NOT NULL DEFAULT FALSE,
      createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    )` },
  { name: 'Review', sql: `
    CREATE TABLE IF NOT EXISTS Review (
      id VARCHAR(30) PRIMARY KEY,
      name VARCHAR(191) NOT NULL,
      rating INT NOT NULL,
      comment TEXT NOT NULL,
      service VARCHAR(191),
      isApproved BOOLEAN NOT NULL DEFAULT FALSE,
      createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    )` },
  { name: 'NewsletterSubscriber', sql: `
    CREATE TABLE IF NOT EXISTS NewsletterSubscriber (
      id VARCHAR(30) PRIMARY KEY,
      email VARCHAR(191) NOT NULL UNIQUE,
      createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    )` },
]

export async function GET() {
  let conn: mysql.Connection | null = null
  try {
    const dbUrl = process.env.DATABASE_URL
    if (!dbUrl) return NextResponse.json({ success: false, error: 'DATABASE_URL not set' }, { status: 500 })

    conn = await mysql.createConnection(dbUrl)
    const created: string[] = []
    const existing: string[] = []

    for (const t of TABLES) {
      await conn.execute(t.sql)
      // Verify it exists
      const [rows] = await conn.execute(`SELECT COUNT(*) as c FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = ?`, [t.name])
      if ((rows as any)[0].c > 0) {
        existing.push(t.name)
      } else {
        created.push(t.name)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database ready',
      tables: { created, existing },
      total: TABLES.length,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ success: false, error: 'Database setup failed: ' + message }, { status: 500 })
  } finally {
    await conn?.end()
  }
}
