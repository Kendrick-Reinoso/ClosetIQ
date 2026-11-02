# ClosetIQ — Profile Page Integration

This package connects the Figma Make Profile page to the existing ClosetIQ application. It does not replace your current `App.tsx` or other screens.

## Before starting

1. In GitHub Desktop, confirm the current branch is **feature/profile**.
2. Confirm that branch was created from the latest **main**.
3. Open **Repository → Show in Explorer** to find your local ClosetIQ project root (the folder containing `package.json`).

## Install

1. Extract this ZIP.
2. Copy `apply-profile.mjs` and the included `src` folder into your existing ClosetIQ project root. **Merge** the `src` folder; do not delete or replace the existing folder.
3. Open a VS Code terminal in the project root and run:

   ```powershell
   node apply-profile.mjs
   npm.cmd run dev
   ```

4. Log in and open **Profile** using the bottom nav or Home avatar. Verify the centered profile photo, followers/following popups, My Posts / Saved Inspiration tabs, outfit details, and new-post demo modal. Test all other tabs.
5. Stop the server (`Ctrl+C`) and run:

   ```powershell
   npm.cmd run build
   ```

## Commit and merge

If the build passes, remove these temporary files from the project root before committing:
- `apply-profile.mjs`
- `src/App.tsx.bak`
- `src/pages/HomePage.tsx.bak`
- This README, if you copied it into the project

Commit on **feature/profile** with message `Add Profile page and connect navigation`, click **Push origin**, then create a pull request from **feature/profile** into **main**. Review and merge. In GitHub Desktop, switch back to `main` and pull the latest changes.

## Notes

- Profile posts, saved inspiration, follower/following counts, and dialogs are Figma demo data. They are not yet synced to the Explore page or to a backend.
- Edit Profile and Settings currently show demo feedback rather than a real editor/settings screen.
- The Figma export's `src/App.tsx`, global CSS, and `package.json` are intentionally excluded to protect existing screens.
- If the integration script stops, it checks its changes before writing and does not modify your project. Share the terminal error for a tailored fix.
