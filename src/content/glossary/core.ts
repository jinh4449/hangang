import type { GlossaryTerm } from "./types";

/** 처음 연 23개. 기존 부위·치료 페이지의 문구에 맞춰 쓴 것들이다 */
export const CORE: GlossaryTerm[] = [
  {
    slug: "frozen-shoulder",
    term: "오십견",
    aka: ["유착성 관절낭염", "동결견"],
    english: "Adhesive capsulitis (Frozen shoulder)",
    category: "musculoskeletal",
    short:
      "오십견은 어깨 관절을 싸고 있는 관절낭이 두꺼워지고 굳어, 팔을 어느 방향으로 들어도 움직임이 막히는 상태입니다.",
    about: [
      "의학 용어로는 유착성 관절낭염이라고 합니다. 쉰 살 무렵에 많아 오십견이라 불리지만 40대와 60대에도 흔하고, 당뇨가 있으면 더 자주 생깁니다.",
      "아픈 시기, 굳는 시기, 풀리는 시기를 차례로 거치는 경우가 많고 전체 경과가 1년을 넘기도 합니다. 회전근개 손상과 증상이 비슷해 혼동되지만, 오십견은 남이 팔을 들어 줘도 올라가지 않는다는 점이 다릅니다.",
    ],
    signs: [
      "머리를 감거나 옷을 입을 때 팔이 올라가지 않는다",
      "밤에 어깨가 아파 잠을 깬다",
      "뒷주머니에 손을 넣기 어렵다",
    ],
    care:
      "초음파로 관절낭이 두꺼워진 자리와 힘줄 상태를 함께 확인합니다. 회전근개 문제인지 오십견인지 먼저 가려야 치료가 달라지기 때문입니다.",
    firstElsewhere: [
      "넘어지거나 부딪힌 직후 팔을 전혀 들 수 없을 때 — 골절이나 힘줄 파열 확인이 먼저입니다",
    ],
    partSlug: "shoulder",
    treatmentSlug: "ultrasound-pharmacopuncture",
    see: ["rotator-cuff", "pharmacopuncture"],
  },
  {
    slug: "rotator-cuff",
    term: "회전근개 손상",
    aka: ["회전근개 파열", "회전근개 건염"],
    english: "Rotator cuff injury",
    category: "musculoskeletal",
    short:
      "회전근개 손상은 어깨 관절을 붙잡고 돌리는 네 개의 힘줄(회전근개)에 염증이 생기거나 일부가 찢어진 상태입니다.",
    about: [
      "회전근개는 극상근, 극하근, 소원근, 견갑하근의 힘줄을 함께 부르는 말입니다. 팔을 머리 위로 드는 동작을 반복하거나 나이가 들며 힘줄이 약해지면 손상되기 쉽습니다.",
      "팔을 옆으로 들 때 특정 각도에서 걸리듯 아픈 것이 흔한 모습입니다. 오십견과 달리 남이 팔을 들어 주면 대개 끝까지 올라갑니다.",
    ],
    signs: [
      "팔을 옆으로 들 때 중간 각도에서 아프다",
      "아픈 쪽으로 누워 자기 어렵다",
      "물건을 선반 위로 올릴 때 힘이 빠진다",
    ],
    care:
      "초음파로 힘줄이 부어 있는지, 찢어진 곳이 있는지를 확인합니다. 부분 손상이면 그 자리를 찾아 약침을 놓고, 어깨가 앞으로 말린 자세를 함께 교정합니다.",
    firstElsewhere: [
      "다친 뒤 팔을 전혀 들어 올릴 수 없을 때 — 완전 파열 여부를 영상으로 확인해야 합니다",
    ],
    partSlug: "shoulder",
    treatmentSlug: "ultrasound-pharmacopuncture",
    see: ["frozen-shoulder", "calcific-tendinitis"],
  },
  {
    slug: "calcific-tendinitis",
    term: "석회성 건염",
    aka: ["어깨 석회", "석회화 건염"],
    english: "Calcific tendinitis",
    category: "musculoskeletal",
    short:
      "석회성 건염은 어깨 힘줄 안에 칼슘 덩어리(석회)가 쌓이고, 그 주변에 염증이 생겨 아픈 상태입니다.",
    about: [
      "석회가 있어도 아프지 않은 경우가 있고, 석회가 흡수되는 시기에 오히려 갑자기 심하게 아프기도 합니다. 밤에 잠을 못 잘 정도로 아프다가 몇 주에 걸쳐 가라앉는 경과가 흔합니다.",
    ],
    signs: ["특별히 다친 일 없이 어깨가 갑자기 심하게 아프다", "밤 통증이 심하다"],
    care:
      "석회는 초음파에 잘 보입니다. 석회의 위치와 크기, 주변 힘줄의 염증을 확인하고 치료 방향을 정합니다.",
    partSlug: "shoulder",
    treatmentSlug: "ultrasound-pharmacopuncture",
    see: ["rotator-cuff"],
  },
  {
    slug: "cervical-disc",
    term: "목디스크",
    aka: ["경추 추간판탈출증"],
    english: "Cervical disc herniation",
    category: "musculoskeletal",
    short:
      "목디스크는 목뼈 사이의 추간판이 밀려 나와 주변 신경을 누르면서, 목 통증과 함께 어깨·팔·손끝으로 저림이 퍼지는 상태입니다.",
    about: [
      "의학 용어로는 경추 추간판탈출증이라고 합니다. 고개를 숙인 자세를 오래 유지하는 생활과 관련이 깊습니다.",
      "목만 뻣뻣한 근육 문제와 달리, 팔로 내려가는 저림이나 손의 힘 빠짐이 함께 오는 것이 특징입니다. 다만 두 가지가 겹치는 경우가 많아 진찰로 나눠 봐야 합니다.",
    ],
    signs: ["한쪽 팔이나 손끝이 저리다", "고개를 뒤로 젖히면 저림이 심해진다"],
    care:
      "신경 증상의 정도를 먼저 확인합니다. 수술이 필요한 신호가 없으면 목 주변의 긴장을 풀고, 머리가 앞으로 나온 자세를 교정합니다.",
    firstElsewhere: [
      "손에 힘이 빠져 물건을 자주 떨어뜨릴 때",
      "걸을 때 다리가 휘청거릴 때 — 척수 압박일 수 있어 바로 검사가 필요합니다",
    ],
    partSlug: "neck",
    treatmentSlug: "chuna",
    see: ["forward-head", "lumbar-disc"],
  },
  {
    slug: "forward-head",
    term: "거북목증후군",
    aka: ["거북목", "일자목"],
    english: "Forward head posture",
    category: "musculoskeletal",
    short:
      "거북목증후군은 머리가 어깨보다 앞으로 나온 자세가 굳으면서 목과 어깨, 등 위쪽에 부담이 몰려 통증이 생기는 상태입니다.",
    about: [
      "머리가 앞으로 나올수록 목 뒤 근육이 버텨야 하는 무게가 커집니다. 모니터와 스마트폰을 오래 보는 생활에서 흔하게 생깁니다.",
      "뼈의 배열이 하루아침에 바뀌지는 않습니다. 굳은 관절의 움직임을 늘리고, 목을 버텨 주는 근육이 제 역할을 하도록 만드는 것이 목표입니다.",
    ],
    signs: [
      "어깨와 날개뼈 사이가 늘 뻐근하다",
      "뒷머리가 당기는 두통이 있다",
      "오래 앉아 있으면 목이 무겁다",
    ],
    care: "목만 치료하지 않고 굽은 등과 앞으로 말린 어깨를 함께 교정합니다.",
    partSlug: "neck",
    treatmentSlug: "chuna",
    see: ["cervical-disc", "chuna"],
  },
  {
    slug: "whiplash",
    term: "편타손상",
    aka: ["경추 염좌", "채찍질 손상"],
    english: "Whiplash injury",
    category: "accident",
    short:
      "편타손상은 교통사고처럼 몸이 갑자기 앞뒤로 흔들릴 때 목이 채찍처럼 젖혀졌다 숙여지면서 목 주변의 근육과 인대가 다치는 상태입니다.",
    about: [
      "사고 당일에는 괜찮다가 2~3일 뒤 목이 더 뻣뻣해지고 아픈 경우가 많습니다. 긴장한 상태에서는 통증을 덜 느끼고, 손상된 조직의 염증이 시간이 지나며 올라오기 때문입니다.",
      "엑스레이로는 뼈에 이상이 없다고 나와도 근육과 인대의 손상은 남아 있을 수 있습니다.",
    ],
    signs: ["사고 며칠 뒤 목이 돌아가지 않는다", "두통이나 어지럼이 함께 온다"],
    care:
      "초음파로 근육과 인대의 상태를 확인합니다. 교통사고 치료는 자동차보험으로 처리되어 본인부담금이 없습니다.",
    firstElsewhere: [
      "의식을 잃었거나 심한 두통·구토가 있을 때",
      "팔다리에 힘이 빠지거나 감각이 둔해졌을 때",
    ],
    partSlug: "neck",
    symptomSlug: "car-accident",
    compareSlug: "accident-hanui-vs-ortho",
    see: ["car-insurance-hanbang"],
  },
  {
    slug: "lumbar-disc",
    term: "허리디스크",
    aka: ["요추 추간판탈출증"],
    english: "Lumbar disc herniation",
    category: "musculoskeletal",
    short:
      "허리디스크는 허리뼈 사이의 추간판이 밀려 나와 신경을 누르면서, 허리 통증과 함께 엉덩이와 다리로 저림이 뻗치는 상태입니다.",
    about: [
      "의학 용어로는 요추 추간판탈출증이라고 합니다. 오래 앉아 있거나 허리를 굽힐 때 심해지고, 누우면 덜해지는 경우가 많습니다.",
      "다리 저림이 있어도 상당수는 수술 없이 보존치료로 좋아집니다. 다만 수술이 먼저 필요한 신호가 있어, 그것부터 가려냅니다.",
    ],
    signs: [
      "엉덩이에서 다리로 뻗치는 저림이 있다",
      "기침이나 재채기를 할 때 허리가 울린다",
      "오래 앉아 있으면 심해진다",
    ],
    care:
      "수술이 필요한 신호가 없는지 먼저 확인하고, 골반 정렬과 주변 조직의 염증을 함께 다룹니다.",
    firstElsewhere: [
      "대소변을 참기 어렵거나 회음부 감각이 둔해졌을 때 — 응급 수술이 필요한 신호입니다",
      "다리에 힘이 빠져 발을 들어 올리기 어려울 때",
    ],
    partSlug: "low-back",
    treatmentSlug: "chuna",
    compareSlug: "hanui-vs-ortho",
    see: ["spinal-stenosis", "sciatica"],
  },
  {
    slug: "spinal-stenosis",
    term: "척추관협착증",
    aka: ["요추관 협착증"],
    english: "Spinal stenosis",
    category: "musculoskeletal",
    short:
      "척추관협착증은 척추 안쪽의 신경이 지나는 통로(척추관)가 좁아져 신경이 눌리면서, 걸을 때 다리가 저리고 아파 쉬어 가야 하는 상태입니다.",
    about: [
      "나이가 들며 인대가 두꺼워지고 관절이 커지면서 생기는 경우가 많습니다. 조금 걷다가 다리가 저려 쉬면 나아지고, 다시 걸으면 저린 것이 반복되는 모습이 특징입니다.",
      "허리를 앞으로 숙이면 편해지고 뒤로 젖히면 심해지는 경향이 있어, 허리디스크와 반대인 경우가 많습니다.",
    ],
    signs: ["걷다가 쉬어야 다시 걸을 수 있다", "허리를 숙이고 걸으면 덜하다"],
    care: "신경 증상의 정도를 확인하고, 허리와 골반 주변의 부담을 줄이는 쪽으로 치료합니다.",
    firstElsewhere: ["다리 힘이 점점 빠지거나 대소변에 문제가 생겼을 때"],
    partSlug: "low-back",
    compareSlug: "hanui-vs-ortho",
    see: ["lumbar-disc", "sciatica"],
  },
  {
    slug: "sciatica",
    term: "좌골신경통",
    aka: ["궁둥신경통"],
    english: "Sciatica",
    category: "musculoskeletal",
    short:
      "좌골신경통은 허리에서 엉덩이를 지나 다리 뒤쪽으로 내려가는 좌골신경이 자극되어, 그 길을 따라 저림과 통증이 뻗치는 증상입니다.",
    about: [
      "병명이라기보다 증상의 이름입니다. 허리디스크나 척추관협착증이 원인인 경우가 많고, 엉덩이 깊은 곳의 이상근이 신경을 누르는 경우(이상근증후군)도 있습니다.",
      "원인에 따라 치료가 달라지므로, 저림이 어디서 시작되는지를 먼저 찾습니다.",
    ],
    signs: ["엉덩이부터 종아리까지 한쪽으로 저리다", "오래 앉으면 엉덩이가 아프다"],
    care:
      "허리에서 오는지, 엉덩이 깊은 근육에서 오는지를 진찰과 초음파로 나눠 봅니다.",
    firstElsewhere: ["양쪽 다리가 동시에 저리거나 힘이 빠질 때"],
    partSlug: "low-back",
    see: ["lumbar-disc", "spinal-stenosis"],
  },
  {
    slug: "pes-anserine",
    term: "거위발건염",
    aka: ["거위발 점액낭염", "거위발건 통증"],
    english: "Pes anserine tendinitis / bursitis",
    category: "musculoskeletal",
    short:
      "거위발건염은 무릎 안쪽 아래, 세 개의 힘줄이 거위 발 모양으로 모여 붙는 자리에 염증이 생겨 아픈 상태입니다.",
    about: [
      "계단을 오르내리거나 앉았다 일어설 때 무릎 안쪽 아래가 아픈 것이 흔한 모습입니다. 퇴행성 관절염으로 오해하기 쉽지만, 관절 안이 아니라 관절 밖 힘줄의 문제입니다.",
    ],
    signs: ["무릎 안쪽 아래를 누르면 아프다", "계단을 오를 때 무릎 안쪽이 아프다"],
    care: "초음파로 부어 있는 힘줄 부착부를 확인하고, 그 위치에 약침을 놓습니다.",
    partSlug: "knee",
    treatmentSlug: "ultrasound-pharmacopuncture",
    see: ["knee-oa"],
  },
  {
    slug: "knee-oa",
    term: "무릎 퇴행성 관절염",
    aka: ["무릎 관절염", "슬관절염"],
    english: "Knee osteoarthritis",
    category: "musculoskeletal",
    short:
      "무릎 퇴행성 관절염은 무릎 관절의 연골이 닳고 주변 뼈가 변하면서, 걷거나 앉았다 일어설 때 통증과 붓기가 생기는 상태입니다.",
    about: [
      "닳은 연골이 다시 자라지는 않습니다. 치료의 목표는 통증과 붓기를 줄이고, 무릎을 지탱하는 근육이 제 역할을 하도록 해서 일상의 불편을 줄이는 것입니다.",
      "무릎 주변 힘줄의 염증이 함께 있는 경우가 많아, 관절 자체의 문제와 힘줄 문제를 나눠 보는 것이 중요합니다.",
    ],
    signs: ["아침에 무릎이 뻣뻣하다", "오래 걸으면 붓는다", "쪼그려 앉기 어렵다"],
    care: "관절 안의 변화와 주변 힘줄 상태를 초음파로 함께 보고, 통증을 만드는 쪽부터 다룹니다.",
    firstElsewhere: ["무릎이 갑자기 붓고 열감이 있을 때", "다친 직후 체중을 실을 수 없을 때"],
    partSlug: "knee",
    see: ["pes-anserine"],
  },
  {
    slug: "tennis-elbow",
    term: "테니스엘보",
    aka: ["외측상과염", "팔꿈치 바깥쪽 힘줄염"],
    english: "Lateral epicondylitis (Tennis elbow)",
    category: "musculoskeletal",
    short:
      "테니스엘보는 손목을 젖히는 근육의 힘줄이 팔꿈치 바깥쪽 뼈에 붙는 자리에 손상과 염증이 생겨 아픈 상태입니다.",
    about: [
      "의학 용어로는 외측상과염이라고 합니다. 이름과 달리 운동보다 일에서 더 많이 옵니다. 주방일, 미용일, 마우스 사용처럼 손목을 쥐고 비트는 동작이 반복되면 생깁니다.",
      "팔꿈치 안쪽이 아픈 것은 골프엘보(내측상과염)라고 합니다. 힘줄은 근육보다 회복이 느려 몇 주 단위로 봐야 합니다.",
    ],
    signs: ["문고리를 돌리거나 물건을 들 때 아프다", "팔꿈치 바깥쪽을 누르면 아프다"],
    care:
      "초음파로 손상된 힘줄 부착부를 찾아 그 위치에 약침을 놓습니다. 이 부위는 위치가 조금만 벗어나도 차이가 큽니다.",
    firstElsewhere: ["손가락 감각이 둔해지거나 힘이 빠질 때", "다친 뒤 팔꿈치 모양이 변했을 때"],
    partSlug: "elbow",
    treatmentSlug: "ultrasound-pharmacopuncture",
  },
  {
    slug: "plantar-fasciitis",
    term: "족저근막염",
    aka: ["발바닥 근막염"],
    english: "Plantar fasciitis",
    category: "musculoskeletal",
    short:
      "족저근막염은 발뒤꿈치에서 발가락까지 이어지는 발바닥 근막에 반복해서 부담이 쌓여 염증과 통증이 생기는 상태입니다.",
    about: [
      "아침에 일어나 첫걸음을 뗄 때 발바닥이 가장 아프고, 몇 걸음 걸으면 덜해지는 것이 특징입니다. 자는 동안 짧아진 채 굳어 있던 근막이 갑자기 늘어나기 때문입니다.",
      "발은 체중을 그대로 받는 부위라 다른 곳보다 회복이 더딥니다.",
    ],
    signs: ["아침 첫걸음에 발뒤꿈치가 아프다", "오래 서 있으면 심해진다"],
    care:
      "초음파로 근막이 얼마나 두꺼워졌는지 확인하고, 종아리 근육의 긴장과 걷는 방식을 함께 봅니다.",
    firstElsewhere: ["당뇨가 있으면서 발에 상처나 궤양이 있을 때"],
    partSlug: "ankle",
    treatmentSlug: "ultrasound-pharmacopuncture",
  },
  {
    slug: "ankle-sprain",
    term: "발목 염좌",
    aka: ["발목 삠", "발목 인대 손상"],
    english: "Ankle sprain",
    category: "musculoskeletal",
    short:
      "발목 염좌는 발목이 안쪽이나 바깥쪽으로 꺾이면서 발목을 잡아 주는 인대가 늘어나거나 찢어진 상태입니다.",
    about: [
      "처음 다쳤을 때 늘어난 인대가 충분히 아물지 않으면 발목이 헐거워져 같은 쪽을 반복해서 접질리게 됩니다.",
    ],
    signs: ["같은 쪽 발목을 자주 접질린다", "고르지 않은 길에서 발목이 불안하다"],
    care: "인대 상태와 함께 발목을 잡아 주는 근육이 제때 반응하는지를 봅니다.",
    firstElsewhere: [
      "발을 딛을 수 없을 정도로 아플 때",
      "발목이 심하게 붓고 멍이 넓게 퍼졌을 때 — 골절 확인이 먼저입니다",
    ],
    partSlug: "ankle",
  },
  {
    slug: "functional-dyspepsia",
    term: "기능성 소화불량",
    aka: ["신경성 위염", "체기"],
    english: "Functional dyspepsia",
    category: "internal",
    short:
      "기능성 소화불량은 내시경 같은 검사에서 뚜렷한 이상이 없는데도 명치 통증, 더부룩함, 이른 포만감이 반복되는 상태입니다.",
    about: [
      "검사에서 이상이 없다는 말을 듣고도 불편이 계속되는 경우가 많습니다. 위가 음식을 받아들이고 내려보내는 움직임과 예민함이 함께 관여하는 것으로 봅니다.",
      "식사 습관, 수면, 스트레스와 맞물려 좋아졌다 나빠졌다를 반복하는 경우가 흔합니다.",
    ],
    signs: ["조금만 먹어도 배가 부르다", "식후에 오래 더부룩하다", "명치가 답답하다"],
    firstElsewhere: [
      "체중이 이유 없이 빠질 때",
      "검은 변을 보거나 피를 토했을 때",
      "삼키기가 점점 어려워질 때 — 내시경 검사가 먼저입니다",
    ],
    symptomSlug: "indigestion",
    treatmentSlug: "herbal",
  },

  {
    slug: "chuna",
    term: "추나요법",
    aka: ["추나", "추나치료"],
    english: "Chuna manual therapy",
    category: "treatment",
    short:
      "추나요법은 한의사가 손으로 척추와 골반, 관절을 밀고 당겨 틀어진 정렬과 굳은 움직임을 바로잡는 한방 치료입니다.",
    about: [
      "2019년부터 건강보험이 적용되어, 근골격계 질환에 연 20회까지 급여로 받을 수 있습니다.",
      "한쪽 허리만 반복해서 아프거나 한쪽 무릎만 시큰한 경우처럼, 아픈 자리보다 정렬에 원인이 있는 경우에 함께 씁니다. 손으로 하는 치료라는 점은 도수치료와 같지만 시행하는 사람과 보험 적용 방식이 다릅니다.",
    ],
    care:
      "염증이 뚜렷한 시기에는 약침으로 염증을 줄이고, 추나요법으로 압력이 몰리는 구조를 함께 다룹니다.",
    treatmentSlug: "chuna",
    compareSlug: "chuna-vs-manual",
    see: ["chuna-insurance"],
  },
  {
    slug: "pharmacopuncture",
    term: "약침",
    aka: ["약침요법"],
    english: "Pharmacopuncture",
    category: "treatment",
    short:
      "약침은 한약재에서 추출해 정제한 약액을 침처럼 경혈이나 병변 부위에 주입하는 한방 치료입니다.",
    about: [
      "침의 자극과 약액의 작용을 함께 쓰는 방법입니다. 염증이나 통증이 뚜렷한 부위에 씁니다.",
      "비급여 치료입니다. 교통사고 치료에서는 자동차보험으로 처리됩니다.",
    ],
    care:
      "손 감각에만 의존하지 않고 초음파로 보면서 놓습니다. 통증을 느끼는 자리와 실제로 문제가 생긴 조직이 다른 경우가 많기 때문입니다.",
    treatmentSlug: "ultrasound-pharmacopuncture",
    see: ["ultrasound-guided", "acupuncture"],
  },
  {
    slug: "ultrasound-guided",
    term: "초음파 유도 약침",
    aka: ["초음파 약침", "초음파 가이드 약침"],
    english: "Ultrasound-guided pharmacopuncture",
    category: "treatment",
    short:
      "초음파 유도 약침은 초음파 화면으로 바늘의 위치와 깊이를 실시간으로 확인하면서 문제가 생긴 조직에 약침을 놓는 방법입니다.",
    about: [
      "같은 어깨라도 표층 근막과 심부 힘줄은 깊이가 다릅니다. 화면으로 보면 바늘이 지금 어느 층에 있는지 확인할 수 있고, 혈관과 신경이 지나는 자리를 피할 수 있습니다.",
      "치료 전후를 같은 화면으로 비교할 수 있어, 계속 받을지 판단할 근거가 생깁니다.",
    ],
    care:
      "이진희 대표원장이 미국 근골격계 초음파사(RMSK) 자격을 갖추고 진료합니다. 화면은 환자분이 함께 보실 수 있는 자리에 둡니다.",
    firstElsewhere: ["추간판 내부나 신경 뿌리처럼 깊은 구조는 초음파로 보이지 않아 MRI 가 필요합니다"],
    treatmentSlug: "ultrasound-pharmacopuncture",
    see: ["pharmacopuncture", "rmsk"],
  },
  {
    slug: "acupuncture",
    term: "침 · 전침",
    aka: ["침치료", "전기침"],
    english: "Acupuncture / Electroacupuncture",
    category: "treatment",
    short:
      "침은 가는 바늘을 경혈이나 굳은 근육에 놓아 긴장을 풀고 순환을 돕는 치료이고, 전침은 놓은 침에 약한 전류를 흘려 자극을 더하는 방법입니다.",
    about: [
      "건강보험이 적용되는 치료입니다. 부항도 함께 쓰는 경우가 많습니다.",
      "굳어 있는 근육을 풀어 움직임 범위를 넓히고, 아픈 관절 주변의 부담을 줄이는 데 씁니다.",
    ],
    treatmentSlug: "acupuncture",
    see: ["pharmacopuncture"],
  },
  {
    slug: "herbal-medicine",
    term: "첩약",
    aka: ["한약", "탕약"],
    english: "Herbal decoction",
    category: "treatment",
    short:
      "첩약은 한의사가 환자의 상태를 진찰한 뒤 여러 한약재를 처방해 달여 만든 한약입니다.",
    about: [
      "같은 증상이라도 체질과 소화 상태, 수면, 기력에 따라 처방이 달라집니다. 통증 치료에서는 회복을 붙잡는 소화·수면·기력 문제를 함께 다룰 때 씁니다.",
      "한약이 간을 나쁘게 한다는 걱정이 많습니다. 한의사가 진찰하고 처방한 한약은 복용 중 이상이 있으면 바로 조정할 수 있습니다. 출처를 알 수 없는 약재를 직접 구해 드시는 것은 권하지 않습니다.",
    ],
    treatmentSlug: "herbal",
  },

  {
    slug: "chuna-insurance",
    question: "추나요법은 건강보험이 되나요",
    term: "추나요법 건강보험",
    aka: ["추나 급여", "추나 보험 적용"],
    category: "insurance",
    short:
      "추나요법은 근골격계 질환에 한해 건강보험이 적용되며, 한 사람이 1년에 20회까지 급여로 받을 수 있습니다.",
    about: [
      "단순 추나와 복잡 추나로 나뉘고, 본인부담금이 다릅니다. 연 20회를 넘기면 그 뒤로는 비급여가 됩니다.",
      "교통사고 치료로 받는 추나요법은 자동차보험으로 처리되어 건강보험 연 20회 한도와 따로 셉니다.",
    ],
    care: "본인부담금은 진료 전에 미리 말씀드립니다.",
    treatmentSlug: "chuna",
    symptomSlug: "pain",
    see: ["chuna", "car-insurance-hanbang"],
  },
  {
    slug: "car-insurance-hanbang",
    question: "교통사고 한의원 치료비는 누가 내나요",
    term: "교통사고 자동차보험 한방치료",
    aka: ["자보 한의원", "자동차보험 한방진료"],
    category: "accident",
    short:
      "교통사고로 다친 경우 한의원 치료도 자동차보험으로 처리되며, 환자가 내는 본인부담금은 없습니다.",
    about: [
      "침, 부항, 추나요법, 약침, 한약, 물리치료가 자동차보험 진료 범위에 들어갑니다. 보험사에 사고를 접수하고 받은 접수번호만 있으면 됩니다.",
      "사고 당일에는 괜찮다가 며칠 뒤 아파지는 경우가 많습니다. 증상이 있으면 합의 전에 치료를 받아 두시는 것이 좋습니다.",
    ],
    firstElsewhere: [
      "의식을 잃었거나 심한 두통·구토가 있을 때",
      "골절이 의심될 때 — 응급실이나 정형외과가 먼저입니다",
    ],
    symptomSlug: "car-accident",
    compareSlug: "accident-hanui-vs-ortho",
    see: ["whiplash"],
  },
  {
    slug: "rmsk",
    term: "RMSK",
    aka: ["근골격계 초음파사", "Registered in Musculoskeletal Sonography"],
    english: "Registered in Musculoskeletal Sonography",
    category: "exam",
    short:
      "RMSK 는 미국 초음파 인증기관(APCA/Inteleos)이 근골격계 초음파를 다루는 의료인에게 주는 자격으로, 근육·힘줄·인대·관절을 초음파로 판독하는 능력을 시험으로 확인합니다.",
    about: [
      "근골격 초음파는 같은 화면을 봐도 보는 사람에 따라 판단이 갈립니다. 자격은 일정한 기준으로 보고 판단하는 훈련을 거쳤다는 표시입니다.",
    ],
    care: "이진희 대표원장이 RMSK 자격을 갖추고 초음파 진료를 합니다.",
    see: ["ultrasound-guided"],
  },
];
