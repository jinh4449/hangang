import Link from "next/link";
import type { Metadata } from "next";
import { GLOSSARY, GLOSSARY_CATEGORIES } from "@/content/glossary";
import { PageHead, Section, Cta, JsonLd } from "@/components/site";
import { webPage, breadcrumb, definedTermSet } from "@/content/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/glossary" },
  title: "한방·통증 용어사전 — 오십견, 추나, 약침이 무엇인지",
  description:
    "김포한강한의원 용어사전. 오십견, 목디스크, 족저근막염 같은 질환과 추나요법, 약침, 첩약 같은 치료, 추나 건강보험과 교통사고 자동차보험까지. 이름 하나를 한 문장으로 풀고, 한의원보다 다른 진료가 먼저인 경우도 함께 적었습니다.",
};

export default function GlossaryIndex() {
  return (
    <>
      <JsonLd
        data={webPage({
          name: "한방·통증 용어사전",
          description: "질환, 치료, 보험 제도의 이름을 한 문장으로 풀었습니다.",
          path: "/glossary",
        })}
      />
      <JsonLd data={definedTermSet(GLOSSARY)} />
      <JsonLd data={breadcrumb([{ name: "용어사전", path: "/glossary" }])} />
      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.5rem,6vw,7rem)] py-12">
        <PageHead
          eyebrow="질환별 의학정보"
          title="한방·통증 용어사전"
          lede="진료실에서 듣는 이름이 무엇을 뜻하는지 한 문장으로 먼저 답하고, 아래에 풀어 적었습니다. 한의원보다 다른 진료가 먼저인 경우도 숨기지 않고 함께 적었습니다."
        />
        {GLOSSARY_CATEGORIES.map((cat) => {
          const terms = GLOSSARY.filter((t) => t.category === cat);
          if (terms.length === 0) return null;
          return (
            <Section key={cat} title={cat}>
              <div className="border-t border-line">
                {terms.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/glossary/${t.slug}`}
                    className="group block border-b border-line py-5"
                  >
                    <span className="kr block text-[18px] font-bold leading-snug group-hover:text-herb">
                      {t.term}
                      {t.aka && t.aka.length > 0 && (
                        <span className="ml-2 text-[15px] font-normal text-faint">
                          {t.aka.join(" · ")}
                        </span>
                      )}
                    </span>
                    <span className="kr mt-1.5 block text-[16px] leading-7 text-muted">
                      {t.short}
                    </span>
                  </Link>
                ))}
              </div>
            </Section>
          );
        })}
        <Cta />
      </article>
    </>
  );
}
