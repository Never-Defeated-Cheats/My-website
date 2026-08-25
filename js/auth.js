/* ==========================================================================
   CREATIVE VIBE - OFFICIAL GOOGLE OAUTH & SESSION MANAGER
   Opens real Google browser account picker via Google Identity Services (GIS)
   ========================================================================== */

const AUTH_STORAGE_KEY = 'CREATIVE_VIBE_AUTH_USER_SESSION';

// User's Google Cloud OAuth 2.0 Client ID
const GOOGLE_CLIENT_ID = '1002279239152-octa2601f2l2ojkjip7p3mnqo7amk9ug.apps.googleusercontent.com';

// Generate Google-style initial letter avatar (like authentic Google Accounts)
function generateGoogleAvatar(name, email) {
  const initial = (name ? name.trim().charAt(0) : 'U').toUpperCase();
  const googleColors = ['#4285F4', '#34A853', '#EA4335', '#FBBC05', '#0097A7', '#673AB7', '#E91E63', '#00796B'];

  const seed = (name || '') + (email || '');
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash << 5) - hash + seed.charCodeAt(i);
  const bg = googleColors[Math.abs(hash) % googleColors.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="50" fill="${bg}"/>
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="48" font-weight="700">${initial}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

class AuthManager {
  constructor() {
    this.currentUser = this.loadStoredUser();
    this.pendingAction = null;
    this.tempGoogleAuth = null;
    this.tokenClient = null;

    this.init();
  }

  init() {
    this.updateTopbarUI();
    this.bindEvents();
    this.ensureGoogleSDKReady(() => {
      this.initGoogleOAuth();
      this.renderOfficialGoogleButton();
    });
  }

  // Ensure Google SDK script is fully loaded in browser
  ensureGoogleSDKReady(callback) {
    if (window.google && window.google.accounts) {
      callback();
      return;
    }
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (window.google && window.google.accounts) {
        clearInterval(interval);
        callback();
      } else if (attempts > 60) { // 3 seconds timeout
        clearInterval(interval);
        console.warn('Google Identity SDK took too long to load');
      }
    }, 50);
  }

  // Load user from localStorage
  loadStoredUser() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const u = JSON.parse(stored);
        u.isAdmin = this.checkIsAdmin(u.email);
        return u;
      }
    } catch (e) {
      console.warn('Could not read auth user session', e);
    }
    return null;
  }

  saveUser(userObj) {
    userObj.isAdmin = this.checkIsAdmin(userObj.email);
    this.currentUser = userObj;
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userObj));
    } catch (e) {
      console.error('Failed to save auth session', e);
    }
    this.updateTopbarUI();
  }

  // Complete Logout: Wipes all saved credentials from storage
  logout() {
    this.currentUser = null;
    this.tempGoogleAuth = null;
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) { }
    this.updateTopbarUI();
    if (window.showToast) window.showToast('Signed out successfully. Session cleared.', 'info');
  }

  getUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  isAdmin() {
    return this.currentUser && this.checkIsAdmin(this.currentUser.email);
  }

  getAdminEmail() {
    const profile = window.appData ? window.appData.getData().profile : null;
    return (profile && profile.adminEmail) ? profile.adminEmail.toLowerCase() : 'contact.creativevibe@gmail.com';
  }

  checkIsAdmin(email) {
    if (!email) return false;
    const target = this.getAdminEmail();
    return email.trim().toLowerCase() === target.trim().toLowerCase();
  }

  // Action Gating
  requireAuth(actionCallback, contextMessage = 'Sign in with Google to continue') {
    if (this.isLoggedIn()) {
      actionCallback(this.currentUser);
    } else {
      this.pendingAction = actionCallback;
      this.openAuthModal(contextMessage);
    }
  }

  // Initialize Google Identity Services OAuth 2.0 Token Client & ID services
  initGoogleOAuth() {
    if (!window.google || !window.google.accounts) return;

    try {
      // 1. Initialize Google Identity Token Client (Uses Authorized JavaScript Origins only)
      if (window.google.accounts.oauth2) {
        this.tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
          callback: (tokenResponse) => this.handleGoogleTokenResponse(tokenResponse)
        });
      }

      // 2. Initialize Google ID (GIS One-Tap / JWT)
      if (window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (res) => this.handleGoogleCredentialResponse(res),
          auto_select: false
        });
      }
    } catch (e) {
      console.warn('Error setting up Google OAuth', e);
    }
  }

  renderOfficialGoogleButton() {
    const container = document.getElementById('officialGoogleButtonSlot');
    if (container && window.google && window.google.accounts && window.google.accounts.id) {
      try {
        window.google.accounts.id.renderButton(container, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          text: 'continue_with',
          shape: 'pill',
          width: 320,
          logo_alignment: 'left'
        });
      } catch (e) { }
    }
  }

  // Trigger Google Account Picker
  triggerGoogleLogin() {
    this.ensureGoogleSDKReady(() => {
      this.initGoogleOAuth();

      if (this.tokenClient) {
        try {
          // Opens Google popup with all browser accounts listed
          this.tokenClient.requestAccessToken({ prompt: 'select_account' });
          return;
        } catch (e) {
          console.error('Google token request error:', e);
        }
      }

      if (window.google && window.google.accounts && window.google.accounts.id) {
        try {
          window.google.accounts.id.prompt();
        } catch (e) {
          console.error('Google ID prompt error:', e);
        }
      }
    });
  }

  // Handle Token Response from Google OAuth popup
  async handleGoogleTokenResponse(tokenResponse) {
    if (tokenResponse && tokenResponse.access_token) {
      try {
        // Fetch real Google Profile from Google userinfo API
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        });
        const profile = await res.json();

        this.proceedToProfileSetup({
          email: profile.email,
          name: profile.name || profile.given_name || 'Google User',
          googlePicture: profile.picture || null
        });
      } catch (e) {
        console.error('Error fetching Google Userinfo', e);
        if (window.showToast) window.showToast('Failed to fetch Google profile details', 'error');
      }
    } else if (tokenResponse && tokenResponse.error) {
      console.error('Google OAuth error:', tokenResponse.error);
    }
  }

  // Handle JWT Credential response from GIS
  handleGoogleCredentialResponse(response) {
    try {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const payload = JSON.parse(jsonPayload);

      this.proceedToProfileSetup({
        email: payload.email,
        name: payload.name || payload.given_name || 'Google User',
        googlePicture: payload.picture || null
      });
    } catch (e) {
      console.error('Error parsing Google JWT Token', e);
    }
  }

  // Open Sign-in Modal (Only button: Continue with Google)
  openAuthModal(customContext = null) {
    const modal = document.getElementById('googleAuthModal');
    if (!modal) return;

    const noticeEl = document.getElementById('googleAuthNotice');
    if (noticeEl) {
      noticeEl.textContent = customContext || 'Sign in with your Google account to continue to Creative Vibe';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeAuthModal() {
    const modal = document.getElementById('googleAuthModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Step 2: Open Profile Setup Modal after Google Account is detected
  proceedToProfileSetup(googleData) {
    this.closeAuthModal();
    this.tempGoogleAuth = googleData;

    const setupModal = document.getElementById('profileSetupModal');
    if (!setupModal) return;

    // Display detected Google Email
    const emailBadge = document.getElementById('setupGoogleEmailBadge');
    if (emailBadge) emailBadge.textContent = googleData.email;

    // Pre-fill Name
    const nameInput = document.getElementById('setupNameInput');
    if (nameInput) {
      nameInput.value = googleData.name || '';
      setTimeout(() => nameInput.focus(), 150);
    }

    // Default Avatar Preview: Use real Google picture or Google-style initial avatar
    const previewImg = document.getElementById('setupAvatarPreview');
    if (previewImg) {
      previewImg.src = googleData.googlePicture || generateGoogleAvatar(googleData.name, googleData.email);
    }

    setupModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeProfileSetupModal() {
    const modal = document.getElementById('profileSetupModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Step 2: Finalize Profile Setup and Save to localStorage
  saveProfileAndLogin(customName, uploadedPhotoDataUrl) {
    if (!this.tempGoogleAuth) return;

    const cleanName = customName.trim();
    if (!cleanName) {
      if (window.showToast) window.showToast('Please enter your name', 'error');
      return;
    }

    // Priority: 1. User Uploaded Photo -> 2. Google Profile Photo -> 3. Google Initial Avatar
    const finalAvatar = uploadedPhotoDataUrl ||
      this.tempGoogleAuth.googlePicture ||
      generateGoogleAvatar(cleanName, this.tempGoogleAuth.email);

    const user = {
      name: cleanName,
      email: this.tempGoogleAuth.email.toLowerCase(),
      picture: finalAvatar,
      given_name: cleanName.split(' ')[0],
      loginTime: Date.now()
    };

    this.saveUser(user);
    this.closeProfileSetupModal();
    this.tempGoogleAuth = null;

    if (user.isAdmin) {
      if (window.showToast) window.showToast(`👑 Admin Access Unlocked: ${user.name}`, 'success');
    } else {
      if (window.showToast) window.showToast(`Welcome, ${user.name}! (Signed in with Google)`, 'success');
    }

    // Execute any waiting gated action (Book Call or Write Review)
    if (this.pendingAction) {
      const act = this.pendingAction;
      this.pendingAction = null;
      act(user);
    }
  }

  // Update Topbar UI based on current Auth State
  updateTopbarUI() {
    const wrap = document.getElementById('userAuthNavWrap');
    if (!wrap) return;

    if (this.isLoggedIn()) {
      const u = this.currentUser;
      const isAdminUser = this.isAdmin();
      const userAvatar = u.picture || generateGoogleAvatar(u.name, u.email);

      wrap.innerHTML = `
        <div class="user-profile-menu-wrap" id="userProfileMenuBtn">
          <button class="user-chip-btn" title="Logged in as ${u.name} (${u.email})">
            <img src="${userAvatar}" class="user-chip-avatar" alt="${u.name}">
            <span class="user-chip-name">${u.given_name || u.name.split(' ')[0]}</span>
            ${isAdminUser ? '<span class="admin-crown-badge" title="Verified Admin">👑 Admin</span>' : ''}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>

          <!-- Dropdown Menu -->
          <div class="user-dropdown-card" id="userDropdownCard">
            <div class="user-dropdown-head">
              <img src="${userAvatar}" class="dropdown-avatar" alt="${u.name}">
              <div class="dropdown-meta">
                <div class="dropdown-name">${u.name}</div>
                <div class="dropdown-email">${u.email}</div>
                ${isAdminUser ? '<div class="dropdown-role-badge">✓ Portfolio Owner (Admin)</div>' : '<div class="dropdown-role-badge guest">✓ Verified Google Client</div>'}
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-actions">
              ${isAdminUser ? `
                <button class="dropdown-item-btn admin-btn" id="dropdownOpenAdminBtn">
                  <span>⚙️</span>
                  <span>Admin CMS Dashboard</span>
                </button>
              ` : ''}
              <button class="dropdown-item-btn" id="dropdownWriteReviewBtn">
                <span>✍️</span>
                <span>Write a Verified Review</span>
              </button>
              <button class="dropdown-item-btn" id="dropdownBookCallBtn">
                <span>📅</span>
                <span>Book a Discovery Call</span>
              </button>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item-btn logout-btn" id="dropdownLogoutBtn">
                <span>🚪</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      `;

      this.bindDropdownEvents();
    } else {
      // Logged Out State
      wrap.innerHTML = `
        <button class="google-signin-nav-btn" id="navGoogleSignInBtn" title="Sign in with Google">
          <svg class="google-g-icon" viewBox="0 0 24 24" width="16" height="16">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Sign In</span>
        </button>
      `;

      const signinBtn = document.getElementById('navGoogleSignInBtn');
      if (signinBtn) {
        signinBtn.addEventListener('click', () => this.openAuthModal());
      }
    }
  }

  bindDropdownEvents() {
    const chipBtn = document.querySelector('.user-chip-btn');
    const dropdown = document.getElementById('userDropdownCard');

    if (chipBtn && dropdown) {
      chipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-profile-menu-wrap')) {
          dropdown.classList.remove('active');
        }
      });
    }

    const logoutBtn = document.getElementById('dropdownLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logout());
    }

    const adminBtn = document.getElementById('dropdownOpenAdminBtn');
    if (adminBtn) {
      adminBtn.addEventListener('click', () => {
        dropdown.classList.remove('active');
        if (window.adminCMS) window.adminCMS.openAdminModal();
      });
    }

    const reviewBtn = document.getElementById('dropdownWriteReviewBtn');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => {
        dropdown.classList.remove('active');
        this.openWriteReviewModal();
      });
    }

    const bookBtn = document.getElementById('dropdownBookCallBtn');
    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        dropdown.classList.remove('active');
        if (window.bookingManager) window.bookingManager.openBookingModal();
      });
    }
  }

  bindEvents() {
    // 1. Google Auth Modal Close
    const authCloseBtn = document.getElementById('googleAuthCloseBtn');
    if (authCloseBtn) authCloseBtn.addEventListener('click', () => this.closeAuthModal());

    const authModal = document.getElementById('googleAuthModal');
    if (authModal) {
      authModal.addEventListener('click', (e) => {
        if (e.target === authModal) this.closeAuthModal();
      });
    }

    // 2. Continue with Google Button Click -> Triggers Official Google OAuth Account Picker
    const continueWithGoogleBtn = document.getElementById('continueWithGoogleBtn');
    if (continueWithGoogleBtn) {
      continueWithGoogleBtn.addEventListener('click', () => {
        this.triggerGoogleLogin();
      });
    }

    // 3. Profile Setup Modal Events
    const setupCloseBtn = document.getElementById('profileSetupCloseBtn');
    if (setupCloseBtn) setupCloseBtn.addEventListener('click', () => this.closeProfileSetupModal());

    const setupModal = document.getElementById('profileSetupModal');
    if (setupModal) {
      setupModal.addEventListener('click', (e) => {
        if (e.target === setupModal) this.closeProfileSetupModal();
      });
    }

    // Avatar File Upload Handler
    let uploadedPhotoBase64 = null;
    const fileInput = document.getElementById('setupPhotoFileInput');
    const previewImg = document.getElementById('setupAvatarPreview');

    if (fileInput && previewImg) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          if (file.size > 5 * 1024 * 1024) {
            if (window.showToast) window.showToast('Please choose an image under 5MB', 'error');
            return;
          }
          const reader = new FileReader();
          reader.onload = (re) => {
            uploadedPhotoBase64 = re.target.result;
            previewImg.src = uploadedPhotoBase64;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Profile Setup Form Submit
    const setupForm = document.getElementById('profileSetupForm');
    if (setupForm) {
      setupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameVal = document.getElementById('setupNameInput').value;
        this.saveProfileAndLogin(nameVal, uploadedPhotoBase64);
        uploadedPhotoBase64 = null;
      });
    }

    // 4. Write Review Modal Bindings
    const writeReviewCloseBtn = document.getElementById('writeReviewCloseBtn');
    if (writeReviewCloseBtn) {
      writeReviewCloseBtn.addEventListener('click', () => this.closeWriteReviewModal());
    }

    const writeReviewModal = document.getElementById('writeReviewModal');
    if (writeReviewModal) {
      writeReviewModal.addEventListener('click', (e) => {
        if (e.target === writeReviewModal) this.closeWriteReviewModal();
      });
    }

    const writeReviewForm = document.getElementById('writeReviewForm');
    if (writeReviewForm) {
      writeReviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleReviewSubmit();
      });
    }

    // Buttons on website that trigger Write Review
    document.querySelectorAll('[data-open-write-review]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.requireAuth(() => this.openWriteReviewModal(), 'Sign in with Google to post a verified review');
      });
    });
  }

  // Open "Write a Review" Modal (Only when clicked)
  openWriteReviewModal() {
    if (!this.isLoggedIn()) {
      this.requireAuth(() => this.openWriteReviewModal(), 'Sign in with Google to post a verified review');
      return;
    }

    const modal = document.getElementById('writeReviewModal');
    if (!modal) return;

    const u = this.currentUser;
    const userAvatar = u.picture || generateGoogleAvatar(u.name, u.email);

    const userAvatarEl = document.getElementById('revModalUserAvatar');
    const userNameEl = document.getElementById('revModalUserName');
    const userEmailEl = document.getElementById('revModalUserEmail');

    if (userAvatarEl) userAvatarEl.src = userAvatar;
    if (userNameEl) userNameEl.textContent = u.name;
    if (userEmailEl) userEmailEl.textContent = u.email;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeWriteReviewModal() {
    const modal = document.getElementById('writeReviewModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  handleReviewSubmit() {
    if (!this.isLoggedIn()) return;

    const u = this.currentUser;
    const userAvatar = u.picture || generateGoogleAvatar(u.name, u.email);
    const channel = document.getElementById('revChannelInput').value.trim() || 'Verified Client';
    const projectType = document.getElementById('revProjectTypeSelect').value;
    const rating = parseInt(document.getElementById('revRatingSelect').value) || 5;
    const text = document.getElementById('revTextInput').value.trim();

    if (!text || text.length < 10) {
      if (window.showToast) window.showToast('Please write a brief description of your experience', 'error');
      return;
    }

    const reviewObj = {
      clientName: u.name,
      email: u.email,
      channel: `${channel} • ${projectType}`,
      rating: rating,
      avatar: userAvatar,
      text: text,
      date: 'Just now',
      verifiedGoogle: true
    };

    if (window.appData) {
      window.appData.addReview(reviewObj);
      if (window.renderReviewsLive) window.renderReviewsLive();
      if (window.adminCMS) window.adminCMS.renderReviewsAdmin();
    }

    this.closeWriteReviewModal();
    if (window.showToast) window.showToast('🎉 Your verified Google review has been published!', 'success');

    document.getElementById('revTextInput').value = '';
    document.getElementById('revChannelInput').value = '';
  }
}

window.authManager = new AuthManager();
