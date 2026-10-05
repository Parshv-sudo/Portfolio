// Timeline — vertical line draws on scroll, milestones reveal independently
export function initTimeline() {
  // Line draws with scroll progress
  gsap.utils.toArray('.timeline-draw-line').forEach(line => {
    gsap.to(line, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: line,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 0.5
      }
    });
  });

  // Milestone nodes scale in
  gsap.utils.toArray('.milestone-node').forEach((node, i) => {
    gsap.from(node, {
      scale: 0, opacity: 0,
      ease: 'back.out(1.7)',
      duration: 0.5,
      scrollTrigger: { trigger: node, start: 'top 80%', toggleActions: 'play none none none' },
      delay: i * 0.1
    });
  });

  // Milestone cards reveal
  gsap.utils.toArray('.timeline-milestone').forEach(card => {
    gsap.from(card, {
      opacity: 0, y: 40,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none none' }
    });
  });
}
