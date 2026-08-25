/* ==========================================================================
   CREATIVE VIBE - DEFAULT DATA & LOCALSTORAGE SYNC
   ========================================================================== */

const STORAGE_KEY = 'CREATIVE_VIBE_DATA_V2';

const DEFAULT_PORTFOLIO_DATA = {
  profile: {
    brandName: "Creative Vibe",
    brandTitle: "Freelance Video Editor",
    tagline: "Crafting High-Retention Stories, Cinematic Documentaries & Viral Motion Graphics",
    bio: "Hey, I'm Creative Vibe — a full-stack freelance video editor with 4+ years of experience helping top YouTubers, SaaS brands, and creators turn raw footage into high-converting visual masterpieces.",
    email: "contact.creativevibe@gmail.com",
    adminEmail: "contact.creativevibe@gmail.com",
    whatsapp: "+919876543210",
    instagram: "https://instagram.com/creativevibe.edits",
    youtube: "https://youtube.com/@creativevibe",
    twitter: "https://twitter.com/creativevibe",
    adminPin: "1234",
    customLogoUrl: "assets/logo.svg"
  },
  stats: {
    totalViews: "50M+",
    projectsCompleted: "180+",
    avgRetention: "72%",
    satisfiedClients: "45+"
  },
  categories: [
    {
      id: "documentary",
      name: "Documentaries",
      icon: "🎬",
      description: "In-depth storytelling, deep sound design, pacing & cinematic grading."
    },
    {
      id: "motion-graphics",
      name: "Motion Graphics",
      icon: "✨",
      description: "Dynamic kinetic typography, 3D element integration, and brand animations."
    },
    {
      id: "saas",
      name: "SaaS Animations",
      icon: "💻",
      description: "Clean product demos, UI/UX breakdowns, and high-converting launch videos."
    },
    {
      id: "talking-head",
      name: "Talking Head",
      icon: "🎙️",
      description: "Engaging podcast cuts, interviews, pattern interrupts & dynamic zooms."
    },
    {
      id: "vlogs",
      name: "Vlogs & Travel",
      icon: "✈️",
      description: "Seamless rhythm, story progression, upbeat soundscapes & color flair."
    },
    {
      id: "shorts-reels",
      name: "Viral Shorts & Reels",
      icon: "📱",
      description: "9:16 Vertical retention hooks, animated subtitles, memes & sound FX."
    }
  ],
  videos: [
    // 1. Documentaries (16:9 Horizontal)
    {
      id: "doc-1",
      title: "The Rise of Artificial Superintelligence | Mini Doc",
      category: "documentary",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "VoxStyle Media",
      duration: "14:20",
      views: "1.2M Views",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
      description: "Comprehensive mini-documentary featuring custom maps, kinetic text, and orchestral sound design.",
      isFeatured: true
    },
    {
      id: "doc-2",
      title: "How SpaceX Engineered the Starship Mega-Rocket",
      category: "documentary",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "AeroTech Insights",
      duration: "18:45",
      views: "890K Views",
      thumbnail: "https://images.unsplash.com/photo-1517976487507-5b3648489d1a?auto=format&fit=crop&w=1000&q=80",
      description: "High-paced technical documentary with 3D explosion diagrams and archival footage restoration.",
      isFeatured: false
    },

    // 2. Motion Graphics (16:9 Horizontal)
    {
      id: "mg-1",
      title: "Fintech Platform - 3D Isometric Explainer",
      category: "motion-graphics",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "PayFlow Global",
      duration: "01:30",
      views: "340K Views",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      description: "Futuristic UI motion, vector character rigging, and seamless transitions.",
      isFeatured: true
    },
    {
      id: "mg-2",
      title: "Cybersecurity Shield - Concept Animation",
      category: "motion-graphics",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "VaultGuard",
      duration: "00:45",
      views: "210K Views",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
      description: "Neon HUD interface animations, particle simulations, and cyber soundscapes.",
      isFeatured: false
    },

    // 3. SaaS Animations (16:9 Horizontal)
    {
      id: "saas-1",
      title: "TaskPulse AI - Product Launch Video",
      category: "saas",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "TaskPulse Inc.",
      duration: "01:15",
      views: "520K Views",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
      description: "Crisp screencast enhancements, cursor tracking, zoom zooms, and sleek product framing.",
      isFeatured: true
    },
    {
      id: "saas-2",
      title: "CloudScale - Infrastructure Management Demo",
      category: "saas",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "CloudScale Devs",
      duration: "02:10",
      views: "180K Views",
      thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
      description: "Interactive dashboard mockups, glassmorphism overlays, and feature walkthrough.",
      isFeatured: false
    },

    // 4. Talking Head (16:9 Horizontal & 9:16)
    {
      id: "th-1",
      title: "Ali Abdaal Style: 7 Habits of High Achievers",
      category: "talking-head",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "Growth Mindset TV",
      duration: "11:05",
      views: "750K Views",
      thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      description: "Clean lower thirds, paper textures, sound popups, and high retention pacing.",
      isFeatured: true
    },
    {
      id: "th-2",
      title: "Deep Dive: How to Scale a $10k/mo Agency",
      category: "talking-head",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "Founder Chronicles",
      duration: "16:30",
      views: "420K Views",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
      description: "Multi-camera switching, color matching, and engaging B-roll overlays.",
      isFeatured: false
    },

    // 5. Vlogs & Travel (16:9 Horizontal)
    {
      id: "vlog-1",
      title: "48 Hours in Tokyo: Cyberpunk Night Walk",
      category: "vlogs",
      aspectRatio: "16:9",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "Lost in Shibuya",
      duration: "09:40",
      views: "1.8M Views",
      thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
      description: "Cinematic speed ramps, neo-tokyo color grade, and ambient foley sound design.",
      isFeatured: true
    },

    // 6. Viral Shorts & Reels (9:16 Vertical)
    {
      id: "short-1",
      title: "The $1 Billion Marketing Trick You Never Noticed 🤯",
      category: "shorts-reels",
      aspectRatio: "9:16",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "Business Uncut",
      duration: "00:45",
      views: "3.4M Views",
      thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
      description: "Alex Hormozi style animated subtitles, sound hits, and hook retainers.",
      isFeatured: true
    },
    {
      id: "short-2",
      title: "How Steve Jobs Designed the iPhone in 2007",
      category: "shorts-reels",
      aspectRatio: "9:16",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "Tech Flashbacks",
      duration: "00:58",
      views: "2.1M Views",
      thumbnail: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=600&q=80",
      description: "Story-driven vertical documentary cut with archival photo 3D depth maps.",
      isFeatured: true
    },
    {
      id: "short-3",
      title: "Stop Making This Huge Video Editing Mistake!",
      category: "shorts-reels",
      aspectRatio: "9:16",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "Editor Secrets",
      duration: "00:35",
      views: "1.5M Views",
      thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80",
      description: "Fast-paced tutorial with zoom ramps and split-screen comparisons.",
      isFeatured: true
    },
    {
      id: "short-4",
      title: "How 1 Sound Effect Saved a Hollywood Movie 🎬",
      category: "shorts-reels",
      aspectRatio: "9:16",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      client: "Cinema Bites",
      duration: "00:52",
      views: "4.8M Views",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
      description: "High retention audio-driven breakdown with dynamic visual waveform.",
      isFeatured: true
    }
  ],
  pricing: [
    {
      id: "price-shorts",
      name: "Short-Form Viral Pack",
      badge: "High Velocity",
      price: "$499",
      period: "per batch of 10 Reels",
      desc: "Perfect for creators & brands scaling Instagram Reels, YouTube Shorts, & TikTok.",
      features: [
        "10 High-Retention Vertical Videos (9:16)",
        "Hormozi / Ali Abdaal animated subtitles",
        "Dynamic sound design & SFX transitions",
        "Hook optimization & pattern interrupts",
        "24-48h turnaround per batch",
        "Unlimited minor revisions"
      ],
      featured: false
    },
    {
      id: "price-longform",
      name: "YouTube & Documentary",
      badge: "Most Popular",
      price: "$1,200",
      period: "per 4 long-form videos",
      desc: "Full storytelling, custom motion graphics, pacing, and cinema color grade.",
      features: [
        "4 Long-form edits (8-20 minutes each)",
        "Advanced pacing & narrative structure",
        "Custom kinetic typography & 3D maps",
        "Pro sound mixing & Foley effects",
        "High-CTR Thumbnail design included",
        "Dedicated project manager on Slack"
      ],
      featured: true
    },
    {
      id: "price-saas",
      name: "SaaS & Motion Graphics",
      badge: "Commercial",
      price: "$850",
      period: "per custom promo / explainer",
      desc: "For tech startups and businesses needing high-converting launch & demo videos.",
      features: [
        "60-90s Premium 4K Motion Explainer",
        "Custom UI animations & isometric scenes",
        "Professional voiceover sync & license music",
        "Storyboard & script polishing included",
        "Source files (AE / Premiere) delivered",
        "Commercial usage rights worldwide"
      ],
      featured: false
    }
  ],
  reviews: [
    {
      id: "rev-1",
      clientName: "Marcus Vance",
      email: "marcus.vance@aerotech.io",
      channel: "AeroTech Insights (450K Subs) • Mini Documentaries",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      text: "Creative Vibe completely transformed our documentary series. Our average 30-day retention spiked from 38% to 68.4%, and our Starship video hit 1.2M views. Pacing, kinetic maps, and immersive sound design are top tier.",
      date: "3 days ago",
      verifiedGoogle: true
    },
    {
      id: "rev-2",
      clientName: "Sarah Chen",
      email: "sarah@taskpulse.app",
      channel: "Founder at TaskPulse SaaS • 3D UI & Product Launch",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
      text: "We needed a 90-second launch video that explained our dev tool clearly without boring users. The 3D isometric animation and sound sync were flawless. We secured over 14,000 beta signups in week one.",
      date: "1 week ago",
      verifiedGoogle: true
    },
    {
      id: "rev-3",
      clientName: "Devon Brooks",
      email: "devon@brookscreative.tv",
      channel: "Devon Vlogs (1.2M Subs) • Travel & Lifestyle",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      text: "Turnaround is fast, communication is effortless, and the music choices elevate raw camera footage to cinema grade. Working with Creative Vibe feels like having a dedicated Netflix post-production editor.",
      date: "2 weeks ago",
      verifiedGoogle: true
    }
  ]
};

