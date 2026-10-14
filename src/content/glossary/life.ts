import type { GlossaryTerm } from "./types";

/** 교통사고, 소화·피로·체중, 보험·비용, 생활 관리, 특별한 상황 */
export const LIFE: GlossaryTerm[] = [
  // ── 교통사고 ──
  {
    slug: "accident-aftereffects",
    term: "교통사고 후유증",
    aka: ["교통사고 통증", "사고 후 통증"],
    category: "accident",
    short:
      "교통사고 후유증은 사고 뒤 며칠에서 몇 주에 걸쳐 나타나거나 오래 남는 목·허리 통증, 두통, 어지럼, 피로, 수면 장애 같은 증상을 함께 부르는 말입니다.",
    about: [
      "사고 직후에는 긴장 때문에 통증을 덜 느끼다가, 2~3일 뒤 근육과 인대의 염증이 올라오면서 더 아파지는 경우가 많습니다.",
      "엑스레이에서 뼈에 이상이 없어도 연부조직의 손상은 남아 있을 수 있습니다.",
    ],
    signs: ["사고 며칠 뒤 목과 어깨가 굳는다", "두통이나 어지럼이 이어진다", "잠을 깊이 못 잔다"],
    care: "초음파로 다친 조직을 확인하고 침, 약침, 추나, 한약을 자동차보험으로 진료합니다.",
    needsTests: ["의식을 잃었거나 구토, 심한 두통이 있을 때", "골절이 의심될 때"],
    symptomSlug: "car-accident",
    compareSlug: "accident-hanui-vs-ortho",
    see: ["whiplash", "car-insurance-hanbang", "accident-claim-number"],
  },
  {
    slug: "accident-claim-number",
    question: "자동차보험 접수번호는 왜 필요한가요",
    term: "자동차보험 접수번호",
    aka: ["사고 접수번호", "보험 접수번호"],
    category: "accident",
    short:
      "자동차보험 접수번호는 보험사에 교통사고를 접수하면 받는 번호로, 병원은 이 번호로 보험사에 치료비를 직접 청구하기 때문에 환자는 진료비를 내지 않습니다.",
    about: [
      "상대 차량 보험사 또는 내 보험사에 사고를 접수하면 문자나 전화로 받을 수 있습니다. 내원하실 때 접수번호와 보험사 이름을 알려 주시면 됩니다.",
    ],
    symptomSlug: "car-accident",
    see: ["car-insurance-hanbang", "accident-settlement"],
  },
  {
    slug: "accident-settlement",
    question: "교통사고 합의는 언제 해야 하나요",
    term: "교통사고 합의",
    aka: ["보험사 합의", "합의금", "향후치료비"],
    category: "accident",
    short:
      "교통사고 합의는 보험사와 치료비·위자료 등을 정리하고 사건을 마무리하는 절차로, 합의한 뒤에는 같은 사고로 치료비를 다시 청구하기 어렵습니다.",
    about: [
      "아직 아픈데 합의를 서두르면, 그 뒤의 치료는 본인 부담이 될 수 있습니다. 남은 증상과 앞으로 필요한 치료를 정리한 뒤에 합의하시는 것이 좋습니다.",
      "합의 금액과 조건은 법률·보험 문제라 저희가 정해 드릴 수 없습니다. 진료 기록과 남은 증상은 정리해 드릴 수 있습니다.",
    ],
    symptomSlug: "car-accident",
    see: ["accident-claim-number", "accident-aftereffects"],
  },

  // ── 소화·피로·체중 ──
  {
    slug: "reflux",
    term: "역류성 식도염",
    aka: ["위식도역류질환", "신물 올라옴"],
    english: "Gastroesophageal reflux disease (GERD)",
    category: "internal",
    short:
      "역류성 식도염은 위산과 위 내용물이 식도로 거꾸로 올라와 가슴 쓰림, 신물, 목 이물감 같은 증상을 일으키는 상태입니다.",
    about: [
      "식사 직후 눕거나, 과식·야식, 기름진 음식, 술과 커피, 복부 비만이 악화 요인입니다. 목에 뭔가 걸린 느낌이나 마른기침으로만 나타나기도 합니다.",
    ],
    signs: ["가슴 가운데가 타는 듯 쓰리다", "누우면 신물이 올라온다", "목에 뭔가 걸린 느낌이 있다"],
    needsTests: [
      "삼키기 어렵거나 삼킬 때 아플 때",
      "체중이 이유 없이 빠지거나 검은 변을 볼 때 — 내시경 검사가 필요합니다",
    ],
    symptomSlug: "indigestion",
    see: ["functional-dyspepsia", "spleen-stomach"],
  },
  {
    slug: "chronic-fatigue",
    term: "만성피로",
    aka: ["만성 피로", "기력 저하", "피로가 안 풀림"],
    category: "internal",
    short:
      "만성피로는 쉬어도 풀리지 않는 피로가 6개월 이상 이어져 일상에 지장을 주는 상태를 말합니다.",
    about: [
      "빈혈, 갑상선 질환, 당뇨, 간 질환, 우울감, 수면무호흡처럼 원인이 따로 있는 경우가 있어 혈액 검사로 먼저 확인하는 것이 좋습니다.",
      "검사에서 뚜렷한 원인이 없으면 한의학에서는 기혈과 비위의 상태, 수면과 생활을 함께 보고 회복을 돕습니다.",
    ],
    signs: ["자고 일어나도 개운하지 않다", "오후만 되면 기운이 떨어진다", "작은 일에도 쉽게 지친다"],
    needsTests: ["체중이 빠지거나 열, 식은땀이 함께 있을 때 — 혈액 검사가 필요합니다"],
    symptomSlug: "fatigue",
    treatmentSlug: "herbal",
    see: ["qi-blood", "spleen-stomach"],
  },
  {
    slug: "herbal-diet",
    term: "한방 다이어트",
    aka: ["다이어트 한약", "한약 다이어트"],
    category: "internal",
    short:
      "한방 다이어트는 한의사가 체질과 식욕, 소화, 수면 상태를 진찰하고 한약과 생활 관리로 체중 감량을 돕는 방법입니다.",
    about: [
      "식욕을 줄이는 처방에는 마황이 들어가는 경우가 많습니다. 마황은 심장이 빨리 뛰거나 잠이 안 오는 등의 반응이 있을 수 있어, 혈압·심장 질환·갑상선 질환이 있으면 반드시 미리 알려 주셔야 합니다.",
      "한약만으로 체중이 유지되지는 않습니다. 식사와 활동을 함께 바꿔야 요요를 줄일 수 있습니다.",
    ],
    cautions: ["임신 중이거나 임신 계획이 있을 때는 다이어트 한약을 드시지 않습니다"],
    symptomSlug: "diet",
    treatmentSlug: "herbal",
    see: ["ephedra", "pregnancy-hanbang"],
  },
  {
    slug: "ephedra",
    term: "마황",
    aka: ["麻黃"],
    category: "herb",
    treatmentSlug: "herbal",
    short:
      "마황은 에페드린 성분을 가진 한약재로, 한의학에서 땀을 내고 기침을 멎게 하는 데 쓰며 식욕을 줄이는 작용 때문에 다이어트 처방에도 들어갑니다.",
    about: [
      "에페드린은 교감신경을 자극해 심장 박동이 빨라지거나 잠이 안 오고 가슴이 두근거리는 반응을 일으킬 수 있습니다. 그래서 한의사가 양을 조절해 처방해야 하는 약재입니다.",
      "고혈압, 심장 질환, 갑상선 기능 항진증, 전립선 비대증이 있거나 임신 중이면 쓰지 않거나 매우 조심해서 씁니다.",
    ],
    symptomSlug: "diet",
    see: ["herbal-diet", "herb-drug"],
  },

  // ── 보험·비용 ──
  {
    slug: "covered-vs-uncovered",
    question: "한의원 급여와 비급여는 무엇이 다른가요",
    term: "급여와 비급여",
    aka: ["건강보험 급여", "비급여 진료", "한의원 비용"],
    category: "insurance",
    short:
      "급여는 건강보험이 비용 일부를 내 주는 진료이고, 비급여는 건강보험이 적용되지 않아 환자가 전액을 내는 진료입니다.",
    about: [
      "한의원에서는 침, 전침, 부항, 뜸, 추나요법(연 20회), 일부 한약 제제가 급여이고, 약침과 첩약 대부분이 비급여입니다.",
      "비급여 금액은 의료기관마다 다를 수 있어, 진료 전에 미리 안내드립니다.",
    ],
    care: "비급여 항목은 진료 전에 금액을 말씀드리고 동의를 받은 뒤 진행합니다.",
    see: ["chuna-insurance", "private-insurance", "herbal-insurance"],
  },
  {
    slug: "herbal-insurance",
    question: "한약도 건강보험이 되나요",
    term: "첩약 건강보험 시범사업",
    aka: ["한약 건강보험", "첩약 급여"],
    category: "insurance",
    treatmentSlug: "herbal",
    short:
      "첩약 건강보험 시범사업은 정해진 일부 질환에 한해 한의사가 처방한 첩약(달인 한약)에 건강보험을 적용하는 제도로, 2020년 11월부터 시행되고 있습니다.",
    about: [
      "대상 질환과 참여 한의원, 1년에 받을 수 있는 기간이 정해져 있습니다. 대상이 아니거나 참여하지 않는 한의원에서 지은 첩약은 비급여입니다.",
      "대상 여부는 진찰 후 말씀드립니다. 제도의 세부 내용은 바뀔 수 있어 보건복지부와 건강보험심사평가원의 안내가 기준입니다.",
    ],
    see: ["covered-vs-uncovered", "herbal-medicine"],
  },
  {
    slug: "private-insurance",
    question: "한의원 진료도 실손보험이 되나요",
    term: "실손보험과 한의원",
    aka: ["실비보험 한의원", "한방 실비"],
    category: "insurance",
    short:
      "실손의료보험은 한의원의 건강보험 급여 진료비 중 본인부담금은 보상하지만, 약침이나 첩약 같은 한방 비급여 진료비는 대부분의 상품에서 보상하지 않습니다.",
    about: [
      "가입 시기와 상품에 따라 다르므로, 정확한 보상 범위는 가입하신 보험사에 확인하셔야 합니다. 서류(진료비 영수증, 세부내역서)는 요청하시면 발급해 드립니다.",
      "교통사고 치료는 실손보험이 아니라 자동차보험으로 처리됩니다.",
    ],
    see: ["covered-vs-uncovered", "car-insurance-hanbang"],
  },

  // ── 생활 관리 ──
  {
    slug: "hot-cold-pack",
    question: "온찜질과 냉찜질, 언제 무엇을 하나요",
    term: "온찜질과 냉찜질",
    aka: ["찜질", "얼음찜질", "핫팩"],
    category: "selfcare",
    symptomSlug: "pain",
    short:
      "다친 직후 붓고 열이 나는 1~2일은 냉찜질로 염증과 붓기를 줄이고, 그 뒤 굳고 뻐근한 통증에는 온찜질로 근육을 풀어 주는 것이 일반적인 원칙입니다.",
    about: [
      "냉찜질은 수건으로 감싼 얼음팩을 15~20분 정도 대고, 피부가 하얗게 질리거나 감각이 없어지면 바로 뗍니다. 온찜질도 화상을 입지 않도록 같은 시간을 지킵니다.",
      "당뇨나 혈액순환 장애로 감각이 둔한 분은 찜질로 화상이나 동상을 입기 쉬워 조심해야 합니다.",
    ],
    see: ["ankle-sprain", "lumbar-sprain"],
  },
  {
    slug: "desk-posture",
    question: "목과 허리에 덜 부담되는 앉은 자세는",
    term: "바른 앉은 자세",
    aka: ["컴퓨터 자세", "모니터 높이", "책상 자세"],
    category: "selfcare",
    symptomSlug: "pain",
    short:
      "오래 앉아 일할 때는 모니터 윗선을 눈높이에 맞추고, 엉덩이를 의자 깊숙이 넣어 등을 기대며, 30~50분마다 일어나 자세를 바꾸는 것이 목과 허리의 부담을 줄이는 기본입니다.",
    about: [
      "아무리 좋은 자세라도 오래 그대로 있으면 부담이 쌓입니다. 자세를 「고치는」 것보다 「자주 바꾸는」 것이 더 중요합니다.",
      "노트북은 화면이 낮아 고개가 숙여지기 쉽습니다. 받침대와 별도 키보드를 쓰면 도움이 됩니다.",
    ],
    see: ["forward-head", "lumbar-disc"],
  },
  {
    slug: "stretching",
    question: "아플 때 스트레칭을 해도 되나요",
    term: "통증이 있을 때 스트레칭",
    aka: ["스트레칭", "운동해도 되나요"],
    category: "selfcare",
    symptomSlug: "pain",
    short:
      "통증이 있을 때의 스트레칭은 아프지 않은 범위에서 천천히 15~30초씩 늘리는 것이 원칙이며, 하면서 통증이 커지거나 저림이 퍼지면 멈춰야 합니다.",
    about: [
      "다친 직후 붓고 열이 나는 시기에는 억지로 늘리지 않습니다. 염증이 가라앉은 뒤 움직임 범위를 조금씩 넓혀 갑니다.",
      "어떤 동작이 맞는지는 아픈 부위와 원인에 따라 다릅니다. 진료 때 집에서 할 동작을 함께 알려 드립니다.",
    ],
    see: ["hot-cold-pack", "desk-posture"],
  },

  // ── 이런 분이라면 ──
  {
    slug: "pregnancy-hanbang",
    question: "임신 중에 침이나 한약을 써도 되나요",
    term: "임신 중 한의원 치료",
    aka: ["임산부 침", "임신 중 한약", "임신 중 추나"],
    category: "special",
    short:
      "임신 중에도 침 치료는 받을 수 있는 경우가 많지만, 피해야 하는 자리와 약재가 있으므로 진료 전에 반드시 임신 사실과 주수를 알려 주셔야 합니다.",
    about: [
      "임신 중에는 배와 허리 아래쪽, 일부 손발의 경혈을 피하고 자극을 약하게 합니다. 다이어트 한약은 쓰지 않고, 약침도 일반적으로 피합니다.",
      "임신 중 한약은 필요한 경우에 한해 신중하게 처방하며, 산부인과 담당 선생님께도 알리시는 것이 좋습니다.",
    ],
    needsTests: ["출혈, 배 뭉침, 양수가 새는 느낌이 있을 때 — 바로 산부인과 검사가 필요합니다"],
    see: ["herbal-diet", "herb-drug"],
  },
  {
    slug: "anticoagulant",
    question: "항응고제를 먹는데 침을 맞아도 되나요",
    term: "항응고제 복용 중 침 치료",
    aka: ["아스피린 먹는데 침", "혈액 희석제 한의원"],
    category: "special",
    treatmentSlug: "acupuncture",
    short:
      "아스피린이나 와파린 같은 항응고제·항혈소판제를 드시는 분도 침 치료를 받을 수 있지만, 멍과 출혈이 생기기 쉬워 약 이름을 미리 알려 주셔야 하고 습식 부항과 일부 약침은 피합니다.",
    about: [
      "약을 임의로 끊으시면 안 됩니다. 저희가 침의 깊이와 자리, 치료 방법을 조정합니다.",
    ],
    care: "첫 진료에서 드시는 약을 확인하고 치료 방법을 정합니다.",
    see: ["herb-drug", "cupping"],
  },
  {
    slug: "diabetes-acupuncture",
    question: "당뇨가 있어도 한의원 치료를 받아도 되나요",
    term: "당뇨가 있을 때 한의원 치료",
    aka: ["당뇨 침", "당뇨 한약"],
    category: "special",
    treatmentSlug: "acupuncture",
    short:
      "당뇨가 있으면 상처가 잘 낫지 않고 감각이 둔할 수 있어, 침 자리의 위생과 찜질·뜸의 열 자극을 더 조심해야 하고 한약도 혈당에 영향을 주는 약재를 고려해 처방합니다.",
    about: [
      "발에 상처나 궤양이 있으면 그 주변에는 치료하지 않습니다. 당뇨약이나 인슐린을 쓰시면 한약과 함께 드실 때 혈당 변화를 살펴야 합니다.",
    ],
    needsTests: ["발에 낫지 않는 상처, 색이 변한 부위가 있을 때 — 내과·외과 검사가 필요합니다"],
    see: ["herb-drug", "moxibustion"],
  },
];
