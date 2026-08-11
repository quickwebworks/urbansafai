import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v4'
import { getServerSession } from 'next-auth'
import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'

const VALID_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'] as const

type BookingStatus = (typeof VALID_STATUSES)[number]

const patchSchema = z.object({
  status: z.string().refine(
    (val): val is BookingStatus => VALID_STATUSES.includes(val as BookingStatus),
    { message: `Status must be one of: ${VALID_STATUSES.join(', ')}` }
  ),
})

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const existing = await db.booking.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    await db.booking.delete({ where: { id } })

    return NextResponse.json({ message: 'Booking deleted' }, { status: 200 })
  } catch (err) {
    console.error('[Booking DELETE Error]', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth check
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const body = await request.json()
    const parsed = patchSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data: ' + parsed.error.issues.map((i) => i.message).join(', ') },
        { status: 400 }
      )
    }

    const { status } = parsed.data

    // Check booking exists
    const existing = await db.booking.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const updated = await db.booking.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json({ booking: updated }, { status: 200 })
  } catch (err) {
    console.error('[Booking PATCH Error]', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
