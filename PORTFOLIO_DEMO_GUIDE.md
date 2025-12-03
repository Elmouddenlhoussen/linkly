# Linkly - Portfolio Demo Guide

This guide will help you deploy Linkly as a portfolio demo project. Linkly is a production-ready SaaS link shortener with analytics, authentication, and Stripe payment integration.

## Features Included

- ✅ Link shortening with custom slugs
- ✅ Real-time analytics dashboard
- ✅ QR code generation
- ✅ User authentication (NextAuth.js)
- ✅ Responsive design (mobile-friendly)
- ✅ Dark mode support
- ✅ Stripe payment integration
- ✅ Team collaboration features
- ✅ API rate limiting
- ✅ SEO optimized

## Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (or use SQLite for development)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd linkly
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env` and fill in the required values:
   ```bash
   cp .env.example .env
   ```

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Build for production:**
   ```bash
   npm run build
   npm start
   # or
   yarn build
   yarn start
   ```

## Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy!

### Other Platforms
- Netlify
- Heroku
- DigitalOcean App Platform

## Customization for Portfolio

To customize this project for your portfolio:

1. **Update branding:**
   - Modify logo in `src/components/logo.tsx`
   - Update site title in `src/app/layout.tsx`
   - Change colors in `tailwind.config.ts`

2. **Update footer credits:**
   - Edit `src/app/page.tsx` footer section
   - Update GitHub link to your profile

3. **Add your information:**
   - Update README.md with your details
   - Modify meta tags in `src/app/layout.tsx`

## Screenshots for Portfolio

Include screenshots of:
1. Landing page
2. Dashboard analytics
3. Link management
4. Mobile responsive views

## Technologies Used

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth.js
- Stripe
- Framer Motion
- Recharts

## Support

For any questions or issues, please open an issue on the GitHub repository.

Built with ❤️ by [Elmoudden Lhoussaine](https://github.com/Elmouddenlhoussen)