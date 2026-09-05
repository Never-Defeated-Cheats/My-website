import React, { useEffect } from 'react';
import { BookingAppointment } from './BookingAppointment';
import { X } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { SITE_LOGO_URL } from '../data/portfolioData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectType?: string;
  onSuccessNotification: (msg: string, type?: 'success' | 'info') => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialProjectType = 'Talking Head',
  onSuccessNotification,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        soundEngine.playClick();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundEngine.playClick();
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-4xl bg-[#f6f5f0] dark:bg-[#121714] border border-[#eeece4] dark:border-[#26332b] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#ffffff]/95 dark:bg-[#18201c]/95 backdrop-blur-md border-b border-[#eeece4] dark:border-[#26332b]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#eeece4] dark:border-[#2e3b33] bg-white">
              <img
                src={SITE_LOGO_URL}
                alt="Creative Vibe"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#242b27] dark:text-[#f2f7f4] leading-tight">
                Book a Project Discovery Meeting
              </h3>
              <p className="text-xs text-[#748078] dark:text-[#9bb0a4]">
                Creative Vibe • Free 15-Minute Consultation
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-[#eeece4] dark:hover:bg-[#222c26] text-[#748078] dark:text-[#9bb0a4] hover:text-[#242b27] dark:hover:text-[#f2f7f4] transition-colors cursor-pointer"
            aria-label="Close Booking Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-2 sm:p-4">
          <BookingAppointment
            initialProjectType={initialProjectType}
            onSuccessNotification={onSuccessNotification}
          />
        </div>

      </div>
    </div>
  );
};
