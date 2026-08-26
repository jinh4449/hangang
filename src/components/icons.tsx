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

/** 초음파 — 프로브에서 퍼지는 파형 */
export function UltrasoundIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4.5 3.5h4a1 1 0 0 1 1 1v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3v-6a1 1 0 0 1 1-1Z" {...stroke} />
      <path d="M13 7.5a5 5 0 0 1 0 9" {...stroke} />
      <path d="M16 5a8.5 8.5 0 0 1 0 14" {...stroke} />
      <path d="M19 2.5a12 12 0 0 1 0 19" {...stroke} />
    </svg>
  );
}

/** 소개 — 사람에서 사람으로 */
export function ReferralIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="6" cy="7" r="2.6" {...stroke} />
      <path d="M2.5 19c0-2.5 1.6-4.2 3.5-4.2S9.5 16.5 9.5 19" {...stroke} />
      <circle cx="18" cy="7" r="2.6" {...stroke} />
      <path d="M14.5 19c0-2.5 1.6-4.2 3.5-4.2s3.5 1.7 3.5 4.2" {...stroke} />
      <path d="M10.5 10.5h3m0 0-1.2-1.2m1.2 1.2-1.2 1.2" {...stroke} />
    </svg>
  );
}

/** 협진 — 두 원장 */
export function CoDoctorIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="8.5" cy="7.5" r="3" {...stroke} />
      <circle cx="16.5" cy="9.5" r="2.4" {...stroke} />
      <path d="M3 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" {...stroke} />
      <path d="M15 15.2c2.4.3 4 2.1 4 4.3" {...stroke} />
    </svg>
  );
}

/** 전후 비교 */
export function CompareIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="2.5" y="5" width="8" height="14" rx="1.8" {...stroke} />
      <rect x="13.5" y="5" width="8" height="14" rx="1.8" {...stroke} />
      <path d="M12 8.5v7" {...stroke} strokeDasharray="2 2.5" />
    </svg>
  );
}

/** 다른 과로 안내 */
export function RedirectIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 12h11" {...stroke} />
      <path d="M11.5 8.5 15 12l-3.5 3.5" {...stroke} />
      <path d="M17.5 4.5h2v15h-2" {...stroke} />
    </svg>
  );
}

export const WHY_ICONS: Record<string, (p: P) => React.JSX.Element> = {
  ultrasound: UltrasoundIcon,
  referral: ReferralIcon,
  codoctor: CoDoctorIcon,
  compare: CompareIcon,
  redirect: RedirectIcon,
};

export const SYMPTOM_ICONS: Record<string, (p: P) => React.JSX.Element> = {
  pain: SpineIcon,
  "car-accident": ImpactIcon,
  diet: ScaleIcon,
  indigestion: StomachIcon,
  fatigue: BatteryIcon,
};

/** 예약 창구 아이콘. 브랜드 색 타일 위에 얹어 쓴다 */
export function PhoneIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z"
        {...stroke}
      />
    </svg>
  );
}

export function ChatIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 4c4.4 0 8 2.8 8 6.2 0 3.5-3.6 6.3-8 6.3-.7 0-1.4-.1-2-.2l-4 2.7.8-3.5C4.9 14.4 4 12.6 4 10.2 4 6.8 7.6 4 12 4Z" {...stroke} />
    </svg>
  );
}

export function CalendarIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" {...stroke} />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" {...stroke} />
    </svg>
  );
}

export function MapPinIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" {...stroke} />
      <circle cx="12" cy="10" r="2.5" {...stroke} />
    </svg>
  );
}

/** 침 — 가느다란 침 한 대 */
export function NeedleIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M19 4 8.5 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="m17.5 2.5 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="m8.5 14.5-2.2 5.2 5.2-2.2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

/** 추나 — 손으로 다룬다 */
export function HandIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1V4.5a1.5 1.5 0 0 1 3 0V11m0-.5V6.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-.8a5 5 0 0 1-4.3-2.5L6 14.5a1.5 1.5 0 0 1 2.6-1.5L9 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 체외충격파 — 퍼져 나가는 파동 */
export function ShockwaveIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".5" />
    </svg>
  );
}

/** 한약 — 약탕기 */
export function HerbIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 9.5h16v3a8 8 0 0 1-8 8 8 8 0 0 1-8-8v-3Z" {...stroke} />
      <path d="M20 11h1.2a1.8 1.8 0 0 1 0 3.6H19.6" {...stroke} />
      <path d="M9 6.5c0-1.5 1.3-2 1.3-3.5M14 6.5c0-1.2 1-1.7 1-3" {...stroke} />
    </svg>
  );
}

/** 식이 · 생활 지도 — 접시와 수저 */
export function MealIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="10" cy="12" r="6.5" {...stroke} />
      <circle cx="10" cy="12" r="3" {...stroke} />
      <path d="M19 3.5v17M17 3.5v4a2 2 0 0 0 4 0v-4" {...stroke} />
    </svg>
  );
}

/** 치료 박스에 얹는 아이콘. 키는 Symptom.care.treatments[].icon */
export const TREATMENT_ICONS: Record<string, (p: P) => React.JSX.Element> = {
  needle: NeedleIcon,
  hand: HandIcon,
  shockwave: ShockwaveIcon,
  ultrasound: UltrasoundIcon,
  herb: HerbIcon,
  meal: MealIcon,
};
