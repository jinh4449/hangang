import { SYMPTOMS } from "./symptoms";
import { TREATMENTS } from "./treatment";
import { PARTS } from "./part";
import { AREAS } from "./area";
import { COMPARES } from "./compare";

/**
 * 헤더 메뉴.
 *
 * 항목을 손으로 나열하지 않고 콘텐츠에서 뽑는다. 진료과목이나 치료 기법을
 * 추가하면 메뉴에도 자동으로 들어온다.
 *
 * 최상위는 4개까지만 둔다. 그 이상은 헤더 알약 안에 들어가지 않는다.
 * 최상위 항목도 전부 실제로 존재하는 페이지를 가리킨다. 누를 곳이 없는
 * 메뉴는 키보드로 쓸 수 없고, 눌러 본 사람을 헛걸음시킨다.
 */

export type NavLink = { label: string; href: string; note?: string };
export type NavGroup = { title: string; links: NavLink[] };
export type NavEntry = { label: string; href: string; groups: NavGroup[] };

export const NAV: NavEntry[] = [
  {
    label: "진료과목",
    href: "/care",
    groups: [
      {
        title: "무엇 때문에 오셨나요",
        links: SYMPTOMS.map((s) => ({
          label: s.name,
          href: `/care/${s.slug}`,
          note: s.clinicalName,
        })),
      },
    ],
  },
  {
    label: "치료 방법",
    href: "/treatment",
    groups: [
      {
        title: "치료 기법",
        links: TREATMENTS.map((t) => ({
          label: t.name,
          href: `/treatment/${t.slug}`,
          note: t.covered ? "건강보험 적용" : "비급여",
        })),
      },
      {
        title: "부위별 안내",
        links: PARTS.map((p) => ({ label: p.name, href: `/part/${p.slug}` })),
      },
    ],
  },
  {
    label: "진료비",
    href: "/cost",
    groups: [
      {
        title: "전체 안내",
        links: [
          { label: "진료비 안내", href: "/cost", note: "급여 · 비급여" },
          { label: "예약 · 상담", href: "/reservation", note: "예약 방법과 준비물" },
        ],
      },
      {
        title: "과목별 비용",
        links: SYMPTOMS.map((s) => ({ label: `${s.name} 비용`, href: `/cost/${s.slug}` })),
      },
    ],
  },
  {
    label: "병원 안내",
    href: "/directions",
    groups: [
      {
        title: "찾아오시는 길",
        links: [
          { label: "오시는 길", href: "/directions", note: "지하철 · 주차" },
          ...AREAS.map((a) => ({ label: a.name, href: `/area/${a.slug}` })),
        ],
      },
      {
        title: "읽을거리",
        links: [
          { label: "원장 칼럼", href: "/column", note: "진료실에서 받는 질문" },
          ...COMPARES.map((c) => ({ label: c.title, href: `/compare/${c.slug}` })),
        ],
      },
    ],
  },
];
