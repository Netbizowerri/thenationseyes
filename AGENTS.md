# Agent Notes — the-nation's-eyes

## Stack & Dependencies
- React 19 + TypeScript + Vite 6 + Tailwind CDN (no local Tailwind build step).
- Routing: react-router-dom v7.
- Firebase v12: Auth (email/password), Firestore.
- Charts: recharts.
- No test runner installed; `npm test` currently fails.
- No linter beyond `tsc --noEmit`.

## Path Aliases
- `tsconfig.json` and `vite.config.ts` both alias `@/` to the repo root (`./`).
- Imports like `import { db } from './firebase'` are relative to root.

## Dev & Build
- `npm run dev` — dev server on http://127.0.0.1:3000 (Vite HMR).
- `npm run build` — production Vite build to `dist/`.
- `npm run preview` — preview the production build.
- `npm run lint` — runs `tsc --noEmit` only; no ESLint/Prettier configured.

## Firebase Configuration
- `firebase.ts` loads config from `firebase-applet-config.json` at runtime, falling back to env vars (`VITE_FIREBASE_*`) if present.
- **Do not edit `firebase-applet-config.json` by default** unless also updating the matching Firestore rules or blueprint (`firebase-blueprint.json`).
- Firestore security rules live in `firestore.rules`; only the hardcoded admin email (`netbiz0925@gmail.com`) has write access to posts.

## Deployment
- Primary: Vercel (configured in `vercel.json`).
- SPA rewrite for `react-router-dom` is handled by Vercel (`vercel.json` rewrites `/(.*)` to `index.html`).
- Static assets under `/assets` cached aggressively (immutable, 1 year), as configured in `vercel.json`.

## Architecture
- Entry: `index.tsx` mounts `<App />` into `#root`.
- `App.tsx` holds the router, global state (posts, comments), error boundary, and auth guard.
- Pages: `Home`, `ArticleDetail`, `AdminDashboard`, `AdminPosts`, `AdminComments`, `Login`, `About`.
- Components: `ArticleCard`, `HeroSlider`, `ScrollToTop`, `SearchOverlay`, `SEO`.
- Services: `services/firebaseService.ts` wraps all Firestore operations for posts and comments.
- Types: shared in `types.ts` (`Post`, `Comment`, `User`, `Category` enum).
- Constants / data: large static article arrays live in `constants.tsx`.

## Key Gotchas
- No centralized state library (no Redux/Zustand); lifting state happens in `App.tsx`.
- `firebaseService` methods catch errors and re-throw generic messages; check browser console for the real Firestore error.
- `HeroSlider` component is used on the home page and relies on images from the `public/` folder or external URLs referenced in constants.
- `SEO` component uses `react-helmet-async`; always wrap in `<HelmetProvider>` (already done at root in `App.tsx`).
- Assets in `public/` are served from root path; use relative paths or `import` for bundled assets.
