// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = document.querySelector('header').offsetHeight;
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - offset, behavior: 'smooth' });
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const siblings = [...e.target.parentElement.children].filter(c => c.classList.contains('reveal'));
    const idx = siblings.indexOf(e.target);
    setTimeout(() => e.target.classList.add('in-view'), Math.min(idx, 3) * 90);
    io.unobserve(e.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => io.observe(el));

// Contact form
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.fname.value.trim() || !form.femail.value.trim() || !form.fmsg.value.trim()) return;
  const btn = form.querySelector('.form-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'flex';
  }, 1000);
});
