import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';

export default function AIOrb({ onClick }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [pulseScale, setPulseScale] = useState(1);
  const orbRef = useRef(null);

  // Soft automatic breathing pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseScale(prev => (prev === 1 ? 1.06 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Magnetic attraction simulation on mouse proximity
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!orbRef.current) return;
      const rect = orbRef.current.getBoundingClientRect();
      const orbX = rect.left + rect.width / 2;
      const orbY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - orbX;
      const distanceY = e.clientY - orbY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Proximity threshold of 180px
      if (distance < 180) {
        const strength = (180 - distance) / 180; // 0 to 1
        const pullX = (distanceX / distance) * 20 * strength;
        const pullY = (distanceY / distance) * 20 * strength;
        setPosition({ x: pullX, y: pullY });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={orbRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${pulseScale * (isHovered ? 1.1 : 1)})`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      className="fixed bottom-6 right-6 z-40 cursor-pointer group"
    >
      {/* Floating Ambient Aura Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan rounded-full blur-xl opacity-60 group-hover:opacity-90 group-hover:scale-125 transition-all duration-500 animate-pulse-glow" />

      {/* Main Orb Body */}
      <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#7c3aed] via-[#d946ef] to-[#06b6d4] flex items-center justify-center overflow-hidden border border-white/20 shadow-2xl shadow-brand-purple/40">
        
        {/* Soft floating dynamic glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent h-1/2 rounded-t-full pointer-events-none" />

        {/* Animated core details */}
        <div className="absolute w-8 h-8 rounded-full bg-white/20 blur-md animate-ping pointer-events-none duration-1000" />
        
        {/* Centered Icon with rotation */}
        <div className="relative z-10 transition-transform duration-500 group-hover:rotate-12">
          {isHovered ? (
            <MessageSquare className="w-6 h-6 text-white drop-shadow-md animate-bounce" />
          ) : (
            <Sparkles className="w-6 h-6 text-white drop-shadow-md" />
          )}
        </div>

        {/* Pulsing grid lines mock */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
      </div>

      {/* Futuristic Hover label tooltip */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-slate-900/90 text-white border border-white/10 text-xs px-3 py-1.5 rounded-full font-medium shadow-xl opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap backdrop-blur-sm">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI Strategist Online
        </span>
      </div>
    </div>
  );
}
