import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  Sparkles,
  Music,
  Sliders,
  Check,
  X
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { getQualityVideoUrl, VideoQuality } from '../utils/videoUrl';

interface CustomVideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  client?: string;
  aspectRatio?: '16:9' | '9:16';
  autoPlay?: boolean;
  onClose?: () => void;
}

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  src,
  poster,
  title,
  client,
  aspectRatio = '16:9',
  autoPlay = true,
  onClose,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [buffered, setBuffered] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);
  const [quality, setQuality] = useState<VideoQuality>('1080p');
  const [showQualityMenu, setShowQualityMenu] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showUnmuteNotice, setShowUnmuteNotice] = useState<boolean>(false);

  // Smooth scrubbing & hover preview state
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [hoverPosition, setHoverPosition] = useState<{ pos: number; time: number } | null>(null);

  const is916 = aspectRatio === '9:16';
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active transformed video stream based on user-selected quality
  const activeVideoSrc = getQualityVideoUrl(src, quality);

  // Format seconds to MM:SS
  const formatTime = (timeInSec: number): string => {
    if (isNaN(timeInSec) || timeInSec < 0) return '0:00';
    const minutes = Math.floor(timeInSec / 60);
    const seconds = Math.floor(timeInSec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Start playing audio/music on load
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 1;
    video.muted = false;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          setShowUnmuteNotice(false);
        })
        .catch(() => {
          // If browser policy restricts unmuted autoplay before direct touch
          video.muted = true;
          setIsMuted(true);
          setShowUnmuteNotice(true);
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    }
  }, [src]);

  // Autohide controls logic
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying && !isScrubbing) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setShowSpeedMenu(false);
      }, 3000);
    }
  };

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    soundEngine.playPop();
    if (!videoRef.current) return;
    
    // Ensure sound is active on user click
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.volume = 1;
      setVolume(1);
      setShowUnmuteNotice(false);
    }

    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Unmute with sound
  const unmuteSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    videoRef.current.volume = 1;
    setIsMuted(false);
    setVolume(1);
    setShowUnmuteNotice(false);
    soundEngine.playChime();
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    setShowUnmuteNotice(false);
    if (!nextMuted) {
      const newVol = volume === 0 ? 1 : volume;
      setVolume(newVol);
      videoRef.current.volume = newVol;
    }
  };

  // Change Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setShowUnmuteNotice(false);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  // Calculate position & time from clientX
  const calculatePosFromClientX = useCallback((clientX: number) => {
    if (!progressRef.current || duration <= 0) return { pos: 0, time: 0 };
    const rect = progressRef.current.getBoundingClientRect();
    const rawPos = (clientX - rect.left) / rect.width;
    const clampedPos = Math.max(0, Math.min(1, rawPos));
    return { pos: clampedPos, time: clampedPos * duration };
  }, [duration]);

  // Seek to position
  const seekToClientX = useCallback((clientX: number) => {
    if (!videoRef.current || duration <= 0) return;
    const { time } = calculatePosFromClientX(clientX);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  }, [duration, calculatePosFromClientX]);

  // Mouse seek handlers
  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsScrubbing(true);
    seekToClientX(e.clientX);
    const { pos, time } = calculatePosFromClientX(e.clientX);
    setHoverPosition({ pos, time });
  };

  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { pos, time } = calculatePosFromClientX(e.clientX);
    setHoverPosition({ pos, time });
  };

  const handleProgressMouseLeave = () => {
    if (!isScrubbing) {
      setHoverPosition(null);
    }
  };

  // Touch seek handler
  const handleTouchSeek = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches.length > 0) {
      seekToClientX(e.touches[0].clientX);
    }
  };

  // Global drag listener for scrubbing
  useEffect(() => {
    if (!isScrubbing) return;

    const onGlobalMouseMove = (e: MouseEvent) => {
      seekToClientX(e.clientX);
      const { pos, time } = calculatePosFromClientX(e.clientX);
      setHoverPosition({ pos, time });
    };

    const onGlobalMouseUp = () => {
      setIsScrubbing(false);
      setHoverPosition(null);
    };

    window.addEventListener('mousemove', onGlobalMouseMove);
    window.addEventListener('mouseup', onGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', onGlobalMouseMove);
      window.removeEventListener('mouseup', onGlobalMouseUp);
    };
  }, [isScrubbing, seekToClientX, calculatePosFromClientX]);

  // Skip Forward / Backward
  const skipTime = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
  };

  // Change Playback Speed
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
    soundEngine.playClick();
  };

  // Change Video Resolution / Quality (lower resolution feature as requested)
  const handleQualityChange = (newQuality: VideoQuality) => {
    soundEngine.playPop();
    if (newQuality === quality) {
      setShowQualityMenu(false);
      return;
    }
    const video = videoRef.current;
    const prevTime = video ? video.currentTime : 0;
    const wasPlaying = video ? !video.paused : true;

    setQuality(newQuality);
    setShowQualityMenu(false);
    setIsLoading(true);

    // Restore currentTime and resume playback smoothly once new quality stream loads
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = prevTime;
        if (wasPlaying) {
          videoRef.current.play().catch(() => {});
        }
      }
    }, 150);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
          document.body.classList.add('cinema-modal-active');
        }).catch(() => {
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Listen to Fullscreen changes
  useEffect(() => {
    const onFullscreenChange = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      if (active) {
        document.body.classList.add('cinema-modal-active');
      }
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Time and buffer updater
  const handleTimeUpdate = () => {
    if (!videoRef.current || isScrubbing) return;
    setCurrentTime(videoRef.current.currentTime);
    if (videoRef.current.buffered.length > 0) {
      const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      setBuffered(duration > 0 ? (bufferedEnd / duration) * 100 : 0);
    }
  };

  // Keyboard Shortcuts for Pro Player
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        skipTime(5);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        skipTime(-5);
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          toggleFullscreen();
        } else if (onClose) {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, onClose, isFullscreen]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (isPlaying && !isScrubbing) setShowControls(false);
      }}
      onContextMenu={(e) => e.preventDefault()}
      className={`relative select-none group flex items-center justify-center transition-all ${
        isFullscreen
          ? 'fixed inset-0 w-screen h-screen max-w-none max-h-none rounded-none border-0 z-[9999] bg-black overflow-hidden'
          : is916
          ? 'w-full max-w-[360px] sm:max-w-[420px] 2xl:max-w-[460px] max-h-[78dvh] aspect-[9/16] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#0d100e]'
          : 'w-full max-w-5xl max-h-[82dvh] aspect-video mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#0d100e]'
      }`}
    >
      {/* High-Performance Hardware Accelerated Video Element */}
      <video
        ref={videoRef}
        src={activeVideoSrc}
        poster={poster}
        playsInline
        preload="metadata"
        autoPlay={autoPlay}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate nofullscreen"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          setIsLoading(false);
        }}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => {
          setIsLoading(false);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
        className={`w-full h-full cursor-pointer transition-all ${
          isFullscreen
            ? 'object-contain'
            : is916
            ? 'object-cover sm:object-contain'
            : 'object-contain'
        }`}
      />

      {/* Fullscreen Top Navigation Bar */}
      {isFullscreen && (
        <div
          className={`absolute top-0 inset-x-0 z-30 px-5 py-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between transition-opacity duration-300 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm sm:text-base drop-shadow-md">
              {title}
            </span>
            {client && (
              <span className="text-xs text-[#7ae7f9] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                {client}
              </span>
            )}
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all cursor-pointer shadow-lg"
            title="Exit Fullscreen (Esc / F)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Brand Watermark Badge (only in normal mode) */}
      {!isFullscreen && (
        <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-white/90 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#7ae7f9]" />
          <span>Creative Vibe</span>
        </div>
      )}

      {/* Tap to Unmute / Play Music Banner */}
      {showUnmuteNotice && isPlaying && (
        <button
          onClick={unmuteSound}
          className="absolute top-4 right-4 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#537568] hover:bg-[#415e53] text-white text-xs font-bold shadow-lg border border-white/20 animate-bounce cursor-pointer"
        >
          <Music className="w-3.5 h-3.5" />
          <span>Tap for Video Music & Sound</span>
        </button>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-12 h-12 rounded-full border-3 border-white/20 border-t-[#537568] animate-spin" />
        </div>
      )}

      {/* Big Center Play/Pause Flash Button */}
      {!isPlaying && !isLoading && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#537568] hover:bg-[#415e53] text-white flex items-center justify-center shadow-2xl transform scale-100 hover:scale-110 transition-all cursor-pointer z-20 border border-white/20"
          aria-label="Play video"
        >
          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
        </button>
      )}

      {/* Custom Sleek Controls Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 z-30 transition-opacity duration-300 ${
          isFullscreen
            ? 'p-4 sm:p-6 pb-6 sm:pb-8 bg-gradient-to-t from-black/95 via-black/80 to-transparent'
            : 'p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/75 to-transparent'
        } ${
          showControls || !isPlaying || isScrubbing ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Bar Container with Hover Timestamp Tooltip */}
        <div
          ref={progressRef}
          onMouseDown={handleProgressMouseDown}
          onMouseMove={handleProgressMouseMove}
          onMouseLeave={handleProgressMouseLeave}
          onTouchStart={handleTouchSeek}
          onTouchMove={handleTouchSeek}
          className="relative w-full py-2.5 cursor-pointer group/progress flex items-center select-none"
        >
          {/* Floating Time Hover Tooltip */}
          {hoverPosition && (
            <div
              className="absolute -top-7 transform -translate-x-1/2 px-2.5 py-0.5 rounded-md bg-black/90 border border-white/25 text-white text-[11px] font-mono pointer-events-none z-50 shadow-xl whitespace-nowrap"
              style={{ left: `${hoverPosition.pos * 100}%` }}
            >
              {formatTime(hoverPosition.time)}
            </div>
          )}

          {/* Progress Track Background */}
          <div className="relative w-full h-1.5 group-hover/progress:h-2.5 rounded-full bg-white/20 overflow-hidden transition-all">
            {/* Buffered track */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-white/35 transition-all"
              style={{ width: `${buffered}%` }}
            />
            {/* Played track */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#537568] via-[#6ba08e] to-[#7ae7f9]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Scrubber thumb */}
          <div
            className={`absolute w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white rounded-full shadow-lg border border-black/20 transform -translate-x-1/2 transition-opacity pointer-events-none z-10 ${
              isScrubbing ? 'opacity-100 scale-110' : 'opacity-0 group-hover/progress:opacity-100'
            }`}
            style={{ left: `${progressPercent}%` }}
          />
        </div>

        {/* Lower Row Controls */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 text-white mt-1">
          
          {/* Left Actions: Play/Pause, Rewind, FastForward, Volume, Time */}
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 shrink">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-lg hover:bg-white/15 text-white transition-colors cursor-pointer shrink-0"
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            >
              {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />}
            </button>

            {/* Rewind & Fast Forward (Only shown for 16:9 on sm+ screens to preserve space on 9:16) */}
            {!is916 && (
              <>
                <button
                  onClick={() => skipTime(-5)}
                  className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer hidden md:flex items-center shrink-0"
                  title="Rewind 5s (Left Arrow)"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => skipTime(5)}
                  className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer hidden md:flex items-center shrink-0"
                  title="Fast Forward 5s (Right Arrow)"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Volume */}
            <div className="flex items-center gap-0.5 sm:gap-1 group/vol shrink-0">
              <button
                onClick={toggleMute}
                className="p-1.5 rounded-lg hover:bg-white/15 text-white transition-colors cursor-pointer"
                title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#7ae7f9]" />
                )}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className={`${is916 ? 'w-10' : 'w-14 sm:w-20'} h-1 accent-[#537568] bg-white/30 rounded-lg cursor-pointer hidden group-hover/vol:inline-block transition-all`}
              />
            </div>

            {/* Time Stamp with Current, Total & Remaining */}
            <div className="text-[10px] sm:text-xs font-mono text-white/90 flex items-center gap-0.5 shrink min-w-0">
              <span className="font-semibold text-white whitespace-nowrap">{formatTime(currentTime)}</span>
              <span className="text-white/40">/</span>
              <span className="text-white/70 whitespace-nowrap">{formatTime(duration)}</span>
              {!is916 && duration > 0 && (
                <span className="text-white/50 text-[10px] ml-1 hidden lg:inline whitespace-nowrap">
                  (-{formatTime(Math.max(0, duration - currentTime))})
                </span>
              )}
            </div>
          </div>

          {/* Right Actions: Quality/Resolution Selector, Speed Selector, Fullscreen (STRICTLY shrink-0 so never hidden) */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            
            {/* Resolution / Quality Selector */}
            <div className="relative shrink-0">
              <button
                onClick={() => {
                  setShowQualityMenu(!showQualityMenu);
                  setShowSpeedMenu(false);
                }}
                className="px-1.5 sm:px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[10px] sm:text-xs font-bold text-white transition-colors cursor-pointer flex items-center gap-1 border border-white/10 shrink-0"
                title="Change Resolution"
              >
                <Sliders className="w-3 h-3 text-[#7ae7f9]" />
                <span>{quality}</span>
              </button>

              {showQualityMenu && (
                <div className="absolute bottom-9 right-0 bg-[#161a18] border border-white/20 rounded-xl shadow-2xl p-1.5 flex flex-col gap-1 min-w-[130px] z-40">
                  <div className="text-[10px] text-white/50 px-2 py-0.5 uppercase tracking-wider font-bold border-b border-white/10 flex items-center justify-between">
                    <span>Quality</span>
                    <span className="text-[9px] text-[#7ae7f9] font-normal">CPU Eco</span>
                  </div>
                  {(['1080p', '720p', '480p', '360p'] as VideoQuality[]).map((q) => (
                    <button
                      key={q}
                      onClick={() => handleQualityChange(q)}
                      className={`px-2.5 py-1 text-xs rounded-lg text-left font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                        quality === q
                          ? 'bg-[#537568] text-white'
                          : 'text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {quality === q && <Check className="w-3 h-3 text-[#7ae7f9]" />}
                        {q}
                      </span>
                      {q === '1080p' && <span className="text-[9px] text-[#7ae7f9]">Master</span>}
                      {q === '720p' && <span className="text-[9px] text-white/50">Fast</span>}
                      {q === '480p' && <span className="text-[9px] text-amber-300">Lite</span>}
                      {q === '360p' && <span className="text-[9px] text-emerald-400">Low CPU</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Speed Selector */}
            <div className="relative shrink-0">
              <button
                onClick={() => {
                  setShowSpeedMenu(!showSpeedMenu);
                  setShowQualityMenu(false);
                }}
                className="px-1.5 sm:px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[10px] sm:text-xs font-bold text-white transition-colors cursor-pointer flex items-center gap-0.5 shrink-0"
                title="Playback Speed"
              >
                <span>{playbackSpeed}x</span>
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-9 right-0 bg-[#161a18] border border-white/20 rounded-xl shadow-2xl p-1.5 flex flex-col gap-1 min-w-[75px] z-40">
                  {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => handleSpeedChange(spd)}
                      className={`px-2.5 py-1 text-xs rounded-lg text-left font-semibold transition-colors cursor-pointer ${
                        playbackSpeed === spd
                          ? 'bg-[#537568] text-white'
                          : 'text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg hover:bg-white/15 text-white transition-colors cursor-pointer shrink-0"
              title={isFullscreen ? 'Exit Fullscreen (F / Esc)' : 'Fullscreen (F)'}
            >
              {isFullscreen ? <Minimize className="w-4 h-4 sm:w-5 sm:h-5 text-[#7ae7f9]" /> : <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
