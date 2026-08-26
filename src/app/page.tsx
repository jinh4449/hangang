import Link from "next/link";
import Image from "next/image";
import { CLINIC } from "@/content/clinic";
import { SYMPTOMS, getSymptom } from "@/content/symptoms";
import { COMPARES } from "@/content/compare";
import { columnsByDate } from "@/content/column";
import { PARTS } from "@/content/part";
import { AREAS } from "@/content/area";
import { Bezel, JsonLd, Arrow } from "@/components/site";
import { Reveal } from "@/components/reveal";
import { ClinicStatus } from "@/components/clinic-status";
import { SYMPTOM_ICONS, MapPinIcon } from "@/components/icons";

const pain = getSymptom("pain")!;

/** 메인의 섹션 제목은 모두 같은 크기·같은 정렬로 선다. 여기서만 정한다.
 *  accent는 제목의 뒷부분으로, 히어로와 같은 금빛 그라데이션이 걸린다 */
function H2({
  children,
  accent,
  note,
  small = false,
}: {
  children: React.ReactNode;
  accent?: string;
  note?: string;
  /** 상위 섹션에 딸린 이야기는 한 단계 작게 세워 위계를 만든다 */
  small?: boolean;
}) {
  return (
    <div className="text-center">
      <h2
        className={
          "display kr " +
          (small
            ? "text-2xl sm:text-3xl xl:text-[2.1rem]"
            : "text-3xl sm:text-4xl xl:text-[2.75rem]")
        }
      >
        {children}
        {accent && (
          <>
            {" "}
            <span className="grad">{accent}</span>
          </>
        )}
      </h2>
      {note && (
        <p className="kr mx-auto mt-4 max-w-[52ch] text-base leading-8 text-muted xl:text-[17px] xl:leading-9">
          {note}
        </p>
      )}
    </div>
  );
}

/**
 * 소개 비율 원.
 *
 * 원내 집계가 「절반 이상」이라는 어림값이라 퍼센트를 지어내지 않는다.
 * 대신 절반 자리에 눈금을 두고 원이 그 눈금을 지나 멈추게 해서,
 * 「절반을 넘었다」는 사실만 눈에 보이게 했다.
 */
function ReferralRing() {
  // 눈금을 링 바깥에 두어야 원이 지나갈 때 가려지지 않는다
  const R = 80;
  const CIRC = 2 * Math.PI * R;
  const STOP = 0.56; // 눈금(0.5)을 지난 것이 보일 만큼만

  return (
    <div className="relative mx-auto aspect-square w-[17rem] sm:w-[20rem]">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        <circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke="var(--tint)"
          strokeWidth="16"
        />
        {/* 절반 자리 눈금 — 12시에서 시계 방향으로 반 바퀴 돈 6시, 링 바깥 */}
        <line
          x1="100"
          y1="192"
          x2="100"
          y2="200"
          stroke="var(--herb)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          className="ring-arc"
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke="var(--herb)"
          strokeWidth="16"
          strokeLinecap="round"
          style={
            {
              "--circ": CIRC,
              "--target": CIRC * (1 - STOP),
            } as React.CSSProperties
          }
        />
      </svg>

      <div className="ring-label absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="display kr text-4xl font-black text-herb sm:text-5xl">
          {CLINIC.whyHero.stat.value}
        </span>
        <span className="kr mt-2 max-w-[9rem] text-sm leading-6 text-muted">
          소개로 오십니다
        </span>
      </div>

      <span className="absolute left-1/2 top-full -translate-x-1/2 pt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
        여기가 절반
      </span>
    </div>
  );
}

