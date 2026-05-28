# agent-aesthetics

A personal design language for projects vibe-coded with LLM agents.
This document is the canonical specification — read it before generating
any UI for a project that uses this kit.

The reference pages under `references/web/` are the show-don't-tell:
when this doc and the reference pages disagree, the reference pages win.

---

## Why this exists

LLM-generated UIs tend to look ad-hoc. Each agent makes slightly
different visual choices, every project ends up with its own
inconsistent design language, and none of them feel intentional. This
kit fixes that by codifying one specific aesthetic and giving agents
enough material — prose, tokens, references — to produce it
consistently across projects.

The goal is **one signature look for everything**, not a flexible design
system. Use this kit as-is; don't add new colors, don't introduce new
chrome elements, don't decorate. Stay inside the lines.

---

## What is NOT part of the kit

**The palette/page-switcher topbar is reference-site scaffolding. Do not
copy it into real projects.**

The reference pages each render a dark sticky bar at the top with a "Light"
and "Dark" palette row and a row of page tabs (Log, Dashboard, Reader, …).
That bar exists **only** so you can browse and compare the reference site.
It is injected by `references/web/assets/reference.js` into the
`<nav class="topbar" id="topbar" data-reference-only>` slot. It is **not**
a design pattern and must never ship in a project that uses this kit.

A real page needs **none** of it:
- ❌ Don't copy `reference.js` or `styles.css` (both are reference-site only).
- ❌ Don't add `<nav class="topbar" id="topbar">`.
- ❌ Don't reproduce the Light/Dark palette rows or the page-tab row.
- ✅ Do copy `theme.css` — the one self-contained file a project needs.
- ✅ Do start from `references/web/_starter.html` — the clean, correct
  minimal page with no scaffolding.

### Two stylesheets, one is shippable

- **`assets/theme.css`** — THE kit. M2 palette only (light + dark, auto
  via `prefers-color-scheme`, override with `data-theme`) plus all base and
  component styles. Self-contained. **This is the only file you ship.**
- **`assets/styles.css`** — reference site only. It `@import`s `theme.css`
  then adds the 24 extra palettes (as switchable `body.palette-*` classes)
  and the topbar. Never ship it.

If a project has a top navigation, it's the project's own nav, designed
per this spec (breadcrumbs / a `.top-row` brand+action bar) — never the
reference switcher.

---

## The aesthetic — "soft-brutalist-document"

The page should read like a published technical document, not a SaaS
dashboard. Specifically:

1. **Document-first chrome** — breadcrumbs over nav bars, article
   structure over card grids, sidebars contain metadata not panels.
2. **Two type families, always both present** — system sans for
   UI/prose, monospace for code/identifiers/paths. The contrast is the
   look; never pretend they're the same family.
3. **Inverted black bars** are the only "heavy" chrome element —
   code-block language tags, the sticky topbar, primary action buttons.
   Everything else stays restrained.
4. **Semantic color**, restricted palette — one accent for the project's
   identity, a small set of syntax tokens used **inside prose** (not just
   in code blocks). Color carries meaning; it never decorates.
5. **Greyscale-only base** (or very subtly tinted neutrals to harmonize
   with accent). Generous whitespace inside content blocks, tight
   typography across.
6. **Thin 1px rules** instead of shadows or borders for elevation. Modals
   are the single exception (subtle shadow).
7. **Native form elements** left mostly alone — no fancy chrome on
   checkboxes, selects, or inputs. `accent-color` is enough.

---

## Token system

All design values live in CSS custom properties. The token names are
semantic; an agent must use the tokens, never raw values.

### Required tokens (per palette)

Every palette defines these CSS variables on `body.palette-{id}`:

| Token | Purpose |
| --- | --- |
| `--bg` | Page background. The base surface. |
| `--bg-2` | Raised surface — cards, panels, code blocks, sidebar bg. |
| `--bg-3` | Deeper raised surface — table-row hover, progress track. |
| `--rule` | Hairline dividers (1px borders inside content). |
| `--rule-strong` | Stronger dividers (form input borders, table headers). |
| `--text` | Primary text. |
| `--text-muted` | Secondary text (metadata, captions). |
| `--text-faint` | Tertiary (placeholders, disabled, separators in breadcrumbs). |
| `--accent` | The project's signature color. Used for links, primary buttons, active indicators. |
| `--accent-hover` | Hover state for accent. |
| `--chrome-bg` | Topbar background (and code-block language tag bg). Inverted from `--bg`. |
| `--chrome-fg` | Foreground on chrome. |
| `--syn-path` | Inline mono: file paths, URLs, identifiers. |
| `--syn-num` | Inline mono: numerics, hex, addresses, currency. |
| `--syn-str` | Inline mono: string literals, "completed"/success indicators. |
| `--syn-kw` | Inline mono: language keywords, booleans, action verbs. |
| `--syn-type` | Inline mono: types, function names, model identifiers. |
| `--syn-comment` | Inline mono: comments, captions, deprecated. |
| `--syn-bg` | Code block background. |

Shared geometry tokens (on `:root`):

