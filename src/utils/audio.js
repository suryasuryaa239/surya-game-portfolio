class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Start muted to comply with browser autoplay policies
    this.ambientHum = null;
  }

  init() {
    if (this.ctx) return;
    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
    } catch (e) {
      console.warn("Web Audio API not supported in this browser");
    }
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMute(muted) {
    this.isMuted = muted;
    if (muted) {
      this.stopHum();
    } else {
      this.resume();
      this.startHum();
    }
  }

  playHover() {
    this.resume();
    if (this.isMuted || !this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    
    // Quick pitch sweep up for futuristic beep
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  playClick() {
    this.resume();
    if (this.isMuted || !this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'triangle';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(1600, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  playUnlock() {
    this.resume();
    if (this.isMuted || !this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, now + idx * 0.08);

      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      gain.gain.setValueAtTime(0.0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.5);
    });
  }

  playBoot() {
    this.resume();
    if (this.isMuted || !this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Low rumble sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sawtooth';
    filter.type = 'lowpass';
    filter.Q.setValueAtTime(5, now);
    
    osc.frequency.setValueAtTime(40, now);
    osc.frequency.linearRampToValueAtTime(150, now + 1.8);
    
    filter.frequency.setValueAtTime(100, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + 1.8);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    osc.start(now);
    osc.stop(now + 1.9);

    // Boot chime chime
    setTimeout(() => {
      this.playUnlock();
    }, 1200);
  }

  playError() {
    this.resume();
    if (this.isMuted || !this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sawtooth';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.25);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  playKeypress() {
    this.resume();
    if (this.isMuted || !this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    const now = this.ctx.currentTime;

    // Slight variance in pitch for terminal typing feel
    const randomFreq = 400 + Math.random() * 200;
    osc.frequency.setValueAtTime(randomFreq, now);

    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  startHum() {
    this.resume();
    if (this.isMuted || !this.ctx || this.ambientHum) return;

    try {
      const now = this.ctx.currentTime;
      
      // We will create two low oscillators to generate a nice beat hum
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(60, now); // 60Hz power grid hum

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(60.5, now); // slightly detuned

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, now);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 2.0); // slow fade in

      osc1.start(now);
      osc2.start(now);

      this.ambientHum = {
        osc1,
        osc2,
        gain,
        stop: () => {
          const stopTime = this.ctx.currentTime;
          try {
            gain.gain.setValueAtTime(gain.gain.value, stopTime);
            gain.gain.linearRampToValueAtTime(0, stopTime + 0.5);
            osc1.stop(stopTime + 0.6);
            osc2.stop(stopTime + 0.6);
          } catch(e) {}
        }
      };
    } catch (e) {
      console.warn("Failed to start ambient hum:", e);
    }
  }

  stopHum() {
    if (this.ambientHum) {
      this.ambientHum.stop();
      this.ambientHum = null;
    }
  }
}

export const audio = new AudioEngine();
