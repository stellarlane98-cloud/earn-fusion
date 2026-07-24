'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CircleDollarSign, History } from 'lucide-react'
import { AnimatedCounter } from './animated-counter'
import { useApp } from '@/components/store/app-store'

const cardBase =
  'relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2b5fff] via-[#5b3ce0] to-[#7c2fd6] shadow-2xl shadow-[#5b3ce0]/30'

/** Wallet artwork that covers the right side and fades into the card gradient */
function WalletArt({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
      style={{
        backgroundImage: 'url(/assets/wallet-3d.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 32%, black 100%)',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 32%, black 100%)',
      }}
    />
  )
}

/** Desktop wide balance card */
export function BalanceCardDesktop() {
  const { balance } = useApp()
  return (
    <div className={cardBase + ' p-8'}>
      <div className="absolute -left-10 top-0 size-64 rounded-full bg-white/10 blur-3xl" />
      <WalletArt className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] sm:block" />
      <div className="relative z-10 max-w-md">
        <p className="text-sm font-medium text-white/80">Total Balance (PKR)</p>
        <AnimatedCounter
          value={balance}
          prefix="Rs "
          className="mt-1 block text-5xl font-extrabold tracking-tight text-white"
        />
        <p className="mt-2 text-sm text-white/70">Available for withdraw</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/withdraw"
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#3b2a8f] shadow-lg transition-transform active:scale-95"
          >
            Withdraw Now
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/transactions"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
          >
            <History className="size-4" />
            History
          </Link>
        </div>
      </div>
    </div>
  )
}

/** Mobile / full-width balance card */
export function BalanceCardMobile() {
  const { balance } = useApp()
  return (
    <div className={cardBase + ' p-6'}>
      <WalletArt className="pointer-events-none absolute inset-y-0 right-0 w-[52%]" />
      <div className="absolute right-5 top-5 z-20 flex size-11 items-center justify-center rounded-full bg-white">
        <CircleDollarSign className="size-6 text-[#3b2a8f]" />
      </div>
      <div className="relative z-10">
        <p className="text-sm font-medium text-white/80">Total Balance (PKR)</p>
        <AnimatedCounter
          value={balance}
          prefix="Rs "
          className="mt-1 block text-4xl font-extrabold tracking-tight text-white"
        />
        <p className="mt-1 text-sm text-white/70">Available for withdraw</p>
        <Link
          href="/withdraw"
          className="group mt-5 inline-flex items-center gap-3 rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
        >
          Withdraw
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
