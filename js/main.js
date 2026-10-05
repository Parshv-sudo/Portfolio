/**
 * main.js — Orchestrator
 * Registers GSAP plugins, gates on reduced motion, inits all modules
 * after fonts + layout settle.
 */

import { initHero } from './animations/hero.js';
import { initScrubText } from './animations/scrub.js';
import { initMarquee } from './animations/marquee.js';
import { initFeatures } from './animations/features.js';
import { initProjects } from './animations/projects.js';
import { initStats } from './animations/stats.js';
import { initTimeline } from './animations/timeline.js';
import { initCursor } from './animations/cursor.js';
import { initMagneticButtons } from './animations/magnetic.js';

import { initTerminal } from './interactions/terminal.js';
import { initGithubProjects } from './interactions/github-projects.js';
import { initCaseStudies } from './interactions/case-studies.js';
import { initContact } from './interactions/contact.js';

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
