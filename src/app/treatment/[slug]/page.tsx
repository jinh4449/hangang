import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { TREATMENTS, getTreatment } from "@/content/treatment";
import { getPart } from "@/content/part";
import { PageHead, Section, Cta, JsonLd } from "@/components/site";
import { Blocks } from "@/components/blocks";
import { breadcrumb, SITE_URL } from "@/content/schema";

export const generateStaticParams = () => TREATMENTS.map((t) => ({ slug: t.slug }));

export async function generateMetadata({ params }: PageProps<"/treatment/[slug]">): Promise<Metadata> {
  const t = getTreatment((await params).slug);
  if (!t) return {};
  return { title: t.fullName, description: t.summary };
}

export default async function TreatmentPage({ params }: PageProps<"/treatment/[slug]">) {
  const t = getTreatment((await params).slug);
  if (!t) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          name: t.fullName,
          alternateName: t.name,
          url: `${SITE_URL}/treatment/${t.slug}`,
          description: t.summary,
          howPerformed: t.lede,
          indication: t.goodFor.map((g) => ({ "@type": "MedicalIndication", description: g })),
          provider: { "@id": `${SITE_URL}/#clinic` },
        }}
      />
      <JsonLd
        data={breadcrumb([
          { name: "치료 방법", path: "/treatment" },
          { name: t.fullName, path: `/treatment/${t.slug}` },
        ])}
      />
      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.25rem,4vw,4rem)] py-12">
        <Link href="/treatment" className="font-mono text-xs text-herb hover:underline">
          ← 치료 방법
        </Link>
        <div className="mt-6">
          <PageHead
            eyebrow={t.covered ? "건강보험 적용" : "비급여"}
            title={t.fullName}
            lede={t.lede}
          />
        </div>

        <Blocks blocks={t.body} />

        <Section title="이런 경우에 씁니다">
          <ul className="grid gap-2 sm:grid-cols-2">
            {t.goodFor.map((g) => (
              <li
                key={g}
                className="kr rounded-2xl border border-herb/15 bg-tint px-5 py-3.5 text-[15px] leading-7"
              >
                {g}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="한계와 주의" note="이 치료로 해결되지 않는 부분을 먼저 말씀드립니다.">
          <ul className="grid gap-2">
            {t.limits.map((l) => (
              <li
                key={l}
                className="kr rounded-2xl border border-rust-line bg-rust-soft px-5 py-3.5 text-[15px] leading-7"
              >
                {l}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="비용">
          <p className="kr max-w-[58ch] rounded-2xl bg-surface p-5 text-[15px] leading-8 ring-1 ring-line">
            {t.cost}
          </p>
        </Section>

        {t.partSlugs.length > 0 && (
          <Section title="이 치료를 많이 쓰는 부위">
            <div className="flex flex-wrap gap-2">
              {t.partSlugs.map((ps) => {
                const p = getPart(ps);
                if (!p) return null;
                return (
                  <Link
                    key={ps}
                    href={`/part/${ps}`}
                    className="badge inline-block rounded-full border border-line bg-surface px-5 py-2.5 text-sm hover:border-herb"
                  >
                    {p.name}
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
