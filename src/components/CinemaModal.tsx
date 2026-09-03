import React, { useEffect } from 'react';
import { VideoItem } from '../types';
import { X } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { CustomVideoPlayer } from './CustomVideoPlayer';

interface CinemaModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const CinemaModal: React.FC<CinemaModalProps> = ({ video, onClose }) => {
  useEffect(() => {
    if (!video) return;

    // Lock background scroll and pause all background marquee animations for 0% background GPU usage
    document.body.style.overflow = 'hidden';
    document.body.classList.add('cinema-modal-active');

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('cinema-modal-active');
    };
  }, [video]);

  if (!video) return null;

  const videoSrc = video.masterUrl || video.previewUrl;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl flex flex-col items-center justify-center"
      >
        {/* Close Button - Responsive Position & 44px Touch Target */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute -top-12 right-0 sm:right-2 z-50 w-11 h-11 rounded-full bg-white/15 hover:bg-red-600 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
          title="Close (Esc)"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Custom Video Player Instance */}
        <CustomVideoPlayer
          src={videoSrc}
          poster={video.poster}
          title={video.title}
          client={video.client}
          aspectRatio={video.aspectRatio}
          autoPlay={true}
          onClose={onClose}
        />

        {/* Video Info Header Card */}
        <div className="w-full max-w-4xl mt-4 px-4 py-3 bg-[#161a18] border border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-white shadow-lg">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white">
              {video.title}
            </h3>
            <p className="text-xs text-[#7ae7f9]">
              {video.client || 'Creative Vibe Original'} • {video.views || 'Master Edit'} • {video.aspectRatio}
            </p>
          </div>

          <div className="text-[11px] font-mono text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10">
            Press [Space] to Play/Pause • [F] Fullscreen • [M] Mute
          </div>
        </div>
      </div>
    </div>
  );
};
