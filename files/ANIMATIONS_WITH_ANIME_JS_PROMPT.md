# Portfolio Prototype with anime.js Animations
## Lightweight Animation Implementation for Claude Opus 4.6

---

## OVERVIEW

This prompt augments the base portfolio prototype development with **smooth, efficient animations** using **anime.js**. anime.js is chosen for its:
- **Lightweight** - Only 16KB minified (vs GSAP's 60KB+)
- **Intuitive API** - Simple chaining and sequencing
- **CSS-agnostic** - Animates DOM attributes, CSS, SVG, JS objects
- **Staggering built-in** - Easy multi-element animations
- **No dependencies** - Pure JavaScript library
- **Great for web** - Perfect performance for portfolio sites

**Choose anime.js if you want:**
- Lightweight bundle size
- Simple, readable animation code
- Minimal learning curve
- No bloated features

---

## ANIME.JS LIBRARY SETUP

Add anime.js to the HTML head before other scripts:

```html
<!-- Anime.js Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
```

**OR include via NPM if using a build process:**
```bash
npm install animejs
import anime from 'animejs';
```

---

## ANIMATION CATEGORIES & IMPLEMENTATION

### 1. HERO SECTION ANIMATIONS (engineering_overview)

#### 1.1 Page Load Sequence
```javascript
// Staggered entrance animation on page load
anime.timeline({
  loop: false
})
  .add({
    targets: 'h1',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800,
    easing: 'easeOutQuad'
  })
  .add({
    targets: 'p',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    easing: 'easeOutQuad'
  }, '-=400') // Start 400ms before previous animation ends
  .add({
    targets: '.cta-button',
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: 500,
    easing: 'easeOutElastic(1, .6)',
    delay: anime.stagger(100) // Stagger each button by 100ms
  }, '-=300');
```

#### 1.2 Terminal Window Animation
```javascript
// Terminal lines appear with staggered animation
anime.timeline({
  loop: false,
  delay: 800 // Wait for hero animation to finish
})
  .add({
    targets: '.terminal-output div',
    opacity: [0, 1],
    translateX: [-20, 0],
    duration: 500,
    easing: 'easeOutQuad',
    delay: anime.stagger(150) // 150ms between each line
  });
```

#### 1.3 Status Badge Pulse Animation
```javascript
// Continuous pulsing glow for status badge
anime.timeline({
  loop: true
})
  .add({
    targets: '.status-badge .ping',
    scale: [1, 1.5],
    opacity: [1, 0],
    duration: 2000,
    easing: 'easeOutQuad'
  })
  .add({
    targets: '.status-badge .dot',
    boxShadow: [
      '0 0 0px rgba(78, 222, 163, 0.4)',
      '0 0 20px rgba(78, 222, 163, 0.8)',
      '0 0 0px rgba(78, 222, 163, 0.4)'
    ],
    duration: 600,
    easing: 'easeInOutSine'
  }, 0); // Start at same time as ping
```

#### 1.4 Ambient Background Orbs Animation
```javascript
// Slow, floating background orbs
anime({
  targets: '.bg-glow-primary',
  translateX: 50,
  translateY: -50,
  duration: 8000,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine'
});

anime({
  targets: '.bg-glow-secondary',
  translateX: -60,
  translateY: 40,
  duration: 10000,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine',
  delay: 2000
});
```

#### 1.5 CTA Button Hover Animations
```javascript
// Interactive button hover animations
document.querySelectorAll('.cta-button').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    anime({
      targets: btn,
      scale: 1.05,
      boxShadow: '0 0 24px rgba(78, 222, 163, 0.5)',
      duration: 300,
      easing: 'easeOutQuad'
    });
  });

  btn.addEventListener('mouseleave', () => {
    anime({
      targets: btn,
      scale: 1,
      boxShadow: '0 0 12px rgba(78, 222, 163, 0.25)',
      duration: 300,
      easing: 'easeOutQuad'
    });
  });
});
```

---

### 2. PROJECT GRID ANIMATIONS (projects_system_architecture)

#### 2.1 Filter Pill Toggle Animation
```javascript
// Animate pill state change with color transition
document.querySelectorAll('[data-filter]').forEach(pill => {
  pill.addEventListener('click', function() {
    const isActive = this.classList.toggle('active');

    anime({
      targets: this,
      borderColor: isActive 
        ? 'rgba(78, 222, 163, 1)' 
        : 'rgba(255, 255, 255, 0.08)',
      backgroundColor: isActive
        ? 'rgba(78, 222, 163, 0.12)'
        : 'rgba(255, 255, 255, 0.04)',
      duration: 300,
      easing: 'easeOutQuad'
    });

    // Pulse animation for active state
    if (isActive) {
      anime({
        targets: this,
        scale: [0.95, 1],
        duration: 400,
        easing: 'easeOutElastic(1, .6)'
      });
    }
  });
});
```

#### 2.2 Project Card Entry Animation
```javascript
// Cards fade and slide in with stagger
anime({
  targets: '.project-card',
  opacity: [0, 1],
  translateY: [30, 0],
  duration: 600,
  easing: 'easeOutQuad',
  delay: anime.stagger(80, { start: 0 })
});
```

#### 2.3 Project Card Hover Animation
```javascript
// Smooth card lift and glow on hover
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    anime({
      targets: card,
      translateY: -8,
      boxShadow: '0 0 24px rgba(78, 222, 163, 0.2)',
      borderColor: 'rgba(78, 222, 163, 0.5)',
      duration: 300,
      easing: 'easeOutQuad'
    });
  });

  card.addEventListener('mouseleave', () => {
    anime({
      targets: card,
      translateY: 0,
      boxShadow: '0 0 0px rgba(78, 222, 163, 0)',
      borderColor: 'rgba(255, 255, 255, 0.08)',
      duration: 300,
      easing: 'easeOutQuad'
    });
  });
});
```

#### 2.4 Filter Animation - Show/Hide Cards
```javascript
// Smooth show/hide animation when filtering
function filterProjects() {
  document.querySelectorAll('.project-card').forEach((card, index) => {
    const isVisible = shouldShowCard(card); // Your filter logic

    anime({
      targets: card,
      opacity: isVisible ? 1 : 0.2,
      pointerEvents: isVisible ? 'auto' : 'none',
      duration: isVisible ? 400 : 300,
      easing: 'easeOutQuad',
      delay: isVisible ? anime.stagger(50) : 0
    });
  });
}
```

#### 2.5 Tech Stack Counter Animation
```javascript
// Animate count of active filters with scale pulse
function updateFilterCount() {
  const activeCount = document.querySelectorAll('[data-filter].active').length;
  const counter = document.querySelector('.filter-count');

  anime.timeline()
    .add({
      targets: counter,
      scale: 1.2,
      duration: 400,
      easing: 'easeOutElastic(1, .7)'
    })
    .add({
      targets: counter,
      scale: 1,
      duration: 200,
      easing: 'easeOutQuad'
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
    // Animate out previous active tab
    const oldActive = document.querySelector('[role="tab"][aria-selected="true"]');
    if (oldActive && oldActive !== this) {
      anime({
        targets: oldActive,
        color: 'rgba(255, 255, 255, 0.6)',
        borderBottomColor: 'rgba(255, 255, 255, 0)',
        duration: 200,
        easing: 'easeOutQuad'
      });
    }

    // Animate in new active tab
    anime({
      targets: this,
      color: '#4edea3',
      borderBottomColor: '#4edea3',
      duration: 300,
      easing: 'easeOutQuad'
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

  // Hide all panels
  anime({
    targets: panels,
    opacity: 0,
    scale: 0.98,
    pointerEvents: 'none',
    duration: 300,
    easing: 'easeInQuad'
  });

  // Show new panel with staggered children
  anime.timeline()
    .add({
      targets: newPanel,
      opacity: [0, 1],
      scale: [0.98, 1],
      pointerEvents: 'auto',
      duration: 400,
      easing: 'easeOutQuad'
    })
    .add({
      targets: newPanel.querySelectorAll('> *'),
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 500,
      easing: 'easeOutQuad',
      delay: anime.stagger(50)
    }, '-=200'); // Start partway through fade-in
}
```

#### 3.3 Tab Content Stagger Animation
```javascript
// Stagger content within each tab
anime({
  targets: '[role="tabpanel"] > *',
  opacity: [0, 1],
  translateY: [0, 0],
  duration: 500,
  easing: 'easeOutQuad',
  delay: anime.stagger(80)
});
```

#### 3.4 Architecture Diagram Entrance
```javascript
// Animate diagram elements (nodes, lines, connections)
anime.timeline()
  .add({
    targets: '[data-node]',
    scale: [0, 1],
    opacity: [0, 1],
    duration: 500,
    easing: 'easeOutElastic(1, .6)',
    delay: anime.stagger(100)
  })
  .add({
    targets: '[data-connection]',
    opacity: [0, 1],
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 800,
    easing: 'easeOutQuad',
    delay: anime.stagger(150)
  }, '-=300'); // Overlap with nodes
```

---

### 4. TIMELINE ANIMATIONS (experience_career_journey)

#### 4.1 Timeline Line Draw Animation
```javascript
// Animate the vertical timeline line on page load
anime({
  targets: '.timeline-line',
  height: ['0%', '100%'],
  duration: 1200,
  easing: 'easeInOutQuad',
  delay: 300
});
```

#### 4.2 Milestone Node Entrance
```javascript
// Nodes appear one by one along the timeline
anime({
  targets: '[data-milestone]',
  scale: [0, 1],
  opacity: [0, 1],
  duration: 500,
  easing: 'easeOutElastic(1, .6)',
  delay: anime.stagger(150, { start: 600 })
});

// Continuous glow effect on nodes
anime.timeline({
  loop: true
})
  .add({
    targets: '[data-milestone]',
    boxShadow: [
      '0 0 0px rgba(78, 222, 163, 0)',
      '0 0 20px rgba(78, 222, 163, 0.6)',
      '0 0 0px rgba(78, 222, 163, 0)'
    ],
    duration: 2000,
    easing: 'easeInOutSine',
    delay: anime.stagger(200)
  });
```

#### 4.3 Milestone Expand/Collapse Animation
```javascript
// Smooth expand/collapse with height animation
document.querySelectorAll('[data-milestone]').forEach(node => {
  const details = node.querySelector('[data-details]');
  const expandIcon = node.querySelector('.expand-icon');
  let isExpanded = false;
  let expandAnimation = null;

  node.addEventListener('click', function() {
    // Kill previous animation to avoid conflicts
    if (expandAnimation) expandAnimation.pause();

    isExpanded = !isExpanded;

    expandAnimation = anime.timeline()
      .add({
        targets: details,
        maxHeight: [isExpanded ? 0 : 500, isExpanded ? 500 : 0],
        opacity: [isExpanded ? 0 : 1, isExpanded ? 1 : 0],
        paddingTop: [isExpanded ? 0 : 16, isExpanded ? 16 : 0],
        paddingBottom: [isExpanded ? 0 : 16, isExpanded ? 16 : 0],
        duration: 400,
        easing: 'easeInOutQuad'
      }, 0)
      .add({
        targets: expandIcon,
        rotate: isExpanded ? 180 : 0,
        duration: 300,
        easing: 'easeInOutQuad'
      }, 0) // Start at same time
      .add({
        targets: node,
        boxShadow: isExpanded 
          ? '0 0 24px rgba(78, 222, 163, 0.3)'
          : '0 0 0px rgba(78, 222, 163, 0)',
        borderColor: isExpanded 
          ? '#4edea3'
          : 'rgba(255, 255, 255, 0.08)',
        duration: 300,
        easing: 'easeOutQuad'
      }, 0);
  });
});
```

#### 4.4 Milestone Details Content Animation
```javascript
// Stagger content within expanded milestone
anime({
  targets: '[data-milestone][data-expanded] [data-detail-item]',
  opacity: [0, 1],
  translateX: [-20, 0],
  duration: 400,
  easing: 'easeOutQuad',
  delay: anime.stagger(50)
});
```

---

### 5. CONTACT FORM ANIMATIONS (portfolio_terminal_contact)

#### 5.1 Form Input Focus Animation
```javascript
// Smooth glow and border animation on input focus
document.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('focus', () => {
    anime({
      targets: input,
      borderColor: '#4edea3',
      boxShadow: '0 0 12px rgba(78, 222, 163, 0.2)',
      duration: 300,
      easing: 'easeOutQuad'
    });

    // Add focused class for CSS pseudo-elements if needed
    input.classList.add('focused');
  });

  input.addEventListener('blur', () => {
    anime({
      targets: input,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: '0 0 0px rgba(78, 222, 163, 0)',
      duration: 300,
      easing: 'easeOutQuad'
    });

    input.classList.remove('focused');
  });
});
```

#### 5.2 Form Submission Success Animation
```javascript
// Success message entrance with scale and fade
function onFormSuccess() {
  const successMessage = document.querySelector('.success-message');
  const submitBtn = document.querySelector('[type="submit"]');

  anime.timeline()
    .add({
      targets: successMessage,
      opacity: [0, 1],
      scale: [0.8, 1],
      translateY: [-20, 0],
      duration: 400,
      easing: 'easeOutElastic(1, .7)'
    })
    .add({
      targets: submitBtn,
      backgroundColor: '#10b981',
      duration: 200,
      easing: 'easeOutQuad'
    }, 0) // Button color change at same time
    .add({
      targets: submitBtn,
      backgroundColor: '#4edea3',
      duration: 200,
      easing: 'easeOutQuad'
    }) // Flash back to primary
    .add({
      targets: successMessage,
      opacity: [1, 0],
      scale: [1, 0.95],
      translateY: [0, -20],
      duration: 400,
      easing: 'easeInQuad',
      delay: 2000
    });
}
```

#### 5.3 Terminal Output Animation
```javascript
// Animate terminal output lines with typewriter effect
function addTerminalOutput(message) {
  const line = document.createElement('div');
  line.textContent = message;
  line.style.opacity = '0';
  
  const terminal = document.querySelector('.terminal-output');
  terminal.appendChild(line);

  // Character-by-character typing effect
  let displayText = '';
  const charDelay = 30; // ms per character
  
  anime({
    targets: line,
    opacity: [0, 1],
    duration: 300,
    easing: 'easeOutQuad'
  });

  // Type out characters
  for (let i = 0; i < message.length; i++) {
    setTimeout(() => {
      displayText += message[i];
      line.textContent = displayText;
    }, i * charDelay);
  }

  // Scroll terminal to bottom
  anime({
    targets: terminal,
    scrollTop: terminal.scrollHeight,
    duration: 300,
    easing: 'easeInOutQuad'
  });
}
```

#### 5.4 Validation Error Animation
```javascript
// Shake animation for invalid fields
function shakeInvalidField(input) {
  anime({
    targets: input,
    translateX: [-5, 5, -5, 5, -5, 0],
    duration: 400,
    easing: 'easeInOutQuad'
  });

  // Error border glow
  anime({
    targets: input,
    borderColor: '#ffb4ab',
    boxShadow: '0 0 12px rgba(255, 180, 171, 0.2)',
    duration: 300,
    easing: 'easeOutQuad'
  });

  // Fade back after delay
  anime({
    targets: input,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 0 0px rgba(255, 180, 171, 0)',
    duration: 300,
    easing: 'easeOutQuad',
    delay: 2000
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

    anime({
      targets: window,
      scrollTop: section.offsetTop - 64, // Adjust for header height
      duration: 1000,
      easing: 'easeInOutQuad'
    });

    // Update active nav state
    document.querySelectorAll('nav a').forEach(a => {
      a.classList.remove('active');
    });
    link.classList.add('active');

    // Animate section title
    anime({
      targets: section.querySelector('h2'),
      opacity: [0.5, 1],
      translateY: [10, 0],
      duration: 400,
      easing: 'easeOutQuad'
    });
  });
});
```

#### 6.2 Scroll Reveal Animations (with Intersection Observer)
```javascript
// Fade and slide up on scroll into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
      entry.target.classList.add('revealed');
      
      anime({
        targets: entry.target,
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 600,
        easing: 'easeOutQuad'
      });
    }
  });
}, { threshold: 0.1 });

// Observe all elements with data-scroll-reveal
document.querySelectorAll('[data-scroll-reveal]').forEach(el => {
  observer.observe(el);
});
```

#### 6.3 Header Animation on Scroll
```javascript
// Header shrink/expand on scroll (show/hide)
let lastScrollTop = 0;
const header = document.querySelector('header');
let headerAnimation = null;

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down - hide header
    if (headerAnimation) headerAnimation.pause();
    headerAnimation = anime({
      targets: header,
      translateY: -64,
      duration: 300,
      easing: 'easeOutQuad'
    });
  } else {
    // Scrolling up - show header
    if (headerAnimation) headerAnimation.pause();
    headerAnimation = anime({
      targets: header,
      translateY: 0,
      duration: 300,
      easing: 'easeOutQuad'
    });
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);
```

---

### 7. PARALLAX & DEPTH EFFECTS

#### 7.1 Simple Parallax Background Orbs
```javascript
// Background elements move slower than foreground
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  anime.set('.parallax-slow', {
    translateY: scrollY * 0.5 // 50% of scroll speed
  });

  anime.set('.parallax-medium', {
    translateY: scrollY * 0.3 // 30% of scroll speed
  });
});
```

#### 7.2 Text Parallax (Hero Headline)
```javascript
// Text moves faster as you scroll (reverse parallax)
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  anime.set('h1', {
    translateY: -scrollY * 0.2 // Moves opposite to scroll
  });
});
```

---

## EASING FUNCTIONS CHEAT SHEET

Use these anime.js easing functions:

```javascript
// Common easing presets:
'easeOutQuad'          // Fast start, slow finish (default)
'easeInOutQuad'        // Smooth both directions
'easeOutElastic(1,.6)' // Elastic bounce
'easeOutBounce'        // Ball bounce
'easeInOutSine'        // Wave-like, gentle
'easeOutQuart'         // Strong ease out
'easeInOutExpo'        // Exponential curve
'easeOutCirc'          // Circular ease
'linear'               // No easing, constant speed

// Timing guidelines:
// Quick interactions: 200ms - 300ms (hover, focus)
// Element entrance: 400ms - 600ms (fade in, slide)
// Panel switches: 300ms - 400ms (tab content)
// Scroll reveals: 600ms - 800ms (on-scroll animations)
// Large animations: 800ms - 1200ms (hero, timeline)
```

---

## TIMELINE SEQUENCING EXAMPLE

```javascript
// Complex multi-element animation sequence with anime.js
anime.timeline()
  // First: Animate header in
  .add({
    targets: '.case-study-header',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 500,
    easing: 'easeOutQuad'
  })
  // Then: Animate image in (overlapping by 300ms)
  .add({
    targets: '.case-study-image',
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: 600,
    easing: 'easeOutQuad'
  }, '-=300') // Start 300ms before header finishes
  // Finally: Animate text content with stagger
  .add({
    targets: '.case-study-text',
    opacity: [0, 1],
    translateX: [-20, 0],
    duration: 500,
    easing: 'easeOutQuad',
    delay: anime.stagger(50)
  }, '-=200');
```

---

## PERFORMANCE OPTIMIZATION

### Best Practices with anime.js:

```javascript
// 1. Pause animations when not visible (save CPU)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    anime.pauseAll();
  } else {
    anime.resumeAll();
  }
});

// 2. Use Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Only play animation when visible
      anime({
        targets: entry.target,
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad'
      });
    }
  });
});

// 3. Animate only CSS properties that don't trigger reflow
// ✅ Do animate: transform, opacity, filter
// ❌ Don't animate: left, top, width, height, padding

// 4. Clean up on page unload
window.addEventListener('beforeunload', () => {
  anime.pauseAll();
  anime.set('*', { willChange: 'auto' });
});

// 5. Use will-change for animated elements
anime.set('.animate-me', { willChange: 'transform, opacity' });
```

---

## WORKING WITH TRANSFORM OBJECTS

anime.js can animate any object properties:

```javascript
// Animate custom JS object values (for counters, progress, etc.)
const counter = { value: 0 };

anime({
  targets: counter,
  value: 100,
  round: 1, // Round to nearest integer
  duration: 2000,
  easing: 'easeInOutQuad',
  update: () => {
    document.querySelector('.counter').textContent = counter.value;
  }
});
```

---

## DEBUGGING ANIMATIONS

```javascript
// Speed up all animations for debugging
anime.defaults.duration = 300; // Override default duration

// Pause/resume animations
const animation = anime({...});
animation.pause();
setTimeout(() => animation.play(), 2000);

// Check animation status
console.log(animation.progress); // 0 to 1
console.log(animation.duration); // Total duration in ms
console.log(animation.progress > 0.5); // Half done?

// Log when animations complete
anime({
  targets: element,
  opacity: 1,
  complete: function() {
    console.log('Animation finished!');
  }
});
```

---

## COMPARISON: anime.js vs GSAP vs CSS

| Feature | anime.js | GSAP | CSS |
|---------|----------|------|-----|
| Bundle Size | 16KB | 60KB+ | 0KB |
| Scroll Animations | Manual | ScrollTrigger | CSS scroll-animation |
| SVG Animations | ✅ Built-in | ✅ Built-in | Limited |
| Morph Plugin | ❌ No | ✅ Yes | ❌ No |
| Learning Curve | Easy | Moderate | Easy (simpler) |
| Performance | Excellent | Excellent | Native (best) |
| Staggering | Simple | Advanced | CSS delays only |
| Community | Good | Excellent | Largest |

**For portfolios: anime.js is the sweet spot** - lightweight, powerful, and perfect for interactive animations.

---

## INTEGRATION CHECKLIST

Add these to your portfolio implementation:

✅ anime.js library CDN link in HTML head  
✅ Hero section entrance animation (staggered)  
✅ Terminal window staggered line animation  
✅ Status badge pulse effect  
✅ Background orbs floating animation  
✅ Project card stagger and hover effects  
✅ Filter pill toggle animations  
✅ Project card show/hide filter animation  
✅ Tab content transition animations  
✅ Tab header active state animation  
✅ Diagram element entrance (nodes + lines)  
✅ Timeline line draw animation  
✅ Milestone node entrance animation  
✅ Milestone expand/collapse with details stagger  
✅ Form input focus/blur animations  
✅ Success message entrance animation  
✅ Terminal output typewriter effect  
✅ Error field shake animation  
✅ Smooth scroll navigation  
✅ Scroll reveal animations (Intersection Observer)  
✅ Header show/hide on scroll  
✅ Parallax background effects  
✅ Memory cleanup (pauseAll on hide)  

---

## SUMMARY

With anime.js integrated, your portfolio will have:
- ✨ **Lightweight animations** at 60fps
- 🎯 **Simple, readable code** that's easy to maintain
- 📱 **Smooth interactions** on all devices
- ⚡ **Fast performance** with minimal bundle bloat
- 🎨 **Coordinated visual effects** that guide user attention
- 🌊 **Smooth scroll-based reveals** as content enters viewport

The portfolio will feel **polished and professional** without heavy dependencies.

---

**When using Claude Opus 4.6, include this prompt alongside the base portfolio prompt to get full anime.js integration.**
