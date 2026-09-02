import React from 'react';
import { ToastMessage } from '../types';
import { ShieldCheck, AlertCircle, Info, CheckCircle2, X } from 'lucide-react';

interface SecurityToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const SecurityToast: React.FC<SecurityToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <aside aria-label="Notifications" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        const isWarning = toast.type === 'warning';
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-3 ${
              isWarning
                ? 'bg-[#ffffff]/95 border-[#b56e54]/30 text-[#242b27] shadow-[#b56e54]/10'
                : isSuccess
                ? 'bg-[#ffffff]/95 border-[#537568]/30 text-[#242b27] shadow-[#537568]/10'
                : isError
                ? 'bg-[#ffffff]/95 border-red-500/30 text-[#242b27] shadow-red-500/10'
                : 'bg-[#ffffff]/95 border-[#eeece4] text-[#242b27] shadow-black/5'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isWarning ? (
                <ShieldCheck className="w-5 h-5 text-[#b56e54]" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-[#537568]" />
              ) : isError ? (
                <AlertCircle className="w-5 h-5 text-red-600" />
              ) : (
                <Info className="w-5 h-5 text-[#4f6878]" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              {toast.title && (
                <div className="font-semibold text-sm text-[#242b27] mb-0.5">
                  {toast.title}
                </div>
              )}
              <div className="text-xs text-[#4c5750] leading-relaxed">
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="shrink-0 p-1 text-[#748078] hover:text-[#242b27] rounded-md transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </aside>
  );
};
