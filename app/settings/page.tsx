'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell,
  Lock,
  Eye,
  Users,
  LogOut,
  ChevronRight,
  Toggle2,
  Smartphone,
  Mail,
} from 'lucide-react'
import { AppShell } from '@/components/dashboard/app-shell'

type ToggleSetting = {
  id: string
  label: string
  description: string
  enabled: boolean
}

export default function SettingsPage() {
  const [toggles, setToggles] = useState<ToggleSetting[]>([
    {
      id: 'notifications',
      label: 'Push Notifications',
      description: 'Get alerts for rewards and updates',
      enabled: true,
    },
    {
      id: 'emails',
      label: 'Email Notifications',
      description: 'Receive emails about activity',
      enabled: true,
    },
    {
      id: 'marketing',
      label: 'Marketing Emails',
      description: 'Updates about new features and offers',
      enabled: false,
    },
    {
      id: 'biometric',
      label: 'Biometric Login',
      description: 'Use fingerprint to unlock',
      enabled: true,
    },
  ])

  function toggle(id: string) {
    setToggles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t)),
    )
  }

  return (
    <AppShell
      title="Settings"
      subtitle="Manage your account and preferences."
    >
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Account Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl border border-white/10 bg-card p-6"
        >
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
            <Users className="size-5" />
            Account
          </h2>
          <div className="space-y-3">
            <button className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10">
              <div className="flex items-center gap-3">
                <Mail className="size-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Email Address</p>
                  <p className="text-xs text-muted-foreground">ali.hassan@example.com</p>
                </div>
              </div>
              <ChevronRight className="size-5 text-muted-foreground" />
            </button>
            <button className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10">
              <div className="flex items-center gap-3">
                <Smartphone className="size-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Phone Number</p>
                  <p className="text-xs text-muted-foreground">+92 300 1234567</p>
                </div>
              </div>
              <ChevronRight className="size-5 text-muted-foreground" />
            </button>
            <button className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10">
              <div className="flex items-center gap-3">
                <Lock className="size-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Change Password</p>
                  <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                </div>
              </div>
              <ChevronRight className="size-5 text-muted-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-card p-6"
        >
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
            <Bell className="size-5" />
            Notifications
          </h2>
          <div className="space-y-4">
            {toggles.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{setting.label}</p>
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                </div>
                <button
                  onClick={() => toggle(setting.id)}
                  className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 transition ${
                    setting.enabled
                      ? 'border-[#6d3bf5] bg-[#6d3bf5]'
                      : 'border-white/10 bg-white/10'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                      setting.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Privacy Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/10 bg-card p-6"
        >
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
            <Eye className="size-5" />
            Privacy & Security
          </h2>
          <div className="space-y-3">
            <button className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10">
              <span className="text-sm font-medium text-white">Privacy Policy</span>
              <ChevronRight className="size-5 text-muted-foreground" />
            </button>
            <button className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10">
              <span className="text-sm font-medium text-white">Terms & Conditions</span>
              <ChevronRight className="size-5 text-muted-foreground" />
            </button>
            <button className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10">
              <span className="text-sm font-medium text-white">Download Your Data</span>
              <ChevronRight className="size-5 text-muted-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-[#ff6b8a]/20 bg-[#ff6b8a]/5 p-6"
        >
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#ff8fa3]">
            <LogOut className="size-5" />
            Account Actions
          </h2>
          <div className="space-y-3">
            <button className="flex w-full items-center justify-between rounded-xl border border-[#ff6b8a]/20 bg-[#ff6b8a]/10 px-4 py-3 text-[#ff8fa3] transition hover:bg-[#ff6b8a]/20">
              <span className="text-sm font-medium">Sign Out</span>
              <ChevronRight className="size-5" />
            </button>
            <button className="flex w-full items-center justify-between rounded-xl border border-[#ff6b8a]/20 bg-[#ff6b8a]/10 px-4 py-3 text-[#ff8fa3] transition hover:bg-[#ff6b8a]/20">
              <span className="text-sm font-medium">Delete Account</span>
              <ChevronRight className="size-5" />
            </button>
          </div>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground">
          App Version 1.0.0 • Last updated Jul 19, 2026
        </p>
      </div>
    </AppShell>
  )
}
