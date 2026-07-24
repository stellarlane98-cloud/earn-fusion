'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  XCircle,
  PartyPopper,
} from 'lucide-react'
import { AppShell } from '@/components/dashboard/app-shell'
import { useApp } from '@/components/store/app-store'
import { useAuth } from '@/components/store/auth-store'
import { useRouter } from 'next/navigation'
import { formatPKR } from '@/lib/currency'
import {
  generateDiceTasks,
  comboSum,
  isWinningCombo,
  TOTAL_TASKS,
  COMBOS_PER_TASK,
  type DiceTask,
} from '@/lib/dice-game'

const STORAGE_PREFIX = 'earnfusion.diceGame.completed.'

/** A single high-fidelity die face rendered as SVG — no external image assets. */
function DieFace({ value, size = 64, rotate = 0 }: { value: number; size?: number; rotate?: number }) {
  const pipPositions: Record<number, [number, number][]> = {
    1: [[50, 50]],
    2: [[28, 28], [72, 72]],
    3: [[28, 28], [50, 50], [72, 72]],
    4: [[28, 28], [72, 28], [28, 72], [72, 72]],
    5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
    6: [[28, 24], [72, 24], [28, 50], [72, 50], [28, 76], [72, 76]],
  }
  const pips = pipPositions[value] ?? []

  return (
    <motion.svg
      key={value}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ rotate }}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]"
    >
      <defs>
        <linearGradient id={`dieGrad-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="92" height="92" rx="18" fill={`url(#dieGrad-${size})`} stroke="#7f1d1d" strokeWidth="2" />
      <rect x="8" y="8" width="84" height="30" rx="14" fill="#ffffff" opacity="0.12" />
      {pips.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="7.5" fill="#fff" />
      ))}
    </motion.svg>
  )
}

/** Simple, dependency-free success/error tones via the Web Audio API. */
function useGameAudio(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null)

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current && typeof window !== 'undefined') {
      const Ctor = window.AudioContext || (window as any).webkitAudioContext
      if (Ctor) ctxRef.current = new Ctor()
    }
    return ctxRef.current
  }, [])

  const play = useCallback(
    (kind: 'success' | 'error' | 'tick') => {
      if (!enabled) return
      const ctx = ensureCtx()
      if (!ctx) return
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      if (kind === 'success') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(523.25, now)
        osc.frequency.setValueAtTime(659.25, now + 0.1)
        osc.frequency.setValueAtTime(783.99, now + 0.2)
      } else if (kind === 'error') {
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(180, now)
        osc.frequency.setValueAtTime(120, now + 0.15)
      } else {
        osc.type = 'square'
        osc.frequency.setValueAtTime(440, now)
      }

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.exponentialRampToValueAtTime(0.15, now + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, now + (kind === 'success' ? 0.4 : 0.25))
      osc.start(now)
      osc.stop(now + (kind === 'success' ? 0.45 : 0.3))
    },
    [enabled, ensureCtx],
  )

  return play
}

