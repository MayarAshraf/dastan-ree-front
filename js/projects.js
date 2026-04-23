/* ============================================
   DASTAN REAL ESTATE — Projects List Page
   Filter + Pagination + Sort logic
   ============================================ */

(function () {
  "use strict";

  /* ==========================================
     PROJECTS DATA
     ========================================== */
  var PROJECTS = [
    {
      id: 1,
      title: "Makadi Heights",
      developer: "emaar",
      developerLabel: "Dastan Real Estate",
      location: "Makadi, Hurghada",
      image: "https://static.shared.propertyfinder.eg/media/images/listing/7MPDT6XMGG97XRZEM681VEC010/c13479f4-86e0-4f17-ad13-763c076ea27d/416x272.jpg",
      priceRaw: 18000000,
      priceDisplay: "EGP 18M",
      status: "ready",
      beds: 4,
      baths: 4,
      area: 200,
      completion: 2024,
      paymentPlan: false,
      furnishing: "semi",
      views: ["sea", "garden"],
      amenities: ["pool", "gym", "parking", "beach"],
      hot: true,
    },
    {
      id: 2,
      title: "Al Maqsad",
      developer: "damac",
      developerLabel: "Dastan Real Estate",
      location: "New Capital City, Cairo",
      image: "https://static.shared.propertyfinder.eg/media/images/listing/V5AC9H0VGP16BFHVBTVRTC3YAW/bd6120e5-9376-42ed-b78c-042eaba4b035/416x272.jpg",
      priceRaw: 2500000,
      priceDisplay: "EGP 2.5M",
      status: "ready",
      beds: 3,
      baths: 3,
      area: 134,
      completion: 2024,
      paymentPlan: false,
      furnishing: "furnished",
      views: ["city"],
      amenities: ["pool", "gym", "parking"],
      hot: true,
    },
    {
      id: 3,
      title: "DeJoya 4",
      developer: "nakheel",
      developerLabel: "Dastan Real Estate",
      location: "New Capital City, Cairo",
      image: "https://static.shared.propertyfinder.eg/media/images/listing/76TVB5YBSMNRG1KN86H85KADSG/a3603a64-f992-4244-8348-8a2e10a5221c/416x272.jpg",
      priceRaw: 6648300,
      priceDisplay: "EGP 6.65M",
      status: "offplan",
      beds: 3,
      baths: 2,
      area: 146,
      completion: 2027,
      paymentPlan: true,
      furnishing: "unfurnished",
      views: ["city", "garden"],
      amenities: ["pool", "gym", "parking"],
      hot: true,
    },
    {
      id: 4,
      title: "Noor City",
      developer: "meraas",
      developerLabel: "Dastan Real Estate",
      location: "Cairo",
      image: "https://static.shared.propertyfinder.eg/media/images/listing/VJEZVX6AGN1V44J37EV78K6QB8/dc40ef99-a4e6-44eb-9382-fbcd37d69b1b/416x272.jpg",
      priceRaw: 22000000,
      priceDisplay: "EGP 22M",
      status: "construction",
      beds: 4,
      baths: 4,
      area: 540,
      completion: 2026,
      paymentPlan: true,
      furnishing: "semi",
      views: ["garden"],
      amenities: ["pool", "parking", "security"],
      hot: false,
    },
    {
      id: 5,
      title: "Madinaty B8",
      developer: "sobha",
      developerLabel: "Dastan Real Estate",
      location: "Madinaty, Cairo",
      image: "https://static.shared.propertyfinder.eg/media/images/listing/D090S9BNZVS1SC3YFWW5S4RST0/2b09d3d6-70b3-437b-b3b9-4d4d0be90a0c/416x272.jpg",
      priceRaw: 14000000,
      priceDisplay: "EGP 14M",
      status: "ready",
      beds: 3,
      baths: 3,
      area: 224,
      completion: 2024,
      paymentPlan: false,
      furnishing: "furnished",
      views: ["city", "garden"],
      amenities: ["gym", "parking", "security"],
      hot: false,
    },
    {
      id: 6,
      title: "Sheya Residence",
      developer: "azizi",
      developerLabel: "Dastan Real Estate",
      location: "Sarai, Mostakbal City",
      image: "https://static.shared.propertyfinder.eg/media/images/listing/4AGKN92MR47GSDSTA7KG241Q2W/01c26e33-e46a-4948-9eeb-1693ea58a2a2/416x272.jpg",
      priceRaw: 9180000,
      priceDisplay: "EGP 9.18M",
      status: "offplan",
      beds: 4,
      baths: 3,
      area: 212,
      completion: 2026,
      paymentPlan: true,
      furnishing: "unfurnished",
      views: ["garden"],
      amenities: ["pool", "gym", "parking", "kids"],
      hot: false,
    },
    {
      id: 7,
      title: "Privado Madinaty",
      developer: "ellington",
      developerLabel: "Dastan Real Estate",
      location: "Madinaty, Cairo",
      image: "https://static.shared.propertyfinder.eg/media/images/listing/6QV9VTD2N8ZMJ51JDCJ0MTHDGW/040af64e-960e-45b5-8a8f-8b054b4a75cd/416x272.jpg",
      priceRaw: 10700000,
      priceDisplay: "EGP 10.7M",
      status: "ready",
      beds: 2,
      baths: 1,
      area: 84,
      completion: 2024,
      paymentPlan: true,
      furnishing: "furnished",
      views: ["city"],
      amenities: ["gym", "parking", "concierge"],
      hot: false,
    },
    {
      id: 8,
      title: "R3 New Capital",
      developer: "select",
      developerLabel: "Dastan Real Estate",
      location: "New Capital City, Cairo",
      image: "https://static.shared.propertyfinder.eg/media/images/listing/YDXYB7VWJ4WFQGJH2X8GX6BRJ0/ffa89ecc-2175-49c6-8be4-9ff69aaff647/416x272.jpg",
      priceRaw: 4656000,
      priceDisplay: "EGP 4.66M",
      status: "offplan",
      beds: 3,
      baths: 2,
      area: 152,
      completion: 2026,
      paymentPlan: true,
      furnishing: "semi",
      views: ["city"],
      amenities: ["pool", "gym", "parking"],
      hot: false,
    },
    {
      id: 9,
      title: "Remal Ras Al Hekma",
      developer: "nshama",
      developerLabel: "Dastan Real Estate",
      location: "North Coast",
      image: "https://static.shared.propertyfinder.eg/media/images/listing/793ECVE42FWED1Q8ATAZWK3B58/e1816285-5d17-432b-b416-fa9c598bf12c/416x272.jpg",
      priceRaw: 6400000,
      priceDisplay: "EGP 6.4M",
      status: "offplan",
      beds: 1,
      baths: 1,
      area: 65,
      completion: 2027,
      paymentPlan: true,
      furnishing: "unfurnished",
      views: ["sea"],
      amenities: ["pool", "beach", "security"],
      hot: true,
    },
    {
      id: 10,
      title: "Shorouk El Nady District",
      developer: "emaar",
      developerLabel: "Dastan Real Estate",
      location: "Shorouk City, Cairo",
      image: "https://static.shared.propertyfinder.eg/media/images/listing/AFEB59WEM25QKFKTJCQEN1VDM0/fd325989-aa89-4183-9f96-ab12c909d8d7/416x272.jpg",
      priceRaw: 4180000,
      priceDisplay: "EGP 4.18M",
      status: "ready",
      beds: 3,
      baths: 3,
      area: 190,
      completion: 2024,
      paymentPlan: false,
      furnishing: "semi",
      views: ["city"],
      amenities: ["gym", "parking", "security"],
      hot: false,
    },
  ];

  /* ==========================================
     STATE
     ========================================== */
  var state = {
    status: [],
    beds: [],
    baths: [],
    areaMin: "",
    areaMax: "",
    developer: [],
    completion: [],
    paymentPlan: false,
    furnishing: [],
    views: [],
    amenities: [],
    sort: "newest",
    view: "grid",
    page: 1,
    perPage: 9,
  };

  var LABEL_MAP = {
    status: {
      offplan: "Off-Plan",
      ready: "Ready",
      construction: "Under Construction",
    },
    beds: {
      0: "Studio",
      1: "1 Bed",
      2: "2 Beds",
      3: "3 Beds",
      4: "4 Beds",
      5: "5+ Beds",
    },
    baths: { 1: "1 Bath", 2: "2 Baths", 3: "3 Baths", 4: "4+ Baths" },
    developer: {
      emaar: "TMG",
      damac: "Hassan Allam",
      nakheel: "Palm Hills",
      meraas: "Misr Italia",
      sobha: "SODIC",
      azizi: "Ora",
      ellington: "Mountain View",
      select: "City Edge",
      nshama: "Hyde Park Developments",
    },
    completion: {
      2024: "By 2024",
      2025: "2025",
      2026: "2026",
      2027: "2027",
      2028: "2028+",
    },
    furnishing: {
      furnished: "Furnished",
      unfurnished: "Unfurnished",
      semi: "Semi-Furnished",
    },
    views: {
      sea: "Sea View",
      city: "City View",
      garden: "Garden View",
      pool: "Pool View",
      golf: "Golf View",
      canal: "Canal View",
      creek: "Creek View",
    },
    amenities: {
      pool: "Pool",
      gym: "Gym",
      parking: "Parking",
      concierge: "Concierge",
      spa: "Spa",
      kids: "Kids Area",
      beach: "Beach Access",
      security: "24/7 Security",
    },
  };

  /* ==========================================
     FILTER LOGIC
     ========================================== */
  function filterProjects(projects) {
    return projects.filter(function (p) {
      if (state.status.length && state.status.indexOf(p.status) === -1)
        return false;

      if (state.beds.length) {
        var bedMatch = state.beds.some(function (b) {
          var bv = parseInt(b, 10);
          return bv === 5 ? p.beds >= 5 : p.beds === bv;
        });
        if (!bedMatch) return false;
      }

      if (state.baths.length) {
        var bathMatch = state.baths.some(function (b) {
          var bv = parseInt(b, 10);
          return bv === 4 ? p.baths >= 4 : p.baths === bv;
        });
        if (!bathMatch) return false;
      }

      if (state.areaMin !== "" && p.area < parseInt(state.areaMin, 10))
        return false;
      if (state.areaMax !== "" && p.area > parseInt(state.areaMax, 10))
        return false;

      if (state.developer.length && state.developer.indexOf(p.developer) === -1)
        return false;

      if (state.completion.length) {
        var compMatch = state.completion.some(function (c) {
          var cv = parseInt(c, 10);
          return cv === 2024 ? p.completion <= 2024 : p.completion === cv;
        });
        if (!compMatch) return false;
      }

      if (state.paymentPlan && !p.paymentPlan) return false;

      if (
        state.furnishing.length &&
        state.furnishing.indexOf(p.furnishing) === -1
      )
        return false;

      if (state.views.length) {
        var viewMatch = state.views.every(function (v) {
          return p.views.indexOf(v) !== -1;
        });
        if (!viewMatch) return false;
      }

      if (state.amenities.length) {
        var amenMatch = state.amenities.every(function (a) {
          return p.amenities.indexOf(a) !== -1;
        });
        if (!amenMatch) return false;
      }

      return true;
    });
  }

  function sortProjects(projects) {
    var arr = projects.slice();
    switch (state.sort) {
      case "price-asc":
        arr.sort(function (a, b) {
          return a.priceRaw - b.priceRaw;
        });
        break;
      case "price-desc":
        arr.sort(function (a, b) {
          return b.priceRaw - a.priceRaw;
        });
        break;
      case "area-asc":
        arr.sort(function (a, b) {
          return a.area - b.area;
        });
        break;
      default:
        arr.sort(function (a, b) {
          return b.id - a.id;
        });
    }
    return arr;
  }

  function getPage(projects) {
    var start = (state.page - 1) * state.perPage;
    return projects.slice(start, start + state.perPage);
  }

  /* ==========================================
     RENDER FUNCTIONS
     ========================================== */
  function statusLabel(status) {
    return status === "offplan"
      ? "Off-Plan"
      : status === "ready"
        ? "Ready"
        : "Under Construction";
  }

  function bedsLabel(beds) {
    return beds === 0 ? "Studio" : beds + " Bed" + (beds > 1 ? "s" : "");
  }

  function renderCard(project, index) {
    var delay = (index % state.perPage) * 0.04;
    return (
      '<article class="project-card project-card-enter" role="listitem" style="animation-delay:' +
      delay +
      's">' +
      '<img class="project-card__img" src="' +
      project.image +
      '" alt="' +
      project.title +
      '" loading="lazy"/>' +
      '<div class="project-card__gradient"></div>' +
      '<div class="project-card__developer">' +
      project.developerLabel +
      "</div>" +
      '<div class="project-card__body">' +
      '<h3 class="project-card__title">' +
      project.title +
      "</h3>" +
      '<div class="project-card__location">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
      project.location +
      "</div>" +
      '<div class="project-card__specs">' +
      "</div>" +
      '<div class="project-card__divider"></div>' +
      '<div class="project-card__footer">' +
      '<div class="project-card__price">' +
      '<span class="project-card__price-from">Starting from</span>' +
      '<span class="project-card__price-value">' +
      project.priceDisplay +
      "</span>" +
      "</div>" +
      '<a href="property.html" class="project-card__cta" aria-label="View ' +
      project.title +
      '">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
      "</a>" +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function renderGrid(paged) {
    var grid = document.getElementById("projectsGrid");
    var empty = document.getElementById("projectsEmpty");
    if (!grid) return;

    if (paged.length === 0) {
      grid.innerHTML = "";
      empty.hidden = false;
      return;
    }

    empty.hidden = true;
    grid.innerHTML = paged
      .map(function (p, i) {
        return renderCard(p, i);
      })
      .join("");

    if (state.view === "list") {
      grid.classList.add("projects-grid--list");
    } else {
      grid.classList.remove("projects-grid--list");
    }
  }

  function renderPagination(total) {
    var nav = document.getElementById("pagination");
    if (!nav) return;

    var totalPages = Math.ceil(total / state.perPage);
    if (totalPages <= 1) {
      nav.innerHTML = "";
      return;
    }

    var html = "";
    html +=
      '<button class="pagination__btn" id="pagePrev" aria-label="Previous page"' +
      (state.page === 1 ? " disabled" : "") +
      ">" +
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
      "Prev</button>";

    var pages = buildPageRange(state.page, totalPages);
    pages.forEach(function (p) {
      if (p === "…") {
        html += '<span class="pagination__ellipsis">…</span>';
      } else {
        html +=
          '<button class="pagination__page' +
          (p === state.page ? " pagination__page--active" : "") +
          '" data-page="' +
          p +
          '" aria-label="Page ' +
          p +
          '"' +
          (p === state.page ? ' aria-current="page"' : "") +
          ">" +
          p +
          "</button>";
      }
    });

    html +=
      '<button class="pagination__btn" id="pageNext" aria-label="Next page"' +
      (state.page === totalPages ? " disabled" : "") +
      ">" +
      'Next<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
      "</button>";

    nav.innerHTML = html;

    nav.querySelector("#pagePrev") &&
      nav.querySelector("#pagePrev").addEventListener("click", function () {
        if (state.page > 1) {
          state.page--;
          update();
          scrollToResults();
        }
      });
    nav.querySelector("#pageNext") &&
      nav.querySelector("#pageNext").addEventListener("click", function () {
        if (state.page < totalPages) {
          state.page++;
          update();
          scrollToResults();
        }
      });
    nav.querySelectorAll(".pagination__page").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var p = parseInt(btn.dataset.page, 10);
        if (p !== state.page) {
          state.page = p;
          update();
          scrollToResults();
        }
      });
    });
  }

  function buildPageRange(current, total) {
    if (total <= 7) {
      var arr = [];
      for (var i = 1; i <= total; i++) arr.push(i);
      return arr;
    }
    var pages = [1];
    if (current > 3) pages.push("…");
    for (
      var j = Math.max(2, current - 1);
      j <= Math.min(total - 1, current + 1);
      j++
    ) {
      pages.push(j);
    }
    if (current < total - 2) pages.push("…");
    pages.push(total);
    return pages;
  }

  function renderActiveFilters() {
    var container = document.getElementById("activeFilters");
    if (!container) return;

    var chips = [];

    function addChips(arr, type) {
      arr.forEach(function (v) {
        var label = (LABEL_MAP[type] && LABEL_MAP[type][v]) || v;
        chips.push({ type: type, value: v, label: label });
      });
    }

    addChips(state.status, "status");
    addChips(state.beds, "beds");
    addChips(state.baths, "baths");
    if (state.areaMin)
      chips.push({
        type: "areaMin",
        value: state.areaMin,
        label: "Min " + state.areaMin + " sqm",
      });
    if (state.areaMax)
      chips.push({
        type: "areaMax",
        value: state.areaMax,
        label: "Max " + state.areaMax + " sqm",
      });
    addChips(state.developer, "developer");
    addChips(state.completion, "completion");
    if (state.paymentPlan)
      chips.push({ type: "paymentPlan", value: "true", label: "Payment Plan" });
    addChips(state.furnishing, "furnishing");
    addChips(state.views, "views");
    addChips(state.amenities, "amenities");

    if (chips.length === 0) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = chips
      .map(function (c) {
        return (
          '<span class="filter-chip" data-type="' +
          c.type +
          '" data-value="' +
          c.value +
          '">' +
          c.label +
          '<button class="filter-chip__remove" aria-label="Remove ' +
          c.label +
          '">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          "</button>" +
          "</span>"
        );
      })
      .join("");

    container.querySelectorAll(".filter-chip__remove").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var chip = btn.closest(".filter-chip");
        var type = chip.dataset.type;
        var value = chip.dataset.value;
        removeFilter(type, value);
      });
    });

    updateFiltersBadge(chips.length);
  }

  function updateResultsCount(total) {
    var el = document.getElementById("resultsCount");
    if (el)
      el.innerHTML =
        "Showing <strong>" +
        total +
        "</strong> project" +
        (total !== 1 ? "s" : "");
  }

  function updateFiltersBadge(count) {
    var badge = document.getElementById("filtersBadge");
    if (!badge) return;
    if (count > 0) {
      badge.textContent = count;
      badge.hidden = false;
    } else {
      badge.hidden = true;
    }
  }

  /* ==========================================
     MAIN UPDATE
     ========================================== */
  function update() {
    var filtered = filterProjects(PROJECTS);
    var sorted = sortProjects(filtered);
    var paged = getPage(sorted);

    renderGrid(paged);
    renderPagination(filtered.length);
    renderActiveFilters();
    updateResultsCount(filtered.length);
  }

  function scrollToResults() {
    var results = document.querySelector(".projects-results");
    if (results) {
      var top = results.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  }

  /* ==========================================
     REMOVE FILTER (from chip click)
     ========================================== */
  function removeFilter(type, value) {
    if (type === "areaMin") {
      state.areaMin = "";
      var el = document.getElementById("areaMin");
      if (el) el.value = "";
    } else if (type === "areaMax") {
      state.areaMax = "";
      var el2 = document.getElementById("areaMax");
      if (el2) el2.value = "";
    } else if (type === "paymentPlan") {
      state.paymentPlan = false;
      var el3 = document.getElementById("paymentPlanFilter");
      if (el3) el3.checked = false;
    } else if (Array.isArray(state[type])) {
      state[type] = state[type].filter(function (v) {
        return v !== value;
      });
      syncFilterUI(type, value, false);
    }
    state.page = 1;
    update();
  }

  function syncFilterUI(filterName, value, active) {
    // Sync checkboxes
    var inputs = document.querySelectorAll(
      'input[name="' + filterName + '"][value="' + value + '"]',
    );
    inputs.forEach(function (i) {
      i.checked = active;
    });
    // Sync pill/tag buttons
    var containers = document.querySelectorAll(
      '[data-filter="' + filterName + '"]',
    );
    containers.forEach(function (c) {
      var btns = c.querySelectorAll('[data-value="' + value + '"]');
      btns.forEach(function (b) {
        b.classList.remove("filter-pill--active", "filter-tag--active");
        if (active) {
          b.classList.add(
            b.classList.contains("filter-tag")
              ? "filter-tag--active"
              : "filter-pill--active",
          );
        }
      });
    });
  }

  /* ==========================================
     EVENT BINDING
     ========================================== */
  function bindEvents() {
    // Filter banner tabs (same logic as main.js but syncs state)
    document.querySelectorAll(".filter-banner__tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        document.querySelectorAll(".filter-banner__tab").forEach(function (t) {
          t.classList.remove("filter-banner__tab--active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("filter-banner__tab--active");
        tab.setAttribute("aria-selected", "true");
        var purpose = document.getElementById("filterPurpose");
        if (purpose) purpose.value = tab.dataset.purpose;
      });
    });

    // Basic filter form submit
    var basicForm = document.getElementById("basicFilterForm");
    if (basicForm) {
      basicForm.addEventListener("submit", function (e) {
        e.preventDefault();
        state.page = 1;
        update();
        scrollToResults();
      });
    }

    // Checkbox filters (status, developer, completion)
    document
      .querySelectorAll(".adv-filter[type='checkbox']:not(#paymentPlanFilter)")
      .forEach(function (input) {
        var filterName = input.name; // "status" | "developer" | "completion"
        if (!filterName) return;
        input.addEventListener("change", function () {
          if (!Array.isArray(state[filterName])) return;
          if (input.checked) {
            if (state[filterName].indexOf(input.value) === -1)
              state[filterName].push(input.value);
          } else {
            state[filterName] = state[filterName].filter(function (v) {
              return v !== input.value;
            });
          }
          state.page = 1;
          update();
        });
      });

    // Payment plan toggle
    var paymentToggle = document.getElementById("paymentPlanFilter");
    if (paymentToggle) {
      paymentToggle.addEventListener("change", function () {
        state.paymentPlan = paymentToggle.checked;
        state.page = 1;
        update();
      });
    }

    // Area range inputs
    ["areaMin", "areaMax"].forEach(function (id) {
      var input = document.getElementById(id);
      if (!input) return;
      var timer;
      input.addEventListener("input", function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          state[id] = input.value.trim();
          state.page = 1;
          update();
        }, 400);
      });
    });

    // Pill buttons (beds, baths, furnishing)
    document.querySelectorAll(".filter-pills").forEach(function (group) {
      var filterName = group.dataset.filter;
      var isMulti = group.dataset.multi !== "false";
      if (!filterName) return;

      group.querySelectorAll(".filter-pill").forEach(function (pill) {
        pill.addEventListener("click", function () {
          var value = pill.dataset.value;
          var isActive = pill.classList.contains("filter-pill--active");

          if (!Array.isArray(state[filterName])) state[filterName] = [];

          if (!isMulti) {
            // Single select — deselect all others
            group.querySelectorAll(".filter-pill").forEach(function (p) {
              p.classList.remove("filter-pill--active");
            });
            state[filterName] = [];
            if (!isActive) {
              pill.classList.add("filter-pill--active");
              state[filterName] = [value];
            }
          } else {
            // Multi select
            if (isActive) {
              pill.classList.remove("filter-pill--active");
              state[filterName] = state[filterName].filter(function (v) {
                return v !== value;
              });
            } else {
              pill.classList.add("filter-pill--active");
              state[filterName].push(value);
            }
          }

          state.page = 1;
          update();
        });
      });
    });

    // Tag buttons (views, amenities)
    document.querySelectorAll(".filter-tags").forEach(function (group) {
      var filterName = group.dataset.filter;
      if (!filterName) return;
      group.querySelectorAll(".filter-tag").forEach(function (tag) {
        tag.addEventListener("click", function () {
          var value = tag.dataset.value;
          var isActive = tag.classList.contains("filter-tag--active");
          if (!Array.isArray(state[filterName])) state[filterName] = [];

          if (isActive) {
            tag.classList.remove("filter-tag--active");
            state[filterName] = state[filterName].filter(function (v) {
              return v !== value;
            });
          } else {
            tag.classList.add("filter-tag--active");
            state[filterName].push(value);
          }
          state.page = 1;
          update();
        });
      });
    });

    // Sort
    var sortSelect = document.getElementById("resultsSort");
    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        state.sort = sortSelect.value;
        state.page = 1;
        update();
      });
    }

    // Clear all
    var clearAll = document.getElementById("clearAllFilters");
    var emptyReset = document.getElementById("emptyResetBtn");
    function clearAllFilters() {
      state.status = [];
      state.beds = [];
      state.baths = [];
      state.areaMin = "";
      state.areaMax = "";
      state.developer = [];
      state.completion = [];
      state.paymentPlan = false;
      state.furnishing = [];
      state.views = [];
      state.amenities = [];
      state.page = 1;

      document.querySelectorAll(".adv-filter").forEach(function (el) {
        if (el.type === "checkbox") el.checked = false;
      });
      document.querySelectorAll(".filter-pill--active").forEach(function (p) {
        p.classList.remove("filter-pill--active");
      });
      document.querySelectorAll(".filter-tag--active").forEach(function (t) {
        t.classList.remove("filter-tag--active");
      });
      var aMin = document.getElementById("areaMin");
      var aMax = document.getElementById("areaMax");
      if (aMin) aMin.value = "";
      if (aMax) aMax.value = "";

      update();
    }
    if (clearAll) clearAll.addEventListener("click", clearAllFilters);
    if (emptyReset) emptyReset.addEventListener("click", clearAllFilters);

    // Collapsible filter sections
    document
      .querySelectorAll(".filter-section__toggle")
      .forEach(function (toggle) {
        toggle.addEventListener("click", function () {
          var expanded = toggle.getAttribute("aria-expanded") === "true";
          var body = toggle.nextElementSibling;
          if (!body) return;
          if (expanded) {
            toggle.setAttribute("aria-expanded", "false");
            body.classList.add("filter-section__body--collapsed");
          } else {
            toggle.setAttribute("aria-expanded", "true");
            body.classList.remove("filter-section__body--collapsed");
            body.style.animation = "none";
            body.offsetHeight; // reflow
            body.style.animation = "";
          }
        });
      });

    // Mobile sidebar toggle
    var mobileBtn = document.getElementById("filtersMobileBtn");
    var sidebar = document.getElementById("filtersSidebar");
    var overlay = document.getElementById("sidebarOverlay");

    function openSidebar() {
      sidebar.classList.add("filters-sidebar--open");
      overlay.classList.add("sidebar-overlay--visible");
      overlay.setAttribute("aria-hidden", "false");
      mobileBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
      sidebar.classList.remove("filters-sidebar--open");
      overlay.classList.remove("sidebar-overlay--visible");
      overlay.setAttribute("aria-hidden", "true");
      mobileBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    if (mobileBtn) mobileBtn.addEventListener("click", openSidebar);
    if (overlay) overlay.addEventListener("click", closeSidebar);

    // Sidebar "Apply" on mobile: closing via swipe outside
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeSidebar();
    });
  }

  /* ==========================================
     INIT
     ========================================== */
  document.addEventListener("DOMContentLoaded", function () {
    bindEvents();
    update();
  });
})();
