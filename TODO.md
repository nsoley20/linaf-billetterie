# LINAF Ticketing Platform - Development TODO

## Approved Plan Phases

### 1. Project Setup
- [x] Create monorepo structure: backend/, frontend/, shared/, db/ (skeleton files created)
- [x] Initialize README.md with overview/setup instructions
- [x] Setup dev environment: Node.js, PostgreSQL (Docker optional)
**Status: Complete**

### 2. Database Setup
- [ ] Init Prisma in backend/
- [ ] Define schema.prisma (User, Team, Stadium, Match, Ticket, Sale)
- [ ] Create migration and seed data (sample teams/matches)

### 3. Backend (NestJS)
- [ ] `nest new backend`
- [ ] Auth module (JWT register/login)
- [ ] CRUD modules: Teams, Stadiums, Matches
- [ ] Tickets module: Generate QR, buy, scan/validate
- [ ] Stats module: Aggregates
- [ ] Mock payment endpoint
- [ ] Run `npm run start:dev`

### 4. Frontend (Next.js + Tailwind)
- [x] `npx create-next-app@latest frontend --tailwind --eslint --app` (Next 16, données statiques dans `frontend/src/data`)
- [x] Pages : Accueil, Matchs, Classement (calcul auto), Équipes, Joueurs & stats, Billetterie (paiement simulé + QR), Mes billets, Infos
- [ ] Auth integration (NextAuth or custom)
- [ ] Public pages: Home, Match details, Buy flow, Payment (mock)
- [ ] User pages: My Tickets (QR/PDF), Scanner (for agents)
- [ ] Admin dashboard: CRUD forms, Stats charts
- [ ] Components: MatchCard, TicketViewer, AdminTable
- [ ] Run `npm run dev`

### 5. Integrations & Features
- [ ] QR generation (qrcode.react/backend), PDF export (pdf-lib)
- [ ] Image uploads (Cloudinary for logos)
- [ ] Responsive UI, theming
- [ ] Testing: Manual E2E flows

### 6. Deployment & Demo
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend/DB to Railway/Render
- [ ] Documentation: API docs, User guide
- [ ] Final demo commands

**Progress: Step 1 complete. Next: Backend setup (Step 2-3).**

*Updated after each completed step.*

