import { ImageResponse } from "next/og";

/** apple-icon 은 SVG 를 지원하지 않아 PNG 로 생성한다 */
// 정적 내보내기에서는 빌드 때 한 번만 그린다고 알려 줘야 한다
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * 홈 화면에 담을 때 쓰는 아이콘.
 *
 * icon.svg 와 같은 그림이어야 한다. 한쪽만 고치면 브라우저 탭과
 * 홈 화면 아이콘이 서로 다른 그림이 된다.
 */
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
        <svg width="144" height="144" viewBox="0 0 100 100">
          <g
            fill="none"
            stroke="#fff"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M30.8 86.2 A 41 41 0 1 1 69.2 86.2" />
            <path d="M50 20 L50 26" />
            <path d="M27 34 L73 34" />
            <path d="M73 34 L73 62" />
            <path d="M38 57 A 12 12 0 0 1 62 57" />
            <path d="M28 72 C 35 68, 44 76, 51 72 S 64 68, 72 72" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
