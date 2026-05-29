import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Play, CheckCircle2, ChevronDown, Youtube, Twitch, MessageSquare, Flame, HelpCircle, UserCheck, Smartphone, Target } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import { useApp } from '../context/AppContext';

export default function LandingPage({ onNavigate, onSetAuthMode }) {
  const { currentUser, theme } = useApp();
  const [activeFaq, setActiveFaq] = useState(null);
  const canvasRef = useRef(null);

  // Floating platform icons config
  const PLATFORMS = [
    { name: 'youtube', color: 'text-red-500', bg: 'bg-red-500/10', icon: <Youtube className="w-6 h-6" /> },
    { name: 'twitch', color: 'text-purple-500', bg: 'bg-purple-500/10', icon: <Twitch className="w-6 h-6" /> },
    { name: 'tiktok', color: 'text-pink-500', bg: 'bg-pink-500/10', icon: <Flame className="w-6 h-6" /> },
    { name: 'discord', color: 'text-blue-500', bg: 'bg-blue-500/10', icon: <MessageSquare className="w-6 h-6" /> },
    { name: 'kick', color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: <Target className="w-6 h-6" /> }
  ];

  // Dynamic canvas particle backdrop simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles array
    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.3 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
        if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark 
          ? `rgba(139, 92, 246, ${p.alpha})` 
          : `rgba(99, 102, 241, ${p.alpha * 0.7})`;
        ctx.fill();
      });

      // Draw interactive connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark 
              ? `rgba(139, 92, 246, ${(1 - dist/120) * 0.08})` 
              : `rgba(99, 102, 241, ${(1 - dist/120) * 0.05})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleStartFree = () => {
    if (currentUser) {
      if (currentUser.plan === 'none') {
        onNavigate('pricing');
      } else {
        onNavigate('dashboard');
      }
    } else {
      onSetAuthMode('signup');
      onNavigate('auth');
    }
  };

  const FAQS = [
    { q: "How does CreatorOS work?", a: "CreatorOS connects via secure read-only APIs to YouTube, Twitch, TikTok, Kick, and Discord. The growth model compiles all metrics into a unified dashboard, and the AI strategist analyzes retention charts, engagement drop-offs, and scheduling models to deliver high-impact instructions." },
    { q: "Is my data secure?", a: "Absolutely. All third-party platform credentials and synced analytics are stored within encrypted browser stores or securely hashed on simulated servers. CreatorOS will never sell your platform data or post without permissions." },
    { q: "Which platforms are supported?", a: "We support YouTube/Google Analytics, Twitch Streaming, TikTok clips, Kick, Discord communities, X/Twitter feed, and Instagram profiles." },
    { q: "Can I cancel my subscription anytime?", a: "Yes. You can manage or cancel your subscription directly inside the Pricing module or through the Dashboard settings overlay. Downgrading to Starter is instant." },
    { q: "Does AI generate recommendations automatically?", a: "Yes. The AI Strategist constantly processes viewer statistics in the background. Helpful notifications (upload warnings, virality markers, title scoring recommendations) update automatically." }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans">
      
      {/* Background Interactive canvas particles & glow blobs */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none -z-30" />
      <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-3xl -z-10 animate-blob-1" />
      <div className="absolute top-[40%] left-[5%] w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-3xl -z-10 animate-blob-2 animate-pulse-glow" />

      {/* Floating Navbar */}
      <nav className="fixed top-4 inset-x-4 z-40 max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-4 flex items-center justify-between border border-slate-200/40 dark:border-white/5 shadow-lg">
        <div className="flex items-center gap-2 font-bold text-lg cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-8 h-8 rounded-xl bg-brand-purple flex items-center justify-center text-white tracking-tight shadow-glow-purple font-black">
            C
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            CreatorOS
          </span>
        </div>

        {/* Navbar Center Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-brand-purple transition-colors">Features</a>
          <a href="#demo" className="hover:text-brand-purple transition-colors">AI Strategist</a>
          <a href="#pricing" className="hover:text-brand-purple transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-brand-purple transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {currentUser ? (
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-xs font-semibold px-4.5 py-2.5 rounded-xl bg-brand-purple text-white shadow-glow-purple hover:bg-brand-violet transition-all hover:scale-105 active:scale-95 duration-200"
            >
              Enter Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => { onSetAuthMode('login'); onNavigate('auth'); }}
                className="text-xs font-semibold hover:text-brand-purple transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={handleStartFree}
                className="text-xs font-semibold px-4.5 py-2.5 rounded-xl bg-brand-purple text-white shadow-glow-purple hover:bg-brand-violet transition-all hover:scale-105 active:scale-95 duration-200"
              >
                Start Free
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Floating AI pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-purple/20 bg-brand-purple/5 text-[10px] text-brand-purple font-semibold uppercase tracking-widest mb-6 animate-float-slow">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          The future of creator intelligence
        </div>

        {/* Master Heading Title */}
        <h1 className="text-4xl sm:text-6xl font-black font-sans leading-tight tracking-tight max-w-4xl text-slate-800 dark:text-white">
          Your <span className="text-glow-gradient font-extrabold">AI Growth Manager</span> for Content Creation.
        </h1>
        
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mt-6 leading-relaxed">
          Connect every platform. Track audience behavior metrics. Optimize titles and hooks, and scale your reach automatically with the AI strategist.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <button
            onClick={handleStartFree}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-purple text-white text-xs font-bold shadow-glow-purple hover:bg-brand-violet hover:scale-105 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start Growing Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#demo"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-200/60 dark:bg-slate-900/50 hover:bg-slate-300/60 dark:hover:bg-slate-900/80 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch Demo</span>
          </a>
        </div>

        {/* FLOATING GLASS DASHBOARD MOCKUP */}
        <div className="mt-20 w-full max-w-5xl rounded-3xl p-2.5 bg-gradient-to-tr from-brand-purple/20 via-brand-pink/5 to-brand-cyan/20 border border-white/20 shadow-2xl relative group overflow-hidden hover:scale-[1.01] transition-transform duration-500">
          <div className="glass-panel rounded-2xl border border-slate-200/50 dark:border-white/5 overflow-hidden shadow-2xl aspect-[16/9] relative bg-slate-900">
            {/* Header frame bar */}
            <div className="h-8 border-b border-white/5 bg-slate-950/80 px-4 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[9px] text-slate-500 font-mono tracking-widest">CREATOROS_DASHBOARD_V2.0</span>
              <span className="w-4" />
            </div>

            {/* Dashboard elements layout mockup */}
            <div className="p-4 grid grid-cols-12 gap-4 h-[calc(100%-2rem)] bg-[#030712]">
              {/* Left mock sidebar */}
              <div className="col-span-3 border-r border-white/5 h-full pr-4 space-y-4">
                <div className="w-20 h-4 bg-slate-800 rounded-md animate-pulse" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-6 rounded-lg ${i === 1 ? 'bg-brand-purple/20 border border-brand-purple/20' : 'bg-slate-900'} flex items-center px-2.5 gap-2`}>
                      <span className="w-2.5 h-2.5 rounded bg-slate-700" />
                      <div className="w-12 h-2 bg-slate-700 rounded" />
                    </div>
                  ))}
                </div>
              </div>
              {/* Main content mocked widgets */}
              <div className="col-span-9 h-full space-y-4 overflow-hidden">
                {/* Stats cards grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Followers", value: "248,500", color: "from-brand-purple/10 to-brand-pink/5" },
                    { label: "AI Score", value: "92/100", color: "from-brand-cyan/10 to-brand-blue/5" },
                    { label: "Earnings", value: "$4,250", color: "from-brand-emerald/10 to-brand-cyan/5" }
                  ].map((w, idx) => (
                    <div key={idx} className={`p-3 rounded-2xl border border-white/5 bg-gradient-to-tr ${w.color} flex flex-col justify-between`}>
                      <span className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider">{w.label}</span>
                      <span className="text-sm font-bold text-white mt-1.5">{w.value}</span>
                    </div>
                  ))}
                </div>

                {/* Simulated Chart area */}
                <div className="h-28 rounded-2xl border border-white/5 bg-slate-900/50 p-3 flex flex-col justify-between relative overflow-hidden">
                  <div className="w-28 h-3 bg-slate-800 rounded animate-pulse" />
                  {/* Wave vector line mockup representing growth */}
                  <svg className="absolute bottom-0 left-0 w-full h-16 pointer-events-none" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,8 C10,9 20,4 30,6 C40,8 50,2 60,5 C70,8 80,1 90,3 C100,5 100,10 100,10 L0,10 Z" fill="url(#grad)" />
                    <path d="M0,8 C10,9 20,4 30,6 C40,8 50,2 60,5 C70,8 80,1 90,3 C100,5 100,10 100,10" fill="none" stroke="#8b5cf6" strokeWidth="0.5" />
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Simulated AI Insight notification box */}
                <div className="p-3 rounded-xl border border-brand-purple/20 bg-brand-purple/5 flex gap-2 items-center">
                  <Sparkles className="w-4 h-4 text-brand-purple shrink-0 animate-pulse" />
                  <span className="text-[10px] text-slate-300 font-medium text-left">
                    "AI Prediction: Uploading Minecraft shorts under 25 seconds outperforms standard edits by 43%."
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Platforms syncing ribbon banner */}
      <section className="py-12 border-y border-slate-200/50 dark:border-white/5 bg-slate-100/30 dark:bg-slate-900/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-6">Fully Integrated Platform Feeds</span>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {PLATFORMS.map((p, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-2 px-4.5 py-2.5 rounded-2xl glass-panel border border-slate-200/40 dark:border-white/5 shadow-md hover:scale-105 hover:border-brand-purple/35 transition-all cursor-pointer`}
              >
                <div className={`${p.color} ${p.bg} p-1.5 rounded-lg`}>{p.icon}</div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-24 px-4 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">
            Equipped with <span className="text-glow-gradient font-black">Pro-Grade Tools</span>
          </h2>
          <p className="text-xs text-slate-400 mt-3 leading-normal">
            CreatorOS is loaded with predictive engines engineered specifically to save you time and maximize viewer virality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Unified Analytics", desc: "No more switching tabs. Connect YouTube, Twitch, TikTok, Kick, and Discord into one fluid layout.", icon: <Smartphone className="w-5 h-5 text-brand-purple" /> },
            { title: "AI Strategy Coach", desc: "Actionable recommendations analyzing audience retention, pacing, descriptions, and ideal schedule slots.", icon: <Sparkles className="w-5 h-5 text-brand-cyan" /> },
            { title: "Monetization Suite", desc: "Track CPM rates, record affiliate payments, and manage active brand sponsorships automatically.", icon: <CheckCircle2 className="w-5 h-5 text-brand-emerald" /> }
          ].map((feat, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-3xl border border-slate-200/50 dark:border-white/5 hover:border-brand-purple/20 transition-all hover:scale-[1.02] duration-300">
              <div className="w-10 h-10 rounded-2xl bg-brand-purple/5 flex items-center justify-center mb-4">
                {feat.icon}
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-2">{feat.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Demonstration simulator banner */}
      <section id="demo" className="py-20 px-4 bg-slate-900/60 dark:bg-slate-950/40 border-y border-slate-200/40 dark:border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-pink/20 bg-brand-pink/5 text-[9px] text-brand-pink font-bold uppercase tracking-wider mb-4">
            <Flame className="w-3.5 h-3.5" /> AI Engine in Action
          </div>
          <h2 className="text-3xl font-extrabold text-white">Visualizing Creator Intelligence</h2>
          <p className="text-xs text-slate-400 mt-2.5 max-w-xl">
            See the exact notification instructions our AI strategist sends when processing historical creator feeds.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
            {[
              { text: "Your audience retention drops after 12 seconds during slow intro credits.", type: "Critique", color: "border-brand-pink/20 text-brand-pink" },
              { text: "Reaction challenge video streams gain 38% more initial engagement rates.", type: "Trend Match", color: "border-brand-cyan/20 text-brand-cyan" },
              { text: "Short-form platform clips are currently outperforming live streams by 40%.", type: "Viral Alert", color: "border-brand-purple/20 text-brand-purple" }
            ].map((insight, i) => (
              <div key={i} className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#0e1324] text-left flex flex-col justify-between hover:scale-[1.03] transition-all">
                <span className={`text-[9px] uppercase font-bold tracking-widest ${insight.color} border px-2 py-0.5 rounded-full w-max`}>
                  {insight.type}
                </span>
                <p className="text-xs text-slate-200 font-medium leading-relaxed mt-4">
                  "{insight.text}"
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing cards quick preview section */}
      <section id="pricing" className="py-24 px-4 max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Simple, Growth-Focused Plans</h2>
        <p className="text-xs text-slate-400 mb-10">Select the correct tier to fuel your growth model.</p>
        
        <button
          onClick={() => onNavigate('pricing')}
          className="px-8 py-4.5 rounded-2xl bg-brand-purple hover:bg-brand-violet text-white text-xs font-bold shadow-glow-purple hover:scale-105 transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-2 mx-auto"
        >
          <span>View Detailed Pricing Matrix</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-20 px-4 max-w-4xl mx-auto relative z-10 border-t border-slate-200/50 dark:border-white/5">
        <div className="text-center mb-12">
          <HelpCircle className="w-8 h-8 text-brand-purple mx-auto mb-4 animate-float-slow" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400 mt-2">Have a question? We have answered the most common topics.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div 
              key={i}
              className="glass-panel rounded-2xl border border-slate-200/50 dark:border-white/5 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/30 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
              </button>
              
              <div 
                style={{
                  maxHeight: activeFaq === i ? '150px' : '0',
                  opacity: activeFaq === i ? 1 : 0
                }}
                className="transition-all duration-300 overflow-hidden text-slate-400 text-[11px] leading-relaxed border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/10 px-5 py-0"
              >
                <div className="py-4">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Action CTA */}
      <section className="py-24 px-4 text-center max-w-4xl mx-auto relative z-10">
        <div className="glass-panel p-12 rounded-[2.5rem] border border-brand-purple/20 shadow-2xl relative overflow-hidden bg-gradient-to-tr from-brand-purple/10 to-brand-cyan/5">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white">
            Stop guessing. Start growing with AI.
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-4 leading-normal">
            Connect your channels in under 60 seconds and instantly generate your platform scores.
          </p>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleStartFree}
              className="px-8 py-4.5 rounded-2xl bg-brand-purple text-white text-xs font-bold shadow-glow-purple hover:bg-brand-violet hover:scale-105 transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Get Started Immediately</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200/50 dark:border-white/5 bg-slate-100/50 dark:bg-slate-950/20 text-center text-xs text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-purple flex items-center justify-center text-white text-xs font-bold">C</div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">CreatorOS</span>
          </div>
          <span>© 2026 CreatorOS SaaS Ltd. Built on Google Anti Gravity Design Language.</span>
          <div className="flex gap-4">
            <button onClick={() => onNavigate('pricing')} className="hover:text-brand-purple transition-colors font-medium">Terms</button>
            <button onClick={() => onNavigate('pricing')} className="hover:text-brand-purple transition-colors font-medium">Privacy</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
