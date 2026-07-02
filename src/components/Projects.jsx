import React, { useState, useEffect, useRef } from 'react';
import { audio } from '../utils/audio';
import { FaPlay, FaVideo, FaGithub, FaLock, FaMicrophone, FaMicrophoneSlash, FaInfoCircle } from 'react-icons/fa';

export default function Projects({ onTriggerAchievement }) {
  const [activeProject, setActiveProject] = useState(0);
  
  // Microphone test state for Ghost Whisper
  const [micActive, setMicActive] = useState(false);
  const [ghostAggression, setGhostAggression] = useState(0);
  const [ghostStatus, setGhostStatus] = useState("DORMANT");
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Ocean Cleaner mini-game state
  const [trashCleared, setTrashCleared] = useState(0);
  const maxTrash = 5;

  const handleHover = () => {
    audio.playHover();
  };

  const handleClick = () => {
    audio.playClick();
  };

  // Ghost Whisper microphone listening loop
  useEffect(() => {
    if (!micActive) {
      cleanupMic();
      return;
    }

    const startMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContextClass();
        audioContextRef.current = audioCtx;

        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;

        // Draw and analyze
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const draw = () => {
          if (!analyserRef.current) return;
          animationFrameRef.current = requestAnimationFrame(draw);

          analyserRef.current.getByteFrequencyData(dataArray);

          // Calculate average volume level
          let total = 0;
          for (let i = 0; i < bufferLength; i++) {
            total += dataArray[i];
          }
          const average = total / bufferLength;

          // Convert volume to aggression value (0 to 100)
          const level = Math.min(100, Math.floor((average / 110) * 100));
          setGhostAggression(level);

          // Update status based on noise
          if (level > 40) {
            setGhostStatus("AGGRESSIVE (SCREAM DETECTED!)");
            if (level > 75 && onTriggerAchievement) {
              onTriggerAchievement("Scream Detector");
            }
          } else if (level > 10) {
            setGhostStatus("ALERTED (INVESTIGATING...)");
          } else {
            setGhostStatus("SEARCHING (SILENCE CONFUSING GHOST...)");
          }

          // Draw clean blue/purple waveform visualizer
          ctx.fillStyle = 'rgba(248, 250, 252, 0.4)'; // light slate background
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const barWidth = (canvas.width / bufferLength) * 2.5;
          let barHeight;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2.2;

            let color = 'rgba(37, 99, 235, 0.85)'; // primary blue
            if (level > 40) {
              color = 'rgba(239, 68, 68, 0.95)'; // aggressive red
            } else if (i % 2 === 0) {
              color = 'rgba(96, 165, 250, 0.85)'; // light blue
            }

            ctx.fillStyle = color;
            ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);

            x += barWidth;
          }
        };

        draw();

      } catch (err) {
        console.error("Error accessing microphone:", err);
        setMicActive(false);
        setGhostStatus("MIC ACCESS DENIED");
      }
    };

    startMic();

    return () => cleanupMic();
  }, [micActive]);

  const cleanupMic = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    analyserRef.current = null;
    setGhostAggression(0);
    setGhostStatus("DORMANT");
  };

  const toggleMic = () => {
    audio.playClick();
    setMicActive(!micActive);
  };

  const handleOceanClick = () => {
    if (trashCleared < maxTrash) {
      audio.playKeypress();
      setTrashCleared(prev => prev + 1);
      if (trashCleared + 1 === maxTrash && onTriggerAchievement) {
        onTriggerAchievement("Ocean Savior");
      }
    }
  };

  const resetOcean = () => {
    audio.playClick();
    setTrashCleared(0);
  };

  return (
    <section className="py-20 max-w-6xl w-full mx-auto px-6 text-slate-800">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Featured Projects
          </h2>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mt-1">
            Featured Interactive Log
          </p>
        </div>
        <div className="h-[1px] flex-1 bg-slate-200 hidden md:block max-w-md" />
      </div>

      {/* Navigation tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-12 border-b border-slate-200/60 pb-6">
        {[
          { label: 'Ghost Whisper', sub: 'Horror Thriller' },
          { label: 'Ocean Cleaner', sub: 'Relaxing Simulation' },
          { label: 'Coming Soon', sub: 'Classified Project' }
        ].map((proj, idx) => (
          <button
            key={proj.label}
            onMouseEnter={handleHover}
            onClick={() => { handleClick(); setActiveProject(idx); }}
            className={`flex-1 min-w-[150px] max-w-[200px] py-3.5 px-4 rounded-xl border text-center font-sans uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeProject === idx
                ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10'
                : 'bg-white border-slate-200/80 text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <div className="text-xs font-bold">{proj.label}</div>
            <div className={`text-[9px] tracking-normal mt-0.5 normal-case ${activeProject === idx ? 'text-blue-100' : 'text-slate-400'}`}>
              {proj.sub}
            </div>
          </button>
        ))}
      </div>

      {/* Project Cards Display */}
      <div className="w-full">
        {/* Project 1: Ghost Whisper */}
        {activeProject === 0 && (
          <div className="bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 md:p-10 flex flex-col lg:flex-row gap-8 shadow-lg shadow-slate-100/50 animate-fade-in-up">
            
            {/* Visual Column */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              
              {/* Graphic Banner */}
              <div className="relative w-full h-[240px] md:h-[300px] rounded-xl overflow-hidden border border-slate-200 bg-slate-950 flex items-center justify-center group shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10" />
                <span className="text-6xl z-0 filter drop-shadow-md select-none group-hover:scale-110 transition-transform duration-500">👻</span>
                
                {/* Spooky warning overlay */}
                <div className="absolute top-4 left-4 font-mono text-[9px] text-red-600 bg-white/95 px-2.5 py-1 rounded-full border border-red-200 uppercase tracking-widest font-bold z-20 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                  <span>MIC_CORE: READY</span>
                </div>
              </div>

              {/* LIVE MIC INTERACTIVE SANDBOX */}
              <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col gap-3.5 shadow-inner">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    <span className="font-heading text-xs font-bold uppercase tracking-wider text-slate-800">
                      Mic Mechanics Sandbox
                    </span>
                  </div>
                  <button
                    onClick={toggleMic}
                    className={`py-1.5 px-4 rounded-lg text-[10px] font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border transition-all duration-300 ${
                      micActive
                        ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                        : 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/10'
                    }`}
                  >
                    {micActive ? (
                      <>
                        <FaMicrophoneSlash />
                        <span>Stop Test</span>
                      </>
                    ) : (
                      <>
                        <FaMicrophone />
                        <span>Test Mic Mechanics</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="font-sans text-xs text-slate-500 leading-normal">
                  Toggle the microphone tester and make sound or a scream into your mic to observe real-time ghost AI parameter adjustments.
                </p>

                {/* Canvas Waveform */}
                <div className="w-full h-16 bg-slate-100 rounded-lg border border-slate-200 relative overflow-hidden">
                  <canvas ref={canvasRef} className="w-full h-full block" width="500" height="64" />
                  {!micActive && (
                    <div className="absolute inset-0 flex items-center justify-center font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50">
                      Decibel Tester: Off
                    </div>
                  )}
                </div>

                {/* Ghost Status Indicator */}
                {micActive && (
                  <div className={`p-3 rounded-lg font-mono text-[10px] border flex flex-col sm:flex-row sm:justify-between items-center gap-2 uppercase tracking-wide transition-all duration-300 ${
                    ghostAggression > 40
                      ? 'bg-red-50 border-red-200 text-red-700 font-bold animate-pulse'
                      : ghostAggression > 10
                      ? 'bg-amber-50 border-amber-200 text-amber-700 font-semibold'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold'
                  }`}>
                    <div>GHOST AGGRESSION LEVEL: {ghostAggression}%</div>
                    <div>STATUS: {ghostStatus}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Description Column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    Ghost Whisper
                  </h3>
                  <p className="font-sans text-xs font-bold text-blue-600 uppercase tracking-wider mt-1">
                    Microphone Horror Game // Survival mechanics
                  </p>
                </div>

                <div className="space-y-4 font-sans text-sm text-slate-500 leading-relaxed">
                  <p>
                    A horror game where the ghosts react to the player's real microphone input. Utilizing custom audio amplitude mapping in Unity, ghosts listen for environmental noise to track player coordinate points.
                  </p>
                  <p className="font-bold text-slate-800">
                    Core Mechanics:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>If the player screams, the ghost gains a speed boost and attacks the source location.</li>
                    <li>If the player stays silent, the ghost becomes confused, halts its track, and resumes search scripts.</li>
                  </ul>
                </div>

                {/* Tech Badges */}
                <div className="space-y-2">
                  <span className="font-sans text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Technologies Used:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Unity 3D', 'C# Code', 'Audio Context API', 'WebGL Decibel Filters', 'Blender Art Suite'].map(t => (
                      <span key={t} className="px-3 py-1 bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-slate-200/60">
                <button
                  onMouseEnter={handleHover}
                  onClick={handleClick}
                  className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-bold rounded-lg uppercase tracking-wide cursor-pointer transition-all duration-300 flex items-center gap-2 shadow-sm shadow-blue-500/10"
                >
                  <FaPlay className="text-[10px]" />
                  <span>Play Demo</span>
                </button>
                <button
                  onMouseEnter={handleHover}
                  onClick={handleClick}
                  className="py-2.5 px-6 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-sans text-xs font-bold rounded-lg uppercase tracking-wide cursor-pointer transition-all duration-300 flex items-center gap-2"
                >
                  <FaVideo className="text-[10px]" />
                  <span>Watch Trailer</span>
                </button>
                <button
                  onMouseEnter={handleHover}
                  onClick={handleClick}
                  className="p-3 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-800 border border-slate-200 rounded-lg cursor-pointer transition-all duration-300 shadow-sm"
                  title="View GitHub Repository"
                >
                  <FaGithub className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Project 2: Ocean Cleaner */}
        {activeProject === 1 && (
          <div className="bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 md:p-10 flex flex-col lg:flex-row gap-8 shadow-lg shadow-slate-100/50 animate-fade-in-up">
            
            {/* Visual Column */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              
              {/* Graphic Banner */}
              <div className="relative w-full h-[240px] md:h-[300px] rounded-xl overflow-hidden border border-slate-200 bg-sky-900 flex items-center justify-center group shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-sky-950/70 via-transparent to-transparent z-10" />
                <span className="text-6xl z-0 filter drop-shadow-md select-none group-hover:scale-110 transition-transform duration-500">🐠</span>
                
                <div className="absolute top-4 left-4 font-mono text-[9px] text-teal-600 bg-white/95 px-2.5 py-1 rounded-full border border-teal-200 uppercase tracking-widest font-bold z-20">
                  SYSTEM: COSY_REEF_OK
                </div>
              </div>

              {/* MINI GAME INTERACTIVE SANDBOX */}
              <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col gap-3.5 shadow-inner">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    <span className="font-heading text-xs font-bold uppercase tracking-wider text-slate-800">
                      Reef Cleanup Mini-Game
                    </span>
                  </div>
                  {trashCleared === maxTrash && (
                    <button
                      onClick={resetOcean}
                      className="py-1 px-3 bg-white border border-slate-200 rounded-lg text-[9px] font-sans font-bold uppercase tracking-wider text-blue-600 hover:bg-slate-50 cursor-pointer shadow-sm"
                    >
                      Reset Sim
                    </button>
                  )}
                </div>

                <p className="font-sans text-xs text-slate-500">
                  {trashCleared < maxTrash 
                    ? `Remove ocean debris below to help restoration scripts! Cleaned sectors: ${trashCleared}/${maxTrash}` 
                    : "Reef Cleanliness: 100%. Coral ecosystems stabilized successfully!"}
                </p>

                {/* Ocean simulated floor */}
                <div className="w-full h-24 bg-gradient-to-b from-sky-50 to-blue-100/60 rounded-xl border border-slate-200/80 relative overflow-hidden flex items-center justify-center gap-4">
                  {trashCleared < maxTrash ? (
                    Array.from({ length: maxTrash - trashCleared }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={handleOceanClick}
                        className="w-10 h-10 bg-white hover:bg-red-50 text-base border border-slate-200 hover:border-red-200 text-rose-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-md animate-bounce"
                        title="Click to clear plastic"
                        style={{ animationDelay: `${idx * 0.15}s` }}
                      >
                        🗑️
                      </button>
                    ))
                  ) : (
                    <div className="flex flex-col items-center gap-0.5 animate-pulse text-center">
                      <div className="text-3xl select-none">🐬</div>
                      <span className="font-heading text-[9px] text-teal-600 font-extrabold uppercase tracking-widest">
                        Reef Secured!
                      </span>
                    </div>
                  )}
                </div>

                {/* Cleanliness progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[9px] text-slate-400">
                    <span>Ecosystem Recovery Index</span>
                    <span className="text-teal-600 font-bold">{(trashCleared / maxTrash) * 100}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 border border-slate-300/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-300"
                      style={{ width: `${(trashCleared / maxTrash) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description Column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    Ocean Cleaner
                  </h3>
                  <p className="font-sans text-xs font-bold text-blue-600 uppercase tracking-wider mt-1">
                    Relaxing underwater simulator // Cozy Mobile game
                  </p>
                </div>

                <div className="space-y-4 font-sans text-sm text-slate-500 leading-relaxed">
                  <p>
                    A relaxing underwater simulation game designed to spread ecological awareness. Players control a robotic cleaner drone to sweep ocean floors, rescue trapped marine life, and unlock cosmetic gear.
                  </p>
                  <p className="font-bold text-slate-800">
                    Key Features:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Dynamic ecosystems: Reef colors and wildlife indicators grow as cleanliness ratings increase.</li>
                    <li>Drone modifiers: Unlock battery expansions, light beam scanners, and suction speed triggers.</li>
                    <li>Responsive viewport controls optimized for mobile touch parameters.</li>
                  </ul>
                </div>

                {/* Tech Badges */}
                <div className="space-y-2">
                  <span className="font-sans text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Technologies Used:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Unity Editor', 'C# Scripting', 'Mobile Touch Handlers', 'UI Canvas', 'Vector Texture Kits'].map(t => (
                      <span key={t} className="px-3 py-1 bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-slate-200/60">
                <button
                  onMouseEnter={handleHover}
                  onClick={handleClick}
                  className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-bold rounded-lg uppercase tracking-wide cursor-pointer transition-all duration-300 flex items-center gap-2 shadow-sm shadow-blue-500/10"
                >
                  <FaPlay className="text-[10px]" />
                  <span>Play Demo</span>
                </button>
                <button
                  onMouseEnter={handleHover}
                  onClick={handleClick}
                  className="py-2.5 px-6 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-sans text-xs font-bold rounded-lg uppercase tracking-wide cursor-pointer transition-all duration-300 flex items-center gap-2"
                >
                  <FaVideo className="text-[10px]" />
                  <span>Watch Trailer</span>
                </button>
                <button
                  onMouseEnter={handleHover}
                  onClick={handleClick}
                  className="p-3 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-800 border border-slate-200 rounded-lg cursor-pointer transition-all duration-300 shadow-sm"
                  title="View GitHub Repository"
                >
                  <FaGithub className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Project 3: Coming Soon */}
        {activeProject === 2 && (
          <div className="bg-slate-50/50 backdrop-blur-md rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center text-center min-h-[420px] relative border border-dashed border-slate-300 overflow-hidden animate-fade-in-up">
            <div className="absolute inset-0 cyber-grid-light opacity-30 pointer-events-none" />
            
            <div className="relative z-10 max-w-sm space-y-6">
              {/* Lock icon container */}
              <div className="w-16 h-16 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm mx-auto">
                <FaLock className="text-xl" />
              </div>

              <div className="space-y-1">
                <h3 className="font-heading text-xl font-extrabold text-slate-900 uppercase tracking-wider">
                  Project Classified
                </h3>
                <p className="font-sans text-xs font-bold text-blue-600 uppercase tracking-widest">
                  // Database Encrypted //
                </p>
              </div>

              <p className="font-sans text-sm text-slate-500 leading-relaxed">
                This project represents a third-person cyber-thriller game built using next-gen mechanics. Database content will be unlocked upon project reveal.
              </p>

              <button
                onMouseEnter={handleHover}
                onClick={() => {
                  audio.playError();
                  if (onTriggerAchievement) onTriggerAchievement("Codebreaker");
                }}
                className="py-2.5 px-6 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-sans text-xs font-bold rounded-lg uppercase tracking-wide cursor-pointer transition-all duration-300 shadow-sm"
              >
                Attempt Decryption
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
