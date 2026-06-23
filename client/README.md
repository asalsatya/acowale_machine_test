# Acowale CRM — Client

React + Vite frontend. Runs independently on port **5173**.

## Structure

```
client/
├── src/
│   ├── components/
│   │   ├── common/       # Button, Loader, Layout, Navbar, CategoryBadge
│   │   ├── feedback/     # FeedbackForm, CategorySelect
│   │   └── dashboard/    # StatsCard, CategoryChart, RecentSubmissions, FilterBar
│   ├── pages/            # UserWindow (public), AdminConsole (admin)
│   ├── services/         # api.js (axios instance), feedbackService.js, analyticsService.js
│   ├── hooks/            # useFeedback.js, useAnalytics.js
│   ├── context/          # AuthContext.jsx
│   ├── styles/           # index.css (full design system)
│   ├── App.jsx           # React Router route declarations
│   └── main.jsx          # Entry point
├── .env.example
├── index.html
├── package.json
├── vite.config.js
└── README.md             # ← you are here
```

## Quick Start

```bash
# 1. Install dependencies
cd client
npm install

# 2. (Optional) Copy environment file
cp .env.example .env
# Leave VITE_API_BASE_URL blank in development — Vite's proxy handles it.

# 3. Start dev server
npm run dev
```

The app starts at **http://localhost:5173**.  
The Vite dev server proxies `/api` and `/health` to `http://localhost:4000` — **start the server first**.

## Pages

| Route            | Component        | Access  | Description                     |
|------------------|-----------------|---------|----------------------------------|
| `/`              | `UserWindow`    | Public  | Feedback submission form         |
| `/admin/login`   | `AdminLogin`    | Public  | Enter API key to authenticate    |
| `/admin`         | `AdminConsole`  | Admin   | Dashboard with charts and table  |

## Key Conventions

- **No direct `fetch` / `axios` calls in components** — all API calls live in `services/`.
- **No business logic in components** — state and side effects live in `hooks/`.
- **All styles** come from `styles/index.css` CSS classes (`.glass`, `.btn-primary`, `.input-field`, etc.).

## Build

```bash
npm run build   # produces dist/
npm run preview # preview the production build locally
```
