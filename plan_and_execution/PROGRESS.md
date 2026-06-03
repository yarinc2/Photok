# Progress

## Backend ✓

- [x] Bootstrap (package.json, tsconfig.json, .gitignore)
- [x] `src/config/consts.ts`
- [x] `src/types/index.ts`
- [x] `src/db/database.ts`
- [x] `src/db/likesRepository.ts`
- [x] `src/services/pexelsService.ts`
- [x] `src/services/likesService.ts`
- [x] `src/controllers/photosController.ts`
- [x] `src/controllers/likesController.ts`
- [x] `src/routes/photos.ts`
- [x] `src/routes/likes.ts`
- [x] `src/middleware/errorHandler.ts`
- [x] `src/app.ts`
- [x] `src/server.ts`
- [x] Install deps + smoke test

### Notes
- Controllers use simple `Number()` coercion with fallbacks matching Pexels defaults (`page=1`, `per_page=15`). No extra validation — Pexels is defensive on their end.
- Added `logger` middleware for request logging.

## Frontend ✓

- [x] Install packages (`@tanstack/react-query`, `axios`, `react-router-dom`, `lucide-react`, `styled-components`)
- [x] `src/config/consts.ts`
- [x] `src/types/index.ts`
- [x] `src/api/client.ts` + `photosApi.ts`
- [x] `src/hooks/usePhotos.ts` + `useLike.ts`
- [x] `src/hooks/useInfiniteScroll.ts`
- [x] `src/components/Feed.tsx`
- [x] `src/components/FeedSlide.tsx`
- [x] `src/components/InfoCluster.tsx`
- [x] `src/components/HeartButton.tsx`
- [x] `src/components/Navbar.tsx`
- [x] `src/components/LoadingSpinner.tsx`
- [x] `src/components/ErrorMessage.tsx`
- [x] `src/components/PexelsLogo.tsx`
- [x] `src/views/HomeView.tsx`
- [x] Update `main.tsx`, `App.tsx`, `index.css`
- [x] Smoke test full flow

### Notes
- Infinite scroll uses `useInfiniteScroll` hook — `IntersectionObserver` with `root` set to the feed container and `rootMargin: 0px 0px ${height * 2}px 0px` to fire ~2 slides before the end.
- `useLike` applies an optimistic update on `onMutate` and rolls back on `onError`; server value is reconciled in `onSettled`.
- Navbar uses `Home` and `Heart` icons from Lucide; active state via `&.active` on the styled `NavLink`.
- All component styles use styled-components declared at the bottom of each file; `index.css` is global reset + font only.
- `PexelsLogo` is a standalone component importable anywhere.
- `InfoCluster` bottom offset is `80px` to clear the 64px fixed navbar.
- `dvh` used throughout instead of `vh` for correct mobile viewport handling.
- `PER_PAGE` is 15 to match backend and Pexels API default.
