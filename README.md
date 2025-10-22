# 🌌 Nebula Dimensions — 3D Interactive Website

A fully responsive and immersive 3D website showcasing cosmic environments with modern UI, interactive starfields, and smooth controls. Perfect for demos, portfolios, or creative experiences.


[Live Demo]([https://your-username.github.io/your-repo-name](https://piyushkadam96k.github.io/Nebula-Dimensions-3d/)) 🚀 | ![Made with Three.js]([https://img.shields.io/badge/Three.js-Style-Blue](https://piyushkadam96k.github.io/Nebula-Dimensions-3d/))

## ✨ Highlights

- 🔭 Interactive 3D Background — Dynamic starfield & nebula particles that react to mouse/touch
- 📱 Responsive Layout — Works across mobile, tablet, and desktop
- 🎛️ 3D Gallery & Model Viewer — Orbit controls, zoom, and model interaction
- ⚡ Performance Optimized — Adaptive pixel ratio, lazy loading, and efficient particle systems
- ♿ Accessibility — Keyboard-friendly navigation & semantic markup
- 🔒 Privacy-first — No third-party trackers by default

## 🚀 Quick Start

1. Clone repository:
   git clone <repo-url>
2. Install dependencies (if using a dev server):
   npm install
3. Start local server:
   npm run start
4. Open:
   http://localhost:3000

Or simply open `index.html` for a static preview.

## 🎮 Controls & Interaction

- Mouse / Touch:
  - Move pointer — parallax & nebula response ✋
  - Scroll / Pinch — zoom in/out 🔍
  - Click / Tap — interact with hotspots ⚪
- Keyboard:
  - WASD / Arrow keys — camera navigation
  - Space — toggle auto-rotate
  - D — toggle debug overlay

## 🛠️ Customization

- Theme: adjust CSS variables in `style.css` for colors & gradients 🎨  
- Particle systems: tune particle count & behavior in `main.js` or `particles.js` ✨  
- Models: drop GLTF/GLB files into `/assets/models` and update gallery JSON to add entries 📁

## ⚙️ Performance Tips

- Reduce particle count for low-end devices 🐢  
- Use compressed textures and Draco-compressed models for faster load 🗜️  
- Enable adaptive pixel ratio: renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) 🖥️  
- Lazy-load heavy scenes on user interaction or when in viewport ⚡

## 🔍 Troubleshooting

- Black canvas / no WebGL: ensure browser supports WebGL and hardware acceleration is enabled 🛠️  
- Models not loading: confirm correct paths and CORS settings when served from remote hosts 🌐  
- Slow performance: enable low-detail fallback in settings or reduce particle/model LOD 🔧

## 📁 Project Structure

```
Nebula-Dimensions-3d/
├── index.html
├── src/
│   ├── main.js         # app entry, scene setup
│   ├── particles.js    # particle systems
│   ├── controls.js     # input handlers
│   └── utils/          # helpers (loader, performance)
├── assets/
│   ├── models/
│   └── textures/
├── style.css
└── README.md
```

## 🔧 Tech Stack

- Three.js — 3D rendering 🌐  
- Tailwind CSS — utility styling ⚡  
- Vanilla JS (ES6+) — interactions 🧠  
- Intersection Observer — scroll-triggered effects 👀

## 🎨 Visual & UX Notes

- Uses subtle bloom & vignette for cinematic look ✨  
- Dark-first color palette with neon accents 🌃  
- Smooth easing and micro-interactions for polished feel 🪄

## 💡 Ideas & Roadmap

- Add multiplayer synced nebula scenes 🌍  
- Session recording for interactions 🎞️  
- Accessibility audit & ARIA improvements ♿  
- Export scene snapshots / GIF generator 📸

## 🙏 Credits

- Three.js (https://threejs.org)  
- Font Awesome / Google Fonts for UI assets  
- Inspiration: space art & procedural particle systems 🌠

## 📬 Contact

Questions, feedback, or collaborations: kadamamit462@gmail.com ✉️

## 📝 License

MIT License — see LICENSE file for details. © 2025

---
Enjoy exploring the nebula. ✨
