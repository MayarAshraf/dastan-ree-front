/* ============================================
   DASTAN — Property Detail Page JS
   ============================================ */

(function () {
  "use strict";

  var GALLERY_IMAGES = [
    {
      src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80",
      caption: "Marina Gate — Exterior View",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80",
      caption: "Open-Plan Living Room",
    },
    {
      src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80",
      caption: "Modern Italian Kitchen",
    },
    {
      src: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1400&q=80",
      caption: "Master Bedroom with Sea View",
    },
    {
      src: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1400&q=80",
      caption: "Infinity Swimming Pool",
    },
    {
      src: "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=1400&q=80",
      caption: "Second Living Area",
    },
    {
      src: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1400&q=80",
      caption: "En-Suite Bathroom",
    },
    {
      src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=80",
      caption: "Panoramic Balcony",
    },
    {
      src: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=1400&q=80",
      caption: "State-of-the-Art Gymnasium",
    },
    {
      src: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1400&q=80",
      caption: "Grand Lobby",
    },
    {
      src: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1400&q=80",
      caption: "Marina Skyline at Night",
    },
    {
      src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&q=80",
      caption: "Master Plan Overview",
    },
  ];

  var currentIndex = 0;

  document.addEventListener("DOMContentLoaded", function () {
    initGallery();
    initLightbox();
    initReadMore();
    initSaveButton();
    initShareButton();
    initSimilarSwiper();
    initMasterplanLightbox();
  });

  /* ---- Gallery click → open lightbox ---- */
  function initGallery() {
    var galleryBtn = document.getElementById("galleryBtn");
    var mainItem = document.querySelector(".prop-gallery__main");
    var thumbs = document.querySelectorAll(".prop-gallery__thumb");

    if (galleryBtn) {
      galleryBtn.addEventListener("click", function () {
        openLightbox(0);
      });
    }

    if (mainItem) {
      mainItem.addEventListener("click", function () {
        openLightbox(Number(mainItem.dataset.index) || 0);
      });
    }

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        openLightbox(Number(thumb.dataset.index) || 0);
      });
    });
  }

  /* ---- Lightbox ---- */
  function initLightbox() {
    var lightbox = document.getElementById("propLightbox");
    var backdrop = document.getElementById("lightboxBackdrop");
    var closeBtn = document.getElementById("lightboxClose");
    var prevBtn = document.getElementById("lightboxPrev");
    var nextBtn = document.getElementById("lightboxNext");

    if (!lightbox) return;

    if (backdrop) backdrop.addEventListener("click", closeLightbox);
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) prevBtn.addEventListener("click", function () { navigate(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { navigate(1); });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    });
  }

  function openLightbox(index) {
    var lightbox = document.getElementById("propLightbox");
    if (!lightbox) return;
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    var lightbox = document.getElementById("propLightbox");
    if (!lightbox) return;
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    updateLightboxImage();
  }

  function updateLightboxImage() {
    var img = document.getElementById("lightboxImg");
    var counter = document.getElementById("lightboxCounter");
    var caption = document.getElementById("lightboxCaption");
    var data = GALLERY_IMAGES[currentIndex];

    if (img) {
      img.style.opacity = "0";
      img.src = data.src;
      img.alt = data.caption;
      img.onload = function () {
        img.style.transition = "opacity 0.25s";
        img.style.opacity = "1";
      };
    }
    if (counter) counter.textContent = (currentIndex + 1) + " / " + GALLERY_IMAGES.length;
    if (caption) caption.textContent = data.caption;
  }

  /* ---- Read More toggle ---- */
  function initReadMore() {
    var btn = document.getElementById("readMoreBtn");
    var extra = document.getElementById("descMore");
    var label = document.getElementById("readMoreLabel");
    var icon = document.getElementById("readMoreIcon");

    if (!btn || !extra) return;

    btn.addEventListener("click", function () {
      var isOpen = !extra.hidden;
      extra.hidden = isOpen;
      if (label) label.textContent = isOpen ? "Read More" : "Read Less";
      btn.classList.toggle("open", !isOpen);
    });
  }

  /* ---- Save / favourite toggle ---- */
  function initSaveButton() {
    var btn = document.getElementById("saveBtn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      btn.classList.toggle("saved");
      btn.title = btn.classList.contains("saved") ? "Saved to favourites" : "Save to favourites";
      btn.setAttribute("aria-label", btn.classList.contains("saved") ? "Remove from favourites" : "Save to favourites");
    });
  }

  /* ---- Share ---- */
  function initShareButton() {
    var btn = document.getElementById("shareBtn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (navigator.share) {
        navigator.share({
          title: "Marina Gate — 2BR Apartment | Dastan Real Estate",
          url: window.location.href,
        }).catch(function () {});
      } else {
        navigator.clipboard.writeText(window.location.href).then(function () {
          var orig = btn.title;
          btn.title = "Link copied!";
          setTimeout(function () { btn.title = orig; }, 2000);
        }).catch(function () {});
      }
    });
  }

  /* ---- Masterplan lightbox ---- */
  function initMasterplanLightbox() {
    var btn = document.getElementById("masterplanBtn");
    var img = document.getElementById("masterplanImg");
    if (!btn || !img) return;
    btn.addEventListener("click", function () {
      openLightbox(GALLERY_IMAGES.length - 1);
    });
  }

  /* ---- Similar Properties Swiper ---- */
  function initSimilarSwiper() {
    if (typeof Swiper === "undefined") return;
    new Swiper("#similarSwiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      grabCursor: true,
      speed: 600,
      loop: false,
      pagination: {
        el: ".prop-similar__pagination",
        clickable: true,
      },
      breakpoints: {
        560: { slidesPerView: 2 },
        900: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
    });
  }
})();
