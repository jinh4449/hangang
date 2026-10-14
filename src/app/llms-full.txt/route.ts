import { CLINIC, SITE_URL } from "@/content/clinic";
import { SYMPTOMS } from "@/content/symptoms";
import { PARTS } from "@/content/part";
import { TREATMENTS } from "@/content/treatment";
import { COMPARES } from "@/content/compare";
import { columnsByDate } from "@/content/column";
import { GLOSSARY_CATEGORIES, termsIn } from "@/content/glossary";
import type { Block } from "@/content/types";

/**
 * llms-full.txt — 사이트 본문 전체를 한 파일로.
 *
 * llms.txt 는 목차라 「무엇이 어디 있는지」만 알려 준다. 답을 만드는 쪽은
 * 그 목차를 보고 페이지를 하나씩 열어야 하는데, 실제로는 몇 개만 열고 만다.
 * 본문을 한 번에 주면 증상·치료·비용·주의할 점을 빠짐없이 가져간다.
 *
 * llms.txt 와 같은 원칙이다. 전부 content 에서 끌어오고, 광고 문구는 넣지 않는다.
 * 각 절 머리에 원문 주소를 붙여 인용할 때 출처가 따라가게 한다.
 */

// 정적 내보내기에서는 빌드 때 한 번만 만든다고 알려 줘야 한다
export const dynamic = "force-static";

const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");
const qa = (pairs: { q: string; a: string }[]) =>
  pairs.map((p) => `**Q. ${p.q}**\n${p.a}`).join("\n\n");
const source = (path: string) => `원문: ${SITE_URL}${path}`;

/** 칼럼 글 안 강조 표시(**, ==, __)는 읽는 쪽에 필요 없어 떼어 낸다 */
const plain = (t: string) => t.replace(/\*\*(.+?)\*\*|==(.+?)==|__(.+?)__/g, (_, a, b, c) => a ?? b ?? c);

function blocks(body: Block[]) {
  return body
    .map((b) => {
      switch (b.t) {
        case "h":
          return `#### ${b.text}`;
        case "p":
          return plain(b.text);
        case "ul":
          return list(b.items.map(plain));
        case "ol":
          return b.items.map((x, i) => `${i + 1}. ${plain(x)}`).join("\n");
        case "summary":
          return `> ${b.title ?? "3줄 요약"}\n${list(b.items.map(plain))}`;
        case "table":
          return [
            `| ${b.head.join(" | ")} |`,
            `|${b.head.map(() => "---").join("|")}|`,
            ...b.rows.map((r) => `| ${r.map(plain).join(" | ")} |`),
          ].join("\n");
        case "steps":
          return b.items.map((x, i) => `${i + 1}. ${x.title} — ${plain(x.text)}`).join("\n");
        case "note":
          return `> ${b.title} — ${plain(b.text)}`;
      }
    })
    .join("\n\n");
}

