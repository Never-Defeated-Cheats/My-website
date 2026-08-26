/* ==========================================================================
   CREATIVE VIBE - DIRECT MULTI-PLATFORM APPOINTMENT BOOKING & SCHEDULER
   Direct chat & appointment integration: WhatsApp, Instagram, Discord, Gmail
   ========================================================================== */

class BookingManager {
  constructor() {
    this.selectedProjectType = 'Talking Head';
    this.lastGeneratedDossier = '';
    this.init();
  }

  init() {
    this.bindEvents();
  }

  // Navigate directly to Book Appointment tab
  navigateToBookingTab(preselectedPlan = null) {
    if (preselectedPlan) {
      this.selectedProjectType = preselectedPlan;
      this.highlightSelectedPill(preselectedPlan);
    }
    if (typeof window.switchTab === 'function') {
      window.switchTab('book-call');
    }
  }

  highlightSelectedPill(val) {
    const pills = document.querySelectorAll('.pill-select-opt[data-value]');
    pills.forEach(p => {
      const pVal = p.getAttribute('data-value');
      if (pVal === val || p.textContent.includes(val)) {
        p.classList.add('selected');
        this.selectedProjectType = pVal;
      } else {
        p.classList.remove('selected');
      }
    });
  }

  getBookingData() {
    const name = (document.getElementById('bookClientName')?.value || '').trim();
    const channel = (document.getElementById('bookChannelName')?.value || '').trim();
    const email = (document.getElementById('bookClientEmail')?.value || '').trim();
    const slot = document.getElementById('bookPreferredSlotIST')?.value || 'Flexible / Anytime (IST)';
    const refLink = (document.getElementById('bookRefLink')?.value || '').trim();
    const footageLink = (document.getElementById('bookFootageLink')?.value || '').trim();
    const whatsapp = (document.getElementById('bookWhatsAppNum')?.value || '').trim();
    const instagram = (document.getElementById('bookInstaUser')?.value || '').trim();
    const discord = (document.getElementById('bookDiscordUser')?.value || '').trim();
    const details = (document.getElementById('bookProjectDetails')?.value || '').trim();
    const projectType = this.selectedProjectType || 'Talking Head';

    return {
      name,
      channel,
      email,
      slot,
      refLink,
      footageLink,
      whatsapp,
      instagram,
      discord,
      details,
      projectType
    };
  }

  buildFormattedMessage() {
    const d = this.getBookingData();
    const clientName = d.name || 'Creator / Founder';
    const channelName = d.channel || 'Not specified';
    const email = d.email || 'Not provided';
    const timeSlot = d.slot || 'Flexible / Anytime (IST)';
    const ref = d.refLink ? `• Reference Link: ${d.refLink}` : '• Reference Link: Not provided';
    const footage = d.footageLink ? `\n• Raw Footage Link: ${d.footageLink}` : '\n• Raw Footage: Will share during discussion';
    const wa = `• WhatsApp: ${d.whatsapp}`;
    const ig = `• Instagram: ${d.instagram}`;
    const dc = `• Discord: ${d.discord}`;
    const vision = d.details ? `\n• Project Details & Vision:\n${d.details}` : '\n• Project Details:\nLooking forward to discussing video editing requirements, retention hooks, and pacing.';

    const dossier = `*NEW APPOINTMENT BOOKING — CREATIVE VIBE*\n\n• Client Name: ${clientName}\n• Page / Channel: ${channelName}\n• Email: ${email}\n• Project Niche: ${d.projectType}\n• Preferred Time (IST): ${timeSlot}\n${ref}${footage}\n\n${wa}\n${ig}\n${dc}\n${vision}`;

    this.lastGeneratedDossier = dossier;
    return dossier;
  }

  validateForm() {
    const d = this.getBookingData();
    
    if (!d.name) {
      if (window.showToast) window.showToast('Please enter your Name', 'error');
      document.getElementById('bookClientName')?.focus();
      return false;
    }
    if (!d.channel) {
      if (window.showToast) window.showToast('Please enter your Page / Channel Name', 'error');
      document.getElementById('bookChannelName')?.focus();
      return false;
    }
    if (!d.email || !d.email.includes('@') || !d.email.includes('.')) {
      if (window.showToast) window.showToast('Please enter a valid Email Address', 'error');
      document.getElementById('bookClientEmail')?.focus();
      return false;
    }
    if (!d.refLink) {
      if (window.showToast) window.showToast('Please enter a Reference Video Link', 'error');
      document.getElementById('bookRefLink')?.focus();
      return false;
    }
    if (!d.whatsapp) {
      if (window.showToast) window.showToast('Please enter your WhatsApp Number', 'error');
      document.getElementById('bookWhatsAppNum')?.focus();
      return false;
    }
    if (!d.instagram) {
      if (window.showToast) window.showToast('Please enter your Instagram Username', 'error');
      document.getElementById('bookInstaUser')?.focus();
      return false;
    }
    if (!d.discord) {
      if (window.showToast) window.showToast('Please enter your Discord Username', 'error');
      document.getElementById('bookDiscordUser')?.focus();
      return false;
    }
    if (!d.details) {
      if (window.showToast) window.showToast('Please describe your Project Scope & Video Vision', 'error');
      document.getElementById('bookProjectDetails')?.focus();
      return false;
    }
    return true;
  }

