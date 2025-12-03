import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Link2, MousePointerClick, TrendingUp, Globe } from 'lucide-react'
import { formatNumber } from '@/lib/utils'
import { CreateLinkButton } from '@/components/dashboard/create-link-button'
import { RecentLinks } from '@/components/dashboard/recent-links'
import { ClicksChart } from '@/components/dashboard/clicks-chart'
import { OnboardingTour } from '@/components/onboarding-tour'

async function getDashboardData(userId: string) {
  const [links, totalClicks, recentClicks] = await Promise.all([
    prisma.link.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.link.aggregate({
      where: { userId },
      _sum: { clicks: true },
    }),
    prisma.clickEvent.findMany({
      where: { link: { userId } },
      orderBy: { timestamp: 'desc' },
      take: 100,
    }),
  ])

  const linkCount = await prisma.link.count({ where: { userId } })

  // Get clicks by day for the last 7 days
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const clicksByDay = await prisma.clickEvent.groupBy({
    by: ['timestamp'],
    where: {
      link: { userId },
      timestamp: { gte: sevenDaysAgo },
    },
    _count: true,
  })

  // Get unique countries
  const countries = await prisma.clickEvent.groupBy({
    by: ['country'],
    where: { link: { userId }, country: { not: null } },
    _count: true,
    orderBy: { _count: { country: 'desc' } },
    take: 5,
  })

  return {
    links,
    linkCount,
    totalClicks: totalClicks._sum.clicks || 0,
    clicksByDay,
    countries,
    todayClicks: recentClicks.filter(
      (c) => c.timestamp.toDateString() === new Date().toDateString()
    ).length,
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const data = await getDashboardData(session!.user.id)

  const hasData = data.linkCount > 0

  return (
    <>
      <OnboardingTour />
      <div className="space-y-8 w-full max-w-full overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 max-w-full overflow-x-hidden">
          <div className="max-w-full overflow-x-hidden">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 max-w-full overflow-x-hidden">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-full overflow-x-hidden">
              Welcome back, {session?.user.name?.split(' ')[0] || 'there'}
            </p>
          </div>
          <div data-tour="create-link" className="max-w-full overflow-x-hidden">
            <CreateLinkButton />
          </div>
        </div>

        {/* Demo Notice */}
        {!hasData && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 p-8 max-w-full overflow-x-hidden">
            <div className="relative z-10 max-w-full overflow-x-hidden">
              <div className="flex items-start gap-4 max-w-full overflow-x-hidden">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-slate-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white dark:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 max-w-full overflow-x-hidden">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 max-w-full overflow-x-hidden">
                    Demo Project - Portfolio Showcase
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 max-w-full overflow-x-hidden">
                    This is a demonstration of a production-ready SaaS platform. Create your first link to see the analytics in action. 
                    Built by <a href="https://github.com/Elmouddenlhoussen" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-900 dark:text-white underline">Elmoudden Lhoussaine</a>.
                  </p>
                  <div className="flex flex-wrap gap-2 max-w-full overflow-x-hidden">
                    <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 max-w-full overflow-x-hidden">
                      Next.js 15
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 max-w-full overflow-x-hidden">
                      TypeScript
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 max-w-full overflow-x-hidden">
                      Prisma
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 max-w-full overflow-x-hidden">
                      Stripe
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-200 dark:bg-slate-700 rounded-full blur-3xl opacity-20"></div>
          </div>
        )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-full overflow-x-hidden" data-tour="analytics">
        <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 max-w-full overflow-x-hidden">
          <div className="flex items-center justify-between mb-4 max-w-full overflow-x-hidden">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Link2 className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </div>
          </div>
          <div className="space-y-1 max-w-full overflow-x-hidden">
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-full overflow-x-hidden">Total Links</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white max-w-full overflow-x-hidden">{formatNumber(data.linkCount)}</p>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <MousePointerClick className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Clicks</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{formatNumber(data.totalClicks)}</p>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">Today</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{formatNumber(data.todayClicks)}</p>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Globe className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">Countries</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{data.countries.length}</p>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 max-w-full overflow-x-hidden">
        <ClicksChart userId={session!.user.id} />
        <RecentLinks links={data.links} />
      </div>
      </div>
    </>
  )
}
