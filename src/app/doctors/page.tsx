import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CLINIC } from "@/content/clinic";
import { PageHead, Section, Cta, JsonLd, Arrow } from "@/components/site";
import { breadcrumb, medicalWebPage } from "@/content/schema";

export const metadata: Metadata = {
  title: "의료진 소개",
  description: `${CLINIC.name} 이진희·왕소정 원장이 함께 진료합니다.`,
};

export default function Doctors() {
  return (
    <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.5rem,6vw,7rem)] py-12">
      <JsonLd
        data={medicalWebPage({
          name: `${CLINIC.name} 의료진 소개`,
          path: "/doctors",
          description: "이진희·왕소정 원장이 함께 진료합니다.",
        })}
      />
      <JsonLd data={breadcrumb([{ name: "의료진 소개", path: "/doctors" }])} />

      <PageHead
        eyebrow="의료진 소개"
        title="두 원장이 함께 진료합니다"
        lede="이진희 원장과 왕소정 원장이 함께 봅니다."
      />

      {/* 이력은 줄글로 늘어놓으면 눈이 미끄러진다. 사진 옆에 묶음별로 세운다 */}
      {CLINIC.doctors.map((d) => (
        <Section key={d.key} title={`${d.name} ${d.role}`}>
          <div className="grid gap-8 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-10">
            {/* 회색 판은 사진보다 옆으로 넓게. 아래는 붙여 둔다 */}
            <div className="self-start overflow-hidden rounded-[1.5rem] bg-surface-2 px-5">
              <Image
                src={d.photo.src}
                alt={`${CLINIC.name} ${d.name} ${d.role}`}
                width={d.photo.w}
                height={d.photo.h}
                sizes="13rem"
                className="block h-auto w-full mix-blend-multiply"
              />
            </div>
            <div className="grid gap-6">
              <p className="kr text-[17px] leading-8">{d.line}</p>
              {Object.entries(d.career).map(([group, items]: [string, string[]]) => (
                <div key={group} className="rounded-[1.25rem] border border-line bg-surface p-6">
                  <p className="kr text-[12px] font-medium uppercase tracking-[0.12em] text-faint">
                    {group}
                  </p>
                  <ul className="mt-3 grid gap-2">
                    {items.map((it) => (
                      <li key={it} className="kr flex gap-2.5 text-[16px] leading-7">
                        <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-herb" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <Section title="더 보기">
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href="/about" className="tile block bg-surface px-6 py-5">
            <span className="kr font-semibold">병원 소개</span>
            <span className="kr mt-1 block text-[15px] text-muted">진료 방침과 공간, 진료 시간</span>
            <span className="tile-arrow mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-herb">
              보러 가기
              <Arrow />
            </span>
          </Link>
          <Link href="/reservation" className="tile block bg-surface px-6 py-5">
            <span className="kr font-semibold">예약 · 상담</span>
            <span className="kr mt-1 block text-[15px] text-muted">
              원장 지정 예약도 말씀해 주시면 됩니다.
            </span>
            <span className="tile-arrow mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-herb">
              보러 가기
              <Arrow />
            </span>
          </Link>
        </div>
      </Section>

      <Cta label="예약 · 상담" />
    </article>
  );
}
