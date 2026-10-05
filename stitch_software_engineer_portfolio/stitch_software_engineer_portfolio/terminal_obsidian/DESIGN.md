---
name: Terminal Obsidian
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353942'
  surface-container-lowest: '#0a0e16'
  surface-container-low: '#181c24'
  surface-container: '#1c2028'
  surface-container-high: '#262a33'
  surface-container-highest: '#31353e'
  on-surface: '#dfe2ee'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dfe2ee'
  inverse-on-surface: '#2c3039'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#c0c1ff'
  on-tertiary: '#1000a9'
  tertiary-container: '#9699ff'
  on-tertiary-container: '#1d17b2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#0f131c'
  on-background: '#dfe2ee'
  surface-variant: '#31353e'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses a refined, high-performance developer aesthetic. It is tailored for an elite full-stack engineer whose work spans complex distributed architectures, systems infrastructure, and precision-crafted user interfaces. 

The aesthetic is grounded in **Technical Minimalism with Glassmorphic Micro-Depth**. It evokes feelings of reliability, structural integrity, speed, and architectural depth. Instead of decorative clutter, visual weight is carried by crisp linear geometry, deliberate typographic hierarchy, translucent paneling, and selective high-voltage optical accents (emerald and electric cyan) reminiscent of live terminal environments, telemetry monitors, and clean runtime diagnostics.

## Colors

The system is configured as dark-mode-first. The color composition leverages deep slate and obsidian tones to minimize eye fatigue while maximizing the visual impact of engineering benchmarks, code syntax, and system statuses.

- **Primary (`#10B981`)**: Neon Emerald. Symbolizes passing health-checks, deployment success, operational status, and primary calls-to-action.
- **Secondary (`#06B6D4`)**: Electric Cyan. Used for secondary telemetry, data pipelines, network flows, active filters, and interactive hover highlights.
- **Tertiary (`#6366F1`)**: Deep Indigo. Applied to architecture diagrams, structural badges, infrastructure layers, and subtle atmospheric radial glow backdrops.
- **Neutral Surface Hierarchy**:
  - `canvas`: `#0B0F17` (Deep Obsidian - base viewport canvas)
  - `surface-subtle`: `#111827` (Panel backgrounds, project card base)
  - `surface-elevated`: `#1F2937` (Dropdowns, floating overlays, code snippet blocks)
  - `border-default`: `rgba(255, 255, 255, 0.08)` (Subtle crisp division)
  - `border-hover`: `rgba(16, 185, 129, 0.3)` (Active engineering glow outline)
  - `text-primary`: `#F9FAFB` (High legibility)
  - `text-secondary`: `#9CA3AF` (Supporting metadata)
  - `text-muted`: `#4B5563` (Decorative brackets, line counts, deactivated states)

## Typography

Typographic scale balances contemporary visual poise with terminal-grade precision. 

- **Display & Headings (Plus Jakarta Sans)**: Delivers dense, assertive structural forms with tight geometric curves, optimized with negative letter-spacing for commanding section titles and project hero banners.
- **Body Text (Inter)**: Built for neutral, long-form legibility across system architecture narratives, performance summaries, and engineering methodology breakdowns.
- **Technical & Labels (JetBrains Mono)**: Reserved for code blocks, terminal mockups, commit hashes, latency numbers, architecture nodes, payload schemas, and categorical filter tags. Always rendered in tabular numbers for consistent vertical alignment across data readouts.

## Layout & Spacing

The layout is anchored by a 12-column grid capped at a maximum width of `1280px` on desktop, centering high-density content inside a clean visual frame.

- **Desktop (>= 1024px)**: 12-column grid with `1.5rem` (`24px`) gutters and `2rem` (`32px`) margins. Deep case studies split into a 7-column preview panel (interactive UI, architectural animations) and a 5-column technical specification column (schema endpoints, system metrics, performance graphs).
- **Tablet (768px - 1023px)**: 8-column grid with `1.25rem` (`20px`) gutters and `1.5rem` (`24px`) margins. Case studies stack with project visual media leading and tech specs directly beneath.
- **Mobile (< 768px)**: 4-column layout with `1rem` (`16px`) gutters and `1.25rem` (`20px`) margins. Horizontal scrolling triggers for tech stacks, while stats and benchmark badges format as a 2x2 grid.

## Elevation & Depth

Visual hierarchy uses **tonal layer stacking with low-contrast glassmorphism and subtle hairline borders**, eschewing traditional drop shadows.

