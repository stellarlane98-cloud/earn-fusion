'use client'

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

export function LevelCard() {
  const progress = (2350 / 3000) * 100

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-5">
      <div className="flex items-center gap-4">
        <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6d3bf5] to-[#a855f7] text-white shadow-lg shadow-[#6d3bf5]/30">
          <Award className="size-6" />
        </span>
        <div className="flex-1">
          <p className="text-lg font-bold text-white">Level 12</p>
          <p className="text-xs text-muted-foreground">
            Next Level in <span className="font-semibold text-[#f59e0b]">650 XP</span>
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-[#6d3bf5] to-[#a855f7]"
          />
        </div>
        <p className="mt-2 text-right text-xs text-muted-foreground">
          <span className="font-semibold text-white">2,350</span> / 3,000 XP
        </p>
      </div>
    </div>
  )
}
