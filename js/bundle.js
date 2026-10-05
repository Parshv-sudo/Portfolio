// Auto-generated bundle — do not edit directly
(function() {
"use strict";

// ---- animations/hero.js ----
// Hero entrance animations — clip-path word reveal + floating shapes
function initHero() {
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

// ---- animations/scrub.js ----
// Scrub text — word-by-word scroll reveal (no pinning)
function initScrubText() {
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

// ---- animations/marquee.js ----
// Infinite horizontal marquee with scroll-driven velocity boost
function initMarquee() {
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

// ---- animations/features.js ----
// Feature blocks scroll reveal — alternating left/right entrance
function initFeatures() {
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

// ---- animations/projects.js ----
// Project cards stagger reveal + restrained hover
function initProjects() {
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

// ---- animations/stats.js ----
// Stats counter animation — numbers count up when entering viewport
function initStats() {
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

// ---- animations/timeline.js ----
// Timeline — vertical line draws on scroll, milestones reveal independently
function initTimeline() {
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

// ---- animations/cursor.js ----
// Custom cursor — two-layer ring + dot, desktop only
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ring = document.querySelector('.custom-cursor');
  const dot = document.querySelector('.custom-cursor-dot');
  if (!ring || !dot) return;

  // Activate after a short delay
  setTimeout(() => {
    ring.classList.add('cursor-active');
    dot.classList.add('cursor-active');
  }, 800);

  // Ring follows with GSAP lag; dot is near-instant
  document.addEventListener('mousemove', (e) => {
    gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power3.out' });
    gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'power2.out' });
  });

  // Expand ring on interactive elements
  const interactives = document.querySelectorAll('a, button, input, textarea, select, .project-card, .tab-btn, .cat-pill, .tech-chip, .quick-cmd, .magnetic-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    ring.classList.remove('cursor-active');
    dot.classList.remove('cursor-active');
  });
  document.addEventListener('mouseenter', () => {
    ring.classList.add('cursor-active');
    dot.classList.add('cursor-active');
  });
}

// ---- animations/magnetic.js ----
// Magnetic button — subtle positional pull toward cursor, desktop + pointer only
function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      // Cap displacement at 12px x, 8px y
      const x = gsap.utils.clamp(-12, 12, dx * 0.25);
      const y = gsap.utils.clamp(-8, 8, dy * 0.25);
      gsap.to(btn, { x, y, duration: 0.3, ease: 'power3.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

// ---- interactions/terminal.js ----
// Terminal CLI engine — preserved from original implementation
function initTerminal() {
  const termInput = document.getElementById('terminal-input');
  const termHistory = document.getElementById('terminal-history');
  const termScreen = document.getElementById('terminal-screen');
  const clearBtn = document.getElementById('clear-term-btn');

  if (!termInput || !termHistory) return;

  const commands = {
    'help': () => `<div class="text-on-surface-variant space-y-1"><p class="text-secondary font-semibold">Available Terminal Commands:</p><div class="grid grid-cols-1 sm:grid-cols-2 gap-1 text-label-sm"><p><span class="text-primary font-mono font-semibold">whoami</span> — Engineer identity & bio</p><p><span class="text-primary font-mono font-semibold">projects --fullstack</span> — Production systems</p><p><span class="text-primary font-mono font-semibold">skills</span> — JSON capability index</p><p><span class="text-primary font-mono font-semibold">cat resume.txt</span> — ASCII resume</p><p><span class="text-primary font-mono font-semibold">contact --send</span> — Focus contact form</p><p><span class="text-primary font-mono font-semibold">uptime</span> — System stats</p><p><span class="text-primary font-mono font-semibold">clear</span> — Flush history</p></div></div>`,
    'whoami': () => `<div class="text-on-surface-variant space-y-1"><p><span class="text-on-surface font-semibold">Parshv Runwal</span> — Upcoming Forward Deployed Engineer, graduating June 2028.</p><p>Building product-facing full-stack systems, resilient backend services, and high-signal engineering tools.</p><p class="text-primary">Direct Contact: <a href="mailto:pashv.d.runwal@gmail.com" class="underline">pashv.d.runwal@gmail.com</a> | Open to FDE internships, new-grad pipelines, and applied systems work.</p></div>`,
    'projects --fullstack': () => `<div class="text-on-surface-variant space-y-2"><div class="p-2.5 rounded bg-surface-container space-y-1"><div class="flex items-center justify-between"><span class="text-primary font-semibold font-mono">1. CloudMesh / Multi-Tenant SaaS</span><span class="text-label-sm text-outline">TS · Go · PG</span></div><p class="text-body-sm">12k tenants, 99.95% uptime, row-level security with real-time telemetry.</p></div><div class="p-2.5 rounded bg-surface-container space-y-1"><div class="flex items-center justify-between"><span class="text-secondary font-semibold font-mono">2. StreamPulse / Event Pipeline</span><span class="text-label-sm text-outline">Go · Kafka</span></div><p class="text-body-sm">250k events/sec with zero data loss across 4-node clusters.</p></div><div class="p-2.5 rounded bg-surface-container space-y-1"><div class="flex items-center justify-between"><span class="text-tertiary font-semibold font-mono">3. SynthAI / AI Code Reviewer</span><span class="text-label-sm text-outline">Python · TS</span></div><p class="text-body-sm">LLM + AST parsing detecting regressions with 92% acceptance rate.</p></div></div>`,
    'skills': () => `<pre class="text-primary text-label-sm font-mono overflow-x-auto p-2 bg-surface-container rounded">{\\n  "languages": ["Go", "TypeScript", "Rust", "Python", "SQL"],\\n  "frontend": ["Next.js 15", "React 19", "Tailwind CSS", "Three.js"],\\n  "backend": ["gRPC", "CQRS", "Kafka", "Microservices"],\\n  "databases": ["PostgreSQL", "Redis", "ClickHouse", "MongoDB"],\\n  "devops": ["Kubernetes", "Docker", "AWS", "Terraform", "GitHub CI/CD"]\\n}</pre>`,
    'cat resume.txt': () => `<div class="font-mono text-label-sm text-on-surface-variant p-3 bg-surface-container rounded space-y-2"><div class="text-primary font-bold">===================== PROFILE: PARSHV RUNWAL =====================</div><p><span class="text-on-surface font-semibold">Upcoming Forward Deployed Engineer</span> — graduating June 2028</p><p class="text-outline pl-2">- Building full-stack products with systems thinking, strong UX sense, and deployment discipline</p><p><span class="text-on-surface font-semibold">Current focus</span> — applied product engineering, backend reliability, data workflows, and developer tools</p><p class="text-outline pl-2">- Open to FDE internships, new-grad conversations, and practical engineering collaborations</p><div class="text-secondary font-bold">===================== GRADUATION: JUNE 2028 =====================</div></div>`,
    'contact --send': () => { const fi = document.getElementById('contact-name'); if (fi) fi.focus(); return `<p class="text-primary">Focusing contact form. Fill details on the right panel or email: <span class="underline">pashv.d.runwal@gmail.com</span></p>`; },
    'uptime': () => `<div class="text-on-surface-variant font-mono text-label-sm"><p>daemon uptime: 421 days, 14 hours, 32 mins</p><p>load average: 0.12, 0.08, 0.05 (optimal)</p><p>status: All microservice clusters healthy</p></div>`,
    'clear': () => { termHistory.innerHTML = ''; return null; }
  };

  function escapeHtml(str) { return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function appendCommand(cmdText, resultHtml) {
    if (cmdText.trim().toLowerCase() === 'clear') { termHistory.innerHTML = ''; return; }
    const item = document.createElement('div');
    item.className = 'space-y-1 pt-1';
    item.style.opacity = '0';
    item.innerHTML = `<div class="flex items-center gap-2 text-primary font-semibold"><span class="text-secondary">visitor@pr-mbp:~$</span><span>${escapeHtml(cmdText)}</span></div><div class="pl-4 py-1 text-on-surface-variant">${resultHtml}</div>`;
    termHistory.appendChild(item);
    gsap.fromTo(item, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    termScreen.scrollTop = termScreen.scrollHeight;
  }

  function executeCmd(input) {
    const trimmed = input.trim();
    if (!trimmed) return;
    const cmdKey = trimmed.toLowerCase();
    if (commands[cmdKey]) {
      const res = commands[cmdKey]();
      if (res !== null) appendCommand(trimmed, res);
    } else {
      appendCommand(trimmed, `<p class="text-error">zsh: command not found: ${escapeHtml(trimmed)}. Type <span class="text-primary font-semibold">'help'</span> for reference.</p>`);
    }
  }

  termInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') { executeCmd(this.value); this.value = ''; } });
  if (clearBtn) clearBtn.addEventListener('click', () => { termHistory.innerHTML = ''; });

  // Quick command buttons
  document.querySelectorAll('.quick-cmd').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      termInput.value = cmd;
      executeCmd(cmd);
      termInput.value = '';
      termInput.focus();
      gsap.from(btn, { duration: 0.3, scale: 0.92, ease: 'back.out(1.5)' });
    });
  });
}

// ---- interactions/github-projects.js ----
// List the exact GitHub repository URLs you want to showcase here:
const GITHUB_REPOS = [
  "https://github.com/Parshv-sudo/LegalEye",
  "https://github.com/Parshv-sudo/StayEasy",
  "https://github.com/Parshv-sudo/Life-OS",
];

async function initGithubProjects() {
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

// ---- interactions/case-studies.js ----
// Case study tabs with GSAP transitions
function initCaseStudies() {
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

// ---- interactions/contact.js ----
// Contact form validation with GSAP animations
function initContact() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');
  const formErrorText = document.getElementById('form-error-text');
  const contactEmail = 'pashv.d.runwal@gmail.com';
  if (!contactForm) return;

  // Input focus animations
  document.querySelectorAll('.contact-input').forEach(input => {
    input.addEventListener('focus', () => {
      gsap.to(input, { duration: 0.3, borderColor: '#4edea3', boxShadow: '0 0 12px rgba(78, 222, 163, 0.2)', ease: 'power2.out' });
    });
    input.addEventListener('blur', () => {
      gsap.to(input, { duration: 0.3, borderColor: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 0 0px rgba(0,0,0,0)', ease: 'power2.out' });
    });
  });

  function shakeField(el) {
    gsap.to(el, { duration: 0.08, x: -5, repeat: 4, yoyo: true, ease: 'power1.inOut', onComplete: () => gsap.set(el, { x: 0 }) });
    gsap.to(el, { duration: 0.3, borderColor: '#ffb4ab', boxShadow: '0 0 12px rgba(255, 180, 171, 0.2)', ease: 'power2.out' });
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const type = document.getElementById('contact-type');
    const message = document.getElementById('contact-message');
    if (formError) { formError.classList.add('hidden'); }
    if (formSuccess) { formSuccess.classList.add('hidden'); }

    if (!name.value.trim()) { shakeField(name); if (formErrorText) formErrorText.textContent = 'Name field is required'; if (formError) { formError.classList.remove('hidden'); formError.style.display = 'flex'; } return; }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { shakeField(email); if (formErrorText) formErrorText.textContent = 'Please enter a valid email address'; if (formError) { formError.classList.remove('hidden'); formError.style.display = 'flex'; } return; }
    if (!message.value.trim()) { shakeField(message); if (formErrorText) formErrorText.textContent = 'Message field is required'; if (formError) { formError.classList.remove('hidden'); formError.style.display = 'flex'; } return; }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">draft</span><span>OPENING EMAIL...</span>';
    }

    const inquiryType = type && type.options[type.selectedIndex] ? type.options[type.selectedIndex].text : 'Portfolio inquiry';
    const subject = `Portfolio inquiry: ${inquiryType}`;
    const body = [
      `Name: ${name.value.trim()}`,
      `Email: ${email.value.trim()}`,
      `Inquiry type: ${inquiryType}`,
      '',
      message.value.trim()
    ].join('\n');
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">send</span><span>OPEN EMAIL DRAFT</span>';
      }
      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        formSuccess.style.display = 'flex';
        gsap.from(formSuccess, { duration: 0.4, opacity: 0, scale: 0.9, y: -10, ease: 'back.out(1.3)' });
      }
    }, 600);
  });

  // Copy email button
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(contactEmail).then(() => {
        const textSpan = document.getElementById('copy-text');
        if (textSpan) {
          const orig = textSpan.innerText;
          textSpan.innerText = 'Copied!';
          gsap.from(copyEmailBtn, { duration: 0.3, scale: 0.95, ease: 'back.out(1.5)' });
          setTimeout(() => { textSpan.innerText = orig; }, 2200);
        }
      });
    });
  }
}

