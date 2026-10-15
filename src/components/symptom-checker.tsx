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

  const steps = (n: number, total: number, text: string) => (
    <p className="kr flex flex-wrap items-center gap-3 text-[14px] font-medium text-herb">
      <span className="flex gap-1" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={"h-1.5 w-6 rounded-full " + (i < n ? "bg-herb" : "bg-herb/15")} />
        ))}
      </span>
      {text}
    </p>
  );

  const back = (to: string, label: string, onClick?: () => void) => (
    <button
      type="button"
      data-ck-go={to}
      onClick={() => {
        onClick?.();
        setAt(to);
      }}
      className="kr mt-6 text-[14.5px] font-medium text-muted underline-offset-4 hover:text-herb hover:underline"
    >
      ← {label}
    </button>
  );

  const panel = (id: string, children: React.ReactNode) => (
    <div key={id} data-ck-panel={id} hidden={at !== id}>
      {children}
    </div>
  );

  // 부위 고르기 + 질문 세 개 + 결과
  const TOTAL = 5;

  return (
    <div
      data-checker
      // 미리보기 스크립트가 결과를 계산할 때 쓰는 부위별 질환 순서
      data-ck-order={JSON.stringify(
        Object.fromEntries(checker.areas.map((a) => [a.key, a.conditions.map((c) => [c.key, c.name])])),
      )}
      className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-tint via-surface to-ochre-soft/60 p-6 ring-1 ring-herb/15 sm:p-10"
    >
      {panel(
        "areas",
        <>
          {steps(1, TOTAL, "아픈 곳을 골라 주세요")}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {checker.areas.map((a) => (
              <button
                key={a.key}
                type="button"
                data-ck-go={`${a.key}-q0`}
                onClick={() => start(a)}
                className="kr rounded-2xl bg-surface px-4 py-4 text-[16.5px] font-bold text-ink ring-1 ring-line transition hover:-translate-y-0.5 hover:text-herb hover:ring-herb"
              >
                {a.label}
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
              {steps(qi + 2, TOTAL, `${a.label} · 질문 ${qi + 1} / ${a.questions.length}`)}
              <h3 className="kr mt-5 text-[22px] font-bold leading-snug sm:text-[24px]">{q.q}</h3>
              <div className="mt-5 grid gap-2.5">
                {q.options.map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    data-ck-pick=""
                    data-ck-area={a.key}
                    data-ck-q={qi}
                    data-ck-scores={JSON.stringify(o.scores)}
                    data-ck-next={qi < a.questions.length - 1 ? `${a.key}-q${qi + 1}` : ""}
                    onClick={() => pick(a, qi, o.scores)}
                    className="kr group flex items-center justify-between gap-4 rounded-2xl bg-surface px-5 py-4 text-left text-[16.5px] leading-7 text-ink ring-1 ring-line transition hover:ring-herb"
                  >
                    {o.label}
                    <span aria-hidden="true" className="shrink-0 text-herb transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </button>
                ))}
              </div>
              {qi === 0
                ? back("areas", "아픈 곳 다시 고르기")
                : back(`${a.key}-q${qi - 1}`, "이전 질문")}
            </>,
          ),
        ),

        ...a.conditions.map((c) =>
          panel(
            `${a.key}-r-${c.key}`,
            <>
              {steps(TOTAL, TOTAL, `${a.label} · 가능성이 높은 손상`)}
              <h3 className="display kr mt-6 text-[2rem] leading-tight text-herb sm:text-[2.4rem]">
                {c.name}
                <span className="kr ml-2 align-middle text-[16px] font-medium tracking-normal text-ink">일 수 있습니다</span>
              </h3>
              <p className="kr mt-4 max-w-[58ch] text-[17px] leading-8 text-ink">{c.desc}</p>
              <p
                data-ck-also=""
                hidden={!(at === `${a.key}-r-${c.key}` && also)}
                className="kr mt-3 text-[15px] text-muted"
              >
                함께 살펴볼 손상 · {also?.name}
              </p>
              <p className="kr mt-3 text-[14px] leading-6 text-muted">
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
              {back("areas", "처음부터 다시")}
            </>,
          ),
        ),

        panel(
          `${a.key}-r-none`,
          <>
            {steps(TOTAL, TOTAL, `${a.label} · 직접 확인이 필요합니다`)}
            <h3 className="display kr mt-6 text-[1.8rem] leading-tight text-herb">진찰로 함께 확인해 보세요</h3>
            <p className="kr mt-4 max-w-[58ch] text-[17px] leading-8 text-ink">
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
            {back("areas", "처음부터 다시")}
          </>,
        ),
      ])}

    </div>
  );
}
