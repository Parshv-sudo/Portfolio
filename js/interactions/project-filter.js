// Project filters — category pills, tech chips, search
export function initProjectFilters() {
  let activeCategory = 'all';
  const activeTechs = new Set();
  let searchQuery = '';

  const catButtons = document.querySelectorAll('#category-filters .cat-pill');
  const techChips = document.querySelectorAll('.tech-chip');
  const searchInput = document.getElementById('search-input');
  const resetBtn = document.getElementById('reset-filters');
  const cards = document.querySelectorAll('.project-card');

  if (!catButtons.length || !cards.length) return;

  function filterProjects() {
    cards.forEach(card => {
      const cardCats = card.getAttribute('data-cats') || '';
      const cardTechs = card.getAttribute('data-techs') || '';
      const cardText = card.innerText.toLowerCase();
      const matchesCat = (activeCategory === 'all') || cardCats.includes(activeCategory);
      const matchesTech = activeTechs.size === 0 || [...activeTechs].every(t => cardTechs.includes(t));
      const matchesSearch = !searchQuery || cardText.includes(searchQuery.toLowerCase());
      const isVisible = matchesCat && matchesTech && matchesSearch;

      if (isVisible) {
        gsap.to(card, { duration: 0.4, opacity: 1, scale: 1, pointerEvents: 'auto', ease: 'power2.out' });
        card.style.display = '';
      } else {
        gsap.to(card, { duration: 0.3, opacity: 0, scale: 0.95, pointerEvents: 'none', ease: 'power2.in',
          onComplete: () => { if (!isVisible) card.style.display = 'none'; }
        });
      }
    });
    if (resetBtn) resetBtn.classList.toggle('hidden', activeCategory === 'all' && activeTechs.size === 0 && !searchQuery);
  }

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => { b.classList.remove('bg-primary-container/20', 'text-primary', 'active-pill'); b.classList.add('text-on-surface-variant'); });
      btn.classList.add('bg-primary-container/20', 'text-primary', 'active-pill');
      btn.classList.remove('text-on-surface-variant');
      gsap.from(btn, { duration: 0.3, scale: 0.95, ease: 'back.out(1.5)' });
      activeCategory = btn.getAttribute('data-cat');
      filterProjects();
    });
  });

  techChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const tech = chip.getAttribute('data-tech');
      if (activeTechs.has(tech)) {
        activeTechs.delete(tech);
        chip.classList.remove('bg-primary-container/20', 'text-primary');
        chip.classList.add('bg-surface-container', 'text-on-surface-variant');
      } else {
        activeTechs.add(tech);
        chip.classList.add('bg-primary-container/20', 'text-primary');
        chip.classList.remove('bg-surface-container', 'text-on-surface-variant');
        gsap.from(chip, { duration: 0.3, scale: 0.92, ease: 'back.out(1.5)' });
      }
      filterProjects();
    });
  });

  if (searchInput) searchInput.addEventListener('input', (e) => { searchQuery = e.target.value.trim(); filterProjects(); });
  if (resetBtn) resetBtn.addEventListener('click', () => {
    activeCategory = 'all'; activeTechs.clear(); searchQuery = ''; if (searchInput) searchInput.value = '';
    catButtons.forEach((b, i) => { if (i === 0) { b.classList.add('bg-primary-container/20', 'text-primary', 'active-pill'); b.classList.remove('text-on-surface-variant'); } else { b.classList.remove('bg-primary-container/20', 'text-primary', 'active-pill'); b.classList.add('text-on-surface-variant'); } });
    techChips.forEach(c => { c.classList.remove('bg-primary-container/20', 'text-primary'); c.classList.add('bg-surface-container', 'text-on-surface-variant'); });
    filterProjects();
  });
}
