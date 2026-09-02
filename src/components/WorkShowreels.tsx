import React, { useState } from 'react';
import { NicheCategory, VideoItem } from '../types';
import { NICHES_DATA } from '../data/portfolioData';
import { Mic, Film, Laptop, Zap, Plane, Sparkles, ArrowRight, ArrowLeft, Play, Volume2, Eye } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface WorkShowreelsProps {
  onSelectVideo: (video: VideoItem) => void;
  onOpenBookingWithPlan?: (planName: string) => void;
}

export const WorkShowreels: React.FC<WorkShowreelsProps> = ({
  onSelectVideo,
  onOpenBookingWithPlan,
}) => {
  const [activeNicheKey, setActiveNicheKey] = useState<string | null>(null);
  const [formatFilter, setFormatFilter] = useState<'all' | '16:9' | '9:16'>('all');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const getNicheIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mic':
        return <Mic className="w-5 h-5 text-[#537568]" />;
      case 'Film':
        return <Film className="w-5 h-5 text-[#537568]" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-[#537568]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Plane':
        return <Plane className="w-5 h-5 text-[#4f6878]" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-[#537568]" />;
    }
  };

  const handleCardHover = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredCardId(id);
    soundEngine.playHover();
    const video = e.currentTarget.querySelector('video');
    if (video) {
      try {
        video.muted = false;
        video.volume = 0.8;
      } catch {
        // Audio policy
      }
    }
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredCardId(null);
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.muted = true;
    }
  };

  // If a specific niche is opened in dedicated archive mode
  if (activeNicheKey && NICHES_DATA[activeNicheKey]) {
    const niche = NICHES_DATA[activeNicheKey];
    const vertList = niche.vertical;
    const horizList = niche.horizontal;
    const totalCount = vertList.length + horizList.length;

    const show169 = formatFilter === 'all' || formatFilter === '16:9';
    const show916 = formatFilter === 'all' || formatFilter === '9:16';

    return (
      <div className="py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto bg-[#ffffff] border border-[#eeece4] rounded-3xl p-6 sm:p-10 shadow-sm animate-in fade-in">
          
          {/* Header with Back button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#eeece4] mb-8">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveNicheKey(null);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eeece4]/80 hover:bg-[#537568] hover:text-[#ffffff] text-sm font-bold text-[#242b27] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Niches</span>
            </button>

            <div className="flex items-center gap-3 text-left sm:text-right">
              <div className="w-11 h-11 rounded-xl bg-[#537568]/10 flex items-center justify-center shrink-0">
                {getNicheIcon(niche.iconName)}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#242b27]">
                  {niche.name} Archive
                </h2>
                <p className="text-xs sm:text-sm text-[#748078]">
                  {niche.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Format Filter Tabs */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            <button
              onClick={() => {
                soundEngine.playPop();
                setFormatFilter('all');
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                formatFilter === 'all'
                  ? 'bg-[#537568] text-white shadow-sm'
                  : 'bg-[#eeece4]/80 text-[#4c5750] hover:bg-[#eeece4]'
              }`}
            >
              All Works ({totalCount})
            </button>

            <button
              onClick={() => {
                soundEngine.playPop();
                setFormatFilter('16:9');
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                formatFilter === '16:9'
                  ? 'bg-[#537568] text-white shadow-sm'
                  : 'bg-[#eeece4]/80 text-[#4c5750] hover:bg-[#eeece4]'
              }`}
            >
              16:9 Long-Form ({horizList.length})
            </button>

            <button
              onClick={() => {
                soundEngine.playPop();
                setFormatFilter('9:16');
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                formatFilter === '9:16'
                  ? 'bg-[#537568] text-white shadow-sm'
                  : 'bg-[#eeece4]/80 text-[#4c5750] hover:bg-[#eeece4]'
              }`}
            >
              9:16 Shorts & Reels ({vertList.length})
            </button>
          </div>

          {/* 16:9 Videos Grid */}
          {show169 && horizList.length > 0 && (
            <div className="mb-10">
              <h3 className="text-base font-bold text-[#242b27] flex items-center gap-2 mb-4">
                <Film className="w-4 h-4 text-[#537568]" />
                <span>16:9 Long-Form Master Edits ({horizList.length})</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {horizList.map((item) => (
                  <div
                    key={item.id}
                    onMouseEnter={(e) => handleCardHover(item.id, e)}
                    onMouseLeave={handleCardLeave}
                    onClick={() => {
                      soundEngine.playWhoosh();
                      onSelectVideo(item);
                    }}
                    className="relative aspect-video rounded-2xl overflow-hidden bg-[#000000] border border-[#eeece4] shadow-sm hover:border-[#537568] hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <video
                      src={item.previewUrl}
                      poster={item.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-4 flex flex-col justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                      <div className="flex justify-between items-center">
                        <span className="px-2 py-0.5 rounded bg-black/60 text-[10px] font-bold text-white">
                          16:9
                        </span>
                        {hoveredCardId === item.id && (
                          <span className="p-1 rounded-full bg-[#537568] text-white shadow animate-pulse">
                            <Volume2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="text-sm font-bold text-white line-clamp-1">
                          {item.title}
                        </div>
                        <div className="text-xs text-[#7ae7f9] mt-0.5">
                          {item.client} • {item.views}
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <div className="w-12 h-12 rounded-full bg-white text-[#537568] flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9:16 Vertical Videos Grid */}
          {show916 && vertList.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-[#242b27] flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>9:16 Viral Shorts & Reels ({vertList.length})</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {vertList.map((item) => (
                  <div
                    key={item.id}
                    onMouseEnter={(e) => handleCardHover(item.id, e)}
                    onMouseLeave={handleCardLeave}
                    onClick={() => {
                      soundEngine.playWhoosh();
                      onSelectVideo(item);
                    }}
                    className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#000000] border border-[#eeece4] shadow-sm hover:border-[#537568] hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <video
                      src={item.previewUrl}
                      poster={item.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-3 flex flex-col justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                      <div className="flex justify-between items-center">
                        <span className="px-2 py-0.5 rounded bg-black/60 text-[10px] font-bold text-white">
                          9:16
                        </span>
                        {hoveredCardId === item.id && (
                          <span className="p-1 rounded-full bg-[#537568] text-white shadow animate-pulse">
                            <Volume2 className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="text-xs font-bold text-white line-clamp-2">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-[#7ae7f9] mt-0.5">
                          {item.views}
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <div className="w-10 h-10 rounded-full bg-white text-[#537568] flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Book Niche Project CTA */}
          <div className="mt-12 p-6 bg-[#eeece4]/50 border border-[#e4e1d5] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-bold text-base text-[#242b27]">
                Ready to edit your next {niche.name} project?
              </div>
              <div className="text-xs text-[#748078] mt-0.5">
                Fast turnarounds, authentic sound design, and maximum audience retention.
              </div>
            </div>

            {onOpenBookingWithPlan && (
              <button
                onClick={() => {
                  soundEngine.playWhoosh();
                  onOpenBookingWithPlan(niche.name);
                }}
                className="px-6 py-2.5 bg-[#537568] hover:bg-[#415e53] text-white text-sm font-bold rounded-full shadow transition-all cursor-pointer whitespace-nowrap"
              >
                Book {niche.name} Project
              </button>
            )}
          </div>

        </div>
      </div>
    );
  }

  // All 6 Niches Overview View
  return (
    <section className="py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Head */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#537568]/10 text-[#537568] text-xs font-bold uppercase tracking-wider mb-2">
            <Film className="w-3.5 h-3.5" />
            <span>Curated Editing Niches</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#242b27] tracking-tight">
            All Specialized Niches & Works
          </h2>

          <p className="text-sm sm:text-base text-[#748078] mt-2">
            Explore our specialized editing verticals. Hover any card for live audio, click for cinema player, or click 'View All Work' to open full niche archives.
          </p>
        </div>

        {/* 6 Niches Stream Blocks */}
        <div className="space-y-10">
          {Object.entries(NICHES_DATA).map(([key, niche]) => {
            const vertItems = [...niche.vertical, ...niche.vertical, ...niche.vertical];
            const horizItems = [...niche.horizontal, ...niche.horizontal, ...niche.horizontal];

            return (
              <div
                key={key}
                className="bg-[#ffffff] border border-[#eeece4] rounded-3xl p-6 sm:p-8 shadow-sm transition-all hover:border-[#537568]/30"
              >
                {/* Niche Block Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#eeece4]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#537568]/10 flex items-center justify-center shrink-0">
                      {getNicheIcon(niche.iconName)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#242b27]">
                        {niche.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#748078] mt-0.5 max-w-xl">
                        {niche.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundEngine.playPop();
                      setActiveNicheKey(key);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#eeece4]/80 hover:bg-[#537568] hover:text-white text-[#242b27] text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer self-start sm:self-auto"
                  >
                    <span>View All Work ({niche.vertical.length + niche.horizontal.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Niche Sliders Container */}
                <div className="space-y-4 select-none">
                  {/* Vertical Stream */}
                  {niche.vertical.length > 0 && (
                    <div className="relative overflow-hidden py-1">
                      <div className="flex gap-4 w-max animate-marquee-left hover:[animation-play-state:paused]">
                        {vertItems.map((item, idx) => (
                          <div
                            key={`vert-stream-${key}-${item.id}-${idx}`}
                            onMouseEnter={(e) => handleCardHover(`niche-v-${idx}`, e)}
                            onMouseLeave={handleCardLeave}
                            onClick={() => {
                              soundEngine.playWhoosh();
                              onSelectVideo(item);
                            }}
                            className="relative w-40 sm:w-44 aspect-[9/16] rounded-2xl overflow-hidden bg-[#000000] border border-[#537568]/30 shadow-sm cursor-pointer group shrink-0 transition-transform duration-300 hover:scale-[1.03] hover:border-[#537568]"
                          >
                            <video
                              src={item.previewUrl}
                              poster={item.poster}
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-2.5 flex flex-col justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                              <span className="self-start px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-bold text-white">
                                9:16
                              </span>
                              <div className="text-[11px] font-bold text-white line-clamp-2">
                                {item.title}
                              </div>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                              <div className="w-9 h-9 rounded-full bg-white text-[#537568] flex items-center justify-center shadow">
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Horizontal Stream */}
                  {niche.horizontal.length > 0 && (
                    <div className="relative overflow-hidden py-1">
                      <div className="flex gap-4 w-max animate-marquee-right hover:[animation-play-state:paused]">
                        {horizItems.map((item, idx) => (
                          <div
                            key={`horiz-stream-${key}-${item.id}-${idx}`}
                            onMouseEnter={(e) => handleCardHover(`niche-h-${idx}`, e)}
                            onMouseLeave={handleCardLeave}
                            onClick={() => {
                              soundEngine.playWhoosh();
                              onSelectVideo(item);
                            }}
                            className="relative w-60 sm:w-64 aspect-video rounded-2xl overflow-hidden bg-[#000000] border border-[#537568]/30 shadow-sm cursor-pointer group shrink-0 transition-transform duration-300 hover:scale-[1.03] hover:border-[#537568]"
                          >
                            <video
                              src={item.previewUrl}
                              poster={item.poster}
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-3 flex flex-col justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                              <span className="self-start px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-bold text-white">
                                16:9
                              </span>
                              <div className="text-xs font-bold text-white line-clamp-1">
                                {item.title}
                              </div>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                              <div className="w-10 h-10 rounded-full bg-white text-[#537568] flex items-center justify-center shadow">
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
