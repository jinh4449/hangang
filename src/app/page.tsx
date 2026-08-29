import Link from "next/link";
import Image from "next/image";
import { CLINIC } from "@/content/clinic";
import { SYMPTOMS, getSymptom } from "@/content/symptoms";
import { QUESTION_COLUMNS } from "@/content/column";
import { PARTS } from "@/content/part";
import { JsonLd, Arrow } from "@/components/site";
import {
  SYMPTOM_ICONS,
  MapPinIcon,
  CalendarIcon,
  UltrasoundIcon,
  CoDoctorIcon,
  RedirectIcon,
  ScaleIcon,
  ChatIcon,
  ShieldIcon,
  DocIcon,
  EyeIcon,
  ClockIcon,
} from "@/components/icons";

const pain = getSymptom("pain")!;

/** 문장마다 줄을 바꾼다. 가운데 정렬한 글은 문장이 뭉치면 눈이 줄을 놓친다 */
function Lines({ children }: { children: string[] }) {
  return (
    <>
      {children.map((line) => (
        <RiseLine key={line}>{line}</RiseLine>
      ))}
    </>
  );
}

/**
 * 솟아오르는 한 줄.
 *
 * 바깥이 가리개고 안쪽이 움직인다. 가리개가 자기 아래를 자르고 있어서
 * 글자는 제 자리 바로 밑에 숨어 있다가 자기 줄로 올라온다.
 * 두 겹이 필요하다. 한 겹으로는 자기가 움직이면 자르는 자리도 같이 움직인다.
 */
function RiseLine({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`rise ${className}`}>
      <span className="rise-in">{children}</span>
    </span>
  );
}

/** 솟아오르는 한 덩어리. 칸이나 사진처럼 줄이 아닌 것에 쓴다 */
function Rise({
  children,
  className = "",
  fill = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** 격자 칸처럼 옆칸과 키를 맞춰야 하면 켠다 */
  fill?: boolean;
}) {
  return (
    <div className={`rise ${fill ? "h-full" : ""} ${className}`}>
      <div className={`rise-in ${fill ? "h-full" : ""}`}>{children}</div>
    </div>
  );
}

/** 메인의 섹션 제목은 모두 같은 크기·같은 정렬로 선다. 여기서만 정한다.
 *  accent는 제목의 뒷부분으로, 히어로와 같은 금빛 그라데이션이 걸린다 */
function H2({
  children,
  accent,
  note,
  small = false,
  className = "",
}: {
  children: React.ReactNode;
  accent?: string;
  /** 떠오르기 등 바깥에서 거는 표시 */
  className?: string;
  /** 배열로 주면 한 줄씩 끊어 세운다. 두 문장이 한 줄에 뭉치면 읽기 힘들다 */
  note?: string | string[];
  /** 상위 섹션에 딸린 이야기는 한 단계 작게 세워 위계를 만든다 */
  small?: boolean;
}) {
  return (
    <div className={`text-center ${className}`}>
      <h2
        className={
          "display kr " +
          (small
            ? "text-2xl sm:text-3xl xl:text-[2.1rem]"
            : "text-3xl sm:text-4xl xl:text-[2.75rem]")
        }
      >
        <RiseLine>
          {children}
          {accent && (
            <>
              {" "}
              <span className="grad">{accent}</span>
            </>
          )}
        </RiseLine>
      </h2>
      {note && (
        <p className="kr mx-auto mt-4 max-w-[52ch] text-[17px] leading-8 text-muted xl:text-[18px] xl:leading-9">
          {(Array.isArray(note) ? note : [note]).map((line) => (
            <RiseLine key={line}>{line}</RiseLine>
          ))}
        </p>
      )}
    </div>
  );
}

/**
 * 첫 화면 배경 — 한강.
 *
 * 흰 바탕에 글자만 있으면 비어 보인다. 그렇다고 무늬를 깔면 글자와 다툰다.
 * 그래서 낮게 깔린 빛 한 겹만 둔다. 이름이 한강이니 물가의 새벽빛이다.
 * 장식이 아니라 공기라서, 있는 줄 모르고 읽다가 없으면 허전한 정도로만 넣는다.
 */
function RiverGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 흐림을 걸어야 가장자리에 금이 보이지 않는다. 칸 밖으로 넉넉히 빼 둔다 */}
      <div
        className="absolute left-1/2 top-[62%] h-[46rem] w-[76rem] -translate-x-1/2 rounded-[50%] opacity-70 blur-[90px]"
        style={{ background: "radial-gradient(closest-side, rgba(30,91,69,.20), transparent)" }}
      />
      <div
        className="absolute right-[-14rem] top-[-16rem] h-[38rem] w-[38rem] rounded-full opacity-70 blur-[80px]"
        style={{ background: "radial-gradient(closest-side, rgba(194,161,102,.24), transparent)" }}
      />
    </div>
  );
}

/** 첫 화면 표시줄 아이콘. 키는 clinic.ts 의 heroMarks[].icon */
const MARK_ICONS: Record<string, (p: { className?: string }) => React.JSX.Element> = {
  codoctor: CoDoctorIcon,
  calendar: CalendarIcon,
  clock: ClockIcon,
  mappin: MapPinIcon,
};

/** 우리 기준 칸의 아이콘. 키는 clinic.ts 의 icon 값 */
const STANDARD_ICONS: Record<string, (p: { className?: string }) => React.JSX.Element> = {
  ultrasound: UltrasoundIcon,
  codoctor: CoDoctorIcon,
  doc: DocIcon,
  clock: ClockIcon,
  scale: ScaleIcon,
  shield: ShieldIcon,
  chat: ChatIcon,
  eye: EyeIcon,
  redirect: RedirectIcon,
};

/**
 * 소개 비율 원.
 *
 * 원내 집계가 「절반 이상」이라는 어림값이라 퍼센트를 지어내지 않는다.
 * 대신 절반 자리에 눈금을 두고 원이 그 눈금을 지나 멈추게 해서,
 * 「절반을 넘었다」는 사실만 눈에 보이게 했다.
 */
function ReferralRing() {
  // 눈금을 링 바깥에 두어야 원이 지나갈 때 가려지지 않는다
  const R = 80;
  const CIRC = 2 * Math.PI * R;
  const STOP = 0.56; // 눈금(0.5)을 지난 것이 보일 만큼만

  return (
    <div className="ring-host relative mx-auto aspect-square w-[17rem] sm:w-[20rem]">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        {/* 안쪽을 채우는 판. 테두리가 돌아가는 동안 같이 차오른다 */}
        <circle className="ring-fill" cx="100" cy="100" r={R - 8} fill="var(--tint)" />
        <circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke="var(--tint)"
          strokeWidth="16"
        />
        {/* 절반 자리 눈금 — 12시에서 시계 방향으로 반 바퀴 돈 6시, 링 바깥 */}
        <line
          x1="100"
          y1="192"
          x2="100"
          y2="200"
          stroke="var(--herb)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          className="ring-arc"
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke="var(--herb)"
          strokeWidth="16"
          strokeLinecap="round"
          style={
            {
              "--circ": CIRC,
              "--target": CIRC * (1 - STOP),
            } as React.CSSProperties
          }
        />
      </svg>

      <div className="ring-label absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="display kr text-4xl font-black text-herb sm:text-5xl">
          {CLINIC.whyHero.stat.value}
        </span>
        <span className="kr mt-2 max-w-[9rem] text-[15px] leading-6 text-muted">
          소개로 오십니다
        </span>
      </div>

      <span className="absolute left-1/2 top-full -translate-x-1/2 pt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
        여기가 절반
      </span>
    </div>
  );
}

