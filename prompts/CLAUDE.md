# Building with agent-aesthetics

You're about to generate UI for a project that uses this kit. Read
`AESTHETIC.md` before doing anything visual. When AESTHETIC.md and the
files in `references/web/` disagree, the reference files win.

## What this kit is

A specific, opinionated design language called "soft-brutalist-document."
It's not a flexible system to be customized per project — it's a fixed
visual identity to use as-is. The user has chosen this look for every
project they build, and consistency across projects is the whole point.

## Defaults you should not change without a reason

- **Primary palette: M2 Magenta.** Light is the default; dark (M2D) is
  auto-selected for users with `prefers-color-scheme: dark`. Don't pick
  another palette unless the project explicitly says so.
- **Two type families always present:** system sans + monospace. Never
  use sans for code; rarely use mono for body prose.
- **One accent color per project.** M2's is `#DB2777` (light) /
  `#EC4899` (dark). Don't add more.
- **No drop shadows** (modals are the only exception).
- **No rounded corners > 4px.** Buttons/inputs use 2px radius.
- **No decorative icons.** Icons are utility only.

## CRITICAL: what NOT to copy

The reference pages render a dark sticky **topbar** with "Light"/"Dark"
palette rows and a row of page tabs (Log, Dashboard, Reader, …). **That
bar is reference-site scaffolding, not part of the design.** It is
injected by `assets/reference.js` into the
`<nav class="topbar" id="topbar" data-reference-only>` slot, and it
exists only so a human can browse and compare the reference site.

When you adopt the kit into a real project:
- ❌ NEVER copy `assets/reference.js`.
- ❌ NEVER add `<nav class="topbar" id="topbar">`.
- ❌ NEVER reproduce the palette rows or the page-tab row.

If you find yourself copying a top bar with palette/page switchers, stop
— you're copying the harness, not the design.

## How to use the kit in a new project

The correct minimal page is `references/web/_starter.html`. Copy it.

1. Copy **only** `references/web/assets/theme.css` into your project's
   assets folder. That single self-contained file IS the kit. Do NOT copy
   `styles.css` (reference-site multi-palette + topbar) or `reference.js`.
2. Each page:
   ```html
   <link rel="stylesheet" href="assets/theme.css">
   <body>
     <div class="page">
       <!-- page content -->
     </div>
   </body>
   ```
   No body class, no topbar, no switcher, no JS. `theme.css` ships M2:
   light by default, dark automatically when the OS prefers dark. To pin a
   mode regardless of OS, set `<html data-theme="dark">` or `="light"`.
3. Use existing component classes (`.btn`, `.card`, `.alert`, `.pill`,
   `.codeblock`, etc.). Don't reinvent them — copy the markup from
   `references/web/components.html`, but never the `topbar` slot.

For frameworks that compile CSS-in-JS or generate stylesheets, pull
values from `tokens/palettes.json` (semantic CSS variable names),
`tokens/typography.json`, `tokens/spacing.json`. The variable names
are the contract — keep them.

## When the user asks you to build a new page

1. Look at the closest existing reference page first
   (`references/web/{log,dashboard,reader,chat,charts,components,game,signin,notfound,settings}.html`).
   If your task is a slight variant, copy its skeleton and modify.
2. Use the standard page wrapper:
   ```html
   <div class="page">
     <div class="top-row">…</div>
     <nav class="breadcrumb">…</nav>
     <h1>Page title</h1>
     <!-- content -->
     <footer class="site">…</footer>
   </div>
   ```
3. Default to article layout, not card grid. Default to breadcrumbs, not
   nav bars. Default to inline mono identifiers, not bare prose.
4. Verify mobile (390px), tablet (768px), and desktop (1440px) before
   reporting done. The kit is fully responsive; nothing you write should
   create page-level horizontal overflow.

## What "looks right" looks like

If your page:
- Has the topbar with brand + tabs + palette rows visible
- Uses one accent color consistently
- Has 1px hairline rules (not shadows) separating sections
- Has inline mono identifiers in body prose
- Uses uppercase H2/H3 with letter-spacing
- Renders cleanly at 390px with no horizontal scroll
- Looks identical in geometry between light (M2) and dark (M2D) palettes

…then it's right.

## What's wrong, fix immediately

- The reference `topbar` / palette switcher / page-tab row shipped into
  the project (delete it — it's scaffolding, see above)
- Drop shadows for elevation
- Multiple accent colors
- Gradient buttons or backgrounds
- Rounded corners > 4px
- Lucide/Heroicons/Material icons used decoratively
- Sans-serif inside code blocks
- "Hero" sections with oversized centered type
- Card grids replacing article layouts
- Custom-styled checkboxes or selects (use native)

## Verification

Always start the project's dev server and open the page in a browser
before reporting work complete. Type checks and tests prove correctness
of code, not correctness of design. Look at the actual rendered output.
If you can't open a browser, screenshot via playwright and review the
image yourself; don't just trust the markup.
