/* Mayo AI Literacy Club: the one site script. Loaded as /script.js?v=7 by
   every page (bump the number on every change, on every page at once).
   No dependencies. Every page works without it: the HTML carries static
   fallback text, and this file only replaces that text once the JSON has
   loaded. It never hides content that is already on the page.
   (next.js, the homepage first pass's extra file, and learn-review.js, the
   Review's helpers, are merged in here.)

   Public API (window.mayo) for page scripts:
     mayo.fetch(path)                  -> Promise of parsed JSON (same as window.mayoFetch)
     mayo.parseDate(str)               -> Date at local midnight, from "2026-03-19" or "March 19, 2026"
     mayo.formatDate(date, style)      -> "long": "Thursday, March 19, 2026" | "medium": "March 19, 2026"
     mayo.isoDate(date)                -> "2026-03-19"
     mayo.timeEl(str)                  -> <time datetime="2026-03-19">March 19, 2026</time> (or plain text)
     mayo.postUrl(post)                -> "/blog-anthropic-pentagon.html" or "/blog-post?id=<id>"
     mayo.CUSTOM_URLS                  -> posts with their own page instead of /blog-post?id=
     mayo.byDate(posts)                -> a sorted copy, newest first; posts with the same date keep their JSON order
     mayo.firstSentence(text)          -> the first sentence of a summary
     mayo.sentenceCase(text)           -> "Meeting Recap" -> "Meeting recap" (all-caps words such as "AI" kept)
     mayo.upcoming(eventsData)         -> upcoming[] with a date of today or later, soonest first
     mayo.past(eventsData)             -> past[] plus any upcoming[] whose date has gone by, newest first
     mayo.localUrl(url)                -> "https://mayoailiteracy.com/blog-post.html?id=x" -> "/blog-post?id=x"
     mayo.el(tag, attrs, children)     -> small DOM builder (text is always set as text, never HTML)
     mayo.dots(parts)                  -> <span class="dots"><span>A</span> <span>· B</span></span>
     mayo.seps(parts)                  -> the same as mayo.dots (the old name; kept for page scripts)
     mayo.story(post, opts)            -> one Story <article> for a blog-content.json post
     mayo.reviewStory(post, opts)      -> the same Story with its byline row first (story--byline-first,
                                          The Review); opts as story, plus lead: true and titleId: 'x'
     mayo.readLabel(post)              -> "Read the recap" | "Read the announcement" | "Read the essay"
     mayo.writers(posts)               -> each author once, in the order given
     mayo.andList(names)               -> "A, B and C"
     mayo.renderLatestWriting(root, posts, opts)
     mayo.renderSchedule(eventsData)

   Auto-render hooks (put them in the HTML with static fallback inside):
     [data-render="latest-writing"]    featured Story + a story list, from /blog-content.json
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

  /* ---- Phone menu ----
     Below 1000px the nav is a Deep Forest panel under the header. The
     Menu button owns aria-expanded; Escape closes the panel and returns
     focus to the button; following a link closes it; so does widening the
     window to 1000px. Without JS (html:not(.js)) the list shows inline.
     While it is open, <main> and the footer are `inert`, so a screen
     reader's reading cursor and Tab stay in the panel instead of wandering
     into the page it covers. If focus still leaves the open panel (Shift+Tab
     back to the skip link, Tab past Join through the browser's own UI and
     back to the skip link, or a browser without `inert`), it closes, so
     focus is never hidden behind it and "Skip to content" works. */
  var header = doc.querySelector('.site-header');
  var toggle = header && header.querySelector('.nav-toggle');
  var nav = doc.getElementById('site-nav');

  if (toggle && nav) {
    var covered = [doc.getElementById('main'), doc.querySelector('.ft')];
    var setOpen = function (open, returnFocus) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
      covered.forEach(function (node) {
        if (!node) return;
        if (open) node.setAttribute('inert', '');
        else node.removeAttribute('inert');
      });
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
    header.addEventListener('focusout', function (e) {
      if (!nav.classList.contains('is-open')) return;
      var next = e.relatedTarget;
      if (!next) return;                    // focus went to the window or the browser: leave it open
      if (header.contains(next)) return;
      setOpen(false, false);
    });
    // Focus that returns from the browser's UI has no relatedTarget above, and
    // landing on the skip link (outside the header) fires no header focusout.
    doc.addEventListener('focusin', function (e) {
      if (nav.classList.contains('is-open') && !header.contains(e.target)) setOpen(false, false);
    });
    if (window.matchMedia) {
      var wide = window.matchMedia('(min-width: 1000px)');
      var onWide = function () { if (wide.matches) setOpen(false, false); };
      if (wide.addEventListener) wide.addEventListener('change', onWide);
      else if (wide.addListener) wide.addListener(onWide);
    }
  }

  /* ---- aria-current fallback ----
     Pages set aria-current="page" in their HTML (docs/shell.md). This only
     fills it in when a page forgot, matching /about and /about.html alike. */
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
  // Labels are sentence case (docs/design-system.md). The JSON's categories
  // are title case ("Meeting Recap"); words in capitals ("AI") are kept.
  function sentenceCase(text) {
    return String(text || '').split(' ').map(function (w, i) {
      if (i === 0 || /^[A-Z0-9&]{2,}$/.test(w)) return w;
      return w.toLowerCase();
    }).join(' ');
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
  // A middot list (styles.css, .dots): each part kept whole, and each dot
  // is text INSIDE the part it introduces, so a line can only break before
  // a dot and a dot never ends a line. A part may be a string, a node, or
  // an array of both. Empty parts are dropped.
  function dots(parts) {
    var kids = [];
    [].concat(parts).forEach(function (part) {
      if (part === null || part === undefined || part === '') return;
      if (kids.length) kids.push(' ');
      kids.push(el('span', null, kids.length ? ['· '].concat(part) : part));
    });
    return el('span', { class: 'dots' }, kids);
  }

  /* ---- Story: one blog-content.json post, in the Story anatomy ----
     eyebrow (kind · The AI Literacy Review) -> linked title -> byline
     (By name · date; no role, because the JSON doesn't verify one) ->
     standfirst (the published summary) -> optional text link.
     opts: heading ('h3' default, or 'h2'), summary ('full' default, 'first'
     for its first sentence, or 'none'), more (link text, e.g. 'Read the
     recap'), featured (true adds story--featured).
       <article class="story">
         <p class="label story__eyebrow"><span class="dots"><span>Meeting recap</span> <span>· The AI Literacy Review</span></span></p>
         <h3 class="story__title"><a href="/blog-post?id=…">Title</a></h3>
         <p class="story__byline"><span class="dots"><span>By <span class="who">Name</span></span> <span>· <time …>March 19, 2026</time></span></span></p>
         <p class="story__stand">Summary.</p>
         <p class="story__more"><a class="tlink" href="…">Read the recap<span class="arrow" aria-hidden="true"> →</span></a></p>
       </article> */
  function story(post, opts) {
    opts = opts || {};
    var url = postUrl(post);
    var summary = opts.summary === 'none' ? '' :
      opts.summary === 'first' ? firstSentence(post.summary) : (post.summary || '');
    return el('article', { class: 'story' + (opts.featured ? ' story--featured' : '') }, [
      el('p', { class: 'label story__eyebrow' }, dots([post.category ? sentenceCase(post.category) : null, 'The AI Literacy Review'])),
      el(opts.heading || 'h3', { class: 'story__title' }, el('a', { href: url }, post.title)),
      el('p', { class: 'story__byline' }, dots([
        post.author ? ['By ', el('span', { class: 'who' }, post.author)] : null,
        post.date ? timeEl(post.date) : null
      ])),
      summary ? el('p', { class: 'story__stand' }, summary) : null,
      opts.more ? el('p', { class: 'story__more' }, el('a', { class: 'tlink', href: url }, [
        opts.more, el('span', { class: 'arrow', 'aria-hidden': 'true' }, ' →')
      ])) : null
    ]);
  }

  /* ---- Latest writing: a featured Story, then a story list ----
     Posts are sorted newest first (byDate) before the lead is picked.
     opts: more (how many after the lead, default 2), heading ('h3'). */
  function renderLatestWriting(root, posts, opts) {
    opts = opts || {};
    var more = opts.more === undefined ? 2 : opts.more;
    var heading = opts.headingTag || opts.heading || 'h3';
    if (!root || !Array.isArray(posts)) return;
    posts = byDate(posts.filter(function (p) { return p && p.id && p.title; }));
    if (!posts.length) return;
    while (root.firstChild) root.removeChild(root.firstChild);
    root.appendChild(story(posts[0], { heading: heading, featured: true, summary: 'first' }));
    if (more > 0 && posts.length > 1) {
      root.appendChild(el('ol', { class: 'story-list' }, posts.slice(1, 1 + more).map(function (p) {
        return el('li', null, story(p, { heading: heading, summary: 'none' }));
      })));
    }
  }

  /* ---- The Review: a Story with the byline first ----
     The Creative Independent's author-first order: the byline row moves
     above the eyebrow and title, in the reading order too, and the article
     gets story--byline-first (styles.css section 12). opts as story(), plus
     lead: true (the Review's lead piece: story--featured story--lead) and
     titleId (an id on the title, for aria-labelledby). On The Review the
     page itself is the source, so the eyebrow keeps only the kind ("Meeting
     recap"), unless the piece has no kind. */
  function reviewStory(post, opts) {
    opts = opts || {};
    var article = story(post, {
      heading: opts.heading,
      summary: opts.summary,
      more: opts.more,
      featured: !!(opts.featured || opts.lead)
    });
    var byline = article.querySelector('.story__byline');
    if (byline) article.insertBefore(byline, article.firstChild);
    var parts = article.querySelectorAll('.story__eyebrow .dots > span');
    var source = parts.length > 1 ? parts[parts.length - 1] : null;
    if (source && /AI Literacy Review/.test(source.textContent)) {
      if (source.previousSibling && source.previousSibling.nodeType === 3) source.parentNode.removeChild(source.previousSibling);
      source.parentNode.removeChild(source);
    }
    article.classList.add('story--byline-first');
    if (opts.lead) article.classList.add('story--lead');
    if (opts.titleId) {
      var title = article.querySelector('.story__title');
      if (title) title.id = opts.titleId;
    }
    return article;
  }

  /* The text of a piece's one link, from its category. */
  function readLabel(post) {
    var kind = String((post && post.category) || '').toLowerCase();
    if (kind.indexOf('recap') >= 0) return 'Read the recap';
    if (kind.indexOf('announcement') >= 0) return 'Read the announcement';
    return 'Read the essay';
  }

  /* Each author once, in the order given. */
  function writers(posts) {
    var seen = {};
    var out = [];
    (posts || []).forEach(function (p) {
      var name = p && typeof p.author === 'string' ? p.author.trim() : '';
      if (name && !seen[name]) { seen[name] = true; out.push(name); }
    });
    return out;
  }

  /* "A, B and C" */
  function andList(names) {
    names = (names || []).filter(Boolean);
    if (names.length < 2) return names.join('');
    return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
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
      node.appendChild(el('span', { class: 'label' }, 'Next'));
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
    timeEl: timeEl,
    postUrl: postUrl,
    byDate: byDate,
    CUSTOM_URLS: CUSTOM_URLS,
    firstSentence: firstSentence,
    sentenceCase: sentenceCase,
    upcoming: upcoming,
    past: past,
    localUrl: localUrl,
    el: el,
    dots: dots,
    seps: dots,
    story: story,
    reviewStory: reviewStory,
    readLabel: readLabel,
    writers: writers,
    andList: andList,
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
