'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useApp } from './app-store'
import { cn } from '@/lib/utils'

export function ToastHost() {
  const { toasts } = useApp()

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[120] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            className={cn(
              'pointer-events-auto flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-2xl backdrop-blur-md',
              t.tone === 'success'
                ? 'border-[#22c55e]/30 bg-[#0d1f18]/90 text-[#4ade80]'
                : 'border-[#ff3b6b]/30 bg-[#210d15]/90 text-[#ff6b8a]',
            )}
          >
            {t.tone === 'success' ? (
              <CheckCircle2 className="size-5 shrink-0" />
            ) : (
              <XCircle className="size-5 shrink-0" />
            )}
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
