import React, { useState } from 'react';
import { audio } from '../utils/audio';
import { FaEye, FaTimes } from 'react-icons/fa';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const handleHover = () => {
    audio.playHover();
  };

  const handleClick = (img) => {
    audio.playClick();
    setSelectedImage(img);
  };

  const handleClose = () => {
    audio.playClick();
    setSelectedImage(null);
  };

  const galleryItems = [
    { 
      id: 1, 
      category: 'Gameplay', 
      title: 'Decibel Capture Logic', 
      desc: 'Active microphone decibel detection nodes in Unity mapping user noise levels directly to AI navmesh agent speeds.',
      color: 'from-blue-50 to-blue-100'
    },
    { 
      id: 2, 
      category: 'Characters', 
      title: 'Spooky Spirit Model', 
      desc: 'High-fidelity skeletal rig of a spectral apparition, designed in Blender with custom floating cloth physics.',
      color: 'from-sky-50 to-indigo-100'
    },
    { 
      id: 3, 
      category: 'Environment', 
      title: 'Asylum Hallway Lighting', 
      desc: 'Volumetric fog corridor layout displaying low-res baked lightmap maps and glowing warning lamps.',
      color: 'from-blue-50 to-slate-100'
    },
    { 
      id: 4, 
      category: 'UI', 
      title: 'Cosy Marine Dashboard', 
      desc: 'Vector icon HUD maps showing clean cleanliness indexes, upgrade paths, and item counts for mobile screen dimensions.',
      color: 'from-cyan-50 to-blue-100'
    },
    { 
      id: 5, 
      category: 'Concept Art', 
      title: 'Ocean Deep Ecosystems', 
      desc: 'Visual illustration details highlighting underwater refraction layers, bubble particle streams, and glowing corals.',
      color: 'from-teal-50 to-blue-100'
    },
    { 
      id: 6, 
      category: 'Gameplay', 
      title: 'Reef Cleanup Mechanics', 
      desc: 'Physics trigger coordinates allowing custom vacuum suction to separate plastic mesh groups from active sea flora.',
      color: 'from-blue-50 to-emerald-100'
    }
  ];

  const categories = ['All', 'Gameplay', 'Characters', 'Environment', 'UI', 'Concept Art'];

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section className="py-20 max-w-6xl w-full mx-auto px-6 text-slate-800">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Media Gallery
          </h2>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mt-1">
            Game Visuals & Concepts
          </p>
        </div>
        <div className="h-[1px] flex-1 bg-slate-200 hidden md:block max-w-md" />
      </div>

      {/* Filter Menu */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { audio.playClick(); setActiveFilter(cat); }}
            className={`py-1.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeFilter === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-850'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((img) => (
          <div
            key={img.id}
            onMouseEnter={handleHover}
            onClick={() => handleClick(img)}
            className="group relative h-64 rounded-2xl overflow-hidden border border-slate-200 bg-white cursor-pointer transition-all duration-300 hover:border-blue-600/30 hover:shadow-xl hover:shadow-blue-500/5 flex items-center justify-center p-8 text-center"
          >
            {/* Visual background gradient placeholder */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${img.color} z-0 group-hover:scale-105 transition-transform duration-500`} />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

            <div className="relative z-10 space-y-2">
              <span className="inline-block px-2.5 py-0.5 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-blue-600 uppercase tracking-wider">
                {img.category}
              </span>
              <h3 className="font-heading text-sm font-extrabold text-slate-850 uppercase tracking-wide">
                {img.title}
              </h3>
              <p className="font-sans text-[10px] text-slate-400 line-clamp-2 max-w-[200px] mx-auto group-hover:opacity-100 transition-opacity duration-300">
                {img.desc}
              </p>
            </div>

            {/* Hover details overlay */}
            <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
                <FaEye className="text-xs" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal Dialog */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-slate-900/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 select-none">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200/60 p-5 rounded-2xl shadow-2xl animate-scale-up">
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-4 -right-4 w-9 h-9 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-800 border border-slate-200 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md z-30"
            >
              <FaTimes />
            </button>

            {/* Graphic Display */}
            <div className={`w-full h-[280px] md:h-[380px] rounded-xl overflow-hidden border border-slate-200 bg-gradient-to-tr ${selectedImage.color} flex items-center justify-center p-12`}>
              <span className="text-8xl select-none filter drop-shadow-sm">🎨</span>
            </div>

            {/* Description details */}
            <div className="mt-5 border-t border-slate-100 pt-4 flex justify-between items-start gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h4 className="font-heading text-lg font-bold text-slate-900">
                    {selectedImage.title}
                  </h4>
                  <span className="px-2 py-0.5 bg-blue-50 border border-blue-100 rounded-full text-[9px] font-bold text-blue-600 uppercase tracking-wider">
                    {selectedImage.category}
                  </span>
                </div>
                <p className="font-sans text-xs text-slate-500 leading-relaxed">
                  {selectedImage.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
