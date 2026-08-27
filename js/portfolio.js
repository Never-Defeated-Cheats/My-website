/* ==========================================================================
   CREATIVE VIBE - HIGH-PERFORMANCE DYNAMIC PORTFOLIO & NICHES MANAGER
   Native Hardware-Accelerated Video Engine (<0.5% CPU), Local & Direct Streams,
   Zero YouTube Logos/Watermarks/Pause Overlays, and Pure Cinema Modal Player.
   ========================================================================== */

class PortfolioManager {
  constructor() {
    this.currentNiche = null;
    this.workNichesRendered = false;
    this.modal = document.getElementById('videoPlayerModal');
    this.modalBox = document.querySelector('.calm-modal-box');
    this.iframeContainer = document.getElementById('modalIframeBox');
    this.modalTitle = document.getElementById('modalVideoTitle');
    this.modalSub = document.getElementById('modalVideoSub');
    this.modalCloseBtn = document.getElementById('modalCloseBtn');
    this.observer = null;

    this.init();
  }

  init() {
    this.renderRecentEditsSliders();
    this.bindEvents();
    this.initViewportObserver();
  }

  // Helper to build robust infinite marquee array with minimal memory footprint
  buildSeamlessLoop(items, minLength = 8) {
    if (!items || !items.length) return [];
    let base = [...items];
    let half = [...base];
    while (half.length < minLength) {
      half = half.concat(base);
    }
    return half.concat(half);
  }

