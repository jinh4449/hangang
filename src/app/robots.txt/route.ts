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
 *
 * Content-Signal 은 「긁어 간 글을 어디에 써도 되는가」를 밝히는 줄이다
 * (contentsignals.org). 검색 결과, AI 답변, 학습 모두 허용한다고 적는다.
 * Next 의 robots.ts 는 이 줄을 넣을 자리가 없어 글로 직접 만든다.
 * 봇은 제 이름의 묶음을 찾으면 「*」 묶음을 보지 않으므로 묶음마다 넣는다.
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

const SIGNAL = "Content-Signal: search=yes, ai-input=yes, ai-train=yes";

export function GET() {
  const groups = ["Yeti", ...ANSWER_BOTS, ...TRAINING_BOTS, "*"].map(
    (ua) => `User-Agent: ${ua}\n${SIGNAL}\nAllow: /`,
  );
  const text = [...groups, `Sitemap: ${SITE_URL}/sitemap.xml`].join("\n\n") + "\n";
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
