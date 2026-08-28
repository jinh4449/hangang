import { SYMPTOMS } from "./symptoms";
import { PARTS } from "./part";
import { COMPARES } from "./compare";

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
        title: "읽을거리",
        links: [
          { label: "원장 칼럼", href: "/column" },
          ...COMPARES.map((c) => ({ label: c.title, href: `/compare/${c.slug}` })),
        ],
      },
      {
        // 치료 방법 목록도 여기 둔다. 빼면 헤더에서 닿을 곳이 없어진다
        title: "치료 안내",
        links: [
          { label: "치료 방법", href: "/treatment" },
          ...PARTS.map((p) => ({ label: p.name, href: `/part/${p.slug}` })),
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
