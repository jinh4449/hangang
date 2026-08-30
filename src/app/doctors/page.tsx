import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CLINIC } from "@/content/clinic";
import { PageHead, Section, Cta, JsonLd, Arrow } from "@/components/site";
import { CoDoctorIcon } from "@/components/icons";
import { breadcrumb, medicalWebPage } from "@/content/schema";

export const metadata: Metadata = {
  title: "의료진 소개",
  description: `${CLINIC.name} 이진희·왕소정 원장. 두 원장이 함께 진료하며, 판단이 어려운 경우에는 함께 상의해 방향을 정합니다.`,
};

/** 협진이 어떤 자리에서 도움이 되는지. 진료실에서 실제로 나오는 상황만 적는다 */
const CO_CARE = [
  {
    title: "편한 쪽을 고르실 수 있습니다",
    body: "산후나 갱년기, 다이어트처럼 이야기 꺼내기 조심스러운 진료에서는 원장을 지정해 예약하실 수 있습니다. 예약하실 때 말씀해 주세요.",
  },
  {
    title: "판단이 어려우면 함께 봅니다",
    body: "한 사람의 생각으로 치료 방향을 정하지 않습니다. 애매한 경우에는 두 원장이 상의한 뒤에 말씀드립니다.",
  },
  {
    title: "치료 중에 바뀌어도 이어집니다",
    body: "차트를 함께 보기 때문에 담당이 바뀌어도 처음부터 다시 설명하지 않으셔도 됩니다.",
  },
];

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
        lede="이진희 원장과 왕소정 원장이 함께 봅니다. 진료받기 편한 쪽을 고르실 수 있고, 판단이 어려운 경우에는 두 사람이 상의해 방향을 정합니다."
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

      <Section
        title="함께 진료한다는 것"
        note="원장이 둘이라는 사실보다, 그래서 무엇이 달라지는지가 중요합니다."
      >
        <div className="rounded-[2rem] bg-tint p-8 ring-1 ring-herb/15 md:p-10">
          <CoDoctorIcon className="h-10 w-10 text-herb" />
          <p className="kr mt-5 text-xl font-bold leading-snug">
            한 사람의 생각으로 치료 방향을 정하지 않습니다
          </p>
        </div>

        <div className="mt-6 border-t border-line">
          {CO_CARE.map((c) => (
            <div key={c.title} className="border-b border-line py-7">
              <h3 className="kr text-lg font-bold leading-snug">{c.title}</h3>
              <p className="kr mt-3 max-w-[56ch] text-[16px] leading-8 text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

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
