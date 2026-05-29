import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, ArrowRight, ShieldCheck, HelpCircle, Layers, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CommandPalette({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [adminKeyError, setAdminKeyError] = useState('');
  const paletteRef = useRef(null);

  const { togglePlatform, selectPlan, theme, setTheme } = useApp();

  // Keyboard shortcut listener for Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle command palette search options
  const COMMANDS = [
    { label: "Go to Dashboard Overview", shortcut: "G O", action: () => { onNavigate('dashboard'); setIsOpen(false); } },
    { label: "Toggle Dark/Light Theme", shortcut: "T T", action: () => { setTheme(theme === 'dark' ? 'light' : 'dark'); setIsOpen(false); } },
    { label: "View Pricing Plans", shortcut: "G P", action: () => { onNavigate('pricing'); setIsOpen(false); } },
    { label: "Sync YouTube Channel", shortcut: "S Y", action: () => { togglePlatform('youtube'); setIsOpen(false); } },
    { label: "Sync Twitch Account", shortcut: "S T", action: () => { togglePlatform('twitch'); setIsOpen(false); } },
    { label: "Go to Marketing Landing", shortcut: "G L", action: () => { onNavigate('landing'); setIsOpen(false); } }
  ];

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setAdminKeyError('');
  };

  const handleCommandExecute = (e) => {
    if (e.key === 'Enter') {
      const trimmed = query.trim();
      
      // Hidden admin secret key entry
      if (trimmed === 'CREATOROS_ADMIN_2026') {
        onNavigate('admin');
        setIsOpen(false);
        setQuery('');
      } else if (trimmed.toLowerCase() === '/admin') {
        setAdminKeyError('Secret admin key required! Enter key into search bar to unlock access.');
      } else {
        // Match search query to standard command titles
        const match = COMMANDS.find(c => c.label.toLowerCase().includes(trimmed.toLowerCase()));
        if (match) {
          match.action();
        } else {
          setAdminKeyError('Command not found. Enter a valid search or enter the Admin key.');
        }
      }
    }
  };

  const filteredCommands = COMMANDS.filter(c => 
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-md">
      
      <div 
        ref={paletteRef}
        className="w-full max-w-xl glass-panel rounded-2xl shadow-2xl border border-white/10 overflow-hidden scale-100 transition-all duration-300"
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/40">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleCommandExecute}
            autoFocus
            placeholder="Search pages, run commands, or enter secret Admin Key..."
            className="flex-1 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none placeholder-slate-400"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded border border-slate-200 dark:border-white/10 text-[10px] text-slate-400 font-mono shadow-sm bg-white dark:bg-slate-800">
            ESC
          </kbd>
        </div>

        {/* Error Alert */}
        {adminKeyError && (
          <div className="px-4 py-2.5 bg-rose-500/10 border-b border-rose-500/20 text-xs text-rose-500 font-medium flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            {adminKeyError}
          </div>
        )}

        {/* Results */}
        <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((c, i) => (
              <button
                key={i}
                onClick={c.action}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-left group"
              >
                <div className="flex items-center gap-3 text-xs">
                  <Terminal className="w-4 h-4 text-slate-400 group-hover:text-brand-purple transition-colors" />
                  <span className="font-medium text-slate-700 dark:text-slate-200">{c.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900 text-slate-400">
                    {c.shortcut}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-2">
              <Layers className="w-8 h-8 text-slate-300 dark:text-slate-700 animate-pulse" />
              <span>No results found. Press [Enter] to test search as command or key.</span>
            </div>
          )}
        </div>

        {/* Quick Instructions Footer */}
        <div className="bg-slate-100/50 dark:bg-slate-900/60 p-3 px-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-400">
          <span className="flex items-center gap-1.5 font-medium">
            <Zap className="w-3.5 h-3.5 text-brand-purple" />
            Tip: Try typing `CREATOROS_ADMIN_2026` to unlock secret Admin tools!
          </span>
          <span className="flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            Ctrl + K to toggle
          </span>
        </div>

      </div>

    </div>
  );
}
