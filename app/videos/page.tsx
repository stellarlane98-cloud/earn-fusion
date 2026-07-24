'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Clock, Play, Coins, X } from 'lucide-react'
import { AppShell } from '@/components/dashboard/app-shell'
import { useApp } from '@/components/store/app-store'
import { formatPKR } from '@/lib/currency'

type Vid = {
  id: string
  title: string
  channel: string
  duration: string
  reward: number
  accent: string
}

const VIDEOS: Vid[] = [
  { id: 'v1', title: 'How to Grow Your Savings', channel: 'Finance Hub', duration: '2:30', reward: 150, accent: '#2b7fff' },
  { id: 'v2', title: 'Top 5 Productivity Tips', channel: 'WorkSmart', duration: '3:10', reward: 200, accent: '#7c4dff' },
  { id: 'v3', title: 'Beginner Investing Guide', channel: 'MoneyWise', duration: '4:00', reward: 250, accent: '#22c55e' },
  { id: 'v4', title: 'Healthy Morning Routine', channel: 'LifeFlow', duration: '2:45', reward: 150, accent: '#f59e0b' },
  { id: 'v5', title: 'Master Time Management', channel: 'FocusLab', duration: '3:30', reward: 200, accent: '#ff6b8a' },
  { id: 'v6', title: 'Side Hustles That Pay', channel: 'EarnMore', duration: '5:00', reward: 300, accent: '#2b7fff' },
]

function WatchModal({ video, onClose }: { video: Vid; onClose: () => void }) {
  const { earn } = useApp()
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + 4
      })
    }, 120)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100 && !done) {
      setDone(true)
      earn(video.reward, `Watched: ${video.title}`, 'video')
    }
  }, [progress, done, earn, video])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-card"
      >
        <div
          className="relative flex aspect-video items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${video.accent}33, #12142e)` }}
        >
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg bg-black/30 p-1.5 text-white/80 hover:text-white"
          >
            <X className="size-5" />
          </button>
          {done ? (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center text-center"
            >
              <CheckCircle2 className="size-14 text-[#4ade80]" />
              <p className="mt-3 text-lg font-bold text-white">Reward Earned!</p>
              <p className="text-sm text-[#4ade80]">+{formatPKR(video.reward)}</p>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                <Play className="size-7" />
              </span>
              <p className="mt-3 text-sm font-medium text-white/80">Playing…</p>
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-base font-bold text-white">{video.title}</h3>
          <p className="text-sm text-muted-foreground">{video.channel}</p>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#6d3bf5] to-[#a855f7] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {done
              ? 'Video complete — reward has been added to your balance.'
              : 'Watch the full video to earn your reward.'}
          </p>
          {done && (
            <button
              onClick={onClose}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#6d3bf5] to-[#8b5cf6] py-3 text-sm font-bold text-white transition-transform active:scale-95"
            >
              Done
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function VideosPage() {
  const [active, setActive] = useState<Vid | null>(null)
  const [watched, setWatched] = useState<string[]>([])

  function open(v: Vid) {
    setActive(v)
  }
  function close() {
    if (active) setWatched((w) => (w.includes(active.id) ? w : [...w, active.id]))
    setActive(null)
  }

  return (
    <AppShell
      title="Watch Videos"
      subtitle="Watch short videos and earn rewards for each one you complete."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((v) => {
          const isWatched = watched.includes(v.id)
          return (
            <div
              key={v.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card"
            >
              <div
                className="relative flex aspect-video items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${v.accent}33, #12142e)` }}
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                  <Play className="size-6" />
                </span>
                <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white">
                  <Clock className="size-3" />
                  {v.duration}
                </span>
                {isWatched && (
                  <span className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-[#22c55e]/90 px-2 py-0.5 text-[11px] font-semibold text-white">
                    <CheckCircle2 className="size-3" />
                    Watched
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-bold text-white">{v.title}</h3>
                <p className="text-xs text-muted-foreground">{v.channel}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-[#f59e0b]">
                    <Coins className="size-4" />
                    {formatPKR(v.reward)}
                  </span>
                  <button
                    onClick={() => open(v)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#6d3bf5] to-[#8b5cf6] px-4 py-2 text-xs font-bold text-white transition-transform active:scale-95"
                  >
                    <Play className="size-3.5" />
                    Watch
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <AnimatePresence>
        {active && <WatchModal video={active} onClose={close} />}
      </AnimatePresence>
    </AppShell>
  )
}
