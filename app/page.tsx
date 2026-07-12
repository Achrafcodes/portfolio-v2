import Link from "next/link";
import Image from "next/image";
import LaptopFrame from "@/components/LaptopFrame";
import PhoneFrame from "@/components/PhoneFrame";
import AuroraBackground from "@/components/AuroraBackground";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import ContactActions from "@/components/ContactActions";
import { ArrowRight, ArrowUpRight, Rocket, ShieldCheck, Star as StarIcon } from "@/components/icons";

const display = { fontFamily: 'var(--font-syne), "Syne", sans-serif' };

/* Client-facing taglines — outcome first, tech nowhere near the headline. */
const clientTaglines: Record<string, string> = {
  reckon:
    "Tracking spend across a dozen accounts in a spreadsheet doesn't scale. Reckon parses a bank statement on upload and turns it into budgets, category breakdowns, and exportable reports — the financial clarity a founder actually needs, without hiring a bookkeeper first.",
  hustl:
    "Job boards die on stale listings and messages that arrive an hour late. Hustl was built to solve the second problem specifically: real-time chat between candidates and employers that doesn't drop messages or lag, so a hiring conversation feels like texting, not email.",
  raqib:
    "Freelancers lose money to invoices they forgot to send and reminders they forgot to chase. Raqib is the CRM I built when I got tired of doing that manually — one dashboard for clients, projects, and invoices that nags you before a client has to.",
};

const steps = [
  {
    n: "01",
    title: "Discovery call",
    body: "Fifteen minutes, no pitch deck. You describe the problem in your own words; I ask the questions that surface what it'll actually take.",
  },
  {
    n: "02",
    title: "Scoped proposal",
    body: "A fixed price and timeline in writing before anything is built — not an hourly rate that quietly grows with the project.",
  },
  {
    n: "03",
    title: "Built in the open",
    body: "You get a working preview link in the first days, not a reveal at the end. If something needs to change, it changes now, not after launch.",
  },
  {
    n: "04",
    title: "Delivered, not disappeared",
    body: "Launch day isn't the last day I hear from you. Post-launch support is part of the scope, not a renegotiation.",
  },
];

function Star() {
  return <StarIcon className="size-4 text-signal" />;
}

