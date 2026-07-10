import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.title;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111415",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg viewBox="0 0 34 32" width="52" height="49" fill="none">
            <path
              d="M3.5 28.5 L12.5 3.5 L21.5 28.5"
              stroke="#E1E3E4"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M7.6 18.6 H17.4" stroke="#FF9F1C" strokeWidth="3.4" strokeLinecap="round" />
            <rect x="25.5" y="21" width="6" height="7.5" rx="1" fill="#FF9F1C" />
          </svg>
          <span style={{ color: "#e1e3e4", fontSize: 34, fontWeight: 800 }}>Es-Soussy</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              color: "#e1e3e4",
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            From Idea to
          </div>
          <div
            style={{
              display: "flex",
              color: "#ff9f1c",
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              fontStyle: "italic",
            }}
          >
            Live Product.
          </div>
          <div style={{ display: "flex", color: "#b3ada6", fontSize: 30, marginTop: 12 }}>
            Achraf Es-Soussy — Full-Stack Web Developer
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#6b6f70", fontSize: 24 }}>
          <span>{site.url.replace("https://", "")}</span>
          <span style={{ color: "#45ddbc" }}>● Available for new projects</span>
        </div>
      </div>
    ),
    size
  );
}
