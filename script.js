// ===== Page Map =====
// Maps nav hash keys to section IDs that should be shown together
const pageMap = {
    'home':      ['home'],
    'about':     ['about'],
    'board':     ['board'],
    'groups':    ['groups'],
    'learn':     ['learn'],
    'events':    ['meetings', 'events'],
    'resources': ['resources'],
    'instagram': ['instagram'],
    'join':      ['join']
};

// All section IDs (flattened)
const allSectionIds = Object.values(pageMap).flat();

// ===== Show Page =====
function showPage(pageKey) {
    // Normalize — if given a section ID, find its page key
    const key = Object.keys(pageMap).find(k => pageMap[k].includes(pageKey)) || pageKey;
    const sectionIds = pageMap[key];
    if (!sectionIds) return;

    // Hide all sections
    allSectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('page-visible');
    });

    // Show target section(s)
    sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('page-visible');
    });

    // Trigger fade-in animations after a short delay
    setTimeout(() => {
        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.querySelectorAll('.fade-in').forEach(item => item.classList.add('visible'));
            }
        });
    }, 80);

    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href')?.replace('#', '');
        a.classList.toggle('nav-current', href === key);
    });

    // Scroll to top
    window.scrollTo(0, 0);

    // Update URL hash
    history.pushState(null, '', '#' + key);

    // Close mobile nav
    document.querySelector('.nav-links')?.classList.remove('active');
}

// ===== Intercept all internal hash links =====
document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href').replace('#', '');
    if (!hash) { showPage('home'); e.preventDefault(); return; }
    if (allSectionIds.includes(hash) || pageMap[hash]) {
        e.preventDefault();
        showPage(hash);
    }
});

// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
});

// ===== Load correct page from URL hash =====
const initHash = window.location.hash.replace('#', '');
if (initHash && (pageMap[initHash] || allSectionIds.includes(initHash))) {
    showPage(initHash);
} else {
    showPage('home');
}
