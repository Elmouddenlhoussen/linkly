# 🛠️ Setup Instructions

Complete setup guide for Linkly - from zero to running locally.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js 18+** installed ([Download](https://nodejs.org/))
- ✅ **PostgreSQL** installed ([Download](https://www.postgresql.org/download/))
- ✅ **Git** installed ([Download](https://git-scm.com/))
- ✅ **Code Editor** (VS Code recommended)
- ✅ **Terminal** access

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Clone & Install

```bash
# Navigate to the linkly directory
cd linkly

# Install dependencies
npm install
```

### Step 2: Database Setup

**Option A: Local PostgreSQL**
```bash
# Create database
createdb linkly

# Or using psql
psql -U postgres
CREATE DATABASE linkly;
\q
```

**Option B: Free Cloud Database**

Choose one:
- [Supabase](https://supabase.com) - Click "New Project" → Copy connection string
- [Neon](https://neon.tech) - Sign up → Create project → Copy connection string
- [Railway](https://railway.app) - New project → Add PostgreSQL → Copy connection string

### Step 3: Environment Variables

```bash
# Copy example file
cp .env.example .env
```

Edit `.env` with your values:

```env
# Required for basic functionality
DATABASE_URL="postgresql://user:password@localhost:5432/linkly"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional for full functionality
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRO_PRICE_ID="price_..."
```

**Generate NEXTAUTH_SECRET:**
```bash
# On Mac/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### Step 4: Initialize Database

```bash
# Push schema to database
npm run db:push

# Verify with Prisma Studio (optional)
npm run db:studio
```

### Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔧 Detailed Setup

### 1. Node.js Installation

**Check if installed:**
```bash
node --version  # Should be 18.0.0 or higher
npm --version
```

**Install if needed:**
- Download from [nodejs.org](https://nodejs.org/)
- Or use nvm: `nvm install 18`

### 2. PostgreSQL Installation

**Mac:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Windows:**
- Download installer from [postgresql.org](https://www.postgresql.org/download/windows/)
- Run installer
- Remember your password!

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Verify installation:**
```bash
psql --version
```

### 3. Create Database

**Using createdb:**
```bash
createdb linkly
```

**Using psql:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE linkly;

# Create user (optional)
CREATE USER linkly_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE linkly TO linkly_user;

# Exit
\q
```

**Get connection string:**
```
postgresql://username:password@localhost:5432/linkly
```

### 4. Environment Configuration

**Required Variables:**

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@localhost:5432/linkly` |
| `NEXTAUTH_URL` | App URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Random secret | Generate with openssl |
| `NEXT_PUBLIC_APP_URL` | Public app URL | `http://localhost:3000` |

**Optional Variables (for Stripe):**

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `STRIPE_SECRET_KEY` | Stripe secret key | Dashboard → API keys |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key | Dashboard → API keys |
| `STRIPE_WEBHOOK_SECRET` | Webhook secret | Dashboard → Webhooks |
| `STRIPE_PRO_PRICE_ID` | Pro plan price ID | Dashboard → Products |

### 5. Stripe Setup (Optional)

**Create Stripe Account:**
1. Go to [stripe.com](https://stripe.com)
2. Sign up for free
3. Activate test mode

**Get API Keys:**
1. Dashboard → Developers → API keys
2. Copy "Publishable key" (starts with `pk_test_`)
3. Copy "Secret key" (starts with `sk_test_`)

**Create Product:**
1. Dashboard → Products → Add product
2. Name: "Linkly Pro"
3. Description: "Unlimited links and analytics"
4. Price: $9.00 USD
5. Billing period: Monthly
6. Save product
7. Copy Price ID (starts with `price_`)

**Setup Webhook (for local testing):**
1. Install Stripe CLI: [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Login: `stripe login`
3. Forward events: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
4. Copy webhook secret (starts with `whsec_`)

---

## 🧪 Verify Setup

### 1. Check Dependencies

```bash
npm list --depth=0
```

Should show all packages installed.

### 2. Check Database Connection

```bash
npm run db:studio
```

Should open Prisma Studio at [http://localhost:5555](http://localhost:5555)

### 3. Check TypeScript

```bash
npx tsc --noEmit
```

Should show no errors.

### 4. Check Linting

```bash
npm run lint
```

Should show no errors.

### 5. Check Build

```bash
npm run build
```

Should build successfully.

---

## 🎯 Test the Application

### 1. Create Account

1. Go to [http://localhost:3000](http://localhost:3000)
2. Click "Get Started"
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. Click "Create account"
5. Should redirect to login

### 2. Login

1. Enter email and password
2. Click "Sign in"
3. Should redirect to dashboard

### 3. Create Link

1. Click "New Link"
2. Enter URL: `https://github.com/Elmouddenlhoussen`
3. Enter title: "My GitHub"
4. Click "Create Link"
5. Should see new link in dashboard

### 4. Test Redirect

1. Copy short link
2. Open in new tab
3. Should redirect to GitHub

### 5. Check Analytics

1. Go to Analytics page
2. Should see click data
3. Should see charts

### 6. Test Dark Mode

1. Click theme toggle
2. Should switch to dark mode
3. All pages should update

---

## 🐛 Troubleshooting

### Database Connection Error

**Error:** `Can't reach database server`

**Solutions:**
```bash
# Check PostgreSQL is running
# Mac
brew services list

# Linux
sudo systemctl status postgresql

# Windows
# Check Services app

# Restart PostgreSQL
# Mac
brew services restart postgresql

# Linux
sudo systemctl restart postgresql
```

### Prisma Client Error

**Error:** `@prisma/client did not initialize yet`

**Solution:**
```bash
npx prisma generate
npm run dev
```

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solutions:**
```bash
# Use different port
npm run dev -- -p 3001

# Or kill process using port 3000
# Mac/Linux
lsof -ti:3000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Environment Variables Not Loading

**Error:** `process.env.DATABASE_URL is undefined`

**Solutions:**
1. Check `.env` file exists
2. Check variable names match exactly
3. Restart development server
4. Check for typos in `.env`

### Build Errors

**Error:** Various TypeScript errors

**Solutions:**
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Stripe Webhook Error

**Error:** `Webhook signature verification failed`

**Solutions:**
1. Check `STRIPE_WEBHOOK_SECRET` is correct
2. Use Stripe CLI for local testing
3. Check webhook URL matches

---

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Tools
- [Prisma Studio](https://www.prisma.io/studio) - Database GUI
- [Stripe CLI](https://stripe.com/docs/stripe-cli) - Stripe testing
- [Postman](https://www.postman.com/) - API testing
- [VS Code](https://code.visualstudio.com/) - Code editor

### VS Code Extensions (Recommended)
- Prisma
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- GitLens

---

## 🎓 Learning Path

### For Beginners

1. **Learn the Basics:**
   - JavaScript/TypeScript
   - React fundamentals
   - Next.js basics

2. **Explore the Code:**
   - Start with `src/app/page.tsx`
   - Look at components in `src/components/`
   - Check API routes in `src/app/api/`

3. **Make Changes:**
   - Change colors in `tailwind.config.ts`
   - Modify text in pages
   - Add new features

### For Advanced Users

1. **Architecture:**
   - Study the folder structure
   - Understand Server/Client Components
   - Review API design

2. **Database:**
   - Explore Prisma schema
   - Learn about relations
   - Optimize queries

3. **Deployment:**
   - Deploy to Vercel
   - Set up production database
   - Configure Stripe live mode

---

## ✅ Setup Complete!

You should now have:
- ✅ Linkly running locally
- ✅ Database connected
- ✅ Authentication working
- ✅ Links creating and redirecting
- ✅ Analytics tracking
- ✅ Dark mode working

---

## 🚀 Next Steps

1. **Explore Features:**
   - Create multiple links
   - Check analytics
   - Test on mobile
   - Try dark mode

2. **Customize:**
   - Change brand colors
   - Modify landing page
   - Add your own features

3. **Deploy:**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md)
   - Deploy to Vercel
   - Add custom domain

4. **Learn:**
   - Read the code
   - Understand patterns
   - Build new features

---

## 📞 Need Help?

- 📖 Check [README.md](README.md)
- 🚀 See [QUICKSTART.md](QUICKSTART.md)
- 🐛 Open an issue on GitHub
- 💬 Contact [@Elmouddenlhoussen](https://github.com/Elmouddenlhoussen)

---

<div align="center">
  <h3>Happy Coding! 🎉</h3>
  <p>Built with ❤️ by Elmoudden Lhoussaine</p>
</div>
