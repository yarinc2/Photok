# AI Workflow

My main AI tool used is Claude Code for writing code, Cursor for IDE and autocomplete, and Claude Design for the app design.

My usual workflow is having a folder with:

1. The full task context — in this case the actual assignment, so I can refer the AI to it when needed
2. A plan — the initial plan of the implementation
3. A progress file — a live doc tracking changes and notes

---

## Representative Prompts

**1. Initial planning prompt**

This is the main prompt I gave to the first Claude agent, planning the design of the app:

> "Your task is described in `plan_and_execution/ASSIGNMENT.md`, where you will be building a simple 'photos tiktok' app.
>
> On the backend use ExpressTS + sqlite3 for saving liked photos. The backend will have a clear separation of concerns — middleware, routes, controllers, services, db (repository), types, config.
> I created a `.env.example` file in the backend, storing the Pexels API key, server port, and frontend url (for CORS). In the config folder create a `consts.ts` file for accessing the `.env` vars.
> The Pexels API endpoint we will use is `https://api.pexels.com/v1/curated`, accepts `?page` & `per_page` params, must be called with an `Authorization: <PEXELS_API_KEY>` header.
>
> For the frontend, use React Query (Tanstack) for data caching, loading states, errors and refetching. Combine with axios for API calls.
>
> The scope of the task is minimal and clear, do not cross any scope boundaries without permission."

I expressly stated what I wanted — tech stack, API endpoint and response shape — so the first prompt had as much context as possible.

---

**2. Scoping the execution**

> "I created `plan_and_execution/PLAN.md`. Another file you will create is `PROGRESS.md` which will serve as the live progress doc, updated as we go.
>
> The next steps are only the backend — once it's finished and tested we will move on to the frontend."

This is when I switched from plan mode to agent mode, clearly defining the current scope before moving on.

---

## Where I Pushed Back

**3. AI over-engineering**

> "Pexels are already defensive with their API, defaulting values to their own — our guarding logic here is redundant."

The AI designed an aggressively defensive controller for extracting params. After checking the Pexels API I found out they default incorrect params themselves, so I pushed back and went with a simpler approach that matches their behavior for consistency.

---

**4. Main refactor prompt**

Started a new agent for a fresh context window. I went over each file to surface issues with the implementation:

> "The following fixes and refactors are needed:
> 1. **Highest priority** — sentinel is placed too low, causing the next batch fetch to only fire when the user reaches the bottom, making the first slide action feel stuck
> 2. Navbar is overlapping the like button and Pexels credit
> 3. Install `lucide-react` for icons instead of manually created ones
> 4. Inline styles should be moved to dedicated CSS files
> 5. Use `dvh` instead of `vh`
> 6. The sentinel `useEffect` in `Feed.tsx` should be extracted to its own `useSentinel` hook
> 7. `PER_PAGE` should match our backend and Pexels default of 15, not 10
> 8. Subtitle of `Photo by ${Author}` is enough — a Pexels link is already present
> 9. Navbar links should use home and heart icons from Lucide
> 10. `PexelsLogo` needs to be a standalone component"

---

## Where I Chose Not to Use AI

1. **Debugging** — I called the API endpoints myself, used the network devtools, and used the app like any real user would to surface errors a human would encounter
2. **Architecture and clean code** — separation of concerns, naming, styling decisions were all driven by me
3. **Choosing an image provider** — I first went with Imgur, realized their docs were broken and unusable, then tested Pexels endpoints manually before writing any prompt or line of code
4. **Code review** — nothing was committed or pushed before I thoroughly reviewed it; everything was reviewed manually so no surprises could slip in

---

## How I Verified AI-Generated Code

1. Using the app as a real user — testing scroll behavior, likes, tab switching, and everything that required physical interaction
2. Checking the console and network tabs for errors, making sure API calls fired as intended, likes stayed persistent, and the overall UX felt smooth
3. Thoroughly reviewing everything the AI generated — not treating it as a single source of truth
4. Simulating different error states to make sure they are properly handled
