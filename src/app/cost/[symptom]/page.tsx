import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SYMPTOMS, getSymptom } from "@/content/symptoms";
import { IntentNav, PageHead, Section, Cta, JsonLd } from "@/components/site";
import { costSchema, breadcrumb } from "@/content/schema";

export const generateStaticParams = () => SYMPTOMS.map((s) => ({ symptom: s.slug }));

export async function generateMetadata({ params }: PageProps<"/cost/[symptom]">): Promise<Metadata> {
  const s = getSymptom((await params).symptom);
  if (!s) return {};
  return {
    title: `${s.name} 치료 비용과 보험 적용`,
    description: s.cost.lede.slice(0, 150),
  };
}

const COVERAGE_STYLE: Record<string, string> = {
  급여: "border-herb-line bg-tint text-herb",
  비급여: "border-line bg-surface-2 text-muted",
  자동차보험: "border-ochre-line bg-ochre-soft text-ochre",
};

export default async function CostPage({ params }: PageProps<"/cost/[symptom]">) {
  const s = getSymptom((await params).symptom);
  if (!s) notFound();

  return (
    <>
      <IntentNav slug={s.slug} name={s.name} current="cost" />
      <JsonLd
        data={costSchema({
          name: `${s.name} 치료 비용과 보험 적용`,
          path: `/cost/${s.slug}`,
          condition: s.clinicalName,
          rows: [...s.cost.rows],
        })}
      />
      <JsonLd
        data={breadcrumb([
          { name: s.name, path: `/care/${s.slug}` },
          { name: "비용·보험", path: `/cost/${s.slug}` },
        ])}
      />
      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.25rem,4vw,4rem)] py-12">
        <Link href="/cost" className="font-mono text-xs text-herb hover:underline">
          ← 진료비 안내
        </Link>
        <div className="mt-6" />
        <PageHead
          eyebrow="비용 · 보험"
          title={`${s.name} 치료, 얼마나 드나요`}
          lede={s.cost.lede}
        />

        <Section
          title="항목별 비용"
          note="아래는 예시 금액입니다. 실제 본인부담금은 상태와 치료 구성에 따라 달라지며, 진찰 후 안내해 드립니다."
        >
          <div className="overflow-x-auto rounded border border-line bg-surface">
            <table className="w-full min-w-[520px] border-collapse text-[15px]">
              <thead>
                <tr className="bg-surface-2">
                  {["항목", "보험", "본인부담 예시"].map((h) => (
                    <th
                      key={h}
                      className="border-b border-line px-4 py-3 text-left font-mono text-[10px] font-normal uppercase tracking-[0.1em] text-faint"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.cost.rows.map((r) => (
                  <tr key={r.item}>
                    <td className="border-b border-line px-4 py-3.5 align-top font-medium">
                      {r.item}
                      {r.note && <span className="mt-1 block text-xs text-faint">{r.note}</span>}
                    </td>
                    <td className="border-b border-line px-4 py-3.5 align-top">
                      <span
                        className={`inline-block whitespace-nowrap rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${COVERAGE_STYLE[r.coverage]}`}
                      >
                        {r.coverage}
                      </span>
                    </td>
                    <td className="border-b border-line px-4 py-3.5 align-top tabular-nums">
                      {r.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="보험별 안내">
          <div className="grid gap-3">
            {s.cost.insurance.map((i) => (
              <div key={i.title} className="rounded border border-line bg-surface p-5">
                <h3 className="font-semibold">{i.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-muted">{i.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Cta label="비용 상담받기" />
      </article>
    </>
  );
}
