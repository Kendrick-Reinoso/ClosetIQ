# ClosetIQ Closet Integration

This package was prepared for the existing `feature/closet` branch of `Kendrick-Reinoso/ClosetIQ`.

## Instructions (Windows / VS Code)

1. In GitHub Desktop, switch to `feature/closet` and pull the latest changes.
2. Extract this ZIP **into your existing ClosetIQ repository folder**, where `package.json` is. Allow the new `src/pages/ClosetPage.tsx` and `src/styles/closet.css` to be added. The ZIP does **not** replace your current `App.tsx` or `HomePage.tsx`.
3. Open the ClosetIQ folder in VS Code and open Terminal > New Terminal.
4. Run `node apply-closet.mjs` from the project root. The script updates your existing App and HomePage navigation, preserving login and homepage.
5. Run `npm.cmd run dev` and test: login -> homepage -> Closet -> outfit details -> Home, plus Create -> existing builder. Stop with Ctrl+C.
6. Run `npm.cmd run build`. Fix any errors before committing.
7. Delete `apply-closet.mjs` and this `README-CLOSET-INTEGRATION.md` if you don't want helper files in your repo.
8. In GitHub Desktop, review changed files, commit as `Add Closet screen and connect navigation`, then Push origin.
9. Create a pull request `feature/closet` -> `main` only after testing.

### What is demo-only?

- Eight sample outfits, collage thumbnails, filtering, favorites, item details, and custom local cover-photo previews.
- Cover photos and favorites use in-memory browser state and reset after refresh; no database is connected.
- The Create button opens the existing homepage's demo builder panel, not a real outfit creation workflow.
- Explore and Profile still need screens.

### Important

Do **not** copy the `src/App.tsx` or `src/index.css` from the original Figma Make export into your existing app. Those belong to the Figma standalone prototype and could overwrite your working screens.
