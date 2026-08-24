import Link from "next/link";
import type { Metadata } from "next";
import { SYMPTOMS } from "@/content/symptoms";
import { CLINIC } from "@/content/clinic";
import { PageHead, Cta, JsonLd, Arrow } from "@/components/site";
import { SYMPTOM_ICONS } from "@/components/icons";
import { breadcrumb, medicalWebPage } from "@/content/schema";
import { INTENTS } from "@/content/types";

export const metadata: Metadata = {
  title: "진료과목",
  description: `${CLINIC.name} 진료과목. ${SYMPTOMS.map((s) => s.name).join(", ")}. 과목마다 치료 방법과 예상 기간이 다릅니다.`,
};

export default function CareIndex() {
  return (
    <>
      <JsonLd
        data={medicalWebPage({
          name: `${CLINIC.name} 진료과목`,
          path: "/care",
          description: `${SYMPTOMS.map((s) => s.name).join(", ")}을 진료합니다.`,
        })}
      />
      <JsonLd data={breadcrumb([{ name: "진료과목", path: "/care" }])} />

      <article className="mx-auto max-w-3xl xl:max-w-4xl px-5 py-12">
        <PageHead
          eyebrow="진료과목"
          title="어떤 치료가 필요하신가요"
          lede="과목마다 원인을 찾는 방법도, 쓰는 치료도, 예상되는 기간도 다릅니다. 해당하는 곳을 눌러 확인해 보세요."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {SYMPTOMS.map((s) => {
            const Icon = SYMPTOM_ICONS[s.slug];
            return (
              <Link key={s.slug} href={`/care/${s.slug}`} className="tile block bg-surface p-7">
                {Icon ? <Icon className="h-8 w-8 text-herb" /> : null}
                <h2 className="kr mt-4 text-xl font-bold">{s.name}</h2>
                <p className="mt-1 font-display text-xs text-faint">{s.clinicalName}</p>
                {s.highlight && (
                  <span className="mt-3 inline-block rounded-full bg-ochre-soft px-3 py-1 text-xs font-semibold text-ochre">
                    {s.highlight.label}
                  </span>
                )}
                <p className="kr mt-3 text-[15px] leading-7 text-muted">{s.summary}</p>
                <span className="tile-arrow mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-herb">
                  자세히 보기
                  <Arrow />
                </span>
              </Link>
            );
          })}
        </div>

        {/* 과목마다 네 갈래로 나뉜다는 것을 여기서 한 번 알려 준다 */}
        <section className="mt-12 rounded-[2rem] bg-tint px-7 py-8 ring-1 ring-herb/15">
          <h2 className="kr text-lg font-bold">궁금한 방향에 맞춰 나눠 뒀습니다</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {INTENTS.map((i) => (
              <li key={i.key} className="kr text-[15px] leading-7">
                <strong className="font-semibold">{i.label}</strong>
                <span className="text-muted"> — {i.blurb}</span>
              </li>
            ))}
          </ul>
          <p className="kr mt-5 text-sm leading-7 text-muted">
            과목 페이지에 들어가시면 위 네 가지로 이동하실 수 있습니다.
          </p>
        </section>

        <Cta />
      </article>
    </>
  );
}
