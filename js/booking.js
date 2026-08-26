/* ==========================================================================
   CREATIVE VIBE - DIRECT MULTI-PLATFORM BOOKING & SCHEDULER
   Direct chat & booking integration: WhatsApp, Instagram, Discord, Gmail
   ========================================================================== */

class BookingManager {
  constructor() {
    this.selectedProjectType = 'YouTube Long-Form';
    this.selectedTimeSlot = '05:00 PM EST';
    this.selectedBudget = '$500 - $1,500';

    this.init();
  }

  init() {
    this.bindEvents();
    this.setDefaultDate();
    this.syncUserAuthFields();
  }

  setDefaultDate() {
    const dateInput = document.getElementById('bookDate') || document.getElementById('bookDatePage');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
      dateInput.min = new Date().toISOString().split('T')[0];
    }
  }

  syncUserAuthFields() {
    if (window.authManager && window.authManager.isLoggedIn()) {
      const u = window.authManager.getUser();
      const nameInputs = document.querySelectorAll('#bookName, #bookNamePage');
      const emailInputs = document.querySelectorAll('#bookEmail, #bookEmailPage');
      nameInputs.forEach(i => { if (i && !i.value) i.value = u.name; });
      emailInputs.forEach(i => { if (i && !i.value) i.value = u.email; });
    }
  }

  // Navigate directly to Book a Call tab
  navigateToBookingTab(preselectedPlan = null) {
    if (preselectedPlan) {
      this.selectedProjectType = preselectedPlan;
      this.highlightSelectedPill(preselectedPlan);
    }
    if (typeof window.switchTab === 'function') {
      window.switchTab('book-call');
    }
    this.syncUserAuthFields();
  }

  highlightSelectedPill(val) {
    const pills = document.querySelectorAll('.pill-select-opt[data-value]');
    pills.forEach(p => {
      if (p.getAttribute('data-value') === val) {
        p.classList.add('selected');
      } else {
        p.classList.remove('selected');
      }
    });
  }

  getBookingData() {
    const name = (document.getElementById('bookNamePage')?.value || document.getElementById('bookName')?.value || '').trim();
    const email = (document.getElementById('bookEmailPage')?.value || document.getElementById('bookEmail')?.value || '').trim();
    const date = document.getElementById('bookDatePage')?.value || document.getElementById('bookDate')?.value || 'Flexible';
    const time = this.selectedTimeSlot;
    const projectType = this.selectedProjectType;
    const budget = this.selectedBudget;
    const refLink = (document.getElementById('bookRefLinkPage')?.value || document.getElementById('bookRefLink')?.value || '').trim();
    const notes = (document.getElementById('bookNotesPage')?.value || document.getElementById('bookNotes')?.value || '').trim();

    return { name, email, date, time, projectType, budget, refLink, notes };
  }

  buildFormattedMessage() {
    const data = this.getBookingData();
    const clientName = data.name || 'Creator / Founder';
    const clientEmail = data.email || 'Not provided';
    const details = data.notes || 'Looking forward to discussing video editing requirements and pacing.';
    const ref = data.refLink ? `\n🔗 Reference / Raw Footage: ${data.refLink}` : '';

    return `Hey Creative Vibe! 👋\n\nI would like to discuss a video editing project.\n\n👤 Name: ${clientName}\n📧 Email: ${clientEmail}\n🎬 Project Type: ${data.projectType}\n💰 Budget: ${data.budget}\n📅 Preferred Slot: ${data.date} (${data.time})${ref}\n📝 Project Details: ${details}`;
  }

  validateForm() {
    const data = this.getBookingData();
    if (!data.name) {
      if (window.showToast) window.showToast('Please enter your Name or Channel Name', 'error');
      const input = document.getElementById('bookNamePage') || document.getElementById('bookName');
      if (input) input.focus();
      return false;
    }
    return true;
  }

  // 1. WhatsApp Booking
  sendViaWhatsApp() {
    if (!this.validateForm()) return;
    const rawMsg = this.buildFormattedMessage();
    const waUrl = `https://wa.me/919193905629?text=${encodeURIComponent(rawMsg)}`;
    window.open(waUrl, '_blank');
    if (window.showToast) window.showToast('🚀 Opening WhatsApp with your project details...', 'success');
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
    }, 400);
  }

  // 4. Gmail Booking
  sendViaGmail() {
    if (!this.validateForm()) return;
    const data = this.getBookingData();
    const rawMsg = this.buildFormattedMessage();
    const subject = `Video Editing Inquiry - ${data.projectType} (${data.name || 'New Client'})`;
    const mailUrl = `mailto:creavibe.studios@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(rawMsg)}`;
    window.location.href = mailUrl;
    if (window.showToast) window.showToast('✉️ Opening Gmail draft with pre-filled details...', 'success');
  }

  bindEvents() {
    // Intercept all "data-open-booking" triggers to switch to Book a Call tab
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
      });
    });

    // Budget pill selection
    document.querySelectorAll('.budget-pill-opt').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.budget-pill-opt').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        this.selectedBudget = pill.getAttribute('data-budget');
      });
    });

    // Time Slot select on page
    const timeSelect = document.getElementById('bookTimeSelectPage') || document.getElementById('bookTimeSelect');
    if (timeSelect) {
      timeSelect.addEventListener('change', () => {
        this.selectedTimeSlot = timeSelect.value;
      });
    }

    // Platform Action Buttons
    const btnWhatsApp = document.getElementById('bookPlatformWhatsApp');
    if (btnWhatsApp) btnWhatsApp.addEventListener('click', () => this.sendViaWhatsApp());

    const btnInstagram = document.getElementById('bookPlatformInstagram');
    if (btnInstagram) btnInstagram.addEventListener('click', () => this.sendViaInstagram());

    const btnDiscord = document.getElementById('bookPlatformDiscord');
    if (btnDiscord) btnDiscord.addEventListener('click', () => this.sendViaDiscord());

    const btnGmail = document.getElementById('bookPlatformGmail');
    if (btnGmail) btnGmail.addEventListener('click', () => this.sendViaGmail());

    // Page Form Submit (Default to WhatsApp if clicked primary submit)
    const pageForm = document.getElementById('pageBookingForm');
    if (pageForm) {
      pageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.sendViaWhatsApp();
      });
    }
  }
}

window.initBooking = () => {
  window.bookingManager = new BookingManager();
};
