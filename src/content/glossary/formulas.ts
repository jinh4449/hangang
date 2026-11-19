import type { GlossaryTerm } from "./types";

/**
 * 자주 쓰는 한약 처방. 「보중익기탕이 뭐예요」처럼 처방 이름을 묻는 검색을 받는다.
 *
 * 출전은 처음 실린 책을 적는다. 출전이 문헌마다 갈리는 처방(예: 온담탕)은
 * 넣지 않았다. 틀린 출전이 인용되는 것이 출전이 없는 것보다 나쁘다.
 *
 * 의료광고법: 「낫는다」가 아니라 「~에 써 온 처방」으로 쓴다. 같은 이름의
 * 처방도 진찰 후 약재를 더하고 빼서 쓰므로, 처방 이름만 보고 고르지 않도록
 * cautions 에 그 점을 남긴다. 마황·대황·부자처럼 조심할 약재는 따로 적는다.
 */

const ADJUST = "같은 이름의 처방이라도 체질과 증상에 따라 약재를 더하고 빼서 씁니다. 드시는 약과 지병은 진찰 때 알려 주세요.";
const PREGNANT = "임신 중이거나 임신 가능성이 있으면 먼저 말씀해 주세요.";
const EPHEDRA = "마황이 들어 있어 심장 질환, 고혈압, 불면이 있거나 갑상선 약을 드시는 분은 진찰 후 용량을 정합니다.";

