/**
 * Lightweight Web Audio API synthesizer for luxury hearth ambiance
 * (warm crackling embers and subtle acoustic dining hall hum)
 */

class AmbientAudioManager {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private noiseNode: AudioNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private crackleTimer: number | null = null;

  public init() {
    if (this.audioCtx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      this.audioCtx = new AudioContextClass();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.init();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    // Master volume gain
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
    this.gainNode.connect(this.audioCtx.destination);

    // Warm low-pass filter
    this.filterNode = this.audioCtx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(450, this.audioCtx.currentTime);
    this.filterNode.connect(this.gainNode);

    // Pink / Brown noise buffer for warm hearth bed
    const bufferSize = this.audioCtx.sampleRate * 2;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.08;
    }

    const whiteNoise = this.audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    whiteNoise.connect(this.filterNode);
    whiteNoise.start();
    this.noiseNode = whiteNoise;

    // Realistic hearth fire crackle generator
    this.scheduleCrackles();
    this.isPlaying = true;
  }

  private scheduleCrackles() {
    if (!this.audioCtx || !this.gainNode) return;

    const createCrackle = () => {
      if (!this.audioCtx || !this.gainNode || !this.isPlaying) return;

      const osc = this.audioCtx.createOscillator();
      const oscGain = this.audioCtx.createGain();
      
      const freq = 1200 + Math.random() * 2400;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      const crackleGain = 0.04 + Math.random() * 0.07;
      oscGain.gain.setValueAtTime(crackleGain, this.audioCtx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.04);

      osc.connect(oscGain);
      oscGain.connect(this.gainNode);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.05);

      const nextInterval = 80 + Math.random() * 450;
      this.crackleTimer = window.setTimeout(createCrackle, nextInterval);
    };

    createCrackle();
  }

  public stop() {
    this.isPlaying = false;
    if (this.crackleTimer) {
      clearTimeout(this.crackleTimer);
      this.crackleTimer = null;
    }
    if (this.noiseNode) {
      try {
        (this.noiseNode as AudioScheduledSourceNode).stop();
      } catch {
        // already stopped
      }
      this.noiseNode = null;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const ambientAudio = new AmbientAudioManager();
