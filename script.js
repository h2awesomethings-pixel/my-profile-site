/* ── Dark mode ───────────────────────────────────────────── */
const html = document.documentElement;

(function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) html.classList.add('dark');
})();

function toggleDark() {
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
}

document.getElementById('darkToggle').addEventListener('click', toggleDark);
document.getElementById('darkToggleMobile').addEventListener('click', toggleDark);

/* ── Mobile menu ─────────────────────────────────────────── */
const mobileMenu = document.getElementById('mobileMenu');

document.getElementById('mobileMenuBtn').addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

/* ── Navbar scroll glass effect ─────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('navbar-scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Typing animation ────────────────────────────────────── */
const roles = ['백엔드 개발자', 'Java Developer', 'Spring Boot Engineer', '문제 해결사'];
let roleIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function tick() {
  const word = roles[roleIdx];
  if (deleting) {
    typingEl.textContent = word.slice(0, --charIdx);
  } else {
    typingEl.textContent = word.slice(0, ++charIdx);
  }

  let delay = deleting ? 55 : 110;

  if (!deleting && charIdx === word.length) {
    delay = 2200;
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    delay = 350;
  }

  setTimeout(tick, delay);
}
tick();

/* ── Scroll reveal (Intersection Observer) ───────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

/* ── Active nav link highlight ───────────────────────────── */
const navLinks = document.querySelectorAll('.nav-link');
const activeClass = ['text-indigo-600', 'dark:text-indigo-400'];

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id;
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      activeClass.forEach(c => link.classList.toggle(c, isActive));
    });
  });
}, { threshold: 0.45 });

document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));
