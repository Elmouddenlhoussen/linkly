# ⚡ Quick Start Guide

Get Linkly running locally in 5 minutes!

---

## 🎯 For Portfolio Reviewers

This is a production-ready micro-SaaS built with:
- **Next.js 15** (App Router)
- **TypeScript**
- **Prisma + PostgreSQL**
- **Stripe** (Subscriptions)
- **NextAuth.js** (Authentication)
- **Tailwind CSS** (Styling)

**Built by**: [Elmoudden Lhoussaine](https://github.com/Elmouddenlhoussen) - 23yo Moroccan Full-Stack Developer

---

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies

```bash
cd linkly
npm install
```

### 2. Set Up Database

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL if you haven't
# Then create a database
createdb linkly
```

**Option B: Free Cloud Database**
- [Supabase](https://supabase.com) - Free tier
- [Neon](https://neon.tech) - Free tier
- [Railway](https://railway.app) - Free trial

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
# Minimum required for local development
DATABASE_URL="postgresql://user:password@localhost:5432/linkly"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="any-random-string-here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Stripe (optional for testing, use test keys)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRO_PRICE_ID="price_..."
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Initialize Database

```bash
npm run db:push
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🧪 Test the App

### 1. Create an Account
- Click "Get Started"
- Fill in your details
- Click "Create account"

### 2. Create a Short Link
- Go to Dashboard
- Click "New Link"
- Enter a URL (e.g., `https://github.com/Elmouddenlhoussen`)
- Click "Create Link"

### 3. Test the Short Link
- Copy the short link
- Open in new tab
- Should redirect to original URL
- Check analytics in Dashboard

### 4. Test Dark Mode
- Click the theme toggle in header
- UI should switch between light/dark

---

## 💳 Test Stripe (Optional)

### Get Stripe Test Keys

1. Sign up at [stripe.com](https://stripe.com)
2. Go to Developers → API keys
3. Copy test keys (start with `pk_test_` and `sk_test_`)
4. Add to `.env`

### Create Test Product

1. Go to Products → Add product
2. Name: "Linkly Pro"
3. Price: $9/month
4. Copy Price ID (starts with `price_`)
5. Add to `.env` as `STRIPE_PRO_PRICE_ID`

### Test Checkout

1. Go to Pricing page
2. Click "Upgrade to Pro"
3. Use test card: `4242 4242 4242 4242`
4. Any future date, any CVC
5. Complete checkout

---

## 📁 Project Structure

```
linkly/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── (dashboard)/       # Protected dashboard
│   │   ├── api/               # API routes
│   │   ├── [shortCode]/       # Link redirect handler
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── dashboard/         # Dashboard components
│   │   └── ui/                # Reusable UI components
│   ├── lib/                   # Utilities & configs
│   │   ├── auth.ts           # NextAuth config
│   │   ├── prisma.ts         # Database client
│   │   ├── stripe.ts         # Stripe config
│   │   └── utils.ts          # Helper functions
│   └── types/                 # TypeScript types
├── prisma/
│   └── schema.prisma          # Database schema
└── public/                    # Static assets
```

---

## 🎯 Key Features to Review

### 1. Authentication
- **File**: `src/lib/auth.ts`
- Email/password with NextAuth.js
- JWT sessions
- Protected routes

### 2. Link Shortening
- **File**: `src/app/api/links/route.ts`
- Custom slugs
- nanoid for short codes
- Usage limits by plan

### 3. Analytics
- **File**: `src/app/api/analytics/clicks/route.ts`
- Real-time tracking
- Device, browser, location data
- Charts with Recharts

### 4. Stripe Integration
- **File**: `src/lib/stripe.ts`
- Subscription checkout
- Webhook handling
- Billing portal

### 5. Database Schema
- **File**: `prisma/schema.prisma`
- User, Link, ClickEvent models
- Subscription management
- Optimized indexes

---

## 🎨 UI Components

### Landing Page
- Modern hero section
- Feature showcase
- Responsive design
- Dark mode support

### Dashboard
- Analytics widgets
- Recent links table
- Click charts
- Quick actions

### Forms
- Custom input components
- Validation
- Loading states
- Error handling

---

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio (DB GUI)
```

---

## 📊 Tech Stack Highlights

### Frontend
- **Next.js 15**: Latest App Router with Server Components
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Beautiful analytics charts
- **Lucide React**: Modern icon library

### Backend
- **Next.js API Routes**: Serverless functions
- **Prisma**: Type-safe ORM
- **PostgreSQL**: Reliable database
- **NextAuth.js**: Authentication
- **Stripe**: Payment processing

### Developer Experience
- Hot Module Replacement
- TypeScript IntelliSense
- Prisma Studio for DB
- ESLint for code quality

---

## 🐛 Common Issues

### Database Connection Error
```bash
# Check DATABASE_URL is correct
# Ensure PostgreSQL is running
# Try: npm run db:push
```

### Prisma Client Error
```bash
# Regenerate Prisma Client
npx prisma generate
```

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

---

## 📚 Documentation

- **README.md**: Complete project overview
- **FEATURES.md**: Detailed feature list
- **DEPLOYMENT.md**: Production deployment guide
- **CONTRIBUTING.md**: Contribution guidelines

---

## 🎓 Learning Resources

### Next.js 15
- [Next.js Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)

### Prisma
- [Prisma Docs](https://www.prisma.io/docs)
- [Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

### Stripe
- [Stripe Docs](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)

---

## 💡 Demo Credentials

For quick testing, you can create a test account or use:

**Note**: Create your own account for full experience!

---

## 🚀 Next Steps

After reviewing locally:

1. **Deploy to Vercel**: See [DEPLOYMENT.md](DEPLOYMENT.md)
2. **Add Custom Domain**: Configure in Vercel
3. **Enable Stripe Live Mode**: Switch to production keys
4. **Set Up Monitoring**: Add error tracking
5. **Configure Analytics**: Add Google Analytics

---

## 📞 Contact

**Elmoudden Lhoussaine**
- GitHub: [@Elmouddenlhoussen](https://github.com/Elmouddenlhoussen)
- Portfolio: [Your Portfolio URL]
- Email: [Your Email]

---

## ⭐ Show Your Support

If you like this project:
- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest features
- 🤝 Contribute code

---

<div align="center">
  <h3>Built with ❤️ by Elmoudden Lhoussaine</h3>
  <p>23-year-old Moroccan Full-Stack Developer</p>
  <p>Passionate about building scalable SaaS applications</p>
</div>
