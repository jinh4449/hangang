import Link from "next/link";
import { CLINIC } from "@/content/clinic";
import { SYMPTOMS, getSymptom } from "@/content/symptoms";
import { COMPARES } from "@/content/compare";
import { Bezel, JsonLd } from "@/components/site";
import { SYMPTOM_ICONS, WHY_ICONS } from "@/components/icons";

const pain = getSymptom("pain")!;

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

      {/* 히어로 — Editorial Split. 100vh 를 쓰지 않아 아래가 걸쳐 보인다 */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(30,91,69,.10) 0%, rgba(30,91,69,0) 68%)" }}
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <span className="inline-block rounded-full bg-tint px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-herb">
              {CLINIC.tagline}
            </span>
            <h1 className="kr mt-6 max-w-[16ch] text-4xl font-bold leading-[1.25] tracking-tight text-balance sm:text-5xl">
              참으면 익숙해질 뿐, 낫지는 않습니다
            </h1>
            <p className="kr mt-6 max-w-[46ch] text-[17px] leading-8 text-muted">
              통증이든 소화든 피로든, 먼저 다른 과의 진료가 필요한 상태인지부터 가려냅니다.
              그렇지 않다면 그때 한방치료를 시작합니다.
            </p>

            <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {CLINIC.badges.map((b, i) => (
                <li
                  key={b}
                  className={
                    "kr rounded-xl border px-4 py-3 text-center text-sm font-medium " +
                    (i === 1 ? "border-ochre-line bg-ochre-soft" : "border-herb/20 bg-tint")
                  }
                >
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
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
          </div>

          <div className="lg:col-span-5">
            <Bezel>
              <div className="p-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-herb">진료 시간</p>
                <dl className="mt-4 space-y-3 text-[15px]">
                  {CLINIC.hours.map((h) => (
                    <div key={h.day} className="flex items-baseline justify-between border-b border-line pb-3 last:border-0 last:pb-0">
                      <dt className="text-muted">{h.day}</dt>
                      <dd className="font-display font-medium tabular-nums">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="kr mt-5 border-t border-line pt-4 text-sm text-muted">{CLINIC.address}</p>
              </div>
            </Bezel>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-16">
        {/* 진료과목 — 비대칭 Bento */}
        <section>
          <h2 className="kr text-2xl font-bold tracking-tight">어디가 불편하신가요</h2>
          <p className="kr mt-2 text-[15px] leading-7 text-muted">
            과목마다 치료 방법과 예상 기간이 다릅니다. 해당하는 곳을 눌러 확인해 보세요.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-6">
            {SYMPTOMS.map((s, i) => (
              <Link
                key={s.slug}
                href={`/care/${s.slug}`}
                className={
                  "press flex flex-col justify-between rounded-[2rem] p-8 shadow-[var(--shadow-ambient)] " +
                  (i === 0
                    ? "min-h-[15rem] bg-herb text-paper md:col-span-4"
                    : "min-h-[13rem] bg-surface ring-1 ring-line md:col-span-2")
                }
              >
                <div>
                  {(() => {
                    const Icon = SYMPTOM_ICONS[s.slug];
                    return Icon ? (
                      <Icon className={i === 0 ? "h-9 w-9 text-paper/70" : "h-8 w-8 text-herb"} />
                    ) : null;
                  })()}
                  <h3 className={"kr mt-4 font-bold leading-snug " + (i === 0 ? "text-3xl" : "text-xl")}>
                    {s.name}
                  </h3>
                  <p className={"mt-1 font-display text-xs " + (i === 0 ? "text-paper/60" : "text-faint")}>
                    {s.clinicalName}
                  </p>
                </div>
                <p className={"kr mt-6 text-sm leading-7 " + (i === 0 ? "text-paper/80" : "text-muted")}>
                  {s.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* 왜 이곳인가 — 위(Bento)·아래(풀블리드)와 달리 가로 행으로 쌓는다 */}
        <section className="mt-16">
          <h2 className="kr text-2xl font-bold tracking-tight">왜 김포한강한의원인가</h2>
          <p className="kr mt-2 text-[15px] leading-7 text-muted">
            치료법은 어디든 비슷합니다. 저희가 다르게 하는 부분을 말씀드립니다.
          </p>
          <div className="mt-8 border-t border-line">
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
                    {w.basis && (
                      <p className="kr mt-3 text-xs text-faint">※ {w.basis}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 교통사고 — 앞뒤와 완전히 다른 구조 */}
        <section className="mt-12 overflow-hidden rounded-[2rem] bg-herb-deep p-8 text-paper md:p-12">
          <h2 className="kr text-2xl font-bold leading-tight md:text-3xl">
            교통사고 치료는 본인부담금이 없습니다
          </h2>
          <p className="kr mt-4 max-w-[52ch] leading-8 text-paper/75">
            자동차보험으로 전액 처리됩니다. 접수번호만 있으면 바로 시작할 수 있고,
            건강보험에서 비급여인 약침과 한약도 자동차보험에서는 보장 항목입니다.
          </p>
          <Link
            href="/care/car-accident"
            className="press mt-7 inline-flex rounded-full bg-paper px-7 py-3.5 font-semibold text-herb-deep"
          >
            교통사고 치료 안내
          </Link>
        </section>

        {/* 고민 — 의도 분해의 마지막 칸 */}
        <section className="mt-16">
          <h2 className="kr text-2xl font-bold tracking-tight">고민되실 때</h2>
          <p className="kr mt-2 text-[15px] leading-7 text-muted">
            어디로 가야 할지, 정말 효과가 있는지 헷갈릴 때 참고하세요.
          </p>
          <div className="mt-6 grid gap-2">
            {COMPARES.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="rounded-2xl bg-surface px-6 py-5 ring-1 ring-line transition-colors hover:ring-herb"
              >
                <span className="kr font-semibold">{c.title}</span>
                <span className="kr mt-1 block text-sm text-muted">{c.question}</span>
              </Link>
            ))}
            {SYMPTOMS.map((s) => (
              <Link
                key={s.slug}
                href={`/doubt/${s.slug}`}
                className="rounded-2xl bg-surface px-6 py-5 ring-1 ring-line transition-colors hover:ring-herb"
              >
                <span className="kr font-semibold">{s.doubt.question}</span>
                <span className="kr mt-1 block text-sm text-muted">
                  도움이 되는 경우와 그렇지 않은 경우를 나눠서 설명드립니다.
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 리뷰 — 페이지에 심지 않고 외부로 내보낸다 (의료법 56조②) */}
        <section className="mt-16 rounded-[2rem] bg-surface p-8 text-center ring-1 ring-line md:p-12">
          <h2 className="kr text-2xl font-bold tracking-tight">리뷰는 직접 확인해 보세요</h2>
          <p className="kr mx-auto mt-4 max-w-[46ch] leading-8 text-muted">
            의료법에 따라 환자분들의 후기를 저희 홈페이지에 직접 싣지 않습니다.
            네이버와 구글에서 있는 그대로 확인하실 수 있습니다.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
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
      </div>
    </>
  );
}
