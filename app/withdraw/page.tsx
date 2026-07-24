'use client'

import { useState } from 'react'
import { AppShell } from '@/components/dashboard/app-shell'
import { useApp } from '@/components/store/app-store'
import { formatPKR } from '@/lib/currency'
import { Banknote, Check, Clock, Smartphone, Building2, ArrowDownToLine } from 'lucide-react'

const METHODS = [
  { id: 'jazzcash', name: 'JazzCash', icon: Smartphone, color: '#e2136e', placeholder: '03XX-XXXXXXX' },
  { id: 'easypaisa', name: 'Easypaisa', icon: Smartphone, color: '#00a651', placeholder: '03XX-XXXXXXX' },
  { id: 'bank', name: 'Bank Account', icon: Building2, color: '#2b7fff', placeholder: 'IBAN / Account No.' },
]

const QUICK = [100, 300, 500, 1000]
const MIN_WITHDRAWAL = 100
const REQUIRED_REFERRALS = 2
const FEE_RATE = 0.02

type WithdrawalRecord = {
  id: string
  amount: number
  method: string
  status: 'pending' | 'completed'
}

export default function WithdrawPage() {
  const { balance, withdraw, referralCount } = useApp()
  const [method, setMethod] = useState(METHODS[0].id)
  const [amount, setAmount] = useState('100')
  const [account, setAccount] = useState('')
  const [holder, setHolder] = useState('')
  const [history, setHistory] = useState<WithdrawalRecord[]>([])

  const selected = METHODS.find((m) => m.id === method)!
  const numeric = Number(amount) || 0
  const fee = Math.round(numeric * FEE_RATE)
  const receive = Math.max(0, numeric - fee)
  const hasRequiredReferrals = referralCount >= REQUIRED_REFERRALS
  const valid = numeric >= MIN_WITHDRAWAL && numeric <= balance && account.trim().length >= 4 && holder.trim().length >= 2 && hasRequiredReferrals

  function submit() {
    if (!valid) return
    withdraw(numeric)
    setHistory((h) => [{ id: `w-${Date.now()}`, amount: numeric, method: selected.name, status: 'pending' }, ...h])
    setAccount('')
    setHolder('')
  }

  return (
    <AppShell title="Withdraw Funds" subtitle="Cash out your earnings to your account.">
      <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#7c4dff]/25 to-card p-5">
            <p className="text-xs text-white/70">Available Balance</p>
            <p className="mt-1 text-3xl font-bold text-white">{formatPKR(balance)}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Withdraw To</h2>
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

            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Account Holder Name</label>
                <input
                  value={holder}
                  onChange={(e) => setHolder(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#1a1a24] px-3 py-3 text-sm text-white outline-none focus:border-[#7c4dff]"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  {selected.id === 'bank' ? 'IBAN / Account Number' : 'Mobile Number'}
                </label>
                <input
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#1a1a24] px-3 py-3 text-sm text-white outline-none focus:border-[#7c4dff]"
                  placeholder={selected.placeholder}
                />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Amount</h2>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">Rs</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                className="w-full rounded-xl border border-white/10 bg-[#1a1a24] py-3 pl-10 pr-3 text-lg font-semibold text-white outline-none focus:border-[#7c4dff]"
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

            <div className="mt-4 space-y-2 rounded-xl bg-[#1a1a24] p-3 text-xs">
              <Row label="Withdrawal amount" value={formatPKR(numeric)} />
              <Row label={`Processing fee (${Math.round(FEE_RATE * 100)}%)`} value={`- ${formatPKR(fee)}`} />
              <div className="border-t border-white/10 pt-2">
                <Row label="You receive" value={formatPKR(receive)} strong />
              </div>
            </div>

            <button
              onClick={submit}
              disabled={!valid}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6d3bf5] to-[#8b5cf6] py-3 text-sm font-semibold text-white transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowDownToLine className="size-4" />
              Request Withdrawal
            </button>
            {!hasRequiredReferrals && <p className="mt-2 text-center text-xs text-[#ff6b8a]">You need {REQUIRED_REFERRALS} referrals to unlock withdrawal</p>}
            {numeric > 0 && numeric < MIN_WITHDRAWAL && hasRequiredReferrals && <p className="mt-2 text-center text-xs text-[#ff6b8a]">Minimum withdrawal is {formatPKR(MIN_WITHDRAWAL)}</p>}
            {numeric > balance && hasRequiredReferrals && <p className="mt-2 text-center text-xs text-[#ff6b8a]">Amount exceeds your balance</p>}
            {numeric > 0 && account.trim().length < 4 && <p className="mt-2 text-center text-xs text-[#ff6b8a]">Please enter a valid account number</p>}
          </section>

          <section className="rounded-2xl border border-white/10 bg-card p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Banknote className="size-4 text-[#7c4dff]" />
              Recent Withdrawals
            </div>
            <div className="mt-3 space-y-2">
              {history.length === 0 && <p className="text-xs text-muted-foreground">No withdrawals yet.</p>}
              {history.slice(0, 4).map((w) => (
                <div key={w.id} className="flex items-center justify-between rounded-xl bg-[#1a1a24] px-3 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-white">{formatPKR(w.amount)}</p>
                    <p className="text-[11px] text-muted-foreground">{w.method}</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-[#f59e0b]/15 px-2.5 py-1 text-[11px] font-medium text-[#f59e0b]">
                    <Clock className="size-3" />
                    Pending
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  )
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={strong ? 'text-sm font-semibold text-white' : 'text-gray-200'}>{value}</span>
    </div>
  )
}
