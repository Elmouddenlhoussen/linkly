'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart2, Zap, Shield, Globe2, QrCode, Users, TrendingUp, Check } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Logo } from '@/components/logo'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Demo Banner */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-b border-slate-800 dark:border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5 text-center text-sm">
          <span className="font-medium">Portfolio Demo</span>
          <span className="mx-2 opacity-70">•</span>
          <span>Built by </span>
          <a 
            href="https://github.com/Elmouddenlhoussen" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold underline hover:no-underline"
          >
            Elmoudden Lhoussaine
          </a>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="shadow-lg shadow-teal-500/30"
              >
                <Logo />
              </motion.div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">Linkly</span>
            </Link>
            <div className="flex items-center gap-6">
              <ThemeToggle />
              <Link href="/login" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm font-medium transition-colors">
                Sign in
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/register"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transition-all"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4 overflow-hidden scroll-mt-16">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.1),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(251,191,36,0.08),transparent_50%)]"></div>
        
        {/* Floating particles */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-2 h-2 bg-teal-400 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-40 right-20 w-3 h-3 bg-amber-400 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 right-10 w-2 h-2 bg-rose-400 rounded-full blur-sm"
        />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-sm font-medium text-teal-700 dark:text-teal-300 mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                Production-ready platform
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                Short links,
                <br />
                <span className="text-teal-600 dark:text-teal-400">big insights</span>
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Transform long URLs into powerful marketing tools. Track every click, understand your audience, and optimize your campaigns.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/register"
                    className="group inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/40"
                  >
                    Start for free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-semibold hover:border-teal-300 dark:hover:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-all"
                  >
                    View pricing
                  </Link>
                </motion.div>
              </div>

              <div className="mt-12 flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">99.9%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Uptime</div>
                </div>
                <div className="w-px h-12 bg-slate-200 dark:bg-slate-800"></div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">&lt;50ms</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Redirects</div>
                </div>
                <div className="w-px h-12 bg-slate-200 dark:bg-slate-800"></div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">Real-time</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Analytics</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                        <BarChart2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">Total Clicks</div>
                        <div className="text-xs text-slate-500">Last 30 days</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">12.4K</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                        <Globe2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">Countries</div>
                        <div className="text-xs text-slate-500">Worldwide reach</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">47</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">Growth</div>
                        <div className="text-xs text-slate-500">vs last month</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">+24%</div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 top-8 right-8 w-full h-full bg-teal-100 dark:bg-teal-900/20 rounded-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Professional link management with enterprise-grade features
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: BarChart2,
                title: 'Advanced Analytics',
                description: 'Track clicks, locations, devices, and referrers in real-time',
                color: 'teal'
              },
              {
                icon: QrCode,
                title: 'QR Code Generator',
                description: 'Create scannable QR codes for offline marketing campaigns',
                color: 'amber'
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Sub-50ms redirects powered by global edge network',
                color: 'rose'
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'Enterprise-grade security with 99.9% uptime SLA',
                color: 'emerald'
              },
              {
                icon: Globe2,
                title: 'Global Reach',
                description: 'Track geographic data from visitors worldwide',
                color: 'indigo'
              },
              {
                icon: Users,
                title: 'Team Ready',
                description: 'Collaborate with your team on link campaigns',
                color: 'violet'
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-800 transition-all duration-300 hover:shadow-xl"
              >
                <div className={`w-12 h-12 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600 dark:text-${feature.color}-400`} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How it works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create your link', desc: 'Paste any long URL and get a short link instantly' },
              { step: '02', title: 'Share anywhere', desc: 'Use your short link in campaigns, social media, or print' },
              { step: '03', title: 'Track performance', desc: 'Monitor clicks and analyze your audience in real-time' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-teal-100 dark:text-teal-900/30 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-teal-200 dark:bg-teal-800"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Start free, upgrade when you need more
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800"
            >
              <div className="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-2">Free</div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-4">$0<span className="text-lg text-slate-500">/month</span></div>
              <ul className="space-y-3 mb-8">
                {['10 links per month', 'Basic analytics', 'QR codes', '7 days data retention'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Check className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="block text-center bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                Get started
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-teal-600 dark:bg-teal-700 p-8 rounded-3xl border-2 border-teal-500 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">Popular</div>
              <div className="text-sm font-semibold text-teal-100 mb-2">Pro</div>
              <div className="text-4xl font-bold text-white mb-4">$9<span className="text-lg text-teal-100">/month</span></div>
              <ul className="space-y-3 mb-8">
                {['Unlimited links', 'Advanced analytics', 'Custom slugs', 'Unlimited data retention', 'Priority support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-white">
                    <Check className="w-5 h-5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="block text-center bg-white text-teal-600 px-6 py-3 rounded-xl font-semibold hover:bg-teal-50 transition-colors">
                Upgrade to Pro
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-slate-900 dark:bg-white rounded-3xl p-12 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.1),transparent_70%)]"></div>
            <div className="relative">
              <h2 className="text-4xl font-bold text-white dark:text-slate-900 mb-4">
                Ready to shorten your first link?
              </h2>
              <p className="text-lg text-slate-300 dark:text-slate-600 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust Linkly for their link management needs
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-xl"
                >
                  Start for free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Logo className="w-8 h-8" />
              <span className="font-bold text-slate-900 dark:text-white">Linkly</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Built by{' '}
              <a href="https://github.com/Elmouddenlhoussen" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Elmoudden Lhoussaine
              </a>
              {' '}• Full-Stack Developer
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
