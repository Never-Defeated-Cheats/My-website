import React from 'react';
import { Mail, Phone, Instagram, AtSign, Shield, ArrowUp, Youtube, Twitter, Linkedin } from 'lucide-react';
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
    <footer className="mt-16 bg-[#ffffff] border-t border-[#eeece4] pt-14 pb-8 px-4 sm:px-8 2xl:px-14">
      <div className="max-w-7xl 2xl:max-w-[1850px] mx-auto">
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

            {/* Social Channels Row */}
            <div className="flex items-center gap-2 mb-4">
              <a
                href="https://www.youtube.com/@creavibestudios"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#eeece4]/80 hover:bg-red-600 hover:text-white text-[#4c5750] flex items-center justify-center transition-all shadow-sm"
                title="Creative Vibe on YouTube (@creavibestudios)"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href="https://x.com/creavibestudios"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#eeece4]/80 hover:bg-[#1DA1F2] hover:text-white text-[#4c5750] flex items-center justify-center transition-all shadow-sm"
                title="Creative Vibe on X (@creavibestudios)"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href="https://www.instagram.com/creavibestudios/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#eeece4]/80 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-rose-500 hover:text-white text-[#4c5750] flex items-center justify-center transition-all shadow-sm"
                title="Creative Vibe on Instagram (@creavibestudios)"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/creavibestudios/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#eeece4]/80 hover:bg-[#0A66C2] hover:text-white text-[#4c5750] flex items-center justify-center transition-all shadow-sm"
                title="Creative Vibe on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://discord.gg/QHKAcSNDxD"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#eeece4]/80 hover:bg-[#5865F2] hover:text-white text-[#4c5750] flex items-center justify-center transition-all shadow-sm"
                title="Creative Vibe Discord Community"
              >
                <AtSign className="w-4 h-4" />
              </a>
            </div>

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
                  Book a Meeting
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Connect */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#242b27] mb-4">
              Official Channels
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://www.youtube.com/@creavibestudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#748078] hover:text-red-600 transition-colors group"
                >
                  <Youtube className="w-4 h-4 shrink-0 text-red-600" />
                  <span className="font-semibold text-[#242b27] group-hover:text-red-600">YouTube (@creavibestudios)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/creavibestudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#748078] hover:text-[#1DA1F2] transition-colors group"
                >
                  <Twitter className="w-4 h-4 shrink-0 text-[#1DA1F2]" />
                  <span className="font-semibold text-[#242b27] group-hover:text-[#1DA1F2]">X / Twitter (@creavibestudios)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/creavibestudios/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#748078] hover:text-rose-500 transition-colors group"
                >
                  <Instagram className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>Instagram (@creavibestudios)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/creavibestudios/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#748078] hover:text-[#0A66C2] transition-colors group"
                >
                  <Linkedin className="w-4 h-4 shrink-0 text-[#0A66C2]" />
                  <span>LinkedIn (@creavibestudios)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919193905629"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#748078] hover:text-emerald-600 transition-colors group"
                >
                  <Phone className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>+91 91939 05629 (WhatsApp)</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:creative_vibe@creavibestudios.in"
                  className="flex items-center gap-2 text-[#748078] hover:text-[#537568] transition-colors group"
                >
                  <Mail className="w-4 h-4 shrink-0 text-[#537568]" />
                  <span className="truncate">creative_vibe@creavibestudios.in</span>
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/QHKAcSNDxD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#748078] hover:text-[#5865F2] transition-colors group"
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
