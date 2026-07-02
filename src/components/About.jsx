import React, { useState } from 'react';
import { audio } from '../utils/audio';
import { FaUser, FaSlidersH, FaGamepad } from 'react-icons/fa';

export default function About() {
  const [activeTab, setActiveTab] = useState('profile');

  const handleHover = () => {
    audio.playHover();
  };

  const handleTabChange = (tab) => {
    audio.playClick();
    setActiveTab(tab);
  };

  const specializations = [
    { name: 'Gameplay Programming', value: 92 },
    { name: 'Horror AI & Mechanics', value: 88 },
    { name: '3D Art & Level Design', value: 80 },
    { name: 'Mobile Performance Tuning', value: 85 }
  ];

  return (
    <section className="py-20 max-w-6xl w-full mx-auto px-6 text-slate-800">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            About Me
          </h2>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mt-1">
            Background & Design Philosophy
          </p>
        </div>
        <div className="h-[1px] flex-1 bg-slate-200 hidden md:block max-w-md" />
      </div>

      {/* Main Container Card: Light Glassmorphism layout */}
      <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-100/50 overflow-hidden flex flex-col lg:flex-row relative">
        <div className="absolute inset-0 cyber-dots-light opacity-30 pointer-events-none" />

        {/* Left Profile Avatar Area */}
        <div className="w-full lg:w-1/3 bg-slate-50/50 p-8 flex flex-col items-center border-b lg:border-b-0 lg:border-r border-slate-200/60 text-center relative z-10">
          
          {/* Avatar Image Frame */}
          <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl border border-slate-200 p-2 mb-6 bg-white shadow-sm group">
            <div className="w-full h-full bg-blue-50/30 rounded-xl overflow-hidden flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent z-0" />
              <img 
                src="/surya_avatar.jpg" 
                alt="Surya Profile Avatar" 
                className="w-full h-full object-cover rounded-lg relative z-10 opacity-95 group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {/* Fallback Icon */}
              <span className="text-5xl text-blue-400 absolute select-none z-5">🎮</span>
            </div>
          </div>

          <h3 className="font-heading text-xl font-bold text-slate-900 mb-1">Surya</h3>
          <p className="font-sans text-xs font-bold text-blue-600 tracking-wider uppercase mb-6">
            Indie Game Developer
          </p>
          
          {/* Status badge */}
          <div className="w-full py-2.5 px-4 bg-white border border-slate-200 rounded-xl font-mono text-[11px] text-slate-500 mb-6 flex justify-between shadow-sm">
            <span>Status</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Level 25
            </span>
          </div>

          {/* Subtabs Menu */}
          <div className="flex flex-col gap-2 w-full">
            {[
              { id: 'profile', label: 'Biography', icon: <FaUser /> },
              { id: 'specs', label: 'Specializations', icon: <FaSlidersH /> },
              { id: 'philosophy', label: 'Core Philosophy', icon: <FaGamepad /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onMouseEnter={handleHover}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full py-2.5 px-4 rounded-xl border text-left font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white border-slate-200/80 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Sheet */}
        <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center min-h-[350px]">
          
          {/* PROFILE VIEW */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fade-in-up">
              <h4 className="font-heading text-xs font-extrabold text-blue-600 tracking-wider uppercase">
                Biography
              </h4>
              <p className="font-sans text-xl text-slate-800 leading-relaxed font-light">
                Passionate indie game developer who enjoys creating unique gameplay mechanics, horror games, mobile games, and immersive experiences.
              </p>
              <p className="font-sans text-sm text-slate-500 leading-relaxed max-w-2xl">
                I specialize in bringing interactive gameplay parameters to life. From terror-inducing microphone thresholds that dictate AI behaviors, to cozy ocean cleaning simulators, I design experiences that players remember.
              </p>
              
              <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl flex gap-4 items-center">
                <div className="text-3xl text-blue-500 select-none">💡</div>
                <div className="space-y-0.5">
                  <h5 className="font-heading text-xs font-bold text-slate-800 uppercase tracking-wider">Design Focus</h5>
                  <p className="font-sans text-xs text-slate-500">Combining smooth mechanics with atmospheric, immersive visual art.</p>
                </div>
              </div>
            </div>
          )}

          {/* SPECIALIZATIONS VIEW */}
          {activeTab === 'specs' && (
            <div className="space-y-6 animate-fade-in-up">
              <h4 className="font-heading text-xs font-extrabold text-blue-600 tracking-wider uppercase">
                Technical Focus
              </h4>
              
              <div className="space-y-5">
                {specializations.map((spec) => (
                  <div key={spec.name} className="space-y-2">
                    <div className="flex justify-between font-sans text-xs font-bold text-slate-700">
                      <span>{spec.name}</span>
                      <span className="text-blue-600">{spec.value}%</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${spec.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PHILOSOPHY VIEW */}
          {activeTab === 'philosophy' && (
            <div className="space-y-6 animate-fade-in-up">
              <h4 className="font-heading text-xs font-extrabold text-blue-600 tracking-wider uppercase">
                Core Design Pillars
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Player First', desc: 'Prioritizing responsive controllers, zero input lag, and intuitive UI layout feedback.' },
                  { title: 'Atmosphere Engine', desc: 'Crafting premium shadows, soft sound effects, and lighting parameters to invoke emotion.' },
                  { title: 'Unique Anchors', desc: 'Developing specialized features (like microphone interfaces) that distinguish the gameplay.' },
                  { title: 'Highly Optimized', desc: 'Ensuring seamless frame pacing, draw-call optimization, and low-latency code execution.' }
                ].map((pillar) => (
                  <div key={pillar.title} className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <h5 className="font-heading text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      {pillar.title}
                    </h5>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
