// Magnetic button — subtle positional pull toward cursor, desktop + pointer only
export function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      // Cap displacement at 12px x, 8px y
      const x = gsap.utils.clamp(-12, 12, dx * 0.25);
      const y = gsap.utils.clamp(-8, 8, dy * 0.25);
      gsap.to(btn, { x, y, duration: 0.3, ease: 'power3.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}
