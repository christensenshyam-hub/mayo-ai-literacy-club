/* Mayo AI Literacy Club: small page script for the redesigned homepage.
   Loaded as /next.js?v=2 after /script.js, which owns the menu (open/close,
   Escape, aria-expanded, closing at 1000px and up). This adds two things,
   and the page works the same without either:
   1. While the phone menu is open, <main> and the footer are `inert`, so a
      screen reader's reading cursor and Tab stay in the Deep Forest panel
      instead of wandering into the page it covers.
   2. If focus still leaves the open menu (Shift+Tab back to the skip link,
      or a browser without `inert`), the menu closes, so focus is never
      hidden behind the panel. */
(function () {
  'use strict';
  var header = document.querySelector('.site-header');
  var toggle = header && header.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!header || !toggle || !nav) return;

  var covered = [document.getElementById('main'), document.querySelector('.ft')];
  function syncInert() {
    var open = nav.classList.contains('is-open');
    covered.forEach(function (el) {
      if (!el) return;
      if (open) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
  }
  if (window.MutationObserver) {
    new MutationObserver(syncInert).observe(nav, { attributes: true, attributeFilter: ['class'] });
  }

  header.addEventListener('focusout', function (e) {
    if (!nav.classList.contains('is-open')) return;
    var next = e.relatedTarget;
    if (next && header.contains(next)) return;
    if (!next) return; // focus went to the window or the browser: leave it open
    toggle.click();    // script.js closes it and resets the label
  });
})();
