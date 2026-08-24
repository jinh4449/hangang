import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SYMPTOMS, getSymptom } from "@/content/symptoms";
import { IntentNav, PageHead, Cta, JsonLd } from "@/components/site";
import { breadcrumb } from "@/content/schema";

export const generateStaticParams = () => SYMPTOMS.map((s) => ({ symptom: s.slug }));

export async function generateMetadata({ params }: PageProps<"/faq/[symptom]">): Promise<Metadata> {
  const s = getSymptom((await params).symptom);
  if (!s) return {};
  return {
    title: `${s.name} 자주 묻는 질문`,
    description: s.faq.map((f) => f.q).join(" ").slice(0, 150),
  };
}

export default async function FaqPage({ params }: PageProps<"/faq/[symptom]">) {
  const s = getSymptom((await params).symptom);
  if (!s) notFound();

  return (
    <>
      <IntentNav slug={s.slug} name={s.name} current="faq" />
      {/* FAQPage 스키마 — 검색 결과에 질문이 그대로 노출되는 경로다 */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: s.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <JsonLd
        data={breadcrumb([
          { name: s.name, path: `/care/${s.slug}` },
          { name: "자주 묻는 질문", path: `/faq/${s.slug}` },
        ])}
      />
      <article className="mx-auto max-w-3xl px-5 py-12">
        <PageHead
          eyebrow="자주 묻는 질문"
          title={`${s.name}, 이런 것들을 많이 물어보십니다`}
          lede="진료실에서 실제로 가장 자주 나오는 질문들을 정리했습니다."
        />
        <div className="mt-12 border-t border-line">
          {s.faq.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-baseline gap-3 py-5 font-semibold marker:hidden">
                <span className="font-mono text-sm text-herb">Q</span>
                <span className="flex-1">{f.q}</span>
                <span className="text-faint transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-[62ch] pb-6 pl-7 text-[15px] leading-8 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <Cta />
      </article>
    </>
  );
}
