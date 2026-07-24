'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { exploreCards, type ExploreCard } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

/** Desktop card — vertical layout, full-bleed art */
function DesktopFeatureCard({ card }: { card: ExploreCard }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link
        href={card.href}
        className={cn(
          'group relative flex h-56 w-full flex-col overflow-hidden rounded-2xl border border-white/10 text-left',
          card.theme.ring,
        )}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${card.image})` }}
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent opacity-70',
            card.theme.glow,
          )}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0b0e1a] via-[#0b0e1a]/85 to-transparent" />

        <div className="relative z-10 flex flex-1 flex-col p-4">
          <span
            className={cn(
              'flex size-9 items-center justify-center rounded-xl text-white shadow-lg',
              card.theme.iconBg,
            )}
          >
            <card.icon className="size-5" />
          </span>
          <div className="mt-auto flex items-end justify-between">
            <div>
              <h3 className="text-base font-bold text-white">{card.title}</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-white/60">
                {card.description}
              </p>
            </div>
            <span
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-full text-white transition-transform group-hover:translate-x-0.5',
                card.theme.arrow,
              )}
            >
              <ArrowRight className="size-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/** Mobile card — full-bleed art with overlaid text */
function MobileFeatureCard({ card }: { card: ExploreCard }) {
  return (
    <Link
      href={card.href}
      className="group relative flex h-44 flex-col overflow-hidden rounded-2xl border border-white/10 text-left transition-transform active:scale-[0.98]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${card.image})` }}
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b to-transparent opacity-60',
          card.theme.glow,
        )}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0b0e1a] via-[#0b0e1a]/80 to-transparent" />

      <div className="relative z-10 flex flex-1 flex-col p-4">
        <span
          className={cn(
            'flex size-9 items-center justify-center rounded-xl text-white shadow-lg',
            card.theme.iconBg,
          )}
        >
          <card.icon className="size-5" />
        </span>
        <div className="mt-auto">
          <h3 className="text-base font-bold text-white">{card.title}</h3>
          <p className="mt-0.5 text-xs leading-relaxed text-white/60">
            {card.description}
          </p>
        </div>
      </div>
      <span className="absolute bottom-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
        <ArrowRight className="size-4" />
      </span>
    </Link>
  )
}

export function ExploreCardsDesktop() {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {exploreCards.map((card) => (
        <DesktopFeatureCard key={card.title} card={card} />
      ))}
    </div>
  )
}

export function ExploreCardsMobile() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {exploreCards.map((card) => (
        <MobileFeatureCard key={card.title} card={card} />
      ))}
    </div>
  )
}
