"use client";

import { useEffect, useState } from "react";
import { CLINIC } from "@/content/clinic";

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

const hm = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const fmt = (mins: number) =>
  `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;

/** 그날의 진료 시간대. 휴진이면 null */
function scheduleFor(date: string, dow: number) {
  const isHoliday = CLINIC.holidays.dates.includes(date);
  if (dow === 0) return null; // 일요일 휴진
  if (isHoliday || dow === 6) return { open: hm("09:30"), close: hm("15:00"), lunch: null };
  return { open: hm("09:30"), close: hm("20:00"), lunch: { from: hm("13:00"), to: hm("14:00") } };
}

/** 다음 진료일. 최대 7일까지 찾는다 */
function nextOpening(y: number, m: number, d: number) {
  for (let i = 1; i <= 7; i++) {
    const dt = new Date(Date.UTC(y, m - 1, d + i));
    const date = dt.toISOString().slice(0, 10);
    const dow = dt.getUTCDay();
    const sc = scheduleFor(date, dow);
    if (sc) return { label: i === 1 ? "내일" : `${WEEKDAY_KO[dow]}요일`, open: fmt(sc.open) };
  }
  return null;
}

function computeStatus(): Status | null {
  const now = seoulNow();
  // 공휴일 데이터가 없는 연도면 상태를 주장하지 않는다
  if (!CLINIC.holidays.coveredYears.includes(now.y)) return null;

  const sc = scheduleFor(now.date, now.dow);
  const next = nextOpening(now.y, now.m, now.d);
  const nextText = next ? `${next.label} ${next.open} 진료` : "";

  if (!sc) return { kind: "closed", label: "휴진", detail: nextText };

  if (now.minutes < sc.open) return { kind: "closed", label: "진료 전", detail: `${fmt(sc.open)} 진료 시작` };
  if (now.minutes >= sc.close) return { kind: "closed", label: "진료 종료", detail: nextText };
  if (sc.lunch && now.minutes >= sc.lunch.from && now.minutes < sc.lunch.to)
    return { kind: "lunch", label: "점심시간", detail: `${fmt(sc.lunch.to)} 진료 재개` };

  return { kind: "open", label: "진료중", detail: `${fmt(sc.close)}까지` };
}

const TONE: Record<Kind, { dot: string; text: string; bg: string }> = {
  open: { dot: "bg-herb", text: "text-herb", bg: "bg-tint" },
  lunch: { dot: "bg-ochre", text: "text-ochre", bg: "bg-ochre-soft" },
  closed: { dot: "bg-faint", text: "text-muted", bg: "bg-surface-2" },
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
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${tone.bg} ${className}`}
      aria-label={`현재 ${status.label}. ${status.detail}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} aria-hidden="true" />
      <span className={`font-semibold ${tone.text}`}>{status.label}</span>
      {status.detail && <span className="hidden text-muted sm:inline">{status.detail}</span>}
    </span>
  );
}
