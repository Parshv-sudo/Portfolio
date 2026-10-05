# Portfolio Prototype with GSAP Animations
## Advanced Animation Implementation for Claude Opus 4.6

---

## OVERVIEW

This prompt augments the base portfolio prototype development with **professional-grade animations** using **GSAP (GreenSock Animation Platform)**. GSAP is chosen for its:
- **Superior performance** - 3x faster than CSS animations
- **Fine-grained control** - Precise timing, sequencing, easing
- **Rich timeline capabilities** - Coordinate complex multi-element animations
- **ScrollTrigger plugin** - Scroll-based reveal animations
- **Ease presets** - Professional easing functions (elastic, back, circ, etc.)

---

## GSAP LIBRARY SETUP

Add GSAP to the HTML head before other scripts:

```html
<!-- GSAP Core Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<!-- GSAP Plugins -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"></script>

<!-- Register plugins -->
<script>
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
</script>
```

**OR include in each HTML file's `<script>` section.**

---

## ANIMATION CATEGORIES & IMPLEMENTATION

### 1. HERO SECTION ANIMATIONS (engineering_overview)

#### 1.1 Page Load Sequence
```javascript
// Staggered entrance animation on page load
const heroTimeline = gsap.timeline({ delay: 0.2 });

heroTimeline
  .from('h1', {
    duration: 0.8,
    opacity: 0,
    y: 30,
    ease: 'power2.out'
  })
  .from('p', {
    duration: 0.6,
    opacity: 0,
    y: 20,
    ease: 'power2.out'
  }, '-=0.4') // Stagger by 0.4s
  .from('.cta-button', {
    duration: 0.5,
    opacity: 0,
    scale: 0.95,
    ease: 'back.out',
    stagger: 0.1
  }, '-=0.3');
```

#### 1.2 Terminal Window Animation
```javascript
// Terminal lines appear with typing effect
gsap.to('.terminal-output div', {
  duration: 0.5,
  opacity: 1,
  x: 0,
  ease: 'power2.out',
  stagger: {
    amount: 1.2,
    from: 'start'
  },
  scrollTrigger: {
    trigger: '.terminal-window',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});
```

#### 1.3 Status Badge Pulse Animation
```javascript
// Custom pulsing glow for status badge
gsap.to('.status-badge .ping', {
  duration: 2,
  scale: 1.5,
  opacity: 0,
  repeat: -1,
  ease: 'power1.out'
});

gsap.to('.status-badge .dot', {
  duration: 0.6,
  boxShadow: '0 0 20px rgba(78, 222, 163, 0.6)',
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});
```

#### 1.4 Ambient Background Orbs Animation
```javascript
// Slow, floating background orbs
gsap.to('.bg-glow-primary', {
  duration: 8,
  x: 50,
  y: -50,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

gsap.to('.bg-glow-secondary', {
  duration: 10,
  x: -60,
  y: 40,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
  delay: 2
});
```

#### 1.5 CTA Button Hover Animations
```javascript
// Interactive button animations
document.querySelectorAll('.cta-button').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, {
      duration: 0.3,
      scale: 1.05,
      boxShadow: '0 0 24px rgba(78, 222, 163, 0.5)',
      ease: 'power2.out'
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      duration: 0.3,
      scale: 1,
      boxShadow: '0 0 12px rgba(78, 222, 163, 0.25)',
      ease: 'power2.out'
    });
  });
});
```

---

### 2. PROJECT GRID ANIMATIONS (projects_system_architecture)

#### 2.1 Filter Pill Toggle Animation
```javascript
// Animate pill state change
document.querySelectorAll('[data-filter]').forEach(pill => {
  pill.addEventListener('click', function() {
    this.classList.toggle('active');
    
    // Animate the border and background
    gsap.to(this, {
      duration: 0.3,
      borderColor: this.classList.contains('active') 
        ? 'rgba(78, 222, 163, 1)' 
        : 'rgba(255, 255, 255, 0.08)',
      backgroundColor: this.classList.contains('active')
        ? 'rgba(78, 222, 163, 0.12)'
        : 'rgba(255, 255, 255, 0.04)',
      ease: 'power2.out'
    });

    // Pulse animation for active state
    if (this.classList.contains('active')) {
      gsap.from(this, {
        duration: 0.4,
        scale: 0.95,
        ease: 'back.out'
      });
    }
  });
});
```

