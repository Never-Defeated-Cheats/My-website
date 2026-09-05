import React, { useState, useRef, useEffect, useCallback } from 'react';
import { VideoItem, NicheCategory } from '../types';
import { NICHES_DATA } from '../data/portfolioData';
import {
  Mic,
  Film,
  Laptop,
  Zap,
  Plane,
  Building2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { AutoplayVideoCard } from './AutoplayVideoCard';

interface NichesPageProps {
  onSelectVideo: (video: VideoItem) => void;
  onOpenBooking: () => void;
  onOpenBookingWithPlan?: (planName: string) => void;
}

interface NicheTrackRowProps {
  items: VideoItem[];
  aspectRatio: '9:16' | '16:9';
  direction: 'left' | 'right';
  badgeTop: string;
  onSelectVideo: (video: VideoItem) => void;
  isNicheFocused: boolean;
  baseSpeed?: number;
}

// High-Performance Dynamic Sliding Track with Hardware Focus Suspender
const NicheTrackRow: React.FC<NicheTrackRowProps> = ({
  items,
  aspectRatio,
  direction = 'left',
  badgeTop,
  onSelectVideo,
  isNicheFocused,
  baseSpeed = 32,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

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

    let cardWidth = 192;
    if (is916) {
      cardWidth = windowWidth < 640 ? 150 : windowWidth >= 1536 ? 210 : 180;
    } else {
      cardWidth = windowWidth < 640 ? 230 : windowWidth >= 1536 ? 330 : 270;
    }

    const gap = windowWidth >= 1536 ? 20 : 14;
    const unitWidth = cardWidth + gap;
    const singleSetWidth = Math.max(items.length * unitWidth, 500);
    setWidthRef.current = singleSetWidth;

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

  // Global safety listener for pointer release
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

  // Hardware-Optimized RAF Animation Loop: ONLY runs if isNicheFocused is true!
  // When user scrolls away from this niche, animId cancels and loop exits instantly (0% CPU, 0 FPS overhead)
  useEffect(() => {
    if (!isNicheFocused) {
      // Off-screen niche: Do NOT schedule any animation frame
      return;
    }

    let animId: number;
    let prevFrameTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - prevFrameTime) / 1000, 0.1);
      prevFrameTime = now;

      const singleSetWidth = setWidthRef.current || 1000;
      const autoDriftSpeed = direction === 'left' ? -baseSpeed : baseSpeed;
      const isModalActive = document.body.classList.contains('cinema-modal-active');

      if (!isDraggingRef.current && !isModalActive) {
        if (isGlidingRef.current && Math.abs(velocityRef.current) > 15) {
          offsetRef.current += velocityRef.current * dt;
          velocityRef.current *= Math.pow(0.07, dt);
        } else {
          if (isGlidingRef.current) {
            isGlidingRef.current = false;
            velocityRef.current = 0;
          }
          if (!isHovered) {
            offsetRef.current += autoDriftSpeed * dt;
          }
        }

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
  }, [isNicheFocused, direction, baseSpeed, isHovered]);

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    isGlidingRef.current = false;
    dragDistanceRef.current = 0;
    lastPointerXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    hasCapturedRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.buttons === 0) {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
      }
      return;
    }

    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - lastPointerXRef.current;
    dragDistanceRef.current += Math.abs(deltaX);

    if (!hasCapturedRef.current && dragDistanceRef.current > 6) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
        hasCapturedRef.current = true;
      } catch {}
    }

    const now = performance.now();
    const dt = Math.max((now - lastTimeRef.current) / 1000, 0.001);

    offsetRef.current += deltaX;
    const instantVelocity = deltaX / dt;
    velocityRef.current = velocityRef.current * 0.35 + instantVelocity * 0.65;

    lastPointerXRef.current = e.clientX;
    lastTimeRef.current = now;

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
      velocityRef.current = Math.max(Math.min(velocityRef.current, 1500), -1500);
      if (Math.abs(velocityRef.current) > 25) {
        isGlidingRef.current = true;
      } else {
        velocityRef.current = 0;
        isGlidingRef.current = false;
      }
    } else {
      velocityRef.current = 0;
      isGlidingRef.current = false;
    }
  };

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
      className="relative overflow-hidden py-1 select-none cursor-grab active:cursor-grabbing touch-pan-y"
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'pan-y',
      }}
    >
      <div
        ref={trackRef}
        className="flex gap-3.5 sm:gap-4 2xl:gap-5 w-max will-change-transform select-none"
        style={{ transform: `translate3d(${offsetRef.current}px, 0, 0)` }}
      >
        {cardSets.map((item, idx) => (
          <div
            key={`niche-row-${item.id}-${idx}`}
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
              e.stopPropagation();
              soundEngine.playWhoosh();
              onSelectVideo(item);
            }}
            onClick={(e) => {
              if (dragDistanceRef.current < 6 && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
                e.stopPropagation();
                soundEngine.playPop();
                onSelectVideo(item);
              }
            }}
            className={
              is916
                ? 'w-[150px] sm:w-[180px] 2xl:w-[210px] shrink-0'
                : 'w-[230px] sm:w-[270px] 2xl:w-[330px] shrink-0'
            }
          >
            <AutoplayVideoCard
              item={item}
              aspectRatio={aspectRatio}
              badgeTop={badgeTop}
              onSelect={onSelectVideo}
              enabled={isNicheFocused}
              className="rounded-2xl shadow-xs hover:shadow-md transition-shadow"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Per-Niche Section Container with Strict Viewport Observer
interface NicheSectionPanelProps {
  nicheKey: string;
  niche: NicheCategory;
  onSelectVideo: (video: VideoItem) => void;
  onViewAll: (key: string) => void;
  getNicheIcon: (iconName: string) => React.ReactNode;
}

const NicheSectionPanel: React.FC<NicheSectionPanelProps> = ({
  nicheKey,
  niche,
  onSelectVideo,
  onViewAll,
  getNicheIcon,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isInFocus, setIsInFocus] = useState<boolean>(false);

  // Strict Hardware Focus Observer: Only activates processes when niche is in user's viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInFocus(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: '100px 0px 100px 0px', // Preload buffer when approaching viewport
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const totalCount = niche.vertical.length + niche.horizontal.length;

  return (
    <div
      ref={sectionRef}
      className={`bg-[#ffffff] dark:bg-[#121815] border rounded-3xl p-4 sm:p-6 2xl:p-8 shadow-sm transition-all duration-300 ${
        isInFocus
          ? 'border-[#537568]/40 dark:border-[#50b38c]/30 shadow-md'
          : 'border-[#eeece4] dark:border-[#1e2b24] opacity-95'
      }`}
    >
      {/* Niche Container Header */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#eeece4] dark:border-[#1e2b24] mb-4 sm:mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#537568]/10 dark:bg-[#537568]/20 flex items-center justify-center shrink-0">
            {getNicheIcon(niche.iconName)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg 2xl:text-xl font-bold text-[#242b27] dark:text-[#f2f7f4]">
                {niche.name}
              </h2>
              {isInFocus && (
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Active Focus" />
              )}
            </div>
            <p className="text-[11px] sm:text-xs text-[#748078] dark:text-[#8ea096] line-clamp-1">
              {niche.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundEngine.playPop();
            onViewAll(nicheKey);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#eeece4]/70 dark:bg-[#19221d] hover:bg-[#537568] hover:text-white dark:hover:bg-[#537568] text-[#242b27] dark:text-[#f2f7f4] text-xs font-semibold transition-all cursor-pointer shrink-0 border border-[#dcd9ce] dark:border-[#283830]"
        >
          <span>View All Work ({totalCount})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 9:16 Vertical Video Sliding Row */}
      {niche.vertical.length > 0 && (
        <div className="mb-5">
          <div className="text-[11px] sm:text-xs font-bold text-[#537568] dark:text-[#50b38c] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>9:16 Vertical Reels & Shorts ({niche.vertical.length})</span>
          </div>

          <NicheTrackRow
            items={niche.vertical}
            aspectRatio="9:16"
            direction="left"
            badgeTop="9:16 Reel"
            onSelectVideo={onSelectVideo}
            isNicheFocused={isInFocus}
            baseSpeed={30}
          />
        </div>
      )}

      {/* 16:9 Horizontal Video Sliding Row */}
      {niche.horizontal.length > 0 && (
        <div>
          <div className="text-[11px] sm:text-xs font-bold text-[#537568] dark:text-[#50b38c] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-[#537568] dark:text-[#50b38c]" />
            <span>16:9 YouTube Long-Form & Cinema ({niche.horizontal.length})</span>
          </div>

          <NicheTrackRow
            items={niche.horizontal}
            aspectRatio="16:9"
            direction="right"
            badgeTop="16:9 Cinema"
            onSelectVideo={onSelectVideo}
            isNicheFocused={isInFocus}
            baseSpeed={24}
          />
        </div>
      )}
    </div>
  );
};

export const NichesPage: React.FC<NichesPageProps> = ({
  onSelectVideo,
  onOpenBooking,
  onOpenBookingWithPlan,
}) => {
  const [activeNicheKey, setActiveNicheKey] = useState<string | null>(null);
  const [mediaFilter, setMediaFilter] = useState<'all' | 'vertical' | 'horizontal'>('all');

  const getNicheIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mic':
        return <Mic className="w-5 h-5 text-[#537568] dark:text-[#50b38c]" />;
      case 'Film':
        return <Film className="w-5 h-5 text-[#537568] dark:text-[#50b38c]" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-[#537568] dark:text-[#50b38c]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Plane':
        return <Plane className="w-5 h-5 text-[#4f6878] dark:text-[#7ab0d6]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#537568] dark:text-[#50b38c]" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-[#537568] dark:text-[#50b38c]" />;
    }
  };

  // Detailed View for a Single Niche (Grid Archive)
  if (activeNicheKey && NICHES_DATA[activeNicheKey]) {
    const currentNiche = NICHES_DATA[activeNicheKey];

    return (
      <div className="py-8 sm:py-12 px-3 sm:px-8 2xl:px-14 flex-grow animate-in fade-in duration-300">
        <div className="max-w-7xl 2xl:max-w-[1850px] mx-auto">
          {/* Back Action Bar */}
          <div className="mb-6 pb-4 border-b border-[#eeece4] dark:border-[#1e2b24] flex items-center justify-between">
            <button
              onClick={() => {
                soundEngine.playPop();
                setActiveNicheKey(null);
                setMediaFilter('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffffff] dark:bg-[#121815] border border-[#dcd9ce] dark:border-[#283830] text-xs sm:text-sm font-bold text-[#242b27] dark:text-[#f2f7f4] hover:border-[#537568] transition-all cursor-pointer shadow-sm hover:shadow active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-[#537568] dark:text-[#50b38c]" />
              <span>Back to All Niches & Works</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playWhoosh();
                if (onOpenBookingWithPlan) {
                  onOpenBookingWithPlan(currentNiche.name);
                } else {
                  onOpenBooking();
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#537568] hover:bg-[#415e53] text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm hover:shadow transition-all cursor-pointer active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book {currentNiche.name}</span>
            </button>
          </div>

          {/* Niche Detail Header */}
          <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-[#ffffff] dark:bg-[#121815] border border-[#eeece4] dark:border-[#1e2b24] shadow-sm">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-[#537568]/10 dark:bg-[#537568]/20 flex items-center justify-center shrink-0">
                {getNicheIcon(currentNiche.iconName)}
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#242b27] dark:text-[#f2f7f4] tracking-tight">
                  {currentNiche.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#537568] dark:text-[#50b38c] font-semibold">
                  {currentNiche.subtitle}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#4c5750] dark:text-[#a2b5ab] leading-relaxed max-w-4xl mt-2">
              {currentNiche.description}
            </p>
          </div>

          {/* Video Format Filter Pills (All / Vertical 9:16 / Horizontal 16:9) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
            <button
              onClick={() => {
                soundEngine.playPop();
                setMediaFilter('all');
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                mediaFilter === 'all'
                  ? 'bg-[#537568] text-white shadow-sm font-bold scale-[1.02]'
                  : 'bg-[#ffffff] dark:bg-[#18201c] text-[#748078] dark:text-[#97a69f] border border-[#eeece4] dark:border-[#26332b] hover:border-[#537568]/40 hover:text-[#242b27] dark:hover:text-[#ffffff]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Work ({currentNiche.vertical.length + currentNiche.horizontal.length})</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playPop();
                setMediaFilter('vertical');
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                mediaFilter === 'vertical'
                  ? 'bg-[#537568] text-white shadow-sm font-bold scale-[1.02]'
                  : 'bg-[#ffffff] dark:bg-[#18201c] text-[#748078] dark:text-[#97a69f] border border-[#eeece4] dark:border-[#26332b] hover:border-[#537568]/40 hover:text-[#242b27] dark:hover:text-[#ffffff]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>9:16 Vertical Reels ({currentNiche.vertical.length})</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playPop();
                setMediaFilter('horizontal');
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                mediaFilter === 'horizontal'
                  ? 'bg-[#537568] text-white shadow-sm font-bold scale-[1.02]'
                  : 'bg-[#ffffff] dark:bg-[#18201c] text-[#748078] dark:text-[#97a69f] border border-[#eeece4] dark:border-[#26332b] hover:border-[#537568]/40 hover:text-[#242b27] dark:hover:text-[#ffffff]'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-[#537568] dark:text-[#50b38c]" />
              <span>16:9 YouTube Long-Form ({currentNiche.horizontal.length})</span>
            </button>
          </div>

          {/* Section 1: 9:16 Reels & Viral Shorts Grid */}
          {(mediaFilter === 'all' || mediaFilter === 'vertical') && currentNiche.vertical.length > 0 && (
            <div className="mb-12 animate-in fade-in duration-200">
              <div className="text-xs sm:text-sm font-bold text-[#537568] dark:text-[#50b38c] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>9:16 Vertical Reels, TikToks & Shorts ({currentNiche.vertical.length})</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {currentNiche.vertical.map((item) => (
                  <AutoplayVideoCard
                    key={item.id}
                    item={item}
                    aspectRatio="9:16"
                    badgeTop="9:16 Reel"
                    onSelect={onSelectVideo}
                    className="rounded-2xl shadow-sm hover:shadow-md"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Section 2: 16:9 YouTube Long-Form & Documentaries Grid */}
          {(mediaFilter === 'all' || mediaFilter === 'horizontal') && currentNiche.horizontal.length > 0 && (
            <div className="mb-12 animate-in fade-in duration-200">
              <div className="text-xs sm:text-sm font-bold text-[#537568] dark:text-[#50b38c] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Film className="w-4 h-4 text-[#537568] dark:text-[#50b38c]" />
                <span>16:9 YouTube Long-Form & Master Documentaries ({currentNiche.horizontal.length})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentNiche.horizontal.map((item) => (
                  <AutoplayVideoCard
                    key={item.id}
                    item={item}
                    aspectRatio="16:9"
                    badgeTop="16:9 Cinema"
                    onSelect={onSelectVideo}
                    className="rounded-2xl shadow-sm hover:shadow-md"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main All Niches Overview View with Focus-Suspended Sliding Tracks
  return (
    <div className="py-8 sm:py-12 px-3 sm:px-8 2xl:px-14 flex-grow animate-in fade-in duration-300">
      <div className="max-w-7xl 2xl:max-w-[1850px] mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#537568]/10 dark:bg-[#537568]/20 text-[#537568] dark:text-[#50b38c] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Editing Niches</span>
          </div>

          <h1 className="text-2xl sm:text-4xl 2xl:text-5xl font-black text-[#242b27] dark:text-[#f2f7f4] tracking-tight uppercase">
            All Specialized Niches & Works
          </h1>

          <p className="text-xs sm:text-base 2xl:text-lg text-[#748078] dark:text-[#97a69f] mt-2.5 sm:mt-3 px-2">
            Explore our specialized editing vertical tracks. Sliding motion and video playback run strictly for the niche in active view to keep performance razor sharp. Hover any card to pause; double-click or tap to open in Cinema Player.
          </p>
        </div>

        {/* 5 Specialized Niche Panels with Individual Focus Observers */}
        <div className="space-y-8 sm:space-y-10">
          {Object.entries(NICHES_DATA).map(([key, niche]) => (
            <NicheSectionPanel
              key={key}
              nicheKey={key}
              niche={niche}
              onSelectVideo={onSelectVideo}
              onViewAll={(k) => {
                setActiveNicheKey(k);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              getNicheIcon={getNicheIcon}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
