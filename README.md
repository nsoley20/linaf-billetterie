# LINAF Digital Ticketing Platform

## Overview
Web app for LINAF football league ticket sales: Online purchase, QR-secured tickets, admin management, stadium scanning.

**Tech**: Next.js/Tailwind (FE), NestJS/Prisma/PostgreSQL (BE)

## Quick Start (Dev)
1. Install deps:
   ```
   cd frontend && npm install
   cd ../backend && npm install
   ```
2. Start DB: `docker-compose up -d`
3. Migrate: `cd backend && npx prisma migrate dev`
4. Start services:
   ```
   backend: cd backend && npm run start:dev
   frontend: cd frontend && npm run dev
   ```
Frontend: http://localhost:3000  
Backend API: http://localhost:3000

## Roles
- Supporter: Buy tickets
- Admin: Manage matches/teams
- Agent: Scan tickets

## Production
- FE: Vercel
- BE/DB: Railway/Render

See TODO.md for dev progress. Frontend data & update guide: `frontend/README.md`.

