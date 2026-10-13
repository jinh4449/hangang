import type { Column } from "../types";
import { QUESTION_COLUMNS } from "./questions";

/** 새 칼럼은 파일 하나를 추가하고 COLUMNS 에 넣으면 목록·사이트맵·RSS 에 자동 반영된다 */

// 글쓴이: 통증·초음파·교통사고는 이진희(lee), 한약·소화·피로·소아·다이어트는 왕소정(wang)
const nextDayPain: Column = {
  slug: "sore-after-treatment",
  authorKey: "lee",
  title: "치료 다음 날 더 아픈 건 잘못된 걸까요",
  question: "추나 받고 다음날 더 아파요",
  summary: "치료 다음 날의 뻐근함은 흔한 반응입니다. 다만 구분해야 할 통증이 따로 있습니다.",
  date: "2026-08-11",
  symptomSlugs: ["pain", "car-accident"],
  image: {
    src: "/column-sore-after.svg",
    w: 800,
    h: 500,
    alt: "치료 다음 날 잠깐 올라갔다가 며칠에 걸쳐 내려가는 통증 곡선",
  },
  answer:
    "치료 다음 날의 뻐근함은 흔한 반응이고, 대개 하루 이틀 안에 가라앉습니다. 다만 팔다리에 힘이 빠지거나 저림이 넓어지는 통증은 다른 신호이니 다음 진료를 기다리지 말고 바로 알려 주셔야 합니다.",
  body: [
    { t: "p", text:
      "진료실에서 가장 많이 듣는 말 중 하나입니다. 치료를 받고 다음 날 오히려 뻐근하거나 " +
      "묵직한 느낌이 들면, 잘못된 것 같아 다음 예약을 취소하시는 분이 계십니다. " +
      "그래서 미리 말씀드립니다." },
    { t: "h", text: "왜 다음 날 뻐근한가" },
    { t: "p", text:
      "추나요법은 굳어 있던 관절과 근육을 움직이는 치료입니다. 오랫동안 한 자세로 " +
      "고정되어 있던 부위가 갑자기 정상 범위로 움직이면, 그 주변 근육이 평소 쓰지 않던 " +
      "방식으로 일하게 됩니다. 운동을 오랜만에 한 다음 날 근육통이 오는 것과 비슷합니다." },
    { t: "p", text:
      "침이나 약침 후에도 자극을 받은 부위가 하루 이틀 뻐근할 수 있습니다. " +
      "대개 24~48시간 안에 가라앉고, 회차를 거듭할수록 이런 반응은 줄어듭니다." },
    { t: "h", text: "연구에서도 흔한 반응입니다" },
    { t: "p", text: "벨기에 연구팀이 척추 도수치료(추나처럼 손으로 관절을 움직이는 치료)를 처음 받은 환자 465명을 조사했더니, 60.9%가 치료 뒤 한 가지 이상의 반응을 겪었습니다. 두통, 뻐근함, 치료 부위의 불편감이 가장 흔했고, 대부분 치료 후 4시간 안에 시작해 24시간 안에 사라졌습니다. 치료 다음 날의 뻐근함이 드문 일이 아니라는 뜻입니다." },
    { t: "h", text: "이건 다른 통증입니다" },
    { t: "p", text:
      "다만 모든 통증을 정상 반응으로 넘겨서는 안 됩니다. 아래에 해당하면 " +
      "다음 진료를 기다리지 마시고 바로 연락 주세요." },
    { t: "note", tone: "warn", title: "바로 알려주셔야 하는 경우", text:
      "다리나 팔에 힘이 빠진다 · 저림이 이전보다 넓은 범위로 퍼졌다 · " +
      "가만히 있어도 아프고 자세를 바꿔도 달라지지 않는다 · " +
      "통증이 3일 넘게 이어지고 점점 심해진다 · 대소변 조절이 어렵다" },
    { t: "h", text: "다음 날 무엇을 하면 좋은가" },
    { t: "ul", items: [
      "따뜻하게 찜질해 주세요. 급성 염증기가 아니라면 온찜질이 근육 이완에 도움이 됩니다.",
      "완전히 누워만 있기보다 가볍게 걸어주세요. 순환이 돌아야 뻐근함이 빨리 풀립니다.",
      "치료 부위에 무리한 스트레칭이나 마사지는 하지 마세요.",
      "다음 내원 때 어제 어땠는지 꼭 말씀해 주세요. 강도를 조정하는 근거가 됩니다.",
    ]},
  ],
  clinic: [
    { t: "p", text: "다음 진료 때 전날 어땠는지부터 여쭙니다. 뻐근함이 하루를 넘겼는지, 어디가 어떻게 불편했는지에 따라 다음 치료의 강도와 부위를 조정합니다." },
    { t: "p", text:
      "치료 강도는 사람마다 맞춰야 합니다. 뻐근함이 부담스러우셨다면 그대로 말씀해 주세요. " +
      "참고 받으시는 것보다 조절하는 편이 결과가 좋습니다." },
  ],
  references: [
    {
      cite: "Cagnie B, Vinck E, Beernaert A, Cambier D. How common are side effects of spinal manipulation and can these side effects be predicted? Manual Therapy. 2004;9(3):151–156.",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=How+common+are+side+effects+of+spinal+manipulation+and+can+these+side+effects+be+predicted",
      used: "도수치료를 처음 받은 465명 중 60.9%가 한 가지 이상의 반응을 겪었고, 대부분 4시간 안에 시작해 24시간 안에 사라졌다.",
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
    "통증을 줄이는 데는 대체로 5회 안팎, 정렬과 자세까지 다루려면 10회 이상을 봅니다. 증상이 시작된 시기와 상태에 따라 달라지므로, 첫 진료에서 예상 횟수를 먼저 말씀드리고 경과를 보며 조정합니다.",
  body: [
    { t: "p", text:
      "가장 자주 받는 질문입니다. 상태에 따라 달라서 숫자를 못박기는 어렵지만, " +
      "대략적인 그림이라도 먼저 말씀드리는 것이 낫다고 생각합니다. " +
      "끝이 보이지 않으면 아무도 치료를 이어가지 못하니까요." },
    { t: "h", text: "대체로 이런 흐름입니다" },
    { t: "ul", items: [
      "급성기 — 주 2~3회, 2~3주. 염증과 통증을 줄이는 데 집중합니다.",
      "회복기 — 주 1~2회, 4~6주. 정렬을 잡고 움직임 범위를 넓힙니다.",
      "관리기 — 월 1~2회. 자세와 생활 습관을 함께 조정합니다.",
    ]},
    { t: "p", text:
      "통증이 시작된 지 얼마 안 된 급성기라면 회복기 없이 끝나기도 합니다. " +
      "반대로 몇 년째 반복된 통증이라면 관리기가 더 길어집니다." },
    { t: "h", text: "횟수와 효과를 비교한 연구" },
    { t: "p", text: "만성 요통 환자 400명을 6주 동안 도수치료 0회·6회·12회·18회로 나눈 미국 연구에서는, 12주 시점에 12회 받은 그룹이 치료를 받지 않은 그룹보다 통증과 일상 장애가 가장 많이 좋아졌습니다. 다만 횟수를 늘린다고 효과가 계속 커지지는 않았고 그룹 사이의 차이도 크지 않았습니다. 많이 받는 것보다 상태에 맞춘 계획이 중요하다는 뜻으로 읽습니다." },
    { t: "h", text: "추나요법은 건강보험이 적용됩니다" },
    { t: "p", text: "한 해 20회까지 급여로 받으실 수 있습니다." },
  ],
  clinic: [
    { t: "p", text: "첫 진료에서 지금이 급성기인지 회복기인지 나누고 예상 횟수를 먼저 말씀드립니다. 끝이 보이지 않으면 아무도 치료를 이어가지 못하니까요." },
    { t: "note", tone: "info", title: "경과는 눈으로 확인합니다", text:
      "통증은 주관적이라 스스로는 좋아지는지 판단하기 어렵습니다. " +
      "초음파로 치료 전후를 함께 보면서 지금 어디까지 왔는지 확인하실 수 있게 합니다." },
  ],
  references: [
    {
      cite: "Haas M, Vavrek D, Peterson D, Polissar N, Neradilek MB. Dose-response and efficacy of spinal manipulation for care of chronic low back pain: a randomized controlled trial. The Spine Journal. 2014;14(7):1106–1116.",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=Dose-response+and+efficacy+of+spinal+manipulation+for+care+of+chronic+low+back+pain",
      used: "만성 요통 400명을 0·6·12·18회로 나눈 결과, 12주 시점에는 12회 그룹이 가장 많이 좋아졌고 횟수에 따른 차이는 크지 않았다.",
    },
  ],
};

const herbLiver: Column = {
  slug: "herbal-medicine-liver",
  authorKey: "wang",
  title: "한약 먹으면 간이 나빠진다던데요",
  question: "한약 간 손상",
  summary: "묻지 않고 그냥 거절하시는 분이 많아 먼저 정리했습니다. 확인하고 넘어가야 할 부분은 분명히 있습니다.",
  date: "2026-08-19",
  symptomSlugs: ["pain", "indigestion", "fatigue"],
  image: {
    src: "/column-herb-liver.svg",
    w: 800,
    h: 500,
    alt: "한약 파우치와 간을 함께 살피는 그림",
  },
  answer:
    "한의사가 진찰하고 처방한 한약으로 간 손상이 생기는 경우는 드뭅니다. 국내 10개 병원의 입원 환자 연구에서 약 0.6%였습니다. 처방 전에 드시는 약과 간 질환 병력을 확인하고, 복용 중 이상 신호가 있으면 바로 멈추는 것이 중요합니다.",
  body: [
    { t: "p", text:
      "한약을 권해드리면 표정이 굳는 분들이 계십니다. 대개 이 이야기 때문입니다. " +
      "직접 물어보시는 경우는 드물고, 대신 조용히 거절하십니다. " +
      "그래서 먼저 꺼내 정리해 두려고 합니다." },
    { t: "h", text: "무엇이 사실인가" },
    { t: "p", text:
      "약을 먹고 간에 부담이 갈 수 있다는 것은 한약만의 이야기가 아닙니다. " +
      "진통제, 항생제, 건강기능식품을 포함해 몸에 들어가는 대부분의 물질은 간에서 대사됩니다. " +
      "중요한 것은 「한약이냐 아니냐」가 아니라 " +
      "「어디서 온 약재인지, 누가 처방했는지, 무엇과 함께 먹는지」입니다." },
    { t: "h", text: "국내 연구에서는" },
    { t: "p", text: "2013년부터 2016년까지 국내 10개 병원에서 한약을 처방받은 입원 환자 1,001명을 지켜본 연구에서, 한약으로 인한 간 손상 기준에 해당한 사람은 6명(0.6%)이었습니다. 여섯 명 모두 간 손상 증상은 없었고 혈액검사로 확인되었습니다. 드물지만 0은 아니라는 뜻이라, 처방 전 확인과 복용 중 관찰을 함께 합니다." },
    { t: "note", tone: "warn", title: "직접 구해 드시는 것은 권하지 않습니다", text:
      "시장이나 인터넷에서 산 약재를 임의로 달여 드시는 경우가 문제가 되는 경우가 많습니다. " +
      "용량과 배합, 다른 약과의 관계를 확인하지 않은 상태이기 때문입니다. " +
      "지인이 좋다고 준 약을 그대로 드시는 것도 마찬가지입니다." },
    { t: "h", text: "복용 중에 이런 증상이 있으면 중단하고 알려주세요" },
    { t: "ul", items: [
      "심한 피로감이 갑자기 생겼다",
      "눈 흰자나 피부가 노랗게 변했다",
      "소변 색이 진해졌다",
      "메스껍고 입맛이 크게 떨어졌다",
      "오른쪽 윗배가 불편하다",
    ]},
    { t: "p", text:
      "드물지만 나타날 수 있는 반응입니다. 참지 마시고 복용을 멈춘 뒤 연락 주세요. " +
      "필요하면 검사를 권해드립니다." },
  ],
  clinic: [
    { t: "ul", items: [
      "복용 중인 약을 모두 확인합니다. 간에 부담이 되는 약을 이미 드시는 경우 처방을 달리합니다.",
      "간 질환 병력이 있으시면 말씀해 주세요. 처방 자체를 권하지 않는 경우도 있습니다.",
      "최근 혈액검사 결과가 있으시면 가져와 주시면 도움이 됩니다.",
      "규격품 약재만 사용하고, 출처가 불분명한 약재는 쓰지 않습니다.",
    ]},
  ],
  references: [
    {
      cite: "Cho JH, Oh DS, et al. A nationwide study of the incidence rate of herb-induced liver injury in Korea. Archives of Toxicology. 2017;91(12):4009–4015.",
      url: "https://doi.org/10.1007/s00204-017-2007-9",
      used: "국내 10개 병원에서 한약을 처방받은 입원 환자 1,001명 중 한약 간 손상 기준에 해당한 사람은 6명(0.6%)이었고, 모두 증상은 없었다.",
    },
  ],
};

const ultrasoundWhat: Column = {
  slug: "what-ultrasound-shows",
  authorKey: "lee",
  title: "한의원에서 초음파로 무엇을 보나요",
  question: "한의원 초음파",
  summary: "X-ray에 안 나오는데 계속 아픈 이유를 설명드립니다.",
  date: "2026-08-22",
  symptomSlugs: ["pain", "car-accident"],
  image: {
    src: "/column-ultrasound.svg",
    w: 800,
    h: 500,
    alt: "초음파 탐촉자와 화면에 보이는 근육·힘줄 층",
  },
  answer:
    "한의원 초음파로는 근육·힘줄·인대·점액낭처럼 엑스레이에 잘 보이지 않는 부드러운 조직이 부어 있는지, 움직일 때 어디서 걸리는지를 실시간으로 봅니다. 추간판 안쪽이나 신경 뿌리처럼 깊은 구조는 보이지 않아 MRI가 필요합니다.",
  body: [
    { t: "p", text:
      "「검사에서는 이상이 없다는데 계속 아프다」는 말씀을 자주 듣습니다. " +
      "이상한 일이 아닙니다. 검사마다 보는 것이 다르기 때문입니다." },
    { t: "h", text: "X-ray는 뼈를 봅니다" },
    { t: "p", text:
      "X-ray로는 골절이나 뼈의 배열을 확인합니다. 반대로 말하면 " +
      "근육, 힘줄, 인대처럼 물렁한 조직은 거의 보이지 않습니다. " +
      "그런데 일상에서 겪는 통증의 상당수는 바로 그 물렁한 조직에서 옵니다." },
    { t: "p", text:
      "교통사고 후에 목과 허리가 아픈데 검사상 이상이 없다는 경우가 대표적입니다. " +
      "손상된 곳이 뼈가 아니라 근육과 인대라서 그렇습니다." },
    { t: "h", text: "초음파로 보는 것" },
    { t: "ul", items: [
      "근육과 힘줄의 상태 — 부어 있는지, 두꺼워졌는지",
      "염증으로 물이 찬 부위",
      "움직일 때 힘줄이 어떻게 미끄러지는지 (실시간으로 봅니다)",
      "치료 전후에 달라진 부분",
    ]},
    { t: "h", text: "국제 진료지침에서는" },
    { t: "p", text: "유럽 근골격 영상의학회(ESSR)는 부위와 질환마다 초음파가 얼마나 적합한 검사인지를 정리한 진료 지침을 내고 있습니다(2017년 갱신). 이 지침에서 초음파는 어깨·팔꿈치·손목·엉덩이·무릎·발목의 힘줄, 인대, 관절에 찬 물을 보는 검사로 부위별 적합도가 매겨져 있습니다. 어떤 질환에는 잘 맞고 어떤 질환에는 맞지 않는지가 정해져 있다는 뜻이라, 저희도 그 범위 안에서 씁니다." },
    { t: "note", tone: "warn", title: "초음파로 모든 것을 알 수 있는 것은 아닙니다", text:
      "추간판 내부나 신경 뿌리처럼 깊은 구조는 초음파로 확인하기 어렵습니다. " +
      "다리에 힘이 빠지는 등 신경 증상이 있으면 MRI 검사를 먼저 권해드립니다." },
  ],
  clinic: [
    { t: "note", tone: "info", title: "함께 보면서 설명드립니다", text:
      "화면을 환자분 쪽으로 돌려두고 같이 봅니다. 어디가 부어 있는지 눈으로 확인하면 " +
      "왜 그 자세에서 아픈지가 훨씬 명확해집니다." },
    { t: "p", text:
      "통증은 주관적입니다. 아플 때만 기억에 남기 때문에, 실제로 좋아지고 있어도 " +
      "「그대로인 것 같다」고 느끼기 쉽습니다. 치료 전후를 같은 화면으로 비교하면 " +
      "달라진 부분을 스스로 확인하실 수 있습니다. 계속 받을지 말지를 판단하는 근거가 됩니다." },
  ],
  references: [
    {
      cite: "Sconfienza LM, Albano D, Allen G, et al. Clinical indications for musculoskeletal ultrasound updated in 2017 by European Society of Musculoskeletal Radiology (ESSR) consensus. European Radiology. 2018;28(12):5338–5351.",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=Clinical+indications+for+musculoskeletal+ultrasound+updated+in+2017+by+European+Society+of+Musculoskeletal+Radiology",
      used: "유럽 근골격 영상의학회가 부위·질환별로 초음파가 얼마나 적합한 검사인지를 정리한 진료 지침.",
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
