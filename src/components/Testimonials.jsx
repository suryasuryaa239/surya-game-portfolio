import React from 'react';
import { audio } from '../utils/audio';
import { FaQuoteLeft, FaUserCheck, FaGamepad, FaLaptopCode } from 'react-icons/fa';

export default function Testimonials() {
  const handleHover = () => {
    audio.playHover();
  };

  const feedbacks = [
    {
      name: 'Elena Rostova',
      role: 'Creative Director at FrostByte Games',
      type: 'Client',
      text: 'Surya delivered the mobile build of our simulation title two weeks early, maintaining a locked 60 FPS on older phones. Excellent C# programming logic and attention to mobile parameters.',
      icon: <FaUserCheck className="text-blue-500" />
    },
    {
      name: 'Alex Mercer',
      role: 'Beta Tester & Core Gamer',
      type: 'Player',
      text: "Ghost Whisper's microphone mechanics are absolutely terrifying. Screaming at the ghost actually causes it to chase you down. It's the most immersive horror mechanic I've played this year!",
      icon: <FaGamepad className="text-blue-500" />
    },
    {
      name: 'Rohan Sharma',
      role: 'Senior Unity Developer',
      type: 'Friend',
      text: "Surya's code architecture is incredibly clean. From decoupled event triggers to custom shaders, working together on game projects is always smooth and well-structured.",
      icon: <FaLaptopCode className="text-blue-500" />
    }
  ];

  return (
    <section className="py-20 max-w-6xl w-full mx-auto px-6 text-slate-800">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Testimonials
          </h2>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mt-1">
            What People Say
          </p>
        </div>
        <div className="h-[1px] flex-1 bg-slate-200 hidden md:block max-w-md" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {feedbacks.map((item, idx) => (
          <div
            key={idx}
            onMouseEnter={handleHover}
            className="group relative p-6 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-2xl hover:border-blue-600/30 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Quote Icon */}
              <div className="flex justify-between items-center">
                <FaQuoteLeft className="text-slate-200 text-2xl group-hover:text-blue-100 transition-colors" />
                <span className="px-2.5 py-0.5 bg-blue-50 border border-blue-100 rounded-full text-[9px] font-bold text-blue-600 uppercase tracking-wider">
                  {item.type}
                </span>
              </div>
              
              <p className="font-sans text-xs text-slate-500 leading-relaxed italic">
                "{item.text}"
              </p>
            </div>

            {/* Client Bio Footer */}
            <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-slate-100">
              <div className="p-2.5 bg-blue-50/50 rounded-xl border border-blue-100/30">
                {item.icon}
              </div>
              <div>
                <h4 className="font-heading text-xs font-bold text-slate-900">
                  {item.name}
                </h4>
                <p className="font-sans text-[10px] text-slate-400">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
