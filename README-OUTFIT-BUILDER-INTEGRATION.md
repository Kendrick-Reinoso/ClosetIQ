# ClosetIQ — Outfit Builder integration

This ZIP is an **additive integration** for `Kendrick-Reinoso/ClosetIQ`, based on the `main` branch as checked on October 29, 2026.

## Windows / VS Code instructions

1. In **GitHub Desktop**, switch to `main`, **Fetch origin / Pull origin**, and create a new branch named `feature/outfit-builder` **from main**. If you already created it, switch to that branch instead.
2. Extract this ZIP into your **existing ClosetIQ project root**, the folder containing `package.json`. Do **not** extract the original Figma Make ZIP into your project. The ZIP adds two new screen files and a helper script; it does not overwrite existing screens.
3. In VS Code, open **Terminal > New Terminal** and run `node apply-outfit-builder.mjs`.
4. Start the demo with `npm.cmd run dev` and open the URL printed by Vite (typically `http://localhost:8443/`).
5. Test Login -> Home -> Build, swipe Hats/Tops/Bottoms/Shoes, change Base Top while preserving Outer Layer, select multiple accessories, use Save Outfit, then Build -> Closet and Build -> Home. Also test the Homepage's Build Your Next Fit button and Closet's Create Outfit action.
6. Stop the dev server (Ctrl+C), then run `npm.cmd run build`.
7. Before committing, remove `apply-outfit-builder.mjs`, this README, and the two `.bak` files the script created (`src/App.tsx.before-outfit-builder.bak` and `src/pages/HomePage.tsx.before-outfit-builder.bak`). Do not commit backup files.
8. In GitHub Desktop, review the four expected changed files, commit `Add Outfit Builder screen and connect navigation`, and **Push origin**.
9. Open a pull request from `feature/outfit-builder` into `main`, review it, and merge when ready.

## Expected changed files

- NEW `src/pages/OutfitBuilderPage.tsx`
- NEW `src/styles/outfit-builder.css`
- MODIFIED `src/App.tsx` (routes Build to the new screen)
- MODIFIED `src/pages/HomePage.tsx` (Build tab and homepage Build card open new screen)

The original login and Closet pages are not modified. **Do not copy `src/App.tsx`, `src/index.css`, or `src/main.tsx` from the original Figma ZIP**: they are for the standalone Figma prototype and could overwrite your existing app.

## Prototype limitations

- The builder saves outfits in browser `localStorage` under `closetiq-saved-outfits`, but the existing Closet gallery still displays its own sample outfits. The saved looks **do not automatically appear in the Closet gallery yet**. This can be connected in a later iteration.
- No backend or real authentication. Images come from Unsplash and need an internet connection.
- Explore and Profile are still placeholders.
- This package is prepared for local integration; it has **not** been committed or pushed to GitHub by the assistant.

## If the helper reports a mismatch

Do not force it. The helper intentionally stops without changing your existing files when their structure differs from the checked `main` version. Share the error and we can adjust safely.
