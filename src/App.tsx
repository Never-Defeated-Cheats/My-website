import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RecentEditsMarquee } from './components/RecentEditsMarquee';
import { ReviewsSection } from './components/ReviewsSection';
import { NichesPage } from './components/NichesPage';
import { ProcessPage } from './components/ProcessPage';
import { PricingPage } from './components/PricingPage';
import { ReviewsPage } from './components/ReviewsPage';
import { ReviewModal } from './components/ReviewModal';
import { BookingModal } from './components/BookingModal';
import { CinemaModal } from './components/CinemaModal';
import { Footer } from './components/Footer';
import { SecurityToast } from './components/SecurityToast';
import { VideoItem, PricingPlan, ToastMessage, ClientReview } from './types';
import { CLIENT_REVIEWS } from './data/portfolioData';
import { initSecurityMeasures } from './utils/security';
import { initPerformanceMonitor } from './utils/perfMonitor';
import { ThemeProvider } from './context/ThemeContext';

export type PageId = 'home' | 'work' | 'process' | 'pricing' | 'reviews';

const RTDB_URL = 'https://gen-lang-client-0480289825-default-rtdb.firebaseio.com/reviews.json';

export default function App() {
  // Read initial page from hash or pathname
  const getInitialPage = (): PageId => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#/, '').toLowerCase();
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      const target = hash || path;

      if (target === 'work' || target === 'niches') return 'work';
      if (target === 'process' || target === 'process-and-workflow' || target === 'workflow') return 'process';
      if (target === 'pricing') return 'pricing';
      if (target === 'reviews') return 'reviews';
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [activeTab, setActiveTab] = useState<string>(getInitialPage);
  const [reviewsList, setReviewsList] = useState<ClientReview[]>(CLIENT_REVIEWS);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingInitialPlan, setBookingInitialPlan] = useState<string>('Talking Head');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Add a toast notification
  const addToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', title?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, type, message, title };
    setToasts((prev) => [...prev.slice(-3), newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync initial reviews from Firebase Realtime Database
  useEffect(() => {
    const fetchRealtimeReviews = async () => {
      try {
        const res = await fetch(RTDB_URL);
        if (!res.ok) return;
        const data = await res.json();
        if (data && typeof data === 'object') {
          const liveReviews: ClientReview[] = Object.keys(data).map((key) => ({
            id: key,
            clientName: data[key].clientName || 'Anonymous Creator',
            channel: data[key].channel || 'Social Media Creator',
            rating: Number(data[key].rating) || 5,
            text: data[key].text || '',
            date: data[key].date || 'Verified Client',
            verified: true,
            projectType: data[key].projectType || 'Master Edit',
          }));

          const combined = [...liveReviews.reverse(), ...CLIENT_REVIEWS];
          const unique = Array.from(
            new Map(combined.map((item) => [item.text + item.clientName, item])).values()
          );
          setReviewsList(unique);
        }
      } catch (err) {
        console.warn('Realtime database sync note: using local cache', err);
      }
    };

    fetchRealtimeReviews();
  }, []);

  // Listen to browser popstate (back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      const page = getInitialPage();
      setCurrentPage(page);
      setActiveTab(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen to hash changes directly
  useEffect(() => {
    const handleHashChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
      setActiveTab(page);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dynamic SEO Metadata and Titles per page for Google Indexing
  useEffect(() => {
    const titles: Record<PageId, string> = {
      home: 'Creative Vibe | Freelance Video Editor & Retention Specialist | Best Video Editor for YouTube, SaaS & Reels',
      work: 'Specialized Video Editing Niches & Works | Creative Vibe',
      process: '5-Stage Video Editing Workflow & Quality Guarantee | Creative Vibe',
      pricing: 'Predictable Video Editing Rates & Pricing Plans | Creative Vibe',
      reviews: 'All Clients Reviews & Feedback | Creative Vibe'
    };

    const descriptions: Record<PageId, string> = {
      home: 'Looking for the best freelance video editor? Creative Vibe crafts viral retention edits for YouTube documentaries, SaaS 3D motion graphics, and high-impact Reels.',
      work: 'Explore Creative Vibe specialized editing niches: YouTube documentaries, 3D SaaS motion graphics, viral reels, talking heads, and cinematic color grading.',
      process: 'Discover our transparent 5-stage video editing workflow from raw footage ingestion to delivery and rapid revisions.',
      pricing: 'Transparent and predictable freelance video editing rates across 5 specialized niches. Fast 24-48h turnarounds.',
      reviews: 'Explore verified client reviews, retention feedback, and channel growth results from top creators and brands.'
    };

    if (titles[currentPage]) {
      document.title = titles[currentPage];
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && descriptions[currentPage]) {
      metaDesc.setAttribute('content', descriptions[currentPage]);
    }
  }, [currentPage]);

  // Sync URL clean paths whenever currentPage changes (supports both /page and #page)
  const navigateToPage = (page: PageId, smoothScroll = true) => {
    setCurrentPage(page);
    setActiveTab(page);

    const targetUrl = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetUrl && window.location.hash !== `#${page}`) {
      window.history.pushState(null, '', targetUrl);
    }

    if (smoothScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Safe tab change handler for Navbar
  const handleNavigate = (page: string) => {
    // If clicking reviews from home page, scroll smoothly to the home page's review section
    if (page === 'reviews' && currentPage === 'home') {
      const reviewSection = document.getElementById('reviews');
      if (reviewSection) {
        reviewSection.scrollIntoView({ behavior: 'smooth' });
        setActiveTab('home');
        return;
      }
    }

    if (page === 'home' || page === 'work' || page === 'process' || page === 'pricing' || page === 'reviews') {
      navigateToPage(page as PageId);
    }
  };

  // Direct transition to dedicated Reviews page (for "See All Client Reviews" button)
  const handleOpenReviewsPage = () => {
    setCurrentPage('reviews');
    setActiveTab('reviews');
    window.history.pushState(null, '', '/reviews');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Video Selection for Cinema Modal
  const handleSelectVideo = (video: VideoItem) => {
    setSelectedVideo(video);
  };

  // Handle Direct Plan Selection from Pricing Page
  const handleSelectPlan = (plan: PricingPlan) => {
    setBookingInitialPlan(plan.name);
    setIsBookingModalOpen(true);
  };

  // Handle Review Added callback
  const handleReviewAdded = (newReview: ClientReview) => {
    setReviewsList((prev) => [newReview, ...prev]);
    addToast('Your verified client review was published successfully!', 'success');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-[#f6f5f0] dark:bg-[#0a0f0d] text-[#4c5750] dark:text-[#a9beaf] relative overflow-x-clip transition-colors">
        
        {/* Ambient background soft radial spotlights with deeper dark glow */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-[#537568]/5 dark:bg-[#50b38c]/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#4f6878]/5 dark:bg-[#2e6b54]/12 blur-3xl" />
        </div>

        {/* Main Container */}
        <div className="relative z-10 flex flex-col flex-grow">
          
          {/* Top Sticky Navbar with 5 tabs in exact order: Home, Work, Process & Workflow, Pricing, Reviews */}
          <Navbar
            activeTab={activeTab}
            onTabChange={handleNavigate}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />

          {/* TAB 1: HOME PAGE (Hero, Showcase Marquee, 8-Review Curated Grid with "See All Reviews" card) */}
          {currentPage === 'home' && (
            <main className="flex-grow flex flex-col animate-in fade-in duration-300">
              {/* 1. Hero Section */}
              <Hero
                onExploreWork={() => handleNavigate('work')}
                onViewPricing={() => handleNavigate('pricing')}
                onOpenBooking={() => setIsBookingModalOpen(true)}
              />

              {/* 2. Quick Work Showcase Videos with dynamic circular tracks */}
              <RecentEditsMarquee
                onSelectVideo={handleSelectVideo}
                onExploreNiches={() => handleNavigate('work')}
                onViewPricing={() => handleNavigate('pricing')}
                onOpenBooking={() => setIsBookingModalOpen(true)}
              />

              {/* 3. Verified Client Reviews Section: max 8 reviews + 1 "See All Client Reviews" CTA card */}
              <ReviewsSection
                reviewsList={reviewsList}
                onOpenReviewModal={() => setIsReviewModalOpen(true)}
                onViewAllReviews={handleOpenReviewsPage}
              />
            </main>
          )}

          {/* TAB 2: WORK PAGE (All Specialized Niches & Works - Screenshot 5 & 6 design) */}
          {currentPage === 'work' && (
            <main className="flex-grow flex flex-col animate-in fade-in duration-300">
              <NichesPage
                onSelectVideo={handleSelectVideo}
                onOpenBooking={() => setIsBookingModalOpen(true)}
                onOpenBookingWithPlan={(planName) => {
                  setBookingInitialPlan(planName);
                  setIsBookingModalOpen(true);
                }}
              />
            </main>
          )}

          {/* TAB 3: PROCESS & WORKFLOW PAGE (5 Pipeline Stages, Quality Guarantee, Turnaround Tiers, Software Stack) */}
          {currentPage === 'process' && (
            <main className="flex-grow flex flex-col animate-in fade-in duration-300">
              <ProcessPage
                onOpenBooking={() => setIsBookingModalOpen(true)}
                onViewPricing={() => handleNavigate('pricing')}
              />
            </main>
          )}

          {/* TAB 4: PRICING PAGE (Screenshot 2: Predictable Editing Rates & Pricing Cards Only) */}
          {currentPage === 'pricing' && (
            <main className="flex-grow flex flex-col animate-in fade-in duration-300">
              <PricingPage
                onSelectPlan={handleSelectPlan}
                onOpenBooking={() => setIsBookingModalOpen(true)}
              />
            </main>
          )}

          {/* TAB 5: REVIEWS PAGE (All Clients Reviews & Feedback with Filter Pills and Leave a Review) */}
          {currentPage === 'reviews' && (
            <main className="flex-grow flex flex-col animate-in fade-in duration-300">
              <ReviewsPage
                reviewsList={reviewsList}
                onOpenReviewModal={() => setIsReviewModalOpen(true)}
              />
            </main>
          )}

          {/* Universal Footer with 5 Navigation Tabs and Direct Contact */}
          <Footer
            onNavClick={handleNavigate}
            onOpenBooking={() => setIsBookingModalOpen(true)}
            currentPage={currentPage}
          />

        </div>

        {/* Shared Leave a Review Modal (connected to Firebase Realtime Database) */}
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onReviewAdded={handleReviewAdded}
        />

        {/* Universal Cinema Video Player Modal */}
        {selectedVideo && (
          <CinemaModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}

        {/* Interactive Booking & Discovery Modal */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          initialProjectType={bookingInitialPlan}
          onSuccessNotification={(msg, type) => addToast(msg, type || 'info')}
        />

        {/* Toast Notifications */}
        <SecurityToast toasts={toasts} onDismiss={removeToast} />

      </div>
    </ThemeProvider>
  );
}
