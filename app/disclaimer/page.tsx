'use client'

import { AppShell } from '@/components/dashboard/app-shell'
import { AlertCircle, FileText, Shield, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function DisclaimerPage() {
  return (
    <AppShell>
      <div className="max-w-4xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
            <AlertCircle className="size-8 text-yellow-400" />
            Important Disclaimer
          </h1>
          <p className="mt-2 text-muted-foreground">Please read this carefully before using EarnFusion</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Risk Warning */}
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-6">
            <div className="mb-4 flex items-center gap-3">
              <TrendingUp className="size-5 text-yellow-400" />
              <h2 className="text-lg font-bold text-white">Financial Risk Warning</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Earnings through EarnFusion are not guaranteed. Your actual income depends on multiple factors including the
              number of available tasks, task completion rates, game participation, and market conditions. Past earnings do
              not guarantee future results. Treat all earnings as variable income.
            </p>
          </div>

          {/* No Employment */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center gap-3">
              <FileText className="size-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Not Employment</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              EarnFusion is a platform for gig work and should not be considered employment. You are an independent
              contractor responsible for your own taxes, insurance, and benefits. No employee protections apply. Earnings
              are subject to platform fees and may be reduced without notice.
            </p>
          </div>

          {/* Age Requirement */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center gap-3">
              <Shield className="size-5 text-green-400" />
              <h2 className="text-lg font-bold text-white">Age & Eligibility</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You must be at least 18 years old to use EarnFusion and create an account. By using this platform, you
              represent and warrant that you meet all eligibility requirements. We reserve the right to verify age and
              eligibility at any time.
            </p>
          </div>

          {/* Account Suspension */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-lg font-bold text-white">Account Suspension & Termination</h2>
            <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
              We reserve the right to suspend, restrict, or terminate your account at any time for any reason, including
              but not limited to:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-purple-400">•</span>
                <span>Violation of our Terms & Conditions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-400">•</span>
                <span>Suspicious or fraudulent activity</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-400">•</span>
                <span>Use of automated tools or bots</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-400">•</span>
                <span>Poor quality work or missed deadlines</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-400">•</span>
                <span>Non-compliance with platform policies</span>
              </li>
            </ul>
          </div>

          {/* Withdrawal Delays */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-lg font-bold text-white">Withdrawal & Payment Terms</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Withdrawals are processed within 24-48 business hours but may take longer depending on payment method and
              bank processing times. We are not responsible for delays caused by payment providers. Minimum withdrawal
              amounts may apply. All withdrawals are subject to verification and anti-fraud checks.
            </p>
          </div>

          {/* Data & Privacy */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-lg font-bold text-white">Data & Privacy</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We collect and process personal data as outlined in our Privacy Policy. By using EarnFusion, you consent to
              our data practices. We use industry-standard security measures, but no system is completely secure. We are
              not responsible for unauthorized access to your account.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-lg font-bold text-white">Limitation of Liability</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              EarnFusion is provided &quot;as is&quot; without warranties of any kind. To the fullest extent permitted by law,
              we are not liable for indirect, incidental, special, or consequential damages. Our total liability is
              limited to the amount you have earned on the platform in the last 30 days.
            </p>
          </div>

          {/* Geographic Restrictions */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-lg font-bold text-white">Geographic Restrictions</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              EarnFusion is available primarily in Pakistan. Users from other countries may have limited access to certain
              features or may be restricted from using the platform altogether. Compliance with local laws is your
              responsibility.
            </p>
          </div>

          {/* Updates */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-lg font-bold text-white">Changes & Updates</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We reserve the right to change, modify, or discontinue any part of EarnFusion at any time. We may update
              earning rates, features, terms, and conditions without notice. Your continued use constitutes acceptance of
              any changes.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 border-t border-white/10 pt-8">
          <Link href="/privacy">
            <button className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10">
              Privacy Policy
            </button>
          </Link>
          <Link href="/terms">
            <button className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10">
              Terms & Conditions
            </button>
          </Link>
          <Link href="/contact">
            <button className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10">
              Contact Support
            </button>
          </Link>
        </div>

        {/* Acknowledgment */}
        <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-6">
          <p className="text-center text-sm text-muted-foreground">
            By using EarnFusion, you acknowledge that you have read, understood, and agree to this disclaimer and all
            applicable terms and conditions.
          </p>
        </div>
      </div>
    </AppShell>
  )
}
