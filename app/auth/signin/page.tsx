'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn('credentials', { email, password, redirect: false });
    if (result?.ok) router.push('/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-grid flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-15%] left-[-5%] w-[700px] h-[700px] rounded-full opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6366F1 0%, transparent 65%)' }} />
      <div className="absolute bottom-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C084FC 0%, transparent 65%)' }} />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366F1, #C084FC)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-syne)' }}>
              Claw Budget <span style={{ color: 'var(--violet)' }}>v2</span>
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Know your money. Finally.</p>
        </div>

        <div className="glass rounded-2xl p-8" style={{ boxShadow: '0 0 60px rgba(99,102,241,0.15)' }}>
          <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-syne)' }}>Welcome back</h2>
          <p className="text-sm mb-7" style={{ color: 'var(--text-secondary)' }}>Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-widest"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-syne)' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--indigo)'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
                placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-widest"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-syne)' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--indigo)'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
                placeholder="••••••••" required />
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3 rounded-xl text-sm mt-2 disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
          <p className="text-center text-xs mt-5" style={{ color: 'var(--text-muted)' }}>
            Demo — any email + password
          </p>
        </div>
      </div>
    </div>
  );
}
