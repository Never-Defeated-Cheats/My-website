import React from 'react';
import { Mail, Phone, Instagram, AtSign, Shield, ArrowUp } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface FooterProps {
  onNavClick: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 bg-[#ffffff] border-t border-[#eeece4] pt-14 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-[#eeece4] shadow-sm bg-white shrink-0">
                <img
                  src="https://i.ibb.co/ZR9Bq4gc/logo.jpg"
                  alt="Creative Vibe Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-extrabold text-lg text-[#242b27]">
                Creative Vibe
              </span>
            </div>

            <p className="text-sm text-[#4c5750] leading-relaxed max-w-sm mb-4">
              Helping top YouTubers, SaaS brands, and creators tell unforgettable visual stories with high watch retention, motion graphics, and cinema pacing.
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eeece4]/80 text-[#748078] text-xs font-semibold">
              <Shield className="w-3.5 h-3.5 text-[#537568]" />
              <span>Asset Integrity & Content Protected</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#242b27] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="text-[#748078] hover:text-[#537568] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('work')}
                  className="text-[#748078] hover:text-[#537568] transition-colors cursor-pointer"
                >
                  Work / Showreels
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('process')}
                  className="text-[#748078] hover:text-[#537568] transition-colors cursor-pointer"
                >
                  Process & Pipeline
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('pricing')}
                  className="text-[#748078] hover:text-[#537568] transition-colors cursor-pointer"
                >
                  Pricing & Rates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('book-call')}
                  className="text-[#748078] hover:text-[#537568] transition-colors cursor-pointer"
                >
                  Book Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Connect */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#242b27] mb-4">
              Connect
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:creative_vibe@creavibestudios.in"
                  className="flex items-center gap-2 text-[#748078] hover:text-[#537568] transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0 text-[#537568]" />
                  <span className="truncate">creative_vibe@creavibestudios.in</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919193905629"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#748078] hover:text-[#537568] transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>+91 91939 05629 (WhatsApp)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/creavibe.studios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#748078] hover:text-[#537568] transition-colors"
                >
                  <Instagram className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>@creavibe.studios</span>
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/QHKAcSNDxD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#748078] hover:text-[#537568] transition-colors"
                >
                  <AtSign className="w-4 h-4 shrink-0 text-[#5865F2]" />
                  <span>Discord Community</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-6 border-t border-[#eeece4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#748078]">
          <div>
            &copy; {new Date().getFullYear()} Creative Vibe. All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#537568] hover:text-[#415e53] font-semibold cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
