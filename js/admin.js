/* ==========================================================================
   CREATIVE VIBE - ADMIN CMS PORTAL & REALTIME CONTENT EDITOR
   ========================================================================== */

class AdminCMS {
  constructor() {
    this.modal = document.getElementById('adminModal');
    this.authBox = document.getElementById('adminAuthBox');
    this.panelBox = document.getElementById('adminPanelBox');
    this.pinInputs = document.querySelectorAll('.pin-digit-input');
    this.isAuthenticated = false;
    this.editingVideoId = null;

    this.init();
  }

  init() {
    this.bindEvents();
  }

  openAdminModal() {
    if (this.modal) {
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Auto-unlock if user signed in with owner admin email
      if (window.authManager && window.authManager.isAdmin()) {
        this.isAuthenticated = true;
        this.showDashboard();
      } else if (!this.isAuthenticated) {
        this.showAuthScreen();
      } else {
        this.showDashboard();
      }
    }
  }

  closeAdminModal() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
      if (window.soundFX) window.soundFX.playClick();
    }
  }

  showAuthScreen() {
    if (this.authBox) this.authBox.style.display = 'flex';
    if (this.panelBox) this.panelBox.style.display = 'none';
    this.pinInputs.forEach(i => i.value = '');
    if (this.pinInputs[0]) this.pinInputs[0].focus();
  }

  showDashboard() {
    if (this.authBox) this.authBox.style.display = 'none';
    if (this.panelBox) this.panelBox.style.display = 'flex';
    this.renderVideosTable();
    this.populateProfileForm();
    this.renderPricingEditors();
    this.renderReviewsAdmin();
  }

  verifyPin() {
    let enteredPin = '';
    this.pinInputs.forEach(i => enteredPin += i.value);

    const savedPin = window.appData.getData().profile.adminPin || '1234';

    if (enteredPin === savedPin) {
      this.isAuthenticated = true;
      if (window.soundFX) window.soundFX.playChime();
      if (window.showToast) window.showToast('Admin Access Granted!', 'success');
      this.showDashboard();
    } else {
      if (window.soundFX) window.soundFX.playPop();
      if (window.showToast) window.showToast('Incorrect PIN! (Default: 1234)', 'error');
      this.pinInputs.forEach(i => i.value = '');
      if (this.pinInputs[0]) this.pinInputs[0].focus();
    }
  }

  // --- 1. Video Management ---
  renderVideosTable() {
    const tableBody = document.getElementById('adminVideosTableBody');
    if (!tableBody) return;

    const data = window.appData.getData();
    let html = '';

    data.videos.forEach(v => {
      const ytId = PortfolioManager.extractYouTubeId(v.youtubeUrl) || v.youtubeId || 'dQw4w9WgXcQ';
      const thumb = v.thumbnail || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;

      html += `
        <tr>
          <td><img src="${thumb}" class="admin-thumb-mini" alt="thumb"></td>
          <td>
            <strong>${v.title}</strong><br>
            <small style="color: var(--text-muted);">${v.category} • ${v.aspectRatio}</small>
          </td>
          <td>${v.client || '-'}</td>
          <td>${v.views || '-'}</td>
          <td>
            <div class="admin-actions-cell">
              <button class="admin-btn-action admin-btn-edit" onclick="window.adminCMS.editVideo('${v.id}')">Edit</button>
              <button class="admin-btn-action admin-btn-delete" onclick="window.adminCMS.deleteVideo('${v.id}')">Delete</button>
            </div>
          </td>
        </tr>
      `;
    });

    tableBody.innerHTML = html || '<tr><td colspan="5" style="text-align:center; padding: 2rem;">No videos yet.</td></tr>';
  }

  handleVideoFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('admVideoTitle').value.trim();
    const category = document.getElementById('admVideoCategory').value;
    const youtubeUrl = document.getElementById('admVideoUrl').value.trim();
    const aspectRatio = document.getElementById('admVideoAspect').value;
    const client = document.getElementById('admVideoClient').value.trim();
    const duration = document.getElementById('admVideoDuration').value.trim();
    const views = document.getElementById('admVideoViews').value.trim();
    const description = document.getElementById('admVideoDesc').value.trim();
    let thumbnail = document.getElementById('admVideoThumb').value.trim();

    if (!title || !youtubeUrl) {
      alert('Please provide at least a video Title and YouTube Link!');
      return;
    }

    const ytId = PortfolioManager.extractYouTubeId(youtubeUrl);
    if (!thumbnail && ytId) {
      thumbnail = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    }

    const videoData = {
      title,
      category,
      youtubeUrl,
      youtubeId: ytId,
      aspectRatio,
      client: client || 'Creative Vibe',
      duration: duration || (aspectRatio === '9:16' ? '00:45' : '10:00'),
      views: views || '100K+ Views',
      description: description || 'Professional edit crafted with high pacing and sound design.',
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
      isFeatured: true
    };

    if (this.editingVideoId) {
      window.appData.updateVideo(this.editingVideoId, videoData);
      if (window.showToast) window.showToast('Video updated successfully!', 'success');
      this.editingVideoId = null;
      document.getElementById('admVideoSubmitBtn').textContent = 'Add New Video';
    } else {
      window.appData.addVideo(videoData);
      if (window.showToast) window.showToast('New video added to portfolio!', 'success');
    }

    // Reset Form
    document.getElementById('adminVideoForm').reset();
    this.renderVideosTable();

    // Refresh site views
    if (window.portfolioManager) {
      window.portfolioManager.renderWorkStream();
      window.portfolioManager.renderFeaturedHomeVideos();
    }
  }

  editVideo(id) {
    const video = window.appData.getData().videos.find(v => v.id === id);
    if (!video) return;

    this.editingVideoId = id;
    document.getElementById('admVideoTitle').value = video.title || '';
    document.getElementById('admVideoCategory').value = video.category || 'documentary';
    document.getElementById('admVideoUrl').value = video.youtubeUrl || '';
    document.getElementById('admVideoAspect').value = video.aspectRatio || '16:9';
    document.getElementById('admVideoClient').value = video.client || '';
    document.getElementById('admVideoDuration').value = video.duration || '';
    document.getElementById('admVideoViews').value = video.views || '';
    document.getElementById('admVideoThumb').value = video.thumbnail || '';
    document.getElementById('admVideoDesc').value = video.description || '';

    document.getElementById('admVideoSubmitBtn').textContent = 'Update Video';
    document.getElementById('adminVideoForm').scrollIntoView({ behavior: 'smooth' });
  }

  deleteVideo(id) {
    if (confirm('Are you sure you want to delete this video from your portfolio?')) {
      window.appData.deleteVideo(id);
      this.renderVideosTable();
      if (window.portfolioManager) {
        window.portfolioManager.renderWorkStream();
        window.portfolioManager.renderFeaturedHomeVideos();
      }
      if (window.showToast) window.showToast('Video deleted!', 'info');
    }
  }

  // --- 2. Profile & Brand CMS ---
  populateProfileForm() {
    const p = window.appData.getData().profile;
    if (document.getElementById('admBrandName')) document.getElementById('admBrandName').value = p.brandName || '';
    if (document.getElementById('admBrandTitle')) document.getElementById('admBrandTitle').value = p.brandTitle || '';
    if (document.getElementById('admEmail')) document.getElementById('admEmail').value = p.email || '';
    if (document.getElementById('admAdminEmail')) document.getElementById('admAdminEmail').value = p.adminEmail || p.email || '';
    if (document.getElementById('admWhatsapp')) document.getElementById('admWhatsapp').value = p.whatsapp || '';
    if (document.getElementById('admBio')) document.getElementById('admBio').value = p.bio || '';
    if (document.getElementById('admPin')) document.getElementById('admPin').value = p.adminPin || '1234';
  }

  handleProfileSubmit(e) {
    e.preventDefault();
    const brandName = document.getElementById('admBrandName').value.trim();
    const brandTitle = document.getElementById('admBrandTitle').value.trim();
    const email = document.getElementById('admEmail').value.trim();
    const adminEmail = document.getElementById('admAdminEmail') ? document.getElementById('admAdminEmail').value.trim().toLowerCase() : email;
    const whatsapp = document.getElementById('admWhatsapp').value.trim();
    const bio = document.getElementById('admBio').value.trim();
    const adminPin = document.getElementById('admPin').value.trim() || '1234';

    window.appData.updateProfile({ brandName, brandTitle, email, adminEmail, whatsapp, bio, adminPin });
    if (window.showToast) window.showToast('Profile & Brand settings saved!', 'success');
    
    // Update live DOM brand texts
    document.querySelectorAll('.brand-name').forEach(el => el.textContent = brandName);
    document.querySelectorAll('.brand-title').forEach(el => el.textContent = brandTitle);
  }

  // --- 3. Pricing CMS ---
  renderPricingEditors() {
    const container = document.getElementById('adminPricingContainer');
    if (!container) return;

    const pricing = window.appData.getData().pricing;
    let html = '';

    pricing.forEach((plan, idx) => {
      html += `
        <div class="admin-form-card" style="margin-bottom: 1.25rem;">
          <h4 style="margin-bottom: 1rem; font-size: 1.1rem;">Tier ${idx + 1}: ${plan.name}</h4>
          <div class="admin-form-grid">
            <div class="form-group">
              <label>Plan Name</label>
              <input type="text" class="form-control" id="admPlanName_${idx}" value="${plan.name}">
            </div>
            <div class="form-group">
              <label>Badge (e.g. Popular)</label>
              <input type="text" class="form-control" id="admPlanBadge_${idx}" value="${plan.badge || ''}">
            </div>
            <div class="form-group">
              <label>Price</label>
              <input type="text" class="form-control" id="admPlanPrice_${idx}" value="${plan.price}">
            </div>
            <div class="form-group">
              <label>Billing Period</label>
              <input type="text" class="form-control" id="admPlanPeriod_${idx}" value="${plan.period}">
            </div>
            <div class="form-group full-span">
              <label>Features (one per line)</label>
              <textarea class="form-control" id="admPlanFeatures_${idx}" rows="4">${plan.features.join('\n')}</textarea>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  handlePricingSave() {
    const data = window.appData.getData();
    const updatedPricing = data.pricing.map((p, idx) => {
      const name = document.getElementById(`admPlanName_${idx}`).value.trim();
      const badge = document.getElementById(`admPlanBadge_${idx}`).value.trim();
      const price = document.getElementById(`admPlanPrice_${idx}`).value.trim();
      const period = document.getElementById(`admPlanPeriod_${idx}`).value.trim();
      const featuresRaw = document.getElementById(`admPlanFeatures_${idx}`).value.trim();
      const features = featuresRaw.split('\n').filter(f => f.trim().length > 0);

      return { ...p, name, badge, price, period, features };
    });

    window.appData.updatePricing(updatedPricing);
    if (window.showToast) window.showToast('Pricing plans updated successfully!', 'success');
    if (window.renderPricingLive) window.renderPricingLive();
  }

  // --- 4. Reviews CMS ---
  renderReviewsAdmin() {
    const listContainer = document.getElementById('adminReviewsList');
    if (!listContainer) return;

    const reviews = window.appData.getData().reviews;
    let html = '';

    reviews.forEach(r => {
      html += `
        <div style="background: var(--bg-subtle); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>${r.clientName}</strong> (${r.channel})<br>
            <small style="color: var(--text-muted); font-style: italic;">"${r.text.substring(0, 80)}..."</small>
          </div>
          <button class="admin-btn-action admin-btn-delete" onclick="window.adminCMS.deleteReview('${r.id}')">Delete</button>
        </div>
      `;
    });

    listContainer.innerHTML = html || '<p style="color: var(--text-muted);">No reviews added yet.</p>';
  }

  handleReviewAdd(e) {
    e.preventDefault();
    const clientName = document.getElementById('admRevName').value.trim();
    const channel = document.getElementById('admRevChannel').value.trim();
    const text = document.getElementById('admRevText').value.trim();
    const avatar = document.getElementById('admRevAvatar').value.trim() || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';

    if (!clientName || !text) {
      alert('Please provide client name and review text!');
      return;
    }

    window.appData.addReview({ clientName, channel: channel || 'Creator', text, rating: 5, avatar });
    document.getElementById('adminReviewForm').reset();
    this.renderReviewsAdmin();
    if (window.renderReviewsLive) window.renderReviewsLive();
    if (window.showToast) window.showToast('New client review added!', 'success');
  }

  deleteReview(id) {
    if (confirm('Delete this review?')) {
      window.appData.deleteReview(id);
      this.renderReviewsAdmin();
      if (window.renderReviewsLive) window.renderReviewsLive();
      if (window.showToast) window.showToast('Review removed.', 'info');
    }
  }

  // --- 5. Export & Import JSON Data ---
  exportDataJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(window.appData.getData(), null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `creative_vibe_portfolio_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    if (window.showToast) window.showToast('Portfolio JSON Backup downloaded!', 'success');
  }

  importDataJson(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.videos && parsed.profile) {
          window.appData.saveData(parsed);
          location.reload();
        } else {
          alert('Invalid JSON structure for Creative Vibe backup.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  }

  bindEvents() {
    // PIN Inputs navigation
    this.pinInputs.forEach((input, idx) => {
      input.addEventListener('keyup', (e) => {
        if (e.key === 'Backspace' && idx > 0 && input.value.length === 0) {
          this.pinInputs[idx - 1].focus();
        } else if (input.value.length === 1 && idx < this.pinInputs.length - 1) {
          this.pinInputs[idx + 1].focus();
        }

        if (Array.from(this.pinInputs).every(i => i.value.length === 1)) {
          this.verifyPin();
        }
      });
    });

    const verifyBtn = document.getElementById('adminVerifyBtn');
    if (verifyBtn) verifyBtn.addEventListener('click', () => this.verifyPin());

    const closeBtn = document.getElementById('adminCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeAdminModal());

    const adminTrigger = document.getElementById('adminTriggerBtn');
    if (adminTrigger) adminTrigger.addEventListener('click', () => this.openAdminModal());

    // Admin internal tabs
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const tabTarget = btn.getAttribute('data-admin-tab');
        const targetEl = document.getElementById(`admin-tab-${tabTarget}`);
        if (targetEl) targetEl.classList.add('active');
        if (window.soundFX) window.soundFX.playPop();
      });
    });

    // Form submits
    const videoForm = document.getElementById('adminVideoForm');
    if (videoForm) videoForm.addEventListener('submit', (e) => this.handleVideoFormSubmit(e));

    const profileForm = document.getElementById('adminProfileForm');
    if (profileForm) profileForm.addEventListener('submit', (e) => this.handleProfileSubmit(e));

    const reviewForm = document.getElementById('adminReviewForm');
    if (reviewForm) reviewForm.addEventListener('submit', (e) => this.handleReviewAdd(e));

    const savePricingBtn = document.getElementById('adminSavePricingBtn');
    if (savePricingBtn) savePricingBtn.addEventListener('click', () => this.handlePricingSave());

    const exportBtn = document.getElementById('adminExportJsonBtn');
    if (exportBtn) exportBtn.addEventListener('click', () => this.exportDataJson());

    const importInput = document.getElementById('adminImportJsonInput');
    if (importInput) {
      importInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.importDataJson(e.target.files[0]);
        }
      });
    }

    const resetBtn = document.getElementById('adminResetDefaultsBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all portfolio data back to default demo items?')) {
          window.appData.resetToDefault();
          location.reload();
        }
      });
    }
  }
}

window.initAdminCMS = () => {
  window.adminCMS = new AdminCMS();
};
