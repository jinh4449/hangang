import { CLINIC } from "./clinic";

/**
 * 진료 시간 한 곳.
 *
 * 화면에 찍는 표와 헤더의 「진료중」 표시가 서로 다른 값을 보고 있으면 언젠가
 * 한쪽만 고쳐진다. 그래서 둘 다 CLINIC.schedule 하나에서 나오게 한다.
 * 시간을 바꾸려면 clinic.ts 의 schedule 만 고치면 여기와 화면이 함께 따라온다.
 */

export type Span = {
  open: string;
  close: string;
  lunch: { from: string; to: string } | null;
};

/** "09:30" → 570. 비교는 분으로 한다 */
export const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export const fromMin = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/**
 * 그날의 진료 시간대. 휴진이면 null.
 * dow 는 일요일이 0.
 */
export function scheduleFor(date: string, dow: number): Span | null {
  const sc = CLINIC.schedule;
  if (CLINIC.holidays.closed.includes(date)) return null; // 설날·추석 당일
  if (CLINIC.holidays.shortDay.includes(date)) return sc.holiday;
  if (dow === 0) return sc.sunday;
  if (dow === 6) return sc.saturday;
  return sc.weekday;
}

/** 화면에 찍는 표. 원본에서 만들어 두 값이 어긋날 수 없게 한다 */
export const HOURS: { day: string; time: string; note: string }[] = (() => {
  const sc = CLINIC.schedule;
  const range = (s: Span) => `${s.open} – ${s.close}`;
  const rows = [
    { day: "평일", time: range(sc.weekday), note: "" },
    { day: "토요일", time: range(sc.saturday), note: "" },
    { day: "공휴일", time: range(sc.holiday), note: "" },
  ];
  if (sc.weekday.lunch)
    rows.push({
      day: "점심시간",
      time: `${sc.weekday.lunch.from} – ${sc.weekday.lunch.to}`,
      note: "평일",
    });
  rows.push({ day: "일요일", time: sc.sunday ? range(sc.sunday) : "휴진", note: "" });
  return rows;
})();
