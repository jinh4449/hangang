import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SYMPTOMS, getSymptom } from "@/content/symptoms";
import { CLINIC, SITE_URL } from "@/content/clinic";
import { PageHead, Section, Cta, JsonLd, Arrow } from "@/components/site";
import { breadcrumb } from "@/content/schema";
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

export const generateStaticParams = () => SYMPTOMS.map((s) => ({ symptom: s.slug }));

export async function generateMetadata({ params }: PageProps<"/care/[symptom]">): Promise<Metadata> {
  const s = getSymptom((await params).symptom);
  if (!s) return {};
  return {
    title: `${s.name} 한방치료 — ${s.clinicalName}`,
    description: s.care.lede.slice(0, 150),
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
            <PageHead eyebrow={s.clinicalName} title={care.title} />
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

        {/* 진료 흐름 — 순서가 곧 내용이라 번호를 붙여 칸으로 세운다 */}
        {care.flow && (
          <Section
            title="저희는 이렇게 봅니다"
            note="같은 통증이라도 원인이 다르면 치료가 달라집니다. 그 갈림길을 짐작이 아니라 화면으로 가릅니다."
          >
            <ol className="grid gap-3 sm:grid-cols-2">
              {care.flow.map((f, i) => (
                <li
                  key={f.title}
                  className="flex flex-col rounded-[1.25rem] border border-line bg-surface p-6"
                >
                  <span className="font-mono text-[11px] tracking-[0.1em] text-herb">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="kr mt-3 text-[18px] font-bold leading-snug">{f.title}</h3>
                  <p className="kr mt-2 text-[16.5px] leading-7 text-muted">{f.text}</p>
                  {f.tag && (
                    <span className="kr mt-4 self-start rounded-full bg-tint px-3 py-1 text-xs font-medium text-herb">
                      {f.tag}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Section>
        )}

        <Section title="이런 증상이 있다면" note="아래 항목 중 여러 개에 해당한다면 진찰을 권합니다.">
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {care.signs.map((sign) => (
              <li
                key={sign}
                className="kr flex items-start gap-3 rounded-[1rem] border border-line bg-surface px-5 py-4 text-[17px] leading-7"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-tint text-[13px] font-bold text-herb"
                >
                  ✓
                </span>
                {sign}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="어떻게 치료하나요?">
          <div className="grid gap-4 sm:grid-cols-2">
            {care.treatments.map((t) => {
              const Icon = t.icon ? TREATMENT_ICONS[t.icon] : undefined;
              return (
                <div
                  key={t.name}
                  className="flex flex-col rounded-[1.5rem] border border-line bg-surface p-7 transition-colors hover:border-herb-line"
                >
                  {Icon && (
                    <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-tint text-herb">
                      <Icon className="h-7 w-7" />
                    </span>
                  )}
                  <h3 className="kr text-[20px] font-bold leading-snug">{t.name}</h3>
                  <p className="kr mt-3 text-[16.5px] leading-7 text-muted">{t.body}</p>
                  {t.covered && (
                    <span className="kr mt-5 self-start rounded-full border border-herb-line bg-tint px-3 py-1 text-xs font-medium text-herb">
                      건강보험 적용
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {care.treatmentsNote && (
            <p className="kr mt-4 rounded-[1rem] border border-line bg-surface-2 px-6 py-5 text-[16.5px] leading-7 text-muted">
              {care.treatmentsNote}
            </p>
          )}
        </Section>

        {/* 치료 비용 — 물어보기 전에 먼저 꺼낸다. 표로 세워야 항목과 금액이 한눈에 붙는다 */}
        {s.cost.rows.length > 0 && (
          <Section title="치료 비용" note={s.cost.lede}>
            <div className="grid gap-2.5">
              {s.cost.rows.map((r) => (
                <div
                  key={r.item}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 rounded-[1rem] border border-line bg-surface px-6 py-5"
                >
                  <div className="min-w-0">
                    <span className="kr text-[18px] font-bold">{r.item}</span>
                    <span
                      className={
                        "kr ml-3 inline-block rounded-full px-2.5 py-0.5 text-[12px] font-medium " +
                        (r.coverage === "급여"
                          ? "border border-herb-line bg-tint text-herb"
                          : "border border-ochre-line bg-ochre-soft text-ochre")
                      }
                    >
                      {r.coverage}
                    </span>
                    {r.note && (
                      <span className="kr mt-2 block text-[15px] leading-7 text-muted">{r.note}</span>
                    )}
                  </div>
                  <span className="kr shrink-0 text-[18px] font-bold tabular-nums">{r.price}</span>
                </div>
              ))}
            </div>

            {/* 금액만 적어 두면 「이건 보험이 되나」 를 다시 물어야 한다 */}
            {s.cost.insurance.length > 0 && (
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {s.cost.insurance.map((ins) => (
                  <div key={ins.title} className="rounded-[1rem] bg-surface-2 px-6 py-5">
                    <h3 className="kr text-[17px] font-bold leading-snug">{ins.title}</h3>
                    <p className="kr mt-2 text-[16px] leading-7 text-muted">{ins.body}</p>
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        <Section
          title="치료 과정"
          note="첫 내원부터 마무리까지 어떤 순서로 진행되는지 미리 알려 드립니다."
        >
          <ol className="grid gap-2.5">
            {care.stages.map((st, i) => (
              <li
                key={st.label}
                className="grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-4 rounded-[1rem] border border-line bg-surface px-5 py-5 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-6"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-tint font-mono text-[15px] font-bold tabular-nums text-herb">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="kr text-[18px] font-bold leading-snug">{st.label}</h3>
                  <p className="kr mt-2 text-[16.5px] leading-7 text-muted">{st.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* 되는 경우와 안 되는 경우.
            효과를 묻는 사람에게 「됩니다」 만 말하면 믿지 않는다.
            안 되는 경우를 같이 적어야 되는 경우도 믿긴다 */}
        <Section title={s.doubt.question} note={s.doubt.lede}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-herb-line bg-tint p-7">
              <h3 className="kr text-[18px] font-bold text-herb">이런 경우에 도움이 됩니다</h3>
              <ul className="mt-4 grid gap-2.5">
                {s.doubt.worksFor.map((w) => (
                  <li key={w} className="kr flex items-start gap-2.5 text-[16.5px] leading-7">
                    <span aria-hidden="true" className="mt-1 text-[13px] font-bold text-herb">
                      ✓
                    </span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            {/* 다른 과가 나은 경우를 숨기면, 그 사람은 여기서 시간을 버린다 */}
            <div className="rounded-[1.5rem] border border-ochre-line bg-ochre-soft p-7">
              <h3 className="kr text-[18px] font-bold text-ochre">
                이럴 때는 다른 진료가 먼저입니다
              </h3>
              <ul className="mt-4 grid gap-2.5">
                {s.doubt.limitsOf.map((l) => (
                  <li key={l} className="kr flex items-start gap-2.5 text-[16.5px] leading-7">
                    <span aria-hidden="true" className="mt-1 text-[13px] font-bold text-ochre">
                      !
                    </span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {s.doubt.grounds.length > 0 && (
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {s.doubt.grounds.map((g) => (
                <div
                  key={g.title}
                  className="rounded-[1rem] border border-line bg-surface px-6 py-5"
                >
                  <h3 className="kr text-[17px] font-bold leading-snug">{g.title}</h3>
                  <p className="kr mt-2 text-[16px] leading-7 text-muted">{g.body}</p>
                </div>
              ))}
            </div>
          )}
        </Section>

        {care.extraSections?.map((sec) => (
          <Section key={sec.title} title={sec.title} note={sec.note}>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {sec.items.map((it) => (
                <div
                  key={it.title}
                  className="rounded-[1rem] border border-line bg-surface px-6 py-5"
                >
                  <h3 className="kr text-[18px] font-bold leading-snug">{it.title}</h3>
                  <p className="kr mt-2 text-[16.5px] leading-7 text-muted">{it.body}</p>
                </div>
              ))}
            </div>
          </Section>
        ))}

        {s.faq.length > 0 && (
          <Section title="자주 묻는 질문" note="진료실에서 실제로 많이 받는 질문입니다.">
            <div className="border-t border-line">
              {s.faq.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="kr flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-[18px] font-bold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[19px] text-faint transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="kr pb-6 text-[16.5px] leading-8 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </Section>
        )}

        <Cta />
      </article>
    </>
  );
}
