import React from 'react';
import { audio } from '../utils/audio';
import { FaGamepad, FaCubes, FaCodeBranch, FaPalette, FaMobileAlt, FaCode, FaMusic } from 'react-icons/fa';
import { SiUnity, SiBlender } from 'react-icons/si';
import { DiPhotoshop } from 'react-icons/di';

export default function Skills() {
  const handleHover = () => {
    audio.playHover();
  };

  const skillList = [
    { 
      name: 'Unity', 
      desc: 'Primary weapon for game creation. Deep knowledge of component architectures, physics simulations, and graphics rendering pipelines.', 
      icon: <SiUnity className="text-3xl text-blue-600" /> 
    },
    { 
      name: 'C#', 
      desc: 'Clean, object-oriented script compilation. Expertise in state machines, event systems, and asynchronous processes in Unity.', 
      icon: <FaCode className="text-3xl text-blue-600" /> 
    },
    { 
      name: 'Blender', 
      desc: 'Modeling unique low-poly game assets, environmental structures, UV mapping, and exporting optimized mesh coordinates.', 
      icon: <SiBlender className="text-3xl text-blue-600" /> 
    },
    { 
      name: 'Photoshop', 
      desc: 'UI element drawing, texture mapping adjustment, digital art touchups, and visual branding assets for marketing.', 
      icon: <DiPhotoshop className="text-3xl text-blue-600" /> 
    },
    { 
      name: 'Game Design', 
      desc: 'Developing engaging game loops, systems balancing, feedback anchors, and interactive mechanics that players remember.', 
      icon: <FaGamepad className="text-3xl text-blue-600" /> 
    },
    { 
      name: 'Level Design', 
      desc: 'Architecting environments that guide players naturally, balancing lighting and visual blockades to create pacing.', 
      icon: <FaCubes className="text-3xl text-blue-600" /> 
    },
    { 
      name: 'UI Design', 
      desc: 'Designing clean, interactive, and responsive game hud parameters and menus that ensure intuitive player interaction.', 
      icon: <FaPalette className="text-3xl text-blue-600" /> 
    },
    { 
      name: 'Audio Editing', 
      desc: 'Configuring audio frequencies, ambient loops, and procedural sounds to drive deep immersion and environmental tension.', 
      icon: <FaMusic className="text-3xl text-blue-600" /> 
    },
    { 
      name: 'Git & GitHub', 
      desc: 'Safeguarding code bases with robust version checkpoints, branching models, and clean deployment integrations.', 
      icon: <FaCodeBranch className="text-3xl text-blue-600" /> 
    },
    { 
      name: 'Mobile Optimization', 
      desc: 'Optimizing draw calls, managing memory limits, compressing textures, and tuning inputs for fluid 60 FPS mobile builds.', 
      icon: <FaMobileAlt className="text-3xl text-blue-600" /> 
    }
  ];

  return (
    <section className="py-20 max-w-6xl w-full mx-auto px-6 text-slate-800">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Skills & Expertise
          </h2>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mt-1">
            My Developer Toolbox
          </p>
        </div>
        <div className="h-[1px] flex-1 bg-slate-200 hidden md:block max-w-md" />
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillList.map((skill) => (
          <div
            key={skill.name}
            onMouseEnter={handleHover}
            className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 hover:border-blue-600/30 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 ease-out flex flex-col gap-4 relative overflow-hidden"
          >
            {/* Top Icon Block */}
            <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100/30 w-fit group-hover:scale-105 transition-transform duration-300">
              {skill.icon}
            </div>

            {/* Content Info */}
            <div className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-slate-900 tracking-wide">
                {skill.name}
              </h3>
              <p className="font-sans text-xs text-slate-500 leading-relaxed">
                {skill.desc}
              </p>
            </div>

            {/* Glowing bottom line indicator on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </div>
        ))}
      </div>
    </section>
  );
}
