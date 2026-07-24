'use client'

import { CheckCircle2, ListChecks, TrendingUp, Wallet } from 'lucide-react'
import { AnimatedCounter } from './animated-counter'
import { useApp } from '@/components/store/app-store'

export function Statistics() {
  const { totalEarned, completedTasks } = useApp()

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-5">
      <h3 className="text-lg font-bold text-white">Your Statistics</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3.5">
          <span className="mb-2 flex size-8 items-center justify-center rounded-lg bg-[#7c4dff]/15 text-[#7c4dff]">
            <Wallet className="size-4" />
          </span>
          <p className="text-xs text-muted-foreground">Total Earnings</p>
          <AnimatedCounter
            value={totalEarned}
            prefix="Rs "
            className="mt-0.5 block text-lg font-bold text-[#22c55e]"
          />
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3.5">
          <span className="mb-2 flex size-8 items-center justify-center rounded-lg bg-[#2b7fff]/15 text-[#2b7fff]">
            <ListChecks className="size-4" />
          </span>
          <p className="text-xs text-muted-foreground">Completed Tasks</p>
          <AnimatedCounter
            value={completedTasks}
            className="mt-0.5 block text-lg font-bold text-white"
          />
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3.5">
          <span className="mb-2 flex size-8 items-center justify-center rounded-lg bg-[#22c55e]/15 text-[#22c55e]">
            <CheckCircle2 className="size-4" />
          </span>
          <p className="text-xs text-muted-foreground">Withdrawal Status</p>
          <span className="mt-0.5 block text-lg font-bold text-[#22c55e]">
            Active
          </span>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3.5">
          <span className="mb-2 flex size-8 items-center justify-center rounded-lg bg-[#f59e0b]/15 text-[#f59e0b]">
            <TrendingUp className="size-4" />
          </span>
          <p className="text-xs text-muted-foreground">Rank</p>
          <span className="mt-0.5 block text-lg font-bold text-white">#12</span>
        </div>
      </div>
    </div>
  )
}
