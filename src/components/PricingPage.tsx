import React from 'react';
import { PRICING_PLANS } from '../data/portfolioData';
import { PricingPlan } from '../types';
import {
  Mic,
  Film,
  Laptop,
  Zap,
  Plane,
  Headphones,
  Check,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface PricingPageProps {
  onSelectPlan: (plan: PricingPlan) => void;
  onOpenBooking?: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onSelectPlan,
}) => {
  const getPlanIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mic':
        return <Mic className="w-6 h-6 text-[#537568] dark:text-[#50b38c]" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-[#537568] dark:text-[#50b38c]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'Film':
        return <Film className="w-6 h-6 text-[#537568] dark:text-[#50b38c]" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-[#4f6878] dark:text-[#7ab0d6]" />;
      case 'Headphones':
      default:
        return <Headphones className="w-6 h-6 text-[#537568] dark:text-[#50b38c]" />;
    }
  };

  return (
    <div className="py-8 sm:py-12 px-3 sm:px-8 2xl:px-14 flex-grow animate-in fade-in duration-300">
      <div className="max-w-7xl 2xl:max-w-[1850px] mx-auto">

        {/* Header (Screenshot 2 Match) */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#537568]/10 dark:bg-[#537568]/20 text-[#537568] dark:text-[#50b38c] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Estimated Niche Budgets</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#242b27] dark:text-[#f2f7f4] tracking-tight mb-3">
            Predictable Editing Rates
          </h1>

          <p className="text-sm sm:text-base 2xl:text-lg text-[#748078] dark:text-[#9bb0a4] mt-2 max-w-2xl mx-auto">
            Estimated baseline pricing brackets across our 5 specialized editing niches. Transparent, reliable, and scalable.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 2xl:gap-10">
          {PRICING_PLANS.map((plan) => {
            const isFeatured = plan.featured;

            return (
              <div
                key={plan.id}
                className={`relative bg-[#ffffff] dark:bg-[#121815] rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 ${
                  isFeatured
                    ? 'border-2 border-[#537568] dark:border-[#50b38c] shadow-xl shadow-[#537568]/10 dark:shadow-[#50b38c]/10'
                    : 'border border-[#eeece4] dark:border-[#1e2b24] shadow-sm hover:border-[#537568]/50 hover:shadow-lg'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow ${
                      isFeatured
                        ? 'bg-[#537568] dark:bg-[#50b38c] text-white dark:text-[#0a0f0d]'
                        : 'bg-[#eeece4] dark:bg-[#19221d] text-[#242b27] dark:text-[#f2f7f4] border border-[#e4e1d5] dark:border-[#283830]'
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#537568]/10 dark:bg-[#537568]/20 flex items-center justify-center shrink-0">
                      {getPlanIcon(plan.iconName)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#242b27] dark:text-[#f2f7f4] leading-snug">
                        {plan.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-[#748078] dark:text-[#8ea096] uppercase tracking-wider block">
                        Standard Bracket
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#4c5750] dark:text-[#a2b5ab] leading-relaxed mb-6 min-h-[3.2rem]">
                    {plan.desc}
                  </p>

                  {/* Price Box */}
                  <div className="bg-[#eeece4]/60 dark:bg-[#19221d] border border-[#e4e1d5] dark:border-[#283830] rounded-2xl p-4 mb-6">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-[#242b27] dark:text-[#f2f7f4]">
                        {plan.price}
                      </span>
                      <span className="text-xs font-semibold text-[#748078] dark:text-[#8ea096]">
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold text-[#242b27] dark:text-[#f2f7f4] uppercase tracking-wider">
                      Included Production:
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4c5750] dark:text-[#b4c7bd]">
                        <Check className="w-4 h-4 text-[#537568] dark:text-[#50b38c] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Action CTA */}
                <button
                  onClick={() => {
                    soundEngine.playWhoosh();
                    onSelectPlan(plan);
                  }}
                  className={`w-full py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
                    isFeatured
                      ? 'bg-[#537568] hover:bg-[#436257] text-white shadow-md hover:shadow-lg'
                      : 'bg-[#eeece4]/80 dark:bg-[#19221d] hover:bg-[#537568] hover:text-white dark:hover:bg-[#537568] text-[#242b27] dark:text-[#f2f7f4] border border-[#dcd9ce] dark:border-[#283830]'
                  }`}
                >
                  <span>Select {plan.name} Bracket</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