export default function Home() {
  return (
    <>
      {/* ============ HERO — High-Impact v2 (Stitch) ============ */}
      <section className="relative pb-10 overflow-hidden">
        <AuroraBackground />
        <div className="px-page max-w-container mx-auto relative z-10">
          <div className="reveal-stagger text-center flex flex-col items-center">
            {/* Availability badge */}
            <div className="reveal-fade glass-card flex items-center gap-3 mb-8 px-4 py-2 rounded-full border-white/10">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-live" />
              </span>
              <span className="font-mono text-[10px] text-muted uppercase tracking-[0.2em] font-medium">
                Currently taking new projects — replies within 24h
              </span>
            </div>

            <h1
              className="reveal-blur whitespace-nowrap text-[clamp(30px,6.2vw,80px)] leading-[0.95] tracking-[-0.04em] mb-5"
              style={display}
            >
              Achraf Es-Soussy
            </h1>
            <p className="reveal-fade font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.35em] text-signal mb-7">
              Full-Stack Web Developer
            </p>
            <p
              className="reveal-blur text-title max-w-4xl leading-tight mb-8"
              style={{ ...display, fontWeight: 600 }}
            >
              Web platforms for{" "}
              <span className="text-gradient font-extrabold italic">
                real businesses,
              </span>{" "}
              <span className="font-light opacity-80">
                not tech demos.
              </span>
            </p>

            <p className="reveal-up text-lede text-muted max-w-2xl mx-auto mb-12 opacity-90">
              I build for real estate agents, vehicle dealers, and founders
              who need an MVP that actually ships — scoped like a project,
              not hacked together over a weekend.
            </p>

            <div className="reveal-up flex flex-wrap items-center justify-center gap-4">
              <a
                href={site.gmailCompose}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-glow group bg-signal text-on-signal px-6 sm:px-10 py-4 sm:py-5 font-mono text-[12px] sm:text-[13px] rounded-full hover:shadow-[0_0_30px_rgba(255,159,28,0.3)] active:scale-95 transition-all flex items-center gap-3 font-bold tracking-widest uppercase"
              >
                Book a Free Scope Call
                <ArrowRight className="size-[18px] group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#work"
                className="glass-card text-ink px-6 sm:px-10 py-4 sm:py-5 font-mono text-[12px] sm:text-[13px] rounded-full hover:bg-white/10 transition-all flex items-center gap-3 font-bold tracking-widest uppercase"
              >
                See the Work
                <ArrowUpRight className="size-[18px]" />
              </a>
            </div>
          </div>

          {/* Value cards bento */}
          <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mt-24">
            {/* In production */}
            <div className="reveal-scale glass-card p-8 rounded-2xl flex flex-col justify-between group">
              <div>
                <p className="font-mono text-[10px] text-signal uppercase tracking-widest mb-6">
                  In Production
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-stat text-white" style={display}>
                    {String(projects.length).padStart(2, "0")}
                  </span>
                  <Rocket className="size-5 text-signal animate-pulse" />
                </div>
              </div>
              <ul className="mt-8 space-y-3">
                {projects.map((p) => (
                  <li key={p.slug}>
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between font-mono text-[10px] text-muted uppercase group/item hover:text-white transition-colors"
                    >
                      <span>{p.name}</span>
                      <ArrowRight className="size-3.5 opacity-30 group-hover/item:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vitals */}
            <div className="reveal-scale glass-card p-8 rounded-2xl flex flex-col justify-between overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-live/5 blur-2xl rounded-full -mr-8 -mt-8" />
              <div>
                <p className="font-mono text-[10px] text-live uppercase tracking-widest mb-6">
                  Lighthouse
                </p>
                <div className="text-stat text-live" style={display}>
                  95+
                </div>
              </div>
              <p className="font-mono text-[10px] leading-relaxed text-muted mt-8 uppercase tracking-wider opacity-90">
                On client builds — scores verified per project.
              </p>
            </div>

            {/* Security */}
            <div className="reveal-scale glass-card p-8 rounded-2xl flex flex-col items-center justify-center text-center border-white/10">
              <div className="size-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                <ShieldCheck className="size-7 text-signal" />
              </div>
              <p className="font-mono text-[11px] text-white uppercase tracking-[0.2em] mb-1 font-bold">
                Secure by Design
              </p>
              <p className="font-mono text-[9px] text-muted uppercase tracking-widest opacity-90">
                Security-checked before every launch
              </p>
            </div>
          </div>
        </div>

        {/* Social proof ribbon */}
        <div className="mt-32 border-y border-line bg-white/5 backdrop-blur-sm py-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-signal/30 to-transparent" />
          <div className="max-w-container mx-auto px-page">
            <div className="reveal-up flex flex-col items-center gap-6 text-center">
              <p className="font-mono text-[10px] text-signal uppercase tracking-[0.3em]">
                Featured client review
              </p>
              <div className="flex gap-1">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <blockquote className="max-w-4xl">
                <p
                  className="text-subtitle text-ink leading-snug tracking-tight"
                  style={display}
                >
                  &ldquo;The site feels fast, modern, and professional —
                  we&apos;ve had several customers compliment the new
                  design.&rdquo;
                </p>
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-white/20" />
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
                  <span className="font-bold text-white">Julien Moreau</span>
                  <span className="mx-2 opacity-30">—</span>
                  <span className="opacity-60">Legacy Import, Belgium</span>
                </span>
                <div className="h-px w-8 bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WORK — real products in device mockups ============ */}
      <section id="work" className="px-page pt-section max-w-container mx-auto">
        <div className="reveal-up flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-line pb-6 mb-20">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] text-signal uppercase tracking-[0.3em] mb-4">
              Craftsmanship
            </p>
            <h2 className="text-title text-ink tracking-tighter" style={display}>
              Things I&apos;ve built.
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted mt-3">
              All live. Click through and use them.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {["REACT", "NEXT.JS", "TAILWIND", "TYPESCRIPT"].map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] px-4 py-2 bg-white/5 rounded-full border border-white/10 tracking-widest hover:border-white/20 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-32 md:space-y-40">
          {projects.map((p, i) => (
            <div
              key={p.slug}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              <div
                className={`lg:col-span-7 mock-stage ${i % 2 === 1 ? "lg:order-2 reveal-right" : "reveal-left"}`}
              >
                <Link
                  href={`/work/${p.slug}`}
                  aria-label={`${p.name} case study`}
                  className={`relative block ${p.mobileImage ? (i % 2 === 1 ? "pl-[6%]" : "pr-[6%]") : ""} pb-4`}
                >
                  <LaptopFrame
                    src={p.heroImage}
                    alt={`${p.name} interface`}
                    className={i % 2 === 1 ? "mock-tilt-r" : "mock-tilt"}
                    sizes="(max-width: 1024px) 100vw, 65vw"
                  />
                  {p.mobileImage && (
                    <PhoneFrame
                      src={p.mobileImage}
                      alt={`${p.name} mobile interface`}
                      sizes="(max-width: 640px) 35vw, (max-width: 1024px) 28vw, 16vw"
                      className={`absolute -bottom-2 w-[38%] sm:w-[30%] lg:w-[26%] z-10 ${
                        i % 2 === 1 ? "left-0" : "right-0"
                      }`}
                    />
                  )}
                </Link>
              </div>
              <div className={`lg:col-span-5 reveal-up ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <p className="font-mono text-[10px] text-signal uppercase tracking-[0.3em] mb-3">
                  {String(i + 1).padStart(2, "0")} — {p.status}
                </p>
                <h3 className="text-subtitle text-ink mb-4" style={display}>
                  {p.name}
                </h3>
                <p className="text-body text-muted mb-8 max-w-md">
                  {clientTaglines[p.slug] ?? p.tagline}
                </p>
                <div className="flex flex-wrap items-center gap-5">
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-label uppercase border border-signal text-signal px-6 py-3 rounded-full hover:bg-signal hover:text-on-signal transition-colors duration-300 font-bold tracking-widest"
                  >
                    Try it live
                    <ArrowUpRight className="size-4" />
                  </a>
                  <Link
                    href={`/work/${p.slug}`}
                    className="font-mono text-label uppercase text-muted hover:text-ink transition-colors duration-300 underline underline-offset-4 decoration-line-strong"
                  >
                    How it was built
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="px-page pt-section max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="reveal-scale lg:col-span-4 lg:col-start-1">
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-line-strong">
              <Image
                src="/about/achraf.jpg"
                alt="Achraf Es-Soussy"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 1024px) 60vw, 380px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas/40 to-transparent" />
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="reveal-fade font-mono text-[10px] text-signal uppercase tracking-[0.3em] mb-4">
              Who&apos;s building this
            </p>
            <h2 className="reveal-blur text-title text-ink mb-6" style={display}>
              One developer, start to finish.
            </h2>
            <div className="reveal-up space-y-5 text-body text-muted max-w-xl">
              <p>
                I&apos;m Achraf — a full-stack web developer based in Kenitra,
                Morocco. I work across the stack: React and Next.js on the
                front end, Node.js, Express, and MongoDB on the back end,
                shipping real, live products rather than tutorials or clones.
              </p>
              <p>
                That shows up in how I work: a landed-cost import calculator
                for a vehicle import business (Legacy Import), not a template
                checkout; a finance dashboard with a pre-launch security audit
                and currency math that&apos;s exact to the cent (Reckon);
                real-time systems that don&apos;t drop messages under load
                (Hustl). No account managers, no handoffs between three
                different people — whoever you talk to about your project is
                the person writing the code.
              </p>
              <p>
                I&apos;ve delivered work for more than 10 businesses — real
                estate agents, vehicle dealers, SaaS founders needing an MVP.
                The four case studies below are the ones with a live, public
                site to show.
              </p>
            </div>
            <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 max-w-xl">
              {[
                {
                  k: "10+",
                  v: "Projects delivered",
                  caption: "4 shown below — the rest are client-owned or under NDA",
                },
                { k: "95+", v: "Lighthouse on client builds" },
                { k: "0", v: "Agency layers between us" },
              ].map((s) => (
                <div key={s.v} className="reveal-fade">
                  <div className="text-subtitle text-ink" style={display}>
                    {s.k}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-faint mt-1">
                    {s.v}
                  </div>
                  {s.caption && (
                    <div className="font-mono text-[9px] uppercase tracking-wide text-faint/70 mt-1.5 leading-relaxed">
                      {s.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="process" className="px-page pt-section max-w-container mx-auto">
        <div className="reveal-up border-b border-line pb-6 mb-16">
          <p className="font-mono text-[10px] text-signal uppercase tracking-[0.3em] mb-4">
            How I Work
          </p>
          <h2 className="text-title text-ink" style={display}>
            Fixed price. Fixed timeline. No scope creep.
          </h2>
        </div>
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
          {steps.map((s) => (
            <div key={s.n} className="reveal-up">
              <span className="font-mono text-label text-signal-dim">{s.n}</span>
              <h3 className="text-subtitle text-ink mt-3 mb-3" style={display}>
                {s.title}
              </h3>
              <p className="text-body text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="px-page pt-section pb-10 max-w-container mx-auto">
        <div className="reveal-scale glass-card rounded-2xl px-8 py-16 md:px-16 md:py-24 text-center">
          <h2 className="text-title text-ink mb-6" style={display}>
            See if your project fits a fixed-price build.
          </h2>
          <p className="text-lede text-muted max-w-lg mx-auto mb-4">
            Describe the problem in plain words — no brief, no jargon
            required. I&apos;ll reply within a day with a straight answer on
            scope and cost, whether or not we end up working together.
          </p>
          <p className="font-mono text-label uppercase text-faint mb-10">
            Free scope call · no obligation · no sales pitch
          </p>
          <ContactActions />
          <p className="font-mono text-label uppercase text-muted mt-8">
            Prefer to talk?{" "}
            <a
              href="tel:+212706389418"
              className="text-ink hover:text-signal transition-colors underline underline-offset-4 decoration-line-strong"
            >
              +212 706 389 418
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
