import React from 'react';
import { PRICING_PLANS } from '../data/portfolioData';
import { PricingPlan } from '../types';
import { Mic, Film, Laptop, Zap, Plane, Headphones, Check, Sparkles, ArrowRight, Info } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const getPlanIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mic':
        return <Mic className="w-6 h-6 text-[#537568]" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-[#537568]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'Film':
        return <Film className="w-6 h-6 text-[#537568]" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-[#4f6878]" />;
      case 'Headphones':
      default:
        return <Headphones className="w-6 h-6 text-[#537568]" />;
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Head */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#537568]/10 text-[#537568] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Estimated Niche Budgets</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#242b27] tracking-tight">
            Transparent Editing Rates
          </h2>

          <p className="text-sm sm:text-base text-[#748078] mt-2">
            Estimated baseline pricing brackets across our 6 specialized editing niches. Transparent, reliable, and scalable.
          </p>
        </div>

        {/* Highlighted Project Complexity Pricing Notice Banner */}
        <div className="max-w-4xl mx-auto bg-[#ffffff] border-l-4 border-l-[#537568] border border-[#eeece4] rounded-2xl p-5 sm:p-6 mb-12 shadow-sm flex items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#537568]/10 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5 text-[#537568]" />
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base text-[#242b27] mb-0.5">
              Project-Based Flexible Estimates
            </div>
            <p className="text-xs sm:text-sm text-[#4c5750] leading-relaxed">
              The rates below represent standard <strong>minimum to maximum estimated brackets</strong>. Final project charges are customized based on <strong>raw footage complexity, motion graphics density, and turnaround delivery deadlines</strong>.
            </p>
          </div>
        </div>

        {/* 6 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PRICING_PLANS.map((plan) => {
            const isFeatured = plan.featured;

            return (
              <div
                key={plan.id}
                className={`relative bg-[#ffffff] rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 ${
                  isFeatured
                    ? 'border-2 border-[#537568] shadow-xl shadow-[#537568]/10'
                    : 'border border-[#eeece4] shadow-sm hover:border-[#537568]/50 hover:shadow-lg'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow ${
                      isFeatured
                        ? 'bg-[#537568] text-white'
                        : 'bg-[#eeece4] text-[#242b27] border border-[#e4e1d5]'
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#537568]/10 flex items-center justify-center shrink-0">
                      {getPlanIcon(plan.iconName)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#242b27] leading-snug">
                        {plan.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-[#748078] uppercase tracking-wider block">
                        Standard Bracket
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#4c5750] leading-relaxed mb-6 min-h-[3.2rem]">
                    {plan.desc}
                  </p>

                  {/* Price Box */}
                  <div className="bg-[#eeece4]/60 border border-[#e4e1d5] rounded-2xl p-4 mb-6">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-[#242b27]">
                        {plan.price}
                      </span>
                      <span className="text-xs font-semibold text-[#748078]">
                        /{plan.period}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#537568] mt-1">
                      {plan.rangeNote}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#242b27]">
                        <span className="w-4 h-4 rounded-full bg-[#537568]/15 text-[#537568] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book Action Button */}
                <button
                  onClick={() => {
                    soundEngine.playWhoosh();
                    onSelectPlan(plan);
                  }}
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isFeatured
                      ? 'bg-[#537568] hover:bg-[#415e53] text-white shadow-md shadow-[#537568]/20'
                      : 'bg-[#eeece4]/80 hover:bg-[#537568] hover:text-white text-[#242b27]'
                  }`}
                >
                  <span>Book {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
