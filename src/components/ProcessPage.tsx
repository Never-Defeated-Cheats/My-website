import React from 'react';
import { WORKFLOW_STAGES, TOOL_STACK } from '../data/portfolioData';
import {
  Download,
  Scissors,
  Sparkles,
  Palette,
  Headphones,
  ShieldCheck,
  Zap,
  Clock,
} from 'lucide-react';

interface ProcessPageProps {
  onOpenBooking?: () => void;
  onViewPricing?: () => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Download':
        return <Download className="w-6 h-6 text-[#537568] dark:text-[#50b38c]" />;
      case 'Scissors':
        return <Scissors className="w-6 h-6 text-[#537568] dark:text-[#50b38c]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#537568] dark:text-[#50b38c]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#537568] dark:text-[#50b38c]" />;
      case 'Headphones':
      default:
        return <Headphones className="w-6 h-6 text-[#537568] dark:text-[#50b38c]" />;
    }
  };

  const deliveryTiers = [
    {
      title: '24-48h Rush Delivery',
      tag: 'Viral Shorts & Reels',
      desc: 'Rapid turnaround for high-frequency TikToks, YouTube Shorts, and Instagram Reels with beat-matched captions and visual hooks.',
      icon: Zap,
    },
    {
      title: '48-72h Standard Edit',
      tag: 'YouTube & Podcasts',
      desc: 'Multi-cam talking head, studio podcast mastering, and narrative YouTube videos with dead-air trimming and custom B-roll research.',
      icon: Clock,
    },
    {
      title: '4-6 Days Masterclass',
      tag: 'Documentary & 3D SaaS',
      desc: 'In-depth Vox/Magnates style documentaries and 3D isometric SaaS animations with multi-track Foley sound design and DaVinci color grading.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="py-8 sm:py-12 px-3 sm:px-8 2xl:px-14 flex-grow animate-in fade-in duration-300">
      <div className="max-w-7xl 2xl:max-w-[1850px] mx-auto">

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#537568]/10 dark:bg-[#537568]/20 text-[#537568] dark:text-[#50b38c] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High-Retention Editing Pipeline</span>
          </div>

          <h1 className="text-2xl sm:text-4xl 2xl:text-5xl font-black text-[#242b27] dark:text-[#f2f7f4] tracking-tight uppercase">
            Process & Post-Production Workflow
          </h1>

          <p className="text-xs sm:text-base 2xl:text-lg text-[#748078] dark:text-[#97a69f] mt-2.5 sm:mt-3 px-2">
            A battle-tested 5-stage editing pipeline engineered to maximize audience watch retention, sound immersion, and brand aesthetic.
          </p>
        </div>

        {/* 5-Stage Pipeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WORKFLOW_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="bg-[#ffffff] dark:bg-[#121815] border border-[#eeece4] dark:border-[#1e2b24] rounded-3xl p-6 sm:p-7 shadow-sm transition-all hover:border-[#537568]/50 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#537568]/10 dark:bg-[#537568]/20 flex items-center justify-center">
                    {getStepIcon(stage.iconName)}
                  </div>
                  <span className="text-xs font-bold text-[#537568] dark:text-[#50b38c] bg-[#537568]/10 dark:bg-[#537568]/20 px-3 py-1 rounded-full">
                    {stage.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#242b27] dark:text-[#f2f7f4] mb-2">
                  {stage.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#4c5750] dark:text-[#a0b5a9] leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#eeece4] dark:border-[#1e2b24] text-[11px] font-semibold text-[#537568] dark:text-[#50b38c]">
                Verified Production Pipeline
              </div>
            </div>
          ))}

          {/* 6th Card: Quality Guarantee */}
          <div className="bg-gradient-to-br from-[#537568] to-[#3d594f] text-white rounded-3xl p-6 sm:p-7 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                100% Quality & Retention Guarantee
              </h3>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                Every frame is cut with intention. We offer iterative revisions, dedicated private Slack / WhatsApp channels, and fast turnaround options.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 text-xs font-semibold text-white/90">
              ⚡ 24-48h Rush Turnarounds Available
            </div>
          </div>
        </div>

        {/* Turnaround & Delivery Timelines Section */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#242b27] dark:text-[#f2f7f4]">
              Turnaround & Delivery Timelines
            </h2>
            <p className="text-xs sm:text-sm text-[#748078] dark:text-[#97a69f] mt-1">
              Structured upload deadlines tailored to your publishing schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deliveryTiers.map((tier) => {
              const IconComponent = tier.icon;
              return (
                <div
                  key={tier.title}
                  className="bg-[#ffffff] dark:bg-[#121815] border border-[#eeece4] dark:border-[#1e2b24] rounded-2xl p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold text-[#3d7560] dark:text-[#50b38c] bg-[#537568]/10 dark:bg-[#537568]/20 px-2.5 py-0.5 rounded-full">
                        {tier.tag}
                      </span>
                      <IconComponent className="w-4 h-4 text-[#537568] dark:text-[#50b38c]" />
                    </div>

                    <h3 className="text-base font-bold text-[#242b27] dark:text-[#f2f7f4] mb-2">
                      {tier.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#4c5750] dark:text-[#a0b5a9] leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Professional Tool Stack */}
        <div className="bg-[#ffffff] dark:bg-[#121815] border border-[#eeece4] dark:border-[#1e2b24] rounded-3xl p-6 sm:p-8 text-center shadow-sm mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#748078] dark:text-[#8ea096] mb-4">
            Professional Editing & Motion Software Stack
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {TOOL_STACK.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full bg-[#eeece4]/60 dark:bg-[#19221d] border border-[#e4e1d5] dark:border-[#283830] text-xs sm:text-sm font-semibold text-[#242b27] dark:text-[#f2f7f4]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
