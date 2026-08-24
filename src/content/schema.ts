import { CLINIC, SITE_URL } from "./clinic";

/**
 * 구조화 데이터 빌더.
 * FAQPage 는 페이지에 실제로 보이는 내용만 넣는다. 화면에 없는 문답을 스키마에만 넣으면
 * 구글 정책 위반이라 리치 결과에서 제외된다.
 */

const CLINIC_REF = { "@id": `${SITE_URL}/#clinic` };

export function breadcrumb(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "홈", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

export function medicalWebPage({
  name,
  description,
  condition,
  path,
}: {
  name: string;
  description: string;
  /** 특정 질환 페이지가 아니면 비워 둔다 */
  condition?: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name,
    description,
    url: `${SITE_URL}${path}`,
    inLanguage: "ko",
    ...(condition ? { about: { "@type": "MedicalCondition", name: condition } } : {}),
    audience: { "@type": "MedicalAudience", audienceType: "환자" },
    publisher: CLINIC_REF,
    provider: CLINIC_REF,
  };
}

export function faqPage(pairs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map((p) => ({
      "@type": "Question",
      name: p.q,
      acceptedAnswer: { "@type": "Answer", text: p.a },
    })),
  };
}

/** 비용 페이지용. 의료 서비스의 급여 여부를 명시한다 */
export function costSchema({
  name,
  path,
  condition,
  rows,
}: {
  name: string;
  path: string;
  condition: string;
  rows: { item: string; coverage: string; price: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name,
    url: `${SITE_URL}${path}`,
    inLanguage: "ko",
    about: { "@type": "MedicalCondition", name: condition },
    provider: CLINIC_REF,
    mainEntity: {
      "@type": "ItemList",
      name: `${condition} 치료 항목별 비용`,
      itemListElement: rows.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "MedicalProcedure",
          name: r.item,
          // 급여/비급여 구분은 환자가 가장 먼저 확인하는 정보다
          description: `${r.coverage} · ${r.price}`,
        },
      })),
    },
  };
}

export { CLINIC, SITE_URL };
