# BudgetV2 - Financial Tracking Platform

## Deployment
- **URL:** https://budgetv2.pxopenclaw.com
- **Port:** 3003 (internal 3000)
- **Server:** Hetzner ARM64 (178.104.138.179)
- **Status:** ✅ Live (browser verified)
- **Git:** https://github.com/pixegami-agent/budgetv2

## Docker Run Command (exact)
```bash
docker run -d \
  --name budgetv2 \
  -p 3003:3000 \
  -e NEXTAUTH_SECRET=budgetv2-super-secret-production-key-2026 \
  -e NEXTAUTH_URL=https://budgetv2.pxopenclaw.com \
  budgetv2:latest
```

## Redeploy Steps
```bash
ssh -i ~/.ssh/hetzner_root root@178.104.138.179
cd /var/www/apps/budgetv2 && git pull origin main
docker build -t budgetv2:latest .
docker stop budgetv2 && docker rm budgetv2
docker run -d --name budgetv2 -p 3003:3000 \
  -e NEXTAUTH_SECRET=budgetv2-super-secret-production-key-2026 \
  -e NEXTAUTH_URL=https://budgetv2.pxopenclaw.com \
  budgetv2:latest
# Verify:
curl -sI https://budgetv2.pxopenclaw.com
```

## Architecture
- **Framework:** Next.js 16 + TypeScript + Tailwind CSS
- **Auth:** NextAuth.js credentials (demo: any email/password)
- **Styling:** Emerald/slate color scheme

## Features Implemented
- ✅ Sign-in page (demo mode)
- ✅ Dashboard with stats cards (Income, Expenses, Net Balance)
- ✅ Drag-and-drop file upload UI (PDF, CSV)
- ✅ Sign-out button
- ✅ Docker + nginx SSL routing

## Features Planned
- [ ] PDF/CSV statement parsing (pdfjs-dist, csv-parse already installed)
- [ ] Transaction ingestion + storage (Prisma + PostgreSQL)
- [ ] Multi-account support
- [ ] Spending analytics with charts (Recharts installed)
- [ ] Export reports

## Bugs Fixed (Session 2026-04-05)

### 1. NextAuth NO_SECRET error
- **Symptom:** "This page couldn't load — server error"
- **Cause:** NextAuth requires NEXTAUTH_SECRET in production
- **Fix:** Pass via `docker run -e NEXTAUTH_SECRET=...`
- **Lesson:** `.env.local` is NOT available inside Docker — always use -e flags

### 2. SSL cert not wildcard
- **Symptom:** `curl https://budgetv2.pxopenclaw.com` fails with SSL error (curl exit 60)
- **Cause:** Cert was single-domain (`pxopenclaw.com`), didn't cover subdomains
- **Fix:** Reissued wildcard cert via certbot-dns-cloudflare plugin
- **Command:**
  ```bash
  certbot certonly --dns-cloudflare \
    --dns-cloudflare-credentials /root/.secrets/cloudflare.ini \
    -d pxopenclaw.com -d "*.pxopenclaw.com" \
    --force-renewal
  systemctl reload nginx
  ```
- **Lesson:** Always verify cert SANs with openssl before reporting success

### 3. SSR + useSession conflict
- **Symptom:** Build error / runtime crash on dashboard
- **Cause:** useSession can't run server-side
- **Fix:** Simplified dashboard to plain client component (no useSession)

### 4. Root page getServerSession
- **Symptom:** Error on root page
- **Cause:** getServerSession() called before NextAuth was configured
- **Fix:** Root page just does `redirect('/dashboard')`, no auth check

## Model Used
- **Sonnet 4.6:** Scaffolding, all debugging
- **Haiku 4.5:** Chat, post-deployment

## Git History
- `5cca1b4` — simplify dashboard, remove auth dependency
- `6604b12` — simplify root page, add .env with nextauth config
- `ea384be` — fix: add nextauth secret for production
- `f286a48` — initial: budgetv2 scaffold
