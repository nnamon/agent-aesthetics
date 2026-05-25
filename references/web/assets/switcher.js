// agent-aesthetics — topbar (page nav + palette switcher)
// each page includes <nav class="topbar" id="topbar"></nav> in its body.
// this script fills it and wires the palette switcher.

(function () {
  const VALID = ['m1','m2','m3','m4','m5','m6'];
  const DEFAULT_P = 'm2';
  const STORAGE_KEY = 'aa-palette';

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

  const PALETTES = [
    { id: 'm1', label: 'M1 · Original' },
    { id: 'm2', label: 'M2 · Harmonized' },
    { id: 'm3', label: 'M3 · Hot' },
    { id: 'm4', label: 'M4 · Wine' },
    { id: 'm5', label: 'M5 · + Cyan' },
    { id: 'm6', label: 'M6 · Tinted' },
  ];

  function currentPage() {
    return (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  }

  function applyPalette(p) {
    if (!VALID.includes(p)) p = DEFAULT_P;
    document.body.className = 'palette-' + p;
    document.querySelectorAll('.topbar button[data-p]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.p === p);
    });
    try { localStorage.setItem(STORAGE_KEY, p); } catch (e) {}
    const url = new URL(location.href);
    url.searchParams.set('p', p);
    history.replaceState(null, '', url);
  }

  function getInitialPalette() {
    const params = new URL(location.href).searchParams;
    let initial = params.get('p');
    if (!initial || !VALID.includes(initial)) {
      try { initial = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    }
    if (!VALID.includes(initial)) initial = DEFAULT_P;
    return initial;
  }

  function buildTopbar() {
    const slot = document.getElementById('topbar');
    if (!slot) return;
    const here = currentPage();

    const pagesHtml = PAGES.map(function (p) {
      const active = p.href.toLowerCase() === here ? ' active' : '';
      return '<a class="tab' + active + '" href="' + p.href + '">' + p.label + '</a>';
    }).join('');

    const paletteHtml = PALETTES.map(function (p) {
      return '<button data-p="' + p.id + '" title="' + p.label + '">' + p.label + '</button>';
    }).join('');

    slot.innerHTML =
      '<div class="topbar-row primary">' +
        '<a class="brand" href="index.html">agent-aesthetics</a>' +
        '<div class="pagenav">' + pagesHtml + '</div>' +
      '</div>' +
      '<div class="topbar-row palette">' +
        '<span class="label">Palette</span>' +
        paletteHtml +
      '</div>';

    slot.querySelectorAll('button[data-p]').forEach(function (btn) {
      btn.addEventListener('click', function () { applyPalette(btn.dataset.p); });
    });
  }

  function init() {
    buildTopbar();
    applyPalette(getInitialPalette());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
