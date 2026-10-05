// Infinite horizontal marquee with scroll-driven velocity boost
export function initMarquee() {
  const tracks = document.querySelectorAll('.marquee-track');
  if (!tracks.length) return;

  tracks.forEach((track, i) => {
    const pills = track.querySelectorAll('.marquee-pill');
    if (!pills.length) return;

    // Clone pills for seamless loop
    pills.forEach(pill => {
      const clone = pill.cloneNode(true);
      track.appendChild(clone);
    });

    const direction = i % 2 === 0 ? -1 : 1;
    const totalWidth = track.scrollWidth / 2;

    // Set initial position for reverse direction
    if (direction === 1) {
      gsap.set(track, { x: -totalWidth });
    }

    // Create the infinite loop
    const tween = gsap.to(track, {
      x: direction === -1 ? -totalWidth : 0,
      duration: 30 + i * 5,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => {
          return direction === -1
            ? parseFloat(x) % totalWidth
            : (parseFloat(x) % totalWidth) - totalWidth;
        })
      }
    });

    // Scroll-driven velocity boost
    ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const speedMultiplier = gsap.utils.clamp(1, 3, 1 + velocity / 2000);
        tween.timeScale(speedMultiplier);
      }
    });
  });
}
