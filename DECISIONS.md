# DECISIONS.md — Acowale CRM Machine Test by Satyam

## 1. Why this tech stack?

React + Vite was chosen for the frontend because Vite's dev server is instant, HMR is sub-second, and the Tailwind v4 plugin integrates without any PostCSS config. React Router v7 gives a proper SPA routing model without SSR complexity. On the backend, Express is the most battle-tested Node framework with the widest middleware ecosystem, and the team building on this later will have the most contributors familiar with it. The choice was deliberate over Fastify: Fastify is faster on benchmarks but Express is more predictable for a 72-hour build where debugging time matters more than throughput.

## 2. Why this database?

SQLite via `better-sqlite3` (synchronous) for the same reason a senior engineer picks boring technology: zero infrastructure, single file, portable, trivial to seed and test, and perfectly adequate up to ~100 concurrent write transactions. The `better-sqlite3` driver specifically over the `sqlite3` callback-based driver because synchronous operations eliminate the entire class of async/callback bugs at zero performance cost for single-process workloads. For a machine test evaluating architecture decisions over raw performance, this is the right call.

## 3. Why this application structure?

The folder structure follows the single-responsibility principle at the file level. Routes contain no logic, only a middleware chain declaration. Controllers handle HTTP concerns only — parsing request, calling service, shaping response. Services own business logic and call models. Models own SQL. Validators own Zod schemas. This means when the next engineer reads `feedback.routes.js` they see exactly the middleware pipeline at a glance, and when they open `feedback.controller.js` they see only HTTP shaping — no SQL, no validation schemas. The client mirrors this: services own all fetch calls, hooks own state, components own rendering, pages own composition.

## 4. What trade-offs were made due to time constraints?

- The Admin API key is stored in `localStorage` for simplicity. For this single-admin test scope, it's an acceptable trade-off. However, for a multi-tenant production environment, I would move to short-lived server-set `httpOnly` cookies or proper session-based auth to mitigate XSS risks.
- No pagination on the analytics trend — it just returns 7 days hardcoded.
- No soft-delete or audit trail on feedback rows.
- No input sanitization beyond Zod type coercion (XSS risk if rendered as dangerouslySetInnerHTML, which we don't do).
- The test suite covers API-level integration only; no unit tests per function.
- CI runs only lint + test, not a full staging deployment gate.

## 5. What would you improve with one more week?

1. Swap SQLite → Postgres (via `pg` or Prisma) for proper concurrent write support and connection pooling.
2. Add short-lived JWT access tokens + refresh token rotation.
3. Add end-to-end Playwright tests hitting real browser UI.
4. Add a Sentry integration on both server (`@sentry/node`) and client (`@sentry/react`).
5. Dockerize the server with a multi-stage build and deploy behind a reverse proxy with TLS termination.
6. Add infinite scroll or cursor-based pagination on the submissions table.
7. Add email notifications on new submissions using a worker queue (Bull/BullMQ + Redis).

## 6. What was the most difficult technical challenge?

The `better-sqlite3` native addon binary was compiled against an older Node ABI and could not be rebuilt on the target machine (Node v22) without Python build tools installed. This surfaced only at runtime, not at install time, because `npm install` silently falls back to source build which then fails. The resolution was to swap the driver — a decision that had downstream effects on every DB access file. It's a good reminder that native Node addons are a footgun in CI/CD pipelines where the build environment may differ from the dev machine.

## 7. Which AI tools were used?

Claude (Anthropic, claude-sonnet) was used throughout: architecture planning, scaffolding the full modular structure, writing boilerplate for middleware/validators/hooks, and generating realistic seed data.

## 8. One instance where AI helped

AI generated the full 7-day trend-gap-filling algorithm in `analyticsService.js` in one shot — iterating backward from today, building a date-keyed map from the raw SQL results, and filling zeroes for missing days. Writing this manually would have taken several iterations to handle edge cases (timezone offsets, month boundaries, gap at start of range).

## 9. One instance where you disagreed with AI

AI initially placed the Zod validation schemas and the `express-rate-limit` instance directly inside `feedbackController.js`. I pushed back: controllers should be a thin HTTP-shaping layer with no knowledge of validation rules or rate-limiting policy. Both were extracted to `validators/feedback.validator.js` and `middleware/rateLimiter.js` respectively, making the controller 30 lines instead of 90 and making the middleware independently testable.

## 10. What would break first at 100,000 users, and why?

SQLite. The database uses a single write lock — concurrent POST `/api/feedback` requests queue behind each other at the DB level. At 100k active users even a modest burst of simultaneous submissions would produce lock contention that turns a sub-millisecond write into a seconds-long wait. The second failure point would be the single Node process itself — no clustering, no horizontal scaling, no connection pooling. The fix is Postgres on a managed service (Supabase / Neon) with a connection pooler (PgBouncer) in front.

## 11. One thing about this assignment you'd improve, change, or challenge

The constraint to use SQLite "for simplicity" while simultaneously requiring "production-readiness" is a contradiction. Production-readiness implies horizontal scaling, which SQLite fundamentally cannot support (single writer). I would reframe the constraint as: "Use SQLite for local development and CI; provide a `DATABASE_URL` env var that the app uses to connect to Postgres in production." This is what tools like Prisma and Drizzle make trivially easy, and it's a better lesson for any engineer learning what "production-ready" actually means.