// ---- main orchestrator ----
/**
 * main.js — Orchestrator
 * Registers GSAP plugins, gates on reduced motion, inits all modules
 * after fonts + layout settle.
 */














// ---- Register GSAP Plugins ----
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ---- Reduced Motion Check ----
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Navigation System ----
function initNavigation() {
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-link[data-path]');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[data-path]');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  const sections = document.querySelectorAll('section[data-section]');

  function setActiveNav(path) {
    navLinks.forEach(link => {
      if (link.getAttribute('data-path') === path) {
        link.classList.add('text-primary', 'border-primary');
        link.classList.remove('text-on-surface-variant', 'border-transparent');
      } else {
        link.classList.remove('text-primary', 'border-primary');
        link.classList.add('text-on-surface-variant', 'border-transparent');
      }
    });
    mobileNavLinks.forEach(link => {
      if (link.getAttribute('data-path') === path) {
        link.classList.add('text-primary', 'bg-surface-container');
      } else {
        link.classList.remove('text-primary', 'bg-surface-container');
      }
    });
  }

  function scrollToSection(path) {
    const section = document.querySelector(`[data-section="${path}"]`);
    if (section) {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: section.offsetTop - 64, autoKill: false },
        ease: 'power2.inOut'
      });
      setActiveNav(path);
    }
  }

  [...navLinks, ...mobileNavLinks].forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const path = link.getAttribute('data-path');
      if (path) {
        scrollToSection(path);
        if (mobileMenu) {
          mobileMenu.classList.add('menu-hidden');
          mobileMenu.classList.remove('menu-visible');
        }
        if (hamburgerIcon) hamburgerIcon.textContent = 'menu';
      }
    });
  });

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isVisible = mobileMenu && mobileMenu.classList.contains('menu-visible');
      if (isVisible) {
        mobileMenu.classList.add('menu-hidden');
        mobileMenu.classList.remove('menu-visible');
        if (hamburgerIcon) hamburgerIcon.textContent = 'menu';
      } else {
        if (mobileMenu) {
          mobileMenu.classList.remove('menu-hidden');
          mobileMenu.classList.add('menu-visible');
        }
        if (hamburgerIcon) hamburgerIcon.textContent = 'close';
      }
    });
  }

  // ScrollTrigger for active nav highlighting
  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 30%',
      end: 'bottom 30%',
      onEnter: () => setActiveNav(section.getAttribute('data-section')),
      onEnterBack: () => setActiveNav(section.getAttribute('data-section'))
    });
  });

  // Header hide/show on scroll
  let lastScrollY = 0;
  if (header) {
    ScrollTrigger.create({
      onUpdate: () => {
        const currentY = window.scrollY;
        if (currentY > lastScrollY && currentY > 200) {
          gsap.to(header, { duration: 0.3, y: -80, ease: 'power2.out' });
        } else {
          gsap.to(header, { duration: 0.3, y: 0, ease: 'power2.out' });
        }
        lastScrollY = currentY <= 0 ? 0 : currentY;
      }
    });
  }

  // Scroll-to-top button
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    ScrollTrigger.create({
      onUpdate: () => {
        if (window.scrollY > 500) {
          scrollTopBtn.classList.remove('hidden-btn');
          scrollTopBtn.classList.add('visible-btn');
        } else {
          scrollTopBtn.classList.add('hidden-btn');
          scrollTopBtn.classList.remove('visible-btn');
        }
      }
    });
    scrollTopBtn.addEventListener('click', () => {
      gsap.to(window, { duration: 0.8, scrollTo: { y: 0 }, ease: 'power2.inOut' });
    });
  }
}

