import React, { useState } from 'react';
import { Menu, X, Calendar, ArrowRight } from 'lucide-react';
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
    { id: 'book-call', label: 'Book Appointment' },
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
    <header className="sticky top-4 z-40 px-4 sm:px-6 mb-6">
      <nav className="max-w-7xl mx-auto bg-[#ffffff]/90 backdrop-blur-md border border-[#eeece4] rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm transition-all duration-300 hover:border-[#537568]/30">
        
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

        {/* Nav Actions */}
        <div className="flex items-center gap-2.5">
          {/* Desktop Book Appointment CTA */}
          <button
            onClick={handleBookingClick}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#537568] hover:bg-[#415e53] text-[#ffffff] text-sm font-bold rounded-full shadow-md shadow-[#537568]/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
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
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#537568]/10 text-[#537568] font-bold border border-[#537568]/20'
                    : 'text-[#4c5750] hover:bg-[#eeece4]/60'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </button>
            );
          })}

          <div className="pt-2 mt-1 border-t border-[#eeece4]">
            <button
              onClick={handleBookingClick}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#537568] hover:bg-[#415e53] text-[#ffffff] font-bold text-sm rounded-xl shadow-md cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
