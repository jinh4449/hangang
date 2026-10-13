import Link from "next/link";
import type { Metadata } from "next";
import { GLOSSARY, GLOSSARY_CATEGORIES, termsIn, chosung } from "@/content/glossary";
import { PageHead, Section, Cta, JsonLd } from "@/components/site";
import { webPage, breadcrumb, definedTermSet } from "@/content/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/glossary" },
  title: `한의학 용어사전 — 질환·치료·한약·보험 ${GLOSSARY.length}개 쉽게 풀이`,
  description:
    "김포한강한의원 한의학 용어사전. 오십견, 목디스크, 족저근막염 같은 질환과 추나요법, 약침, 첩약, 변증, 어혈, 추나 건강보험, 교통사고 자동차보험까지. 이름 하나를 한 문장으로 풀고, 한의원보다 다른 진료가 먼저인 경우도 함께 적었습니다.",
};

export default function GlossaryIndex() {
  // 가나다 색인. GLOSSARY 는 이미 가나다순이라 순서대로 묶기만 하면 된다
  const groups = new Map<string, typeof GLOSSARY>();
  for (const t of GLOSSARY) {
    const k = chosung(t.term);
    groups.set(k, [...(groups.get(k) ?? []), t]);
  }

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
          lede="진료실에서 듣는 이름이 무엇을 뜻하는지 한 문장으로 먼저 답하고, 아래에 풀어 적었습니다. 한의원보다 다른 진료가 먼저인 경우도 숨기지 않고 함께 적었습니다."
        />

        <Section title="분류로 찾기">
          <div className="grid gap-3 sm:grid-cols-2">
            {GLOSSARY_CATEGORIES.map((c) => {
              const n = termsIn(c.slug).length;
              if (n === 0) return null;
              return (
                <Link
                  key={c.slug}
                  href={`/glossary/category/${c.slug}`}
                  className="tile block bg-surface p-6"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="kr text-lg font-bold">{c.name}</span>
                    <span className="font-mono text-xs text-faint">{n}개</span>
                  </span>
                  <span className="kr mt-1.5 block text-[15px] leading-7 text-muted">{c.blurb}</span>
                </Link>
              );
            })}
          </div>
        </Section>

        <Section title="가나다로 찾기">
          <nav aria-label="초성 색인" className="flex flex-wrap gap-1.5">
            {[...groups.keys()].map((k) => (
              <a
                key={k}
                href={`#idx-${k}`}
                className="grid h-9 min-w-9 place-items-center rounded-full border border-line bg-surface px-2 text-sm hover:border-herb"
              >
                {k}
              </a>
            ))}
          </nav>
          <div className="mt-8 grid gap-8">
            {[...groups.entries()].map(([k, terms]) => (
              <div key={k} id={`idx-${k}`} className="scroll-mt-28">
                <h3 className="font-serif text-xl font-bold text-herb">{k}</h3>
                <div className="mt-2 border-t border-line">
                  {terms.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/glossary/${t.slug}`}
                      className="group block border-b border-line py-4"
                    >
                      <span className="kr block text-[17px] font-bold leading-snug group-hover:text-herb">
                        {t.term}
                        {t.aka && t.aka.length > 0 && (
                          <span className="ml-2 text-[14px] font-normal text-faint">
                            {t.aka.slice(0, 2).join(" · ")}
                          </span>
                        )}
                      </span>
                      <span className="kr mt-1 block text-[15px] leading-7 text-muted">{t.short}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Cta />
      </article>
    </>
  );
}
