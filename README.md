# Deep Connection — Copilot Instructions

## Project Overview

A **static, no-build** Vietnamese/English bilingual card game for deep conversations. Users pick a category, then swipe/tap through question cards. Mobile-first PWA-style app served as plain HTML/CSS/JS — no framework, no bundler, no package manager.

## Architecture

- **Four screens** in `index.html`, switched via CSS `.active` class toggling (`DC.switchScreen()` in `js/screens.js`):
  - `#screen-cover` — animated landing page (tap anywhere → home)
  - `#screen-home` — category grid selection
  - `#screen-play` — card stack with flip/swipe interactions
  - `#screen-info` — about / info page with easter egg
- **JS uses a global namespace `window.DC`** — shared state in `DC.state`, DOM refs in `DC.refs`, all functions attached to `DC.*`. Multiple `<script>` files loaded in dependency order (no ES modules, no build step)
- **Data loaded at runtime** via `fetch('data/<category>.json')` for each of the 6 category files — no compile-time imports
- **Dark/light theme** toggled via `data-theme="light"` attribute on `<html>`, persisted in `localStorage` key `dc-theme`. Default is dark. CSS overrides live in `[data-theme='light']` blocks across CSS files
- **Card stack renders up to 3 elements**: `.active-card` (interactive) + `.stack-1` + `.stack-2` (visual depth). `DC.renderCards()` clears and rebuilds `#card-stack` innerHTML each time
- **Special card effect** triggers for deep/sensitive tagged cards (`DC.triggerSpecialCard()`) — glow, shimmer, particle burst animations

## Key Files

### HTML

| File         | Purpose                                                           |
| ------------ | ----------------------------------------------------------------- |
| `index.html` | All 4 screens + completion modal `#modal-reset`, single HTML file |

### JavaScript (`js/` — loaded in this order)

| File                 | Purpose                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `js/state.js`        | `window.DC` namespace, `DC.state`, `DC.$()`, `DC.refs`, `DC.initRefs()`                                |
| `js/utils.js`        | `DC.shuffleArray()`, `DC.updatePrevBtn()`, `DC.playSound()` sound engine                               |
| `js/theme.js`        | `DC.initTheme()`, `DC.applyTheme()`, `DC.toggleTheme()`                                                |
| `js/feedback.js`     | Feature flags, feedback CRUD, `DC.bindFeedbackEvents()`, webhook                                       |
| `js/categories.js`   | `DC.renderCategories()`, `DC.startCategory()`                                                          |
| `js/cards.js`        | `DC.renderCards()`, `DC.createCardElement()`, `DC.triggerSpecialCard()`                                |
| `js/interactions.js` | `DC.bindCardEvents()`, `DC.toggleFlip()`, `DC.prevCard()`, `DC.nextCard()`                             |
| `js/screens.js`      | `DC.switchScreen()`, `DC.showModal()`, `DC.hideModal()`, `DC.bindCoverEvents()`, `DC.bindInfoEvents()` |
| `js/main.js`         | `DC.init()` bootstrap, `DC.bindGlobalEvents()`, DOMContentLoaded boot                                  |

### CSS (`css/` — loaded in this order)

| File                 | Purpose                                                             |
| -------------------- | ------------------------------------------------------------------- |
| `css/variables.css`  | `:root` CSS vars + `[data-theme='light']` root overrides            |
| `css/base.css`       | Reset, body, `.screen` management                                   |
| `css/cover.css`      | Cover screen: container, hearts, deck, title, footer                |
| `css/home.css`       | Home screen: header, category grid, cards, footer                   |
| `css/play.css`       | Play screen: header, card stack, faces, ornaments, feedback, footer |
| `css/info.css`       | Info screen: hero, sections, steps, dedication                      |
| `css/modal.css`      | Modal overlay + content + buttons                                   |
| `css/components.css` | Theme toggle + light theme component overrides                      |
| `css/animations.css` | Special card animations: particles, glow, shimmer                   |
| `css/responsive.css` | Media queries: tablet, desktop, landscape, safe-area                |

### Data

| File                   | Purpose                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `data/<category>.json` | 6 category files: `first-sparks`, `understanding`, `passion`, `bonding`, `challenges`, `future` |

## Data Schema (`data/questions.json`)

```json
{
  "categories": [
    {
      "id": "first-sparks",
      "name_vi": "Rung Động",
      "name_en": "First Sparks",
      "color": "#FF6B9D",
      "icon": "💘",
      "questions": [{ "id": 1, "text_vi": "...", "text_en": "..." }]
    }
  ]
}
```

- **6 categories** exist: `first-sparks`, `understanding`, `passion`, `bonding`, `challenges`, `future`
- Category `color` drives card gradients (inline `style`) and hover borders via `--category-color` CSS variable
- Question `id` is unique only **within** its category, not globally
- All user-facing text is bilingual — always provide both `_vi` and `_en` fields

## Conventions

- **Vietnamese is primary UI language** (labels, hints, footer). English appears as secondary text on card backs
- **CSS variables** in `:root` (`css/variables.css`) — use `--bg-primary`, `--accent`, `--font-display`, `--card-width`, etc. Never hardcode colors/fonts
- **DOM refs** use `DC.$()` shorthand (`querySelector`) declared in `js/state.js` — add new refs in `DC.initRefs()`
- **HTML rendering** uses string concatenation assigned to `.innerHTML` (e.g., `renderCategories()`, `createCardElement()`)
- **No external JS deps** — vanilla JS only. Fisher-Yates shuffle is local. No ES modules, no imports
- **Touch + mouse** events both bound on card interactions; swipe direction inverts when card is flipped (`state.isFlipped` negates X delta)
- **Keyboard**: Arrow keys → next card, Space/Enter → flip, Escape → back/close modal
- **Theme toggle** buttons exist on all 4 screens (class `.theme-toggle`), all wired to same `DC.toggleTheme()` function

## When Adding a New Category

1. Add category object to `data/questions.json` — follow existing schema exactly
2. Pick a distinct `color` hex and emoji `icon` not already used
3. No JS/HTML changes needed — categories render dynamically

## When Adding New Features

- Add new functions to the appropriate `js/*.js` file, attaching them to the `DC` namespace (e.g., `DC.myNewFunction = function() {...}`)
- If a new file is needed, add it in the correct load order in `index.html` `<script>` tags
- Use the string concatenation → `.innerHTML` pattern (see `createCardElement()` for the most complex example)
- Use CSS transitions/animations — no JS animation libraries
- For new screens: add a `<div class="screen">` in `index.html`, switch with `DC.switchScreen()`
- Persist user preferences in `localStorage` with `dc-` prefix (e.g., `dc-theme`)
- Safe area insets use `env(safe-area-inset-*)` — preserve for notch devices
- Light theme overrides go in `[data-theme='light']` blocks in `css/components.css` or the relevant screen CSS file

## Running Locally

Serve with any static file server from the project root:

```sh
npx serve          # or VS Code Live Server, or python -m http.server
```

No install or build step required.
