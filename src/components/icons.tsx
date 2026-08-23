/** 진료과목 아이콘. 외부 아이콘 라이브러리를 쓰지 않고 필요한 5개만 직접 그린다. */

type P = { className?: string };
const base = "h-8 w-8";
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** 통증치료 — 척추 */
export function SpineIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 3v18" {...stroke} />
      <path d="M8.5 6h7M8 10h8M8 14h8M8.5 18h7" {...stroke} />
    </svg>
  );
}

/** 교통사고 — 충격 */
export function ImpactIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M3 17h3l1.5-4.5A2 2 0 0 1 9.4 11h5.2a2 2 0 0 1 1.9 1.5L18 17h3" {...stroke} />
      <circle cx="7" cy="18.5" r="1.6" {...stroke} />
      <circle cx="17" cy="18.5" r="1.6" {...stroke} />
      <path d="M12 3v3M9 4.5l1.2 2M15 4.5l-1.2 2" {...stroke} />
    </svg>
  );
}

/** 다이어트 — 저울 */
export function ScaleIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 4v16" {...stroke} />
      <path d="M5 8h14" {...stroke} />
      <path d="M8 20h8" {...stroke} />
      <path d="M5 8 2.5 14a3 3 0 0 0 5 0L5 8Z" {...stroke} />
      <path d="M19 8l-2.5 6a3 3 0 0 0 5 0L19 8Z" {...stroke} />
    </svg>
  );
}

/** 소화불량 — 위 */
export function StomachIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M9 3v4.5c0 1.2-.6 1.8-1.6 2.4A5.5 5.5 0 0 0 10 20.4c3.2.8 6.4-1 7.4-4.1.5-1.6.3-3-.4-4.3" {...stroke} />
      <path d="M17 12c1.2-.4 2-1.4 2-2.6" {...stroke} />
    </svg>
  );
}

/** 만성피로 — 배터리 */
export function BatteryIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="2.5" y="7.5" width="16" height="9" rx="2.5" {...stroke} />
      <path d="M21 10.5v3" {...stroke} />
      <path d="M6 11v2" {...stroke} />
    </svg>
  );
}

export const SYMPTOM_ICONS: Record<string, (p: P) => React.JSX.Element> = {
  pain: SpineIcon,
  "car-accident": ImpactIcon,
  diet: ScaleIcon,
  indigestion: StomachIcon,
  fatigue: BatteryIcon,
};
