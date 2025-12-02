'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CreateLinkButton } from '@/components/dashboard/create-link-button'
import { Search, Copy, ExternalLink, Trash2, QrCode, MoreVertical, ToggleLeft, ToggleRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'
import QRCode from 'qrcode'

interface Link {
  id: string
  shortCode: string
  originalUrl: string
  title: string | null
  clicks: number
  isActive: boolean
  createdAt: string
}

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const fetchLinks = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/links?page=${page}&search=${search}`)
      const data = await res.json()
      setLinks(data.links)
      setTotalPages(data.pagination.pages)
    } catch (error) {
      toast.error('Failed to load links')
    } finally {
      setLoading(false)
    }
  }, [page, search])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  const copyToClipboard = (shortCode: string) => {
    navigator.clipboard.writeText(`${baseUrl}/${shortCode}`)
    toast.success('Copied to clipboard!')
  }

  const downloadQR = async (shortCode: string) => {
    try {
      const url = await QRCode.toDataURL(`${baseUrl}/${shortCode}`, { width: 400, margin: 2 })
      const link = document.createElement('a')
      link.download = `qr-${shortCode}.png`
      link.href = url
      link.click()
      toast.success('QR code downloaded!')
    } catch (error) {
      toast.error('Failed to generate QR code')
    }
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      await fetch(`/api/links/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      })
      fetchLinks()
      toast.success(isActive ? 'Link disabled' : 'Link enabled')
    } catch (error) {
      toast.error('Failed to update link')
    }
  }

  const deleteLink = async (id: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return
    try {
      await fetch(`/api/links/${id}`, { method: 'DELETE' })
      fetchLinks()
      toast.success('Link deleted')
    } catch (error) {
      toast.error('Failed to delete link')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Links</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all your shortened links</p>
        </div>
        <CreateLinkButton />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search links..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          className="pl-10"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-6 h-6 border-2 border-brand-600 border-t-transparent rounded-full" />
            </div>
          ) : links.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              {search ? 'No links found matching your search' : 'No links yet. Create your first one!'}
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {links.map((link) => (
                <div key={link.id} className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {link.title || 'Untitled'}
                        </p>
                        {!link.isActive && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
                            Disabled
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">{link.originalUrl}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
                          {baseUrl.replace(/https?:\/\//, '')}/{link.shortCode}
                        </span>
                        <span className="text-sm text-gray-500">{link.clicks} clicks</span>
                        <span className="text-xs text-gray-400">
                          {formatDistanceToNow(new Date(link.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(link.shortCode)} title="Copy">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => downloadQR(link.shortCode)} title="QR Code">
                        <QrCode className="w-4 h-4" />
                      </Button>
                      <a href={`${baseUrl}/${link.shortCode}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" title="Open">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                      <Button variant="ghost" size="sm" onClick={() => toggleActive(link.id, link.isActive)} title={link.isActive ? 'Disable' : 'Enable'}>
                        {link.isActive ? <ToggleRight className="w-4 h-4 text-green-500" /> : <ToggleLeft className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteLink(link.id)} title="Delete">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="secondary" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {page} of {totalPages}
          </span>
          <Button variant="secondary" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
