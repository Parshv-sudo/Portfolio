// Custom cursor — two-layer ring + dot, desktop only
export function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ring = document.querySelector('.custom-cursor');
  const dot = document.querySelector('.custom-cursor-dot');
  if (!ring || !dot) return;

  // Activate after a short delay
  setTimeout(() => {
    ring.classList.add('cursor-active');
    dot.classList.add('cursor-active');
  }, 800);

  // Ring follows with GSAP lag; dot is near-instant
  document.addEventListener('mousemove', (e) => {
    gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power3.out' });
    gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'power2.out' });
  });

  // Expand ring on interactive elements
  const interactives = document.querySelectorAll('a, button, input, textarea, select, .project-card, .tab-btn, .cat-pill, .tech-chip, .quick-cmd, .magnetic-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    ring.classList.remove('cursor-active');
    dot.classList.remove('cursor-active');
  });
  document.addEventListener('mouseenter', () => {
    ring.classList.add('cursor-active');
    dot.classList.add('cursor-active');
  });
}
