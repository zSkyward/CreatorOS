import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Brain, Sparkles, Flame, Clock, Target, Calendar, ArrowRight, ShieldAlert, Award, PlayCircle } from 'lucide-react';

export default function AIInsights() {
  const { currentUser } = useApp();
  const [activeFaq, setActiveFaq] = useState(0);

  // Restricted check for Starter
  const isRestricted = currentUser?.plan === 'Starter';

  const COACH_INSIGHTS = [
    { title: "Intro Pacing drop-off", content: "Your YouTube analytics indicate viewers drop in the first 8 seconds. Avoid starting with static title slides — jump straight into high-energy action hooks in under 2 seconds.", type: "critical", platform: "youtube" },
    { title: "Optimal Video Length", content: "TikTok clips under 20 seconds achieve 43% higher completion scores. Trim your streams clips tightly to focus on high-impact wins or scream fails.", type: "important", platform: "tiktok" },
    { title: "Twitch Retention Marker", content: "Average stream retention drops by 38% after 2 hours. Keep Twitch broadcasts focused to 2.5–3 hours max for optimal average concurrent counts.", type: "tip", platform: "twitch" },
    { title: "Niche content outperform", content: "Minecraft challenge content out-performs standard SMP multiplayer let's plays by 28% in CTR. Prioritize custom gamemodes.", type: "tip", platform: "youtube" }
  ];

  // Simulated upload matrix hours (Columns represent days, rows represent hours)
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const HOURS = ['12 PM', '3 PM', '6 PM', '7 PM', '9 PM'];

  // Higher value represents optimal upload heat
  const UPLOAD_HEATMAP = [
    [2, 3, 4, 2, 5, 4, 3], // 12 PM
    [3, 4, 5, 4, 6, 8, 7], // 3 PM
    [5, 6, 8, 6, 7, 9, 8], // 6 PM
    [7, 8, 9, 10, 8, 7, 6], // 7 PM (Thu 7 PM is absolute prime slot: 10/10)
    [4, 5, 7, 5, 6, 5, 4], // 9 PM
  ];

  if (isRestricted) {
    return (
      <div className="glass-panel p-12 rounded-[2.5rem] border border-brand-purple/20 bg-brand-purple/5 text-center flex flex-col items-center justify-center gap-4 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 rounded-full blur-2xl -z-10" />
        <ShieldAlert className="w-12 h-12 text-slate-400 dark:text-slate-600 animate-bounce" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-wider">Premium AI Strategic access restricted</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-normal">
          The Starter plan includes limited analytics suggestions. Upgrade to **Creator Pro** or **Creator Elite** to unlock deep audience diagnostic maps, upload time prediction tools, and sponsor analysis parameters.
        </p>
        <button
          onClick={() => window.location.reload()} // Forces route to pricing or allows quick check
          className="mt-4 px-6 py-3 rounded-xl bg-brand-purple text-white text-xs font-semibold shadow-glow-purple hover:bg-brand-violet transition-all active:scale-95 duration-200"
        >
          View Premium Tiers
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Upload Prediction Calendar Grid */}
      <section className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-purple" />
              <span>Predictive Upload Heatmap</span>
            </h4>
            <p className="text-[9px] text-slate-400 mt-0.5">Green grid cells indicate optimal slots based on historic active subscribers frequencies.</p>
          </div>
          <span className="text-[9px] font-bold px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase">
            Thursday 7:00 PM is Prime slot
          </span>
        </div>

        {/* Heatmap Layout Grid */}
        <div className="space-y-3">
          {/* Days Header */}
          <div className="grid grid-cols-8 gap-2 text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            <div /> {/* spacing offset */}
            {DAYS.map((d, i) => (
              <div key={i}>{d}</div>
            ))}
          </div>

          {/* Hours rows */}
          {HOURS.map((hour, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-8 gap-2 items-center">
              <span className="text-[9px] font-bold text-slate-400 text-right pr-2">{hour}</span>
              {DAYS.map((_, colIdx) => {
                const heat = UPLOAD_HEATMAP[rowIdx][colIdx];
                return (
                  <div
                    key={colIdx}
                    style={{
                      backgroundColor: heat >= 9 
                        ? 'rgba(16, 185, 129, 0.95)' 
                        : heat >= 7 
                        ? 'rgba(16, 185, 129, 0.65)' 
                        : heat >= 5 
                        ? 'rgba(16, 185, 129, 0.35)' 
                        : heat >= 3 
                        ? 'rgba(16, 185, 129, 0.15)' 
                        : 'rgba(255, 255, 255, 0.02)'
                    }}
                    className={`aspect-video rounded-lg border border-slate-200/10 dark:border-white/5 flex items-center justify-center text-[8px] font-bold text-slate-800 dark:text-white transition-all hover:scale-105 cursor-pointer relative group`}
                    title={`Slot strength: ${heat}/10`}
                  >
                    <span>{heat}</span>
                    {/* Tooltip on grid slot */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-950 text-white text-[8px] px-2 py-1 rounded shadow-xl whitespace-nowrap z-30 font-medium">
                      {heat >= 9 ? '🔥 High Engagement' : heat >= 6 ? '📈 Medium Growth' : '💤 Low Reach'}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* AI Strategist Recommendations expandable items */}
      <section className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-1.5">
          <Brain className="w-4.5 h-4.5 text-brand-purple animate-pulse" />
          <span>AI Growth Coach Diagnostics</span>
        </h4>

        <div className="space-y-3">
          {COACH_INSIGHTS.map((insight, idx) => (
            <div
              key={idx}
              className={`p-4.5 rounded-2xl border transition-all duration-300 ${
                activeFaq === idx 
                  ? 'border-brand-purple bg-brand-purple/5 shadow-sm' 
                  : 'border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/10 hover:bg-slate-100/50 dark:hover:bg-slate-900/20'
              }`}
            >
              <button
                onClick={() => setActiveFaq(idx)}
                className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-800 dark:text-white focus:outline-none"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                    insight.type === 'critical' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                    insight.type === 'important' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                    'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  }`}>
                    {insight.type}
                  </span>
                  <span>{insight.title}</span>
                </div>
                <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">{insight.platform}</span>
              </button>

              {activeFaq === idx && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-3 pt-3 border-t border-slate-200/40 dark:border-white/5">
                  {insight.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
