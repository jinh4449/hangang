import type { Metadata } from "next";
import Link from "next/link";
import { CLINIC } from "@/content/clinic";
import { BOOKING_FAQ } from "@/content/booking";
import { Section, MapPanel, JsonLd, Arrow } from "@/components/site";
import { ClinicStatus } from "@/components/clinic-status";
import { PhoneIcon, ChatIcon, CalendarIcon } from "@/components/icons";
import { breadcrumb, faqPage, medicalWebPage } from "@/content/schema";

export const metadata: Metadata = {
  title: "예약 · 상담",
  description:
    `${CLINIC.name} 예약 안내. 전화 ${CLINIC.phone}. ` +
    "평일 09:30~20:00, 토요일과 공휴일 09:30~15:00 진료합니다. 당일 예약, 준비물, 주차 안내.",
};

/** 개설된 창구만 보여준다. 없는 창구를 안내하면 환자가 헛수고를 한다 */
type Channel = {
  key: string;
  label: string;
  value: string;
  note: string;
  href: string;
  external?: boolean;
  tile: string;
  glyph: string;
  Icon: (p: { className?: string }) => React.JSX.Element;
};

function channels(): Channel[] {
  const b = CLINIC.booking;
  const list: Channel[] = [
    {
      key: "phone",
      label: "전화 예약",
      value: CLINIC.phone,
      note: "가장 빠릅니다",
      href: CLINIC.phoneHref,
      tile: "bg-herb",
      glyph: "text-paper",
      Icon: PhoneIcon,
    },
  ];

  if (b.kakaoChatUrl || b.kakaoChannel) {
    list.push({
      key: "kakao",
      label: "카카오톡 상담",
      value: b.kakaoChannel ?? "카카오톡 채널",
      note: "진료시간에 답변드립니다",
      href: b.kakaoChatUrl ?? `https://pf.kakao.com/`,
      external: true,
      tile: "bg-[#FEE500]",
      glyph: "text-[#191600]",
      Icon: ChatIcon,
    });
  }

  list.push({
    key: "naver",
    label: b.naverBookingUrl ? "네이버 예약" : "네이버 플레이스",
    value: b.naverBookingUrl ? "간편 예약" : "위치 · 리뷰 확인",
    note: b.naverBookingUrl ? "24시간 신청 가능" : "길찾기와 리뷰를 볼 수 있습니다",
    href: b.naverBookingUrl ?? CLINIC.placeUrl,
    external: true,
    tile: "bg-[#03C75A]",
    glyph: "text-white",
    Icon: CalendarIcon,
  });

  return list;
}

