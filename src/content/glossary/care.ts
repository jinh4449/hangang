import type { GlossaryTerm } from "./types";

/**
 * 한방 치료와 한약.
 *
 * 저희가 하지 않는 치료(뜸 등)도 이름은 풀어 둔다. 환자는 어디서든 그 말을
 * 듣고 검색한다. 다만 그런 항목에는 care 를 적지 않는다. 하지 않는 진료를
 * 하는 것처럼 읽히면 안 된다.
 */
export const CARE: GlossaryTerm[] = [
  // ── 한방 치료 ──
  {
    slug: "cupping",
    term: "부항",
    aka: ["부항요법", "건식 부항", "습식 부항"],
    english: "Cupping therapy",
    category: "treatment",
    short:
      "부항은 컵 안의 공기를 빼서 생긴 음압으로 피부와 근육을 끌어당겨, 뭉친 근육을 풀고 그 부위의 순환을 돕는 한방 치료입니다.",
    about: [
      "컵만 붙이는 건식 부항과, 피부에 작은 자극을 준 뒤 붙이는 습식 부항이 있습니다. 건강보험이 적용됩니다.",
      "치료 뒤 동그란 자국이 며칠 남을 수 있습니다. 멍과 달리 대개 일주일 안에 옅어집니다.",
    ],
    care: "침과 함께 목·어깨·허리의 굳은 근육에 씁니다.",
    cautions: ["항응고제를 드시거나 피부에 상처·염증이 있는 자리에는 하지 않습니다"],
    treatmentSlug: "acupuncture",
    see: ["acupuncture", "anticoagulant"],
  },
  {
    slug: "moxibustion",
    term: "뜸",
    aka: ["뜸치료", "구법"],
    english: "Moxibustion",
    category: "treatment",
    treatmentSlug: "acupuncture",
    short:
      "뜸은 쑥을 뭉쳐 경혈 위에서 태워 그 열로 자극을 주는 한방 치료입니다.",
    about: [
      "피부에 직접 닿지 않게 받침을 두는 간접구가 주로 쓰입니다. 배나 허리처럼 몸이 찬 부위에 많이 씁니다.",
      "화상의 위험이 있어 집에서 하실 때는 시간과 거리를 지키셔야 합니다. 당뇨로 감각이 둔한 분은 특히 조심해야 합니다.",
    ],
    see: ["meridian", "diabetes-acupuncture"],
  },
  {
    slug: "electroacupuncture",
    term: "전침",
    aka: ["전기침"],
    english: "Electroacupuncture",
    category: "treatment",
    short:
      "전침은 근육이나 경혈에 놓은 침에 약한 전류를 흘려, 침만 놓을 때보다 자극을 크고 고르게 주는 방법입니다.",
    about: [
      "전류의 세기와 빈도를 조절해 굳은 근육을 풀거나 통증을 줄이는 데 씁니다. 찌릿하거나 톡톡 치는 느낌이 납니다.",
    ],
    care: "목·허리처럼 큰 근육이 굳어 있을 때 침과 함께 씁니다.",
    cautions: ["심장 박동기를 쓰고 계시면 전침을 하지 않으니 미리 알려 주십시오"],
    treatmentSlug: "acupuncture",
    see: ["acupuncture"],
  },
  {
    slug: "hanbang-physio",
    term: "한방 물리요법",
    aka: ["한방 물리치료", "온열치료", "경피적외선"],
    category: "treatment",
    short:
      "한방 물리요법은 한의원에서 침 치료와 함께 하는 온열·적외선·전기 자극 같은 물리적 치료를 함께 부르는 말입니다.",
    about: [
      "근육을 데우고 긴장을 풀어 침이나 추나요법이 잘 들도록 돕는 역할입니다. 단독 치료라기보다 다른 치료와 함께 씁니다.",
    ],
    symptomSlug: "pain",
    see: ["acupuncture", "hot-cold-pack"],
  },

  // ── 한약 ──
  {
    slug: "herbal-forms",
    question: "탕약, 환, 엑스제는 무엇이 다른가요",
    term: "한약 제형",
    aka: ["탕약", "환약", "산제", "한약 엑스제"],
    category: "herb",
    treatmentSlug: "herbal",
    short:
      "한약 제형은 같은 처방을 어떤 모양으로 만드는지를 말하며, 달인 물약(탕약), 둥글게 빚은 알약(환), 가루(산), 농축 과립(엑스제)이 대표적입니다.",
    about: [
      "탕약은 몸에 빨리 흡수되고 처방을 사람마다 세밀하게 조정하기 좋습니다. 환과 엑스제는 들고 다니며 드시기 편하고 오래 보관할 수 있습니다.",
      "건강보험이 적용되는 한약은 주로 엑스제 같은 정해진 처방입니다.",
    ],
    see: ["herbal-medicine", "herbal-how-to-take"],
  },
  {
    slug: "herbal-how-to-take",
    question: "한약은 언제, 어떻게 먹나요",
    term: "한약 복용법",
    aka: ["한약 먹는 법", "한약 식전 식후"],
    category: "herb",
    treatmentSlug: "herbal",
    short:
      "한약은 대개 하루 두세 번 식사와 간격을 두고 따뜻하게 데워 드시며, 정확한 시간과 양은 처방한 한의사의 안내를 따르는 것이 원칙입니다.",
    about: [
      "소화가 약한 분은 식후에, 흡수를 빨리 봐야 하는 처방은 식간에 드시도록 안내하는 등 처방에 따라 다릅니다.",
      "택배로 받은 한약은 냉장 보관하고, 데울 때는 파우치째 따뜻한 물에 담가 두시면 됩니다. 전자레인지에 파우치째 넣으면 터질 수 있습니다.",
      "복용 중 설사, 두드러기, 속쓰림 같은 변화가 있으면 드시던 것을 멈추고 연락 주십시오.",
    ],
    see: ["herbal-medicine", "herb-drug"],
  },
  {
    slug: "herb-drug",
    question: "한약과 양약을 함께 먹어도 되나요",
    term: "한약과 양약 함께 복용",
    aka: ["한약 양약 같이", "한약 병용"],
    category: "herb",
    treatmentSlug: "herbal",
    short:
      "한약과 양약은 함께 드실 수 있는 경우가 많지만, 드시는 약을 한의사에게 모두 알려 처방에 반영하고 두 약 사이에 시간 간격을 두는 것이 원칙입니다.",
    about: [
      "혈압약, 당뇨약, 항응고제, 갑상선약처럼 꾸준히 드시는 약은 처방에 영향을 줄 수 있습니다. 약 봉투나 처방전을 가져오시면 정확합니다.",
      "보통 1~2시간 정도 간격을 두고 드시도록 안내합니다.",
    ],
    care: "첫 진료에서 드시는 약을 모두 확인하고 처방합니다.",
    see: ["anticoagulant", "herbal-how-to-take"],
  },
  {
    slug: "herbal-liver",
    question: "한약을 먹으면 간이 나빠지나요",
    term: "한약과 간",
    aka: ["한약 간 손상", "한약 간수치"],
    category: "herb",
    treatmentSlug: "herbal",
    short:
      "한약이 간을 해친다는 걱정이 많지만, 한의사가 진찰해 처방하고 복용 중 이상을 살피는 한약은 관리할 수 있는 범위에 있으며, 출처를 알 수 없는 약재를 직접 구해 먹는 경우가 더 위험합니다.",
    about: [
      "어떤 약이든 드물게 간에 부담을 줄 수 있고 한약도 예외는 아닙니다. 그래서 간 질환이 있거나 간 수치가 높았던 적이 있으면 처방 전에 알려 주셔야 합니다.",
      "복용 중 피로가 심해지거나 눈이 노래지고 소변 색이 짙어지면 복용을 멈추고 바로 연락 주십시오.",
    ],
    see: ["herbal-medicine", "herb-drug"],
  },
  {
    slug: "gongjindan",
    term: "공진단",
    aka: ["供辰丹"],
    category: "herb",
    treatmentSlug: "herbal",
    short:
      "공진단은 녹용, 당귀, 산수유에 사향(또는 목향)을 더해 꿀로 빚은 환약으로, 한의학에서 기력이 떨어졌을 때 쓰는 대표적인 보약 처방입니다.",
    about: [
      "한 알씩 씹거나 녹여 드시는 형태입니다. 사향이 들어간 것과 목향으로 대신한 것은 원료와 가격이 다릅니다.",
      "보약이라도 소화 상태나 열이 많은 체질에 따라 맞지 않을 수 있어, 진찰 후 드시는 것이 좋습니다.",
    ],
    symptomSlug: "fatigue",
    see: ["deer-antler", "qi-blood"],
  },
  {
    slug: "deer-antler",
    term: "녹용",
    aka: ["鹿茸"],
    category: "herb",
    treatmentSlug: "herbal",
    short:
      "녹용은 굳기 전의 어린 사슴뿔을 잘라 말린 한약재로, 한의학에서 기혈과 양기를 보하는 약재로 분류합니다.",
    about: [
      "뿔의 윗부분일수록 귀하게 여기며, 산지와 부위에 따라 등급과 가격이 다릅니다. 성장기 아이와 회복기 어른의 처방에 많이 들어갑니다.",
      "열이 많거나 감기 등으로 열이 나는 중에는 쓰지 않는 것이 원칙입니다.",
    ],
    see: ["gongjindan", "deficiency-excess"],
  },
];
