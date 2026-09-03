import React, { useState } from 'react';
import { VideoItem } from '../types';
import { NICHES_DATA } from '../data/portfolioData';
import { Mic, Film, Laptop, Zap, Plane, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { AutoplayVideoCard } from './AutoplayVideoCard';

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

  // If a specific niche is opened in dedicated archive mode
  if (activeNicheKey && NICHES_DATA[activeNicheKey]) {
    const niche = NICHES_DATA[activeNicheKey];
    const vertList = niche.vertical;
    const horizList = niche.horizontal;
    const totalCount = vertList.length + horizList.length;

    const show169 = formatFilter === 'all' || formatFilter === '16:9';
    const show916 = formatFilter === 'all' || formatFilter === '9:16';

    return (
      <div className="py-8 px-4 sm:px-8 2xl:px-14">
        <div className="max-w-7xl 2xl:max-w-[1850px] mx-auto bg-[#ffffff] border border-[#eeece4] rounded-3xl p-6 sm:p-10 2xl:p-14 shadow-sm animate-in fade-in">
          
          {/* Header with Back button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#eeece4] mb-8">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveNicheKey(null);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#eeece4]/80 hover:bg-[#537568] hover:text-[#ffffff] text-sm font-bold text-[#242b27] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Niches</span>
            </button>

            <div className="flex items-center gap-3 text-left sm:text-right">
              <div className="w-12 h-12 rounded-2xl bg-[#537568]/10 flex items-center justify-center shrink-0">
                {getNicheIcon(niche.iconName)}
              </div>
              <div>
                <h2 className="text-xl sm:text-3xl font-black text-[#242b27]">
                  {niche.name} Archive
                </h2>
                <p className="text-xs sm:text-base text-[#748078]">
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
            <div className="mb-12">
              <h3 className="text-base sm:text-lg font-bold text-[#242b27] flex items-center gap-2 mb-5">
                <Film className="w-5 h-5 text-[#537568]" />
                <span>16:9 Long-Form Master Edits ({horizList.length})</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {horizList.map((item) => (
                  <AutoplayVideoCard
                    key={item.id}
                    item={item}
                    aspectRatio="16:9"
                    badgeTop="16:9 Cinema"
                    onSelect={onSelectVideo}
                    className="rounded-2xl shadow-sm"
                  />
                ))}
              </div>
            </div>
          )}

          {/* 9:16 Vertical Videos Grid */}
          {show916 && vertList.length > 0 && (
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#242b27] flex items-center gap-2 mb-5">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>9:16 Viral Shorts & Reels ({vertList.length})</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
                {vertList.map((item) => (
                  <AutoplayVideoCard
                    key={item.id}
                    item={item}
                    aspectRatio="9:16"
                    badgeTop="9:16"
                    onSelect={onSelectVideo}
                    className="rounded-2xl shadow-sm"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Book Niche Project CTA */}
          <div className="mt-14 p-6 sm:p-8 bg-[#eeece4]/50 border border-[#e4e1d5] rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-bold text-base sm:text-lg text-[#242b27]">
                Ready to edit your next {niche.name} project?
              </div>
              <div className="text-xs sm:text-sm text-[#748078] mt-1">
                Fast turnarounds, authentic sound design, and maximum audience retention.
              </div>
            </div>

            {onOpenBookingWithPlan && (
              <button
                onClick={() => {
                  soundEngine.playWhoosh();
                  onOpenBookingWithPlan(niche.name);
                }}
                className="px-5 py-2.5 bg-[#537568] hover:bg-[#436257] text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
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
    <section className="py-8 px-4 sm:px-8 2xl:px-14">
      <div className="max-w-7xl 2xl:max-w-[1850px] mx-auto">
        
        {/* Section Head */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#537568]/10 text-[#537568] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Film className="w-3.5 h-3.5" />
            <span>Curated Editing Niches</span>
          </div>

          <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-black text-[#242b27] tracking-tight">
            All Specialized Niches & Works
          </h2>

          <p className="text-sm sm:text-base 2xl:text-lg text-[#748078] mt-3">
            Explore our specialized editing verticals with auto-playing previews and full music audio. Hover any card to pause slide motion; tap to open in Cinema Player, or click 'View All Work' to browse full archives.
          </p>
        </div>

        {/* 6 Niches Stream Blocks */}
        <div className="space-y-12">
          {Object.entries(NICHES_DATA).map(([key, niche]) => {
            const vertItems = [
              ...niche.vertical,
              ...niche.vertical,
              ...niche.vertical,
            ];
            const horizItems = [
              ...niche.horizontal,
              ...niche.horizontal,
              ...niche.horizontal,
            ];

            return (
              <div
                key={key}
                className="bg-[#ffffff] border border-[#eeece4] rounded-3xl p-6 sm:p-10 2xl:p-12 shadow-sm transition-all hover:border-[#537568]/30"
              >
                {/* Niche Block Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#eeece4]">
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 rounded-2xl bg-[#537568]/10 flex items-center justify-center shrink-0">
                      {getNicheIcon(niche.iconName)}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#242b27]">
                        {niche.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#748078] mt-1 max-w-2xl">
                        {niche.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundEngine.playPop();
                      setActiveNicheKey(key);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#eeece4]/80 hover:bg-[#537568] hover:text-white text-[#242b27] text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer self-start sm:self-auto shadow-sm"
                  >
                    <span>View All Work ({niche.vertical.length + niche.horizontal.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Niche Sliders Container */}
                <div className="space-y-6 select-none">
                  {/* Vertical Stream */}
                  {niche.vertical.length > 0 && (
                    <div className="marquee-row relative overflow-hidden py-1">
                      <div className="flex gap-4 2xl:gap-6 w-max animate-marquee-left">
                        {vertItems.map((item, idx) => (
                          <AutoplayVideoCard
                            key={`vert-stream-${key}-${item.id}-${idx}`}
                            item={item}
                            aspectRatio="9:16"
                            badgeTop="9:16"
                            onSelect={onSelectVideo}
                            className="w-40 sm:w-44 2xl:w-52 rounded-2xl"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Horizontal Stream */}
                  {niche.horizontal.length > 0 && (
                    <div className="marquee-row relative overflow-hidden py-1">
                      <div className="flex gap-4 2xl:gap-6 w-max animate-marquee-right">
                        {horizItems.map((item, idx) => (
                          <AutoplayVideoCard
                            key={`horiz-stream-${key}-${item.id}-${idx}`}
                            item={item}
                            aspectRatio="16:9"
                            badgeTop="16:9"
                            onSelect={onSelectVideo}
                            className="w-60 sm:w-64 2xl:w-80 rounded-2xl"
                          />
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
