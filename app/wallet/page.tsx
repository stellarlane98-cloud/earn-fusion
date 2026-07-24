'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, TrendingDown, Calendar, Filter } from 'lucide-react'
import { AppShell } from '@/components/dashboard/app-shell'
import { useApp } from '@/components/store/app-store'
import { formatPKR } from '@/lib/currency'

export default function WalletPage() {
  const { balance, totalEarned, activities } = useApp()

  const stats = useMemo(() => {
    const earned = activities
      .filter((a) => ['game', 'video', 'assignment', 'deposit'].includes(a.kind))
      .reduce((sum, a) => sum + a.reward, 0)
    const withdrawn = activities
      .filter((a) => a.kind === 'withdraw')
      .reduce((sum, a) => sum + Math.abs(a.reward), 0)
    return { earned, withdrawn }
  }, [activities])

  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <AppShell
      title="Wallet"
      subtitle="Manage your balance and transaction history."
    >
      <div className="space-y-6">
        {/* Balance Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <motion.div
            initial={containerVariants.initial}
            animate={containerVariants.animate}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#6d3bf5]/20 to-[#a855f7]/5 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="mt-2 text-3xl font-black text-white">{formatPKR(balance)}</p>
              </div>
              <div className="flex size-14 items-center justify-center rounded-2xl bg-[#6d3bf5]/20 text-[#a855f7]">
                <Wallet className="size-7" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={containerVariants.initial}
            animate={containerVariants.animate}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#22c55e]/20 to-[#4ade80]/5 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="mt-2 text-3xl font-black text-[#4ade80]">{formatPKR(stats.earned)}</p>
              </div>
              <div className="flex size-14 items-center justify-center rounded-2xl bg-[#22c55e]/20 text-[#4ade80]">
                <TrendingUp className="size-7" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={containerVariants.initial}
            animate={containerVariants.animate}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#f59e0b]/20 to-[#fbbf24]/5 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Withdrawn</p>
                <p className="mt-2 text-3xl font-black text-[#fbbf24]">{formatPKR(stats.withdrawn)}</p>
              </div>
              <div className="flex size-14 items-center justify-center rounded-2xl bg-[#f59e0b]/20 text-[#fbbf24]">
                <TrendingDown className="size-7" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Transaction History */}
        <motion.div
          initial={containerVariants.initial}
          animate={containerVariants.animate}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-card p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-muted-foreground" />
              <h2 className="text-lg font-bold text-white">Transaction History</h2>
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-muted-foreground transition hover:text-white">
              <Filter className="size-4" />
              Filter
            </button>
          </div>

          <div className="space-y-3">
            {activities.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">No transactions yet</p>
            ) : (
              activities.map((activity) => {
                const isEarning = ['game', 'video', 'assignment', 'deposit'].includes(
                  activity.kind,
                )
                const Icon = isEarning ? TrendingUp : TrendingDown
                const color = isEarning ? 'text-[#4ade80]' : 'text-[#ff6b8a]'
                const bgColor = isEarning ? 'bg-[#22c55e]/10' : 'bg-[#ff6b8a]/10'

                return (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-white/10 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`flex size-10 items-center justify-center rounded-lg ${bgColor}`}>
                        <Icon className={`size-5 ${color}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <p className={`whitespace-nowrap text-sm font-bold ${color}`}>
                      {isEarning ? '+' : '−'}{formatPKR(Math.abs(activity.reward))}
                    </p>
                  </div>
                )
              })
            )}
          </div>
        </motion.div>
      </div>
    </AppShell>
  )
}
