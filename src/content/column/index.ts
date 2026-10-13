import type { Column } from "../types";
import { QUESTION_COLUMNS } from "./questions";

/**
 * 새 칼럼은 파일 하나를 추가하고 COLUMNS 에 넣으면 목록·사이트맵·RSS 에 자동 반영된다.
 *
 * 칼럼의 틀: 제목 → 결론 먼저(answer) → 본문(body) → 김포한강한의원에서는
 * 이렇게 봅니다(clinic) → 참고문헌(references).
 *
 * 말투: 칼럼을 읽고 「가서 물어보면 되겠다」 싶어야 한다. 위험 신호를 앞에
 * 늘어놓거나 「즉시」「지체 없이」 같은 말로 겁주지 않는다. 검사가 필요한
 * 경우는 황토색 check 상자 하나에 두세 줄로, 차분하게 끝에 둔다.
 */

// 글쓴이: 통증·초음파·교통사고는 이진희(lee), 한약·소화·피로·소아·다이어트는 왕소정(wang)
const nextDayPain: Column = {
  slug: "sore-after-treatment",
  authorKey: "lee",
  title: "치료 다음 날 더 아픈 건 잘못된 걸까요",
  question: "추나 받고 다음날 더 아파요",
  summary: "치료 다음 날의 뻐근함은 흔하고 자연스러운 반응입니다. 대개 하루 이틀이면 풀립니다.",
  date: "2026-08-11",
  symptomSlugs: ["pain", "car-accident"],
  image: {
    src: "/column-sore-after.svg",
    w: 800,
    h: 500,
    alt: "치료 다음 날 잠깐 올라갔다가 며칠에 걸쳐 내려가는 통증 곡선",
  },
  answer:
    "잘못된 것이 아닙니다. 굳어 있던 관절과 근육이 움직이기 시작하면서 생기는 흔한 반응이고, 대개 하루 이틀 안에 풀립니다. 다음 진료 때 어땠는지 말씀해 주시면 강도를 맞춰 드립니다.",
  body: [
    { t: "p", text:
      "진료실에서 자주 듣는 말입니다. 치료를 받고 다음 날 뻐근하거나 묵직하면 " +
      "혹시 잘못된 건 아닐까 걱정되실 수 있습니다. 미리 알고 계시면 마음이 편하실 것 같아 정리했습니다." },
    { t: "h", text: "왜 다음 날 뻐근한가" },
    { t: "p", text:
      "추나요법은 굳어 있던 관절과 근육을 움직이는 치료입니다. 오랫동안 한 자세로 " +
      "고정되어 있던 부위가 다시 움직이면, 주변 근육이 평소 쓰지 않던 방식으로 일하게 됩니다. " +
      "오랜만에 운동한 다음 날 근육이 뻐근한 것과 비슷합니다." },
    { t: "p", text:
      "침이나 약침 후에도 자극을 받은 부위가 하루 이틀 뻐근할 수 있습니다. " +
      "대개 24~48시간 안에 가라앉고, 회차를 거듭할수록 이런 느낌은 줄어듭니다." },
    { t: "h", text: "연구에서도 흔한 반응입니다" },
    { t: "p", text:
      "벨기에 연구팀이 척추 도수치료(추나처럼 손으로 관절을 움직이는 치료)를 처음 받은 465명을 조사했더니, " +
      "열 명 중 여섯 명 정도가 치료 뒤 뻐근함이나 가벼운 두통 같은 반응을 겪었습니다. " +
      "대부분 치료 후 몇 시간 안에 시작해 하루 안에 사라졌습니다. 많은 분이 겪고, 금방 지나가는 반응이라는 뜻입니다." },
    { t: "h", text: "다음 날 이렇게 해 보세요" },
    { t: "ul", items: [
      "따뜻하게 찜질해 주세요. 근육이 풀리는 데 도움이 됩니다.",
      "누워만 계시기보다 가볍게 걸어 주세요. 몸이 움직여야 뻐근함이 빨리 풀립니다.",
      "치료 부위를 세게 주무르거나 무리하게 늘리지는 마세요.",
    ]},
    { t: "note", tone: "check", title: "이럴 때는 연락 주세요", text:
      "뻐근함이 사흘 넘게 이어지거나 오히려 점점 심해질 때, 팔다리에 저림이 새로 생겼을 때는 " +
      "다음 예약을 기다리지 마시고 전화 주세요. 상태를 보고 필요하면 검사를 함께 권해 드립니다." },
  ],
  clinic: [
    { t: "p", text:
      "다음 진료 때 전날 어땠는지부터 여쭙니다. 뻐근함이 얼마나 갔는지, 어디가 불편했는지에 따라 " +
      "치료의 강도와 부위를 조정합니다." },
    { t: "p", text:
      "치료 강도는 사람마다 맞춰야 합니다. 뻐근함이 부담스러우셨다면 편하게 말씀해 주세요. " +
      "참고 받으시는 것보다 조절하는 편이 결과가 좋습니다." },
  ],
  references: [
    {
      cite: "Cagnie B, Vinck E, Beernaert A, Cambier D. How common are side effects of spinal manipulation and can these side effects be predicted? Manual Therapy. 2004;9(3):151–156.",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=How+common+are+side+effects+of+spinal+manipulation+and+can+these+side+effects+be+predicted",
    },
  ],
};

