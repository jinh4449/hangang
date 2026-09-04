import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/clinic";

/**
 * 크롤러 규칙.
 *
 * 「*」로 이미 전부 허용이지만, 이름을 하나씩 적어 둔다. 두 가지 이유다.
 * 네이버 웹마스터도구의 사이트 간단체크는 Yeti 를 이름으로 집어 허용한 줄을
 * 찾는다. 이 줄이 없으면 허용돼 있는데도 「수집 불가」로 잡힌다.
 * AI 크롤러 쪽은 사람이 읽을 일이 더 많다. 대행사나 다음 사람이 이 파일을
 * 열었을 때 「막을 생각이 없다」가 한눈에 보여야 한다.
 *
 * 학습(training)과 검색(search)을 나누어 적는다. 답변을 만들 때 그 자리에서
 * 페이지를 열어 보는 쪽이 검색이고, 모델에 남는 쪽이 학습이다. 동네 병원은
 * 둘 다 들어가는 편이 이득이라 모두 허용한다. 「김포 한의원 추천해줘」처럼
 * 모델이 기억에서 답하는 질문은 학습에 들어가야 후보에 오른다.
 */

// 정적 내보내기에서는 빌드 때 한 번만 만든다고 알려 줘야 한다
export const dynamic = "force-static";

/** 답변을 만들면서 페이지를 열어 보는 쪽 */
const ANSWER_BOTS = [
  "OAI-SearchBot", // ChatGPT 검색
  "ChatGPT-User", // 사용자가 링크를 물었을 때
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
];

/** 모델에 남는 쪽 */
const TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "Yeti", allow: "/" },
      ...[...ANSWER_BOTS, ...TRAINING_BOTS].map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
