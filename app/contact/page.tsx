'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { AppShell } from '@/components/dashboard/app-shell'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <AppShell
      title="Contact Us"
      subtitle="Get in touch with our support team."
    >
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-card p-6"
          >
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-[#7c4dff] focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-[#7c4dff] focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-[#7c4dff] focus:outline-none"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-[#7c4dff] focus:outline-none"
                  placeholder="Tell us more..."
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full rounded-lg bg-gradient-to-r from-[#6d3bf5] to-[#a855f7] py-3 text-sm font-bold text-white transition active:scale-95"
              >
                <Send className="size-4" />
                Send Message
              </button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 rounded-lg border border-[#22c55e]/30 bg-[#22c55e]/10 p-3 text-sm text-[#4ade80]"
                >
                  <CheckCircle2 className="size-5" />
                  Message sent successfully!
                </motion.div>
              )}
            </div>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="rounded-xl border border-white/10 bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#2b7fff]/20 text-[#60a5fa]">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-white">support@earnfusion.pk</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#f59e0b]/20 text-[#fbbf24]">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-white">+92 21 1234567</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-card p-4">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#22c55e]/20 text-[#4ade80]">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Office</p>
                  <p className="text-sm font-medium text-white">
                    Plot 123, Business Park
                    <br />
                    Karachi, Pakistan
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-card p-4">
              <p className="text-xs font-medium text-muted-foreground">Response Time</p>
              <p className="mt-1 text-sm text-white">Within 24 hours</p>
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  )
}
