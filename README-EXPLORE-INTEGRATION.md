# ClosetIQ — Explore Integration

This ZIP is designed for the existing ClosetIQ repository, on branch `feature/explore`.
It contains ONLY the new Explore page, its scoped CSS, and a safe navigation setup script.

## Instructions (Windows)

1. Open GitHub Desktop and select **feature/explore** (created from latest `main`).
2. Use **Repository > Show in Explorer**. Open the folder containing `package.json`.
3. Extract this ZIP and **copy its contents** into that folder. Allow `src` folders to merge.
   Do not replace your existing `src/App.tsx` or other screens with files from Figma Make.
4. In the VS Code terminal opened at that folder, run:

   node apply-explore.mjs
   npm.cmd run dev

5. Log in and test **Home > Explore**, Following/Popular, filters, likes, saves,
   follows, notifications, sharing, scrolling, and bottom navigation back to other screens.
6. Stop the dev server with Ctrl+C, then run `npm.cmd run build`.
7. Remove the temporary setup files `apply-explore.mjs`, `README-EXPLORE-INTEGRATION.md`,
   `src/App.tsx.bak`, and `src/pages/HomePage.tsx.bak` before committing.
8. In GitHub Desktop, commit changes on `feature/explore`, Push origin,
   create a pull request into `main`, review, then merge.

## Notes

- Uses fake users, engagement counts, and images hosted by Unsplash (internet required for photos).
- Likes, saves, follows, notifications and share options are demo-only local state; they reset on reload.
- "Copy Link" copies the current page URL, not a unique public post URL.
- Following updates when you follow/unfollow someone in Popular.
- Existing Login, Home, Closet, and Outfit Builder are preserved.
- If the script reports a mismatch, **stop** and share the terminal error. It will not overwrite files when its expected patterns differ.
