# Progress

## Backend ✓

- [x] Bootstrap (package.json, tsconfig.json, .gitignore)
- [x] `src/config/consts.ts`
- [x] `src/types/index.ts`
- [x] `src/db/database.ts`
- [x] `src/db/likesRepository.ts`
- [x] `src/services/photosService.ts` (renamed from `pexelsService.ts`)
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
- [x] `src/components/feed/Feed.tsx` + `FeedSlide.tsx` + `InfoCluster.tsx` + `HeartButton.tsx` + `PexelsLogo.tsx`
- [x] `src/components/common/LoadingSpinner.tsx` + `ErrorMessage.tsx` + `EmptyState.tsx`
- [x] `src/components/layout/Navbar.tsx`
- [x] `src/views/HomeView.tsx`
- [x] Update `main.tsx`, `App.tsx`, `index.css`
- [x] Smoke test full flow

### Notes

- Components split into `feed/`, `common/`, and `layout/` subfolders.
- All three graceful states handled: loading (`LoadingSpinner`), error (`ErrorMessage` with error-code-specific messages), empty (`EmptyState`).
- Infinite scroll uses `useInfiniteScroll` hook — `IntersectionObserver` with `root` set to the feed container and `rootMargin: 0px 0px ${height * 2}px 0px` to fire ~2 slides before the end.
- `useLike` applies an optimistic update on `onMutate` and rolls back on `onError`; server value is reconciled in `onSettled`.
- Navbar uses `Home` and `Heart` icons from Lucide; active state via `&.active` on the styled `NavLink`.
- All component styles use styled-components declared at the bottom of each file; `index.css` is global reset + font only.
- `InfoCluster` bottom offset is `80px` to clear the 64px fixed navbar.
- `dvh` used throughout instead of `vh` for correct mobile viewport handling.
- `PER_PAGE` is 15 to match backend and Pexels API default.

## UI Polish

- [x] **Desktop layout** (`HomeView.tsx`, `Feed.tsx`, `FeedSlide.tsx`, `Navbar.tsx`, `index.css`): on viewports ≥ 768px the app renders as a centered phone-column (500×78dvh) with a black-to-Pexels-green gradient background. Scroll-snap and navbar behavior are unchanged on mobile.

## Refinements / Bug Fixes

- [x] **Idle re-fetch fix** (`src/hooks/usePhotos.ts`): the app was silently re-fetching the same pages (1..N) while idle. Root cause was React Query's default `refetchOnWindowFocus`/`refetchOnReconnect` — for an infinite query a refetch re-runs _every_ loaded page, so a focus/reconnect event (devtools, alt-tab, network blip) re-pulled the entire feed. Disabled both, and set `staleTime: Infinity` (overriding the global `60_000`) since an endless feed never needs to auto-reload pages already on screen.
- [x] **Scroll inertia** (`src/components/FeedSlide.tsx`): added `scroll-snap-stop: always` to curb fling momentum carrying past a slide. Improves single-slide stops.
- [x] **Component extraction** (`src/components/common/`): extracted `ProviderAttribution`, `CenteredIcon`, `RetryButton`, and `StatusMessage` to eliminate duplication across `ErrorMessage`, `EmptyState`, and `FeedSlide`.
- [x] **Service rename**: `pexelsService.ts` → `photosService.ts` to decouple naming from the provider.
