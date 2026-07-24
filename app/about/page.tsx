'use client'

import { motion } from 'framer-motion'
import { Users, Target, Sparkles, CheckCircle2 } from 'lucide-react'
import { AppShell } from '@/components/dashboard/app-shell'

export default function AboutPage() {
  return (
    <AppShell
      title="About EarnFusion"
      subtitle="Learn more about our platform and mission."
    >
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#6d3bf5]/20 to-[#a855f7]/5 p-8 text-center"
        >
          <h2 className="text-2xl font-black text-white">EarnFusion</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Earn Money. Play Games. Achieve Goals.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="space-y-4"
        >
          <div className="flex items-start gap-3">
            <Target className="mt-1 size-6 shrink-0 text-[#a855f7]" />
            <div>
              <h3 className="text-lg font-bold text-white">Our Mission</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                EarnFusion is dedicated to providing a legitimate and engaging platform where users can earn money by completing tasks, playing games, and watching videos. We believe everyone deserves an accessible way to earn supplementary income on their own terms.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-bold text-white">Our Values</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { icon: Sparkles, title: 'Transparency', desc: 'Clear and honest rewards for every task' },
              { icon: Users, title: 'Trust', desc: 'Secure payments and reliable platform' },
              { icon: CheckCircle2, title: 'Fairness', desc: 'Equal opportunities for all users' },
              { icon: Target, title: 'Innovation', desc: 'Continuously improving our platform' },
            ].map((value, i) => {
              const Icon = value.icon
              return (
                <div key={i} className="rounded-xl border border-white/10 bg-card p-4">
                  <Icon className="size-6 text-[#a855f7]" />
                  <h4 className="mt-2 font-semibold text-white">{value.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{value.desc}</p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-bold text-white">Why Choose EarnFusion?</h3>
          <ul className="space-y-3">
            {[
              'Multiple ways to earn with games, videos, and assignments',
              'Fast and secure withdrawal options',
              'Competitive rewards for completing tasks',
              'User-friendly interface designed for everyone',
              '24/7 customer support',
              'No hidden fees or surprises',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#22c55e]" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {[
            { label: 'Active Users', value: '50,000+' },
            { label: 'Paid Out', value: 'Rs 5 Crore+' },
            { label: 'Tasks Available', value: '1,000+' },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-card p-6 text-center">
              <p className="text-2xl font-black text-[#a855f7]">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </AppShell>
  )
}
