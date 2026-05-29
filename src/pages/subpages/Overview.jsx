import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Users, Eye, TrendingUp, Sparkles, Youtube, Twitch, MessageSquare, Flame, Target, 
  ArrowUpRight, ArrowDownRight, CheckCircle2, AlertTriangle, Radio
} from 'lucide-react';

// Recharts simulated historical data
const OVERVIEW_DATA = [
  { day: 'Mon', Views: 12500, Subscribers: 120, Engagement: 4.2 },
  { day: 'Tue', Views: 15400, Subscribers: 250, Engagement: 4.5 },
  { day: 'Wed', Views: 18200, Subscribers: 180, Engagement: 4.8 },
  { day: 'Thu', Views: 14100, Subscribers: 140, Engagement: 4.1 },
  { day: 'Fri', Views: 22000, Subscribers: 390, Engagement: 5.2 },
  { day: 'Sat', Views: 28400, Subscribers: 480, Engagement: 5.6 },
  { day: 'Sun', Views: 26000, Subscribers: 310, Engagement: 5.1 },
];

export default function Overview({ onNavigateTab }) {
  const { currentUser, togglePlatform } = useApp();
  const [syncLoading, setSyncLoading] = useState(null);
  const [syncError, setSyncError] = useState('');

  // Handle plat connect toggle
  const handleToggleSync = (platform) => {
    setSyncLoading(platform);
    setSyncError('');
    
    setTimeout(() => {
      const res = togglePlatform(platform);
      if (res && !res.success) {
        setSyncError(res.message);
      }
      setSyncLoading(null);
    }, 1000);
  };

  // Mock top content list
  const TOP_CONTENT = [
    { title: "I Streamed on Kick for 24 Hours straight!", platform: "kick", views: "48,200", ctr: "12.4%", watchTime: "18m 42s" },
    { title: "My Ultimate Hardware Setup 2026", platform: "youtube", views: "34,500", ctr: "9.8%", watchTime: "8m 15s" },
    { title: "When the chat makes your decisions...", platform: "twitch", views: "28,100", ctr: "11.1%", watchTime: "45m 12s" },
    { title: "Reacting to crazy streaming fails", platform: "tiktok", views: "15,800", ctr: "14.2%", watchTime: "12s" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Sync restrictions error banner */}
      {syncError && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-3 text-xs text-rose-600 dark:text-rose-400 animate-bounce">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold">Sync Boundary Reached</h5>
            <p className="mt-1 leading-normal font-medium">{syncError}</p>
          </div>
        </div>
      )}

      {/* Connected accounts ribbon toggles */}
      <section className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1">
          <Radio className="w-3.5 h-3.5 text-brand-purple" />
          <span>Active Feed Sync Connectors</span>
        </h4>
        <div className="flex flex-wrap gap-3">
          {[
            { id: 'youtube', label: 'YouTube', icon: <Youtube className="w-4 h-4" />, color: 'hover:border-red-500/40 text-red-500' },
            { id: 'twitch', label: 'Twitch', icon: <Twitch className="w-4 h-4" />, color: 'hover:border-purple-500/40 text-[#9146FF]' },
            { id: 'tiktok', label: 'TikTok', icon: <Flame className="w-4 h-4" />, color: 'hover:border-pink-500/40 text-pink-500' },
            { id: 'kick', label: 'Kick', icon: <Target className="w-4 h-4" />, color: 'hover:border-emerald-500/40 text-emerald-500' },
            { id: 'discord', label: 'Discord', icon: <MessageSquare className="w-4 h-4" />, color: 'hover:border-blue-500/40 text-[#5865F2]' }
          ].map((plat) => {
            const isSynced = currentUser?.platforms?.includes(plat.id);
            return (
              <button
                key={plat.id}
                onClick={() => handleToggleSync(plat.id)}
                disabled={syncLoading !== null}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                  isSynced
                    ? 'border-brand-purple bg-brand-purple/5 text-brand-purple shadow-sm'
                    : 'border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                } ${plat.color}`}
              >
                {syncLoading === plat.id ? (
                  <span className="w-4 h-4 rounded-full border-2 border-brand-purple border-t-transparent animate-spin" />
                ) : (
                  plat.icon
                )}
                <span>{plat.label}</span>
                {isSynced && <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-ping" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Core KPI metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Aggregate Followers", value: "248,500", percent: "+12.4%", up: true, desc: "Across connected accounts", icon: <Users className="w-5 h-5 text-brand-purple" /> },
          { label: "Unified Video Views", value: "1.42M", percent: "+28.2%", up: true, desc: "Last 30 days views count", icon: <Eye className="w-5 h-5 text-brand-cyan" /> },
          { label: "Avg. Engagement Rate", value: "4.85%", percent: "-1.5%", up: false, desc: "Views to likes/chats index", icon: <TrendingUp className="w-5 h-5 text-brand-pink" /> },
          { label: "AI Strategic Score", value: "92/100", percent: "Premium", up: true, desc: "Account optimization strength", icon: <Sparkles className="w-5 h-5 text-brand-purple animate-pulse" /> }
        ].map((kpi, idx) => (
          <div key={idx} className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 shadow-sm relative overflow-hidden">
            {/* Ambient card background glow for premium score */}
            {idx === 3 && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/10 rounded-full blur-xl -z-10 animate-pulse-glow" />
            )}

            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</span>
              <div className="p-2 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/20 dark:border-white/5">{kpi.icon}</div>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{kpi.value}</span>
                <span className={`text-[10px] font-extrabold flex items-center ${kpi.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {kpi.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {kpi.percent}
                </span>
              </div>
              <p className="text-[9px] text-slate-400 mt-1">{kpi.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Recharts panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Followers Growth line Area chart */}
        <div className="col-span-12 lg:col-span-8 glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider">Creators Growth & Reach</h4>
            <div className="flex gap-2">
              <span className="text-[9px] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900 text-slate-400 font-bold uppercase">30D views</span>
            </div>
          </div>

          <div className="h-64 w-full text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={OVERVIEW_DATA}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="rgba(156, 163, 175, 0.6)" />
                <YAxis axisLine={false} tickLine={false} stroke="rgba(156, 163, 175, 0.6)" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(15, 23, 42, 0.85)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    color: '#fff',
                    backdropFilter: 'blur(8px)'
                  }} 
                />
                <Area type="monotone" dataKey="Views" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly subscribers distribution chart */}
        <div className="col-span-12 lg:col-span-4 glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider mb-6">Subscribers Acquisition</h4>
          
          <div className="h-64 w-full text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={OVERVIEW_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="rgba(156, 163, 175, 0.6)" />
                <YAxis axisLine={false} tickLine={false} stroke="rgba(156, 163, 175, 0.6)" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(15, 23, 42, 0.85)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    color: '#fff',
                    backdropFilter: 'blur(8px)'
                  }} 
                />
                <Bar dataKey="Subscribers" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Top content list */}
      <section className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider">Top Performing Content</h4>
          <button 
            onClick={() => onNavigateTab('content')}
            className="text-[10px] text-brand-purple font-semibold hover:underline flex items-center gap-1"
          >
            <span>Analyze Hooks</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOP_CONTENT.map((content, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-2xl border border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/20 hover:border-brand-purple/25 hover:bg-slate-100/50 dark:hover:bg-slate-900/30 transition-all flex justify-between items-center"
            >
              <div className="space-y-2 min-w-0 pr-4">
                <div className="flex items-center gap-2">
                  <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-slate-200 dark:border-white/10 ${
                    content.platform === 'youtube' ? 'bg-red-500/10 text-red-500' :
                    content.platform === 'twitch' ? 'bg-purple-500/10 text-purple-500' :
                    content.platform === 'kick' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-pink-500/10 text-pink-500'
                  }`}>
                    {content.platform}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{content.watchTime} avg</span>
                </div>
                <h5 className="text-xs font-bold truncate text-slate-800 dark:text-white">{content.title}</h5>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-extrabold text-slate-800 dark:text-white tracking-tight">{content.views}</span>
                <span className="block text-[8px] text-slate-400 uppercase tracking-widest mt-1 font-bold">CTR: {content.ctr}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
