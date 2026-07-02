import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Automatic progressive loading simulation (takes ~1.8 seconds)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random incremental steps
        const step = Math.floor(Math.random() * 12) + 6;
        return Math.min(100, prev + step);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const showLogoTimer = setTimeout(() => {
        setShowLogo(true);
      }, 300);

      const completeTimer = setTimeout(() => {
        onComplete();
      }, 2300); // 2s display time for brand logo

      return () => {
        clearTimeout(showLogoTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 px-6 select-none transition-colors duration-500">
      {/* Light dot overlay */}
      <div className="absolute inset-0 cyber-dots-light opacity-50 pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 flex flex-col items-center justify-center min-h-[250px]">
        <AnimatePresence mode="wait">
          {!showLogo ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full space-y-6"
            >
              {/* Spinner/Pulse decorative element */}
              <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin mx-auto" />
              
              <div className="space-y-3">
                <h3 className="font-heading text-sm font-semibold text-slate-500 uppercase tracking-widest">
                  Initializing Game Engine
                </h3>
                
                {/* Clean Loading bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                  <motion.div
                    className="h-full bg-blue-600 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut', duration: 0.1 }}
                  />
                </div>
                
                <div className="flex justify-between font-mono text-[10px] text-slate-400">
                  <span>SYSTEM_BOOT</span>
                  <span>{progress}%</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {/* Cinematic Brand Reveal */}
              <h1 className="text-4xl md:text-5xl font-heading font-black tracking-widest text-slate-900 uppercase">
                SURYA STUDIOS
              </h1>
              
              <div className="flex items-center justify-center gap-3">
                <span className="h-[1px] w-8 bg-slate-200" />
                <span className="font-sans text-xs font-semibold text-blue-600 uppercase tracking-[0.3em]">
                  Indie Game Developer
                </span>
                <span className="h-[1px] w-8 bg-slate-200" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer marker */}
      <div className="absolute bottom-10 font-mono text-[9px] text-slate-400 uppercase tracking-widest">
        Surya Studios Engine V3.0
      </div>
    </div>
  );
}
