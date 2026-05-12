# Muay Thai Kick Counter

A mobile-first training web app for tracking kick count across rounds during Muay Thai sessions. Built for fighters who need a fast, no-friction counter they can tap mid-round — with round history logged on-screen and a camera feed stub ready for future AI motion detection integration.

---

## You can view the live demo of the project here: https://kick-count.netlify.app/

---

## Features

- **One-tap kick counting** — increment counter with a single button press
- **Round save system** — saves current count to a round history log, then resets counter to zero
- **Full page restart** — wipes all state via `window.location.reload()`
- **Camera access** — requests `getUserMedia` for live video feed (AI detection hook, not yet implemented)
- **Login UI** — styled form overlay (frontend only, no auth logic wired)
- **Responsive layout** — mobile-first with a `1024px` breakpoint switching to a desktop two-column layout
- **Google Fonts** — Bungee and Holtwood One SC loaded via CDN

---

## Tech Stack

| Layer   | Technology                                   |
|---------|----------------------------------------------|
| Markup  | HTML5                                         |
| Styling | CSS3 (Flexbox, Grid, media queries, gradients)|
| Logic   | Vanilla JavaScript (ES5-compatible)           |
| Fonts   | Google Fonts (Bungee, Holtwood One SC)        |
| Camera  | Web API — `navigator.mediaDevices.getUserMedia` |

No frameworks. No dependencies. No build step.

---

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/muaythai-kick-counter.git
cd muaythai-kick-counter

# 2. Open locally — no build step required
open index.html        # macOS
xdg-open index.html    # Linux
```

> **Camera access** requires the page to be served over HTTPS or `localhost`. Opening `index.html` directly as a `file://` URL will cause `getUserMedia` to fail in most browsers.

```bash
# Serve locally with Python (simplest option)
python3 -m http.server 8080
# Then open http://localhost:8080
```

---

## Usage

| Action | How |
|--------|-----|
| Count a kick | Click the **Kick** button |
| Save round and reset | Click the **Save** (💾) button — appends count to round history |
| Restart session | Click **Restart ⟳** — full page reload, all data cleared |
| Enable camera | Click the camera button — prompts browser permission |

> Login form is UI-only. No credentials are validated — submitting the form does nothing in the current version.

---

## Architecture

```
index.html
│
├── clik counter.css    # All styling — mobile layout + 1024px desktop breakpoint
└── clik counter.js     # All application logic
    │
    ├── count (int)     # In-memory state — current kick count
    ├── clickment()     # Increments count, updates #Ecrant
    ├── save()          # Appends count to #save-el, resets count to 0
    ├── handleClick()   # window.location.reload() — full state wipe
    └── openCamera()    # Requests camera via getUserMedia, binds stream to #cameraFeed
```

**State model:** entirely in-memory. No localStorage, no database. All data is lost on page reload — this is by design for the restart flow, but means round history does not persist across sessions.

---

## Known Limitations & Issues

**Bugs in current code:**

- **Camera feed broken** — `openCamera()` queries `document.getElementById('camera')` but the element ID in HTML is `cameraFeed`. Fix: change `const video = document.getElementById('camera')` → `'cameraFeed'`
- **Duplicate `<title>` tags** in `<head>` — remove one
- **`<link rel="stylesheet">` inside `<body>`** — move to `<head>`
- **`<html>` tag appears twice** — remove the orphaned opening `<html>` before `<!DOCTYPE>`
- **Login form does nothing** — `method="get"` submits to the same page with query params; no validation or auth logic is connected

**Design limitations:**

- No data persistence — round history clears on reload
- AI kick detection (via camera) is not implemented — `openCamera()` only starts the feed
- File names contain spaces (`clik counter.js`, `clik counter.css`) — rename to `kick-counter.js` / `kick-counter.css` for cross-platform compatibility

---

## Roadmap

- [ ] Fix `getElementById('camera')` → `'cameraFeed'`
- [ ] Move `<link>` tags to `<head>`, remove duplicate markup
- [ ] Add localStorage persistence for round history
- [ ] Implement pose detection (MediaPipe or TensorFlow.js) for automated kick counting
- [ ] Wire login form to an auth backend

---

## Author

**Taha Belghiti** — Junior Front-End Developer  
Built with HTML, CSS, and JavaScript · © 2026
