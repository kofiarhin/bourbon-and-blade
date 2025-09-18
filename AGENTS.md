# Agent Guidelines for Blade & Bourbon

## Repository Tour
- **backend/** – Express 5 API. Routes live under `src/routes`, call controller functions in `src/controllers`, and lean on services in `src/services` that encapsulate business logic and data-layer helpers (`src/data`). Utility helpers (e.g., HTTP errors, validators) are in `src/utils`.
- **frontend/** – React 18 + Vite SPA. Components are grouped by feature folder (`src/components`, `src/pages`, `src/layouts`). Global content is loaded through `src/context/ContentContext.jsx` and supporting hooks/services in `src/hooks` and `src/services`.
- **shared/** – JSON source of all site content that both the API and UI consume. Edits here should consider their impact on both layers.

## Coding Conventions
- Stick with modern ES modules (`import`/`export`) everywhere; both apps declare `"type": "module"`.
- Preserve the existing two-space indentation and quote style already used within the file you are touching.
- Backend routes should stay thin: validate/shape requests in controllers using helpers from `src/utils/validators.js`, delegate business logic to services, and throw `createHttpError` when returning early.
- If you extend data persistence, prefer augmenting `backend/src/data/mockDb.js` or introducing a similar in-memory helper instead of sprinkling shared state.
- Frontend components should remain functional components using hooks. Share data through context (`useSiteContent`) rather than prop-drilling when the information is global.
- Keep SCSS modules (`*.module.scss`) collocated with their component/layout and scope classes via the imported `styles` object.
- Update or add tests alongside new functionality (backend Jest tests live in `backend/tests`, frontend Vitest + Testing Library specs live in `frontend/src/tests`).

## Testing Expectations
- Run the suite that matches the area you touched:
  - `npm test --prefix backend` for API changes.
  - `npm test --prefix frontend` for UI changes.
  - `npm test` from the repo root if both sides are affected or you are unsure.
- Surface any failing test output in your report and resolve issues before finalising a change.

## Miscellaneous Workflow Notes
- Environment configuration is centralised in `backend/src/config/env.js`; prefer adding new env lookups there.
- When adding new API endpoints, wire them up in `backend/src/routes/index.js` so they are exposed under `/api`.
- The frontend HTTP client lives in `frontend/src/services/apiClient.js`; add new API helpers there and reuse them across hooks/components instead of calling `fetch` directly.
- Keep shared content structured (see `shared/content.json`). If you adjust schemas, update both API serializers/services and any frontend consumers that expect those shapes.
