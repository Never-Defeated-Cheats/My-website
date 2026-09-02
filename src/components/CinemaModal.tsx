import React, { useEffect, useRef, useState } from 'react';
import { VideoItem } from '../types';
import { X, Volume2, VolumeX, Maximize2, Play, Pause } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface CinemaModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const CinemaModal: React.FC<CinemaModalProps> = ({ video, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!video) return;

    // Keyboard handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [video]);

  if (!video) return null;

  const is916 = video.aspectRatio === '9:16';
  const videoSrc = video.masterUrl || video.previewUrl;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in select-none"
    >
      {/* Video Container Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-black rounded-3xl overflow-hidden border border-[#537568]/40 shadow-2xl flex flex-col justify-center ${
          is916
            ? 'w-full max-w-[420px] max-h-[85vh] aspect-[9/16]'
            : 'w-full max-w-5xl aspect-video'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
          title="Close (Esc)"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={video.poster}
          autoPlay
          controls
          playsInline
          preload="auto"
          className="w-full h-full object-contain bg-black"
        />

        {/* Bottom Video Meta Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex items-center justify-between text-white pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
          <div>
            <div className="text-sm font-bold truncate max-w-xs sm:max-w-md">
              {video.title}
            </div>
            <div className="text-xs text-[#7ae7f9]">
              {video.client || 'Creative Vibe'} • {video.views || 'Master Edit'} • {video.aspectRatio}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
