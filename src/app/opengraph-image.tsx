import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { CLINIC } from "@/content/clinic";

// 정적 내보내기에서는 빌드 때 한 번만 그린다고 알려 줘야 한다
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${CLINIC.name} — ${CLINIC.tagline}`;

/** 카카오톡·네이버·문자로 링크를 공유할 때 뜨는 미리보기. 사진 없이 타이포로 만든다. */
export default async function OgImage() {
  const dir = path.join(process.cwd(), "node_modules/pretendard/dist/public/static");
  const [bold, regular] = await Promise.all([
    readFile(path.join(dir, "Pretendard-Bold.otf")),
    readFile(path.join(dir, "Pretendard-Regular.otf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF9F5",
          padding: "72px 80px",
          fontFamily: "Pretendard",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 620,
            height: 620,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(30,91,69,0.14) 0%, rgba(30,91,69,0) 70%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "#E9F0EB",
              color: "#1E5B45",
              fontSize: 22,
              fontWeight: 400,
              padding: "10px 22px",
              borderRadius: 999,
              letterSpacing: 2,
            }}
          >
            {CLINIC.tagline}
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 72,
              fontWeight: 700,
              color: "#1A1C16",
              lineHeight: 1.24,
              letterSpacing: -2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>나아지고 있는지,</span>
            <span>눈으로 확인하면서</span>
            <span>치료합니다</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: "#1E5B45" }}>{CLINIC.name}</div>
            <div style={{ fontSize: 24, color: "#5F6963" }}>
              {`${CLINIC.transit} · ${CLINIC.phone}`}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {["평일 밤 8시까지", "공휴일 진료"].map((b) => (
              <div
                key={b}
                style={{
                  display: "flex",
                  border: "1px solid #B7D1C4",
                  background: "#FFFFFF",
                  color: "#1A1C16",
                  fontSize: 22,
                  padding: "10px 20px",
                  borderRadius: 999,
                }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: bold, weight: 700, style: "normal" },
        { name: "Pretendard", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
