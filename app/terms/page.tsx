'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { AppShell } from '@/components/dashboard/app-shell'

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content:
        'By accessing and using EarnFusion, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to abide by the above, please do not use this service.',
    },
    {
      title: 'Use License',
      content:
        'Permission is granted to temporarily download one copy of the materials (information or software) on EarnFusion for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify the materials, copy or duplicate the materials for commercial purposes, use the materials for any unlawful purpose, or attempt to decompile or reverse engineer the software.',
    },
    {
      title: 'Disclaimer',
      content:
        'The materials on EarnFusion are provided on an "as is" basis. EarnFusion makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
    },
    {
      title: 'Limitations',
      content:
        'In no event shall EarnFusion or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on EarnFusion.',
    },
    {
      title: 'Accuracy of Materials',
      content:
        'The materials appearing on EarnFusion could include technical, typographical, or photographic errors. EarnFusion does not warrant that any of the materials on its website are accurate, complete, or current. EarnFusion may make changes to the materials contained on its website at any time without notice.',
    },
    {
      title: 'Links',
      content:
        'EarnFusion has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by EarnFusion of the site. Use of any such linked website is at the user\'s own risk.',
    },
    {
      title: 'Modifications',
      content:
        'EarnFusion may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.',
    },
    {
      title: 'Governing Law',
      content:
        'These terms and conditions are governed by and construed in accordance with the laws of Pakistan, and you irrevocably submit to the exclusive jurisdiction of the courts in Karachi, Pakistan.',
    },
    {
      title: 'User Responsibilities',
      content:
        'You agree that you will not use EarnFusion for any purpose that is unlawful or prohibited by these terms. You are responsible for maintaining the confidentiality of your account and password and for all activities that occur under your account. You agree to notify EarnFusion immediately of any unauthorized use of your account.',
    },
    {
      title: 'Reward Eligibility',
      content:
        'All tasks must be completed in accordance with the specific instructions provided. EarnFusion reserves the right to reject any submission that does not meet the stated requirements or appears to violate these terms. Rewards are only earned upon successful completion and approval of tasks.',
    },
  ]

  return (
    <AppShell
      title="Terms & Conditions"
      subtitle="Important legal information about using EarnFusion."
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-[#f59e0b]/20 bg-[#f59e0b]/5 p-4"
        >
          <AlertCircle className="size-6 shrink-0 text-[#fbbf24]" />
          <div>
            <p className="text-sm font-medium text-white">Please read carefully</p>
            <p className="mt-1 text-xs text-muted-foreground">
              By using EarnFusion, you agree to these terms and conditions. Violation of any terms may result in account suspension or termination.
            </p>
          </div>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="space-y-2"
            >
              <h3 className="text-lg font-bold text-white">{section.title}</h3>
              <p className="leading-relaxed text-muted-foreground text-justify">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-white/10 bg-card p-6"
        >
          <h3 className="text-lg font-bold text-white">Agreement</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            By continuing to use EarnFusion, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions outlined above.
          </p>
        </motion.div>
      </div>
    </AppShell>
  )
}
