// Utility to generate optimized Cloudinary video URLs based on resolution and low CPU mode

export type VideoQuality = '1080p' | '720p' | '480p' | '360p';

/**
 * Returns a lightweight low-bitrate, low-resolution stream for silent autoplay previews.
 * Drastically reduces CPU and GPU usage on mobile and desktop.
 */
export function getLowResAutoplayUrl(url: string, aspectRatio: '9:16' | '16:9' = '9:16'): string {
  if (!url) return '';
  
  if (url.includes('res.cloudinary.com') && url.includes('/video/upload/')) {
    // Replace any existing transformation with a super lightweight, low-res preview
    const scale = aspectRatio === '9:16' ? 'w_220,c_scale' : 'w_320,c_scale';
    const transform = `${scale},q_auto:eco,br_140k,f_mp4`;
    
    return url.replace(/\/video\/upload\/([^/]+\/)?/, `/video/upload/${transform}/`);
  }
  
  return url;
}

/**
 * Returns a video URL tailored to user-selected playback quality.
 */
export function getQualityVideoUrl(url: string, quality: VideoQuality): string {
  if (!url) return '';

  if (url.includes('res.cloudinary.com') && url.includes('/video/upload/')) {
    let transform = 'q_auto:good,vc_auto';

    switch (quality) {
      case '1080p':
        transform = 'q_auto:good,vc_auto';
        break;
      case '720p':
        transform = 'w_1280,c_limit,q_auto,vc_auto';
        break;
      case '480p':
        transform = 'w_854,c_limit,q_auto:eco,br_400k,f_mp4';
        break;
      case '360p':
        transform = 'w_640,c_limit,q_auto:low,br_250k,f_mp4';
        break;
    }

    return url.replace(/\/video\/upload\/([^/]+\/)?/, `/video/upload/${transform}/`);
  }

  return url;
}
