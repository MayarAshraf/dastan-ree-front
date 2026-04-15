/* ============================================
   DASTAN REAL ESTATE — Main JavaScript
   Swiper.js + IntersectionObserver Animations
   ============================================ */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initNavbar();
    initMobileMenu();
    initHeroSlider();
    initSwipers();
    initScrollReveal();
    initCounterAnimation();
    initSmoothScroll();
  }

  /* ==========================================
     NAVBAR — scroll shrink + active link
     ========================================== */
  function initNavbar() {
    var navbar = document.getElementById("navbar");
    var sections = document.querySelectorAll("section[id]");
    var navLinks = document.querySelectorAll(".navbar__link");

    function onScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add("navbar--scrolled");
      } else {
        navbar.classList.remove("navbar--scrolled");
      }

      // Active link highlight
      var scrollPos = window.scrollY + 200;
      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute("id");

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            link.classList.remove("navbar__link--active");
            if (link.getAttribute("href") === "#" + id) {
              link.classList.add("navbar__link--active");
            }
          });
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ==========================================
     MOBILE MENU
     ========================================== */
  function initMobileMenu() {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      toggle.classList.toggle("navbar__toggle--active");
      menu.classList.toggle("navbar__menu--open");
      document.body.style.overflow = menu.classList.contains(
        "navbar__menu--open",
      )
        ? "hidden"
        : "";
    });

    menu
      .querySelectorAll(".navbar__link, .navbar__cta")
      .forEach(function (link) {
        link.addEventListener("click", function () {
          toggle.classList.remove("navbar__toggle--active");
          menu.classList.remove("navbar__menu--open");
          document.body.style.overflow = "";
        });
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
        disableOnInteraction: false,
      },
      pagination: {
        el: ".hero__slider-pagination",
        clickable: true,
      },
    });

    // Thumbnail click → slide to that index
    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        var idx = parseInt(this.getAttribute("data-slide"), 10);
        heroSwiper.slideToLoop(idx, 900);
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
    new Swiper("#projectsSwiper", {
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
      autoplay: {
        delay: 4200,
        disableOnInteraction: false,
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
        disableOnInteraction: false,
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

    // Safety guard: keep carousel moving seamlessly if loop edge is reached.
    propertiesSwiper.on("slideChangeTransitionEnd", function () {
      if (propertiesSwiper.isEnd) {
        propertiesSwiper.slideToLoop(0, 0, false);
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
})();
