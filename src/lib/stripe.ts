import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

export const PLANS = {
  free: {
    name: 'Free',
    description: 'For personal use',
    price: 0,
    limits: {
      links: 10,
      clicksPerMonth: 1000,
    },
    features: [
      '10 short links',
      '1,000 clicks/month',
      'Basic analytics',
      'QR codes',
    ],
  },
  pro: {
    name: 'Pro',
    description: 'For professionals',
    price: 9,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    limits: {
      links: 500,
      clicksPerMonth: 50000,
    },
    features: [
      '500 short links',
      '50,000 clicks/month',
      'Advanced analytics',
      'Custom slugs',
      'API access',
      'Priority support',
    ],
  },
}

export async function createCheckoutSession(userId: string, email: string) {
  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: PLANS.pro.priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    metadata: {
      userId,
    },
    // Test mode - no actual charges until you switch to live keys
    payment_intent_data: {
      setup_future_usage: 'off_session',
    },
  })

  return session
}

export async function createBillingPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
  })

  return session
}
