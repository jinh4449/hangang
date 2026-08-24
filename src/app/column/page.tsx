import Link from "next/link";
import type { Metadata } from "next";
import { columnsByDate } from "@/content/column";
import { CLINIC } from "@/content/clinic";
import { PageHead, Cta, JsonLd } from "@/components/site";
import { readingMinutes } from "@/components/blocks";
import { breadcrumb, SITE_URL } from "@/content/schema";

export const metadata: Metadata = {
  title: "원장 칼럼",
  description: `${CLINIC.name} 진료실에서 자주 받는 질문에 답합니다.`,
};

const fmtDate = (d: string) => d.replaceAll("-", ".");

export default function ColumnIndex() {
  const list = columnsByDate();
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "원장 칼럼", path: "/column" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${CLINIC.name} 원장 칼럼`,
          url: `${SITE_URL}/column`,
          inLanguage: "ko",
          publisher: { "@id": `${SITE_URL}/#clinic` },
          blogPost: list.map((c) => ({
            "@type": "BlogPosting",
            headline: c.title,
            url: `${SITE_URL}/column/${c.slug}`,
            datePublished: c.date,
            description: c.summary,
          })),
        }}
      />
      <article className="mx-auto max-w-3xl xl:max-w-4xl px-5 py-12">
        <PageHead
          eyebrow="원장 칼럼"
          title="진료실에서 자주 받는 질문"
          lede="묻기 애매해서 그냥 넘어가시는 것들을 먼저 꺼내 정리했습니다."
        />
        <div className="mt-10 border-t border-line">
          {list.map((c) => (
            <Link
              key={c.slug}
              href={`/column/${c.slug}`}
              className="group grid gap-2 border-b border-line py-7 transition-colors hover:bg-surface"
            >
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-faint">
                <time dateTime={c.date} className="tabular-nums">
                  {fmtDate(c.date)}
                </time>
                <span aria-hidden="true">·</span>
                <span>{readingMinutes(c.body)}분</span>
                <span aria-hidden="true">·</span>
                <span>
                  {CLINIC.doctors.find((d) => d.key === c.authorKey)?.name ?? CLINIC.name}
                </span>
              </div>
              <h2 className="kr text-xl font-bold leading-snug transition-colors group-hover:text-herb">
                {c.title}
              </h2>
              <p className="kr max-w-[56ch] text-[15px] leading-7 text-muted">{c.summary}</p>
            </Link>
          ))}
        </div>
        <Cta />
      </article>
    </>
  );
}
