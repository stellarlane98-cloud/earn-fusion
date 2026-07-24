'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { PanelLeft, X } from 'lucide-react'
import { navItems } from '@/lib/dashboard-data'
import { useApp } from '@/components/store/app-store'
import { cn } from '@/lib/utils'

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-0.5 text-2xl font-extrabold tracking-tight"
    >
      <span className="text-white">Earn</span>
      <span className="text-[#7c4dff]">Fusion</span>
    </Link>
  )
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { unreadCount } = useApp()

  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
      {navItems.map((item) => {
        const isActive =
          item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
        const badge =
          item.label === 'Notifications' && unreadCount > 0
            ? unreadCount
            : item.badge
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-gradient-to-r from-[#6d3bf5] to-[#7c4dff] text-white shadow-lg shadow-[#6d3bf5]/25'
                : 'text-muted-foreground hover:bg-white/5 hover:text-white',
            )}
          >
            <item.icon className="size-[18px] shrink-0" />
            <span className="flex-1 text-left">{item.label}</span>
            {badge ? (
              <span className="flex size-5 items-center justify-center rounded-full bg-[#ff3b6b] text-[10px] font-bold text-white">
                {badge}
              </span>
            ) : isActive ? (
              <span className="text-white/80">›</span>
            ) : null}
          </Link>
        )
      })}
    </nav>
  )
}

/** Desktop persistent sidebar */
export function DesktopSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col border-r border-white/5 bg-sidebar lg:flex">
      <div className="flex items-center justify-between px-5 py-5">
        <Logo />
        <button
          aria-label="Collapse sidebar"
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
        >
          <PanelLeft className="size-5" />
        </button>
      </div>
      <NavList />
    </aside>
  )
}

/** Mobile slide-out drawer */
export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-white/10 bg-sidebar lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <Logo />
              <button
                aria-label="Close menu"
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>
            <NavList onNavigate={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
