import Link from "next/link";
import { CLINIC } from "@/content/clinic";
import { SYMPTOMS } from "@/content/symptoms";
import { AREAS } from "@/content/area";
import { INTENTS, type IntentKey } from "@/content/types";
import { ClinicStatus } from "./clinic-status";

/** 가장자리에 붙은 바가 아니라 떠 있는 글래스 필 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4">
      <nav className="mx-auto flex max-w-6xl items-center gap-3 rounded-full bg-surface/70 py-2 pl-6 pr-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-ink/[0.07] backdrop-blur-xl">
        <Link href="/" className="shrink-0 text-lg font-bold tracking-tight">
          {CLINIC.name}
        </Link>
        <ClinicStatus className="shrink-0" />
        <div className="ml-4 hidden items-center gap-1 text-[15px] text-muted lg:flex">
          {SYMPTOMS.map((s) => (
            <Link
              key={s.slug}
              href={`/care/${s.slug}`}
              className="rounded-full px-3 py-2 transition-colors hover:bg-tint hover:text-ink"
            >
              {s.name}
            </Link>
          ))}
        </div>
        <a
          href={CLINIC.phoneHref}
          className="press ml-auto inline-flex items-center gap-2 rounded-full bg-herb py-2.5 pl-5 pr-2 text-[15px] font-semibold text-paper"
        >
          <span>예약</span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
            <Arrow className="arw" />
          </span>
        </a>
      </nav>
    </header>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`h-4 w-4 ${className}`} aria-hidden="true">
      <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 같은 과목의 4개 의도 페이지를 서로 연결한다. 이 상호 링크가 있어야 의도 분해가 작동한다. */
export function IntentNav({ slug, name, current }: { slug: string; name: string; current: IntentKey }) {
  return (
    <nav aria-label={`${name} 관련 페이지`} className="border-b border-line bg-surface-2">
      <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-5 py-2">
        {INTENTS.map((i) => {
          const active = i.key === current;
          return (
            <Link
              key={i.key}
              href={`${i.base}/${slug}`}
              aria-current={active ? "page" : undefined}
              className={
                "whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors " +
                (active ? "bg-herb font-semibold text-paper" : "text-muted hover:bg-tint hover:text-ink")
              }
            >
              {i.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function PageHead({ eyebrow, title, lede }: { eyebrow: string; title: string; lede: string }) {
  return (
    <header className="border-b border-line pb-10">
      <span className="inline-block rounded-full bg-tint px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-herb">
        {eyebrow}
      </span>
      <h1 className="kr mt-5 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      <p className="kr mt-5 max-w-[52ch] text-[17px] leading-8 text-muted">{lede}</p>
    </header>
  );
}

export function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="kr text-2xl font-bold tracking-tight">{title}</h2>
      {note && <p className="kr mt-2 max-w-[58ch] text-[15px] leading-7 text-muted">{note}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

/** 유리판을 알루미늄 트레이에 얹은 구조 */
export function Bezel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[2rem] bg-ink/[0.04] p-1.5 ring-1 ring-ink/[0.06] ${className}`}>
      <div className="rounded-[calc(2rem-0.375rem)] bg-surface shadow-[var(--shadow-ambient)]">{children}</div>
    </div>
  );
}

/**
 * 길찾기. 30~50대 한국 사용자는 네이버 지도와 카카오맵으로 길을 찾는다.
 * 네이버는 플레이스 고유 URL 로 바로 보낸다. 검색을 거치지 않아 정확하다.
 */
export function MapLinks({ compact = false }: { compact?: boolean }) {
  const q = encodeURIComponent(CLINIC.name);
  return (
    <div className={compact ? "flex flex-wrap gap-2" : "grid gap-2 sm:grid-cols-2"}>
      <a
        href={CLINIC.placeUrl}
        target="_blank"
        rel="noopener"
        className="press inline-flex items-center justify-center gap-2 rounded-full bg-[#03C75A] px-6 py-3.5 font-semibold text-white"
      >
        <PinIcon />
        <span>네이버 지도 길찾기</span>
      </a>
      <a
        href={`https://map.kakao.com/?q=${q}`}
        target="_blank"
        rel="noopener"
        className="press inline-flex items-center justify-center gap-2 rounded-full bg-[#FEE500] px-6 py-3.5 font-semibold text-[#191600]"
      >
        <PinIcon />
        <span>카카오맵 길찾기</span>
      </a>
    </div>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Cta({ label = "진료 예약하기" }: { label?: string }) {
  return (
    <aside className="mt-14 rounded-[2rem] border border-herb/15 bg-tint p-8">
      <p className="kr text-xl font-bold">{label}</p>
      <p className="kr mt-2 text-[15px] leading-7 text-muted">
        {CLINIC.hours[0].day} {CLINIC.hours[0].time} · {CLINIC.address}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={CLINIC.phoneHref}
          className="press inline-flex items-center justify-between gap-3 rounded-full bg-herb py-3.5 pl-7 pr-2 font-semibold text-paper"
        >
          <span>전화 예약 {CLINIC.phone}</span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15">
            <Arrow className="arw" />
          </span>
        </a>
      </div>
    </aside>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xl font-bold">{CLINIC.name}</p>
            <p className="kr mt-3 text-sm leading-7 text-muted">
              {CLINIC.address} · {CLINIC.landmark}
              <br />
              {CLINIC.transit}
              <br />
              {CLINIC.phone}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {SYMPTOMS.map((s) => (
              <Link key={s.slug} href={`/care/${s.slug}`} className="transition-colors hover:text-ink">
                {s.name}
              </Link>
            ))}
          </nav>
        </div>

        <nav aria-label="더 보기" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <Link href="/column" className="transition-colors hover:text-ink">원장 칼럼</Link>
          <Link href="/directions" className="transition-colors hover:text-ink">오시는 길</Link>
        </nav>

        <nav aria-label="지역별 안내" className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {AREAS.map((a) => (
            <Link key={a.slug} href={`/area/${a.slug}`} className="transition-colors hover:text-ink">
              {a.title}
            </Link>
          ))}
        </nav>

        <dl className="mt-8 grid gap-x-8 text-sm sm:grid-cols-2">
          {CLINIC.hours.map((h) => (
            <div key={h.day} className="flex justify-between border-b border-line py-2">
              <dt className="text-muted">{h.day}</dt>
              <dd className="tabular-nums">
                {h.time}
                {h.note && <span className="ml-2 text-xs text-faint">{h.note}</span>}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 border-t border-line pt-8">
          <p className="kr max-w-[76ch] text-xs leading-6 text-faint">{CLINIC.legalNote}</p>
          {/* TODO: 사업자 정보 실제 값으로 교체 (의료기관 표시 의무) */}
          <div className="kr mt-6 border-t border-line pt-6 text-[11px] leading-6 text-faint">
            <p>
              상호: {CLINIC.name} | 대표자: {CLINIC.business.owner} | 사업자등록번호: {CLINIC.business.regNo}
            </p>
            <p>
              주소: {CLINIC.address} | 전화: {CLINIC.phone}
            </p>
          </div>
        </div>
      </div>

      {/* 모바일 하단 고정바 — 검색 유입 대부분이 모바일 */}
      <div className="h-16 md:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-line bg-line md:hidden">
        <a
          href={CLINIC.placeUrl}
          target="_blank"
          rel="noopener"
          className="bg-surface py-4 text-center text-sm font-medium"
        >
          길찾기
        </a>
        <a href={CLINIC.phoneHref} className="bg-herb py-4 text-center text-sm font-semibold text-paper">
          전화 예약
        </a>
      </div>
    </footer>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
