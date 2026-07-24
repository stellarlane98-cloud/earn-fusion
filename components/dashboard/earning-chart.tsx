'use client'

import { motion } from 'framer-motion'
import { ChevronDown, TrendingUp } from 'lucide-react'
import { chartData } from '@/lib/dashboard-data'
import { AnimatedCounter } from './animated-counter'
import { useApp } from '@/components/store/app-store'

const WIDTH = 640
const HEIGHT = 220
const PAD_X = 16
const PAD_TOP = 16
const PAD_BOTTOM = 28
const MAX = 15000

const yLabels = [15000, 12000, 9000, 6000, 3000, 0]

function fmtY(v: number) {
  return v >= 1000 ? `${v / 1000}k` : `${v}`
}

export function EarningChart() {
  const { totalEarned } = useApp()
  const innerW = WIDTH - PAD_X * 2
  const innerH = HEIGHT - PAD_TOP - PAD_BOTTOM

  const points = chartData.map((d, i) => {
    const x = PAD_X + (innerW * i) / (chartData.length - 1)
    const y = PAD_TOP + innerH * (1 - d.value / MAX)
    return { x, y, ...d }
  })

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')

  const areaPath =
    `M ${points[0].x} ${PAD_TOP + innerH} ` +
    points.map((p) => `L ${p.x} ${p.y}`).join(' ') +
    ` L ${points[points.length - 1].x} ${PAD_TOP + innerH} Z`

  const last = points[points.length - 1]

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-5 lg:p-6">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-white">Earning Overview</h3>
        <button className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-white">
          This Week
          <ChevronDown className="size-3.5" />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-1">
        <div>
          <p className="text-sm text-muted-foreground">Total Earnings (PKR)</p>
          <AnimatedCounter
            value={totalEarned}
            prefix="Rs "
            className="block text-3xl font-extrabold tracking-tight text-white"
          />
        </div>
        <div className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-[#22c55e]">
          <TrendingUp className="size-4" />
          Rs 1,254 (11.2%)
          <span className="font-normal text-muted-foreground">vs last week</span>
        </div>
      </div>

      <div className="relative mt-5 flex gap-3">
        <div className="flex flex-col justify-between py-1 text-[10px] text-muted-foreground">
          {yLabels.map((v) => (
            <span key={v}>{fmtY(v)}</span>
          ))}
        </div>
        <div className="relative flex-1">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            preserveAspectRatio="none"
            className="h-56 w-full"
            role="img"
            aria-label="Weekly earnings line chart"
          >
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c4dff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#7c4dff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6d3bf5" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>

            {yLabels.map((v) => {
              const y = PAD_TOP + innerH * (1 - v / MAX)
              return (
                <line
                  key={v}
                  x1={PAD_X}
                  x2={WIDTH - PAD_X}
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={1}
                />
              )
            })}

            <motion.path
              d={areaPath}
              fill="url(#areaFill)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            <motion.path
              d={linePath}
              fill="none"
              stroke="url(#lineStroke)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />

            {points.map((p, i) => (
              <motion.circle
                key={p.day}
                cx={p.x}
                cy={p.y}
                r={4}
                fill="#0d1024"
                stroke="#a855f7"
                strokeWidth={2.5}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.08 }}
              />
            ))}
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="absolute -translate-y-1/2 rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm"
            style={{
              left: `${(last.x / WIDTH) * 100}%`,
              top: `${(last.y / HEIGHT) * 100}%`,
              transform: 'translate(-100%, -140%)',
            }}
          >
            Rs 12,450
          </motion.div>

          <div className="mt-1 flex justify-between px-1 text-[10px] text-muted-foreground">
            {chartData.map((d) => (
              <span key={d.day}>{d.day}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
