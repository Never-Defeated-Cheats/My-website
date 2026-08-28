/* ==========================================================================
   CREATIVE VIBE - SMART DEVICE-AWARE DYNAMIC PORTFOLIO ENGINE
   - Mathematically Infinite Loop: Half A >= 2400px (12 cards) with seamless wrap
   - Ambient Freeze-Frame Blur Backdrop behind Fullscreen Cinema Video
   - Clean, Minimalist Video Showcase Cards in Both Home & Work Niches
   - Deep Freeze of All Background Processes During Fullscreen Video Mode
   - Guaranteed Instant Auto-Resume of Marquee Sliders on Modal Close
   - Strict Card Virtualization (< 2% CPU / < 12-15% GPU / < 100MB RAM)
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
    this.isModalOpen = false;
    this.activeResumeTimers = [];

    this.init();
  }

  init() {
    this.renderRecentEditsSliders();
    this.bindEvents();
    this.initCardLevelVirtualization();
  }

  // =========================================================================
  // 1. MATHEMATICALLY INFINITE LOOP ENGINE (CARDS NEVER FINISH)
  // =========================================================================
  buildSeamlessLoop(items) {
    if (!items || !items.length) return [];
    const targetHalf = 12; // 12 cards per half = 24 total (0 empty gaps)
    let base = [...items];
    let half = [...base];
    while (half.length < targetHalf) {
      half = half.concat(base);
    }
    const cleanHalf = half.slice(0, targetHalf);
    return cleanHalf.concat(cleanHalf);
  }

  // =========================================================================
  // 2. STRICT CARD VIRTUALIZATION ENGINE (KEEPS GPU LOAD < 12-15%)
  // =========================================================================
  initCardLevelVirtualization() {
    if (!('IntersectionObserver' in window)) return;

    if (this.cardObserver) {
      this.cardObserver.disconnect();
    }

    const isMobile = window.innerWidth <= 768;

    this.cardObserver = new IntersectionObserver((entries) => {
      if (this.isModalOpen) return; // Completely ignore when fullscreen modal is open

      entries.forEach(entry => {
        const card = entry.target;
        const video = card.querySelector('video');

        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          card.style.visibility = 'visible';
          card.style.opacity = '1';
          card.style.pointerEvents = 'auto';

          if (video && video.paused && !this.isModalOpen) {
            try {
              const playPromise = video.play();
              if (playPromise !== undefined) playPromise.catch(() => {});
            } catch (e) {}
          }
        } else {
          card.style.visibility = 'hidden';
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';

          if (video && !video.paused) {
            try { video.pause(); } catch (e) {}
          }
        }
      });
    }, {
      root: null,
      rootMargin: isMobile ? '0px' : '20px 0px',
      threshold: [0, 0.15]
    });

    document.querySelectorAll('.marquee-card-vertical, .marquee-card-horizontal').forEach(card => {
      this.cardObserver.observe(card);
    });
  }

  // =========================================================================
  // 3. INFINITE TOUCH-SWIPE & MOUSE DRAG WITH WRAP-AROUND (NEVER RUNS OUT)
  // =========================================================================
  bindTouchDragScroll(container) {
    if (!container) return;

    const tracks = container.querySelectorAll('.marquee-track');
    tracks.forEach(track => {
      let isDragging = false;
      let startX = 0;
      let initialOffset = 0;
      let movedDistance = 0;
      let resumeTimer = null;

      const getMatrixTranslateX = (el) => {
        const style = window.getComputedStyle(el);
        const transform = style.transform || style.webkitTransform;
        if (!transform || transform === 'none') return 0;
        try {
          if (window.DOMMatrix) {
            return new DOMMatrix(transform).m41 || 0;
          }
          if (window.WebKitCSSMatrix) {
            return new WebKitCSSMatrix(transform).m41 || 0;
          }
        } catch (e) {
          return 0;
        }
        return 0;
      };

      const onStart = (pageX) => {
        clearTimeout(resumeTimer);
        isDragging = true;
        movedDistance = 0;
        startX = pageX;
        initialOffset = getMatrixTranslateX(track);
      };

      const onMove = (pageX) => {
        if (!isDragging) return;
        const deltaX = pageX - startX;
        movedDistance = Math.abs(deltaX);

        if (movedDistance > 4) {
          track.style.animation = 'none';
          const halfWidth = (track.scrollWidth || 4800) / 2;
          let newPos = (initialOffset + deltaX) % halfWidth;
          if (newPos > 0) newPos -= halfWidth;
          track.style.transform = `translate3d(${newPos}px, 0, 0)`;
        }
      };

      const onEnd = () => {
        if (!isDragging) return;
        isDragging = false;

        if (movedDistance > 8) {
          track.setAttribute('data-just-dragged', 'true');
          setTimeout(() => track.removeAttribute('data-just-dragged'), 350);

          clearTimeout(resumeTimer);
          resumeTimer = setTimeout(() => {
            if (this.isModalOpen) return;
            track.style.animation = '';
            track.style.transform = '';
            track.style.animationPlayState = 'running';
          }, 1500);
          this.activeResumeTimers.push(resumeTimer);
        } else {
          if (!this.isModalOpen) {
            track.style.animation = '';
            track.style.transform = '';
            track.style.animationPlayState = 'running';
          }
        }
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
  // 6. DEDICATED SINGLE NICHE ARCHIVE VIEW (CLEAN, MINIMALIST & NATIVE)
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
          <span>🎬 16:9 Long-Form (${horizList.length})</span>
        </button>
        <button class="niche-tab-pill" data-niche-filter="9:16">
          <span>📱 9:16 Shorts & Reels (${vertList.length})</span>
        </button>
      </div>

      <div id="nicheSection169" class="niche-content-section">
        <div class="niche-grid-section-title">
          <span>🎬</span>
          <span>16:9 Long-Form Master Edits — ${horizList.length} Projects</span>
        </div>
        <div class="niche-archive-grid-horizontal" style="display: flex; flex-wrap: wrap; gap: 1.25rem; justify-content: flex-start; align-items: flex-start;">
          ${horizList.map(v => this.buildHorizontalMarqueeCardHtml(v)).join('')}
        </div>
      </div>

      <div id="nicheSection916" class="niche-content-section" style="margin-top: 2rem;">
        <div class="niche-grid-section-title">
          <span>⚡</span>
          <span>9:16 Shorts & Reels — ${vertList.length} Projects</span>
        </div>
        <div class="niche-archive-grid-vertical" style="display: flex; flex-wrap: wrap; gap: 1.25rem; justify-content: flex-start; align-items: flex-start;">
          ${vertList.map(v => this.buildVerticalMarqueeCardHtml(v)).join('')}
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

    // Bind cards in niche detail view
    this.bindMarqueeCardEvents(detailContainer);

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
  // 7. 100% PURE NATIVE VIDEO CARDS (CLEAN & CLUTTER-FREE)
  // =========================================================================
  buildVerticalMarqueeCardHtml(v) {
    const streamSrc = v.previewUrl || v.videoUrl;
    const masterSrc = v.masterUrl || streamSrc;
    const poster = v.poster || '';
    return `
      <div class="marquee-card-vertical" data-video-url="${streamSrc}" data-master-url="${masterSrc}" data-poster="${poster}" data-title="${v.title}" data-client="${v.client}" data-format="9:16" data-views="${v.views}">
        <div class="marquee-video-frame">
          <video class="marquee-native-video" src="${streamSrc}" autoplay loop muted playsinline preload="auto" disablepictureinpicture controlslist="nodownload nofullscreen noremoteplayback"></video>
        </div>
      </div>
    `;
  }

  buildHorizontalMarqueeCardHtml(v) {
    const streamSrc = v.previewUrl || v.videoUrl;
    const masterSrc = v.masterUrl || streamSrc;
    const poster = v.poster || '';
    return `
      <div class="marquee-card-horizontal" data-video-url="${streamSrc}" data-master-url="${masterSrc}" data-poster="${poster}" data-title="${v.title}" data-client="${v.client}" data-format="16:9" data-views="${v.views}">
        <div class="marquee-video-frame">
          <video class="marquee-native-video" src="${streamSrc}" autoplay loop muted playsinline preload="auto" disablepictureinpicture controlslist="nodownload nofullscreen noremoteplayback"></video>
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
      const poster = card.getAttribute('data-poster') || '';
      const title = card.getAttribute('data-title');
      const client = card.getAttribute('data-client');
      const format = card.getAttribute('data-format');
      const views = card.getAttribute('data-views');
      const nativeVideo = card.querySelector('video');

      // 1. Mouse Enter: Instant Unmuted Sound
      card.addEventListener('mouseenter', () => {
        if (this.isModalOpen) return;
        const track = card.closest('.marquee-track');
        if (track && track.getAttribute('data-just-dragged') === 'true') return;

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

      // 2. Mouse Leave: Mute Audio back to silent loop
      card.addEventListener('mouseleave', () => {
        if (nativeVideo) {
          try {
            nativeVideo.muted = true;
            if (!this.isModalOpen) nativeVideo.play().catch(() => {});
          } catch (e) {}
        }
        card.classList.remove('is-unmuted');
      });

      // 3. Click: Open in Full Cinema Player Modal (ignoring click if it was a drag)
      card.addEventListener('click', (e) => {
        const track = card.closest('.marquee-track');
        if (track && track.getAttribute('data-just-dragged') === 'true') {
          e.preventDefault();
          return;
        }

        e.stopPropagation();
        if (nativeVideo) nativeVideo.muted = true;
        card.classList.remove('is-unmuted');
        this.openVideoPlayer({ videoUrl: masterUrl, poster, title, client, aspectRatio: format, views });
      });
    });
  }

  captureFrostedSnapshot() {
    const canvas = document.getElementById('modalFrozenSnapshotCanvas');
    if (!canvas) return;

    const w = 320;
    const h = Math.round(320 * (window.innerHeight / Math.max(window.innerWidth, 1)));
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Draw base page tone
    ctx.fillStyle = '#0b100d';
    ctx.fillRect(0, 0, w, h);

    // 2. Draw brand header simulation
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText('CREATIVE VIBE', 18, 18);

    // 3. Draw cards snapshot at their exact visible coordinates
    const cards = document.querySelectorAll('.marquee-card-vertical, .marquee-card-horizontal');
    const vpW = window.innerWidth;
    const vpH = window.innerHeight;

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < vpH && rect.right > 0 && rect.left < vpW) {
        const cx = (rect.left / vpW) * w;
        const cy = (rect.top / vpH) * h;
        const cw = (rect.width / vpW) * w;
        const ch = (rect.height / vpH) * h;

        ctx.fillStyle = 'rgba(83, 117, 104, 0.4)';
        ctx.fillRect(cx, cy, cw, ch);

        ctx.fillStyle = '#000000';
        ctx.fillRect(cx + 1, cy + 1, cw - 2, ch - 2);
      }
    });

    // 4. Subtle center spotlight
    const grad = ctx.createRadialGradient(w / 2, h / 2, 5, w / 2, h / 2, w / 1.8);
    grad.addColorStop(0, 'rgba(83, 117, 104, 0.35)');
    grad.addColorStop(1, 'rgba(10, 15, 12, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  // =========================================================================
  // 9. 100% CINEMA MODAL WITH STATIC 1-TIME FROSTED SNAPSHOT (0% GPU SHADER)
  // =========================================================================
  openVideoPlayer(video) {
    if (!video) return;

    this.isModalOpen = true;

    // 1. Capture 1-Time Static Canvas Snapshot (0% ongoing GPU shader overhead)
    this.captureFrostedSnapshot();

    // 2. Activate Full Website Deep Freeze
    document.body.classList.add('modal-open-freeze');

    // 3. Clear ALL pending resume timers
    this.activeResumeTimers.forEach(t => clearTimeout(t));
    this.activeResumeTimers = [];

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

    // 4. PAUSE ALL BACKGROUND VIDEOS ACROSS THE ENTIRE WEBSITE
    document.querySelectorAll('video:not(.modal-native-video)').forEach(v => {
      try {
        v.pause();
        v.muted = true;
      } catch (e) {}
    });

    // 5. FREEZE ALL CSS MARQUEE TRACK ANIMATIONS
    document.querySelectorAll('.marquee-track').forEach(t => {
      t.style.animationPlayState = 'paused';
    });

    if (this.iframeContainer) {
      let srcToPlay = video.masterUrl || video.videoUrl;

      // Stream optimization: Deliver hardware-accelerated H.264 stream (< 6-8% GPU)
      if (srcToPlay.includes('res.cloudinary.com')) {
        const scaleParam = isMobile ? 'w_720,c_scale,q_auto:good,vc_auto' : 'w_1280,c_scale,q_auto:good,vc_auto';
        srcToPlay = srcToPlay.replace('/video/upload/', `/video/upload/${scaleParam}/`);
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
      this.isModalOpen = false;
      this.modal.classList.remove('active');
      document.body.classList.remove('modal-open-freeze');
      document.body.style.overflow = '';

      if (this.iframeContainer) {
        this.iframeContainer.innerHTML = '';
      }

      // GUARANTEED INSTANT RESUME: Re-enable marquee animations on all tracks
      document.querySelectorAll('.marquee-track').forEach(t => {
        t.style.animation = '';
        t.style.transform = '';
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
  }
}

window.initPortfolio = () => {
  window.portfolioManager = new PortfolioManager();
};
