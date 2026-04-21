# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dastan Real Estate — a fully static, multi-page real estate marketing site. There is no build step, no npm, no TypeScript, and no framework. All code is vanilla ES5-compatible JavaScript, HTML5, and CSS3.

## Development Setup

No installation needed. Serve locally with any static file server:

```bash
# Python (built-in)
python -m http.server 8000

# Node.js (if installed)
npx serve .

# VS Code: use the Live Server extension
```

Open `http://localhost:8000` in a browser.

## Pages

| File | Route | Purpose |
|---|---|---|
| `index.html` + `js/main.js` | `/` | Homepage — hero slider, animated counters, Swiper carousels |
| `projects.html` + `js/projects.js` | `/projects.html` | Off-plan project listings with filters |
| `properties.html` + `js/properties.js` | `/properties.html` | Resale/rental listings with filters |
| `property.html` + `js/property.js` | `/property.html` | Property detail — gallery lightbox, similar properties |

Each HTML page is self-contained and independent. There is no shared runtime state across pages.

## Architecture Patterns

### State & Rendering

Each listing page (`projects.js`, `properties.js`) owns a single local `state` object:

```javascript
var state = {
  searchTerm: "",
  sortBy: "newest",
  page: 1,
  filters: { /* all active filters */ }
};
```

The data flow is: **user interaction → update `state` → call `update()` → re-render DOM via `innerHTML`**. There is no virtual DOM.

### Data Source

All property and project data is **hardcoded as JavaScript arrays** at the top of each page's JS file (e.g., `var PROPERTIES = [...]`). To integrate a real backend, replace those arrays with a `fetch()` call and invoke the existing `update()` function on success.

### Filtering & Pagination

`filterAndSort()` in both listing pages filters the data array against `state.filters`, then sorts, then slices for pagination (12 items/page). Adding a new filter means:
1. Adding the filter field to `state.filters`
2. Adding an `&&` clause in `filterAndSort()`
3. Adding the UI control and its event listener

### CSS Architecture

All design tokens live in `:root` inside `css/style.css`:

```css
:root {
  --color-primary: #0a1e77;     /* Royal Navy */
  --color-accent: #e8734a;      /* Warm Orange */
  --font-heading: "Montserrat", sans-serif;
  --font-body: "Inter", sans-serif;
  /* spacing, shadow, radius, transition variables */
}
```

Class naming follows BEM (`.navbar`, `.navbar__logo`, `.navbar__menu--open`). There is no CSS framework.

Responsive breakpoints: `560px`, `900px`, `1200px`.

### Third-Party Libraries (CDN only)

- **Swiper.js v11** — all carousels and sliders
- **Google Fonts** — Inter (body), Montserrat (headings)

No other external dependencies.

## Key Files to Understand

- `css/style.css` (3,100+ lines) — all design tokens, global components, and responsive styles
- `js/projects.js` (1,160+ lines) — canonical reference for the filter/sort/pagination pattern
- `js/main.js` — splash screen, Swiper initialization, scroll reveal, counter animations
- `js/property.js` — gallery lightbox with keyboard nav, native share API
