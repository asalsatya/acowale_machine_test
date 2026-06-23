# TEACH_US.md

## Thin Routes, Fat Services: The One Architectural Rule That Scales Every Codebase

Here is a rule I apply to every API I build: **a route file should read like a table of contents, not a chapter**.

Most codebases start clean and rot from the route layer down. A new endpoint is added, "just quickly," with a database call inline. Then a validation block. Then a conditional. Six months later the route handler is 200 lines and everyone is afraid to touch it.

The fix is not a framework. It's a discipline enforced at code-review time:

```
routes/   → middleware pipeline declaration only
controllers/ → HTTP shaping: parse req, call service, send res
services/    → business logic: orchestrates models, enforces rules
models/      → data access: SQL or ORM calls, returns plain objects
```

The rule enforced at every layer: **no layer knows about the layer above it**. A service does not import `express`. A model does not call a service. A controller does not write SQL.

This matters for three concrete reasons:

**1. Testability is free.** When services have no HTTP dependency, you can call `feedbackService.createFeedback(data)` directly in a test with zero mocking. When controllers are thin, you only need supertest to test them. When models are isolated, you can swap SQLite for Postgres by changing exactly one file.

**2. Debugging is fast.** When a bug is reported on `POST /api/feedback`, you open `feedback.routes.js` and see the pipeline at a glance. You narrow to the layer in 30 seconds instead of grepping through a 300-line handler.

**3. Onboarding is cheap.** A new engineer reads `feedback.routes.js` first. They see: rate limiter → body validator → controller. They then read `feedback.controller.js`: parse, call service, respond. They have a mental model of the system before they've touched a single line of business logic.

The most valuable architectural decisions are the ones that make the wrong thing hard to do. Enforcing layer separation in code review is the simplest, cheapest way to keep a codebase readable as it grows — no framework required, no new tooling, no migration.
