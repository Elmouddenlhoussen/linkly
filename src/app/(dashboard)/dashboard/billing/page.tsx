import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { PLANS } from '@/lib/stripe'
import { Check } from 'lucide-react'
import { UpgradeButton } from '@/components/dashboard/upgrade-button'
import { ManageSubscriptionButton } from '@/components/dashboard/manage-subscription-button'
import { format } from 'date-fns'

async function getSubscription(userId: string) {
  const [subscription, user] = await Promise.all([
    prisma.subscription.findUnique({ where: { userId } }),
    prisma.user.findUnique({ where: { id: userId }, select: { stripeCustomerId: true } }),
  ])
  return { subscription, stripeCustomerId: user?.stripeCustomerId }
}

export default async function BillingPage() {
  const session = await getServerSession(authOptions)
  const { subscription, stripeCustomerId } = await getSubscription(session!.user.id)

  const isPro = subscription?.status === 'active'
  const currentPlan = isPro ? PLANS.pro : PLANS.free

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your subscription</p>
      </div>

      {/* Test Mode Warning */}
      {process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_') && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Test Mode Active</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                This app is running in Stripe test mode. No real charges will be made. Use test card: 4242 4242 4242 4242
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentPlan.name}</p>
              <p className="text-gray-600 dark:text-gray-400">{currentPlan.description}</p>
              {subscription && (
                <p className="text-sm text-gray-500 mt-2">
                  {subscription.status === 'active' 
                    ? `Renews on ${format(new Date(subscription.stripeCurrentPeriodEnd), 'MMM dd, yyyy')}`
                    : `Status: ${subscription.status}`
                  }
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ${currentPlan.price}
                <span className="text-base font-normal text-gray-500">/mo</span>
              </p>
            </div>
          </div>
          {isPro && stripeCustomerId && (
            <div className="mt-4">
              <ManageSubscriptionButton customerId={stripeCustomerId} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(PLANS).map(([key, plan]) => (
          <Card key={key} className={key === 'pro' ? 'border-brand-500 ring-2 ring-brand-500' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                {key === 'pro' && (
                  <span className="px-2 py-1 text-xs font-medium bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-400 rounded-full">
                    Popular
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                ${plan.price}
                <span className="text-base font-normal text-gray-500">/mo</span>
              </p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              {key === 'pro' && !isPro && (
                <UpgradeButton />
              )}
              {key === 'free' && !isPro && (
                <p className="text-sm text-center text-gray-500">Current plan</p>
              )}
              {key === 'pro' && isPro && (
                <p className="text-sm text-center text-green-600 font-medium">Your current plan</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
