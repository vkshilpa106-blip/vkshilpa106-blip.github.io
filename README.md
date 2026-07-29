# AI Workforce Lab — Portfolio Site

Personal portfolio for **Shilpa Vellore Krishnamurthy** — HR Data Intelligence · Workday HCM · People Analytics · AI & Machine Learning.

## Folder structure

```
portfolio/
├── index.html          → all page content & structure
├── css/
│   └── style.css       → design tokens, layout, animations
├── js/
│   ├── main.js          → AOS, Typed.js, counters, timeline, nav
│   └── particles-config.js → AI network background
├── assets/
│   └── images/          → put any images/photos here
└── README.md
```

Libraries (loaded via CDN, no build step required): AOS, Typed.js, tsParticles, Font Awesome, Google Fonts (Space Grotesk / Inter / JetBrains Mono).

---

## Deploy to GitHub Pages

1. Create a new GitHub repository, e.g. `shilpa-portfolio`.
2. Push this folder's contents to the repo root:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/shilpa-portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source → Deploy from a branch**, choose `main` branch and `/ (root)` folder → **Save**.
4. Your site goes live at:
   `https://<your-username>.github.io/shilpa-portfolio/`
5. Optional: add a custom domain under the same Pages settings screen.

---

## How to customize later

### Colors
All colors are CSS variables at the top of `css/style.css`, inside `:root`:
```css
--bg: #0B1120;         /* page background */
--card: #111827;       /* card background */
--primary: #3B82F6;    /* blue accent */
--secondary: #8B5CF6;  /* purple accent */
--text: #F8FAFC;       /* main text color */
```
Change a value once here and it updates everywhere (buttons, gradients, stat numbers, hover states all reference these variables).

### Text
All copy lives directly in `index.html`, organized by section comments (`<!-- HERO -->`, `<!-- ABOUT -->`, etc.). Search for the section you want and edit the text between the tags. Nothing is generated dynamically from JS, so anything you see in the browser you can edit directly in the HTML.

- **Stats** (About section): edit `data-count="15"` and `data-suffix="+"` on each `<span class="stat-number">` — the JS reads these attributes to animate the count-up.
- **Typed rotating words** (Hero): edit the `strings` array near the top of `js/main.js`.
- **Timeline milestones**: duplicate a `.timeline-item` block in the Journey section and edit the year/title/body text.

### Images
Currently the design is intentionally photo-free (icon and typography driven), matching the AI-consultant aesthetic. If you want to add a portrait or project screenshots:
1. Drop image files into `assets/images/`.
2. Reference them with a relative path, e.g. `<img src="assets/images/headshot.jpg" alt="Shilpa Vellore Krishnamurthy">`.
3. For best results, use the same rounded-corner / border treatment as `.stat-card` (`border-radius: var(--radius-md); border: 1px solid var(--card-border);`) so new images match the existing card language.

### Animations
- **Scroll reveals**: controlled by AOS — add/remove `data-aos="fade-up"` (or other AOS effect names) on any element in `index.html`. Timing/easing is set once in `js/main.js` inside `AOS.init()`.
- **Typing effect**: `js/main.js` → `Typed` config (`typeSpeed`, `backSpeed`, `backDelay`).
- **Background particles**: `js/particles-config.js` → change `particles.number.value` (density), `particles.color.value` (particle colors), or `links.opacity` (connecting line strength).
- **Signature pipeline animation** (the HR Systems → Data → ML → AI flow line in the hero): it's plain SVG with `<animateMotion>` inside `index.html` — adjust `dur="4s"` on each `<animateMotion>` tag to speed up/slow down the pulse, or edit node labels directly in the `<text>` tags.
- All effects respect `prefers-reduced-motion` automatically — anyone with that OS setting enabled sees a static, non-animated version.

### Links
The Connect section icons point to placeholder URLs (`https://www.linkedin.com/`, `https://github.com/`, `https://public.tableau.com/`). Replace the `href` values in the Connect section of `index.html` with your actual profile URLs. Project card "GitHub Repository" / "Project Details" links are also placeholders (`href="#"`) — point them at real repo/case-study URLs once available.

---

## Notes
- No résumé/CV download, "student," or "bootcamp" language is used anywhere by design — the site positions the work as professional, shipped output.
- Only three projects are featured intentionally, with **Workforce Intelligence AI** treated as the flagship (larger visual weight, badge, gradient border).
- Experience stat is a single combined **15+ years** figure spanning HR, analytics, and HRIS — not broken out by category, per your direction.
