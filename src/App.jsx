import React, { useState, useEffect } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';
import Achievements, { AchievementToast, ACHIEVEMENT_LIST } from './components/Achievements';
import Testimonials from './components/Testimonials';
import ContactTerminal from './components/ContactTerminal';
import Footer from './components/Footer';
import { audio } from './utils/audio';
import { FaVolumeUp, FaVolumeMute, FaAward } from 'react-icons/fa';

export default function App() {
  const [appState, setAppState] = useState('loading'); // 'loading' | 'portfolio'
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [activeToast, setActiveToast] = useState(null);
  const [muted, setMuted] = useState(true); // Default to muted in modern professional style

  // Trigger achievement helper
  const triggerAchievement = (id) => {
    if (unlockedAchievements.includes(id)) return;
    
    const found = ACHIEVEMENT_LIST.find(a => a.id === id);
    if (found) {
      setUnlockedAchievements(prev => [...prev, id]);
      setActiveToast(found);
    }
  };

  // Scroll section into view
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle mute
  const toggleMute = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    audio.setMute(nextMute);
    audio.playClick();
  };

  return (
    <div className="min-h-screen bg-white relative selection:bg-blue-600/10 selection:text-blue-600 text-slate-900 font-sans">
      {/* Background canvas grid & particles */}
      <BackgroundCanvas />

      {/* RENDER ACTIVE SCREEN STATE */}
      {appState === 'loading' && (
        <LoadingScreen onComplete={() => {
          setAppState('portfolio');
          triggerAchievement('Launch Completed');
        }} />
      )}

      {appState === 'portfolio' && (
        <div className="relative z-10 flex flex-col min-h-screen scroll-smooth">
          
          {/* STICKY BLUR NAVBAR */}
          <header className="sticky top-0 z-30 w-full bg-white/85 border-b border-slate-200/50 backdrop-blur-md px-6 py-4 transition-all duration-300">
            <div className="max-w-6xl w-full mx-auto flex justify-between items-center">
              
              {/* Brand Logo */}
              <button 
                onClick={() => scrollToSection('hero')}
                className="flex items-center gap-2 cursor-pointer font-heading text-lg font-black tracking-widest text-slate-900 hover:text-blue-600 transition-colors uppercase"
              >
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                <span>SURYA</span>
              </button>

              {/* Navigation Menu Links */}
              <nav className="hidden lg:flex items-center gap-8 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                {[
                  { label: 'Home', id: 'hero' },
                  { label: 'About', id: 'about' },
                  { label: 'Skills', id: 'skills' },
                  { label: 'Projects', id: 'projects' },
                  { label: 'Gallery', id: 'gallery' },
                  { label: 'Experience', id: 'timeline' },
                  { label: 'Contact', id: 'contact' }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { audio.playClick(); scrollToSection(item.id); }}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Right Side HUD Widgets */}
              <div className="flex items-center gap-4">
                
                {/* Trophies pill counter */}
                <button
                  onClick={() => { audio.playClick(); scrollToSection('achievements'); }}
                  className="px-3 py-1.5 bg-blue-50 border border-blue-100 hover:border-blue-300 text-[10px] font-mono font-bold text-blue-600 rounded-full uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all duration-300"
                  title="Unlocked trophies counter"
                >
                  <FaAward className="text-sm text-blue-500" />
                  <span>TROPHIES:</span>
                  <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                    {unlockedAchievements.length}/6
                  </span>
                </button>

                {/* Sound Toggle */}
                <button
                  onClick={toggleMute}
                  className="p-2 border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50 rounded-full cursor-pointer text-slate-400 hover:text-blue-600 transition-all duration-300"
                  title={muted ? "Unmute ambient audio synth" : "Mute ambient audio synth"}
                >
                  {muted ? (
                    <FaVolumeMute className="text-sm text-slate-400" />
                  ) : (
                    <FaVolumeUp className="text-sm text-blue-600 animate-pulse" />
                  )}
                </button>
              </div>

            </div>
          </header>

          {/* PORTFOLIO CONTENT SECTIONS */}
          <main className="flex-1 flex flex-col items-center">
            
            <div id="hero" className="w-full">
              <Hero onExploreClick={() => scrollToSection('projects')} />
            </div>

            <div id="about" className="w-full relative py-8 bg-slate-50/50">
              <div className="absolute inset-0 cyber-grid-light opacity-60 pointer-events-none" />
              <About />
            </div>

            <div id="skills" className="w-full relative bg-white">
              <Skills />
            </div>

            <div id="projects" className="w-full relative bg-slate-50/50 py-8">
              <div className="absolute inset-0 cyber-dots-light opacity-60 pointer-events-none" />
              <Projects onTriggerAchievement={triggerAchievement} />
            </div>

            <div id="gallery" className="w-full relative bg-white">
              <Gallery />
            </div>

            <div id="timeline" className="w-full relative bg-slate-50/30">
              <Timeline />
            </div>

            <div id="achievements" className="w-full relative bg-white">
              <Achievements unlockedList={unlockedAchievements} />
            </div>

            <div id="testimonials" className="w-full relative bg-slate-50/50 py-8">
              <Testimonials />
            </div>

            <div id="contact" className="w-full relative bg-white">
              <ContactTerminal onTriggerAchievement={triggerAchievement} />
            </div>

          </main>

          {/* FOOTER */}
          <Footer />

        </div>
      )}

      {/* FLOATING TOAST POPUP ACHIEVEMENTS */}
      {activeToast && (
        <AchievementToast 
          achievement={activeToast} 
          onClose={() => setActiveToast(null)} 
        />
      )}
    </div>
  );
}
