import Link from "next/link";
import { CLINIC } from "@/content/clinic";
import { SYMPTOMS } from "@/content/symptoms";
import { AREAS } from "@/content/area";
import { NAV } from "@/content/nav";
import { ClinicStatus } from "./clinic-status";
import { MapPinIcon } from "./icons";

/**
 * 화면 폭을 채우는 유리 바.
 *
 * 각 항목은 커서를 올리면 하위 메뉴가 펼쳐진다. 자바스크립트 없이 CSS 로만
 * 동작하므로 느린 기기에서도 바로 열리고, 키보드 탭으로도 같은 메뉴가 열린다.
 * 최상위 항목도 실제 페이지를 가리켜서 그냥 눌러도 이동한다.
 *
 * 바는 화면 폭을 채우고 내용만 본문과 같은 컨테이너에 맞춰 선다.
 * 그래야 아래 회색 띠들과 좌우 선이 일치한다.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-ink/[0.07] bg-surface/70 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-[90rem] items-center gap-3 px-[clamp(1.25rem,4vw,4rem)] py-2.5">
        <Link href="/" className="shrink-0 text-lg font-bold tracking-tight">
          {CLINIC.name}
        </Link>
        {/* 메뉴가 다섯 개라 1024px 부근에서는 상태 배지까지 들어갈 자리가 없다.
            메뉴를 줄이는 대신 배지를 넓은 화면에서만 띄운다 */}
        <span className="hidden xl:block">
          <ClinicStatus className="shrink-0" />
        </span>

        <div className="ml-3 hidden items-center gap-0.5 text-[15px] lg:flex">
          {NAV.map((entry) => (
            <div key={entry.label} className="navitem relative">
              <Link
                href={entry.href}
                className="navtrigger flex items-center gap-1 rounded-full px-3 py-2 text-muted transition-colors hover:bg-tint hover:text-ink"
              >
                {entry.label}
                <svg viewBox="0 0 24 24" fill="none" className="navchev h-3.5 w-3.5" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <div className="navpanel">
                {/* 두 줄짜리 메뉴는 칸이 좁으면 제목이 서너 줄로 쪼개진다. 폭을 미리 벌려 둔다 */}
                <div
                  className={
                    "navcard grid gap-x-6 gap-y-5 " +
                    (entry.groups.length > 1 ? "min-w-[32rem] grid-cols-2" : "min-w-[16rem] grid-cols-1")
                  }
                >
                  {entry.groups.map((g) => (
                    <div key={g.title}>
                      <p className="px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                        {g.title}
                      </p>
                      <ul className="mt-1.5">
                        {g.links.map((l) => (
                          <li key={l.href + l.label}>
                            <Link
                              href={l.href}
                              className="block rounded-xl px-3 py-2 transition-colors hover:bg-tint"
                            >
                              <span className="kr block text-[15px] font-medium leading-snug text-ink">
                                {l.label}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/reservation"
          className="press ml-auto inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-herb py-2.5 pl-5 pr-2 text-[15px] font-semibold text-paper"
        >
          <span>편리한 상담예약</span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
            <Arrow className="arw" />
          </span>
        </Link>
      </nav>
    </header>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`h-4 w-4 ${className}`} aria-hidden="true">
      <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 상세 페이지의 첫 화면.
 * 스크롤을 기다리지 않고 로드와 동시에 어절 단위로 글자가 맺힌다.
 * 지연은 CSS 변수로만 넘기고 계산은 여기서 끝낸다.
 */
export function PageHead({ eyebrow, title, lede }: { eyebrow: string; title: string; lede: string }) {
  const words = title.split(" ");
  const ledeDelay = 220 + words.length * 70;

  return (
    <header className="border-b border-line pb-10">
      <span
        className="enter inline-block rounded-full bg-tint px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-herb"
        style={{ "--d": "0ms" } as React.CSSProperties}
      >
        {eyebrow}
      </span>
      <h1 className="display kr mt-5 text-3xl text-balance sm:text-[2.6rem]">
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="enter enter-word"
            style={{ "--d": `${140 + i * 70}ms` } as React.CSSProperties}
          >
            {i === 0 ? w : ` ${w}`}
          </span>
        ))}
      </h1>
      <p
        className="enter kr mt-5 max-w-[52ch] text-[17px] leading-8 text-muted"
        style={{ "--d": `${ledeDelay}ms` } as React.CSSProperties}
      >
        {lede}
      </p>
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
      <h2 className="display kr text-2xl sm:text-[1.7rem]">{title}</h2>
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
 * 길찾기.
 *
 * 30~50대 한국 사용자는 네이버 지도와 카카오맵으로 길을 찾는다.
 * 네이버는 플레이스 고유 URL 로 바로 보낸다. 검색을 거치지 않아 정확하다.
 */
export function MapLinks({ compact = false }: { compact?: boolean }) {
  const q = encodeURIComponent(CLINIC.name);
  const dest = encodeURIComponent(`${CLINIC.name} ${CLINIC.address}`);
  return (
    <div className={compact ? "flex flex-wrap gap-2" : "grid gap-2 sm:grid-cols-3"}>
      <a
        href={CLINIC.placeUrl}
        target="_blank"
        rel="noopener"
        className="press inline-flex items-center justify-center gap-2 rounded-full bg-[#03C75A] px-6 py-3.5 font-semibold text-white"
      >
        <MapPinIcon className="h-5 w-5" />
        <span>네이버 지도</span>
      </a>
      <a
        href={`https://map.kakao.com/?q=${q}`}
        target="_blank"
        rel="noopener"
        className="press inline-flex items-center justify-center gap-2 rounded-full bg-[#FEE500] px-6 py-3.5 font-semibold text-[#191600]"
      >
        <MapPinIcon className="h-5 w-5" />
        <span>카카오맵</span>
      </a>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${dest}`}
        target="_blank"
        rel="noopener"
        className="press inline-flex items-center justify-center gap-2 rounded-full bg-surface px-6 py-3.5 font-semibold ring-1 ring-line"
      >
        <MapPinIcon className="h-5 w-5 text-herb" />
        <span>구글 지도</span>
      </a>
    </div>
  );
}

/**
 * 지도.
 *
 * 구글 지도만 열쇠 없이 삽입할 수 있다. 네이버와 카카오는 지도를 페이지에 심으려면
 * API 키를 발급받고 도메인을 등록해야 해서, 도메인이 정해진 뒤에 붙인다.
 * 그때까지는 지도 한 장을 띄우고 세 앱으로 나가는 버튼을 함께 둔다.
 */
export function MapPanel() {
  const q = encodeURIComponent(`${CLINIC.address} ${CLINIC.name}`);
  return (
    <div>
      <div className="overflow-hidden rounded-[2rem] border border-line bg-surface-2">
        <iframe
          title={`${CLINIC.name} 위치`}
          src={`https://www.google.com/maps?q=${q}&hl=ko&z=17&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[22rem] w-full border-0"
        />
      </div>
      <p className="kr mt-4 text-[15px] leading-7 text-muted">
        {CLINIC.address} · {CLINIC.landmark}
        <br />
        {CLINIC.transit}
      </p>
      <div className="mt-4">
        <MapLinks />
      </div>
    </div>
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
      <div className="mx-auto w-full max-w-[90rem] px-[clamp(1.25rem,4vw,4rem)] py-14">
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
          <Link href="/care" className="transition-colors hover:text-ink">진료과목</Link>
          <Link href="/part" className="transition-colors hover:text-ink">부위별 안내</Link>
          <Link href="/treatment" className="transition-colors hover:text-ink">치료 방법</Link>
          <Link href="/reservation" className="transition-colors hover:text-ink">예약·상담</Link>
          <Link href="/cost" className="transition-colors hover:text-ink">진료비 안내</Link>
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

      {/* 모바일·태블릿 하단 고정바 — 검색 유입 대부분이 모바일.
          상단 메뉴가 나타나는 lg에서 교대한다. md로 끊으면 768~1024px 구간에
          내비게이션이 하나도 남지 않는다 */}
      <div className="h-16 lg:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-line bg-line lg:hidden">
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
