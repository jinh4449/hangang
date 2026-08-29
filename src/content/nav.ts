import { SYMPTOMS } from "./symptoms";

/**
 * 헤더 메뉴.
 *
 * 항목을 손으로 나열하지 않고 콘텐츠에서 뽑는다. 진료과목이나 치료 기법을
 * 추가하면 메뉴에도 자동으로 들어온다.
 *
 * 최상위는 5개까지 둔다. 그 이상은 헤더 알약 안에 들어가지 않는다.
 * 최상위 항목도 전부 실제로 존재하는 페이지를 가리킨다. 누를 곳이 없는
 * 메뉴는 키보드로 쓸 수 없고, 눌러 본 사람을 헛걸음시킨다.
 */

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; links: NavLink[] };
export type NavEntry = { label: string; href: string; groups: NavGroup[] };

export const NAV: NavEntry[] = [
  {
    label: "김포한강한의원",
    href: "/about",
    groups: [
      {
        title: "한의원",
        // 오시는 길은 병원 안내에 있다. 같은 링크를 두 곳에 두지 않는다
        links: [
          { label: "병원 소개", href: "/about" },
          { label: "의료진 소개", href: "/doctors" },
        ],
      },
    ],
  },
  {
    label: "진료과목",
    href: "/care",
    groups: [
      {
        title: "무엇 때문에 오셨나요",
        links: SYMPTOMS.map((s) => ({
          label: s.name,
          href: `/care/${s.slug}`,
        })),
      },
    ],
  },
  {
    label: "콘텐츠",
    href: "/column",
    groups: [
      {
        // 비교글은 메뉴에 늘어놓지 않는다. 제목이 길어 메뉴가 글 목록처럼 되고,
        // 메인의 Q&A 에서 질문을 보고 들어가는 편이 찾기 쉽다
        title: "칼럼",
        links: [{ label: "원장 칼럼", href: "/column" }],
      },
      {
        // 부위 여섯 곳은 통증·근골격 페이지 안에 있다. 여기까지 펼치면
        // 메뉴가 열 줄을 넘겨, 고르는 화면이 아니라 읽는 화면이 된다
        title: "질환별 의학정보",
        links: [
          { label: "통증 · 근골격", href: "/part" },
          { label: "치료 방법", href: "/treatment" },
        ],
      },
    ],
  },
  {
    label: "병원 안내",
    href: "/directions",
    groups: [
      {
        // 읽을거리는 콘텐츠로, 동네별 안내는 푸터로 갔다
        title: "찾아오시는 길",
        links: [
          { label: "오시는 길", href: "/directions" },
          { label: "예약 · 상담", href: "/reservation" },
        ],
      },
    ],
  },
];
