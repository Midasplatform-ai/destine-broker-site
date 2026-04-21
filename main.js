(function () {
  'use strict';

  // ── Mobile menu toggle ──────────────────────────────────────────────────────
  function initMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
      menu.classList.toggle('open');
      const isOpen = menu.classList.contains('open');
      btn.setAttribute('aria-expanded', isOpen);
    });
  }

  // ── Accordion / FAQ ─────────────────────────────────────────────────────────
  function initAccordion() {
    const items = document.querySelectorAll('.accordion-item');
    items.forEach(item => {
      const trigger = item.querySelector('.accordion-trigger');
      const content = item.querySelector('.accordion-content');
      const icon = item.querySelector('.accordion-icon');
      if (!trigger || !content) return;
      trigger.addEventListener('click', () => {
        const isOpen = content.classList.contains('open');
        // close all
        items.forEach(i => {
          i.querySelector('.accordion-content')?.classList.remove('open');
          const ic = i.querySelector('.accordion-icon');
          if (ic) ic.style.transform = 'rotate(0deg)';
        });
        if (!isOpen) {
          content.classList.add('open');
          if (icon) icon.style.transform = 'rotate(45deg)';
        }
      });
    });
  }

  // ── Animated counters ────────────────────────────────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('ro-RO');
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString('ro-RO');
    }
    requestAnimationFrame(update);
  }

  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => obs.observe(c));
  }

  // ── Scroll fade-in ───────────────────────────────────────────────────────────
  function initFadeIn() {
    const els = document.querySelectorAll('.fade-in');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
  }

  // ── Back to top ──────────────────────────────────────────────────────────────
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) btn.classList.add('visible');
      else btn.classList.remove('visible');
    });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Navbar sticky hide/show on scroll ────────────────────────────────────────
  function initNavbarScroll() {
    const nav = document.getElementById('main-navbar');
    if (!nav) return;
    let lastY = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 80) {
        nav.style.transform = y > lastY ? 'translateY(-100%)' : 'translateY(0)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
      lastY = y;
    }, { passive: true });
  }

  // ── Project filter buttons ───────────────────────────────────────────────────
  function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.filter-card');
    if (!filterBtns.length) return;
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-filter');
        cards.forEach(card => {
          if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ── Contact form success message ─────────────────────────────────────────────
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');
    if (!form || !successMsg) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      successMsg.classList.remove('hidden');
    });
  }

  // ── Init all ─────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initAccordion();
    initCounters();
    initFadeIn();
    initBackToTop();
    initNavbarScroll();
    initFilters();
    initContactForm();
  });
})();