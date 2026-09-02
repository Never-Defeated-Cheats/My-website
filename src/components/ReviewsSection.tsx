import React, { useState } from 'react';
import { CLIENT_REVIEWS } from '../data/portfolioData';
import { ClientReview } from '../types';
import { Star, ShieldCheck, MessageSquare, CheckCircle2, User, Plus, X } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface ReviewsSectionProps {
  onAddReviewSuccess?: (review: ClientReview) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onAddReviewSuccess }) => {
  const [reviewsList, setReviewsList] = useState<ClientReview[]>(CLIENT_REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Review form state
  const [name, setName] = useState('');
  const [channel, setChannel] = useState('');
  const [rating, setRating] = useState(5);
  const [projectType, setProjectType] = useState('Documentary Style');
  const [text, setText] = useState('');

  const renderStars = (ratingVal: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(ratingVal)
                ? 'text-amber-500 fill-amber-500'
                : 'text-[#eeece4] fill-[#eeece4]'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newRev: ClientReview = {
      id: `rev-${Date.now()}`,
      clientName: name.trim(),
      channel: channel.trim() || `${projectType} Client`,
      rating: Number(rating),
      text: text.trim(),
      date: 'Just now',
      verified: true,
      projectType
    };

    setReviewsList([newRev, ...reviewsList]);
    soundEngine.playChime();
    setModalOpen(false);
    setName('');
    setChannel('');
    setText('');

    if (onAddReviewSuccess) {
      onAddReviewSuccess(newRev);
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Head with Write Review CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#537568]/10 text-[#537568] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Creator Feedback</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#242b27] tracking-tight">
              Client Reviews & Retention Results
            </h2>

            <p className="text-sm sm:text-base text-[#748078] mt-1 max-w-xl">
              Authentic feedback and proven audience retention growth from YouTubers, SaaS founders, and creators worldwide.
            </p>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#537568] hover:bg-[#415e53] text-[#ffffff] font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#ffffff] border border-[#eeece4] rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-all hover:border-[#537568]/40 hover:shadow-md"
            >
              <div>
                {/* Review Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Client</span>
                  </div>

                  <span className="text-[11px] font-semibold text-[#748078]">
                    {rev.date}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-2 mb-4">
                  {renderStars(rev.rating)}
                  <span className="text-xs font-bold text-[#242b27]">
                    {rev.rating.toFixed(1)}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#4c5750] leading-relaxed mb-6 italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#eeece4]">
                <div className="w-10 h-10 rounded-full bg-[#537568]/10 text-[#537568] font-bold text-xs flex items-center justify-center border border-[#537568]/20 shrink-0">
                  {rev.clientName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#242b27]">
                    {rev.clientName}
                  </div>
                  <div className="text-xs text-[#748078] line-clamp-1">
                    {rev.channel}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#eeece4] shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-1 text-[#748078] hover:text-[#242b27] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-[#537568] uppercase tracking-wider mb-1">
              <MessageSquare className="w-4 h-4" />
              <span>Verified Creator Feedback</span>
            </div>

            <h3 className="text-xl font-bold text-[#242b27] mb-4">
              Leave Your Client Review
            </h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#242b27] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#eeece4]/50 border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#242b27] mb-1">
                    Rating
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-[#eeece4]/50 border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568] focus:bg-white"
                  >
                    <option value={5}>★★★★★ 5.0 - Outstanding</option>
                    <option value={4}>★★★★☆ 4.0 - Very Good</option>
                    <option value={3}>★★★☆☆ 3.0 - Good</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#242b27] mb-1">
                    Project Niche
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#eeece4]/50 border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568] focus:bg-white"
                  >
                    <option value="Documentary Style">Documentaries</option>
                    <option value="SaaS Animations">SaaS Animations</option>
                    <option value="Talking Head">Talking Head</option>
                    <option value="Viral Shorts / Reels">Shorts & Reels</option>
                    <option value="IRL & Travel">IRL & Travel</option>
                    <option value="Retention Videos">Retention Videos</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#242b27] mb-1">
                  YouTube Channel / Company Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. AeroTech Insights (480K Subs)"
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#eeece4]/50 border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#242b27] mb-1">
                  Your Review & Video Results *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How did the video pacing, motion graphics, retention hooks or sound design help your project?"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#eeece4]/50 border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#537568] hover:bg-[#415e53] text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                Publish Verified Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