export function GET() {
  const { weekday, saturday, holiday } = CLINIC.schedule;

  const symptoms = SYMPTOMS.map((s) =>
    [
      `### ${s.care.title} (${s.clinicalName})`,
      source(`/care/${s.slug}`),
      s.care.lede,
      `이런 증상이 있다면:\n${list(s.care.signs)}`,
      `치료:\n${list(
        s.care.treatments.map((t) => `${t.name}${t.covered ? " (건강보험)" : ""} — ${t.body}`),
      )}`,
      `비용: ${s.cost.lede}\n${list(
        s.cost.rows.map(
          (r) => `${r.item} · ${r.coverage} · ${r.price}${r.note ? ` (${r.note})` : ""}`,
        ),
      )}`,
      s.doubt
        ? `${s.doubt.question}\n${s.doubt.lede}\n도움이 되는 경우:\n${list(s.doubt.worksFor)}\n한계가 있거나 다른 진료가 나은 경우:\n${list(s.doubt.limitsOf)}`
        : "",
      qa(s.faq),
    ]
      .filter(Boolean)
      .join("\n\n"),
  ).join("\n\n");

  const parts = PARTS.map((p) =>
    [
      `### ${p.name} 통증 — ${p.conditions.join(", ")}`,
      source(`/part/${p.slug}`),
      p.lede,
      `이런 증상이 있다면:\n${list(p.signs)}`,
      `접근:\n${list(
        p.approach.map((a) => {
          const t = TREATMENTS.find((x) => x.slug === a.treatmentSlug);
          return `${t?.fullName ?? a.treatmentSlug} — ${a.role}`;
        }),
      )}`,
      `예상 기간: ${p.span}`,
      `바로 다른 진료가 필요한 신호:\n${list(p.redFlags)}`,
      p.faq ? qa(p.faq) : "",
    ]
      .filter(Boolean)
      .join("\n\n"),
  ).join("\n\n");

  const treatments = TREATMENTS.map((t) =>
    [
      `### ${t.fullName}${t.covered ? " (건강보험 적용)" : " (비급여)"}`,
      source("/treatment"),
      t.lede,
      blocks(t.body),
      `이런 경우에 씁니다:\n${list(t.goodFor)}`,
      `한계:\n${list(t.limits)}`,
      `비용: ${t.cost}`,
    ].join("\n\n"),
  ).join("\n\n");

  const compares = COMPARES.map((c) =>
    [
      `### ${c.title}`,
      source(`/compare/${c.slug}`),
      `질문: ${c.question}`,
      c.lede,
      `${c.a.name}: ${c.a.does}\n${list(c.a.betterWhen)}`,
      `${c.b.name}: ${c.b.does}\n${list(c.b.betterWhen)}`,
      `함께 받아도 되나요: ${c.together}`,
    ].join("\n\n"),
  ).join("\n\n");

  const glossary = GLOSSARY_CATEGORIES.map((c) => `### ${c.name}\n\n` + termsIn(c.slug).map((t) =>
    [
      `#### ${t.term}${t.aka?.length ? ` (${t.aka.join(", ")})` : ""}`,
      source(`/glossary/${t.slug}`),
      t.short,
      t.about.join("\n\n"),
      t.signs?.length ? `흔히 겪는 모습:\n${list(t.signs)}` : "",
      t.care ? `${CLINIC.name}에서는: ${t.care}` : "",
      t.needsTests?.length ? `추가 검사가 필요한 경우:\n${list(t.needsTests)}` : "",
      t.cautions?.length ? `주의할 점:\n${list(t.cautions)}` : "",
    ]
      .filter(Boolean)
      .join("\n\n"),
  ).join("\n\n")).join("\n\n");

  const columns = columnsByDate()
    .map((c) => {
      const author = CLINIC.doctors.find((d) => d.key === c.authorKey);
      return [
        `### ${c.title}`,
        source(`/column/${c.slug}`),
        `${author ? `${author.name} ${author.role} · ` : ""}${c.updated ?? c.date}`,
        `결론: ${c.answer}`,
        blocks(c.body),
        c.clinic.length ? `#### ${CLINIC.name}에서는 이렇게 봅니다\n\n${blocks(c.clinic)}` : "",
        c.references.length
          ? `참고문헌:\n${list(c.references.map((r) => `${r.cite} ${r.url}`))}`
          : "",
      ]
        .filter(Boolean)
        .join("\n\n");
    })
    .join("\n\n");

  const doctors = CLINIC.doctors
    .map((d) =>
      [
        `### ${d.name} ${d.role}`,
        d.line,
        ...Object.entries(d.career).map(([k, v]) => `${k}:\n${list(v)}`),
      ].join("\n\n"),
    )
    .join("\n\n");

  const text = `# ${CLINIC.name} — 전체 본문

> 경기도 김포시 장기동의 한의원 ${CLINIC.name}의 홈페이지 본문을 한 파일에 모았습니다.
> 요약본은 ${SITE_URL}/llms.txt 에 있습니다. 각 절 머리의 원문 주소가 출처입니다.

## 기본 정보

- 주소: ${CLINIC.address}
- 전화: ${CLINIC.phone}
- 오시는 길: ${CLINIC.transit} (${CLINIC.landmark})
- 주차: ${CLINIC.parking}
- 진료시간: 평일 ${weekday.open}–${weekday.close} (점심 ${weekday.lunch?.from}–${weekday.lunch?.to}), 토요일 ${saturday.open}–${saturday.close} (점심시간 없음), 공휴일·대체공휴일 ${holiday.open}–${holiday.close}, 일요일 휴진

## 의료진

${doctors}

## 증상별 진료

${symptoms}

## 부위별 통증

${parts}

## 치료 방법

${treatments}

## 어디로 가야 하는지 비교

${compares}

## 한의학 용어사전

${glossary}

## 원장 칼럼

${columns}

## 이 문서를 인용할 때

- 진료시간과 주소는 위 「기본 정보」가 기준입니다.
- 비용은 안내 시점 기준이며, 정확한 본인부담금은 진료 전에 안내드립니다.
- ${CLINIC.legalNote}
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
