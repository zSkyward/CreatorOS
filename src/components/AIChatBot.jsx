import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Brain, Flame, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AIChatBot({ isOpen, onClose }) {
  const { currentUser, triggerAIRequest } = useApp();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${currentUser ? currentUser.fullName : 'Creator'}! I am your CreatorOS AI Growth Strategist. Click one of the suggestions below or ask me anything about your analytics, title rating, or hook ideas!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Suggestions chips
  const SUGGESTIONS = [
    { text: "Rate my YouTube Title", type: "title" },
    { text: "What is my optimal stream schedule?", type: "stream" },
    { text: "Generate viral ideas for TikTok", type: "viral" },
    { text: "How can I improve viewer retention?", type: "retention" }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    triggerAIRequest(); // Sync with admin statistics

    // Simulate thinking delay and highly contextual response
    setTimeout(() => {
      let aiResponseText = "";
      const lower = text.toLowerCase();

      if (lower.includes("title") || lower.includes("rate")) {
        aiResponseText = "🎯 **Title Analysis Score: 87/100**\n\n*Suggestions to optimize:*\n1. Add a bracketed power word, e.g., '[EXPOSING]'.\n2. Keep it under 60 characters for mobile display.\n3. Position the highest click-rate keyword within the first 3 words.";
      } else if (lower.includes("stream") || lower.includes("schedule")) {
        aiResponseText = "📅 **AI Stream Schedule Forecast:**\nBased on your historic Twitch/YouTube engagement, your viewers are most active on **Tuesdays and Thursdays at 7:00 PM EST**.\n\n*Stream Duration:* Avoid stretching past 3.5 hours, as retention score drops by 38% after 200 minutes.";
      } else if (lower.includes("tiktok") || lower.includes("viral")) {
        aiResponseText = "🔥 **Viral TikTok Idea Grid:**\n\n1. **'The Secret Setup'**: Reveal 1 hardware device you use that cost under $20 but improved your stream quality 10x.\n2. **'Fails to Wins'**: 15-second high-energy compilation of a major gaming fail instantly transitioning into a victory clutch.";
      } else if (lower.includes("retention") || lower.includes("intro")) {
        aiResponseText = "📉 **Audience Retention Diagnostics:**\n\nViewers are dropping off in the first **8 seconds** because your intros are too slow. Try jumping *straight into the action* within the first 2 seconds, and show the climax first before the explanation (Hook first, title card second).";
      } else {
        aiResponseText = "💡 **Growth Insight:**\nEnsure your cross-platform content is highly synced. Post YouTube Shorts highlighting your Twitch streaming highlights within 24 hours of the live session to boost organic Twitch discoverability by 28%.";
      }

      setMessages(prev => [...prev, {
        sender: 'ai',
        text: aiResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] z-50 glass-panel rounded-2xl flex flex-col shadow-2xl border border-brand-purple/20 overflow-hidden animate-float-medium">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-purple/20 via-brand-pink/10 to-brand-cyan/20 p-4 border-b border-white/15 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center">
            <Brain className="w-5 h-5 text-brand-purple animate-pulse" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">AI Growth Coach</h4>
            <span className="text-[10px] text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Strategist Module active
            </span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-brand-purple text-white rounded-tr-none'
                : 'bg-slate-100 dark:bg-slate-800/80 border border-slate-200/50 dark:border-white/5 text-slate-800 dark:text-slate-200 rounded-tl-none whitespace-pre-line'
            }`}>
              {msg.text}
            </div>
            <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.time}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex flex-col items-start">
            <div className="bg-slate-100 dark:bg-slate-800/80 border border-slate-200/50 dark:border-white/5 rounded-2xl rounded-tl-none p-3 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions Tray */}
      {messages.length === 1 && (
        <div className="p-2 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30">
          <span className="text-[10px] text-slate-400 px-2 font-medium">Quick Tasks:</span>
          <div className="flex flex-wrap gap-1.5 p-1">
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s.text)}
                className="text-[10px] px-2.5 py-1 rounded-full border border-slate-200 dark:border-white/10 hover:border-brand-purple/50 dark:hover:border-brand-purple/50 hover:bg-brand-purple/5 dark:hover:bg-brand-purple/5 transition-all text-slate-600 dark:text-slate-300 font-medium"
              >
                {s.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input container */}
      <div className="p-3 border-t border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900/40 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI Strategist..."
          className="flex-1 text-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/5 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-brand-purple/50 focus:border-transparent transition-all"
        />
        <button
          onClick={() => handleSend()}
          className="p-2.5 rounded-xl bg-brand-purple text-white hover:bg-brand-violet transition-colors active:scale-95 duration-200"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
