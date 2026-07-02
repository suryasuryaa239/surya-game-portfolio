import React from 'react';
import { audio } from '../utils/audio';

export default function Footer() {
  const handleClick = () => {
    audio.playClick();
  };

  return (
    <footer className="w-full border-t border-slate-200/60 bg-slate-50 py-12 px-6 select-none relative overflow-hidden text-slate-500">
      {/* Background decoration dots */}
      <div className="absolute inset-0 cyber-dots-light opacity-30 pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        
        {/* Credits logo */}
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
          <div>
            <h4 className="font-heading text-xs font-black tracking-widest text-slate-800 uppercase">SURYA</h4>
            <p className="font-sans text-[9px] tracking-wider text-blue-600 uppercase font-semibold">See you in the next game</p>
          </div>
        </div>

        {/* Core credits */}
        <div className="text-center md:text-right font-sans text-xs text-slate-400 space-y-1">
          <div>
            Designed & Developed by{' '}
            <span className="text-slate-650 font-bold hover:text-blue-600 transition-colors">
              Surya
            </span>
          </div>
          <div className="text-[10px] text-slate-400">
            Built with React &bull; Tailwind CSS v4 &bull; Framer Motion &bull; Three.js
          </div>
        </div>

      </div>

      <div className="max-w-6xl w-full mx-auto text-center font-mono text-[9px] text-slate-400 uppercase tracking-wider mt-8 pt-4 border-t border-slate-200/60">
        © 2026 Surya. All Rights Reserved.
      </div>
    </footer>
  );
}
