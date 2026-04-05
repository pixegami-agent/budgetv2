'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

// ── Mock data ────────────────────────────────────────────────
const monthlyData = [
  { month: 'Oct', income: 8200, expenses: 5100 },
  { month: 'Nov', income: 7800, expenses: 6300 },
  { month: 'Dec', income: 9500, expenses: 7800 },
  { month: 'Jan', income: 8900, expenses: 5600 },
  { month: 'Feb', income: 9200, expenses: 6100 },
  { month: 'Mar', income: 10400, expenses: 6800 },
];

const categoryData = [
  { name: 'Housing', amount: 2100 },
  { name: 'Food', amount: 980 },
  { name: 'Transport', amount: 540 },
  { name: 'Shopping', amount: 760 },
  { name: 'Utilities', amount: 320 },
  { name: 'Health', amount: 210 },
];

const allTransactions = [
  { id: 1,  date: '2026-03-28', desc: 'Salary Deposit',         category: 'Income',     amount: +10400.00 },
  { id: 2,  date: '2026-03-27', desc: 'Rent — March',           category: 'Housing',    amount: -2100.00 },
  { id: 3,  date: '2026-03-26', desc: 'Woolworths',             category: 'Food',       amount: -143.20 },
  { id: 4,  date: '2026-03-25', desc: 'Netflix',                category: 'Shopping',   amount: -22.99 },
  { id: 5,  date: '2026-03-24', desc: 'Opal Card Top-up',       category: 'Transport',  amount: -50.00 },
  { id: 6,  date: '2026-03-23', desc: 'Electricity Bill',       category: 'Utilities',  amount: -189.00 },
  { id: 7,  date: '2026-03-22', desc: 'Freelance Payment',      category: 'Income',     amount: +1500.00 },
  { id: 8,  date: '2026-03-21', desc: 'Coles',                  category: 'Food',       amount: -87.60 },
  { id: 9,  date: '2026-03-20', desc: 'Gym Membership',         category: 'Health',     amount: -59.00 },
  { id: 10, date: '2026-03-19', desc: 'Amazon Purchase',        category: 'Shopping',   amount: -134.99 },
  { id: 11, date: '2026-03-18', desc: 'Uber Eats',              category: 'Food',       amount: -41.80 },
  { id: 12, date: '2026-03-17', desc: 'Interest Income',        category: 'Income',     amount: +18.45 },
  { id: 13, date: '2026-03-16', desc: 'Chemist Warehouse',      category: 'Health',     amount: -52.30 },
  { id: 14, date: '2026-03-15', desc: 'Spotify',                category: 'Shopping',   amount: -11.99 },
  { id: 15, date: '2026-03-14', desc: 'NRMA Insurance',         category: 'Utilities',  amount: -131.00 },
  { id: 16, date: '2026-03-13', desc: 'Coffee Shop x12',        category: 'Food',       amount: -72.00 },
  { id: 17, date: '2026-03-12', desc: 'Airbnb Income',          category: 'Income',     amount: +820.00 },
  { id: 18, date: '2026-03-11', desc: 'JB Hi-Fi',               category: 'Shopping',   amount: -349.00 },
  { id: 19, date: '2026-03-10', desc: 'Water Bill',             category: 'Utilities',  amount: -98.00 },
  { id: 20, date: '2026-03-09', desc: 'Petrol — BP',            category: 'Transport',  amount: -89.40 },
];

const PAGE_SIZE = 7;

const categoryColors: Record<string, string> = {
  Income: 'var(--green)',
  Housing: 'var(--violet)',
  Food: 'var(--cyan)',
  Transport: 'var(--amber)',
  Shopping: 'var(--indigo-light)',
  Utilities: '#94A3B8',
  Health: '#FB7185',
};

