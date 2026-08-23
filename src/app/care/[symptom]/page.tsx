import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SYMPTOMS, getSymptom } from "@/content/symptoms";
import { getCompare } from "@/content/compare";
import { IntentNav, PageHead, Section, Cta, JsonLd } from "@/components/site";

export const generateStaticParams = () => SYMPTOMS.map((s) => ({ symptom: s.slug }));

export async function generateMetadata({ params }: PageProps<"/care/[symptom]">): Promise<Metadata> {
  const s = getSymptom((await params).symptom);
  if (!s) return {};
  return {
    title: `${s.name} 한방치료 — ${s.clinicalName}`,
    description: s.care.lede.slice(0, 150),
  };
}

export default async function CarePage({ params }: PageProps<"/care/[symptom]">) {
  const s = getSymptom((await params).symptom);
  if (!s) notFound();
  const { care } = s;

  return (
    <>
      <IntentNav slug={s.slug} name={s.name} current="care" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: care.title,
          about: { "@type": "MedicalCondition", name: s.clinicalName },
        }}
      />
      <article className="mx-auto max-w-3xl px-5 py-12">
        <PageHead eyebrow={s.clinicalName} title={care.title} lede={care.lede} />

        <Section title="이런 증상이 있다면" note="아래 항목 중 여러 개에 해당한다면 진찰을 권합니다.">
          <ul className="grid gap-2 sm:grid-cols-2">
            {care.signs.map((sign) => (
              <li
                key={sign}
                className="rounded border border-line bg-surface px-4 py-3 text-[15px] leading-7"
              >
                {sign}
              </li>
            ))}
          </ul>
        </Section>

        {/* 응급 신호를 치료 설명보다 앞에 둔다. 환자를 붙잡는 것보다 안전이 먼저다. */}
        <section className="mt-14 rounded border border-rust-line border-l-[3px] border-l-rust bg-rust-soft p-7">
          <h2 className="font-serif text-xl font-bold text-rust">{care.redFlags.title}</h2>
          <p className="mt-3 text-[15px] leading-7">{care.redFlags.body}</p>
          <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
            {care.redFlags.signs.map((sign) => (
              <li key={sign} className="text-[15px] leading-7">
                · {sign}
              </li>
            ))}
          </ul>
        </section>

        <Section title="왜 생기나">
          <div className="grid gap-3">
            {care.causes.map((c) => (
              <div key={c.title} className="rounded border border-line bg-surface p-5">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="치료 방법">
          <div className="grid gap-3">
            {care.treatments.map((t) => (
              <div key={t.name} className="rounded border border-line bg-surface p-5">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="font-semibold">{t.name}</h3>
                  {t.covered && (
                    <span className="rounded border border-jade-line bg-jade-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-jade">
                      건강보험 적용
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[15px] leading-7 text-muted">{t.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-muted">
            비용은{" "}
            <Link href={`/cost/${s.slug}`} className="text-jade underline underline-offset-4">
              비용·보험 안내
            </Link>
            에서 확인하실 수 있습니다.
          </p>
        </Section>

        <Section
          title="치료 과정"
          note="후기 대신 예상 기간을 공개합니다. 개인차가 있으며 진찰 후 조정됩니다."
        >
          <ol className="border-t border-line">
            {care.stages.map((st, i) => (
              <li key={st.label} className="grid grid-cols-[2.5rem_1fr] gap-5 border-b border-line py-5">
                <span className="pt-0.5 font-mono text-xs tabular-nums text-jade">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-semibold">{st.label}</h3>
                    {st.span && <span className="font-mono text-xs text-ochre">{st.span}</span>}
                  </div>
                  <p className="mt-1.5 text-[15px] leading-7 text-muted">{st.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {care.extraSections?.map((sec) => (
          <Section key={sec.title} title={sec.title} note={sec.note}>
            <div className="grid gap-3">
              {sec.items.map((it) => (
                <div key={it.title} className="rounded border border-line bg-surface p-5">
                  <h3 className="font-semibold">{it.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted">{it.body}</p>
                </div>
              ))}
            </div>
          </Section>
        ))}

        {s.compareSlugs.length > 0 && (
          <Section title="함께 보면 좋은 비교">
            <div className="grid gap-2">
              {s.compareSlugs.map((cs) => {
                const c = getCompare(cs);
                if (!c) return null;
                return (
                  <Link
                    key={cs}
                    href={`/compare/${cs}`}
                    className="rounded border border-line bg-surface px-5 py-4 transition-colors hover:border-jade"
                  >
                    <span className="font-semibold">{c.title}</span>
                    <span className="mt-1 block text-sm text-muted">{c.question}</span>
                  </Link>
                );
              })}
            </div>
          </Section>
        )}

        <Cta />
      </article>
    </>
  );
}
