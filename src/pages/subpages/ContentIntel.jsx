import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Brain, Award, Send, RefreshCw, Flame, Lightbulb, Image } from 'lucide-react';

export default function ContentIntel() {
  const { triggerAIRequest } = useApp();
  
  // Title generator state
  const [testTitle, setTestTitle] = useState('');
  const [titleAnalysis, setTitleAnalysis] = useState(null);
  const [loadingTitle, setLoadingTitle] = useState(false);

  // Viral generator state
  const [niche, setNiche] = useState('gaming');
  const [viralIdeas, setViralIdeas] = useState([]);
  const [loadingIdeas, setLoadingIdeas] = useState(false);

  const handleRateTitle = (e) => {
    e.preventDefault();
    if (!testTitle.trim()) return;

    setLoadingTitle(true);
    triggerAIRequest(); // increment admin count

    setTimeout(() => {
      let score = 65;
      let powerWord = "[REVEALED]";
      let suggestions = [];

      // Mock calculation based on length and patterns
      if (testTitle.length > 30 && testTitle.length < 60) score += 15;
      if (testTitle.includes("!") || testTitle.includes("?")) score += 10;
      if (testTitle.toLowerCase().includes("how") || testTitle.toLowerCase().includes("secret") || testTitle.toLowerCase().includes("exposed")) {
        score += 8;
      }

      score = Math.min(98, score);

      if (score < 80) {
        suggestions = [
          "Include a bracketed bracket, e.g., '[EXPOSING]'.",
          "Ensure high-impact keywords are placed within the first 3 words.",
          "Keep length under 60 characters for mobile viewport displays."
        ];
      } else {
        suggestions = [
          "Title is highly optimized! High click probability predicted.",
          "Ensure thumbnail text matches or expands on the title keyword."
        ];
      }

      setTitleAnalysis({
        score,
        suggestions,
        optimized: `${testTitle} ${powerWord}`
      });
      setLoadingTitle(false);
    }, 1200);
  };

  const handleGenerateIdeas = () => {
    setLoadingIdeas(true);
    triggerAIRequest();

    setTimeout(() => {
      let ideas = [];
      if (niche === 'gaming') {
        ideas = [
          { title: "I Built a Minecraft World in 100 Hours (And Blew it Up)", hook: "First 3s: Show the final giant structure collapsing, then cut back to hour 1.", ctr: "9.2%" },
          { title: "Reacting to my oldest YouTube streams...", hook: "First 3s: Hilarious cringe reaction snapshot with custom voice overlay.", ctr: "8.7%" }
        ];
      } else if (niche === 'tech') {
        ideas = [
          { title: "1 Hardware Device That Speed Up My Coding 10x", hook: "First 3s: Zoom into a strange key keypad device, showing it executing rapid commands.", ctr: "11.4%" },
          { title: "I Built an AI Operating System for Content Creators", hook: "First 3s: Drag-and-drop visuals of synced dashboards flashing multicolored grids.", ctr: "12.8%" }
        ];
      } else {
        ideas = [
          { title: "The Secret setups you need to stream under $100", hook: "First 3s: Split-screen comparing an expensive stream gear to a budget set.", ctr: "7.9%" },
          { title: "My Day in the life of a Streamer (Exposing the boring parts)", hook: "First 3s: Waking up at 1 PM with high contrast lighting edits.", ctr: "8.4%" }
        ];
      }
      setViralIdeas(ideas);
      setLoadingIdeas(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Interactive Title Rating analyzer */}
      <section className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Brain className="w-4.5 h-4.5 text-brand-purple" />
            <span>AI Title Optimizer</span>
          </h4>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded border border-brand-purple/20 bg-brand-purple/5 text-brand-purple">
            CTR Predictor
          </span>
        </div>

        <form onSubmit={handleRateTitle} className="flex gap-2">
          <input
            type="text"
            required
            placeholder="e.g. How I made a SaaS website in 24 hours"
            value={testTitle}
            onChange={(e) => setTestTitle(e.target.value)}
            className="flex-1 text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loadingTitle}
            className="px-6 py-3 rounded-xl bg-brand-purple text-white text-xs font-semibold shadow-glow-purple hover:bg-brand-violet transition-all active:scale-95 duration-200 shrink-0"
          >
            {loadingTitle ? (
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin block" />
            ) : (
              "Rate Title"
            )}
          </button>
        </form>

        {titleAnalysis && (
          <div className="mt-5 p-4 rounded-2xl bg-brand-purple/5 border border-brand-purple/10 space-y-4 animate-float-medium">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold">Analysis Score:</span>
              <span className={`text-lg font-black ${
                titleAnalysis.score >= 80 ? 'text-emerald-500' : 'text-amber-500'
              }`}>{titleAnalysis.score}/100</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Recommended Actions:</span>
              <ul className="space-y-1">
                {titleAnalysis.suggestions.map((s, i) => (
                  <li key={i} className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5 leading-relaxed">
                    <span className="text-brand-purple mt-1">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200/40 dark:border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span className="text-[10px] text-slate-400 font-medium">AI Re-optimized Title Alternative:</span>
              <span className="text-xs font-bold text-brand-purple text-left">"{titleAnalysis.optimized}"</span>
            </div>
          </div>
        )}
      </section>

      {/* AI Viral Idea Generator panel */}
      <section className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb className="w-4.5 h-4.5 text-brand-purple animate-pulse" />
            <span>AI Viral Idea Generator</span>
          </h4>
          <div className="flex gap-2 items-center">
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="text-[10px] px-2 py-1.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none text-slate-600 dark:text-slate-300 font-semibold"
            >
              <option value="gaming">Gaming</option>
              <option value="tech">Tech & Code</option>
              <option value="lifestyle">Lifestyle & Stream</option>
            </select>
            <button
              onClick={handleGenerateIdeas}
              disabled={loadingIdeas}
              className="p-1.5 rounded-xl bg-brand-purple text-white shadow-glow-purple hover:bg-brand-violet transition-colors active:scale-95 duration-200 shrink-0"
              title="Generate new viral ideas"
            >
              {loadingIdeas ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {viralIdeas.length > 0 ? (
            viralIdeas.map((idea, idx) => (
              <div 
                key={idx}
                className="p-4.5 rounded-2xl border border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/10 hover:border-brand-purple/20 transition-all space-y-3"
              >
                <div className="flex justify-between items-start gap-3">
                  <h5 className="text-xs font-bold text-slate-800 dark:text-white">{idea.title}</h5>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 whitespace-nowrap">
                    Est. CTR: {idea.ctr}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                  <span className="font-bold text-brand-purple">Viral Hook Setup:</span> {idea.hook}
                </p>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-[10px] text-slate-400 flex flex-col items-center justify-center gap-1">
              <Lightbulb className="w-6 h-6 text-slate-300 dark:text-slate-700" />
              <span>Choose your niche and press Send to generate viral prompts!</span>
            </div>
          )}
        </div>
      </section>

      {/* Thumbnail saturation guide metrics */}
      <section className="glass-panel p-5 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-1.5">
          <Image className="w-4.5 h-4.5 text-brand-purple" />
          <span>Thumbnail Contrast Analysis</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { metric: "Face Placements", rating: "Highly Optimized", desc: "Placing characters face on the right-third increases click metrics by 14%." },
            { metric: "Saturation Intensity", rating: "Moderate (82%)", desc: "Bump saturation filters by +8% to pop in competitive feeds." },
            { metric: "Text Overlay Contrast", rating: "Too Text-Heavy", desc: "AI Warning: Titles overlaying > 4 words reduces mobile CTR averages." }
          ].map((t, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-100/30 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/2.5 space-y-2 relative overflow-hidden">
              {idx === 2 && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/5 rounded-full blur-lg" />
              )}
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.metric}</h5>
              <div className="flex justify-between items-center mt-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  idx === 0 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                  idx === 1 ? 'bg-brand-purple/10 text-brand-purple border-brand-purple/20' :
                  'bg-rose-500/10 text-rose-500 border-rose-500/20'
                }`}>{t.rating}</span>
              </div>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-normal mt-2">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
