import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SYMPTOMS, getSymptom } from "@/content/symptoms";
import { columnsFor } from "@/content/column";
import { getPart } from "@/content/part";
import { CLINIC, SITE_URL, sentences } from "@/content/clinic";
import { PageHead, Cta, JsonLd, Arrow } from "@/components/site";
import { breadcrumb, faqPage } from "@/content/schema";
import { SYMPTOM_ICONS, TREATMENT_ICONS } from "@/components/icons";
import { PhoneLink } from "@/components/phone-link";

/**
 * 차례로 솟아오르는 한 줄.
 *
 * 바깥이 가리개, 안쪽이 움직인다. 차례는 화면에서 정하고 관찰자는 건드리지 않는다.
 * 스크롤 위치가 아니라 시간으로 세워야 「이런 경우 → 이렇게 됩니다」 순서로 읽힌다.
 */
function Seq({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span
      className={`seq ${className}`}
      style={delay ? ({ "--d": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      <span className="seq-in">{children}</span>
    </span>
  );
}

/**
 * 진료과목 페이지의 절 틀.
 *
 * 큰 화면에서는 왼쪽 칸에 절 제목과 설명, 오른쪽에 내용을 둔다. 진료 기록지처럼
 * 「무엇에 대한 내용인지」 가 늘 왼쪽에 서 있어, 긴 페이지를 내려도 지금 어디를
 * 읽는지 놓치지 않는다. 절과 절 사이는 가는 선 하나로만 끊는다.
 */
function Rail({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rail mt-16 grid gap-x-14 gap-y-7 border-t border-line pt-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <span aria-hidden="true" className="block h-[3px] w-8 rounded-full bg-gradient-to-r from-herb to-grad-b" />
        <h2 className="display kr mt-4 text-[1.55rem] leading-snug text-balance">{title}</h2>
        {note && <p className="kr mt-3 text-[15px] leading-7 text-muted">{note}</p>}
      </div>
      <div className="rise">
        <div className="rise-in">{children}</div>
      </div>
    </section>
  );
}

export const generateStaticParams = () => SYMPTOMS.map((s) => ({ symptom: s.slug }));

export async function generateMetadata({ params }: PageProps<"/care/[symptom]">): Promise<Metadata> {
  const s = getSymptom((await params).symptom);
  if (!s) return {};
  return {
    // 「소화불량 한방치료」로 검색하는 사람은 없다. 「김포 소화불량 한의원」이다
    title: `김포 ${s.name} 한의원 — ${s.clinicalName}`,
    description: sentences(s.care.lede),
    alternates: { canonical: `/care/${s.slug}` },
  };
}

export default async function CarePage({ params }: PageProps<"/care/[symptom]">) {
  const s = getSymptom((await params).symptom);
  if (!s) notFound();
  const { care } = s;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "@id": `${SITE_URL}/care/${s.slug}#webpage`,
          url: `${SITE_URL}/care/${s.slug}`,
          name: care.title,
          inLanguage: "ko",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          breadcrumb: { "@id": `${SITE_URL}/care/${s.slug}#breadcrumb` },
          provider: { "@id": `${SITE_URL}/#clinic` },
          about: { "@type": "MedicalCondition", name: s.clinicalName },
        }}
      />
      <JsonLd data={breadcrumb([{ name: s.name, path: `/care/${s.slug}` }])} />
      {/* 화면에는 문답을 보여 주면서 스키마로는 알리지 않고 있었다. 부위 페이지에는
          들어가 있는데 이쪽만 빠져 있었다. 화면에 있는 문답만 넣는 원칙은 그대로다 */}
      {s.faq.length > 0 && <JsonLd data={faqPage(s.faq, `/care/${s.slug}`)} />}

      {/* 사진이 있는 과목은 첫 화면을 배경으로 채운다. 없으면 아래 머리글로 선다 */}
      {s.heroImage && (
        <section className="relative isolate overflow-hidden bg-ink">
          <Image
            src={s.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* 글자가 놓이는 왼쪽을 더 어둡게 덮어 대비를 만든다 */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/35"
          />
          <div className="relative mx-auto w-full max-w-[90rem] px-[clamp(1.5rem,6vw,7rem)] py-20 text-paper xl:py-28">
            <p className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
              <span aria-hidden="true" className="h-px w-10 bg-paper/30" />
              {CLINIC.locality} · {s.clinicalName}
            </p>
            <h1 className="display display-black kr mt-6 max-w-[20ch] text-[2rem] leading-[1.28] sm:text-[2.6rem] xl:text-[3.2rem]">
              {care.title}
            </h1>
            <p className="kr mt-6 max-w-[46ch] text-[16px] leading-8 text-paper/75 xl:text-[17px]">
              {care.lede}
            </p>
            <div className="mt-9 flex flex-wrap gap-2">
              <Link
                href="/reservation"
                className="press inline-flex items-center gap-2 rounded-full bg-herb px-7 py-3.5 font-semibold text-paper"
              >
                상담 예약하기
                <Arrow className="arw" />
              </Link>
              <PhoneLink className="press inline-flex items-center rounded-full px-7 py-3.5 font-semibold ring-1 ring-paper/30">
                {CLINIC.phone}
              </PhoneLink>
            </div>
          </div>
        </section>
      )}

      <article className="mx-auto w-full max-w-[80rem] px-[clamp(1.25rem,3vw,2.5rem)] py-12">
        {!s.heroImage && (
          <>
            {(() => {
              const Icon = SYMPTOM_ICONS[s.slug];
              return Icon ? <Icon className="mb-5 h-10 w-10 text-herb" /> : null;
            })()}
            {/* 제목 밑에 한 문단. 지금까지 이 자리가 비어 있어서, 화면에 들어온 사람이
                제목 다음에 바로 증상 목록을 만났다. 물어보러 온 질문에 답하지 않고
                항목부터 세우는 꼴이다.

                아래 highlight 가 있는 과목은 그쪽이 이미 답이므로 겹쳐 놓지 않는다.
                답이 둘이면 어느 쪽이 답인지 흐려진다 */}
            <PageHead
              eyebrow={s.clinicalName}
              title={care.title}
              lede={s.highlight ? undefined : (care.leadLine ?? care.lede)}
            />
          </>
        )}

        {/* 이 과목에서 가장 먼저 알려야 할 사실. 없으면 렌더링하지 않는다 */}
        {s.highlight && (
          <aside className="mt-8 rounded-[2rem] bg-herb p-7 text-paper md:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-paper/60">
              {s.highlight.label}
            </p>
            <p className="kr mt-3 max-w-[52ch] text-lg font-semibold leading-8">
              {s.highlight.text}
            </p>
          </aside>
        )}

        {/* 갈림길 — 온 사람이 자기가 어느 쪽인지부터 가리게 한다.
            좌우로 두면 둘 중 하나를 고르는 화면이 되는데, 이건 고르는 게 아니라
            자기 경우를 찾는 것이다. 그래서 위아래로 세운다.

            두 칸 모두 짙은 바탕으로 세운다. 하나만 색을 넣으면 나머지는
            곁다리로 읽혀, 아래 칸에 온 사람은 자기 이야기를 못 찾는다.
            위는 녹색, 아래는 먹색. 안을 들여다보는 쪽이라 화면에 가깝게 둔다.

            사례가 먼저 하나씩 놓이고 그 뒤에 답이 뒤따른다. 순서가 곧 문장이다 */}
        {care.tracks && (
          <div className="mt-9 grid gap-4">
            {care.tracks.map((tr) => {
              const row = tr.caseLayout === "row";
              const dark = tr.tone === "herb" || tr.tone === "ink";
              const ink = tr.tone === "ink";
              // 사례가 다 놓인 뒤에 답이 온다. 사이를 한 박자 벌린다
              const after = tr.cases.length * 130 + 260;
              return (
                <section
                  key={tr.headline}
                  className={
                    "relative isolate overflow-hidden rounded-[1.75rem] px-8 py-10 md:px-12 md:py-14 " +
                    (ink
                      ? "bg-ink text-paper"
                      : tr.tone === "herb"
                        ? "bg-herb text-paper"
                        : "border border-line bg-surface")
                  }
                >
                  {/* 먹색 판은 그대로 두면 구멍처럼 보인다. 옅은 빛을 한 겹 깔아 둔다 */}
                  {ink && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(132,194,167,.18) 0%, rgba(132,194,167,0) 70%)",
                      }}
                    />
                  )}

                  <Seq
                    className={
                      "kr text-[15px] font-medium " +
                      (ink ? "text-herb-light" : dark ? "text-paper/70" : "text-herb")
                    }
                  >
                    {tr.kicker}
                  </Seq>

                  {/* 사례 — 하나씩 차례로 놓인다 */}
                  <ul
                    className={
                      row
                        ? "mt-7 flex flex-wrap items-baseline gap-x-[clamp(1.25rem,3.5vw,3rem)] gap-y-3"
                        : "mt-7 grid gap-2.5"
                    }
                  >
                    {tr.cases.map((c, i) => (
                      <li key={c}>
                        <Seq
                          delay={i * 130}
                          className={
                            row
                              ? "display kr text-[clamp(1.65rem,5.4vw,2.7rem)] leading-[1.3] tracking-[-0.02em]"
                              : "kr text-[clamp(1.05rem,3.6vw,1.4rem)] leading-[1.6] " +
                                (dark ? "text-paper/85" : "text-muted")
                          }
                        >
                          {/* 짧은 말은 형광펜으로 눌러 준다. 문장에 치면 줄이 어지럽다 */}
                          {row ? <span className="mark-hl">{c}</span> : c}
                        </Seq>
                      </li>
                    ))}
                  </ul>

                  {/* 답 — 사례가 다 놓인 뒤에 올라온다 */}
                  <Seq
                    delay={after}
                    className={
                      "display kr mt-11 text-[clamp(1.5rem,4.6vw,2.3rem)] leading-[1.3] tracking-[-0.02em] " +
                      (ink ? "text-herb-light" : dark ? "" : "text-herb")
                    }
                  >
                    {tr.headline}
                  </Seq>

                  <Seq
                    delay={after + 160}
                    className={
                      "kr mt-5 max-w-[62ch] text-[16.5px] leading-8 " +
                      (dark ? "text-paper/75" : "text-muted")
                    }
                  >
                    {tr.body}
                  </Seq>

                  <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                    {tr.tag && (
                      <span
                        className={
                          "kr rounded-full px-4 py-2 text-[13.5px] font-medium " +
                          (dark
                            ? "bg-paper/12 text-paper"
                            : "border border-herb-line bg-tint text-herb")
                        }
                      >
                        {tr.tag}
                      </span>
                    )}
                    {/* 수치를 적었으면 근거도 같이 적는다 (의료법 제56조 ②항) */}
                    {tr.basis && (
                      <p
                        className={
                          "kr text-[13.5px] leading-6 " +
                          (dark ? "text-paper/55" : "text-faint")
                        }
                      >
                        ※ {tr.basis}
                      </p>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* ── 아래 절들은 모두 같은 틀(Rail)로 선다.
            왼쪽에 절 제목, 오른쪽에 내용. 내용은 상자 대신 가는 선으로 나눈다.
            상자는 누를 수 있는 것에만 쓴다 — 그래야 누를 곳이 눈에 띈다. */}

        {/* 종목별 손상 — 「어떤 운동을 하다가」 로 찾아온 사람이 자기 종목부터 찾게 한다.
            종목마다 질환을 나눠 두어 그 운동의 손상을 많이 본다는 것이 드러나게 한다 */}
        {care.bySport && (
          <Rail
            title="종목별로 자주 보는 손상"
            note="운동마다 다치는 자리가 다릅니다. 하시는 운동을 찾아 비슷한 증상이 있는지 확인해 보세요."
          >
            <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
              {care.bySport.map((g) => (
                <section key={g.sport}>
                  <h3 className="kr border-b-2 border-herb pb-3 text-[21px] font-bold leading-snug">
                    {g.sport}
                  </h3>
                  <p className="kr mt-3 text-[15px] leading-7 text-muted">{g.lede}</p>
                  <ul className="mt-3">
                    {g.conditions.map((c) => {
                      const body = (
                        <>
                          <span className="kr flex items-center gap-1.5 text-[16px] font-semibold text-ink">
                            {c.name}
                            {c.glossarySlug && (
                              <Arrow className="arw h-3.5 w-3.5 text-herb opacity-60 group-hover:opacity-100" />
                            )}
                          </span>
                          <span className="kr mt-0.5 block text-[14.5px] leading-6 text-muted">{c.note}</span>
                        </>
                      );
                      return (
                        <li key={c.name} className="border-t border-line first:border-t-0">
                          {c.glossarySlug ? (
                            <Link href={`/glossary/${c.glossarySlug}`} className="group block py-3 hover:[&_span:first-child]:text-herb">
                              {body}
                            </Link>
                          ) : (
                            <div className="py-3">{body}</div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </Rail>
        )}

        {/* 진료 흐름 — 순서가 곧 내용이라 번호를 붙인다 */}
        {care.flow && (
          <Rail
            title="저희는 이렇게 봅니다"
            note="같은 통증이라도 원인이 다르면 치료가 달라집니다. 그 갈림길을 짐작이 아니라 화면으로 가릅니다."
          >
            <ol className="grid gap-x-10 sm:grid-cols-2">
              {care.flow.map((f, i) => (
                <li key={f.title} className="border-t border-line py-6">
                  <span className="font-display text-[15px] font-semibold tabular-nums text-ochre">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="kr mt-2 text-[19px] font-bold leading-snug">{f.title}</h3>
                  <p className="kr mt-2 text-[16px] leading-7 text-muted">{f.text}</p>
                  {f.tag && <p className="kr mt-3 text-[13.5px] font-medium text-herb">{f.tag}</p>}
                </li>
              ))}
            </ol>
          </Rail>
        )}

        <Rail title="이런 증상이 있다면" note="여러 개에 해당한다면 진찰을 권합니다.">
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {care.signs.map((sign) => (
              <li
                key={sign}
                className="kr flex items-start gap-3.5 border-t border-line py-4 text-[17px] leading-7"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-herb">
                  <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {sign}
              </li>
            ))}
          </ul>
        </Rail>

        <Rail title="어떻게 치료하나요?">
          <ul>
            {care.treatments.map((t) => {
              const Icon = t.icon ? TREATMENT_ICONS[t.icon] : undefined;
              return (
                <li
                  key={t.name}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 border-t border-line py-6 first:border-t-0 first:pt-0 sm:grid-cols-[2.5rem_14rem_minmax(0,1fr)] sm:gap-x-8"
                >
                  <span className="text-herb">{Icon && <Icon className="h-7 w-7" />}</span>
                  <h3 className="kr text-[19px] font-bold leading-snug">
                    {t.name}
                    {t.covered && (
                      <span className="kr mt-1.5 block text-[13px] font-medium text-herb">건강보험 적용</span>
                    )}
                  </h3>
                  <p className="kr col-start-2 mt-2 text-[16px] leading-7 text-muted sm:col-start-3 sm:mt-0">
                    {t.body}
                  </p>
                </li>
              );
            })}
          </ul>
          {care.treatmentsNote && (
            <p className="kr mt-6 border-l-2 border-ochre pl-5 text-[16px] leading-7 text-ink">
              {care.treatmentsNote}
            </p>
          )}
        </Rail>

        {/* 치료 비용 — 물어보기 전에 먼저 꺼낸다. 항목과 금액이 한 줄에 붙게 세운다 */}
        {s.cost.rows.length > 0 && (
          <Rail title="치료 비용" note={s.cost.lede}>
            <ul>
              {s.cost.rows.map((r) => (
                <li
                  key={r.item}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line py-5 first:border-t-0 first:pt-0"
                >
                  <span className="kr text-[17px] font-bold">{r.item}</span>
                  <span
                    className={
                      "kr text-[12.5px] font-semibold " +
                      (r.coverage === "급여" ? "text-herb" : "text-ochre")
                    }
                  >
                    {r.coverage}
                  </span>
                  <span aria-hidden="true" className="hidden flex-1 border-b border-dotted border-line sm:block" />
                  <span className="kr ml-auto text-[17px] font-bold tabular-nums sm:ml-0">{r.price}</span>
                  {r.note && <span className="kr basis-full text-[14.5px] leading-6 text-muted">{r.note}</span>}
                </li>
              ))}
            </ul>

            {/* 금액만 적어 두면 「이건 보험이 되나」 를 다시 물어야 한다 */}
            {s.cost.insurance.length > 0 && (
              <div className="mt-8 grid gap-x-10 gap-y-6 rounded-[1.25rem] bg-surface-2 p-6 sm:grid-cols-2 sm:p-7">
                {s.cost.insurance.map((ins) => (
                  <div key={ins.title}>
                    <h3 className="kr text-[16px] font-bold leading-snug">{ins.title}</h3>
                    <p className="kr mt-1.5 text-[15px] leading-7 text-muted">{ins.body}</p>
                  </div>
                ))}
              </div>
            )}
          </Rail>
        )}

        {/* 치료 과정 — 위에서 아래로 이어지는 한 줄기 */}
        <Rail title="치료 과정" note="첫 내원부터 마무리까지 어떤 순서로 진행되는지 미리 알려 드립니다.">
          <ol className="relative">
            {care.stages.map((st, i) => (
              <li key={st.label} className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-5 pb-8 last:pb-0">
                {i < care.stages.length - 1 && (
                  <span aria-hidden="true" className="absolute left-[1.1rem] top-9 bottom-1 w-px bg-herb-line" />
                )}
                <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-herb-line bg-paper font-display text-[14px] font-semibold tabular-nums text-herb">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="kr text-[18px] font-bold leading-snug">{st.label}</h3>
                  <p className="kr mt-1.5 text-[16px] leading-7 text-muted">{st.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Rail>

        {/* 되는 경우와 안 되는 경우.
            효과를 묻는 사람에게 「됩니다」 만 말하면 믿지 않는다.
            안 되는 경우를 같이 적어야 되는 경우도 믿긴다 */}
        {s.doubt && (
          <Rail title={s.doubt.question} note={s.doubt.lede}>
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
              <div>
                <h3 className="kr border-b-2 border-herb pb-3 text-[17px] font-bold text-herb">
                  이런 경우에 도움이 됩니다
                </h3>
                <ul>
                  {s.doubt.worksFor.map((w) => (
                    <li key={w} className="kr border-b border-line py-3.5 text-[16px] leading-7">
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              {/* 다른 과가 나은 경우를 숨기면, 그 사람은 여기서 시간을 버린다 */}
              <div>
                <h3 className="kr border-b-2 border-ochre pb-3 text-[17px] font-bold text-ochre">
                  이럴 때는 추가 검사가 필요할 수 있습니다
                </h3>
                <ul>
                  {s.doubt.limitsOf.map((l) => (
                    <li key={l} className="kr border-b border-line py-3.5 text-[16px] leading-7">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {s.doubt.grounds.length > 0 && (
              <div className="mt-10 grid gap-x-10 sm:grid-cols-2">
                {s.doubt.grounds.map((g) => (
                  <div key={g.title} className="border-t border-line py-5">
                    <h3 className="kr text-[17px] font-bold leading-snug">{g.title}</h3>
                    <p className="kr mt-1.5 text-[15.5px] leading-7 text-muted">{g.body}</p>
                  </div>
                ))}
              </div>
            )}
          </Rail>
        )}

        {care.extraSections?.map((sec) => (
          <Rail key={sec.title} title={sec.title} note={sec.note}>
            <div className="grid gap-x-10 sm:grid-cols-2">
              {sec.items.map((it) => (
                <div key={it.title} className="border-t border-line py-5">
                  <h3 className="kr text-[17px] font-bold leading-snug">{it.title}</h3>
                  <p className="kr mt-1.5 text-[16px] leading-7 text-muted">{it.body}</p>
                </div>
              ))}
            </div>
          </Rail>
        ))}

        {/* 부위로 갈라지는 자리.
            「어디가 아픈가」는 환자가 스스로 답할 수 있는 질문이라, 증상
            문장을 그대로 세우고 누르면 그 부위 안내로 보낸다. 문장은 부위
            자료의 signs 첫 줄을 쓴다 — 그 부위에서 가장 흔한 호소다 */}
        {care.partSlugs && care.partSlugs.length > 0 && (
          <Rail
            title="어디가 아프신가요"
            note="해당하는 곳을 누르시면 그 부위의 치료와 걸리는 기간을 볼 수 있습니다."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {care.partSlugs.map((slug) => {
                const part = getPart(slug);
                if (!part) return null;
                return (
                  <Link
                    key={slug}
                    href={`/part/${slug}`}
                    className="tile group flex items-center justify-between gap-4 bg-surface px-5 py-4"
                  >
                    <span className="min-w-0">
                      <span className="kr block text-[17px] font-bold group-hover:text-herb">{part.name}</span>
                      <span className="kr mt-0.5 block truncate text-[14.5px] text-muted">{part.signs[0]}</span>
                    </span>
                    <Arrow className="arw h-4 w-4 shrink-0 text-herb" />
                  </Link>
                );
              })}
            </div>
          </Rail>
        )}

        {s.faq.length > 0 && (
          <Rail title="자주 묻는 질문" note="진료실에서 실제로 많이 받는 질문입니다.">
            <div>
              {s.faq.map((f) => (
                <details key={f.q} className="group border-b border-line first:border-t">
                  <summary className="kr flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-[17.5px] font-bold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-[16px] text-muted transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="kr pb-6 text-[16px] leading-8 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </Rail>
        )}

        {/* 이어지는 글.
            칼럼 제목이 전부 질문 형태라 이 자리에 놓이면 「관련 글 목록」이 아니라
            문답의 연장으로 읽힌다 */}
        {columnsFor(s.slug).length > 0 && (
          <Rail
            title="이런 것도 궁금하실 겁니다"
            note="진료실에서 자주 나오는 질문을 원장이 글로 정리했습니다."
          >
            <div>
              {columnsFor(s.slug).map((c) => (
                <Link
                  key={c.slug}
                  href={`/column/${c.slug}`}
                  className="group flex items-start justify-between gap-5 border-b border-line py-5 first:border-t"
                >
                  <span className="min-w-0">
                    <span className="kr block text-[17.5px] font-bold leading-snug group-hover:text-herb">
                      {c.title}
                    </span>
                    <span className="kr mt-1 block text-[15.5px] leading-7 text-muted">{c.summary}</span>
                  </span>
                  <Arrow className="arw mt-1.5 h-4 w-4 shrink-0 text-herb" />
                </Link>
              ))}
            </div>
          </Rail>
        )}

        <Cta />
      </article>
    </>
  );
}
