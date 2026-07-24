'use client'

import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { DesktopSidebar, MobileSidebar } from './sidebar'
import { Topbar } from './topbar'
import { MobileHeader } from './mobile-header'
import { BottomNav } from './bottom-nav'
import { footerLinks } from '@/lib/dashboard-data'
import Link from 'next/link'

export function AppShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode
  title?: string
  subtitle?: string
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="flex min-h-screen bg-background">
        <DesktopSidebar />
        <MobileSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <MobileHeader onMenu={() => setMenuOpen(true)} />

          <main className="flex-1 px-5 pb-28 pt-2 lg:px-8 lg:pb-8 lg:pt-0">
            {title && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6 hidden lg:block"
              >
                <h1 className="text-2xl font-bold text-balance text-white">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
                )}
              </motion.div>
            )}

            {title && (
              <div className="mb-5 mt-2 lg:hidden">
                <h1 className="text-xl font-bold text-white">{title}</h1>
                {subtitle && (
                  <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
                )}
              </div>
            )}

            {children}

            <footer className="mt-10 hidden items-center justify-between border-t border-white/5 pt-6 text-sm text-muted-foreground lg:flex">
              <p>© 2024 EarnFusion. All rights reserved.</p>
              <div className="flex gap-6">
                {footerLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </footer>
          </main>
        </div>
      </div>

      <BottomNav />
    </>
  )
}
