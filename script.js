// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Highlight active nav link based on current page filename
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
        link.classList.add('nav-current');
    }
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Call this after dynamically adding .fade-in elements to the page
window.observeFadeIns = (container) => {
    const root = container || document;
    root.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
};

// Page transitions — fade out on exit, fade in on load
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-loaded');
});

document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (
        href &&
        !href.startsWith('#') &&
        !href.startsWith('http') &&
        !href.startsWith('mailto') &&
        link.target !== '_blank'
    ) {
        link.addEventListener('click', e => {
            e.preventDefault();
            const dest = link.href;
            document.body.classList.remove('page-loaded');
            setTimeout(() => { window.location.href = dest; }, 220);
        });
    }
});
