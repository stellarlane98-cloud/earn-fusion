'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AppShell } from '@/components/dashboard/app-shell'
import { gamePlans, getUserGamePlans, type GamePlan } from '@/lib/game-plans'
import { formatPKR } from '@/lib/currency'
import { Check, Lock, Zap, Gift } from 'lucide-react'
import Link from 'next/link'

interface GameCategory {
  id: string
  name: string
  description: string
  icon: string
}

const gameCategories: GameCategory[] = [
  { id: 'diceGame', name: 'Dice Game', description: 'Roll the dice and win rewards', icon: 'Dices' },
  { id: 'videoTasks', name: 'Video Tasks', description: 'Watch videos and earn', icon: 'Video' },
  { id: 'assignments', name: 'Assignments', description: 'Complete text tasks for rewards', icon: 'ClipboardList' },
]

function PlanCard({
  plan,
  userPlans,
  isActive,
  gameId,
}: {
  plan: GamePlan
  userPlans: any[]
  isActive: boolean
  gameId: string
}) {
  const userPlan = userPlans.find((p) => p.gameId === gameId)
  const isPurchased = userPlan?.tier === plan.tier

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden rounded-2xl border transition-all ${
        isPurchased
          ? 'border-purple-500/60 bg-gradient-to-br from-purple-500/10 to-pink-500/10'
          : 'border-white/10 bg-gradient-to-br from-white/5 to-white/2 hover:border-white/20'
      }`}
    >
      {isPurchased && (
        <div className="absolute right-0 top-0 bg-gradient-to-br from-purple-500 to-pink-500 px-4 py-1 text-xs font-bold text-white">
          ACTIVE
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-bold text-white">{plan.name}</h3>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </div>

        {/* Price */}
        {plan.price > 0 ? (
          <div className="mb-6">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {formatPKR(plan.price)}
            </div>
            <p className="text-xs text-muted-foreground">one-time payment</p>
          </div>
        ) : (
          <div className="mb-6 text-2xl font-bold text-emerald-400">Free</div>
        )}

        {/* Stats */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-3">
            <Gift className="size-4 text-purple-400" />
            <span className="text-sm text-white">{plan.tasksPerDay}x tasks per day</span>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="size-4 text-yellow-400" />
            <span className="text-sm text-white">{plan.rewardMultiplier}x reward multiplier</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6 space-y-2 border-t border-white/10 pt-6">
          {plan.features.map((feature) => (
            <div key={feature} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 flex-shrink-0 text-emerald-400" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {/* Button */}
        {isPurchased ? (
          <button className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-3 text-sm font-bold text-white">
            ✓ Your Plan
          </button>
        ) : (
          <button className="w-full rounded-lg border border-purple-500/50 bg-purple-500/10 py-3 text-sm font-bold text-purple-300 transition-all hover:bg-purple-500/20">
            {plan.price > 0 ? `Upgrade for ${formatPKR(plan.price)}` : 'Select Plan'}
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default function GamesListPage() {
  const userPlans = getUserGamePlans()
  const [selectedGame, setSelectedGame] = useState<string>('diceGame')

  const currentPlans = gamePlans[selectedGame as keyof typeof gamePlans] || []

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Games & Earning Plans</h1>
          <p className="mt-2 text-muted-foreground">Choose your plan and unlock exclusive rewards</p>
        </div>

        {/* Game Selection Tabs */}
        <div className="flex flex-wrap gap-3">
          {gameCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedGame(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                selectedGame === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'border border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-white'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {currentPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              userPlans={userPlans}
              isActive={userPlans.some((p) => p.gameId === selectedGame && p.tier === plan.tier)}
              gameId={selectedGame}
            />
          ))}
        </div>

        {/* Action Links */}
        <div className="mt-12 flex flex-wrap gap-4">
          {selectedGame === 'diceGame' && (
            <Link href="/games">
              <button className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-bold text-white transition-all hover:shadow-lg hover:shadow-purple-500/20">
                Play Dice Game
              </button>
            </Link>
          )}
          {selectedGame === 'videoTasks' && (
            <Link href="/videos">
              <button className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-bold text-white transition-all hover:shadow-lg hover:shadow-blue-500/20">
                Watch Videos
              </button>
            </Link>
          )}
          {selectedGame === 'assignments' && (
            <Link href="/assignments">
              <button className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-bold text-white transition-all hover:shadow-lg hover:shadow-emerald-500/20">
                Complete Assignments
              </button>
            </Link>
          )}
        </div>
      </div>
    </AppShell>
  )
}
