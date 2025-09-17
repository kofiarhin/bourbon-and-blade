# Blade & Bourbon

Blade & Bourbon is a full-stack demo for a premium barbershop experience. It pairs an Express REST API with a React single-page application so you can explore content, book services, and interact with loyalty and feedback flows.

## Features
- Node.js API serving curated site content, booking, loyalty, feedback, and social endpoints
- React 18 + Vite frontend with routing, context-driven content loading, and interactive forms
- Shared JSON content source reused by both the API layer and the client
- Component and API tests via Vitest, Testing Library, Jest, and Supertest

## Tech Stack
- Backend: Node.js, Express 5, dotenv, Jest, Supertest
- Frontend: React 18, React Router, Vite, Axios, Vitest, Testing Library, SASS
- Tooling: Concurrently for multi-app workflows

## Project Structure
```
.
backend/   Express REST API (see src/ and tests/)
frontend/  Vite + React client
shared/    JSON content consumed by both layers
```

## Getting Started
### Prerequisites
- Node.js 18 or newer

### Install dependencies
From the repository root:
```
npm install
npm install --prefix backend
npm install --prefix frontend
```
Optional: `npm run install-all` repeats the three commands above in one step.

### Run the development servers
```
npm run dev
```
- Backend: http://localhost:4000 (configurable via the `PORT` env variable)
- Frontend: http://localhost:5173 (proxies API calls to the backend)

Run either side individually with:
```
npm run dev --prefix backend
npm run dev --prefix frontend
```

### Production builds
- API: `npm run start --prefix backend`
- Frontend: `npm run build --prefix frontend` followed by `npm run preview --prefix frontend` to serve the static bundle

## Testing
```
npm test                              # run backend and frontend suites together
npm test --prefix backend              # Jest + Supertest API suite
npm test --prefix frontend             # Vitest UI suite
npm run test:coverage --prefix frontend
```

## API Quick Reference
Base URL: `http://localhost:4000/api`

- `GET /health` – service heartbeat
- `GET /content` – full site content payload sourced from `shared/content.json`
- `GET /content/:section` – single content section (for example `services`, `barbers`)
- `GET /bookings` – list in-memory bookings created during the session
- `POST /bookings` – create a booking (`serviceId`, `date`, `time`, optional `barberId`, `clientName`, `clientEmail`)
- `POST /loyalty` – join the loyalty program with `name` and `email`
- `POST /feedback` – submit an experience review with optional `name` and `rating`
- `GET /social` – curated social feed entries

All stateful endpoints persist to the in-memory store defined in `backend/src/data/mockDb.js` and reset when the server restarts.

## Customising Content
Update `shared/content.json` to adjust business details, promo copy, service catalogues, or barbers. Both the API and the frontend will pick up the changes without additional configuration.
