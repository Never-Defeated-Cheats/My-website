import React, { useState } from 'react';
import { Menu, X, Calendar, ArrowRight, Sun, Moon } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { RealXLogo, RealInstagramLogo, RealYouTubeLogo, RealLinkedInLogo } from './SocialIcons';
import { useTheme } from '../context/ThemeContext';
import { SITE_LOGO_URL } from '../data/portfolioData';

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
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'work', label: 'Work', href: '#work' },
    { id: 'process', label: 'Process & Workflow', href: '#process' },
    { id: 'pricing', label: 'Pricing', href: '#pricing' },
    { id: 'reviews', label: 'Reviews', href: '#reviews' },
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
    <header className="sticky top-0 z-50 bg-[#f6f5f0]/95 dark:bg-[#121614]/95 backdrop-blur-xl border-b border-[#eeece4] dark:border-[#222c26] px-3 sm:px-8 2xl:px-14 py-2.5 sm:py-3 transition-colors shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
      <nav aria-label="Main Navigation" className="max-w-7xl 2xl:max-w-[1850px] mx-auto bg-[#ffffff]/95 dark:bg-[#18201c]/95 border border-[#eeece4] dark:border-[#26332b] rounded-2xl px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between shadow-sm transition-all duration-300 hover:border-[#537568]/40">
        
        {/* Brand Logo & Name */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-2.5 sm:gap-3.5 text-left group focus:outline-none cursor-pointer"
        >
          {/* Logo container - clean static styling */}
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 border border-rose-500/25 dark:border-rose-500/35 ring-1 ring-rose-500/15 transition-transform duration-300 group-hover:scale-105 overflow-hidden bg-white shrink-0">
            <img
              src={SITE_LOGO_URL}
              alt="Creative Vibe official logo"
              width="44"
              height="44"
              referrerPolicy="no-referrer"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            {/* Clean Static Gradient Brand Heading from pure red #FF0000 to off-white */}
            <span className="font-black text-base sm:text-xl tracking-tight bg-gradient-to-r from-[#FF0000] via-[#ff4d4d] to-[#e89090] dark:to-[#ffb8b8] bg-clip-text text-transparent leading-none">
              Creative Vibe
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#748078] dark:text-[#8ea096] uppercase tracking-widest mt-0.5 sm:mt-1">
              freelance video editor
            </span>
          </div>
        </a>

        {/* Desktop Nav Tabs (5 Strict Tabs: Home, Work, Process & Workflow, Pricing, Reviews) */}
        <div className="hidden lg:flex items-center gap-1 bg-[#eeece4]/60 dark:bg-[#202923] p-1.5 rounded-full border border-[#e4e1d5] dark:border-[#2c3931]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#ffffff] dark:bg-[#2b3831] text-[#3d7560] dark:text-[#5fcb9d] shadow-sm font-bold'
                    : 'text-[#748078] dark:text-[#9bb0a4] hover:text-[#242b27] dark:hover:text-[#ffffff] hover:bg-[#ffffff]/50 dark:hover:bg-[#28352e]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Nav Actions: Socials, Theme Toggle & CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* Quick Social Buttons with Authentic Modern Official Icons (Insta, YouTube, LinkedIn, X) */}
          <div className="hidden md:flex items-center gap-1 border-r border-[#eeece4] dark:border-[#2c3931] pr-2.5">
            <a
              href="https://www.instagram.com/creavibestudios/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-[#748078] dark:text-[#9bb0a4] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center justify-center group"
              title="Creative Vibe on Instagram (@creavibestudios)"
            >
              <RealInstagramLogo className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            </a>

            <a
              href="https://www.youtube.com/@creavibestudios"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-[#748078] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center justify-center group"
              title="Creative Vibe on YouTube (@creavibestudios)"
            >
              <RealYouTubeLogo className="w-4 h-3 transition-transform group-hover:scale-110" />
            </a>

            <a
              href="https://www.linkedin.com/in/creavibestudios/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-[#748078] hover:text-[#0A66C2] hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors flex items-center justify-center group"
              title="Creative Vibe on LinkedIn"
            >
              <RealLinkedInLogo className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            </a>

            <a
              href="https://x.com/creavibestudios"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-[#748078] dark:text-[#9bb0a4] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center group"
              title="Creative Vibe on X (@creavibestudios)"
            >
              <RealXLogo className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            </a>
          </div>

          {/* Theme Toggle (Light / Dark Mode) */}
          <button
            onClick={() => {
              soundEngine.playPop();
              toggleTheme();
            }}
            className="p-2 rounded-xl bg-[#eeece4]/80 dark:bg-[#222c26] hover:bg-white dark:hover:bg-[#2b3831] border border-[#dcd9ce] dark:border-[#2e3b33] text-[#4c5750] dark:text-[#a1b8ac] transition-all cursor-pointer shadow-sm"
            title={`Switch to ${theme === 'light' ? 'Dark Mode' : 'Light Mode'}`}
            aria-label="Toggle dark mode theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-[#537568]" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Book a Meeting CTA */}
          <button
            onClick={handleBookingClick}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#537568] hover:bg-[#415e53] text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm hover:shadow transition-all duration-200 cursor-pointer active:scale-95"
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
            className="lg:hidden p-2 rounded-xl bg-[#eeece4]/80 dark:bg-[#222c26] text-[#242b27] dark:text-[#f2f7f4] border border-[#dcd9ce] dark:border-[#2e3b33] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 bg-[#ffffff] dark:bg-[#18201c] border border-[#eeece4] dark:border-[#26332b] rounded-2xl shadow-xl flex flex-col gap-2 animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-1 pb-3 border-b border-[#eeece4] dark:border-[#26332b]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#537568]/15 dark:bg-[#50b38c]/20 text-[#3d7560] dark:text-[#5fcb9d] font-bold'
                      : 'text-[#4c5750] dark:text-[#a9beaf] hover:bg-[#eeece4]/50 dark:hover:bg-[#222c26]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <ArrowRight className="w-4 h-4 text-[#3d7560] dark:text-[#5fcb9d]" />}
                </a>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={handleBookingClick}
              className="w-full py-3 bg-[#537568] hover:bg-[#415e53] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Meeting</span>
            </button>

            {/* Mobile Socials */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <a href="https://www.instagram.com/creavibestudios/" target="_blank" rel="noopener noreferrer" className="p-2 text-[#748078] hover:text-rose-500">
                <RealInstagramLogo className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@creavibestudios" target="_blank" rel="noopener noreferrer" className="p-2 text-[#748078] hover:text-red-600">
                <RealYouTubeLogo className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/creavibestudios/" target="_blank" rel="noopener noreferrer" className="p-2 text-[#748078] hover:text-[#0A66C2]">
                <RealLinkedInLogo className="w-4 h-4" />
              </a>
              <a href="https://x.com/creavibestudios" target="_blank" rel="noopener noreferrer" className="p-2 text-[#748078] hover:text-black dark:hover:text-white">
                <RealXLogo className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