const fmt = (n: number) =>
  (n < 0 ? '-' : '+') + '$' + Math.abs(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-4 py-3 text-sm" style={{ minWidth: 160 }}>
      <p className="font-semibold mb-2" style={{ fontFamily: 'var(--font-syne)' }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: ${p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

// ── Component ─────────────────────────────────────────────────
export default function Dashboard() {
  const [dragActive, setDragActive] = useState(false);
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(allTransactions.length / PAGE_SIZE);
  const txns = allTransactions.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const totalIncome = allTransactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalExpenses = allTransactions.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-grid" style={{ background: 'var(--bg-primary)' }}>
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] pointer-events-none opacity-60"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />

      {/* Header */}
      <header className="relative z-10 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366F1, #C084FC)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-syne)' }}>
              Claw Budget <span style={{ color: 'var(--violet)' }}>v2</span>
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: 'rgba(99,102,241,0.2)', color: 'var(--indigo-light)', fontFamily: 'var(--font-syne)' }}>
              Beta
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366F1, #C084FC)', fontFamily: 'var(--font-syne)' }}>
              J
            </div>
            <button onClick={() => signOut({ redirect: true, callbackUrl: '/auth/signin' })}
              className="text-sm transition-colors" style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--text-muted)'}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-10 relative z-10 space-y-8">

        {/* Page title */}
        <div>
          <h1 className="text-3xl font-bold gradient-text" style={{ fontFamily: 'var(--font-syne)' }}>
            Good morning, Jack 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>March 2026 · Demo data</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Total Income" value={`$${totalIncome.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`}
            change="+12.4% vs last month" positive accent="var(--green)"
            icon={<TrendUpIcon />} />
          <StatCard label="Total Expenses" value={`$${totalExpenses.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`}
            change="+5.1% vs last month" positive={false} accent="var(--red)"
            icon={<TrendDownIcon />} />
          <StatCard label="Net Balance" value={`$${netBalance.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`}
            change="Savings rate: 35.2%" positive accent="var(--cyan)"
            icon={<WalletIcon />} />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Income vs Expenses - area chart */}
          <div className="glass rounded-2xl p-6 lg:col-span-3">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ fontFamily: 'var(--font-syne)', color: 'var(--text-secondary)' }}>
              Income vs Expenses
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: '#94A3B8', paddingTop: 8 }} />
                <Area type="monotone" dataKey="income" name="Income" stroke="#6366F1" strokeWidth={2}
                  fill="url(#incomeGrad)" dot={false} />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#F43F5E" strokeWidth={2}
                  fill="url(#expenseGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Spending by category - bar chart */}
          <div className="glass rounded-2xl p-6 lg:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ fontFamily: 'var(--font-syne)', color: 'var(--text-secondary)' }}>
              By Category
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `$${v}`} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} width={70} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" name="Spent" fill="#6366F1" radius={[0, 4, 4, 0]}
                  label={{ position: 'right', fill: '#94A3B8', fontSize: 11, formatter: (v: any) => `$${v}` }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upload + Table row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Upload zone — compact */}
          <div
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => setDragActive(false)}
            className="glass rounded-2xl p-6 lg:col-span-2 flex flex-col items-center justify-center text-center transition-all min-h-[180px]"
            style={{ borderColor: dragActive ? 'var(--indigo)' : undefined }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: 'rgba(99,102,241,0.15)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-syne)' }}>Upload Statement</p>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>PDF or CSV · auto-parsed</p>
            <input type="file" multiple accept=".pdf,.csv" className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="btn-primary px-5 py-2 rounded-xl text-xs cursor-pointer">
              Browse Files
            </label>
          </div>

          {/* Transactions table */}
          <div className="glass rounded-2xl p-6 lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-syne)', color: 'var(--text-secondary)' }}>
                Transactions
              </h2>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, allTransactions.length)} of {allTransactions.length}
              </span>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                  <th className="text-left pb-3 font-medium text-xs uppercase tracking-wider">Date</th>
                  <th className="text-left pb-3 font-medium text-xs uppercase tracking-wider">Description</th>
                  <th className="text-left pb-3 font-medium text-xs uppercase tracking-wider">Category</th>
                  <th className="text-right pb-3 font-medium text-xs uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody>
                {txns.map((t, i) => (
                  <tr key={t.id}
                    style={{ borderBottom: i < txns.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <td className="py-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                      {t.date.slice(5).replace('-', '/')}
                    </td>
                    <td className="py-3 pr-4" style={{ color: 'var(--text-primary)' }}>{t.desc}</td>
                    <td className="py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: `${categoryColors[t.category] || '#94A3B8'}18`,
                          color: categoryColors[t.category] || '#94A3B8',
                        }}>
                        {t.category}
                      </span>
                    </td>
                    <td className="py-3 text-right font-semibold tabular-nums"
                      style={{
                        color: t.amount > 0 ? 'var(--green)' : 'var(--red)',
                        fontFamily: 'var(--font-syne)',
                      }}>
                      {fmt(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="text-xs px-3 py-1.5 rounded-lg transition-all disabled:opacity-30"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
                ← Prev
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i)}
                    className="w-6 h-6 rounded text-xs font-semibold transition-all"
                    style={{
                      background: i === page ? 'linear-gradient(135deg, #6366F1, #C084FC)' : 'rgba(255,255,255,0.06)',
                      color: i === page ? 'white' : 'var(--text-muted)',
                      fontFamily: 'var(--font-syne)',
                    }}>
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="text-xs px-3 py-1.5 rounded-lg transition-all disabled:opacity-30"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
                Next →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────
function StatCard({ label, value, change, positive, accent, icon }: {
  label: string; value: string; change: string;
  positive: boolean; accent: string; icon: React.ReactNode;
}) {
  return (
    <div className="glass rounded-2xl p-6" style={{ boxShadow: `0 0 30px ${accent}10` }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-widest"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-syne)' }}>{label}</span>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${accent}18`, color: accent }}>{icon}</div>
      </div>
      <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-syne)' }}>{value}</div>
      <div className="text-xs" style={{ color: positive ? 'var(--green)' : 'var(--red)' }}>{change}</div>
    </div>
  );
}

function TrendUpIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>;
}
function TrendDownIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
    <polyline points="17 18 23 18 23 12"/>
  </svg>;
}
function WalletIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>
  </svg>;
}
