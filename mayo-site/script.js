/* Mayo AI Literacy Club: shared site script. Loaded as /script.js?v=4.
   No dependencies. Every page works without it: the HTML carries static
   fallback text, and this file only replaces that text once the JSON
   has loaded. It never hides content that is already on the page.

   Public API (window.mayo) for page scripts:
     mayo.fetch(path)                  -> Promise of parsed JSON (same as window.mayoFetch)
     mayo.parseDate(str)               -> Date at local midnight, from "2026-03-19" or "March 19, 2026"
     mayo.formatDate(date, style)      -> "long": "Thursday, March 19, 2026" | "medium": "March 19, 2026"
     mayo.isoDate(date)                -> "2026-03-19"
     mayo.postUrl(post)                -> "/blog-anthropic-pentagon.html" or "/blog-post?id=<id>"
     mayo.byDate(posts)                -> a sorted copy, newest first; posts with the same date keep their JSON order
     mayo.firstSentence(text)          -> the first sentence of a summary
     mayo.upcoming(eventsData)         -> upcoming[] with a date of today or later, soonest first
     mayo.past(eventsData)             -> past[] plus any upcoming[] whose date has gone by, newest first
     mayo.localUrl(url)                -> "https://mayoailiteracy.com/blog-post.html?id=x" -> "/blog-post?id=x"
     mayo.el(tag, attrs, children)     -> small DOM builder (text is always set as text, never HTML)
     mayo.seps(parts)                  -> <span class="seps"> for a dotted label: "Author · March 19, 2026" (styles.css §2)
     mayo.renderLatestWriting(root, posts, opts)
     mayo.renderSchedule(eventsData)

   Auto-render hooks (put them in the HTML with static fallback inside):
     [data-render="latest-writing"]    lead post + next two, from /blog-content.json
     [data-schedule="time|location|day|weekday|weekdays|this-day|openTo"]
                                       text filled from events-data.json "schedule"
     [data-render="next-meeting"]      starts hidden; shown only if a future upcoming[] entry exists */

