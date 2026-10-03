// DIZHAO Mobile Navigation
(function () {
  'use strict';

  function bindNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('.nav');
    if (!toggle || !nav) return;

    function close() {
      toggle.classList.remove('is-open');
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    function open() {
      toggle.classList.add('is-open');
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (nav.classList.contains('is-open')) {
        close();
      } else {
        open();
      }
    });

    // Close when a nav link is tapped
    nav.addEventListener('click', function (e) {
      var t = e.target;
      while (t && t !== nav) {
        if (t.tagName === 'A') { close(); return; }
        t = t.parentNode;
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      close();
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) close();
    });

    // Auto-close on resize to desktop
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth > 960) close();
      }, 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindNav);
  } else {
    bindNav();
  }
})();