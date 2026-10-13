import type { GlossaryTerm } from "./types";

/**
 * 한의학 개념, 몸의 구조, 검사.
 *
 * 한의학 개념은 「한의학에서는 ~로 봅니다」로 쓴다. 서양의학의 해부 구조처럼
 * 단정하면 사실과 다르게 읽힌다.
 */
export const BASICS: GlossaryTerm[] = [
  // ── 한의학 기본 개념 ──
  {
    slug: "pattern-diagnosis",
    term: "변증",
    aka: ["변증론치", "辨證"],
    english: "Pattern identification",
    category: "concept",
    short:
      "변증은 한의사가 증상, 맥, 혀, 체형과 생활을 종합해 지금 몸의 상태를 하나의 유형(증)으로 판단하는 한의학의 진단 방법입니다.",
    about: [
      "같은 소화불량이라도 몸이 차서 생긴 것인지, 스트레스로 막혀서 생긴 것인지에 따라 다른 유형으로 보고 처방을 달리합니다. 병명이 같아도 사람마다 한약이 다른 이유입니다.",
    ],
    see: ["pulse-diagnosis", "deficiency-excess"],
  },
  {
    slug: "qi-blood",
    term: "기혈",
    aka: ["기와 혈", "氣血"],
    category: "concept",
    short:
      "기혈은 한의학에서 몸을 움직이고 데우는 기능(기)과 몸을 적시고 기르는 물질(혈)을 함께 부르는 말로, 이 둘이 부족하거나 잘 돌지 않으면 병이 생긴다고 봅니다.",
    about: [
      "「기운이 없다」는 기가 부족한 모습으로, 「안색이 창백하고 어지럽다」는 혈이 부족한 모습으로 설명합니다. 만성피로를 볼 때 자주 쓰는 개념입니다.",
    ],
    symptomSlug: "fatigue",
    see: ["deficiency-excess", "blood-stasis"],
  },
  {
    slug: "blood-stasis",
    term: "어혈",
    aka: ["瘀血", "죽은 피"],
    category: "concept",
    short:
      "어혈은 한의학에서 피가 제대로 돌지 못하고 한곳에 머물러 생긴 정체를 말하며, 다친 뒤 오래 남는 통증이나 찌르는 듯한 고정된 통증의 원인으로 봅니다.",
    about: [
      "부딪히거나 삔 뒤 멍이 들고 같은 자리가 오래 아픈 것, 교통사고 뒤 남는 통증을 설명할 때 많이 씁니다. 어혈을 푸는 한약이나 약침을 함께 쓰기도 합니다.",
    ],
    symptomSlug: "car-accident",
    see: ["qi-blood", "whiplash"],
  },
  {
    slug: "phlegm",
    term: "담음",
    aka: ["담", "痰飮"],
    category: "concept",
    short:
      "담음은 한의학에서 몸의 물이 제대로 돌지 못하고 뭉쳐 생긴 노폐물을 말하며, 결림, 어지럼, 메스꺼움, 몸이 붓고 무거운 증상의 원인으로 봅니다.",
    about: [
      "「담 결렸다」는 말이 여기서 나왔습니다. 소화가 약하고 몸이 무거운 분, 체중 관리가 필요한 분을 볼 때도 쓰는 개념입니다.",
    ],
    see: ["acute-neck-strain", "spleen-stomach"],
  },
  {
    slug: "deficiency-excess",
    term: "허실",
    aka: ["허증", "실증", "虛實"],
    category: "concept",
    short:
      "허실은 한의학에서 병의 상태를 나누는 기준으로, 몸에 필요한 것이 부족해 생긴 상태를 허(虛), 나쁜 것이 남아 막혀서 생긴 상태를 실(實)이라고 합니다.",
    about: [
      "허한 상태에는 보태는 치료를, 실한 상태에는 덜어 내고 뚫는 치료를 합니다. 「보약」은 허한 상태에 쓰는 약이라, 실한 상태에서 먹으면 오히려 불편할 수 있습니다.",
    ],
    see: ["pattern-diagnosis", "cold-heat"],
  },
  {
    slug: "cold-heat",
    term: "한열",
    aka: ["한증", "열증", "몸이 차다", "열이 많다"],
    category: "concept",
    short:
      "한열은 한의학에서 몸이 차서 생긴 상태(한)와 열이 많아 생긴 상태(열)를 나누는 기준으로, 같은 증상이라도 어느 쪽인지에 따라 치료가 반대가 됩니다.",
    about: [
      "손발이 차고 찬 음식에 배탈이 잘 나면 한에, 얼굴이 잘 붉어지고 찬 것을 찾으면 열에 가깝게 봅니다. 한약 처방을 고를 때 가장 먼저 가르는 기준 가운데 하나입니다.",
    ],
    see: ["deficiency-excess", "pattern-diagnosis"],
  },
  {
    slug: "spleen-stomach",
    term: "비위",
    aka: ["비위가 약하다", "脾胃"],
    category: "concept",
    short:
      "비위는 한의학에서 음식을 받아들이고 소화해 기혈을 만드는 기능을 함께 부르는 말로, 해부학의 비장·위와 정확히 같은 뜻은 아닙니다.",
    about: [
      "「비위가 약하다」는 조금만 먹어도 더부룩하고, 입맛이 없고, 쉽게 피곤한 상태를 말합니다. 소화불량과 만성피로를 함께 볼 때 중심에 두는 개념입니다.",
    ],
    symptomSlug: "indigestion",
    see: ["functional-dyspepsia", "qi-blood"],
  },
  {
    slug: "meridian",
    term: "경락",
    aka: ["경맥", "經絡"],
    english: "Meridian",
    category: "concept",
    short:
      "경락은 한의학에서 기혈이 흐르는 길로 보는 체계로, 몸 안의 장부와 몸 겉을 잇는 통로라고 설명합니다.",
    about: [
      "열두 개의 주된 경락(십이경맥)이 있다고 보며, 침을 놓을 자리를 고르는 기준이 됩니다. 아픈 곳에서 떨어진 손발에 침을 놓는 것도 경락의 연결을 따르기 때문입니다.",
    ],
    see: ["acupoint", "acupuncture"],
  },
  {
    slug: "acupoint",
    term: "경혈",
    aka: ["혈자리", "經穴"],
    english: "Acupuncture point",
    category: "concept",
    short:
      "경혈은 경락 위에서 침이나 뜸으로 자극하는 자리로, 흔히 「혈자리」라고 부릅니다.",
    about: [
      "세계보건기구(WHO)가 표준 경혈 위치를 정리해 두었고, 이름과 위치가 정해져 있습니다. 실제 진료에서는 경혈과 함께 눌러서 아픈 자리, 굳은 근육도 함께 봅니다.",
    ],
    see: ["meridian", "myofascial-pain"],
  },
  {
    slug: "sasang",
    term: "사상체질",
    aka: ["태양인", "태음인", "소양인", "소음인", "체질"],
    category: "concept",
    short:
      "사상체질은 조선 말 이제마가 정리한 한의학 이론으로, 사람을 태양인·태음인·소양인·소음인 네 체질로 나누고 체질에 따라 건강 관리와 처방을 달리합니다.",
    about: [
      "체격, 성격, 소화와 땀의 특징 등을 함께 보고 판단합니다. 체질은 진단의 한 가지 참고이며, 지금 몸의 상태(변증)와 함께 봐야 정확합니다.",
    ],
    see: ["pattern-diagnosis"],
  },

  // ── 몸의 구조 ──
  {
    slug: "tendon",
    term: "힘줄",
    aka: ["건", "腱"],
    english: "Tendon",
    category: "anatomy",
    short:
      "힘줄은 근육을 뼈에 붙여 근육의 힘을 뼈에 전달하는 질기고 단단한 섬유 조직입니다.",
    about: [
      "혈액 공급이 적어 근육보다 회복이 느립니다. 뼈에 붙는 자리(부착부)에 반복해서 부담이 쌓이면 테니스엘보, 족저근막염, 아킬레스건염 같은 힘줄 질환이 생깁니다.",
      "힘줄은 초음파로 두께와 붓기, 찢어진 곳을 잘 볼 수 있는 조직입니다.",
    ],
    see: ["ligament", "msk-ultrasound"],
  },
  {
    slug: "ligament",
    term: "인대",
    aka: ["靭帶"],
    english: "Ligament",
    category: "anatomy",
    short:
      "인대는 뼈와 뼈를 이어 관절이 정해진 범위 밖으로 움직이지 않게 잡아 주는 섬유 조직입니다.",
    about: [
      "관절이 갑자기 꺾이면 인대가 늘어나거나 찢어지는데, 이를 염좌라고 합니다. 충분히 아물지 않으면 관절이 헐거워져 같은 부상이 반복됩니다.",
    ],
    see: ["ankle-sprain", "tendon"],
  },
  {
    slug: "fascia",
    term: "근막",
    aka: ["筋膜"],
    english: "Fascia",
    category: "anatomy",
    short:
      "근막은 근육을 감싸고 근육과 근육 사이를 이어 주는 얇고 질긴 막입니다.",
    about: [
      "근막이 굳거나 서로 들러붙으면 움직임이 줄고, 뭉친 자리에서 다른 곳으로 뻗치는 통증이 생깁니다. 발바닥의 족저근막도 근막의 한 종류입니다.",
    ],
    see: ["myofascial-pain", "plantar-fasciitis"],
  },
  {
    slug: "bursa",
    term: "점액낭",
    aka: ["활액낭", "윤활낭"],
    english: "Bursa",
    category: "anatomy",
    short:
      "점액낭은 힘줄과 뼈가 맞닿는 자리에서 마찰을 줄여 주는 작은 물주머니입니다.",
    about: [
      "반복해서 눌리거나 쓸리면 부어서 점액낭염이 됩니다. 어깨, 팔꿈치 뒤쪽, 무릎 안쪽(거위발), 엉덩이 옆에 흔합니다. 붓기는 초음파로 잘 보입니다.",
    ],
    see: ["shoulder-impingement", "pes-anserine"],
  },
  {
    slug: "disc",
    term: "추간판",
    aka: ["디스크", "椎間板"],
    english: "Intervertebral disc",
    category: "anatomy",
    short:
      "추간판은 척추뼈와 척추뼈 사이에서 충격을 흡수하는 쿠션으로, 바깥의 질긴 섬유륜과 안쪽의 말랑한 수핵으로 이루어져 있습니다.",
    about: [
      "흔히 「디스크」라고 부르는 것은 이 구조의 이름이고, 병명은 추간판탈출증입니다. 수핵이 섬유륜을 뚫고 밀려 나와 신경을 누르면 저림이 생깁니다.",
      "추간판 내부는 초음파로 보이지 않아 MRI 로 확인합니다.",
    ],
    see: ["lumbar-disc", "cervical-disc", "xray-mri"],
  },
  {
    slug: "pelvis-alignment",
    term: "골반 정렬",
    aka: ["골반 틀어짐", "골반 비대칭"],
    category: "anatomy",
    short:
      "골반 정렬은 좌우 골반뼈와 천골이 이루는 위치 관계를 말하며, 이 균형이 무너지면 좌우 다리에 실리는 무게가 달라져 허리와 무릎에 부담이 갑니다.",
    about: [
      "다리를 꼬거나 한쪽으로 짝다리를 짚는 습관, 출산, 한쪽으로만 드는 가방 등이 영향을 줍니다. 한쪽 허리나 한쪽 무릎만 반복해서 아픈 경우 골반을 함께 봅니다.",
    ],
    care: "서 있는 자세와 누운 자세에서 골반 높이를 확인하고, 추나요법으로 교정합니다.",
    treatmentSlug: "chuna",
    see: ["si-joint", "chuna"],
  },

  // ── 검사·장비 ──
  {
    slug: "msk-ultrasound",
    term: "근골격 초음파",
    aka: ["한의원 초음파", "근골격계 초음파"],
    english: "Musculoskeletal ultrasound",
    category: "exam",
    short:
      "근골격 초음파는 근육, 힘줄, 인대, 관절낭, 점액낭 같은 연부조직을 초음파로 실시간으로 보는 검사로, 방사선 노출이 없습니다.",
    about: [
      "엑스레이는 뼈를, 초음파는 그 주변의 부드러운 조직을 잘 보여 줍니다. 움직이면서 볼 수 있어 어깨를 들 때 어디가 끼이는지도 확인할 수 있습니다.",
      "대법원은 2022년 한의사가 초음파 진단기기를 쓴 것을 의료법 위반으로 볼 수 없다고 판결했습니다.",
    ],
    care: "삼성 V7 초음파로 보고, 화면을 환자분과 함께 보며 설명드립니다.",
    firstElsewhere: ["뼈 속, 추간판 내부, 신경 뿌리처럼 깊은 구조는 엑스레이나 MRI 가 필요합니다"],
    treatmentSlug: "ultrasound-pharmacopuncture",
    see: ["rmsk", "xray-mri", "ultrasound-guided"],
  },
  {
    slug: "xray-mri",
    question: "엑스레이와 MRI 는 무엇을 보나요",
    term: "엑스레이와 MRI",
    aka: ["X-ray", "엠알아이", "영상 검사"],
    category: "exam",
    short:
      "엑스레이는 뼈의 모양과 배열을, MRI 는 추간판·신경·인대·연골 같은 부드러운 조직을 자세히 보여 주는 영상 검사입니다.",
    about: [
      "엑스레이가 정상이라는 말은 뼈에 이상이 없다는 뜻이고, 근육이나 인대가 다치지 않았다는 뜻은 아닙니다. 그래서 엑스레이가 정상인데도 계속 아플 수 있습니다.",
      "한의원에서는 엑스레이와 MRI 를 찍지 않습니다. 필요하면 영상의학과나 정형외과 검사를 권하고, 결과지를 가져오시면 함께 봅니다.",
    ],
    firstElsewhere: [
      "다리 힘이 빠지거나 대소변에 문제가 있을 때, 외상 뒤 골절이 의심될 때는 영상 검사가 먼저입니다",
    ],
    compareSlug: "hanui-vs-ortho",
    see: ["msk-ultrasound", "disc"],
  },
  {
    slug: "pulse-diagnosis",
    term: "맥진",
    aka: ["진맥", "맥 짚기", "脈診"],
    english: "Pulse diagnosis",
    category: "exam",
    short:
      "맥진은 한의사가 손목의 맥을 짚어 맥의 깊이, 빠르기, 힘, 모양을 살피고 몸의 상태를 판단하는 한의학의 진찰 방법입니다.",
    about: [
      "혀의 색과 모양을 보는 설진, 배를 눌러 보는 복진, 문진과 함께 변증의 근거가 됩니다. 맥 하나로 모든 것을 판단하지는 않습니다.",
    ],
    see: ["pattern-diagnosis", "tongue-diagnosis"],
  },
  {
    slug: "tongue-diagnosis",
    term: "설진",
    aka: ["혀 진찰", "舌診"],
    english: "Tongue diagnosis",
    category: "exam",
    short:
      "설진은 혀의 색, 모양, 혀에 낀 이끼(설태)의 두께와 색을 보고 몸의 상태를 판단하는 한의학의 진찰 방법입니다.",
    about: [
      "혀가 창백하면 기혈이 부족한 쪽으로, 설태가 두껍고 끈적하면 소화 기능이 막힌 쪽으로 보는 식입니다. 진료 직전에 색이 있는 음식을 드시면 판단이 흐려질 수 있습니다.",
    ],
    see: ["pulse-diagnosis", "spleen-stomach"],
  },
];
