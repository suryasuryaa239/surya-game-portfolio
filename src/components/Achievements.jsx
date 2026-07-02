import React, { useEffect, useState } from 'react';
import { FaLock, FaCheckCircle, FaStar, FaAward, FaCode, FaRegClock, FaDownload } from 'react-icons/fa';
import { audio } from '../utils/audio';

export const ACHIEVEMENT_LIST = [
  { id: 'Launch Completed', title: 'Launch Complete', desc: 'Initialize the portfolio core engine loader.', icon: '🚀', difficulty: 'Common' },
  { id: 'Scream Detector', title: 'Scream Detector', desc: 'Activate mic tester and trigger high aggression in Ghost Whisper sandbox.', icon: '😱', difficulty: 'Rare' },
  { id: 'Ocean Savior', title: 'Ocean Savior', desc: 'Clear all plastic debris from the coral reef simulator.', icon: '🐬', difficulty: 'Common' },
  { id: 'Codebreaker', title: 'Codebreaker', desc: 'Attempt database decryption on the classified project folder.', icon: '🔓', difficulty: 'Secret' },
  { id: 'Terminal Operator', title: 'Terminal Operator', desc: 'Click inside the contact terminal console and type a command.', icon: '💻', difficulty: 'Rare' },
  { id: 'Dossier Submitted', title: 'Dossier Submitted', desc: 'Submit a contact query/message via the form or console terminal.', icon: '📧', difficulty: 'Epic' }
];

export default function Achievements({ unlockedList = [] }) {
  const handleHover = () => {
    audio.playHover();
  };

  const unlockedCount = unlockedList.length;
  const totalCount = ACHIEVEMENT_LIST.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  // Counter states
  const [games, setGames] = useState(0);
  const [projects, setProjects] = useState(0);
  const [hours, setHours] = useState(0);
  const [downloads, setDownloads] = useState(0);

  useEffect(() => {
    // Simple incremental animations for counters
    const gInterval = setInterval(() => {
      setGames(prev => (prev < 5 ? prev + 1 : 5));
    }, 150);

    const pInterval = setInterval(() => {
      setProjects(prev => (prev < 12 ? prev + 1 : 12));
    }, 80);

    const hInterval = setInterval(() => {
      setHours(prev => (prev < 2400 ? prev + 120 : 2400));
    }, 40);

    const dInterval = setInterval(() => {
      setDownloads(prev => (prev < 15000 ? prev + 750 : 15000));
    }, 40);

    return () => {
      clearInterval(gInterval);
      clearInterval(pInterval);
      clearInterval(hInterval);
      clearInterval(dInterval);
    };
  }, []);

  const stats = [
    { label: 'Games Created', value: games, icon: <FaAward className="text-blue-600" /> },
    { label: 'Projects Completed', value: projects, icon: <FaCode className="text-blue-600" /> },
    { label: 'Hours Developed', value: `${hours.toLocaleString()}+`, icon: <FaRegClock className="text-blue-600" /> },
    { label: 'Downloads Logged', value: `${downloads.toLocaleString()}+`, icon: <FaDownload className="text-blue-600" /> }
  ];

  return (
    <section className="py-20 max-w-6xl w-full mx-auto px-6 text-slate-800">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Achievements & Metrics
          </h2>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mt-1">
            Recruiter Trophy Room
          </p>
        </div>
        <div className="h-[1px] flex-1 bg-slate-200 hidden md:block max-w-md" />
      </div>

      {/* METRICS COUNTER ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl text-center space-y-2 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white hover:border-blue-600/20 group">
            <div className="p-3 bg-blue-50/50 rounded-xl w-fit mx-auto border border-blue-100/30 group-hover:scale-105 transition-transform duration-300">
              {stat.icon}
            </div>
            <h3 className="text-2xl md:text-3xl font-heading font-black text-slate-900 tracking-tight leading-none">
              {stat.value}
            </h3>
            <p className="font-sans text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Progress Bar Header Card */}
      <div className="bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="font-heading text-lg font-bold text-slate-900">Recruiter Challenges</h3>
          <p className="font-sans text-xs text-slate-500">Explore interactive sections to unlock achievements on the site!</p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full md:w-1/2 max-w-md space-y-2">
          <div className="flex justify-between font-mono text-[10px] text-slate-500">
            <span>UNLOCKED: {unlockedCount} / {totalCount}</span>
            <span className="text-blue-600 font-bold">{percentage}% COMPLETED</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 border border-slate-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENT_LIST.map((ach) => {
          const isUnlocked = unlockedList.includes(ach.id);

          return (
            <div
              key={ach.id}
              onMouseEnter={handleHover}
              className={`p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 relative overflow-hidden ${
                isUnlocked
                  ? 'bg-blue-50/50 border-blue-200 shadow-sm shadow-blue-500/5'
                  : 'bg-slate-50 border-slate-200/60 opacity-60 hover:opacity-80'
              }`}
            >
              {/* Badge Icon Frame */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0 border relative transition-all duration-300 ${
                isUnlocked
                  ? 'bg-white border-blue-200 text-slate-800 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-400'
              }`}>
                {isUnlocked ? (
                  <span>{ach.icon}</span>
                ) : (
                  <FaLock className="text-sm text-slate-300" />
                )}
                
                {/* Check Badge Tag */}
                {isUnlocked && (
                  <span className="absolute -top-1 -right-1 text-emerald-500 bg-white rounded-full text-xs shadow-sm">
                    <FaCheckCircle />
                  </span>
                )}
              </div>

              {/* Text Description */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className={`font-heading text-sm font-bold tracking-wide ${isUnlocked ? 'text-slate-900' : 'text-slate-400'}`}>
                    {ach.title}
                  </h4>
                  <span className={`font-mono text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                    ach.difficulty === 'Epic'
                      ? 'bg-rose-50 border-rose-100 text-rose-600'
                      : ach.difficulty === 'Rare'
                      ? 'bg-purple-50 border-purple-100 text-purple-600'
                      : ach.difficulty === 'Secret'
                      ? 'bg-amber-50 border-amber-100 text-amber-600'
                      : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}>
                    {ach.difficulty}
                  </span>
                </div>
                <p className="font-sans text-xs text-slate-500 leading-normal">
                  {ach.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// MODERN NOTIFICATION TOAST
export function AchievementToast({ achievement, onClose }) {
  useEffect(() => {
    // Play unlock sound!
    audio.playUnlock();

    // Auto close after 4.5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 4500);

    return () => clearTimeout(timer);
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white border border-blue-500 rounded-2xl shadow-2xl p-4 flex items-center gap-4 animate-slide-in relative overflow-hidden select-none">
      {/* Soft radial blue gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />

      {/* Badge icon */}
      <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-2xl rounded-xl flex items-center justify-center relative shadow-sm shrink-0">
        <span>{achievement.icon}</span>
        <FaStar className="absolute top-[-3px] right-[-3px] text-amber-500 text-[10px] animate-spin" />
      </div>

      {/* Toast Text */}
      <div className="flex-1 space-y-0.5">
        <span className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-blue-600 block">
          🏆 Achievement Unlocked!
        </span>
        <h4 className="font-heading text-xs font-bold text-slate-800 uppercase tracking-wide">
          {achievement.title}
        </h4>
        <p className="font-sans text-[11px] text-slate-500 line-clamp-1 leading-none">
          {achievement.desc}
        </p>
      </div>

      {/* Close cross indicator */}
      <button 
        onClick={onClose} 
        className="text-xs text-slate-350 hover:text-slate-600 transition-colors font-bold px-1 select-none"
      >
        ✕
      </button>
    </div>
  );
}
