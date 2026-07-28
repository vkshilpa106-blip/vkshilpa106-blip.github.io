# Shilpa Vellore Krishnamurthy — Portfolio Site

A single-page portfolio built for GitHub Pages. No build step — just
HTML, CSS, and vanilla JS.

## What's inside
- `index.html` — page structure and content
- `style.css` — the design system (colors, type, layout, animation)
- `script.js` — the hero role-cycle, scroll reveals, and nav shadow
- `assets/Shilpa_VK_CV.pdf` — downloadable résumé (linked from the nav and contact)

## Publish it on your existing `github.io` repo

1. Go to your repo `vkshilpa106-blip.github.io`.
2. Upload `index.html`, `style.css`, `script.js`, and the `assets/` folder
   to the root — **Add file → Upload files**, drag everything in, and
   let it overwrite what's already there.
3. Commit to `main`.
4. Give it a minute, then check `https://vkshilpa106-blip.github.io`.

## Making changes later
- **Update your résumé**: replace `assets/Shilpa_VK_CV.pdf` with a new
  export, same filename.
- **Edit the cycling role line**: the phrases live in the `roles` array
  near the top of `script.js`.
- **Add a project**: copy one `.project-card` block in the "Projects"
  section of `index.html`, update the tags/text, and replace the
  `project-card__pending` line with real links.
- **Add the Impressum address**: edit the `#impressum` section in
  `index.html` if you decide to publish a postal address later.
- **Adjust skills**: each skill category lives in its own
  `.tagcloud-group` block in the "Systems" section.
