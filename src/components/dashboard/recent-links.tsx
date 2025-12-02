'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ExternalLink, Copy, MousePointerClick } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface Link {
  id: string
  shortCode: string
  originalUrl: string
  title: string | null
  clicks: number
  createdAt: Date
}

export function RecentLinks({ links }: { links: Link[] }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const copyToClipboard = (shortCode: string) => {
    navigator.clipboard.writeText(`${baseUrl}/${shortCode}`)
    toast.success('Copied to clipboard!')
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Links</CardTitle>
        <Link href="/dashboard/links" className="text-sm text-brand-600 hover:underline">
          View all
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {links.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
            No links yet. Create your first one!
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {links.map((link) => (
              <div key={link.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {link.title || link.originalUrl}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-brand-600 dark:text-brand-400">
                        {baseUrl.replace(/https?:\/\//, '')}/{link.shortCode}
                      </span>
                      <button
                        onClick={() => copyToClipboard(link.shortCode)}
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        title="Copy link"
                      >
                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                      <a
                        href={`${baseUrl}/${link.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        title="Open link"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <MousePointerClick className="w-4 h-4" />
                    {link.clicks}
                  </div>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  {formatDistanceToNow(new Date(link.createdAt), { addSuffix: true })}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
