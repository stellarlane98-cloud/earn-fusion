'use client'

import { useState } from 'react'
import { AppShell } from '@/components/dashboard/app-shell'
import { useApp } from '@/components/store/app-store'
import { formatPKR } from '@/lib/currency'
import { Wallet, Check, Copy, Smartphone, Building2, CreditCard } from 'lucide-react'

const METHODS = [
  { id: 'jazzcash', name: 'JazzCash', account: '0300-1234567', holder: 'EarnFusion Pvt Ltd', icon: Smartphone, color: '#e2136e' },
  { id: 'easypaisa', name: 'Easypaisa', account: '0345-7654321', holder: 'EarnFusion Pvt Ltd', icon: Smartphone, color: '#00a651' },
  { id: 'bank', name: 'Bank Transfer', account: 'PK36 SCBL 0000 0011 2345 6702', holder: 'EarnFusion Pvt Ltd (Meezan Bank)', icon: Building2, color: '#2b7fff' },
]

const QUICK = [500, 1000, 2500, 5000, 10000]

export default function DepositPage() {
  const { deposit } = useApp()
  const [method, setMethod] = useState(METHODS[0].id)
  const [amount, setAmount] = useState<string>('1000')
  const [trxId, setTrxId] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const selected = METHODS.find((m) => m.id === method)!
  const numeric = Number(amount) || 0
  const valid = numeric >= 200 && trxId.trim().length >= 4

  function copy(text: string, id: string) {
    navigator.clipboard?.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }

  function submit() {
    if (!valid) return
    deposit(numeric)
    setSubmitted(true)
    setTrxId('')
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <AppShell title="Deposit Funds" subtitle="Add money to your EarnFusion wallet.">
      <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Select Payment Method</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {METHODS.map((m) => {
                const Icon = m.icon
                const active = m.id === method
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition ${
                      active ? 'border-[#7c4dff] bg-[#7c4dff]/10' : 'border-white/10 bg-[#1a1a24] hover:border-white/20'
                    }`}
                  >
                    <span className="flex size-10 items-center justify-center rounded-full" style={{ backgroundColor: `${m.color}22`, color: m.color }}>
                      <Icon className="size-5" />
                    </span>
                    <span className="text-xs font-medium text-white">{m.name}</span>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Send Payment To</h2>
            <div className="space-y-3">
              <DetailRow label="Account Title" value={selected.holder} onCopy={() => copy(selected.holder, 'holder')} copied={copied === 'holder'} />
              <DetailRow label={selected.id === 'bank' ? 'IBAN' : 'Account Number'} value={selected.account} onCopy={() => copy(selected.account, 'account')} copied={copied === 'account'} />
            </div>
            <p className="mt-4 rounded-lg bg-[#1a1a24] p-3 text-xs leading-relaxed text-muted-foreground">
              Send the exact amount to the account above, then enter your transaction ID below to confirm your deposit.
            </p>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Deposit Amount</h2>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">Rs</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={200}
                className="w-full rounded-xl border border-white/10 bg-[#1a1a24] py-3 pl-10 pr-3 text-lg font-semibold text-white outline-none focus:border-[#7c4dff]"
                placeholder="0"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => setAmount(String(q))}
                  className="rounded-lg border border-white/10 bg-[#1a1a24] px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-[#7c4dff] hover:text-white"
                >
                  {formatPKR(q)}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Transaction ID (TID)</label>
              <input
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#1a1a24] px-3 py-3 text-sm text-white outline-none focus:border-[#7c4dff]"
                placeholder="e.g. 981234567"
              />
            </div>

            <button
              onClick={submit}
              disabled={!valid}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6d3bf5] to-[#8b5cf6] py-3 text-sm font-semibold text-white transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Wallet className="size-4" />
              Confirm Deposit
            </button>
            {numeric > 0 && numeric < 200 && <p className="mt-2 text-center text-xs text-[#ff6b8a]">Minimum deposit is {formatPKR(200)}</p>}

            {submitted && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#22c55e]/30 bg-[#22c55e]/10 p-3 text-xs text-[#4ade80]">
                <Check className="size-4 shrink-0" />
                Deposit confirmed and added to your balance.
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-white/10 bg-card p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <CreditCard className="size-4 text-[#7c4dff]" />
              Deposit Notes
            </div>
            <ul className="mt-3 list-inside list-disc space-y-2 text-xs leading-relaxed text-muted-foreground">
              <li>Deposits are usually processed within 5-10 minutes.</li>
              <li>Always send from an account registered in your own name.</li>
              <li>Keep your transaction receipt until the deposit is confirmed.</li>
            </ul>
          </section>
        </div>
      </div>
    </AppShell>
  )
}

function DetailRow({ label, value, onCopy, copied }: { label: string; value: string; onCopy: () => void; copied: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-[#1a1a24] px-3 py-2.5">
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-white">{value}</p>
      </div>
      <button
        onClick={onCopy}
        className="flex shrink-0 items-center gap-1 rounded-lg border border-white/10 px-2 py-1.5 text-[11px] text-muted-foreground transition hover:border-[#7c4dff] hover:text-white"
      >
        {copied ? <Check className="size-3.5 text-[#4ade80]" /> : <Copy className="size-3.5" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
