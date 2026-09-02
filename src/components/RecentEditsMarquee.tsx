import React, { useRef, useState } from 'react';
import { VideoItem } from '../types';
import { RECENT_EDITS_DATA } from '../data/portfolioData';
import { Zap, Film, Play, Volume2, Sparkles, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface RecentEditsMarqueeProps {
  onSelectVideo: (video: VideoItem) => void;
  onExploreAll: () => void;
}

export const RecentEditsMarquee: React.FC<RecentEditsMarqueeProps> = ({
  onSelectVideo,
  onExploreAll,
}) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Duplicate items for infinite seamless scroll
  const verticalItems = [...RECENT_EDITS_DATA.vertical, ...RECENT_EDITS_DATA.vertical, ...RECENT_EDITS_DATA.vertical];
  const horizontalItems = [...RECENT_EDITS_DATA.horizontal, ...RECENT_EDITS_DATA.horizontal, ...RECENT_EDITS_DATA.horizontal];

  const handleMouseEnter = (item: VideoItem, e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredCardId(item.id);
    soundEngine.playHover();
    const video = e.currentTarget.querySelector('video');
    if (video) {
      try {
        video.muted = false;
        video.volume = 0.8;
      } catch {
        // Ignore audio play restriction
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredCardId(null);
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.muted = true;
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto bg-[#ffffff] border border-[#eeece4] rounded-3xl p-6 sm:p-10 shadow-sm transition-all hover:border-[#537568]/30">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#537568]/10 text-[#537568] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Signature Work Showcase</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#242b27] tracking-tight uppercase">
            Best Edits & Master Showreels
          </h2>

          <p className="text-sm sm:text-base text-[#748078] mt-2">
            A curated stream of our highest-retention master edits, kinetic typography, and cinematic pacing. Hover to hear audio, click for cinema view.
          </p>
        </div>

        {/* Marquee Streams Container with Gradient Masks */}
        <div className="relative overflow-hidden rounded-2xl py-2 space-y-6 select-none">
          
          {/* Row 1: Vertical 9:16 Shorts & Reels */}
          <div>
            <div className="flex items-center gap-2 px-2 text-xs font-bold text-[#537568] uppercase tracking-wider mb-3">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Viral 9:16 Shorts & Reels</span>
            </div>

            <div className="relative overflow-hidden py-1">
              <div className="flex gap-4 w-max animate-marquee-left hover:[animation-play-state:paused]">
                {verticalItems.map((item, idx) => (
                  <div
                    key={`vert-${item.id}-${idx}`}
                    onMouseEnter={(e) => handleMouseEnter(item, e)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                      soundEngine.playWhoosh();
                      onSelectVideo(item);
                    }}
                    className="relative w-44 sm:w-48 aspect-[9/16] rounded-2xl overflow-hidden bg-[#000000] border border-[#537568]/30 shadow-md cursor-pointer group shrink-0 transition-transform duration-300 hover:scale-[1.03] hover:border-[#537568] hover:shadow-xl"
                  >
                    <video
                      src={item.previewUrl}
                      poster={item.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover pointer-events-none"
                    />

                    {/* Overlay Badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-3 flex flex-col justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10">
                          9:16
                        </span>
                        {hoveredCardId === item.id && (
                          <span className="p-1 rounded-full bg-[#537568] text-white shadow animate-pulse">
                            <Volume2 className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="text-xs font-bold text-white leading-snug line-clamp-2 drop-shadow">
                          {item.title}
                        </div>
                        <div className="text-[11px] font-semibold text-[#7ae7f9] mt-0.5">
                          {item.views}
                        </div>
                      </div>
                    </div>

                    {/* Play Hover Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <div className="w-11 h-11 rounded-full bg-white text-[#537568] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Horizontal 16:9 Long-Form Videos */}
          <div>
            <div className="flex items-center gap-2 px-2 text-xs font-bold text-[#537568] uppercase tracking-wider mb-3">
              <Film className="w-4 h-4 text-[#4f6878]" />
              <span>16:9 YouTube Long-Form & Documentaries</span>
            </div>

            <div className="relative overflow-hidden py-1">
              <div className="flex gap-4 w-max animate-marquee-right hover:[animation-play-state:paused]">
                {horizontalItems.map((item, idx) => (
                  <div
                    key={`horiz-${item.id}-${idx}`}
                    onMouseEnter={(e) => handleMouseEnter(item, e)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                      soundEngine.playWhoosh();
                      onSelectVideo(item);
                    }}
                    className="relative w-64 sm:w-72 aspect-video rounded-2xl overflow-hidden bg-[#000000] border border-[#537568]/30 shadow-md cursor-pointer group shrink-0 transition-transform duration-300 hover:scale-[1.03] hover:border-[#537568] hover:shadow-xl"
                  >
                    <video
                      src={item.previewUrl}
                      poster={item.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover pointer-events-none"
                    />

                    {/* Overlay Badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-3 flex flex-col justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10">
                          16:9
                        </span>
                        {hoveredCardId === item.id && (
                          <span className="p-1 rounded-full bg-[#537568] text-white shadow animate-pulse">
                            <Volume2 className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="text-xs font-bold text-white leading-snug line-clamp-1 drop-shadow">
                          {item.title}
                        </div>
                        <div className="text-[11px] font-semibold text-[#7ae7f9] mt-0.5">
                          {item.client} • {item.views}
                        </div>
                      </div>
                    </div>

                    {/* Play Hover Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <div className="w-11 h-11 rounded-full bg-white text-[#537568] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* View All Works Action */}
        <div className="text-center mt-8 pt-4 border-t border-[#eeece4]">
          <button
            onClick={() => {
              soundEngine.playPop();
              onExploreAll();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#537568] hover:bg-[#415e53] text-[#ffffff] text-sm font-bold rounded-full shadow-md shadow-[#537568]/20 transition-all transform hover:translate-x-1 cursor-pointer"
          >
            <span>Explore All Specialized Niches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
