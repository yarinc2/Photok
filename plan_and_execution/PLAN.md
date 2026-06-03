# Plan: Photo TikTok — Backend + Frontend

## Context

Building a full-screen snap-scroll photo feed ("TikTok for photos") per the assignment. The backend proxies the Pexels curated API and persists likes in SQLite. The frontend is a React+TS Vite app with infinite snap-scroll, Tanstack Query, and Axios. Design is dark-mode, DM Sans font, bottom-left info cluster (title, photographer credit, like button, Pexels attribution), bottom navbar stub.

---

## Backend

### Bootstrap

- Create `backend/package.json` with scripts (`dev`, `build`, `start`)
- Dependencies: `express`, `cors`, `dotenv`, `axios`, `better-sqlite3`
  - Note: `better-sqlite3` is used instead of `sqlite3` — synchronous API, superior TypeScript support, same SQLite under the hood.
- Dev dependencies: `typescript`, `ts-node-dev`, `@types/node`, `@types/express`, `@types/cors`, `@types/better-sqlite3`
- Create `backend/tsconfig.json` (target: ES2022, module: commonjs, outDir: dist, rootDir: src, strict: true)
- Create `backend/.gitignore` (node_modules, dist, .env)

### File tree to create under `backend/src/`

```
config/
  consts.ts          — exports PORT, PEXELS_API_KEY, FRONTEND_URL, PEXELS_BASE_URL
types/
  index.ts           — PexelsPhoto, PexelsResponse, PhotoWithLike, ApiError
db/
  database.ts        — opens/creates SQLite DB, runs migration (CREATE TABLE IF NOT EXISTS likes)
  likesRepository.ts — isLiked(id), getLikedIds(ids[]), toggleLike(id) → boolean
services/
  pexelsService.ts   — getPhotos(page, perPage): calls Pexels API, returns raw PexelsResponse
  likesService.ts    — enrichWithLikes(photos): injects liked:boolean from DB per photo
controllers/
  photosController.ts — GET /api/photos?page&per_page → call pexelsService + likesService
  likesController.ts  — POST /api/photos/:id/like → toggleLike, return { liked }
routes/
  photos.ts
  likes.ts
middleware/
  errorHandler.ts    — catches thrown errors, returns JSON { error: message }
app.ts               — sets up Express, cors, json, routes, errorHandler
server.ts            — imports app, starts listening on PORT
```

### Key logic notes

- `GET /api/photos` fetches from `https://api.pexels.com/v1/curated` with `Authorization: <PEXELS_API_KEY>` header, forwards `page` and `per_page` query params (default per_page=10, max 80)
- Response to frontend matches Pexels shape but each photo has `liked: boolean` injected
- `POST /api/photos/:id/like` toggles: if row exists → delete (unlike), if not → insert (like). Returns `{ liked: boolean }`
- SQLite schema: `CREATE TABLE IF NOT EXISTS likes (photo_id INTEGER PRIMARY KEY, liked_at TEXT NOT NULL)`
- CORS allows `FRONTEND_URL` from consts

---

## Frontend

### Install packages (in `frontend/`)

```
@tanstack/react-query axios react-router-dom
```

### File tree to create under `frontend/src/`

```
config/
  consts.ts          — API_BASE_URL (from VITE_API_BASE_URL env), PER_PAGE = 10
types/
  index.ts           — Photo (mirrors Pexels + liked boolean), InfinitePhotosPage
api/
  client.ts          — axios instance with baseURL from consts
  photosApi.ts       — getPhotos(page, perPage): AxiosResponse, toggleLike(photoId): { liked }
hooks/
  usePhotos.ts       — useInfiniteQuery wrapping getPhotos, getNextPageParam from page number
  useLike.ts         — useMutation wrapping toggleLike, optimistic update on QueryClient cache
components/
  Feed.tsx           — scrollable container (scroll-snap-type: y mandatory), renders slides,
                       IntersectionObserver sentinel 2 slides from end triggers fetchNextPage
  FeedSlide.tsx      — full-viewport slide: <img src={src.portrait}>, gradient overlay, InfoCluster
  InfoCluster.tsx    — bottom-left: alt as title, "Photo by X on Pexels ↗" link, HeartButton,
                       "Photos provided by Pexels" attribution with P logo
  HeartButton.tsx    — SVG heart, heart-pop CSS animation on click, filled/stroke state
  Navbar.tsx         — fixed bottom nav, Home tab only (phase 1); glassmorphism style
  LoadingSpinner.tsx — centered spinner for initial load
  ErrorMessage.tsx   — centered error card with retry button
views/
  HomeView.tsx       — composes Feed + Navbar for the / route
```

### Modify existing files

- `frontend/src/main.tsx` — wrap `<App>` with `<QueryClientProvider>` and `<BrowserRouter>`
- `frontend/src/App.tsx` — define routes only: `<Route path="/" element={<HomeView />} />` (phase 1 has one route)
- `frontend/src/index.css` — replace with: CSS reset, `html/body { height: 100%; overflow: hidden; }`, DM Sans import, snap-scroll utilities, heart-pop keyframes, hide scrollbar

### Install packages (in `frontend/`)

Also add `react-router-dom` to the install list.

### Key implementation notes

- **Snap scroll:** `.feed { height: 100vh; overflow-y: scroll; scroll-snap-type: y mandatory; scrollbar-width: none; }` / `.slide { height: 100vh; scroll-snap-align: start; flex-shrink: 0; }`
- **Infinite load:** IntersectionObserver on a sentinel `<div>` inserted after the second-to-last slide; calls `fetchNextPage()` when intersecting. Avoids jank because next page fetches before user hits the end.
- **Optimistic like:** `useLike` uses `onMutate` to update cached pages instantly; `onError` rolls back. Prevents flicker on like.
- **Image URL:** use `src.portrait` (800×1200) for portrait-first mobile viewport
- **Pexels attribution (required by API ToS):**
  - "Photo by [photographer] on Pexels" with link to `photo.url`
  - "Photos provided by Pexels" with green P logo, link to `https://www.pexels.com`
- **Graceful states:**
  - Initial loading → `<LoadingSpinner />`
  - Fetch error → `<ErrorMessage />` with retry
  - `isFetchingNextPage` → subtle spinner at bottom of last slide
- **Font:** DM Sans via `@import` in `index.css` (Google Fonts)
- **Colors:** background `#0c0c0c`, text `#fff`, accent `#ff3d5a` (like), Pexels green `#05A081`
- **Gradient overlay:** `linear-gradient(to top, rgba(0,0,0,0.63) 0%, rgba(0,0,0,0.25) 38%, transparent 62%)`

---

## Deliverables not yet in scope (per assignment)

- `README.md` — after core is working
- `AI_WORKFLOW.md` — after core is working

---

## Verification

1. `cd backend && cp .env.example .env` (fill in real Pexels key), `npm install && npm run dev`
2. `cd frontend && npm install && npm run dev`
3. Open `http://localhost:5173`
4. **Smoke tests:**
   - Photos load from Pexels (not hardcoded)
   - Snap scroll snaps cleanly between photos
   - Scrolling to ~8th photo triggers next page fetch (no jank)
   - Clicking heart → fills immediately (optimistic), persists after page refresh
   - Unliking → unfills, persists after refresh
   - Simulate API error (bad key) → error state shown
   - Photographer credit + Pexels attribution visible on each slide
