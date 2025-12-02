'use client'

import { HelpCircle } from 'lucide-react'
import { useState } from 'react'

export function HelpButton() {
  const [showMenu, setShowMenu] = useState(false)

  const restartTour = () => {
    localStorage.removeItem('linkly_tour_completed')
    window.location.reload()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Help"
      >
        <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 py-2 z-20">
            <button
              onClick={restartTour}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              🎓 Restart Tutorial
            </button>
            <a
              href="https://github.com/Elmouddenlhoussen"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              📚 Documentation
            </a>
            <a
              href="https://github.com/Elmouddenlhoussen"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              💬 Get Support
            </a>
          </div>
        </>
      )}
    </div>
  )
}
