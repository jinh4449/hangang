import { CLINIC, SITE_URL } from "./clinic";

/**
 * 구조화 데이터 빌더.
 * FAQPage 는 페이지에 실제로 보이는 내용만 넣는다. 화면에 없는 문답을 스키마에만 넣으면
 * 구글 정책 위반이라 리치 결과에서 제외된다.
 */

const CLINIC_REF = { "@id": `${SITE_URL}/#clinic` };
const SITE_REF = { "@id": `${SITE_URL}/#website` };

/**
 * 사이트 자체를 가리키는 엔티티. 레이아웃에 한 번만 둔다.
 *
 * 병원(MedicalClinic)과 사이트(WebSite)는 다른 것이다. 병원만 적어 두면
 * 검색엔진이 「이 글들을 누가 어디에 내놓았는가」를 병원 주소로만 짐작한다.
 * 사이트를 따로 세우고 발행 주체를 병원으로 걸어 두면 그 관계가 분명해진다.
 */
export const webSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: CLINIC.name,
  inLanguage: "ko",
  publisher: CLINIC_REF,
};

/** 화면 하나를 가리키는 엔티티. 어느 페이지에나 하나씩 있어야 한다 */
export function webPage({
  name,
  description,
  path,
  hasBreadcrumb = true,
}: {
  name: string;
  description: string;
  path: string;
  /** 첫 화면처럼 위가 없는 곳은 이동경로를 걸지 않는다 */
  hasBreadcrumb?: boolean;
}) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "ko",
    isPartOf: SITE_REF,
    about: CLINIC_REF,
    ...(hasBreadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

/**
 * 이동경로. 페이지가 사이트의 어디쯤인지 알린다.
 *
 * @param path 이 이동경로가 붙는 페이지 주소. @id 를 만들 때 쓴다.
 *             넘기지 않으면 마지막 칸의 주소를 쓴다.
 */
export function breadcrumb(trail: { name: string; path: string }[], path?: string) {
  const here = path ?? trail[trail.length - 1]?.path ?? "/";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${here}#breadcrumb`,
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
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    inLanguage: "ko",
    isPartOf: SITE_REF,
    breadcrumb: { "@id": `${url}#breadcrumb` },
    ...(condition ? { about: { "@type": "MedicalCondition", name: condition } } : {}),
    audience: { "@type": "MedicalAudience", audienceType: "환자" },
    publisher: CLINIC_REF,
    provider: CLINIC_REF,
  };
}

export function faqPage(pairs: { q: string; a: string }[], path = "/") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    isPartOf: SITE_REF,
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
    "@id": `${SITE_URL}${path}#cost`,
    name,
    url: `${SITE_URL}${path}`,
    inLanguage: "ko",
    isPartOf: SITE_REF,
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