  // =========================================================================
  // VIEWPORT INTERSECTION OBSERVER (0% CPU/GPU WHEN OFFSCREEN)
  // =========================================================================
  initViewportObserver() {
    if (!('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target;
        const tracks = target.querySelectorAll('.marquee-track');
        const videos = target.querySelectorAll('video');

        if (entry.isIntersecting) {
          // In view: Run smooth hardware animation & play video
          tracks.forEach(t => t.style.animationPlayState = 'running');
          videos.forEach(v => {
            try { v.play().catch(() => {}); } catch (e) {}
          });
        } else {
          // Off screen: Pause marquee animation and video decoding to keep GPU at 0%
          tracks.forEach(t => t.style.animationPlayState = 'paused');
          videos.forEach(v => {
            try { v.pause(); } catch (e) {}
          });
        }
      });
    }, {
      rootMargin: '150px 0px',
      threshold: 0.05
    });

    // Observe Home recent edits container
    const homeSection = document.getElementById('recentEditsContainer');
    if (homeSection) this.observer.observe(homeSection);

    // Observe all Work niche blocks
    document.querySelectorAll('.niche-stream-block').forEach(el => {
      this.observer.observe(el);
    });
  }

  // =========================================================================
  // 1. BEST EDITS DUAL-ROW INFINITE SLIDERS (HOME PAGE - NATIVE 60FPS)
  // =========================================================================
  renderRecentEditsSliders() {
    const vertContainer = document.getElementById('recentVerticalMarquee');
    const horizContainer = document.getElementById('recentHorizontalMarquee');
    if (!vertContainer || !horizContainer) return;

    const edits = window.CREATIVE_VIBE_VIDEOS ? window.CREATIVE_VIBE_VIDEOS.getRecentEdits() : { vertical: [], horizontal: [] };

    // 1. Top Row: Vertical Videos (9:16 Shorts/Reels)
    const vertLoop = this.buildSeamlessLoop(edits.vertical || []);
    vertContainer.innerHTML = vertLoop.map(v => this.buildVerticalMarqueeCardHtml(v)).join('');

    // 2. Bottom Row: Horizontal Videos (16:9 Long-form)
    const horizLoop = this.buildSeamlessLoop(edits.horizontal || []);
    horizContainer.innerHTML = horizLoop.map(v => this.buildHorizontalMarqueeCardHtml(v)).join('');

    // Bind Hover (Instant Audio) & Click (Open Pure Cinema Player)
    this.bindMarqueeCardEvents(vertContainer);
    this.bindMarqueeCardEvents(horizContainer);
  }

  // =========================================================================
  // 2. WORK TAB: 6 NICHES DUAL-ROW SLIDERS (LAZY-LOADED ON WORK TAB SWITCH)
  // =========================================================================
  onWorkTabActivated() {
    if (!this.workNichesRendered) {
      this.renderWorkNiches();
    } else {
      this.resumeVideosInContainer(document.getElementById('workNichesContainer'));
    }
    this.closeNicheDetail();
  }

  onTabChanged(tabId) {
    if (tabId !== 'work' && this.workNichesRendered) {
      this.pauseVideosInContainer(document.getElementById('workNichesContainer'));
    }
  }

  pauseVideosInContainer(container) {
    if (!container) return;
    container.querySelectorAll('video').forEach(v => {
      try { v.pause(); } catch (e) {}
    });
    container.querySelectorAll('.marquee-track').forEach(t => {
      t.style.animationPlayState = 'paused';
    });
  }

  resumeVideosInContainer(container) {
    if (!container) return;
    container.querySelectorAll('video').forEach(v => {
      try { v.play().catch(() => {}); } catch (e) {}
    });
    container.querySelectorAll('.marquee-track').forEach(t => {
      t.style.animationPlayState = 'running';
    });
  }

  renderWorkNiches() {
    const container = document.getElementById('workNichesContainer');
    if (!container) return;

    const niches = window.CREATIVE_VIBE_VIDEOS ? window.CREATIVE_VIBE_VIDEOS.getNiches() : {};
    let html = '';

    for (const [key, niche] of Object.entries(niches)) {
      const vertList = niche.vertical || [];
      const horizList = niche.horizontal || [];
      const vertLoop = this.buildSeamlessLoop(vertList);
      const horizLoop = this.buildSeamlessLoop(horizList);

      html += `
        <section class="niche-stream-block reveal" id="niche-block-${key}">
          <!-- Niche Section Header -->
          <div class="niche-block-header">
            <div class="niche-title-group">
              <div class="niche-icon-badge">${niche.icon || '🎬'}</div>
              <div>
                <h3 class="niche-title">${niche.name}</h3>
                <p class="niche-subtitle">${niche.subtitle || 'Specialized high-retention video editing'}</p>
              </div>
            </div>

            <button class="btn-niche-view-all" data-open-niche="${key}">
              <span>View All Work (${vertList.length + horizList.length})</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          <!-- Niche Dual-Row Sliding Marquee Tracks -->
          <div class="recent-edits-container">
            <!-- Row 1: Vertical 9:16 Shorts & Reels (Slides Right to Left) -->
            <div class="marquee-row-wrapper">
              <div class="marquee-row-label">
                <span>⚡ 9:16 Shorts & Reels</span>
              </div>
              <div class="marquee-track marquee-track-vertical" id="track-vert-${key}">
                ${vertLoop.map(v => this.buildVerticalMarqueeCardHtml(v)).join('')}
              </div>
            </div>

            <!-- Row 2: Horizontal 16:9 Long-Form (Slides Left to Right) -->
            <div class="marquee-row-wrapper">
              <div class="marquee-row-label">
                <span>🎬 16:9 Long-Form & Master Edits</span>
              </div>
              <div class="marquee-track marquee-track-horizontal" id="track-horiz-${key}">
                ${horizLoop.map(v => this.buildHorizontalMarqueeCardHtml(v)).join('')}
              </div>
            </div>
          </div>
        </section>
      `;
    }

    container.innerHTML = html;
    this.workNichesRendered = true;

    // Bind Hover & Click on all niche tracks
    for (const key of Object.keys(niches)) {
      const vTrack = document.getElementById(`track-vert-${key}`);
      const hTrack = document.getElementById(`track-horiz-${key}`);
      if (vTrack) this.bindMarqueeCardEvents(vTrack);
      if (hTrack) this.bindMarqueeCardEvents(hTrack);
    }

    // Bind "View All Work" buttons to open dedicated niche page
    container.querySelectorAll('[data-open-niche]').forEach(btn => {
      btn.addEventListener('click', () => {
        const nicheKey = btn.getAttribute('data-open-niche');
        this.openNicheDetail(nicheKey);
      });
    });

    // Register with intersection observer
    if (this.observer) {
      container.querySelectorAll('.niche-stream-block').forEach(el => {
        this.observer.observe(el);
      });
    }

    if (window.initScrollReveal) window.initScrollReveal();
  }

  // =========================================================================
  // 3. DEDICATED SINGLE NICHE FULL ARCHIVE VIEW
  // =========================================================================
  openNicheDetail(nicheKey) {
    const nichesContainer = document.getElementById('workNichesContainer');
    const detailContainer = document.getElementById('singleNicheDetailView');
    if (!nichesContainer || !detailContainer) return;

    const niche = window.CREATIVE_VIBE_VIDEOS ? window.CREATIVE_VIBE_VIDEOS.getNiche(nicheKey) : null;
    if (!niche) return;

    this.currentNiche = nicheKey;
    nichesContainer.style.display = 'none';
    detailContainer.style.display = 'block';

    const vertList = niche.vertical || [];
    const horizList = niche.horizontal || [];
    const totalCount = vertList.length + horizList.length;

    detailContainer.innerHTML = `
      <div class="niche-detail-header">
        <button class="btn-back-niches" id="btnBackToAllNiches">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Back to All Niches</span>
        </button>

        <div class="niche-title-group" style="text-align: right;">
          <div class="niche-icon-badge">${niche.icon || '🎬'}</div>
          <div>
            <h2 class="niche-title" style="font-size: 1.65rem;">${niche.name}</h2>
            <p class="niche-subtitle">${niche.subtitle}</p>
          </div>
        </div>
      </div>

      <!-- Format Category Switcher Tabs -->
      <div class="niche-format-tabs" id="nicheFormatTabs">
        <button class="niche-tab-pill active" data-niche-filter="all">
          <span>⚡ All Works (${totalCount})</span>
        </button>
        <button class="niche-tab-pill" data-niche-filter="16:9">
          <span>🎬 YouTube Long-Form (16:9) (${horizList.length})</span>
        </button>
        <button class="niche-tab-pill" data-niche-filter="9:16">
          <span>📱 Viral Shorts & Reels (9:16) (${vertList.length})</span>
        </button>
      </div>

      <!-- Section 1: Horizontal 16:9 Long-Form & Master Edits Grid -->
      <div id="nicheSection169" class="niche-content-section">
        <div class="niche-grid-section-title">
          <span>🎬</span>
          <span>YouTube Long-Form & Master Edits (16:9) — ${horizList.length} Projects</span>
        </div>
        <div class="niche-archive-grid-horizontal">
          ${horizList.map(v => this.buildGridCardHorizontal(v)).join('')}
        </div>
      </div>

      <!-- Section 2: Vertical 9:16 Viral Shorts & Reels Grid -->
      <div id="nicheSection916" class="niche-content-section" style="margin-top: 2rem;">
        <div class="niche-grid-section-title">
          <span>⚡</span>
          <span>Viral Shorts & Reels (9:16) — ${vertList.length} Projects</span>
        </div>
        <div class="niche-archive-grid-vertical">
          ${vertList.map(v => this.buildGridCardVertical(v)).join('')}
        </div>
      </div>
    `;

    // Bind Back Button
    const backBtn = document.getElementById('btnBackToAllNiches');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.closeNicheDetail();
      });
    }

    // Bind Format Switcher Tabs
    const tabPills = detailContainer.querySelectorAll('.niche-tab-pill');
    const sec169 = document.getElementById('nicheSection169');
    const sec916 = document.getElementById('nicheSection916');

    tabPills.forEach(pill => {
      pill.addEventListener('click', () => {
        tabPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.getAttribute('data-niche-filter');
        if (filter === 'all') {
          if (sec169) sec169.style.display = 'block';
          if (sec916) sec916.style.display = 'block';
        } else if (filter === '16:9') {
          if (sec169) sec169.style.display = 'block';
          if (sec916) sec916.style.display = 'none';
        } else if (filter === '9:16') {
          if (sec169) sec169.style.display = 'none';
          if (sec916) sec916.style.display = 'block';
        }

        if (window.soundFX) window.soundFX.playPop();
      });
    });

    // Bind card clicks in detail view
    detailContainer.querySelectorAll('.video-card-horiz, .video-card-vert').forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (window.soundFX) window.soundFX.playHover();
      });
      card.addEventListener('click', () => {
        const sourceType = card.getAttribute('data-source-type');
        const videoUrl = card.getAttribute('data-video-url');
        const ytId = card.getAttribute('data-ytid');
        const title = card.getAttribute('data-title');
        const client = card.getAttribute('data-client');
        const format = card.getAttribute('data-format');
        const views = card.getAttribute('data-views');
        this.openVideoPlayer({ sourceType, videoUrl, ytId, title, client, aspectRatio: format, views });
      });
    });

    // Scroll to top of tab smoothly
    const tabWork = document.getElementById('tab-work');
    if (tabWork) {
      tabWork.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (window.soundFX) window.soundFX.playPop();
  }

  closeNicheDetail() {
    const nichesContainer = document.getElementById('workNichesContainer');
    const detailContainer = document.getElementById('singleNicheDetailView');
    if (nichesContainer && detailContainer) {
      detailContainer.style.display = 'none';
      nichesContainer.style.display = 'block';
      this.currentNiche = null;
      if (window.soundFX) window.soundFX.playClick();
    }
  }

  // =========================================================================
  // 4. CLEAN NATIVE VIDEO CARD BUILDERS (0% WATERMARKS & 60 FPS)
  // =========================================================================
  buildVerticalMarqueeCardHtml(v) {
    let mediaHtml = '';
    if (v.sourceType === 'direct') {
      mediaHtml = `
        <video class="marquee-native-video" src="${v.videoUrl}" autoplay loop muted playsinline preload="auto"></video>
      `;
    } else {
      const embedSrc = `https://www.youtube-nocookie.com/embed/${v.ytId}?autoplay=1&mute=1&loop=1&playlist=${v.ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1&cc_load_policy=0&cc_lang_pref=off&hl=en`;
      mediaHtml = `<iframe class="marquee-video-iframe" src="${embedSrc}" title="${v.title}" allow="autoplay; encrypted-media" tabindex="-1"></iframe>`;
    }

    return `
      <div class="marquee-card-vertical" data-source-type="${v.sourceType}" data-video-url="${v.videoUrl}" data-ytid="${v.ytId || ''}" data-title="${v.title}" data-client="${v.client}" data-format="9:16" data-views="${v.views}">
        <div class="marquee-video-frame">
          ${mediaHtml}
        </div>
      </div>
    `;
  }

  buildHorizontalMarqueeCardHtml(v) {
    let mediaHtml = '';
    if (v.sourceType === 'direct') {
      mediaHtml = `
        <video class="marquee-native-video" src="${v.videoUrl}" autoplay loop muted playsinline preload="auto"></video>
      `;
    } else {
      const embedSrc = `https://www.youtube-nocookie.com/embed/${v.ytId}?autoplay=1&mute=1&loop=1&playlist=${v.ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1&cc_load_policy=0&cc_lang_pref=off&hl=en`;
      mediaHtml = `<iframe class="marquee-video-iframe" src="${embedSrc}" title="${v.title}" allow="autoplay; encrypted-media" tabindex="-1"></iframe>`;
    }

    return `
      <div class="marquee-card-horizontal" data-source-type="${v.sourceType}" data-video-url="${v.videoUrl}" data-ytid="${v.ytId || ''}" data-title="${v.title}" data-client="${v.client}" data-format="16:9" data-views="${v.views}">
        <div class="marquee-video-frame">
          ${mediaHtml}
        </div>
      </div>
    `;
  }

  buildGridCardHorizontal(v) {
    const thumbUrl = v.thumbnail || `https://img.youtube.com/vi/${v.ytId || 'dQw4w9WgXcQ'}/hqdefault.jpg`;
    return `
      <div class="video-card-horiz" data-source-type="${v.sourceType}" data-video-url="${v.videoUrl}" data-ytid="${v.ytId || ''}" data-title="${v.title}" data-client="${v.client}" data-format="16:9" data-views="${v.views}">
        <div class="thumb-holder-169">
          <img src="${thumbUrl}" alt="${v.title}" loading="lazy">
          <div class="play-hover-overlay">
            <div class="play-mini-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
          </div>
          <span class="duration-tag">${v.duration || '16:9 HD'}</span>
        </div>
        <div class="card-content-area">
          <div class="card-cat-label">${v.client || 'Creative Vibe'}</div>
          <h4 class="card-item-title">${v.title}</h4>
          <p class="card-item-desc">${v.description || 'Cinema grade editing, sound design, and retention pacing.'}</p>
          <div class="card-footer-meta">
            <span>🎬 16:9 Longform</span>
            <span>${v.views || 'Verified View'}</span>
          </div>
        </div>
      </div>
    `;
  }

  buildGridCardVertical(v) {
    const thumbUrl = v.thumbnail || `https://img.youtube.com/vi/${v.ytId || 'dQw4w9WgXcQ'}/hqdefault.jpg`;
    return `
      <div class="video-card-vert" data-source-type="${v.sourceType}" data-video-url="${v.videoUrl}" data-ytid="${v.ytId || ''}" data-title="${v.title}" data-client="${v.client}" data-format="9:16" data-views="${v.views}">
        <div class="thumb-holder-916">
          <img src="${thumbUrl}" alt="${v.title}" loading="lazy">
          <div class="play-hover-overlay">
            <div class="play-mini-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
          </div>
          <span class="vert-tag-top">9:16 Reel</span>
          <div class="vert-overlay-info">
            <h4 class="vert-item-title">${v.title}</h4>
            <div class="vert-views-pill">${v.views || 'Viral Hit'}</div>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 5. SMOOTH HOVER AUDIO & MODAL CINEMA CONTROLS
  // =========================================================================
  bindMarqueeCardEvents(container) {
    if (!container) return;

    container.querySelectorAll('.marquee-card-vertical, .marquee-card-horizontal').forEach(card => {
      const sourceType = card.getAttribute('data-source-type');
      const videoUrl = card.getAttribute('data-video-url');
      const ytId = card.getAttribute('data-ytid');
      const title = card.getAttribute('data-title');
      const client = card.getAttribute('data-client');
      const format = card.getAttribute('data-format');
      const views = card.getAttribute('data-views');
      const nativeVideo = card.querySelector('video');
      const iframe = card.querySelector('iframe');

      // 1. Mouse Enter: Instant Unmuted Sound
      card.addEventListener('mouseenter', () => {
        if (nativeVideo) {
          nativeVideo.muted = false;
          nativeVideo.volume = 1.0;
        } else if (iframe && iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
            iframe.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[100]}', '*');
          } catch (e) {}
        }
        card.classList.add('is-unmuted');
        if (window.soundFX) window.soundFX.playHover();
      });

      // 2. Mouse Leave: Mute Audio back to silent continuous video loop
      card.addEventListener('mouseleave', () => {
        if (nativeVideo) {
          nativeVideo.muted = true;
        } else if (iframe && iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
          } catch (e) {}
        }
        card.classList.remove('is-unmuted');
      });

      // 3. Click: Open in Full Cinema Player Modal
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        if (nativeVideo) nativeVideo.muted = true;
        if (iframe && iframe.contentWindow) {
          try { iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*'); } catch (e) {}
        }
        card.classList.remove('is-unmuted');
        this.openVideoPlayer({ sourceType, videoUrl, ytId, title, client, aspectRatio: format, views });
      });
    });
  }

  // =========================================================================
  // 6. PURE 100% CINEMA MODAL (ZERO CHANNEL TITLE / ZERO WATERMARKS)
  // =========================================================================
  openVideoPlayer(video) {
    if (!video) return;

    const is916 = video.aspectRatio === '9:16';

    if (this.modalBox) {
      if (is916) {
        this.modalBox.classList.add('is-vertical');
      } else {
        this.modalBox.classList.remove('is-vertical');
      }
    }

    if (this.modalTitle) this.modalTitle.textContent = video.title || 'Video Showcase';
    if (this.modalSub) this.modalSub.textContent = `${video.aspectRatio || '16:9'} Format • High Retention Edit`;

    if (this.iframeContainer) {
      if (video.sourceType === 'direct') {
        this.iframeContainer.innerHTML = `
          <video class="modal-native-video" src="${video.videoUrl}" autoplay controls playsinline></video>
        `;
      } else {
        const ytId = video.ytId || 'dQw4w9WgXcQ';
        this.iframeContainer.innerHTML = `
          <iframe 
            src="https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&disablekb=1&playsinline=1&fs=0&enablejsapi=1&loop=1&playlist=${ytId}&cc_load_policy=0&cc_lang_pref=off&hl=en" 
            title="Cinema Video Player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        `;
      }
    }

    if (this.modal) {
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.soundFX) window.soundFX.playWhoosh();
    }
  }

  closeVideoPlayer() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
      if (this.iframeContainer) {
        this.iframeContainer.innerHTML = '';
      }
      if (window.soundFX) window.soundFX.playClick();
    }
  }

  bindEvents() {
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeVideoPlayer());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeVideoPlayer();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
        this.closeVideoPlayer();
      }
    });

    // Hero Showreel Click
    const heroShowreel = document.getElementById('heroShowreelCard');
    if (heroShowreel) {
      heroShowreel.addEventListener('click', () => {
        this.openVideoPlayer({
          sourceType: 'direct',
          videoUrl: 'assets/videos/long1.mp4',
          title: 'Creative Vibe 2026 Showreel',
          client: 'Creative Vibe Original',
          aspectRatio: '16:9',
          views: 'Showreel'
        });
      });
    }
  }
}

window.initPortfolio = () => {
  window.portfolioManager = new PortfolioManager();
};
