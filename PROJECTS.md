# Projects — portfolio source material

Real facts only, compiled from the shipped codebases and confirmed by Achraf. Use this as
the single source of truth when writing case studies, About copy, or talking to clients —
don't invent numbers or claims beyond what's here.

---

## 1. Reckon — Personal finance SaaS (flagship)

**What it is:** Achraf's own SaaS product (not commissioned — "something like a startup,"
no confirmed paying customers). Upload a bank statement and get spending broken down
automatically, with budgets and exportable reports.

- **Live:** https://reckon-kappa.vercel.app
- **Code:** https://github.com/Achrafcodes/Reckon
- **Status:** LIVE
- **Role:** Solo developer — own product, design through security audit

**Stack:** Next.js 16, TypeScript, MongoDB Atlas, Tailwind CSS v4, Recharts, Zod, React Hook
Form, SheetJS, jose, bcrypt — deployed on Vercel

**What it does:**
- File import engine — drag/drop CSV, Excel, or PDF; auto-parses, auto-categorizes into 14
  keyword-matched categories (+ custom), dedupes on re-upload (no duplicate transactions)
- Budget system — monthly limit per category, warns before overspend
- Analytics dashboard — income vs. expense trend, spending-by-category donut, KPI cards, all
  server-rendered
- Report export — PDF/Excel
- Full auth with "remember me," subscription gate, dark mode with zero flash, mobile-first /
  PWA-installable

**Notable engineering decisions:**
- Money stored as MongoDB `Decimal128`, never a float — currency math exact to the cent
- Zero `useEffect` data fetching — everything reads on the server via Server Components
- JWT access (15 min) + refresh (7 day) tokens, both `httpOnly`/`Secure`/`SameSite=Strict`;
  middleware verifies the JWT signature on every request, not just cookie presence
- Zod validates every server boundary (forms, uploads, API routes)
- Security pass before launch: CSP headers, timing-safe webhook signature comparison, regex
  escaping on search input, bcrypt at cost factor 12
- Serverless-safe MongoDB connection, cached across Vercel cold starts

**Numbers:**
- ~50 files of production TypeScript
- 8 Mongoose models (User, Transaction, Category, Budget, Report, Notification, ImportBatch)
- 14 API routes + Server Actions
- Full security audit completed pre-launch
- Lighthouse: Performance 95–100 · Accessibility 90+ · Best Practices 96–100 · SEO 100

**Portfolio framing:** the deepest case study — production SaaS with a real security audit
and Lighthouse scores to back it up. Lead with this one.

---

## 2. Hustl — Full-stack job board

**What it is:** A personal **portfolio project** (confirmed — not a real business, no real
candidates/employers). Built this month (July 2026) to prove out real-time features done
right. Two-sided: candidates browse/apply, employers post listings and manage applicants.

- **Live:** https://hustl-ivory.vercel.app
- **Code:** not public yet
- **Status:** SHIPPED
- **Role:** Solo developer — personal portfolio project

**Stack:**
- Frontend: React 19, Vite, Tailwind CSS, React Router — Vercel
- Backend: Node.js/Express, MongoDB (Mongoose), Socket.io — Railway

**What it does:**
- Real-time messaging — typing indicators, delivery status, unread badges, notification
  sounds, reconnect handling
- Job filtering and browsing, résumé applications (PDF upload via Multer → Cloudinary)
- Application-status dashboard (candidate side) and applicant-management dashboard
  (employer side)
- Auth: JWT + bcrypt, plus Google OAuth (Passport) with a dedicated onboarding flow for
  social sign-ups
- Email verification and password reset via Resend
- Dark/light toggle, full mobile-responsive pass

**Notable engineering decisions:**
- Fixed duplicate-message bugs, socket reconnect/rejoin logic after dropped connections,
  scroll-position races against DOM paint, unread-badge sync without reloads
- Production CORS locked to an explicit origin allowlist (env-driven) — surfaced and fixed a
  real bug where exact-origin string matching broke on trailing-slash mismatches and stale
  URLs
- Went through a full rebrand mid-build (Hirely → Hustl) — repo, env configs, and deployment
  domains all touched, which is what caused the CORS bug above
- Testing: Jest + Supertest + `mongodb-memory-server` — test suite doesn't need a real DB

**Portfolio framing:** second case study — the real-time messaging correctness work (not the
happy-path features) is the actual story here.

---

## 3. Raqib — Freelancer CRM

**What it is:** Built for Achraf's own freelance client management — a few friends use it
too. Not a market-facing product for freelancers generally.

- **Live:** https://raqib-one.vercel.app
- **Code:** not public
- **Status:** LIVE
- **Role:** Solo developer — built for own use
- **Tagline:** "Keep an eye on your business."

**Stack:**
- Frontend: React + TypeScript + Tailwind v4 — Vercel
- Backend: Node.js + Express + TypeScript — Railway
- DB: MongoDB Atlas (Mongoose)

**What it does:**
- Full CRUD on clients, projects, invoices, reminders
- Dashboard — real-time stats, earnings chart, pipeline breakdown
- Invoice PDF generation (`pdf-lib`) + email delivery with attachments (Nodemailer over Gmail
  SMTP)
- Daily automated email digest — upcoming reminders + overdue invoices
- Auth: JWT in httpOnly cookies + Google and GitHub OAuth (Passport.js)
- Notification bell with color-coded due-date alerts
- Dark-themed, responsive UI — bottom nav on mobile, sidebar on tablet/desktop

