import React from 'react';

/**
 * Official Pixel-Perfect YouTube Play Button Logo
 */
export const RealYouTubeLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-3" }) => (
  <svg
    viewBox="0 0 28 20"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="YouTube"
  >
    <path
      d="M27.4 3.1c-.3-1.2-1.2-2.1-2.4-2.4C22.9.2 14 .2 14 .2s-8.9 0-11 .5c-1.2.3-2.1 1.2-2.4 2.4C.1 5.2.1 10 .1 10s0 4.8.5 6.9c.3 1.2 1.2 2.1 2.4 2.4 2.1.5 11 .5 11 .5s8.9 0 11-.5c1.2-.3 2.1-1.2 2.4-2.4.5-2.1.5-6.9.5-6.9s0-4.8-.5-6.9z"
      fill="#FF0000"
    />
    <polygon points="11.2,14.3 18.5,10 11.2,5.7" fill="#FFFFFF" />
  </svg>
);

/**
 * Official Pixel-Perfect LinkedIn "in" Badge Logo
 */
export const RealLinkedInLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="LinkedIn"
  >
    <rect width="24" height="24" rx="4.5" fill="#0A66C2" />
    <circle cx="6.8" cy="6.8" r="1.9" fill="#FFFFFF" />
    <rect x="5.1" y="9.8" width="3.4" height="9.1" fill="#FFFFFF" />
    <path
      d="M10.7 9.8h3.3v1.3h.05c.46-.86 1.6-1.5 3.05-1.5 3.1 0 3.7 2 3.7 4.7v4.6h-3.4v-4.3c0-1-.02-2.3-1.45-2.3-1.45 0-1.67 1.1-1.67 2.3v4.3h-3.4V9.8z"
      fill="#FFFFFF"
    />
  </svg>
);
