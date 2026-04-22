# Moxsend AI — Cold Email Generator

**Turn your product vision into high-converting cold email sequences in seconds.**

Moxsend AI is a frontend application that lets users describe their product and target audience, then generates multiple AI-crafted email variations — complete with subject lines, personalized openers, and body copy. Users can iterate on any variation with a one-click "Improve" flow, and compare before/after versions side-by-side. A bulk CSV upload feature enables generating personalized emails at scale.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS design tokens |
| Typography | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (300–800) |
| Icons | [Material Symbols Outlined](https://fonts.google.com/icons) (variable weight/fill) |
| State | React Context API (`MoxsendContext`) |

---

## Quick Start

```bash
# 1. Clone & navigate
cd d:\moxsend-new\app-build

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:3000
```

---

## Project Structure

```
app-build/
├── src/
│   └── app/
│       ├── globals.css              ← Design system tokens & utilities
│       ├── layout.tsx               ← Root layout (fonts, metadata)
│       ├── page.tsx                 ← App shell & view router
│       ├── context/
│       │   └── MoxsendContext.tsx   ← Global state management
│       └── components/
│           ├── Header.tsx           ← Top navigation bar
│           ├── BottomNav.tsx        ← Mobile bottom navigation
│           ├── Toast.tsx            ← Notification system
│           ├── DashboardView.tsx    ← Home / input screen
│           ├── VariationsView.tsx   ← Email results grid
│           ├── ComparisonView.tsx   ← Before/after improvement view
│           └── CSVUploadView.tsx    ← Bulk CSV upload & generate
├── DESIGN.md                       ← Design system specification
└── README.md                       ← This file
```

---

## Component Reference

### Layout & Navigation

#### [`Header.tsx`](src/app/components/Header.tsx)
Fixed top navigation bar with the Moxsend AI logo, desktop navigation links (Create, History, Templates, Settings), a "New Message" CTA button (visible outside dashboard), and a user avatar. Clicking the logo resets the session to the dashboard.

#### [`BottomNav.tsx`](src/app/components/BottomNav.tsx)
Mobile-only (`md:hidden`) bottom tab bar with four icon+label navigation items. Uses Material Symbols icons with active state highlighting via orange accent color and top border.

#### [`Toast.tsx`](src/app/components/Toast.tsx)
Global notification component that auto-dismisses after 4 seconds. Supports three types: `success`, `error`, and `info`. Animates in from the bottom with `slideInFromBottom` keyframe. Positioned above the mobile bottom nav.

---

### Core Views

#### [`DashboardView.tsx`](src/app/components/DashboardView.tsx)
The home screen and primary entry point. Contains:
- **Hero section** — "What are we sending today?" headline with welcome greeting
- **Input card** — Large textarea for product/audience description with character counter
- **Tone selectors** — Three toggleable buttons (Friendly, Professional, Persuasive)
- **Generate button** — Orange CTA, disabled until input ≥ 20 characters, shows spinner during generation
- **Bulk CSV link** — Navigates to the CSV upload view
- **Bento grid** — Feature cards for Intercom integration and Pro Templates

#### [`VariationsView.tsx`](src/app/components/VariationsView.tsx)
Displays three AI-generated email variations in a responsive grid. Each `VariationCard` shows:
- **Subject Line** — Bold headline
- **Opening** — Italicized personalized opener
- **Body Excerpt** — Email body preview
- **Actions** — Copy to clipboard + Improve (sparkle) button

Also includes an **AI Recommendation** panel with sentiment analysis and a floating **Refine Bar** for iterative prompting.

#### [`ComparisonView.tsx`](src/app/components/ComparisonView.tsx)
Side-by-side comparison of the original and AI-improved email. Features:
- **Optimization Summary** sidebar (Clarity +42%, Tone, Length metrics)
- **AI Insights** panel on dark background explaining what changed and why
- **Original Draft** panel — muted styling
- **Moxsend AI Version** panel — orange border with "RECOMMENDED" badge
- **Action buttons** — "Accept Improved Version" or "Keep Original"

#### [`CSVUploadView.tsx`](src/app/components/CSVUploadView.tsx)
Bulk email generation via CSV upload. Features:
- **Drag-and-drop zone** with dashed border, accepts `.csv` files up to 5MB
- **File parsing** — Reads headers and data rows client-side
- **Preview table** — Shows first 10 rows with column headers
- **Progress bar** — Animated progress during bulk generation
- **File validation** — Extension and size checks with error toasts

---

### State Management

#### [`MoxsendContext.tsx`](src/app/context/MoxsendContext.tsx)
Centralized React Context provider managing the entire application state:

| State | Type | Purpose |
|---|---|---|
| `view` | `AppView` | Current screen (`dashboard`, `variations`, `comparison`, `csv`) |
| `productDescription` | `string` | User's input text |
| `variations` | `EmailVariation[]` | Generated email variations (A, B, C) |
| `selectedVariation` | `EmailVariation \| null` | Email currently being improved |
| `improvement` | `ImprovementResult \| null` | Before/after comparison data |
| `isGenerating` | `boolean` | Loading state for generation |
| `isImproving` | `boolean` | Loading state for improvement |
| `toastMessage` | `string \| null` | Active toast notification |

**Key Actions:**

| Method | Description |
|---|---|
| `generateEmails()` | Simulates API call → populates 3 variations → navigates to variations view |
| `improveEmail(v)` | Simulates improvement → creates before/after comparison → navigates to comparison view |
| `acceptImprovement()` | Replaces original with improved version in the variations array |
| `keepOriginal()` | Discards improvement and returns to variations |
| `copyEmail(v)` | Copies formatted email to clipboard, shows success toast |
| `resetSession()` | Clears all state and returns to dashboard |

---

## User Flow

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Dashboard   │────▶│  Email Variations │────▶│   Comparison    │
│  (Input)     │     │  (3 cards: A,B,C) │     │  (Before/After) │
└──────┬───────┘     └──────────────────┘     └────────┬────────┘
       │                                                │
       │                                     Accept ◄───┤───▶ Keep
       │                                                │
       ▼                                                ▼
┌──────────────┐                            Back to Variations
│  CSV Upload  │
│  (Bulk mode) │
└──────────────┘
```

---

## Design System

See [`DESIGN.md`](DESIGN.md) for the complete design specification including:
- Color palette (brand orange, surface hierarchy, dark mode)
- Typography scale and custom utility classes
- Spacing, radius, and elevation tokens
- Animation system and micro-interactions
- Component patterns and responsive breakpoints

---

## API Integration (Future)

The current build uses **mock data** with simulated delays. To connect to a real backend:

1. Replace `mockVariations` in `MoxsendContext.tsx` with a `fetch("/api/generate")` call
2. Replace `mockImprovement` with a `fetch("/api/improve")` call
3. Add error handling in the context for failed API responses
4. The Toast system already supports `error` type notifications

**Expected API shape:**

```typescript
// POST /api/generate
Request:  { description: string, tone: string }
Response: { variations: EmailVariation[] }

// POST /api/improve
Request:  { email: EmailVariation }
Response: { improved: EmailVariation, stats: Stats, insights: string }
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## License

Private — All rights reserved.