  showSuccessModal(platformName, platformNote) {
    const modal = document.getElementById('appointmentSuccessModal');
    const summaryCard = document.getElementById('appointmentSummaryCard');
    const subText = document.getElementById('appointmentSuccessSub');
    if (!modal) return;

    const d = this.getBookingData();

    if (subText) {
      subText.innerHTML = `Your project dossier has been formatted for <strong>${platformName}</strong>.<br><span style="font-size: 0.85rem; color: var(--accent-sage); font-weight: 700;">${platformNote}</span>`;
    }

    if (summaryCard) {
      summaryCard.innerHTML = `
        <div class="summary-row-item">
          <span class="summary-label">Client Name</span>
          <span class="summary-value">${d.name}</span>
        </div>
        <div class="summary-row-item">
          <span class="summary-label">Page / Channel</span>
          <span class="summary-value">${d.channel}</span>
        </div>
        <div class="summary-row-item">
          <span class="summary-label">Project Niche</span>
          <span class="summary-value">${d.projectType}</span>
        </div>
        <div class="summary-row-item">
          <span class="summary-label">Email</span>
          <span class="summary-value">${d.email}</span>
        </div>
        <div class="summary-row-item">
          <span class="summary-label">Preferred Slot (IST)</span>
          <span class="summary-value">${d.slot}</span>
        </div>
        <div class="summary-row-item">
          <span class="summary-label">WhatsApp</span>
          <span class="summary-value">${d.whatsapp}</span>
        </div>
        <div class="summary-row-item">
          <span class="summary-label">Instagram</span>
          <span class="summary-value">${d.instagram}</span>
        </div>
        <div class="summary-row-item">
          <span class="summary-label">Discord</span>
          <span class="summary-value">${d.discord}</span>
        </div>
        <div class="summary-row-item">
          <span class="summary-label">Reference</span>
          <span class="summary-value" style="font-size: 0.78rem; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${d.refLink}</span>
        </div>
        ${d.footageLink ? `
          <div class="summary-row-item">
            <span class="summary-label">Raw Footage</span>
            <span class="summary-value" style="font-size: 0.78rem; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${d.footageLink}</span>
          </div>
        ` : ''}
      `;
    }

    modal.classList.add('active');
    if (window.soundFX) window.soundFX.playPop();

    // Clear form inputs
    const form = document.getElementById('pageBookingForm');
    if (form) form.reset();
  }

