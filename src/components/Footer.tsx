import React from 'react';
import {
  Mail,
  Phone,
  Shield,
  ArrowUp,
  Calendar,
  Globe2,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import {
  RealXLogo,
  RealInstagramLogo,
  RealYouTubeLogo,
  RealLinkedInLogo,
  RealDiscordLogo,
} from './SocialIcons';
import { SITE_LOGO_URL } from '../data/portfolioData';

interface FooterProps {
  onNavClick: (tabId: string) => void;
  onOpenBooking?: () => void;
  currentPage?: 'home' | 'work' | 'process' | 'pricing' | 'reviews';
}

export const Footer: React.FC<FooterProps> = ({
  onNavClick,
  onOpenBooking,
}) => {
  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="mt-16 bg-[#ffffff] dark:bg-[#121815] border-t border-[#eeece4] dark:border-[#1e2b24] pt-12 pb-10 px-4 sm:px-8 2xl:px-14 scroll-mt-24 transition-colors">
      <div className="max-w-7xl 2xl:max-w-[1850px] mx-auto">
        
        {/* Top Header & Live Availability Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 mb-10 border-b border-[#eeece4] dark:border-[#1e2b24]">
          <div className="flex items-center gap-3.5">
            {/* Logo container - clean static styling */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-rose-500/25 dark:border-rose-500/35 ring-1 ring-rose-500/15 bg-white dark:bg-[#0a0f0d] shrink-0 p-0.5 shadow-2xs">
              <img
                src={SITE_LOGO_URL}
                alt="Creative Vibe official logo"
                width="48"
                height="48"
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-[#FF0000] via-[#ff4d4d] to-[#e89090] dark:to-[#ffb8b8] bg-clip-text text-transparent leading-none">
                  Creative Vibe
                </span>
              </div>
              <p className="text-xs text-[#748078] dark:text-[#97a69f] mt-1 font-semibold">
                Creative Freelance Video Editor & Motion Designer
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for New Projects & Retainers</span>
            </div>

            {onOpenBooking && (
              <button
                onClick={() => {
                  soundEngine.playWhoosh();
                  onOpenBooking();
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#537568] hover:bg-[#436257] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Discovery Call</span>
              </button>
            )}
          </div>
        </div>

        {/* Clean, De-Cluttered 3-Column Studio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          
          {/* Column 1: Studio Identity & Connect (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs sm:text-sm text-[#748078] dark:text-[#97a69f] leading-relaxed max-w-md">
              We craft retention-driven video edits, talking head content, and viral shorts designed to scale Social media Creators, Media agencies and Brands.
            </p>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#242b27] dark:text-[#f2f7f4] mb-3">
                Connect & Follow
              </div>
              
              {/* Authentic Real Social Logos */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <a
                  href="https://www.instagram.com/creavibestudios/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#eeece4]/70 dark:bg-[#19221d] hover:bg-gradient-to-tr hover:from-amber-500 hover:to-rose-500 text-[#4c5750] dark:text-[#b8c7bf] hover:text-white flex items-center justify-center transition-all shadow-2xs group"
                  title="Creative Vibe on Instagram (@creavibestudios)"
                >
                  <RealInstagramLogo className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="https://www.youtube.com/@creavibestudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#eeece4]/70 dark:bg-[#19221d] hover:bg-[#FF0000] text-[#4c5750] dark:text-[#b8c7bf] hover:text-white flex items-center justify-center transition-all shadow-2xs group"
                  title="Creative Vibe on YouTube (@creavibestudios)"
                >
                  <RealYouTubeLogo className="w-4 h-3 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="https://www.linkedin.com/in/creavibestudios/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#eeece4]/70 dark:bg-[#19221d] hover:bg-[#0A66C2] text-[#4c5750] dark:text-[#b8c7bf] hover:text-white flex items-center justify-center transition-all shadow-2xs group"
                  title="Creative Vibe on LinkedIn"
                >
                  <RealLinkedInLogo className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="https://x.com/creavibestudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#eeece4]/70 dark:bg-[#19221d] hover:bg-black dark:hover:bg-white text-[#4c5750] dark:text-[#b8c7bf] hover:text-white dark:hover:text-black flex items-center justify-center transition-all shadow-2xs group"
                  title="Creative Vibe on X (@creavibestudios)"
                >
                  <RealXLogo className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="https://discord.gg/QHKAcSNDxD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#eeece4]/70 dark:bg-[#19221d] hover:bg-[#5865F2] text-[#4c5750] dark:text-[#b8c7bf] hover:text-white flex items-center justify-center transition-all shadow-2xs group"
                  title="Creative Vibe Discord Community"
                >
                  <RealDiscordLogo className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eeece4]/60 dark:bg-[#19221d] text-[#748078] dark:text-[#97a69f] text-xs font-medium border border-[#e4e1d5]/50 dark:border-[#26332b]">
              <Shield className="w-3.5 h-3.5 text-[#537568] dark:text-[#50b38c]" />
              <span>NDA Available • 100% Commercial Rights</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#242b27] dark:text-[#f2f7f4] mb-4">
              Website Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('home');
                  }}
                  className="text-[#748078] dark:text-[#97a69f] hover:text-[#537568] dark:hover:text-[#50b38c] transition-colors flex items-center gap-2 group cursor-pointer py-0.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#537568]/40 group-hover:bg-[#537568] transition-colors" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('work');
                  }}
                  className="text-[#748078] dark:text-[#97a69f] hover:text-[#537568] dark:hover:text-[#50b38c] transition-colors flex items-center gap-2 group cursor-pointer py-0.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#537568]/40 group-hover:bg-[#537568] transition-colors" />
                  <span>Work</span>
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('process');
                  }}
                  className="text-[#748078] dark:text-[#97a69f] hover:text-[#537568] dark:hover:text-[#50b38c] transition-colors flex items-center gap-2 group cursor-pointer py-0.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#537568]/40 group-hover:bg-[#537568] transition-colors" />
                  <span>Process & Workflow</span>
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('pricing');
                  }}
                  className="text-[#748078] dark:text-[#97a69f] hover:text-[#537568] dark:hover:text-[#50b38c] transition-colors flex items-center gap-2 group cursor-pointer py-0.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#537568]/40 group-hover:bg-[#537568] transition-colors" />
                  <span>Pricing</span>
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('reviews');
                  }}
                  className="text-[#748078] dark:text-[#97a69f] hover:text-[#537568] dark:hover:text-[#50b38c] transition-colors flex items-center gap-2 group cursor-pointer py-0.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#537568]/40 group-hover:bg-[#537568] transition-colors" />
                  <span>Reviews</span>
                </a>
              </li>
              <li className="pt-2 border-t border-[#eeece4] dark:border-[#1e2b24]">
                <a
                  href="#book-call"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenBooking) {
                      onOpenBooking();
                    } else {
                      onNavClick('book-call');
                    }
                  }}
                  className="text-[#537568] dark:text-[#50b38c] hover:text-[#436257] font-semibold transition-colors flex items-center gap-2 group cursor-pointer py-0.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book a Discovery Call</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Contact Cards (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#242b27] dark:text-[#f2f7f4] mb-4">
              Direct Contact
            </h4>
            
            <a
              href="https://wa.me/919193905629"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#eeece4]/50 dark:bg-[#19221d] hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:border-emerald-300 dark:hover:border-emerald-800/60 border border-[#e4e1d5]/70 dark:border-[#26332b] transition-all group shadow-2xs"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#748078] dark:text-[#97a69f] tracking-wider">WhatsApp Instant</div>
                <div className="font-bold text-xs sm:text-sm text-[#242b27] dark:text-[#f2f7f4] group-hover:text-emerald-600 transition-colors">
                  +91 91939 05629
                </div>
              </div>
            </a>

            <a
              href="mailto:creative_vibe@creavibestudios.in"
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#eeece4]/50 dark:bg-[#19221d] hover:bg-[#537568]/10 hover:border-[#537568]/30 border border-[#e4e1d5]/70 dark:border-[#26332b] transition-all group shadow-2xs"
            >
              <div className="w-9 h-9 rounded-xl bg-[#537568]/10 flex items-center justify-center text-[#537568] dark:text-[#50b38c] shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] uppercase font-bold text-[#748078] dark:text-[#97a69f] tracking-wider">Direct Studio Email</div>
                <div className="font-bold text-xs sm:text-sm text-[#242b27] dark:text-[#f2f7f4] group-hover:text-[#537568] truncate transition-colors">
                  creative_vibe@creavibestudios.in
                </div>
              </div>
            </a>

            <div className="p-3 rounded-2xl bg-[#faf9f5] dark:bg-[#121815] border border-[#eeece4] dark:border-[#1e2b24] text-xs text-[#748078] dark:text-[#97a69f] flex items-center gap-2.5">
              <Globe2 className="w-4 h-4 text-[#537568] dark:text-[#50b38c] shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-semibold text-[#242b27] dark:text-[#f2f7f4]">Global Remote: </span>
                IST (UTC+5:30) • Serving creators in US, UK, EU, UAE & India
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Line */}
        <div className="pt-8 border-t border-[#eeece4] dark:border-[#1e2b24] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#748078] dark:text-[#97a69f]">
          <div className="flex flex-wrap items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Creative Vibe.</span>
            <span>All rights reserved.</span>
            <span className="hidden sm:inline text-[#eeece4] dark:text-[#2c3931]">•</span>
            <span className="hidden sm:inline">Crafted for ambitious digital creators worldwide.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#eeece4]/70 dark:bg-[#19221d] hover:bg-[#537568] hover:text-white text-[#537568] dark:text-[#50b38c] font-semibold transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