1. **Layer 0 (Base Viewport)**: Solid `#0B0F17` background textured with a sub-perceptual 1px SVG grid pattern (`rgba(255, 255, 255, 0.02)`) spaced at 32px intervals.
2. **Layer 1 (Card & Module Canvas)**: `#111827` at `0.85` opacity with `backdrop-filter: blur(12px)`. Enclosed by a crisp hairline border `1px solid rgba(255, 255, 255, 0.08)`.
3. **Layer 2 (Interactive Elements & Code Panels)**: `#1F2937` with `1px solid rgba(255, 255, 255, 0.12)`.
4. **Elevation Accents (Active / Focus States)**: Hovered project containers and active terminal windows cast a diffused directional aura: `box-shadow: 0 0 24px -4px rgba(16, 185, 129, 0.12), 0 8px 16px -6px rgba(0, 0, 0, 0.6)`.

## Shapes

The design uses **Soft Geometry (Level 1)** to maintain an intentional, industrial, engineering feel. 

- Default elements (input boxes, inline code containers, standard buttons) use `0.25rem` (`4px`) corner radii.
- Structural cards, code playgrounds, case-study media containers, and modal dialogs use `rounded-lg` (`0.5rem` / `8px`).
- Filter tags and system health pill markers use a compact capsule treatment (`9999px`) to contrast against the strict modular rectangular panels.

## Components

### Buttons
- **Primary Action**: Solid `#10B981` surface with `#0B0F17` bold typography, `4px` corner radius, `px-4 py-2` padding. Hover introduces a subtle scale transformation (`1.02`) with an emerald edge glow (`0 0 16px rgba(16,185,129,0.4)`).
- **Secondary Action**: `#111827` filled container with `1px solid rgba(255, 255, 255, 0.12)` and `#F9FAFB` text. Hover shifts border color to `#06B6D4` and background to `#1F2937`.
- **Icon / Link Button**: Monospaced font, no background, `#9CA3AF` text, displaying inline micro-icons (GitHub branch, External URL arrow). Shifts to `#10B981` on hover with an underline animation.

### Tech Stack Filter Pills & Chips
- **Container**: `9999px` pill radius, `px-3 py-1`, rendered in `label-sm` (`JetBrains Mono`).
- **Inactive State**: `rgba(255, 255, 255, 0.04)` fill, `1px solid rgba(255, 255, 255, 0.08)`, `#9CA3AF` text.
- **Active / Selected State**: `rgba(16, 185, 129, 0.12)` fill, `1px solid #10B981`, `#10B981` text, preceded by a pulsing 6px neon emerald status dot.

### Project Case Study Cards
- Multi-tier card structure:
  1. **Header Bar**: Simulated terminal title bar with three muted window dots (red/yellow/green muted to 40% opacity) on the left, and production deployment latency or uptime tag on the right.
  2. **Visual Showcase**: High-fidelity frontend screenshot or interactive canvas preview with an inner edge vignette.
  3. **Architecture Breakdown**: Side-by-side or stacked tabbed interface showcasing (a) System Topology, (b) Database/Schema design, and (c) Performance benchmarks (e.g., `p99 < 42ms`, `100k RPS`).
  4. **Footer**: Stack metadata chips, GitHub link button, and Live Deployment link with external indicator.

### Code Blocks & Architecture Snippets
- Styled as an integrated CLI/IDE window: `#080C14` background with `1px solid rgba(255, 255, 255, 0.08)`.
- Line numbers aligned in `text-muted` along the left gutter.
- Syntax highlighting keyed to the primary/secondary tokens: keywords in `#06B6D4`, functions and methods in `#10B981`, variables in `#F9FAFB`, comments in `#4B5563`.
- Top-right copy action button with toast verification feedback ("Copied to clipboard").

### Interactive Career & Architecture Timeline
- Vertical linear track (`1px solid rgba(255, 255, 255, 0.08)`) with glowing checkpoint nodes.
- Each milestone node highlights an engineering role, distributed system redesign, or major open-source release with timestamp, role title in `headline-sm`, and bulleted architectural impact metrics.

### Inputs & Filters
- Background `#111827`, border `1px solid rgba(255,255,255,0.1)`, text `#F9FAFB`. Focus state introduces a crisp `#10B981` border and a zero-blur outline ring `2px solid rgba(16,185,129,0.2)`.