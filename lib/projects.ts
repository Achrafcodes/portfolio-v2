export type Project = {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  outcomeHeadline: string;
  outcomeBody: string[];
  features: { icon: string; title: string; body: string }[];
  heroImage: string;
  mobileImage: string;
  gallery: { src: string; label: string }[];
  stack: string[];
  liveUrl: string;
  status: string;
};

/**
 * Source of truth: /public/PROJECTS.md. No numbers or claims added beyond
 * what's documented there.
 */
export const projects: Project[] = [
  {
    slug: "reckon",
    number: "PROJECT 01",
    name: "RECKON",
    tagline:
      "Personal finance SaaS — upload a bank statement, get spending broken down automatically, with budgets and exportable reports.",
    outcomeHeadline: "A financial dashboard engineered for exactness.",
    outcomeBody: [
      "Reckon is Achraf's own SaaS product, built solo from design through security audit. It parses CSV, Excel, or PDF bank statements, auto-categorizes transactions into 14 keyword-matched categories, and dedupes on re-upload so nothing gets double-counted.",
      "Money is stored as MongoDB Decimal128, never a float, so currency math is exact to the cent. Every data fetch happens server-side through React Server Components — zero useEffect fetching.",
    ],
    features: [
      {
        icon: "receipt_long",
        title: "Import Engine",
        body: "Drag/drop CSV, Excel, or PDF; auto-parses and auto-categorizes, dedupes on re-upload.",
      },
      {
        icon: "savings",
        title: "Budget System",
        body: "Monthly limit per category with warnings before overspend.",
      },
      {
        icon: "bar_chart",
        title: "Analytics Dashboard",
        body: "Income vs. expense trend, spending-by-category donut, KPI cards — all server-rendered.",
      },
    ],
    heroImage: "/reckon/screencapture-reckon-kappa-vercel-app-dashboard-2026-07-07-02_53_07.png",
    mobileImage: "/reckon/screencapture-reckon-kappa-vercel-app-dashboard-2026-07-07-02_52_29.png",
    gallery: [
      {
        src: "/reckon/screencapture-reckon-kappa-vercel-app-analytics-2026-07-07-02_50_25.png",
        label: "View 01: Analytics",
      },
      {
        src: "/reckon/screencapture-reckon-kappa-vercel-app-transactions-2026-07-07-02_49_54.png",
        label: "View 02: Transactions",
      },
      {
        src: "/reckon/screencapture-reckon-kappa-vercel-app-budgets-2026-07-07-02_50_12.png",
        label: "View 03: Budgets",
      },
      {
        src: "/reckon/screencapture-reckon-kappa-vercel-app-savings-2026-07-07-02_50_38.png",
        label: "View 04: Savings",
      },
    ],
    stack: ["NEXT.JS 16", "TYPESCRIPT", "MONGODB ATLAS", "TAILWIND CSS V4", "RECHARTS"],
    liveUrl: "https://reckon-kappa.vercel.app",
    status: "LIVE",
  },
  {
    slug: "hustl",
    number: "PROJECT 02",
    name: "HUSTL",
    tagline:
      "Full-stack job board built to prove out real-time features done right — candidates browse and apply, employers post listings and manage applicants.",
    outcomeHeadline: "The real story is correctness, not the happy path.",
    outcomeBody: [
      "Hustl is a personal portfolio project built in a single month to stress-test real-time messaging: typing indicators, delivery status, unread badges, reconnect handling. The engineering story is fixing duplicate-message bugs, socket reconnect/rejoin logic, and scroll-position races against DOM paint.",
      "A full rebrand mid-build (Hirely → Hustl) surfaced a real production CORS bug — exact-origin string matching broke on trailing-slash mismatches and stale URLs. Fixed with an explicit, env-driven origin allowlist.",
    ],
    features: [
      {
        icon: "chat",
        title: "Real-Time Messaging",
        body: "Typing indicators, delivery status, unread badges, notification sounds, reconnect handling via Socket.io.",
      },
      {
        icon: "work",
        title: "Two-Sided Dashboards",
        body: "Application-status dashboard for candidates, applicant-management dashboard for employers.",
      },
      {
        icon: "verified_user",
        title: "Auth & Onboarding",
        body: "JWT + bcrypt plus Google OAuth via Passport, with a dedicated social sign-up onboarding flow.",
      },
    ],
    heroImage: "/hustl/screencapture-hustl-ivory-vercel-app-2026-07-07-02_54_52.png",
    mobileImage: "/hustl/screencapture-hustl-ivory-vercel-app-2026-07-10-03_40_41.png",
    gallery: [
      {
        src: "/hustl/screencapture-hustl-ivory-vercel-app-jobs-2026-07-07-02_55_18.png",
        label: "View 01: Job Listings",
      },
      {
        src: "/hustl/screencapture-hustl-ivory-vercel-app-dashboard-candidate-2026-07-07-02_56_37.png",
        label: "View 02: Candidate Dashboard",
      },
      {
        src: "/hustl/screencapture-hustl-ivory-vercel-app-companies-6a3805c60007935f4b423b3b-2026-07-07-02_55_39.png",
        label: "View 03: Company Profile",
      },
      {
        src: "/hustl/screencapture-hustl-ivory-vercel-app-jobs-6a394a463a50a83691173adc-2026-07-07-02_56_02.png",
        label: "View 04: Job Detail",
      },
    ],
    stack: ["REACT 19", "VITE", "NODE.JS / EXPRESS", "SOCKET.IO", "MONGODB"],
    liveUrl: "https://hustl-ivory.vercel.app",
    status: "SHIPPED",
  },
  {
    slug: "raqib",
    number: "PROJECT 03",
    name: "RAQIB CRM",
    tagline: "A freelancer CRM built for Achraf's own client management. \"Keep an eye on your business.\"",
    outcomeHeadline: "Built for real use, not a tutorial clone.",
    outcomeBody: [
      "Raqib handles full CRUD on clients, projects, invoices, and reminders, with a dashboard showing real-time stats, an earnings chart, and pipeline breakdown. It generates invoice PDFs and emails them with attachments automatically.",
      "A daily automated digest sends upcoming reminders and overdue invoices. Security hygiene is applied even at personal scale: CORS whitelist, Helmet, rate limiting, input validation, and a JWT secret guard that fails startup if misconfigured.",
    ],
    features: [
      {
        icon: "payments",
        title: "Invoicing",
        body: "PDF generation via pdf-lib plus email delivery with attachments over Gmail SMTP.",
      },
      {
        icon: "account_tree",
        title: "Client & Project CRUD",
        body: "Full lifecycle management across clients, projects, invoices, and reminders.",
      },
      {
        icon: "notifications",
        title: "Notification Bell",
        body: "Color-coded due-date alerts plus a daily automated email digest.",
      },
    ],
    heroImage: "/raqib/screencapture-raqib-one-vercel-app-2026-07-07-02_45_32.png",
    mobileImage: "/raqib/screencapture-raqib-one-vercel-app-2026-07-07-02_47_18.png",
    gallery: [
      {
        src: "/raqib/screencapture-raqib-one-vercel-app-clients-2026-07-07-02_46_06.png",
        label: "View 01: Client Relations",
      },
      {
        src: "/raqib/screencapture-raqib-one-vercel-app-projects-2026-07-07-02_46_23.png",
        label: "View 02: Active Projects",
      },
      {
        src: "/raqib/screencapture-raqib-one-vercel-app-invoices-2026-07-07-02_46_35.png",
        label: "View 03: Invoices",
      },
      {
        src: "/raqib/screencapture-raqib-one-vercel-app-reminders-2026-07-07-02_46_47.png",
        label: "View 04: Reminders",
      },
    ],
    stack: ["REACT", "TYPESCRIPT", "NODE.JS / EXPRESS", "MONGODB ATLAS", "TAILWIND V4"],
    liveUrl: "https://raqib-one.vercel.app",
    status: "LIVE",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const idx = projects.findIndex((p) => p.slug === slug);
  return projects[(idx + 1) % projects.length];
}
