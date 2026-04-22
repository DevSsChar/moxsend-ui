# Moxsend AI — Design System Specification

This document defines the visual language, design tokens, and component patterns used across the Moxsend application. All values are implemented in [`globals.css`](src/app/globals.css) as Tailwind v4 theme tokens.

---

## 1. Design Philosophy

Moxsend follows a **warm, editorial-grade aesthetic** inspired by Material Design 3 principles but with a distinctive brand personality:

- **Warm neutrals** over cold greys — the app feels approachable, not clinical
- **Generous whitespace** — content breathes; information density is carefully controlled
- **Card-first layout** — every content block lives in a well-defined container
- **Subtle motion** — fade-in-up animations, staggered reveals, and micro-interactions add life without distraction
- **Typography-led hierarchy** — large headlines and monospace labels create clear visual structure

---

## 2. Color Palette

### Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `brand-orange` | `#FF5600` | Primary CTA, active states, badges |
| `brand-primary` | `#A63500` | Gradient start, label text, accent |
| `brand-primary-container` | `#D04500` | Gradient end, hover states |
| `primary-fixed` | `#FFDBCF` | Light tinted backgrounds (tags, badges) |
| `primary-fixed-dim` | `#FFB59C` | Slightly deeper accent backgrounds |

### Surface Hierarchy

A 5-level surface system creates depth without drop shadows:

| Token | Hex | Usage |
|---|---|---|
| `bg-primary` | `#FAF9F6` | Page background (warm off-white) |
| `bg-card` | `#FFFFFF` | Card backgrounds |
| `surface-container-low` | `#F4F3F1` | Recessed areas, secondary panels |
| `surface-container` | `#EFEEEB` | Input backgrounds, inactive chips |
| `surface-container-high` | `#E9E8E5` | Disabled buttons, table headers |
| `surface-container-highest` | `#E3E2E0` | Strong emphasis backgrounds |
| `surface-variant` | `#E3E2E0` | Dot indicators, subtle UI elements |

### Text Colors

| Token | Hex | Usage |
|---|---|---|
| `off-black` | `#111111` | Primary headings, body text |
| `text-primary` | `#1A1C1A` | Standard body content |
| `text-secondary` | `#7B7B78` | Supporting text, descriptions |
| `text-tertiary` | `#5C4037` | Warm brown labels, section headers |

### Borders

| Token | Hex | Usage |
|---|---|---|
| `border-default` | `#DEDBD6` | Card borders, dividers, table lines |
| `border-variant` | `#E5BEB2` | Accent borders (warm tint) |

### System

| Token | Hex | Usage |
|---|---|---|
| `error` | `#BA1A1A` | Error toasts, validation messages |

### Dark Mode

| Token | Hex | Usage |
|---|---|---|
| `dark-bg` | `#111111` | Page background |
| `dark-surface` | `#1A1A1A` | Card backgrounds |
| `dark-elevated` | `#242424` | Elevated surfaces |
| `dark-border` | `#313130` | Borders |
| `dark-text-secondary` | `#9C9FA5` | Secondary text |
| `dark-text-muted` | `#5C5C5C` | Muted text |

---

## 3. Typography

### Font Family

**Plus Jakarta Sans** is used exclusively across the entire application. Loaded via Google Fonts with weights 300–800.

```css
font-family: 'Plus Jakarta Sans', sans-serif;
```

### Type Scale

| Class | Letter Spacing | Line Height | Usage |
|---|---|---|---|
| `.saans-hero` | `-2.4px` | `1.00` | Hero headlines (54px+) |
| `.saans-display` | `-1.6px` | `1.00` | Page titles (40–54px) |
| `.saans-headline` | `-0.96px` | `1.00` | Section headings (20–32px) |
| `.mono-label` | `+0.6px` | inherit | Uppercase category labels |

### Monospace Labels

Used for small section identifiers like "WELCOME BACK", "AI ANALYSIS COMPLETE", "SUBJECT LINE":

```css
.mono-label {
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}
```

### Icon System

Material Symbols Outlined with variable font axes:

```css
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.material-symbols-outlined.filled {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
```

---

## 4. Spacing & Layout

### Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `section` | `48px` | Vertical spacing between major sections |

Standard Tailwind spacing is used elsewhere (e.g., `gap-6`, `p-8`, `mb-12`).

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | `4px` | Buttons, chips |
| `radius-md` | `8px` | Small cards, inputs |
| `radius-lg` | `12px` | Standard cards |
| `radius-xl` | `24px` | Large cards, panels |
| `radius-2xl` | `32px` | Full-bleed cards, modals |

### Responsive Breakpoints

| Breakpoint | Width | Layout Behavior |
|---|---|---|
| Mobile | `< 768px` | Single column, bottom nav visible, stacked cards |
| Tablet | `768px – 1023px` | 2-column grids, side-by-side panels |
| Desktop | `≥ 1024px` | 3-column variation grid, full bento layout |

### Content Width

- **Max container**: `max-w-5xl` (Dashboard, CSV) / `max-w-7xl` (Variations, Comparison)
- **Horizontal padding**: `px-6` (all views)
- **Top padding**: `pt-24` (accounts for 64px fixed header)
- **Bottom padding**: `pb-32` (accounts for mobile bottom nav)

