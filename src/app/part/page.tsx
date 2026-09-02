import Link from "next/link";
import type { Metadata } from "next";
import { PARTS } from "@/content/part";
import { PageHead, Cta, JsonLd } from "@/components/site";
import { webPage, breadcrumb } from "@/content/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/part" },
  title: "김포 통증·근골격 한의원 — 어깨·목·허리·무릎",
  description:
    "김포한강한의원 통증·근골격. 어깨, 목, 허리, 무릎, 팔꿈치, 발·발목 여섯 부위. 부위마다 문제가 생기는 조직이 다르고 쓰는 치료가 다릅니다. 초음파로 확인한 뒤 방향을 정합니다.",
};

export default function PartIndex() {
  return (
    <>
      <JsonLd
        data={webPage({
          name: "통증 · 근골격",
          description: "어깨, 목, 허리, 무릎, 팔꿈치, 발목. 부위마다 쓰는 치료가 다릅니다.",
          path: "/part",
        })}
      />
      <JsonLd data={breadcrumb([{ name: "통증 · 근골격", path: "/part" }])} />
      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.5rem,6vw,7rem)] py-12">
        <PageHead
          eyebrow="질환별 의학정보"
          title="통증 · 근골격"
          lede="같은 통증치료라도 부위마다 문제가 생기는 조직이 다르고, 그에 따라 쓰는 치료가 달라집니다. 아픈 곳을 고르시면 그 부위의 흔한 원인부터 보여드립니다."
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
