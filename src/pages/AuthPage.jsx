import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Lock, User, Eye, EyeOff, ShieldAlert, Sparkles, Youtube, Twitch, Chrome, MessageSquare, AlertCircle } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function AuthPage({ onNavigate, initialMode = 'login' }) {
  const { login, signup } = useApp();
  const [mode, setMode] = useState(initialMode); // login, signup, forgot
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // OAuth active popup mock state
  const [oauthLoading, setOauthLoading] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      if (mode === 'login') {
        const res = login(email, password);
        if (res.success) {
          if (res.user.plan === 'none') {
            onNavigate('pricing');
          } else {
            onNavigate('dashboard');
          }
        } else {
          setErrorMsg(res.message);
        }
      } else if (mode === 'signup') {
        if (!fullName.trim()) {
          setErrorMsg("Please enter your full name.");
          setLoading(false);
          return;
        }
        const res = signup(email, password, fullName);
        if (res.success) {
          onNavigate('pricing');
        } else {
          setErrorMsg(res.message);
        }
      } else {
        // forgot password mock
        alert(`Password reset instructions sent to ${email}`);
        setMode('login');
      }
      setLoading(false);
    }, 1200);
  };

  const handleOAuthLogin = (provider) => {
    setOauthLoading(provider);
    setErrorMsg('');
    
    // Create animated OAuth glass overlay popup simulation
    setTimeout(() => {
      const mockEmail = `${provider}_creator@example.com`;
      const mockName = `${provider.charAt(0).toUpperCase() + provider.slice(1)} Partner`;
      
      const res = signup(mockEmail, "password123", mockName);
      if (res.success || res.message.includes("already registered")) {
        // If already exists, login
        const loginRes = login(mockEmail, "password123");
        if (loginRes.success) {
          if (loginRes.user.plan === 'none') {
            onNavigate('pricing');
          } else {
            onNavigate('dashboard');
          }
        }
      }
      setOauthLoading(null);
    }, 1800);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      
      {/* Background neon ambient grids & blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl -z-10 animate-blob-1" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-3xl -z-10 animate-blob-2" />

      {/* Floating Header */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 max-w-7xl mx-auto">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 group font-semibold text-lg"
        >
          <div className="w-8 h-8 rounded-xl bg-brand-purple flex items-center justify-center text-white font-bold tracking-tight shadow-glow-purple">
            C
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 group-hover:opacity-80 transition-opacity">
            CreatorOS
          </span>
        </button>
        <ThemeToggle />
      </div>

      {/* Auth Panel Box */}
      <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-slate-200/50 dark:border-white/5 shadow-2xl relative overflow-hidden transition-all duration-500 scale-100">
        
        {/* Glow border gradient effect */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan" />

        {/* Heading title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-brand-purple/20 bg-brand-purple/5 text-[10px] text-brand-purple font-medium mb-3 uppercase tracking-wider animate-pulse">
            <Sparkles className="w-3 h-3" /> Unified Gateway
          </div>
          <h2 className="text-2xl font-bold font-sans tracking-tight text-slate-800 dark:text-white">
            {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Recover Access'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
            {mode === 'login' ? 'Connect all platforms. Track everything. Grow faster.' : 'Get started with CreatorOS in seconds.'}
          </p>
        </div>

        {/* Errors Alert display */}
        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Creator Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none focus:ring-1 focus:ring-brand-purple/50 focus:border-transparent transition-all"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@creatoros.com"
                className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none focus:ring-1 focus:ring-brand-purple/50 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[10px] text-brand-purple hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none focus:ring-1 focus:ring-brand-purple/50 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-white/10 text-brand-purple focus:ring-brand-purple"
              />
              <label htmlFor="remember" className="ml-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium cursor-pointer">
                Remember my creator profile session
              </label>
            </div>
          )}

          {/* Core submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-brand-purple text-white text-xs font-semibold shadow-glow-purple hover:bg-brand-violet transition-all active:scale-95 duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              mode === 'login' ? 'Sign In to Dashboard' : mode === 'signup' ? 'Start Free Trial' : 'Reset My Password'
            )}
          </button>
        </form>

        {/* OAuth Separator */}
        {mode !== 'forgot' && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-white/5" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400">
                <span className="bg-slate-50 dark:bg-[#0f172a] px-3 tracking-wide">Or connect with OAuth</span>
              </div>
            </div>

            {/* OAuth Buttons Grid */}
            <div className="grid grid-cols-5 gap-2">
              {[
                { id: 'google', icon: <Chrome className="w-4 h-4 text-red-500" /> },
                { id: 'twitch', icon: <Twitch className="w-4 h-4 text-[#9146FF]" /> },
                { id: 'youtube', icon: <Youtube className="w-4 h-4 text-[#FF0000]" /> },
                { id: 'discord', icon: <MessageSquare className="w-4 h-4 text-[#5865F2]" /> },
                { id: 'tiktok', icon: <Sparkles className="w-4 h-4 text-brand-pink" /> }
              ].map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleOAuthLogin(provider.id)}
                  disabled={oauthLoading !== null}
                  className="flex items-center justify-center p-3 rounded-xl border border-slate-200/60 dark:border-white/5 hover:border-brand-purple/50 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer hover:scale-105 active:scale-95 relative"
                  title={`Login with ${provider.id}`}
                >
                  {oauthLoading === provider.id ? (
                    <span className="w-4 h-4 rounded-full border-2 border-brand-purple border-t-transparent animate-spin" />
                  ) : (
                    provider.icon
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Footer Toggle Mode Links */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/5 text-center text-xs text-slate-500 dark:text-slate-400">
          {mode === 'login' ? (
            <span>
              New to CreatorOS?{' '}
              <button onClick={() => setMode('signup')} className="text-brand-purple font-semibold hover:underline">
                Create free profile
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button onClick={() => setMode('login')} className="text-brand-purple font-semibold hover:underline">
                Sign in instead
              </button>
            </span>
          )}
        </div>

      </div>

    </div>
  );
}
