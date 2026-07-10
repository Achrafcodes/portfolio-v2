import type { Metadata, Viewport } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealScript from "@/components/RevealScript";
import LoadingScreen from "@/components/LoadingScreen";
import { site } from "@/lib/site";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111415",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s — Achraf Es-Soussy",
  },
  description: site.description,
  keywords: [
    "web developer",
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "freelance web developer",
    "SaaS development",
    "Morocco",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Full-Stack Web Developer",
  email: `mailto:${site.email}`,
  url: site.url,
  sameAs: [site.github],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kenitra",
    addressCountry: "MA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* arm reveal animations before first paint; no-JS visitors see everything */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("reveals-on")`,
          }}
        />
      </head>
      <body
        className="antialiased overflow-x-hidden text-body"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110] focus:bg-signal focus:text-on-signal focus:px-4 focus:py-2 focus:rounded-md font-mono text-label uppercase"
        >
          Skip to content
        </a>
        <LoadingScreen />
        <Nav />
        <main id="main" className="relative z-10 pt-28 md:pt-36">{children}</main>
        <Footer />
        <RevealScript />
      </body>
    </html>
  );
}
