# Design System — OptiMind Solutions

## Product Context
- **What this is:** Marketing landing + internal management dashboard for a Colombian software development agency.
- **Who it's for:** Prospective SMB/enterprise clients (landing) and the internal team (dashboard).
- **Space/industry:** Software development / digital agency, competing against generic SaaS-template-looking studios.
- **Project type:** Marketing site (landing) + web app (dashboard), hybrid.

## Aesthetic Direction
- **Direction:** Industrial/Utilitarian with an editorial touch.
- **Decoration level:** Minimal — typography, real product screenshots, and restrained motion do the work. No decorative blobs, no gradient backgrounds, no icon-in-colored-circle grids.
- **Mood:** Confident and technical. "This is real engineering, not a template." Proof over promises — real production screenshots instead of illustrations.
- **Reference sites:** [linear.app](https://linear.app) (near-black canvas, real product screenshots as hero proof, single sparing accent), [basement.studio](https://basement.studio) (confident direct copy, monospace personality, no gradient/blob decoration).
- **Memorable thing:** "Esto es ingeniería seria, no una plantilla."

## Typography
- **Display/Hero:** Cabinet Grotesk (via Fontshare) — geometric, technical personality, not a default/AI-generic stack.
- **Body:** Geist — excellent on-screen legibility, supports tabular figures for the dashboard.
- **UI/Labels:** Geist, with JetBrains Mono for uppercase micro-labels (tracking +0.08–0.12em).
- **Data/Tables:** Geist with `font-feature-settings: "tnum"` for aligned numeric columns.
- **Code:** JetBrains Mono (already in use — kept).
- **Loading:** Fontshare CDN for Cabinet Grotesk; Google Fonts (or self-hosted) for Geist and JetBrains Mono; `font-display: swap` on all.
- **Scale:** 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64 / 76px, roughly a 1.333 (perfect fourth) ratio at the top end.

## Color
- **Approach:** Restrained — one accent, color is rare and meaningful.
- **Primary (bg):** `#0A0A0B` — true near-black, no blue/violet tint.
- **Surface:** `#131315` (cards), `#1C1C1F` (nested surfaces).
- **Border:** `#2A2A2E`.
- **Accent:** `#C8FF4D` electric lime — CTAs, active states, key highlights only. Used sparingly.
- **Accent (dim/hover):** `#8FB838`.
- **Text:** `#F2F2F0` (primary), `#9A9A9F` (muted), `#5C5C61` (dim/labels).
- **Semantic:** success `#4ADE80`, warning `#FBBF24`, error `#FB7185`, info `#60A5FA`.
- **Dark mode:** This IS the default mode (dark-first product). A light mode exists for users who prefer it: swap to warm-white `#F7F7F5` bg, `#FFFFFF` surfaces, same accent (slightly deepened to `#6FA022` for AA contrast on white).
- **Banned:** violet/purple, cyan, navy/teal — the old palette. No gradients as a default decoration.

## Spacing
- **Base unit:** 4px.
- **Density:** Comfortable (not compact — this is a marketing site + a small internal tool, not a data-dense enterprise console).
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64) 4xl(96).

## Layout
- **Approach:** Hybrid — grid-disciplined for the dashboard (predictable alignment, data tables), editorial/asymmetric for the landing (breaks the old centered-everything + symmetric 3-column grid).
- **Grid:** 12-col on desktop, content max-width 1200px (was 1280/7xl — tightened for a less "stretched SaaS template" feel).
- **Border radius:** sm 4px (inputs, tags), md 8px (buttons, small cards), lg 12px (cards, modals) — no uniform bubble radius on everything.

## Motion
- **Approach:** Intentional — every animation communicates a state change, not decoration. Drop the infinite floating blobs; keep `whileInView` reveals but make them purposeful (short, no exaggerated y-offsets).
- **Easing:** enter `ease-out`, exit `ease-in`, move `ease-in-out`.
- **Duration:** micro 80ms, short 200ms, medium 350ms, long 600ms (page-level reveals only).

## Components
- Built on **shadcn/ui** primitives + selected **cult-ui** (nolly-studio/cult-ui) components for motion-rich pieces:
  - `BrowserWindow` — frames real project screenshots in Portfolio (replaces flat `<img>`).
  - `MinimalCard` / `ShiftCard` — Services and Team cards (replaces icon-in-colored-circle grid).
  - `TextureButton` / `BgAnimateButton` — primary CTA (replaces flat gradient button).
  - `TextAnimate` — Hero headline reveal.
  - `AnimatedNumber` — dashboard stat cards (tabular, animates on load).
  - `MacOSDock` — optional dashboard quick-actions dock.
  - `DynamicIsland` — optional live-status widget in the dashboard TopNav.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-19 | Replaced violet/cyan landing palette + navy/teal dashboard palette with a single near-black + electric-lime system | User asked for a redesign; research (Linear, basement.studio) showed the violet-gradient + icon-circle-grid look reads as generic AI-SaaS-template, not "serious engineering" |
| 2026-06-19 | Adopted shadcn/ui + cult-ui for motion-rich components | User request — gives richer, more crafted interaction design than hand-rolled Framer Motion divs, while staying source-owned (copy-in, not a black-box dependency) |
