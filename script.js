// ── 5. WATCH DEMO — VIDEO MODAL ────────────────────────────────
// Creates a popup modal when "Watch Demo" is clicked

const watchDemoBtn = document.querySelector('.btn-ghost');

watchDemoBtn.addEventListener('click', (e) => {
  e.preventDefault(); // stop page jumping to #

  // Create overlay background
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.85);
    display: flex; align-items: center; justify-content: center;
    animation: fadeIn 0.3s ease;
  `;

  // Create modal box
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: #13131a;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    padding: 2.5rem;
    max-width: 560px;
    width: 90%;
    text-align: center;
    position: relative;
    animation: slideUp 0.3s ease;
  `;

  modal.innerHTML = `
    <button id="closeModal" style="
      position:absolute; top:1rem; right:1rem;
      background:rgba(255,255,255,0.08); border:none;
      color:#fff; width:32px; height:32px;
      border-radius:50%; cursor:pointer; font-size:1rem;
    ">✕</button>
    <div style="font-size:3rem; margin-bottom:1rem;">🎬</div>
    <h3 style="font-family:'Syne',sans-serif; font-size:1.4rem; margin-bottom:0.75rem;">
      Demo Coming Soon!
    </h3>
    <p style="color:#7a7a8c; font-size:0.9rem; line-height:1.6; margin-bottom:1.5rem;">
      The full demo video is being produced. For now, scroll down to explore all the courses and features live on this page!
    </p>
    <a href="#courses" id="modalCTA" style="
      background:#c8f04d; color:#0a0a0f;
      padding:0.8rem 1.8rem; border-radius:100px;
      font-weight:700; text-decoration:none;
      display:inline-block; font-family:'DM Sans',sans-serif;
    ">Explore Courses →</a>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close on X button
  document.getElementById('closeModal').addEventListener('click', () => {
    document.body.removeChild(overlay);
  });

  // Close on overlay click (outside modal)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) document.body.removeChild(overlay);
  });

  // Close on Escape key
  document.addEventListener('keydown', function escClose(e) {
    if (e.key === 'Escape' && document.body.contains(overlay)) {
      document.body.removeChild(overlay);
      document.removeEventListener('keydown', escClose);
    }
  });

  // Close modal and scroll to courses on CTA click
  document.getElementById('modalCTA').addEventListener('click', () => {
    document.body.removeChild(overlay);
  });
});


// ── 6. COURSE CARD CLICK ────────────────────────────────────────
// Shows a toast notification when a course card is clicked

const courseCards = document.querySelectorAll('.course-card');

courseCards.forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    const title = card.querySelector('.course-title').textContent;
    showToast(`📚 "${title}" — Enrollment opening soon!`);
  });
});


// ── 7. TOAST NOTIFICATION HELPER ───────────────────────────────
function showToast(message) {
  // Remove any existing toast first
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem; left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #1c1c27;
    border: 1px solid rgba(200,240,77,0.3);
    color: #f0f0f5;
    padding: 0.9rem 1.6rem;
    border-radius: 100px;
    font-size: 0.88rem;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    z-index: 999;
    opacity: 0;
    transition: all 0.3s ease;
    white-space: nowrap;
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
  `;

  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  }, 10);

  // Animate out after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


// ── 8. GET STARTED / CTA BUTTONS ───────────────────────────────
// Show toast when Get Started buttons are clicked

const ctaButtons = document.querySelectorAll('.btn-primary');

ctaButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Only intercept the CTA section button (not the scroll ones)
    if (btn.textContent.includes('Get Started Free')) {
      e.preventDefault();
      showToast('🚀 Sign up launching soon — stay tuned!');
    }
  });
});


// ── 1. HAMBURGER MENU ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');

  const spans = hamburger.querySelectorAll('span');

  if (navLinks.classList.contains('open')) {
    // Animate 3 lines → X icon
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    // Reset back to 3 lines
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close nav when any link is clicked (mobile)
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});


// ── 2. SCROLL REVEAL ───────────────────────────────────────────
// All elements with class "reveal" start hidden (in CSS)
// When they enter the viewport, we add "visible" class → CSS animates them in

const reveals  = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger: each element appears 60ms after the previous one
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);

      // Stop watching once revealed (no need to re-animate)
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 }); // trigger when 10% of element is visible

reveals.forEach(el => revealObserver.observe(el));


// ── 3. NAVBAR BACKGROUND ON SCROLL ─────────────────────────────
// Makes nav more opaque when user scrolls down

const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(10,10,15,0.95)'; // more solid
  } else {
    nav.style.background = 'rgba(10,10,15,0.8)';  // semi-transparent
  }
});


// ── 4. ANIMATED NUMBER COUNTER ─────────────────────────────────
// Stats like "50K+" count up from 0 when they scroll into view

const statNums = document.querySelectorAll('.stat-num');

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el  = entry.target;
      const raw = el.textContent;                          // e.g. "50K+"

      // Separate number from suffix
      const num    = parseFloat(raw.replace(/[^0-9.]/g, '')); // 50
      const suffix = raw.replace(/[0-9.]/g, '');              // "K+"

      const duration  = 1400; // animation duration in ms
      const startTime = performance.now();

      const animate = (now) => {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic — starts fast, slows down at end
        const eased = 1 - Math.pow(1 - progress, 3);

        el.textContent = Math.round(num * eased) + suffix;

        if (progress < 1) {
          requestAnimationFrame(animate); // keep animating at 60fps
        } else {
          el.textContent = raw; // set exact original value at end
        }
      };

      requestAnimationFrame(animate);
      statObserver.unobserve(el); // only animate once
    }
  });
}, { threshold: 0.5 }); // trigger when 50% of stat is visible

statNums.forEach(el => statObserver.observe(el));
