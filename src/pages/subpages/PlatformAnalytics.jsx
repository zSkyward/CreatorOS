import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, LineChart, Line } from 'recharts';
import { 
  Youtube, Twitch, MessageSquare, Flame, Target, Sparkles, AlertCircle, Play, 
  Tv, Compass, HelpCircle, Heart, Share2, Eye, ShieldAlert, BarChart3
} from 'lucide-react';

const YT_RETENTION_DATA = [
  { time: '0:00', Retention: 100 },
  { time: '0:15', Retention: 88 },
  { time: '0:30', Retention: 72 },
  { time: '1:00', Retention: 64 },
  { time: '2:00', Retention: 58 },
  { time: '3:00', Retention: 54 },
  { time: '4:00', Retention: 51 },
  { time: '5:00', Retention: 49 },
];

const STREAM_VIEWERS_DATA = [
  { hour: '1h', Viewers: 1200 },
  { hour: '2h', Viewers: 1850 },
  { hour: '3h', Viewers: 2200 },
  { hour: '4h', Viewers: 1400 },
  { hour: '5h', Viewers: 800 },
];

export default function PlatformAnalytics() {
  const { currentUser } = useApp();
  const [activePlat, setActivePlat] = useState('youtube');

  // Verify platform connected status in state
  const isConnected = currentUser?.platforms?.includes(activePlat);

  const renderPlatformContent = () => {
    if (!isConnected) {
      return (
        <div className="glass-panel p-12 rounded-[2rem] border border-brand-purple/20 bg-brand-purple/5 text-center flex flex-col items-center justify-center gap-4 py-20">
          <ShieldAlert className="w-12 h-12 text-slate-400 dark:text-slate-600 animate-bounce" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-wider">Feed Sync Required</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-normal">
            You have not synced your {activePlat.toUpperCase()} channel credentials yet. Navigate back to "Main Overview" to connect this platform feed.
          </p>
        </div>
      );
    }

    switch (activePlat) {
      case 'youtube':
        return (
          <div className="space-y-6">
            {/* KPI YouTube Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "YouTube Subscribers", value: "48,200", percent: "+8.4%", desc: "Subscribers gained" },
                { label: "Impressions CTR", value: "9.2%", percent: "+1.2%", desc: "Click-through frequency" },
                { label: "Watch Time Hours", value: "14.2K hrs", percent: "+18.2%", desc: "Viewer retention volume" }
              ].map((k, i) => (
                <div key={i} className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{k.label}</span>
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-2xl font-extrabold tracking-tight">{k.value}</span>
                    <span className="text-[9px] text-emerald-500 font-extrabold">{k.percent}</span>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-1">{k.desc}</p>
                </div>
              ))}
            </div>

            {/* YouTube Audience Retention Area */}
            <div className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">Audience Retention Curve</h4>
                  <p className="text-[9px] text-slate-400 mt-0.5">Mock video duration analysis (0-5 minutes)</p>
                </div>
                <div className="p-2 bg-red-500/10 text-red-500 rounded-xl">
                  <Youtube className="w-4 h-4" />
                </div>
              </div>

              <div className="h-60 w-full text-xs font-semibold">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={YT_RETENTION_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} stroke="rgba(156, 163, 175, 0.6)" />
                    <YAxis axisLine={false} tickLine={false} stroke="rgba(156, 163, 175, 0.6)" domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(15, 23, 42, 0.85)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        color: '#fff'
                      }} 
                    />
                    <Line type="monotone" dataKey="Retention" stroke="#FF0000" strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'twitch':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "Twitch Peak Viewers", value: "2,420", percent: "+14.8%", desc: "Concurrent peak count" },
                { label: "Chat Sentiment Rate", value: "94% Positive", percent: "Premium", desc: "AI chat message index" },
                { label: "Minutes Streamed", value: "3,800m", percent: "+8.2%", desc: "Live streaming duration" }
              ].map((k, i) => (
                <div key={i} className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{k.label}</span>
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-2xl font-extrabold tracking-tight">{k.value}</span>
                    <span className="text-[9px] text-emerald-500 font-extrabold">{k.percent}</span>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-1">{k.desc}</p>
                </div>
              ))}
            </div>

            {/* Twitch peak concurrency Recharts */}
            <div className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">Hourly Viewers Trend</h4>
                  <p className="text-[9px] text-slate-400 mt-0.5">Average viewership across standard 5 hour stream</p>
                </div>
                <div className="p-2 bg-purple-500/10 text-purple-500 rounded-xl">
                  <Twitch className="w-4 h-4" />
                </div>
              </div>

              <div className="h-60 w-full text-xs font-semibold">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={STREAM_VIEWERS_DATA}>
                    <defs>
                      <linearGradient id="colorTwitch" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9146FF" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#9146FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                    <XAxis dataKey="hour" axisLine={false} tickLine={false} stroke="rgba(156, 163, 175, 0.6)" />
                    <YAxis axisLine={false} tickLine={false} stroke="rgba(156, 163, 175, 0.6)" />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(15, 23, 42, 0.85)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        color: '#fff'
                      }} 
                    />
                    <Area type="monotone" dataKey="Viewers" stroke="#9146FF" strokeWidth={2} fillOpacity={1} fill="url(#colorTwitch)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'tiktok':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "TikTok Clip Plays", value: "185.4K", percent: "+42.1%", desc: "Short video impressions" },
                { label: "Avg. Watch Duration", value: "14.2s", percent: "+12.8%", desc: "Retention rate seconds" },
                { label: "Profile Share Frequency", value: "4,820", percent: "+28.2%", desc: "Shares and repost index" }
              ].map((k, i) => (
                <div key={i} className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{k.label}</span>
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-2xl font-extrabold tracking-tight">{k.value}</span>
                    <span className="text-[9px] text-emerald-500 font-extrabold">{k.percent}</span>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-1">{k.desc}</p>
                </div>
              ))}
            </div>

            {/* TikTok viral suggestions card */}
            <div className="glass-panel p-6 rounded-3xl border border-brand-purple/20 bg-brand-purple/5 flex gap-4 items-center">
              <Sparkles className="w-8 h-8 text-brand-purple animate-pulse shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">TikTok Viral Hook Suggestion</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal mt-1">
                  Our models predict that editing video frames to transition *every 2.4 seconds* boosts retention averages by 32% for creators on the Creator Pro plan. Try implementing high-speed audio markers in your next upload!
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="glass-panel p-10 rounded-3xl border border-white/5 bg-[#0e1324] text-center text-xs text-slate-400">
            Platform data metrics processing. Syncing details...
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Platform sub-tabs selector list */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl glass-panel bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-white/5 max-w-max">
        {[
          { id: 'youtube', label: 'YouTube Studio', icon: <Youtube className="w-3.5 h-3.5" /> },
          { id: 'twitch', label: 'Twitch Streams', icon: <Twitch className="w-3.5 h-3.5" /> },
          { id: 'tiktok', label: 'TikTok Clips', icon: <Flame className="w-3.5 h-3.5" /> },
          { id: 'kick', label: 'Kick Channel', icon: <Target className="w-3.5 h-3.5" /> },
          { id: 'discord', label: 'Discord Members', icon: <MessageSquare className="w-3.5 h-3.5" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePlat(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
              activePlat === tab.id
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {renderPlatformContent()}

    </div>
  );
}
