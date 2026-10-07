#!/usr/bin/env python3
"""Check that every page carries the same shell (docs/shell.md).

usage: python3 tools/check-shell.py            (from the repo root)

index.html is the reference. For every other mayo-site/*.html page it checks:
  - the head tail (icons, preconnects, the fonts link, /styles.css?v=N and the
    `js` class script) is present, line for line, with the same version;
  - the skip link and <header class="site-header"> block equal the reference
    once aria-current is removed;
  - <footer class="ft"> equals the reference once aria-current is removed;
  - the /script.js?v=N tag is present, with the same version;
  - aria-current="page" marks the right nav item in the header and in the
    footer's Pages list (see CURRENT and FOOTER below), and nothing else;
  - no page loads a retired file (next.css, next.js, the interim
    styles-*.css and learn-review.js), or any stylesheet or script file
    besides the shell's (fonts, /styles.css, /script.js);
  - the head metadata follows docs/shell.md: charset, viewport, theme-color,
    "{Page} — Mayo AI Literacy Club" titles repeated in og:title and
    twitter:title, the description repeated in neither or both og: and
    twitter:, canonical = og:url on the clean URL (none on blog-post.html;
    noindex and no canonical on 404.html), and the shared og/twitter image.
  - no comment in a published file (every mayo-site/*.html, styles.css and
    script.js: Netlify serves them, so View Source shows them) names a Hold
    fact from docs/participation-redesign.md. Comments give content-needs
    numbers instead (HOLD_WORDS below).
blog-anthropic-pentagon.html may also load its article's own fonts link, and
its head (the article's own) is checked for the title and image tags only.
Exits 1 on any finding, 0 when every page matches.
"""
import pathlib
import re
import sys

SITE = pathlib.Path(__file__).resolve().parent.parent / 'mayo-site'

# page -> the href that carries aria-current="page" in the header nav (None: no item)
CURRENT = {
    'index.html': '/', 'about.html': '/about', 'chapters.html': '/chapters', 'topics.html': '/topics',
    'events.html': '/events', 'blog.html': '/blog', 'blog-post.html': '/blog',
    'blog-anthropic-pentagon.html': '/blog', 'mercurius.html': None, 'join.html': '/join', '404.html': None,
}


# page -> the href carrying aria-current="page" in the footer's Pages list (None: no item)
FOOTER = dict(CURRENT, **{'index.html': None, 'mercurius.html': '/mercurius'})
SUFFIX = ' — Mayo AI Literacy Club'
CLEAN = {'index.html': '/', 'blog-anthropic-pentagon.html': '/blog-anthropic-pentagon.html'}
OG_IMAGE = 'https://mayoailiteracy.com/assets/og-image.jpg'
# Words that only appear in Hold material (the Governance Constitution, the unconfirmed
# meetings, the debate's announced date, the year-one totals). Never in a published comment.
HOLD_WORDS = re.compile(r'constitution|quorum|two-thirds|five-member|jeopardy|socratic seminar|'
                        r'sept(?:ember)?\.? 3\b|april 2[89]|\b(?:31|54) (?:total )?(?:meetings|students)\b|'
                        r'\b250 students\b|17\.5 hours', re.I)


def hold_comments(src, css=False):
    """Hold words inside comments: <!-- --> in HTML, /* */ in CSS and JS."""
    pat = r'/\*.*?\*/' if css else r'<!--.*?-->'
    out = []
    for m in re.finditer(pat, src, re.S):
        for w in sorted(set(x.group(0) for x in HOLD_WORDS.finditer(m.group(0)))):
            out.append('comment at line %d names Hold material ("%s")' % (src[:m.start()].count('\n') + 1, w))
    if not css:
        for m in re.finditer(r'<script\b[^>]*>(.*?)</script>', src, re.S):
            for c in re.finditer(r'/\*.*?\*/|//[^\n]*', m.group(1), re.S):
                for w in sorted(set(x.group(0) for x in HOLD_WORDS.finditer(c.group(0)))):
                    out.append('script comment near line %d names Hold material ("%s")' % (src[:m.start(1) + c.start()].count('\n') + 1, w))
    return out


