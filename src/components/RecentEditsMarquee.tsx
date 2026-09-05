import React, { useState, useRef, useEffect, useCallback } from 'react';
import { VideoItem } from '../types';
import { RECENT_EDITS_DATA } from '../data/portfolioData';
import { Zap, Film, Sparkles, ArrowRight } from 'lucide-react';
import { AutoplayVideoCard } from './AutoplayVideoCard';
import { soundEngine } from '../utils/soundEngine';

interface CircularTrackRowProps {
  items: VideoItem[];
  aspectRatio: '9:16' | '16:9';
  direction: 'left' | 'right';
  badgeTop: string;
  onSelectVideo: (video: VideoItem) => void;
  baseSpeed?: number; // pixels per second
}

const CircularTrackRow: React.FC<CircularTrackRowProps> = ({
  items,
  aspectRatio,
  direction = 'left',
  badgeTop,
  onSelectVideo,
  baseSpeed = 36,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Dynamic set count based on screen width to guarantee infinite cards in both directions
  const [numSets, setNumSets] = useState<number>(5);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const offsetRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const isGlidingRef = useRef<boolean>(false);
  const dragDistanceRef = useRef<number>(0);
  const lastPointerXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const setWidthRef = useRef<number>(1000);
  const isInitializedRef = useRef<boolean>(false);
  const hasCapturedRef = useRef<boolean>(false);

  const is916 = aspectRatio === '9:16';

  // Calculate card width and dynamic set counts based on screen width
  const updateLayout = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth || window.innerWidth;
    const windowWidth = window.innerWidth;

    // Card width based on responsive breakpoints
    let cardWidth = 192;
    if (is916) {
      cardWidth = windowWidth < 640 ? 160 : windowWidth >= 1536 ? 224 : 192;
    } else {
      cardWidth = windowWidth < 640 ? 240 : windowWidth >= 1536 ? 352 : 288;
    }

    const gap = windowWidth >= 1536 ? 24 : 16;
    const unitWidth = cardWidth + gap;
    const singleSetWidth = items.length * unitWidth;
    setWidthRef.current = singleSetWidth;

    // Required sets so cards NEVER finish:
    // When offset is centered in [-2 * singleSetWidth, -singleSetWidth],
    // Left edge has at least 1 full set buffer offscreen.
    // Right edge has (numSets - 2) * singleSetWidth >= containerWidth + unitWidth.
    const requiredSets = Math.max(Math.ceil((containerWidth + unitWidth) / singleSetWidth) + 3, 5);
    setNumSets(requiredSets);

    if (!isInitializedRef.current && singleSetWidth > 0) {
      offsetRef.current = -1.5 * singleSetWidth;
      isInitializedRef.current = true;
    }
  }, [items.length, is916]);

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [updateLayout]);

  // Global safety listener: If user releases mouse ANYWHERE or window blurs, safely cancel dragging
  useEffect(() => {
    const handleGlobalEnd = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        hasCapturedRef.current = false;
        if (performance.now() - lastTimeRef.current < 80 && Math.abs(velocityRef.current) > 25) {
          velocityRef.current = Math.max(Math.min(velocityRef.current, 1500), -1500);
          isGlidingRef.current = true;
        } else {
          velocityRef.current = 0;
          isGlidingRef.current = false;
        }
      }
    };

    window.addEventListener('pointerup', handleGlobalEnd);
    window.addEventListener('pointercancel', handleGlobalEnd);
    window.addEventListener('blur', handleGlobalEnd);
    return () => {
      window.removeEventListener('pointerup', handleGlobalEnd);
      window.removeEventListener('pointercancel', handleGlobalEnd);
      window.removeEventListener('blur', handleGlobalEnd);
    };
  }, []);

  // Main 60FPS GPU Animation Loop with Two-Way Modulo Wrapping & Momentum Deceleration
  useEffect(() => {
    let animId: number;
    let prevFrameTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - prevFrameTime) / 1000, 0.1);
      prevFrameTime = now;

      const singleSetWidth = setWidthRef.current || 1000;
      const autoDriftSpeed = direction === 'left' ? -baseSpeed : baseSpeed;

      // Don't auto-drift if modal is active
      const isModalActive = document.body.classList.contains('cinema-modal-active');

      if (!isDraggingRef.current && !isModalActive) {
        if (isGlidingRef.current && Math.abs(velocityRef.current) > 15) {
          // Inertia Glide Phase: smoothly decel over 0.5s - 1.0s
          offsetRef.current += velocityRef.current * dt;
          // Exponential decay friction: ~93% reduction per second
          velocityRef.current *= Math.pow(0.07, dt);
        } else {
          // Glide finished: reset and resume auto-drift
          if (isGlidingRef.current) {
            isGlidingRef.current = false;
            velocityRef.current = 0;
          }
          // Default auto drift (pauses smoothly when hovered)
          if (!isHovered) {
            offsetRef.current += autoDriftSpeed * dt;
          }
        }

        // Two-Way Seamless Modulo Wrapping in [-2*singleSetWidth, -singleSetWidth]
        // This guarantees a full set of buffer cards ALWAYS exists offscreen to the left,
        // and multiple sets of cards ALWAYS exist offscreen to the right!
        while (offsetRef.current <= -2 * singleSetWidth) {
          offsetRef.current += singleSetWidth;
        }
        while (offsetRef.current >= -singleSetWidth) {
          offsetRef.current -= singleSetWidth;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [direction, baseSpeed, isHovered]);

  // Pointer Event Handlers for Drag & Touch (Works in BOTH Directions)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Left mouse button or touch only
    isDraggingRef.current = true;
    isGlidingRef.current = false;
    dragDistanceRef.current = 0;
    lastPointerXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    hasCapturedRef.current = false;
    // Note: We do NOT capture pointer here immediately so clicks and double-clicks
    // reach the card children without interference when user isn't dragging!
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // CRITICAL GLITCH FIX: If mouse moves without any button pressed (hovering), CANCEL dragging immediately!
    if (e.pointerType === 'mouse' && e.buttons === 0) {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
      }
      return;
    }

    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - lastPointerXRef.current;
    dragDistanceRef.current += Math.abs(deltaX);

    // Engage pointer capture ONLY once actual movement occurs (> 6px)
    if (!hasCapturedRef.current && dragDistanceRef.current > 6) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
        hasCapturedRef.current = true;
      } catch {}
    }

    const now = performance.now();
    const dt = Math.max((now - lastTimeRef.current) / 1000, 0.001);

    offsetRef.current += deltaX;

    // Exponential smoothing for throw velocity
    const instantVelocity = deltaX / dt;
    velocityRef.current = velocityRef.current * 0.35 + instantVelocity * 0.65;

    lastPointerXRef.current = e.clientX;
    lastTimeRef.current = now;

    // Wrap continuously during drag in BOTH directions
    const singleSetWidth = setWidthRef.current || 1000;
    while (offsetRef.current <= -2 * singleSetWidth) {
      offsetRef.current += singleSetWidth;
    }
    while (offsetRef.current >= -singleSetWidth) {
      offsetRef.current -= singleSetWidth;
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (hasCapturedRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      hasCapturedRef.current = false;
    }

    const timeSinceLastMove = performance.now() - lastTimeRef.current;
    if (timeSinceLastMove < 80 && dragDistanceRef.current > 6) {
      // Clamp throw velocity for a pleasant, natural glide
      velocityRef.current = Math.max(Math.min(velocityRef.current, 1500), -1500);
      if (Math.abs(velocityRef.current) > 25) {
        isGlidingRef.current = true;
      } else {
        velocityRef.current = 0;
        isGlidingRef.current = false;
      }
    } else {
      // User held mouse still before releasing: stop instantly
      velocityRef.current = 0;
      isGlidingRef.current = false;
    }
  };

  // Build replicated cards array based on calculated sets
  const cardSets: VideoItem[] = [];
  for (let s = 0; s < numSets; s++) {
    cardSets.push(...items);
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      draggable={false}
      onDragStart={(e) => {
        e.preventDefault();
        return false;
      }}
      className="relative overflow-hidden py-1.5 select-none cursor-grab active:cursor-grabbing touch-pan-y"
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'pan-y',
      }}
    >
      <div
        ref={trackRef}
        className="flex gap-4 2xl:gap-6 w-max will-change-transform select-none"
        style={{ transform: `translate3d(${offsetRef.current}px, 0, 0)` }}
      >
        {cardSets.map((item, idx) => (
          <div
            key={`marquee-${item.id}-${idx}`}
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
            onDoubleClick={(e) => {
              // Double click on card opens fullscreen immediately!
              e.preventDefault();
              e.stopPropagation();
              soundEngine.playWhoosh();
              onSelectVideo(item);
            }}
            onClick={(e) => {
              // If user was actively dragging cards, ignore click completely
              if (dragDistanceRef.current >= 6) {
                e.preventDefault();
                e.stopPropagation();
                return;
              }
              // On mobile / touch screens, single tap opens fullscreen directly!
              const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
              if (isTouch) {
                e.preventDefault();
                e.stopPropagation();
                soundEngine.playWhoosh();
                onSelectVideo(item);
              }
            }}
          >
            <AutoplayVideoCard
              item={item}
              aspectRatio={aspectRatio}
              badgeTop={badgeTop}
              onSelect={onSelectVideo}
              className={
                is916
                  ? 'w-40 sm:w-48 2xl:w-56 rounded-2xl'
                  : 'w-60 sm:w-72 2xl:w-88 rounded-2xl'
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

interface RecentEditsMarqueeProps {
  onSelectVideo: (video: VideoItem) => void;
  onExploreNiches?: () => void;
  onViewPricing?: () => void;
  onOpenBooking?: () => void;
}

export const RecentEditsMarquee: React.FC<RecentEditsMarqueeProps> = ({
  onSelectVideo,
  onExploreNiches,
}) => {
  return (
    <section id="work" className="py-10 sm:py-14 px-3 sm:px-8 2xl:px-14 scroll-mt-24">
      <div className="max-w-7xl 2xl:max-w-[1850px] mx-auto bg-[#ffffff] dark:bg-[#171d1a] border border-[#eeece4] dark:border-[#243029] rounded-3xl p-4 sm:p-10 2xl:p-14 shadow-sm transition-all hover:border-[#537568]/30">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#537568]/10 text-[#537568] dark:text-[#6ba28e] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quick Work Showcase</span>
          </div>

          <h2 className="text-2xl sm:text-4xl 2xl:text-5xl font-black text-[#242b27] dark:text-[#f2f7f4] tracking-tight uppercase">
            Best Edits & Master Showreels
          </h2>

          <p className="text-xs sm:text-base 2xl:text-lg text-[#748078] dark:text-[#97a69f] mt-2.5 sm:mt-3 px-2">
            A live preview stream of master edits, kinetic typography, and cinematic pacing. Hover or tap any video to hear audio; double-click or tap center button to open in Cinema Fullscreen.
          </p>
        </div>

        {/* Dynamic Infinite Marquee Streams (Works on Phone, Tablet, & Desktop) */}
        <div className="relative overflow-hidden rounded-2xl py-2 space-y-7 sm:space-y-8 select-none">
          
          {/* Row 1: Vertical 9:16 Shorts & Reels */}
          <div>
            <div className="flex items-center justify-between px-2 text-xs sm:text-sm font-bold text-[#537568] dark:text-[#6ba28e] uppercase tracking-wider mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Viral 9:16 Shorts & Reels</span>
              </div>
            </div>

            <CircularTrackRow
              items={RECENT_EDITS_DATA.vertical}
              aspectRatio="9:16"
              direction="left"
              badgeTop="9:16 Reel"
              onSelectVideo={onSelectVideo}
              baseSpeed={34}
            />
          </div>

          {/* Row 2: Horizontal 16:9 Long-Form Videos */}
          <div>
            <div className="flex items-center justify-between px-2 text-xs sm:text-sm font-bold text-[#537568] dark:text-[#6ba28e] uppercase tracking-wider mb-3">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-[#537568] dark:text-[#6ba28e]" />
                <span>16:9 YouTube Long-Form & Documentaries</span>
              </div>
            </div>

            <CircularTrackRow
              items={RECENT_EDITS_DATA.horizontal}
              aspectRatio="16:9"
              direction="right"
              badgeTop="16:9 Cinema"
              onSelectVideo={onSelectVideo}
              baseSpeed={36}
            />
          </div>

        </div>

        {/* PROMINENT CATEGORIZED NICHES BUTTON (Styled matching Hero CTA buttons) */}
        <div className="flex flex-col items-center justify-center pt-8 pb-1 text-center">
          {onExploreNiches && (
            <button
              onClick={() => {
                soundEngine.playPop();
                onExploreNiches();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#537568] hover:bg-[#436257] text-white font-semibold text-sm sm:text-base rounded-full shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Explore All Niches and Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
