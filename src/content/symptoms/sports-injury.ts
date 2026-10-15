import type { Symptom } from "../types";

/**
 * 스포츠 손상.
 *
 * 「어떤 운동을 하다가」 로 찾아오므로 종목별로 나눠 세운다(care.bySport).
 * 종목마다 저희가 초음파로 확인하고 치료하는 힘줄·인대·근육·근막 손상만 담는다.
 * 골절이나 인대 완전 파열처럼 다른 진료가 먼저인 경우는 끝에 차분하게 안내한다.
 */
export const sportsInjury: Symptom = {
  slug: "sports-injury",
  department: "pain",
  name: "스포츠 손상",
  clinicalName: "힘줄·인대·근육 손상",
  summary: "러닝, 골프, 테니스, 헬스. 운동하다 다친 힘줄과 인대를 초음파로 확인하고 치료합니다.",

  care: {
    title: "스포츠 손상",
    lede:
      "러닝·골프·테니스·헬스·축구 중에 생긴 힘줄·인대·근육 손상을 봅니다. 미국 근골격계 초음파사(RMSK) " +
      "자격을 갖춘 원장이 삼성 V7 초음파로 손상 부위를 확인하고, 초음파 약침·침·체외충격파·도침·추나요법으로 " +
      "치료하며 운동 복귀 시점을 함께 정합니다.",
    leadLine:
      "운동하다 다친 힘줄·인대·근육을 초음파로 확인하고, 다시 운동할 수 있을 때까지 함께 봅니다.",
    partSlugs: ["shoulder", "elbow", "knee", "ankle", "low-back"],

    bySport: [
      {
        sport: "러닝 · 마라톤",
        lede: "같은 동작을 수만 번 되풀이해 발바닥부터 무릎까지 부담이 쌓입니다.",
        conditions: [
          { name: "족저근막염", glossarySlug: "plantar-fasciitis" },
          { name: "아킬레스건염", glossarySlug: "achilles-tendinitis" },
          { name: "러너스 니" },
          { name: "장경인대 증후군" },
          { name: "신스플린트" },
        ],
      },
      {
        sport: "골프",
        lede: "한쪽으로 세게 비트는 스윙이 팔꿈치 안쪽과 허리, 어깨에 몰립니다.",
        conditions: [
          { name: "골프엘보", glossarySlug: "golfers-elbow" },
          { name: "허리 염좌", glossarySlug: "lumbar-sprain" },
          { name: "회전근개 힘줄염", glossarySlug: "rotator-cuff" },
          { name: "손목 힘줄염" },
        ],
      },
      {
        sport: "테니스 · 배드민턴 · 탁구",
        lede: "라켓을 쥐고 젖히는 손목, 갑자기 멈추고 도는 발놀림이 많습니다.",
        conditions: [
          { name: "테니스엘보", glossarySlug: "tennis-elbow" },
          { name: "어깨 충돌증후군", glossarySlug: "shoulder-impingement" },
          { name: "종아리 근육 손상" },
          { name: "발목 염좌", glossarySlug: "ankle-sprain" },
        ],
      },
      {
        sport: "헬스 · 웨이트 · 크로스핏",
        lede: "무거운 무게를 드는 순간 어깨·허리·팔꿈치 힘줄에 큰 힘이 실립니다.",
        conditions: [
          { name: "어깨 충돌증후군", glossarySlug: "shoulder-impingement" },
          { name: "허리 염좌", glossarySlug: "lumbar-sprain" },
          { name: "팔꿈치 힘줄염", glossarySlug: "tennis-elbow" },
          { name: "손목 통증" },
        ],
      },
      {
        sport: "축구 · 풋살 · 농구",
        lede: "뛰다 멈추고 방향을 틀고 부딪혀 발목·무릎·허벅지 손상이 많습니다.",
        conditions: [
          { name: "발목 염좌", glossarySlug: "ankle-sprain" },
          { name: "무릎 내측 인대 손상", glossarySlug: "ligament" },
          { name: "햄스트링 손상" },
          { name: "슬개건염", glossarySlug: "patellar-tendinitis" },
        ],
      },
    ],

    /* 자가 확인. 아픈 곳 → 가장 가까운 느낌 → 「이 질환일 수 있습니다」.
       진단이 아니라 짐작을 돕는 것이므로 결과는 「가능성」 으로 말하고,
       정확한 진단은 진찰과 초음파로 한다는 말을 늘 붙인다 */
    checker: {
      title: "내 증상, 어떤 손상일까요?",
      note: "아픈 곳과 느낌을 차례로 누르시면 가능성이 높은 손상을 알려 드립니다.",
      areas: [
        {
          key: "shoulder", label: "어깨", question: "어떤 느낌에 가장 가깝나요?",
          options: [
            { label: "팔을 옆으로 들어 올릴 때 특정 각도에서 걸리듯 아프다",
              result: { name: "어깨 충돌증후군", desc: "팔을 들 때 어깨 힘줄이 뼈 사이에 끼이며 아픈 상태입니다. 서브·스매싱·숄더프레스처럼 팔을 머리 위로 드는 운동에서 흔합니다.", href: "/glossary/shoulder-impingement" } },
            { label: "던지거나 스윙한 뒤 어깨가 아프고, 밤에 누우면 더 아프다",
              result: { name: "회전근개 손상", desc: "어깨를 감싸 움직이는 힘줄(회전근개)에 염증이나 부분 손상이 생긴 상태입니다. 초음파로 힘줄 상태를 바로 확인할 수 있습니다.", href: "/glossary/rotator-cuff" } },
            { label: "갑자기 심하게 아파 팔을 거의 움직이지 못한다",
              result: { name: "석회성 건염", desc: "힘줄에 석회가 쌓였다가 염증이 생기며 갑자기 심하게 아픈 상태입니다. 초음파로 석회의 위치와 크기를 확인합니다.", href: "/glossary/calcific-tendinitis" } },
          ],
        },
        {
          key: "elbow", label: "팔꿈치", question: "어디가 아픈가요?",
          options: [
            { label: "바깥쪽이 아프다. 라켓을 쥐거나 문고리를 돌릴 때 심하다",
              result: { name: "테니스엘보", desc: "손목을 젖히는 근육의 힘줄이 팔꿈치 바깥쪽에 붙는 자리에 손상과 염증이 생긴 상태입니다.", href: "/glossary/tennis-elbow" } },
            { label: "안쪽이 아프다. 골프 스윙이나 턱걸이 때 심하다",
              result: { name: "골프엘보", desc: "손목을 굽히는 근육의 힘줄이 팔꿈치 안쪽에 붙는 자리에 손상과 염증이 생긴 상태입니다.", href: "/glossary/golfers-elbow" } },
          ],
        },
        {
          key: "wrist", label: "손목 · 손", question: "어떤 느낌에 가장 가깝나요?",
          options: [
            { label: "손목을 젖히거나 바닥을 짚을 때 아프다",
              result: { name: "손목 힘줄염", desc: "푸시업·임팩트처럼 손목에 체중이나 충격이 실리는 동작이 반복되며 손목 힘줄에 염증이 생긴 상태입니다.", href: "/glossary/tendon", linkLabel: "힘줄 손상 알아보기" } },
            { label: "손가락이 저리고 밤에 더 심하다",
              result: { name: "손목터널증후군", desc: "손목 안쪽 통로에서 신경이 눌려 손가락이 저린 상태입니다. 그립을 오래 쥐는 운동에서 심해질 수 있습니다.", href: "/glossary/carpal-tunnel" } },
          ],
        },
        {
          key: "back", label: "허리", question: "어떤 느낌에 가장 가깝나요?",
          options: [
            { label: "들거나 비틀다 삐끗했고, 허리만 아프다",
              result: { name: "허리 염좌", desc: "허리 근육과 인대가 갑자기 늘어나거나 다친 상태입니다. 데드리프트·스쿼트·골프 스윙 뒤에 흔합니다.", href: "/glossary/lumbar-sprain" } },
            { label: "엉덩이나 다리로 저림이 뻗친다",
              result: { name: "허리디스크", desc: "추간판이 밀려나와 신경을 자극해 다리까지 저린 상태일 수 있습니다. 힘이 빠지는 느낌이 있으면 영상 검사를 함께 권해 드립니다.", href: "/glossary/lumbar-disc" } },
          ],
        },
        {
          key: "knee", label: "무릎", question: "어디가, 언제 아픈가요?",
          options: [
            { label: "무릎 앞·아래가 아프다. 점프하거나 계단을 오를 때 심하다",
              result: { name: "슬개건염", desc: "무릎뼈 아래 힘줄에 반복된 부담으로 염증이 생긴 상태입니다. 점프·러닝이 많은 운동에서 흔합니다.", href: "/glossary/patellar-tendinitis" } },
            { label: "무릎 안쪽 아래가 아프다. 내리막을 내려갈 때 심하다",
              result: { name: "거위발건염", desc: "무릎 안쪽 아래에 모이는 세 힘줄과 그 아래 점액낭에 염증이 생긴 상태입니다.", href: "/glossary/pes-anserine" } },
            { label: "무릎 바깥쪽이 아프다. 일정 거리를 넘게 뛰면 시작된다",
              result: { name: "장경인대 증후군", desc: "허벅지 바깥쪽 긴 띠(장경인대)가 무릎 바깥에서 쓸리며 아픈 상태입니다. 러너에게 흔합니다.", href: "/part/knee", linkLabel: "무릎 통증 알아보기" } },
            { label: "꺾이거나 부딪힌 뒤 무릎 안쪽이 아프다",
              result: { name: "무릎 내측 인대 손상", desc: "무릎 안쪽 인대가 늘어나거나 일부 찢어진 상태입니다. 무릎이 빠지는 느낌이 있으면 MRI를 함께 권해 드립니다.", href: "/glossary/ligament", linkLabel: "인대 손상 알아보기" } },
          ],
        },
        {
          key: "ankle", label: "발목 · 발", question: "어떤 느낌에 가장 가깝나요?",
          options: [
            { label: "접질린 뒤 발목이 붓고 멍이 들었다",
              result: { name: "발목 염좌", desc: "발목 인대가 늘어나거나 일부 찢어진 상태입니다. 초음파로 인대 손상 정도를 확인하고 쉬는 기간을 정합니다.", href: "/glossary/ankle-sprain" } },
            { label: "아침 첫발을 디딜 때 발뒤꿈치가 찌릿하다",
              result: { name: "족저근막염", desc: "발바닥을 받치는 근막이 뒤꿈치에 붙는 자리에 염증이 생긴 상태입니다. 러닝을 늘린 뒤에 흔합니다.", href: "/glossary/plantar-fasciitis" } },
            { label: "발목 뒤 굵은 힘줄이 뻣뻣하고 아프다",
              result: { name: "아킬레스건염", desc: "종아리 근육과 발뒤꿈치를 잇는 아킬레스건에 반복된 부담으로 염증이 생긴 상태입니다.", href: "/glossary/achilles-tendinitis" } },
          ],
        },
        {
          key: "leg", label: "종아리 · 허벅지", question: "어떤 느낌에 가장 가깝나요?",
          options: [
            { label: "뛰다가 「뚝」 하며 뜨끔했고, 그 뒤로 힘을 주면 아프다",
              result: { name: "근육 손상 (종아리 · 햄스트링)", desc: "전력으로 뛰거나 갑자기 방향을 틀 때 근육 일부가 늘어나거나 찢어진 상태입니다. 초음파로 손상 범위를 확인합니다.", href: "/glossary/fascia", linkLabel: "근육·근막 알아보기" } },
            { label: "정강이 안쪽을 따라 욱신거린다",
              result: { name: "신스플린트", desc: "달리기 양이 갑자기 늘었을 때 정강이뼈 안쪽을 따라 근육이 붙는 자리에 염증이 생긴 상태입니다." } },
          ],
        },
      ],
    },

    signs: [
      "운동 중에 「뚝」 소리나 뜨끔한 느낌이 있었다",
      "다친 자리가 붓거나 멍이 들었다",
      "쉬면 괜찮다가 운동을 다시 하면 같은 자리가 아프다",
      "운동 시작할 때 뻣뻣하다가 몸이 풀리면 덜하다",
      "기록이나 무게를 올리면 통증이 따라온다",
      "통증 때문에 자세가 바뀌어 다른 곳까지 아프다",
    ],

    treatments: [
      {
        name: "초음파 진단 · 초음파 약침",
        icon: "ultrasound",
        covered: false,
        body:
          "손상된 힘줄·인대를 화면으로 확인하고, 그 자리를 보면서 약침을 놓습니다. " +
          "어디가 얼마나 다쳤는지 함께 보면서 쉬는 기간과 복귀 시점을 말씀드립니다.",
      },
      {
        name: "침 · 전침 · 부항",
        icon: "needle",
        covered: true,
        body: "다친 주변의 굳은 근육을 풀고 붓기와 통증을 가라앉힙니다. 건강보험이 적용되는 기본 치료입니다.",
      },
      {
        name: "체외충격파",
        icon: "shockwave",
        covered: false,
        body: "족저근막염, 아킬레스건염, 엘보처럼 오래된 힘줄 손상의 회복을 돕습니다.",
      },
      {
        name: "도침",
        icon: "needle",
        covered: false,
        body: "손상이 오래되어 힘줄 주변 조직이 들러붙고 굳은 경우, 유착을 떼어 냅니다.",
      },
      {
        name: "추나요법",
        icon: "hand",
        covered: true,
        body: "다친 뒤 틀어진 정렬과 한쪽으로 쏠린 자세를 바로잡아, 같은 자리에 부담이 몰리지 않게 합니다.",
      },
    ],
    treatmentsNote: "운동을 무조건 쉬게 하지 않습니다. 손상 정도에 따라 해도 되는 운동과 피할 운동을 나눠 말씀드립니다.",

    stages: [
      { label: "문진 · 초음파", detail: "어떤 운동을 하다가, 어떤 동작에서 다쳤는지 여쭙고, 손상 부위를 초음파로 확인합니다. 골절이나 인대 완전 파열이 의심되면 영상 검사를 먼저 안내합니다." },
      { label: "붓기 · 통증 줄이기", detail: "다친 직후에는 침과 약침으로 붓기와 통증을 먼저 가라앉힙니다. 이 시기에는 피할 동작을 구체적으로 알려 드립니다." },
      { label: "회복 치료", detail: "힘줄·인대 상태에 맞춰 초음파 약침, 체외충격파, 도침 가운데 필요한 치료를 이어 갑니다." },
      { label: "운동 복귀", detail: "통증 없이 할 수 있는 동작부터 단계적으로 운동량을 늘립니다. 같은 손상이 반복되지 않게 자세와 정렬도 함께 봅니다." },
    ],

    extraSections: [
      {
        title: "이럴 때는 영상 검사를 먼저 권해 드립니다",
        note: "대부분의 운동 손상은 해당하지 않습니다. 필요한 검사는 저희가 안내해 드립니다.",
        items: [
          { title: "체중을 싣기 어려울 만큼 아플 때", body: "뼈에 금이 갔는지 엑스레이로 먼저 확인합니다." },
          { title: "무릎이 빠지는 느낌이 들거나 크게 부었을 때", body: "십자인대·반월상연골 손상 여부를 MRI로 확인하는 것이 좋습니다." },
        ],
      },
    ],
  },

  // 비용은 이 과목에서 따로 안내하지 않는다
  cost: { lede: "", rows: [], insurance: [] },

  faq: [
    { q: "운동은 완전히 쉬어야 하나요?",
      a: "꼭 그렇지는 않습니다. 다친 직후에는 아픈 동작을 피하는 것이 좋지만, 손상 정도에 따라 해도 되는 운동이 있습니다. 초음파로 상태를 확인한 뒤 피할 동작과 해도 되는 동작을 나눠 말씀드립니다." },
    { q: "언제 다시 운동할 수 있나요?",
      a: "손상 부위와 정도에 따라 다릅니다. 통증 없이 일상 동작이 되고, 다친 동작을 가볍게 해 봐도 아프지 않을 때부터 운동량을 단계적으로 늘립니다. 진료하면서 복귀 시점을 함께 정합니다." },
    { q: "삐었을 때 바로 와도 되나요?",
      a: "네. 다친 직후에 오시면 어디가 얼마나 다쳤는지 먼저 확인하고, 붓기와 통증을 줄이는 치료를 시작합니다. 체중을 싣지 못할 만큼 아프면 뼈 검사를 먼저 안내해 드립니다." },
    { q: "정형외과에서 MRI를 찍었는데 가져가야 하나요?",
      a: "가지고 오시면 도움이 됩니다. 영상 결과와 초음파 화면을 함께 보면서 지금 상태와 치료 계획을 설명드립니다." },
    { q: "같은 곳을 자꾸 다치는데 이유가 있나요?",
      a: "손상이 완전히 회복되기 전에 운동량을 올렸거나, 다친 뒤 바뀐 자세 때문에 같은 자리에 부담이 계속 몰리는 경우가 많습니다. 손상 부위와 함께 정렬과 움직임도 확인합니다." },
  ],

  compareSlugs: ["hanui-vs-ortho"],
};
