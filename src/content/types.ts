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