def meta(src, attr, key):
    m = re.search(r'<meta %s="%s" content="([^"]*)"' % (attr, re.escape(key)), src)
    return m.group(1) if m else None


def head_meta(name, src):
    """The metadata pattern in docs/shell.md ("<head>")."""
    out = []
    head = src[:src.find('</head>')]
    title = re.search(r'<title>([^<]*)</title>', head)
    title = title.group(1) if title else ''
    if name == 'index.html':
        if title != 'Mayo AI Literacy Club':
            out.append('title is not "Mayo AI Literacy Club"')
    elif not title.endswith(SUFFIX) or title == SUFFIX:
        out.append('title does not end in "%s"' % SUFFIX.strip())
    for attr, key in (('property', 'og:title'), ('name', 'twitter:title')):
        if meta(head, attr, key) != title:
            out.append('%s differs from <title>' % key)
    for attr, key in (('property', 'og:image'), ('name', 'twitter:image')):
        if meta(head, attr, key) != OG_IMAGE:
            out.append('%s is not the shared og-image.jpg' % key)
    if name == 'blog-anthropic-pentagon.html':
        return out
    for i, line in enumerate(('<meta charset="utf-8" />',
                              '<meta name="viewport" content="width=device-width, initial-scale=1" />',
                              '<meta name="theme-color" content="#122e1e" />')):
        if line not in head:
            out.append('missing %s' % line)
    if not meta(head, 'name', 'description'):
        out.append('no meta description')
    if meta(head, 'property', 'og:description') != meta(head, 'name', 'twitter:description'):
        out.append('og:description and twitter:description differ')
    for attr, key, want in (('property', 'og:type', 'website'), ('property', 'og:site_name', 'Mayo AI Literacy Club'),
                            ('name', 'twitter:card', 'summary_large_image')):
        if meta(head, attr, key) != want:
            out.append('%s is not "%s"' % (key, want))
    canon = re.search(r'<link rel="canonical" href="([^"]*)"', head)
    canon = canon.group(1) if canon else None
    og_url = meta(head, 'property', 'og:url')
    if name == 'blog-post.html':
        if canon or og_url:
            out.append('blog-post.html must have no static canonical or og:url (its script adds one)')
    elif name == '404.html':
        if canon:
            out.append('404.html must have no canonical')
        if meta(head, 'name', 'robots') != 'noindex':
            out.append('404.html must be noindex')
    else:
        want = 'https://mayoailiteracy.com' + CLEAN.get(name, '/' + name[:-5])
        if canon != want:
            out.append('canonical is %s, expected %s' % (canon, want))
        if og_url != want:
            out.append('og:url is %s, expected %s' % (og_url, want))
    return out


def block(src, start, end):
    i = src.find(start)
    if i < 0:
        return None
    j = src.find(end, i)
    return src[i:j + len(end)] if j >= 0 else None


def plain(s):
    return re.sub(r' aria-current="page"', '', s or '')


def head_tail(src):
    m = re.search(r'(  <link rel="icon" href="/favicon\.ico".*?</head>)', src, re.S)
    return m.group(1) if m else None


