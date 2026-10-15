"use client";

import { useState } from "react";
import Link from "next/link";
import type { Symptom } from "@/content/types";

type Checker = NonNullable<Symptom["care"]["checker"]>;

/**
 * 증상 자가 확인. 아픈 곳 → 가장 가까운 느낌 → 가능성이 높은 손상 → 설명·예약.
 *
 * 세 단계 화면을 모두 그려 두고 지금 단계만 보인다. 검색엔진과 AI 크롤러는
 * 스크립트를 돌리지 않으니 질문과 결과 문장이 처음부터 HTML 에 있어야 한다.
 *
 * data-* 는 미리보기(tools/preview)용이다. 미리보기는 React 를 걷어낸 정지
 * 화면이라, 같은 넘김을 이 표시를 보고 작은 스크립트로 흉내 낸다.
 * 단추의 data-ck-go 는 보여 줄 화면, 화면의 data-ck-panel 은 자기 이름이다.
 */
export function SymptomChecker({ checker }: { checker: Checker }) {
  const [at, setAt] = useState("areas");

  const step = (n: number, text: string) => (
    <p className="kr flex items-center gap-3 text-[14px] font-medium text-herb">
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span key={i} className={"h-1.5 w-6 rounded-full " + (i <= n ? "bg-herb" : "bg-herb/15")} />
        ))}
      </span>
      {n} / 3 · {text}
    </p>
  );

  const back = (to: string, label: string) => (
    <button
      type="button"
      data-ck-go={to}
      onClick={() => setAt(to)}
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

  return (
    <div
      data-checker
      className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-tint via-surface to-ochre-soft/60 p-6 ring-1 ring-herb/15 sm:p-10"
    >
      {/* 1단계 — 아픈 곳 */}
      {panel(
        "areas",
        <>
          {step(1, "아픈 곳을 골라 주세요")}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {checker.areas.map((a) => (
              <button
                key={a.key}
                type="button"
                data-ck-go={`area-${a.key}`}
                onClick={() => setAt(`area-${a.key}`)}
                className="kr rounded-2xl bg-surface px-4 py-4 text-[16.5px] font-bold text-ink ring-1 ring-line transition hover:-translate-y-0.5 hover:text-herb hover:ring-herb"
              >
                {a.label}
              </button>
            ))}
          </div>
        </>,
      )}

      {/* 2단계 — 가장 가까운 느낌 */}
      {checker.areas.map((a) =>
        panel(
          `area-${a.key}`,
          <>
            {step(2, `${a.label} · ${a.question}`)}
            <div className="mt-6 grid gap-2.5">
              {a.options.map((o, i) => (
                <button
                  key={o.label}
                  type="button"
                  data-ck-go={`result-${a.key}-${i}`}
                  onClick={() => setAt(`result-${a.key}-${i}`)}
                  className="kr group flex items-center justify-between gap-4 rounded-2xl bg-surface px-5 py-4 text-left text-[16.5px] leading-7 text-ink ring-1 ring-line transition hover:ring-herb"
                >
                  {o.label}
                  <span aria-hidden="true" className="shrink-0 text-herb transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
              ))}
              <button
                type="button"
                data-ck-go={`result-${a.key}-none`}
                onClick={() => setAt(`result-${a.key}-none`)}
                className="kr rounded-2xl px-5 py-3 text-left text-[15px] text-muted hover:text-herb"
              >
                딱 맞는 느낌이 없어요
              </button>
            </div>
            {back("areas", "아픈 곳 다시 고르기")}
          </>,
        ),
      )}

      {/* 3단계 — 결과 */}
      {checker.areas.flatMap((a) => [
        ...a.options.map((o, i) =>
          panel(
            `result-${a.key}-${i}`,
            <>
              {step(3, "가능성이 높은 손상")}
              <p className="kr mt-6 text-[15px] text-muted">고르신 느낌 · 「{o.label}」</p>
              <h3 className="display kr mt-2 text-[2rem] leading-tight text-herb sm:text-[2.4rem]">
                {o.result.name}
                <span className="kr ml-2 align-middle text-[16px] font-medium tracking-normal text-ink">일 수 있습니다</span>
              </h3>
              <p className="kr mt-4 max-w-[58ch] text-[17px] leading-8 text-ink">{o.result.desc}</p>
              <p className="kr mt-3 text-[14px] leading-6 text-muted">
                ※ 증상만으로 짐작한 결과입니다. 정확한 진단은 진찰과 초음파로 확인합니다.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {o.result.href && (
                  <Link
                    href={o.result.href}
                    className="kr inline-flex items-center gap-2 rounded-full bg-surface px-6 py-3 text-[15px] font-semibold text-herb ring-1 ring-herb/30 hover:ring-herb"
                  >
                    {o.result.linkLabel ?? `${o.result.name} 자세히 보기`} →
                  </Link>
                )}
                <Link
                  href="/reservation"
                  className="kr inline-flex items-center gap-2 rounded-full bg-herb px-6 py-3 text-[15px] font-semibold text-paper"
                >
                  이 증상으로 예약하기 →
                </Link>
              </div>
              {back(`area-${a.key}`, "느낌 다시 고르기")}
            </>,
          ),
        ),
        panel(
          `result-${a.key}-none`,
          <>
            {step(3, "직접 확인이 필요합니다")}
            <h3 className="display kr mt-6 text-[1.8rem] leading-tight text-herb">진찰로 함께 확인해 보세요</h3>
            <p className="kr mt-4 max-w-[58ch] text-[17px] leading-8 text-ink">
              {a.label} 통증은 같은 자리라도 힘줄·인대·근육 가운데 어디가 다쳤는지에 따라 치료가 달라집니다.
              어떤 운동을 하다가 어떻게 아팠는지 말씀해 주시면 초음파로 함께 확인해 드립니다.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <Link
                href="/reservation"
                className="kr inline-flex items-center gap-2 rounded-full bg-herb px-6 py-3 text-[15px] font-semibold text-paper"
              >
                진료 예약하기 →
              </Link>
            </div>
            {back(`area-${a.key}`, "느낌 다시 고르기")}
          </>,
        ),
      ])}
    </div>
  );
}
