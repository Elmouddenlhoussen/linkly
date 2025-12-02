import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { CustomCursor } from '@/components/custom-cursor'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'Linkly - Smart Link Shortener',
  description: 'Create short links with powerful analytics. Track clicks, locations, devices, and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <CustomCursor />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800',
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
