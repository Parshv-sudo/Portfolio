// Project cards stagger reveal + restrained hover
export function initProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;

  // Stagger reveal on scroll
  gsap.from(cards, {
    opacity: 0, y: 60, scale: 0.97,
    duration: 0.6, ease: 'power2.out',
    stagger: 0.12,
    scrollTrigger: { trigger: container, start: 'top 80%', toggleActions: 'play none none none' }
  });

  // Restrained hover: subtle lift + slight image scale (no rotation/parallax/blur)
  cards.forEach(card => {
    const img = card.querySelector('img');
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { duration: 0.3, y: -4, ease: 'power2.out' });
      if (img) gsap.to(img, { duration: 0.4, scale: 1.03, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { duration: 0.3, y: 0, ease: 'power2.out' });
      if (img) gsap.to(img, { duration: 0.4, scale: 1, ease: 'power2.out' });
    });
  });
}
