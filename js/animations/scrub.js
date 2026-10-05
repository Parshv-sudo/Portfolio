// Scrub text — word-by-word scroll reveal (no pinning)
export function initScrubText() {
  const words = document.querySelectorAll('.scrub-word');
  if (!words.length) return;

  const container = document.querySelector('.scrub-section');
  if (!container) return;

  // Create a single timeline scrubbed by the container's scroll position
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 70%',
      end: 'bottom 30%',
      scrub: 0.8
    }
  });

  words.forEach((word, i) => {
    tl.to(word, {
      opacity: 1,
      color: '#dfe2ee',
      duration: 1,
      ease: 'none'
    }, i * 0.5);
  });
}
