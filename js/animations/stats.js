// Stats counter animation — numbers count up when entering viewport
export function initStats() {
  const counters = document.querySelectorAll('.stat-number[data-value]');
  if (!counters.length) return;

  counters.forEach(counter => {
    const raw = counter.getAttribute('data-value');
    const suffix = counter.getAttribute('data-suffix') || '';
    const prefix = counter.getAttribute('data-prefix') || '';
    const isDecimal = raw.includes('.');
    const target = parseFloat(raw);

    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      snap: isDecimal ? 0.01 : 1,
      scrollTrigger: {
        trigger: counter,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        counter.textContent = prefix + (isDecimal ? obj.val.toFixed(2) : Math.floor(obj.val)) + suffix;
      }
    });
  });
}
