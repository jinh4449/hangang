"use client";

import { useEffect, useState } from "react";
import { CLINIC } from "@/content/clinic";
import { scheduleFor, toMin } from "@/content/hours";

/**
 * 지금 진료 중인지 표시한다.
 *
 * 설계 원칙: 틀린 상태를 띄우느니 표시하지 않는다.
 * 환자가 "진료중" 을 보고 왔는데 닫혀 있으면 헛걸음이 된다.
 * 그래서 공휴일 데이터가 없는 연도이거나 아직 마운트되지 않았으면 렌더링하지 않는다.
 *
 * 시간은 방문자 기기의 시간대가 아니라 항상 서울 기준으로 계산한다.
 */

type Kind = "open" | "lunch" | "closed";
type Status = { kind: Kind; label: string; detail: string };

const WEEKDAY_KO = ["일", "월", "화", "수", "목", "금", "토"] as const;

/** 서울 기준 현재 시각 */
function seoulNow() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const y = +get("year");
  const m = +get("month");
  const d = +get("day");
  const date = `${get("year")}-${get("month")}-${get("day")}`;
  // 요일은 UTC 기준으로 만든 날짜에서 뽑아야 기기 시간대의 영향을 받지 않는다
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return { y, m, d, date, dow, minutes: +get("hour") * 60 + +get("minute") };
}


/** 다음 진료일. 최대 7일까지 찾는다 */
function nextOpening(y: number, m: number, d: number) {
  for (let i = 1; i <= 7; i++) {
    const dt = new Date(Date.UTC(y, m - 1, d + i));
    const date = dt.toISOString().slice(0, 10);
    const dow = dt.getUTCDay();
    const sc = scheduleFor(date, dow);
    if (sc) return { label: i === 1 ? "내일" : `${WEEKDAY_KO[dow]}요일`, open: sc.open };
  }
  return null;
}

function computeStatus(): Status | null {
  const now = seoulNow();
  // 공휴일 데이터가 없는 연도면 상태를 주장하지 않는다
  if (!CLINIC.holidays.coveredYears.includes(now.y)) return null;

  const sc = scheduleFor(now.date, now.dow);
  const next = nextOpening(now.y, now.m, now.d);
  const nextText = next ? `${next.label} ${next.open} 오픈` : "";

  if (!sc) return { kind: "closed", label: "휴진", detail: nextText };

  const open = toMin(sc.open);
  const close = toMin(sc.close);
  if (now.minutes < open) return { kind: "closed", label: "진료 전", detail: `오늘 ${sc.open} 오픈` };
  if (now.minutes >= close) return { kind: "closed", label: "진료종료", detail: nextText };
  if (sc.lunch && now.minutes >= toMin(sc.lunch.from) && now.minutes < toMin(sc.lunch.to))
    return { kind: "lunch", label: "점심시간", detail: `${sc.lunch.to} 진료 재개` };

  return { kind: "open", label: "진료중", detail: `${sc.close}까지` };
}

/** 테두리와 진한 라벨로 대비를 준다. 배지가 흐리면 상태를 못 읽는다 */
const TONE: Record<Kind, { dot: string; text: string; box: string }> = {
  // 진료중일 때만 점이 밝게 살아 있다. 나머지 상태까지 빛나면 구분이 사라진다
  open: { dot: "bg-live livedot", text: "text-herb", box: "bg-tint ring-1 ring-herb/30" },
  lunch: { dot: "bg-ochre", text: "text-ochre", box: "bg-ochre-soft ring-1 ring-ochre/35" },
  closed: { dot: "bg-rust", text: "text-rust", box: "bg-rust-soft ring-1 ring-rust/30" },
};

export function ClinicStatus({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const tick = () => setStatus(computeStatus());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  // 마운트 전이거나 판단할 수 없으면 아무것도 그리지 않는다 (하이드레이션 불일치 방지)
  if (!status) return null;

  const tone = TONE[status.kind];
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] ${tone.box} ${className}`}
      aria-label={`현재 ${status.label}. ${status.detail}`}
    >
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${tone.dot}`} aria-hidden="true" />
      <span className={`font-bold ${tone.text}`}>{status.label}</span>
      {status.detail && <span className="font-medium text-ink/75">{status.detail}</span>}
    </span>
  );
}
