// Case study tabs with GSAP transitions
export function initCaseStudies() {
  const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
  const tabPanels = document.querySelectorAll('.tab-panel[id^="tab-panel-"]');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      tabBtns.forEach(b => {
        if (b.getAttribute('data-tab') === tabId) {
          gsap.to(b, { duration: 0.3, backgroundColor: '#4edea3', color: '#003824', ease: 'power2.out' });
          b.classList.add('bg-primary', 'text-on-primary', 'font-bold');
          b.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
          b.setAttribute('aria-selected', 'true');
        } else {
          gsap.to(b, { duration: 0.2, backgroundColor: '#262a33', color: '#bbcabf', ease: 'power2.out' });
          b.classList.remove('bg-primary', 'text-on-primary', 'font-bold');
          b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
          b.setAttribute('aria-selected', 'false');
        }
      });
      tabPanels.forEach(panel => {
        if (panel.id === `tab-panel-${tabId}`) {
          panel.classList.remove('hidden');
          gsap.fromTo(panel, { opacity: 0, y: 15 }, { duration: 0.45, opacity: 1, y: 0, ease: 'power2.out' });
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });
}
