import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { AppStoreProvider } from '@/components/store/app-store'
import { AuthStoreProvider } from '@/components/store/auth-store'
import { ToastHost } from '@/components/store/toast-host'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'EarnFusion — Earn Rewards Dashboard',
  description:
    'EarnFusion is a premium rewards platform. Play games, watch videos, complete assignments and withdraw your earnings in PKR.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d1024',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${plusJakarta.variable}`}>
      <body className="bg-background font-sans antialiased">
        <AuthStoreProvider>
          <AppStoreProvider>
            {children}
            <ToastHost />
          </AppStoreProvider>
        </AuthStoreProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
