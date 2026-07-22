# Auto-Save Assessment Sessions

Save only on form submit (no partial-typing capture). Privacy-safe.

## Step 1 — Database
Create `assessment_sessions` table:
- `id` uuid PK (generated client-side, persisted in localStorage)
- `created_at`, `updated_at` timestamps
- `first_name`, `last_name`, `email`, `business_name`, `industry` (nullable text)
- `responses` jsonb (default `{}`)
- `current_question_index` int default 0
- `current_screen` text (e.g. `landing`, `question`, `email_capture`, `section2`, `results`)
- `completed` boolean default false
- `completed_assessment_id` uuid nullable (links to `assessments` row when finished)
- `user_agent`, `referrer` text nullable

RLS:
- Anon + auth can INSERT (with check true)
- Anon + auth can UPDATE rows by id only (since id is a UUID acting as a capability token, this is safe enough for a write-only progress store)
- Admins can SELECT all
- No public SELECT, no DELETE

## Step 2 — Frontend persistence
- New `src/lib/sessionStore.ts`: manages a `xc_session_id` in localStorage, plus a snapshot `xc_audit_progress_v1` containing `{ sessionId, responses, currentQuestionIndex, currentScreen, userInfo }`.
- New `src/hooks/useAssessmentSession.ts`: exposes `saveProgress(partial)` that:
  1. writes localStorage snapshot synchronously
  2. debounced (800ms) upserts to `assessment_sessions` via Supabase client
  3. on `beforeunload`, flushes via `navigator.sendBeacon` to a lightweight edge function `session-flush` (also accepts the upsert payload).

## Step 3 — Wire into flow (`src/pages/Index.tsx`)
On every state transition, call `saveProgress`:
- Question answered → save responses + currentQuestionIndex
- Section transitions → save current_screen
- `EmailCaptureScreen` submit → save first/last/email/business/industry (only on submit, per user choice)
- Final completion → mark `completed=true`, set `completed_assessment_id` to the inserted assessments row id

## Step 4 — Resume UX
On app load, if a localStorage snapshot exists AND `completed=false`:
- Show a small banner on `LandingScreen`: "Resume where you left off?" with `Resume` / `Start over` buttons.
- Resume restores state into `Index.tsx`. Start over clears localStorage and generates a new `sessionId`.

## Step 5 — Admin: Sessions tab
Add a `Sessions` tab to `src/pages/Admin.tsx`:
- Table of all `assessment_sessions` ordered by `updated_at desc`
- Columns: email, name, screen, last question, % progress, completed, updated_at
- Filter: `incomplete only`, `has email`
- Click row → JSON drawer of responses

## Step 6 — Edge function
`supabase/functions/session-flush/index.ts`: accepts `{ id, ...fields }` POST, uses service role to upsert into `assessment_sessions`. Used by `sendBeacon` on tab close. `verify_jwt = false` in `supabase/config.toml`.

## Out of scope
- Partial-text capture as user types (explicitly rejected)
- Email notifications about abandoned sessions
- Magic-link / paid-buyer flow (separate prior plan)

Approve and I'll build it.