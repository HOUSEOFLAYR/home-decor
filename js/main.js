/* House of LAYR — shared interactions */
(function(){
  "use strict";

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Header state on scroll ---------------- */
  var header = document.querySelector('.site-header');
  function onScroll(){
    if(!header) return;
    if(window.scrollY > 40){ header.classList.add('is-scrolled'); }
    else{ header.classList.remove('is-scrolled'); }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------- Mobile nav ---------------- */
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  var mobileClose = document.querySelector('.mobile-nav__close');

  function openNav(){
    if(!mobileNav) return;
    mobileNav.classList.add('is-open');
    document.body.classList.add('nav-open');
    hamburger.setAttribute('aria-expanded', 'true');
  }
  function closeNav(){
    if(!mobileNav) return;
    mobileNav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  if(hamburger){
    hamburger.addEventListener('click', function(){
      mobileNav.classList.contains('is-open') ? closeNav() : openNav();
    });
  }
  if(mobileClose){ mobileClose.addEventListener('click', closeNav); }
  document.querySelectorAll('.mobile-nav__links a').forEach(function(a){
    a.addEventListener('click', closeNav);
  });

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-line');
  if('IntersectionObserver' in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---------------- Subtle parallax ---------------- */
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if(parallaxEls.length && !reduceMotion){
    var ticking = false;
    function updateParallax(){
      var vh = window.innerHeight;
      parallaxEls.forEach(function(el){
        var rect = el.getBoundingClientRect();
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.12;
        var offset = (rect.top - vh / 2) * speed;
        el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0) scale(1.08)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ window.requestAnimationFrame(updateParallax); ticking = true; }
    }, { passive: true });
    updateParallax();
  }

  /* ---------------- Contact form ---------------- */
  var form = document.querySelector('.enquiry-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var status = form.querySelector('.form-status');
      var btn = form.querySelector('button[type="submit"]');
      if(btn){ btn.querySelector('span').textContent = 'Sending…'; }
      setTimeout(function(){
        if(status){
          status.textContent = 'Thank you — your enquiry has been received. Our team will respond within 1–2 business days.';
          status.classList.add('is-visible');
        }
        if(btn){ btn.querySelector('span').textContent = 'Sent'; }
        form.reset();
      }, 700);
    });
  }

  /* ---------------- Current year ---------------- */
  document.querySelectorAll('[data-year]').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

})();