**Notable engineering decisions:**
- Frontend proxies `/api/*` through Vercel to Railway — avoids cross-domain cookie issues
  instead of fighting `SameSite=None` workarounds
- Security hygiene even at personal scale: CORS whitelist, Helmet, rate limiting, input
  validation + mass-assignment protection on every endpoint, ObjectId validation middleware,
  body size limits, a JWT secret guard that fails startup if misconfigured

**Portfolio framing:** solves a problem Achraf actually had — good "built for real use, not
a tutorial clone" story.

---

## 4. Legacy Import — Car-import business platform (client project)

**What it is:** A paid client project — not personal work. Live site for a real business
importing vehicles from Japanese/Korean auctions into Belgium. French-language.

- **Live:** https://www.legacyimport.fr
- **Code:** private (client project)
- **Status:** CLIENT WORK
- **Client:** confirmed real client (testimonial from Julien Moreau)

**Stack:** Next.js (canary) + TypeScript, Tailwind CSS, MUI, Flowbite React, Framer Motion
(scroll reveals), react-icons, react-select, Redux Toolkit (auth/admin role/session/shared
cars-data), Firebase (Auth incl. Google sign-in, Firestore, Storage), Google Sheets API
(`googleapis`) for auction/pricing data, Google Maps React integration

**What it does:**
- Marketing site: hero, process steps, collections, FAQ, contact, About
- Car catalogs for Korean (`/coree`) and Japanese (`/japon`) vehicles with dynamic detail
  routes
- Auction module (Sheets integration present; API route currently commented out)
- **Import cost simulator** (`api/stimulateur.ts`) — computes full landed cost: Japan fees by
  bid tier, offshore invoice, commission, Belgian customs duties, port fees (Antwerp),
  Belgian VAT, transport, and homologation/registration
- Email/password + Google OAuth via Firebase; separate user and admin areas with
  role-based route protection
- Admin dashboard for product management and order management (status + file upload),
  backed by Firestore + Storage

**Also built for this client — the automation bot:**
A separate Python bot that pulls auction photos and listing data, filters them, and
publishes straight to the site's Firebase — replacing manual double-posting of the same
listings to both Telegram and the website by hand. **Saves the client 2 hours a day.**

*Correction note: an earlier CV bullet described a separate "Car Auction Platform" with
real-time bidding / WebSockets / a recommendation engine — that has no real screenshot or
confirmation and is likely an over-read of a CV line. Don't use it. The bot described above
is the real, confirmed automation work.*

**Portfolio framing (Achraf's own framing):** pitch as a full-stack e-commerce/import
platform with real domain complexity (multi-country customs/tax), not a template site.
Highlight the role-based admin panel + Firebase CRUD as the backend proof point. The cost
simulator is genuine business logic and a standout feature — most portfolio CRUD sites don't
have anything like it.

**Testimonial (Julien Moreau):**
> "Achraf was easy to work with from day one. I already had a clear idea of how I wanted the
> website to look, and he managed to bring it to life almost exactly as I imagined. He was
> responsive, open to feedback, and always quick to make adjustments. The site feels fast,
> modern, and professional, and we've had several customers compliment the new design."

---

## 5 & 6. Two more client projects (testimonials only — no live URL/screenshot yet)

These are real, confirmed client projects, but without a public URL or screenshot they can't
become full case studies or FeaturedWork cards yet. If Achraf provides a live link or
screenshot, promote them the same way as the four above.

### PDF Editor Website
Built a clean, intuitive interface for a client's PDF editor — file upload, document
navigation, page editing. No client name given.

> "We needed someone who could build a clean and intuitive interface for our PDF editor, and
> Achraf did a great job. Features like uploading files, navigating documents, and editing
> pages all feel smooth and easy to use. He communicated well throughout the project and
> always found practical solutions when new ideas came up. I'd definitely work with him
> again."

### Real Estate Website
Property pages, mobile-responsive, simple search experience. No client name given. (Not
included in FeaturedWork because it isn't publicly deployed — that's a deployment-status
note, not a doubt about whether the work happened.)

> "I was looking for a developer who cared about the details, and Achraf didn't disappoint.
> The property pages load quickly, everything works well on mobile, and the search
> experience is simple for visitors. He kept me updated during the project and was happy to
> make improvements based on my feedback. The final result looks much more professional than
> I expected."

---

## Quick-reference table

| Project | Type | Status | Live URL | Case study |
|---|---|---|---|---|
| Reckon | Own SaaS | LIVE | reckon-kappa.vercel.app | `/work/reckon` |
| Hustl | Portfolio project | SHIPPED | hustl-ivory.vercel.app | `/work/hustl` |
| Raqib | Own tool | LIVE | raqib-one.vercel.app | `/work/raqib` |
| Legacy Import | Client work | CLIENT WORK | legacyimport.fr | `/work/legacy-import` |
| PDF Editor Website | Client work | — | none yet | testimonial only |
| Real Estate Website | Client work | — | none yet | testimonial only |

## What's still missing (ask Achraf, don't guess)

- Live URL or screenshots for PDF Editor Website and Real Estate Website
- Client names for those two (currently anonymous in testimonials)
- LinkedIn profile URL (flagged as a TODO in Footer/Contact/About)
- A one-line personal note for the About/Credibility "who I am beyond the stack" section
- A real photo to replace the "AE" initials placeholder
