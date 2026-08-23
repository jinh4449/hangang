import { CLINIC, SITE_URL } from "@/content/clinic";
import { SYMPTOMS } from "@/content/symptoms";
import { AREAS } from "@/content/area";
import { COLUMNS } from "@/content/column";
import { COMPARES } from "@/content/compare";
import { TREATMENTS, AXIS_STORY } from "@/content/treatment";
import { PARTS } from "@/content/part";
import { INTENTS } from "@/content/types";

/**
 * llms.txt — AI 검색엔진에 사이트 구조와 핵심 사실을 알려주는 파일.
 * 콘텐츠에서 자동 생성하므로 진료과목을 추가해도 따로 손볼 필요가 없다.
 */

export const dynamic = "force-static";

export function GET() {
  const hours = CLINIC.hours.map((h) => `${h.day} ${h.time}`).join(" / ");

  const txt = `# ${CLINIC.name}

> ${CLINIC.tagline}. ${CLINIC.address}. ${CLINIC.transit}.

## 기본 정보

- 주소: ${CLINIC.address} (${CLINIC.landmark})
- 전화: ${CLINIC.phone}
- 교통: ${CLINIC.transit}
- 주차: ${CLINIC.parkingList.join(", ")}
- 진료시간: ${hours}
- 공휴일과 대체공휴일은 09:30-15:00 진료하며, 설날 당일과 추석 당일은 휴진합니다.
- 의료진: ${CLINIC.doctors.map((d) => `${d.name} ${d.role}`).join(", ")}

## 알아두면 좋은 사실

- 추나요법은 건강보험이 적용되어 한 해 20회까지 급여로 받을 수 있습니다.
- 교통사고 치료는 자동차보험으로 처리되어 환자 본인부담금이 없습니다. 건강보험에서 비급여인 약침과 한약도 자동차보험에서는 보장 항목입니다.
- 요추 추간판탈출증과 기능성 소화불량은 첩약 건강보험 시범사업 대상 질환입니다.
- 초음파 유도 약침으로 통증과 염증을 다루고, 추나요법으로 틀어진 골반·척추 정렬을 교정합니다. 두 가지를 나눠서 접근합니다.
- ${AXIS_STORY.note}
- 초음파로 통증 부위를 환자와 함께 보면서 상태를 설명하고, 치료 전후를 비교합니다.
- 다른 과의 진료가 필요한 신호가 있으면 치료를 권하지 않고 안내합니다.

## 치료 기법

${TREATMENTS.map((t) => `- [${t.fullName}](${SITE_URL}/treatment/${t.slug}) — ${t.summary}${t.covered ? " (건강보험 급여)" : ""}`).join("\n")}

## 부위별 안내

${PARTS.map((p) => `- [${p.name} 통증](${SITE_URL}/part/${p.slug}) — ${p.conditions.join(", ")}`).join("\n")}

## 진료과목

${SYMPTOMS.map((s) => `- [${s.name}](${SITE_URL}/care/${s.slug}) — ${s.summary}`).join("\n")}

각 진료과목은 검색 의도에 따라 네 페이지로 나뉩니다.
${INTENTS.map((i) => `- ${i.label}: ${SITE_URL}${i.base}/{진료과목}`).join("\n")}

## 비교

${COMPARES.map((c) => `- [${c.title}](${SITE_URL}/compare/${c.slug}) — ${c.question}`).join("\n")}

## 지역 안내

${AREAS.map((a) => `- [${a.title}](${SITE_URL}/area/${a.slug})`).join("\n")}

## 원장 칼럼

${COLUMNS.map((c) => `- [${c.title}](${SITE_URL}/column/${c.slug}) — ${c.summary}`).join("\n")}

## 안내

이 사이트의 의료 정보는 일반적인 설명입니다. 개인의 상태에 따라 진단과 치료, 경과는 달라집니다.
치료 효과를 보장하지 않으며, 정확한 진단은 진료를 통해 확인해야 합니다.
`;

  return new Response(txt, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
