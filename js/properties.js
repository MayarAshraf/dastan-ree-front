/* ============================================
   DASTAN REAL ESTATE — Properties List Page
   Filter + Pagination + Sort logic
   ============================================ */

(function () {
  "use strict";

  /* ==========================================
     PROPERTIES DATA
     ========================================== */
  var PROPERTIES = [
    {
      id: 1,
      title: "Marina Gate — 2BR Apartment",
      type: "apartment",
      purpose: "sale",
      location: "Dubai Marina",
      community: "marina",
      communityLabel: "Dubai Marina",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      priceRaw: 1800000,
      priceDisplay: "EGP 1.8M",
      beds: 2,
      baths: 2,
      area: 1240,
      parking: true,
      furnishing: "furnished",
      views: ["sea", "city"],
      amenities: ["pool", "gym", "parking", "concierge"],
      featured: true,
      ref: "PROP-001",
    },
    {
      id: 2,
      title: "Palm Jumeirah Beachfront Villa",
      type: "villa",
      purpose: "sale",
      location: "Palm Jumeirah",
      community: "palm",
      communityLabel: "Palm Jumeirah",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      priceRaw: 6200000,
      priceDisplay: "EGP 6.2M",
      beds: 5,
      baths: 6,
      area: 8500,
      parking: true,
      furnishing: "semi",
      views: ["sea", "garden", "pool"],
      amenities: ["pool", "gym", "parking", "spa", "beach"],
      featured: false,
      ref: "PROP-002",
    },
    {
      id: 3,
      title: "Furnished Studio — Downtown",
      type: "studio",
      purpose: "rent",
      location: "Downtown Dubai",
      community: "downtown",
      communityLabel: "Downtown Dubai",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      priceRaw: 120000,
      priceDisplay: "EGP 120K/yr",
      beds: 0,
      baths: 1,
      area: 520,
      parking: false,
      furnishing: "furnished",
      views: ["city"],
      amenities: ["pool", "gym"],
      featured: false,
      ref: "PROP-003",
    },
    {
      id: 4,
      title: "Modern 1BR — Business Bay",
      type: "apartment",
      purpose: "rent",
      location: "Business Bay",
      community: "business-bay",
      communityLabel: "Business Bay",
      image:
        "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80",
      priceRaw: 95000,
      priceDisplay: "EGP 95K/yr",
      beds: 1,
      baths: 1,
      area: 780,
      parking: true,
      furnishing: "unfurnished",
      views: ["city", "canal"],
      amenities: ["pool", "gym", "parking"],
      featured: false,
      ref: "PROP-004",
    },
    {
      id: 5,
      title: "Golf-Front 4BR Villa",
      type: "villa",
      purpose: "sale",
      location: "Dubai Hills Estate",
      community: "hills",
      communityLabel: "Dubai Hills",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      priceRaw: 3800000,
      priceDisplay: "EGP 3.8M",
      beds: 4,
      baths: 4,
      area: 4200,
      parking: true,
      furnishing: "unfurnished",
      views: ["garden", "golf"],
      amenities: ["pool", "gym", "parking", "kids"],
      featured: true,
      ref: "PROP-005",
    },
    {
      id: 6,
      title: "Creek View 2BR — Creek Harbour",
      type: "apartment",
      purpose: "sale",
      location: "Dubai Creek Harbour",
      community: "creek",
      communityLabel: "Creek Harbour",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      priceRaw: 2100000,
      priceDisplay: "EGP 2.1M",
      beds: 2,
      baths: 2,
      area: 1450,
      parking: true,
      furnishing: "semi",
      views: ["sea", "city", "creek"],
      amenities: ["pool", "gym", "parking", "concierge"],
      featured: true,
      ref: "PROP-006",
    },
    {
      id: 7,
      title: "Bright 1BR Apartment — JVC",
      type: "apartment",
      purpose: "sale",
      location: "Jumeirah Village Circle",
      community: "jvc",
      communityLabel: "JVC & Sports City",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      priceRaw: 650000,
      priceDisplay: "EGP 650K",
      beds: 1,
      baths: 1,
      area: 680,
      parking: true,
      furnishing: "furnished",
      views: ["city", "garden"],
      amenities: ["pool", "gym", "parking"],
      featured: false,
      ref: "PROP-007",
    },
    {
      id: 8,
      title: "Spacious 3BR Townhouse",
      type: "townhouse",
      purpose: "sale",
      location: "Arabian Ranches",
      community: "arabian-ranches",
      communityLabel: "Arabian Ranches",
      image:
        "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&q=80",
      priceRaw: 2800000,
      priceDisplay: "EGP 2.8M",
      beds: 3,
      baths: 3,
      area: 2900,
      parking: true,
      furnishing: "unfurnished",
      views: ["garden"],
      amenities: ["pool", "gym", "parking", "kids"],
      featured: false,
      ref: "PROP-008",
    },
    {
      id: 9,
      title: "DIFC Penthouse Duplex",
      type: "penthouse",
      purpose: "sale",
      location: "DIFC",
      community: "difc",
      communityLabel: "DIFC",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      priceRaw: 4500000,
      priceDisplay: "EGP 4.5M",
      beds: 3,
      baths: 3,
      area: 2800,
      parking: true,
      furnishing: "furnished",
      views: ["city"],
      amenities: ["pool", "gym", "parking", "concierge", "spa"],
      featured: false,
      ref: "PROP-009",
    },
    {
      id: 10,
      title: "2BR Garden View — Dubai Hills",
      type: "apartment",
      purpose: "rent",
      location: "Dubai Hills Estate",
      community: "hills",
      communityLabel: "Dubai Hills",
      image:
        "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=800&q=80",
      priceRaw: 150000,
      priceDisplay: "EGP 150K/yr",
      beds: 2,
      baths: 2,
      area: 1100,
      parking: true,
      furnishing: "semi",
      views: ["garden", "golf"],
      amenities: ["pool", "gym", "parking"],
      featured: false,
      ref: "PROP-010",
    },
    {
      id: 11,
      title: "Affordable 2BR — Emaar South",
      type: "apartment",
      purpose: "sale",
      location: "Emaar South",
      community: "arabian-ranches",
      communityLabel: "Arabian Ranches",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      priceRaw: 890000,
      priceDisplay: "EGP 890K",
      beds: 2,
      baths: 2,
      area: 950,
      parking: false,
      furnishing: "unfurnished",
      views: ["garden"],
      amenities: ["pool", "gym", "parking", "kids"],
      featured: false,
      ref: "PROP-011",
    },
    {
      id: 12,
      title: "Premium 5BR Golf Villa",
      type: "villa",
      purpose: "sale",
      location: "DAMAC Hills",
      community: "hills",
      communityLabel: "Dubai Hills",
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      priceRaw: 5300000,
      priceDisplay: "EGP 5.3M",
      beds: 5,
      baths: 5,
      area: 6800,
      parking: true,
      furnishing: "semi",
      views: ["golf", "garden"],
      amenities: ["pool", "gym", "parking", "concierge", "spa"],
      featured: false,
      ref: "PROP-012",
    },
    {
      id: 13,
      title: "Cozy Studio — Al Barsha",
      type: "studio",
      purpose: "rent",
      location: "Al Barsha",
      community: "marina",
      communityLabel: "Dubai Marina & JBR",
      image:
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
      priceRaw: 60000,
      priceDisplay: "EGP 60K/yr",
      beds: 0,
      baths: 1,
      area: 420,
      parking: false,
      furnishing: "unfurnished",
      views: ["city"],
      amenities: ["pool", "parking"],
      featured: false,
      ref: "PROP-013",
    },
    {
      id: 14,
      title: "Bluewaters 4BR Penthouse",
      type: "penthouse",
      purpose: "sale",
      location: "Bluewaters Island",
      community: "marina",
      communityLabel: "Dubai Marina & JBR",
      image:
        "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&q=80",
      priceRaw: 7800000,
      priceDisplay: "EGP 7.8M",
      beds: 4,
      baths: 4,
      area: 5200,
      parking: true,
      furnishing: "furnished",
      views: ["sea", "city"],
      amenities: ["pool", "gym", "parking", "concierge", "spa", "beach"],
      featured: true,
      ref: "PROP-014",
    },
    {
      id: 15,
      title: "JBR Beachfront 2BR",
      type: "apartment",
      purpose: "sale",
      location: "JBR",
      community: "marina",
      communityLabel: "Dubai Marina & JBR",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      priceRaw: 2400000,
      priceDisplay: "EGP 2.4M",
      beds: 2,
      baths: 2,
      area: 1350,
      parking: true,
      furnishing: "furnished",
      views: ["sea", "city"],
      amenities: ["pool", "gym", "parking", "beach"],
      featured: false,
      ref: "PROP-015",
    },
    {
      id: 16,
      title: "Hartland 3BR Apartment",
      type: "apartment",
      purpose: "sale",
      location: "Sobha Hartland",
      community: "creek",
      communityLabel: "Creek Harbour",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80",
      priceRaw: 3100000,
      priceDisplay: "EGP 3.1M",
      beds: 3,
      baths: 3,
      area: 2100,
      parking: true,
      furnishing: "semi",
      views: ["city", "garden"],
      amenities: ["pool", "gym", "parking", "concierge"],
      featured: false,
      ref: "PROP-016",
    },
    {
      id: 17,
      title: "Premium 4BR Jumeirah Villa",
      type: "villa",
      purpose: "rent",
      location: "Jumeirah",
      community: "marina",
      communityLabel: "Dubai Marina & JBR",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      priceRaw: 350000,
      priceDisplay: "EGP 350K/yr",
      beds: 4,
      baths: 4,
      area: 5500,
      parking: true,
      furnishing: "semi",
      views: ["garden", "sea"],
      amenities: ["pool", "gym", "parking", "kids"],
      featured: true,
      ref: "PROP-017",
    },
    {
      id: 18,
      title: "Sports City 1BR",
      type: "apartment",
      purpose: "sale",
      location: "Sports City",
      community: "jvc",
      communityLabel: "JVC & Sports City",
      image:
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80",
      priceRaw: 450000,
      priceDisplay: "EGP 450K",
      beds: 1,
      baths: 1,
      area: 680,
      parking: false,
      furnishing: "unfurnished",
      views: ["city"],
      amenities: ["pool", "gym", "parking"],
      featured: false,
      ref: "PROP-018",
    },
    {
      id: 19,
      title: "Palm Jumeirah Townhouse",
      type: "townhouse",
      purpose: "sale",
      location: "Palm Jumeirah",
      community: "palm",
      communityLabel: "Palm Jumeirah",
      image:
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
      priceRaw: 4800000,
      priceDisplay: "EGP 4.8M",
      beds: 3,
      baths: 3,
      area: 3800,
      parking: true,
      furnishing: "furnished",
      views: ["sea", "garden", "pool"],
      amenities: ["pool", "gym", "parking", "beach"],
      featured: false,
      ref: "PROP-019",
    },
    {
      id: 20,
      title: "Downtown Sky-Level Penthouse",
      type: "penthouse",
      purpose: "sale",
      location: "Downtown Dubai",
      community: "downtown",
      communityLabel: "Downtown Dubai",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      priceRaw: 9500000,
      priceDisplay: "EGP 9.5M",
      beds: 4,
      baths: 4,
      area: 4600,
      parking: true,
      furnishing: "furnished",
      views: ["city"],
      amenities: ["pool", "gym", "parking", "concierge", "spa"],
      featured: true,
      ref: "PROP-020",
    },
  ];

  /* ==========================================
     STATE
     ========================================== */
  var state = {
    purpose: [],
    type: [],
    beds: [],
    baths: [],
    priceMin: "",
    priceMax: "",
    areaMin: "",
    areaMax: "",
    community: [],
    furnishing: [],
    parking: false,
    views: [],
    amenities: [],
    sort: "newest",
    page: 1,
    perPage: 9,
  };

  var LABEL_MAP = {
    purpose: { sale: "For Sale", rent: "For Rent" },
    type: {
      apartment: "Apartment",
      villa: "Villa",
      townhouse: "Townhouse",
      penthouse: "Penthouse",
      studio: "Studio",
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
    community: {
      marina: "Dubai Marina",
      downtown: "Downtown",
      palm: "Palm Jumeirah",
      "business-bay": "Business Bay",
      hills: "Dubai Hills",
      creek: "Creek Harbour",
      jvc: "JVC",
      difc: "DIFC",
      "arabian-ranches": "Arabian Ranches",
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
  function filterProperties(properties) {
    return properties.filter(function (p) {
      if (state.purpose.length && state.purpose.indexOf(p.purpose) === -1)
        return false;

      if (state.type.length && state.type.indexOf(p.type) === -1) return false;

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

      if (state.priceMin !== "" && p.priceRaw < parseInt(state.priceMin, 10))
        return false;
      if (state.priceMax !== "" && p.priceRaw > parseInt(state.priceMax, 10))
        return false;

      if (state.areaMin !== "" && p.area < parseInt(state.areaMin, 10))
        return false;
      if (state.areaMax !== "" && p.area > parseInt(state.areaMax, 10))
        return false;

      if (state.community.length && state.community.indexOf(p.community) === -1)
        return false;

      if (
        state.furnishing.length &&
        state.furnishing.indexOf(p.furnishing) === -1
      )
        return false;

      if (state.parking && !p.parking) return false;

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

  function sortProperties(properties) {
    var arr = properties.slice();
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

  function getPage(properties) {
    var start = (state.page - 1) * state.perPage;
    return properties.slice(start, start + state.perPage);
  }

  /* ==========================================
     RENDER FUNCTIONS
     ========================================== */
  function typeLabel(type) {
    var labels = {
      apartment: "Apartment",
      villa: "Villa",
      townhouse: "Townhouse",
      penthouse: "Penthouse",
      studio: "Studio",
    };
    return labels[type] || type;
  }

  function bedsLabel(beds) {
    return beds === 0 ? "Studio" : beds + " Bed" + (beds > 1 ? "s" : "");
  }

  function renderCard(property, index) {
    var delay = (index % state.perPage) * 0.05;
    var purposeClass =
      property.purpose === "rent"
        ? "property-card__purpose--rent"
        : "property-card__purpose--sale";
    var purposeText = property.purpose === "rent" ? "For Rent" : "For Sale";
    var priceLabel = property.purpose === "rent" ? "Annual Rent" : "Sale Price";

    var featuredHtml = property.featured
      ? '<span class="property-card__featured">&#9733; Featured</span>'
      : "";

    var specsHtml =
      '<span class="property-card__spec">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' +
      bedsLabel(property.beds) +
      "</span>" +
      '<span class="property-card__spec-dot"></span>' +
      '<span class="property-card__spec">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M4 6h16M4 18h7"/><circle cx="17" cy="18" r="3"/></svg>' +
      property.baths +
      " Bath" +
      (property.baths > 1 ? "s" : "") +
      "</span>" +
      '<span class="property-card__spec-dot"></span>' +
      '<span class="property-card__spec">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>' +
      property.area.toLocaleString() +
      " sqm" +
      "</span>";

    return (
      '<article class="property-card property-card-enter" role="listitem" style="animation-delay:' +
      delay +
      's">' +
      '<div class="property-card__image-wrap">' +
      '<img class="property-card__img" src="' +
      property.image +
      '" alt="' +
      property.title +
      '" loading="lazy"/>' +
      '<span class="property-card__purpose ' +
      purposeClass +
      '">' +
      purposeText +
      "</span>" +
      featuredHtml +
      "</div>" +
      '<div class="property-card__body">' +
      '<span class="property-card__type">' +
      typeLabel(property.type) +
      "</span>" +
      '<h3 class="property-card__title">' +
      property.title +
      "</h3>" +
      '<div class="property-card__location">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
      property.location +
      "</div>" +
      '<div class="property-card__specs">' +
      specsHtml +
      "</div>" +
      '<div class="property-card__footer">' +
      '<div class="property-card__price">' +
      '<span class="property-card__price-label">' +
      priceLabel +
      "</span>" +
      '<span class="property-card__price-value">' +
      property.priceDisplay +
      "</span>" +
      "</div>" +
      '<a href="property.html" class="property-card__cta" aria-label="View ' +
      property.title +
      '">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
      "</a>" +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function renderGrid(paged) {
    var grid = document.getElementById("propertiesGrid");
    var empty = document.getElementById("propertiesEmpty");
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

    addChips(state.purpose, "purpose");
    addChips(state.type, "type");
    addChips(state.beds, "beds");
    addChips(state.baths, "baths");
    if (state.priceMin)
      chips.push({
        type: "priceMin",
        value: state.priceMin,
        label: "Min EGP " + Number(state.priceMin).toLocaleString(),
      });
    if (state.priceMax)
      chips.push({
        type: "priceMax",
        value: state.priceMax,
        label: "Max EGP " + Number(state.priceMax).toLocaleString(),
      });
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
    addChips(state.community, "community");
    addChips(state.furnishing, "furnishing");
    if (state.parking)
      chips.push({ type: "parking", value: "true", label: "Parking" });
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
        "</strong> propert" +
        (total !== 1 ? "ies" : "y");
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
    var filtered = filterProperties(PROPERTIES);
    var sorted = sortProperties(filtered);
    var paged = getPage(sorted);

    renderGrid(paged);
    renderPagination(filtered.length);
    renderActiveFilters();
    updateResultsCount(filtered.length);
  }

  function scrollToResults() {
    var results = document.querySelector(".properties-results");
    if (results) {
      var top = results.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  }

  /* ==========================================
     REMOVE FILTER (from chip click)
     ========================================== */
  function removeFilter(type, value) {
    if (type === "priceMin") {
      state.priceMin = "";
      var el = document.getElementById("priceMin");
      if (el) el.value = "";
    } else if (type === "priceMax") {
      state.priceMax = "";
      var el2 = document.getElementById("priceMax");
      if (el2) el2.value = "";
    } else if (type === "areaMin") {
      state.areaMin = "";
      var el3 = document.getElementById("areaMin");
      if (el3) el3.value = "";
    } else if (type === "areaMax") {
      state.areaMax = "";
      var el4 = document.getElementById("areaMax");
      if (el4) el4.value = "";
    } else if (type === "parking") {
      state.parking = false;
      var el5 = document.getElementById("parkingFilter");
      if (el5) el5.checked = false;
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
    var inputs = document.querySelectorAll(
      'input[name="' + filterName + '"][value="' + value + '"]',
    );
    inputs.forEach(function (i) {
      i.checked = active;
    });
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

    var basicForm = document.getElementById("basicFilterForm");
    if (basicForm) {
      basicForm.addEventListener("submit", function (e) {
        e.preventDefault();
        state.page = 1;
        update();
        scrollToResults();
      });
    }

    // Checkbox filters (purpose, type, community)
    document
      .querySelectorAll(".adv-filter[type='checkbox']:not(#parkingFilter)")
      .forEach(function (input) {
        var filterName = input.name;
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

    // Parking toggle
    var parkingToggle = document.getElementById("parkingFilter");
    if (parkingToggle) {
      parkingToggle.addEventListener("change", function () {
        state.parking = parkingToggle.checked;
        state.page = 1;
        update();
      });
    }

    // Price + area range inputs (sidebar)
    ["priceMin", "priceMax", "areaMin", "areaMax"].forEach(function (id) {
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

    // Banner price inputs (map to same state keys)
    [["bannerPriceMin", "priceMin"], ["bannerPriceMax", "priceMax"]].forEach(function (pair) {
      var input = document.getElementById(pair[0]);
      if (!input) return;
      var timer;
      input.addEventListener("input", function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          state[pair[1]] = input.value.trim();
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
            group.querySelectorAll(".filter-pill").forEach(function (p) {
              p.classList.remove("filter-pill--active");
            });
            state[filterName] = [];
            if (!isActive) {
              pill.classList.add("filter-pill--active");
              state[filterName] = [value];
            }
          } else {
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
      state.purpose = [];
      state.type = [];
      state.beds = [];
      state.baths = [];
      state.priceMin = "";
      state.priceMax = "";
      state.areaMin = "";
      state.areaMax = "";
      state.community = [];
      state.furnishing = [];
      state.parking = false;
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
      ["priceMin", "priceMax", "areaMin", "areaMax", "bannerPriceMin", "bannerPriceMax"].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.value = "";
      });

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
            body.offsetHeight;
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
