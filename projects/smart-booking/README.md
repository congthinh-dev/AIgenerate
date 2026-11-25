# Smart Resource Booking

A local meeting-room and shared-equipment booking app built with Express, TypeScript, Prisma, SQLite, React, Vite and Tailwind CSS.

## Run locally

Requires Node.js 24 and npm 11. Copy `.env.example` to `.env`, set a private `ADMIN_PASSWORD` of at least 12 characters, then run:

```sh
npm install
npm run db:deploy
npm run db:generate
npm run db:seed
npm run dev
```

Vite serves the web app and proxies `/api` to the API on port 3001. The SQLite database is created under `prisma/`. Public registration is disabled; the seed command provisions the initial admin and sample resources.

## Verification

`npm run typecheck` and `npm run build`. For integration tests, first set `DATABASE_URL` to a disposable SQLite file, run `npm run db:deploy` and `npm run db:generate`, then `npm test`. Do not point tests at data you need to keep.

## Booking rules

- Admins can provision User accounts with an initial password; public registration is disabled. Rooms are immediately approved. Equipment marked `requiresApproval` starts pending.
- Times are UTC ISO-8601 intervals `[startAt,endAt)`; adjacent bookings are allowed.
- SQLite triggers reject overlapping active bookings at the database boundary. Rejected and cancelled bookings release the slot.
- An in-process task marks expired approvals completed and catches up on startup. Run one API process for this local SQLite setup.
