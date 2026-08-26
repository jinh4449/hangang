import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SYMPTOMS, getSymptom } from "@/content/symptoms";
import { getCompare } from "@/content/compare";
import { IntentNav, PageHead, Section, Cta, JsonLd } from "@/components/site";
import { breadcrumb } from "@/content/schema";
import { SYMPTOM_ICONS } from "@/components/icons";

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
      <JsonLd data={breadcrumb([{ name: s.name, path: `/care/${s.slug}` }])} />
      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.25rem,4vw,4rem)] py-12">
        {(() => {
          const Icon = SYMPTOM_ICONS[s.slug];
          return Icon ? <Icon className="mb-5 h-10 w-10 text-herb" /> : null;
        })()}
        <PageHead eyebrow={s.clinicalName} title={care.title} lede={care.lede} />

        {/* 이 과목에서 가장 먼저 알려야 할 사실. 없으면 렌더링하지 않는다 */}
        {s.highlight && (
          <aside className="mt-8 rounded-[2rem] bg-herb p-7 text-paper md:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-paper/60">
              {s.highlight.label}
            </p>
            <p className="kr mt-3 max-w-[52ch] text-lg font-semibold leading-8">
              {s.highlight.text}
            </p>
          </aside>
        )}

        <Section title="이런 증상이 있다면" note="아래 항목 중 여러 개에 해당한다면 진찰을 권합니다.">
          <ul className="readlist sm:grid-cols-2 sm:gap-x-10">
            {care.signs.map((sign) => (
              <li key={sign} className="kr text-[15.5px]">
                {sign}
              </li>
            ))}
          </ul>
        </Section>

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
                    <span className="rounded border border-herb-line bg-tint px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-herb">
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
            <Link href={`/cost/${s.slug}`} className="text-herb underline underline-offset-4">
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
                <span className="pt-0.5 font-mono text-xs tabular-nums text-herb">
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
                    className="rounded border border-line bg-surface px-5 py-4 transition-colors hover:border-herb"
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
