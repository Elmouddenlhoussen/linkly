# 🚀 Next Steps - Deploy Your App!

## ✅ What's Done

- ✅ Cleaned up unnecessary files
- ✅ Configured Stripe in TEST mode (no real charges)
- ✅ Pushed to GitHub: https://github.com/Elmouddenlhoussen/linkly
- ✅ Added deployment guides and documentation
- ✅ Created Vercel configuration

## 🎯 Deploy to Vercel (5 minutes)

### Quick Start

1. **Go to Vercel:**
   👉 https://vercel.com/new

2. **Import Repository:**
   - Click "Import Git Repository"
   - Select: `Elmouddenlhoussen/linkly`
   - Click "Import"

3. **Add Environment Variables:**
   
   Copy these and fill in the values:
   
   ```env
   DATABASE_URL=postgresql://...
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=<generate at: https://generate-secret.vercel.app/32>
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_PRO_PRICE_ID=price_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

4. **Click Deploy!**

## 📚 Detailed Guides

- **Full Deployment Guide:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Vercel Quick Reference:** [VERCEL_SETUP.md](./VERCEL_SETUP.md)
- **Stripe Test Mode Info:** [STRIPE_TEST_MODE.md](./STRIPE_TEST_MODE.md)

## 🗄️ Database Options

Choose one:

### Option 1: Vercel Postgres (Easiest)
1. In Vercel dashboard, go to Storage
2. Create Postgres database
3. Copy `DATABASE_URL` to environment variables

### Option 2: Supabase (Free tier)
1. Create project at https://supabase.com
2. Go to Settings > Database
3. Copy connection string (use "Connection pooling")

### Option 3: Neon (Serverless)
1. Create project at https://neon.tech
2. Copy connection string

## 💳 Stripe Setup

### 1. Get Test Keys
1. Go to: https://dashboard.stripe.com/test/apikeys
2. Copy "Publishable key" (pk_test_...)
3. Reveal and copy "Secret key" (sk_test_...)

### 2. Create Product
1. Go to: https://dashboard.stripe.com/test/products
2. Click "Add product"
3. Name: "Pro Plan"
4. Price: $9.00 USD / month
5. Copy the Price ID (price_...)

### 3. Set Up Webhook (After first deploy)
1. Go to: https://dashboard.stripe.com/test/webhooks
2. Add endpoint: `https://your-app.vercel.app/api/stripe/webhook`
3. Select events:
   - checkout.session.completed
   - invoice.payment_succeeded
   - customer.subscription.deleted
4. Copy webhook secret (whsec_...)
5. Add to Vercel environment variables
6. Redeploy

## 🧪 Testing

After deployment, test with:

**Test Card:** 4242 4242 4242 4242
**Expiry:** Any future date
**CVC:** Any 3 digits

## ⚠️ Important Reminders

- 🔒 **All Stripe keys are TEST mode** - no real charges
- 🔑 Never commit `.env` file (already in .gitignore)
- 🔄 After adding environment variables, redeploy
- 📧 Update NEXTAUTH_URL after first deploy

## 🆘 Troubleshooting

### Build Fails
- Check all environment variables are set
- Ensure DATABASE_URL is correct

### Can't Login
- Verify NEXTAUTH_URL matches your deployment URL
- Check NEXTAUTH_SECRET is set

### Stripe Not Working
- Confirm you're using TEST keys (sk_test_...)
- Verify webhook is configured correctly

## 📞 Need Help?

Check these files:
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Full deployment instructions
- [VERCEL_SETUP.md](./VERCEL_SETUP.md) - Step-by-step Vercel setup
- [STRIPE_TEST_MODE.md](./STRIPE_TEST_MODE.md) - Stripe configuration
- [README.md](./README.md) - Project overview

## 🎉 After Deployment

1. Visit your app
2. Create an account
3. Test creating short links
4. Test upgrading to Pro (with test card)
5. Check analytics
6. Share with friends!

---

**Your GitHub Repo:** https://github.com/Elmouddenlhoussen/linkly

**Ready to deploy?** 👉 https://vercel.com/new
