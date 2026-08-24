import type { Metadata } from "next";
import { CLINIC } from "@/content/clinic";
import { PageHead, Section } from "@/components/site";

export const metadata: Metadata = { title: "진료 예약" };

export default function Reservation() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <PageHead
        eyebrow="예약"
        title="진료 예약"
        lede="전화로 예약하시는 것이 가장 빠릅니다. 온라인 예약 연동은 준비 중입니다."
      />
      <Section title="전화 예약">
        <a
          href={CLINIC.phoneHref}
          className="inline-block rounded bg-herb px-6 py-3.5 font-semibold text-paper"
        >
          {CLINIC.phone}
        </a>
      </Section>
      <Section title="진료시간">
        <dl className="border-t border-line">
          {CLINIC.hours.map((h) => (
            <div key={h.day} className="flex justify-between border-b border-line py-3.5">
              <dt className="text-muted">{h.day}</dt>
              <dd className="tabular-nums">
                {h.time}
                {h.note && <span className="ml-2 text-xs text-faint">{h.note}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
      {/* TODO: 네이버 예약 또는 카카오 채널 연동 */}
    </article>
  );
}
