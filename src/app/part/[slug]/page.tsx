import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PARTS, getPart } from "@/content/part";
import { getTreatment } from "@/content/treatment";
import { PageHead, Section, Cta, JsonLd } from "@/components/site";
import { breadcrumb, SITE_URL } from "@/content/schema";
import { withJosa } from "@/content/josa";

export const generateStaticParams = () => PARTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<"/part/[slug]">): Promise<Metadata> {
  const p = getPart((await params).slug);
  if (!p) return {};
  return { title: `${p.name} 통증 — ${p.conditions[0]} 등`, description: p.lede.slice(0, 150) };
}

export default async function PartPage({ params }: PageProps<"/part/[slug]">) {
  const p = getPart((await params).slug);
  if (!p) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: `${p.name} 통증 치료`,
          description: p.lede,
          url: `${SITE_URL}/part/${p.slug}`,
          inLanguage: "ko",
          provider: { "@id": `${SITE_URL}/#clinic` },
          about: p.conditions.map((c) => ({ "@type": "MedicalCondition", name: c })),
          mentions: p.approach.map((a) => {
            const t = getTreatment(a.treatmentSlug);
            return { "@type": "MedicalProcedure", name: t?.fullName ?? a.treatmentSlug };
          }),
        }}
      />
      <JsonLd
        data={breadcrumb([
          { name: "부위별 안내", path: "/part" },
          { name: p.name, path: `/part/${p.slug}` },
        ])}
      />
      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.25rem,4vw,4rem)] py-12">
        <Link href="/part" className="font-mono text-xs text-herb hover:underline">
          ← 부위별 안내
        </Link>
        <div className="mt-6">
          <PageHead eyebrow={p.conditions.join(" · ")} title={`${p.name} 통증`} lede={p.lede} />
        </div>

        <Section title="이런 증상이 있다면">
          <ul className="readlist sm:grid-cols-2 sm:gap-x-10">
            {p.signs.map((s) => (
              <li key={s} className="kr text-[15.5px]">
                {s}
              </li>
            ))}
          </ul>
        </Section>

        {/* 이 페이지의 핵심 — 부위마다 각 기법이 무엇을 맡는지 */}
        <Section
          title={`${withJosa(p.name, "은는")} 이렇게 접근합니다`}
          note="통증을 줄이는 치료와 구조를 바로잡는 치료를 나눠서 씁니다."
        >
          <div className="grid gap-3">
            {p.approach.map((a) => {
              const t = getTreatment(a.treatmentSlug);
              if (!t) return null;
              const isPain = t.axis === "pain";
              return (
                <div
                  key={a.treatmentSlug}
                  className={
                    "rounded-[2rem] p-7 " +
                    (isPain
                      ? "border border-herb/25 bg-tint hover:border-herb"
                      : "bg-surface ring-1 ring-line hover:ring-herb")
                  }
                >
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="kr text-lg font-bold">{t.fullName}</h3>
                    {t.covered && (
                      <span className="rounded border border-herb-line bg-surface px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-herb">
                        건강보험
                      </span>
                    )}
                  </div>
                  <p className="kr mt-3 text-[15px] leading-8 text-muted">{a.role}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="예상 기간">
          <p className="kr max-w-[58ch] rounded-2xl bg-surface p-5 text-[15px] leading-8 ring-1 ring-line">
            {p.span} 개인차가 있어 진찰 후에 다시 잡습니다.
          </p>
        </Section>

        <Section title="함께 보기">
          <div className="flex flex-wrap gap-2">
            <Link href="/care/pain" className="badge inline-block rounded-full border border-line bg-surface px-5 py-2.5 text-sm hover:border-herb">
              통증치료 전체 안내
            </Link>
            <Link href="/cost/pain" className="badge inline-block rounded-full border border-line bg-surface px-5 py-2.5 text-sm hover:border-herb">
              비용·보험
            </Link>
            <Link href="/doubt/pain" className="badge inline-block rounded-full border border-line bg-surface px-5 py-2.5 text-sm hover:border-herb">
              효과가 있긴 한가요
            </Link>
          </div>
        </Section>

        <Cta />
      </article>
    </>
  );
}