#### 2.2 Project Card Entry Animation
```javascript
// Cards fade and slide in on page load
gsap.from('.project-card', {
  duration: 0.6,
  opacity: 0,
  y: 30,
  ease: 'power2.out',
  stagger: {
    amount: 0.8,
    from: 'start',
    grid: [3, 4] // 3 rows, 4 columns (adjust to your grid)
  },
  scrollTrigger: {
    trigger: '.projects-grid',
    start: 'top 75%',
    toggleActions: 'play none none reverse'
  }
});
```

#### 2.3 Project Card Hover Animation
```javascript
// Smooth card lift and glow on hover
document.querySelectorAll('.project-card').forEach(card => {
  const hoverTl = gsap.timeline({ paused: true });

  hoverTl.to(card, {
    duration: 0.3,
    y: -8,
    boxShadow: '0 0 24px rgba(78, 222, 163, 0.2)',
    ease: 'power2.out'
  }, 0)
  .to(card, {
    duration: 0.3,
    borderColor: 'rgba(78, 222, 163, 0.5)',
    ease: 'power2.out'
  }, 0);

  card.addEventListener('mouseenter', () => hoverTl.play());
  card.addEventListener('mouseleave', () => hoverTl.reverse());
});
```

#### 2.4 Filter Animation - Show/Hide Cards
```javascript
// Smooth show/hide animation when filtering
function filterProjects() {
  document.querySelectorAll('.project-card').forEach(card => {
    const isVisible = shouldShowCard(card); // Your filter logic

    if (isVisible) {
      gsap.to(card, {
        duration: 0.4,
        opacity: 1,
        pointerEvents: 'auto',
        ease: 'power2.out'
      });
    } else {
      gsap.to(card, {
        duration: 0.3,
        opacity: 0.2,
        pointerEvents: 'none',
        ease: 'power2.in'
      });
    }
  });
}
```

#### 2.5 Tech Stack Pill Counter Animation
```javascript
// Animate count of active filters
function updateFilterCount() {
  const activeCount = document.querySelectorAll('[data-filter].active').length;
  const counter = document.querySelector('.filter-count');
  
  gsap.to(counter, {
    duration: 0.4,
    scale: 1.2,
    ease: 'back.out',
    onComplete: () => {
      gsap.to(counter, {
        duration: 0.2,
        scale: 1,
        ease: 'power2.out'
      });
    }
  });
  
  counter.textContent = activeCount;
}
```

---

### 3. CASE STUDY TAB ANIMATIONS (full_stack_case_study_deep_dive)

#### 3.1 Tab Header Click Animation
```javascript
// Animate active tab indicator
document.querySelectorAll('[role="tab"]').forEach(tab => {
  tab.addEventListener('click', function() {
    const tabs = document.querySelectorAll('[role="tab"]');
    
    // Animate out old active indicator
    const oldActive = document.querySelector('[role="tab"][aria-selected="true"]');
    if (oldActive && oldActive !== this) {
      gsap.to(oldActive, {
        duration: 0.2,
        color: 'rgba(255, 255, 255, 0.6)',
        borderBottomColor: 'transparent',
        ease: 'power2.out'
      });
    }

    // Animate in new active indicator
    gsap.to(this, {
      duration: 0.3,
      color: '#4edea3',
      borderBottomColor: '#4edea3',
      ease: 'power2.out'
    });
  });
});
```

#### 3.2 Tab Content Transition Animation
```javascript
// Smooth fade and scale transition between tab panels
function switchTab(tabId) {
  const panels = document.querySelectorAll('[role="tabpanel"]');
  const newPanel = document.getElementById(tabId);

  panels.forEach(panel => {
    if (panel !== newPanel) {
      // Animate out old panel
      gsap.to(panel, {
        duration: 0.3,
        opacity: 0,
        scale: 0.98,
        pointerEvents: 'none',
        ease: 'power2.in'
      });
    }
  });

  // Animate in new panel
  gsap.fromTo(newPanel, 
    {
      opacity: 0,
      scale: 0.98,
      pointerEvents: 'none'
    },
    {
      duration: 0.4,
      opacity: 1,
      scale: 1,
      pointerEvents: 'auto',
      ease: 'power2.out'
    }
  );
}
```

