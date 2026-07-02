import React, { useState, useEffect, useRef } from 'react';
import { audio } from '../utils/audio';
import { FaTerminal, FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaCheckCircle } from 'react-icons/fa';

export default function ContactTerminal({ onTriggerAchievement }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [typingIndex, setTypingIndex] = useState(0);
  const terminalLogsContainerRef = useRef(null);

  const logsToType = [
    "Initializing Secure Tunnel...",
    "Connecting to mail.suryastudios.com:443...",
    "Connection OK! SSL Certificate active.",
    "DIRECT COORDINATES UNLOCKED:",
    "  - Email: suryasiva637480@gmail.com",
    "  - GitHub: github.com/suryasuryaa239",
    "  - LinkedIn: linkedin.com/in/surya-a",
    "  - Instagram: instagram.com/_._zurya_._",
    "Type command 'ping -t suryastudios' to monitor connection...",
    "Ping latency: 14ms. Ready for user packets."
  ];

  // Auto Scroll Terminal Logs
  useEffect(() => {
    if (terminalLogsContainerRef.current) {
      terminalLogsContainerRef.current.scrollTo({
        top: terminalLogsContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [terminalLogs]);

  // Handle typing simulation
  useEffect(() => {
    if (typingIndex >= logsToType.length) return;

    const timer = setTimeout(() => {
      setTerminalLogs(prev => [...prev, logsToType[typingIndex]]);
      setTypingIndex(idx => idx + 1);
      audio.playKeypress();
    }, 800 + Math.random() * 400);

    return () => clearTimeout(timer);
  }, [typingIndex]);

  const handleHover = () => {
    audio.playHover();
  };

  const handleClick = () => {
    audio.playClick();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    audio.playUnlock();

    // Format WhatsApp pre-filled message text
    const messageText = `Hi Surya!%0A%0AMy name is: ${encodeURIComponent(formData.name)}%0AMy Email is: ${encodeURIComponent(formData.email)}%0A%0AMessage:%0A${encodeURIComponent(formData.message)}`;
    const whatsappUrl = `https://wa.me/916374889944?text=${messageText}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    setFormSubmitted(true);
    setTerminalLogs(prev => [
      ...prev,
      `[MESSAGE INCOMING] packet from client: ${formData.name}`,
      `[REDIRECT] Redirecting contact payload directly to WhatsApp terminal...`,
      `[SUCCESS] Message successfully packaged and opened in WhatsApp!`
    ]);

    if (onTriggerAchievement) {
      onTriggerAchievement("Dossier Submitted");
    }
  };

  const handleTerminalFocus = () => {
    audio.playClick();
    if (onTriggerAchievement) {
      onTriggerAchievement("Terminal Operator");
    }
  };

  return (
    <section className="py-20 max-w-6xl w-full mx-auto px-6 text-slate-800">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Contact Me
          </h2>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mt-1">
            Establish Connection Link
          </p>
        </div>
        <div className="h-[1px] flex-1 bg-slate-200 hidden md:block max-w-md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Modern Professional Form */}
        <div className="lg:col-span-7 bg-white/70 backdrop-blur-md border border-slate-200/60 p-6 md:p-8 rounded-2xl shadow-sm flex flex-col justify-between">
          {!formSubmitted ? (
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                Send a Message
              </h3>
              
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all duration-300 shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@company.com"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all duration-300 shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Message / Details
                </label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your game project idea, job inquiry, or opportunity..."
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all duration-300 resize-none shadow-inner"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={handleHover}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold rounded-xl text-sm tracking-wide transition-all duration-300 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer text-center"
              >
                Send Message Link
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 animate-scale-up h-full">
              <FaCheckCircle className="text-5xl text-emerald-500" />
              <div className="space-y-1">
                <h3 className="font-heading text-xl font-bold text-slate-900">Message Transmitted!</h3>
                <p className="font-sans text-sm text-slate-500">Thanks for reaching out, Surya will get back to you shortly.</p>
              </div>
              <button
                onClick={() => setFormSubmitted(false)}
                className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold cursor-pointer transition-colors mt-2"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Sleek modern developer terminal console */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between h-[400px] text-blue-400 font-mono text-xs md:text-sm select-text">
          
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-900 mb-3 select-none">
            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-2">
              <FaTerminal />
              <span>TERMINAL // surya_dossier</span>
            </span>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            </div>
          </div>

          {/* Logs Terminal Area */}
          <div 
            ref={terminalLogsContainerRef}
            onClick={handleTerminalFocus}
            className="flex-1 overflow-y-auto pr-2 space-y-2 cursor-text"
          >
            {terminalLogs.map((log, idx) => {
              let isLink = log.includes(" - ");
              let colorClass = "text-slate-300";
              
              if (log.includes("[SUCCESS]")) colorClass = "text-emerald-400";
              else if (log.includes("[MESSAGE INCOMING]")) colorClass = "text-amber-400";
              else if (log.includes("DIRECT COORDINATES")) colorClass = "text-blue-500 font-bold";
              else if (log.includes("Connecting") || log.includes("Initializing")) colorClass = "text-slate-500";

              if (isLink) {
                // Generate standard anchor tags inside terminal log
                const parts = log.split(": ");
                const label = parts[0].trim();
                const linkVal = parts[1].trim();
                let href = "https://" + linkVal;
                if (label.includes("Email")) href = "mailto:" + linkVal;

                return (
                  <div key={idx} className="flex">
                    <span className="text-slate-500 mr-1">&gt;</span>
                    <span className="text-blue-400 font-bold mr-1.5">{label}:</span>
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={handleClick}
                      className="text-white hover:text-blue-400 hover:underline transition-colors"
                    >
                      {linkVal}
                    </a>
                  </div>
                );
              }

              return (
                <div key={idx} className={colorClass}>
                  <span className="text-slate-500 mr-2">&gt;</span>
                  {log}
                </div>
              );
            })}
          </div>

          {/* Bottom Prompt Link */}
          <div className="flex border-t border-slate-900 pt-3 mt-3 items-center select-none text-[11px] text-slate-500">
            <span>SECURE_CONNECTION // PORT_443 // LATENCY_14ms</span>
          </div>

        </div>

      </div>
    </section>
  );
}
