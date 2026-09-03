import React, { useState } from 'react';
import { Menu, X, Calendar, ArrowRight, Youtube, Twitter, Instagram, Linkedin } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work / Showreels' },
    { id: 'process', label: 'Process & Workflow' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'book-call', label: 'Book a Meeting' },
  ];

  const handleNavClick = (tabId: string) => {
    soundEngine.playPop();
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  const handleBookingClick = () => {
    soundEngine.playWhoosh();
    onOpenBooking();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f6f5f0]/95 backdrop-blur-xl border-b border-[#eeece4] px-4 sm:px-8 2xl:px-14 py-3 sm:py-3.5 transition-all shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
      <nav className="max-w-7xl 2xl:max-w-[1850px] mx-auto bg-[#ffffff]/95 border border-[#eeece4] rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-sm transition-all duration-300 hover:border-[#537568]/30">
        
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="relative w-11 h-11 rounded-full p-0.5 border border-[#eeece4] shadow-sm transition-transform duration-300 group-hover:scale-105 overflow-hidden bg-white">
            <img
              src="https://i.ibb.co/ZR9Bq4gc/logo.jpg"
              alt="Creative Vibe Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#242b27] leading-none">
              Creative Vibe
            </span>
            <span className="text-[11px] font-semibold text-[#748078] uppercase tracking-widest mt-1">
              freelance video editor
            </span>
          </div>
        </button>

        {/* Desktop Nav Tabs */}
        <div className="hidden lg:flex items-center gap-1 bg-[#eeece4]/60 p-1.5 rounded-full border border-[#e4e1d5]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#ffffff] text-[#537568] shadow-sm font-bold'
                    : 'text-[#748078] hover:text-[#242b27] hover:bg-[#ffffff]/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Nav Actions & Social Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Social Buttons (YouTube, X, Instagram, LinkedIn) */}
          <div className="hidden md:flex items-center gap-1 border-r border-[#eeece4] pr-2.5">
            <a
              href="https://www.youtube.com/@creavibestudios"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-[#748078] hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Creative Vibe YouTube (@creavibestudios)"
            >
              <Youtube className="w-4 h-4" />
            </a>

            <a
              href="https://x.com/creavibestudios"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-[#748078] hover:text-[#1DA1F2] hover:bg-sky-50 transition-colors"
              title="Creative Vibe on X (@creavibestudios)"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <a
              href="https://www.instagram.com/creavibestudios/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-[#748078] hover:text-rose-500 hover:bg-rose-50 transition-colors"
              title="Creative Vibe Instagram (@creavibestudios)"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/creavibestudios/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-[#748078] hover:text-[#0A66C2] hover:bg-blue-50 transition-colors"
              title="Creative Vibe LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Aesthetic Compact Book a Meeting CTA */}
          <button
            onClick={handleBookingClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#537568] hover:bg-[#436257] text-white text-xs sm:text-[13px] font-medium tracking-wide rounded-full shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 cursor-pointer active:scale-[0.98]"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book a Meeting</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-xl bg-[#eeece4]/70 hover:bg-[#ffffff] border border-[#e4e1d5] text-[#242b27] transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-[#ffffff]/98 backdrop-blur-xl border border-[#eeece4] rounded-2xl p-4 shadow-xl animate-in fade-in slide-in-from-top-2 flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#537568]/10 text-[#537568] font-semibold border border-[#537568]/20'
                    : 'text-[#4c5750] hover:bg-[#eeece4]/60'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </button>
            );
          })}

          {/* Mobile Social Links */}
          <div className="grid grid-cols-4 gap-2 py-3 my-1 border-t border-b border-[#eeece4] text-center">
            <a
              href="https://www.youtube.com/@creavibestudios"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-[11px] font-semibold text-red-600 hover:opacity-80"
            >
              <Youtube className="w-4 h-4" />
              <span>YouTube</span>
            </a>

            <a
              href="https://x.com/creavibestudios"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-[11px] font-semibold text-[#1DA1F2] hover:opacity-80"
            >
              <Twitter className="w-4 h-4" />
              <span>X</span>
            </a>

            <a
              href="https://www.instagram.com/creavibestudios/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-[11px] font-semibold text-rose-500 hover:opacity-80"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>

            <a
              href="https://www.linkedin.com/in/creavibestudios/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-[11px] font-semibold text-[#0A66C2] hover:opacity-80"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="pt-1.5">
            <button
              onClick={handleBookingClick}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#537568] hover:bg-[#436257] text-white font-medium text-sm rounded-xl shadow-sm cursor-pointer transition-colors active:scale-[0.99]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Meeting</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
