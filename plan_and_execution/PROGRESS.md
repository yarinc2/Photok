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

## Frontend

- [ ] Install packages (`@tanstack/react-query`, `axios`, `react-router-dom`)
- [ ] `src/config/consts.ts`
- [ ] `src/types/index.ts`
- [ ] `src/api/client.ts` + `photosApi.ts`
- [ ] `src/hooks/usePhotos.ts` + `useLike.ts`
- [ ] `src/components/` (Feed, FeedSlide, InfoCluster, HeartButton, Navbar, LoadingSpinner, ErrorMessage)
- [ ] `src/views/HomeView.tsx`
- [ ] Update `main.tsx`, `App.tsx`, `index.css`
- [ ] Smoke test full flow
