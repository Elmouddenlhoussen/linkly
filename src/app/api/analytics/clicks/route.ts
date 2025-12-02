import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { format, subDays, startOfDay, endOfDay } from 'date-fns'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const days = 7
    const data = []

    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i)
      const clicks = await prisma.clickEvent.count({
        where: {
          link: { userId: session.user.id },
          timestamp: {
            gte: startOfDay(date),
            lte: endOfDay(date),
          },
        },
      })

      data.push({
        date: format(date, 'MMM dd'),
        clicks,
      })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
