/* ============================================
   DASTAN REAL ESTATE — Main JavaScript
   Swiper.js + IntersectionObserver Animations
   ============================================ */

(function () {
  "use strict";

  var SWIPER_RESUME_DELAY = 3200;

  function pauseThenResumeAutoplay(swiper, delay) {
    if (!swiper || !swiper.autoplay) return;

    if (swiper.__resumeTimer) {
      clearTimeout(swiper.__resumeTimer);
      swiper.__resumeTimer = null;
    }

    swiper.autoplay.stop();
    swiper.__resumeTimer = setTimeout(function () {
      if (!swiper.destroyed && swiper.autoplay) {
        swiper.autoplay.start();
      }
    }, delay || SWIPER_RESUME_DELAY);
  }

  function bindSwiperInteractionPause(swiper, options) {
    if (!swiper || !options) return;

    function bindClick(selector) {
      if (!selector) return;
      var el = document.querySelector(selector);
      if (!el) return;
      el.addEventListener("click", function () {
        pauseThenResumeAutoplay(swiper);
      });
    }

    bindClick(options.paginationEl);
    bindClick(options.prevEl);
    bindClick(options.nextEl);

    if (options.containerEl) {
      var container = document.querySelector(options.containerEl);
      if (container) {
        container.addEventListener("touchend", function () {
          pauseThenResumeAutoplay(swiper);
        });
      }
    }
  }

  function bindPaginationLoopFix(swiper, paginationSelector) {
    if (!swiper || !paginationSelector) return;
    var paginationEl = document.querySelector(paginationSelector);
    if (!paginationEl) return;

    paginationEl.addEventListener("click", function (e) {
      var target = e.target;
      while (target && target !== paginationEl) {
        if (
          target.classList &&
          target.classList.contains("swiper-pagination-bullet")
        ) {
          var bullets = paginationEl.querySelectorAll(".swiper-pagination-bullet");
          var idx = -1;
          for (var i = 0; i < bullets.length; i++) {
            if (bullets[i] === target) {
              idx = i;
              break;
            }
          }

          if (idx > -1) {
            // Force real index mapping in loop mode to avoid wrong fallback slide.
            setTimeout(function () {
              if (!swiper.destroyed) swiper.slideToLoop(idx);
            }, 0);
          }
          break;
        }
        target = target.parentNode;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initSplash();
    initMobileMenu();
    initHeroSlider();
    initSwipers();
    initFilterBanner();
    initCinemaReveal();
    initScrollReveal();
    initCounterAnimation();
    initSmoothScroll();
    initAboutMarkAnimation();
  }

  /* ==========================================
     SPLASH SCREEN — orchestration + cleanup
     Timeline: draw(0-2s) → fill(1.8s) → words(1.6-1.85s)
               → sweep(2.2s) → exit(3s) → remove(3.6s)
     ========================================== */
  function initSplash() {
    var splash = document.getElementById("splash");
    if (!splash) return;

    // Lock scroll during splash
    document.body.classList.add("splash-active");

    // At 1.9s: begin exit animation (animations finish ~1.7s)
    setTimeout(function () {
      splash.classList.add("splash--exit");
    }, 1900);

    // At 2.5s: fade the entire overlay out
    setTimeout(function () {
      splash.classList.add("splash--done");
    }, 2500);

    // At 3.1s: remove from DOM + unlock scroll
    setTimeout(function () {
      document.body.classList.remove("splash-active");
      splash.remove();
    }, 2200);
  }

  /* ==========================================
     MOBILE MENU
     ========================================== */
  function initMobileMenu() {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;

    // Backdrop overlay
    var backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);

    // Close button injected at top of drawer
    var closeBtn = document.createElement("button");
    closeBtn.className = "navbar__menu-close";
    closeBtn.setAttribute("aria-label", "Close menu");
    closeBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    menu.insertBefore(closeBtn, menu.firstChild);

    function openMenu() {
      menu.classList.add("navbar__menu--open");
      backdrop.classList.add("nav-backdrop--visible");
      toggle.classList.add("navbar__toggle--active");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      menu.classList.remove("navbar__menu--open");
      backdrop.classList.remove("nav-backdrop--visible");
      toggle.classList.remove("navbar__toggle--active");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    toggle.addEventListener("click", function () {
      menu.classList.contains("navbar__menu--open") ? closeMenu() : openMenu();
    });

    closeBtn.addEventListener("click", closeMenu);
    backdrop.addEventListener("click", closeMenu);

    menu
      .querySelectorAll(".navbar__link, .navbar__cta")
      .forEach(function (link) {
        link.addEventListener("click", closeMenu);
      });

    // Fix freeze: clean up when resizing back to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  /* ==========================================
     HERO SLIDER — Swiper + Thumbnail linking
     Luxury cubic-bezier motion curve
     ========================================== */
  function initHeroSlider() {
    var heroEl = document.getElementById("heroSwiper");
    var thumbsWrap = document.getElementById("heroThumbs");
    if (!heroEl || !thumbsWrap) return;

    var thumbs = thumbsWrap.querySelectorAll(".hero__thumb");

    // Initialize hero Swiper with luxury easing
    var heroSwiper = new Swiper("#heroSwiper", {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 900,
      effect: "fade",
      fadeEffect: { crossFade: true },
      grabCursor: false,
      allowTouchMove: false, // controlled by thumbnails
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: true,
      },
      pagination: {
        el: ".hero__slider-pagination",
        clickable: true,
      },
    });
    bindSwiperInteractionPause(heroSwiper, {
      containerEl: "#heroSwiper",
      paginationEl: ".hero__slider-pagination",
    });
    bindPaginationLoopFix(heroSwiper, ".hero__slider-pagination");

    // Thumbnail click → slide to that index
    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        var idx = parseInt(this.getAttribute("data-slide"), 10);
        heroSwiper.slideToLoop(idx, 900);
        pauseThenResumeAutoplay(heroSwiper);
      });
    });

    // Keep thumbnail active state in sync with slider
    function syncThumbs() {
      var realIndex = heroSwiper.realIndex;
      thumbs.forEach(function (t, i) {
        if (i === realIndex) {
          t.classList.add("hero__thumb--active");
        } else {
          t.classList.remove("hero__thumb--active");
        }
      });
    }

    heroSwiper.on("slideChange", syncThumbs);
    syncThumbs(); // set initial state
  }

  /* ==========================================
     SWIPER.JS — Projects + Properties
     ========================================== */
  function initSwipers() {
    // ---- Projects Slider ----
    // Homiva-style: grab cursor, horizontal scroll, peek next card
    var projectsSwiper = new Swiper("#projectsSwiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      grabCursor: true,
      speed: 700,
      loop: true,
      loopAdditionalSlides: 3,
      slidesPerGroup: 1,
      watchOverflow: false,
      navigation: {
        prevEl: "#projPrev",
        nextEl: "#projNext",
      },
      pagination: {
        el: ".projects__pagination",
        clickable: true,
      },
      autoplay: {
        delay: 4200,
        disableOnInteraction: true,
      },
      breakpoints: {
        480: {
          slidesPerView: 1.2,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
    bindSwiperInteractionPause(projectsSwiper, {
      containerEl: "#projectsSwiper",
      paginationEl: ".projects__pagination",
      prevEl: "#projPrev",
      nextEl: "#projNext",
    });
    bindPaginationLoopFix(projectsSwiper, ".projects__pagination");
    // ---- Properties Slider ----
    // Centered, cinematic card focus with fade-up active slide
    var propertiesSwiper = new Swiper("#propertiesSwiper", {
      slidesPerView: 1.18,
      centeredSlides: true,
      spaceBetween: 18,
      grabCursor: true,
      speed: 800,
      loop: true,
      loopAdditionalSlides: 0,
      slidesPerGroup: 1,
      watchOverflow: false,
      watchSlidesProgress: true,
      navigation: {
        prevEl: "#propertiesPrev",
        nextEl: "#propertiesNext",
      },
      autoplay: {
        delay: 4200,
        disableOnInteraction: true,
      },
      pagination: {
        el: ".properties__pagination",
        clickable: true,
      },
      breakpoints: {
        480: {
          slidesPerView: 1.35,
        },
        768: {
          slidesPerView: 1.95,
        },
        1024: {
          slidesPerView: 2.2,
        },
        1280: {
          slidesPerView: 3,
        },
      },
    });
    bindSwiperInteractionPause(propertiesSwiper, {
      containerEl: "#propertiesSwiper",
      paginationEl: ".properties__pagination",
      prevEl: "#propertiesPrev",
      nextEl: "#propertiesNext",
    });
    bindPaginationLoopFix(propertiesSwiper, ".properties__pagination");

    // ---- Blogs Slider ----
    var blogsSwiper = new Swiper("#blogsSwiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      grabCursor: true,
      speed: 700,
      loop: true,
      navigation: {
        prevEl: "#blogPrev",
        nextEl: "#blogNext",
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
    bindSwiperInteractionPause(blogsSwiper, {
      containerEl: "#blogsSwiper",
      prevEl: "#blogPrev",
      nextEl: "#blogNext",
    });
  }

  /* ==========================================
     SCROLL-PAINT — Text fills color as you scroll
     --paint CSS var goes 0→100 based on scroll
     progress through the element. Resets when out
     of view, replays on re-entry.
     ========================================== */
  function initCinemaReveal() {
    // Collect all paint elements
    var allPaint = document.querySelectorAll(".cinema-reveal");

    if (!allPaint.length) return;

    // Each element tracks its own progress
    function updatePaint() {
      var winH = window.innerHeight;

      allPaint.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var elH = rect.height;

        // Start painting when element top enters bottom 85% of viewport
        // Fully painted when element top reaches 35% from top of viewport
        var startLine = winH * 0.85;
        var endLine = winH * 0.35;

        var progress;

        if (rect.top >= startLine) {
          // Below viewport threshold — not started
          progress = 0;
        } else if (rect.top <= endLine) {
          // Past the end line — fully painted
          progress = 100;
        } else {
          // In between — interpolate linearly
          progress = ((startLine - rect.top) / (startLine - endLine)) * 100;
        }

        // Clamp 0–100
        progress = Math.max(0, Math.min(100, progress));

        el.style.setProperty("--paint", progress);
      });

      rafId = requestAnimationFrame(updatePaint);
    }

    var rafId = requestAnimationFrame(updatePaint);

    // Pause when tab is hidden for performance
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(updatePaint);
      }
    });
  }

  /* ==========================================
     SCROLL REVEAL — IntersectionObserver
     Handles: .reveal, .reveal-left, .reveal-right, .reveal-children
     ========================================== */
  function initScrollReveal() {
    var selectors = [
      ".reveal",
      ".reveal-left",
      ".reveal-right",
      ".reveal-children",
    ];
    var allEls = document.querySelectorAll(selectors.join(","));

    if (!("IntersectionObserver" in window)) {
      // Fallback: show everything
      allEls.forEach(function (el) {
        el.classList.add("reveal--visible");
        el.classList.add("reveal-left--visible");
        el.classList.add("reveal-right--visible");
        el.classList.add("reveal-children--visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            // Add the matching --visible class
            if (el.classList.contains("reveal"))
              el.classList.add("reveal--visible");
            if (el.classList.contains("reveal-left"))
              el.classList.add("reveal-left--visible");
            if (el.classList.contains("reveal-right"))
              el.classList.add("reveal-right--visible");
            if (el.classList.contains("reveal-children"))
              el.classList.add("reveal-children--visible");
            observer.unobserve(el);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.1,
      },
    );

    allEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ==========================================
     COUNTER ANIMATION
     ========================================== */
  function initCounterAnimation() {
    var grid = document.getElementById("statsGrid");
    if (!grid) return;

    var numbers = grid.querySelectorAll(".stats__number");
    var animated = false;

    if (!("IntersectionObserver" in window)) {
      runCounters(numbers);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !animated) {
            animated = true;
            runCounters(numbers);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(grid);
  }

  function runCounters(numbers) {
    numbers.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-target"), 10);
      var duration = 2200;
      var startTime = null;

      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);

        // Ease-out cubic for smooth deceleration
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);

        el.innerHTML = current.toLocaleString("en-US") + "<span>+</span>";

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.innerHTML = target.toLocaleString("en-US") + "<span>+</span>";
        }
      }

      requestAnimationFrame(step);
    });
  }

  /* ==========================================
     FILTER BANNER — Tab switching
     ========================================== */
  function initFilterBanner() {
    var tabs = document.querySelectorAll(".filter-banner__tab");
    var purposeSelect = document.getElementById("filterPurpose");
    if (!tabs.length) return;

    var purposeMap = { buy: "buy", rent: "rent", offplan: "offplan" };

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.remove("filter-banner__tab--active");
          t.setAttribute("aria-selected", "false");
        });
        this.classList.add("filter-banner__tab--active");
        this.setAttribute("aria-selected", "true");

        var purpose = this.getAttribute("data-purpose");
        if (purposeSelect && purposeMap[purpose]) {
          purposeSelect.value = purposeMap[purpose];
        }
      });
    });

    var form = document.querySelector(".filter-banner__form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
      });
    }
  }

  /* ==========================================
     SMOOTH SCROLL
     ========================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var href = this.getAttribute("href");
        if (href === "#") return;

        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        var offset = 80; // navbar height
        var top =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: "smooth" });
      });
    });
  }

  /* ==========================================
     ABOUT — D-Mark Build Animation (GSAP)
     Timeline:
       0.0s  origin spark pulses
       0.2s  outer path strokes itself on
       1.0s  inner window strokes in
       2.0s  navy fill floods in, strokes fade
       2.4s  real-estate photo fades up in window
       2.7s  accent particles burst in
       3.2s  whole mark tilts to 3-D perspective
       3.6s  experience badge slides up
       4.5s  continuous float + mouse parallax
     ========================================== */
  function initAboutMarkAnimation() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    var scene = document.getElementById("aboutMarkScene");
    if (!scene) return;

    gsap.registerPlugin(ScrollTrigger);

    var outerStroke = document.getElementById("dMarkOuterStroke");
    var innerStroke = document.getElementById("dMarkInnerStroke");
    var fillPath    = document.getElementById("dMarkFill");
    var photo       = document.getElementById("dMarkPhoto");
    var badge       = document.getElementById("aboutMarkBadge");
    var mark3d      = document.getElementById("aboutMark3d");
    var originDot   = document.getElementById("dMarkOrigin");
    var particles   = scene.querySelectorAll(".about__mark-particle");

    if (!outerStroke || !innerStroke || !fillPath || !photo) return;

    /* ---- respect prefers-reduced-motion ---- */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(fillPath, { opacity: 1 });
      gsap.set(photo,    { opacity: 1 });
      if (badge)     gsap.set(badge, { opacity: 1, y: 0 });
      if (particles) gsap.set(particles, { opacity: 1, scale: 1 });
      gsap.set(mark3d, { rotateY: -8, rotateX: 3 });
      return;
    }

    /* ---- measure actual path lengths ---- */
    var outerLen = outerStroke.getTotalLength();
    var innerLen = innerStroke.getTotalLength();

    /* ---- set initial hidden states ---- */
    gsap.set(outerStroke, { strokeDasharray: outerLen, strokeDashoffset: outerLen });
    gsap.set(innerStroke, { strokeDasharray: innerLen, strokeDashoffset: innerLen });
    gsap.set(fillPath,    { opacity: 0 });
    gsap.set(photo,       { opacity: 0 });
    gsap.set(particles,   { opacity: 0, scale: 0 });
    gsap.set(originDot,   { opacity: 0, scale: 0, transformOrigin: "99.7px 55.09px" });
    if (badge) gsap.set(badge, { opacity: 0, y: 22 });

    /* ---- main timeline ---- */
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: "top 65%",
        once: true
      }
    });

    /* Phase 1 — origin spark */
    tl.to(originDot, { opacity: 1, scale: 2.4, duration: 0.25, ease: "power2.out" }, 0)
      .to(originDot, { opacity: 0, scale: 0.4, duration: 0.30, ease: "power2.in"  }, 0.28);

    /* Phase 2 — draw outer path (0.2 → 2.4 s) */
    tl.to(outerStroke, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: "power2.inOut"
    }, 0.2);

    /* Phase 3 — draw inner window (1.0 → 2.0 s) */
    tl.to(innerStroke, {
      strokeDashoffset: 0,
      duration: 1.0,
      ease: "power2.out"
    }, 1.0);

    /* Phase 4 — flood fill (2.0 → 2.9 s) */
    tl.to(fillPath, {
      opacity: 1,
      duration: 0.9,
      ease: "power2.inOut"
    }, 2.0);

    /* strokes fade out as fill arrives (2.1 → 2.7 s) */
    tl.to([outerStroke, innerStroke], {
      opacity: 0,
      duration: 0.6,
      ease: "power1.in"
    }, 2.1);

    /* Phase 5 — photo emerges from the window (2.4 → 3.8 s) */
    tl.to(photo, {
      opacity: 1,
      duration: 1.4,
      ease: "power2.out"
    }, 2.4);

    /* Phase 6 — particles burst (2.7 → 3.1 s) */
    tl.to(particles, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      stagger: 0.09,
      ease: "back.out(2.5)"
    }, 2.7);

    /* Phase 7 — 3-D tilt (3.2 → 4.4 s) */
    tl.to(mark3d, {
      rotateY: -8,
      rotateX: 3,
      duration: 1.2,
      ease: "power3.out"
    }, 3.2);

    /* Phase 8 — badge slides up (3.6 → 4.2 s) */
    if (badge) {
      tl.to(badge, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, 3.6);
    }

    /* Phase 9 — continuous float + particle drift (after 4.5 s) */
    tl.call(function () {
      gsap.to(mark3d, {
        y: -9,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      var pNodes = [].slice.call(particles);
      var motions = [
        { y: -13, x:  5, dur: 3.0, delay: 0.0 },
        { y:  11, x: -6, dur: 2.4, delay: 0.5 },
        { y:  -9, x:  4, dur: 2.8, delay: 0.9 },
        { y:   7, x: -3, dur: 2.1, delay: 0.3 }
      ];
      pNodes.forEach(function (p, i) {
        var m = motions[i] || motions[0];
        gsap.to(p, {
          y: m.y, x: m.x,
          duration: m.dur,
          delay: m.delay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      });
    }, null, 4.5);

    /* ---- mouse parallax ---- */
    scene.addEventListener("mousemove", function (e) {
      var r  = scene.getBoundingClientRect();
      var cx = (e.clientX - r.left) / r.width  - 0.5;
      var cy = (e.clientY - r.top)  / r.height - 0.5;
      gsap.to(mark3d, {
        rotateY: -8 + cx * 14,
        rotateX:  3 - cy * 10,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    scene.addEventListener("mouseleave", function () {
      gsap.to(mark3d, {
        rotateY: -8,
        rotateX:  3,
        duration: 1.2,
        ease: "power3.out",
        overwrite: "auto"
      });
    });
  }
})();
