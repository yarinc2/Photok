# Photok

A full-screen vertical photo feed — think TikTok, but for photos. Built with React + Vite on the frontend and Express + TypeScript on the backend, powered by the [Pexels API](https://www.pexels.com/api/).

<img width="702" height="1119" alt="image" src="https://github.com/user-attachments/assets/fff95ee8-f18d-469b-b67d-1b7b9c65cb91" />


## Features

- Snap-scrolling vertical feed — one photo per viewport, swipe or scroll to advance
- Infinite loading — next batch prefetched before you hit the bottom
- Like interaction — persists across refreshes via a SQLite backend store
- Liked feed — dedicated view of all your liked photos
- Graceful states — loading, empty, and error are all handled
- Desktop layout — centered phone-column on wide viewports

## Stack


| Layer     | Tech                                                         |
| --------- | ------------------------------------------------------------ |
| Frontend  | React 19, Vite, React Query, styled-components, React Router |
| Backend   | Express, TypeScript, SQLite (better-sqlite3)                 |
| Image API | Pexels                                                       |


## Prerequisites

- Node.js v18+
- A free Pexels API key:
  1. Go to [https://www.pexels.com/api/key/](https://www.pexels.com/api/key/)
  2. Sign up / log in and generate a key
  3. Paste it into `backend/.env` as `PEXELS_API_KEY=your_key_here`

## Setup

```bash
# 1. Clone
git clone <repo-url>
cd photok

# 2. Environment variables
cp backend/.env.example backend/.env
# → paste your Pexels API key as PEXELS_API_KEY=your_key_here

cp frontend/.env.example frontend/.env
# → VITE_API_BASE_URL=http://localhost:3001 is already correct

# 3. Install all dependencies
npm run install:all

# 4. Run
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Known Issues

- **Liked feed scroll position** — when you like a photo in the home feed and switch to the Liked tab, the feed does not automatically scroll to the top. If there is already more than one liked photo, the newly liked photo appears at the top but the view stays at its current scroll position, requiring a manual swipe up or page reload to see it.

## What I'd do next

- **Virtualization** — basic virtualization for long sessions accumulating DOM nodes
- **Image preloading** — speculatively load the next slide's full-res image in the background
- **Double-tap to like** — with a heart burst animation

