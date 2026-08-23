import type { Metadata } from "next";
import { CLINIC } from "@/content/clinic";
import { PageHead, Section } from "@/components/site";

export const metadata: Metadata = { title: "오시는 길" };

export default function Directions() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <PageHead
        eyebrow="오시는 길"
        title="오시는 길과 주차"
        lede="주차와 대중교통 정보를 미리 확인하고 오시면 편합니다."
      />
      <Section title="위치">
        <p className="text-[15px] leading-8">{CLINIC.address}</p>
        {/* TODO: 카카오맵 또는 네이버지도 임베드 */}
        <div className="mt-4 flex h-64 items-center justify-center rounded border border-dashed border-line bg-surface-2 text-sm text-faint">
          지도 임베드 자리
        </div>
      </Section>
      <Section title="주차">
        <p className="text-[15px] leading-8">{CLINIC.parking}</p>
      </Section>
      <Section title="대중교통">
        <p className="text-[15px] leading-8">{CLINIC.transit}</p>
      </Section>
    </article>
  );
}
