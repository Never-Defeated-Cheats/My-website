/* ==========================================================================
   CREATIVE VIBE - PORTFOLIO & VIDEO PLAYER CONTROLLER
   Handles Categorized Streams, Horizontal (16:9) & Vertical (9:16),
   YouTube parsing (unlisted/public), and Modal Playback
   ========================================================================== */

class PortfolioManager {
  constructor() {
    this.currentFilter = 'all';
    this.modal = document.getElementById('videoPlayerModal');
    this.modalContainer = document.querySelector('.video-modal-container');
    this.iframeContainer = document.getElementById('modalIframeBox');
    this.modalTitle = document.getElementById('modalVideoTitle');
    this.modalSub = document.getElementById('modalVideoSub');
    this.modalCloseBtn = document.getElementById('modalCloseBtn');

    this.init();
  }

  init() {
    this.renderCategoryChips();
    this.renderWorkStream();
    this.renderFeaturedHomeVideos();
    this.bindEvents();
  }

  // Parse YouTube URL to Video ID (handles regular, shorts, unlisted, youtu.be, embed)
  static extractYouTubeId(url) {
    if (!url) return '';
    if (url.length === 11 && !url.includes('/') && !url.includes('.')) {
      return url; // Already an ID
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }

  renderCategoryChips() {
    const chipContainer = document.getElementById('workCategoryChips');
    if (!chipContainer) return;

    const data = window.appData.getData();
    let html = `<button class="filter-chip ${this.currentFilter === 'all' ? 'active' : ''}" data-cat="all">⚡ All Categories</button>`;

    data.categories.forEach(cat => {
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

    const data = window.appData.getData();
    const categoriesToRender = this.currentFilter === 'all'
      ? data.categories
      : data.categories.filter(c => c.id === this.currentFilter);

    if (categoriesToRender.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding: 4rem 1rem; color: var(--text-muted);">No videos found in this category.</div>`;
      return;
    }

    let streamHtml = '';

    categoriesToRender.forEach(cat => {
      const catVideos = data.videos.filter(v => v.category === cat.id);
      if (catVideos.length === 0 && this.currentFilter === 'all') return;

      const isVerticalCategory = cat.id === 'shorts-reels' || catVideos.some(v => v.aspectRatio === '9:16');

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
              ? catVideos.map(video => this.buildVideoCardHtml(video, isVerticalCategory)).join('')
              : `<p style="grid-column:1/-1; padding: 1.5rem; background: var(--bg-subtle); border-radius: var(--radius-md); text-align: center; color: var(--text-muted);">No videos added to this category yet.</p>`
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
        const vidId = card.getAttribute('data-video-id');
        this.openVideoPlayer(vidId);
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

    // Refresh scroll reveals
    if (window.initScrollReveal) {
      window.initScrollReveal();
    }
  }

  buildVideoCardHtml(video, isVertical) {
    const is916 = video.aspectRatio === '9:16' || isVertical;
    const thumbUrl = video.thumbnail || `https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80`;

    if (is916) {
      return `
        <div class="video-card-vertical" data-video-id="${video.id}">
          <div class="vertical-thumb-container">
            <img src="${thumbUrl}" alt="${video.title}" class="card-thumb-img" loading="lazy">
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
      <div class="video-card-horizontal" data-video-id="${video.id}">
        <div class="card-thumb-container">
          <img src="${thumbUrl}" alt="${video.title}" class="card-thumb-img" loading="lazy">
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
          <span class="card-category-tag">${video.category.replace('-', ' ')}</span>
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

  renderFeaturedHomeVideos() {
    const container = document.getElementById('homeFeaturedGrid');
    if (!container) return;

    const data = window.appData.getData();
    const featuredVideos = data.videos.filter(v => v.isFeatured).slice(0, 3);
    const regularFallback = featuredVideos.length > 0 ? featuredVideos : data.videos.slice(0, 3);

    let html = '';
    regularFallback.forEach(v => {
      html += this.buildVideoCardHtml(v, v.aspectRatio === '9:16');
    });

    container.innerHTML = html;

    container.querySelectorAll('.video-card-horizontal, .video-card-vertical').forEach(card => {
      card.addEventListener('click', () => {
        const vidId = card.getAttribute('data-video-id');
        this.openVideoPlayer(vidId);
      });
    });
  }

  openVideoPlayer(videoId) {
    const data = window.appData.getData();
    const video = data.videos.find(v => v.id === videoId);
    if (!video) return;

    const ytId = PortfolioManager.extractYouTubeId(video.youtubeUrl) || video.youtubeId || 'dQw4w9WgXcQ';
    const is916 = video.aspectRatio === '9:16';

    if (this.modalContainer) {
      if (is916) {
        this.modalContainer.classList.add('is-vertical');
      } else {
        this.modalContainer.classList.remove('is-vertical');
      }
    }

    if (this.modalTitle) this.modalTitle.textContent = video.title;
    if (this.modalSub) this.modalSub.textContent = `Client: ${video.client || 'Creative Vibe'} • Format: ${video.aspectRatio} • ${video.views || ''}`;

    if (this.iframeContainer) {
      this.iframeContainer.innerHTML = `
        <iframe 
          src="https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1" 
          title="${video.title}" 
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
        const data = window.appData.getData();
        const topVideo = data.videos.find(v => v.isFeatured) || data.videos[0];
        if (topVideo) {
          this.openVideoPlayer(topVideo.id);
        }
      });
    }
  }
}

window.initPortfolio = () => {
  window.portfolioManager = new PortfolioManager();
};
