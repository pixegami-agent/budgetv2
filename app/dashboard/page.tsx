'use client';

import { Upload, TrendingDown, TrendingUp, Wallet, LogOut } from 'lucide-react';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function Dashboard() {
  const [dragActive, setDragActive] = useState(false);
  const userName = 'User';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Wallet className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">BudgetV2</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">Hi, {userName}</span>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: '/auth/signin' })}
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Upload Section */}
        <div className="mb-12">
          <div
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDrop={() => setDragActive(false)}
            className={`bg-white rounded-xl border-2 border-dashed p-12 text-center transition-all ${
              dragActive
                ? 'border-emerald-400 bg-emerald-50'
                : 'border-slate-300 hover:border-emerald-400'
            }`}
          >
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Upload Statements</h2>
            <p className="text-sm text-slate-600 mb-4">Drop your bank statements (PDF, CSV)</p>
            <input
              type="file"
              multiple
              accept=".pdf,.csv"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg cursor-pointer transition-colors font-medium"
            >
              Choose Files
            </label>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard label="Total Income" value="$0.00" icon={TrendingUp} color="emerald" />
          <StatCard label="Total Expenses" value="$0.00" icon={TrendingDown} color="red" />
          <StatCard label="Net Balance" value="$0.00" icon={Wallet} color="slate" />
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
          <p className="text-slate-600">Upload your first statement to see insights and analytics</p>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className: string }>;
  color: 'emerald' | 'red' | 'slate';
}) {
  const colorClasses = {
    emerald: 'bg-emerald-100 text-emerald-600',
    red: 'text-red-600',
    slate: 'text-slate-600',
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
