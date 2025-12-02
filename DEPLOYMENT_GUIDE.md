# Deployment Guide for Vercel

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- PostgreSQL database (Vercel Postgres, Supabase, or Neon)
- Stripe account (use TEST mode keys)

## Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
cd linkly
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Linkly app ready for deployment"

# Create GitHub repo using GitHub CLI
gh repo create linkly --public --source=. --remote=origin --push
```

## Step 2: Set Up Database

Choose one of these options:

### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel dashboard
2. Create a new Postgres database
3. Copy the `DATABASE_URL` connection string

### Option B: Supabase
1. Create a project at supabase.com
2. Go to Settings > Database
3. Copy the connection string (use "Connection pooling" for production)

### Option C: Neon
1. Create a project at neon.tech
2. Copy the connection string

## Step 3: Deploy to Vercel

### Using Vercel CLI:
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Using Vercel Dashboard:
1. Go to vercel.com/new
2. Import your GitHub repository
3. Configure environment variables (see below)
4. Deploy

## Step 4: Configure Environment Variables

Add these in Vercel Dashboard > Settings > Environment Variables:

```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
STRIPE_SECRET_KEY=sk_test_... (TEST KEY ONLY)
STRIPE_PUBLISHABLE_KEY=pk_test_... (TEST KEY ONLY)
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## Step 5: Set Up Stripe Webhook

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your-app.vercel.app/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.deleted`
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

## Step 6: Initialize Database

After deployment, run:
```bash
vercel env pull .env.local
npm run db:push
```

## ⚠️ IMPORTANT: Test Mode

**The app is configured to use Stripe TEST mode.**

- All keys should start with `sk_test_` and `pk_test_`
- No real charges will be made
- Use test card: 4242 4242 4242 4242
- When ready for production, switch to live keys in Vercel environment variables

## Troubleshooting

### Build fails
- Check that all environment variables are set
- Ensure DATABASE_URL is accessible from Vercel

### Stripe webhook not working
- Verify webhook URL matches your deployment
- Check webhook secret is correct
- Ensure events are selected in Stripe dashboard

### Database connection issues
- Use connection pooling for serverless (Prisma Data Proxy or Supabase pooler)
- Check database allows connections from Vercel IPs
