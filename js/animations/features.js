// Feature blocks scroll reveal — alternating left/right entrance
export function initFeatures() {
  const blocks = document.querySelectorAll('.feature-block');
  if (!blocks.length) return;

  blocks.forEach((block, i) => {
    const visual = block.querySelector('.feature-visual');
    const text = block.querySelector('.feature-text');
    const fromLeft = i % 2 === 0;

    if (visual) {
      gsap.from(visual, {
        x: fromLeft ? -80 : 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: block, start: 'top 75%', toggleActions: 'play none none none' }
      });
    }

    if (text) {
      gsap.from(text, {
        x: fromLeft ? 60 : -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: block, start: 'top 70%', toggleActions: 'play none none none' }
      });
    }
  });

  // Generic scroll reveal for data-scroll-reveal elements
  gsap.utils.toArray('[data-scroll-reveal]').forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      duration: 0.6,
      opacity: 0,
      y: 35,
      ease: 'power2.out'
    });
  });
}
