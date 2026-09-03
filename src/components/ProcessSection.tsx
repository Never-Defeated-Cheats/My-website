import React from 'react';
import { WORKFLOW_STAGES, TOOL_STACK } from '../data/portfolioData';
import { Download, Scissors, Sparkles, Palette, Headphones, Layers, CheckCircle2 } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Download':
        return <Download className="w-6 h-6 text-[#537568]" />;
      case 'Scissors':
        return <Scissors className="w-6 h-6 text-[#537568]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#537568]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#537568]" />;
      case 'Headphones':
      default:
        return <Headphones className="w-6 h-6 text-[#537568]" />;
    }
  };

  return (
    <section className="py-8 px-4 sm:px-8 2xl:px-14">
      <div className="max-w-7xl 2xl:max-w-[1850px] mx-auto">
        
        {/* Section Head */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#537568]/10 text-[#537568] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Standards & Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-black text-[#242b27] tracking-tight">
            5-Stage Editing Workflow
          </h2>

          <p className="text-sm sm:text-base 2xl:text-lg text-[#748078] mt-3">
            A transparent, reliable production process that guarantees high audience retention, pristine color grading, and on-time turnarounds.
          </p>
        </div>

        {/* 5 Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8 mb-12">
          {WORKFLOW_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="relative bg-[#ffffff] border border-[#eeece4] rounded-3xl p-7 shadow-sm transition-all hover:border-[#537568]/40 hover:shadow-md group"
            >
              {/* Step Number in Top Right */}
              <span className="absolute top-6 right-7 font-black text-4xl text-[#eeece4] group-hover:text-[#537568]/20 transition-colors">
                {stage.step}
              </span>

              {/* Step Icon */}
              <div className="w-13 h-13 rounded-2xl bg-[#537568]/10 flex items-center justify-center mb-5">
                {getStepIcon(stage.iconName)}
              </div>

              <h3 className="text-lg font-bold text-[#242b27] mb-2.5">
                {stage.title}
              </h3>

              <p className="text-sm text-[#4c5750] leading-relaxed">
                {stage.desc}
              </p>
            </div>
          ))}

          {/* Quality Guarantee Card */}
          <div className="relative bg-gradient-to-br from-[#537568] to-[#415e53] text-[#ffffff] rounded-3xl p-7 shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                100% Quality & Retention Guarantee
              </h3>
              <p className="text-sm text-white/90 leading-relaxed">
                Every frame is cut with intention. We offer iterative revisions, dedicated private Slack / WhatsApp channels, and fast turnaround options.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 text-xs font-semibold text-white/80">
              ✓ 24–48h Turnarounds Available
            </div>
          </div>
        </div>

        {/* Tool Stack */}
        <div className="bg-[#ffffff] border border-[#eeece4] rounded-3xl p-6 sm:p-8 text-center shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-[#748078] mb-4">
            Professional Editing & Motion Software Stack
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {TOOL_STACK.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full bg-[#eeece4]/60 border border-[#e4e1d5] text-xs sm:text-sm font-semibold text-[#242b27]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
