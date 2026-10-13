import Link from "next/link";
import type { Metadata } from "next";
import { GLOSSARY, GLOSSARY_CATEGORIES, termsIn, chosung, initialsOf } from "@/content/glossary";
import { GlossaryBrowser, type BrowserTerm } from "@/components/glossary-browser";
import { PageHead, Section, Cta, JsonLd } from "@/components/site";
import { webPage, breadcrumb, definedTermSet } from "@/content/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/glossary" },
  title: `한의학 용어사전 — 질환·치료·한약·보험 ${GLOSSARY.length}개 쉽게 풀이`,
  description:
    "김포한강한의원 한의학 용어사전. 오십견, 목디스크, 족저근막염 같은 질환과 추나요법, 약침, 첩약, 변증, 어혈, 추나 건강보험, 교통사고 자동차보험까지. 이름 하나를 한 문장으로 풀고, 추가 검사가 필요한 경우도 함께 적었습니다.",
};

export default function GlossaryIndex() {
  // 검색에 필요한 만큼만 넘긴다. 풀이 본문까지 넘기면 첫 화면이 무거워진다
  const browse: BrowserTerm[] = GLOSSARY.map((t) => ({
    slug: t.slug,
    term: t.term,
    aka: t.aka ?? [],
    short: t.short,
    ch: chosung(t.term),
    initials: [t.term, ...(t.aka ?? [])].map(initialsOf).join(" "),
  }));

  return (
    <>
      <JsonLd
        data={webPage({
          name: "한의학 용어사전",
          description: "질환, 치료, 한약, 한의학 개념, 보험 제도의 이름을 한 문장으로 풀었습니다.",
          path: "/glossary",
        })}
      />
      <JsonLd data={definedTermSet(GLOSSARY)} />
      <JsonLd data={breadcrumb([{ name: "한의학 용어사전", path: "/glossary" }])} />
      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.5rem,6vw,7rem)] py-12">
        <PageHead
          eyebrow={`질환별 의학정보 · ${GLOSSARY.length}개 용어`}
          title="한의학 용어사전"
          lede="진료실에서 듣는 이름이 무엇을 뜻하는지 한 문장으로 먼저 답하고, 아래에 풀어 적었습니다. 추가 검사가 필요한 경우도 숨기지 않고 함께 적었습니다."
        />

        {/* 분류는 단추 한 줄로 둔다. 카드로 세우면 검색창이 화면 밖으로 밀린다 */}
        <nav aria-label="분류" className="mt-8 flex flex-wrap gap-2">
          {GLOSSARY_CATEGORIES.map((c) => {
            const n = termsIn(c.slug).length;
            if (n === 0) return null;
            return (
              <Link
                key={c.slug}
                href={`/glossary/category/${c.slug}`}
                title={c.blurb}
                className="badge inline-flex items-baseline gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm hover:border-herb"
              >
                {c.name}
                <span className="font-mono text-[11px] text-faint">{n}</span>
              </Link>
            );
          })}
        </nav>

        <Section title="용어 찾기">
          <GlossaryBrowser terms={browse} />
        </Section>

        <Cta />
      </article>
    </>
  );
}