const howManySessions: Column = {
  slug: "how-many-sessions",
  authorKey: "lee",
  title: "추나요법, 몇 번이나 받아야 하나요",
  question: "추나 몇 번 받아야 하나요",
  summary: "통증을 줄이는 데는 대체로 5회, 체형을 교정하는 데는 10회 이상이 걸립니다. 증상에 따라 달라집니다.",
  date: "2026-08-15",
  /* 2026-09-04 에 치료 횟수와 건강보험 절을 고쳤다. 글을 실제로 고쳤을 때만
     올린다 — 배포할 때마다 오늘로 바꾸면 값이 거짓이 되고, 그런 날짜는
     검색엔진이 신호로 쓰지 않는다 */
  updated: "2026-09-04",
  symptomSlugs: ["pain"],
  image: {
    src: "/column-sessions.svg",
    w: 800,
    h: 500,
    alt: "치료 회차가 지날수록 낮아지는 통증을 막대로 그린 그림",
  },
  answer:
    "통증을 줄이는 데는 대체로 5회 안팎, 정렬과 자세까지 다루려면 10회 이상을 봅니다. 상태에 따라 달라지므로 첫 진료에서 예상 횟수를 먼저 말씀드리고, 좋아지는 정도를 보며 함께 조정합니다.",
  body: [
    { t: "p", text:
      "가장 자주 받는 질문입니다. 상태에 따라 달라서 숫자를 못박기는 어렵지만, " +
      "대략적인 그림이라도 먼저 알고 시작하시는 편이 마음이 편하실 겁니다." },
    { t: "h", text: "대체로 이런 흐름입니다" },
    { t: "ul", items: [
      "통증이 심한 시기 — 주 2~3회, 2~3주. 통증을 줄이는 데 집중합니다.",
      "회복하는 시기 — 주 1~2회, 4~6주. 정렬을 잡고 움직임을 넓힙니다.",
      "관리하는 시기 — 월 1~2회. 자세와 생활 습관을 함께 봅니다.",
    ]},
    { t: "p", text:
      "아프기 시작한 지 얼마 안 됐다면 짧게 끝나는 경우가 많습니다. " +
      "몇 년째 반복된 통증이라면 관리하는 기간을 조금 더 길게 잡습니다." },
    { t: "h", text: "횟수와 효과를 비교한 연구" },
    { t: "p", text:
      "만성 요통이 있는 400명을 6주 동안 도수치료 횟수별로 나눠 비교한 미국 연구에서는, " +
      "12회 받은 그룹이 12주 뒤 통증과 일상생활 불편이 가장 많이 줄었습니다. " +
      "횟수를 무작정 늘린다고 효과가 계속 커지지는 않았습니다. " +
      "많이 받는 것보다 상태에 맞는 계획이 중요하다는 뜻으로 읽습니다." },
    { t: "h", text: "추나요법은 건강보험이 적용됩니다" },
    { t: "p", text: "한 해 20회까지 급여로 받으실 수 있어 비용 부담이 크지 않습니다." },
  ],
  clinic: [
    { t: "p", text:
      "첫 진료에서 지금 어느 시기인지 살피고 예상 횟수를 먼저 말씀드립니다. " +
      "끝이 보여야 치료를 편하게 이어가실 수 있으니까요." },
    { t: "note", tone: "info", title: "좋아지는 걸 눈으로 확인합니다", text:
      "통증은 스스로 판단하기 어렵습니다. 초음파로 치료 전후를 함께 보면서 " +
      "지금 어디까지 왔는지 확인하실 수 있게 합니다." },
  ],
  references: [
    {
      cite: "Haas M, Vavrek D, Peterson D, Polissar N, Neradilek MB. Dose-response and efficacy of spinal manipulation for care of chronic low back pain: a randomized controlled trial. The Spine Journal. 2014;14(7):1106–1116.",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=Dose-response+and+efficacy+of+spinal+manipulation+for+care+of+chronic+low+back+pain",
    },
  ],
};

