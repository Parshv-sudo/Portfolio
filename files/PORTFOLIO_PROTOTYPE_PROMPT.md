# AI Agent Prompt: Portfolio Prototype Development
## For Claude Opus 4.6

---

## OBJECTIVE

Convert the static HTML portfolio UI for Alex Rivera (Senior Staff Engineer) into a **fully functional, interactive working prototype** with all JavaScript functionality, dynamic behaviors, animations, and state management implemented. The portfolio consists of 5 interconnected page sections that should work seamlessly together.

---

## PROJECT OVERVIEW

**Portfolio Structure:**
1. **engineering_overview** - Hero landing page with status indicators and platform intro
2. **projects_system_architecture** - Interactive project grid and architecture showcase
3. **full_stack_case_study_deep_dive** - Tabbed technical breakdown with visuals and specs
4. **experience_career_journey** - Interactive timeline with career milestones
5. **terminal_contact** - Terminal-style contact form and CLI interface

**Design System:** Terminal Obsidian (Dark Mode, Glassmorphic)
- Primary Color: Emerald (#4edea3 / #10b981)
- Secondary Color: Electric Cyan (#4cd7f6)
- Tertiary Color: Deep Indigo (#c0c1ff)
- Base: Deep Obsidian (#0f131c)
- Fonts: Plus Jakarta Sans (Headlines), Inter (Body), JetBrains Mono (Code/Terminal)

---

## KEY FUNCTIONALITY TO IMPLEMENT

### 1. **Navigation System** (Cross-Page)
- Implement smooth page/section transitions using the navigation bar in the header
- Each nav link (`data-path="overview"`, `data-path="projects"`, etc.) should scroll to or load the corresponding section
- Active navigation state should highlight the current page/section
- Mobile hamburger menu (if not already implemented)
- Smooth scroll behavior, not hard jumps

### 2. **Interactive Project Grid** (projects_system_architecture)
- Make tech stack filter pills (`label-sm` capsules) **clickable and functional**
  - Click to filter projects by tech stack
  - Active state: emerald border + background + glowing dot
  - Inactive state: faded appearance
- Project cards should be filterable and show/hide based on selected technologies
- Add hover animations: subtle scale, border color change to primary
- Maintain glassmorphic depth illusion with smooth transitions

### 3. **Tabbed Interface** (full_stack_case_study_deep_dive)
- Implement tab switching for:
  - System Topology / Architecture Diagram
  - Database / Schema Design
  - Performance Benchmarks / Metrics
- Only one tab content visible at a time
- Tab headers should show active state (emerald color + border)
- Smooth fade/slide transitions between tabs (no jarring pop-ins)

### 4. **Interactive Timeline** (experience_career_journey)
- Vertical timeline with clickable milestone nodes
- Each milestone node should expand/collapse to show detailed metrics and achievements
- Smooth animations when expanding/collapsing
- Timeline line should flow smoothly, nodes should glow on hover
- Mobile: convert to horizontal scroll or accordion if needed

### 5. **Terminal Contact Form** (terminal_contact)
- Implement terminal-style CLI interaction:
  - Text input fields that appear as terminal commands
  - Form submission via "send" command (simulated)
  - Success/error feedback as terminal output
  - Typing cursor animation
- Form validation:
  - Email format validation
  - Required fields check
  - Show errors in terminal output format
- Add "copy to clipboard" functionality for any code blocks

### 6. **Smooth Scroll & Animations**
- Implement smooth scroll-to behavior when clicking internal links
- Add subtle scroll reveal animations for sections (fade-in, slide-up on scroll into view)
- Keep animations performant: use CSS transforms + transitions where possible
- Parallax or subtle depth effects on hero sections
- Hover states on all interactive elements with smooth transitions

### 7. **Code Block Interactions** (if present)
- Copy-to-clipboard button on code blocks
- Toast/notification feedback: "Copied to clipboard"
- Syntax highlighting should work properly
- Line numbers should be readable and aligned

### 8. **Responsive Behavior**
- Test and ensure desktop (1024px+), tablet (768px-1023px), and mobile (<768px) layouts work
- Mobile: hamburger menu in header, stacked layouts, horizontal scroll for tech stacks if needed
- Touch interactions should be smooth and not require hover states

### 9. **State Management**
- Track which tab is active in case study
- Remember which tech stack filters are selected (optional: use localStorage)
- Track current page/section in navigation
- Maintain smooth transitions when state changes

### 10. **Performance & Accessibility**
- Lazy load images where possible
- Ensure keyboard navigation works (Tab, Enter keys)
- Add ARIA labels to interactive elements
- Icon buttons should have descriptive titles
- Test with keyboard-only navigation

---

## IMPLEMENTATION REQUIREMENTS

### Code Quality
- Write **clean, semantic JavaScript** (ES6+)
- Use vanilla JavaScript or minimal dependencies (avoid over-engineering)
- Add comments for complex logic and state transitions
- Organize code into logical functions/modules
- No console errors or warnings

### Styling & Animations
- Respect the existing Tailwind CSS configuration (already loaded)
- Use Tailwind classes for responsive design (already configured in HTML)
- Animations should use CSS transitions + JavaScript triggers
- Avoid heavy animations that tank performance on older devices
- Test on mobile devices for jank/lag

### Testing Checklist
- [ ] All nav links work and navigate correctly
- [ ] Project filters work, show/hide cards appropriately
- [ ] Case study tabs switch smoothly without content overlap
- [ ] Timeline milestones expand/collapse with animations
- [ ] Contact form validates and submits feedback
- [ ] All interactive elements have hover/active states
- [ ] Mobile layout is usable (no broken layouts, text readable)
- [ ] Keyboard navigation works (Tab through inputs/buttons, Enter to activate)
- [ ] Copy-to-clipboard works (if applicable)
- [ ] Smooth scrolling between sections works
- [ ] No console errors

---

## SPECIFIC SECTIONS BREAKDOWN

### **engineering_overview/code.html** (584 lines)
**Current Status:** Static hero with status badges, terminal window, hero text, CTAs
**Needed Functionality:**
- CTA buttons should scroll smoothly to target sections (#projects, #featured-study, #cv)
- Status badge animations (pulsing ping effect already in CSS, just verify it works)
- Terminal window should show live telemetry (optional: simulate data updates)
- Optional: Add scroll animations for parallax depth

### **projects_system_architecture/code.html** (765 lines)
**Current Status:** Project card grid with tech stack filter pills
**Needed Functionality:**
- **[CRITICAL]** Tech stack pill click handlers for filtering
- Project cards show/hide based on active filters
- Multi-select filtering (allow multiple techs selected at once)
- "Show all projects" / "Clear filters" button
- Card hover animations (scale, border glow)
- Optional: Sort/pagination if many projects

### **full_stack_case_study_deep_dive/code.html** (652 lines)
**Current Status:** Case study card with tab headers (likely multiple tab buttons)
**Needed Functionality:**
- **[CRITICAL]** Tab click handlers + content switching
- Smooth fade/slide transitions between tab panels
- Only active tab content visible at a time
- Active tab header styling (border + color change)
- If tabs are nested in multiple case studies, ensure each manages its own state independently

### **experience_career_journey/code.html** (517 lines)
**Current Status:** Career timeline with milestone nodes
**Needed Functionality:**
- **[CRITICAL]** Click handlers on timeline nodes
- Expand/collapse milestone details (show/hide metrics and achievements)
- Smooth animation when expanding (height transition + fade)
- Active node highlighting
- Timeline should work on mobile (consider accordion or horizontal scroll)

### **portfolio_terminal_contact/code.html** (537 lines)
**Current Status:** Terminal-style contact form UI
**Needed Functionality:**
- **[CRITICAL]** Form input handling and submission
- Terminal-style typing animation (optional but polished)
- Input validation (email, required fields)
- Success/error feedback displayed as terminal output
- Copy button functionality if code snippets exist
- Clear form after successful submission

---

## DELIVERABLES

**Output:** Single consolidated HTML file or individual updated HTML files (your choice) containing:
1. ✅ All original HTML structure preserved (no breaking changes)
2. ✅ Complete JavaScript implementation for all interactive features
3. ✅ CSS transitions and animations (using existing Tailwind + custom CSS if needed)
4. ✅ Fully functional prototype that users can click, interact with, and navigate
5. ✅ No external JavaScript libraries required (vanilla JS preferred, or minimal Axios/GSAP if needed for performance)
6. ✅ Clean, commented code that's easy to maintain and extend
7. ✅ No console errors or broken functionality
8. ✅ Mobile-responsive and touch-friendly

---

## CONSTRAINTS & GUIDELINES

- **Keep HTML structure intact** - No major HTML refactoring unless absolutely necessary
- **Preserve Tailwind configuration** - Use existing color/spacing tokens from the design system
- **No external UI frameworks** - Use vanilla JavaScript (jQuery is okay if it simplifies things, but not required)
- **Semantic and accessible** - ARIA labels, keyboard navigation, proper heading hierarchy
- **Performance first** - Minimize repaints/reflows, use CSS transforms for animations
- **Dark mode only** - This is a dark-mode-first design; no light mode toggle needed
- **Testing required** - Verify all features work before delivery

---

## OPTIONAL ENHANCEMENTS

If time permits:
- Add localStorage to remember filter/tab preferences
- Implement dark theme toggle (low priority, design is dark-first)
- Add parallax scrolling effects on hero section
- Animate numbers/metrics when scrolled into view
- Add keyboard shortcuts (e.g., `/` to focus search, arrow keys for timeline)
- Submit contact form to a backend endpoint (or console.log for demo)

---

## ACCEPTANCE CRITERIA

✅ Portfolio is **fully interactive and functional**
✅ All navigation works smoothly
✅ All filters, tabs, and timeline interactions work
✅ Contact form validates and responds to input
✅ **Zero console errors**
✅ Responsive on mobile/tablet/desktop
✅ Keyboard navigable
✅ Code is clean, commented, and maintainable
✅ Performance is smooth (60fps animations)

---

## SUCCESS METRICS

- User can navigate through all 5 sections smoothly
- User can filter projects by tech stack
- User can switch between case study tabs
- User can interact with timeline
- User can fill and submit contact form
- User experiences no lag or jank during interactions
- All interactive elements have clear visual feedback (hover/active states)

---

**Ready to build? Start with the navigation system and CTA links, then move through each section's interactive features in order of complexity. Good luck! 🚀**
