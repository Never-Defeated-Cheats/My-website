import React, { useRef, useState, useEffect } from 'react';
import { VideoItem } from '../types';
import { Play, Pause, Volume2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface AutoplayVideoCardProps {
  item: VideoItem;
  aspectRatio: '9:16' | '16:9';
  badgeTop?: string;
  badgeRight?: string;
  onSelect: (item: VideoItem) => void;
  className?: string;
}

export const AutoplayVideoCard: React.FC<AutoplayVideoCardProps> = ({
  item,
  aspectRatio,
  badgeTop,
  onSelect,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isInView, setIsInView] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState<boolean>(false);

  const is916 = aspectRatio === '9:16';
  const videoSrc = item.previewUrl || item.masterUrl;

  // Active state is true when user interacts with this specific card (unmutes sound)
  const isActive = isHovered || isFocused;

  // IntersectionObserver: Only fetch and stream video when visible in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (videoRef.current && !isManuallyPaused) {
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {});
              }
            }
          } else {
            setIsInView(false);
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        rootMargin: '250px 0px 250px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [isManuallyPaused]);

  // Handle Autoplay on mount & view change
  useEffect(() => {
    if (isInView && videoRef.current && !isManuallyPaused) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else if (!isInView && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isInView, isManuallyPaused]);

  // Audio unmute & volume handling when hovered or focused (only on desktop fine pointer)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isFinePointer = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches;

    if (isActive && isFinePointer) {
      video.muted = false;
      video.volume = 1;
      if (!isManuallyPaused) {
        video.play().catch(() => {});
      }
    } else {
      video.muted = true;
      if (!isManuallyPaused && isInView) {
        video.play().catch(() => {});
      }
    }
  }, [isActive, isManuallyPaused, isInView]);

  // Pause autoplaying video card when CinemaModal is active
  useEffect(() => {
    const checkModalState = () => {
      if (document.body.classList.contains('cinema-modal-active')) {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      } else if (isInView && !isManuallyPaused && videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };

    checkModalState();
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [isInView, isManuallyPaused]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsManuallyPaused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsManuallyPaused(false);
  };

  // Keyboard navigation: Spacebar toggles Play/Pause, Enter opens Cinema Modal
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      e.stopPropagation();
      soundEngine.playPop();

      if (videoRef.current) {
        if (videoRef.current.paused) {
          setIsManuallyPaused(false);
          videoRef.current.muted = false;
          videoRef.current.play().catch(() => {});
        } else {
          setIsManuallyPaused(true);
          videoRef.current.pause();
        }
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      soundEngine.playWhoosh();
      onSelect(item);
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="button"
      aria-label={`${item.title} - ${item.client || 'Showreel video'}. Press Space to toggle play/pause, Enter to open fullscreen.`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onClick={() => {
        soundEngine.playWhoosh();
        onSelect(item);
      }}
      onContextMenu={(e) => e.preventDefault()}
      className={`relative overflow-hidden bg-[#161a18] border border-[#eeece4] shadow-sm cursor-pointer group shrink-0 transition-transform duration-200 outline-none focus-visible:ring-4 focus-visible:ring-[#537568] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f5f0] focus-visible:scale-[1.03] hover:scale-[1.03] hover:border-[#537568] hover:shadow-xl ${
        is916 ? 'aspect-[9/16]' : 'aspect-video'
      } ${className}`}
    >
      {/* Fallback poster while video stream initializes */}
      <img
        src={item.poster}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isVideoLoaded && !isManuallyPaused ? 'opacity-0' : 'opacity-100'
        } group-hover:scale-105 group-focus-visible:scale-105`}
      />

      {/* Autoplaying continuous video: smooth silent loop across cards, streams on-demand when visible */}
      {isInView && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={item.poster}
          autoPlay
          muted={!isActive}
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen"
          onLoadedData={() => {
            setIsVideoLoaded(true);
            if (!isManuallyPaused && videoRef.current) {
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {});
              }
            }
          }}
          onCanPlay={() => {
            setIsVideoLoaded(true);
            if (!isManuallyPaused && videoRef.current) {
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {});
              }
            }
          }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      )}

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/35 p-3 flex flex-col justify-between pointer-events-none" />

      {/* Top Badge & Audio Status */}
      <div className="absolute top-2.5 inset-x-2.5 sm:top-3 sm:inset-x-3 flex justify-between items-center z-10 pointer-events-none">
        <span className="px-2 py-0.5 rounded-md bg-black/60 text-[9px] sm:text-[10px] font-bold text-white border border-white/10">
          {badgeTop || (is916 ? '9:16 Reel' : '16:9 Cinema')}
        </span>

        {/* Pulsing Music indicator when card is active */}
        {isActive && !isManuallyPaused && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#537568] text-white text-[10px] font-bold border border-white/20 shadow-md animate-pulse">
            <Volume2 className="w-3 h-3" />
            <span>Music Playing</span>
          </div>
        )}

        {/* Paused via keyboard indicator */}
        {isManuallyPaused && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-bold border border-white/20 shadow-md">
            <Pause className="w-3 h-3" />
            <span>Paused</span>
          </div>
        )}
      </div>

      {/* Center Play/Pause / Watch Indicator on Hover or Focus */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-200 z-10 pointer-events-none ${
        isActive || isManuallyPaused ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 text-[#537568] flex items-center justify-center shadow-lg group-hover:scale-110 group-focus-visible:scale-110 group-hover:bg-[#537568] group-hover:text-white transition-all">
          {isManuallyPaused ? (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          ) : (
            <Pause className="w-5 h-5" />
          )}
        </div>
      </div>

      {/* Bottom Metadata */}
      <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3 sm:inset-x-3 z-10 pointer-events-none">
        <div className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 drop-shadow-md">
          {item.title}
        </div>
        <div className="text-[10px] sm:text-[11px] font-semibold text-[#7ae7f9] mt-0.5 flex items-center justify-between">
          <span>{item.client ? `${item.client} • ` : ''}{item.views}</span>
          <span className="text-[9px] text-white/50 hidden group-focus-visible:inline">Press Enter to Open</span>
        </div>
      </div>
    </div>
  );
};
