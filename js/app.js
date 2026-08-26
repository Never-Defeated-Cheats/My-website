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

// Tab Page Switcher
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

  // Switch tab page views
  tabPages.forEach(page => {
    if (page.id === `tab-${tabId}`) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });

  // Close mobile nav if open
  const navList = document.querySelector('.nav-links-list');
  if (navList) navList.classList.remove('mobile-open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Play audio
  if (window.soundFX) window.soundFX.playPop();

  // Re-trigger scroll reveals & counter animations
  setTimeout(() => {
    if (typeof initScrollReveal === 'function') initScrollReveal();
    if (tabId === 'home' && typeof animateCounters === 'function') animateCounters();
    if (tabId === 'work' && window.portfolioManager) window.portfolioManager.closeNicheDetail();
    if (tabId === 'book-call' && window.bookingManager) window.bookingManager.syncUserAuthFields();
  }, 100);
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
window.renderReviewsLive = () => {
  const container = document.getElementById('reviewsGridContainer');
  if (!container) return;

  const data = window.appData.getData();
  let html = '';

  data.reviews.forEach(r => {
    const starString = '★'.repeat(r.rating || 5);
    html += `
      <div class="review-box reveal">
        <div class="review-head-meta">
          <div class="verified-google-badge">
            <svg class="google-g-icon" viewBox="0 0 24 24" width="14" height="14">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Verified Google Review</span>
          </div>
          <span class="review-date-badge">${r.date || 'Verified'}</span>
        </div>

        <div class="star-rating">${starString}</div>
        <p class="review-quote-text">"${r.text}"</p>

        <div class="review-author-row">
          <img src="${r.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(r.clientName) + '&background=0D9488&color=fff'}" class="author-pic" alt="${r.clientName}">
          <div class="author-info">
            <div class="author-name">${r.clientName}</div>
            <div class="author-channel">${r.channel || 'Verified Client'}</div>
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

  // 4. Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navList = document.querySelector('.nav-links-list');
  if (mobileToggle && navList) {
    mobileToggle.addEventListener('click', () => {
      navList.classList.toggle('mobile-open');
    });
  }

  // 5. Scroll reveal observer & Stats Counter animation
  initScrollReveal();
  animateCounters();

  console.log('✨ Creative Vibe Portfolio initialized successfully.');
});
