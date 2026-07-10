# HerConnect

## The Idea
HerConnect is a mentorship and community platform built to connect female students with alumni mentors. Students often struggle to find guidance from people who've walked a similar path, especially around career decisions and networking. HerConnect solves this by letting students discover alumni mentors, request mentorship, and track their journey, while giving alumni an easy dashboard to manage and respond to requests. The platform also includes community spaces, resources, and notifications to keep students engaged beyond one-on-one mentorship.

## Important Links
- **Live Deployment Link:** [Insert URL here]
- **Demo Video Link:** [Insert YouTube/Drive URL here]

## Features
- **Student & Alumni Dashboards** — Role-based dashboards showing mentorship activity, requests, and profile stats.
- **Find Mentors** — Students can browse alumni mentors and submit mentorship requests directly from mentor profiles.
- **Mentorship Request Workflow** — Real-time request submission, acceptance/rejection by mentors, and status tracking, synced with Supabase.
- **Authentication & Profile Management** — Secure signup/login (student or alumni) with profile creation, session persistence, and protected routes.
- **Communities & Resources** — Shared spaces for posts, resources, and discussions.
- **Notifications** — In-app notifications for mentorship updates and community activity.
- **Dark / Light Mode** — Full theme support with system-preference detection and persisted user choice.
- **Responsive Design** — Optimized layouts across mobile, tablet, and desktop.

## Tech Stack & Tools
- **Frontend:** React (Vite), React Router, Tailwind CSS
- **Backend / Database:** Supabase (Auth, Postgres, Row Level Security policies)
- **State Management:** React Context API (AuthContext, ThemeContext)
- **Icons:** lucide-react
- **AI Tools Used:**
  - VS Code AI (Copilot/Cursor-style agent) — used for feature scaffolding, debugging Supabase integration, route protection, dark mode, and final UI polish.
  - Claude — used for planning next steps, reviewing repo state, structuring prompts, and troubleshooting data flow issues.

## Documentation

### Architecture Overview
HerConnect is a single-page React application backed by Supabase. Authentication and session state are managed globally through `AuthContext`, which exposes the current user and profile to all routes. Protected routes redirect unauthenticated users to `/login`, and users without a completed profile to `/profile/create`.

### Mentorship Flow
1. A student browses alumni mentors on `/find-mentors` and submits a mentorship request through a modal form.
2. The request is inserted into the `mentorship_requests` table with a `pending` status, linked to the student and mentor IDs.
3. The mentor's dashboard fetches requests filtered by the logged-in mentor's ID, joined with student profile data.
4. Mentors can accept or reject requests; the update is persisted to Supabase and reflected on the student's dashboard.

### Data Layer
Profiles, authentication, and mentorship requests are wired to live Supabase tables. Communities, resources, and notifications currently use mock data as placeholders, flagged for future backend integration.

### How AI Tools Were Coordinated
Development followed an iterative loop between planning and implementation. Claude reviewed the repo state, identified mock versus live-wired functionality, and prioritized next steps. Based on that, targeted prompts were handed to the in-editor coding agent, one change at a time — starting with fixing field mismatches, then route protection, mentorship wiring, dark mode, and a final UI polish pass. Each change was verified manually before moving on, keeping progress incremental and testable.

### Known Limitations
- Communities, resources, and notifications remain on mock data.
- LinkedIn PDF parsing during signup is simulated, not a real integration.
- Real-time dashboard updates are not yet implemented; data is fetched on page load.