const herbLiver: Column = {
  slug: "herbal-medicine-liver",
  authorKey: "wang",
  title: "한약 먹으면 간이 나빠진다던데요",
  question: "한약 간 손상",
  summary: "걱정되지만 묻기 어려우셨던 분들을 위해 정리했습니다. 진찰 후 처방한 한약은 안심하고 드셔도 됩니다.",
  date: "2026-08-19",
  symptomSlugs: ["pain", "indigestion", "fatigue"],
  image: {
    src: "/column-herb-liver.svg",
    w: 800,
    h: 500,
    alt: "한약 파우치와 간을 함께 살피는 그림",
  },
  answer:
    "한의사가 진찰하고 처방한 한약으로 간에 문제가 생기는 경우는 드뭅니다. 한방병원 입원 환자 6,894명을 분석한 국내 연구에서도 간 기능이 정상이던 분들에게 간 손상이 생긴 경우는 적었습니다. 드시는 약과 건강 상태를 확인하고 처방하니 안심하고 상담받으셔도 됩니다.",
  body: [
    { t: "p", text:
      "한약을 권해 드리면 간 걱정 때문에 망설이시는 분들이 계십니다. " +
      "직접 여쭤보시기는 어려우실 것 같아 먼저 정리해 두려고 합니다." },
    { t: "h", text: "무엇이 사실인가" },
    { t: "p", text:
      "몸에 들어가는 대부분의 약은 간에서 대사됩니다. 진통제, 감기약, 영양제도 마찬가지입니다. " +
      "그래서 중요한 것은 「한약이냐 아니냐」보다 " +
      "「누가 진찰하고 처방했는지, 어떤 약재인지, 무엇과 함께 드시는지」입니다." },
    { t: "h", text: "국내 대규모 연구에서는" },
    { t: "p", text:
      "자생한방병원 연구팀이 2005년부터 2013년까지 7개 한방병원에 근골격계 질환으로 입원해 한약을 복용한 " +
      "환자 6,894명의 입원·퇴원 때 간 기능 검사를 분석했습니다. 입원 때 간 기능이 정상이던 분들에게서 " +
      "간 손상이 생긴 경우는 드물었고, 입원 때 이미 간 수치가 높았던 354명은 퇴원할 때 129명으로 줄었습니다. " +
      "연구진은 한약이 대부분의 환자에서 기존의 간 손상을 악화시키지 않았다고 정리했습니다." },
    { t: "note", tone: "check", title: "직접 구해 드시는 약재는 권하지 않습니다", text:
      "시장이나 인터넷에서 산 약재를 임의로 달여 드시거나, 지인이 좋다고 준 약을 그대로 드시는 것은 " +
      "용량과 배합을 확인하지 않은 상태라 권하지 않습니다. 궁금한 약이 있으면 가져오셔서 물어봐 주세요." },
  ],
  clinic: [
    { t: "ul", items: [
      "드시는 약을 모두 확인하고 처방합니다. 약 봉투나 처방전을 가져오시면 정확합니다.",
      "간 질환을 앓으신 적이 있다면 말씀해 주세요. 그에 맞게 처방을 달리합니다.",
      "최근 혈액검사 결과가 있으면 함께 봅니다.",
      "규격품 약재만 사용합니다.",
    ]},
    { t: "p", text:
      "복용 중에 평소와 다르게 많이 피곤하거나, 속이 계속 불편하거나, 소변 색이 진해지는 등 " +
      "신경 쓰이는 변화가 있으면 편하게 연락 주세요. 함께 살펴보고 필요하면 처방을 조정하거나 검사를 권해 드립니다." },
  ],
  references: [
    {
      cite: "Lee J, Shin JS, Kim MR, et al. Liver enzyme abnormalities in taking traditional herbal medicine in Korea: a retrospective large sample cohort study of musculoskeletal disorder patients. Journal of Ethnopharmacology. 2015;169:407–412.",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=Liver+enzyme+abnormalities+in+taking+traditional+herbal+medicine+in+Korea",
    },
  ],
};

