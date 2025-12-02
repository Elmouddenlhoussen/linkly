import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Check, Link2 } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { UpgradeButton } from '@/components/dashboard/upgrade-button'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out Linkly',
    features: [
      '10 links per month',
      'Basic analytics',
      'QR codes',
      '7 days data retention',
      'Community support',
    ],
    cta: 'Get Started',
    href: '/register',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    description: 'For professionals and growing businesses',
    features: [
      'Unlimited links',
      'Advanced analytics',
      'Custom slugs',
      'Unlimited data retention',
      'Priority support',
      'API access',
      'Bulk operations',
      'Team collaboration',
    ],
    cta: 'Upgrade to Pro',
    href: '/dashboard/billing',
    highlighted: true,
  },
]

export default async function PricingPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
                <Link2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Linkly</span>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {session ? (
                <Link
                  href="/dashboard"
                  className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Pricing */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start for free, upgrade when you need more. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-2xl scale-105'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'
                }`}
              >
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={plan.highlighted ? 'text-brand-100' : 'text-gray-600 dark:text-gray-400'}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {plan.price}
                    </span>
                    <span className={plan.highlighted ? 'text-brand-100' : 'text-gray-600 dark:text-gray-400'}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-white' : 'text-brand-600'}`} />
                      <span className={plan.highlighted ? 'text-brand-50' : 'text-gray-700 dark:text-gray-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {session && plan.highlighted ? (
                  <UpgradeButton className="w-full" />
                ) : (
                  <Link
                    href={plan.href}
                    className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                      plan.highlighted
                        ? 'bg-white text-brand-600 hover:bg-brand-50'
                        : 'bg-brand-600 text-white hover:bg-brand-700'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Need a custom plan?{' '}
              <a href="https://github.com/Elmouddenlhoussen" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
                <Link2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900 dark:text-white">Linkly</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Built by{' '}
              <a href="https://github.com/Elmouddenlhoussen" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                Elmoudden Lhoussaine
              </a>
              {' '}• 23yo Moroccan Full-Stack Developer
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