| Token | Value |
| --- | --- |
| `--sans` | System sans stack |
| `--mono` | System monospace stack |
| `--size-h1` | 32px |
| `--size-h2` | 14px |
| `--size-h3` | 12px |
| `--size-body` | 15px |
| `--size-small` | 13px |
| `--size-mono` | 13px |
| `--lh-body` | 1.55 |
| `--lh-mono` | 1.6 |
| `--space-1..8` | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px |
| `--radius` | 0px (default) |
| `--radius-code` | 2px (buttons, inputs, code blocks) |

### Primary palette

**M2 Magenta** is the canonical palette. Light variant is the default;
dark variant (M2D) is auto-selected when the user's system prefers dark.

Light (`m2`): bg `#F3F4F6`, accent `#DB2777`, chrome `#111827`
Dark (`m2d`): bg `#0F1117`, accent `#EC4899`, chrome `#1A1D26`

Other palettes (S1–S7, K1–K5) exist for comparison and special projects
but **always default to M2 unless the project has a stated reason to
diverge.**

---

## Type system

### Two families

- **System sans** (`--sans`) — UI chrome, headings, body prose.
- **Monospace** (`--mono`) — code blocks, identifiers, paths, hex,
  numerics, command flags, time stamps, IDs.

Never use sans for code. Never use mono for body prose unless the entire
page is monospace-heavy by design (text adventures, terminal mockups,
HUDs).

### Inline mono in prose

This is the load-bearing pattern. Use inline `<code>` (mono) for the
following inside body text:

- File paths: `/work/project/file.ts`
- Identifiers / function names: `check_flag`, `useEffect()`
- Hex values / addresses: `0x4012a0`, `#DB2777`
- Numerics with units: `1,247`, `00:07:21`, `$0.41`
- Command flags: `--verbose`
- Inline values: `null`, `42`, `true`

Pair with semantic syntax tokens by adding a `t-*` class:

```html
Run completed at <code class="t-num">14:33:21</code> with status
<code class="t-str">success</code> against <code class="t-type">codex</code>.
```

### Type scale

| Level | Size / weight / case | Other |
| --- | --- | --- |
| H1 | 32 / 700 | letter-spacing -0.01em, line-height 1.15 |
| H2 | 14 / 700 | **UPPERCASE**, letter-spacing 0.12em, underline rule below |
| H3 | 12 / 700 | **UPPERCASE**, letter-spacing 0.14em, no rule |
| Body | 15 / regular | line-height 1.55 |
| Small | 13 / regular | metadata, captions, table rows |
| Mono | 13 / regular | line-height 1.6 |

H1 may use the mono family for identifier-style titles (e.g.,
`steady-engine-0859` thread titles). H2/H3 always sans.

---

## Color system

### Palette is restricted

A palette has one **accent** and six **syntax tokens**. Don't add new
colors. If you need to signal something new, use existing tokens
semantically (e.g., success → `--syn-str`, warning → `--syn-num`,
error → `--accent`).

### Accent uses

- Links (text and breadcrumb)
- Primary buttons (filled)
- Active tab indicators (underline)
- Focus rings
- Active sidebar nav item (left border)
- Progress bar fill
- Cursor/prompt characters in monospace contexts
- Tiny status dots when status maps to "primary attention"

### Syntax tokens used in prose

Apply the `t-*` classes to `<code>` (or `<span>`) anywhere meaning maps
to a token category. This is what makes the prose feel like documentation:

```html
The agent located <code class="t-kw">check_flag</code> at
<code class="t-num">0x4012a0</code> and recovered the key.
```

### Light vs dark

Both modes use the same geometry — identical layouts, identical
spacing, identical typography. **Only the palette swaps.**

In dark mode:
- `--bg` goes near-black
- `--chrome-bg` lifts one tier brighter than `--bg` (chrome on dark
  needs to lift to read as a header band; chrome on light is darker)
- `--accent` brightens enough to maintain ≥4.5:1 contrast against `--bg`

---

## Spacing system

Eight-step scale on a 4px base. Use the token, not the literal.

| Token | px | Common use |
| --- | --- | --- |
| `--space-1` | 4 | Tightest inline gap |
| `--space-2` | 8 | Default gap between inline elements |
| `--space-3` | 12 | Default padding for compact UI |
| `--space-4` | 16 | Default padding for buttons / inputs / list rows |
| `--space-5` | 24 | Section spacing |
| `--space-6` | 32 | Large-section spacing, default page padding |
| `--space-7` | 48 | Page-level vertical padding, major grid gaps |
| `--space-8` | 64 | Hero/section separation |

Page wrapper standard: `padding: var(--space-7) var(--space-6) var(--space-8);`

---

## Geometry & chrome

- **No drop shadows** except modals (`box-shadow: 0 2px 0 var(--rule), 0 8px 24px rgba(0,0,0,0.06);`).
- **No gradients.** Anywhere.
- **Border radius:** `0px` default; `2px` for buttons, inputs, badges,
  code blocks. Never more than `4px`.
