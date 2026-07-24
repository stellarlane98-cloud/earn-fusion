'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Filter, Download, TrendingUp, TrendingDown } from 'lucide-react'
import { AppShell } from '@/components/dashboard/app-shell'
import { useApp } from '@/components/store/app-store'
import { formatPKR } from '@/lib/currency'

export default function TransactionsPage() {
  const { activities } = useApp()
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')

  const filtered = useMemo(() => {
    if (filter === 'income') {
      return activities.filter((a) => ['game', 'video', 'assignment', 'deposit'].includes(a.kind))
    }
    if (filter === 'expense') {
      return activities.filter((a) => a.kind === 'withdraw')
    }
    return activities
  }, [activities, filter])

  const stats = useMemo(() => {
    const income = filtered
      .filter((a) => ['game', 'video', 'assignment', 'deposit'].includes(a.kind))
      .reduce((sum, a) => sum + a.reward, 0)
    const expense = filtered
      .filter((a) => a.kind === 'withdraw')
      .reduce((sum, a) => sum + Math.abs(a.reward), 0)
    const net = income - expense
    return { income, expense, net }
  }, [filtered])

  return (
    <AppShell
      title="Transactions"
      subtitle="View detailed transaction history and export records."
    >
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-white/10 bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Income</p>
                <p className="mt-1 text-2xl font-black text-[#4ade80]">{formatPKR(stats.income)}</p>
              </div>
              <TrendingUp className="size-6 text-[#4ade80]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Expense</p>
                <p className="mt-1 text-2xl font-black text-[#ff6b8a]">{formatPKR(stats.expense)}</p>
              </div>
              <TrendingDown className="size-6 text-[#ff6b8a]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#6d3bf5]/20 to-[#a855f7]/5 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Net Balance</p>
                <p className={`mt-1 text-2xl font-black ${stats.net >= 0 ? 'text-[#a855f7]' : 'text-[#ff6b8a]'}`}>
                  {formatPKR(stats.net)}
                </p>
              </div>
              <Calendar className="size-6 text-muted-foreground" />
            </div>
          </motion.div>
        </div>

        {/* Filter & Export */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-muted-foreground" />
            <div className="flex gap-2">
              {(['all', 'income', 'expense'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    filter === f
                      ? 'border-[#7c4dff] bg-[#7c4dff]/15 text-white'
                      : 'border-white/10 bg-white/5 text-muted-foreground hover:text-white'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-muted-foreground transition hover:text-white">
            <Download className="size-4" />
            Export CSV
          </button>
        </motion.div>

        {/* Transaction List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl border border-white/10 bg-card p-6"
        >
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">No transactions found</p>
            ) : (
              filtered.map((activity) => {
                const isIncome = ['game', 'video', 'assignment', 'deposit'].includes(
                  activity.kind,
                )
                const Icon = isIncome ? TrendingUp : TrendingDown
                const color = isIncome ? 'text-[#4ade80]' : 'text-[#ff6b8a]'
                const bgColor = isIncome ? 'bg-[#22c55e]/10' : 'bg-[#ff6b8a]/10'

                return (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex size-10 items-center justify-center rounded-lg ${bgColor}`}>
                        <Icon className={`size-5 ${color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <p className={`text-sm font-bold ${color}`}>
                      {isIncome ? '+' : '−'}{formatPKR(Math.abs(activity.reward))}
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
