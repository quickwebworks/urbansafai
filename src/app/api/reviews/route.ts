import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { reviews as staticReviews } from '@/lib/reviews-data'

const reviewSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  rating: z
    .number()
    .int()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
  service: z.string().optional(),
})

export async function GET() {
  try {
    const dbReviews = await db.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
    })

    if (dbReviews.length > 0) {
      return NextResponse.json({
        success: true,
        data: dbReviews.map((r) => ({
          id: r.id,
          name: r.name,
          rating: r.rating,
          comment: r.comment,
          service: r.service,
          date: r.createdAt.toISOString().split('T')[0],
          avatar: r.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2),
        })),
      })
    }

    // Seed with static data if DB is empty
    return NextResponse.json({
      success: true,
      data: staticReviews,
    })
  } catch (error) {
    console.error('Reviews fetch error:', error)

    return NextResponse.json(
      {
        success: true,
        data: staticReviews,
      },
      { status: 200 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = reviewSchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }))

      return NextResponse.json(
        { success: false, error: 'Validation failed', details: errors },
        { status: 400 }
      )
    }

    const { name, rating, comment, service } = result.data

    const review = await db.review.create({
      data: {
        name,
        rating,
        comment,
        service: service || null,
        isApproved: false,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message:
          'Thank you for your review! It will be published after moderation.',
        data: {
          id: review.id,
          name: review.name,
          rating: review.rating,
          createdAt: review.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Review submission error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong. Please try again later.',
      },
      { status: 500 }
    )
  }
}
