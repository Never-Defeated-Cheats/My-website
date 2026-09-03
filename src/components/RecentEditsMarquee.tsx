import React, { useState } from 'react';
import { VideoItem } from '../types';
import { RECENT_EDITS_DATA } from '../data/portfolioData';
import { Zap, Film, Sparkles, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { AutoplayVideoCard } from './AutoplayVideoCard';

interface RecentEditsMarqueeProps {
  onSelectVideo: (video: VideoItem) => void;
  onExploreAll: () => void;
}

export const RecentEditsMarquee: React.FC<RecentEditsMarqueeProps> = ({
  onSelectVideo,
  onExploreAll,
}) => {
  const [row1Paused, setRow1Paused] = useState(false);
  const [row2Paused, setRow2Paused] = useState(false);

  // Seamless loop with hardware-accelerated autoplaying cards (3x for ultra-wide displays)
  const verticalItems = [
    ...RECENT_EDITS_DATA.vertical,
    ...RECENT_EDITS_DATA.vertical,
    ...RECENT_EDITS_DATA.vertical,
  ];
  const horizontalItems = [
    ...RECENT_EDITS_DATA.horizontal,
    ...RECENT_EDITS_DATA.horizontal,
    ...RECENT_EDITS_DATA.horizontal,
  ];

  return (
    <section className="py-8 px-4 sm:px-8 2xl:px-14">
      <div className="max-w-7xl 2xl:max-w-[1850px] mx-auto bg-[#ffffff] border border-[#eeece4] rounded-3xl p-6 sm:p-10 2xl:p-14 shadow-sm transition-all hover:border-[#537568]/30">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#537568]/10 text-[#537568] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Signature Work Showcase</span>
          </div>

          <h2 className="text-2xl sm:text-4xl 2xl:text-5xl font-black text-[#242b27] tracking-tight uppercase">
            Best Edits & Master Showreels
          </h2>

          <p className="text-sm sm:text-base 2xl:text-lg text-[#748078] mt-3">
            A live preview stream of our master edits, kinetic typography, and cinematic pacing. Hover any card to pause sliding and hear live music; tap to open in Fullscreen Cinema Mode.
          </p>
        </div>

        {/* Marquee Streams Container */}
        <div className="relative overflow-hidden rounded-2xl py-2 space-y-8 select-none">
          
          {/* Row 1: Vertical 9:16 Shorts & Reels */}
          <div
            className="marquee-row group/row1"
            onMouseEnter={() => setRow1Paused(true)}
            onMouseLeave={() => setRow1Paused(false)}
            onTouchStart={() => setRow1Paused(true)}
            onTouchEnd={() => setRow1Paused(false)}
          >
            <div className="flex items-center gap-2 px-2 text-xs sm:text-sm font-bold text-[#537568] uppercase tracking-wider mb-3.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Viral 9:16 Shorts & Reels</span>
            </div>

            <div className="relative overflow-hidden py-1">
              <div
                className="flex gap-4 2xl:gap-6 w-max animate-marquee-left"
                style={{
                  animationPlayState: row1Paused ? 'paused' : 'running',
                }}
              >
                {verticalItems.map((item, idx) => (
                  <AutoplayVideoCard
                    key={`vert-${item.id}-${idx}`}
                    item={item}
                    aspectRatio="9:16"
                    badgeTop="9:16 Reel"
                    onSelect={onSelectVideo}
                    className="w-44 sm:w-48 2xl:w-56 rounded-2xl"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Horizontal 16:9 Long-Form Videos */}
          <div
            className="marquee-row group/row2"
            onMouseEnter={() => setRow2Paused(true)}
            onMouseLeave={() => setRow2Paused(false)}
            onTouchStart={() => setRow2Paused(true)}
            onTouchEnd={() => setRow2Paused(false)}
          >
            <div className="flex items-center gap-2 px-2 text-xs sm:text-sm font-bold text-[#537568] uppercase tracking-wider mb-3.5">
              <Film className="w-4 h-4 text-[#537568]" />
              <span>16:9 YouTube Long-Form & Documentaries</span>
            </div>

            <div className="relative overflow-hidden py-1">
              <div
                className="flex gap-4 2xl:gap-6 w-max animate-marquee-right"
                style={{
                  animationPlayState: row2Paused ? 'paused' : 'running',
                }}
              >
                {horizontalItems.map((item, idx) => (
                  <AutoplayVideoCard
                    key={`horiz-${item.id}-${idx}`}
                    item={item}
                    aspectRatio="16:9"
                    badgeTop="16:9 Cinema"
                    onSelect={onSelectVideo}
                    className="w-64 sm:w-72 2xl:w-88 rounded-2xl"
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* View All Works Action */}
        <div className="text-center mt-10 pt-6 border-t border-[#eeece4]">
          <button
            onClick={() => {
              soundEngine.playPop();
              onExploreAll();
            }}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#537568] hover:bg-[#415e53] text-[#ffffff] text-sm font-bold rounded-full shadow-md shadow-[#537568]/20 transition-all transform hover:translate-x-1 cursor-pointer"
          >
            <span>Explore All Specialized Niches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
