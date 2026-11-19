/**
 * 첫 화면 「김포 한의원, 진료별로 살펴보기」 사진 카드.
 *
 * 제목은 김포에서 그 진료를 찾을 때 치는 검색어 그대로다(원장님이 정한 여섯 개).
 * 진료과목 페이지와 1:1 이 아니라서(추나는 치료 기법 안내로 간다) 따로 둔다.
 *
 * photo 는 그 진료를 보여 주는 공간·장비 사진. 카드에서 정사각에 가깝게 잘리므로
 * 주인공을 가운데에 둔 사진을 쓴다. 비워 두면 아이콘 판으로 선다.
 * 환자 얼굴이 보이는 사진, 치료 전후 비교 사진은 쓰지 않는다.
 */
export type HomeCard = {
  title: string;
  href: string;
  line: string;
  /** SYMPTOM_ICONS 의 키. 사진이 없을 때 아이콘 판에 쓴다 */
  icon: string;
  photo?: { src: string; alt: string; position?: string };
};

export const HOME_CARDS: HomeCard[] = [
  {
    title: "김포 다이어트 한약",
    href: "/care/diet",
    line: "체질과 식습관을 보고 생활에 맞춰 처방합니다",
    icon: "diet",
  },
  {
    title: "김포 교통사고 한의원",
    href: "/care/car-accident",
    line: "자동차보험 접수부터 치료, 회복 점검까지 안내합니다",
    icon: "car-accident",
  },
  {
    title: "김포 추나 한의원",
    href: "/treatment#chuna",
    line: "틀어진 정렬을 손으로 확인하고 바로잡습니다. 건강보험 연 20회",
    icon: "pain",
  },
  {
    title: "김포 성장보약",
    href: "/care/growth",
    line: "잘 먹고 잘 자고 덜 아프게, 아이 체질에 맞춰 봅니다",
    icon: "growth",
  },
  {
    title: "김포 통증치료",
    href: "/care/pain",
    line: "어디서 오는 통증인지 먼저 찾고 침·약침·추나로 치료합니다",
    icon: "pain",
  },
  {
    title: "김포 산후보약",
    href: "/care/postpartum",
    line: "출산 방식과 수유 여부에 맞춰 회복을 돕습니다",
    icon: "postpartum",
  },
];
