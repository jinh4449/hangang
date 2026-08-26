import Link from "next/link";
import type { Metadata } from "next";
import { PRICING, type PriceRow } from "@/content/pricing";
import { SYMPTOMS } from "@/content/symptoms";
import { CLINIC } from "@/content/clinic";
import { PageHead, Section, Cta, JsonLd, Arrow } from "@/components/site";
import { breadcrumb, medicalWebPage } from "@/content/schema";

export const metadata: Metadata = {
  title: "진료비 안내 — 건강보험 적용 항목과 비급여 진료비용",
  description:
    "침·뜸·부항·추나요법 등 건강보험 적용 항목의 본인부담률과 비급여 진료비용을 안내합니다. 추나요법은 연 20회까지 급여로 인정됩니다.",
};

/** 금액이 정해지지 않은 항목은 비워 두지 않고 무엇을 해야 하는지 알려 준다 */
function Price({ row }: { row: PriceRow }) {
  return row.price ? (
    <span className="tabular-nums font-medium">{row.price}</span>
  ) : (
    <span className="text-faint">진찰 후 안내</span>
  );
}

function PriceTable({ rows }: { rows: readonly PriceRow[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
      {/* 320px 화면에도 들어가는 폭. 그보다 좁아지면 래퍼 안에서만 스크롤한다 */}
      <table className="w-full min-w-[17rem] border-collapse text-[15px]">
        <thead>
          <tr className="bg-surface-2">
            {["항목", "본인부담"].map((h) => (
              <th
                key={h}
                className="border-b border-line px-5 py-3 text-left font-mono text-[10px] font-normal uppercase tracking-[0.1em] text-faint last:text-right"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.item}>
              <td className="border-b border-line px-5 py-4 align-top last:border-0">
                <span className="kr font-medium">{r.item}</span>
                {r.note && <span className="kr mt-1 block text-xs leading-6 text-faint">{r.note}</span>}
              </td>
              <td className="border-b border-line px-5 py-4 text-right align-top whitespace-nowrap">
                <Price row={r} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CostIndexPage() {
  return (
    <>
      <JsonLd
        data={medicalWebPage({
          name: `${CLINIC.name} 진료비 안내`,
          path: "/cost",
          description:
            "건강보험이 적용되는 치료의 본인부담률과 비급여 진료비용을 안내합니다.",
        })}
      />
      <JsonLd data={breadcrumb([{ name: "진료비 안내", path: "/cost" }])} />

      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.25rem,4vw,4rem)] py-12">
        <PageHead
          eyebrow="진료비 안내"
          title="치료 가격이 궁금하신가요"
          lede="건강보험이 적용되는 치료와 그렇지 않은 치료를 나눠서 안내해 드립니다. 비급여 항목은 시작하기 전에 금액을 말씀드립니다."
        />

        <Section title={PRICING.covered.title} note={PRICING.covered.lede}>
          <PriceTable rows={PRICING.covered.rows} />
          <ul className="readlist mt-6">
            {PRICING.covered.notes.map((n) => (
              <li key={n} className="kr text-[15px]">
                {n}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={PRICING.uncovered.title} note={PRICING.uncovered.lede}>
          <div className="grid gap-8">
            {PRICING.uncovered.groups.map((g) => (
              /* min-w-0가 없으면 그리드 자식이 표 너비만큼 부풀어 페이지를 밀어낸다 */
              <div key={g.title} className="min-w-0">
                <h3 className="kr text-lg font-bold">{g.title}</h3>
                {g.note && <p className="kr mt-1 text-sm leading-7 text-muted">{g.note}</p>}
                <div className="mt-3">
                  <PriceTable rows={g.rows} />
                </div>
              </div>
            ))}
          </div>
          <p className="kr mt-6 rounded-2xl border border-ochre-line bg-ochre-soft px-6 py-5 text-sm leading-7">
            비급여 진료비용은 의료법 제45조에 따라 원내에도 게시하고 있습니다. 표에 없는 항목이나
            정확한 금액은 {CLINIC.phone} 로 문의해 주세요.
            <span className="mt-1 block text-xs text-muted">최종 확인 {PRICING.updated}</span>
          </p>
        </Section>

        <Section title="비용을 정하는 기준">
          <div className="border-t border-line">
            {PRICING.howWeDecide.map((h) => (
              <div key={h.title} className="border-b border-line py-6">
                <h3 className="kr font-bold">{h.title}</h3>
                <p className="kr mt-2 max-w-[56ch] text-[15px] leading-8 text-muted">{h.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Cta label="비용 상담받기" />
      </article>
    </>
  );
}
