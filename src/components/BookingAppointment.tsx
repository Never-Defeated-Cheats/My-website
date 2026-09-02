import React, { useState } from 'react';
import { BookingFormData } from '../types';
import {
  Calendar,
  Send,
  Mail,
  MessageSquare,
  Copy,
  Check,
  CheckCircle2,
  Sparkles,
  Link as LinkIcon,
  Video,
  User,
  Clock,
  Phone,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface BookingAppointmentProps {
  initialProjectType?: string;
  onSuccessNotification: (msg: string, type?: 'success' | 'info') => void;
}

export const BookingAppointment: React.FC<BookingAppointmentProps> = ({
  initialProjectType = 'Talking Head',
  onSuccessNotification,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    projectType: initialProjectType,
    clientName: '',
    channelName: '',
    email: '',
    timeSlot: 'Flexible / Anytime (IST)',
    refLink: '',
    footageLink: '',
    whatsapp: '',
    projectDetails: '',
  });

  const [copied, setCopied] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successPlatform, setSuccessPlatform] = useState('');

  const nicheOptions = [
    'Talking Head',
    'Documentary style',
    'SaaS Animations',
    'Retention videos (MR. Beast Style)',
    'IRL',
    'Podcast',
  ];

  const timeSlotOptions = [
    'Flexible / Anytime (IST)',
    '09:00 AM - 11:00 AM (IST) (Morning)',
    '11:00 AM - 01:00 PM (IST) (Noon)',
    '01:00 PM - 03:00 PM (IST) (Afternoon)',
    '03:00 PM - 05:00 PM (IST) (Evening)',
    '05:00 PM - 07:00 PM (IST) (Prime Slot)',
    '07:00 PM - 09:00 PM (IST) (Night)',
    '09:00 PM - 11:00 PM (IST) (Late Night)',
  ];

  const buildFormattedDossier = (): string => {
    return `*NEW APPOINTMENT BOOKING — CREATIVE VIBE*

• Client Name: ${formData.clientName || 'Creator / Founder'}
• Page / Channel: ${formData.channelName || 'Not specified'}
• Email: ${formData.email || 'Not provided'}
• Project Niche: ${formData.projectType}
• Preferred Time (IST): ${formData.timeSlot}
• Reference Benchmark: ${formData.refLink || 'Not provided'}
• Raw Footage Link: ${formData.footageLink || 'Will share during discussion'}

• WhatsApp: ${formData.whatsapp || 'Not provided'}

• Project Scope & Video Vision:
${formData.projectDetails || 'Looking forward to discussing video editing requirements, retention hooks, and pacing.'}`;
  };

  const validateForm = (): boolean => {
    if (!formData.clientName.trim()) {
      onSuccessNotification('Please enter your Full Name', 'info');
      return false;
    }
    if (!formData.channelName.trim()) {
      onSuccessNotification('Please enter your Page or Channel Name', 'info');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      onSuccessNotification('Please enter a valid Email Address', 'info');
      return false;
    }
    if (!formData.refLink.trim()) {
      onSuccessNotification('Please enter a Reference Video Link', 'info');
      return false;
    }
    if (!formData.whatsapp.trim()) {
      onSuccessNotification('Please enter your WhatsApp Number', 'info');
      return false;
    }
    if (!formData.projectDetails.trim()) {
      onSuccessNotification('Please describe your project scope and video vision', 'info');
      return false;
    }
    return true;
  };

  // 1. WhatsApp Connector
  const handleSendWhatsApp = () => {
    if (!validateForm()) return;
    const msg = buildFormattedDossier();
    const waUrl = `https://api.whatsapp.com/send?phone=919193905629&text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    soundEngine.playChime();
    setSuccessPlatform('WhatsApp (+91 91939 05629)');
    setShowSuccessModal(true);
  };

  // 2. Gmail Connector
  const handleSendGmail = () => {
    if (!validateForm()) return;
    const msg = buildFormattedDossier();
    const subject = `Appointment Booking: ${formData.projectType} - ${formData.clientName} (${formData.channelName})`;
    const targetEmail = 'creative_vibe@creavibestudios.in';

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`;
    } else {
      const webGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`;
      const opened = window.open(webGmailUrl, '_blank');
      if (!opened) {
        window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`;
      }
    }

    soundEngine.playChime();
    setSuccessPlatform('Gmail (creative_vibe@creavibestudios.in)');
    setShowSuccessModal(true);
  };

  const handleCopyDossier = () => {
    const msg = buildFormattedDossier();
    navigator.clipboard.writeText(msg).then(() => {
      setCopied(true);
      soundEngine.playClick();
      onSuccessNotification('Complete project details copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section className="py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Head */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#537568]/10 text-[#537568] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Direct Discovery Call</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#242b27] tracking-tight">
            Book an Appointment
          </h2>

          <p className="text-sm sm:text-base text-[#748078] mt-2">
            Fill out your project details below and connect directly via WhatsApp or Gmail with your complete dossier pre-loaded.
          </p>
        </div>

        {/* Main Booking Card */}
        <div className="bg-[#ffffff] border border-[#eeece4] rounded-3xl p-6 sm:p-10 shadow-sm">
          
          {/* 1. Niche Selector */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-[#242b27] mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#537568] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <span>Select Project Niche *</span>
            </label>

            <div className="flex flex-wrap gap-2">
              {nicheOptions.map((opt) => {
                const isSelected = formData.projectType === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      soundEngine.playPop();
                      setFormData({ ...formData, projectType: opt });
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#537568] text-white shadow-sm'
                        : 'bg-[#eeece4]/60 text-[#4c5750] hover:bg-[#eeece4]'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Client & Channel Identity */}
          <div className="bg-[#eeece4]/40 border border-[#e4e1d5] rounded-2xl p-5 sm:p-6 mb-6">
            <div className="text-sm font-bold text-[#242b27] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#537568] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <span>Client & Channel Identity</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-[#4c5750] mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#748078] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4c5750] mb-1">
                  Page / Channel Name *
                </label>
                <div className="relative">
                  <Video className="w-4 h-4 text-[#748078] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. TechVision YT / @alex.edits"
                    value={formData.channelName}
                    onChange={(e) => setFormData({ ...formData, channelName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4c5750] mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#748078] absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@creator.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4c5750] mb-1">
                  Preferred Time (IST) *
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#748078] absolute left-3.5 top-3 pointer-events-none" />
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568]"
                  >
                    {timeSlotOptions.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Footage & References */}
          <div className="bg-[#eeece4]/40 border border-[#e4e1d5] rounded-2xl p-5 sm:p-6 mb-6">
            <div className="text-sm font-bold text-[#242b27] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#537568] text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <span>Footage & Style References</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4c5750] mb-1">
                  Reference Video / Benchmark Link *
                </label>
                <div className="relative">
                  <LinkIcon className="w-4 h-4 text-[#748078] absolute left-3.5 top-3" />
                  <input
                    type="url"
                    required
                    placeholder="e.g. https://youtube.com/watch?v=..."
                    value={formData.refLink}
                    onChange={(e) => setFormData({ ...formData, refLink: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4c5750] mb-1">
                  Raw Footage Link (Optional)
                </label>
                <div className="relative">
                  <Video className="w-4 h-4 text-[#748078] absolute left-3.5 top-3" />
                  <input
                    type="url"
                    placeholder="e.g. Google Drive, Dropbox, Frame.io"
                    value={formData.footageLink}
                    onChange={(e) => setFormData({ ...formData, footageLink: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Direct Contact (WhatsApp) */}
          <div className="bg-[#eeece4]/40 border border-[#e4e1d5] rounded-2xl p-5 sm:p-6 mb-6">
            <div className="text-sm font-bold text-[#242b27] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#537568] text-white text-xs font-bold flex items-center justify-center">
                4
              </span>
              <span>Direct Contact (WhatsApp for Instant Coordination)</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4c5750] mb-1">
                WhatsApp Phone Number (with Country Code) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#748078] absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. +91 98765 43210 or +1 (555) 019-2834"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568]"
                />
              </div>
            </div>
          </div>

          {/* 5. Project Details & Vision */}
          <div className="bg-[#eeece4]/40 border border-[#e4e1d5] rounded-2xl p-5 sm:p-6 mb-8">
            <div className="text-sm font-bold text-[#242b27] mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#537568] text-white text-xs font-bold flex items-center justify-center">
                5
              </span>
              <span>Project Scope & Video Vision *</span>
            </div>

            <textarea
              required
              rows={3}
              placeholder="Tell me about target video length, pacing style, turnaround deadline, motion graphics, or specific retention goals..."
              value={formData.projectDetails}
              onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
              className="w-full p-4 bg-white border border-[#eeece4] rounded-xl text-sm text-[#242b27] focus:outline-none focus:border-[#537568]"
            />
          </div>

          {/* Platform Action Buttons */}
          <div className="border-t border-[#eeece4] pt-6 text-center">
            <div className="text-xs font-bold text-[#748078] uppercase tracking-wider mb-4">
              Choose Platform to Send Details & Book
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* WhatsApp */}
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="flex items-center justify-between p-4 rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/60 hover:bg-emerald-500 hover:text-white text-[#242b27] transition-all cursor-pointer group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm">Connect via WhatsApp</div>
                    <div className="text-[11px] text-emerald-800 group-hover:text-white/90">
                      Instant Direct Chat • Fast Reply
                    </div>
                  </div>
                </div>
                <Send className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Gmail */}
              <button
                type="button"
                onClick={handleSendGmail}
                className="flex items-center justify-between p-4 rounded-2xl border-2 border-red-500/30 bg-red-50/50 hover:bg-red-500 hover:text-white text-[#242b27] transition-all cursor-pointer group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm">Send via Gmail</div>
                    <div className="text-[11px] text-red-800 group-hover:text-white/90">
                      Formal Inquiry • Full Dossier
                    </div>
                  </div>
                </div>
                <Send className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>

            </div>

            {/* Copy Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleCopyDossier}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#537568] hover:text-[#415e53] transition-colors cursor-pointer py-1 px-3 rounded-lg hover:bg-[#537568]/10"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '✓ Full Dossier Copied to Clipboard' : 'Copy Full Project Details as Text'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Appointment Success Dialog */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#eeece4] shadow-2xl text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-[#242b27] mb-2">
              Appointment Scheduled!
            </h3>

            <p className="text-sm text-[#4c5750] leading-relaxed mb-6">
              Your project dossier has been pre-formatted and loaded for <strong>{successPlatform}</strong>. We will review your reference link and reply within a few hours.
            </p>

            <div className="bg-[#eeece4]/60 border border-[#e4e1d5] rounded-2xl p-4 text-left text-xs space-y-1.5 mb-6 text-[#4c5750]">
              <div><strong>Client:</strong> {formData.clientName}</div>
              <div><strong>Niche:</strong> {formData.projectType}</div>
              <div><strong>Preferred Slot:</strong> {formData.timeSlot}</div>
              <div><strong>WhatsApp:</strong> {formData.whatsapp}</div>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-[#537568] hover:bg-[#415e53] text-white font-bold text-sm rounded-xl shadow transition-all cursor-pointer"
            >
              Done & Return
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