- **Borders:** 1px solid `var(--rule)` for content dividers; 1px solid
  `var(--rule-strong)` for form inputs and section boundaries.
- **No decorative icons.** Icons are utility only (arrows in
  breadcrumbs, ✓/×/! marks in alerts, `↗` for external links). Don't add
  icons just to make things look "designed."

---

## Layout patterns

### Page wrapper

```html
<div class="page">           <!-- max-width 1240px, centered -->
  <div class="top-row">…</div> <!-- brand + auth link -->
  <nav class="breadcrumb">…</nav>
  <main>…</main>
  <footer class="site">…</footer>
</div>
```

### Topbar (sticky) — REFERENCE SITE ONLY

The dark sticky bar with palette rows + page tabs is **not** a kit
pattern; it's scaffolding injected by `assets/reference.js` so you can
browse the reference site. See "What is NOT part of the kit" above. Do
not put it in a real project. A project's own top navigation, if any,
uses breadcrumbs or a `.top-row` brand+action bar.

### Article + sidebar

`grid-template-columns: 1fr 280px` with `gap: var(--space-7)`. Sidebar
contains metadata, actions, identity strips — not a navigation panel.

### Section nav (settings/components)

`grid-template-columns: 200px 1fr` with sticky left nav. On mobile
(≤980px) the nav collapses to a horizontal scroll-tab bar at top with
bottom-underline active indicator.

---

## Component conventions

See `references/web/components.html` for canonical examples of every
component. Key rules:

- **Buttons:** `.btn` primary (accent fill), `.btn.secondary` (outlined),
  `.btn.danger` (transparent, turns red on hover).
- **Forms:** label above input on narrow screens (`.field` with grid
  `200px 1fr` desktop, `1fr` mobile).
- **Tables:** `.data` class, mono font, hover row tint, wrap in
  `.data-scroll` for mobile horizontal scroll.
- **Cards:** 1px border, `var(--bg)` background, no shadow.
- **Modals:** `.modal-mock` for the static version; use
  inline-positioned with `box-shadow` listed above. Centered, max 420px.
- **Alerts:** 3px colored left border, severity from `--syn-*` tokens.
- **Tabs:** flat row with bottom-underline accent on active.
- **Accordion:** native `<details>` with `summary::after` content
  `"+"`/`"−"`. No JS.

---

## Density philosophy

Information density is high; ornamental decoration is zero. The page
should feel like a well-set publication, not a sparse landing. That
means:

- Tighter line-heights than typical (1.55 for body)
- Lots of inline syntax tokens in prose
- Tables and lists pack closely
- Whitespace is **between sections**, not inside elements
- One accent color, used sparingly but consistently

---

## Anti-patterns

These are always wrong:

- ❌ Drop shadows for elevation (except the one modal exception)
- ❌ Rounded corners > 4px
- ❌ Gradients
- ❌ Decorative icons (lucide / heroicons spam)
- ❌ Multiple accent colors in one project
- ❌ Sans-serif inside code blocks
- ❌ Mono for body prose (outside specific page types)
- ❌ Card grids when an article layout works
- ❌ "Hero" sections with oversized type
- ❌ Centered body text
- ❌ Emoji as UI decoration

---

## Implementation in a new project

The single source of truth for a correct page is
`references/web/_starter.html`. Copy it and fill in your content.

Minimum viable adoption:

1. Copy **only** `references/web/assets/theme.css` into your project.
   (Not `styles.css`, not `reference.js` — those are reference-site only.)
2. Each page:
   ```html
   <link rel="stylesheet" href="assets/theme.css">
   <body>
     <div class="page">
       <!-- your content -->
     </div>
   </body>
   ```
   No body class, no topbar, no switcher, no JS. `theme.css` is M2 light by
   default and switches to M2 dark automatically when the OS prefers dark.
   To pin a mode, set `<html data-theme="dark">` or `data-theme="light"`.
3. Use the existing component classes — buttons, alerts, cards, etc.
4. Look at `references/web/components.html` for any pattern; copy markup
   (but never the `<nav class="topbar">` slot).

For more elaborate setups, design tokens are in `tokens/*.json`:
- `tokens/palettes.json` — all palette values + the `primary` field
- `tokens/typography.json` — type scale + stacks
- `tokens/spacing.json` — spacing scale

---

## References

The reference pages in `references/web/` are the canonical examples of
the system in use:

- **index.html** — hub: visual landing card grid
- **log.html** — timeline + metadata sidebar + code blocks
- **dashboard.html** — KPI tiles + bar chart + status breakdown + activity table
- **reader.html** — long-form article + sticky TOC + tables + blockquotes
- **chat.html** — list + threaded messages + composer + tool calls
- **charts.html** — line / bar / area / donut / sparkline / scatter / heatmap (SVG)
- **game.html** — text-adventure HUD with location bar + scene + side panel
- **components.html** — every atomic component with variants
- **signin.html** — centered auth card pattern
- **notfound.html** — 404 + three empty-state mini patterns
- **settings.html** — section nav + fields + toggles + table + danger zone
