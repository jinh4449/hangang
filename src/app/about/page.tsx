import type { Metadata } from "next";
import { HOURS } from "@/content/hours";
import Link from "next/link";
import Image from "next/image";
import { CLINIC } from "@/content/clinic";
import { PageHead, Section, Bezel, Cta, JsonLd, Arrow } from "@/components/site";
import { WHY_ICONS, UltrasoundIcon } from "@/components/icons";
import { breadcrumb, medicalWebPage } from "@/content/schema";

export const metadata: Metadata = {
  title: "병원 소개",
  description: `${CLINIC.name}. ${CLINIC.tagline}. ${CLINIC.address}. ${CLINIC.transit}.`,
};

export default function About() {
  return (
    <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.25rem,4vw,4rem)] py-12">
      <JsonLd
        data={medicalWebPage({
          name: `${CLINIC.name} 병원 소개`,
          path: "/about",
          description: "진료 방침과 공간, 진료 시간을 안내합니다.",
        })}
      />
      <JsonLd data={breadcrumb([{ name: "병원 소개", path: "/about" }])} />

      <PageHead
        eyebrow="병원 소개"
        title={CLINIC.name}
        lede={`${CLINIC.tagline}. ${CLINIC.landmark}에 있습니다. 이진희·왕소정 두 원장이 함께 진료합니다.`}
      />

      <Section title="진료 방침" note={CLINIC.whyHero.sub}>
        <div className="rounded-[2rem] bg-ink p-8 text-paper md:p-10">
          <p className="kr text-2xl font-bold leading-snug">
            <span className="text-paper/45">&ldquo;</span>
            {CLINIC.whyHero.claim[0]} {CLINIC.whyHero.claim[1]}
            <span className="text-paper/45">&rdquo;</span>
          </p>
          <p className="kr mt-5 max-w-[48ch] leading-8 text-paper/70">{CLINIC.whyHero.body}</p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper/10 px-4 py-2 text-sm font-medium ring-1 ring-paper/15">
            <UltrasoundIcon className="h-4 w-4" />
            {CLINIC.whyHero.badge}
          </span>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {CLINIC.whyHero.proofs.map((pf) => {
            const Icon = WHY_ICONS[pf.key];
            return (
              <li key={pf.key} className="flex gap-3.5 rounded-2xl bg-surface p-6 ring-1 ring-line">
                <span className="mt-0.5 shrink-0 text-herb">
                  {Icon ? <Icon className="h-5 w-5" /> : null}
                </span>
                <span className="kr text-[16px] leading-7 text-muted">
                  <strong className="font-semibold text-ink">{pf.title}</strong> {pf.body}
                </span>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section title="이렇게 진료합니다" note="말로만 드리는 약속이 아니라 실제 진료가 그렇게 굴러갑니다.">
        <div className="border-t border-line">
          {CLINIC.whyUs.map((w) => {
            const Icon = WHY_ICONS[w.key];
            return (
              <div
                key={w.key}
                className="grid gap-4 border-b border-line py-8 sm:grid-cols-[3.5rem_1fr] sm:gap-8"
              >
                <div className="text-herb">{Icon ? <Icon className="h-10 w-10" /> : null}</div>
                <div>
                  <h3 className="kr text-xl font-bold leading-snug">{w.title}</h3>
                  <p className="kr mt-3 max-w-[56ch] text-[16px] leading-8 text-muted">{w.body}</p>
                  {w.basis && <p className="kr mt-3 text-sm text-faint">※ {w.basis}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="공간" note="접수 데스크와 대기 공간입니다. 물리치료실은 안쪽에 따로 있습니다.">
        <figure className="overflow-hidden rounded-[2rem] ring-1 ring-line">
          <Image
            src="/clinic-interior.jpg"
            alt={`${CLINIC.name} 접수 데스크와 대기 공간`}
            width={2000}
            height={1333}
            sizes="(min-width: 928px) 928px, 100vw"
            className="h-auto w-full"
          />
        </figure>
      </Section>

      <Section title="진료 시간" note={`${CLINIC.address} · ${CLINIC.landmark}`}>
        <Bezel>
          <div className="p-7">
            <dl className="grid gap-x-10 text-[15px] sm:grid-cols-2">
              {HOURS.map((h) => (
                <div
                  key={h.day}
                  className="flex items-baseline justify-between border-b border-line py-3"
                >
                  <dt className="text-muted">{h.day}</dt>
                  <dd className="font-display font-medium tabular-nums">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Bezel>
        <div className="mt-4 flex flex-wrap gap-2">
          {CLINIC.badges.map((b) => (
            <span
              key={b}
              className="kr rounded-full border border-herb/20 bg-tint px-5 py-2.5 text-sm font-medium"
            >
              {b}
            </span>
          ))}
        </div>
      </Section>

      <Section title="더 보기">
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href="/doctors" className="tile block bg-surface px-6 py-5">
            <span className="kr font-semibold">의료진 소개</span>
            <span className="kr mt-1 block text-[15px] text-muted">
              이진희 · 왕소정 원장이 함께 진료합니다.
            </span>
            <span className="tile-arrow mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-herb">
              보러 가기
              <Arrow />
            </span>
          </Link>
          <Link href="/directions" className="tile block bg-surface px-6 py-5">
            <span className="kr font-semibold">오시는 길</span>
            <span className="kr mt-1 block text-[15px] text-muted">{CLINIC.transit}</span>
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
