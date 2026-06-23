# Acowale CRM — Server

Express + SQLite REST API. Runs independently on port **4000**.

## Structure

```
server/
├── src/
│   ├── config/          # env.js (centralised env access), db.js (SQLite singleton)
│   ├── routes/          # *.routes.js — wire middleware → controller, no logic
│   ├── controllers/     # HTTP layer only — call service, return response
│   ├── services/        # Business logic — orchestrates models
│   ├── models/          # Data-access layer — prepared statement wrappers
│   ├── middleware/       # adminAuth, errorHandler, logger, validate, rateLimiter
│   ├── validators/      # Zod schemas (feedback.validator.js)
│   ├── utils/           # apiResponse.js — success/error helpers
│   ├── app.js           # Express configuration (CORS, middleware, routes)
│   └── server.js        # Entry point — dotenv, initDb, app.listen
├── tests/
│   └── feedback.test.js # Vitest + supertest integration tests
├── .env.example
├── package.json
└── README.md            # ← you are here
```

## Quick Start

```bash
# 1. Install dependencies
cd server
npm install

# 2. Copy and configure environment
cp .env.example .env
# Edit .env — at minimum set ADMIN_API_KEY to a strong random string

# 3. Start dev server (auto-restarts on file changes)
npm run dev

# 4. (Optional) Seed the database with sample data
npm run seed
```

The server starts at **http://localhost:4000**.

## Environment Variables

| Variable       | Default                         | Description                              |
|----------------|---------------------------------|------------------------------------------|
| `PORT`         | `4000`                          | HTTP port                                |
| `NODE_ENV`     | `development`                   | `development` / `production` / `test`    |
| `DB_PATH`      | `./data/crm.db`                 | Path to the SQLite file                  |
| `LOG_LEVEL`    | `info`                          | Pino log level                           |
| `CORS_ORIGINS` | `http://localhost:5173`         | Comma-separated allowed origins          |
| `ADMIN_API_KEY`| *(required)*                    | API key for admin routes                 |
| `JWT_SECRET`   | *(required in production)*      | Secret for JWT signing                   |

## API Contract

### Public

| Method | Path             | Body / Params                             | Description          |
|--------|------------------|-------------------------------------------|----------------------|
| POST   | `/api/feedback`  | `{ category, comment, email? }`           | Submit feedback      |
| GET    | `/health`        | —                                         | Health check         |

### Admin (requires `x-api-key` header or `Authorization: Bearer <jwt>`)

| Method | Path                      | Params                                         | Description              |
|--------|---------------------------|------------------------------------------------|--------------------------|
| GET    | `/api/feedback`           | `?category&keyword&from&to&page&limit`         | List paginated feedback   |
| GET    | `/api/analytics/summary`  | —                                              | Totals + chart data       |

All responses follow the shape:
```json
{ "success": true,  "data": { ... } }
{ "success": false, "error": "...", "details": { ... } }
```

## Running Tests

```bash
npm test
```

Vitest + supertest — runs against an in-memory SQLite database, no `.env` required.
