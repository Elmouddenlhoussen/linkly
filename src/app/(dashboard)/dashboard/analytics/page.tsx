import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ClicksChart } from '@/components/dashboard/clicks-chart'
import { Globe, Monitor, Chrome, Smartphone } from 'lucide-react'

async function getAnalytics(userId: string) {
  const [countries, browsers, devices, topLinks] = await Promise.all([
    prisma.clickEvent.groupBy({
      by: ['country'],
      where: { link: { userId }, country: { not: null } },
      _count: true,
      orderBy: { _count: { country: 'desc' } },
      take: 10,
    }),
    prisma.clickEvent.groupBy({
      by: ['browser'],
      where: { link: { userId }, browser: { not: null } },
      _count: true,
      orderBy: { _count: { browser: 'desc' } },
      take: 5,
    }),
    prisma.clickEvent.groupBy({
      by: ['device'],
      where: { link: { userId }, device: { not: null } },
      _count: true,
      orderBy: { _count: { device: 'desc' } },
    }),
    prisma.link.findMany({
      where: { userId },
      orderBy: { clicks: 'desc' },
      take: 5,
      select: { id: true, shortCode: true, title: true, originalUrl: true, clicks: true },
    }),
  ])

  return { countries, browsers, devices, topLinks }
}

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)
  const data = await getAnalytics(session!.user.id)

  const countryNames: Record<string, string> = {
    US: 'United States', GB: 'United Kingdom', DE: 'Germany', FR: 'France',
    CA: 'Canada', AU: 'Australia', IN: 'India', BR: 'Brazil', JP: 'Japan',
    MA: 'Morocco', ES: 'Spain', IT: 'Italy', NL: 'Netherlands', SE: 'Sweden',
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your link performance</p>
      </div>

      <ClicksChart userId={session!.user.id} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Top Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Top Links
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {data.topLinks.length === 0 ? (
              <p className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">No data yet</p>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {data.topLinks.map((link, i) => (
                  <div key={link.id} className="px-6 py-3 flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {link.title || link.shortCode}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-brand-600 dark:text-brand-400 ml-4">
                      {link.clicks}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Countries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Countries
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {data.countries.length === 0 ? (
              <p className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">No data yet</p>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {data.countries.map((item) => (
                  <div key={item.country} className="px-6 py-3 flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {countryNames[item.country!] || item.country}
                    </span>
                    <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
                      {item._count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Browsers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Chrome className="w-5 h-5" />
              Browsers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {data.browsers.length === 0 ? (
              <p className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">No data yet</p>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {data.browsers.map((item) => (
                  <div key={item.browser} className="px-6 py-3 flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.browser}</span>
                    <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
                      {item._count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Devices */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.devices.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No data yet</p>
            ) : (
              <div className="flex flex-wrap gap-4">
                {data.devices.map((item) => (
                  <div key={item.device} className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {item.device || 'Desktop'}
                    </span>
                    <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                      {item._count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