/** 로드와 동시에 순서대로 나타나는 히어로 조각 */
function Enter({
  d,
  className = "",
  children,
}: {
  d: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`enter ${className}`}
      style={{ "--d": `${d}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/**
 * 메인에 세우는 질문 목록.
 *
 * 진료실에서 실제로 받는 말 그대로 적는다. 「통증 치료 안내」 같은 제목은
 * 아픈 사람이 검색창에 치는 말이 아니다. 물어본 말이 그대로 제목이어야
 * 자기 이야기인 줄 알고 누른다.
 */
const QA = QUESTION_COLUMNS.map((c) => ({
  question: c.question,
  summary: c.summary,
  href: `/column/${c.slug}`,
  date: c.date,
  image: c.image,
}));

/** 2026-06-12 → 2026.06.12 */
const dotted = (iso: string) => iso.replaceAll("-", ".");

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: pain.faq.slice(0, 4).map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      {/* 히어로 — 환자가 속으로 던지는 세 가지 질문을 그대로 세운다.
          첫 화면은 이 세 줄만 보이게 화면을 통째로 쓴다 */}
      <section className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-center overflow-hidden border-b border-line">
        <RiverGlow />

        {/* 세로 가운데 정렬이라, 아래에 빈 칸을 두면 그 절반만큼 글이 올라간다.
            제목 한 줄만큼 올리려고 한 줄 높이의 두 배를 비워 둔다 */}
        <div
          aria-hidden="true"
          className="order-last h-[calc(2*clamp(2.5rem,6vw,5.25rem))] shrink-0"
        />
        <div className="relative mx-auto w-full max-w-[80rem] px-[clamp(1.5rem,6vw,7rem)] pb-14 pt-12 text-center sm:pt-16 xl:pb-20 xl:pt-24">
          <Enter d={0}>
            <span className="inline-block rounded-full bg-tint px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-herb">
              {CLINIC.tagline}
            </span>
          </Enter>

          <h1 className="display display-black kr mt-8 text-[2.15rem] leading-[1.26] sm:text-[3.1rem] lg:text-[3.8rem] xl:text-[4.5rem] 2xl:text-[5.2rem]">
            <span
              className="enter block"
              style={{ "--d": "180ms" } as React.CSSProperties}
            >
              내 증상, 이해해줄까?
            </span>
            <span
              className="enter block"
              style={{ "--d": "430ms" } as React.CSSProperties}
            >
              편하게 물어봐도 될까?
            </span>
            <span
              className="enter block"
              style={{ "--d": "680ms" } as React.CSSProperties}
            >
              {/* 세 번째 질문에만 표시가 남는다. 물음 뒤에 답이 오는 순서.
                  밑줄은 한글 받침을 뚫고 지나가므로 글자 뒤에 깔리는 쪽을 쓴다 */}
              <span className="relative inline-block">
                <span className="grad">믿고 맡겨도 될까?</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 10"
                  preserveAspectRatio="none"
                  className="answer-mark absolute left-0 top-full h-[0.16em] w-full overflow-visible"
                >
                  {/* pathLength 로 길이를 1로 맞춘다. 그래야 글자 폭이 바뀌어도
                      선이 잘리지 않고 끝까지 그어진다 */}
                  <path
                    d="M2 6C64 2 168 1.5 298 4.5"
                    pathLength={1}
                    fill="none"
                    stroke="var(--grad-b)"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </h1>

          <Enter d={900}>
            <p className="kr mx-auto mt-7 max-w-[56ch] text-[18px] leading-8 text-muted xl:mt-9 xl:text-[20px] xl:leading-9">
              <Lines>
                {[
                  "꼼꼼히 짚어보고, 충분히 듣고, 이해하기 쉽게 설명합니다.",
                  "꼭 필요한 치료로 삶에 도움이 되는 진료를 합니다.",
                ]}
              </Lines>
            </p>
          </Enter>

          {/* 처음 오는 분이 가장 먼저 확인하는 네 가지. 한 줄로 세우고 점으로 끊는다 */}
          <Enter d={1080}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-3 xl:mt-10">
              {CLINIC.heroMarks.map((m, i) => {
                const Icon = MARK_ICONS[m.icon];
                return (
                  <li key={m.label} className="flex items-center">
                    <span className="kr flex items-center gap-2 text-[15px] font-semibold sm:text-[16px]">
                      {Icon && <Icon className="h-[1.15em] w-[1.15em] shrink-0 text-grad-b" />}
                      {m.label}
                    </span>
                    {/* 구분점은 뒤에 붙인다. 앞에 두면 줄이 바뀔 때 점으로 시작한다 */}
                    {i < CLINIC.heroMarks.length - 1 && (
                      <span aria-hidden="true" className="px-2.5 text-[13px] text-faint sm:px-3.5">
                        ·
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </Enter>

          <Enter d={1240}>
            <div className="mt-9 xl:mt-11">
              <Link
                href="/reservation"
                className="press inline-flex items-center gap-2.5 rounded-full bg-herb px-8 py-4 text-[17px] font-semibold text-paper shadow-[var(--shadow-ambient)]"
              >
                진료 예약하기
                <Arrow className="arw" />
              </Link>
            </div>
          </Enter>

        </div>

        <a
          href="#why"
          aria-label="아래로"
          className="scroll-cue absolute bottom-7 left-1/2 hidden -translate-x-1/2 sm:block"
        >
          <span aria-hidden="true" className="scroll-cue-rail" />
        </a>
      </section>

      <div className="mx-auto w-full max-w-[90rem] px-[clamp(1.5rem,6vw,7rem)] py-16 xl:py-24">

        {/* 우리 기준 — 주장을 크게 세우고 오른쪽에서 풀고 아래에서 쪼갠다.
            내용이 많아 한 화면을 넘기므로 여기만 글자와 여백을 한 단계 줄인다 */}
        <section id="why" className="screen">
          <div className="mx-auto max-w-3xl text-center">
            <RiseLine>
              <span className="inline-block rounded-full bg-tint px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-herb">
                {CLINIC.whyHero.eyebrow}
              </span>
            </RiseLine>
            {/* 다른 섹션 제목과 같은 크기로 세운다. 좁은 화면에서는 저절로 꺾이되
                넓은 화면에서는 한 줄로 붙잡아 둔다 */}
            <h2 className="display kr mt-5 text-3xl text-balance sm:whitespace-nowrap sm:text-4xl xl:text-[2.75rem]">
              <RiseLine>
                {CLINIC.whyHero.headline[0]}{" "}
                <span className="grad">{CLINIC.whyHero.headline[1]}</span>
              </RiseLine>
            </h2>
            <p className="kr mt-4 text-[17px] leading-8 text-muted">
              <RiseLine>{CLINIC.whyHero.sub}</RiseLine>
            </p>
          </div>

          {/* 약속과 그 약속을 지키는 방법. 자세는 이 판이 아니라 아래 칸이 맡는다 */}
          <Rise className="mt-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-paper md:p-11 xl:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(132,194,167,.16) 0%, rgba(132,194,167,0) 70%)",
              }}
            />

            <div className="relative">
              <h3 className="kr text-[1.7rem] font-bold leading-[1.35] tracking-[-0.03em] sm:text-[2.1rem] xl:text-[2.4rem]">
                {CLINIC.standards.headline[0]}
                <span className="text-herb-light">{CLINIC.standards.headline[1]}</span>
                <br />
                {CLINIC.standards.headline[2]}
              </h3>
              <p className="kr mt-5 max-w-[56ch] text-[16.5px] leading-8 text-paper/70">
                {CLINIC.standards.sub}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-paper/10 px-4 py-2 text-[14px] font-semibold">
                <ShieldIcon className="h-4 w-4 text-herb-light" />
                {CLINIC.standards.badge}
              </span>

              <hr className="my-9 border-paper/12" />

              <p className="kr text-[15.5px] text-paper/60">
                {CLINIC.standards.howLead}{" "}
                <strong className="font-semibold text-paper">
                  {CLINIC.standards.howLeadStrong}
                </strong>
              </p>
              <ul className="mt-6 grid gap-x-12 gap-y-6 md:grid-cols-2">
                {CLINIC.standards.how.map((h) => {
                  const Icon = STANDARD_ICONS[h.icon];
                  return (
                    <li key={h.title} className="flex gap-3.5">
                      {Icon && <Icon className="mt-0.5 h-5 w-5 shrink-0 text-herb-light" />}
                      <p className="kr text-[15.5px] leading-7 text-paper/65">
                        <strong className="font-semibold text-paper">{h.title}.</strong>{" "}
                        {h.body}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          </Rise>

          {/* 진료 자세 — 검은 판 밖으로 꺼내야 각각이 한 장으로 읽힌다 */}
          <ul className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {CLINIC.standards.values.map((v) => {
              const Icon = STANDARD_ICONS[v.icon];
              return (
                <li key={v.no} className="rise h-full">
                  <div className="rise-in flex h-full flex-col rounded-[1.5rem] border border-line bg-surface p-7">
                  {Icon && (
                    <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[0.9rem] bg-surface-2 text-herb">
                      <Icon className="h-6 w-6" />
                    </span>
                  )}
                  <h3 className="kr text-[18px] font-bold leading-snug">{v.title}</h3>
                  <p className="kr mt-3 grow text-[15.5px] leading-7 text-muted">{v.body}</p>
                  <span className="kr mt-6 self-start rounded-full bg-tint px-3 py-1 text-[12px] font-medium text-herb">
                    핵심가치 · {v.tag}
                  </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 의료진 — 두 사람을 양쪽에 세우고 하는 말은 가운데에 하나로 둔다.
            소개를 둘로 쪼개면 누가 더 나은가를 고르는 화면이 된다 */}
        <section className="screen">
          <H2 accent="함께 진료합니다">두 원장이</H2>

          {/* 넓은 화면에서는 사람 사이에 말이 들어가고, 좁아지면 아래로 내려온다 */}
          <div className="mx-auto mt-12 grid max-w-[72rem] grid-cols-2 items-end gap-6 sm:gap-10 lg:grid-cols-[1fr_minmax(0,22rem)_1fr] lg:gap-8">
            {CLINIC.doctors.map((d, i) => (
              <figure
                key={d.key}
                className={
                  "flex flex-col items-center " + (i === 0 ? "lg:order-1" : "lg:order-3")
                }
              >
                {/* 사진은 사람에 딱 맞춰 잘라 두었다. 틀이 사진을 감싸기만 하면
                    둘 사이에 빈 곳이 생기지 않는다.
                    키를 맞추고 폭은 사진이 정하게 둬야 두 사람이 같은 크기로 선다.
                    배경이 흰색이라 회색 판 위에 곱하기로 겹친다 */}
                <Rise>
                  <div className="overflow-hidden rounded-[1.5rem] bg-surface-2">
                    <Image
                      src={d.photo.src}
                      alt={`${CLINIC.name} ${d.name} ${d.role}`}
                      width={d.photo.w}
                      height={d.photo.h}
                      sizes="(min-width: 1024px) 18rem, 42vw"
                      className="block h-[clamp(13rem,32vh,22rem)] w-auto mix-blend-multiply"
                    />
                  </div>
                </Rise>
                <figcaption className="mt-4 text-center">
                  <RiseLine className="font-mono text-[12px] uppercase tracking-[0.15em] text-herb">
                    {d.role}
                  </RiseLine>
                  <RiseLine className="kr mt-1.5 text-xl font-bold">{d.name}</RiseLine>
                </figcaption>
              </figure>
            ))}

            <div className="col-span-2 text-center lg:order-2 lg:col-span-1 lg:pb-10">
              <p className="kr text-[17px] leading-8 text-muted xl:text-[18px] xl:leading-9">
                <Lines>
                  {[
                    "두 원장이 차트를 함께 보며 진료합니다.",
                    "편한 쪽을 고르실 수 있고,",
                    "어려운 판단은 상의한 뒤 말씀드립니다.",
                  ]}
                </Lines>
              </p>
              <Rise className="mt-7">
                <Link
                  href="/doctors"
                  className="press inline-flex items-center gap-2 rounded-full bg-surface px-7 py-3.5 font-medium ring-1 ring-line"
                >
                  의료진 소개 보기
                  <Arrow className="arw" />
                </Link>
              </Rise>
            </div>
          </div>
        </section>

        {/* 소개 비율 — 광고가 아니라 다녀간 사람이 데려온다는 이야기 */}
        <section className="screen">
          <H2
            accent="알고 오시나요?"
            note={[
              "처음 오시는 분께 어떻게 알고 오셨는지 여쭤봅니다.",
              "절반 이상이 아는 분 소개라고 답하십니다.",
            ]}
          >
            어떻게
          </H2>
          <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
            <ReferralRing />
            <div className="mx-auto max-w-[34ch] text-center md:mx-0 md:text-left">
              <p className="kr text-[18px] leading-8 text-muted">
                <RiseLine>
                  {CLINIC.whyHero.stat.label}입니다. 다녀가신 분이 가족이나
                  이웃을 데려오시는 경우가 많습니다.
                </RiseLine>
              </p>
              <p className="kr mt-5 text-[16px] leading-7 text-muted">
                <RiseLine>
                  치료가 끝나면 끝났다고 말씀드립니다. 그래서 다시 아플 때, 또
                  주변에 아픈 분이 생겼을 때 저희를 떠올리십니다.
                </RiseLine>
              </p>
              <p className="kr mt-6 text-sm text-faint">
                <RiseLine>※ {CLINIC.whyHero.stat.basis}</RiseLine>
              </p>
            </div>
          </div>
        </section>

        {/* 진료과목 — 같은 크기 격자 */}
        <section className="band screen">
          <H2
            accent="필요하신가요?"
            note={[
              "과목마다 치료 방법과 예상 기간이 다릅니다.",
              "해당하는 곳을 눌러 확인해 보세요.",
            ]}
          >
            어떤 치료가
          </H2>
          {/* 칸을 모두 같은 크기로 세운다. 첫 칸만 색으로 눌러 무게를 준다 */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SYMPTOMS.map((s, i) => (
              <Rise key={s.slug} fill>
                <Link
                  href={`/care/${s.slug}`}
                  className={
                    "tile flex h-full min-h-[15rem] flex-col justify-between p-8 " +
                    (i === 0 ? "tile-dark bg-herb text-paper" : "bg-surface")
                  }
                >
                <div>
                  {(() => {
                    const Icon = SYMPTOM_ICONS[s.slug];
                    return Icon ? (
                      <Icon
                        className={
                          i === 0
                            ? "h-8 w-8 text-paper/70"
                            : "h-8 w-8 text-herb"
                        }
                      />
                    ) : null;
                  })()}
                  <h3 className="kr mt-4 text-xl font-bold leading-snug">
                    {s.name}
                  </h3>
                  <p
                    className={
                      "mt-1 font-display text-sm " +
                      (i === 0 ? "text-paper/60" : "text-faint")
                    }
                  >
                    {s.clinicalName}
                  </p>
                </div>
                <div className="mt-6">
                  {s.highlight && (
                    <span
                      className={
                        "mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold " +
                        (i === 0
                          ? "bg-paper/15 text-paper"
                          : "bg-ochre-soft text-ochre")
                      }
                    >
                      {s.highlight.label}
                    </span>
                  )}
                  <p
                    className={
                      "kr text-[15px] leading-7 " +
                      (i === 0 ? "text-paper/80" : "text-muted")
                    }
                  >
                    {s.summary}
                  </p>
                  <span
                    className={
                      "tile-arrow mt-4 inline-flex items-center gap-1.5 text-sm font-medium " +
                      (i === 0 ? "text-paper" : "text-herb")
                    }
                  >
                    자세히 보기
                    <Arrow />
                  </span>
                </div>
                </Link>
              </Rise>
            ))}

            {/* 진료과목이 5개라 3열 격자에 한 칸이 빈다. 없는 과목을 지어내는 대신
                이미 있는 부위별 페이지로 채운다 */}
            <Rise fill>
              <Link
                href="/part"
                className="tile flex h-full min-h-[15rem] flex-col justify-between bg-surface p-8"
              >
              <div>
                <MapPinIcon className="h-8 w-8 text-herb" />
                <h3 className="kr mt-4 text-xl font-bold leading-snug">
                  부위별로 찾기
                </h3>
                <p className="mt-1 font-display text-sm text-faint">
                  {PARTS.map((p) => p.name).join(" · ")}
                </p>
              </div>
              <div className="mt-6">
                <p className="kr text-[15px] leading-7 text-muted">
                  아픈 곳이 어디인지로 찾으시면 해당 부위의 흔한 원인부터
                  보여드립니다.
                </p>
                <span className="tile-arrow mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-herb">
                  자세히 보기
                  <Arrow />
                </span>
              </div>
              </Link>
            </Rise>
          </div>
        </section>

        {/* Q&A — 진료실에서 실제로 받는 질문과, 어디로 가야 할지 헷갈리는 질문을
            한 자리에 모은다. 물어보는 사람 입장에서는 둘이 같은 종류다 */}
        <section className="screen">
          <H2 accent="자주 묻는 질문" note="진료실에서 실제로 받는 질문들입니다.">
            Q&amp;A
          </H2>
          {/* 삽화가 위, 질문이 아래. 그림이 먼저 눈에 들어와야 여섯 장이
              글자 덩어리로 뭉치지 않는다 */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {QA.map((q) => (
              <Rise key={q.href} fill>
                <Link
                  href={q.href}
                  className="tile flex h-full flex-col overflow-hidden bg-surface"
                >
                  {q.image && (
                    <Image
                      src={q.image.src}
                      alt={q.image.alt}
                      width={q.image.w}
                      height={q.image.h}
                      className="block aspect-[8/5] w-full object-cover"
                    />
                  )}
                  <div className="flex grow flex-col p-6">
                    <span className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="font-display text-lg font-bold leading-none text-herb"
                      >
                        Q
                      </span>
                      <span className="kr font-semibold leading-snug">{q.question}</span>
                    </span>
                    <span className="kr mt-2.5 block grow pl-7 text-[15px] leading-7 text-muted">
                      {q.summary}
                    </span>
                    <span className="mt-5 flex items-center justify-between pl-7">
                      <time dateTime={q.date} className="font-mono text-[12px] text-faint">
                        {dotted(q.date)}
                      </time>
                      <span className="tile-arrow inline-flex items-center gap-1.5 text-sm font-medium text-herb">
                        읽어보기
                        <Arrow />
                      </span>
                    </span>
                  </div>
                </Link>
              </Rise>
            ))}
          </div>
          <Rise className="mt-6 text-center">
            <Link href="/column" className="text-[15px] font-medium text-herb hover:underline">
              칼럼 전체 보기
            </Link>
          </Rise>
        </section>

        {/* 리뷰 — 페이지에 심지 않고 외부로 내보낸다 (의료법 56조②) */}
        <section className="screen">
          <div className="rounded-[2rem] bg-surface p-8 text-center ring-1 ring-line md:p-12">
          <H2 accent="직접 확인해 보세요">리뷰를</H2>
          <p className="kr mx-auto mt-4 max-w-[46ch] leading-8 text-muted">
            <Lines>
              {[
                "의료법에 따라 환자분들의 후기를 저희 홈페이지에 직접 싣지 않습니다.",
                "네이버와 구글에서 있는 그대로 확인하실 수 있습니다.",
              ]}
            </Lines>
          </p>
          <Rise className="mt-8">
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`https://map.naver.com/p/search/${encodeURIComponent(CLINIC.name)}`}
              target="_blank"
              rel="noopener"
              className="press rounded-full bg-[#03C75A] px-7 py-3.5 font-semibold text-white"
            >
              네이버 지도에서 보기
            </a>
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(CLINIC.name)}`}
              target="_blank"
              rel="noopener"
              className="press rounded-full bg-surface px-7 py-3.5 ring-1 ring-line"
            >
              구글 지도에서 보기
            </a>
          </div>
          </Rise>
          </div>
        </section>

        {/* 공간 — 처음 오는 사람은 문 열기 전이 가장 망설여진다 */}
        <section className="screen">
          <H2
            accent="미리 만나보세요"
            note={[
              "접수 데스크와 대기 공간입니다.",
              "물리치료실은 안쪽에 따로 있습니다.",
            ]}
          >
            오시기 전에
          </H2>
          <Rise className="mt-10">
          <figure className="overflow-hidden rounded-[2rem] ring-1 ring-line">
            <Image
              src="/clinic-interior.jpg"
              alt="김포한강한의원 접수 데스크와 대기 공간"
              width={2000}
              height={1333}
              sizes="(min-width: 1440px) 1344px, 100vw"
              className="h-auto w-full"
              priority={false}
            />
          </figure>
          </Rise>
          <Rise className="mt-8 text-center">
            <Link
              href="/directions"
              className="press inline-flex items-center gap-2 rounded-full bg-surface px-7 py-3.5 font-medium ring-1 ring-line"
            >
              오시는 길 보기
              <Arrow className="arw" />
            </Link>
          </Rise>
        </section>
      </div>
    </>
  );
}
