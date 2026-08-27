import Link from "next/link";
import Image from "next/image";
import { CLINIC } from "@/content/clinic";
import { SYMPTOMS, getSymptom } from "@/content/symptoms";
import { COMPARES } from "@/content/compare";
import { columnsByDate } from "@/content/column";
import { PARTS } from "@/content/part";
import { JsonLd, Arrow } from "@/components/site";
import { Reveal } from "@/components/reveal";
import { SYMPTOM_ICONS, MapPinIcon } from "@/components/icons";

const pain = getSymptom("pain")!;

/** 문장마다 줄을 바꾼다. 가운데 정렬한 글은 문장이 뭉치면 눈이 줄을 놓친다 */
function Lines({ children }: { children: string[] }) {
  return (
    <>
      {children.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </>
  );
}

/** 메인의 섹션 제목은 모두 같은 크기·같은 정렬로 선다. 여기서만 정한다.
 *  accent는 제목의 뒷부분으로, 히어로와 같은 금빛 그라데이션이 걸린다 */
function H2({
  children,
  accent,
  note,
  small = false,
}: {
  children: React.ReactNode;
  accent?: string;
  /** 배열로 주면 한 줄씩 끊어 세운다. 두 문장이 한 줄에 뭉치면 읽기 힘들다 */
  note?: string | string[];
  /** 상위 섹션에 딸린 이야기는 한 단계 작게 세워 위계를 만든다 */
  small?: boolean;
}) {
  return (
    <div className="text-center">
      <h2
        className={
          "display kr " +
          (small
            ? "text-2xl sm:text-3xl xl:text-[2.1rem]"
            : "text-3xl sm:text-4xl xl:text-[2.75rem]")
        }
      >
        {children}
        {accent && (
          <>
            {" "}
            <span className="grad">{accent}</span>
          </>
        )}
      </h2>
      {note && (
        <p className="kr mx-auto mt-4 max-w-[52ch] text-[17px] leading-8 text-muted xl:text-[18px] xl:leading-9">
          {(Array.isArray(note) ? note : [note]).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

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
    <div className="relative mx-auto aspect-square w-[17rem] sm:w-[20rem]">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
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
 * 비교 페이지와 칼럼은 만든 사람에게나 다른 것이지, 묻는 사람에게는 둘 다 질문이다.
 * 그래서 한 줄로 세운다. 갈 곳이 어디든 물음표로 시작하는 것만 모은다.
 */
const QA = [
  ...COMPARES.map((c) => ({
    question: c.question,
    summary: c.lede,
    href: `/compare/${c.slug}`,
  })),
  // 칼럼의 question 은 검색어라 물음표가 없다. Q 뒤에는 제목이 붙어야 질문으로 읽힌다
  ...columnsByDate()
    .slice(0, 4)
    .map((c) => ({
      question: c.title.endsWith("?") ? c.title : `${c.title}?`,
      summary: c.summary,
      href: `/column/${c.slug}`,
    })),
];

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

      {/* 히어로 — 환자가 속으로 던지는 세 가지 질문을 그대로 세운다 */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-22rem] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(30,91,69,.09) 0%, rgba(30,91,69,0) 68%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[80rem] px-[clamp(1.5rem,6vw,7rem)] pb-14 pt-12 text-center sm:pt-16 xl:pb-20 xl:pt-24">
          <Enter d={0}>
            <span className="inline-block rounded-full bg-tint px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-herb">
              {CLINIC.tagline}
            </span>
          </Enter>

          <h1 className="display display-black kr mt-7 text-[2rem] leading-[1.28] sm:text-[2.9rem] lg:text-[3.4rem] xl:text-[4rem] 2xl:text-[4.6rem]">
            <span
              className="enter block"
              style={{ "--d": "110ms" } as React.CSSProperties}
            >
              내 증상, 이해해줄까?
            </span>
            <span
              className="enter block"
              style={{ "--d": "250ms" } as React.CSSProperties}
            >
              편하게 물어봐도 될까?
            </span>
            <span
              className="grad enter block"
              style={{ "--d": "390ms" } as React.CSSProperties}
            >
              믿고 맡겨도 될까?
            </span>
          </h1>

          <Enter d={520}>
            <p className="kr mx-auto mt-7 max-w-[56ch] text-[18px] leading-8 text-muted xl:mt-9 xl:text-[20px] xl:leading-9">
              <Lines>
                {[
                  "세 가지 다 물어보셔도 됩니다.",
                  "그리고 안 될 것 같으면 안 된다고 먼저 말씀드립니다.",
                  "그 말을 할 수 있어야 맡기실 수 있다고 생각합니다.",
                ]}
              </Lines>
            </p>
          </Enter>

        </div>

      </section>

      <div className="mx-auto w-full max-w-[90rem] px-[clamp(1.5rem,6vw,7rem)] py-16 xl:py-24">

        {/* 우리 기준 — 주장을 크게 세우고 오른쪽에서 풀고 아래에서 쪼갠다 */}
        <Reveal>
          <section className="screen">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-tint px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-herb">
                {CLINIC.whyHero.eyebrow}
              </span>
              <h2 className="display kr mt-6 text-3xl text-balance sm:text-[2.75rem]">
                {CLINIC.whyHero.headline[0]}
                <br />
                <span className="grad">{CLINIC.whyHero.headline[1]}</span>
              </h2>
              <p className="kr mt-5 text-[18px] leading-8 text-muted">
                {CLINIC.whyHero.sub}
              </p>
            </div>

            <div className="relative mt-10 overflow-hidden rounded-[2rem] bg-ink p-8 text-paper md:p-12 xl:p-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(132,194,167,.16) 0%, rgba(132,194,167,0) 70%)",
                }}
              />

              <div className="relative grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
                <div>
                  <p className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
                    <span
                      aria-hidden="true"
                      className="h-px w-10 bg-paper/30"
                    />
                    {CLINIC.standards.eyebrow}
                  </p>
                  {/* 두 줄로 선다. 넓은 화면에서는 줄이 꺾이지 않게 붙잡아 둔다 */}
                  <h3 className="kr mt-6 text-[1.7rem] font-bold leading-[1.35] tracking-[-0.03em] sm:text-[2.05rem] lg:whitespace-nowrap lg:text-[1.85rem] xl:text-[2.15rem] 2xl:text-[2.5rem]">
                    {CLINIC.standards.headline[0]}
                    <span className="text-herb-light">
                      {CLINIC.standards.headline[1]}
                    </span>
                    <br />
                    {CLINIC.standards.headline[2]}
                  </h3>
                </div>

                <div className="space-y-6">
                  {CLINIC.standards.body.map((t) => (
                    <p
                      key={t}
                      className="kr text-[15px] leading-8 text-paper/70 xl:text-base"
                    >
                      {t}
                    </p>
                  ))}
                </div>
              </div>

              <ul className="relative mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {CLINIC.standards.values.map((v) => (
                  <li
                    key={v.no}
                    className="rounded-[1.25rem] border border-paper/12 bg-paper/[0.04] p-7"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] tracking-[0.1em] text-herb-light">
                        {v.no}
                      </span>
                      <span className="kr rounded-full bg-paper/10 px-3 py-1 text-[11px] font-medium text-paper/70">
                        핵심가치 · {v.tag}
                      </span>
                    </div>
                    <h3 className="kr mt-5 text-lg font-bold leading-snug">
                      {v.title}
                    </h3>
                    <p className="kr mt-3 text-[14px] leading-7 text-paper/60">
                      {v.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* 의료진 — 두 사람을 양쪽에 세우고 하는 말은 가운데에 하나로 둔다.
            소개를 둘로 쪼개면 누가 더 나은가를 고르는 화면이 된다 */}
        <Reveal>
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
                  {/* 사진의 배경이 흰색이라 종이 위에 떠 보인다.
                      회색 판을 깔아 사람이 그 안에 서 있게 만든다 */}
                  <div className="w-full max-w-[20rem] overflow-hidden rounded-[1.5rem] bg-surface-2">
                    <Image
                      src={d.photo}
                      alt={`${CLINIC.name} ${d.name} ${d.role}`}
                      width={900}
                      height={1098}
                      sizes="(min-width: 1024px) 20rem, 45vw"
                      className="h-auto w-full mix-blend-multiply"
                    />
                  </div>
                  <figcaption className="mt-4 text-center">
                    <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-herb">
                      {d.role}
                    </span>
                    <span className="kr mt-1.5 block text-xl font-bold">{d.name}</span>
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
                <Link
                  href="/doctors"
                  className="press mt-7 inline-flex items-center gap-2 rounded-full bg-surface px-7 py-3.5 font-medium ring-1 ring-line"
                >
                  의료진 소개 보기
                  <Arrow className="arw" />
                </Link>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 소개 비율 — 광고가 아니라 다녀간 사람이 데려온다는 이야기 */}
        <Reveal>
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
                  {CLINIC.whyHero.stat.label}입니다. 다녀가신 분이 가족이나
                  이웃을 데려오시는 경우가 많습니다.
                </p>
                <p className="kr mt-5 text-[16px] leading-7 text-muted">
                  치료가 끝나면 끝났다고 말씀드립니다. 그래서 다시 아플 때, 또
                  주변에 아픈 분이 생겼을 때 저희를 떠올리십니다.
                </p>
                <p className="kr mt-6 text-sm text-faint">
                  ※ {CLINIC.whyHero.stat.basis}
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 진료과목 — 같은 크기 격자 */}
        <Reveal>
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
                <Link
                  key={s.slug}
                  href={`/care/${s.slug}`}
                  className={
                    "tile flex min-h-[15rem] flex-col justify-between p-8 " +
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
              ))}

              {/* 진료과목이 5개라 3열 격자에 한 칸이 빈다. 없는 과목을 지어내는 대신
                  이미 있는 부위별 페이지로 채운다 */}
              <Link
                href="/part"
                className="tile flex min-h-[15rem] flex-col justify-between bg-surface p-8"
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
            </div>
          </section>
        </Reveal>

        {/* Q&A — 진료실에서 실제로 받는 질문과, 어디로 가야 할지 헷갈리는 질문을
            한 자리에 모은다. 물어보는 사람 입장에서는 둘이 같은 종류다 */}
        <Reveal>
          <section className="screen">
            <H2 accent="자주 묻는 질문" note="진료실에서 실제로 받는 질문들입니다.">
              Q&amp;A
            </H2>
            <div className="mt-10 grid gap-2 md:grid-cols-2">
              {QA.map((q) => (
                <Link key={q.href} href={q.href} className="tile block bg-surface px-6 py-5">
                  <span className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="font-display text-lg font-bold leading-none text-herb"
                    >
                      Q
                    </span>
                    <span className="kr font-semibold leading-snug">{q.question}</span>
                  </span>
                  <span className="kr mt-2 block pl-7 text-[15px] leading-7 text-muted">
                    {q.summary}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/column" className="text-[15px] font-medium text-herb hover:underline">
                칼럼 전체 보기
              </Link>
            </div>
          </section>
        </Reveal>

        {/* 리뷰 — 페이지에 심지 않고 외부로 내보낸다 (의료법 56조②) */}
        <Reveal>
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
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
            </div>
          </section>
        </Reveal>

        {/* 공간 — 처음 오는 사람은 문 열기 전이 가장 망설여진다 */}
        <Reveal>
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
            <figure className="mt-10 overflow-hidden rounded-[2rem] ring-1 ring-line">
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
            <div className="mt-8 text-center">
              <Link
                href="/directions"
                className="press inline-flex items-center gap-2 rounded-full bg-surface px-7 py-3.5 font-medium ring-1 ring-line"
              >
                오시는 길 보기
                <Arrow className="arw" />
              </Link>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
