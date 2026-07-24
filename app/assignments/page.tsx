'use client'

import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, FileText, ImagePlus, Info, Coins, X } from 'lucide-react'
import { AppShell } from '@/components/dashboard/app-shell'
import { useApp } from '@/components/store/app-store'
import { formatPKR } from '@/lib/currency'

const REQUIRED_WORDS = 100
const REWARD = 800

export default function AssignmentsPage() {
  const { earn } = useApp()
  const fileRef = useRef<HTMLInputElement>(null)
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ text?: string; file?: string }>({})

  const wordCount = useMemo(
    () => text.trim().split(/\s+/).filter(Boolean).length,
    [text],
  )
  const enoughWords = wordCount >= REQUIRED_WORDS

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setFileName(f.name)
    setPreview(URL.createObjectURL(f))
    setErrors((prev) => ({ ...prev, file: undefined }))
  }

  function removeFile() {
    setFileName(null)
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const next: typeof errors = {}
    if (!enoughWords) next.text = `Please write at least ${REQUIRED_WORDS} words.`
    if (!fileName) next.file = 'Please attach a screenshot as proof.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmitted(true)
    earn(REWARD, 'Completed Assignment', 'assignment')
  }

  function reset() {
    setSubmitted(false)
    setText('')
    removeFile()
    setErrors({})
  }

  return (
    <AppShell
      title="Assignments"
      subtitle="Complete the writing task and submit proof to earn your reward."
    >
      <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1fr_300px]">
        <form
          onSubmit={submit}
          className="rounded-2xl border border-white/10 bg-card p-6"
        >
          <div className="flex items-start gap-3 rounded-xl border border-[#2b7fff]/25 bg-[#2b7fff]/10 p-4">
            <Info className="mt-0.5 size-5 shrink-0 text-[#2b7fff]" />
            <div>
              <h3 className="text-sm font-bold text-white">Instructions</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/70">
                Write a short review about your experience using EarnFusion. Be
                genuine and descriptive. Then upload a screenshot of your
                completed task as proof. Minimum {REQUIRED_WORDS} words required.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="assignment-text"
              className="mb-2 flex items-center justify-between text-sm font-semibold text-white"
            >
              Your Submission
              <span
                className={`text-xs font-medium ${enoughWords ? 'text-[#22c55e]' : 'text-muted-foreground'}`}
              >
                {wordCount} / {REQUIRED_WORDS} words
              </span>
            </label>
            <textarea
              id="assignment-text"
              value={text}
              onChange={(e) => {
                setText(e.target.value)
                if (errors.text) setErrors((p) => ({ ...p, text: undefined }))
              }}
              rows={7}
              placeholder="Start writing here…"
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#7c4dff]/50 focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/20"
            />
            {errors.text && (
              <p className="mt-1.5 text-xs font-medium text-[#ff6b8a]">
                {errors.text}
              </p>
            )}
          </div>

          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-white">
              Screenshot Proof
            </p>
            {preview ? (
              <div className="relative overflow-hidden rounded-xl border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Uploaded proof preview"
                  className="max-h-56 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeFile}
                  aria-label="Remove screenshot"
                  className="absolute right-2 top-2 rounded-lg bg-black/50 p-1.5 text-white hover:bg-black/70"
                >
                  <X className="size-4" />
                </button>
                <p className="truncate bg-black/40 px-3 py-1.5 text-xs text-white/80">
                  {fileName}
                </p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] py-8 text-muted-foreground transition-colors hover:border-[#7c4dff]/50 hover:text-white"
              >
                <ImagePlus className="size-7" />
                <span className="text-sm font-medium">
                  Tap to upload a screenshot
                </span>
                <span className="text-xs">PNG or JPG, up to 5MB</span>
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={onFile}
              className="hidden"
            />
            {errors.file && (
              <p className="mt-1.5 text-xs font-medium text-[#ff6b8a]">
                {errors.file}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#6d3bf5] to-[#8b5cf6] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#6d3bf5]/30 transition-transform active:scale-95"
          >
            Submit Assignment
          </button>
        </form>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-white/10 bg-card p-5">
            <span className="flex size-11 items-center justify-center rounded-xl bg-[#16a34a] text-white shadow-lg">
              <FileText className="size-5" />
            </span>
            <h3 className="mt-3 text-base font-bold text-white">Task Details</h3>
            <dl className="mt-3 flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Required Words</dt>
                <dd className="font-bold text-white">{REQUIRED_WORDS}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Reward</dt>
                <dd className="flex items-center gap-1 font-bold text-[#f59e0b]">
                  <Coins className="size-4" />
                  {formatPKR(REWARD)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Proof</dt>
                <dd className="font-bold text-white">Screenshot</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={reset}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl border border-white/10 bg-card p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#22c55e]/15"
              >
                <CheckCircle2 className="size-10 text-[#4ade80]" />
              </motion.div>
              <h3 className="mt-4 text-xl font-bold text-white">
                Submission Successful
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your assignment has been submitted for review and{' '}
                {formatPKR(REWARD)} was added to your balance.
              </p>
              <button
                onClick={reset}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#6d3bf5] to-[#8b5cf6] py-3 text-sm font-bold text-white transition-transform active:scale-95"
              >
                Great
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  )
}