#### 3.3 Nested Content Stagger Animation
```javascript
// Stagger animation for content within each tab
gsap.to('[role="tabpanel"] > *', {
  duration: 0.5,
  opacity: 1,
  y: 0,
  ease: 'power2.out',
  stagger: 0.08,
  scrollTrigger: {
    trigger: '[role="tabpanel"]',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});
```

#### 3.4 Architecture Diagram Entrance
```javascript
// Animate diagram elements (nodes, lines, connections)
const diagramTl = gsap.timeline({
  scrollTrigger: {
    trigger: '[data-tab="architecture"]',
    start: 'top 75%',
    toggleActions: 'play none none reverse'
  }
});

diagramTl
  .from('[data-node]', {
    duration: 0.5,
    scale: 0,
    opacity: 0,
    ease: 'back.out',
    stagger: 0.1
  })
  .from('[data-connection]', {
    duration: 0.8,
    pathLength: 0,
    opacity: 0,
    ease: 'power2.out',
    stagger: 0.15
  }, '-=0.3');
```

---

### 4. TIMELINE ANIMATIONS (experience_career_journey)

#### 4.1 Timeline Line Draw Animation
```javascript
// Animate the vertical timeline line on scroll into view
gsap.to('.timeline-line', {
  duration: 1.2,
  height: '100%',
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.timeline-container',
    start: 'top 60%',
    toggleActions: 'play none none reverse'
  }
});
```

#### 4.2 Milestone Node Entrance
```javascript
// Nodes appear one by one along the timeline
gsap.from('[data-milestone]', {
  duration: 0.5,
  scale: 0,
  opacity: 0,
  ease: 'back.out',
  stagger: {
    amount: 1.5,
    from: 'start'
  },
  scrollTrigger: {
    trigger: '.timeline-container',
    start: 'top 60%',
    toggleActions: 'play none none reverse'
  }
});

// Glow effect on nodes
gsap.to('[data-milestone]', {
  duration: 0.8,
  boxShadow: '0 0 20px rgba(78, 222, 163, 0.4)',
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
  stagger: 0.2
});
```

#### 4.3 Milestone Expand/Collapse Animation
```javascript
// Smooth expand/collapse with height animation
document.querySelectorAll('[data-milestone]').forEach(node => {
  const details = node.querySelector('[data-details]');
  let isExpanded = false;

  node.addEventListener('click', function() {
    isExpanded = !isExpanded;

    if (isExpanded) {
      // Expand animation
      gsap.to(details, {
        duration: 0.4,
        maxHeight: '500px', // Adjust based on content
        opacity: 1,
        paddingTop: '1rem',
        paddingBottom: '1rem',
        ease: 'power2.out',
        overwrite: 'auto'
      });

      // Rotate node indicator
      gsap.to(this.querySelector('.expand-icon'), {
        duration: 0.3,
        rotation: 180,
        ease: 'power2.out'
      });

      // Add node glow
      gsap.to(this, {
        duration: 0.3,
        boxShadow: '0 0 24px rgba(78, 222, 163, 0.3)',
        borderColor: '#4edea3',
        ease: 'power2.out'
      });
    } else {
      // Collapse animation
      gsap.to(details, {
        duration: 0.3,
        maxHeight: '0px',
        opacity: 0,
        paddingTop: '0rem',
        paddingBottom: '0rem',
        ease: 'power2.in',
        overwrite: 'auto'
      });

      // Rotate back
      gsap.to(this.querySelector('.expand-icon'), {
        duration: 0.3,
        rotation: 0,
        ease: 'power2.out'
      });

      // Remove glow
      gsap.to(this, {
        duration: 0.3,
        boxShadow: '0 0 0px rgba(78, 222, 163, 0)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        ease: 'power2.out'
      });
    }
  });
});
```

#### 4.4 Milestone Details Content Animation
```javascript
// Stagger content within expanded milestone
gsap.to('[data-milestone][data-expanded] [data-detail-item]', {
  duration: 0.4,
  opacity: 1,
  x: 0,
  ease: 'power2.out',
  stagger: 0.05
});
```

---

### 5. CONTACT FORM ANIMATIONS (portfolio_terminal_contact)

#### 5.1 Form Input Focus Animation
```javascript
// Smooth glow and border animation on input focus
document.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('focus', () => {
    gsap.to(input, {
      duration: 0.3,
      borderColor: '#4edea3',
      boxShadow: '0 0 12px rgba(78, 222, 163, 0.2)',
      ease: 'power2.out'
    });
  });

  input.addEventListener('blur', () => {
    gsap.to(input, {
      duration: 0.3,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: '0 0 0px rgba(78, 222, 163, 0)',
      ease: 'power2.out'
    });
  });
});
```

