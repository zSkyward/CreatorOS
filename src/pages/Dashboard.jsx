import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ThemeToggle from '../components/ThemeToggle';
import AIOrb from '../components/AIOrb';
import AIChatBot from '../components/AIChatBot';

// Import subpages
import Overview from './subpages/Overview';
import PlatformAnalytics from './subpages/PlatformAnalytics';
import AIInsights from './subpages/AIInsights';
import ContentIntel from './subpages/ContentIntel';
import RevenueSponsors from './subpages/RevenueSponsors';

import { 
  LayoutDashboard, BarChart3, Brain, Zap, DollarSign, LogOut, 
  Sparkles, Bell, Trophy, Flame, Plus, ShieldCheck, ChevronDown, CheckCircle2, AlertTriangle, Layers
} from 'lucide-react';

export default function Dashboard({ onNavigate }) {
  const { 
    currentUser, logout, notifications, markAllRead, clearNotifications, 
    addGoal, updateGoalProgress, deleteGoal 
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // overview, platforms, ai, content, revenue
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // New goal form state
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalPlatform, setGoalPlatform] = useState('youtube');

  // Handle logout
  const handleLogout = () => {
    logout();
    onNavigate('landing');
  };

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!goalTitle.trim() || !goalTarget) return;
    addGoal(goalTitle, parseInt(goalTarget), goalPlatform);
    setGoalTitle('');
    setGoalTarget('');
    setShowGoalModal(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview onNavigateTab={setActiveTab} />;
      case 'platforms':
        return <PlatformAnalytics />;
      case 'ai':
        return <AIInsights />;
      case 'content':
        return <ContentIntel />;
      case 'revenue':
        return <RevenueSponsors />;
      default:
        return <Overview onNavigateTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] transition-colors duration-500 text-slate-800 dark:text-slate-100 flex flex-col md:flex-row relative">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0 border-b md:border-r border-slate-200/50 dark:border-white/5 bg-white/70 dark:bg-[#090d1f]/40 backdrop-blur-md px-4 py-6 flex flex-col justify-between z-20">
        
        <div className="space-y-8">
          {/* Logo Title */}
          <div 
            onClick={() => onNavigate('landing')} 
            className="flex items-center gap-2 group font-semibold text-lg px-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-brand-purple flex items-center justify-center text-white tracking-tight shadow-glow-purple font-black">
              C
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 group-hover:opacity-85 transition-all">
              CreatorOS
            </span>
            <span className="text-[8px] bg-brand-purple/10 border border-brand-purple/20 text-brand-purple px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">v2.0</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Main Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'platforms', label: 'Platform Analytics', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'ai', label: 'AI Strategist', icon: <Brain className="w-4 h-4" /> },
              { id: 'content', label: 'Content Intelligence', icon: <Zap className="w-4 h-4" /> },
              { id: 'revenue', label: 'Revenue & Sponsors', icon: <DollarSign className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold hover:translate-x-0.5 transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-purple text-white shadow-glow-purple'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer User Details */}
        <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-white/5">
          
          {/* Admin shortcut gate */}
          {(currentUser?.email === 'admin@creatoros.com' || currentUser?.plan === 'Creator Elite') && (
            <button
              onClick={() => onNavigate('admin')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-dashed border-brand-purple/20 hover:border-brand-purple/50 bg-brand-purple/5 text-[10px] text-brand-purple font-bold uppercase tracking-wider transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Console</span>
            </button>
          )}

          <div className="flex items-center gap-3 px-2">
            {/* User Avatar with profile initial */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-pink text-white font-bold flex items-center justify-center shadow-md">
              {currentUser?.fullName.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold truncate text-slate-800 dark:text-white leading-tight">{currentUser?.fullName}</h4>
              <p className="text-[10px] text-slate-400 truncate leading-none mt-1">{currentUser?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs text-rose-500 dark:text-rose-400 hover:bg-rose-500/5 hover:text-rose-600 transition-colors font-medium cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-1 min-w-0 p-4 md:p-8 space-y-6 md:space-y-8 h-screen overflow-y-auto z-10">
        
        {/* Top Floating Dashboard Action Bar */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/50 dark:border-white/5">
          
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold font-sans text-slate-800 dark:text-white uppercase tracking-wider">
              {activeTab === 'overview' ? 'Creator Workspace' : activeTab === 'platforms' ? 'Platform Feeds' : activeTab === 'ai' ? 'AI Strategist Module' : activeTab === 'content' ? 'Idea Analytics' : 'Revenue Panel'}
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-brand-purple/20 bg-brand-purple/5 text-brand-purple font-bold tracking-wide">
              {currentUser?.plan}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            
            {/* Upgrade button if Starter */}
            {currentUser?.plan === 'Starter' && (
              <button
                onClick={() => onNavigate('pricing')}
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-purple hover:bg-brand-violet text-white text-[10px] font-extrabold uppercase tracking-wider shadow-glow-purple hover:scale-105 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Upgrade to Pro
              </button>
            )}

            {/* Streaks active widget */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass-panel text-amber-500 font-bold text-xs shadow-sm" title="Active creator streak days">
              <Flame className="w-4 h-4 text-amber-500 fill-current animate-bounce" />
              <span>{currentUser?.streakCount}d Streak</span>
            </div>

            {/* Notifications Alert Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-xl glass-panel relative hover:scale-105 active:scale-95 transition-all"
              >
                <Bell className="w-4.5 h-4.5 text-slate-500 dark:text-slate-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[8px] font-bold text-white flex items-center justify-center border border-white dark:border-[#030712] animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Tray Card panel */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 glass-panel rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-2xl p-4 z-50 animate-float-medium max-h-[400px] overflow-y-auto">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-white/5 mb-3">
                    <span className="text-xs font-bold">Recent Alerts</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={markAllRead}
                        className="text-[9px] text-brand-purple font-semibold hover:underline"
                      >
                        Mark Read
                      </button>
                      <span className="text-slate-300 dark:text-slate-700">|</span>
                      <button 
                        onClick={clearNotifications}
                        className="text-[9px] text-slate-400 font-semibold hover:underline"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div key={n.id} className={`p-2.5 rounded-xl border transition-colors ${
                          n.read 
                            ? 'bg-slate-100/50 dark:bg-slate-900/10 border-slate-200/20 dark:border-white/2' 
                            : 'bg-brand-purple/5 border-brand-purple/10 shadow-sm'
                        }`}>
                          <div className="flex justify-between items-start gap-2">
                            <h5 className="text-[10px] font-bold text-slate-800 dark:text-white leading-normal flex items-center gap-1.5">
                              {n.type === 'ai' && <Brain className="w-3.5 h-3.5 text-brand-purple shrink-0" />}
                              {n.type === 'milestone' && <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                              {n.type === 'revenue' && <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                              <span>{n.title}</span>
                            </h5>
                            <span className="text-[8px] text-slate-400 shrink-0 font-medium">{n.time}</span>
                          </div>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-normal mt-1">{n.content}</p>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-[10px] text-slate-400 flex flex-col items-center justify-center gap-1">
                        <Layers className="w-6 h-6 text-slate-300 dark:text-slate-700" />
                        <span>All caught up! No notifications.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <ThemeToggle />
          </div>

        </header>

        {/* Dashboard inner tabs grid wrapper */}
        <div className="grid grid-cols-12 gap-6 items-start">
          
          {/* Main Workspace Frame column */}
          <div className="col-span-12 xl:col-span-9 space-y-6">
            {renderActiveTab()}
          </div>

          {/* Right Column Creators Metrics Widget Sidepanel */}
          <div className="col-span-12 xl:col-span-3 space-y-6">
            
            {/* Custom Creator Goals Progress cards */}
            <div className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-4.5 h-4.5 text-amber-500" />
                  <span>Creator Goals</span>
                </h4>
                <button
                  onClick={() => setShowGoalModal(true)}
                  className="p-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-800/80 hover:bg-brand-purple/20 hover:text-brand-purple transition-all"
                  title="Add custom goal target"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-4">
                {currentUser?.goals && currentUser.goals.length > 0 ? (
                  currentUser.goals.map((g) => {
                    const percent = Math.round((g.current / g.target) * 100);
                    return (
                      <div key={g.id} className="p-3 rounded-2xl bg-slate-100/30 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/2.5 space-y-2 relative group">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight pr-6">{g.title}</span>
                          <button
                            onClick={() => deleteGoal(g.id)}
                            className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity text-[10px]"
                          >
                            ×
                          </button>
                        </div>
                        
                        {/* Interactive progress bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[8px] text-slate-400 font-semibold">
                            <span>{g.current.toLocaleString()} / {g.target.toLocaleString()}</span>
                            <span>{percent}%</span>
                          </div>
                          <div 
                            className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden cursor-pointer"
                            onClick={() => updateGoalProgress(g.id, Math.ceil(g.target / 10))}
                            title="Click to simulate progress tracking!"
                          >
                            <div 
                              className="h-full bg-gradient-to-r from-brand-purple to-brand-pink rounded-full transition-all duration-500" 
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-6 text-center text-[10px] text-slate-400">
                    No goals configured. Click [+] to add your milestone!
                  </div>
                )}
              </div>
            </div>

            {/* Quick Streaks instructions banner */}
            <div className="glass-panel p-5 rounded-3xl border border-brand-purple/20 bg-brand-purple/5 text-xs flex flex-col gap-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/10 rounded-full blur-xl -z-10" />
              <div className="flex items-center gap-1.5 text-brand-purple font-bold">
                <Plus className="w-4 h-4" />
                <span>Smart Coach Streak</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Log in and sync your channel feed daily to increase your creator streak. Streamers with streaks > 7d report 18% higher retention averages!
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* Floating AI Strategist Companion */}
      <AIOrb onClick={() => setChatOpen(!chatOpen)} />
      <AIChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Add goal dialog modal */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm glass-panel border border-brand-purple/25 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-white/5 mb-4">
              <h4 className="text-xs font-bold">Add Custom Creator Goal</h4>
              <button 
                onClick={() => setShowGoalModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Goal Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hit 100k views on TikTok"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Target Value</label>
                  <input
                    type="number"
                    required
                    placeholder="100000"
                    value={goalTarget}
                    onChange={(e) => setGoalTarget(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Platform</label>
                  <select
                    value={goalPlatform}
                    onChange={(e) => setGoalPlatform(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none text-slate-700 dark:text-slate-300"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="twitch">Twitch</option>
                    <option value="tiktok">TikTok</option>
                    <option value="discord">Discord</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl bg-brand-purple text-white text-xs font-semibold shadow-glow-purple hover:bg-brand-violet transition-all cursor-pointer"
              >
                Configure Goal
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
