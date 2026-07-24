'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/components/store/auth-store'
import { AppShell } from '@/components/dashboard/app-shell'
import {
  BalanceCardDesktop,
  BalanceCardMobile,
} from '@/components/dashboard/balance-card'
import {
  ExploreCardsDesktop,
  ExploreCardsMobile,
} from '@/components/dashboard/explore-cards'
import { EarningChart } from '@/components/dashboard/earning-chart'
import { LevelCard } from '@/components/dashboard/level-card'
import { Statistics } from '@/components/dashboard/statistics'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { TaskHistory } from '@/components/dashboard/task-history'
import { LoadingScreen } from '@/components/dashboard/loading-screen'

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
}

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <Link
        href={href}
        className="flex items-center gap-1 text-sm font-semibold text-[#7c4dff] transition-colors hover:text-[#a855f7]"
      >
        View All
        <ArrowRight className="size-4" />
      </Link>
    </div>
  )
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth')
    } else {
      const t = setTimeout(() => setLoading(false), 1200)
      return () => clearTimeout(t)
    }
  }, [isAuthenticated, router])

  return (
    <>
      <LoadingScreen show={loading} />

      <AppShell
        title={`Welcome back, ${user?.name || 'User'}`}
        subtitle="Complete tasks, earn rewards and withdraw your earnings in PKR."
      >
        {/* ---------- Desktop layout ---------- */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
            <div className="flex flex-col gap-6">
              <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.05 }}>
                <BalanceCardDesktop />
              </motion.div>

              <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
                <SectionHeader title="Explore & Earn" href="/games" />
                <ExploreCardsDesktop />
              </motion.div>

              <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
                <EarningChart />
              </motion.div>
            </div>

            <div className="flex flex-col gap-6">
              <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
                <LevelCard />
              </motion.div>
              <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
                <Statistics />
              </motion.div>
              <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
                <TaskHistory />
              </motion.div>
              <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.25 }}>
                <RecentActivity />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ---------- Mobile layout ---------- */}
        <div className="lg:hidden">
          <motion.div {...fadeUp} transition={{ duration: 0.4, delay: 0.05 }}>
            <BalanceCardMobile />
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6"
          >
            <SectionHeader title="Main Sections" href="/games" />
            <ExploreCardsMobile />
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-6"
          >
            <Statistics />
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-6"
          >
            <TaskHistory />
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-6"
          >
            <RecentActivity />
          </motion.div>
        </div>
      </AppShell>
    </>
  )
}
