import React, { useState, useEffect } from 'react';
import {
  Film,
  Compass,
  Volume2,
  VolumeX,
  Play,
  Layers,
  ChevronDown,
  Monitor,
} from 'lucide-react';
import { ambientAudio } from '../../utils/ambientAudio';

interface CinematicHUDProps {
  isPinned3D: boolean;
  onTogglePinned3D: () => void;
  isCinemaBarsActive: boolean;
  onToggleCinemaBars: () => void;
}

interface Chapter {
  id: string;
  act: string;
  title: string;
  targetId: string;
  range: [number, number];
}

const CHAPTERS: Chapter[] = [
  { id: 'c1', act: 'ACT I', title: 'The Haute Unveiling', targetId: 'hero', range: [0, 0.18] },
  { id: 'c2', act: 'ACT II', title: 'Hearth Sear Anatomy', targetId: 'story', range: [0.18, 0.40] },
  { id: 'c3', act: 'ACT III', title: 'Degustation Journey', targetId: 'tasting-menu', range: [0.40, 0.65] },
  { id: 'c4', act: 'ACT IV', title: 'Sommelier Grand Crus', targetId: 'cellar', range: [0.65, 0.85] },
  { id: 'c5', act: 'ACT V', title: 'VIP Table Sanctuary', targetId: 'reservations', range: [0.85, 1.0] },
];

export const CinematicHUD: React.FC<CinematicHUDProps> = ({
  isPinned3D,
  onTogglePinned3D,
  isCinemaBarsActive,
  onToggleCinemaBars,
}) => {
  const [scrollRatio, setScrollRatio] = useState<number>(0);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;
      setScrollRatio(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute simulated video timecode (total 5 min cinematic reel)
  const totalSeconds = 300;
  const currentSec = Math.floor(scrollRatio * totalSeconds);
  const minutes = Math.floor(currentSec / 60);
  const seconds = currentSec % 60;
  const frames = Math.floor((scrollRatio * totalSeconds * 24) % 24);
  const formattedTimecode = `00:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;

  const currentChapter = CHAPTERS.find(
    (c) => scrollRatio >= c.range[0] && scrollRatio <= c.range[1]
  ) || CHAPTERS[0];

  const handleJumpToChapter = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const active = ambientAudio.toggle();
    setIsAudioOn(active);
  };

  return (
    <>
      {/* 21:9 Anamorphic Cinema Letterbox Bars */}
      {isCinemaBarsActive && (
        <>
          <div className="fixed top-0 left-0 right-0 h-10 lg:h-14 bg-black z-50 pointer-events-none transition-all duration-500 flex items-center justify-between px-6 border-b border-white/5">
            <span className="text-[10px] font-mono tracking-widest text-amber-500/80 uppercase">
              MAISON L'AMBRE · CINEMATIC 2.39:1 PRESENTATION
            </span>
            <span className="text-[10px] font-mono text-stone-500">
              4K 60FPS · COLOR GRADE: ARRI ALEXA WARM HEARTH
            </span>
          </div>
          <div className="fixed bottom-0 left-0 right-0 h-10 lg:h-14 bg-black z-50 pointer-events-none transition-all duration-500 border-t border-white/5" />
        </>
      )}

      {/* Floating Scrollytelling Director Bar at Bottom Center */}
      <aside 
        aria-label="Cinematic HUD Controls"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[92%] sm:w-auto transition-all duration-300"
      >
        <div className="bg-[#171714]/90 backdrop-blur-xl border border-white/15 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Live Reel Indicator & Timecode */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-950/60 border border-red-500/30 text-red-400 font-mono text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span>LIVE</span>
            </div>
            <div className="font-mono text-xs text-amber-300 tracking-wider font-semibold tabular-nums">
              {formattedTimecode}
            </div>
          </div>

          {/* Chapter Indicators & Progress Bar */}
          <div className="hidden md:flex items-center gap-2">
            {CHAPTERS.map((chapter) => {
              const isActive = chapter.id === currentChapter.id;
              return (
                <button
                  key={chapter.id}
                  onClick={() => handleJumpToChapter(chapter.targetId)}
                  className={`group relative px-2.5 py-1 rounded-lg text-[11px] font-serif transition-all ${
                    isActive
                      ? 'bg-white/15 text-white font-bold border border-[#E96A24]/40 shadow-xs'
                      : 'text-stone-400 hover:text-white hover:bg-white/5'
                  }`}
                  title={`Jump to ${chapter.act}: ${chapter.title}`}
                >
                  <span className="text-[9px] font-mono block text-[#E96A24] font-semibold leading-none">
                    {chapter.act}
                  </span>
                  <span>{chapter.title}</span>
                </button>
              );
            })}
          </div>

          {/* Action Shortcuts */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Audio Hearth Sound Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-xl transition-all ${
                isAudioOn
                  ? 'bg-[#E96A24] text-white shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-white/10'
              }`}
              title={isAudioOn ? 'Mute Hearth Audio' : 'Play Hearth Ambiance'}
              aria-label="Toggle Hearth Sound"
            >
              {isAudioOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Cinema 21:9 Letterbox Bars Toggle */}
            <button
              onClick={onToggleCinemaBars}
              className={`p-2 rounded-xl transition-all ${
                isCinemaBarsActive
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-white/10'
              }`}
              title="Toggle 21:9 Anamorphic Cinema Mode"
              aria-label="Toggle Cinema Bars"
            >
              <Film className="w-3.5 h-3.5" />
            </button>

            {/* 3D Global Floating Canvas Toggle */}
            <button
              onClick={onTogglePinned3D}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isPinned3D
                  ? 'bg-[#E96A24] text-white shadow-md'
                  : 'bg-white/10 text-stone-300 hover:text-white hover:bg-white/20'
              }`}
              title="Toggle Persistent 3D Background Backdrop"
              aria-label="Toggle 3D Backdrop"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isPinned3D ? '3D Backdrop Active' : '3D Backdrop'}</span>
            </button>
          </div>

        </div>

        {/* Smooth Linear Progress Bar across HUD */}
        <div className="w-full bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#E96A24] via-amber-400 to-[#E96A24] transition-all duration-150"
            style={{ width: `${scrollRatio * 100}%` }}
          />
        </div>
      </aside>
    </>
  );
};
