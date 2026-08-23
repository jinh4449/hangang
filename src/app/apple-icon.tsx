import { ImageResponse } from "next/og";

/** apple-icon 은 SVG 를 지원하지 않아 PNG 로 생성한다 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1E5B45",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 180 180">
          <path
            d="M90 34c-17 17-17 28 0 45s17 28 0 45s-17 28 0 45"
            fill="none"
            stroke="#E9F0EB"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="90" cy="56" r="9" fill="#8FD3B4" />
        </svg>
      </div>
    ),
    size,
  );
}
