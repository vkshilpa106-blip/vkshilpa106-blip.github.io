# Shilpa Vellore Krishnamurthy — Portfolio Site

A single-page portfolio built for GitHub Pages. No build step — just
HTML, CSS, and vanilla JS. No CV download — visitors reach out via
email/LinkedIn and you send the right version yourself.

## What's inside
- `index.html` — page structure and content
- `style.css` — the design system (deep emerald + brass palette, type, layout)
- `script.js` — the hero role-cycle, the live "status.log" console panel, scroll reveals, and nav shadow

## Publish it on your existing `github.io` repo

1. Go to your repo `vkshilpa106-blip.github.io`.
2. Upload `index.html`, `style.css`, and `script.js` to the root —
   **Add file → Upload files**, drag them in, let it overwrite what's there.
3. If an old `assets/` folder is still in the repo from a previous
   version, you can delete it — nothing in the current site references it.
4. Commit to `main`, then check `https://vkshilpa106-blip.github.io`
   after a minute or two.

## Making changes later
- **Edit the cycling role line**: the phrases live in the `roles` array
  near the top of `script.js`.
- **Edit the console panel stats**: both the visible HTML (in
  `#console-body` in `index.html`) and the retyped version in
  `script.js` pull from the same four lines — update both if you
  change a number.
- **Add a project**: copy one `.project-card` block in the "Projects"
  section of `index.html`, update the tags/text, and replace the
  `project-card__pending` line with real links.
- **Adjust skills**: each skill category lives in its own
  `.tagcloud-group` block in the "Systems" section.
