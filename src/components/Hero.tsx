import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Sparkles, TrendingUp, CheckCircle, Star } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface HeroProps {
  onExploreWork: () => void;
  onViewPricing?: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreWork,
  onViewPricing,
  onOpenBooking,
}) => {
  const [animatedViews, setAnimatedViews] = useState(0);
  const [animatedProjects, setAnimatedProjects] = useState(0);
  const [animatedRetention, setAnimatedRetention] = useState(0);
  const [animatedRating, setAnimatedRating] = useState(0);

  useEffect(() => {
    // Single-pass easeOutExpo counter animation
    const duration = 1800;
    const startTime = performance.now();
    let frameId: number;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setAnimatedViews(Math.round(50 * ease));
      setAnimatedProjects(Math.round(180 * ease));
      setAnimatedRetention(Math.round(72 * ease));
      setAnimatedRating(Number((4.9 * ease).toFixed(1)));

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      } else {
        setAnimatedViews(50);
        setAnimatedProjects(180);
        setAnimatedRetention(72);
        setAnimatedRating(4.9);
      }
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section id="home" className="pt-8 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-8 2xl:px-14 scroll-mt-24">
      <div className="max-w-6xl 2xl:max-w-[1750px] mx-auto text-center flex flex-col items-center">
        
        {/* Status Pill */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#ffffff] dark:bg-[#18201c] border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 tracking-wide">
              Available for New Projects & Retainers
            </span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-black text-[#242b27] dark:text-[#f2f7f4] tracking-tight leading-[1.12] mb-6 max-w-4xl 2xl:max-w-6xl">
          Crafting visual stories with{' '}
          <span className="text-[#3d7560] dark:text-[#5fcb9d] border-b-4 border-[#537568]/30 dark:border-[#5fcb9d]/30 pb-1">
            high retention
          </span>{' '}
          & cinematic flow.
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg 2xl:text-xl text-[#4c5750] dark:text-[#a2b5ab] leading-relaxed max-w-2xl 2xl:max-w-4xl mb-10">
          Hey, I'm <strong className="text-[#3d7560] dark:text-[#5fcb9d] font-extrabold">Creative Vibe</strong> — a freelance video editor helping Social media Creators, Media agencies and Brands transform raw footage into captivating, high-converting visual masterpieces.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-12">
          <button
            onClick={() => {
              soundEngine.playPop();
              onExploreWork();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#537568] hover:bg-[#436257] text-white font-semibold text-sm rounded-full shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span>Explore Work</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onViewPricing && (
            <button
              onClick={() => {
                soundEngine.playPop();
                onViewPricing();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-[#1f2823] hover:bg-[#faf9f5] dark:hover:bg-[#28352e] border border-[#dcd9ce] dark:border-[#2e3b33] text-[#242b27] dark:text-[#f2f7f4] hover:text-[#537568] dark:hover:text-[#5fcb9d] font-semibold text-sm rounded-full shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer active:scale-[0.98]"
            >
              <span>View Pricing & Rates</span>
              <ArrowRight className="w-4 h-4 text-[#537568] dark:text-[#5fcb9d]" />
            </button>
          )}

          <button
            onClick={() => {
              soundEngine.playWhoosh();
              onOpenBooking();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#eeece4]/80 dark:bg-[#222c26] hover:bg-[#e4e1d5] dark:hover:bg-[#2c3931] text-[#242b27] dark:text-[#f2f7f4] hover:text-[#537568] dark:hover:text-[#5fcb9d] font-semibold text-sm rounded-full shadow-sm transition-all duration-200 cursor-pointer active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4 text-[#537568] dark:text-[#5fcb9d]" />
            <span>Book a Meeting</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 2xl:gap-8 w-full max-w-4xl 2xl:max-w-6xl">
          
          <div className="bg-[#ffffff] dark:bg-[#18201c] border border-[#eeece4] dark:border-[#26332b] rounded-2xl p-5 shadow-sm text-center transition-all hover:border-[#537568]/40 hover:shadow-md">
            <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-black text-[#242b27] dark:text-[#f2f7f4] mb-1">
              <TrendingUp className="w-5 h-5 text-[#537568] dark:text-[#5fcb9d] inline" />
              <span>{animatedViews}M+</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#748078] dark:text-[#8ea096]">
              Total Views Generated
            </div>
          </div>

          <div className="bg-[#ffffff] dark:bg-[#18201c] border border-[#eeece4] dark:border-[#26332b] rounded-2xl p-5 shadow-sm text-center transition-all hover:border-[#537568]/40 hover:shadow-md">
            <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-black text-[#242b27] dark:text-[#f2f7f4] mb-1">
              <CheckCircle className="w-5 h-5 text-[#537568] dark:text-[#5fcb9d] inline" />
              <span>{animatedProjects}+</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#748078] dark:text-[#8ea096]">
              Master Videos Edited
            </div>
          </div>

          <div className="bg-[#ffffff] dark:bg-[#18201c] border border-[#eeece4] dark:border-[#26332b] rounded-2xl p-5 shadow-sm text-center transition-all hover:border-[#537568]/40 hover:shadow-md">
            <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-black text-[#242b27] dark:text-[#f2f7f4] mb-1">
              <Sparkles className="w-5 h-5 text-[#537568] dark:text-[#5fcb9d] inline" />
              <span>{animatedRetention}%</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#748078] dark:text-[#8ea096]">
              Avg. Watch Retention
            </div>
          </div>

          <div className="bg-[#ffffff] dark:bg-[#18201c] border border-[#eeece4] dark:border-[#26332b] rounded-2xl p-5 shadow-sm text-center transition-all hover:border-[#537568]/40 hover:shadow-md">
            <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-black text-[#242b27] dark:text-[#f2f7f4] mb-1">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 inline" />
              <span>{animatedRating}★</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#748078] dark:text-[#8ea096]">
              Top Client Rating
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
