// Hero entrance animations — clip-path word reveal + floating shapes
export function initHero() {
  const words = document.querySelectorAll('.hero-word');
  const label = document.querySelector('.hero-label');
  const tagline = document.querySelector('.hero-tagline');
  const cta = document.querySelector('.hero-cta-outline');
  const shapes = document.querySelectorAll('.floating-shape');
  const badges = document.querySelectorAll('.badge-pill');

  if (!words.length) return;

  const tl = gsap.timeline({ delay: 0.4 });

  // Label fades in
  if (label) {
    tl.from(label, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' });
  }

  // Words reveal via clip-path — bottom to full
  tl.to(words, {
    clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out'
  }, '-=0.2');

  // Tagline
  if (tagline) {
    tl.from(tagline, { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out' }, '-=0.3');
  }

  // CTA button
  if (cta) {
    tl.from(cta, { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.2');
  }

  // Floating shapes enter from offscreen with rotation
  shapes.forEach((shape, i) => {
    const directions = [
      { x: 120, y: -80, rotation: -30 },
      { x: -100, y: 100, rotation: 20 },
      { x: 80, y: 60, rotation: -15 }
    ];
    const d = directions[i] || directions[0];
    tl.from(shape, {
      x: d.x, y: d.y, rotation: d.rotation,
      opacity: 0, scale: 0.5,
      duration: 0.8, ease: 'back.out(1.4)'
    }, '-=0.5');

    // Idle float animation
    gsap.to(shape, {
      y: `+=${15 + i * 5}`,
      x: `+=${8 + i * 3}`,
      rotation: `+=${5 + i * 2}`,
      duration: 4 + i * 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.5
    });
  });

  // Badge pills enter with rotation
  badges.forEach((badge, i) => {
    tl.from(badge, {
      rotation: -15 + i * 10,
      y: 40,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.2)'
    }, '-=0.3');
  });
}
