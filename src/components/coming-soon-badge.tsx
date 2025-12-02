import { Sparkles } from 'lucide-react'

export function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-800 text-xs font-semibold text-purple-700 dark:text-purple-300">
      <Sparkles className="w-3 h-3" />
      Coming Soon
    </span>
  )
}