export default function DiceSumMatchingGame() {
  const { earn, addToast } = useApp()
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  const [seed, setSeed] = useState(0)
  const [taskIdx, setTaskIdx] = useState(0)
  const [comboIdx, setComboIdx] = useState(0)
  const [result, setResult] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [audioOn, setAudioOn] = useState(true)
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [sessionEarned, setSessionEarned] = useState(0)
  const [ready, setReady] = useState(false)

  const playTone = useGameAudio(audioOn)
  const storageKey = STORAGE_PREFIX + (user?.id ?? 'guest')

  // Auth guard + seed + restore completed tasks from localStorage (anti-duplicate-reward)
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth')
      return
    }
    setSeed(Date.now())
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) setCompletedIds(new Set(JSON.parse(stored)))
    } catch {
      // corrupted/blocked storage — fall back to in-memory only
    }
    setReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, router])

  const tasks: DiceTask[] = useMemo(() => (seed ? generateDiceTasks(seed) : []), [seed])
  const task = tasks[taskIdx]
  const combo = task?.combos[comboIdx] ?? []
  const total = comboSum(combo)
  const isMatch = task ? isWinningCombo(combo, task.target) : false
  const allDone = ready && taskIdx >= TOTAL_TASKS

  const persistCompleted = useCallback(
    (next: Set<string>) => {
      setCompletedIds(next)
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(next)))
      } catch {
        // ignore storage failures — in-memory state still prevents duplicates this session
      }
    },
    [storageKey],
  )

  const goToCombo = (dir: 'prev' | 'next') => {
    if (isSubmitting) return
    setResult('idle')
    playTone('tick')
    setComboIdx((i) => {
      if (dir === 'next') return (i + 1) % COMBOS_PER_TASK
      return (i - 1 + COMBOS_PER_TASK) % COMBOS_PER_TASK
    })
  }

  const advanceTask = () => {
    setTaskIdx((i) => i + 1)
    setComboIdx(0)
    setResult('idle')
  }

  const handleSubmit = async () => {
    if (!task || isSubmitting) return
    setIsSubmitting(true)

    // Simulated validation delay — mirrors what a real server round-trip would do.
    await new Promise((r) => setTimeout(r, 500))

    if (isWinningCombo(combo, task.target)) {
      setResult('success')
      playTone('success')

      if (!completedIds.has(task.id)) {
        const next = new Set(completedIds)
        next.add(task.id)
        persistCompleted(next)
        earn(task.reward, `Dice Sum Match — Task ${task.index}`, 'game')
        setSessionEarned((s) => s + task.reward)
      } else {
        addToast('Task already rewarded earlier — moving on.', 'success')
      }

      setTimeout(advanceTask, 1400)
    } else {
      setResult('error')
      playTone('error')
      addToast(`Not quite — that combination adds up to ${total}, not ${task.target}.`, 'error')
    }

    setIsSubmitting(false)
  }

  const handleRestart = () => {
    setSeed(Date.now())
    setTaskIdx(0)
    setComboIdx(0)
    setResult('idle')
    setSessionEarned(0)
    addToast('New puzzle set ready — good luck!', 'success')
  }

  if (!ready || !task) {
    return (
      <AppShell title="Dice Sum Matching Game">
        <div className="flex items-center justify-center min-h-[400px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
          />
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell title="Dice Sum Matching Game" subtitle="Match the target number and earn rewards for every correct combination.">
      <div className="mx-auto max-w-3xl px-1 pb-4">
        <AnimatePresence mode="wait">
          {allDone ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl bg-white text-slate-900 shadow-xl p-8 sm:p-12 text-center"
            >
              <PartyPopper className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h2 className="text-2xl font-bold mb-2">All 10 tasks complete!</h2>
              <p className="text-slate-500 mb-6">
                You earned <span className="font-semibold text-emerald-600">{formatPKR(sessionEarned)}</span> this
                session.
              </p>
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 transition shadow-lg shadow-blue-600/20"
              >
                <RotateCcw className="h-4 w-4" />
                Play Again
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl bg-white text-slate-900 shadow-xl overflow-hidden"
            >
              {/* Header / instructions */}
              <div className="px-5 sm:px-8 pt-6 pb-2 text-center">
                <p className="text-sm sm:text-[15px] text-slate-500">
                  Use the arrows to cycle through dice combinations and match the target number.{' '}
                  <span className="font-semibold text-slate-700">
                    ({task.index} of {TOTAL_TASKS})
                  </span>
                </p>
              </div>

              {/* Main content */}
              <div className="px-5 sm:px-8 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-stretch mt-4">
                  {/* Target card */}
                  <div className="flex items-center justify-center">
                    <motion.div
                      key={task.id}
                      initial={{ scale: 0.85, rotate: -6, opacity: 0 }}
                      animate={{ scale: 1, rotate: -3, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="relative w-full max-w-[220px] aspect-square rounded-2xl border-[6px] border-slate-900 bg-slate-50 flex flex-col items-center justify-center shadow-sm"
                    >
                      <span className="text-6xl sm:text-7xl font-extrabold tracking-tight text-slate-900">
                        {task.target}
                      </span>
                      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-md bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                        Match This!
                      </span>
                    </motion.div>
                  </div>

                  {/* Dice card */}
                  <div className="rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 p-4 sm:p-5 flex flex-col items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 min-h-[76px]">
                      <AnimatePresence mode="popLayout">
                        {combo.map((v, i) => (
                          <DieFace key={`${comboIdx}-${i}`} value={v} size={56} rotate={(i % 2 === 0 ? -1 : 1) * (6 + i * 3)} />
                        ))}
                      </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-center gap-4 sm:gap-6">
                      <button
                        aria-label="Previous combination"
                        onClick={() => goToCombo('prev')}
                        disabled={isSubmitting}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow hover:shadow-md active:scale-95 transition disabled:opacity-50"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <div className="flex gap-1.5">
                        {Array.from({ length: COMBOS_PER_TASK }).map((_, i) => (
                          <span
                            key={i}
                            className={`h-1.5 w-1.5 rounded-full transition-colors ${
                              i === comboIdx ? 'bg-blue-600' : 'bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        aria-label="Next combination"
                        onClick={() => goToCombo('next')}
                        disabled={isSubmitting}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow hover:shadow-md active:scale-95 transition disabled:opacity-50"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Current total */}
                <div className="mt-5 text-center">
                  <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Current Total</p>
                  <motion.p
                    animate={{ scale: isMatch ? 1.08 : 1 }}
                    className={`text-3xl font-bold ${isMatch ? 'text-emerald-600' : 'text-slate-800'}`}
                  >
                    {total}
                  </motion.p>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="mt-5 w-full rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold text-lg py-3.5 transition shadow-lg shadow-blue-600/25 active:scale-[0.99]"
                >
                  {isSubmitting ? 'Checking…' : 'Submit'}
                </button>

                <p className="mt-3 text-center text-[11px] font-mono text-slate-400 select-all">{task.id}</p>

                {/* Feedback */}
                <AnimatePresence>
                  {result === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 py-3 text-emerald-700 font-semibold"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      Correct! +{formatPKR(task.reward)} added to your wallet.
                    </motion.div>
                  )}
                  {result === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-rose-50 py-3 text-rose-600 font-semibold text-center px-3"
                    >
                      <XCircle className="h-5 w-5 shrink-0" />
                      That total doesn&apos;t match yet — try another combination.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer controls */}
              <div className="grid grid-cols-2 border-t border-slate-100">
                <button
                  onClick={() => setAudioOn((a) => !a)}
                  className="flex flex-col items-center gap-1 py-4 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
                >
                  {audioOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  <span className="text-xs font-medium">Audio</span>
                </button>
                <button
                  onClick={handleRestart}
                  className="flex flex-col items-center gap-1 py-4 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition border-l border-slate-100"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span className="text-xs font-medium">Restart</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Rewards are recorded per task and can only be claimed once. Progress resets when you tap Restart, but
          rewards you&apos;ve already earned stay in your wallet.
        </p>
      </div>
    </AppShell>
  )
}
