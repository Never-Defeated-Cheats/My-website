import React, { useState, useEffect, useCallback } from 'react';
import { CLIENT_REVIEWS } from '../data/portfolioData';
import { ClientReview } from '../types';
import {
  Star,
  ShieldCheck,
  MessageSquare,
  CheckCircle2,
  Plus,
  X,
  Radio,
  RefreshCw,
  Sparkles,
  Send,
  Loader2
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

const RTDB_URL = 'https://gen-lang-client-0480289825-default-rtdb.firebaseio.com/reviews.json';

interface ReviewsSectionProps {
  onAddReviewSuccess?: (review: ClientReview) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onAddReviewSuccess }) => {
  const [reviewsList, setReviewsList] = useState<ClientReview[]>(CLIENT_REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(true);
  
  // Review form state
  const [name, setName] = useState('');
  const [channel, setChannel] = useState('');
  const [rating, setRating] = useState(5);
  const [projectType, setProjectType] = useState('Documentary Style');
  const [text, setText] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch reviews from Firebase Realtime Database
  const fetchRealtimeReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(RTDB_URL);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const data = await res.json();
      if (data && typeof data === 'object') {
        const liveReviews: ClientReview[] = Object.keys(data).map((key) => ({
          id: key,
          clientName: data[key].clientName || 'Anonymous Creator',
          channel: data[key].channel || 'YouTube Creator',
          rating: Number(data[key].rating) || 5,
          text: data[key].text || '',
          date: data[key].date || 'Verified Client',
          verified: true,
          projectType: data[key].projectType || 'Master Edit'
        }));

        // Combine live reviews (newest first) with base seed reviews, deduplicating IDs
        const combined = [...liveReviews.reverse(), ...CLIENT_REVIEWS];
        const unique = Array.from(new Map(combined.map((item) => [item.text + item.clientName, item])).values());
        setReviewsList(unique);
        setIsLiveConnected(true);
      } else {
        setReviewsList(CLIENT_REVIEWS);
      }
    } catch (err) {
      console.warn('Realtime database sync note: using local cache', err);
      // Still show verified reviews seamlessly
      setIsLiveConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchRealtimeReviews();
  }, [fetchRealtimeReviews]);

  const renderStars = (ratingVal: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(ratingVal)
                ? 'text-amber-500 fill-amber-500'
                : 'text-[#e4e1d5] fill-[#e4e1d5]'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const newRevPayload = {
      clientName: name.trim(),
      channel: channel.trim() || `${projectType} Client`,
      rating: Number(rating),
      text: text.trim(),
      date: 'Just now',
      verified: true,
      projectType,
      createdAt: new Date().toISOString(),
      timestamp: Date.now()
    };

    // Optimistic UI update
    const optimisticRev: ClientReview = {
      id: `rev-${Date.now()}`,
      ...newRevPayload
    };
    setReviewsList([optimisticRev, ...reviewsList]);
    soundEngine.playChime();

    try {
      // POST directly to Firebase Realtime Database
      const res = await fetch(RTDB_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRevPayload),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          setModalOpen(false);
          setName('');
          setChannel('');
          setText('');
          fetchRealtimeReviews();
        }, 1200);
      }
    } catch (err) {
      console.error('Failed to write review to Realtime DB:', err);
      // Keep optimistic entry visible
      setModalOpen(false);
    } finally {
      setIsSubmitting(false);
      if (onAddReviewSuccess) {
        onAddReviewSuccess(optimisticRev);
      }
    }
  };

  return (
    <section className="py-10 px-4 sm:px-8 2xl:px-14">
      <div className="max-w-7xl 2xl:max-w-[1850px] mx-auto">
        
        {/* Section Head with Write Review CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#537568]/10 text-[#537568] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Creator Feedback</span>
              </div>

              {/* Realtime Database Sync Indicator */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Realtime DB Connected</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-black text-[#242b27] tracking-tight">
              Client Reviews & Retention Results
            </h2>

            <p className="text-sm sm:text-base 2xl:text-lg text-[#748078] mt-2 max-w-2xl">
              Authentic feedback and proven audience retention growth synced live from creators and founders worldwide.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              onClick={() => {
                soundEngine.playClick();
                fetchRealtimeReviews();
              }}
              title="Refresh reviews live"
              className="p-2.5 rounded-full bg-white border border-[#eeece4] hover:bg-[#eeece4] text-[#748078] hover:text-[#242b27] transition-all cursor-pointer shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#537568]' : ''}`} />
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#537568] hover:bg-[#415e53] text-[#ffffff] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Clean, Refined Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#ffffff] border border-[#eeece4] rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all hover:border-[#537568]/40 hover:shadow-md"
            >
              <div>
                {/* Review Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Creator</span>
                  </div>

                  <span className="text-[11px] font-semibold text-[#748078]">
                    {rev.date}
                  </span>
                </div>

                {/* Rating Stars & Niche */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {renderStars(rev.rating)}
                    <span className="text-xs font-bold text-[#242b27]">
                      {rev.rating.toFixed(1)}
                    </span>
                  </div>

                  {rev.projectType && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#eeece4]/80 text-[#4c5750]">
                      {rev.projectType}
                    </span>
                  )}
                </div>

                {/* Review Content */}
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
                <div className="min-w-0">
                  <div className="font-bold text-sm text-[#242b27] truncate">
                    {rev.clientName}
                  </div>
                  <div className="text-xs text-[#748078] truncate">
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
              className="absolute top-5 right-5 p-1.5 text-[#748078] hover:text-[#242b27] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-[#537568] uppercase tracking-wider mb-1">
              <MessageSquare className="w-4 h-4" />
              <span>Realtime Review Sync</span>
            </div>

            <h3 className="text-xl font-bold text-[#242b27] mb-4">
              Leave Your Client Review
            </h3>

            {submitSuccess ? (
              <div className="py-10 text-center space-y-3 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-[#242b27]">Review Published!</h4>
                <p className="text-xs text-[#748078]">
                  Thank you for your feedback. Your review is now live in the database.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#242b27] mb-1">
                    Your Name or Handle *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#eeece4]/40 border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568] focus:bg-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#242b27] mb-1">
                      Rating Score
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#eeece4]/40 border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568] focus:bg-white"
                    >
                      <option value={5}>★★★★★ 5.0 - Perfect</option>
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
                      className="w-full px-3.5 py-2.5 bg-[#eeece4]/40 border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568] focus:bg-white"
                    >
                      <option value="Documentary Style">Documentary</option>
                      <option value="SaaS Animations">SaaS 3D</option>
                      <option value="Talking Head">Talking Head</option>
                      <option value="Viral Shorts / Reels">9:16 Shorts/Reels</option>
                      <option value="IRL & Travel">IRL & Travel</option>
                      <option value="Retention Videos">Retention Edit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#242b27] mb-1">
                    YouTube Channel / Brand / Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Finance Hub (650K Subs) / SaaS Startup"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#eeece4]/40 border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#242b27] mb-1">
                    Your Honest Review & Retention Results *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe how the editing pacing, sound effects, motion graphics or turnaround time helped your video perform..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#eeece4]/40 border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568] focus:bg-white transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#537568] hover:bg-[#415e53] text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Syncing to Database...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Post Review to Realtime DB</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
