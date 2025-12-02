import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'
import { z } from 'zod'
import { PLANS } from '@/lib/stripe'

const createLinkSchema = z.object({
  url: z.string().url(),
  title: z.string().optional(),
  customSlug: z.string().min(3).max(50).optional(),
})

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    const where = {
      userId: session.user.id,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { originalUrl: { contains: search, mode: 'insensitive' as const } },
          { shortCode: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
    }

    const [links, total] = await Promise.all([
      prisma.link.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.link.count({ where }),
    ])

    return NextResponse.json({
      links,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { url, title, customSlug } = createLinkSchema.parse(body)

    // Check user's subscription and link limit
    const [subscription, linkCount] = await Promise.all([
      prisma.subscription.findUnique({ where: { userId: session.user.id } }),
      prisma.link.count({ where: { userId: session.user.id } }),
    ])

    const plan = subscription?.status === 'active' ? PLANS.pro : PLANS.free
    if (linkCount >= plan.limits.links) {
      return NextResponse.json(
        { error: `You've reached your limit of ${plan.limits.links} links. Upgrade to Pro for more.` },
        { status: 403 }
      )
    }

    // Check if custom slug is available
    if (customSlug) {
      const existing = await prisma.link.findUnique({ where: { shortCode: customSlug } })
      if (existing) {
        return NextResponse.json({ error: 'This slug is already taken' }, { status: 400 })
      }
    }

    const shortCode = customSlug || nanoid(7)

    const link = await prisma.link.create({
      data: {
        shortCode,
        originalUrl: url,
        title,
        userId: session.user.id,
      },
    })

    return NextResponse.json(link)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