const ultrasoundWhat: Column = {
  slug: "what-ultrasound-shows",
  authorKey: "lee",
  title: "한의원에서 초음파로 무엇을 보나요",
  question: "한의원 초음파",
  summary: "X-ray에 안 나오는데 계속 아픈 이유를 화면으로 함께 보며 설명드립니다.",
  date: "2026-08-22",
  symptomSlugs: ["pain", "car-accident"],
  image: {
    src: "/column-ultrasound.svg",
    w: 800,
    h: 500,
    alt: "초음파 탐촉자와 화면에 보이는 근육·힘줄 층",
  },
  answer:
    "한의원 초음파로는 근육·힘줄·인대처럼 엑스레이에 잘 보이지 않는 부드러운 조직이 부어 있는지, 움직일 때 어디서 걸리는지를 실시간으로 봅니다. 아픈 이유를 화면으로 함께 보면서 설명드릴 수 있습니다.",
  body: [
    { t: "p", text:
      "「검사에서는 이상이 없다는데 계속 아프다」는 말씀을 자주 듣습니다. " +
      "이상한 일이 아닙니다. 검사마다 보는 것이 다르기 때문입니다." },
    { t: "h", text: "X-ray는 뼈를 봅니다" },
    { t: "p", text:
      "X-ray로는 골절이나 뼈의 배열을 확인합니다. 반대로 근육, 힘줄, 인대처럼 " +
      "물렁한 조직은 거의 보이지 않습니다. 그런데 일상에서 겪는 통증의 상당수는 바로 이 조직에서 옵니다." },
    { t: "p", text:
      "교통사고 후에 목과 허리가 아픈데 검사상 이상이 없다는 경우가 대표적입니다. " +
      "다친 곳이 뼈가 아니라 근육과 인대라서 그렇습니다." },
    { t: "h", text: "초음파로 보는 것" },
    { t: "ul", items: [
      "근육과 힘줄의 상태 — 부어 있는지, 두꺼워졌는지",
      "염증으로 물이 찬 부위",
      "움직일 때 힘줄이 어떻게 미끄러지는지 (실시간으로 봅니다)",
      "치료 전후에 달라진 부분",
    ]},
    { t: "h", text: "국제 진료지침에서도" },
    { t: "p", text:
      "유럽 근골격 영상의학회(ESSR)는 어깨·팔꿈치·손목·엉덩이·무릎·발목의 힘줄과 인대, " +
      "관절에 찬 물을 살피는 데 초음파를 쓰도록 부위별 지침을 정리해 두었습니다(2017년 갱신). " +
      "초음파가 근골격 진료에서 널리 쓰이는 검사라는 뜻이고, 저희도 그 지침의 범위 안에서 씁니다." },
    { t: "note", tone: "check", title: "초음파로 보기 어려운 부분도 있습니다", text:
      "디스크 안쪽이나 신경 뿌리처럼 깊은 곳은 초음파로 잘 보이지 않습니다. " +
      "그런 부분까지 확인이 필요해 보이면 MRI 같은 검사를 함께 안내해 드립니다." },
  ],
  clinic: [
    { t: "note", tone: "info", title: "함께 보면서 설명드립니다", text:
      "화면을 환자분 쪽으로 돌려두고 같이 봅니다. 어디가 부어 있는지 눈으로 확인하면 " +
      "왜 그 자세에서 아픈지가 훨씬 분명해집니다." },
    { t: "p", text:
      "통증은 아플 때만 기억에 남아서, 실제로 좋아지고 있어도 「그대로인 것 같다」고 느끼기 쉽습니다. " +
      "치료 전후를 같은 화면으로 비교하면 달라진 부분을 직접 확인하실 수 있습니다." },
  ],
  references: [
    {
      cite: "Sconfienza LM, Albano D, Allen G, et al. Clinical indications for musculoskeletal ultrasound updated in 2017 by European Society of Musculoskeletal Radiology (ESSR) consensus. European Radiology. 2018;28(12):5338–5351.",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=Clinical+indications+for+musculoskeletal+ultrasound+updated+in+2017+by+European+Society+of+Musculoskeletal+Radiology",
    },
  ],
};

