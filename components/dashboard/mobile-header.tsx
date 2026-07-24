'use client'

import Link from 'next/link'
import { Bell, Menu } from 'lucide-react'
import { useApp } from '@/components/store/app-store'
import { useAuth } from '@/components/store/auth-store'

export function MobileHeader({ onMenu }: { onMenu: () => void }) {
  const { unreadCount } = useApp()
  const { user } = useAuth()

  return (
    <header className="flex items-center justify-between px-5 pb-2 pt-4 lg:hidden">
      <div className="flex items-center gap-3">
        <button
          aria-label="Open menu"
          onClick={onMenu}
          className="rounded-lg p-1 text-white transition-colors hover:text-white/80"
        >
          <Menu className="size-6" />
        </button>
        <div className="leading-tight">
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <p className="text-lg font-bold text-white">{user?.name || 'User'}</p>
        </div>
      </div>
      <Link
        href="/notifications"
        aria-label="Notifications"
        className="relative rounded-xl border border-white/10 bg-card/70 p-2.5 text-white"
      >
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#ff3b6b] text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </Link>
    </header>
  )
}
