import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, ShieldCheck, Sparkles, CreditCard, ChevronRight, X, AlertCircle } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import confetti from 'canvas-confetti';

export default function PricingPage({ onNavigate }) {
  const { currentUser, selectPlan } = useApp();
  const [selectedPlan, setSelectedPlan] = useState(null); // Plan object being purchased
  const [stripeLoading, setStripeLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const PLANS = [
    {
      name: "Starter",
      badge: "Free Tier",
      price: "$0",
      period: "forever",
      cta: "Start Free",
      description: "Perfect for starting creators exploring multifeed growth.",
      features: [
        "Connect up to 2 platforms",
        "Basic views & engagement charts",
        "Limited AI suggestions (3 per week)",
        "7-day analytics history",
        "Basic upload time suggestions",
        "Limited dashboard widgets styling"
      ],
      restrictions: [
        "No premium Sponsor intelligence",
        "No advanced audience retention maps",
        "No viral title & description AI"
      ]
    },
    {
      name: "Creator Pro",
      badge: "Most Popular",
      price: "$5",
      period: "month",
      cta: "Upgrade to Pro",
      highlight: true,
      description: "Designed for full-time creators seeking serious reach.",
      features: [
        "Connect up to 6 platforms",
        "Full unified analytics dashboard",
        "Advanced AI growth engine suggestions",
        "Predictive upload schedule map",
        "AI weekly stream summary reports",
        "90-day analytics history record",
        "CPM & Sponsorship revenues tracking",
        "AI thumbnail analyzer ideas",
        "Title CTR recommendation panel"
      ]
    },
    {
      name: "Creator Elite",
      badge: "Best Value",
      price: "$15",
      period: "month",
      cta: "Go Elite",
      highlightSecondary: true,
      description: "For elite streamers, teams, and brand agency management.",
      features: [
        "Unlimited platform connections",
        "AI Creator Manager strategist system",
        "Smart viral idea script suggestions",
        "Full brand sponsorship fit index",
        "Unlimited analytics history archive",
        "Multi-user team sharing controls",
        "Weekly simulated PDF performance reports",
        "Custom milestone tracking & streaks",
        "Direct priority customer support"
      ]
    }
  ];

  const handleChoosePlan = (plan) => {
    if (plan.price === "$0") {
      // Free starter needs no card checkout
      selectPlan("Starter");
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
      onNavigate('dashboard');
    } else {
      setSelectedPlan(plan);
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setStripeLoading(true);

    setTimeout(() => {
      selectPlan(selectedPlan.name);
      setStripeLoading(false);
      setSelectedPlan(null);
      
      // Blast celebratory confetti on premium purchase!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      onNavigate('dashboard');
    }, 2000);
  };

  return (
    <div className="relative min-h-screen py-20 px-4 overflow-hidden flex flex-col items-center">
      
      {/* Dynamic Mesh backgrounds */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-3xl -z-10 animate-blob-1" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-3xl -z-10 animate-blob-2" />

      {/* Navigation Header */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 max-w-7xl mx-auto">
        <button
          onClick={() => currentUser?.plan !== 'none' ? onNavigate('dashboard') : onNavigate('landing')}
          className="flex items-center gap-2 group font-semibold text-lg"
        >
          <div className="w-8 h-8 rounded-xl bg-brand-purple flex items-center justify-center text-white font-bold tracking-tight shadow-glow-purple">
            C
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 group-hover:opacity-80 transition-opacity">
            CreatorOS
          </span>
        </button>
        <div className="flex items-center gap-4">
          {currentUser && currentUser.plan !== 'none' && (
            <button 
              onClick={() => onNavigate('dashboard')}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:scale-105 active:scale-95 transition-all"
            >
              Back to Dashboard
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Main Header description */}
      <div className="text-center max-w-2xl mx-auto mb-16 mt-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-[10px] text-brand-cyan font-semibold uppercase tracking-wider animate-pulse mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Pricing Options
        </div>
        <h1 className="text-4xl font-extrabold font-sans tracking-tight text-slate-800 dark:text-white">
          Pick your <span className="text-glow-gradient font-bold">Growth Engine</span> tier
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
          {currentUser?.plan === 'none' 
            ? "Your subscription is currently inactive. Please choose a creator package below to authorize access to your dashboard workspace."
            : "Expand your platforms metrics capacity and unlock complete AI Strategist capabilities."
          }
        </p>
      </div>

      {/* Pricing cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full z-10">
        {PLANS.map((plan, idx) => (
          <div
            key={idx}
            style={{
              transform: plan.highlight ? 'scale(1.03)' : 'scale(1)'
            }}
            className={`glass-panel rounded-3xl p-8 flex flex-col relative transition-all duration-300 hover:translate-y-[-6px] border ${
              plan.highlight 
                ? 'border-brand-purple/40 shadow-glow-purple/20 shadow-2xl' 
                : plan.highlightSecondary 
                ? 'border-brand-cyan/40 shadow-glow-cyan/20' 
                : 'border-slate-200/50 dark:border-white/5'
            }`}
          >
            {/* Highlights flags */}
            {plan.highlight && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-purple text-white text-[9px] font-bold tracking-widest px-3.5 py-1 rounded-full uppercase shadow-lg shadow-brand-purple/20">
                {plan.badge}
              </span>
            )}
            {plan.highlightSecondary && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-cyan text-slate-900 text-[9px] font-bold tracking-widest px-3.5 py-1 rounded-full uppercase shadow-lg shadow-brand-cyan/20">
                {plan.badge}
              </span>
            )}

            {/* Title price details */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-xs text-slate-400 dark:text-slate-400 min-h-[32px] leading-relaxed">{plan.description}</p>
              <div className="flex items-baseline mt-4">
                <span className="text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">{plan.price}</span>
                <span className="text-xs text-slate-400 ml-1">/{plan.period}</span>
              </div>
            </div>

            {/* Core Plan Features */}
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feat, fIdx) => (
                <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
              {plan.restrictions && plan.restrictions.map((feat, fIdx) => (
                <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-400 dark:text-slate-500 line-through">
                  <span className="shrink-0 mt-1 block w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-700" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {/* CTA action button */}
            <button
              onClick={() => handleChoosePlan(plan)}
              className={`w-full py-3.5 rounded-2xl text-xs font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer ${
                plan.highlight
                  ? 'bg-brand-purple text-white shadow-glow-purple'
                  : plan.highlightSecondary
                  ? 'bg-brand-cyan text-slate-950 font-bold shadow-glow-cyan'
                  : 'bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Stripe checkout modal simulation overlay */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-md">
          <div className="w-full max-w-sm glass-panel border border-brand-purple/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden animate-float-medium">
            
            {/* Modal header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5 mb-6">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-brand-purple" />
                <span className="text-xs font-bold">Stripe Checkout Simulator</span>
              </div>
              <button 
                onClick={() => setSelectedPlan(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Checkout details */}
            <div className="mb-6 p-4 rounded-2xl bg-brand-purple/5 border border-brand-purple/10">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Selected Plan:</span>
                <span className="text-xs font-bold text-brand-purple">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100 dark:border-white/5">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Amount Due:</span>
                <span className="text-xs font-bold text-slate-800 dark:text-white">{selectedPlan.price} / month</span>
              </div>
            </div>

            {/* Checkout credit card form */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Card Number</label>
                <input
                  type="text"
                  required
                  placeholder="4242 •••• •••• 4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19))}
                  className="w-full text-xs px-3 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none focus:ring-1 focus:ring-brand-purple/50 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expiry</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value.substring(0, 5))}
                    className="w-full text-xs px-3 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CVC</label>
                  <input
                    type="text"
                    required
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.substring(0, 4))}
                    className="w-full text-xs px-3 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 flex gap-2 items-start text-[10px] text-slate-400 leading-normal">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Simulated Secure Payment handles via test key. No actual banking data is processed. Feel free to use test numbers.</span>
              </div>

              <button
                type="submit"
                disabled={stripeLoading}
                className="w-full mt-4 py-3.5 rounded-xl bg-brand-purple text-white text-xs font-semibold shadow-glow-purple hover:bg-brand-violet transition-all active:scale-95 duration-200 flex items-center justify-center gap-2"
              >
                {stripeLoading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    <span>Confirm Payment {selectedPlan.price}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
