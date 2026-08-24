import Link from "next/link";
import type { Metadata } from "next";
import { TREATMENTS, AXIS_STORY } from "@/content/treatment";
import { CLINIC } from "@/content/clinic";
import { PageHead, Cta, JsonLd } from "@/components/site";
import { breadcrumb, SITE_URL } from "@/content/schema";

export const metadata: Metadata = {
  title: "치료 방법",
  description: "초음파 유도 약침으로 통증과 염증을, 추나요법으로 틀어진 구조를 다룹니다.",
};

const AXIS_LABEL: Record<string, string> = {
  pain: "통증·염증",
  structure: "구조·정렬",
  support: "뒷받침",
};

export default function TreatmentIndex() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "치료 방법", path: "/treatment" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${CLINIC.name} 치료 방법`,
          itemListElement: TREATMENTS.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "MedicalProcedure",
              name: t.fullName,
              alternateName: t.name,
              url: `${SITE_URL}/treatment/${t.slug}`,
              description: t.summary,
              howPerformed: t.lede,
            },
          })),
        }}
      />
      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.25rem,4vw,4rem)] py-12">
        <PageHead eyebrow="치료 방법" title={AXIS_STORY.title} lede={AXIS_STORY.lede} />

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {AXIS_STORY.axes.map((a) => (
            <Link
              key={a.key}
              href={`/treatment/${a.slug}`}
              className={
                "press rounded-[2rem] p-8 transition-shadow " +
                (a.key === "pain"
                  ? "bg-herb text-paper"
                  : "bg-surface ring-1 ring-line hover:ring-herb")
              }
            >
              <p
                className={
                  "font-mono text-[11px] uppercase tracking-[0.15em] " +
                  (a.key === "pain" ? "text-paper/60" : "text-herb")
                }
              >
                {a.label}
              </p>
              <h2 className="kr mt-4 text-2xl font-bold">{a.treatment}</h2>
              <p
                className={
                  "kr mt-3 text-[15px] leading-7 " +
                  (a.key === "pain" ? "text-paper/80" : "text-muted")
                }
              >
                {a.body}
              </p>
            </Link>
          ))}
        </div>
        <p className="kr mt-4 rounded-2xl bg-tint px-6 py-5 text-[15px] leading-7 ring-1 ring-herb/15">
          {AXIS_STORY.note}
        </p>

        <div className="mt-14 border-t border-line">
          {TREATMENTS.map((t) => (
            <Link
              key={t.slug}
              href={`/treatment/${t.slug}`}
              className="group grid gap-2 border-b border-line py-7 transition-colors hover:bg-surface"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                  {AXIS_LABEL[t.axis]}
                </span>
                {t.covered && (
                  <span className="rounded border border-herb-line bg-tint px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-herb">
                    건강보험
                  </span>
                )}
              </div>
              <h3 className="kr text-xl font-bold leading-snug transition-colors group-hover:text-herb">
                {t.fullName}
              </h3>
              <p className="kr max-w-[56ch] text-[15px] leading-7 text-muted">{t.summary}</p>
            </Link>
          ))}
        </div>
        <Cta />
      </article>
    </>
  );
}
