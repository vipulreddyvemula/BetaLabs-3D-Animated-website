# 3D Animated Website (Static HTML/CSS/JS)
-made for betalabs ui/ux animation competition
A fully static animated landing page built with HTML, CSS, and JavaScript.
No Node.js runtime or bundler is required.

## Features

- 3D background using Three.js
- Fluid splash cursor effect (desktop + touch/mobile)
- GSAP section animations
- Smooth scrolling navigation
- Responsive layout for desktop, tablet, and mobile
- Mobile-optimized 3D quality and interaction

## Run Locally

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Use a local static server (recommended)

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Project Structure

```text
index.html
src/
	style.css
	script.js
	splashCursor.js
	gooey.js
```

## Dependencies

This project uses CDN scripts loaded in `index.html`:

- Three.js
- GSAP + ScrollTrigger
- Anime.js

## Mobile Support Notes

- Splash cursor supports `touchstart`, `touchmove`, and `touchend`.
- 3D scene adapts on mobile with reduced particle count and lower pixel ratio for smoother performance.
- Touch movement is mapped to 3D camera interaction.

