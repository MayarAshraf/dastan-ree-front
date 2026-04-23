/* ============================================
   DASTAN — Property Detail Page JS
   ============================================ */

(function () {
  "use strict";

  var GALLERY_IMAGES = [
    {
      src: "https://static.shared.propertyfinder.eg/media/images/listing/7MPDT6XMGG97XRZEM681VEC010/c13479f4-86e0-4f17-ad13-763c076ea27d/416x272.jpg",
      caption: "Nile Gate — Exterior View",
    },
    {
      src: "https://static.shared.propertyfinder.eg/media/images/listing/V5AC9H0VGP16BFHVBTVRTC3YAW/bd6120e5-9376-42ed-b78c-042eaba4b035/416x272.jpg",
      caption: "Open-Plan Living Room",
    },
    {
      src: "https://static.shared.propertyfinder.eg/media/images/listing/76TVB5YBSMNRG1KN86H85KADSG/a3603a64-f992-4244-8348-8a2e10a5221c/416x272.jpg",
      caption: "Modern Italian Kitchen",
    },
    {
      src: "https://static.shared.propertyfinder.eg/media/images/listing/VJEZVX6AGN1V44J37EV78K6QB8/dc40ef99-a4e6-44eb-9382-fbcd37d69b1b/416x272.jpg",
      caption: "Master Bedroom with Sea View",
    },
    {
      src: "https://static.shared.propertyfinder.eg/media/images/listing/D090S9BNZVS1SC3YFWW5S4RST0/2b09d3d6-70b3-437b-b3b9-4d4d0be90a0c/416x272.jpg",
      caption: "Infinity Swimming Pool",
    },
    {
      src: "https://static.shared.propertyfinder.eg/media/images/listing/4AGKN92MR47GSDSTA7KG241Q2W/01c26e33-e46a-4948-9eeb-1693ea58a2a2/416x272.jpg",
      caption: "Second Living Area",
    },
    {
      src: "https://static.shared.propertyfinder.eg/media/images/listing/6QV9VTD2N8ZMJ51JDCJ0MTHDGW/040af64e-960e-45b5-8a8f-8b054b4a75cd/416x272.jpg",
      caption: "En-Suite Bathroom",
    },
    {
      src: "https://static.shared.propertyfinder.eg/media/images/listing/YDXYB7VWJ4WFQGJH2X8GX6BRJ0/ffa89ecc-2175-49c6-8be4-9ff69aaff647/416x272.jpg",
      caption: "Panoramic Balcony",
    },
    {
      src: "https://static.shared.propertyfinder.eg/media/images/listing/793ECVE42FWED1Q8ATAZWK3B58/e1816285-5d17-432b-b416-fa9c598bf12c/416x272.jpg",
      caption: "State-of-the-Art Gymnasium",
    },
    {
      src: "https://static.shared.propertyfinder.eg/media/images/listing/AFEB59WEM25QKFKTJCQEN1VDM0/fd325989-aa89-4183-9f96-ab12c909d8d7/416x272.jpg",
      caption: "Grand Lobby",
    },
    {
      src: "https://static.shared.propertyfinder.eg/media/images/listing/APN7VCXF0RFQM0M94CGX0F1QCM/81077f3c-d5f0-43a8-8da0-481a5ed50906/416x272.jpg",
      caption: "Nile Skyline at Night",
    },
    {
      src: "https://static.shared.propertyfinder.eg/media/images/listing/EJEAFG169VA2C8Y5JGDHHXAHE0/ca7c6931-87f2-4548-a206-02c31fad4138/416x272.jpg",
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
    initStickyBar();
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
          title: "Nile Gate — 2BR Apartment | Dastan Real Estate Egypt",
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

  /* ---- Sticky Property Bar ---- */
  function initStickyBar() {
    var bar = document.getElementById("propStickyBar");
    var trigger = document.querySelector(".prop-header");
    var progress = document.getElementById("stickyProgress");
    var stickyShareBtn = document.getElementById("stickyShareBtn");
    var stickySaveBtn = document.getElementById("stickySaveBtn");
    var mainSaveBtn = document.getElementById("saveBtn");

    if (!bar || !trigger) return;

    function onScroll() {
      var rect = trigger.getBoundingClientRect();
      var visible = rect.bottom < 70;

      if (visible) {
        bar.classList.add("is-visible");
        bar.removeAttribute("aria-hidden");
      } else {
        bar.classList.remove("is-visible");
        bar.setAttribute("aria-hidden", "true");
      }

      if (progress) {
        var scrolled = window.scrollY || document.documentElement.scrollTop;
        var total = document.body.scrollHeight - window.innerHeight;
        var pct = total > 0 ? Math.min((scrolled / total) * 100, 100) : 0;
        progress.style.width = pct + "%";
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    if (stickyShareBtn) {
      stickyShareBtn.addEventListener("click", function () {
        var mainShare = document.getElementById("shareBtn");
        if (mainShare) mainShare.click();
      });
    }

    if (stickySaveBtn && mainSaveBtn) {
      stickySaveBtn.addEventListener("click", function () {
        mainSaveBtn.click();
      });
      mainSaveBtn.addEventListener("click", function () {
        stickySaveBtn.classList.toggle("saved", mainSaveBtn.classList.contains("saved"));
      });
    }
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
