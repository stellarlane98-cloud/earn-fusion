'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Activity = {
  id: string
  title: string
  reward: number
  time: string
  kind: 'game' | 'video' | 'assignment' | 'deposit' | 'withdraw'
}

export type AppNotification = {
  id: string
  title: string
  body: string
  time: string
  read: boolean
  kind: 'reward' | 'system' | 'withdraw'
}

type Toast = { id: string; message: string; tone: 'success' | 'error' }

type AppState = {
  balance: number
  totalEarned: number
  completedTasks: number
  referralCount: number
  activities: Activity[]
  notifications: AppNotification[]
  toasts: Toast[]
  unreadCount: number
  earn: (amount: number, title: string, kind: Activity['kind']) => void
  deposit: (amount: number) => void
  withdraw: (amount: number) => void
  addToast: (message: string, tone?: Toast['tone']) => void
  dismissToast: (id: string) => void
  markAllRead: () => void
  markRead: (id: string) => void
}

const AppContext = createContext<AppState | null>(null)

const initialActivities: Activity[] = [
  { id: 'a1', title: 'Played Dice Game', reward: 500, time: '2 min ago', kind: 'game' },
  { id: 'a2', title: 'Watched Video', reward: 200, time: '15 min ago', kind: 'video' },
  { id: 'a3', title: 'Completed Assignment', reward: 1000, time: '1 hour ago', kind: 'assignment' },
  { id: 'a4', title: 'Deposit Received', reward: 5000, time: '3 hours ago', kind: 'deposit' },
]

const initialNotifications: AppNotification[] = [
  {
    id: 'n1',
    title: 'Reward Credited',
    body: 'You earned Rs 500 from the Dice Game.',
    time: '2 min ago',
    read: false,
    kind: 'reward',
  },
  {
    id: 'n2',
    title: 'New Assignment Available',
    body: 'A 300-word writing task is ready for you.',
    time: '1 hour ago',
    read: false,
    kind: 'system',
  },
  {
    id: 'n3',
    title: 'Withdrawal Update',
    body: 'Your last withdrawal of Rs 2,000 was processed.',
    time: 'Yesterday',
    read: true,
    kind: 'withdraw',
  },
]

let idCounter = 0
const nextId = () => `id-${Date.now()}-${idCounter++}`

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(0)
  const [totalEarned, setTotalEarned] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)
  const [referralCount, setReferralCount] = useState(0)
  const [activities, setActivities] = useState<Activity[]>([])
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const addToast = useCallback(
    (message: string, tone: Toast['tone'] = 'success') => {
      const id = nextId()
      setToasts((t) => [...t, { id, message, tone }])
      setTimeout(() => dismissToast(id), 3200)
    },
    [dismissToast],
  )

  const pushNotification = useCallback(
    (n: Omit<AppNotification, 'id' | 'read' | 'time'>) => {
      setNotifications((prev) => [
        { ...n, id: nextId(), read: false, time: 'Just now' },
        ...prev,
      ])
    },
    [],
  )

  const earn = useCallback(
    (amount: number, title: string, kind: Activity['kind']) => {
      setBalance((b) => b + amount)
      setTotalEarned((t) => t + amount)
      setCompletedTasks((c) => c + 1)
      setActivities((prev) => [
        { id: nextId(), title, reward: amount, time: 'Just now', kind },
        ...prev,
      ])
      pushNotification({
        title: 'Reward Credited',
        body: `You earned Rs ${amount.toLocaleString('en-PK')} from ${title}.`,
        kind: 'reward',
      })
      addToast(`+ Rs ${amount.toLocaleString('en-PK')} added to your balance`)
    },
    [addToast, pushNotification],
  )

  const deposit = useCallback(
    (amount: number) => {
      setBalance((b) => b + amount)
      setActivities((prev) => [
        { id: nextId(), title: 'Deposit Received', reward: amount, time: 'Just now', kind: 'deposit' },
        ...prev,
      ])
      pushNotification({
        title: 'Deposit Successful',
        body: `Rs ${amount.toLocaleString('en-PK')} has been added to your wallet.`,
        kind: 'reward',
      })
      addToast(`Deposit of Rs ${amount.toLocaleString('en-PK')} successful`)
    },
    [addToast, pushNotification],
  )

  const withdraw = useCallback(
    (amount: number) => {
      setBalance((b) => Math.max(0, b - amount))
      setActivities((prev) => [
        { id: nextId(), title: 'Withdrawal Requested', reward: -amount, time: 'Just now', kind: 'withdraw' },
        ...prev,
      ])
      pushNotification({
        title: 'Withdrawal Requested',
        body: `Your withdrawal of Rs ${amount.toLocaleString('en-PK')} is being processed.`,
        kind: 'withdraw',
      })
      addToast(`Withdrawal of Rs ${amount.toLocaleString('en-PK')} requested`)
    },
    [addToast, pushNotification],
  )

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const markRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const value = useMemo<AppState>(
    () => ({
      balance,
      totalEarned,
      completedTasks,
      referralCount,
      activities,
      notifications,
      toasts,
      unreadCount,
      earn,
      deposit,
      withdraw,
      addToast,
      dismissToast,
      markAllRead,
      markRead,
    }),
    [
      balance,
      totalEarned,
      completedTasks,
      referralCount,
      activities,
      notifications,
      toasts,
      unreadCount,
      earn,
      deposit,
      withdraw,
      addToast,
      dismissToast,
      markAllRead,
      markRead,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppStoreProvider')
  return ctx
}
