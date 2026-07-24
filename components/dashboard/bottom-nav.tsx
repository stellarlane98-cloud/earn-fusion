'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClipboardList, Gamepad2, Home, Plus, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Games', icon: Gamepad2, href: '/games' },
  { label: 'Tasks', icon: ClipboardList, href: '/assignments' },
  { label: 'Profile', icon: User, href: '/settings' },
]

export function BottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-sidebar/90 backdrop-blur-lg lg:hidden">
      <div className="relative mx-auto grid max-w-lg grid-cols-5 items-center px-2 py-2.5">
        {items.slice(0, 2).map((item) => (
          <NavButton key={item.label} item={item} active={isActive(item.href)} />
        ))}

        <div className="flex justify-center">
          <Link
            href="/deposit"
            aria-label="Deposit funds"
            className="flex size-14 -translate-y-4 items-center justify-center rounded-full bg-gradient-to-br from-[#6d3bf5] to-[#8b5cf6] text-white shadow-lg shadow-[#6d3bf5]/50 transition-transform active:scale-90"
          >
            <Plus className="size-6" />
          </Link>
        </div>

        {items.slice(2).map((item) => (
          <NavButton key={item.label} item={item} active={isActive(item.href)} />
        ))}
      </div>
    </nav>
  )
}

function NavButton({
  item,
  active,
}: {
  item: { label: string; icon: typeof Home; href: string }
  active: boolean
}) {
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex flex-col items-center gap-1 py-1 text-[11px] font-medium transition-colors',
        active ? 'text-[#7c4dff]' : 'text-muted-foreground',
      )}
    >
      <item.icon className="size-5" />
      {item.label}
    </Link>
  )
}