#### 5.2 Form Submission Success Animation
```javascript
// Celebrate success with confetti-style animation
function onFormSuccess() {
  const successMessage = document.querySelector('.success-message');

  gsap.timeline()
    .from(successMessage, {
      duration: 0.4,
      opacity: 0,
      scale: 0.8,
      y: -20,
      ease: 'back.out'
    })
    .to(successMessage, {
      duration: 0.5,
      opacity: 1,
      scale: 1,
      delay: 2,
      ease: 'power2.in'
    });

  // Submit button success pulse
  gsap.to('[type="submit"]', {
    duration: 0.2,
    backgroundColor: '#10b981',
    repeat: 2,
    yoyo: true,
    ease: 'sine.inOut'
  });
}
```

#### 5.3 Terminal Output Animation
```javascript
// Animate terminal lines appearing with typewriter effect
function addTerminalOutput(message) {
  const line = document.createElement('div');
  line.textContent = message;
  line.style.opacity = '0';
  
  const terminal = document.querySelector('.terminal-output');
  terminal.appendChild(line);

  // Typewriter effect with character-by-character reveal
  gsap.to(line, {
    duration: 0.5,
    opacity: 1,
    ease: 'power2.out'
  });

  // Scroll terminal to bottom
  gsap.to(terminal, {
    duration: 0.3,
    scrollTop: terminal.scrollHeight,
    ease: 'power1.inOut'
  });
}
```

#### 5.4 Validation Error Animation
```javascript
// Shake animation for invalid fields
function shakeInvalidField(input) {
  gsap.to(input, {
    duration: 0.1,
    x: -5,
    repeat: 4,
    yoyo: true,
    ease: 'power1.inOut',
    onComplete: () => {
      gsap.set(input, { x: 0 });
    }
  });

  // Error border pulse
  gsap.to(input, {
    duration: 0.3,
    borderColor: '#ffb4ab',
    boxShadow: '0 0 12px rgba(255, 180, 171, 0.2)',
    ease: 'power2.out'
  });
}
```

---

### 6. NAVIGATION & SCROLL ANIMATIONS

#### 6.1 Smooth Page Scroll Navigation
```javascript
// Click nav links to smoothly scroll to sections
document.querySelectorAll('nav a[data-path]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const path = link.getAttribute('data-path');
    const section = document.querySelector(`[data-section="${path}"]`);

    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: section.offsetTop - 64, // Adjust for header height
        autoKill: false
      },
      ease: 'power2.inOut'
    });

    // Update active nav state
    document.querySelectorAll('nav a').forEach(a => {
      a.classList.remove('active');
    });
    link.classList.add('active');
  });
});
```

#### 6.2 Scroll Reveal Animations
```javascript
// Fade and slide up on scroll into view
gsap.utils.toArray('[data-scroll-reveal]').forEach(element => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      markers: false,
      toggleActions: 'play none none reverse'
    },
    duration: 0.6,
    opacity: 0,
    y: 40,
    ease: 'power2.out'
  });
});
```

#### 6.3 Header Animation on Scroll
```javascript
// Header shrink/expand on scroll
let lastScrollTop = 0;
const header = document.querySelector('header');

ScrollTrigger.create({
  onUpdate: (self) => {
    const scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      gsap.to(header, {
        duration: 0.3,
        y: -64, // Hide header
        ease: 'power2.out'
      });
    } else {
      // Scrolling up
      gsap.to(header, {
        duration: 0.3,
        y: 0, // Show header
        ease: 'power2.out'
      });
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
});
```

---

### 7. PARALLAX & DEPTH EFFECTS

#### 7.1 Parallax Background Orbs
```javascript
// Background elements move slower than foreground (parallax)
gsap.to('.parallax-slow', {
  y: () => window.innerHeight * 0.3,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom center',
    scrub: 1, // Smooth scrubbing
    markers: false
  }
});
```

#### 7.2 Text Parallax (Hero Headline)
```javascript
// Text moves faster as you scroll (reverse parallax)
gsap.to('h1', {
  y: () => -window.innerHeight * 0.2,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom center',
    scrub: 0.5
  }
});
```

---

## TIMING & EASING PRESETS

