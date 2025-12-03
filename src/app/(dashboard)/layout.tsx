import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { SessionProviderWrapper } from '@/components/session-provider-wrapper'
import { DemoBanner } from '@/components/demo-banner'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <SessionProviderWrapper>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 w-full max-w-full overflow-x-hidden">
        <DemoBanner />
        <Sidebar />
        <div className="lg:pl-72 w-full max-w-full overflow-x-hidden">
          <Header user={session.user} />
          <main className="p-6 sm:p-8 w-full max-w-full overflow-x-hidden">{children}</main>
        </div>
      </div>
    </SessionProviderWrapper>
  )
}
