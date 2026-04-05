# BudgetV2 - Financial Tracking Platform

## Deployment
- **URL:** https://budgetv2.pxopenclaw.com
- **Port:** 3003 (internal)
- **Server:** Hetzner ARM64 (178.104.138.179)
- **Status:** 🚀 Ready to Deploy

## Architecture
- **Framework:** Next.js 16 + TypeScript + Tailwind CSS
- **Auth:** NextAuth.js (demo: any email/password)
- **Styling:** Emerald/slate color scheme (clean, minimal, cozy)
- **Libraries:** Recharts (charts), pdfjs-dist (PDF), csv-parse (CSV)

## Features Implemented
- ✅ Auth system (sign-in, sign-out)
- ✅ Dashboard with stats cards
- ✅ Drag-and-drop file upload UI
- ✅ Improved color scheme & typography
- ✅ Responsive mobile design

## Features Planned
- [ ] PDF/CSV statement parsing
- [ ] Transaction ingestion & storage (Prisma + DB)
- [ ] Multi-account management
- [ ] Transaction categorization
- [ ] Monthly/yearly dashboards
- [ ] Spending analytics & charts
- [ ] Export reports

## Key Improvements Over Budget v1
1. **Better UI:** Emerald accent colors, improved spacing
2. **Sign-out:** Added logout functionality
3. **Drag-and-drop:** Visual feedback on file hover
4. **Icons:** More visual hierarchy with Lucide icons
5. **Responsive:** Mobile-first design

## Model Used
- **Sonnet 4.6:** Full scaffolding, architecture, component design
- **Next:** Haiku for chat, testing, deployment

## Next Steps (Post-Deploy)
1. Test live URL
2. Implement Prisma schema + PostgreSQL
3. Add file upload endpoint
4. Build transaction parser
5. Create analytics dashboard

## Git
- Repository: https://github.com/pixegami-agent/budgetv2
- Latest: Initial scaffold with auth + dashboard
