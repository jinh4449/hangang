import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { GLOSSARY, getTerm } from "@/content/glossary";
import { getPart } from "@/content/part";
import { getTreatment } from "@/content/treatment";
import { getSymptom } from "@/content/symptoms";
import { getCompare } from "@/content/compare";
import { sentences } from "@/content/clinic";
import { withJosa } from "@/content/josa";
import { PageHead, Section, Cta, JsonLd } from "@/components/site";
import { medicalWebPage, faqPage, breadcrumb, definedTerm } from "@/content/schema";

export const generateStaticParams = () => GLOSSARY.map((t) => ({ slug: t.slug }));

export async function generateMetadata({ params }: PageProps<"/glossary/[slug]">): Promise<Metadata> {
  const t = getTerm((await params).slug);
  if (!t) return {};
  const aka = t.aka?.length ? ` (${t.aka.join(", ")})` : "";
  const what = t.category === "질환" ? "뜻과 증상" : "뜻";
  return {
    title: `${withJosa(t.term, "이란")}? ${what}${aka}`,
    description: sentences(t.short),
    alternates: { canonical: `/glossary/${t.slug}` },
  };
}

const chip =
  "badge inline-block rounded-full border border-line bg-surface px-5 py-2.5 text-sm hover:border-herb";

export default async function TermPage({ params }: PageProps<"/glossary/[slug]">) {
  const t = getTerm((await params).slug);
  if (!t) notFound();

  const path = `/glossary/${t.slug}`;
  const part = t.partSlug ? getPart(t.partSlug) : undefined;
  const treatment = t.treatmentSlug ? getTreatment(t.treatmentSlug) : undefined;
  const symptom = t.symptomSlug ? getSymptom(t.symptomSlug) : undefined;
  const compare = t.compareSlug ? getCompare(t.compareSlug) : undefined;
  const see = (t.see ?? []).map(getTerm).filter((x) => x !== undefined);

  // 화면에 보이는 문답만 스키마에 넣는다 (schema.ts 의 FAQPage 규칙)
  const faq = [
    { q: `${withJosa(t.term, "이란")} 무엇인가요?`, a: `${t.short} ${t.about.join(" ")}` },
    ...(t.firstElsewhere?.length
      ? [
          {
            q: "한의원보다 다른 진료가 먼저인 경우는 언제인가요?",
            a: t.firstElsewhere.join(" "),
          },
        ]
      : []),
  ];

  return (
    <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.5rem,6vw,7rem)] py-12">
      <JsonLd data={definedTerm(t)} />
      <JsonLd
        data={medicalWebPage({
          name: t.term,
          description: t.short,
          condition: t.category === "질환" ? t.term : undefined,
          path,
        })}
      />
      <JsonLd data={faqPage(faq, path)} />
      <JsonLd
        data={breadcrumb([
          { name: "용어사전", path: "/glossary" },
          { name: t.term, path },
        ])}
      />

      <Link href="/glossary" className="font-mono text-xs text-herb hover:underline">
        ← 용어사전
      </Link>
      <div className="mt-6">
        <PageHead
          eyebrow={[t.category, ...(t.english ? [t.english] : [])].join(" · ")}
          title={t.term}
          lede={t.short}
        />
      </div>
      {t.aka && t.aka.length > 0 && (
        <p className="kr mt-4 text-[15px] text-faint">다른 이름 · {t.aka.join(", ")}</p>
      )}

      <Section title={`${withJosa(t.term, "이란")} 무엇인가요`}>
        <div className="grid max-w-[62ch] gap-4">
          {t.about.map((p) => (
            <p key={p} className="kr text-[16.5px] leading-8 text-muted">
              {p}
            </p>
          ))}
        </div>
      </Section>

      {t.signs && t.signs.length > 0 && (
        <Section title="흔히 겪는 모습">
          <ul className="readlist sm:grid-cols-2 sm:gap-x-10">
            {t.signs.map((s) => (
              <li key={s} className="kr text-[15.5px]">
                {s}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {t.care && (
        <Section title="김포한강한의원에서는">
          <p className="kr max-w-[62ch] rounded-2xl bg-tint p-5 text-[16px] leading-8 ring-1 ring-herb/25">
            {t.care}
          </p>
        </Section>
      )}

      {t.firstElsewhere && t.firstElsewhere.length > 0 && (
        <Section
          title="한의원보다 다른 진료가 먼저인 경우"
          note="아래에 해당하면 영상 검사나 응급 진료를 먼저 받으십시오."
        >
          <ul className="grid max-w-[62ch] gap-2 rounded-2xl border border-ochre-line bg-ochre-soft p-5">
            {t.firstElsewhere.map((f) => (
              <li key={f} className="kr text-[15.5px] leading-7">
                · {f}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {(part || treatment || symptom || compare) && (
        <Section title="이어서 보기">
          <div className="flex flex-wrap gap-2">
            {part && (
              <Link href={`/part/${part.slug}`} className={chip}>
                {part.name} 통증 안내
              </Link>
            )}
            {treatment && (
              <Link href="/treatment" className={chip}>
                치료 방법 — {treatment.name}
              </Link>
            )}
            {symptom && (
              <Link href={`/care/${symptom.slug}`} className={chip}>
                {symptom.name} 진료 안내
              </Link>
            )}
            {compare && (
              <Link href={`/compare/${compare.slug}`} className={chip}>
                {compare.title}
              </Link>
            )}
          </div>
        </Section>
      )}

      {see.length > 0 && (
        <Section title="함께 찾는 용어">
          <div className="border-t border-line">
            {see.map((s) => (
              <Link
                key={s.slug}
                href={`/glossary/${s.slug}`}
                className="group block border-b border-line py-4"
              >
                <span className="kr block text-[17px] font-bold group-hover:text-herb">{s.term}</span>
                <span className="kr mt-1 block text-[15px] leading-7 text-muted">{s.short}</span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Cta />
    </article>
  );
}