---

## 5. Elevation & Depth

Moxsend avoids heavy drop shadows in favor of borders and subtle surface tinting:

### Card Styles

| Class | Implementation | Usage |
|---|---|---|
| `.card-shadow` | `border: 1px solid border-default` | Primary cards (input canvas) |
| `.sunken-shadow` | `box-shadow: 0 8px 24px -4px rgba(29,27,25,0.06)` | Variation cards, elevated panels |
| `.glass-panel` | `background: rgba(255,248,245,0.7); backdrop-filter: blur(24px)` | Floating refine bar |

### Gradient

```css
.primary-gradient {
  background: linear-gradient(135deg, #a63500 0%, #d04500 100%);
}
```

Used for the refine bar icon and execute button.

---

## 6. Animation System

### Keyframes

| Animation | Duration | Behavior |
|---|---|---|
| `fadeInUp` | `0.5s` | Translates Y +16px → 0, opacity 0 → 1 |
| `slideInFromBottom` | `0.3s` | Toast notification entrance |
| `shimmer` | `1.5s` (infinite) | Skeleton loading shimmer |
| `pulse-glow` | `2s` (infinite) | Orange pulsing glow ring |

### Staggered Entry

Cards and sections use staggered delays for sequential reveal:

```css
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
```

Elements start with `opacity: 0` and `animation-fill-mode: forwards` via `animate-fade-in-up`.

### Button Micro-interactions

| Class | Hover | Active |
|---|---|---|
| `.btn-hover` | `scale(1.05)` | `scale(0.95)` |
| `.btn-scale` | `scale(1.1)` | `scale(0.85)` |

All transitions use `ease-out` timing with `200ms` duration.

### Accessibility

Respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Component Patterns

### Buttons

| Style | Background | Text | Radius | Example |
|---|---|---|---|---|
| **Primary CTA** | `brand-orange` | `white` | `4px` | "Generate Email" |
| **Dark solid** | `off-black` | `white` | `4px` | "Accept Improved Version", "New Message" |
| **Outlined** | `transparent` | `off-black` | `4px` | "Keep Original" |
| **Chip/Toggle** | `off-black` (active) / `surface-container` (inactive) | varies | `4px` | Tone selectors |
| **Pill** | `surface-container-highest` | `text-primary` | `full` | "Copy" button |
| **Icon** | `surface-container-highest` | `text-primary` | `full` | Improve sparkle button |

### Cards

| Variant | Border | Background | Radius | Usage |
|---|---|---|---|---|
| **Primary card** | `border-default` | `white` | `12px` | Input canvas |
| **Variation card** | none (shadow only) | `white` | `24px` | Email variation cards |
| **Info card** | `border-default` | `surface-container-low` | `12px` | Optimization summary |
| **Dark card** | none | `off-black` | `12px` | AI Insights, Pro Templates |
| **Highlighted card** | `2px brand-orange` | `white` | `12px` | Improved email version |

### Toast Notifications

- Position: Fixed bottom-center (above mobile nav)
- Background: `off-black` (success/info) or `error` (error)
- Icon: Material Symbol (check_circle / error / info)
- Auto-dismiss: 4 seconds
- Entry animation: `slideInFromBottom` (0.3s)

### Upload Zone

- Border: `2px dashed border-default`
- Hover: `border-brand-orange/40`, `bg-surface-container-low`
- Drag active: `border-brand-orange`, `bg-brand-orange/5`
- Icon: `cloud_upload` (48px)

---

## 8. Selection & Scrollbar

### Text Selection

```css
::selection {
  background-color: rgba(255, 86, 0, 0.15);  /* 15% brand orange */
  color: inherit;
}
```

### Custom Scrollbar

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: var(--color-border-default);
  border-radius: 10px;
}
```

---

## 9. Design Tokens Reference (CSS Custom Properties)

All tokens are defined in `globals.css` under the `@theme` directive and are directly usable as Tailwind classes:

```
bg-brand-orange     → #FF5600
bg-bg-primary       → #FAF9F6
text-off-black      → #111111
text-text-secondary → #7B7B78
border-border-default → #DEDBD6
rounded-sm          → 4px
rounded-lg          → 12px
font-headline       → 'Plus Jakarta Sans'
```

---

## 10. Design Decisions Log

| Decision | Rationale |
|---|---|
| Warm off-white (`#FAF9F6`) instead of pure white | Creates a softer, more premium feel and reduces eye strain |
| `4px` button radius instead of full-round | Matches corporate/SaaS aesthetic; pills reserved for action buttons |
| Monospace labels for categories | Creates visual contrast and editorial feel; signals "system" language |
| Orange as the sole accent color | Maintains strong brand identity without visual clutter |
| Side-by-side comparison (not diff) | Non-technical users understand two columns better than inline diffs |
| Staggered animations on card entry | Creates a sense of progressive loading, feels intentional |
| `prefers-reduced-motion` support | Accessibility best practice — ensures usability for all users |