export const FORMULAS: GlossaryTerm[] = [
  {
    slug: "bojungikgi-tang",
    term: "보중익기탕",
    aka: ["補中益氣湯"],
    english: "Bojungikgi-tang",
    category: "formula",
    short:
      "보중익기탕은 금나라 이고(이동원)가 『내외상변혹론』과 『비위론』에 실은 처방으로, 비위가 약해 기운이 아래로 처지고 쉽게 지칠 때 써 온 한약입니다.",
    about: [
      "황기, 인삼, 백출, 감초, 당귀, 진피, 승마, 시호로 이루어집니다. 황기와 인삼이 기운을 보하고, 승마와 시호가 처진 기운을 끌어올리는 짜임입니다.",
      "밥맛이 없고 말하기도 귀찮을 만큼 기운이 없거나, 오래 서 있으면 아래로 처지는 느낌이 드는 분께 많이 씁니다.",
    ],
    signs: ["조금만 움직여도 쉽게 지친다", "밥맛이 없고 식후에 졸리다", "목소리에 힘이 없다", "큰 병이나 수술 뒤 기력이 돌아오지 않는다"],
    cautions: [ADJUST],
    symptomSlug: "fatigue",
    see: ["qi-blood", "spleen-stomach", "sagunja-tang"],
  },
  {
    slug: "sipjeondaebo-tang",
    term: "십전대보탕",
    aka: ["十全大補湯"],
    english: "Sipjeondaebo-tang",
    category: "formula",
    short:
      "십전대보탕은 송나라 『태평혜민화제국방』에 실린 처방으로, 기와 혈이 함께 부족할 때 써 온 대표적인 보약입니다.",
    about: [
      "기를 보하는 사군자탕(인삼·백출·복령·감초)과 혈을 보하는 사물탕(숙지황·당귀·작약·천궁)을 합하고, 황기와 육계를 더한 열 가지 약재로 이루어집니다.",
      "큰 병을 앓고 난 뒤, 출산 뒤처럼 기운과 혈이 모두 빠진 회복기에 많이 씁니다.",
    ],
    signs: ["얼굴빛이 창백하고 어지럽다", "몸이 차고 쉽게 지친다", "병을 앓고 난 뒤 회복이 더디다"],
    cautions: [ADJUST, "열이 많거나 감기 등으로 열이 날 때는 쓰지 않는 것이 원칙입니다."],
    symptomSlug: "fatigue",
    see: ["sagunja-tang", "samul-tang", "qi-blood"],
  },
  {
    slug: "ssanghwa-tang",
    term: "쌍화탕",
    aka: ["雙和湯"],
    english: "Ssanghwa-tang",
    category: "formula",
    short:
      "쌍화탕은 『동의보감』에 실린 처방으로, 몸과 마음을 함께 지나치게 써서 기혈이 상했을 때 써 온 한약입니다.",
    about: [
      "작약, 숙지황, 황기, 당귀, 천궁, 계피, 감초에 생강과 대추를 넣어 달입니다. 작약을 가장 많이 넣는 것이 특징입니다.",
      "흔히 감기약으로 알려져 있지만, 본래는 과로로 지친 몸의 기와 혈을 고르게 하는 처방입니다. 「쌍화」는 기와 혈 두 가지를 조화시킨다는 뜻입니다.",
    ],
    signs: ["무리한 뒤 몸이 쑤시고 나른하다", "잠을 자도 피로가 풀리지 않는다", "과로 뒤 식은땀이 난다"],
    cautions: [ADJUST],
    symptomSlug: "fatigue",
    see: ["qi-blood", "samul-tang"],
  },
  {
    slug: "socheongryong-tang",
    term: "소청룡탕",
    aka: ["小靑龍湯"],
    english: "Socheongryong-tang",
    category: "formula",
    short:
      "소청룡탕은 후한 장중경의 『상한론』에 실린 처방으로, 맑은 콧물과 재채기, 묽은 가래가 나오는 기침에 써 온 한약입니다.",
    about: [
      "마황, 계지, 작약, 세신, 건강, 감초, 오미자, 반하로 이루어집니다. 몸 안의 찬 기운과 묽은 수분(담음)을 덜어 내는 짜임입니다.",
      "찬 바람을 쐬면 콧물이 물처럼 흐르는 비염이나, 감기 뒤 묽은 가래가 이어질 때 많이 씁니다.",
    ],
    signs: ["물 같은 콧물이 계속 흐른다", "아침에 재채기가 몰아서 난다", "묽고 흰 가래가 나오는 기침"],
    cautions: [ADJUST, EPHEDRA],
    see: ["phlegm", "ephedra"],
  },
  {
    slug: "galgeun-tang",
    term: "갈근탕",
    aka: ["葛根湯"],
    english: "Galgeun-tang",
    category: "formula",
    short:
      "갈근탕은 『상한론』에 실린 처방으로, 감기 초기에 오한과 함께 뒷목과 어깨가 뻣뻣할 때 써 온 한약입니다.",
    about: [
      "갈근(칡뿌리)을 주로 하고 마황, 계지, 작약, 감초, 생강, 대추를 더합니다.",
      "땀이 나지 않으면서 으슬으슬 춥고 목덜미가 굳는 감기 초기에 씁니다. 목과 어깨가 굳는 증상에 응용하기도 합니다.",
    ],
    signs: ["으슬으슬 춥고 땀이 나지 않는다", "뒷목과 어깨가 뻣뻣하다", "감기 기운이 막 시작됐다"],
    cautions: [ADJUST, EPHEDRA],
    see: ["gyeji-tang", "ephedra"],
  },
  {
    slug: "gyeji-tang",
    term: "계지탕",
    aka: ["桂枝湯"],
    english: "Gyeji-tang",
    category: "formula",
    short:
      "계지탕은 『상한론』의 첫머리에 나오는 처방으로, 땀이 조금씩 나면서 바람을 싫어하는 허약한 감기에 써 온 한약입니다.",
    about: [
      "계지, 작약, 감초, 생강, 대추 다섯 가지로 이루어집니다. 몸 겉의 기운을 고르게 하는 기본 처방이라, 여기에 약재를 더한 처방이 많습니다.",
      "평소 몸이 약하고 땀이 잘 나는 분의 감기 초기에 씁니다.",
    ],
    signs: ["땀이 조금씩 나면서 으슬으슬하다", "바람을 쐬면 싫다", "평소 몸이 약하고 감기에 잘 걸린다"],
    cautions: [ADJUST],
    see: ["galgeun-tang", "sogeonjung-tang"],
  },
  {
    slug: "sosiho-tang",
    term: "소시호탕",
    aka: ["小柴胡湯"],
    english: "Sosiho-tang",
    category: "formula",
    short:
      "소시호탕은 『상한론』에 실린 처방으로, 추웠다 더웠다를 되풀이하고 입이 쓰며 옆구리가 답답할 때 써 온 한약입니다.",
    about: [
      "시호, 황금, 인삼, 반하, 감초, 생강, 대추로 이루어집니다.",
      "감기가 낫지 않고 오래 끌면서 입맛이 없고 메스꺼울 때, 몸의 겉과 속 사이에 걸린 기운을 풀어 주는 처방으로 씁니다.",
    ],
    signs: ["추웠다 더웠다를 되풀이한다", "입이 쓰고 목이 마르다", "옆구리 아래가 그득하고 메스껍다"],
    cautions: [ADJUST],
    see: ["banhasasim-tang"],
  },
  {
    slug: "banhasasim-tang",
    term: "반하사심탕",
    aka: ["半夏瀉心湯"],
    english: "Banhasasim-tang",
    category: "formula",
    short:
      "반하사심탕은 『상한론』에 실린 처방으로, 명치가 더부룩하게 막히고 메스꺼우며 장에서 꾸르륵 소리가 날 때 써 온 한약입니다.",
    about: [
      "반하, 황금, 황련, 건강, 인삼, 감초, 대추로 이루어집니다. 찬 약과 따뜻한 약을 함께 써 위장의 막힌 흐름을 푸는 짜임입니다.",
      "기능성 소화불량처럼 명치가 답답하고 속이 울렁거리면서 변이 묽어지는 분께 많이 씁니다.",
    ],
    signs: ["명치가 막힌 듯 더부룩하다", "속이 울렁거리고 메스껍다", "배에서 꾸르륵 소리가 나고 변이 묽다"],
    cautions: [ADJUST],
    symptomSlug: "indigestion",
    see: ["functional-dyspepsia", "spleen-stomach", "pyeongwi-san"],
  },
  {
    slug: "oryeong-san",
    term: "오령산",
    aka: ["五苓散"],
    english: "Oryeong-san",
    category: "formula",
    short:
      "오령산은 『상한론』에 실린 처방으로, 몸 안의 수분이 고르게 돌지 않아 붓거나 목이 마른데 소변이 시원치 않을 때 써 온 한약입니다.",
    about: [
      "택사, 저령, 복령, 백출, 계지 다섯 가지로 이루어집니다. 몸 안의 물길을 정리하는 기본 처방입니다.",
      "물을 마셔도 갈증이 가시지 않고 소변이 적으며 몸이 붓거나, 물을 마시면 바로 토하는 경우에 씁니다.",
    ],
    signs: ["목이 마른데 소변은 적다", "손발이나 얼굴이 잘 붓는다", "물을 마시면 속이 출렁인다"],
    cautions: [ADJUST],
    see: ["phlegm"],
  },
  {
    slug: "danggwijakyak-san",
    term: "당귀작약산",
    aka: ["當歸芍藥散"],
    english: "Danggwijakyak-san",
    category: "formula",
    short:
      "당귀작약산은 장중경의 『금궤요략』에 실린 처방으로, 혈이 부족하고 몸에 수분이 정체되어 아랫배가 아프고 잘 붓는 여성에게 써 온 한약입니다.",
    about: [
      "당귀, 작약, 천궁이 혈을 보하고 돌리며, 복령, 백출, 택사가 수분을 정리합니다.",
      "몸이 차고 어지러우며 잘 붓고, 생리 때 아랫배가 은근히 아픈 분께 많이 씁니다.",
    ],
    signs: ["손발이 차고 어지럽다", "몸이 잘 붓는다", "생리 때 아랫배가 은근히 아프다"],
    cautions: [ADJUST, PREGNANT],
    see: ["samul-tang", "gyejibokryeong-hwan"],
  },
  {
    slug: "gyejibokryeong-hwan",
    term: "계지복령환",
    aka: ["桂枝茯苓丸"],
    english: "Gyejibokryeong-hwan",
    category: "formula",
    short:
      "계지복령환은 『금궤요략』에 실린 처방으로, 아랫배에 어혈이 뭉쳐 생리통이 있고 아랫배를 누르면 아플 때 써 온 한약입니다.",
    about: [
      "계지, 복령, 목단피, 도인, 작약 다섯 가지를 가루 내어 환으로 빚습니다.",
      "생리 때 덩어리가 섞여 나오거나, 아랫배가 단단하고 누르면 아픈 어혈의 모습이 있을 때 씁니다.",
    ],
    signs: ["생리통이 있고 덩어리가 섞여 나온다", "아랫배를 누르면 아프다", "얼굴이 달아오르는데 발은 차다"],
    cautions: [ADJUST, "어혈을 푸는 처방이라 임신 중에는 쓰지 않는 것이 원칙입니다."],
    see: ["blood-stasis", "danggwijakyak-san"],
  },
  {
    slug: "yukmijihwang-hwan",
    term: "육미지황환",
    aka: ["六味地黃丸", "육미지황탕"],
    english: "Yukmijihwang-hwan",
    category: "formula",
    short:
      "육미지황환은 송나라 전을의 『소아약증직결』에 실린 처방으로, 신(腎)의 음이 부족해 허리와 무릎이 시큰하고 몸에 마른 열이 날 때 써 온 한약입니다.",
    about: [
      "숙지황, 산수유, 산약이 보하고, 택사, 목단피, 복령이 덜어 내어 여섯 가지가 짝을 이룹니다.",
      "본래 성장이 더딘 아이에게 쓰던 처방이었으나, 지금은 나이가 들며 허리가 약해지고 손발바닥이 화끈거리는 분께 많이 씁니다.",
    ],
    signs: ["허리와 무릎이 시큰하고 힘이 없다", "손발바닥이 화끈거린다", "입이 마르고 밤에 식은땀이 난다"],
    cautions: [ADJUST],
    see: ["palmijihwang-hwan", "deficiency-excess"],
  },
  {
    slug: "palmijihwang-hwan",
    term: "팔미지황환",
    aka: ["八味地黃丸", "신기환", "腎氣丸"],
    english: "Palmijihwang-hwan",
    category: "formula",
    short:
      "팔미지황환은 『금궤요략』의 신기환에서 온 처방으로, 신(腎)의 양기가 부족해 허리와 다리가 차고 밤에 소변을 자주 볼 때 써 온 한약입니다.",
    about: [
      "육미지황환에 계지(또는 육계)와 부자를 더한 여덟 가지로 이루어집니다. 몸을 데우는 약재가 더해진 것이 육미지황환과의 차이입니다.",
      "나이가 들며 허리 아래가 차고 힘이 빠지거나, 밤에 소변 때문에 자주 깨는 분께 많이 씁니다.",
    ],
    signs: ["허리와 다리가 차고 힘이 없다", "밤에 소변을 자주 본다", "아랫배가 차다"],
    cautions: [ADJUST, "부자가 들어 있어 열이 많은 체질에는 쓰지 않고, 용량을 진찰 후 정합니다."],
    see: ["yukmijihwang-hwan", "cold-heat"],
  },
  {
    slug: "sagunja-tang",
    term: "사군자탕",
    aka: ["四君子湯"],
    english: "Sagunja-tang",
    category: "formula",
    short:
      "사군자탕은 『태평혜민화제국방』에 실린 처방으로, 비위의 기운이 약해 입맛이 없고 쉽게 지칠 때 써 온 기를 보하는 기본 처방입니다.",
    about: [
      "인삼, 백출, 복령, 감초 네 가지로 이루어집니다. 성질이 치우치지 않고 부드러워 「군자」라는 이름이 붙었습니다.",
      "기를 보하는 처방 대부분이 이 처방을 바탕으로 합니다. 여기에 사물탕을 합하면 팔물탕, 다시 황기와 육계를 더하면 십전대보탕이 됩니다.",
    ],
    signs: ["입맛이 없고 조금만 먹어도 부르다", "변이 묽다", "말하기 귀찮을 만큼 기운이 없다"],
    cautions: [ADJUST],
    symptomSlug: "indigestion",
    see: ["samul-tang", "sipjeondaebo-tang", "spleen-stomach"],
  },
  {
    slug: "samul-tang",
    term: "사물탕",
    aka: ["四物湯"],
    english: "Samul-tang",
    category: "formula",
    short:
      "사물탕은 『태평혜민화제국방』에 실린 처방으로, 혈이 부족할 때 써 온 혈을 보하는 기본 처방입니다.",
    about: [
      "숙지황, 당귀, 작약, 천궁 네 가지로 이루어집니다. 숙지황과 작약이 혈을 채우고, 당귀와 천궁이 혈을 돌립니다.",
      "생리량이 적거나 주기가 불규칙하고, 얼굴빛이 창백하며 어지러운 분께 많이 씁니다. 여성 처방의 바탕이 되는 경우가 많습니다.",
    ],
    signs: ["얼굴빛이 창백하고 어지럽다", "생리량이 줄고 주기가 늦어진다", "손톱이 잘 부러지고 피부가 건조하다"],
    cautions: [ADJUST],
    see: ["sagunja-tang", "danggwijakyak-san", "qi-blood"],
  },
  {
    slug: "pyeongwi-san",
    term: "평위산",
    aka: ["平胃散"],
    english: "Pyeongwi-san",
    category: "formula",
    short:
      "평위산은 『태평혜민화제국방』에 실린 처방으로, 음식이 위에 머물러 배가 그득하고 더부룩할 때 써 온 한약입니다.",
    about: [
      "창출, 후박, 진피, 감초로 이루어지고 생강과 대추를 넣어 달입니다. 「위를 평평하게 고른다」는 뜻의 이름입니다.",
      "과식하거나 기름진 음식을 먹은 뒤 배가 빵빵하고 트림이 나며 입맛이 떨어질 때 씁니다.",
    ],
    signs: ["식후에 배가 빵빵하게 그득하다", "트림과 신물이 올라온다", "입맛이 떨어지고 몸이 무겁다"],
    cautions: [ADJUST],
    symptomSlug: "indigestion",
    see: ["functional-dyspepsia", "ijin-tang"],
  },
  {
    slug: "ijin-tang",
    term: "이진탕",
    aka: ["二陳湯"],
    english: "Ijin-tang",
    category: "formula",
    short:
      "이진탕은 『태평혜민화제국방』에 실린 처방으로, 몸에 담음이 쌓여 속이 울렁거리고 가래가 많을 때 써 온 한약입니다.",
    about: [
      "반하, 진피, 복령, 감초로 이루어집니다. 반하와 진피는 오래 묵힌 것일수록 좋다 하여 「두 가지 묵은 약」이라는 이름이 붙었습니다.",
      "담음을 다스리는 처방의 바탕이 되어, 여기에 약재를 더한 처방이 많습니다.",
    ],
    signs: ["속이 울렁거리고 메스껍다", "가래가 많다", "몸이 무겁고 어지럽다"],
    cautions: [ADJUST],
    see: ["phlegm", "pyeongwi-san"],
  },
  {
    slug: "gwakhyangjeonggi-san",
    term: "곽향정기산",
    aka: ["藿香正氣散"],
    english: "Gwakhyangjeonggi-san",
    category: "formula",
    short:
      "곽향정기산은 『태평혜민화제국방』에 실린 처방으로, 찬 것을 먹거나 더위를 먹어 배탈과 함께 으슬으슬한 감기 기운이 있을 때 써 온 한약입니다.",
    about: [
      "곽향, 자소엽, 백지, 대복피, 복령, 후박, 백출, 진피, 반하, 길경, 감초에 생강과 대추를 넣습니다.",
      "여름철 냉방이나 찬 음식으로 속이 탈 나 구토, 설사, 복통이 있으면서 몸살 기운이 겹칠 때 많이 씁니다.",
    ],
    signs: ["찬 것을 먹은 뒤 배가 아프고 설사한다", "메스껍고 토할 것 같다", "으슬으슬 몸살 기운이 있다"],
    cautions: [ADJUST],
    symptomSlug: "indigestion",
    see: ["hyangso-san", "pyeongwi-san"],
  },
  {
    slug: "hyangso-san",
    term: "향소산",
    aka: ["香蘇散"],
    english: "Hyangso-san",
    category: "formula",
    short:
      "향소산은 『태평혜민화제국방』에 실린 처방으로, 감기 초기에 속까지 답답하게 막힌 느낌이 겹칠 때 써 온 가벼운 한약입니다.",
    about: [
      "향부자, 자소엽, 진피, 감초 네 가지로 이루어집니다. 성질이 순해 몸이 약한 분이나 어르신께도 쓰기 쉽습니다.",
      "으슬으슬한 감기 기운에 가슴과 명치가 답답하고 입맛이 없을 때 씁니다.",
    ],
    signs: ["감기 기운이 있고 머리가 무겁다", "가슴과 명치가 답답하다", "입맛이 없다"],
    cautions: [ADJUST],
    see: ["gwakhyangjeonggi-san"],
  },
  {
    slug: "gwibi-tang",
    term: "귀비탕",
    aka: ["歸脾湯"],
    english: "Gwibi-tang",
    category: "formula",
    short:
      "귀비탕은 송나라 엄용화의 『제생방』에 실린 처방으로, 걱정과 생각이 많아 심장과 비위가 함께 지쳐 잠을 못 자고 잘 잊을 때 써 온 한약입니다.",
    about: [
      "인삼, 황기, 백출, 복신, 산조인, 용안육, 목향, 감초에 생강과 대추를 넣습니다. 지금 쓰는 처방에는 명나라 설기가 더한 당귀와 원지가 들어갑니다.",
      "신경 쓸 일이 많아 가슴이 두근거리고, 깊이 잠들지 못하며, 입맛도 떨어진 분께 많이 씁니다.",
    ],
    signs: ["걱정이 많아 잠이 얕다", "가슴이 자주 두근거린다", "건망이 늘고 입맛이 없다"],
    cautions: [ADJUST],
    symptomSlug: "fatigue",
    see: ["chronic-fatigue", "gamisoyo-san"],
  },
  {
    slug: "gamisoyo-san",
    term: "가미소요산",
    aka: ["加味逍遙散", "단치소요산"],
    english: "Gamisoyo-san",
    category: "formula",
    short:
      "가미소요산은 명나라 설기의 『내과적요』에 실린 처방으로, 스트레스로 기운이 뭉쳐 열이 오르고 짜증이 늘며 생리가 고르지 않을 때 써 온 한약입니다.",
    about: [
      "『태평혜민화제국방』의 소요산(시호, 당귀, 작약, 백출, 복령, 감초, 박하, 생강)에 목단피와 치자를 더한 처방입니다.",
      "얼굴로 열이 오르내리고 가슴이 답답하며 예민해지는 갱년기, 생리 전 불편이 심한 분께 많이 씁니다.",
    ],
    signs: ["얼굴로 열이 확 올랐다 내린다", "짜증이 늘고 가슴이 답답하다", "생리 주기가 고르지 않다"],
    cautions: [ADJUST],
    see: ["gwibi-tang", "samul-tang"],
  },
  {
    slug: "dokhwalgisaeng-tang",
    term: "독활기생탕",
    aka: ["獨活寄生湯"],
    english: "Dokhwalgisaeng-tang",
    category: "formula",
    short:
      "독활기생탕은 당나라 손사막의 『비급천금요방』에 실린 처방으로, 오래된 허리와 무릎 통증이 시리고 저릴 때 써 온 한약입니다.",
    about: [
      "독활, 상기생, 두충, 우슬, 세신, 진교, 복령, 육계, 방풍, 천궁, 인삼, 감초, 당귀, 작약, 지황 열다섯 가지로 이루어집니다.",
      "찬 기운과 습기에 오래 시달려 허리와 무릎이 시리고 저리면서 힘이 빠지는, 나이 든 분의 만성 통증에 많이 씁니다.",
    ],
    signs: ["허리와 무릎이 시리고 저리다", "흐리거나 추우면 더 아프다", "다리에 힘이 빠진다"],
    cautions: [ADJUST],
    symptomSlug: "pain",
    see: ["knee-oa", "ojeok-san"],
  },
  {
    slug: "jakyakgamcho-tang",
    term: "작약감초탕",
    aka: ["芍藥甘草湯"],
    english: "Jakyakgamcho-tang",
    category: "formula",
    short:
      "작약감초탕은 『상한론』에 실린 처방으로, 근육이 갑자기 당기고 쥐가 날 때 써 온 두 가지 약재의 짧은 처방입니다.",
    about: [
      "작약과 감초 두 가지만으로 이루어집니다. 굳은 근육을 풀어 주는 짜임이라 다른 처방에 더해 쓰기도 합니다.",
      "밤에 종아리에 쥐가 나거나, 근육이 갑자기 오그라들며 아플 때 씁니다.",
    ],
    signs: ["밤에 종아리에 쥐가 난다", "근육이 갑자기 당기며 아프다"],
    cautions: [ADJUST, "감초가 많이 들어 있어 오래 드실 때는 붓기와 혈압을 함께 살핍니다."],
    symptomSlug: "pain",
    see: ["myofascial-pain"],
  },
  {
    slug: "ojeok-san",
    term: "오적산",
    aka: ["五積散"],
    english: "Ojeok-san",
    category: "formula",
    short:
      "오적산은 『태평혜민화제국방』에 실린 처방으로, 찬 기운과 습기가 몸에 쌓여 허리가 아프고 몸이 무거울 때 써 온 한약입니다.",
    about: [
      "기, 혈, 담, 음식, 찬 기운의 다섯 가지 쌓임(오적)을 함께 푼다는 뜻의 이름입니다. 창출, 마황, 진피, 후박, 길경, 지각, 당귀, 건강, 작약, 복령, 천궁, 백지, 반하, 계지, 감초로 이루어집니다.",
      "찬 바닥에서 자거나 비를 맞은 뒤 허리가 아프고 몸이 무거울 때, 몸이 찬 분의 허리 통증과 생리통에 많이 씁니다.",
    ],
    signs: ["찬 데 있으면 허리가 더 아프다", "몸이 무겁고 으슬으슬하다", "배가 차고 생리통이 있다"],
    cautions: [ADJUST, EPHEDRA],
    symptomSlug: "pain",
    see: ["dokhwalgisaeng-tang", "lumbar-sprain"],
  },
  {
    slug: "bangpungtongseong-san",
    term: "방풍통성산",
    aka: ["防風通聖散"],
    english: "Bangpungtongseong-san",
    category: "formula",
    short:
      "방풍통성산은 금나라 유완소의 『선명논방』에 실린 처방으로, 몸 안에 열이 많고 변비가 있는 체격 좋은 분께 써 온 한약입니다.",
    about: [
      "방풍, 형개, 연교, 마황, 박하, 천궁, 당귀, 작약, 백출, 치자, 대황, 망초, 석고, 황금, 길경, 활석, 감초로 이루어집니다. 땀과 대소변으로 열을 함께 내보내는 짜임입니다.",
      "배가 나오고 열이 많으며 변비가 있는 비만에 쓰이면서 다이어트 처방으로도 알려졌습니다. 다만 몸이 약하고 찬 분께는 맞지 않습니다.",
    ],
    signs: ["배가 나오고 열이 많다", "변비가 있다", "얼굴이 붉고 땀을 많이 흘린다"],
    cautions: [ADJUST, EPHEDRA, "대황과 망초가 들어 있어 설사가 잦거나 몸이 약한 분께는 쓰지 않습니다.", PREGNANT],
    symptomSlug: "diet",
    see: ["herbal-diet", "ephedra", "taeeumjowi-tang"],
  },
  {
    slug: "taeeumjowi-tang",
    term: "태음조위탕",
    aka: ["太陰調胃湯"],
    english: "Taeeumjowi-tang",
    category: "formula",
    short:
      "태음조위탕은 이제마의 『동의수세보원』에 실린 태음인 처방으로, 태음인의 위장 기능을 고르게 할 때 써 온 한약입니다.",
    about: [
      "의이인, 건율, 나복자, 오미자, 맥문동, 석창포, 길경, 마황으로 이루어집니다.",
      "사상체질 가운데 태음인에게 쓰는 처방으로, 체격이 크고 잘 먹으며 몸이 무거운 태음인의 체중 관리 처방으로 많이 응용합니다.",
    ],
    signs: ["체격이 크고 식욕이 좋다", "몸이 무겁고 잘 붓는다", "땀을 흘리고 나면 개운하다"],
    cautions: [ADJUST, EPHEDRA],
    symptomSlug: "diet",
    see: ["sasang", "herbal-diet", "bangpungtongseong-san"],
  },
  {
    slug: "gyeongok-go",
    term: "경옥고",
    aka: ["瓊玉膏"],
    english: "Gyeongok-go",
    category: "formula",
    short:
      "경옥고는 송나라 『홍씨집험방』에 처음 실리고 『동의보감』에도 실린 처방으로, 생지황, 인삼, 복령, 꿀을 오래 고아 만든 보약입니다.",
    about: [
      "생지황즙과 꿀을 섞고 인삼과 복령 가루를 넣어 오랜 시간 중탕해 고약처럼 만듭니다. 한 숟갈씩 떠서 드시는 형태입니다.",
      "몸의 진액과 기운이 함께 줄어 마른기침이 잦고 쉽게 지치는 분, 회복기에 있는 분께 많이 씁니다.",
    ],
    signs: ["마른기침이 오래간다", "입과 피부가 건조하다", "쉽게 지치고 회복이 더디다"],
    cautions: [ADJUST, "지황이 들어 있어 소화가 약하거나 설사가 잦으면 드시는 양을 조절합니다."],
    symptomSlug: "fatigue",
    see: ["gongjindan", "chronic-fatigue"],
  },
  {
    slug: "hyeonggaeyeongyo-tang",
    term: "형개연교탕",
    aka: ["荊芥連翹湯"],
    english: "Hyeonggaeyeongyo-tang",
    category: "formula",
    short:
      "형개연교탕은 명나라 공정현의 『만병회춘』에 실린 처방으로, 얼굴 쪽에 열이 몰려 코, 귀, 피부에 염증이 되풀이될 때 써 온 한약입니다.",
    about: [
      "형개, 연교, 방풍, 당귀, 천궁, 작약, 시호, 지각, 황금, 치자, 백지, 길경, 감초로 이루어집니다.",
      "누런 콧물이 이어지는 축농증이나 비염, 얼굴에 붉게 올라오는 여드름처럼 얼굴 쪽 열이 문제일 때 씁니다.",
    ],
    signs: ["누런 콧물과 코막힘이 오래간다", "얼굴에 붉은 여드름이 자주 난다", "편도나 귀가 자주 붓는다"],
    cautions: [ADJUST],
    see: ["eungyo-san"],
  },
  {
    slug: "eungyo-san",
    term: "은교산",
    aka: ["銀翹散"],
    english: "Eungyo-san",
    category: "formula",
    short:
      "은교산은 청나라 오국통의 『온병조변』에 실린 처방으로, 목이 붓고 아프며 열이 나는 감기 초기에 써 온 한약입니다.",
    about: [
      "금은화와 연교를 주로 하고 길경, 박하, 죽엽, 감초, 형개, 담두시, 우방자, 노근을 더합니다.",
      "오한보다 열이 앞서고 목이 칼칼하게 아프며 목이 마른 감기에 씁니다. 찬 감기에 쓰는 갈근탕과는 방향이 반대입니다.",
    ],
    signs: ["목이 붓고 따갑다", "열이 나고 목이 마르다", "기침과 누런 가래가 시작됐다"],
    cautions: [ADJUST],
    see: ["galgeun-tang", "hyeonggaeyeongyo-tang"],
  },
  {
    slug: "sogeonjung-tang",
    term: "소건중탕",
    aka: ["小建中湯"],
    english: "Sogeonjung-tang",
    category: "formula",
    short:
      "소건중탕은 『상한론』과 『금궤요략』에 실린 처방으로, 몸이 약하고 배가 차서 배가 자주 아플 때 써 온 한약입니다.",
    about: [
      "계지탕에서 작약을 두 배로 늘리고 엿(교이)을 더한 처방입니다. 달고 따뜻해 아이들도 먹기 쉽습니다.",
      "몸이 마르고 쉽게 지치며 배가 자주 아픈 아이, 배를 따뜻하게 하면 편해지는 분께 많이 씁니다.",
    ],
    signs: ["배가 자주 아프고 따뜻하게 하면 편하다", "쉽게 지치고 식은땀이 난다", "몸이 마르고 입이 짧다"],
    cautions: [ADJUST],
    see: ["gyeji-tang", "sagunja-tang"],
  },
];
