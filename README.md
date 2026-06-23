# Acowale CRM (Machine Test Submission)

## Live Links
- **Live App:** [acowalemachinetest.vercel.app](acowalemachinetest.vercel.app)
- **API Health Check:** [https://acowalemachinetest-production.up.railway.app/health](https://acowalemachinetest-production.up.railway.app/health)
- **Source Code:** [This repository](#)

## Related Documents
- [DECISIONS.md](./DECISIONS.md) — Architectural choices and trade-offs.
- [TEACH_US.md](./TEACH_US.md) — A short lesson on a specific engineering concept.

---

A Customer Feedback Management System built with React, Vite, Express, and SQLite.

This repository features two independently runnable projects:
- Client: A single-page application (SPA) built with React for the frontend interface.
- Server: A REST API built with Express, using a local SQLite database for data storage.

---

## Features

- Public Feedback Portal: A form for users to submit feedback with real-time character counting and spam prevention.
- Admin Dashboard: A secure portal to view, filter, and analyze user submissions.
- Zero Configuration Database: Uses SQLite, which automatically creates the database file upon the first run. No separate database server installation is required.

---

## Quick Start Guide

You only need Node.js installed on your machine to run this project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/asalsatya/acowale_machine_test
cd acowale_machine_test
```

### 2. Start the Backend Server (Terminal 1)
Open a terminal window and execute the following commands:
```bash
cd server
npm install
cp .env.example .env
npm run seed
npm run dev
```
Note: The `npm run seed` command populates the database with initial sample data. The `.env.example` file contains default keys that are ready to use for local development.

### 3. Start the Frontend Client (Terminal 2)
Open a second terminal window and execute the following commands:
```bash
cd client
npm install
npm run dev
```

---

## How to Access the Application

Once both the server and client are running, you can access the application through your web browser.

### Public Feedback Portal
Navigate to: **http://localhost:5173**
This page is intended for public users to submit their feedback.

### Admin Dashboard
Navigate to: **http://localhost:5173/admin**
This page is intended for administrators to manage feedback. 

**Login Credentials:**
Use the `ADMIN_API_KEY` value from your `.env` file. By default, this is `admin`. This is the Test ADMIN_KEY - 123456@pass

---

## Environment Variables

### Server (`server/.env`)
| Variable | Description |
|----------|-------------|
| `PORT` | The port the Express server will listen on (default: `4000`). |
| `NODE_ENV` | Sets the environment context (e.g., `development`, `production`). |
| `DB_PATH` | The file path where the SQLite database will be stored. |
| `LOG_LEVEL` | Configures the verbosity of the Pino logger (e.g., `info`, `debug`). |
| `CORS_ORIGINS` | Comma-separated list of domains allowed to make cross-origin requests. |
| `ADMIN_API_KEY` | The secret key required to access protected admin API routes. |

### Client (`client/.env`)
| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Optional. Overrides the backend API URL in production. |

---

## Production Readiness

The API and backend are designed with robust production-ready patterns:
- **Validation**: Strict input validation using `zod` schemas on all endpoints.
- **Error handling**: A centralized middleware layer ensures consistent JSON error shapes and prevents stack traces from leaking.
- **Logging**: High-performance, structured JSON logging via `pino`.
- **Rate limiting**: Protection against spam on the `POST /api/feedback` endpoint.
- **Authentication**: Secure gating of all admin routes via the `x-api-key` header.
- **Health check**: A dedicated `/health` endpoint for load balancers and uptime monitors.
- **Database indexes**: Strategic SQL indexes on `category` and `created_at` for rapid querying and filtering.

---

## Testing

The backend includes an integration test suite targeting the REST API endpoints.
- **Coverage**: Validates feedback submission, validation failures, admin auth rejection, and paginated data retrieval.
- **Runner**: Powered by `vitest` and `supertest`, executing entirely in-memory with zero `.env` requirements.

To run the tests:
```bash
cd server
npm test
```

---

## Repository Structure

```text
acowale-crm/
├── server/          
│   ├── src/         
│   ├── data/        
│   └── .env         
├── client/          
│   ├── src/         
│   └── vite.config.js 
└── README.md        
```

---

## API Architecture

The frontend and backend communicate via a REST API. The Vite development server automatically proxies requests starting with `/api` to the backend server.

### Public Endpoints
| Method | Path             | Description |
|--------|------------------|-------------|
| POST   | `/api/feedback`  | Submit new feedback |
| GET    | `/health`        | Server health check |

### Admin Endpoints (Requires `x-api-key` header)
| Method | Path                     | Description |
|--------|--------------------------|-------------|
| GET    | `/api/feedback`          | Retrieve paginated, filtered submissions |
| GET    | `/api/analytics/summary` | Retrieve dashboard statistics |

---

## Docker Support

You can run the entire application stack using Docker Compose:

```bash
docker-compose up --build
```
This builds and serves both the backend Node service and the frontend using Nginx, proxying API requests automatically.

---

## Deployment Guide

Both applications can be deployed to modern cloud hosting platforms.

### Backend Deployment (e.g., Render, Railway)
1. Set the Root Directory to `server`.
2. Build Command: `npm install`
3. Start Command: `npm start`
4. Set Environment Variables: `ADMIN_API_KEY`, and `CORS_ORIGINS`.
5. Important: Ensure you attach a Persistent Disk to save the `data/crm.db` file to prevent data loss between deployments.

### Frontend Deployment (e.g., Vercel, Netlify)
1. Set the Root Directory to `client`.
2. Framework Preset: `Vite`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Set Environment Variable: `VITE_API_BASE_URL` pointing to your deployed backend URL.


### Screen previews

<img width="1912" height="982" alt="image" src="https://github.com/user-attachments/assets/5075a0ba-bd41-4b75-9cf0-663aa9c41b76" />
<img width="1911" height="960" alt="image" src="https://github.com/user-attachments/assets/b04c1a97-dba7-4e90-8fb0-0b63a2f9dd4d" />
<img width="1917" height="977" alt="image" src="https://github.com/user-attachments/assets/3dff7ffb-2d6d-4aa5-b47d-d3658a1588fa" />
<img width="1917" height="983" alt="image" src="https://github.com/user-attachments/assets/9491009b-918c-48f8-a04b-b79406fea6d6" />

and more...

