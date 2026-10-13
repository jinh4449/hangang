import type { GlossaryTerm } from "./types";

/** 근골격 질환. 부위 페이지의 conditions 에 있는 병명과 진료실에서 자주 듣는 병명 */
export const MUSCULOSKELETAL: GlossaryTerm[] = [
  {
    slug: "acute-neck-strain",
    term: "담 결림",
    aka: ["담 들었다", "목 담", "급성 경부 근육 긴장"],
    category: "musculoskeletal",
    short:
      "담 결림은 목이나 등, 날개뼈 주변 근육이 갑자기 뭉치고 굳어, 고개를 돌리거나 숨을 깊이 쉴 때 찌르듯 아픈 상태를 흔히 부르는 말입니다.",
    about: [
      "잠을 잘못 자거나 갑자기 무리한 동작을 한 뒤에 많이 생깁니다. 의학적으로는 근육의 급성 긴장이나 근막의 통증으로 설명합니다.",
      "대개 며칠 안에 풀리지만, 같은 자리에 반복되면 자세나 목·등의 정렬 문제를 함께 봐야 합니다.",
    ],
    signs: ["자고 일어났더니 고개가 한쪽으로 돌아가지 않는다", "날개뼈 안쪽이 숨 쉴 때 결린다"],
    care: "굳은 근육을 침과 부항으로 풀고, 같은 자리에 반복되면 등과 목의 정렬을 함께 봅니다.",
    needsTests: [
      "가슴 통증이 함께 있거나 숨이 차고 식은땀이 날 때 — 심장 검사가 필요하니 뇌 검사가 필요하니 바로 응급실로 가셔야 합니다",
    ],
    partSlug: "neck",
    treatmentSlug: "acupuncture",
    see: ["myofascial-pain", "forward-head"],
  },
  {
    slug: "myofascial-pain",
    term: "근막통증증후군",
    aka: ["근막통", "근막 통증"],
    english: "Myofascial pain syndrome",
    category: "musculoskeletal",
    short:
      "근막통증증후군은 근육과 그 막(근막) 안에 단단하게 뭉친 자리(통증 유발점)가 생기고, 그 자리를 누르면 아프면서 다른 곳까지 통증이 뻗치는 상태입니다.",
    about: [
      "어깨 위쪽, 목 뒤, 허리, 엉덩이 근육에 흔합니다. 뭉친 자리와 아픈 자리가 서로 떨어져 있는 경우가 많아, 아픈 곳만 주물러서는 잘 풀리지 않습니다.",
      "같은 자세를 오래 유지하거나 한쪽 근육을 반복해서 쓰는 생활과 관련이 깊습니다.",
    ],
    signs: ["어깨 위쪽에 딱딱한 덩어리가 만져진다", "누르면 다른 곳까지 울리듯 아프다"],
    care: "통증이 시작되는 자리를 진찰로 찾고, 필요하면 초음파로 근막의 상태를 확인한 뒤 침과 약침을 놓습니다.",
    treatmentSlug: "acupuncture",
    see: ["fascia", "acute-neck-strain"],
  },
  {
    slug: "cervicogenic-headache",
    term: "경추성 두통",
    aka: ["목 두통", "긴장성 두통"],
    english: "Cervicogenic headache",
    category: "musculoskeletal",
    short:
      "경추성 두통은 목뼈와 목 주변 근육·관절의 문제에서 시작해 뒤통수, 관자놀이, 눈 쪽으로 뻗치는 두통입니다.",
    about: [
      "목을 움직이거나 오래 같은 자세로 있을 때 두통이 달라지는 것이 단서가 됩니다. 한쪽으로 치우쳐 오는 경우가 많습니다.",
    ],
    signs: ["뒷목에서 시작해 머리로 올라오는 두통", "모니터를 오래 보면 심해진다"],
    care: "목과 등 위쪽의 긴장, 머리가 앞으로 나온 자세를 함께 봅니다.",
    needsTests: [
      "갑자기 생긴 평생 처음 겪는 심한 두통",
      "말이 어눌해지거나 한쪽 팔다리에 힘이 빠질 때 — 뇌 검사가 필요하니 바로 응급실로 가셔야 합니다",
    ],
    partSlug: "neck",
    see: ["forward-head", "cervical-disc"],
  },
  {
    slug: "shoulder-impingement",
    term: "어깨 충돌증후군",
    aka: ["충돌증후군", "견봉하 충돌"],
    english: "Shoulder impingement syndrome",
    category: "musculoskeletal",
    short:
      "어깨 충돌증후군은 팔을 들어 올릴 때 어깨 힘줄과 점액낭이 위쪽 뼈(견봉) 아래에 끼이고 부딪히면서 염증과 통증이 생기는 상태입니다.",
    about: [
      "팔을 옆으로 들 때 중간쯤의 각도에서 아프고, 그 각도를 지나면 덜해지는 경우가 많습니다. 오래 두면 회전근개 손상으로 이어질 수 있습니다.",
      "어깨가 앞으로 말리고 등이 굽은 자세에서는 힘줄이 지나는 공간이 좁아져 더 잘 생깁니다.",
    ],
    signs: ["팔을 옆으로 들 때 특정 각도에서 걸리듯 아프다", "선반 위 물건을 잡을 때 아프다"],
    care: "초음파로 힘줄과 점액낭이 부어 있는지 보고, 말린 어깨와 굽은 등을 함께 교정합니다.",
    partSlug: "shoulder",
    treatmentSlug: "ultrasound-pharmacopuncture",
    see: ["rotator-cuff", "bursa"],
  },
  {
    slug: "golfers-elbow",
    term: "골프엘보",
    aka: ["내측상과염", "팔꿈치 안쪽 힘줄염"],
    english: "Medial epicondylitis (Golfer's elbow)",
    category: "musculoskeletal",
    short:
      "골프엘보는 손목을 굽히고 주먹을 쥐는 근육의 힘줄이 팔꿈치 안쪽 뼈에 붙는 자리에 손상과 염증이 생겨 아픈 상태입니다.",
    about: [
      "의학 용어로는 내측상과염이라고 합니다. 골프보다 무거운 물건을 들거나 손목을 굽혀 힘을 주는 일을 반복할 때 더 흔합니다.",
      "팔꿈치 바깥쪽이 아픈 테니스엘보와 짝을 이루는 질환입니다.",
    ],
    signs: ["팔꿈치 안쪽을 누르면 아프다", "주먹을 꽉 쥐거나 물건을 들 때 아프다"],
    care: "초음파로 힘줄이 붙는 자리를 확인하고 그 위치에 약침을 놓습니다.",
    needsTests: ["넷째·다섯째 손가락이 저리거나 힘이 빠질 때 — 척골신경 문제를 확인해야 합니다"],
    partSlug: "elbow",
    treatmentSlug: "ultrasound-pharmacopuncture",
    see: ["tennis-elbow", "tendon"],
  },
  {
    slug: "carpal-tunnel",
    term: "손목터널증후군",
    aka: ["수근관증후군"],
    english: "Carpal tunnel syndrome",
    category: "musculoskeletal",
    short:
      "손목터널증후군은 손목 안쪽의 좁은 통로(손목터널)에서 정중신경이 눌려, 엄지·검지·중지 쪽이 저리고 감각이 둔해지는 상태입니다.",
    about: [
      "밤에 손이 저려 잠을 깨거나, 손을 털면 나아지는 경우가 많습니다. 손목을 많이 쓰는 일, 임신, 당뇨와 관련이 있습니다.",
      "목디스크로도 손이 저릴 수 있어, 저림이 어디서 시작되는지를 나눠 봐야 합니다.",
    ],
    signs: ["새벽에 손이 저려 깬다", "엄지 쪽 손가락 감각이 둔하다"],
    needsTests: [
      "엄지 아래 손바닥 근육이 눈에 띄게 줄었을 때 — 신경 손상이 진행된 것일 수 있어 신경 검사가 필요합니다",
    ],
    see: ["cervical-disc", "trigger-finger"],
  },
  {
    slug: "trigger-finger",
    term: "방아쇠수지",
    aka: ["방아쇠 손가락", "협착성 건초염"],
    english: "Trigger finger",
    category: "musculoskeletal",
    short:
      "방아쇠수지는 손가락을 굽히는 힘줄이 지나는 통로가 좁아져, 손가락을 펼 때 걸렸다가 딸깍 하고 펴지는 상태입니다.",
    about: [
      "아침에 더 심하고, 손바닥 쪽 손가락 뿌리를 누르면 아프거나 멍울이 만져집니다. 손을 쥐는 일을 반복하는 분에게 흔합니다.",
    ],
    signs: ["손가락을 펼 때 딸깍 걸린다", "손가락 뿌리 손바닥 쪽이 아프다"],
    needsTests: ["손가락이 굽은 채 펴지지 않을 때 — 정형외과 진찰로 시술이 필요한지 확인해야 합니다"],
    see: ["tendon", "carpal-tunnel"],
  },
  {
    slug: "piriformis",
    term: "이상근증후군",
    aka: ["궁둥구멍근 증후군"],
    english: "Piriformis syndrome",
    category: "musculoskeletal",
    short:
      "이상근증후군은 엉덩이 깊은 곳의 이상근이 굳거나 부어 그 아래를 지나는 좌골신경을 자극해, 엉덩이 통증과 다리 저림이 생기는 상태입니다.",
    about: [
      "허리디스크와 증상이 비슷해 혼동하기 쉽습니다. 오래 앉아 있으면 엉덩이 한가운데가 아프고, 허리는 비교적 괜찮은 경우에 의심합니다.",
    ],
    signs: ["오래 앉으면 엉덩이 깊은 곳이 아프다", "다리를 꼬고 앉기 어렵다"],
    care: "초음파로 이상근 주변을 확인하고, 깊은 부위라 보면서 약침을 놓습니다.",
    partSlug: "low-back",
    treatmentSlug: "ultrasound-pharmacopuncture",
    see: ["sciatica", "lumbar-disc"],
  },
  {
    slug: "si-joint",
    term: "천장관절 증후군",
    aka: ["천장관절 통증", "엉치 통증"],
    english: "Sacroiliac joint dysfunction",
    category: "musculoskeletal",
    short:
      "천장관절 증후군은 골반 뒤쪽에서 척추 끝(천골)과 골반뼈(장골)가 만나는 천장관절에 무리가 가서, 엉치와 허리 아래쪽이 아픈 상태입니다.",
    about: [
      "한쪽 엉치만 아프고, 그쪽 다리에 체중을 실을 때나 오래 앉았다 일어날 때 심해지는 경우가 많습니다. 출산 뒤나 한쪽으로 체중을 싣는 습관이 있을 때 흔합니다.",
    ],
    signs: ["한쪽 엉치뼈 부근이 아프다", "돌아누울 때나 계단을 오를 때 아프다"],
    care: "골반의 정렬을 확인하고 추나요법으로 틀어진 부분을 교정합니다.",
    partSlug: "low-back",
    treatmentSlug: "chuna",
    see: ["pelvis-alignment", "lumbar-sprain"],
  },
  {
    slug: "lumbar-sprain",
    term: "요추 염좌",
    aka: ["허리 삠", "허리 삐끗", "급성 요통"],
    english: "Lumbar sprain",
    category: "musculoskeletal",
    short:
      "요추 염좌는 허리를 갑자기 비틀거나 무거운 것을 들 때 허리 주변의 인대와 근육이 늘어나거나 다쳐 생기는 급성 허리 통증입니다.",
    about: [
      "흔히 「허리를 삐끗했다」고 하는 상태입니다. 대개 1~2주 안에 크게 줄어들고, 초기에 치료 간격을 좁게 잡을수록 회복이 빠릅니다.",
    ],
    signs: ["허리를 펴거나 숙이기 어렵다", "돌아눕거나 일어날 때 허리가 아프다"],
    care: "급성기에는 침과 약침으로 통증과 염증을 먼저 줄입니다.",
    needsTests: ["다리 저림이나 힘 빠짐이 함께 있을 때", "넘어지거나 부딪힌 뒤 생긴 통증일 때"],
    partSlug: "low-back",
    see: ["lumbar-disc", "ligament"],
  },
  {
    slug: "spondylolisthesis",
    term: "척추전방전위증",
    aka: ["척추 미끄러짐", "척추분리증"],
    english: "Spondylolisthesis",
    category: "musculoskeletal",
    short:
      "척추전방전위증은 위쪽 척추뼈가 아래쪽 척추뼈보다 앞으로 미끄러져 나가 허리 통증과 다리 저림이 생기는 상태입니다.",
    about: [
      "엑스레이로 확인합니다. 미끄러진 정도가 작고 신경 증상이 심하지 않으면 보존치료를 먼저 하는 경우가 많습니다.",
      "허리를 뒤로 젖힐 때 심해지고, 오래 서 있거나 걸을 때 다리가 저리는 모습이 척추관협착증과 비슷합니다.",
    ],
    needsTests: [
      "다리 힘이 빠지거나 대소변에 문제가 생겼을 때",
      "미끄러진 정도가 커서 수술 상담이 필요하다는 소견을 받았을 때",
    ],
    partSlug: "low-back",
    compareSlug: "hanui-vs-ortho",
    see: ["spinal-stenosis", "xray-mri"],
  },
  {
    slug: "patellar-tendinitis",
    term: "슬개건염",
    aka: ["점퍼스 니", "무릎 앞 힘줄염"],
    english: "Patellar tendinopathy",
    category: "musculoskeletal",
    short:
      "슬개건염은 무릎뼈(슬개골) 아래에서 정강이뼈로 이어지는 힘줄에 반복해서 부담이 쌓여 무릎 앞쪽이 아픈 상태입니다.",
    about: [
      "점프, 계단, 쪼그려 앉기처럼 무릎을 굽혔다 펴며 힘을 주는 동작에서 아픕니다. 무릎뼈 바로 아래를 누르면 아픈 것이 특징입니다.",
    ],
    signs: ["무릎뼈 바로 아래가 아프다", "계단을 내려갈 때 무릎 앞이 아프다"],
    care: "초음파로 힘줄이 두꺼워진 자리를 확인하고 그 위치에 약침을 놓습니다.",
    partSlug: "knee",
    treatmentSlug: "ultrasound-pharmacopuncture",
    see: ["tendon", "pes-anserine"],
  },
  {
    slug: "achilles-tendinitis",
    term: "아킬레스건염",
    aka: ["아킬레스건 통증"],
    english: "Achilles tendinopathy",
    category: "musculoskeletal",
    short:
      "아킬레스건염은 종아리 근육과 발뒤꿈치를 잇는 아킬레스건에 반복해서 부담이 쌓여 발뒤꿈치 위쪽이 아프고 두꺼워지는 상태입니다.",
    about: [
      "아침에 처음 걸을 때나 운동을 시작할 때 뻣뻣하고 아프다가 몸이 풀리면 덜해지는 경우가 많습니다. 갑자기 운동량을 늘렸을 때 흔합니다.",
    ],
    signs: ["발뒤꿈치 위 힘줄이 두껍게 만져진다", "까치발을 들 때 아프다"],
    care: "초음파로 힘줄의 두께와 염증을 확인하고, 종아리 근육의 긴장을 함께 풉니다.",
    needsTests: [
      "「뚝」 소리와 함께 갑자기 아프고 까치발을 들 수 없을 때 — 힘줄 파열일 수 있어 바로 초음파나 MRI 검사가 필요합니다",
    ],
    partSlug: "ankle",
    treatmentSlug: "ultrasound-pharmacopuncture",
    see: ["tendon", "plantar-fasciitis"],
  },
  {
    slug: "tmj",
    term: "턱관절 장애",
    aka: ["턱관절 통증", "턱에서 소리"],
    english: "Temporomandibular disorder (TMD)",
    category: "musculoskeletal",
    short:
      "턱관절 장애는 귀 앞에 있는 턱관절과 씹는 근육에 문제가 생겨, 입을 벌리거나 씹을 때 아프고 소리가 나거나 입이 잘 벌어지지 않는 상태입니다.",
    about: [
      "이를 악무는 습관, 이갈이, 한쪽으로만 씹는 습관, 긴장과 관련이 깊습니다. 목과 어깨의 긴장이 함께 있는 경우가 많습니다.",
    ],
    signs: ["입을 벌릴 때 딱 소리가 난다", "아침에 턱이 뻐근하다", "입이 손가락 세 개만큼 벌어지지 않는다"],
    needsTests: ["치아나 잇몸 통증이 함께 있을 때 — 치과 검사로 치아 문제를 확인해야 합니다"],
    see: ["forward-head", "myofascial-pain"],
  },
];
