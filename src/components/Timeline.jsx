import React from 'react';
import { audio } from '../utils/audio';

export default function Timeline() {
  const handleHover = () => {
    audio.playHover();
  };

  const milestones = [
    { 
      year: '2022', 
      title: 'Initiated Journey', 
      sub: 'Started Learning Game Development', 
      desc: 'Wrote first scripts in C#, experimented with character physics, and completed introductory scene design tutorials.', 
      icon: '🎬' 
    },
    { 
      year: '2023', 
      title: 'First Prototypes', 
      sub: 'Built Interactive Gameplay', 
      desc: 'Created simple 2D platformers and arcade clones. Learned rigidbodies, vector mechanics, and colliders.', 
      icon: '📦' 
    },
    { 
      year: '2024', 
      title: 'First Publications', 
      sub: 'Released First Games', 
      desc: 'Published cozy puzzle games on itch.io. Configured responsive resolution layouts for web and mobile viewports.', 
      icon: '🎯' 
    },
    { 
      year: '2025', 
      title: 'Spooky Innovations', 
      sub: 'Building Horror Games', 
      desc: 'Developed AI systems that trace real-time microphone thresholds. Leveraged decibel filters for suspenseful horror gameplay.', 
      icon: '👻' 
    },
    { 
      year: '2026+', 
      title: 'Indie Expansion', 
      sub: 'Future Studio Expansion', 
      desc: 'Scaling up projects to produce full-featured commercial games, focusing on rich narratives and advanced graphics shaders.', 
      icon: '🚀' 
    }
  ];

  return (
    <section className="py-20 max-w-4xl w-full mx-auto px-6 text-slate-800">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Roadmap Timeline
          </h2>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mt-1">
            My Professional Milestones
          </p>
        </div>
        <div className="h-[1px] flex-1 bg-slate-200 hidden md:block max-w-sm" />
      </div>

      {/* Roadmap Vertical Timeline */}
      <div className="relative border-l border-slate-200 pl-8 ml-4 sm:ml-8 space-y-12">
        {/* Glowing timeline node dot */}
        <div className="absolute top-0 bottom-0 left-[-1.5px] w-[2px] bg-gradient-to-b from-blue-600 via-blue-400 to-transparent" />

        {milestones.map((milestone, idx) => (
          <div
            key={milestone.year}
            onMouseEnter={handleHover}
            className="relative group animate-fade-in-up"
          >
            {/* Timeline node dot */}
            <div className="absolute -left-[45px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-slate-200 group-hover:border-blue-600 group-hover:shadow-md group-hover:shadow-blue-500/10 transition-all duration-300 flex items-center justify-center font-mono text-xs font-bold text-slate-500 group-hover:text-blue-600 z-10">
              {idx + 1}
            </div>

            {/* Event Card */}
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200/60 group-hover:border-blue-600/30 rounded-2xl p-6 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden">
              
              {/* Year tag */}
              <div className="inline-block px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 font-sans text-xs font-bold rounded-full uppercase tracking-wider mb-4 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors duration-300">
                {milestone.year}
              </div>

              <div className="flex gap-2.5 items-center mb-2">
                <span className="text-xl select-none">{milestone.icon}</span>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  {milestone.title}
                </h3>
              </div>
              
              <h4 className="font-sans text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                {milestone.sub}
              </h4>
              
              <p className="font-sans text-sm text-slate-500 leading-relaxed">
                {milestone.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
