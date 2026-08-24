import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { COLUMNS, getColumn, columnsByDate } from "@/content/column";
import { getSymptom } from "@/content/symptoms";
import { CLINIC } from "@/content/clinic";
import { Section, Cta, JsonLd } from "@/components/site";
import { Blocks, readingMinutes } from "@/components/blocks";
import { breadcrumb, SITE_URL } from "@/content/schema";

export const generateStaticParams = () => COLUMNS.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: PageProps<"/column/[slug]">): Promise<Metadata> {
  const c = getColumn((await params).slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.summary,
    openGraph: { type: "article", publishedTime: c.date },
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
          headline: c.title,
          description: c.summary,
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
        }}
      />
      <JsonLd
        data={breadcrumb([
          { name: "원장 칼럼", path: "/column" },
          { name: c.title, path: `/column/${c.slug}` },
        ])}
      />
      <article className="mx-auto max-w-3xl xl:max-w-4xl px-5 py-12">
        <Link href="/column" className="font-mono text-xs text-herb hover:underline">
          ← 원장 칼럼
        </Link>
        <header className="mt-6 border-b border-line pb-9">
          <h1 className="kr text-3xl font-bold leading-tight tracking-tight text-balance sm:text-[2.4rem]">
            {c.title}
          </h1>
          <p className="kr mt-5 max-w-[52ch] text-[17px] leading-8 text-muted">{c.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs text-faint">
            <time dateTime={c.date} className="tabular-nums">
              {fmtDate(c.date)}
            </time>
            <span aria-hidden="true">·</span>
            <span>{readingMinutes(c.body)}분</span>
            <span aria-hidden="true">·</span>
            <span>{author ? `${author.name} ${author.role}` : CLINIC.name}</span>
          </div>
        </header>

        <Blocks blocks={c.body} />

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
                    <span className="kr mt-1 block text-sm text-muted">{sym.summary}</span>
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
                  <span className="kr mt-1 block text-sm text-muted">{o.summary}</span>
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
