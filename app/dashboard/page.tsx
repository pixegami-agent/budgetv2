'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function Dashboard() {
  const [dragActive, setDragActive] = useState(false);

  return (
    <div className="min-h-screen bg-grid" style={{ background: 'var(--bg-primary)' }}>

      {/* Ambient top glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(129,140,248,0.1) 0%, transparent 70%)' }} />

      {/* Header */}
      <header className="relative z-10 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #818CF8, #A78BFA)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-syne)' }}>
              Ledger
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'rgba(129,140,248,0.15)', color: 'var(--indigo)', fontFamily: 'var(--font-syne)' }}>
              Beta
            </span>
          </div>

          {/* Nav right */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
              style={{ background: 'linear-gradient(135deg, #818CF8, #A78BFA)', fontFamily: 'var(--font-syne)' }}>
              J
            </div>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: '/auth/signin' })}
              className="text-sm transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-8 py-12 relative z-10">

        {/* Hero heading */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 gradient-text" style={{ fontFamily: 'var(--font-syne)' }}>
            Good morning.
          </h1>
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            Upload a statement to get started.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <StatCard
            label="Total Income"
            value="$0.00"
            change="+0%"
            positive
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            }
            accent="var(--green)"
          />
          <StatCard
            label="Total Expenses"
            value="$0.00"
            change="+0%"
            positive={false}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
                <polyline points="17 18 23 18 23 12"/>
              </svg>
            }
            accent="var(--red)"
          />
          <StatCard
            label="Net Balance"
            value="$0.00"
            change="—"
            positive
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
            }
            accent="var(--indigo)"
          />
        </div>

        {/* Upload zone */}
        <div
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => setDragActive(false)}
          className="rounded-2xl border-2 border-dashed p-16 text-center transition-all cursor-pointer"
          style={{
            borderColor: dragActive ? 'var(--indigo)' : 'var(--border)',
            background: dragActive ? 'rgba(129,140,248,0.05)' : 'var(--bg-card)',
          }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(129,140,248,0.12)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
            Drop your statements here
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            PDF or CSV — we'll parse everything automatically
          </p>
          <input type="file" multiple accept=".pdf,.csv" className="hidden" id="file-upload" />
          <label
            htmlFor="file-upload"
            className="inline-block px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all"
            style={{
              background: 'linear-gradient(135deg, #818CF8, #A78BFA)',
              color: 'white',
              fontFamily: 'var(--font-syne)',
            }}
          >
            Browse Files
          </label>
        </div>

        {/* Empty state */}
        <div className="mt-8 glass rounded-2xl p-10 text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Your transactions will appear here after upload
          </p>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  change,
  positive,
  icon,
  accent,
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="glass rounded-2xl p-6 transition-all" style={{ cursor: 'default' }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-syne)' }}>
          {label}
        </span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${accent}18`, color: accent }}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-syne)' }}>
        {value}
      </div>
      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
        {change} this month
      </div>
    </div>
  );
}
