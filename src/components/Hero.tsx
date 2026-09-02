import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Sparkles, TrendingUp, CheckCircle, Star } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface HeroProps {
  onExploreWork: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenBooking }) => {
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
    <section className="pt-6 pb-14 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Live Status Pill with Radar Pulse */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#ffffff] border border-emerald-500/30 shadow-sm mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-emerald-800 tracking-wide">
            Available for New Work & Retainers
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#242b27] tracking-tight leading-[1.15] mb-6 max-w-4xl">
          Crafting visual stories with{' '}
          <span className="text-[#537568] border-b-4 border-[#537568]/30 pb-1">
            high retention
          </span>{' '}
          & cinematic flow.
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-[#4c5750] leading-relaxed max-w-2xl mb-8">
          Hey, I'm <strong className="text-[#242b27] font-bold">Creative Vibe</strong> — a freelance video editor helping top YouTubers, SaaS brands, and creators transform raw footage into captivating, high-converting visual masterpieces.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-14">
          <button
            onClick={() => {
              soundEngine.playPop();
              onExploreWork();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#537568] hover:bg-[#415e53] text-[#ffffff] font-bold text-sm sm:text-base rounded-full shadow-lg shadow-[#537568]/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore All Niches & Works</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundEngine.playWhoosh();
              onOpenBooking();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-[#ffffff] hover:bg-[#eeece4] border border-[#eeece4] text-[#242b27] font-bold text-sm sm:text-base rounded-full shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#537568]" />
            <span>Book an Appointment</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 w-full max-w-4xl">
          
          <div className="bg-[#ffffff] border border-[#eeece4] rounded-2xl p-5 shadow-sm text-center transition-all hover:border-[#537568]/40 hover:shadow-md">
            <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-black text-[#242b27] mb-1">
              <TrendingUp className="w-5 h-5 text-[#537568] inline" />
              <span>{animatedViews}M+</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#748078]">
              Total Views Generated
            </div>
          </div>

          <div className="bg-[#ffffff] border border-[#eeece4] rounded-2xl p-5 shadow-sm text-center transition-all hover:border-[#537568]/40 hover:shadow-md">
            <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-black text-[#242b27] mb-1">
              <CheckCircle className="w-5 h-5 text-[#537568] inline" />
              <span>{animatedProjects}+</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#748078]">
              Master Videos Edited
            </div>
          </div>

          <div className="bg-[#ffffff] border border-[#eeece4] rounded-2xl p-5 shadow-sm text-center transition-all hover:border-[#537568]/40 hover:shadow-md">
            <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-black text-[#242b27] mb-1">
              <Sparkles className="w-5 h-5 text-[#537568] inline" />
              <span>{animatedRetention}%</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#748078]">
              Avg. Watch Retention
            </div>
          </div>

          <div className="bg-[#ffffff] border border-[#eeece4] rounded-2xl p-5 shadow-sm text-center transition-all hover:border-[#537568]/40 hover:shadow-md">
            <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-black text-[#242b27] mb-1">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 inline" />
              <span>{animatedRating}★</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#748078]">
              Top Client Rating
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
