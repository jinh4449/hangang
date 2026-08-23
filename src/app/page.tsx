import Link from "next/link";
import { CLINIC } from "@/content/clinic";
import { SYMPTOMS } from "@/content/symptoms";
import { COMPARES } from "@/content/compare";
import { INTENTS } from "@/content/types";

export default function Home() {
  return (
    <>
      {/* 히어로 — 100vh를 쓰지 않는다. 아래 증상 그리드가 걸쳐 보여야 스크롤이 이어진다 */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-5 pb-14 pt-16 sm:pt-20">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-jade">
            {CLINIC.tagline}
          </p>
          <h1 className="max-w-[16ch] font-serif text-4xl font-bold leading-[1.25] tracking-tight text-balance sm:text-5xl">
            허리 통증, 참지 말고 원인부터 찾으세요
          </h1>
          <p className="mt-6 max-w-[52ch] text-[17px] leading-8 text-muted">
            허리와 다리 저림이 함께 온다면 추간판 문제일 수 있습니다. 수술이 필요한 상태인지부터
            확인하고, 그렇지 않다면 보존적 치료로 관리합니다.
          </p>

          <ul className="mt-8 grid gap-2 sm:grid-cols-4">
            {CLINIC.badges.map((b, i) => (
              <li
                key={b}
                className={
                  "rounded border px-4 py-3 text-center text-sm font-medium " +
                  (i === 3
                    ? "border-ochre-line bg-ochre-soft"
                    : "border-jade-line bg-jade-soft")
                }
              >
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/reservation"
              className="rounded bg-jade px-6 py-3.5 font-semibold text-paper transition-opacity hover:opacity-90"
            >
              1분 만에 예약하기
            </Link>
            <a
              href={CLINIC.phoneHref}
              className="rounded border border-line bg-surface px-6 py-3.5 transition-colors hover:border-jade"
            >
              전화 상담 {CLINIC.phone}
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 py-16">
        <section>
          <h2 className="font-serif text-2xl font-bold tracking-tight">어디가 불편하신가요?</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {SYMPTOMS.map((s) => (
              <Link
                key={s.slug}
                href={`/care/${s.slug}`}
                className="rounded border border-line bg-surface p-6 transition-colors hover:border-jade"
              >
                <h3 className="font-serif text-xl font-bold">{s.name}</h3>
                <p className="mt-1 font-mono text-xs text-faint">{s.clinicalName}</p>
                <p className="mt-3 text-[15px] leading-7 text-muted">{s.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {INTENTS.map((i) => (
                    <span
                      key={i.key}
                      className="rounded border border-line bg-surface-2 px-2 py-1 text-xs text-muted"
                    >
                      {i.label}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 교통사고 — 자동차보험 100%라 전환율이 가장 높은 구간 */}
        <section className="mt-12 rounded border border-ochre-line border-l-[3px] border-l-ochre bg-ochre-soft p-7">
          <h2 className="font-serif text-2xl font-bold">교통사고 후 통증, 본인부담금 0원</h2>
          <p className="mt-3 max-w-[58ch] text-[15px] leading-8">
            교통사고로 인한 치료는 자동차보험으로 전액 처리되어 환자 부담이 없습니다. 접수번호만
            있으면 바로 치료를 시작할 수 있습니다.
          </p>
          <a
            href={CLINIC.phoneHref}
            className="mt-5 inline-block rounded border border-ochre px-5 py-3 text-sm font-semibold text-ochre transition-colors hover:bg-ochre hover:text-paper"
          >
            사고 접수 문의
          </a>
        </section>

        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold tracking-tight">고민되실 때</h2>
          <p className="mt-2 text-[15px] leading-7 text-muted">
            어디로 가야 할지, 어떤 치료가 맞는지 헷갈릴 때 참고하세요.
          </p>
          <div className="mt-6 grid gap-2">
            {COMPARES.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="rounded border border-line bg-surface px-5 py-4 transition-colors hover:border-jade"
              >
                <span className="font-semibold">{c.title}</span>
                <span className="mt-1 block text-sm text-muted">{c.question}</span>
              </Link>
            ))}
            {SYMPTOMS.map((s) => (
              <Link
                key={s.slug}
                href={`/doubt/${s.slug}`}
                className="rounded border border-line bg-surface px-5 py-4 transition-colors hover:border-jade"
              >
                <span className="font-semibold">{s.doubt.question}</span>
                <span className="mt-1 block text-sm text-muted">
                  도움이 되는 경우와 그렇지 않은 경우를 나눠서 설명드립니다.
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
