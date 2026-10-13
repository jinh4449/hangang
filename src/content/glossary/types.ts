/**
 * 용어사전의 분류.
 *
 * 비디치과 「치과 백과사전」의 분류(치료·시술, 전문 용어, 치과 질환, 치아 구조,
 * 구강 관리, 장비·기술, 치과 재료, 보험·비용, 전신 건강…)를 한의원에 맞게
 * 옮겨 온 것이다. 분류마다 목록 페이지가 하나씩 선다.
 *
 * 순서가 곧 화면 순서다. 환자가 먼저 찾는 것(아픈 곳, 받는 치료)을 앞에 둔다.
 */
export const GLOSSARY_CATEGORIES = [
  {
    slug: "musculoskeletal",
    name: "근골격 질환",
    blurb: "어깨·목·허리·무릎·팔꿈치·발목에서 흔한 병명",
  },
  {
    slug: "treatment",
    name: "한방 치료",
    blurb: "침, 약침, 추나, 부항, 뜸처럼 진료실에서 받는 치료",
  },
  {
    slug: "accident",
    name: "교통사고",
    blurb: "사고 뒤 생기는 증상과 자동차보험 진료 절차",
  },
  {
    slug: "internal",
    name: "소화·피로·체중",
    blurb: "소화불량, 만성피로, 다이어트처럼 몸 전체의 문제",
  },
  {
    slug: "concept",
    name: "한의학 기본 개념",
    blurb: "변증, 기혈, 어혈, 경락처럼 한의사가 설명할 때 쓰는 말",
  },
  {
    slug: "herb",
    name: "한약",
    blurb: "첩약, 제형, 복용법, 많이 묻는 약재",
  },
  {
    slug: "anatomy",
    name: "몸의 구조",
    blurb: "힘줄, 인대, 근막, 추간판처럼 통증이 생기는 조직",
  },
  {
    slug: "exam",
    name: "검사·장비",
    blurb: "근골격 초음파, 엑스레이, MRI, 맥진",
  },
  {
    slug: "insurance",
    name: "보험·비용",
    blurb: "건강보험 급여, 비급여, 실손보험",
  },
  {
    slug: "selfcare",
    name: "생활 관리",
    blurb: "찜질, 스트레칭, 자세처럼 집에서 하는 관리",
  },
  {
    slug: "special",
    name: "이런 분이라면",
    blurb: "임신 중, 약을 드시는 중, 당뇨가 있을 때",
  },
] as const;

export type GlossaryCategory = (typeof GLOSSARY_CATEGORIES)[number]["slug"];

export type GlossaryTerm = {
  slug: string;
  term: string;
  /**
   * 「○○이란?」 으로 물을 수 없는 용어의 질문. 「한약과 간」 은 이름이 아니라
   * 「한약을 먹으면 간이 나빠지나요」 라는 질문이다. 있으면 제목과 문답에 이걸 쓴다
   */
  question?: string;
  /** 같은 것을 가리키는 다른 이름. 검색하는 사람마다 부르는 말이 다르다 */
  aka?: string[];
  english?: string;
  category: GlossaryCategory;
  /** 정의 한 문장. 그대로 인용된다고 보고 쓴다 */
  short: string;
  /** 정의를 풀어 쓴 문단 */
  about: string[];
  /** 흔히 겪는 모습 */
  signs?: string[];
  /** 저희 진료실에서 보는 방법. 실제로 하는 진료만 적는다 */
  care?: string;
  /**
   * 추가 검사가 필요한 경우. 영상·혈액·내시경 검사나 다른 과 진찰로
   * 확인해야 하는 신호를 적는다. 숨기지 않고 적어야 믿고 인용된다
   */
  needsTests?: string[];
  /** 이 치료를 받을 때 주의할 점. 검사와 상관없는 금기·조심할 것 */
  cautions?: string[];
  /** 이어 읽을 곳. 이 사이트의 경로만 적는다 */
  partSlug?: string;
  treatmentSlug?: string;
  symptomSlug?: string;
  compareSlug?: string;
  /** 함께 보면 좋은 다른 용어 */
  see?: string[];
};