  copyDossierToClipboard() {
    const textToCopy = this.lastGeneratedDossier || this.buildFormattedMessage();
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const copyBtnText = document.getElementById('copyBtnText');
      if (copyBtnText) {
        copyBtnText.textContent = '✓ Details Copied to Clipboard!';
        setTimeout(() => {
          copyBtnText.textContent = 'Copy Full Project Details';
        }, 2200);
      }
      if (window.showToast) window.showToast('📋 Project details copied to clipboard!', 'success');
    }).catch(() => {
      if (window.showToast) window.showToast('Project details ready to copy', 'info');
    });
  }

  // 1. WhatsApp Booking
  sendViaWhatsApp() {
    if (!this.validateForm()) return;
    const rawMsg = this.buildFormattedMessage();
    const waUrl = `https://api.whatsapp.com/send?phone=919193905629&text=${encodeURIComponent(rawMsg)}`;
    window.open(waUrl, '_blank');
    this.showSuccessModal('WhatsApp', 'Hit send on WhatsApp to instantly connect with Creative Vibe (+91 91939 05629).');
  }

  // 2. Instagram DM Booking
  sendViaInstagram() {
    if (!this.validateForm()) return;
    const rawMsg = this.buildFormattedMessage();

    // Automatically copy details into clipboard
    navigator.clipboard.writeText(rawMsg).then(() => {
      if (window.showToast) {
        window.showToast('📋 Project details copied! Opening Instagram DM...', 'success');
      }
    }).catch(() => {});

    setTimeout(() => {
      window.open('https://www.instagram.com/creavibe.studios/', '_blank');
      this.showSuccessModal('Instagram', 'Project details copied to your clipboard! Simply paste (Ctrl+V / Long-Press) into @creavibe.studios DM.');
    }, 300);
  }

  // 3. Discord Booking
  sendViaDiscord() {
    if (!this.validateForm()) return;
    const rawMsg = this.buildFormattedMessage();
    const discordHandle = '@creavibe.studios';
    const clipContent = `Discord Contact: ${discordHandle}\n\n${rawMsg}`;

    // Automatically copy to clipboard
    navigator.clipboard.writeText(clipContent).then(() => {
      if (window.showToast) {
        window.showToast(`📋 Copied Discord handle '${discordHandle}' & details!`, 'success');
      }
    }).catch(() => {});

    // Try opening Discord Desktop App protocol, with fallback
    const discordAppUrl = 'discord://';
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = discordAppUrl;
    document.body.appendChild(iframe);
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1500);

    setTimeout(() => {
      window.open('https://discord.com/app', '_blank');
      this.showSuccessModal('Discord', 'Discord username (@creavibe.studios) & project details copied! Paste it in DM or send a friend request.');
    }, 400);
  }

  // 4. Gmail Booking
  sendViaGmail() {
    if (!this.validateForm()) return;
    const d = this.getBookingData();
    const rawMsg = this.buildFormattedMessage();
    const subject = `Appointment Booking: ${d.projectType} - ${d.name} (${d.channel})`;

    // Direct Web Gmail Compose URL (Works universally on PC, Laptop, Mac, and Mobile browsers with all fields pre-loaded)
    const webGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=creavibe.studios@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(rawMsg)}`;
    
    // Open Web Gmail composer in new tab
    const newTab = window.open(webGmailUrl, '_blank');
    
    // Fallback if popup blocker or native mail preferred
    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
      const mailtoUrl = `mailto:creavibe.studios@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(rawMsg)}`;
      window.location.href = mailtoUrl;
    }

    this.showSuccessModal('Gmail', 'Draft email pre-filled with all project details opened in Gmail. Just hit send!');
  }

  bindEvents() {
    // Intercept all "data-open-booking" triggers to switch to Book Appointment tab
    document.querySelectorAll('[data-open-booking]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const plan = btn.getAttribute('data-plan');
        this.navigateToBookingTab(plan);
      });
    });

    // Project type pill selection on page
    document.querySelectorAll('.pill-select-opt[data-value]').forEach(pill => {
      pill.addEventListener('click', () => {
        const parent = pill.closest('.pill-select-row');
        if (parent) {
          parent.querySelectorAll('.pill-select-opt').forEach(p => p.classList.remove('selected'));
          pill.classList.add('selected');
        }
        this.selectedProjectType = pill.getAttribute('data-value');
        if (window.soundFX) window.soundFX.playPop();
      });
    });

    // Platform Action Buttons
    const btnWhatsApp = document.getElementById('bookPlatformWhatsApp');
    if (btnWhatsApp) btnWhatsApp.addEventListener('click', () => this.sendViaWhatsApp());

    const btnInstagram = document.getElementById('bookPlatformInstagram');
    if (btnInstagram) btnInstagram.addEventListener('click', () => this.sendViaInstagram());

    const btnDiscord = document.getElementById('bookPlatformDiscord');
    if (btnDiscord) btnDiscord.addEventListener('click', () => this.sendViaDiscord());

    const btnGmail = document.getElementById('bookPlatformGmail');
    if (btnGmail) btnGmail.addEventListener('click', () => this.sendViaGmail());

    // Page Form Submit (Default to WhatsApp if user hits Enter in inputs)
    const pageForm = document.getElementById('pageBookingForm');
    if (pageForm) {
      pageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.sendViaWhatsApp();
      });
    }

    // Success Modal: Copy Dossier Button
    const copyDossierBtn = document.getElementById('btnCopyAppointmentDossier');
    if (copyDossierBtn) {
      copyDossierBtn.addEventListener('click', () => this.copyDossierToClipboard());
    }

    // Success Modal Close buttons
    const successModal = document.getElementById('appointmentSuccessModal');
    const closeBtn = document.getElementById('closeAppointmentSuccessBtn');
    const doneBtn = document.getElementById('btnDoneAppointment');

    if (closeBtn && successModal) {
      closeBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
      });
    }
    if (doneBtn && successModal) {
      doneBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
        if (typeof window.switchTab === 'function') {
          window.switchTab('home');
        }
      });
    }
    if (successModal) {
      successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
          successModal.classList.remove('active');
        }
      });
    }
  }
}

window.initBooking = () => {
  window.bookingManager = new BookingManager();
};
