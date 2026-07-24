'use client'

import { motion } from 'framer-motion'
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react'

interface TaskHistoryItem {
  id: string
  name: string
  type: 'game' | 'video' | 'assignment'
  status: 'completed' | 'pending'
  time: string
  reward: number
}

// Mock today's tasks
const getTodaysTasks = (): TaskHistoryItem[] => {
  const today = new Date()
  return [
    {
      id: '1',
      name: 'Match Trial - Trial 5',
      type: 'game',
      status: 'completed',
      time: '2:30 PM',
      reward: 300,
    },
    {
      id: '2',
      name: 'Watch Educational Video',
      type: 'video',
      status: 'completed',
      time: '1:45 PM',
      reward: 200,
    },
    {
      id: '3',
      name: 'Write Product Review',
      type: 'assignment',
      status: 'completed',
      time: '12:15 PM',
      reward: 500,
    },
    {
      id: '4',
      name: 'Match Trial - Trial 10',
      type: 'game',
      status: 'completed',
      time: '11:00 AM',
      reward: 300,
    },
  ]
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'game':
      return 'text-purple-400'
    case 'video':
      return 'text-blue-400'
    case 'assignment':
      return 'text-green-400'
    default:
      return 'text-white'
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'game':
      return 'Game'
    case 'video':
      return 'Video'
    case 'assignment':
      return 'Task'
    default:
      return 'Task'
  }
}

export function TaskHistory() {
  const tasks = getTodaysTasks()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="rounded-2xl border border-white/10 bg-card p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="size-5 text-[#7c4dff]" />
        <h3 className="text-lg font-semibold text-white">Today&apos;s Tasks</h3>
      </div>

      <div className="space-y-3">
        {tasks.map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-start justify-between rounded-xl bg-[#1a1a24] p-4 hover:bg-[#222230] transition-colors"
          >
            <div className="flex items-start gap-3 flex-1">
              <CheckCircle2 className="size-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white">{task.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-semibold ${getTypeColor(task.type)}`}>
                    {getTypeLabel(task.type)}
                  </span>
                  <span className="text-xs text-muted-foreground">{task.time}</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-sm font-bold text-amber-400">+Rs {task.reward}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-[#1a1a24] text-center">
        <p className="text-xs text-muted-foreground">
          Completed <span className="font-semibold text-white">{tasks.length}</span> tasks today
        </p>
      </div>
    </motion.div>
  )
}