def main():
    ref = (SITE / 'index.html').read_text(encoding='utf-8')
    ref_head = head_tail(ref)
    ref_header = plain(block(ref, '  <a class="skip-link"', '</header>'))
    ref_footer = plain(block(ref, '<footer class="ft">', '</footer>'))
    ref_script = re.search(r'  <script src="/script\.js\?v=\d+"[^\n]*</script>', ref).group(0)
    problems = []
    for page in sorted(SITE.glob('*.html')):
        name = page.name
        src = page.read_text(encoding='utf-8')
        found = []
        if name == 'blog-anthropic-pentagon.html':
            # The article's own fonts link (and its comment) sit between the shell's fonts link and
            # the stylesheet; compare the shell lines in order, ignoring those.
            got = head_tail(src) or ''
            want = [l for l in ref_head.split('\n') if l.strip()]
            have = [l for l in got.split('\n') if l in want]
            if have != want:
                found.append('head tail differs from index.html')
        elif head_tail(src) != ref_head:
            found.append('head tail differs from index.html')
        if plain(block(src, '  <a class="skip-link"', '</header>')) != ref_header:
            found.append('header differs from index.html')
        if plain(block(src, '<footer class="ft">', '</footer>')) != ref_footer:
            found.append('footer differs from index.html')
        if ref_script not in src:
            found.append('script.js tag missing or a different version')
        if re.search(r'(?:href|src)="/?(?:next\.(?:css|js)|styles-[\w-]+\.css|learn-review\.js)', src):
            found.append('loads a retired file (next.*, styles-*.css or learn-review.js)')
        sheets = [h for h in re.findall(r'<link\b[^>]*rel="stylesheet"[^>]*>', src)]
        for tag in sheets:
            href = re.search(r'href="([^"]*)"', tag).group(1)
            if href.startswith('/styles.css?v=') or href.startswith('https://fonts.googleapis.com/css2?'):
                continue
            found.append('extra stylesheet %s' % href)
        for srcattr in re.findall(r'<script\b[^>]*\bsrc="([^"]*)"', src):
            if not srcattr.startswith('/script.js?v='):
                found.append('extra script %s' % srcattr)
        if src.count('rel="stylesheet" href="/styles.css') != 1:
            found.append('styles.css linked %d times' % src.count('rel="stylesheet" href="/styles.css'))
        found.extend(head_meta(name, src))
        header = block(src, '<header class="site-header">', '</header>') or ''
        marked = re.findall(r'<a [^>]*href="([^"]+)"[^>]*aria-current="page"', header)
        want = CURRENT.get(name, 'unlisted')
        if want == 'unlisted':
            found.append('page not listed in CURRENT in tools/check-shell.py')
        elif want is None and marked:
            found.append('aria-current set on %s; expected none' % marked)
        elif want and want not in marked:
            found.append('aria-current missing on %s' % want)
        if name == 'join.html':
            for sel, pat in (('.hd__join', r'<a class="btn hd__join" href="/join" aria-current="page">'),
                             ('.site-nav__join a', r'<li class="site-nav__join"><a href="/join" aria-current="page">')):
                if not re.search(pat, header):
                    found.append('aria-current missing on %s' % sel)
        footer = block(src, '<footer class="ft">', '</footer>') or ''
        fmarked = re.findall(r'<a [^>]*href="([^"]+)"[^>]*aria-current="page"', footer)
        fwant = FOOTER.get(name, 'unlisted')
        if fwant is None and fmarked:
            found.append('footer aria-current set on %s; expected none' % fmarked)
        elif fwant and fmarked != [fwant]:
            found.append('footer aria-current on %s, expected %s' % (fmarked, fwant))
        if want and want != 'unlisted' and set(marked) - {want}:
            found.append('header aria-current also on %s' % sorted(set(marked) - {want}))
        found.extend(hold_comments(src))
        for f in found:
            problems.append('%s: %s' % (name, f))
        print('%-32s %s' % (name, 'ok' if not found else '%d problem(s)' % len(found)))
    for asset in ('styles.css', 'script.js'):
        found = hold_comments((SITE / asset).read_text(encoding='utf-8'), css=True)
        for f in found:
            problems.append('%s: %s' % (asset, f))
        print('%-32s %s' % (asset + ' (comments)', 'ok' if not found else '%d problem(s)' % len(found)))
    for p in problems:
        print('  ' + p)
    return 1 if problems else 0


if __name__ == '__main__':
    sys.exit(main())
