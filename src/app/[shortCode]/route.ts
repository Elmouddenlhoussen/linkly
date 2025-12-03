import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'
import UAParser from 'ua-parser-js'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  try {
    const { shortCode } = await params
    const link = await prisma.link.findUnique({
      where: { shortCode },
    })

    if (!link || !link.isActive) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Track click asynchronously
    const headersList = await headers()
    const userAgent = headersList.get('user-agent') || ''
    const referer = headersList.get('referer') || null

    const parser = new UAParser(userAgent)
    const browser = parser.getBrowser()
    const os = parser.getOS()
    const device = parser.getDevice()

    // Get geo info from headers (works with Vercel/Cloudflare)
    const country = headersList.get('x-vercel-ip-country') || 
                    headersList.get('cf-ipcountry') || 
                    null
    const city = headersList.get('x-vercel-ip-city') || 
                 headersList.get('cf-ipcity') || 
                 null

    // Update click count and create event
    await Promise.all([
      prisma.link.update({
        where: { id: link.id },
        data: { clicks: { increment: 1 } },
      }),
      prisma.clickEvent.create({
        data: {
          linkId: link.id,
          country,
          city,
          device: device.type || 'desktop',
          browser: browser.name || null,
          os: os.name || null,
          referer,
        },
      }),
    ])

    return NextResponse.redirect(link.originalUrl)
  } catch (error) {
    return NextResponse.redirect(new URL('/', req.url))
  }
}
