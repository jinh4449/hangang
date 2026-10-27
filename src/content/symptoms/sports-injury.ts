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
          { name: "러너스 니", glossarySlug: "runners-knee" },
          { name: "장경인대 증후군", glossarySlug: "itb-syndrome" },
          { name: "신스플린트(신스프린트)", glossarySlug: "shin-splints" },
        ],
      },
      {
        sport: "골프",
        lede: "한쪽으로 세게 비트는 스윙이 팔꿈치 안쪽과 허리, 어깨에 몰립니다.",
        conditions: [
          { name: "골프엘보", glossarySlug: "golfers-elbow" },
          { name: "허리 염좌", glossarySlug: "lumbar-sprain" },
          { name: "회전근개 힘줄염", glossarySlug: "rotator-cuff" },
          { name: "손목 힘줄염", glossarySlug: "wrist-tendinitis" },
        ],
      },
      {
        sport: "테니스 · 배드민턴 · 탁구",
        lede: "라켓을 쥐고 젖히는 손목, 갑자기 멈추고 도는 발놀림이 많습니다.",
        conditions: [
          { name: "테니스엘보", glossarySlug: "tennis-elbow" },
          { name: "어깨 충돌증후군", glossarySlug: "shoulder-impingement" },
          { name: "종아리 근육 손상", glossarySlug: "calf-strain" },
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
          { name: "손목 힘줄염", glossarySlug: "wrist-tendinitis" },
        ],
      },
      {
        sport: "축구 · 풋살 · 농구",
        lede: "뛰다 멈추고 방향을 틀고 부딪혀 발목·무릎·허벅지 손상이 많습니다.",
        conditions: [
          { name: "발목 염좌", glossarySlug: "ankle-sprain" },
          { name: "무릎 내측 인대 손상", glossarySlug: "ligament" },
          { name: "햄스트링 손상", glossarySlug: "hamstring-strain" },
          { name: "슬개건염", glossarySlug: "patellar-tendinitis" },
        ],
      },
    ],

    /* 자가 확인. 아픈 곳 → 가장 가까운 느낌 → 「이 질환일 수 있습니다」.
       진단이 아니라 짐작을 돕는 것이므로 결과는 「가능성」 으로 말하고,
       정확한 진단은 진찰과 초음파로 한다는 말을 늘 붙인다 */
    checker: {
      title: "내 증상, 어떤 손상일까요?",
      note: "아픈 곳을 고르고 세 가지 질문에 답하시면 가능성이 높은 손상을 알려 드립니다.",
      areas: [
        {
          key: "shoulder", label: "어깨",
          conditions: [
            { key: "si", name: "어깨 충돌증후군", ultrasound: true, href: "/glossary/shoulder-impingement",
              desc: "팔을 들 때 어깨 힘줄이 뼈 사이에 끼이며 아픈 상태입니다. 서브·스매싱·숄더프레스처럼 팔을 머리 위로 드는 운동에서 흔합니다." },
            { key: "rc", name: "회전근개 손상", ultrasound: true, href: "/glossary/rotator-cuff",
              desc: "어깨를 감싸 움직이는 힘줄(회전근개)에 염증이나 부분 손상이 생긴 상태입니다. 초음파로 힘줄 상태를 바로 확인할 수 있습니다." },
            { key: "ca", name: "석회성 건염", ultrasound: true, href: "/glossary/calcific-tendinitis",
              desc: "힘줄에 쌓인 석회 주변에 염증이 생기며 갑자기 심하게 아픈 상태입니다. 초음파로 석회의 위치와 크기를 확인합니다." },
          ],
          questions: [
            { q: "어디가 아픈가요?", options: [
              { label: "어깨 앞이나 옆 위쪽", scores: { si: 2, rc: 1 } },
              { label: "어깨 안쪽 깊은 곳이 전체적으로", scores: { rc: 2, ca: 1 } },
              { label: "한 곳이 찌르듯이 심하게", scores: { ca: 2 } },
            ]},
            { q: "언제 가장 아픈가요?", options: [
              { label: "팔을 옆으로 들어 올릴 때 특정 높이에서", scores: { si: 2 } },
              { label: "밤에 아픈 쪽으로 누우면", scores: { rc: 2, ca: 1 } },
              { label: "가만히 있어도 아프다", scores: { ca: 2 } },
            ]},
            { q: "어떻게 시작됐나요?", options: [
              { label: "운동을 늘리면서 서서히", scores: { si: 1, rc: 1 } },
              { label: "무거운 것을 들거나 던지다가 뜨끔", scores: { rc: 2 } },
              { label: "며칠 사이에 갑자기 심해졌다", scores: { ca: 2 } },
            ]},
          ],
        },
        {
          key: "elbow", label: "팔꿈치",
          conditions: [
            { key: "te", name: "테니스엘보", ultrasound: true, href: "/glossary/tennis-elbow",
              desc: "손목을 젖히는 근육의 힘줄이 팔꿈치 바깥쪽에 붙는 자리에 손상과 염증이 생긴 상태입니다." },
            { key: "go", name: "골프엘보", ultrasound: true, href: "/glossary/golfers-elbow",
              desc: "손목을 굽히는 근육의 힘줄이 팔꿈치 안쪽에 붙는 자리에 손상과 염증이 생긴 상태입니다." },
          ],
          questions: [
            { q: "팔꿈치 어느 쪽이 아픈가요?", options: [
              { label: "바깥쪽 (엄지 쪽)", scores: { te: 3 } },
              { label: "안쪽 (새끼손가락 쪽)", scores: { go: 3 } },
              { label: "잘 모르겠다", scores: {} },
            ]},
            { q: "어떤 동작에서 아픈가요?", options: [
              { label: "손목을 뒤로 젖힐 때, 문고리를 돌릴 때", scores: { te: 2 } },
              { label: "손목을 굽히거나 꽉 쥘 때", scores: { go: 2 } },
              { label: "컵이나 가방을 들 때", scores: { te: 1, go: 1 } },
            ]},
            { q: "주로 하는 운동은 무엇인가요?", options: [
              { label: "테니스 · 배드민턴 · 탁구", scores: { te: 1 } },
              { label: "골프 · 턱걸이 · 클라이밍", scores: { go: 1 } },
              { label: "헬스 · 그 밖의 운동", scores: { te: 1, go: 1 } },
            ]},
          ],
        },
        {
          key: "wrist", label: "손목 · 손",
          conditions: [
            { key: "wt", name: "손목 힘줄염", ultrasound: true, href: "/glossary/wrist-tendinitis",
              desc: "손목을 젖히거나 비트는 동작이 반복되어 손목 힘줄에 염증이 생긴 상태입니다." },
            { key: "ct", name: "손목터널증후군", ultrasound: true, href: "/glossary/carpal-tunnel",
              desc: "손목 안쪽 통로에서 신경이 눌려 손가락이 저린 상태입니다. 그립을 오래 쥐는 운동에서 심해질 수 있습니다." },
            { key: "ws", name: "손목 염좌", href: "/glossary/ligament",
              desc: "넘어지며 손을 짚거나 손목이 꺾여 손목 인대가 늘어나거나 다친 상태입니다. 뼈에 금이 가지 않았는지 함께 확인합니다." },
          ],
          questions: [
            { q: "어떤 증상이 가장 큰가요?", options: [
              { label: "손목이 아프다", scores: { wt: 2, ws: 1 } },
              { label: "손가락이 저리다", scores: { ct: 3 } },
              { label: "붓고 멍이 들었다", scores: { ws: 2 } },
            ]},
            { q: "언제 심한가요?", options: [
              { label: "바닥을 짚거나 손목을 젖힐 때", scores: { wt: 2, ws: 1 } },
              { label: "밤이나 새벽에 저려서 깬다", scores: { ct: 2 } },
              { label: "손목을 조금만 움직여도 아프다", scores: { ws: 2 } },
            ]},
            { q: "어떻게 시작됐나요?", options: [
              { label: "운동을 반복하면서 서서히", scores: { wt: 2, ct: 1 } },
              { label: "넘어지거나 꺾인 날부터", scores: { ws: 3 } },
              { label: "잘 모르겠다", scores: {} },
            ]},
          ],
        },
        {
          key: "back", label: "허리",
          conditions: [
            { key: "ls", name: "허리 염좌", href: "/glossary/lumbar-sprain",
              desc: "허리 근육과 인대가 갑자기 늘어나거나 다친 상태입니다. 데드리프트·스쿼트·골프 스윙 뒤에 흔합니다." },
            { key: "ld", name: "허리디스크", href: "/glossary/lumbar-disc",
              desc: "추간판이 밀려나와 신경을 자극해 다리까지 저린 상태일 수 있습니다. 다리에 힘이 빠지는 느낌이 있으면 영상 검사를 함께 권해 드립니다." },
            { key: "mf", name: "근막통증", href: "/glossary/myofascial-pain",
              desc: "운동으로 지친 허리 근육과 근막이 뭉쳐 띠처럼 당기며 아픈 상태입니다. 뭉친 곳을 누르면 아프면서 시원한 것이 특징입니다." },
          ],
          questions: [
            { q: "어디가 아픈가요?", options: [
              { label: "허리 가운데나 양옆만", scores: { ls: 2, mf: 1 } },
              { label: "엉덩이나 다리까지 저림이 뻗친다", scores: { ld: 3 } },
              { label: "한쪽 근육이 띠처럼 당긴다", scores: { mf: 2 } },
            ]},
            { q: "언제 심한가요?", options: [
              { label: "들거나 몸을 비틀 때", scores: { ls: 2 } },
              { label: "오래 앉아 있거나 허리를 숙일 때 다리가 당긴다", scores: { ld: 2 } },
              { label: "아침에 뻣뻣하고 움직이면 풀린다", scores: { mf: 2 } },
            ]},
            { q: "어떻게 시작됐나요?", options: [
              { label: "운동 중에 삐끗했다", scores: { ls: 2 } },
              { label: "서서히 시작됐고 기침할 때 다리가 울린다", scores: { ld: 2 } },
              { label: "운동한 다음 날부터 뻐근하다", scores: { mf: 1, ls: 1 } },
            ]},
          ],
        },
        {
          key: "knee", label: "무릎",
          conditions: [
            { key: "pt", name: "슬개건염", ultrasound: true, href: "/glossary/patellar-tendinitis",
              desc: "무릎뼈 아래 힘줄에 반복된 부담으로 염증이 생긴 상태입니다. 점프·러닝이 많은 운동에서 흔합니다." },
            { key: "rk", name: "러너스 니", href: "/glossary/runners-knee",
              desc: "무릎뼈와 허벅지뼈가 맞닿는 자리에 부담이 쌓여 무릎 앞이 시큰한 상태입니다. 달리기를 늘린 뒤에 흔합니다." },
            { key: "pa", name: "거위발건염", ultrasound: true, href: "/glossary/pes-anserine",
              desc: "무릎 안쪽 아래에 모이는 세 힘줄과 그 아래 점액낭에 염증이 생긴 상태입니다." },
            { key: "it", name: "장경인대 증후군", ultrasound: true, href: "/glossary/itb-syndrome",
              desc: "허벅지 바깥쪽 긴 띠(장경인대)가 무릎 바깥에서 쓸리며 아픈 상태입니다. 러너에게 흔합니다." },
            { key: "mc", name: "무릎 내측 인대 손상", ultrasound: true, href: "/glossary/ligament",
              desc: "무릎 안쪽 인대가 늘어나거나 일부 찢어진 상태입니다. 무릎이 빠지는 느낌이 있으면 MRI를 함께 권해 드립니다." },
          ],
          questions: [
            { q: "무릎 어디가 아픈가요?", options: [
              { label: "무릎뼈 바로 아래", scores: { pt: 3 } },
              { label: "무릎뼈 주변 앞쪽 전체", scores: { rk: 3 } },
              { label: "무릎 안쪽", scores: { pa: 2, mc: 2 } },
              { label: "무릎 바깥쪽", scores: { it: 3 } },
            ]},
            { q: "언제 가장 아픈가요?", options: [
              { label: "점프하거나 계단을 오를 때", scores: { pt: 2 } },
              { label: "계단·내리막을 내려가거나 오래 앉았다 일어설 때", scores: { rk: 2, pa: 1 } },
              { label: "일정 거리 이상 달리면", scores: { it: 2, rk: 1 } },
              { label: "비틀거나 옆에서 힘을 받을 때", scores: { mc: 2 } },
            ]},
            { q: "어떻게 시작됐나요?", options: [
              { label: "운동량을 늘리면서 서서히", scores: { pt: 1, rk: 1, pa: 1, it: 1 } },
              { label: "부딪히거나 꺾인 뒤부터", scores: { mc: 3 } },
              { label: "잘 모르겠다", scores: {} },
            ]},
          ],
        },
        {
          key: "ankle", label: "발목 · 발",
          conditions: [
            { key: "as", name: "발목 염좌", ultrasound: true, href: "/glossary/ankle-sprain",
              desc: "발목 인대가 늘어나거나 일부 찢어진 상태입니다. 초음파로 인대 손상 정도를 확인하고 쉬는 기간을 정합니다." },
            { key: "pf", name: "족저근막염", ultrasound: true, href: "/glossary/plantar-fasciitis",
              desc: "발바닥을 받치는 근막이 뒤꿈치에 붙는 자리에 염증이 생긴 상태입니다. 러닝을 늘린 뒤에 흔합니다." },
            { key: "ac", name: "아킬레스건염", ultrasound: true, href: "/glossary/achilles-tendinitis",
              desc: "종아리 근육과 발뒤꿈치를 잇는 아킬레스건에 반복된 부담으로 염증이 생긴 상태입니다." },
          ],
          questions: [
            { q: "어디가 아픈가요?", options: [
              { label: "발목 바깥쪽 복숭아뼈 주변", scores: { as: 3 } },
              { label: "발뒤꿈치 바닥", scores: { pf: 3 } },
              { label: "발목 뒤 굵은 힘줄", scores: { ac: 3 } },
            ]},
            { q: "언제 아픈가요?", options: [
              { label: "접질린 뒤 걸을 때마다", scores: { as: 2 } },
              { label: "아침 첫발, 오래 앉았다 일어설 때", scores: { pf: 2, ac: 1 } },
              { label: "뛰기 시작할 때, 까치발을 들 때", scores: { ac: 2 } },
            ]},
            { q: "지금 모습은 어떤가요?", options: [
              { label: "붓고 멍이 들었다", scores: { as: 2 } },
              { label: "걷다 보면 조금 풀린다", scores: { pf: 1, ac: 1 } },
              { label: "힘줄이 두툼하게 만져진다", scores: { ac: 2 } },
            ]},
          ],
        },
        {
          key: "leg", label: "종아리 · 허벅지",
          conditions: [
            { key: "cs", name: "종아리 근육 손상", ultrasound: true, href: "/glossary/calf-strain",
              desc: "뛰거나 박차고 나갈 때 종아리 근육 일부가 늘어나거나 찢어진 상태입니다. 초음파로 손상 범위를 확인합니다." },
            { key: "hs", name: "햄스트링 손상", ultrasound: true, href: "/glossary/hamstring-strain",
              desc: "전력으로 뛰거나 다리를 크게 뻗을 때 허벅지 뒤 근육 일부가 늘어나거나 찢어진 상태입니다." },
            { key: "ss", name: "신스플린트", href: "/glossary/shin-splints",
              desc: "달리기 양이 갑자기 늘었을 때 정강이뼈 안쪽을 따라 근육이 붙는 자리에 염증이 생긴 상태입니다. 「신스프린트」라고도 부릅니다." },
            { key: "mf", name: "근막통증", href: "/glossary/myofascial-pain",
              desc: "운동 뒤 종아리나 허벅지 근육과 근막이 뭉쳐 당기며 아픈 상태입니다." },
          ],
          questions: [
            { q: "어디가 아픈가요?", options: [
              { label: "종아리", scores: { cs: 3, mf: 1 } },
              { label: "허벅지 뒤", scores: { hs: 3, mf: 1 } },
              { label: "정강이 안쪽 뼈를 따라", scores: { ss: 3 } },
            ]},
            { q: "어떻게 시작됐나요?", options: [
              { label: "뛰다가 「뚝」 하며 뜨끔했다", scores: { cs: 2, hs: 2 } },
              { label: "달리기 양을 늘린 뒤 서서히", scores: { ss: 2, mf: 1 } },
              { label: "운동 뒤 뭉치고 당긴다", scores: { mf: 2 } },
            ]},
            { q: "지금은 어떤가요?", options: [
              { label: "멍이 들었거나 힘을 주기 어렵다", scores: { cs: 1, hs: 1 } },
              { label: "뼈 가장자리를 누르면 아프다", scores: { ss: 2 } },
              { label: "뭉친 곳을 누르면 아프면서 시원하다", scores: { mf: 2 } },
            ]},
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
      { label: "문진 · 초음파", detail: "어떤 운동을 하다가, 어떤 동작에서 다쳤는지 여쭙고, 힘줄·인대 손상이 의심되면 초음파로 확인합니다. 골절이나 인대 완전 파열이 의심되면 영상 검사를 먼저 안내합니다." },
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
      a: "꼭 그렇지는 않습니다. 다친 직후에는 아픈 동작을 피하는 것이 좋지만, 손상 정도에 따라 해도 되는 운동이 있습니다. 진찰로 상태를 확인한 뒤 피할 동작과 해도 되는 동작을 나눠 말씀드립니다." },
    { q: "언제 다시 운동할 수 있나요?",
      a: "손상 부위와 정도에 따라 다릅니다. 통증 없이 일상 동작이 되고, 다친 동작을 가볍게 해 봐도 아프지 않을 때부터 운동량을 단계적으로 늘립니다. 진료하면서 복귀 시점을 함께 정합니다." },
    { q: "삐었을 때 바로 와도 되나요?",
      a: "네. 다친 직후에 오시면 어디가 얼마나 다쳤는지 먼저 확인하고, 붓기와 통증을 줄이는 치료를 시작합니다. 체중을 싣지 못할 만큼 아프면 뼈 검사를 먼저 안내해 드립니다." },
    { q: "같은 곳을 자꾸 다치는데 이유가 있나요?",
      a: "손상이 완전히 회복되기 전에 운동량을 올렸거나, 다친 뒤 바뀐 자세 때문에 같은 자리에 부담이 계속 몰리는 경우가 많습니다. 손상 부위와 함께 정렬과 움직임도 확인합니다." },
  ],

  compareSlugs: ["hanui-vs-ortho"],
};
