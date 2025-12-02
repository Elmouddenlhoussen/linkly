'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'

export function CreateLinkButton() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [customSlug, setCustomSlug] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          title: title || undefined,
          customSlug: customSlug || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create link')
      }

      toast.success('Link created!')
      setIsOpen(false)
      setUrl('')
      setTitle('')
      setCustomSlug('')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        New Link
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create new link">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="url"
            label="Destination URL"
            type="url"
            placeholder="https://example.com/very-long-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Input
            id="title"
            label="Title (optional)"
            type="text"
            placeholder="My awesome link"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            id="slug"
            label="Custom slug (optional)"
            type="text"
            placeholder="my-link"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
          />
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" loading={loading} className="flex-1">
              Create Link
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
