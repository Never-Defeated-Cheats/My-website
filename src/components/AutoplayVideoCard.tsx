import React, { useRef, useState, useEffect } from 'react';
import { VideoItem } from '../types';
import { Volume2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { getLowResAutoplayUrl } from '../utils/videoUrl';

interface AutoplayVideoCardProps {
  item: VideoItem;
  aspectRatio: '9:16' | '16:9';
  badgeTop?: string;
  badgeRight?: string;
  onSelect: (item: VideoItem) => void;
  className?: string;
  enabled?: boolean;
}

export const AutoplayVideoCard: React.FC<AutoplayVideoCardProps> = ({
  item,
  aspectRatio,
  badgeTop,
  onSelect,
  className = '',
  enabled = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isInView, setIsInView] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState<boolean>(false);

  const is916 = aspectRatio === '9:16';
  // Use low-resolution, low-bitrate stream for minimal CPU and bandwidth during silent preview
  const videoSrc = getLowResAutoplayUrl(item.previewUrl || item.masterUrl, aspectRatio);

  // Strict IntersectionObserver: Only fetch and stream video when actually visible in viewport and enabled
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && enabled && document.visibilityState !== 'hidden') {
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
        rootMargin: '20px 20px 20px 20px',
        threshold: 0.1,
      }
    );

    observer.observe(el);

    // Pause when tab becomes hidden or disabled to save CPU
    const handleVisibilityChange = () => {
      if ((document.visibilityState === 'hidden' || !enabled) && videoRef.current) {
        videoRef.current.pause();
      } else if (enabled && isInView && !isManuallyPaused && videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isInView, isManuallyPaused, enabled]);

  // Synchronize playing state with inView, isManuallyPaused, and enabled
  useEffect(() => {
    if (enabled && isInView && videoRef.current && !isManuallyPaused && document.visibilityState !== 'hidden') {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else if ((!enabled || !isInView) && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isInView, isManuallyPaused, enabled]);

  // Audio unmute & volume handling: Strictly ONLY when hovered on desktop fine pointer, 100% silent otherwise
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isFinePointer = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches;

    if (isHovered && isFinePointer && !isManuallyPaused) {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {});
    } else {
      video.muted = true;
      video.volume = 0;
      if (!isManuallyPaused && isInView) {
        video.play().catch(() => {});
      }
    }
  }, [isHovered, isManuallyPaused, isInView]);

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
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsManuallyPaused(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
    }
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
      draggable={false}
      onDragStart={(e) => {
        e.preventDefault();
        return false;
      }}
      aria-label={`${item.title} - ${item.client || 'Showreel video'}. Double click to open fullscreen.`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onDoubleClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        soundEngine.playWhoosh();
        onSelect(item);
      }}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitUserDrag: 'none' as any,
      }}
      className={`relative overflow-hidden bg-[#161a18] dark:bg-[#121614] border border-[#eeece4] dark:border-[#243029] shadow-sm cursor-pointer group shrink-0 transition-transform duration-200 outline-none focus-visible:ring-4 focus-visible:ring-[#537568] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f5f0] dark:focus-visible:ring-offset-[#0f1412] hover:scale-[1.03] hover:border-[#537568] hover:shadow-xl select-none ${
        is916 ? 'aspect-[9/16]' : 'aspect-video'
      } ${className}`}
    >
      {/* Fallback poster while video stream initializes */}
      <img
        src={item.poster}
        alt={item.title}
        loading="lazy"
        decoding="async"
        draggable={false}
        onDragStart={(e) => {
          e.preventDefault();
          return false;
        }}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitUserDrag: 'none' as any,
        }}
        className={`absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-opacity duration-500 ${
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
          muted={!isHovered}
          loop
          playsInline
          draggable={false}
          onDragStart={(e) => {
            e.preventDefault();
            return false;
          }}
          preload="metadata"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen"
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitUserDrag: 'none' as any,
          }}
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
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />
      )}

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/35 p-3 flex flex-col justify-between pointer-events-none select-none" />

      {/* Top Badge & Audio Status */}
      <div className="absolute top-2.5 inset-x-2.5 sm:top-3 sm:inset-x-3 flex justify-between items-center z-10 pointer-events-none select-none">
        <span className="px-2 py-0.5 rounded-md bg-black/60 text-[9px] sm:text-[10px] font-bold text-white border border-white/10">
          {badgeTop || (is916 ? '9:16 Reel' : '16:9 Cinema')}
        </span>

        {/* Pulsing Music indicator strictly when card is hovered */}
        {isHovered && !isManuallyPaused && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#537568] text-white text-[10px] font-bold border border-white/20 shadow-md animate-pulse">
            <Volume2 className="w-3 h-3" />
            <span>Sound On</span>
          </div>
        )}
      </div>

      {/* Bottom Metadata */}
      <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3 sm:inset-x-3 z-10 pointer-events-none select-none">
        <div className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 drop-shadow-md">
          {item.title}
        </div>
        <div className="text-[10px] sm:text-[11px] font-semibold text-[#7ae7f9] mt-0.5 flex items-center justify-between">
          <span>{item.client ? `${item.client} • ` : ''}{item.views}</span>
          <span className="text-[9px] text-white/70 hidden group-focus-visible:inline">Press Enter to Open</span>
        </div>
      </div>
    </div>
  );
};
