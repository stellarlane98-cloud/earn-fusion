'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Gamepad2,
  Video,
  ClipboardList,
  ArrowDownToLine,
  ArrowUpFromLine,
  type LucideIcon,
} from 'lucide-react'
import { useApp, type Activity } from '@/components/store/app-store'
import { formatPKR } from '@/lib/currency'

const meta: Record<Activity['kind'], { icon: LucideIcon; color: string }> = {
  game: { icon: Gamepad2, color: 'text-[#7c4dff] bg-[#7c4dff]/15' },
  video: { icon: Video, color: 'text-[#2b7fff] bg-[#2b7fff]/15' },
  assignment: { icon: ClipboardList, color: 'text-[#22c55e] bg-[#22c55e]/15' },
  deposit: { icon: ArrowDownToLine, color: 'text-[#f59e0b] bg-[#f59e0b]/15' },
  withdraw: { icon: ArrowUpFromLine, color: 'text-[#ff6b8a] bg-[#ff3b6b]/15' },
}

export function RecentActivity() {
  const { activities } = useApp()

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Recent Activity</h3>
        <Link
          href="/transactions"
          className="text-xs font-semibold text-[#7c4dff] hover:underline"
        >
          View All
        </Link>
      </div>
      <ul className="mt-4 flex flex-col gap-1">
        {activities.slice(0, 5).map((item, i) => {
          const m = meta[item.kind]
          const positive = item.reward >= 0
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 rounded-xl px-1.5 py-2 transition-colors hover:bg-white/[0.03]"
            >
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${m.color}`}
              >
                <m.icon className="size-[18px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {item.title}
                </p>
                <p
                  className={`text-xs font-medium ${positive ? 'text-[#22c55e]' : 'text-[#ff6b8a]'}`}
                >
                  {positive ? '+' : '-'}
                  {formatPKR(Math.abs(item.reward))}
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {item.time}
              </span>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
