import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111415",
          borderRadius: 14,
        }}
      >
        <svg viewBox="0 0 34 32" width="46" height="43" fill="none">
          <path
            d="M3.5 28.5 L12.5 3.5 L21.5 28.5"
            stroke="#E1E3E4"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.6 18.6 H17.4"
            stroke="#FF9F1C"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <rect x="25.5" y="21" width="6" height="7.5" rx="1" fill="#FF9F1C" />
        </svg>
      </div>
    ),
    size
  );
}
