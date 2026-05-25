class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    // Lazy initialize so it doesn't try to load on server-side or block the thread
  }

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioCtx();
        this.enabled = true;
      } catch (e) {
        console.warn('Web Audio API not supported', e);
      }
    }
  }

  public toggle(force?: boolean) {
    this.init();
    if (force !== undefined) {
      this.enabled = force;
    } else {
      this.enabled = !this.enabled;
    }
    return this.enabled;
  }

  public isEnabled() {
    return this.enabled;
  }

  public playClick() {
    this.init();
    if (!this.enabled || !this.ctx) return;
    this.resumeCtx();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  public playSuccess() {
    this.init();
    if (!this.enabled || !this.ctx) return;
    this.resumeCtx();

    const now = this.ctx.currentTime;
    const playNote = (freq: number, start: number, duration: number) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + duration + 0.02);
    };

    // Uplifting arpeggio (C major / pentatonic style)
    playNote(523.25, now, 0.1); // C5
    playNote(659.25, now + 0.08, 0.1); // E5
    playNote(783.99, now + 0.16, 0.12); // G5
    playNote(1046.50, now + 0.24, 0.3); // C6
  }

  public playError() {
    this.init();
    if (!this.enabled || !this.ctx) return;
    this.resumeCtx();

    const now = this.ctx.currentTime;
    const playNote = (freq: number, start: number, duration: number) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, start);
      osc.frequency.linearRampToValueAtTime(freq - 60, start + duration);

      gain.gain.setValueAtTime(0.1, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + duration + 0.02);
    };

    playNote(220, now, 0.15); // A3
    playNote(165, now + 0.12, 0.35); // E3
  }

  public playLevelUp() {
    this.init();
    if (!this.enabled || !this.ctx) return;
    this.resumeCtx();

    const now = this.ctx.currentTime;
    const playNote = (freq: number, start: number, duration: number) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.15, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + duration + 0.02);
    };

    // Ascending major scale chord
    playNote(392.00, now, 0.15); // G4
    playNote(523.25, now + 0.1, 0.15); // C5
    playNote(659.25, now + 0.2, 0.15); // E5
    playNote(783.99, now + 0.3, 0.15); // G5
    playNote(1046.50, now + 0.4, 0.5); // C6
  }

  private resumeCtx() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
}

export const soundManager = new SoundManager();
