'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, CheckCircle2, Gift, AlertCircle, ArrowUpFromLine, Bell } from 'lucide-react'
import { AppShell } from '@/components/dashboard/app-shell'
import { useApp } from '@/components/store/app-store'

export default function NotificationsPage() {
  const { notifications, markRead, markAllRead, unreadCount } = useApp()

  const iconMap = {
    reward: { icon: Gift, color: 'bg-[#f59e0b]/20 text-[#fbbf24]' },
    system: { icon: Bell, color: 'bg-[#2b7fff]/20 text-[#60a5fa]' },
    withdraw: { icon: ArrowUpFromLine, color: 'bg-[#22c55e]/20 text-[#4ade80]' },
  }

  return (
    <AppShell
      title="Notifications"
      subtitle="Stay updated with your activity and rewards."
    >
      <div className="mx-auto max-w-2xl">
        {/* Header Actions */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-between rounded-xl border border-[#2b7fff]/30 bg-[#2b7fff]/10 px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="size-5 text-[#60a5fa]" />
              <span className="text-sm font-medium text-white">
                You have {unreadCount} unread notification{unreadCount === 1 ? '' : 's'}
              </span>
            </div>
            <button
              onClick={markAllRead}
              className="text-xs font-semibold text-[#60a5fa] transition hover:text-white"
            >
              Mark All Read
            </button>
          </motion.div>
        )}

        {/* Notifications List */}
        <div className="space-y-3">
          <AnimatePresence>
            {notifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-card py-12"
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-white/5">
                  <Bell className="size-7 text-muted-foreground" />
                </div>
                <p className="mt-3 text-sm font-medium text-muted-foreground">
                  No notifications yet
                </p>
              </motion.div>
            ) : (
              notifications.map((notification, index) => {
                const { icon: Icon, color } = iconMap[notification.kind]

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => markRead(notification.id)}
                    className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition ${
                      notification.read
                        ? 'border-white/5 bg-white/[0.02]'
                        : 'border-white/15 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${color}`}>
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-white">{notification.title}</h3>
                        {!notification.read && (
                          <span className="mt-0.5 flex size-2 shrink-0 rounded-full bg-[#a855f7]" />
                        )}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {notification.body}
                      </p>
                      <p className="mt-2 text-[10px] text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                  </motion.div>
                )
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppShell>
  )
}
