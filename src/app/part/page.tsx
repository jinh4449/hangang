import Link from "next/link";
import type { Metadata } from "next";
import { PARTS } from "@/content/part";
import { PageHead, Cta, JsonLd } from "@/components/site";
import { breadcrumb } from "@/content/schema";

export const metadata: Metadata = {
  title: "부위별 통증 안내",
  description: "어깨, 목, 허리, 무릎, 팔꿈치, 발목. 부위마다 원인과 치료가 다릅니다.",
};

export default function PartIndex() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "부위별 안내", path: "/part" }])} />
      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.5rem,6vw,7rem)] py-12">
        <PageHead
          eyebrow="부위별 안내"
          title="어디가 아프신가요"
          lede="같은 통증치료라도 부위마다 문제가 생기는 조직이 다르고, 그에 따라 쓰는 치료가 달라집니다."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {PARTS.map((p) => (
            <Link
              key={p.slug}
              href={`/part/${p.slug}`}
              className="tile block bg-surface p-7"
            >
              <h2 className="kr text-xl font-bold">{p.name}</h2>
              <p className="kr mt-2 text-[16px] leading-7 text-muted">{p.summary}</p>
              <p className="kr mt-4 text-sm leading-6 text-faint">{p.conditions.join(" · ")}</p>
            </Link>
          ))}
        </div>
        <Cta />
      </article>
    </>
  );
}
