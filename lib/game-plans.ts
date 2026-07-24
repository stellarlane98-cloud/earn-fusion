export interface GamePlan {
  id: string
  name: string
  tier: 'basic' | 'standard' | 'premium'
  price: number
  tasksPerDay: number
  rewardMultiplier: number
  features: string[]
  description: string
  icon: string
  color: string
}

export interface UserGamePlan {
  gameId: string
  planId: string
  tier: 'basic' | 'standard' | 'premium'
  activeSince: string
  expiresAt: string
  tasksRemaining: number
  tasksLimit: number
}

export const gamePlans: Record<string, GamePlan[]> = {
  diceGame: [
    {
      id: 'dice-basic',
      name: 'Basic Dice',
      tier: 'basic',
      price: 0,
      tasksPerDay: 3,
      rewardMultiplier: 1,
      features: ['3 games per day', '1x reward multiplier', 'Basic statistics'],
      description: 'Get started with the dice game',
      icon: 'Dices',
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      id: 'dice-standard',
      tier: 'standard',
      name: 'Standard Dice',
      price: 199,
      tasksPerDay: 10,
      rewardMultiplier: 1.5,
      features: ['10 games per day', '1.5x reward multiplier', 'Advanced statistics', 'Priority support'],
      description: 'Unlock more games and better rewards',
      icon: 'Dices',
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      id: 'dice-premium',
      tier: 'premium',
      name: 'Premium Dice',
      price: 499,
      tasksPerDay: 999,
      rewardMultiplier: 2.5,
      features: ['Unlimited games', '2.5x reward multiplier', 'VIP statistics', '24/7 priority support', 'Exclusive events'],
      description: 'Maximum rewards and exclusive perks',
      icon: 'Dices',
      color: 'from-yellow-500/20 to-orange-500/20',
    },
  ],
  videoTasks: [
    {
      id: 'video-basic',
      name: 'Basic Videos',
      tier: 'basic',
      price: 0,
      tasksPerDay: 5,
      rewardMultiplier: 1,
      features: ['5 videos per day', '1x reward multiplier', 'Basic content'],
      description: 'Start earning from videos',
      icon: 'Video',
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      id: 'video-standard',
      tier: 'standard',
      name: 'Standard Videos',
      price: 149,
      tasksPerDay: 20,
      rewardMultiplier: 1.5,
      features: ['20 videos per day', '1.5x reward multiplier', 'Premium content', 'Fast processing'],
      description: 'More videos, more earnings',
      icon: 'Video',
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      id: 'video-premium',
      tier: 'premium',
      name: 'Premium Videos',
      price: 349,
      tasksPerDay: 999,
      rewardMultiplier: 2,
      features: ['Unlimited videos', '2x reward multiplier', 'Exclusive content', 'Instant rewards'],
      description: 'Unlimited video earnings',
      icon: 'Video',
      color: 'from-yellow-500/20 to-orange-500/20',
    },
  ],
  assignments: [
    {
      id: 'assign-basic',
      name: 'Basic Tasks',
      tier: 'basic',
      price: 0,
      tasksPerDay: 2,
      rewardMultiplier: 1,
      features: ['2 tasks per day', '1x reward multiplier', 'Text submissions only'],
      description: 'Start with basic assignments',
      icon: 'ClipboardList',
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      id: 'assign-standard',
      tier: 'standard',
      name: 'Standard Tasks',
      price: 99,
      tasksPerDay: 8,
      rewardMultiplier: 1.5,
      features: ['8 tasks per day', '1.5x reward multiplier', 'Text & media', 'Faster approval'],
      description: 'More tasks with better rewards',
      icon: 'ClipboardList',
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      id: 'assign-premium',
      tier: 'premium',
      name: 'Premium Tasks',
      price: 299,
      tasksPerDay: 999,
      rewardMultiplier: 2.5,
      features: ['Unlimited tasks', '2.5x reward multiplier', 'All media types', 'Instant approval'],
      description: 'Maximum flexibility and rewards',
      icon: 'ClipboardList',
      color: 'from-yellow-500/20 to-orange-500/20',
    },
  ],
}

export const getUserGamePlans = (): UserGamePlan[] => [
  {
    gameId: 'diceGame',
    planId: 'dice-basic',
    tier: 'basic',
    activeSince: '2025-01-01',
    expiresAt: '2025-12-31',
    tasksRemaining: 2,
    tasksLimit: 3,
  },
  {
    gameId: 'videoTasks',
    planId: 'video-standard',
    tier: 'standard',
    activeSince: '2025-01-15',
    expiresAt: '2025-04-15',
    tasksRemaining: 8,
    tasksLimit: 20,
  },
  {
    gameId: 'assignments',
    planId: 'assign-basic',
    tier: 'basic',
    activeSince: '2025-01-01',
    expiresAt: '2025-12-31',
    tasksRemaining: 1,
    tasksLimit: 2,
  },
]
