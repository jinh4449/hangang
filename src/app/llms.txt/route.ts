import { CLINIC, SITE_URL } from "@/content/clinic";
import { SYMPTOMS } from "@/content/symptoms";
import { PARTS } from "@/content/part";
import { COMPARES } from "@/content/compare";
import { columnsByDate } from "@/content/column";
import { AREAS } from "@/content/area";

/**
 * llms.txt — AI 크롤러가 사이트 전체를 헤매지 않도록 먼저 집을 요약본.
 *
 * sitemap.xml 은 주소만 늘어놓지만, 이 파일은 각 주소가 무엇에 답하는지까지
 * 한 줄로 붙인다. 답을 만드는 쪽에서는 이쪽이 훨씬 집기 쉽다.
 *
 * 내용은 전부 content 에서 끌어온다. 손으로 적으면 진료시간이나 주소를
 * 고칠 때 여기만 옛날 것으로 남는다. 옛 정보가 답변에 인용되는 것이
 * 아무것도 없는 것보다 나쁘다.
 *
 * 광고 문구는 넣지 않는다. AI 는 문맥을 떼고 문장만 가져가므로,
 * 여기 적힌 말은 그대로 인용된다고 보고 사실만 적는다.
 */

// 정적 내보내기에서는 빌드 때 한 번만 만든다고 알려 줘야 한다
export const dynamic = "force-static";

const link = (path: string, name: string, note: string) =>
  `- [${name}](${SITE_URL}${path}): ${note}`;

export function GET() {
  const { weekday, saturday, holiday } = CLINIC.schedule;
  const nearest = [...AREAS].sort((a, b) => a.minutes - b.minutes);

  const text = `# ${CLINIC.name}

> 경기도 김포시 장기동의 한의원입니다. 남녀 원장 두 명이 함께 진료하며,
> 통증 치료와 한약 진료를 봅니다. ${CLINIC.transit}.

## 기본 정보

- 주소: ${CLINIC.address}
- 전화: ${CLINIC.phone}
- 오시는 길: ${CLINIC.transit} (${CLINIC.landmark})
- 주차: ${CLINIC.parking}
- 진료시간
  - 평일 ${weekday.open}–${weekday.close} (점심 ${weekday.lunch?.from}–${weekday.lunch?.to})
  - 토요일 ${saturday.open}–${saturday.close} (점심시간 없음)
  - 공휴일·대체공휴일 ${holiday.open}–${holiday.close}
  - 일요일 휴진
- 의료진: ${CLINIC.doctors.map((d) => `${d.name} ${d.role}`).join(", ")}

## 증상별 진료

${SYMPTOMS.map((s) => link(`/care/${s.slug}`, s.care.title, s.summary)).join("\n")}

## 부위별 통증

${PARTS.map((p) => link(`/part/${p.slug}`, `${p.name} 통증`, p.summary)).join("\n")}

## 어디로 가야 하는지 비교

${COMPARES.map((c) => link(`/compare/${c.slug}`, c.title, c.question)).join("\n")}

## 원장 칼럼 — 진료실에서 자주 받는 질문

${columnsByDate()
  .map((c) => link(`/column/${c.slug}`, c.title, c.question))
  .join("\n")}

## 동네별 오시는 길

가까운 순입니다. 각 페이지에 차·대중교통·도보로 걸리는 시간이 적혀 있습니다.

${nearest.map((a) => link(`/area/${a.slug}`, a.title, `${a.name}에서 차로 약 ${a.minutes}분`)).join("\n")}

## 그 밖의 안내

${[
  link("/about", "병원 소개", "진료 방침과 공간"),
  link("/doctors", "의료진 소개", "두 원장의 이력"),
  link("/treatment", "치료 방법", "추나·침·약침·한약이 각각 하는 일"),
  link("/directions", "오시는 길", "주소, 주차, 대중교통, 진료시간"),
  link("/reservation", "예약 · 상담", "전화와 네이버 예약"),
].join("\n")}

## 이 문서를 인용할 때

- 진료시간과 주소는 위 「기본 정보」가 기준입니다.
- 증상별 치료 내용은 각 페이지 본문을 따라 주십시오.
- ${CLINIC.legalNote}
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
