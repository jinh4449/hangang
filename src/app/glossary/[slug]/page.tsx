import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { GLOSSARY, getTerm, getCategory } from "@/content/glossary";
import type { GlossaryTerm } from "@/content/glossary";
import { getPart } from "@/content/part";
import { getTreatment } from "@/content/treatment";
import { getSymptom } from "@/content/symptoms";
import { getCompare } from "@/content/compare";
import { sentences } from "@/content/clinic";
import { withJosa } from "@/content/josa";
import { PageHead, Section, Cta, JsonLd } from "@/components/site";
import { medicalWebPage, faqPage, breadcrumb, definedTerm } from "@/content/schema";

export const generateStaticParams = () => GLOSSARY.map((t) => ({ slug: t.slug }));

/**
 * 검색 결과 제목. 「○○이란? — 무엇을 알려 주는지」 꼴로 쓴다.
 *
 * 비디치과가 서치콘솔로 잰 결과, 「단어 | 백과사전」 꼴 제목은 노출이 나와도
 * 클릭률이 0.35% 였고 무엇을 답하는지 예고한 제목으로 바꾼 뒤에야 클릭이
 * 붙었다. 제목이 정의만 약속하면 사람은 검색 결과에서 정의만 읽고 떠난다.
 */
function titleOf(t: GlossaryTerm) {
  if (t.question) return `${t.question}?`;
  const sick = t.category === "musculoskeletal" || t.category === "internal" || t.category === "accident";
  const hook = sick
    ? t.needsTests?.length
      ? "증상과 검사가 필요한 때"
      : "뜻과 증상"
    : t.needsTests?.length || t.cautions?.length
      ? "뜻과 주의할 점"
      : "뜻 풀이";
  // 한글 다른 이름 하나만 괄호로. 한자나 이름에 이미 든 말은 붙이지 않는다
  const aka = t.aka?.find((a) => /^[가-힣 ]{2,10}$/.test(a) && !t.term.includes(a) && !a.includes(t.term));
  return `${t.term}${aka ? `(${aka})` : ""}${t.term.endsWith(")") ? "란" : withJosa(t.term, "이란").slice(t.term.length)}? ${hook}`;
}

/** 본문 첫 질문. 이름이면 「○○이란 무엇인가요」, 질문형 용어면 그 질문 */
const askOf = (t: GlossaryTerm) => t.question ?? `${withJosa(t.term, "이란")} 무엇인가요`;

export async function generateMetadata({ params }: PageProps<"/glossary/[slug]">): Promise<Metadata> {
  const t = getTerm((await params).slug);
  if (!t) return {};
  return {
    title: titleOf(t),
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
  const cat = getCategory(t.category)!;

  // 화면에 보이는 문답만 스키마에 넣는다 (schema.ts 의 FAQPage 규칙)
  const faq = [
    { q: `${askOf(t)}?`, a: `${t.short} ${t.about.join(" ")}` },
    ...(t.needsTests?.length
      ? [
          {
            q: "추가 검사가 필요한 경우는 언제인가요?",
            a: t.needsTests.join(" "),
          },
        ]
      : []),
    ...(t.cautions?.length ? [{ q: "주의할 점은 무엇인가요?", a: t.cautions.join(" ") }] : []),
  ];

  return (
    <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.5rem,6vw,7rem)] py-12">
      <JsonLd data={definedTerm(t)} />
      <JsonLd
        data={medicalWebPage({
          name: t.term,
          description: t.short,
          condition: t.category === "musculoskeletal" || t.category === "internal" ? t.term : undefined,
          path,
        })}
      />
      <JsonLd data={faqPage(faq, path)} />
      <JsonLd
        data={breadcrumb([
          { name: "한의학 용어사전", path: "/glossary" },
          { name: cat.name, path: `/glossary/category/${cat.slug}` },
          { name: t.term, path },
        ])}
      />

      <p className="font-mono text-xs text-herb">
        <Link href="/glossary" className="hover:underline">
          한의학 용어사전
        </Link>
        {" / "}
        <Link href={`/glossary/category/${cat.slug}`} className="hover:underline">
          {cat.name}
        </Link>
      </p>
      <div className="mt-6">
        <PageHead
          eyebrow={[cat.name, ...(t.english ? [t.english] : [])].join(" · ")}
          title={t.term}
          lede={t.short}
        />
      </div>
      {t.aka && t.aka.length > 0 && (
        <p className="kr mt-4 text-[15px] text-faint">다른 이름 · {t.aka.join(", ")}</p>
      )}

      <Section title={askOf(t)}>
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

      {t.needsTests && t.needsTests.length > 0 && (
        <Section
          title="추가 검사가 필요한 경우"
          note="아래에 해당하면 영상·혈액·내시경 같은 검사로 먼저 확인하시는 것이 좋습니다. 필요한 검사는 진료 때 안내해 드립니다."
        >
          <ul className="grid max-w-[62ch] gap-2 rounded-2xl border border-ochre-line bg-ochre-soft p-5">
            {t.needsTests.map((f) => (
              <li key={f} className="kr text-[15.5px] leading-7">
                · {f}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {t.cautions && t.cautions.length > 0 && (
        <Section title="주의할 점">
          <ul className="grid max-w-[62ch] gap-2 rounded-2xl bg-surface p-5 ring-1 ring-line">
            {t.cautions.map((f) => (
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
