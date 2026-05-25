# agent-aesthetics

A personal design kit for projects vibe-coded with LLM agents.
Provides one specific aesthetic — "soft-brutalist-document" — so
generated UIs converge on a signature look instead of looking ad-hoc.

## What's in here

```
agent-aesthetics/
├── AESTHETIC.md           # Canonical spec — read this first.
├── README.md              # You're here.
├── prompts/
│   └── CLAUDE.md          # Agent-facing instructions for using the kit.
├── tokens/                # Machine-readable design tokens.
│   ├── palettes.json      # All palettes (M2 primary + S/K variants).
│   ├── typography.json    # Type families, scale, inline-mono semantics.
│   └── spacing.json       # Spacing scale, page padding, radii.
└── references/
    └── web/               # Eleven reference HTML pages, the show-don't-tell.
        ├── index.html     # Hub: visual landing card grid.
        ├── log.html       # Run timeline + sidebar + code blocks.
        ├── dashboard.html # KPI tiles, charts, status, activity table.
        ├── reader.html    # Long-form article + TOC + tables.
        ├── chat.html      # List + threaded messages + composer.
        ├── charts.html    # Line/bar/area/donut/sparkline/scatter/heatmap.
        ├── components.html# Every atomic component with variants.
        ├── game.html      # Text-adventure HUD pattern.
        ├── settings.html  # Section nav + fields + toggles + danger zone.
        ├── signin.html    # Centered auth card.
        ├── notfound.html  # 404 + empty-state patterns.
        └── assets/
            ├── styles.css # All palette + component CSS.
            └── switcher.js# Injects topbar, handles palette + collapse.
```

## Preview locally

The reference pages are static HTML — any static server works:

```sh
python3 -m http.server 8765
# visit http://localhost:8765/references/web/
```

The topbar lets you flip palette (light row, dark row) and page
(top tabs). Choice persists in `localStorage`. Esc or the `×` button
hides the topbar entirely so you can see the aesthetic without chrome
competing for attention.

## Primary palette

**M2 Magenta** is the canonical palette. Light is the default; dark
(M2D) is auto-selected when the system reports
`prefers-color-scheme: dark`. Other palettes (S1–S7 cool variants,
K1–K5 well-known editor schemes) exist for comparison and special
projects but should default to M2.

## Using this kit on a new project

Read `AESTHETIC.md` for the principles and `prompts/CLAUDE.md` for the
agent workflow. The TL;DR:

1. Copy `references/web/assets/styles.css` + `assets/switcher.js`.
2. Each page: `<link rel="stylesheet" href="assets/styles.css">`,
   `<body class="palette-m2">`, `<nav class="topbar" id="topbar"></nav>`,
   `<script src="assets/switcher.js"></script>`.
3. Copy component markup from `references/web/components.html`.
4. Don't add new colors, shadows, gradients, decorative icons, or
   rounded corners > 4px.

## Status

Personal kit, evolving. Not designed for general consumption — choices
are made for one person's taste, not for flexibility.
