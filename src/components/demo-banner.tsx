'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-b border-slate-800 dark:border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-xs sm:text-sm font-medium">
                <span className="hidden sm:inline">Portfolio Demo • </span>
                Built by{' '}
                <a 
                  href="https://github.com/Elmouddenlhoussen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:no-underline font-semibold"
                >
                  Elmoudden Lhoussaine
                </a>
              </span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors flex-shrink-0"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