/** 로드와 동시에 순서대로 나타나는 히어로 조각 */
function Enter({
  d,
  className = "",
  children,
}: {
  d: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`enter ${className}`}
      style={{ "--d": `${d}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: pain.faq.slice(0, 4).map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      {/* 히어로 — 환자가 속으로 던지는 세 가지 질문을 그대로 세운다 */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-22rem] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(30,91,69,.09) 0%, rgba(30,91,69,0) 68%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[80rem] px-[clamp(1.25rem,4vw,4rem)] pb-14 pt-12 text-center sm:pt-16 xl:pb-20 xl:pt-24">
          <Enter d={0}>
            <span className="inline-block rounded-full bg-tint px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-herb">
              {CLINIC.tagline}
            </span>
          </Enter>

          <h1 className="display display-black kr mt-7 text-[2rem] leading-[1.28] sm:text-[2.9rem] lg:text-[3.4rem] xl:text-[4rem] 2xl:text-[4.6rem]">
            <span
              className="enter block"
              style={{ "--d": "110ms" } as React.CSSProperties}
            >
              내 증상, 이해해줄까?
            </span>
            <span
              className="enter block"
              style={{ "--d": "250ms" } as React.CSSProperties}
            >
              편하게 물어봐도 될까?
            </span>
            <span
              className="grad enter block"
              style={{ "--d": "390ms" } as React.CSSProperties}
            >
              믿고 맡겨도 될까?
            </span>
          </h1>

          <Enter d={520}>
            <p className="kr mx-auto mt-7 max-w-[56ch] text-[17px] leading-8 text-muted xl:mt-9 xl:text-[19px] xl:leading-9">
              세 가지 다 물어보셔도 됩니다. 그리고 안 될 것 같으면 안 된다고
              먼저 말씀드립니다. 그 말을 할 수 있어야 맡기실 수 있다고
              생각합니다.
            </p>
          </Enter>

          <Enter d={620}>
            <ul className="mt-9 flex flex-wrap justify-center gap-2">
              {CLINIC.badges.map((b, i) => (
                <li
                  key={b}
                  className={
                    "badge kr cursor-default rounded-full border px-5 py-2.5 text-sm font-medium " +
                    (i === 1
                      ? "border-ochre-line bg-ochre-soft hover:border-ochre"
                      : "border-herb/20 bg-tint hover:border-herb")
                  }
                >
                  {b}
                </li>
              ))}
            </ul>
          </Enter>

          <Enter d={720}>
            <div className="mt-9 flex flex-wrap justify-center gap-2">
              <a
                href={CLINIC.phoneHref}
                className="press inline-flex items-center gap-3 rounded-full bg-herb px-7 py-4 text-lg font-semibold text-paper shadow-[var(--shadow-ambient)]"
              >
                전화 예약 {CLINIC.phone}
              </a>
            </div>
          </Enter>
        </div>

        <Enter
          d={840}
          className="relative mx-auto w-full max-w-[64rem] px-[clamp(1.25rem,4vw,4rem)] pb-16"
        >
          <Bezel>
            <div className="p-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-herb">
                  진료 시간
                </p>
                <ClinicStatus />
              </div>
              <dl className="mt-4 grid gap-x-10 text-[15px] sm:grid-cols-2">
                {CLINIC.hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-baseline justify-between border-b border-line py-3"
                  >
                    <dt className="text-muted">{h.day}</dt>
                    <dd className="font-display font-medium tabular-nums">
                      {h.time}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="kr mt-5 text-sm text-muted">
                {CLINIC.address} · {CLINIC.landmark}
              </p>
            </div>
          </Bezel>
        </Enter>
      </section>

      <div className="mx-auto w-full max-w-[90rem] px-[clamp(1.25rem,4vw,4rem)] py-16 xl:py-24">
        {/* 우리 기준 — 주장을 크게 세우고 오른쪽에서 풀고 아래에서 쪼갠다 */}
        <Reveal>
          <section>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-tint px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-herb">
                {CLINIC.whyHero.eyebrow}
              </span>
              <h2 className="display kr mt-6 text-3xl text-balance sm:text-[2.75rem]">
                {CLINIC.whyHero.headline[0]}
                <br />
                <span className="grad">{CLINIC.whyHero.headline[1]}</span>
              </h2>
              <p className="kr mt-5 text-[17px] leading-8 text-muted">
                {CLINIC.whyHero.sub}
              </p>
            </div>

            <div className="relative mt-10 overflow-hidden rounded-[2rem] bg-ink p-8 text-paper md:p-12 xl:p-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(132,194,167,.16) 0%, rgba(132,194,167,0) 70%)",
                }}
              />

              <div className="relative grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
                <div>
                  <p className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
                    <span
                      aria-hidden="true"
                      className="h-px w-10 bg-paper/30"
                    />
                    {CLINIC.standards.eyebrow}
                  </p>
                  {/* 두 줄로 선다. 넓은 화면에서는 줄이 꺾이지 않게 붙잡아 둔다 */}
                  <h3 className="kr mt-6 text-[1.7rem] font-bold leading-[1.35] tracking-[-0.03em] sm:text-[2.05rem] lg:whitespace-nowrap lg:text-[1.85rem] xl:text-[2.15rem] 2xl:text-[2.5rem]">
                    {CLINIC.standards.headline[0]}
                    <span className="text-herb-light">
                      {CLINIC.standards.headline[1]}
                    </span>
                    <br />
                    {CLINIC.standards.headline[2]}
                  </h3>
                </div>

                <div className="space-y-6">
                  {CLINIC.standards.body.map((t) => (
                    <p
                      key={t}
                      className="kr text-[15px] leading-8 text-paper/70 xl:text-base"
                    >
                      {t}
                    </p>
                  ))}
                </div>
              </div>

              <ul className="relative mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {CLINIC.standards.values.map((v) => (
                  <li
                    key={v.no}
                    className="rounded-[1.25rem] border border-paper/12 bg-paper/[0.04] p-7"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] tracking-[0.1em] text-herb-light">
                        {v.no}
                      </span>
                      <span className="kr rounded-full bg-paper/10 px-3 py-1 text-[11px] font-medium text-paper/70">
                        핵심가치 · {v.tag}
                      </span>
                    </div>
                    <h3 className="kr mt-5 text-lg font-bold leading-snug">
                      {v.title}
                    </h3>
                    <p className="kr mt-3 text-[14px] leading-7 text-paper/60">
                      {v.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* 소개 비율 — 광고가 아니라 다녀간 사람이 데려온다는 이야기 */}
        <Reveal>
          <section className="mt-24">
            <H2
              accent="알고 오시나요?"
              note="처음 오시는 분께 어떻게 알고 오셨는지 여쭤봅니다. 절반 이상이 아는 분 소개라고 답하십니다."
            >
              어떻게
            </H2>
            <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
              <ReferralRing />
              <div className="mx-auto max-w-[34ch] text-center md:mx-0 md:text-left">
                <p className="kr text-[17px] leading-8 text-muted">
                  {CLINIC.whyHero.stat.label}입니다. 다녀가신 분이 가족이나
                  이웃을 데려오시는 경우가 많습니다.
                </p>
                <p className="kr mt-5 text-[15px] leading-7 text-muted">
                  치료가 끝나면 끝났다고 말씀드립니다. 그래서 다시 아플 때, 또
                  주변에 아픈 분이 생겼을 때 저희를 떠올리십니다.
                </p>
                <p className="kr mt-6 text-xs text-faint">
                  ※ {CLINIC.whyHero.stat.basis}
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 진료과목 — 같은 크기 격자 */}
        <Reveal>
          <section className="mt-24">
            <H2
              accent="필요하신가요?"
              note="과목마다 치료 방법과 예상 기간이 다릅니다. 해당하는 곳을 눌러 확인해 보세요."
            >
              어떤 치료가
            </H2>
            {/* 칸을 모두 같은 크기로 세운다. 첫 칸만 색으로 눌러 무게를 준다 */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SYMPTOMS.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/care/${s.slug}`}
                  className={
                    "tile flex min-h-[15rem] flex-col justify-between p-8 " +
                    (i === 0 ? "tile-dark bg-herb text-paper" : "bg-surface")
                  }
                >
                  <div>
                    {(() => {
                      const Icon = SYMPTOM_ICONS[s.slug];
                      return Icon ? (
                        <Icon
                          className={
                            i === 0
                              ? "h-8 w-8 text-paper/70"
                              : "h-8 w-8 text-herb"
                          }
                        />
                      ) : null;
                    })()}
                    <h3 className="kr mt-4 text-xl font-bold leading-snug">
                      {s.name}
                    </h3>
                    <p
                      className={
                        "mt-1 font-display text-xs " +
                        (i === 0 ? "text-paper/60" : "text-faint")
                      }
                    >
                      {s.clinicalName}
                    </p>
                  </div>
                  <div className="mt-6">
                    {s.highlight && (
                      <span
                        className={
                          "mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold " +
                          (i === 0
                            ? "bg-paper/15 text-paper"
                            : "bg-ochre-soft text-ochre")
                        }
                      >
                        {s.highlight.label}
                      </span>
                    )}
                    <p
                      className={
                        "kr text-sm leading-7 " +
                        (i === 0 ? "text-paper/80" : "text-muted")
                      }
                    >
                      {s.summary}
                    </p>
                    <span
                      className={
                        "tile-arrow mt-4 inline-flex items-center gap-1.5 text-sm font-medium " +
                        (i === 0 ? "text-paper" : "text-herb")
                      }
                    >
                      자세히 보기
                      <Arrow />
                    </span>
                  </div>
                </Link>
              ))}

              {/* 진료과목이 5개라 3열 격자에 한 칸이 빈다. 없는 과목을 지어내는 대신
                  이미 있는 부위별 페이지로 채운다 */}
              <Link
                href="/part"
                className="tile flex min-h-[15rem] flex-col justify-between bg-surface p-8"
              >
                <div>
                  <MapPinIcon className="h-8 w-8 text-herb" />
                  <h3 className="kr mt-4 text-xl font-bold leading-snug">
                    부위별로 찾기
                  </h3>
                  <p className="mt-1 font-display text-xs text-faint">
                    {PARTS.map((p) => p.name).join(" · ")}
                  </p>
                </div>
                <div className="mt-6">
                  <p className="kr text-sm leading-7 text-muted">
                    아픈 곳이 어디인지로 찾으시면 해당 부위의 흔한 원인부터
                    보여드립니다.
                  </p>
                  <span className="tile-arrow mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-herb">
                    자세히 보기
                    <Arrow />
                  </span>
                </div>
              </Link>
            </div>
          </section>
        </Reveal>

        {/* 진료비 — 물어보기 전에 먼저 꺼낸다 */}
        <Reveal>
          <section className="mt-24">
            <H2
              small
              accent="궁금하신가요?"
              note="건강보험이 적용되는 치료와 그렇지 않은 치료를 나눠서 안내해 드립니다. 비급여 항목은 시작하기 전에 금액을 말씀드립니다."
            >
              치료 가격이
            </H2>
            <div className="mt-10 grid gap-3 md:grid-cols-3">
              <Link href="/cost" className="tile bg-surface p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-herb">
                  건강보험
                </p>
                <h3 className="kr mt-4 text-xl font-bold">
                  보험이 적용되는 치료
                </h3>
                <p className="kr mt-3 text-[15px] leading-7 text-muted">
                  침, 뜸, 부항, 추나요법, 보험 한약제제는 건강보험이 적용됩니다.
                  추나요법은 연 20회까지 급여로 인정됩니다.
                </p>
                <span className="tile-arrow mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-herb">
                  본인부담률 보기
                  <Arrow />
                </span>
              </Link>

              <Link href="/cost" className="tile bg-surface p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-herb">
                  비급여
                </p>
                <h3 className="kr mt-4 text-xl font-bold">비급여 진료비용</h3>
                <p className="kr mt-3 text-[15px] leading-7 text-muted">
                  약침과 한약처럼 보험이 적용되지 않는 항목입니다. 치료를
                  시작하기 전에 금액을 말씀드리고 동의를 받습니다.
                </p>
                <span className="tile-arrow mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-herb">
                  수가표 보기
                  <Arrow />
                </span>
              </Link>

              <Link href="/cost/car-accident" className="tile bg-surface p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ochre">
                  자동차보험
                </p>
                <h3 className="kr mt-4 text-xl font-bold">교통사고 치료</h3>
                <p className="kr mt-3 text-[15px] leading-7 text-muted">
                  상대 보험사에 대인접수가 되면 본인부담금 없이 치료받으실 수
                  있습니다. 접수 번호만 알려주시면 저희가 처리합니다.
                </p>
                <span className="tile-arrow mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-herb">
                  절차 보기
                  <Arrow />
                </span>
              </Link>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/cost"
                className="press inline-flex items-center gap-2 rounded-full bg-surface px-7 py-3.5 font-medium ring-1 ring-line"
              >
                진료비 안내 전체 보기
                <Arrow className="arw" />
              </Link>
            </div>
          </section>
        </Reveal>

        {/* 지역 진료 — 장기동에 있어서 오시는 분이 대부분 이 동네다 */}
        <Reveal>
          <section className="mt-24">
            <H2
              accent="진료합니다"
              note="장기역 도보 1분, 다이소 맞은편에 있습니다. 한강신도시와 장기동에서 걸어오시거나 퇴근길에 들르시는 분이 대부분입니다."
            >
              김포 장기동에서
            </H2>
            <div className="mt-10 grid gap-3 md:grid-cols-3">
              <Link href="/treatment/chuna" className="tile bg-surface p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-herb">
                  추나요법
                </p>
                <h3 className="kr mt-4 text-xl font-bold">김포 추나치료</h3>
                <p className="kr mt-3 text-[15px] leading-7 text-muted">
                  건강보험이 적용되는 추나요법입니다. 연 20회까지 급여로
                  인정됩니다.
                </p>
                <span className="tile-arrow mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-herb">
                  자세히 보기
                  <Arrow />
                </span>
              </Link>

              <Link href="/care/pain" className="tile bg-surface p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-herb">
                  통증치료
                </p>
                <h3 className="kr mt-4 text-xl font-bold">김포 통증치료</h3>
                <p className="kr mt-3 text-[15px] leading-7 text-muted">
                  허리, 목, 어깨, 무릎. 참고 지내던 통증의 원인을 먼저 찾습니다.
                </p>
                <span className="tile-arrow mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-herb">
                  자세히 보기
                  <Arrow />
                </span>
              </Link>

              <Link href="/area/gimpo-accident" className="tile bg-surface p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ochre">
                  자동차보험
                </p>
                <h3 className="kr mt-4 text-xl font-bold">김포 교통사고</h3>
                <p className="kr mt-3 text-[15px] leading-7 text-muted">
                  대인접수가 되면 본인부담금 없이 치료받으실 수 있습니다.
                </p>
                <span className="tile-arrow mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-herb">
                  자세히 보기
                  <Arrow />
                </span>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                동네별
              </span>
              {AREAS.map((a) => (
                <Link
                  key={a.slug}
                  href={`/area/${a.slug}`}
                  className="badge inline-block rounded-full border border-line bg-surface px-5 py-2.5 text-sm hover:border-herb"
                >
                  {a.name}
                </Link>
              ))}
            </div>
          </section>
        </Reveal>

        {/* 고민 — 의도 분해의 마지막 칸 */}
        <Reveal>
          <section className="mt-24">
            <H2
              accent="되실 때"
              note="어디로 가야 할지, 정말 효과가 있는지 헷갈릴 때 참고하세요."
            >
              고민
            </H2>
            <div className="mt-10 grid gap-2">
              {COMPARES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="tile block bg-surface px-6 py-5"
                >
                  <span className="kr font-semibold">{c.title}</span>
                  <span className="kr mt-1 block text-sm text-muted">
                    {c.question}
                  </span>
                </Link>
              ))}
              {SYMPTOMS.map((s) => (
                <Link
                  key={s.slug}
                  href={`/doubt/${s.slug}`}
                  className="tile block bg-surface px-6 py-5"
                >
                  <span className="kr font-semibold">{s.doubt.question}</span>
                  <span className="kr mt-1 block text-sm text-muted">
                    도움이 되는 경우와 그렇지 않은 경우를 나눠서 설명드립니다.
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>

        {/* 최신 칼럼 — 검색으로 들어온 사람에게 읽을거리를 준다 */}
        <Reveal>
          <section className="mt-24">
            <H2 accent="자주 받는 질문">진료실에서</H2>
            <div className="mt-10 grid gap-2 md:grid-cols-2">
              {columnsByDate()
                .slice(0, 4)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/column/${c.slug}`}
                    className="tile block bg-surface px-6 py-5"
                  >
                    <span className="kr font-semibold leading-snug">
                      {c.title}
                    </span>
                    <span className="kr mt-1.5 block text-sm leading-7 text-muted">
                      {c.summary}
                    </span>
                  </Link>
                ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/column"
                className="text-sm font-medium text-herb hover:underline"
              >
                칼럼 전체 보기
              </Link>
            </div>
          </section>
        </Reveal>

        {/* 리뷰 — 페이지에 심지 않고 외부로 내보낸다 (의료법 56조②) */}
        <Reveal>
          <section className="mt-24 rounded-[2rem] bg-surface p-8 text-center ring-1 ring-line md:p-12">
            <H2 accent="직접 확인해 보세요">리뷰는</H2>
            <p className="kr mx-auto mt-4 max-w-[46ch] leading-8 text-muted">
              의료법에 따라 환자분들의 후기를 저희 홈페이지에 직접 싣지
              않습니다. 네이버와 구글에서 있는 그대로 확인하실 수 있습니다.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={`https://map.naver.com/p/search/${encodeURIComponent(CLINIC.name)}`}
                target="_blank"
                rel="noopener"
                className="press rounded-full bg-[#03C75A] px-7 py-3.5 font-semibold text-white"
              >
                네이버 지도에서 보기
              </a>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(CLINIC.name)}`}
                target="_blank"
                rel="noopener"
                className="press rounded-full bg-surface px-7 py-3.5 ring-1 ring-line"
              >
                구글 지도에서 보기
              </a>
            </div>
          </section>
        </Reveal>

        {/* 공간 — 처음 오는 사람은 문 열기 전이 가장 망설여진다 */}
        <Reveal>
          <section className="mt-24">
            <H2
              accent="미리 만나보세요"
              note="접수 데스크와 대기 공간입니다. 물리치료실은 안쪽에 따로 있습니다."
            >
              오시기 전에
            </H2>
            <figure className="mt-10 overflow-hidden rounded-[2rem] ring-1 ring-line">
              <Image
                src="/clinic-interior.jpg"
                alt="김포한강한의원 접수 데스크와 대기 공간"
                width={2000}
                height={1333}
                sizes="(min-width: 1440px) 1344px, 100vw"
                className="h-auto w-full"
                priority={false}
              />
            </figure>
            <div className="mt-8 text-center">
              <Link
                href="/directions"
                className="press inline-flex items-center gap-2 rounded-full bg-surface px-7 py-3.5 font-medium ring-1 ring-line"
              >
                오시는 길 보기
                <Arrow className="arw" />
              </Link>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
