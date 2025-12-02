# 🧪 Stripe Test Mode Configuration

## ✅ Current Status: TEST MODE ACTIVE

This application is configured to use Stripe in **TEST MODE** by default. This means:

- ❌ **No real money will be charged**
- ✅ You can test the full payment flow
- ✅ Safe for demos and development
- ✅ No risk of accidental charges

## 🔑 Test Mode Keys

Your Stripe keys should look like this:

```
STRIPE_SECRET_KEY=sk_test_51ABC...
STRIPE_PUBLISHABLE_KEY=pk_test_51ABC...
```

**Important:** Keys starting with `sk_test_` and `pk_test_` are TEST keys.

## 💳 Test Cards

Use these cards to test different scenarios:

### Successful Payment
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

### Payment Declined
```
Card Number: 4000 0000 0000 0002
Expiry: Any future date
CVC: Any 3 digits
```

### 3D Secure Authentication
```
Card Number: 4000 0025 0000 3155
Expiry: Any future date
CVC: Any 3 digits
```

More test cards: https://stripe.com/docs/testing

## 🎯 Creating Test Products

1. Go to: https://dashboard.stripe.com/test/products
2. Click "Add product"
3. Set up your Pro plan:
   - Name: "Pro Plan"
   - Price: $9.00 USD
   - Billing period: Monthly
   - Recurring
4. Copy the Price ID (starts with `price_`)
5. Add to Vercel: `STRIPE_PRO_PRICE_ID=price_...`

## 🔍 Monitoring Test Payments

View all test transactions:
- Dashboard: https://dashboard.stripe.com/test/dashboard
- Payments: https://dashboard.stripe.com/test/payments
- Subscriptions: https://dashboard.stripe.com/test/subscriptions

## ⚠️ Before Going Live

When you're ready to accept real payments:

### 1. Complete Stripe Account Setup
- Verify your business details
- Add bank account for payouts
- Complete identity verification

### 2. Switch to Live Keys
In Vercel environment variables, replace:
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### 3. Create Live Products
- Create the same products in LIVE mode
- Update `STRIPE_PRO_PRICE_ID` with live price ID

### 4. Update Webhook
- Create a new webhook for LIVE mode
- Use the same endpoint URL
- Update `STRIPE_WEBHOOK_SECRET` with live webhook secret

### 5. Test Thoroughly
- Use real cards in small amounts
- Verify webhooks work correctly
- Test subscription cancellation
- Check email notifications

### 6. Redeploy
```bash
# After updating environment variables in Vercel
vercel --prod
```

## 🛡️ Safety Checklist

Before switching to live mode, ensure:

- [ ] All test transactions work correctly
- [ ] Webhooks are properly configured
- [ ] Subscription management works
- [ ] Cancellation flow is tested
- [ ] Email notifications are set up
- [ ] Terms of service are in place
- [ ] Privacy policy is published
- [ ] Refund policy is clear
- [ ] Customer support is ready

## 📊 Test Mode Limitations

In test mode:
- No real money is processed
- Emails are not sent (use Stripe test mode emails)
- Some features may behave differently
- Data is separate from live mode

## 🆘 Need Help?

- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe Dashboard](https://dashboard.stripe.com/test)
- [Stripe Support](https://support.stripe.com/)

---

**Remember:** Keep test keys in test mode and live keys in live mode. Never mix them!
