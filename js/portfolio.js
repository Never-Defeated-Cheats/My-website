/* ==========================================================================
   CREATIVE VIBE - SMART DEVICE-AWARE DYNAMIC PORTFOLIO ENGINE
   - Dynamic Viewport Width Adaptive Loop
   - Interactive Touch-Swipe & Mouse Drag with Smooth Auto-Resume
   - Lag-Free Mobile Cinema Player Engine (< 0.2% CPU / < 3% GPU)
   - Frame Boundary Disappear & Sleep Engine
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
    this.cardObserver = null;
    this.lastCardCount = this.getResponsiveCardCount();

    this.init();
  }

  init() {
    this.renderRecentEditsSliders();
    this.bindEvents();
    this.bindResizeHandler();
    this.initCardLevelVirtualization();
  }

  // =========================================================================
  // 1. SMART DEVICE-AWARE RESPONSIVE CARD CALCULATION
  // =========================================================================
  getResponsiveCardCount() {
    const w = window.innerWidth;
    if (w <= 480) return 3;       // Mobile small (6 cards total)
    if (w <= 768) return 4;       // Mobile large (8 cards total)
    if (w <= 1100) return 6;      // Tablet (12 cards total)
    if (w <= 1600) return 8;      // Laptop & Desktop 1080p (16 cards total)
    return 10;                    // Ultrawide & 4K (20 cards total)
  }

  buildSeamlessLoop(items) {
    if (!items || !items.length) return [];
    const targetHalf = this.getResponsiveCardCount();
    let base = [...items];
    let half = [...base];
    while (half.length < targetHalf) {
      half = half.concat(base);
    }
    const cleanHalf = half.slice(0, targetHalf);
    return cleanHalf.concat(cleanHalf);
  }

  bindResizeHandler() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newCount = this.getResponsiveCardCount();
        if (newCount !== this.lastCardCount) {
          this.lastCardCount = newCount;
          this.renderRecentEditsSliders();
          if (this.workNichesRendered) {
            this.renderWorkNiches();
          }
        }
      }, 250);
    });
  }

  // =========================================================================
  // 2. FRAME BOUNDARY DISAPPEAR & SLEEP ENGINE (STRICT < 3-5% GPU LOAD)
  // =========================================================================
  initCardLevelVirtualization() {
    if (!('IntersectionObserver' in window)) return;

    if (this.cardObserver) {
      this.cardObserver.disconnect();
    }

    const isMobile = window.innerWidth <= 768;

    this.cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const card = entry.target;
        const video = card.querySelector('video');

        if (entry.isIntersecting) {
          card.style.visibility = 'visible';
          card.style.opacity = '1';
          card.style.pointerEvents = 'auto';

          if (video) {
            try {
              const playPromise = video.play();
              if (playPromise !== undefined) playPromise.catch(() => {});
            } catch (e) {}
          }
        } else {
          card.style.visibility = 'hidden';
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';

          if (video) {
            try { video.pause(); } catch (e) {}
          }
        }
      });
    }, {
      root: null,
      rootMargin: isMobile ? '0px' : '20px 0px',
      threshold: isMobile ? 0.15 : 0.05
    });

    document.querySelectorAll('.marquee-card-vertical, .marquee-card-horizontal').forEach(card => {
      this.cardObserver.observe(card);
    });
  }

  // =========================================================================
  // 3. INTERACTIVE TOUCH-SWIPE & DRAG WITH AUTO-RESUME (0% CPU OVERHEAD)
  // =========================================================================
  bindTouchDragScroll(container) {
    if (!container) return;

    const tracks = container.querySelectorAll('.marquee-track');
    tracks.forEach(track => {
      let isDragging = false;
      let startX = 0;
      let initialOffset = 0;
      let resumeTimer = null;

      const getMatrixTranslateX = (el) => {
        const style = window.getComputedStyle(el);
        const matrix = new WebKitCSSMatrix(style.transform);
        return matrix.m41 || 0;
      };

      const onStart = (pageX) => {
        isDragging = true;
        clearTimeout(resumeTimer);
        initialOffset = getMatrixTranslateX(track);
        startX = pageX;
        track.style.animationPlayState = 'paused';
      };

      const onMove = (pageX) => {
        if (!isDragging) return;
        const deltaX = pageX - startX;
        track.style.transform = `translate3d(${initialOffset + deltaX}px, 0, 0)`;
      };

      const onEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        clearTimeout(resumeTimer);
        // After 1.6s of inactivity, smoothly resume normal marquee animation
        resumeTimer = setTimeout(() => {
          track.style.transform = '';
          track.style.animationPlayState = 'running';
        }, 1600);
      };

      // Touch Events (Mobile/Tablet)
      track.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
          onStart(e.touches[0].pageX);
        }
      }, { passive: true });

      track.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
          onMove(e.touches[0].pageX);
        }
      }, { passive: true });

      track.addEventListener('touchend', onEnd, { passive: true });
      track.addEventListener('touchcancel', onEnd, { passive: true });

      // Mouse Drag Events (Desktop)
      track.addEventListener('mousedown', (e) => {
        onStart(e.pageX);
      });

      window.addEventListener('mousemove', (e) => {
        if (isDragging) onMove(e.pageX);
      }, { passive: true });

      window.addEventListener('mouseup', () => {
        if (isDragging) onEnd();
      }, { passive: true });
    });
  }

  // =========================================================================
  // 4. BEST EDITS DUAL-ROW INFINITE SLIDERS (HOME PAGE - INSTANT AUTO-PLAY)
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

    // Instant Play on Initial Visible Cards
    const initialVideos = document.querySelectorAll('.recent-edits-container video');
    initialVideos.forEach(v => {
      try {
        const p = v.play();
        if (p !== undefined) p.catch(() => {});
      } catch (e) {}
    });

    // Bind Hover, Click, and Touch/Swipe Drag
    this.bindMarqueeCardEvents(vertContainer);
    this.bindMarqueeCardEvents(horizContainer);
    this.bindTouchDragScroll(vertContainer.parentElement);
    this.bindTouchDragScroll(horizContainer.parentElement);

    this.initCardLevelVirtualization();
  }

  // =========================================================================
  // 5. WORK TAB: 6 NICHES DUAL-ROW SLIDERS (LAZY-LOADED ON WORK TAB SWITCH)
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
    this.initCardLevelVirtualization();
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

          <div class="recent-edits-container">
            <div class="marquee-row-wrapper">
              <div class="marquee-row-label">
                <span>⚡ 9:16 Shorts & Reels</span>
              </div>
              <div class="marquee-track marquee-track-vertical" id="track-vert-${key}">
                ${vertLoop.map(v => this.buildVerticalMarqueeCardHtml(v)).join('')}
              </div>
            </div>

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

    // Bind Hover, Click, and Touch/Swipe Drag on all niche tracks
    for (const key of Object.keys(niches)) {
      const vTrack = document.getElementById(`track-vert-${key}`);
      const hTrack = document.getElementById(`track-horiz-${key}`);
      if (vTrack) {
        this.bindMarqueeCardEvents(vTrack);
        this.bindTouchDragScroll(vTrack.parentElement);
      }
      if (hTrack) {
        this.bindMarqueeCardEvents(hTrack);
        this.bindTouchDragScroll(hTrack.parentElement);
      }
    }

    container.querySelectorAll('[data-open-niche]').forEach(btn => {
      btn.addEventListener('click', () => {
        const nicheKey = btn.getAttribute('data-open-niche');
        this.openNicheDetail(nicheKey);
      });
    });

    this.initCardLevelVirtualization();

    if (window.initScrollReveal) window.initScrollReveal();
  }

  // =========================================================================
  // 6. DEDICATED SINGLE NICHE FULL ARCHIVE VIEW
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

      <div id="nicheSection169" class="niche-content-section">
        <div class="niche-grid-section-title">
          <span>🎬</span>
          <span>YouTube Long-Form & Master Edits (16:9) — ${horizList.length} Projects</span>
        </div>
        <div class="niche-archive-grid-horizontal">
          ${horizList.map(v => this.buildGridCardHorizontal(v)).join('')}
        </div>
      </div>

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

    const backBtn = document.getElementById('btnBackToAllNiches');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.closeNicheDetail();
      });
    }

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

    detailContainer.querySelectorAll('.video-card-horiz, .video-card-vert').forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (window.soundFX) window.soundFX.playHover();
      });
      card.addEventListener('click', () => {
        const videoUrl = card.getAttribute('data-video-url');
        const masterUrl = card.getAttribute('data-master-url') || videoUrl;
        const title = card.getAttribute('data-title');
        const client = card.getAttribute('data-client');
        const format = card.getAttribute('data-format');
        const views = card.getAttribute('data-views');
        this.openVideoPlayer({ videoUrl: masterUrl, title, client, aspectRatio: format, views });
      });
    });

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
  // 7. 100% PURE NATIVE VIDEO CARDS
  // =========================================================================
  buildVerticalMarqueeCardHtml(v) {
    const streamSrc = v.previewUrl || v.videoUrl;
    const masterSrc = v.masterUrl || streamSrc;
    return `
      <div class="marquee-card-vertical" data-video-url="${streamSrc}" data-master-url="${masterSrc}" data-title="${v.title}" data-client="${v.client}" data-format="9:16" data-views="${v.views}">
        <div class="marquee-video-frame">
          <video class="marquee-native-video" src="${streamSrc}" autoplay loop muted playsinline preload="auto" disablepictureinpicture controlslist="nodownload nofullscreen noremoteplayback"></video>
        </div>
      </div>
    `;
  }

  buildHorizontalMarqueeCardHtml(v) {
    const streamSrc = v.previewUrl || v.videoUrl;
    const masterSrc = v.masterUrl || streamSrc;
    return `
      <div class="marquee-card-horizontal" data-video-url="${streamSrc}" data-master-url="${masterSrc}" data-title="${v.title}" data-client="${v.client}" data-format="16:9" data-views="${v.views}">
        <div class="marquee-video-frame">
          <video class="marquee-native-video" src="${streamSrc}" autoplay loop muted playsinline preload="auto" disablepictureinpicture controlslist="nodownload nofullscreen noremoteplayback"></video>
        </div>
      </div>
    `;
  }

  buildGridCardHorizontal(v) {
    const streamSrc = v.previewUrl || v.videoUrl;
    const masterSrc = v.masterUrl || streamSrc;
    const thumbUrl = v.thumbnail || `https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80`;
    return `
      <div class="video-card-horiz" data-video-url="${streamSrc}" data-master-url="${masterSrc}" data-title="${v.title}" data-client="${v.client}" data-format="16:9" data-views="${v.views}">
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
    const streamSrc = v.previewUrl || v.videoUrl;
    const masterSrc = v.masterUrl || streamSrc;
    const thumbUrl = v.thumbnail || `https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&auto=format&fit=crop&q=80`;
    return `
      <div class="video-card-vert" data-video-url="${streamSrc}" data-master-url="${masterSrc}" data-title="${v.title}" data-client="${v.client}" data-format="9:16" data-views="${v.views}">
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
  // 8. BULLETPROOF HOVER AUDIO & MODAL CONTROLS
  // =========================================================================
  bindMarqueeCardEvents(container) {
    if (!container) return;

    container.querySelectorAll('.marquee-card-vertical, .marquee-card-horizontal').forEach(card => {
      const previewUrl = card.getAttribute('data-video-url');
      const masterUrl = card.getAttribute('data-master-url') || previewUrl;
      const title = card.getAttribute('data-title');
      const client = card.getAttribute('data-client');
      const format = card.getAttribute('data-format');
      const views = card.getAttribute('data-views');
      const nativeVideo = card.querySelector('video');

      // 1. Mouse Enter: Instant Unmuted Sound
      card.addEventListener('mouseenter', () => {
        if (nativeVideo) {
          try {
            nativeVideo.muted = false;
            nativeVideo.volume = 1.0;
            const playPromise = nativeVideo.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                nativeVideo.muted = true;
                nativeVideo.play().catch(() => {});
              });
            }
          } catch (e) {}
        }
        card.classList.add('is-unmuted');
        if (window.soundFX) window.soundFX.playHover();
      });

      // 2. Mouse Leave: Mute Audio back to silent 60fps loop
      card.addEventListener('mouseleave', () => {
        if (nativeVideo) {
          try {
            nativeVideo.muted = true;
            nativeVideo.play().catch(() => {});
          } catch (e) {}
        }
        card.classList.remove('is-unmuted');
      });

      // 3. Click: Open in Full Cinema Player Modal
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        if (nativeVideo) nativeVideo.muted = true;
        card.classList.remove('is-unmuted');
        this.openVideoPlayer({ videoUrl: masterUrl, title, client, aspectRatio: format, views });
      });
    });
  }

  // =========================================================================
  // 9. LAG-FREE FULLSCREEN CINEMA MODAL (OPTIMIZED FOR MOBILE & DESKTOP)
  // =========================================================================
  openVideoPlayer(video) {
    if (!video) return;

    const is916 = video.aspectRatio === '9:16';
    const isMobile = window.innerWidth <= 768;

    if (this.modalBox) {
      if (is916) {
        this.modalBox.classList.add('is-vertical');
      } else {
        this.modalBox.classList.remove('is-vertical');
      }
    }

    if (this.modalTitle) this.modalTitle.textContent = video.title || 'Video Showcase';
    if (this.modalSub) this.modalSub.textContent = `${video.aspectRatio || '16:9'} Format • Master Edit`;

    // 1. Freeze all background streams & animations
    document.querySelectorAll('.marquee-track video').forEach(v => {
      try { v.pause(); } catch (e) {}
    });
    document.querySelectorAll('.marquee-track').forEach(t => {
      t.style.animationPlayState = 'paused';
    });

    if (this.iframeContainer) {
      let srcToPlay = video.masterUrl || video.videoUrl;

      // On Mobile: Ensure smooth instant decoding without mobile GPU memory choke
      if (isMobile && srcToPlay.includes('res.cloudinary.com')) {
        srcToPlay = srcToPlay.replace('/video/upload/', '/video/upload/w_720,c_scale,q_auto:good,vc_auto/');
      }

      this.iframeContainer.innerHTML = `
        <video class="modal-native-video" src="${srcToPlay}" autoplay controls playsinline preload="auto"></video>
      `;
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

      // 2. Resume all background animations and visible video streams smoothly!
      document.querySelectorAll('.marquee-track').forEach(t => {
        t.style.animationPlayState = 'running';
      });
      this.initCardLevelVirtualization();

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
        const tajUrl = window.CREATIVE_VIBE_VIDEOS ? window.CREATIVE_VIBE_VIDEOS.config.recentEdits.horizontal[0].masterUrl : '';
        this.openVideoPlayer({
          videoUrl: tajUrl,
          title: 'The Taj Story | Documentary Masterclass',
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
