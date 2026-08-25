/* ==========================================================================
   CREATIVE VIBE - WEB AUDIO API SOUND SYSTEM
   Procedural, zero-dependency, gentle sound effects
   ========================================================================== */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = localStorage.getItem('CREATIVE_VIBE_MUTED') === 'true';
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
        this.initialized = true;
      }
    } catch (e) {
      console.warn('Web Audio API not supported or blocked by browser', e);
    }
  }

  ensureContext() {
    if (!this.initialized) {
      this.init();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('CREATIVE_VIBE_MUTED', this.isMuted ? 'true' : 'false');
    this.updateToggleUI();
    if (!this.isMuted) {
      this.playChime();
    }
    return this.isMuted;
  }

  updateToggleUI() {
    const btn = document.getElementById('soundToggleBtn');
    if (btn) {
      if (this.isMuted) {
        btn.classList.add('muted');
        const text = btn.querySelector('.sound-btn-text');
        if (text) text.textContent = 'Muted';
      } else {
        btn.classList.remove('muted');
        const text = btn.querySelector('.sound-btn-text');
        if (text) text.textContent = 'Sound ON';
      }
    }
  }

  // Gentle Soft Click (Subtle UI feedback)
  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {}
  }

  // Gentle Pop (Tab switch or Category select)
  playPop() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(620, this.audioCtx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.035, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.06);
    } catch (e) {}
  }

  // Hover tick (Very subtle micro-tick on video cards)
  playHover() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.015, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, this.audioCtx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.02);
    } catch (e) {}
  }

  // Whoosh / Modal Open
  playWhoosh() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, this.audioCtx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.03, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.12);
    } catch (e) {}
  }

  // Chime / Success
  playChime() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + index * 0.06);

        const startTime = this.audioCtx.currentTime + index * 0.06;
        gain.gain.setValueAtTime(0.04, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch (e) {}
  }
}

window.soundFX = new SoundEngine();

// First user interaction unblocks AudioContext
document.addEventListener('click', () => {
  window.soundFX.ensureContext();
}, { once: true });