export default function Reservation() {
  const list = channels();

  return (
    <>
      <JsonLd
        data={medicalWebPage({
          name: `${CLINIC.name} 예약 · 상담`,
          path: "/reservation",
          description: `전화 ${CLINIC.phone}. 평일 09:30~20:00, 토요일·공휴일 09:30~15:00 진료.`,
        })}
      />
      <JsonLd data={faqPage(BOOKING_FAQ)} />
      <JsonLd data={breadcrumb([{ name: "예약 · 상담", path: "/reservation" }])} />

      {/* 히어로 — 예약하려고 들어온 사람에게 방법부터 보여준다 */}
      <section className="border-b border-line bg-surface-2/60">
        <div className="mx-auto max-w-4xl px-5 pb-14 pt-12 text-center sm:pt-16 xl:max-w-5xl">
          <span
            className="enter inline-flex items-center gap-2 rounded-full bg-ochre-soft px-3.5 py-1.5 text-[12px] font-semibold text-ochre"
            style={{ "--d": "0ms" } as React.CSSProperties}
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            예약 · 상담
          </span>
          <h1
            className="display display-black enter kr mt-6 text-[2.15rem] text-balance sm:text-5xl"
            style={{ "--d": "110ms" } as React.CSSProperties}
          >
            편리한 <span className="grad inline-block">상담 예약</span>
          </h1>
          <p
            className="enter kr mx-auto mt-6 max-w-[46ch] text-[17px] leading-8 text-muted"
            style={{ "--d": "250ms" } as React.CSSProperties}
          >
            평일은 밤 8시까지, 토요일과 공휴일에도 진료합니다. 전화 한 통이면 가장 빠르게 시간을
            잡아 드립니다.
          </p>
          <div
            className="enter mt-7 flex justify-center"
            style={{ "--d": "360ms" } as React.CSSProperties}
          >
            <ClinicStatus />
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-5 py-14 xl:max-w-5xl">
        {/* 예약 창구 */}
        <div
          className={
            "grid gap-3 " + (list.length >= 3 ? "md:grid-cols-3" : "sm:grid-cols-2")
          }
        >
          {list.map((c) => (
            <a
              key={c.key}
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
              className="tile flex flex-col items-center bg-surface px-6 py-9 text-center"
            >
              <span className={`grid h-14 w-14 place-items-center rounded-2xl ${c.tile}`}>
                <c.Icon className={`h-7 w-7 ${c.glyph}`} />
              </span>
              <span className="kr mt-5 font-bold">{c.label}</span>
              <span className="mt-1 text-lg font-bold text-herb">{c.value}</span>
              <span className="kr mt-2 text-sm text-muted">{c.note}</span>
            </a>
          ))}
        </div>

        {/* 카카오톡 채널이 아직 없으면 카드 대신 이 줄만 나간다 */}
        {!CLINIC.booking.kakaoChatUrl && !CLINIC.booking.kakaoChannel && (
          <p className="kr mt-3 text-center text-sm text-faint">
            카카오톡 상담은 준비 중입니다. 지금은 전화로 문의해 주세요.
          </p>
        )}

        <Section title="진료 시간" note="평일 13:00~14:00은 점심시간입니다. 일요일은 휴진합니다.">
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {CLINIC.hours.map((h) => (
              <div
                key={h.day}
                className="flex items-baseline justify-between border-b border-line py-3.5"
              >
                <dt className="text-muted">{h.day}</dt>
                <dd className="font-display font-medium tabular-nums">
                  {h.time}
                  {h.note && <span className="ml-2 text-xs text-faint">{h.note}</span>}
                </dd>
              </div>
            ))}
          </dl>
          <p className="kr mt-5 rounded-2xl bg-tint px-6 py-5 text-[15px] leading-7 ring-1 ring-herb/15">
            공휴일과 대체공휴일도 09:30~15:00 진료합니다. 설날 당일과 추석 당일만 쉽니다.
          </p>
        </Section>

        {/* 예약 FAQ — details 라 자바스크립트 없이 접히고 펼쳐진다 */}
        <Section title="예약 관련 자주 묻는 질문">
          <div className="grid gap-2">
            {BOOKING_FAQ.map((f) => (
              <details key={f.q} className="faq group bg-surface">
                <summary className="kr flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold">
                  {f.q}
                  <span className="faq-mark shrink-0 text-muted" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path
                        d="m6 9 6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="kr border-t border-line px-6 py-5 text-[15px] leading-8 text-muted">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
          <p className="kr mt-4 text-sm text-muted">
            여기에 없는 것은{" "}
            <a href={CLINIC.phoneHref} className="font-semibold text-herb underline underline-offset-4">
              {CLINIC.phone}
            </a>
            로 물어봐 주세요.
          </p>
        </Section>

        <Section
          title="오시는 길"
          note="네이버 지도, 카카오맵, 구글 지도 중 쓰시는 앱으로 바로 길을 찾으실 수 있습니다."
        >
          <MapPanel />
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {CLINIC.parkingList.map((pk) => (
              <div
                key={pk}
                className="kr rounded-2xl bg-surface px-5 py-4 text-center text-[15px] ring-1 ring-line"
              >
                {pk}
              </div>
            ))}
          </div>
          <p className="kr mt-3 text-center text-sm text-muted">주차는 세 곳 중 편하신 곳을 이용하시면 됩니다.</p>
          <div className="mt-6 text-center">
            <Link
              href="/directions"
              className="press inline-flex items-center gap-2 rounded-full bg-surface px-7 py-3.5 font-medium ring-1 ring-line"
            >
              오시는 길 자세히 보기
              <Arrow className="arw" />
            </Link>
          </div>
        </Section>

        <aside className="mt-14 rounded-[2rem] bg-ink px-8 py-12 text-center text-paper">
          <p className="kr text-2xl font-bold">지금 전화하시면 바로 잡아 드립니다</p>
          <p className="kr mx-auto mt-3 max-w-[40ch] leading-8 text-paper/70">
            어디가 어떻게 불편하신지만 말씀해 주시면, 얼마나 걸릴지 예상해서 시간을 비워 두겠습니다.
          </p>
          <a
            href={CLINIC.phoneHref}
            className="press mt-7 inline-flex items-center justify-between gap-3 rounded-full bg-paper py-4 pl-8 pr-2 text-lg font-bold text-ink"
          >
            <span>{CLINIC.phone}</span>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-herb text-paper">
              <Arrow className="arw" />
            </span>
          </a>
        </aside>
      </article>
    </>
  );
}
