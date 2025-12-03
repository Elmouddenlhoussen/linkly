'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import { Sun, Moon, Monitor } from 'lucide-react'
import toast from 'react-hot-toast'
import { ProfilePictureUpload } from '@/components/profile-picture-upload'

export default function SettingsPage() {
  const { data: session, update } = useSession()
  const { theme, setTheme } = useTheme()
  const [name, setName] = useState(session?.user?.name || '')
  const [image, setImage] = useState(session?.user?.image || '')
  const [loading, setLoading] = useState(false)

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, image }),
      })

      if (!res.ok) throw new Error('Failed to update profile')

      await update({ name, image })
      toast.success('Profile updated!')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpdate = (imageUrl: string) => {
    setImage(imageUrl)
  }

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ]

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account settings</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <ProfilePictureUpload 
                currentImage={session?.user?.image} 
                onImageUpdate={handleImageUpdate} 
              />
              
              <div className="flex-1 space-y-4">
                <Input
                  id="name"
                  label="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  value={session?.user?.email || ''}
                  disabled
                  className="bg-gray-50 dark:bg-gray-800"
                />
              </div>
            </div>
            
            <Button type="submit" loading={loading}>
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Choose how Linkly looks to you
          </p>
          <div className="flex gap-3">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value as any)}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                  theme === t.value
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <t.icon className={`w-6 h-6 ${theme === t.value ? 'text-brand-600' : 'text-gray-500'}`} />
                <span className={`text-sm font-medium ${theme === t.value ? 'text-brand-600' : 'text-gray-700 dark:text-gray-300'}`}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button
            variant="danger"
            onClick={() => {
              if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                toast.error('Account deletion is disabled in demo mode')
              }
            }}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}