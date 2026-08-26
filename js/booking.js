/* ==========================================================================
   CREATIVE VIBE - DIRECT MULTI-PLATFORM APPOINTMENT BOOKING & SCHEDULER
   Direct chat & appointment integration: WhatsApp, Instagram, Discord, Gmail
   ========================================================================== */

class BookingManager {
  constructor() {
    this.selectedProjectType = 'Talking Head';
    this.init();
  }

  init() {
    this.bindEvents();
    this.setDefaultDate();
  }

  setDefaultDate() {
    const dateInput = document.getElementById('bookPreferredDateIST');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
      dateInput.min = new Date().toISOString().split('T')[0];
    }
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
    const date = document.getElementById('bookPreferredDateIST')?.value || 'Flexible Date';
    const slot = document.getElementById('bookPreferredSlotIST')?.value || '05:00 PM IST';
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
      date,
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
    const timeSlot = `${d.date} (${d.slot})`;
    const ref = d.refLink ? `\n🔗 Reference Link: ${d.refLink}` : '';
    const footage = d.footageLink ? `\n📦 Raw Footage Link: ${d.footageLink}` : '';
    const wa = d.whatsapp ? `\n💬 WhatsApp: ${d.whatsapp}` : '';
    const ig = d.instagram ? `\n📸 Instagram: ${d.instagram}` : '';
    const dc = d.discord ? `\n🎮 Discord: ${d.discord}` : '';
    const vision = d.details ? `\n\n📝 Project Details & Vision:\n${d.details}` : '\n\n📝 Project Details:\nLooking forward to discussing video editing requirements, retention hooks, and pacing.';

    return `🎬 NEW APPOINTMENT BOOKING — CREATIVE VIBE\n\n👤 Client Name: ${clientName}\n📺 Page / Channel: ${channelName}\n📧 Email: ${email}\n🎯 Project Niche: ${d.projectType}\n⏰ Preferred Slot (IST): ${timeSlot}${ref}${footage}${wa}${ig}${dc}${vision}`;
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
    if (!d.email || !d.email.includes('@')) {
      if (window.showToast) window.showToast('Please enter a valid Email Address', 'error');
      document.getElementById('bookClientEmail')?.focus();
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
      subText.innerHTML = `Your complete project dossier has been generated and loaded in <strong>${platformName}</strong>. ${platformNote}`;
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
          <span class="summary-label">Preferred Time (IST)</span>
          <span class="summary-value">${d.date} (${d.slot})</span>
        </div>
        ${d.whatsapp ? `
          <div class="summary-row-item">
            <span class="summary-label">WhatsApp</span>
            <span class="summary-value">${d.whatsapp}</span>
          </div>
        ` : ''}
        ${d.instagram ? `
          <div class="summary-row-item">
            <span class="summary-label">Instagram</span>
            <span class="summary-value">${d.instagram}</span>
          </div>
        ` : ''}
        ${d.discord ? `
          <div class="summary-row-item">
            <span class="summary-label">Discord</span>
            <span class="summary-value">${d.discord}</span>
          </div>
        ` : ''}
        ${d.refLink ? `
          <div class="summary-row-item">
            <span class="summary-label">Reference</span>
            <span class="summary-value" style="font-size: 0.78rem; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${d.refLink}</span>
          </div>
        ` : ''}
        ${d.footageLink ? `
          <div class="summary-row-item">
            <span class="summary-label">Raw Footage</span>
            <span class="summary-value" style="font-size: 0.78rem; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${d.footageLink}</span>
          </div>
        ` : ''}
      `;
    }

    modal.classList.add('active');
    if (window.soundFX) window.soundFX.playPop();

    // Clear form inputs
    const form = document.getElementById('pageBookingForm');
    if (form) form.reset();
    this.setDefaultDate();
  }

  // 1. WhatsApp Booking
  sendViaWhatsApp() {
    if (!this.validateForm()) return;
    const rawMsg = this.buildFormattedMessage();
    const waUrl = `https://wa.me/919193905629?text=${encodeURIComponent(rawMsg)}`;
    window.open(waUrl, '_blank');
    this.showSuccessModal('WhatsApp', 'Hit send on WhatsApp to instantly connect with Creative Vibe!');
  }

  // 2. Instagram DM Booking
  sendViaInstagram() {
    if (!this.validateForm()) return;
    const rawMsg = this.buildFormattedMessage();

    // Copy formatted details to clipboard for instant pasting in DM
    navigator.clipboard.writeText(rawMsg).then(() => {
      if (window.showToast) {
        window.showToast('📋 Project details copied! Opening Instagram DM (@creavibe.studios)...', 'success');
      }
    }).catch(() => {});

    setTimeout(() => {
      window.open('https://www.instagram.com/creavibe.studios', '_blank');
      this.showSuccessModal('Instagram', 'Project dossier copied to clipboard! Paste it directly into @creavibe.studios DM.');
    }, 400);
  }

  // 3. Discord Booking
  sendViaDiscord() {
    if (!this.validateForm()) return;
    const rawMsg = this.buildFormattedMessage();
    const discordHandle = '@creavibe.studios';

    navigator.clipboard.writeText(`Discord: ${discordHandle}\n\n${rawMsg}`).then(() => {
      if (window.showToast) {
        window.showToast(`📋 Copied Discord handle '${discordHandle}' & project details! Opening Discord...`, 'success');
      }
    }).catch(() => {});

    setTimeout(() => {
      window.open('https://discord.com/app', '_blank');
      this.showSuccessModal('Discord', 'Project dossier copied to clipboard! Paste it in DM to @creavibe.studios.');
    }, 400);
  }

  // 4. Gmail Booking
  sendViaGmail() {
    if (!this.validateForm()) return;
    const d = this.getBookingData();
    const rawMsg = this.buildFormattedMessage();
    const subject = `Appointment Booking: ${d.projectType} - ${d.name} (${d.channel})`;
    const mailUrl = `mailto:creavibe.studios@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(rawMsg)}`;
    window.location.href = mailUrl;
    this.showSuccessModal('Gmail', 'Draft email pre-filled with your complete project details opened in your email client.');
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
