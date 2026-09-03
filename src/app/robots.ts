import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/clinic";

// 정적 내보내기에서는 빌드 때 한 번만 만든다고 알려 줘야 한다
export const dynamic = "force-static";

/**
 * 검색로봇이 들어오면 안 되는 곳.
 *
 * /manual 은 직원용 업무 매뉴얼이다. 진료비와 한약 가격표가 그대로 들어 있어
 * 검색 결과에 나오면 안 된다. 페이지 자체에도 noindex 를 박아 두었지만,
 * 여기서 막으면 아예 읽어 가지 않는다.
 *
 * 사이트 어디에서도 이 주소로 링크하지 않는다. 링크를 걸면 로봇이 주소를
 * 알게 되고, 그때는 막아 두어도 주소만 검색 결과에 뜰 수 있다.
 */
const PRIVATE = ["/manual/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 네이버 검색로봇. 「*」로 이미 허용되지만, 네이버 웹마스터도구의
      // 사이트 간단체크는 Yeti 를 이름으로 집어 허용한 줄을 찾는다.
      // 이 줄이 없으면 허용돼 있는데도 「수집 불가」로 잡힌다
      { userAgent: "Yeti", allow: "/", disallow: PRIVATE },
      { userAgent: "*", allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