(function () {
  'use strict';

  var doc = document;

  /* ---- Shared JSON fetch ----
     The same files the Mercurius backend reads hourly. Keep their paths. */
  function mayoFetch(file) {
    return fetch(file, { headers: { Accept: 'application/json' } }).then(function (r) {
      if (!r.ok) throw new Error(file + ': ' + r.status);
      return r.json();
    });
  }
  window.mayoFetch = mayoFetch;

  // Old page scripts call this after rendering. The fade-in effect is gone,
  // so it does nothing. Remove once no page calls it.
  window.observeFadeIns = function () {};

  /* ---- Mobile nav ---- */
  var toggle = doc.querySelector('.site-header .nav-toggle');
  var nav = doc.getElementById('site-nav');

  if (toggle && nav) {
    var setOpen = function (open, returnFocus) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
      if (!open && returnFocus) toggle.focus();
    };
    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'), false);
    });
    doc.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && nav.classList.contains('is-open')) setOpen(false, true);
    });
    Array.prototype.forEach.call(nav.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function () { setOpen(false, false); });
    });
    if (window.matchMedia) {
      var wide = window.matchMedia('(min-width: 1000px)');
      var onWide = function () { if (wide.matches) setOpen(false, false); };
      if (wide.addEventListener) wide.addEventListener('change', onWide);
      else if (wide.addListener) wide.addListener(onWide);
    }
  }

  // Legacy shim: blog-anthropic-pentagon.html keeps its own .navbar markup.
  var legacyToggle = doc.querySelector('.navbar .nav-toggle');
  var legacyLinks = doc.querySelector('.navbar .nav-links');
  if (legacyToggle && legacyLinks) {
    legacyToggle.addEventListener('click', function () { legacyLinks.classList.toggle('active'); });
  }

  /* ---- aria-current fallback ----
     Pages set aria-current="page" in their HTML. This only fills it in
     when a page forgot, matching /about and /about.html alike. */
  var mainNav = doc.querySelector('.site-nav');
  if (mainNav && !mainNav.querySelector('[aria-current]')) {
    var here = (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '') || 'index';
    Array.prototype.forEach.call(mainNav.querySelectorAll('a'), function (a) {
      var target = (a.getAttribute('href') || '').replace(/^\//, '').split('#')[0].split('?')[0].replace(/\.html$/, '') || 'index';
      if (target === here) a.setAttribute('aria-current', 'page');
    });
  }

  /* ---- Footer year ---- */
  var yearEl = doc.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- Dates ---- */
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function parseDate(s) {
    if (!s || typeof s !== 'string') return null;
    var m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    m = s.match(/^([A-Za-z]+)\.?\s+(\d{1,2}),\s*(\d{4})$/);
    if (m) {
      var name = m[1].toLowerCase();
      for (var i = 0; i < 12; i++) {
        if (MONTHS[i].toLowerCase().indexOf(name.slice(0, 3)) === 0) return new Date(+m[3], i, +m[2]);
      }
    }
    return null;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function isoDate(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function formatDate(d, style) {
    if (!d) return '';
    var medium = MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    return style === 'long' ? DAYS[d.getDay()] + ', ' + medium : medium;
  }
  function today() {
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }

  /* ---- Blog helpers ---- */
  // Posts that have their own page instead of the /blog-post?id= renderer.
  var CUSTOM_URLS = { 'anthropic-pentagon-fallout': '/blog-anthropic-pentagon.html' };

  function postUrl(post) {
    return CUSTOM_URLS[post.id] || '/blog-post?id=' + encodeURIComponent(post.id);
  }
  // Newest first. Posts with the same date keep their order in the JSON,
  // so the file's order breaks ties. Used by home, /blog and each post page.
  function byDate(posts) {
    return (posts || []).map(function (p, i) { return { p: p, i: i, d: parseDate(p && p.date) }; })
      .sort(function (a, b) {
        var da = a.d ? a.d.getTime() : -Infinity, db = b.d ? b.d.getTime() : -Infinity;
        return db !== da ? db - da : a.i - b.i;
      })
      .map(function (x) { return x.p; });
  }
  function firstSentence(text) {
    if (!text) return '';
    var m = String(text).match(/^.*?[.!?](?=\s+[A-Z"“]|\s*$)/);
    return (m ? m[0] : String(text)).trim();
  }

  /* ---- Tiny DOM builder: el('p', {class: 'label'}, ['text', node]) ---- */
  function el(tag, attrs, children) {
    var node = doc.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (attrs[k] === null || attrs[k] === undefined || attrs[k] === false) return;
        if (k === 'class') node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    [].concat(children === undefined ? [] : children).forEach(function (c) {
      if (c === null || c === undefined || c === '') return;
      node.appendChild(typeof c === 'string' ? doc.createTextNode(c) : c);
    });
    return node;
  }
  function timeEl(dateStr) {
    var d = parseDate(dateStr);
    return d ? el('time', { datetime: isoDate(d) }, formatDate(d, 'medium')) : doc.createTextNode(dateStr || '');
  }
  // The parts of a dotted label, each kept whole. Empty parts are dropped.
  // Spaces between the parts keep the text readable without CSS.
  function seps(parts) {
    var kids = [];
    [].concat(parts).forEach(function (part) {
      if (part === null || part === undefined || part === '') return;
      if (kids.length) kids.push(' ');
      kids.push(el('span', null, part));
    });
    return el('span', { class: 'seps' }, kids);
  }

  /* ---- Latest writing: lead post + a ruled list of the next posts ----
     Posts are sorted newest first (byDate) before the lead is picked.
     Markup it produces (the static fallback in the HTML should match it):
       <article class="lead-post">
         <p class="label label--forest"><span class="seps"><span>Category</span> <span><time>March 19, 2026</time></span></span></p>
         <h3><a href="…">Title</a></h3>
         <p class="deck">First sentence of the summary.</p>
         <p class="label byline">By Author</p>
       </article>
       <ul class="post-list"><li><h3><a>Title</a></h3>
         <p class="label"><span class="seps"><span>Author</span> <span><time>…</time></span></span></p></li>…</ul> */
  function renderLatestWriting(root, posts, opts) {
    opts = opts || {};
    var more = opts.more === undefined ? 2 : opts.more;
    var headingTag = opts.headingTag || 'h3';
    if (!root || !Array.isArray(posts)) return;
    posts = byDate(posts.filter(function (p) { return p && p.id && p.title; }));
    if (!posts.length) return;
    var lead = posts[0];
    var article = el('article', { class: 'lead-post' }, [
      el('p', { class: 'label label--forest' }, seps([lead.category, timeEl(lead.date)])),
      el(headingTag, null, el('a', { href: postUrl(lead) }, lead.title)),
      lead.summary ? el('p', { class: 'deck' }, firstSentence(lead.summary)) : null,
      lead.author ? el('p', { class: 'label byline' }, 'By ' + lead.author) : null
    ]);
    var list = el('ul', { class: 'post-list' }, posts.slice(1, 1 + more).map(function (p) {
      return el('li', null, [
        el(headingTag, null, el('a', { href: postUrl(p) }, p.title)),
        el('p', { class: 'label' }, seps([p.author, timeEl(p.date)]))
      ]);
    }));
    while (root.firstChild) root.removeChild(root.firstChild);
    root.appendChild(article);
    if (more > 0) root.appendChild(list);
  }

  /* ---- Meeting schedule ---- */
  function upcoming(data) {
    var t = today();
    return ((data && data.upcoming) || []).filter(function (e) {
      var d = parseDate(e.date);
      return d && d >= t;
    }).sort(function (a, b) { return parseDate(a.date) - parseDate(b.date); });
  }

  function past(data) {
    var t = today();
    var expired = ((data && data.upcoming) || []).filter(function (e) {
      var d = parseDate(e.date);
      return d && d < t;
    });
    return ((data && data.past) || []).concat(expired).slice().sort(function (a, b) {
      var da = parseDate(a.date), db = parseDate(b.date);
      return (db ? db.getTime() : 0) - (da ? da.getTime() : 0);
    });
  }

  // Links stored in the JSON point at the live domain; keep visitors on
  // whichever host they are on, and use the clean URL for the post renderer.
  function localUrl(url) {
    if (!url) return '';
    return String(url)
      .replace(/^https?:\/\/(www\.)?mayoailiteracy\.com/i, '')
      .replace(/^\/blog-post\.html(?=[?#]|$)/, '/blog-post') || '/';
  }

  function renderSchedule(data) {
    var s = (data && data.schedule) || {};
    var weekday = (s.day || '').replace(/^every\s+/i, '').trim();   // "Thursday"
    var values = {
      time: s.time,
      location: s.location,
      day: s.day,
      weekday: weekday,
      weekdays: weekday ? weekday + 's' : '',
      'this-day': weekday ? 'This ' + weekday : '',
      openTo: s.openTo
    };
    Array.prototype.forEach.call(doc.querySelectorAll('[data-schedule]'), function (node) {
      var v = values[node.getAttribute('data-schedule')];
      if (typeof v === 'string' && v.trim()) node.textContent = v.trim();
    });

    var next = upcoming(data)[0];
    Array.prototype.forEach.call(doc.querySelectorAll('[data-render="next-meeting"]'), function (node) {
      if (!next || !next.title) { node.hidden = true; return; }
      var d = parseDate(next.date);
      while (node.firstChild) node.removeChild(node.firstChild);
      node.appendChild(el('span', { class: 'label label--forest' }, 'Next'));
      node.appendChild(doc.createTextNode(' '));
      node.appendChild(el('strong', null, next.title));
      if (d) {
        node.appendChild(doc.createTextNode(', '));
        node.appendChild(el('time', { datetime: isoDate(d) }, formatDate(d, 'long')));
      }
      node.hidden = false;
    });
  }

  window.mayo = {
    fetch: mayoFetch,
    parseDate: parseDate,
    formatDate: formatDate,
    isoDate: isoDate,
    postUrl: postUrl,
    byDate: byDate,
    CUSTOM_URLS: CUSTOM_URLS,
    firstSentence: firstSentence,
    upcoming: upcoming,
    past: past,
    localUrl: localUrl,
    el: el,
    seps: seps,
    renderLatestWriting: renderLatestWriting,
    renderSchedule: renderSchedule
  };

  /* ---- Auto-render ---- */
  if (!window.fetch) return;

  var writing = doc.querySelector('[data-render="latest-writing"]');
  if (writing) {
    mayoFetch('/blog-content.json')
      .then(function (posts) { renderLatestWriting(writing, posts); })
      .catch(function () { /* keep the static fallback */ });
  }

  if (doc.querySelector('[data-schedule], [data-render="next-meeting"]')) {
    mayoFetch('/events-data.json')
      .then(renderSchedule)
      .catch(function () { /* keep the static fallback */ });
  }
})();
