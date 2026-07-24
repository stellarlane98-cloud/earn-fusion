'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dice5, Sparkles, Target, Trophy } from 'lucide-react'
import { AppShell } from '@/components/dashboard/app-shell'
import { useApp } from '@/components/store/app-store'
import { formatPKR } from '@/lib/currency'
import { cn } from '@/lib/utils'

const TARGET = 10
const DICE_COUNT = 3
const REWARD = 300

const PIP_LAYOUT: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
}

function Die({ value, rolling }: { value: number; rolling: boolean }) {
  return (
    <motion.div
      animate={rolling ? { rotate: [0, -12, 12, -8, 0], scale: [1, 1.08, 1] } : {}}
      transition={{ duration: 0.5 }}
      className="grid size-16 grid-cols-3 grid-rows-3 gap-1 rounded-2xl border border-white/15 bg-gradient-to-br from-[#2b2450] to-[#181433] p-2 shadow-lg sm:size-20"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'flex items-center justify-center',
            PIP_LAYOUT[value].includes(i)
              ? 'before:block before:size-2.5 before:rounded-full before:bg-[#a855f7] sm:before:size-3'
              : '',
          )}
        />
      ))}
    </motion.div>
  )
}

export default function GamesPage() {
  const { earn } = useApp()
  const [dice, setDice] = useState<number[]>([1, 1, 1])
  const [rolling, setRolling] = useState(false)
  const [result, setResult] = useState<'idle' | 'win' | 'lose'>('idle')
  const [rounds, setRounds] = useState(0)
  const [wins, setWins] = useState(0)

  const total = dice.reduce((a, b) => a + b, 0)

  function roll() {
    if (rolling) return
    setRolling(true)
    setResult('idle')

    let ticks = 0
    const interval = setInterval(() => {
      setDice(Array.from({ length: DICE_COUNT }, () => 1 + Math.floor(Math.random() * 6)))
      ticks++
      if (ticks > 8) {
        clearInterval(interval)
        const final = Array.from(
          { length: DICE_COUNT },
          () => 1 + Math.floor(Math.random() * 6),
        )
        setDice(final)
        const sum = final.reduce((a, b) => a + b, 0)
        const won = sum >= TARGET
        setResult(won ? 'win' : 'lose')
        setRounds((r) => r + 1)
        if (won) {
          setWins((w) => w + 1)
          earn(REWARD, 'Dice Game', 'game')
        }
        setRolling(false)
      }
    }, 90)
  }

  return (
    <AppShell
      title="Dice Game"
      subtitle="Roll the dice and hit the target to win rewards."
    >
      <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1fr_300px]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card p-6 sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[#7c4dff]/15 blur-3xl" />

          <div className="relative flex flex-col items-center">
            <div className="flex items-center gap-2 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-1.5 text-sm font-semibold text-[#f59e0b]">
              <Target className="size-4" />
              Target: reach {TARGET} or more
            </div>

            <div className="mt-8 flex gap-3 sm:gap-5">
              {dice.map((d, i) => (
                <Die key={i} value={d} rolling={rolling} />
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">Your Roll</p>
              <p className="text-4xl font-extrabold text-white">{total}</p>
            </div>

            <div className="mt-4 h-10">
              {result === 'win' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 rounded-xl bg-[#22c55e]/15 px-4 py-2 text-sm font-bold text-[#4ade80]"
                >
                  <Sparkles className="size-4" />
                  You won {formatPKR(REWARD)}!
                </motion.div>
              )}
              {result === 'lose' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl bg-[#ff3b6b]/15 px-4 py-2 text-sm font-bold text-[#ff6b8a]"
                >
                  So close! Try again.
                </motion.div>
              )}
            </div>

            <button
              onClick={roll}
              disabled={rolling}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6d3bf5] to-[#8b5cf6] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#6d3bf5]/30 transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Dice5 className="size-5" />
              {rolling ? 'Rolling…' : 'Roll Dice'}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-white/10 bg-card p-5">
            <h3 className="text-base font-bold text-white">Game Stats</h3>
            <dl className="mt-4 flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Rounds Played</dt>
                <dd className="font-bold text-white">{rounds}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Wins</dt>
                <dd className="font-bold text-[#22c55e]">{wins}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Reward / Win</dt>
                <dd className="font-bold text-[#f59e0b]">{formatPKR(REWARD)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#2a1a63] via-[#1c1745] to-[#12142e] p-5">
            <span className="flex size-11 items-center justify-center rounded-xl bg-[#6d3bf5] text-white shadow-lg">
              <Trophy className="size-5" />
            </span>
            <h3 className="mt-3 text-base font-bold text-white">How to play</h3>
            <p className="mt-1 text-sm leading-relaxed text-white/60">
              Roll {DICE_COUNT} dice. If their total is {TARGET} or higher, you win{' '}
              {formatPKR(REWARD)} added straight to your balance.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
