# 🚀 Deployment Guide

This guide will help you deploy Linkly to production.

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- PostgreSQL database (we'll use Vercel Postgres)
- Stripe account

---

## Step 1: Database Setup

### Option A: Vercel Postgres (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Storage" → "Create Database"
3. Select "Postgres"
4. Choose a name (e.g., `linkly-db`)
5. Select your region
6. Click "Create"
7. Copy the `DATABASE_URL` from the `.env.local` tab

### Option B: Other Providers

You can also use:
- **Supabase**: [supabase.com](https://supabase.com) - Free tier available
- **Railway**: [railway.app](https://railway.app) - $5/month
- **Neon**: [neon.tech](https://neon.tech) - Free tier available

---

## Step 2: Stripe Setup

### Create Stripe Account

1. Sign up at [stripe.com](https://stripe.com)
2. Complete account verification

### Get API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click "Developers" → "API keys"
3. Copy your **Publishable key** and **Secret key**
4. For testing, use test mode keys (they start with `pk_test_` and `sk_test_`)

### Create Product and Price

1. Go to "Products" → "Add product"
2. Name: "Linkly Pro"
3. Description: "Unlimited links and advanced analytics"
4. Pricing: $9.00 USD / month (recurring)
5. Click "Save product"
6. Copy the **Price ID** (starts with `price_`)

### Set Up Webhook

1. Go to "Developers" → "Webhooks"
2. Click "Add endpoint"
3. Endpoint URL: `https://your-domain.vercel.app/api/stripe/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click "Add endpoint"
6. Copy the **Signing secret** (starts with `whsec_`)

---

## Step 3: Deploy to Vercel

### Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/linkly.git
git push -u origin main
```

### Import to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: `./` (or `linkly` if in subdirectory)
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Add Environment Variables

In Vercel project settings, add these environment variables:

```env
# Database
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate-a-random-secret-here

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...

# App
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Your app will be live at `https://your-project.vercel.app`

---

## Step 4: Initialize Database

### Run Prisma Migrations

After deployment, you need to push the database schema:

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Link your project:
```bash
vercel link
```

3. Pull environment variables:
```bash
vercel env pull .env.local
```

4. Push database schema:
```bash
npx prisma db push
```

Alternatively, you can run this in Vercel's terminal or use a GitHub Action.

---

## Step 5: Update Stripe Webhook

1. Go back to Stripe Dashboard → Webhooks
2. Edit your webhook endpoint
3. Update URL to: `https://your-actual-domain.vercel.app/api/stripe/webhook`
4. Save changes

---

## Step 6: Custom Domain (Optional)

### Add Custom Domain

1. In Vercel project settings, go to "Domains"
2. Add your custom domain (e.g., `linkly.yourdomain.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

### Update Environment Variables

After adding custom domain, update:
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_APP_URL`
- Stripe webhook URL

---

## Step 7: Test Your Deployment

### Test Authentication

1. Visit your deployed site
2. Click "Get Started"
3. Create an account
4. Verify you can log in

### Test Link Creation

1. Go to Dashboard
2. Click "New Link"
3. Create a short link
4. Test the redirect

### Test Stripe Integration

1. Go to Pricing page
2. Click "Upgrade to Pro"
3. Use test card: `4242 4242 4242 4242`
4. Complete checkout
5. Verify subscription in Dashboard

---

## Production Checklist

Before going live with real payments:

- [ ] Switch Stripe to live mode
- [ ] Update Stripe API keys to live keys
- [ ] Update webhook to use live mode
- [ ] Test all features thoroughly
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Configure analytics (Google Analytics, Plausible, etc.)
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom, etc.)
- [ ] Review and update privacy policy
- [ ] Review and update terms of service
- [ ] Set up customer support email
- [ ] Configure email service (SendGrid, Resend, etc.)
- [ ] Enable rate limiting
- [ ] Set up backups for database
- [ ] Configure CDN for static assets
- [ ] Test on multiple devices and browsers

---

## Monitoring and Maintenance

### Vercel Analytics

Enable Vercel Analytics for free:
1. Go to project settings
2. Click "Analytics"
3. Enable analytics

### Database Backups

For Vercel Postgres:
- Automatic daily backups included
- Can restore from Vercel dashboard

For other providers:
- Set up automated backups
- Test restore process regularly

### Error Tracking

Recommended tools:
- **Sentry**: [sentry.io](https://sentry.io)
- **LogRocket**: [logrocket.com](https://logrocket.com)
- **Highlight**: [highlight.io](https://highlight.io)

### Performance Monitoring

- Use Vercel Analytics
- Monitor Core Web Vitals
- Set up alerts for downtime

---

## Troubleshooting

### Build Fails

**Error: Prisma Client not generated**
```bash
# Add to package.json scripts
"postinstall": "prisma generate"
```

**Error: Environment variables not found**
- Check all required env vars are set in Vercel
- Redeploy after adding env vars

### Database Connection Issues

**Error: Can't reach database server**
- Verify DATABASE_URL is correct
- Check database is running
- Verify IP whitelist (if applicable)

### Stripe Webhook Fails

**Error: Webhook signature verification failed**
- Verify STRIPE_WEBHOOK_SECRET is correct
- Check webhook URL matches deployment URL
- Ensure webhook is in correct mode (test/live)

### Authentication Issues

**Error: NextAuth configuration error**
- Verify NEXTAUTH_URL matches deployment URL
- Check NEXTAUTH_SECRET is set
- Clear cookies and try again

---

## Scaling Considerations

### Database

- Monitor connection pool usage
- Consider read replicas for high traffic
- Implement caching (Redis) for frequently accessed data

### API Rate Limiting

Implement rate limiting to prevent abuse:
```typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})
```

### CDN and Caching

- Use Vercel Edge Network (automatic)
- Implement ISR for static pages
- Cache API responses where appropriate

---

## Cost Estimation

### Free Tier (Hobby)

- **Vercel**: Free (100GB bandwidth, 100 builds/day)
- **Vercel Postgres**: Free (256MB storage, 60 hours compute)
- **Stripe**: Free (2.9% + $0.30 per transaction)

**Total**: $0/month + transaction fees

### Production (Pro)

- **Vercel Pro**: $20/month (1TB bandwidth, unlimited builds)
- **Vercel Postgres**: $10/month (1GB storage, 100 hours compute)
- **Stripe**: 2.9% + $0.30 per transaction

**Total**: ~$30/month + transaction fees

---

## Support

If you encounter issues:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Check [Next.js Documentation](https://nextjs.org/docs)
3. Check [Stripe Documentation](https://stripe.com/docs)
4. Open an issue on GitHub

---

## Next Steps

After deployment:

1. Set up monitoring and alerts
2. Configure email notifications
3. Add more features (API, webhooks, etc.)
4. Implement analytics dashboard
5. Add team collaboration features
6. Build mobile app (React Native)

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/Elmouddenlhoussen">Elmoudden Lhoussaine</a></p>
</div>
