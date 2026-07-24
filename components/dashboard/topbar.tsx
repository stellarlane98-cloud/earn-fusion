'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Bell, ChevronDown, Moon, Search } from 'lucide-react'
import { useApp } from '@/components/store/app-store'
import { useAuth } from '@/components/store/auth-store'

export function Topbar() {
  const { unreadCount } = useApp()
  const { user } = useAuth()

  return (
    <header className="hidden items-center gap-4 px-8 py-5 lg:flex">
      <div className="relative flex-1 max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search anything..."
          aria-label="Search"
          className="w-full rounded-xl border border-white/10 bg-card/70 py-2.5 pl-10 pr-14 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#7c4dff]/50 focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/20"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          ctrl K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          aria-label="Toggle theme"
          className="rounded-xl border border-white/10 bg-card/70 p-2.5 text-muted-foreground transition-colors hover:text-white"
        >
          <Moon className="size-5" />
        </button>

        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative rounded-xl border border-white/10 bg-card/70 p-2.5 text-muted-foreground transition-colors hover:text-white"
        >
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#ff3b6b] text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-card/70 py-1.5 pl-1.5 pr-3 transition-colors hover:border-white/20"
        >
          <Image
            src="/assets/avatar.png"
            alt={user?.name || 'User'}
            width={36}
            height={36}
            className="size-9 rounded-lg object-cover"
          />
          <span className="text-left leading-tight">
            <span className="block text-sm font-semibold text-white">
              {user?.name || 'User'}
            </span>
            <span className="block text-xs text-muted-foreground">Level 12</span>
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Link>
      </div>
    </header>
  )
}
