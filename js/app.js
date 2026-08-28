/* ==========================================================================
   CREATIVE VIBE - MAIN APPLICATION BOOTSTRAP & TAB ROUTER
   ========================================================================== */

// Toast Notification System
window.showToast = (message, type = 'info') => {
  const container = document.getElementById('toastContainer') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast-msg ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

function createToastContainer() {
  const c = document.createElement('div');
  c.id = 'toastContainer';
  c.className = 'toast-container';
  document.body.appendChild(c);
  return c;
}

// Tab Page Switcher (Complete Tab Isolation & Hardware Resource Optimization)
function switchTab(tabId) {
  if (!tabId) return;

  const tabButtons = document.querySelectorAll('.nav-tab-btn[data-tab], .nav-item-btn[data-tab], [data-tab]');
  const tabPages = document.querySelectorAll('.tab-page');

  // Update topbar tabs active class
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Switch tab page views with complete DOM display isolation
  tabPages.forEach(page => {
    if (page.id === `tab-${tabId}`) {
      page.classList.add('active');
      page.style.display = 'block';
    } else {
      page.classList.remove('active');
      page.style.display = 'none';
    }
  });

  // Close mobile nav if open
  const navTabsGroup = document.getElementById('navTabsGroup');
  if (navTabsGroup) navTabsGroup.classList.remove('mobile-open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Play audio
  if (window.soundFX) window.soundFX.playPop();

  // Lazy tab activations & resource optimization
  setTimeout(() => {
    if (typeof initScrollReveal === 'function') initScrollReveal();
    if (tabId === 'home') {
      if (typeof animateCounters === 'function') animateCounters();
    }
    if (tabId === 'work') {
      if (window.portfolioManager) window.portfolioManager.onWorkTabActivated();
    }
    if (window.portfolioManager) {
      window.portfolioManager.onTabChanged(tabId);
    }
    if (tabId === 'pricing') {
      window.renderPricingLive();
    }
    if (tabId === 'book-call') {
      if (window.bookingManager) window.bookingManager.syncUserAuthFields();
    }
  }, 50);
}
window.switchTab = switchTab;

// Render Live Pricing Section (6 Curated Niches with Animated Glow Outlines)
window.renderPricingLive = () => {
  const container = document.getElementById('pricingCardsGrid');
  if (!container) return;

  const data = window.appData.getData();
  let html = '';

  data.pricing.forEach(plan => {
    html += `
      <div class="pricing-card ${plan.featured ? 'featured-card' : ''} reveal">
        ${plan.badge ? `<div class="pricing-badge-pill ${plan.featured ? 'is-core' : ''}">${plan.badge}</div>` : ''}
        
        <div class="pricing-card-header">
          <div class="pricing-icon-badge">${plan.icon || '🎬'}</div>
          <div>
            <h3 class="pricing-tier-name">${plan.name}</h3>
            <span class="pricing-range-label">Standard Min – Max Bracket</span>
          </div>
        </div>

        <p class="pricing-tier-desc">${plan.desc}</p>

        <div class="pricing-price-box">
          <div class="pricing-range-main">
            <span class="pricing-amount">${plan.price}</span>
            <span class="pricing-period">/${plan.period}</span>
          </div>
          <div class="pricing-range-caption">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <span>${plan.rangeNote || '90% of edits fall within this bracket'}</span>
          </div>
        </div>

        <ul class="pricing-features-list">
          ${plan.features.map(f => `
            <li class="pricing-feature-item">
              <span class="feature-check-icon">✓</span>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>

        <button class="btn pricing-cta-btn" data-open-booking="true" data-plan="${plan.name}">
          <span>Book ${plan.name}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll('[data-open-booking]').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      if (window.bookingManager) window.bookingManager.openBookingModal(plan);
      if (window.soundFX) window.soundFX.playPop();
    });
  });
};

// Render Live Reviews Section
// Render Live Reviews Section with Crisp Precision Vector SVG Stars
window.renderReviewsLive = () => {
  const container = document.getElementById('reviewsGridContainer');
  if (!container) return;

  const data = window.appData.getData();
  let html = '';

  data.reviews.forEach((r, rIdx) => {
    const numRating = typeof r.rating === 'number' ? r.rating : 4.9;
    
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      let fillPercent = 0;
      if (numRating >= i) {
        fillPercent = 100;
      } else if (numRating > i - 1) {
        fillPercent = Math.round((numRating - (i - 1)) * 100);
      } else {
        fillPercent = 0;
      }

      const gradId = `starGrad_${r.id || rIdx}_${i}`;
      
      starsHtml += `
        <svg class="star-svg-icon" width="18" height="18" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="${fillPercent}%" stop-color="#f59e0b" />
              <stop offset="${fillPercent}%" stop-color="#e2e8f0" />
            </linearGradient>
          </defs>
          <path fill="url(#${gradId})" stroke="#d97706" stroke-width="0.75" stroke-linejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      `;
    }

    html += `
      <div class="review-box reveal">
        <div class="review-head-meta">
          <div class="verified-client-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color: #059669;"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Verified Client</span>
          </div>
          <span class="review-date-badge">${r.date || 'Recent'}</span>
        </div>

        <div class="review-rating-row">
          <div class="star-rating-svg-wrap">${starsHtml}</div>
          <span class="rating-num-badge">${numRating.toFixed(1)}</span>
        </div>
        <p class="review-quote-text">"${r.text}"</p>

        <div class="review-author-row">
          <img src="${r.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(r.clientName) + '&background=0D9488&color=fff'}" class="author-pic" alt="${r.clientName}">
          <div class="author-info">
            <div class="author-name">${r.clientName}</div>
            <div class="author-channel">${r.channel || 'Creator & Founder'}</div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
};

// Intersection Observer for silky scroll animations
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}
// Stats Counter Animation (requestAnimationFrame + easeOutExpo)
function animateCounters() {
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.getAttribute('data-animated') === 'true') return;
        el.setAttribute('data-animated', 'true');

        const target = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const duration = 1800; // ms
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease Out Expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = (target * easeProgress).toFixed(decimals);

          el.textContent = `${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = `${target.toFixed(decimals)}${suffix}`;
          }
        }

        requestAnimationFrame(updateCount);
      }
    });
  }, { threshold: 0.2 });

  statNumbers.forEach(num => observer.observe(num));
}
window.animateCounters = animateCounters;

// DOM Ready Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize UI components
  if (window.initBrand3D) window.initBrand3D();
  if (window.initPortfolio) window.initPortfolio();
  if (window.initBooking) window.initBooking();

  // 2. Render dynamic parts
  window.renderPricingLive();
  window.renderReviewsLive();

  // 3. Bind Tab Navigation Buttons
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Explicitly activate Home Tab on initial load (guarantees other tabs are 100% hidden)
  switchTab('home');

  // 4. Mobile Nav Toggle & Outside Click Handler
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navTabsGroup = document.getElementById('navTabsGroup');

  if (mobileMenuBtn && navTabsGroup) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navTabsGroup.classList.toggle('mobile-open');
      if (window.soundFX) window.soundFX.playPop();
    });

    document.addEventListener('click', (e) => {
      if (!navTabsGroup.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navTabsGroup.classList.remove('mobile-open');
      }
    });
  }

  // 5. Scroll reveal observer & Stats Counter animation
  initScrollReveal();
  animateCounters();

  console.log('✨ Creative Vibe Portfolio initialized successfully.');
});
