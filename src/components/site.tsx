import Link from "next/link";
import { CLINIC } from "@/content/clinic";
import { SYMPTOMS } from "@/content/symptoms";
import { INTENTS, type IntentKey } from "@/content/types";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-5">
        <Link href="/" className="font-serif text-lg font-bold tracking-tight">
          {CLINIC.name}
        </Link>
        <nav className="ml-2 hidden gap-1 md:flex">
          {SYMPTOMS.map((s) => (
            <Link
              key={s.slug}
              href={`/care/${s.slug}`}
              className="rounded px-3 py-2 text-sm text-muted transition-colors hover:bg-jade-soft hover:text-ink"
            >
              {s.name}
            </Link>
          ))}
          <Link
            href="/cost/back-pain"
            className="rounded px-3 py-2 text-sm text-muted transition-colors hover:bg-jade-soft hover:text-ink"
          >
            비용·보험
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a
            href={CLINIC.phoneHref}
            className="hidden rounded border border-line px-3 py-2 text-sm text-ink transition-colors hover:border-jade sm:block"
          >
            전화
          </a>
          <Link
            href="/reservation"
            className="rounded bg-jade px-4 py-2 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
          >
            예약
          </Link>
        </div>
      </div>
    </header>
  );
}

/**
 * 같은 증상의 5개 의도 페이지를 서로 연결한다.
 * 검색 의도별로 페이지를 쪼갠 구조는 이 상호 링크가 있어야 작동한다.
 */
export function IntentNav({
  slug,
  name,
  current,
}: {
  slug: string;
  name: string;
  current: IntentKey;
}) {
  return (
    <nav aria-label={`${name} 관련 페이지`} className="border-y border-line bg-surface-2">
      <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-5 py-2">
        {INTENTS.map((i) => {
          const active = i.key === current;
          return (
            <Link
              key={i.key}
              href={`${i.base}/${slug}`}
              aria-current={active ? "page" : undefined}
              className={
                "whitespace-nowrap rounded px-3 py-2 text-sm transition-colors " +
                (active
                  ? "bg-jade text-paper font-semibold"
                  : "text-muted hover:bg-jade-soft hover:text-ink")
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

export function PageHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="border-b border-line pb-10">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-jade">{eyebrow}</p>
      <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      <p className="mt-5 max-w-[60ch] text-[17px] leading-8 text-muted">{lede}</p>
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
      <h2 className="font-serif text-2xl font-bold tracking-tight">{title}</h2>
      {note && <p className="mt-2 max-w-[62ch] text-[15px] leading-7 text-muted">{note}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function Cta({ label = "진료 예약하기" }: { label?: string }) {
  return (
    <aside className="mt-14 rounded border border-jade-line bg-jade-soft p-7">
      <p className="font-serif text-xl font-bold">{label}</p>
      <p className="mt-2 text-[15px] leading-7 text-muted">
        {CLINIC.hours[0].day} {CLINIC.hours[0].time} · {CLINIC.parking} · {CLINIC.transit}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href="/reservation"
          className="rounded bg-jade px-5 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
        >
          온라인 예약
        </Link>
        <a
          href={CLINIC.phoneHref}
          className="rounded border border-line bg-surface px-5 py-3 text-sm transition-colors hover:border-jade"
        >
          전화 상담 {CLINIC.phone}
        </a>
      </div>
    </aside>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-12">
        <p className="font-serif text-lg font-bold">{CLINIC.name}</p>
        <p className="mt-2 text-sm leading-7 text-muted">
          {CLINIC.address}
          <br />
          {CLINIC.phone} · {CLINIC.transit} · {CLINIC.parking}
        </p>
        <dl className="mt-6 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
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
        <p className="mt-8 max-w-[70ch] text-xs leading-6 text-faint">{CLINIC.legalNote}</p>
      </div>
      {/* 모바일 하단 고정바 — 검색 유입의 대부분이 모바일이다 */}
      <div className="h-16 md:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-px border-t border-line bg-line md:hidden">
        <a href={CLINIC.phoneHref} className="bg-surface py-4 text-center text-sm">
          전화
        </a>
        <Link href="/directions" className="bg-surface py-4 text-center text-sm">
          길찾기
        </Link>
        <Link href="/reservation" className="bg-jade py-4 text-center text-sm font-semibold text-paper">
          예약
        </Link>
      </div>
    </footer>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
