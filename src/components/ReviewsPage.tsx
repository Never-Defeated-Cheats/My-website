import React, { useState } from 'react';
import { ClientReview } from '../types';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Plus,
  TrendingUp,
  Award,
  Filter,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface ReviewsPageProps {
  reviewsList: ClientReview[];
  onOpenReviewModal: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  reviewsList,
  onOpenReviewModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Reviews' },
    { id: 'Documentary Style', label: 'Documentary Style' },
    { id: 'SaaS Animations', label: 'SaaS Animations' },
    { id: 'Talking Head & Podcast', label: 'Talking Head & Podcasts' },
    { id: 'Viral Shorts & Reels', label: 'Viral Shorts & Reels' },
    { id: 'IRL & Travel', label: 'IRL & Travel' },
  ];

  const filteredReviews = selectedCategory === 'all'
    ? reviewsList
    : reviewsList.filter((r) => r.projectType?.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(r.projectType?.toLowerCase() || ''));

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
    <div className="py-8 sm:py-12 px-3 sm:px-8 2xl:px-14 flex-grow animate-in fade-in duration-300">
      <div className="max-w-7xl 2xl:max-w-[1850px] mx-auto">

        {/* Header Title with Leave a Review Action */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#537568]/10 dark:bg-[#537568]/20 text-[#537568] dark:text-[#50b38c] text-xs font-bold uppercase tracking-wider mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>All Verified Client Testimonials</span>
          </div>

          <h1 className="text-2xl sm:text-4xl 2xl:text-5xl font-black text-[#242b27] dark:text-[#f2f7f4] tracking-tight uppercase">
            All Clients Reviews & Feedback
          </h1>

          <p className="text-xs sm:text-base 2xl:text-lg text-[#748078] dark:text-[#97a69f] mt-2.5 sm:mt-3 px-2">
            Explore authentic ratings, growth results, and retention feedback from Social media Creators, Media agencies and Brands.
          </p>

          <div className="mt-5 flex justify-center">
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenReviewModal();
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#537568] hover:bg-[#415e53] text-white font-bold text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Rating Metrics Highlight Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-[#ffffff] dark:bg-[#121815] border border-[#eeece4] dark:border-[#1e2b24] rounded-2xl p-5 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-black text-[#242b27] dark:text-[#f2f7f4] mb-1">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 inline" />
              <span>5.0</span>
            </div>
            <div className="text-xs font-semibold text-[#748078] dark:text-[#8ea096]">
              Average Client Rating
            </div>
          </div>

          <div className="bg-[#ffffff] dark:bg-[#121815] border border-[#eeece4] dark:border-[#1e2b24] rounded-2xl p-5 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-black text-[#242b27] dark:text-[#f2f7f4] mb-1">
              <TrendingUp className="w-5 h-5 text-[#537568] dark:text-[#50b38c] inline" />
              <span>65%+</span>
            </div>
            <div className="text-xs font-semibold text-[#748078] dark:text-[#8ea096]">
              Audience Watch Retention
            </div>
          </div>

          <div className="bg-[#ffffff] dark:bg-[#121815] border border-[#eeece4] dark:border-[#1e2b24] rounded-2xl p-5 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-black text-[#242b27] dark:text-[#f2f7f4] mb-1">
              <Award className="w-5 h-5 text-[#537568] dark:text-[#50b38c] inline" />
              <span>100%</span>
            </div>
            <div className="text-xs font-semibold text-[#748078] dark:text-[#8ea096]">
              On-Time Project Delivery
            </div>
          </div>

          <div className="bg-[#ffffff] dark:bg-[#121815] border border-[#eeece4] dark:border-[#1e2b24] rounded-2xl p-5 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-black text-[#242b27] dark:text-[#f2f7f4] mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 inline" />
              <span>180+</span>
            </div>
            <div className="text-xs font-semibold text-[#748078] dark:text-[#8ea096]">
              Master Videos Published
            </div>
          </div>
        </div>

        {/* Category Filters Pill Strip */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          <div className="flex items-center gap-1 text-xs font-semibold text-[#748078] dark:text-[#8ea096] mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter by Niche:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundEngine.playPop();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#537568] text-white shadow-sm'
                  : 'bg-[#ffffff] dark:bg-[#121815] border border-[#eeece4] dark:border-[#1e2b24] text-[#4c5750] dark:text-[#b8c7bf] hover:bg-[#f6f5f0] dark:hover:bg-[#19221d]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Full Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#ffffff] dark:bg-[#121815] border border-[#eeece4] dark:border-[#1e2b24] rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all hover:border-[#537568]/40 hover:shadow-md"
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
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#eeece4]/80 dark:bg-[#1a241f] text-[#4c5750] dark:text-[#a1b8ac]">
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
              <div className="flex items-center gap-3 pt-4 border-t border-[#eeece4] dark:border-[#1e2b24]">
                <div className="w-10 h-10 rounded-full bg-[#537568]/10 dark:bg-[#537568]/20 text-[#537568] dark:text-[#50b38c] font-bold text-xs flex items-center justify-center border border-[#537568]/20 dark:border-[#537568]/30 shrink-0">
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
        </div>

      </div>
    </div>
  );
};
