import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RecentEditsMarquee } from './components/RecentEditsMarquee';
import { WorkShowreels } from './components/WorkShowreels';
import { ProcessSection } from './components/ProcessSection';
import { PricingSection } from './components/PricingSection';
import { ReviewsSection } from './components/ReviewsSection';
import { BookingAppointment } from './components/BookingAppointment';
import { CinemaModal } from './components/CinemaModal';
import { Footer } from './components/Footer';
import { SecurityToast } from './components/SecurityToast';
import { VideoItem, PricingPlan, ToastMessage } from './types';
import { soundEngine } from './utils/soundEngine';
import { initSecurityMeasures } from './utils/security';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [bookingInitialPlan, setBookingInitialPlan] = useState<string>('Talking Head');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Add a toast notification
  const addToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', title?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastMessage = { id, type, message, title };
    setToasts((prev) => [...prev.slice(-3), newToast]); // Keep max 4 toasts

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Initialize Security & Anti-Steal/Frame Protection
  useEffect(() => {
    const cleanupSecurity = initSecurityMeasures((msg, type) => {
      addToast(msg, type || 'warning');
    });

    return () => {
      cleanupSecurity();
    };
  }, []);

  // Handle Tab Switch
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Video Selection for Cinema Modal
  const handleSelectVideo = (video: VideoItem) => {
    setSelectedVideo(video);
  };

  // Handle Direct Booking Navigation from Pricing / Niches
  const handleBookWithPlan = (planName: string) => {
    setBookingInitialPlan(planName);
    setActiveTab('book-call');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f5f0] text-[#4c5750] relative overflow-x-clip">
      
      {/* Ambient background soft radial spotlights (0% CPU cost) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-[#537568]/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#4f6878]/5 blur-3xl" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col flex-grow">
        
        {/* Top Navbar */}
        <Navbar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onOpenBooking={() => handleTabChange('book-call')}
        />

        {/* Tab 1: HOME */}
        {activeTab === 'home' && (
          <main className="animate-in fade-in duration-300">
            <Hero
              onExploreWork={() => handleTabChange('work')}
              onOpenBooking={() => handleTabChange('book-call')}
            />
            <RecentEditsMarquee
              onSelectVideo={handleSelectVideo}
              onExploreAll={() => handleTabChange('work')}
            />
            <ReviewsSection
              onAddReviewSuccess={(rev) => {
                addToast('Your verified client review was published successfully!', 'success');
              }}
            />
          </main>
        )}

        {/* Tab 2: WORK / SHOWREELS */}
        {activeTab === 'work' && (
          <main className="animate-in fade-in duration-300">
            <WorkShowreels
              onSelectVideo={handleSelectVideo}
              onOpenBookingWithPlan={handleBookWithPlan}
            />
          </main>
        )}

        {/* Tab 3: PROCESS & WORKFLOW */}
        {activeTab === 'process' && (
          <main className="animate-in fade-in duration-300">
            <ProcessSection />
          </main>
        )}

        {/* Tab 4: PRICING */}
        {activeTab === 'pricing' && (
          <main className="animate-in fade-in duration-300">
            <PricingSection
              onSelectPlan={(plan: PricingPlan) => handleBookWithPlan(plan.name)}
            />
          </main>
        )}

        {/* Tab 5: BOOK APPOINTMENT */}
        {activeTab === 'book-call' && (
          <main className="animate-in fade-in duration-300">
            <BookingAppointment
              initialProjectType={bookingInitialPlan}
              onSuccessNotification={(msg, type) => addToast(msg, type || 'info')}
            />
          </main>
        )}

        {/* Site Footer */}
        <Footer onNavClick={handleTabChange} />

      </div>

      {/* Universal Cinema Video Modal */}
      {selectedVideo && (
        <CinemaModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {/* Security & Notification Toasts */}
      <SecurityToast toasts={toasts} onDismiss={removeToast} />

    </div>
  );
}