class DataStore {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using defaults', e);
    }
    this.saveData(DEFAULT_PORTFOLIO_DATA);
    return JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
  }

  saveData(newData) {
    this.data = newData;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  getData() {
    return this.data;
  }

  getVideos(category = null) {
    if (!category || category === 'all') {
      return this.data.videos;
    }
    return this.data.videos.filter(v => v.category === category);
  }

  addVideo(videoObj) {
    videoObj.id = 'vid_' + Date.now();
    this.data.videos.unshift(videoObj);
    this.saveData(this.data);
    return videoObj;
  }

  updateVideo(id, updatedFields) {
    const idx = this.data.videos.findIndex(v => v.id === id);
    if (idx !== -1) {
      this.data.videos[idx] = { ...this.data.videos[idx], ...updatedFields };
      this.saveData(this.data);
      return this.data.videos[idx];
    }
    return null;
  }

  deleteVideo(id) {
    this.data.videos = this.data.videos.filter(v => v.id !== id);
    this.saveData(this.data);
  }

  updatePricing(pricingArray) {
    this.data.pricing = pricingArray;
    this.saveData(this.data);
  }

  addReview(reviewObj) {
    reviewObj.id = 'rev_' + Date.now();
    this.data.reviews.unshift(reviewObj);
    this.saveData(this.data);
    return reviewObj;
  }

  deleteReview(id) {
    this.data.reviews = this.data.reviews.filter(r => r.id !== id);
    this.saveData(this.data);
  }

  updateProfile(profileFields) {
    this.data.profile = { ...this.data.profile, ...profileFields };
    this.saveData(this.data);
  }

  resetToDefault() {
    this.saveData(JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA)));
    return this.data;
  }
}

window.appData = new DataStore();