// ---- Announcement Bar ----
function initAnnouncementBar() {
  const bar = document.querySelector('.announcement-bar');
  if (!bar) return;
  gsap.to(bar, { y: 0, duration: 0.5, ease: 'power2.out', delay: 0.2 });
}

// ---- Architecture Modal ----
function initArchModal() {
  const modal = document.getElementById('arch-modal');
  const modalTitle = document.getElementById('modal-title');
  if (!modal) return;

  document.querySelectorAll('.open-arch-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title');
      if (title && modalTitle) modalTitle.textContent = title;
      modal.classList.remove('opacity-0', 'pointer-events-none');
      gsap.from(modal.querySelector('.bg-surface-container'), { duration: 0.4, scale: 0.95, opacity: 0, ease: 'back.out(1.2)' });
    });
  });

  const closeModal = () => {
    gsap.to(modal.querySelector('.bg-surface-container'), { duration: 0.2, scale: 0.98, opacity: 0, ease: 'power2.in', onComplete: () => {
      modal.classList.add('opacity-0', 'pointer-events-none');
      gsap.set(modal.querySelector('.bg-surface-container'), { clearProps: 'all' });
    }});
  };

  const closeBtn = document.getElementById('close-modal');
  const dismissBtn = document.getElementById('dismiss-modal');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) closeModal(); });
}

