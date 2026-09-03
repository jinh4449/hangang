import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/clinic";

// 정적 내보내기에서는 빌드 때 한 번만 만든다고 알려 줘야 한다
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 네이버 검색로봇. 「*」로 이미 허용되지만, 네이버 웹마스터도구의
      // 사이트 간단체크는 Yeti 를 이름으로 집어 허용한 줄을 찾는다.
      // 이 줄이 없으면 허용돼 있는데도 「수집 불가」로 잡힌다
      { userAgent: "Yeti", allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
