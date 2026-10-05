// List the exact GitHub repository URLs you want to showcase here:
export const GITHUB_REPOS = [
  "https://github.com/Parshv-sudo/LegalEye",
  "https://github.com/Parshv-sudo/StayEasy",
  "https://github.com/Parshv-sudo/Life-OS",
];

export async function initGithubProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  // If there are no configured repos, keep whatever is already in the HTML (placeholders)
  if (!GITHUB_REPOS || GITHUB_REPOS.length === 0) return;

  // Clear container
  container.innerHTML = '<div class="col-span-full py-12 text-center text-on-surface-variant animate-pulse font-body-sm text-body-sm">Loading GitHub projects...</div>';

  try {
    const results = await Promise.allSettled(GITHUB_REPOS.map(async (url) => {
      // Extract owner and repo from URL (e.g. https://github.com/Parshv-sudo/StayEasy)
      const parts = url.split('github.com/');
      if (parts.length < 2) return '';
      // If it's a known private repo like LegalEye, return hardcoded data instead of fetching
      if (repoPath.toLowerCase() === "parshv-sudo/legaleye") {
        return {
          name: "LegalEye",
          full_name: "Parshv-sudo/LegalEye",
          html_url: "https://github.com/Parshv-sudo/LegalEye",
          description: "An AI-powered legal document analysis and insight platform. (Private Repository)",
          language: "TypeScript", // Update this if needed
          stargazers_count: 0,
          forks_count: 0,
          open_issues_count: 0,
          watchers_count: 0,
          visibility: "Private",
          topics: ["ai", "legal-tech", "nextjs"], // Update topics if needed
          homepage: "" // Add a live link if applicable
        };
      }

      const res = await fetch(`https://api.github.com/repos/${repoPath}`);
      if (!res.ok) throw new Error(`Failed to fetch ${repoPath}`);
      
      return await res.json();
    }));

    // Generate HTML for each resolved project
    const projectsHTML = results
      .filter(r => r.status === 'fulfilled' && r.value)
      .map(r => {
        const data = r.value;
        const repoPath = data.full_name;
        
        // Use a generic placeholder for private repos, or the GitHub OG image for public ones
        const ogImageUrl = data.visibility?.toLowerCase() === 'private' 
          ? 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800' // Placeholder legal/tech image
          : `https://opengraph.githubassets.com/1/${repoPath}`;
        
        const languageBadge = data.language 
          ? `<span class="px-2 py-0.5 rounded bg-surface-container-high font-label-sm text-label-sm text-on-surface">${data.language}</span>` 
          : '';
          
        const defaultDesc = "No description provided for this repository.";

      return `
        <article class="project-card group flex flex-col rounded-xl bg-surface-container-low overflow-hidden hover:shadow-2xl transition-all duration-300" style="opacity: 0;">
          <div class="px-4 py-2.5 bg-surface-container flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-error/40"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-secondary/40"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-primary/40"></span>
              <span class="ml-2 font-label-sm text-label-sm text-on-surface-variant truncate">${repoPath}</span>
            </div>
            <span class="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-label-sm text-label-sm">
              <span class="material-symbols-outlined text-[14px] align-middle">star</span> ${data.stargazers_count}
            </span>
          </div>
          <div class="relative w-full h-48 overflow-hidden bg-surface-container-highest">
            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${ogImageUrl}" alt="${data.name} Repository"/>
            <div class="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
          </div>
          <div class="p-5 flex flex-col flex-grow justify-between gap-4">
            <div>
              <div class="flex items-start justify-between gap-2 mb-1.5">
                <h2 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-bold">${data.name}</h2>
                <span class="font-label-sm text-label-sm text-on-surface-variant capitalize">${data.visibility || 'Public'}</span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">${data.description || defaultDesc}</p>
            </div>
            <div class="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-surface-container text-center">
              <div>
                <span class="block font-headline-sm text-headline-sm text-on-surface font-semibold">${data.forks_count}</span>
                <span class="font-label-sm text-label-sm text-on-surface-variant">Forks</span>
              </div>
              <div>
                <span class="block font-headline-sm text-headline-sm text-primary font-semibold">${data.open_issues_count}</span>
                <span class="font-label-sm text-label-sm text-on-surface-variant">Issues</span>
              </div>
              <div>
                <span class="block font-headline-sm text-headline-sm text-secondary font-semibold">${data.watchers_count}</span>
                <span class="font-label-sm text-label-sm text-on-surface-variant">Watchers</span>
              </div>
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${languageBadge}
              ${data.topics ? data.topics.map(topic => `<span class="px-2 py-0.5 rounded bg-surface-container-high font-label-sm text-label-sm text-on-surface">${topic}</span>`).join('') : ''}
            </div>
            <div class="pt-3 border-t border-surface-variant/30 flex items-center justify-between gap-2 mt-auto">
              <a class="flex items-center gap-1 text-on-surface-variant hover:text-primary font-label-sm text-label-sm transition-colors" href="${data.html_url}" target="_blank" rel="noopener noreferrer">
                <span class="material-symbols-outlined text-[16px]">code</span>
                <span>Source Code</span>
              </a>
              ${data.homepage ? `
              <a class="flex items-center gap-1 px-3 py-1.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-fixed transition-colors" href="${data.homepage}" target="_blank" rel="noopener noreferrer">
                <span>Live Demo</span>
                <span class="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
              ` : ''}
            </div>
          </div>
        </article>
      `;
    }));

    // Filter out failed repos gracefully — show cards that succeeded
    const projectsHTML = results
      .filter(r => r.status === 'fulfilled' && r.value)
      .map(r => r.value);

    if (projectsHTML.length === 0) {
      container.innerHTML = '<div class="col-span-full py-12 text-center text-on-surface-variant font-body-sm text-body-sm">No projects could be loaded. Check back soon!</div>';
      return;
    }

    container.innerHTML = projectsHTML.join('');

    // Re-initialize GSAP ScrollTrigger animations for the newly injected cards
    const newCards = container.querySelectorAll('.project-card');
    if (newCards.length && window.gsap && window.ScrollTrigger) {
      gsap.fromTo(newCards, 
        { y: 60, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    container.innerHTML = `<div class="col-span-full py-12 text-center text-error font-body-sm text-body-sm">Failed to load projects: ${error.message}</div>`;
  }
}

