'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown, MessageCircle, Mail, Phone, Search } from 'lucide-react'
import { AppShell } from '@/components/dashboard/app-shell'

type FAQItem = {
  id: string
  question: string
  answer: string
  category: string
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Getting Started',
    question: 'How do I create an account?',
    answer:
      'Creating an account is easy! Download the app, tap Sign Up, and fill in your details. Verify your email and phone number to get started earning.',
  },
  {
    id: 'faq-2',
    category: 'Getting Started',
    question: 'Is there a minimum withdrawal amount?',
    answer: 'Yes, the minimum withdrawal amount is Rs 500. You can request a withdrawal anytime your balance reaches this amount.',
  },
  {
    id: 'faq-3',
    category: 'Games',
    question: 'How do the games work?',
    answer:
      'Our games are designed to be fun and rewarding. Each game has different rules and rewards. Play regularly to earn more points and unlock special bonuses.',
  },
  {
    id: 'faq-4',
    category: 'Games',
    question: 'Can I play games multiple times?',
    answer: 'Yes! You can play most games multiple times per day. Each game attempt gives you a chance to earn rewards.',
  },
  {
    id: 'faq-5',
    category: 'Payments',
    question: 'How long does a withdrawal take?',
    answer:
      'Most withdrawals are processed within 24-48 hours. You&apos;ll receive a notification once your withdrawal is completed.',
  },
  {
    id: 'faq-6',
    category: 'Payments',
    question: 'What payment methods are supported?',
    answer:
      'We support JazzCash, Easypaisa, and direct bank transfers. Choose the method that works best for you.',
  },
  {
    id: 'faq-7',
    category: 'Tasks',
    question: 'How are assignments scored?',
    answer:
      'Assignments are manually reviewed by our team. Once approved, rewards are added to your account within 24 hours.',
  },
  {
    id: 'faq-8',
    category: 'Videos',
    question: 'Do I need to watch the entire video?',
    answer: 'Yes, you must watch the complete video to earn the reward. The progress bar shows how much you&apos;ve watched.',
  },
]

export default function HelpPage() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase()) ||
      faq.category.toLowerCase().includes(search.toLowerCase()),
  )

  const categories = [...new Set(FAQS.map((f) => f.category))]

  return (
    <AppShell
      title="Help Center"
      subtitle="Find answers to your questions and get support."
    >
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for help..."
            className="w-full rounded-xl border border-white/10 bg-card py-3 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground focus:border-[#7c4dff]/50 focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/20"
          />
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-card p-8 text-center">
              <HelpCircle className="mx-auto size-10 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">
                No results found. Try a different search.
              </p>
            </div>
          ) : (
            <>
              {categories.map((category) => {
                const categoryFaqs = filtered.filter((f) => f.category === category)
                if (categoryFaqs.length === 0) return null

                return (
                  <div key={category}>
                    <h3 className="mb-3 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {categoryFaqs.map((faq) => (
                        <motion.div
                          key={faq.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="overflow-hidden rounded-xl border border-white/10 bg-card transition hover:border-white/20"
                        >
                          <button
                            onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
                            className="flex w-full items-center justify-between p-4 text-left"
                          >
                            <span className="text-sm font-medium text-white">
                              {faq.question}
                            </span>
                            <motion.div
                              animate={{ rotate: expanded === faq.id ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="size-5 text-muted-foreground" />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {expanded === faq.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="border-t border-white/10 px-4 py-3"
                              >
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#6d3bf5]/20 to-[#a855f7]/5 p-6"
        >
          <h3 className="mb-3 text-lg font-bold text-white">Still need help?</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Can&apos;t find what you&apos;re looking for? Get in touch with our support team.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-lg border border-[#7c4dff]/30 bg-[#7c4dff]/10 px-4 py-2.5 text-sm font-medium text-[#a855f7] transition hover:bg-[#7c4dff]/20">
              <MessageCircle className="size-4" />
              Live Chat
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-[#7c4dff]/30 bg-[#7c4dff]/10 px-4 py-2.5 text-sm font-medium text-[#a855f7] transition hover:bg-[#7c4dff]/20">
              <Mail className="size-4" />
              Email Support
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-[#7c4dff]/30 bg-[#7c4dff]/10 px-4 py-2.5 text-sm font-medium text-[#a855f7] transition hover:bg-[#7c4dff]/20">
              <Phone className="size-4" />
              Call Us
            </button>
          </div>
        </motion.div>
      </div>
    </AppShell>
  )
}
