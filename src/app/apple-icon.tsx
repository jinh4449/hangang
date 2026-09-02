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
 * 홈 화면 아이콘이 서로 다른 그림이 된다. 경로는 로고 원본(.ai)에서
 * 뽑은 것이라 손으로 고치지 않는다.
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
        <svg width="137" height="137" viewBox="0 0 100 100">
          <path fill="#fff" fillRule="evenodd" d="M50.0 8.81C22.43 8.81 0.0 31.24 0.0 58.81C0.0 68.5 2.78 77.55 7.57 85.22L15.17 85.22C9.58 77.87 6.22 68.74 6.22 58.81C6.22 34.67 25.86 15.03 50.0 15.03C74.14 15.03 93.78 34.67 93.78 58.81C93.78 68.74 90.42 77.87 84.83 85.22L92.43 85.22C97.22 77.55 100.0 68.5 100.0 58.81C100.0 31.24 77.57 8.81 50.0 8.81Z" />
          <path fill="#fff" fillRule="evenodd" d="M46.69 27.42L46.69 32.98L28.45 32.98L28.45 39.6L71.55 39.6L71.55 32.98L53.31 32.98L53.31 27.42L46.69 27.42Z" />
          <path fill="#fff" fillRule="evenodd" d="M31.92 56.58L38.78 56.58C40.38 51.92 44.8 48.55 50.0 48.55C55.2 48.55 59.62 51.92 61.22 56.58L68.08 56.58C66.31 48.22 58.88 41.93 50.0 41.93C41.12 41.93 33.69 48.22 31.92 56.58Z" />
          <path fill="#fff" fillRule="evenodd" d="M28.45 67.25L64.93 67.25L64.93 76.51L71.55 76.51L71.55 60.63L28.45 60.63L28.45 67.25Z" />
          <path fill="#fff" fillRule="evenodd" d="M28.45 79.12L28.45 85.22L28.45 85.88C28.8 85.64 29.16 85.43 29.52 85.22C35.69 81.64 41.87 83.18 48.04 85.22C55.88 87.81 63.71 91.19 71.55 85.88L71.55 85.22L71.55 79.12C57.18 88.85 42.82 69.38 28.45 79.12Z" />
        </svg>
      </div>
    ),
    size,
  );
}