// ---- Footer Color Inversion ----
function initFooterInversion() {
  const footer = document.querySelector('.footer-inverted');
  if (!footer) return;
  ScrollTrigger.create({
    trigger: footer,
    start: 'top 90%',
    onEnter: () => gsap.to(footer, { opacity: 1, duration: 0.4, ease: 'power2.out' }),
    onLeaveBack: () => gsap.to(footer, { opacity: 0, duration: 0.3, ease: 'power2.in' })
  });
}

// ---- Boot ----
function boot() {
  // Always init interactions (they work with or without animations)
  initNavigation();
  initAnnouncementBar();
  initArchModal();
  initTerminal();
  initGithubProjects();
  initCaseStudies();
  initContact();

  if (!prefersReducedMotion) {
    // Animations
    initHero();
    initScrubText();
    initMarquee();
    initFeatures();
    initProjects();
    initStats();
    initTimeline();
    initCursor();
    initMagneticButtons();
    initFooterInversion();
  }

  // Refresh ScrollTrigger after everything is loaded
  ScrollTrigger.refresh();
}

// Wait for fonts + layout
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      boot();
    } else {
      document.addEventListener('DOMContentLoaded', boot);
    }
  });
} else {
  document.addEventListener('DOMContentLoaded', boot);
}

// ---- Cleanup ----
window.addEventListener('beforeunload', () => {
  gsap.killTweensOf('*');
  ScrollTrigger.getAll().forEach(t => t.kill());
});

})();
