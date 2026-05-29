import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { 
  Users, Key, AlertTriangle, ShieldCheck, Heart, Server, DollarSign, Brain, 
  Search, ShieldAlert, ArrowLeft, PlusCircle, CheckCircle2, Trash2, Ban, Radio
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

// Mock system status data
const PLAN_PIE_DATA = [
  { name: 'Starter (Free)', value: 14, color: '#64748b' },
  { name: 'Creator Pro', value: 28, color: '#8b5cf6' },
  { name: 'Creator Elite', value: 8, color: '#06b6d4' }
];

export default function AdminDashboard({ onNavigate }) {
  const { 
    users, adminToggleBan, adminGrantPremium, adminAddAnnouncement, aiUsageCount, currentUser 
  } = useApp();

  const [adminValidated, setAdminValidated] = useState(() => {
    // If logged in as admin account, auto validate
    return currentUser?.email === 'admin@creatoros.com';
  });

  const [inputKey, setInputKey] = useState('');
  const [keyError, setKeyError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Announcement broad states
  const [annTitle, setAnnTitle] = useState('');
  const [annMessage, setAnnMessage] = useState('');
  const [annType, setAnnType] = useState('info');
  const [annSuccess, setAnnSuccess] = useState(false);

  // Key authorization form
  const handleVerifyKey = (e) => {
    e.preventDefault();
    if (inputKey === 'CREATOROS_ADMIN_2026') {
      setAdminValidated(true);
      setKeyError('');
    } else {
      setKeyError('Invalid Admin Key. Access denied.');
    }
  };

  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) return;
    adminAddAnnouncement(annTitle, annMessage, annType);
    setAnnTitle('');
    setAnnMessage('');
    setAnnSuccess(true);
    setTimeout(() => setAnnSuccess(false), 3000);
  };

  // Search filtered users list
  const filteredUsers = users.filter(u => 
    u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate quick metrics
  const totalUsersCount = users.length;
  const activePremiumCount = users.filter(u => u.plan !== 'Starter' && u.plan !== 'none').length;
  const monthlyRevenueEst = users.reduce((acc, u) => {
    if (u.plan === 'Creator Pro') return acc + 5;
    if (u.plan === 'Creator Elite') return acc + 15;
    return acc;
  }, 0);

  if (!adminValidated) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-4">
        
        {/* Top Floating bar */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 group font-semibold text-xs border border-slate-200 dark:border-white/5 px-4 py-2.5 rounded-xl glass-panel text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Workspace</span>
          </button>
          <ThemeToggle />
        </div>

        {/* Secret validation box */}
        <div className="w-full max-w-sm glass-panel border border-brand-purple/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-purple/5 flex items-center justify-center text-brand-purple mx-auto mb-4 animate-float-slow">
            <Key className="w-6 h-6 animate-pulse" />
          </div>

          <h2 className="text-xl font-bold font-sans text-slate-800 dark:text-white uppercase tracking-wider">Secret Admin Panel</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">
            Authorized personnel only. Please input the developer Admin access key to authenticate.
          </p>

          {keyError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center gap-2 text-xs text-rose-500 font-semibold">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{keyError}</span>
            </div>
          )}

          <form onSubmit={handleVerifyKey} className="space-y-4">
            <input
              type="password"
              required
              placeholder="Enter Access Key..."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none focus:ring-1 focus:ring-brand-purple/50 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-purple text-white text-xs font-semibold shadow-glow-purple hover:bg-brand-violet transition-all active:scale-95 duration-200"
            >
              Verify Key
            </button>
          </form>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Top action header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200/50 dark:border-white/5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 rounded-xl border border-slate-200/50 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-purple" />
              <span>System Admin Console</span>
            </h1>
            <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Unified operations and developer configurations control room.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={() => setAdminValidated(false)}
            className="text-[10px] px-3.5 py-2 rounded-xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 font-bold uppercase tracking-wider transition-all"
          >
            Lock Session
          </button>
        </div>
      </header>

      {/* KPI Stats metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: totalUsersCount, desc: "Registered creator profiles", icon: <Users className="w-5 h-5 text-brand-purple" /> },
          { label: "Active Subscriptions", value: activePremiumCount, desc: "Paid creator packages", icon: <ShieldCheck className="w-5 h-5 text-brand-cyan" /> },
          { label: "Monthly SaaS Revenue", value: `$${monthlyRevenueEst}.00`, desc: "Aggregate pipeline billing", icon: <DollarSign className="w-5 h-5 text-brand-emerald" /> },
          { label: "AI Requests Served", value: aiUsageCount, desc: "Strategist calculations", icon: <Brain className="w-5 h-5 text-brand-purple animate-pulse" /> }
        ].map((k, idx) => (
          <div key={idx} className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-white/5 mb-3">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{k.label}</span>
              <div className="p-2 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/10 dark:border-white/5">{k.icon}</div>
            </div>
            <div>
              <span className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{k.value}</span>
              <p className="text-[9px] text-slate-400 mt-1">{k.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Plan distribution chart */}
        <div className="col-span-12 lg:col-span-4 glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider mb-6">Subscription Plan Ratio</h4>
          <div className="h-56 w-full flex items-center justify-center text-xs font-bold">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PLAN_PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PLAN_PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
            {PLAN_PIE_DATA.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-[10px] font-semibold">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                </span>
                <span>{item.value} accounts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Broadcaster announcement publisher */}
        <div className="col-span-12 lg:col-span-8 glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-brand-purple" />
            <span>Broadcaster Console Panel</span>
          </h4>

          {annSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2 text-xs text-emerald-500 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Announcement broadcast successfully sent to all user dashboards!</span>
            </div>
          )}

          <form onSubmit={handlePostAnnouncement} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Alert Header Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Server Maintenance tonight"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Category Type</label>
                <select
                  value={annType}
                  onChange={(e) => setAnnType(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none text-slate-700 dark:text-slate-300"
                >
                  <option value="info">General Info</option>
                  <option value="warning">System Warning</option>
                  <option value="milestone">Celebratory Milestone</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Broadcast Message content</label>
              <textarea
                required
                rows={3}
                placeholder="Write system details here to render into creators overlays..."
                value={annMessage}
                onChange={(e) => setAnnMessage(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-purple text-white text-xs font-semibold shadow-glow-purple hover:bg-brand-violet transition-all cursor-pointer flex justify-center items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Broadcast Announcement</span>
            </button>
          </form>
        </div>

      </div>

      {/* Users directory panel list */}
      <section className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider">Creator Accounts Directory</h4>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search emails or names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4 text-[9px]">Creator Profile</th>
                <th className="py-3 px-4 text-[9px]">Account Email</th>
                <th className="py-3 px-4 text-[9px]">Subscribed Plan</th>
                <th className="py-3 px-4 text-[9px]">Sync Feeds</th>
                <th className="py-3 px-4 text-[9px]">Account State</th>
                <th className="py-3 px-4 text-[9px] text-right">Overrides</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.email} className={`hover:bg-slate-100/30 dark:hover:bg-slate-900/20 transition-colors ${
                  user.isBanned ? 'opacity-50' : ''
                }`}>
                  <td className="py-4 px-4 font-bold text-slate-800 dark:text-white">{user.fullName}</td>
                  <td className="py-4 px-4 font-semibold text-slate-500">{user.email}</td>
                  <td className="py-4 px-4">
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded border ${
                      user.plan === 'Creator Pro' ? 'bg-brand-purple/10 text-brand-purple border-brand-purple/20' :
                      user.plan === 'Creator Elite' ? 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20' :
                      'bg-slate-500/10 text-slate-500 border-slate-500/20'
                    }`}>
                      {user.plan === 'none' ? 'UNPAID GATE' : user.plan}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-1">
                      {user.platforms && user.platforms.map((p) => (
                        <span key={p} className="text-[8px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5">
                          {p.substring(0, 2)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                      user.isBanned 
                        ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' 
                        : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                    }`}>
                      {user.isBanned ? 'Banned' : 'Authorized'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right flex justify-end gap-2 items-center">
                    <button
                      onClick={() => adminGrantPremium(user.email, user.plan === 'Creator Elite' ? 'Starter' : 'Creator Elite')}
                      className={`text-[9px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        user.plan === 'Creator Elite' 
                          ? 'border-slate-500/20 bg-slate-500/5 text-slate-500' 
                          : 'border-brand-purple/20 bg-brand-purple/5 text-brand-purple hover:bg-brand-purple/10'
                      }`}
                      title="Instantly grant or revoke premium membership rights"
                    >
                      {user.plan === 'Creator Elite' ? 'Revoke Elite' : 'Grant Elite'}
                    </button>
                    
                    <button
                      onClick={() => adminToggleBan(user.email)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        user.isBanned
                          ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500/10'
                          : 'border-rose-500/20 bg-rose-500/5 text-rose-500 hover:bg-rose-500/10'
                      }`}
                      title={user.isBanned ? 'Unban User' : 'Ban User'}
                    >
                      <Ban className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
