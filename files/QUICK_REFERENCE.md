# Portfolio Prototype - Quick Reference Guide

## 📋 What You're Building
A fully functional, interactive Alex Rivera portfolio with 5 interconnected sections and smooth navigation.

## 🎨 Design System (Terminal Obsidian)
```
Primary:    #4edea3 (Emerald)
Secondary:  #4cd7f6 (Cyan)
Tertiary:   #c0c1ff (Indigo)
Dark Base:  #0f131c (Obsidian)

Fonts:
- Headlines: Plus Jakarta Sans (700-800 weight)
- Body:      Inter (400 weight)
- Code:      JetBrains Mono (monospace)
```

## 📁 5 Portfolio Sections

| Section | File | Lines | Key Features |
|---------|------|-------|--------------|
| **Hero/Overview** | `engineering_overview/code.html` | 584 | Status badges, CTAs, terminal window |
| **Projects Grid** | `projects_system_architecture/code.html` | 765 | **Filterable tech stack pills** |
| **Case Study** | `full_stack_case_study_deep_dive/code.html` | 652 | **Tabbed interface** (architecture/DB/perf) |
| **Career Timeline** | `experience_career_journey/code.html` | 517 | **Expandable milestone nodes** |
| **Contact Terminal** | `portfolio_terminal_contact/code.html` | 537 | **Terminal-style form** with validation |

---

## 🔧 Critical Implementation Tasks (Priority Order)

### Phase 1: Navigation Foundation
- [ ] Header nav links work (`[data-path="..."]`)
- [ ] Smooth scroll to sections
- [ ] Active nav state highlights
- [ ] Mobile hamburger menu (if applicable)

### Phase 2: Project Filters (projects_system_architecture)
- [ ] Tech stack pills clickable → filter projects
- [ ] Multi-select filtering support
- [ ] Active pill styling (emerald + glow)
- [ ] Show/hide project cards dynamically

### Phase 3: Case Study Tabs (full_stack_case_study_deep_dive)
- [ ] Tab buttons click → switch content
- [ ] Smooth fade/slide transitions
- [ ] Only 1 tab visible at a time
- [ ] Active tab header styling

### Phase 4: Timeline Expansion (experience_career_journey)
- [ ] Milestone nodes clickable
- [ ] Expand/collapse with animation
- [ ] Show/hide detailed metrics
- [ ] Mobile adaptation (accordion)

### Phase 5: Contact Form (portfolio_terminal_contact)
- [ ] Form validation (email, required fields)
- [ ] Terminal-style submission feedback
- [ ] Copy-to-clipboard for code blocks
- [ ] Success/error messages as terminal output

### Phase 6: Polish
- [ ] Smooth scroll animations
- [ ] Hover states on all interactive elements
- [ ] Responsive mobile/tablet/desktop
- [ ] Zero console errors
- [ ] Keyboard navigation (Tab, Enter)

---

## 💻 JavaScript Implementation Patterns

### Click Handlers
```javascript
// Example: Filter pills
document.querySelectorAll('[data-filter]').forEach(pill => {
  pill.addEventListener('click', () => {
    // Toggle active state
    pill.classList.toggle('active');
    // Filter projects
    filterProjects();
  });
});
```

### Tab Switching
```javascript
// Example: Case study tabs
document.querySelectorAll('[role="tab"]').forEach(tab => {
  tab.addEventListener('click', () => {
    // Hide all panels
    document.querySelectorAll('[role="tabpanel"]').forEach(p => p.hidden = true);
    // Show active panel
    document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
  });
});
```

### Timeline Expand/Collapse
```javascript
// Example: Timeline nodes
document.querySelectorAll('[data-milestone]').forEach(node => {
  node.addEventListener('click', () => {
    const details = node.querySelector('[data-details]');
    details.classList.toggle('expanded');
    // Animate height
    animateHeight(details);
  });
});
```

### Form Validation
```javascript
// Example: Contact form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm()) {
    outputTerminalMessage('✓ Message sent successfully');
    form.reset();
  } else {
    outputTerminalMessage('✗ Please fill all fields');
  }
});
```

---

## 🎬 Animation Guidelines

### Transitions
```css
/* Smooth color/opacity transitions */
transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;

/* Smooth height transitions for expand/collapse */
max-height: 0;
overflow: hidden;
transition: max-height 0.4s ease;

max-height: 500px; /* When expanded */
```

### Hover States
```css
/* Filter pills */
.pill:hover {
  border-color: rgba(78, 222, 163, 0.5);
  background-color: rgba(78, 222, 163, 0.05);
}

/* Project cards */
.card:hover {
  transform: scale(1.02);
  box-shadow: 0 0 24px rgba(78, 222, 163, 0.15);
}
```

---

## ✅ Testing Checklist

- [ ] All nav links navigate to correct sections
- [ ] Project filter pills toggle active/inactive state
- [ ] Filtered projects show/hide correctly
- [ ] Case study tabs switch content smoothly
- [ ] Timeline nodes expand/collapse with animation
- [ ] Contact form validates email field
- [ ] Contact form validates required fields
- [ ] Copy-to-clipboard works (if present)
- [ ] Mobile layout readable and usable
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] No console errors
- [ ] Smooth animations at 60fps

---

## 🚀 How to Use This Prompt

1. **Copy the full prompt** from `PORTFOLIO_PROTOTYPE_PROMPT.md`
2. **Paste it into Claude Opus 4.6** along with your 5 HTML files
3. **Tell Claude:** "Here are my portfolio HTML files. Please use the attached prompt to create a fully functional interactive prototype."
4. **Claude will output:** Updated HTML file(s) with complete JavaScript implementation

---

## 📝 Customization Tips

If you want to adjust the prompt:
- Add specific color tweaks or brand guidelines
- Mention additional libraries (GSAP for animations, SortableJS for drag-drop, etc.)
- Add portfolio-specific content details
- Request additional features (analytics, animations, etc.)

---

## 🎯 Key Success Signals

✅ You can click through all 5 sections
✅ Filters actually filter projects
✅ Tabs switch smoothly
✅ Timeline expands with animation
✅ Contact form validates and responds
✅ Everything works on mobile
✅ No errors in browser console
✅ Smooth, polished user experience

---

**Happy building! 🚀**
