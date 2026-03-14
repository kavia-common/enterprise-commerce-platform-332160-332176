# frontend_nextjs

Next.js UI for the enterprise commerce platform.

## User Activity Log (Admin)
Page:
- `/admin/activity` shows activity logs in a table with basic filters and pagination.

## Login
- `/login` issues a JWT via backend `POST /api/auth/login` and stores it in `localStorage` as `auth_token`.

Admin role in this template:
- Any email ending with `@admin.test` is treated as admin by the backend.

## Products Management (Admin)
- `/admin/products` — Placeholder page for Products CRUD (navigation link added; full UI coming soon).

## Orders Management (Admin)
- `/admin/orders` — Placeholder page for Orders CRUD (navigation link added; full UI coming soon).

## Environment
Uses `.env` (already present). Needs:
- `NEXT_PUBLIC_API_BASE` (e.g. `http://localhost:3001` or the deployed backend URL)