export const COLUMNS: Column[] = [
  ...QUESTION_COLUMNS,
  ultrasoundWhat,
  herbLiver,
  howManySessions,
  nextDayPain,
];

export { QUESTION_COLUMNS };

export const getColumn = (slug: string) => COLUMNS.find((c) => c.slug === slug);

/**
 * 어떤 증상에 딸린 칼럼.
 *
 * 칼럼에서 증상으로 나가는 길은 이미 symptomSlugs 로 나 있었는데, 반대로
 * 증상에서 칼럼으로 들어오는 입구가 없었다. 같은 자료를 뒤집어 쓴다.
 *
 * 세 편에서 끊는다. 통증치료에는 일곱 편이 걸리는데 다 세우면 목록이 되고,
 * 목록이 되면 페이지 끝의 상투적인 「관련 글」과 구별되지 않는다.
 */
export const columnsFor = (symptomSlug: string, limit = 3) =>
  COLUMNS.filter((c) => c.symptomSlugs.includes(symptomSlug)).slice(0, limit);

/**
 * 어떤 부위에 딸린 칼럼.
 *
 * 증상 쪽은 칼럼이 스스로 symptomSlugs 를 들고 있어 뒤집기만 하면 됐는데,
 * 부위는 그 표시가 없다. 그래서 여기에 적어 둔다. 순서도 그대로 쓴다 —
 * 어느 글을 먼저 보일지는 자료에서 저절로 나오는 것이 아니라 정한 것이다.
 *
 * 고를 때의 기준은 그 부위에서 실제로 무슨 치료를 하는가였다. 추나를 쓰지
 * 않는 팔꿈치에는 추나 글을 넣지 않고, 한약을 쓰는 허리에만 한약 글을 넣는다.
 * 「엑스레이는 정상인데」가 여섯 부위에 다 들어가는 것은, 사진을 찍고
 * 이상 없다는 말을 듣고 오시는 분이 부위를 가리지 않기 때문이다.
 */
const PART_COLUMNS: Record<string, string[]> = {
  neck: ["neck-worse-after-crash", "xray-normal-still-hurts", "how-many-sessions"],
  "low-back": ["back-surgery-alternatives", "herbal-medicine-liver", "xray-normal-still-hurts"],
  shoulder: ["what-ultrasound-shows", "xray-normal-still-hurts", "how-many-sessions"],
  knee: ["what-ultrasound-shows", "xray-normal-still-hurts", "how-many-sessions"],
  ankle: ["what-ultrasound-shows", "xray-normal-still-hurts", "how-many-sessions"],
  elbow: ["what-ultrasound-shows", "xray-normal-still-hurts", "sore-after-treatment"],
};

export const columnsForPart = (partSlug: string) =>
  (PART_COLUMNS[partSlug] ?? [])
    .map((slug) => COLUMNS.find((c) => c.slug === slug))
    .filter((c): c is Column => Boolean(c));

/** 최신순 */
export const columnsByDate = () =>
  [...COLUMNS].sort((a, b) => (a.date < b.date ? 1 : -1));
