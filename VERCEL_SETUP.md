# Vercel Deployment - Quick Reference

## 🎯 Your Repository
**GitHub URL:** https://github.com/Elmouddenlhoussen/linkly

## 📋 Step-by-Step Deployment

### 1. Import to Vercel
1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select: `Elmouddenlhoussen/linkly`
4. Click "Import"

### 2. Configure Project
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** `./` (leave as is)
- **Build Command:** `prisma generate && next build` (auto-configured via vercel.json)
- **Output Directory:** `.next` (auto-detected)

### 3. Add Environment Variables

Click "Environment Variables" and add these:

#### Database (Required)
```
DATABASE_URL
```
Value: Get from Vercel Postgres, Supabase, or Neon
Example: `postgresql://user:pass@host:5432/linkly?schema=public`

#### NextAuth (Required)
```
NEXTAUTH_URL
```
Value: `https://your-app-name.vercel.app` (you'll get this after first deploy)

```
NEXTAUTH_SECRET
```
Value: Generate with: `openssl rand -base64 32`
Or use: https://generate-secret.vercel.app/32

#### Stripe (Required - TEST MODE)
```
STRIPE_SECRET_KEY
```
Value: `sk_test_...` (from Stripe Dashboard > Developers > API keys)

```
STRIPE_PUBLISHABLE_KEY
```
Value: `pk_test_...` (from Stripe Dashboard > Developers > API keys)

```
STRIPE_PRO_PRICE_ID
```
Value: `price_...` (create a product in Stripe Dashboard > Products)

```
STRIPE_WEBHOOK_SECRET
```
Value: `whsec_...` (you'll get this in step 5)

#### App URL (Required)
```
NEXT_PUBLIC_APP_URL
```
Value: `https://your-app-name.vercel.app` (same as NEXTAUTH_URL)

### 4. Deploy
Click "Deploy" and wait for the build to complete (2-3 minutes)

### 5. Set Up Database
After first deployment:
```bash
# Pull environment variables locally
vercel env pull .env.local

# Push database schema
npm run db:push
```

### 6. Configure Stripe Webhook
1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-app-name.vercel.app/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.deleted`
5. Copy the "Signing secret" (starts with `whsec_`)
6. Add it to Vercel: Settings > Environment Variables > `STRIPE_WEBHOOK_SECRET`
7. Redeploy: Deployments > ... > Redeploy

### 7. Update URLs
After deployment, update these environment variables with your actual Vercel URL:
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_APP_URL`

Then redeploy.

## 🎉 You're Done!

Visit your app at: `https://your-app-name.vercel.app`

## 🧪 Testing Stripe

Use these test cards:
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **3D Secure:** 4000 0025 0000 3155

Any future expiry date and any 3-digit CVC.

## 🔄 Making Updates

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically deploy your changes!

## 🆘 Troubleshooting

### Build fails with "DATABASE_URL not found"
- Make sure DATABASE_URL is added in Vercel environment variables
- Redeploy after adding variables

### Stripe webhook not working
- Verify webhook URL matches your deployment
- Check webhook secret is correct in Vercel
- Ensure you selected the correct events

### "Invalid NEXTAUTH_URL"
- Make sure NEXTAUTH_URL matches your actual Vercel URL
- No trailing slash
- Must be HTTPS in production

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
