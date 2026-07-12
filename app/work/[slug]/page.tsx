import { notFound } from "next/navigation";
import Link from "next/link";
import BrowserFrame from "@/components/BrowserFrame";
import LaptopFrame from "@/components/LaptopFrame";
import PhoneFrame from "@/components/PhoneFrame";
import type { Metadata } from "next";
import { projects, getProject, getAdjacentProject } from "@/lib/projects";

const display = { fontFamily: 'var(--font-syne), "Syne", sans-serif' };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} case study`,
    description: project.tagline,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${project.name} — case study by Achraf Es-Soussy`,
      description: project.tagline,
      images: [{ url: project.heroImage, width: 1920, height: 1080 }],
    },
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getAdjacentProject(slug);

  return (
    <>
      {/* Hero */}
      <section className="px-page mb-section max-w-container mx-auto">
        <div className="reveal-stagger max-w-4xl mb-14">
          <div className="reveal-fade font-mono text-label uppercase text-signal mb-5">
            {project.number} — {project.status} · {project.ownership}
          </div>
          <h1
            className="reveal-blur text-display text-ink mb-6"
            style={{ ...display, fontWeight: 600 }}
          >
            {project.name}
          </h1>
          <p className="reveal-up text-lede text-muted max-w-2xl">{project.tagline}</p>
          <div className="reveal-up flex flex-wrap items-center gap-6 mt-8">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-label uppercase border border-signal text-signal px-5 py-2.5 rounded-full hover:bg-signal hover:text-canvas transition-colors duration-300"
            >
              Visit live site ↗
            </a>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border border-line text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="reveal-scale mock-stage max-w-4xl mx-auto">
          <div className={`relative pb-4 ${project.mobileImage ? "pr-[6%]" : ""}`}>
            <LaptopFrame
              src={project.heroImage}
              alt={`${project.name} interface`}
              priority
              sizes="(max-width: 768px) 100vw, 75vw"
              className="mock-tilt"
            />
            {project.mobileImage && (
              <PhoneFrame
                src={project.mobileImage}
                alt={`${project.name} mobile interface`}
                sizes="(max-width: 640px) 32vw, (max-width: 1024px) 26vw, 15vw"
                className="absolute -bottom-2 right-0 w-[34%] sm:w-[26%] md:w-[20%] z-10"
              />
            )}
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="px-page mb-section max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="reveal-left lg:col-span-5">
            <span className="font-mono text-label uppercase text-signal block mb-4">
              The outcome
            </span>
            <h2
              className="text-title text-ink"
              style={{ ...display, fontWeight: 600 }}
            >
              {project.outcomeHeadline}
            </h2>
          </div>
          <div className="reveal-up lg:col-start-7 lg:col-span-6 space-y-6">
            {project.outcomeBody.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "text-lede text-ink" : "text-body text-muted"}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-page mb-section max-w-container mx-auto">
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.features.map((f, i) => (
            <div
              key={f.title}
              className="reveal-scale border border-line rounded-xl bg-raised/50 p-8 hover:border-line-strong transition-colors duration-500"
            >
              <span className="font-mono text-label text-signal-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="text-subtitle text-ink mt-4 mb-3"
                style={{ ...display, fontWeight: 500 }}
              >
                {f.title}
              </h3>
              <p className="text-body text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interface deep dive */}
      <section className="px-page mb-section max-w-container mx-auto">
        <div className="reveal-up flex items-center justify-between mb-12 border-b border-line pb-5">
          <h2 className="font-mono text-label uppercase text-signal">
            Interface deep dive
          </h2>
          <span className="font-mono text-[11px] text-faint uppercase">
            {String(project.gallery.length).padStart(2, "0")} selected views
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
          {project.gallery.map((g, i) => (
            <div key={g.src} className={`mock-stage ${i % 2 === 0 ? "reveal-left" : "reveal-right"}`}>
              <BrowserFrame
                src={g.src}
                alt={g.label}
                url={project.liveUrl}
                sizes="(max-width: 768px) 100vw, 55vw"
                className={i % 2 === 0 ? "mock-tilt" : "mock-tilt-r"}
              />
              <p className="font-mono text-label uppercase text-muted mt-5">
                {g.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Next project */}
      <section className="px-page mb-10 max-w-container mx-auto">
        <Link
          href={`/work/${next.slug}`}
          className="reveal-scale group block border border-line rounded-2xl px-8 py-16 md:px-16 md:py-20 bg-raised/50 hover:border-signal transition-colors duration-500"
        >
          <div className="flex items-center justify-between gap-6">
            <div>
              <span className="font-mono text-label uppercase text-muted">
                Up next
              </span>
              <h2
                className="text-title text-ink mt-3 group-hover:text-signal-bright transition-colors duration-300"
                style={{ ...display, fontWeight: 600 }}
              >
                {next.name}
              </h2>
            </div>
            <span className="text-title text-signal group-hover:translate-x-3 transition-transform duration-500">
              →
            </span>
          </div>
        </Link>
      </section>
    </>
  );
}
