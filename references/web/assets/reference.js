// ============================================================================
//  REFERENCE-SITE HARNESS — NOT PART OF THE DESIGN KIT.
//
//  This file powers the reference site only: the palette switcher and the
//  page-nav topbar that let you browse/compare the reference pages.
//
//  >>> DO NOT copy this file (or the topbar) into a real project. <<<
//
//  A real project needs only `assets/styles.css` and a `palette-m2` body
//  class. See `references/web/_starter.html` for the correct minimal page,
//  and AESTHETIC.md → "What is NOT part of the kit".
// ============================================================================
//
// Mechanics: each reference page has <nav class="topbar" id="topbar"></nav>;
// this script fills it and wires interactions. Palette + collapsed state
// persist across pages via localStorage.

(function () {
  const PAGES = [
    { href: 'log.html',        label: 'Log' },
    { href: 'dashboard.html',  label: 'Dashboard' },
    { href: 'reader.html',     label: 'Reader' },
    { href: 'chat.html',       label: 'Chat' },
    { href: 'charts.html',     label: 'Charts' },
    { href: 'components.html', label: 'Components' },
    { href: 'game.html',       label: 'Game' },
    { href: 'signin.html',     label: 'Sign in' },
    { href: 'notfound.html',   label: '404' },
    { href: 'settings.html',   label: 'Settings' },
  ];

  const PALETTES_LIGHT = [
    { id: 'm2', label: 'M2 Magenta' },
    { id: 's1', label: 'S1 Sky' },
    { id: 's2', label: 'S2 Indigo' },
    { id: 's3', label: 'S3 Lime' },
    { id: 's4', label: 'S4 Teal' },
    { id: 's5', label: 'S5 Violet' },
    { id: 's6', label: 'S6 Emerald' },
    { id: 's7', label: 'S7 Slate' },
    { id: 'k1', label: 'K1 Monokai' },
    { id: 'k2', label: 'K2 Solarized' },
    { id: 'k3', label: 'K3 Dracula' },
    { id: 'k4', label: 'K4 Nord' },
    { id: 'k5', label: 'K5 Tokyo Night' },
  ];
  const PALETTES_DARK = PALETTES_LIGHT.map(function (p) {
    return { id: p.id + 'd', label: p.label };
  });
  const VALID = PALETTES_LIGHT.concat(PALETTES_DARK).map(function (p) { return p.id; });

  const DEFAULT_P = 'm2';
  const PALETTE_KEY = 'aa-palette';
  const COLLAPSED_KEY = 'aa-topbar-collapsed';

  function currentPage() {
    return (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  }

  function applyPalette(p) {
    if (!VALID.includes(p)) p = DEFAULT_P;
    document.body.className = 'palette-' + p +
      (document.body.classList.contains('topbar-collapsed') ? ' topbar-collapsed' : '');
    document.querySelectorAll('.topbar button[data-p]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.p === p);
    });
    try { localStorage.setItem(PALETTE_KEY, p); } catch (e) {}
    const url = new URL(location.href);
    url.searchParams.set('p', p);
    history.replaceState(null, '', url);
  }

  function getInitialPalette() {
    // url query wins for share-links / debugging
    const params = new URL(location.href).searchParams;
    const fromUrl = params.get('p');
    if (fromUrl && VALID.includes(fromUrl)) return fromUrl;
    // user's previous explicit choice wins next
    try {
      const stored = localStorage.getItem(PALETTE_KEY);
      if (stored && VALID.includes(stored)) return stored;
    } catch (e) {}
    // first-time visitor: respect prefers-color-scheme — primary is M2
    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'm2d';
      }
    } catch (e) {}
    return DEFAULT_P;
  }

  function ensureReveal() {
    let reveal = document.getElementById('topbar-reveal');
    if (reveal) return reveal;
    reveal = document.createElement('button');
    reveal.id = 'topbar-reveal';
    reveal.className = 'topbar-reveal';
    reveal.title = 'Show topbar';
    reveal.textContent = '≡ menu';
    reveal.addEventListener('click', function () { setCollapsed(false); });
    document.body.appendChild(reveal);
    return reveal;
  }

  function setCollapsed(v) {
    document.body.classList.toggle('topbar-collapsed', v);
    ensureReveal();
    try { localStorage.setItem(COLLAPSED_KEY, v ? '1' : '0'); } catch (e) {}
  }

  function getInitialCollapsed() {
    try { return localStorage.getItem(COLLAPSED_KEY) === '1'; } catch (e) { return false; }
  }

  function buildTopbar() {
    const slot = document.getElementById('topbar');
    if (!slot) return;
    const here = currentPage();

    const pagesHtml = PAGES.map(function (p) {
      const active = p.href.toLowerCase() === here ? ' active' : '';
      return '<a class="tab' + active + '" href="' + p.href + '">' + p.label + '</a>';
    }).join('');

    function paletteBtns(list) {
      return list.map(function (p) {
        return '<button data-p="' + p.id + '" title="' + p.label + '">' + p.label + '</button>';
      }).join('');
    }

    slot.innerHTML =
      '<div class="topbar-row primary">' +
        '<a class="brand" href="index.html">agent-aesthetics <span class="brand-tag">reference</span></a>' +
        '<div class="pagenav">' + pagesHtml + '</div>' +
        '<button class="topbar-close" title="Hide topbar (Esc)">×</button>' +
      '</div>' +
      '<div class="topbar-row palette">' +
        '<span class="label">Light</span>' +
        paletteBtns(PALETTES_LIGHT) +
      '</div>' +
      '<div class="topbar-row palette">' +
        '<span class="label">Dark</span>' +
        paletteBtns(PALETTES_DARK) +
      '</div>' +
      '<div class="topbar-row note">' +
        'These controls are for browsing this reference site only — ' +
        'they are not part of the design kit. Real pages should not include ' +
        'this bar. Start from <code>_starter.html</code>.' +
      '</div>';

    slot.querySelectorAll('button[data-p]').forEach(function (btn) {
      btn.addEventListener('click', function () { applyPalette(btn.dataset.p); });
    });
    const closeBtn = slot.querySelector('.topbar-close');
    if (closeBtn) closeBtn.addEventListener('click', function () { setCollapsed(true); });
  }

  function attachKeyboard() {
    document.addEventListener('keydown', function (e) {
      // toggle topbar with Esc when not in an input/textarea
      if (e.key === 'Escape') {
        const t = document.activeElement;
        const inField = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
        if (!inField) {
          setCollapsed(!document.body.classList.contains('topbar-collapsed'));
        }
      }
    });
  }

  function init() {
    buildTopbar();
    applyPalette(getInitialPalette());
    setCollapsed(getInitialCollapsed());
    attachKeyboard();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
