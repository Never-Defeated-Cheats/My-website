// Web Audio API Procedural Sound Engine (Zero external network requests & 0% idle CPU)

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private initialized: boolean = false;

  constructor() {
    try {
      this.isMuted = localStorage.getItem('CREATIVE_VIBE_MUTED') === 'true';
    } catch {
      this.isMuted = false;
    }
  }

  private init() {
    if (this.initialized) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
        this.initialized = true;
      }
    } catch {
      // AudioContext unavailable
    }
  }

  private ensureContext() {
    if (!this.initialized) {
      this.init();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('CREATIVE_VIBE_MUTED', this.isMuted ? 'true' : 'false');
    } catch {
      // localStorage fallback
    }
    if (!this.isMuted) {
      this.playChime();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Soft subtle click
  public playClick() {
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
    } catch {
      // Ignore audio error
    }
  }

  // Smooth pop on tab change / filter select
  public playPop() {
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
    } catch {
      // Ignore audio error
    }
  }

  // Subtle hover tick on video cards
  public playHover() {
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
    } catch {
      // Ignore audio error
    }
  }

  // Whoosh on modal open
  public playWhoosh() {
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
    } catch {
      // Ignore audio error
    }
  }

  // Chime on success / appointment confirmation
  public playChime() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + index * 0.06);

        const startTime = this.audioCtx.currentTime + index * 0.06;
        gain.gain.setValueAtTime(0.035, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch {
      // Ignore audio error
    }
  }
}

export const soundEngine = new SoundEngine();
