'use client'

import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { AppShell } from '@/components/dashboard/app-shell'

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      content:
        'We collect information you provide directly, such as when you create an account, complete a task, or contact us. This includes your name, email, phone number, and payment information.',
    },
    {
      title: 'How We Use Your Data',
      content:
        'We use your information to process transactions, improve our services, communicate with you about your account, and comply with legal obligations. We never sell your personal data to third parties.',
    },
    {
      title: 'Data Security',
      content:
        'We employ industry-standard security measures to protect your data. All sensitive information is encrypted and stored securely. However, no method of transmission over the internet is completely secure.',
    },
    {
      title: 'Your Rights',
      content:
        'You have the right to access, modify, or delete your personal information at any time. Simply contact us through the Help Center to request changes to your account.',
    },
    {
      title: 'Cookies and Tracking',
      content:
        'We use cookies to enhance your experience on our platform. These help us remember your preferences and improve functionality. You can control cookies through your browser settings.',
    },
    {
      title: 'Third-Party Services',
      content:
        'We may share your information with payment processors and service providers who assist us in operating the platform. These partners are bound by confidentiality agreements.',
    },
    {
      title: 'Children\'s Privacy',
      content:
        'EarnFusion is not intended for users under 18 years old. We do not knowingly collect information from minors. If you\'re aware of any violation, please contact us immediately.',
    },
    {
      title: 'Policy Changes',
      content:
        'We may update this privacy policy from time to time. We will notify you of significant changes via email or through the app. Continued use of the platform constitutes acceptance of the updated policy.',
    },
  ]

  return (
    <AppShell
      title="Privacy Policy"
      subtitle="How we protect your data and privacy."
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-card p-4"
        >
          <Shield className="size-6 shrink-0 text-[#a855f7]" />
          <p className="text-sm text-muted-foreground">
            Last updated: July 19, 2026. We take your privacy seriously.
          </p>
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
              <p className="leading-relaxed text-muted-foreground">{section.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-white/10 bg-card p-6"
        >
          <h3 className="text-lg font-bold text-white">Questions About Privacy?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            If you have any questions about our privacy practices, please contact us at{' '}
            <span className="font-medium text-white">privacy@earnfusion.pk</span>
          </p>
        </motion.div>
      </div>
    </AppShell>
  )
}
