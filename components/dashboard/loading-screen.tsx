'use client'

import { useEffect, useState } from 'react'

export function LoadingScreen({ show }: { show: boolean }) {
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    if (!show) {
      const t = setTimeout(() => setMounted(false), 450)
      return () => clearTimeout(t)
    }
  }, [show])

  if (!mounted) return null

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-450 ${
        show ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ transitionDuration: '450ms' }}
    >
      <div className="flex animate-pulse-glow items-center gap-1 text-4xl font-extrabold tracking-tight">
        <span className="text-white">Earn</span>
        <span className="text-[#7c4dff]">Fusion</span>
      </div>
      <div className="mt-6 h-1 w-40 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/2 animate-[loadingbar_1s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-[#6d3bf5] to-[#a855f7]" />
      </div>
    </div>
  )
}
