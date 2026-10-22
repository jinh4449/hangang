import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { COLUMNS, getColumn, columnsByDate } from "@/content/column";
import { getSymptom } from "@/content/symptoms";
import { CLINIC } from "@/content/clinic";
import { Section, Cta, JsonLd } from "@/components/site";
import { Blocks } from "@/components/blocks";
import { breadcrumb, SITE_URL } from "@/content/schema";

export const generateStaticParams = () => COLUMNS.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: PageProps<"/column/[slug]">): Promise<Metadata> {
  const c = getColumn((await params).slug);
  if (!c) return {};
  return {
    title: c.title,
    description: `${c.summary} 김포 장기동 김포한강한의원 원장 칼럼입니다.`,
    alternates: { canonical: `/column/${c.slug}` },
    // openGraph 는 통째로 갈아 끼워진다. 여기서 type 만 적으면 레이아웃에 둔
    // 그림과 사이트 이름이 함께 사라진다. 그래서 다시 적어 준다
    openGraph: {
      type: "article",
      locale: "ko_KR",
      siteName: CLINIC.name,
      url: `${SITE_URL}/column/${c.slug}`,
      publishedTime: c.date,
      modifiedTime: c.updated ?? c.date,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${CLINIC.name} 접수 공간` }],
    },
  };
}

const fmtDate = (d: string) => d.replaceAll("-", ".");

export default async function ColumnPage({ params }: PageProps<"/column/[slug]">) {
  const c = getColumn((await params).slug);
  if (!c) notFound();
  const others = columnsByDate().filter((x) => x.slug !== c.slug).slice(0, 3);
  const author = CLINIC.doctors.find((d) => d.key === c.authorKey);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${SITE_URL}/column/${c.slug}#article`,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          headline: c.title,
          description: `${c.summary} 김포 장기동 김포한강한의원 원장 칼럼입니다.`,
          url: `${SITE_URL}/column/${c.slug}`,
          inLanguage: "ko",
          datePublished: c.date,
          dateModified: c.updated ?? c.date,
          author: {
            "@type": "Person",
            "@id": `${SITE_URL}/#doctor-${c.authorKey}`,
            name: author ? `${author.name} ${author.role}` : CLINIC.name,
          },
          publisher: { "@id": `${SITE_URL}/#clinic` },
          mainEntityOfPage: `${SITE_URL}/column/${c.slug}`,
          // 결론 문단. AI 검색이 이 글의 답으로 가져가는 자리다
          abstract: c.answer,
          citation: c.references.map((r) => ({
            "@type": "ScholarlyArticle",
            name: r.cite,
            url: r.url,
          })),
        }}
      />
      <JsonLd
        data={breadcrumb([
          { name: "원장 칼럼", path: "/column" },
          { name: c.title, path: `/column/${c.slug}` },
        ])}
      />
      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.5rem,6vw,7rem)] py-12">
        <Link href="/column" className="font-mono text-xs text-herb hover:underline">
          ← 원장 칼럼
        </Link>
        <header className="mt-6 border-b border-line pb-9">
          <h1 className="kr text-3xl font-bold leading-tight tracking-tight text-balance sm:text-[2.4rem]">
            {c.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-sm text-faint">
            <time dateTime={c.date} className="tabular-nums">
              {fmtDate(c.date)}
            </time>
            <span aria-hidden="true">·</span>
            <span>{author ? `${author.name} ${author.role}` : CLINIC.name}</span>
          </div>
        </header>

        {/* 결론 먼저. 제목을 보고 들어온 사람이 첫 화면에서 답을 얻게 한다 */}
        <section
          aria-label="결론"
          className="relative mt-9 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-tint via-[#f4f8f5] to-ochre-soft p-6 ring-1 ring-herb-line/60 sm:p-8"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-5 top-2 font-serif text-[96px] leading-none text-herb/15"
          >
            &ldquo;
          </span>
          <p className="inline-flex items-center gap-2 rounded-full bg-surface/80 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-herb ring-1 ring-herb-line/60">
            <span className="h-1.5 w-1.5 rounded-full bg-herb" aria-hidden="true" />
            결론부터 말씀드리면
          </p>
          <p className="kr relative mt-4 text-[17.5px] font-medium leading-8 sm:text-[18.5px] sm:leading-9">{c.answer}</p>
        </section>

        <Blocks blocks={c.body} />

        {/* 저희 진료. 원장 사진과 이름을 머리에 두어 「누가 이렇게 본다」가 보이게 한다 */}
        {c.clinic.length > 0 && (
        <section className="mt-16 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-herb-deep via-herb to-[#2b6e55] p-[1px] shadow-[0_24px_60px_-30px_rgba(22,65,47,0.55)]">
          <div className="rounded-[calc(1.75rem-1px)] bg-gradient-to-b from-tint via-surface to-surface px-6 pb-7 pt-7 sm:px-8">
            <div className="flex items-center gap-3">
              {author && (
                <Image
                  src={author.photo.src}
                  width={author.photo.w}
                  height={author.photo.h}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-full object-cover object-top ring-2 ring-surface"
                />
              )}
              <div className="leading-tight">
                <h2 className="kr text-[20px] font-bold tracking-tight sm:text-[22px]">
                  김포한강한의원에서는 이렇게 봅니다
                </h2>
                {author && (
                  <p className="kr mt-1 text-[14px] text-muted">
                    {author.name} {author.role}
                  </p>
                )}
              </div>
            </div>
            <div className="-mt-4">
              <Blocks blocks={c.clinic} numbered={false} />
            </div>
          </div>
        </section>
        )}

        {c.references.length > 0 && (
          <Section title="참고문헌">
            <ol className="grid gap-4">
              {c.references.map((r, i) => (
                <li key={r.url} className="grid grid-cols-[1.75rem_1fr] gap-x-2 text-[14.5px] leading-7">
                  <span className="font-mono text-faint">{i + 1}.</span>
                  <div>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words text-ink underline decoration-line underline-offset-4 hover:decoration-herb"
                    >
                      {r.cite}
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {c.symptomSlugs.length > 0 && (
          <Section title="관련 진료">
            <div className="grid gap-2">
              {c.symptomSlugs.map((s) => {
                const sym = getSymptom(s);
                if (!sym) return null;
                return (
                  <Link
                    key={s}
                    href={`/care/${s}`}
                    className="tile block bg-surface px-5 py-4"
                  >
                    <span className="kr font-semibold">{sym.name}</span>
                    <span className="kr mt-1 block text-[15px] text-muted">{sym.summary}</span>
                  </Link>
                );
              })}
            </div>
          </Section>
        )}

        {others.length > 0 && (
          <Section title="다른 칼럼">
            <div className="grid gap-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/column/${o.slug}`}
                  className="tile block bg-surface px-5 py-4"
                >
                  <span className="kr font-semibold">{o.title}</span>
                  <span className="kr mt-1 block text-[15px] text-muted">{o.summary}</span>
                </Link>
              ))}
            </div>
          </Section>
        )}

        <Cta />
      </article>
    </>
  );
}
