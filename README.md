# Shilpa Vellore Krishnamurthy — Portfolio Site

A single-page, animated portfolio built for GitHub Pages. No build step —
just HTML, CSS, and vanilla JS.

## What's inside
- `index.html` — page structure and content
- `style.css` — the design system (colors, type, layout, animation)
- `script.js` — the animated node-graph hero background, typewriter effect,
  scroll reveals, and the "pipeline" experience timeline
- `assets/profile.jpg` — your photo
- `assets/Shilpa_VK_CV.pdf` — downloadable résumé (linked from the nav)

## Publish it on your existing `github.io` repo

1. Go to `https://github.com/vkshilpa106-blip/vkshilpa106-blip.github.io`
   (create this repo first if it doesn't exist yet — the name must be
   exactly `<your-username>.github.io`).
2. Delete whatever is currently in it, or start fresh.
3. Upload all the files in this folder (`index.html`, `style.css`,
   `script.js`, and the `assets/` folder) to the root of that repo —
   easiest via **Add file → Upload files** on github.com, dragging in
   everything at once.
4. Commit directly to the `main` branch.
5. In the repo, go to **Settings → Pages** and confirm the source is set
   to `Deploy from a branch` → `main` → `/ (root)`.
6. Wait 1–2 minutes, then visit `https://vkshilpa106-blip.github.io` —
   your site is live.

### If you'd rather use git locally
```bash
git clone https://github.com/vkshilpa106-blip/vkshilpa106-blip.github.io.git
cd vkshilpa106-blip.github.io
# copy index.html, style.css, script.js, assets/ into this folder
git add .
git commit -m "New portfolio site"
git push
```

## Making changes later
- **Swap your photo**: replace `assets/profile.jpg` (keep the same filename,
  or update the `src` in `index.html`'s `.about__photo img`).
- **Update your résumé**: replace `assets/Shilpa_VK_CV.pdf` with a new
  export, same filename.
- **Add a new role**: copy one `.node` block in the "Experience" section
  of `index.html` and edit the text — the timeline and counters pick it
  up automatically.
- **Change the typewriter phrases**: edit the `roles` array near the top
  of `script.js`.
