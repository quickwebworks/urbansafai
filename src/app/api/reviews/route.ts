import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v4'
import { db } from '@/lib/db'
import { reviews as staticReviews } from '@/lib/reviews-data'

const reviewSchema = z.object({
  name: z.string().min(2),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10),
  service: z.string().optional(),
})

export async function GET() {
  try {
    const dbReviews = await db.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    if (dbReviews.length > 0) {
      return NextResponse.json({ success: true, data: dbReviews.map(r => ({ id: r.id, name: r.name, rating: r.rating, comment: r.comment, service: r.service, date: r.createdAt.toISOString().split('T')[0], avatar: r.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) })) })
    }
    return NextResponse.json({ success: true, data: staticReviews })
  } catch (err) {
    console.error('[Reviews GET]', err)
    return NextResponse.json({ success: true, data: staticReviews })
  }
}

export async function POST(request: NextRequest) {
  try {
    const result = reviewSchema.safeParse(await request.json())
    if (!result.success) {
      return NextResponse.json({ success: false, error: 'Validation failed', details: result.error.issues.map(i => ({ field: i.path.join('.'), message: i.message })) }, { status: 400 })
    }
    const { name, rating, comment, service } = result.data
    const review = await db.review.create({ data: { name, rating, comment, service: service || null, isApproved: false } })
    return NextResponse.json({ success: true, message: 'Thank you! Your review will be published after moderation.', data: { id: review.id } }, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[Reviews POST]', msg)
    if (/relation "[^"]+" does not exist|Table.*doesn't exist|no such table|does not exist/i.test(msg)) {
      return NextResponse.json({ success: false, error: 'Database not initialized. Visit /api/setup first.' }, { status: 503 })
    }
    return NextResponse.json({ success: false, error: 'Something went wrong.' }, { status: 500 })
  }
}
