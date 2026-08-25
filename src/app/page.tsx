import Link from "next/link";
import { CLINIC } from "@/content/clinic";
import { SYMPTOMS, getSymptom } from "@/content/symptoms";
import { COMPARES } from "@/content/compare";
import { columnsByDate } from "@/content/column";
import { AXIS_STORY } from "@/content/treatment";
import { PARTS } from "@/content/part";
import { Bezel, JsonLd, Arrow } from "@/components/site";
import { Reveal } from "@/components/reveal";
import { ClinicStatus } from "@/components/clinic-status";
import { SYMPTOM_ICONS, WHY_ICONS, UltrasoundIcon, MapPinIcon } from "@/components/icons";

const pain = getSymptom("pain")!;

/** 메인의 섹션 제목은 모두 같은 크기·같은 정렬로 선다. 여기서만 정한다.
 *  accent는 제목의 뒷부분으로, 히어로와 같은 금빛 그라데이션이 걸린다 */
function H2({
  children,
  accent,
  note,
}: {
  children: React.ReactNode;
  accent?: string;
  note?: string;
}) {
  return (
    <div className="text-center">
      <h2 className="display kr text-3xl sm:text-4xl xl:text-[2.75rem]">
        {children}
        {accent && <> <span className="grad">{accent}</span></>}
      </h2>
      {note && (
        <p className="kr mx-auto mt-4 max-w-[52ch] text-base leading-8 text-muted xl:text-[17px] xl:leading-9">
          {note}
        </p>
      )}
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
    <div className={`enter ${className}`} style={{ "--d": `${d}ms` } as React.CSSProperties}>
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
          style={{ background: "radial-gradient(circle, rgba(30,91,69,.09) 0%, rgba(30,91,69,0) 68%)" }}
        />

        <div className="relative mx-auto w-full max-w-[80rem] px-[clamp(1.25rem,4vw,4rem)] pb-14 pt-12 text-center sm:pt-16 xl:pb-20 xl:pt-24">
          <Enter d={0}>
            <span className="inline-block rounded-full bg-tint px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-herb">
              {CLINIC.tagline}
            </span>
          </Enter>

          <h1 className="display display-black kr mt-7 text-[2rem] leading-[1.28] sm:text-[2.9rem] lg:text-[3.4rem] xl:text-[4rem] 2xl:text-[4.6rem]">
            <span className="enter block" style={{ "--d": "110ms" } as React.CSSProperties}>
              내 증상, 이해해줄까?
            </span>
            <span className="enter block" style={{ "--d": "250ms" } as React.CSSProperties}>
              편하게 물어봐도 될까?
            </span>
            <span className="grad enter block" style={{ "--d": "390ms" } as React.CSSProperties}>
              믿고 맡겨도 될까?
            </span>
          </h1>

          <Enter d={520}>
            <p className="kr mx-auto mt-7 max-w-[56ch] text-[17px] leading-8 text-muted xl:mt-9 xl:text-[19px] xl:leading-9">
              그 세 가지를 위해 진료 방식을 정했습니다. 초음파로 함께 보고, 남녀 두 원장이 나눠 맡고, 아니면 아니라고 말씀드립니다.
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
              <Link
                href="/doubt/pain"
                className="press inline-flex items-center gap-3 rounded-full bg-surface px-7 py-4 text-lg ring-1 ring-line"
              >
                효과가 있긴 한가요?
              </Link>
            </div>
          </Enter>
        </div>

        <Enter d={840} className="relative mx-auto w-full max-w-[64rem] px-[clamp(1.25rem,4vw,4rem)] pb-16">
          <Bezel>
            <div className="p-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-herb">진료 시간</p>
                <ClinicStatus />
              </div>
              <dl className="mt-4 grid gap-x-10 text-[15px] sm:grid-cols-2">
                {CLINIC.hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-baseline justify-between border-b border-line py-3"
                  >
                    <dt className="text-muted">{h.day}</dt>
                    <dd className="font-display font-medium tabular-nums">{h.time}</dd>
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
        {/* 진료과목 — 같은 크기 격자 */}
        <Reveal>
          <section>
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
                        <Icon className={i === 0 ? "h-8 w-8 text-paper/70" : "h-8 w-8 text-herb"} />
                      ) : null;
                    })()}
                    <h3 className="kr mt-4 text-xl font-bold leading-snug">{s.name}</h3>
                    <p className={"mt-1 font-display text-xs " + (i === 0 ? "text-paper/60" : "text-faint")}>
                      {s.clinicalName}
                    </p>
                  </div>
                  <div className="mt-6">
                    {s.highlight && (
                      <span
                        className={
                          "mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold " +
                          (i === 0 ? "bg-paper/15 text-paper" : "bg-ochre-soft text-ochre")
                        }
                      >
                        {s.highlight.label}
                      </span>
                    )}
                    <p className={"kr text-sm leading-7 " + (i === 0 ? "text-paper/80" : "text-muted")}>
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
              <Link href="/part" className="tile flex min-h-[15rem] flex-col justify-between bg-surface p-8">
                <div>
                  <MapPinIcon className="h-8 w-8 text-herb" />
                  <h3 className="kr mt-4 text-xl font-bold leading-snug">부위별로 찾기</h3>
                  <p className="mt-1 font-display text-xs text-faint">
                    {PARTS.map((p) => p.name).join(" · ")}
                  </p>
                </div>
                <div className="mt-6">
                  <p className="kr text-sm leading-7 text-muted">
                    아픈 곳이 어디인지로 찾으시면 해당 부위의 흔한 원인부터 보여드립니다.
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

        {/* 두 축 — 이 한의원의 치료 논리 */}
        <Reveal>
          <section className="mt-24">
            <H2 accent="나눠서 봅니다" note={AXIS_STORY.lede}>
              통증과 구조를
            </H2>
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {AXIS_STORY.axes.map((a) => (
                <Link
                  key={a.key}
                  href={`/treatment/${a.slug}`}
                  className={"tile p-8 " + (a.key === "pain" ? "tile-dark bg-herb text-paper" : "bg-surface")}
                >
                  <p
                    className={
                      "font-mono text-[11px] uppercase tracking-[0.15em] " +
                      (a.key === "pain" ? "text-paper/60" : "text-herb")
                    }
                  >
                    {a.label}
                  </p>
                  <h3 className="kr mt-4 text-2xl font-bold">{a.treatment}</h3>
                  <p
                    className={
                      "kr mt-3 text-[15px] leading-7 " +
                      (a.key === "pain" ? "text-paper/80" : "text-muted")
                    }
                  >
                    {a.body}
                  </p>
                </Link>
              ))}
            </div>
            <p className="kr mt-3 rounded-2xl bg-tint px-6 py-5 text-center text-[15px] leading-7 ring-1 ring-herb/15">
              {AXIS_STORY.note}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">부위별</span>
              {PARTS.map((p) => (
                <Link
                  key={p.slug}
                  href={`/part/${p.slug}`}
                  className="badge inline-block rounded-full border border-line bg-surface px-5 py-2.5 text-sm hover:border-herb"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </section>
        </Reveal>

        {/* 왜 이곳인가 — 주장 카드로 열고 아래에서 증명한다 */}
        <Reveal>
          <section className="mt-24">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-tint px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-herb">
                {CLINIC.whyHero.eyebrow}
              </span>
              <h2 className="display kr mt-6 text-3xl text-balance sm:text-[2.75rem]">
                {CLINIC.whyHero.headline[0]}
                <br />
                <span className="grad">{CLINIC.whyHero.headline[1]}</span>
              </h2>
              <p className="kr mt-5 text-[17px] leading-8 text-muted">{CLINIC.whyHero.sub}</p>
            </div>

            {/* 주장 → 증명. 주장만 있으면 광고, 증명이 붙으면 설명이 된다 */}
            <div className="relative mt-10 overflow-hidden rounded-[2rem] bg-ink p-8 text-paper md:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(132,194,167,.16) 0%, rgba(132,194,167,0) 70%)" }}
              />
              <div className="relative">
                <p className="kr text-2xl font-bold leading-snug md:text-3xl">
                  <span className="text-paper/45">&ldquo;</span>
                  {CLINIC.whyHero.claim[0]}
                  <br />
                  {CLINIC.whyHero.claim[1]}
                  <span className="text-paper/45">&rdquo;</span>
                </p>
                <p className="kr mt-5 max-w-[48ch] leading-8 text-paper/70">{CLINIC.whyHero.body}</p>

                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper/10 px-4 py-2 text-sm font-medium ring-1 ring-paper/15">
                  <UltrasoundIcon className="h-4 w-4" />
                  {CLINIC.whyHero.badge}
                </span>

                <div className="mt-8 border-t border-paper/15 pt-7">
                  <p className="kr text-[15px] leading-7 text-paper/70">
                    {CLINIC.whyHero.proofLead}{" "}
                    <strong className="font-semibold text-paper">{CLINIC.whyHero.proofLeadStrong}</strong>
                  </p>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                    {CLINIC.whyHero.proofs.map((pf) => {
                      const Icon = WHY_ICONS[pf.key];
                      return (
                        <li key={pf.key} className="flex gap-3.5">
                          <span className="mt-0.5 shrink-0 text-herb-light">
                            {Icon ? <Icon className="h-5 w-5" /> : null}
                          </span>
                          <span className="kr text-[15px] leading-7 text-paper/70">
                            <strong className="font-semibold text-paper">{pf.title}</strong> {pf.body}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* 소개 비율 — 근거 표기를 함께 둔다 */}
            <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-2xl bg-tint px-7 py-6 ring-1 ring-herb/15">
              <span className="text-3xl font-bold text-herb">{CLINIC.whyHero.stat.value}</span>
              <span className="kr text-[15px] text-ink">{CLINIC.whyHero.stat.label}</span>
              <span className="kr ml-auto text-xs text-muted">※ {CLINIC.whyHero.stat.basis}</span>
            </div>

            {/* 상세 — 주장 카드 아래에 조용히 둔다 */}
            <div className="mt-10 border-t border-line">
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
                      <p className="kr mt-3 max-w-[56ch] text-[15px] leading-8 text-muted">{w.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* 진료비 — 물어보기 전에 먼저 꺼낸다 */}
        <Reveal>
          <section className="mt-24">
            <H2
              accent="궁금하신가요?"
              note="건강보험이 적용되는 치료와 그렇지 않은 치료를 나눠서 안내해 드립니다. 비급여 항목은 시작하기 전에 금액을 말씀드립니다."
            >
              치료 가격이
            </H2>
            <div className="mt-10 grid gap-3 md:grid-cols-3">
              <Link href="/cost" className="tile bg-surface p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-herb">건강보험</p>
                <h3 className="kr mt-4 text-xl font-bold">보험이 적용되는 치료</h3>
                <p className="kr mt-3 text-[15px] leading-7 text-muted">
                  침, 뜸, 부항, 추나요법, 보험 한약제제는 건강보험이 적용됩니다. 추나요법은 연 20회까지
                  급여로 인정됩니다.
                </p>
                <span className="tile-arrow mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-herb">
                  본인부담률 보기
                  <Arrow />
                </span>
              </Link>

              <Link href="/cost" className="tile bg-surface p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-herb">비급여</p>
                <h3 className="kr mt-4 text-xl font-bold">비급여 진료비용</h3>
                <p className="kr mt-3 text-[15px] leading-7 text-muted">
                  약침과 한약처럼 보험이 적용되지 않는 항목입니다. 치료를 시작하기 전에 금액을 말씀드리고
                  동의를 받습니다.
                </p>
                <span className="tile-arrow mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-herb">
                  수가표 보기
                  <Arrow />
                </span>
              </Link>

              <Link href="/cost/car-accident" className="tile bg-surface p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ochre">자동차보험</p>
                <h3 className="kr mt-4 text-xl font-bold">교통사고 치료</h3>
                <p className="kr mt-3 text-[15px] leading-7 text-muted">
                  상대 보험사에 대인접수가 되면 본인부담금 없이 치료받으실 수 있습니다. 접수 번호만
                  알려주시면 저희가 처리합니다.
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

        {/* 고민 — 의도 분해의 마지막 칸 */}
        <Reveal>
          <section className="mt-24">
            <H2 accent="되실 때" note="어디로 가야 할지, 정말 효과가 있는지 헷갈릴 때 참고하세요.">
              고민
            </H2>
            <div className="mt-10 grid gap-2">
              {COMPARES.map((c) => (
                <Link key={c.slug} href={`/compare/${c.slug}`} className="tile block bg-surface px-6 py-5">
                  <span className="kr font-semibold">{c.title}</span>
                  <span className="kr mt-1 block text-sm text-muted">{c.question}</span>
                </Link>
              ))}
              {SYMPTOMS.map((s) => (
                <Link key={s.slug} href={`/doubt/${s.slug}`} className="tile block bg-surface px-6 py-5">
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
                  <Link key={c.slug} href={`/column/${c.slug}`} className="tile block bg-surface px-6 py-5">
                    <span className="kr font-semibold leading-snug">{c.title}</span>
                    <span className="kr mt-1.5 block text-sm leading-7 text-muted">{c.summary}</span>
                  </Link>
                ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/column" className="text-sm font-medium text-herb hover:underline">
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
              의료법에 따라 환자분들의 후기를 저희 홈페이지에 직접 싣지 않습니다. 네이버와 구글에서 있는
              그대로 확인하실 수 있습니다.
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
      </div>
    </>
  );
}