Use these GSAP easing functions throughout:

```javascript
// Common easing choices:
'power1.out'    // Fast start, slow finish (button hovers)
'power2.out'    // Smooth, professional default
'power2.inOut'  // Smooth both directions
'back.out'      // Elastic bounce (item entrances)
'elastic.out'   // Strong bounce
'sine.inOut'    // Gentle, wave-like
'circ.out'      // Circular motion
'bounce.out'    // Multiple bounces

// Timing guidelines:
// Quick interactions: 0.2s - 0.3s (button hover, input focus)
// Element entrance: 0.4s - 0.6s (fade in, slide)
// Panel switches: 0.3s - 0.4s (tab content)
// Scroll reveals: 0.6s - 0.8s (as content appears)
// Large animations: 0.8s - 1.2s (hero entrance, timeline)
```

---

## TIMELINE SEQUENCING EXAMPLE

```javascript
// Complex multi-element animation sequence
const masterTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: '.case-study-section',
    start: 'top 70%',
    toggleActions: 'play none none reverse'
  }
});

masterTimeline
  // First: Animate header in
  .from('.case-study-header', {
    duration: 0.5,
    opacity: 0,
    y: 20,
    ease: 'power2.out'
  })
  // Then: Animate image in (overlapping)
  .from('.case-study-image', {
    duration: 0.6,
    opacity: 0,
    scale: 0.95,
    ease: 'power2.out'
  }, '-=0.3') // Start 0.3s before header finishes
  // Finally: Animate text content
  .from('.case-study-text', {
    duration: 0.5,
    opacity: 0,
    x: -20,
    ease: 'power2.out'
  }, '-=0.2');
```

---

## PERFORMANCE OPTIMIZATION

### Best Practices:
```javascript
// 1. Use will-change CSS for animated elements
gsap.set('.animate-me', { 
  willChange: 'transform, opacity' 
});

// 2. Kill animations on exit to prevent memory leaks
ScrollTrigger.getAll().forEach(trigger => trigger.kill());

// 3. Use GPU acceleration (transform, opacity only)
// ❌ Don't animate: left, top, width, height, padding
// ✅ Do animate: transform, opacity, filter

// 4. Batch animations efficiently
gsap.to('.many-elements', {
  duration: 0.5,
  y: 20,
  stagger: 0.05, // Space out animations
  ease: 'power2.out'
});

// 5. Cleanup on page unload
window.addEventListener('beforeunload', () => {
  gsap.killTweensOf('*'); // Kill all animations
  ScrollTrigger.getAll().forEach(t => t.kill());
});
```

---

## TESTING ANIMATIONS

```javascript
// Disable animations for testing (set duration to 0)
gsap.globalTimeline.timeScale(1); // Normal speed
gsap.globalTimeline.timeScale(2); // 2x speed (test faster)
gsap.globalTimeline.timeScale(0.5); // 0.5x speed (watch closely)

// Console logs for debugging
gsap.to(element, {
  duration: 0.5,
  y: 100,
  onStart: () => console.log('Animation started'),
  onComplete: () => console.log('Animation complete')
});
```

---

## INTEGRATION CHECKLIST

Add these to your portfolio implementation:

✅ GSAP library CDN links in HTML head  
✅ ScrollTrigger and ScrollToPlugin registered  
✅ Hero section entrance animation  
✅ Project card stagger and hover effects  
✅ Filter pill toggle animations  
✅ Tab content transition animations  
✅ Timeline line draw and node animations  
✅ Milestone expand/collapse with details stagger  
✅ Form input focus and validation animations  
✅ Success/error feedback animations  
✅ Smooth scroll navigation  
✅ Scroll reveal on all sections  
✅ Parallax background effects  
✅ Performance optimization (will-change, GPU acceleration)  
✅ Memory cleanup on unload  

---

## SUMMARY

With GSAP integrated, your portfolio will have:
- ✨ **Polished, professional animations** at 60fps
- 🎯 **Precise control** over timing and sequencing
- 📱 **Smooth interactions** on all devices
- ⚡ **Superior performance** vs CSS animations
- 🎨 **Coordinated visual effects** that guide user attention
- 🌊 **Fluid scroll-based reveals** as content enters viewport

The portfolio will feel **premium and production-ready** with these animations.

---

**When using Claude Opus 4.6, include this prompt alongside the base portfolio prompt to get full GSAP integration.**
