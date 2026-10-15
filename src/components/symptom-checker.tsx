"use client";

import { useState } from "react";
import Link from "next/link";
import type { Symptom } from "@/content/types";

type Checker = NonNullable<Symptom["care"]["checker"]>;
type Area = Checker["areas"][number];

/** 세 답의 점수를 더해 높은 순으로 줄 세운다. 점수가 같으면 conditions 의 앞쪽이 먼저다 */
function rank(area: Area, picks: Record<string, number>[]) {
  const total: Record<string, number> = {};
  for (const p of picks) for (const [k, v] of Object.entries(p)) total[k] = (total[k] ?? 0) + v;
  return area.conditions
    .map((c, i) => ({ c, i, score: total[c.key] ?? 0 }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .map((x) => x.c);
}

/**
 * 증상 자가 확인. 아픈 곳 → 질문 세 개 → 가능성이 높은 손상 → 설명·예약.
 *
 * 모든 화면(부위 고르기, 질문, 결과)을 처음부터 그려 두고 지금 화면만 보인다.
 * 검색엔진과 AI 크롤러는 스크립트를 돌리지 않으니 질문과 결과 문장이
 * 처음부터 HTML 에 있어야 한다.
 *
 * data-* 는 미리보기(tools/preview)용이다. 미리보기는 React 를 걷어낸 정지
 * 화면이라, 같은 넘김과 점수 계산을 이 표시를 보고 작은 스크립트로 흉내 낸다.
 *   data-ck-panel  화면 이름
 *   data-ck-go     누르면 보여 줄 화면
 *   data-ck-pick   질문의 답. data-ck-scores 에 점수, data-ck-next 에 다음 화면
 *                  (마지막 질문이면 data-ck-area 로 결과를 계산한다)
 *   data-ck-also   결과 화면에서 두 번째로 가능성이 높은 손상을 적는 자리
 */
export function SymptomChecker({ checker }: { checker: Checker }) {
  const [at, setAt] = useState("areas");
  const [picks, setPicks] = useState<Record<string, number>[]>([]);
  const [also, setAlso] = useState<Area["conditions"][number] | null>(null);

  const start = (area: Area) => {
    setPicks([]);
    setAt(`${area.key}-q0`);
  };

  const pick = (area: Area, qi: number, scores: Record<string, number>) => {
    const next = [...picks.slice(0, qi), scores];
    setPicks(next);
    if (qi < area.questions.length - 1) {
      setAt(`${area.key}-q${qi + 1}`);
      return;
    }
    const ranked = rank(area, next);
    setAlso(ranked[1] ?? null);
    setAt(ranked[0] ? `${area.key}-r-${ranked[0].key}` : `${area.key}-r-none`);
  };

  // 부위 고르기 + 질문 세 개 + 결과. 게임의 단계 표시처럼 칸을 채워 간다
  const TOTAL = 5;
  const steps = (n: number, text: string) => (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: TOTAL }, (_, i) => (
          <span
            key={i}
            className={
              "h-2 w-7 rounded-full transition-colors " + (i < n ? "bg-herb-light" : "bg-paper/15")
            }
          />
        ))}
      </span>
      <span className="kr text-[14px] font-semibold text-herb-light">{text}</span>
    </div>
  );

  const back = (to: string, label: string) => (
    <button
      type="button"
      data-ck-go={to}
      onClick={() => setAt(to)}
      className="kr mt-7 text-[14.5px] font-medium text-paper/60 underline-offset-4 hover:text-paper hover:underline"
    >
      ← {label}
    </button>
  );

  const panel = (id: string, children: React.ReactNode) => (
    <div key={id} data-ck-panel={id} hidden={at !== id} className="ck-pop">
      {children}
    </div>
  );

  const LETTERS = ["A", "B", "C", "D", "E"];

  return (
    <section
      data-checker
      aria-labelledby="checker-title"
      // 미리보기 스크립트가 결과를 계산할 때 쓰는 부위별 질환 순서
      data-ck-order={JSON.stringify(
        Object.fromEntries(checker.areas.map((a) => [a.key, a.conditions.map((c) => [c.key, c.name])])),
      )}
      className="relative isolate overflow-hidden rounded-[2.25rem] bg-herb-deep px-6 py-10 text-paper shadow-[0_30px_80px_-30px_rgba(22,65,47,0.7)] sm:px-12 sm:py-14"
    >
      {/* 배경 — 옥색·금빛 빛 번짐과 옅은 격자. 게임 판처럼 다른 절과 한눈에 갈리게 한다 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 -z-10 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(132,194,167,.35) 0%, rgba(132,194,167,0) 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 -z-10 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(194,161,102,.28) 0%, rgba(194,161,102,0) 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* 머리 — 늘 보인다 */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-paper/15 pb-8">
        <div>
          <span className="kr inline-flex items-center gap-2 rounded-full bg-paper/10 px-3.5 py-1.5 text-[13px] font-semibold text-herb-light ring-1 ring-herb-light/30">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-live" />
            1분 증상 체크
          </span>
          <h2 id="checker-title" className="display kr mt-4 text-[2rem] leading-[1.2] sm:text-[2.7rem]">
            {checker.title}
          </h2>
          {checker.note && (
            <p className="kr mt-3 max-w-[48ch] text-[16px] leading-7 text-paper/70">{checker.note}</p>
          )}
        </div>
      </div>

      <div className="pt-8">
        {panel(
          "areas",
          <>
            {steps(1, "STEP 1 · 아픈 곳을 골라 주세요")}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {checker.areas.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  data-ck-go={`${a.key}-q0`}
                  onClick={() => start(a)}
                  className="kr group flex min-h-[5.5rem] flex-col justify-between rounded-2xl bg-paper/[0.07] p-4 text-left ring-1 ring-paper/15 transition hover:-translate-y-1 hover:bg-paper hover:text-herb-deep hover:ring-paper"
                >
                  <span className="text-[18px] font-bold leading-snug">{a.label}</span>
                  <span className="text-[13px] font-medium text-paper/50 group-hover:text-herb">
                    질문 {a.questions.length}개 →
                  </span>
                </button>
              ))}
            </div>
          </>,
        )}

        {checker.areas.map((a) => [
          ...a.questions.map((q, qi) =>
            panel(
              `${a.key}-q${qi}`,
              <>
                {steps(qi + 2, `STEP ${qi + 2} · ${a.label} · 질문 ${qi + 1} / ${a.questions.length}`)}
                <h3 className="kr mt-6 text-[24px] font-bold leading-snug sm:text-[28px]">{q.q}</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {q.options.map((o, oi) => (
                    <button
                      key={o.label}
                      type="button"
                      data-ck-pick=""
                      data-ck-area={a.key}
                      data-ck-q={qi}
                      data-ck-scores={JSON.stringify(o.scores)}
                      data-ck-next={qi < a.questions.length - 1 ? `${a.key}-q${qi + 1}` : ""}
                      onClick={() => pick(a, qi, o.scores)}
                      className="kr group flex items-center gap-4 rounded-2xl bg-paper/[0.07] px-5 py-4 text-left text-[16.5px] leading-7 ring-1 ring-paper/15 transition hover:-translate-y-0.5 hover:bg-paper hover:text-ink hover:ring-paper"
                    >
                      <span
                        aria-hidden="true"
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-grad-b/90 font-display text-[15px] font-bold text-herb-deep"
                      >
                        {LETTERS[oi]}
                      </span>
                      {o.label}
                    </button>
                  ))}
                </div>
                {qi === 0 ? back("areas", "아픈 곳 다시 고르기") : back(`${a.key}-q${qi - 1}`, "이전 질문")}
              </>,
            ),
          ),

          ...a.conditions.map((c) =>
            panel(
              `${a.key}-r-${c.key}`,
              <>
                {steps(TOTAL, `RESULT · ${a.label}`)}
                <div className="mt-6 rounded-[1.75rem] bg-paper p-7 text-ink shadow-2xl sm:p-10">
                  <p className="kr text-[14px] font-semibold text-ochre">가능성이 높은 손상</p>
                  <h3 className="display kr mt-2 text-[2.2rem] leading-tight text-herb sm:text-[2.8rem]">
                    {c.name}
                    <span className="kr ml-2 align-middle text-[17px] font-medium tracking-normal text-ink">
                      일 수 있습니다
                    </span>
                  </h3>
                  <p className="kr mt-4 max-w-[58ch] text-[17px] leading-8">{c.desc}</p>
                  <p
                    data-ck-also=""
                    hidden={!(at === `${a.key}-r-${c.key}` && also)}
                    className="kr mt-4 inline-block rounded-full bg-tint px-4 py-1.5 text-[14.5px] text-herb"
                  >
                    함께 살펴볼 손상 · {also?.name}
                  </p>
                  <p className="kr mt-4 text-[14px] leading-6 text-muted">
                    ※ 증상만으로 짐작한 결과입니다.{" "}
                    {c.ultrasound
                      ? "정확한 진단은 진찰과 초음파로 확인합니다."
                      : "정확한 진단은 진찰로 확인하고, 필요하면 영상 검사를 안내해 드립니다."}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {c.href && (
                      <Link
                        href={c.href}
                        className="kr inline-flex items-center gap-2 rounded-full bg-surface px-6 py-3 text-[15px] font-semibold text-herb ring-1 ring-herb/30 hover:ring-herb"
                      >
                        {c.name} 자세히 보기 →
                      </Link>
                    )}
                    <Link
                      href="/reservation"
                      className="kr inline-flex items-center gap-2 rounded-full bg-herb px-6 py-3 text-[15px] font-semibold text-paper"
                    >
                      이 증상으로 예약하기 →
                    </Link>
                  </div>
                </div>
                {back("areas", "처음부터 다시")}
              </>,
            ),
          ),

          panel(
            `${a.key}-r-none`,
            <>
              {steps(TOTAL, `RESULT · ${a.label}`)}
              <div className="mt-6 rounded-[1.75rem] bg-paper p-7 text-ink shadow-2xl sm:p-10">
                <h3 className="display kr text-[1.9rem] leading-tight text-herb">진찰로 함께 확인해 보세요</h3>
                <p className="kr mt-4 max-w-[58ch] text-[17px] leading-8">
                  {a.label} 통증은 같은 자리라도 힘줄·인대·근육 가운데 어디가 다쳤는지에 따라 치료가 달라집니다.
                  어떤 운동을 하다가 어떻게 아팠는지 말씀해 주시면 진찰로 함께 확인해 드립니다.
                </p>
                <div className="mt-7">
                  <Link
                    href="/reservation"
                    className="kr inline-flex items-center gap-2 rounded-full bg-herb px-6 py-3 text-[15px] font-semibold text-paper"
                  >
                    진료 예약하기 →
                  </Link>
                </div>
              </div>
              {back("areas", "처음부터 다시")}
            </>,
          ),
        ])}
      </div>
    </section>
  );
}
