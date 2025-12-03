'use client'

import { useState, useRef } from 'react'
import { Camera, Upload, X } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface ProfilePictureUploadProps {
  currentImage?: string | null
  onImageUpdate: (imageUrl: string) => void
}

export function ProfilePictureUpload({ currentImage, onImageUpdate }: ProfilePictureUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    setIsUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image')
      }

      onImageUpdate(data.url)
      toast.success('Profile picture updated!')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload image')
      setPreviewUrl(currentImage || null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    onImageUpdate('')
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 flex items-center justify-center overflow-hidden">
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {currentImage?.charAt(0) || 'U'}
            </span>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700"
          disabled={isUploading}
        >
          {isUploading ? (
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          ) : previewUrl ? (
            <Camera className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <Upload className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
        </motion.button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />

      {previewUrl && (
        <button
          type="button"
          onClick={handleRemoveImage}
          className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          Remove photo
        </button>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        JPG, PNG or GIF (max. 5MB)
      </p>
    </div>
  )
}