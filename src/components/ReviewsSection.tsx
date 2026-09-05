import React from 'react';
import { ClientReview } from '../types';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface ReviewsSectionProps {
  reviewsList: ClientReview[];
  onOpenReviewModal: () => void;
  onViewAllReviews: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviewsList,
  onOpenReviewModal,
  onViewAllReviews,
}) => {
  // Strictly maximum 8 reviews on the Home page
  const homeDisplayReviews = reviewsList.slice(0, 8);
  const remainingCount = Math.max(4, reviewsList.length - 8);

  const renderStars = (ratingVal: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(ratingVal)
                ? 'text-amber-500 fill-amber-500'
                : 'text-[#e4e1d5] dark:text-[#334239] fill-[#e4e1d5] dark:fill-[#334239]'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="reviews" className="py-12 px-4 sm:px-8 2xl:px-14 scroll-mt-24">
      <div className="max-w-7xl 2xl:max-w-[1850px] mx-auto">
        
        {/* Section Head with Write Review CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#537568]/10 dark:bg-[#537568]/20 text-[#537568] dark:text-[#5fcb9d] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Creator Feedback</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-black text-[#242b27] dark:text-[#f2f7f4] tracking-tight">
              Client Reviews & Retention Results
            </h2>

            <p className="text-sm sm:text-base text-[#748078] dark:text-[#9bb0a4] mt-2 max-w-2xl">
              Honest ratings and production feedback from Social media Creators, Media agencies and Brands working with Creative Vibe.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenReviewModal();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#537568] hover:bg-[#436257] text-[#ffffff] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Clean, Refined Reviews Grid: Exactly 8 Reviews + 1 "See More Reviews" CTA Card (3x3 Perfect Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeDisplayReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#ffffff] dark:bg-[#18201c] border border-[#eeece4] dark:border-[#26332b] rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all hover:border-[#537568]/40 hover:shadow-md"
            >
              <div>
                {/* Review Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Verified Creator</span>
                  </div>

                  <span className="text-[11px] font-semibold text-[#748078] dark:text-[#8ea096]">
                    {rev.date}
                  </span>
                </div>

                {/* Rating Stars & Niche */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {renderStars(rev.rating)}
                    <span className="text-xs font-bold text-[#242b27] dark:text-[#f2f7f4]">
                      {rev.rating.toFixed(1)}
                    </span>
                  </div>

                  {rev.projectType && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#eeece4]/80 dark:bg-[#202a24] text-[#4c5750] dark:text-[#a1b8ac]">
                      {rev.projectType}
                    </span>
                  )}
                </div>

                {/* Review Content */}
                <p className="text-sm text-[#4c5750] dark:text-[#b4c7bd] leading-relaxed mb-6 italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#eeece4] dark:border-[#26332b]">
                <div className="w-10 h-10 rounded-full bg-[#537568]/10 dark:bg-[#537568]/20 text-[#537568] dark:text-[#5fcb9d] font-bold text-xs flex items-center justify-center border border-[#537568]/20 dark:border-[#537568]/30 shrink-0">
                  {rev.clientName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm text-[#242b27] dark:text-[#f2f7f4] truncate">
                    {rev.clientName}
                  </div>
                  <div className="text-xs text-[#748078] dark:text-[#8ea096] truncate">
                    {rev.channel}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* 9th Slot Card: Prominent "See More Reviews" CTA Button Card */}
          <div
            onClick={() => {
              soundEngine.playPop();
              onViewAllReviews();
            }}
            className="bg-gradient-to-br from-[#537568]/15 via-[#ffffff] dark:via-[#18201c] to-[#ffffff] dark:to-[#18201c] border-2 border-dashed border-[#537568]/35 dark:border-[#537568]/45 rounded-2xl p-6 shadow-sm flex flex-col justify-between items-center text-center group hover:border-[#537568] hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center justify-center my-auto py-2">
              <div className="w-13 h-13 rounded-full bg-[#537568]/15 dark:bg-[#537568]/25 text-[#3d7560] dark:text-[#5fcb9d] flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform shadow-inner">
                <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
              </div>

              <div className="text-lg sm:text-xl font-black text-[#242b27] dark:text-[#f2f7f4] mb-1.5">
                +{remainingCount} More Verified Reviews
              </div>

              <p className="text-xs sm:text-sm text-[#748078] dark:text-[#9bb0a4] max-w-[240px] leading-relaxed mb-5">
                Explore complete channel retention curves, case studies, and creator testimonials.
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playPop();
                  onViewAllReviews();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#537568] hover:bg-[#436257] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer transform group-hover:scale-105 active:scale-95"
              >
                <span>See All Client Reviews</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[11px] font-semibold text-[#537568] dark:text-[#5fcb9d] pt-3 border-t border-[#eeece4] dark:border-[#26332b] w-full">
              5.0 Star Rating Across 100% of Projects
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
