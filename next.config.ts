import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * 정적 HTML 로 내보낸다.
   *
   * 이 사이트는 서버가 할 일이 없다. 33개 페이지가 전부 빌드 때 만들어지고,
   * 데이터베이스도 API 도 환경변수도 쓰지 않는다. 그래서 만들어진 HTML 을
   * 그대로 올리면 된다. Netlify 나 Cloudflare Pages 처럼 파일만 받아 주는
   * 곳이면 어디서든 돌아간다.
   *
   * 빌드하면 out/ 안에 파일이 생긴다.
   */
  output: "export",

  /**
   * next/image 의 자동 최적화는 서버가 있어야 돈다. 정적 내보내기에서는
   * 켤 수 없으므로 원본을 그대로 내보낸다. 사진이 세 장뿐이고 모두
   * 미리 줄여 둔 것이라 이 편이 낫다.
   */
  images: { unoptimized: true },
};

export default nextConfig;
