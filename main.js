// ── Scroll Animations (Intersection Observer) ─────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

// ── Counter Animation ──────────────────────────────────────────────
const counters = document.querySelectorAll('.stat__number[data-target]');

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      counterObserver.unobserve(entry.target);

      const el     = entry.target;
      const target = +el.dataset.target;
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const step   = 16;
      const steps  = duration / step;
      let current  = 0;

      const timer = setInterval(() => {
        current += target / steps;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = prefix + Math.floor(current) + suffix;
      }, step);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((el) => counterObserver.observe(el));

// ── Lightbox ───────────────────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
const lbClose  = document.getElementById('lbClose');

function openLightbox(src, alt) {
  lbImg.src    = src;
  lbImg.alt    = alt;
  lbCaption.textContent = alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lbImg.src = ''; }, 300);
}

document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('click', () => {
    const img   = card.querySelector('img');
    const niche = card.dataset.niche || img.alt;
    openLightbox(img.src, niche);
  });
});

// Screenshot expand buttons (Google Ads section)
document.querySelectorAll('.screenshot-expand, .screenshot-frame__img').forEach((el) => {
  el.addEventListener('click', () => {
    const btn = el.closest('.gads__screenshot').querySelector('.screenshot-expand');
    const src = btn.dataset.img;
    const cap = btn.dataset.caption;
    openLightbox(src, cap);
  });
});

lbClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
