/* ==========================================================================
   CREATIVE VIBE - INTERACTIVE "BOOK A CALL" SCHEDULER & MODAL
   ========================================================================== */

class BookingManager {
  constructor() {
    this.modal = document.getElementById('bookingModal');
    this.form = document.getElementById('bookingForm');
    this.closeBtn = document.getElementById('bookingCloseBtn');
    this.selectedProjectType = 'YouTube Long-Form';
    this.selectedTimeSlot = '03:00 PM';
    this.selectedBudget = '$500 - $1,000';

    this.init();
  }

  init() {
    this.bindEvents();
    this.setDefaultDate();
  }

  setDefaultDate() {
    const dateInput = document.getElementById('bookDate');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
      dateInput.min = new Date().toISOString().split('T')[0];
    }
  }

  openBookingModal(preselectedPlan = null) {
    // Require Google Authentication before booking
    if (window.authManager && !window.authManager.isLoggedIn()) {
      window.authManager.requireAuth(
        () => this.openBookingModal(preselectedPlan),
        'Sign in with Google to book your 1-on-1 discovery call'
      );
      return;
    }

    if (preselectedPlan) {
      this.selectedProjectType = preselectedPlan;
      this.highlightSelectedPill(preselectedPlan);
    }

    // Auto-fill user credentials from Google Auth session
    if (window.authManager && window.authManager.isLoggedIn()) {
      const u = window.authManager.getUser();
      const nameInput = document.getElementById('bookName');
      const emailInput = document.getElementById('bookEmail');
      if (nameInput) nameInput.value = u.name;
      if (emailInput) emailInput.value = u.email;
    }

    if (this.modal) {
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeBookingModal() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  highlightSelectedPill(val) {
    const pills = document.querySelectorAll('.project-pill-opt');
    pills.forEach(p => {
      if (p.getAttribute('data-value') === val) {
        p.classList.add('selected');
      } else {
        p.classList.remove('selected');
      }
    });
  }

  bindEvents() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeBookingModal());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeBookingModal();
        }
      });
    }

    // Trigger buttons on site
    document.querySelectorAll('[data-open-booking]').forEach(btn => {
      btn.addEventListener('click', () => {
        const plan = btn.getAttribute('data-plan');
        this.openBookingModal(plan);
      });
    });

    // Project type pill selection
    document.querySelectorAll('.project-pill-opt').forEach(pill => {
      pill.addEventListener('click', () => {
        this.selectedProjectType = pill.getAttribute('data-value');
        this.highlightSelectedPill(this.selectedProjectType);
      });
    });

    // Time Slot pill selection
    document.querySelectorAll('.time-slot-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.time-slot-pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        this.selectedTimeSlot = pill.getAttribute('data-time');
      });
    });

    // Form Submit
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleBookingSubmit();
      });
    }
  }

  handleBookingSubmit() {
    const name = document.getElementById('bookName').value.trim();
    const email = document.getElementById('bookEmail').value.trim();
    const date = document.getElementById('bookDate').value;
    const notes = document.getElementById('bookNotes').value.trim();
    const refLink = document.getElementById('bookRefLink') ? document.getElementById('bookRefLink').value.trim() : '';

    if (!name || !email) {
      if (window.showToast) window.showToast('Please enter your name and email', 'error');
      return;
    }

    const profile = window.appData.getData().profile;

    // Build message
    const message = `Hello Creative Vibe! 👋%0A%0AI would like to book a 1-on-1 discovery call for a video editing project.%0A%0A👤 Name: ${encodeURIComponent(name)}%0A📧 Email: ${encodeURIComponent(email)}%0A🎬 Project Type: ${encodeURIComponent(this.selectedProjectType)}%0A📅 Preferred Date: ${encodeURIComponent(date)} (${this.selectedTimeSlot})%0A🔗 Reference Link: ${encodeURIComponent(refLink || 'None')}%0A📝 Project Details: ${encodeURIComponent(notes || 'Ready to discuss')}`;

    // Show Confirmation UI in Modal
    const modalBox = document.querySelector('.booking-modal-box');
    if (modalBox) {
      modalBox.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: #d1fae5; color: #059669; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.25rem;">
            ✓
          </div>
          <h3 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem;">Discovery Call Requested!</h3>
          <p style="color: var(--text-muted); margin-bottom: 1.75rem; font-size: 0.95rem;">
            Thank you <strong>${name}</strong>. I have received your request for <strong>${this.selectedProjectType}</strong>. Let's connect instantly via WhatsApp or Email to lock the exact slot!
          </p>

          <div style="display: flex; flex-direction: column; gap: 0.85rem; max-width: 360px; margin: 0 auto 1.5rem;">
            <a href="https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}?text=${message}" target="_blank" class="btn btn-primary" style="background: #25d366; border-color: #25d366; color: #ffffff;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.54 1.861.855 2.796.857 3.18 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.767-5.768-5.767zm0 10.373c-.886 0-1.748-.239-2.493-.687l-.179-.106-1.854.486.495-1.808-.117-.186c-.495-.788-.756-1.704-.755-2.484 0-2.529 2.057-4.587 4.586-4.587 2.528 0 4.586 2.058 4.586 4.587 0 2.529-2.058 4.587-4.587 4.587z"/></svg>
              <span>Connect on WhatsApp</span>
            </a>
            
            <a href="mailto:${profile.email}?subject=Project Discovery Call - ${encodeURIComponent(name)}&body=${message.replace(/%0A/g, '%0D%0A')}" class="btn btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>Send via Email</span>
            </a>
          </div>

          <button class="btn btn-secondary btn-sm" onclick="location.reload()">
            Close & Return to Portfolio
          </button>
        </div>
      `;
    }

    if (window.showToast) {
      window.showToast('Call booked successfully! Connect on WhatsApp/Email.', 'success');
    }
  }
}

window.initBooking = () => {
  window.bookingManager = new BookingManager();
};
