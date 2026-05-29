import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { DollarSign, ShieldAlert, Sparkles, PlusCircle, CheckCircle2, RefreshCw, Layers, ArrowUpRight, FileSpreadsheet } from 'lucide-react';

const REVENUE_DATA = [
  { month: 'Jan', Sponsorships: 1800, Affiliates: 420, Payouts: 1200 },
  { month: 'Feb', Sponsorships: 2500, Affiliates: 550, Payouts: 1900 },
  { month: 'Mar', Sponsorships: 3200, Affiliates: 620, Payouts: 2400 },
  { month: 'Apr', Sponsorships: 2800, Affiliates: 480, Payouts: 2100 },
  { month: 'May', Sponsorships: 4500, Affiliates: 820, Payouts: 3500 },
];

export default function RevenueSponsors() {
  const { sponsorships, addSponsorProject, updateSponsorStatus, currentUser } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [brand, setBrand] = useState('');
  const [rate, setRate] = useState('');
  const [platform, setPlatform] = useState('youtube');

  // Restricted check for Starter
  const isRestricted = currentUser?.plan === 'Starter';

  const handleCreateSponsorship = (e) => {
    e.preventDefault();
    if (!brand.trim() || !rate) return;
    addSponsorProject(brand, rate, platform);
    setBrand('');
    setRate('');
    setShowAddModal(false);
  };

  const handleToggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Pending' ? 'Active' : currentStatus === 'Active' ? 'Paid' : 'Pending';
    updateSponsorStatus(id, nextStatus);
  };

  if (isRestricted) {
    return (
      <div className="glass-panel p-12 rounded-[2.5rem] border border-brand-purple/20 bg-brand-purple/5 text-center flex flex-col items-center justify-center gap-4 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 rounded-full blur-2xl -z-10" />
        <ShieldAlert className="w-12 h-12 text-slate-400 dark:text-slate-600 animate-bounce" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-wider">Revenue Tracking Gated</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-normal">
          Starter accounts do not include revenue tracking, affiliate logs, and brand sponsorship calculators. Upgrade to **Creator Pro** or **Creator Elite** to activate financial tools.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-3 rounded-xl bg-brand-purple text-white text-xs font-semibold shadow-glow-purple hover:bg-brand-violet transition-all active:scale-95 duration-200"
        >
          Activate Billing Suite
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Earnings metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Estimated Revenue", value: "$5,320.00", percent: "+18.4%", desc: "This month total projections" },
          { label: "Paid Invoices", value: "$2,500.00", percent: "Active", desc: "Settled sponsorship payments" },
          { label: "Affiliate Commissions", value: "$820.00", percent: "+22.1%", desc: "Sales conversions index" }
        ].map((kpi, idx) => (
          <div key={idx} className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</span>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{kpi.value}</span>
              <span className="text-[9px] text-emerald-500 font-extrabold">{kpi.percent}</span>
            </div>
            <p className="text-[9px] text-slate-400 mt-1">{kpi.desc}</p>
          </div>
        ))}
      </div>

      {/* Recharts Monthly bar analytics */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider mb-6">Monthly Revenue Projections</h4>
        
        <div className="h-60 w-full text-xs font-semibold">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="rgba(156, 163, 175, 0.6)" />
              <YAxis axisLine={false} tickLine={false} stroke="rgba(156, 163, 175, 0.6)" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(15, 23, 42, 0.85)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="Sponsorships" fill="#8b5cf6" stackId="a" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Affiliates" fill="#06b6d4" stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sponsorship interactive manager table */}
      <section className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider">Brand Campaigns & Sponsorships</h4>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-purple/20 bg-brand-purple/5 text-brand-purple text-[10px] font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Sponsorship</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4 text-[9px]">Brand Name</th>
                <th className="py-3 px-4 text-[9px]">Platform</th>
                <th className="py-3 px-4 text-[9px]">Rate Fee</th>
                <th className="py-3 px-4 text-[9px]">Campaign Status</th>
                <th className="py-3 px-4 text-[9px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {sponsorships.map((s) => (
                <tr key={s.id} className="hover:bg-slate-100/30 dark:hover:bg-slate-900/20 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-800 dark:text-white">{s.brand}</td>
                  <td className="py-4 px-4 uppercase text-[10px] font-semibold text-slate-500 dark:text-slate-400">{s.platform}</td>
                  <td className="py-4 px-4 font-extrabold text-brand-purple">${s.rate.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                      s.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      s.status === 'Active' ? 'bg-brand-purple/10 text-brand-purple border-brand-purple/20' :
                      'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleToggleStatus(s.id, s.status)}
                      className="text-[9px] font-bold text-slate-400 hover:text-brand-purple flex items-center gap-1 ml-auto"
                      title="Click to simulate campaign lifecycle status updates"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>lifecycle</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add sponsorship modal overlay dialog */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-md">
          <div className="w-full max-w-sm glass-panel border border-brand-purple/25 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-white/5 mb-4">
              <h4 className="text-xs font-bold">New Sponsorship Project</h4>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateSponsorship} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Gaming Chairs"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Payout Rate Fee ($)</label>
                  <input
                    type="number"
                    required
                    placeholder="1200"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none text-slate-700 dark:text-slate-300"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="twitch">Twitch</option>
                    <option value="tiktok">TikTok</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl bg-brand-purple text-white text-xs font-semibold shadow-glow-purple hover:bg-brand-violet transition-all cursor-pointer"
              >
                Record Sponsorship
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
