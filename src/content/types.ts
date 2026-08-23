/** 증상 하나가 5개 검색 의도 페이지로 펼쳐진다. 이 타입이 그 계약이다. */

export type Faq = { q: string; a: string };

export type CostRow = {
  item: string;
  /** 급여 = 건강보험 적용, 비급여 = 환자 전액 부담 */
  coverage: "급여" | "비급여" | "자동차보험";
  /** 예시 금액. 실제 수가로 교체 필요 */
  price: string;
  note?: string;
};

export type Stage = {
  label: string;
  detail: string;
  /** 예상 소요. 후기를 쓸 수 없는 대신 이것으로 신뢰를 만든다 */
  span?: string;
};

export type Symptom = {
  slug: string;
  /** 환자가 쓰는 말 */
  name: string;
  /** 의학 용어 */
  clinicalName: string;
  /** 목록·카드에 쓰는 한 줄 */
  summary: string;

  care: {
    title: string;
    lede: string;
    /** "이런 증상이 있다면" — 자기 확인용 */
    signs: string[];
    causes: { title: string; body: string }[];
    treatments: { name: string; body: string; covered: boolean }[];
    stages: Stage[];
    /** 지체하면 위험한 신호. 환자를 다른 과로 보내야 하는 경우 */
    redFlags: { title: string; body: string; signs: string[] };
    /** 공통 틀에 없는 증상별 추가 섹션. 교통사고의 보험 접수 절차 같은 것 */
    extraSections?: {
      title: string;
      note?: string;
      items: { title: string; body: string }[];
    }[];
  };

  cost: {
    lede: string;
    rows: CostRow[];
    insurance: { title: string; body: string }[];
  };

  faq: Faq[];

  /** "효과 있나요" 검색에 정직하게 답하는 페이지 */
  doubt: {
    question: string;
    lede: string;
    /** 도움이 되는 경우 */
    worksFor: string[];
    /** 한계가 있거나 다른 과가 나은 경우 */
    limitsOf: string[];
    grounds: { title: string; body: string }[];
    sideEffects: string[];
  };

  /** 이 증상과 연결된 비교 페이지 slug */
  compareSlugs: string[];
};

export type Compare = {
  slug: string;
  title: string;
  /** 검색어 그대로 */
  question: string;
  lede: string;
  a: ComparePane;
  b: ComparePane;
  /** 함께 하는 경우 */
  together: string;
  /** 관련 증상 slug */
  symptomSlugs: string[];
};

export type ComparePane = {
  name: string;
  /** 이쪽이 나은 상황 */
  betterWhen: string[];
  /** 이쪽이 하는 일 */
  does: string;
};

/** 5개 의도 페이지의 정의. 내부 링크와 라우팅이 모두 여기서 나온다 */
export const INTENTS = [
  { key: "care", label: "증상·치료", base: "/care", blurb: "무엇이고 어떻게 치료하나" },
  { key: "cost", label: "비용·보험", base: "/cost", blurb: "얼마가 드나" },
  { key: "faq", label: "자주 묻는 질문", base: "/faq", blurb: "궁금한 것들" },
  { key: "doubt", label: "효과 있나요", base: "/doubt", blurb: "솔직한 답변" },
] as const;

export type IntentKey = (typeof INTENTS)[number]["key"];

/**
 * 지역 페이지. 지역명만 바꾼 복사본은 구글이 doorway page 로 보고 불이익을 준다.
 * 그래서 access 와 local 은 페이지마다 반드시 달라야 한다. 채울 내용이 없으면 페이지를 만들지 않는다.
 */
export type Area = {
  slug: string;
  /** 검색어 그대로 */
  title: string;
  name: string;
  lede: string;
  /** 이 지역에서 오는 실제 경로. 페이지마다 다르다 */
  access: { label: string; detail: string }[];
  /** 이 페이지에만 있는 문단 */
  local: { title: string; body: string }[];
  /** 이 지역에서 특히 많이 찾는 진료과목 */
  focusSlugs: string[];
};
