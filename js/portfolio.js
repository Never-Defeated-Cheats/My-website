/* ==========================================================================
   CREATIVE VIBE - DYNAMIC PORTFOLIO & RECENT EDITS SLIDER MANAGER
   Loads videos directly from js/videos-config.js and handles
   dual-row infinite marquee sliders, categories, and video player modal
   ========================================================================== */

class PortfolioManager {
  constructor() {
    this.currentFilter = 'all';
    this.modal = document.getElementById('videoPlayerModal');
    this.modalBox = document.querySelector('.calm-modal-box');
    this.iframeContainer = document.getElementById('modalIframeBox');
    this.modalTitle = document.getElementById('modalVideoTitle');
    this.modalSub = document.getElementById('modalVideoSub');
    this.modalCloseBtn = document.getElementById('modalCloseBtn');

    this.init();
  }

  init() {
    this.renderCategoryChips();
    this.renderRecentEditsSliders();
    this.renderWorkStream();
    this.bindEvents();
  }

  // =========================================================================
  // 1. RECENT EDITS DUAL-ROW INFINITE SLIDERS (HOME PAGE)
  // =========================================================================
  renderRecentEditsSliders() {
    const vertContainer = document.getElementById('recentVerticalMarquee');
    const horizContainer = document.getElementById('recentHorizontalMarquee');
    if (!vertContainer || !horizContainer) return;

    const edits = window.CREATIVE_VIBE_VIDEOS ? window.CREATIVE_VIBE_VIDEOS.getRecentEdits() : { vertical: [], horizontal: [] };

    // 1. Top Row: Vertical Videos (9:16 Shorts/Reels)
    const vertList = edits.vertical || [];
    const vertLoop = [...vertList, ...vertList, ...vertList];
    vertContainer.innerHTML = vertLoop.map(v => this.buildVerticalMarqueeCardHtml(v)).join('');

    // 2. Bottom Row: Horizontal Videos (16:9 Long-form/Cinema)
    const horizList = edits.horizontal || [];
    const horizLoop = [...horizList, ...horizList, ...horizList];
    horizContainer.innerHTML = horizLoop.map(v => this.buildHorizontalMarqueeCardHtml(v)).join('');

    // Bind Hover (Unmute Audio) & Click (Open Big Screen) on all cards
    document.querySelectorAll('.marquee-card-vertical, .marquee-card-horizontal').forEach(card => {
      // 1. Mouse Enter: Unmute Audio & Play with Sound on Hover
      card.addEventListener('mouseenter', () => {
        const iframe = card.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*');
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
          } catch (e) {}
        }
        card.classList.add('is-unmuted');
        if (window.soundFX) window.soundFX.playHover();
      });

      // 2. Mouse Leave: Mute Audio back to silent background playback
      card.addEventListener('mouseleave', () => {
        const iframe = card.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'mute', args: [] }), '*');
          } catch (e) {}
        }
        card.classList.remove('is-unmuted');
      });

      // 3. Click: Open in Full Screen Player Modal with Audio
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        // Mute preview before opening modal
        const iframe = card.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'mute', args: [] }), '*');
          } catch (e) {}
        }
        card.classList.remove('is-unmuted');

        const ytId = card.getAttribute('data-ytid');
        const title = card.getAttribute('data-title');
        const client = card.getAttribute('data-client');
        const format = card.getAttribute('data-format');
        const views = card.getAttribute('data-views');
        this.openVideoPlayer({ ytId, title, client, aspectRatio: format, views });
      });
    });
  }

  buildVerticalMarqueeCardHtml(v) {
    const embedSrc = `https://www.youtube-nocookie.com/embed/${v.ytId}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${v.ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1`;

    return `
      <div class="marquee-card-vertical" data-ytid="${v.ytId}" data-title="${v.title}" data-client="${v.client}" data-format="9:16" data-views="${v.views}">
        <div class="marquee-video-frame">
          <iframe class="marquee-video-iframe" src="${embedSrc}" title="Vertical Edit" allow="autoplay; encrypted-media" tabindex="-1"></iframe>
        </div>
        <div class="marquee-card-overlay">
          <div class="marquee-badge-top">
            <span class="format-pill">⚡ 9:16 Short</span>
            <span class="sound-status-pill">
              <svg class="sound-icon-muted" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="23" x2="23" y2="17"></line></svg>
              <svg class="sound-icon-active" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              <span>Audio</span>
            </span>
          </div>
        </div>
      </div>
    `;
  }

  buildHorizontalMarqueeCardHtml(v) {
    const embedSrc = `https://www.youtube-nocookie.com/embed/${v.ytId}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${v.ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1`;

    return `
      <div class="marquee-card-horizontal" data-ytid="${v.ytId}" data-title="${v.title}" data-client="${v.client}" data-format="16:9" data-views="${v.views}">
        <div class="marquee-video-frame">
          <iframe class="marquee-video-iframe" src="${embedSrc}" title="Horizontal Edit" allow="autoplay; encrypted-media" tabindex="-1"></iframe>
        </div>
        <div class="marquee-card-overlay">
          <div class="marquee-badge-top">
            <span class="format-pill">🎬 16:9 Longform</span>
            <span class="sound-status-pill">
              <svg class="sound-icon-muted" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="23" x2="23" y2="17"></line></svg>
              <svg class="sound-icon-active" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              <span>Audio</span>
            </span>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 2. CATEGORIZED WORK STREAM (WORK / SHOWREELS TAB)
  // =========================================================================
  renderCategoryChips() {
    const chipContainer = document.getElementById('workCategoryChips');
    if (!chipContainer) return;

    const data = window.appData ? window.appData.getData() : null;
    const categories = (data && data.categories) ? data.categories : [
      { id: "documentary", name: "Documentaries", icon: "🎬" },
      { id: "motion-graphics", name: "Motion Graphics", icon: "✨" },
      { id: "saas", name: "SaaS Animations", icon: "💻" },
      { id: "talking-head", name: "Talking Head", icon: "🎙️" },
      { id: "vlogs", name: "Vlogs & Travel", icon: "✈️" },
      { id: "shorts-reels", name: "Viral Shorts & Reels", icon: "⚡" }
    ];

    let html = `<button class="filter-chip ${this.currentFilter === 'all' ? 'active' : ''}" data-cat="all">⚡ All Categories</button>`;

    categories.forEach(cat => {
      const isSelected = this.currentFilter === cat.id ? 'active' : '';
      html += `<button class="filter-chip ${isSelected}" data-cat="${cat.id}">${cat.icon} ${cat.name}</button>`;
    });

    chipContainer.innerHTML = html;

    chipContainer.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        this.setFilter(cat);
        if (window.soundFX) window.soundFX.playPop();
      });
    });
  }

  setFilter(category) {
    this.currentFilter = category;
    this.renderCategoryChips();
    this.renderWorkStream();

    if (category !== 'all') {
      const section = document.getElementById(`cat-block-${category}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  renderWorkStream() {
    const container = document.getElementById('workStreamContainer');
    if (!container) return;

    const workVideos = window.CREATIVE_VIBE_VIDEOS ? window.CREATIVE_VIBE_VIDEOS.getWorkVideos() : {};
    const data = window.appData ? window.appData.getData() : null;
    const categories = (data && data.categories) ? data.categories : [
      { id: "documentary", name: "Documentaries", icon: "🎬", description: "In-depth storytelling, deep sound design, pacing & cinematic grading." },
      { id: "motion-graphics", name: "Motion Graphics", icon: "✨", description: "Dynamic kinetic typography, 3D element integration, and brand animations." },
      { id: "saas", name: "SaaS Animations", icon: "💻", description: "Clean product demos, UI/UX breakdowns, and high-converting launch videos." },
      { id: "talking-head", name: "Talking Head", icon: "🎙️", description: "Engaging podcast cuts, interviews, pattern interrupts & dynamic zooms." },
      { id: "vlogs", name: "Vlogs & Travel", icon: "✈️", description: "Seamless rhythm, story progression, upbeat soundscapes & color flair." },
      { id: "shorts-reels", name: "Viral Shorts & Reels", icon: "⚡", description: "High-energy pacing, sound pop cues, animated emoji overlays, and 90%+ retention hooks." }
    ];

    const categoriesToRender = this.currentFilter === 'all'
      ? categories
      : categories.filter(c => c.id === this.currentFilter);

    let streamHtml = '';

    categoriesToRender.forEach(cat => {
      const catVideos = workVideos[cat.id] || [];
      const isVerticalCategory = cat.id === 'shorts-reels';

      streamHtml += `
        <section class="category-stream-block reveal" id="cat-block-${cat.id}">
          <div class="category-block-header">
            <div class="cat-title-group">
              <div class="cat-icon-badge">${cat.icon}</div>
              <div>
                <h3 class="cat-title">${cat.name}</h3>
                <p class="cat-description">${cat.description}</p>
              </div>
            </div>
            ${this.currentFilter === 'all' ? `
              <button class="btn-cat-expand" data-view-cat="${cat.id}">
                <span>View all ${catVideos.length} projects</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            ` : `
              <button class="btn-cat-expand" data-view-all="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                <span>Back to all categories</span>
              </button>
            `}
          </div>

          <div class="${isVerticalCategory ? 'video-grid-vertical' : 'video-grid-horizontal'}">
            ${catVideos.length > 0
              ? catVideos.map(video => this.buildWorkVideoCardHtml(video, isVerticalCategory)).join('')
              : `<p style="grid-column:1/-1; padding: 1.5rem; background: var(--bg-subtle); border-radius: var(--radius-md); text-align: center; color: var(--text-muted);">No videos added to this category yet. Add links in js/videos-config.js.</p>`
            }
          </div>
        </section>
      `;
    });

    container.innerHTML = streamHtml;

    // Bind click events on cards
    container.querySelectorAll('.video-card-horizontal, .video-card-vertical').forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (window.soundFX) window.soundFX.playHover();
      });
      card.addEventListener('click', () => {
        const ytId = card.getAttribute('data-ytid');
        const title = card.getAttribute('data-title');
        const client = card.getAttribute('data-client');
        const format = card.getAttribute('data-format');
        const views = card.getAttribute('data-views');
        this.openVideoPlayer({ ytId, title, client, aspectRatio: format, views });
      });
    });

    // Bind "View all" buttons
    container.querySelectorAll('[data-view-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-view-cat');
        this.setFilter(cat);
      });
    });

    container.querySelectorAll('[data-view-all]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setFilter('all');
      });
    });

    if (window.initScrollReveal) window.initScrollReveal();
  }

  buildWorkVideoCardHtml(video, isVertical) {
    const is916 = video.aspectRatio === '9:16' || isVertical;

    if (is916) {
      return `
        <div class="video-card-vertical" data-ytid="${video.ytId}" data-title="${video.title}" data-client="${video.client}" data-format="9:16" data-views="${video.views}">
          <div class="vertical-thumb-container">
            <img src="${video.thumbnail}" alt="${video.title}" class="card-thumb-img" loading="lazy">
            <div class="card-play-overlay">
              <div class="card-play-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
            <span class="vertical-ratio-tag">9:16 Reel</span>
            <div class="vertical-info-overlay">
              <h4 class="vertical-video-title">${video.title}</h4>
              <div class="vertical-views-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <span>${video.views || 'Viral Hit'}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="video-card-horizontal" data-ytid="${video.ytId}" data-title="${video.title}" data-client="${video.client}" data-format="16:9" data-views="${video.views}">
        <div class="card-thumb-container">
          <img src="${video.thumbnail}" alt="${video.title}" class="card-thumb-img" loading="lazy">
          <div class="card-play-overlay">
            <div class="card-play-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
          </div>
          <span class="card-duration-badge">${video.duration || 'Full HD'}</span>
          <span class="card-unlisted-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 2l-2 2m-14 14l-2 2M3 3l18 18"/></svg>
            ${video.views || 'Showcase'}
          </span>
        </div>
        <div class="card-info-body">
          <span class="card-category-tag">${(video.category || '16:9').replace('-', ' ')}</span>
          <h4 class="card-video-title">${video.title}</h4>
          <p class="card-video-desc">${video.description}</p>
          <div class="card-meta-footer">
            <span class="client-tag">Client: ${video.client || 'Creative Vibe'}</span>
            <span>16:9 Cinema</span>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 3. FULL VIDEO PLAYER MODAL (WITH SOUND / AUDIO)
  // =========================================================================
  openVideoPlayer(video) {
    if (!video) return;

    const ytId = video.ytId || 'dQw4w9WgXcQ';
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
      this.iframeContainer.innerHTML = `
        <iframe 
          src="https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&disablekb=1&playsinline=1" 
          title="${video.title || 'Video Player'}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>
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
          ytId: 'dQw4w9WgXcQ',
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
