import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { columnsByDate } from "@/content/column";
import { CLINIC } from "@/content/clinic";
import { SubHero, Cta, JsonLd } from "@/components/site";
import { DocIcon } from "@/components/icons";
import { ColumnFilter } from "@/components/column-filter";
import { webPage, breadcrumb, SITE_URL } from "@/content/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/column" },
  title: "원장 칼럼 — 진료실에서 자주 받는 질문",
  description:
    "김포한강한의원 원장 칼럼. 진료실에서 자주 받는 질문에 답합니다. 엑스레이가 정상인데 아픈 이유, 치료 횟수, 교통사고 합의 시점 같은 것들을 정리했습니다.",
};

const fmtDate = (d: string) => d.replaceAll("-", ".");

export default function ColumnIndex() {
  const list = columnsByDate();
  return (
    <>
      <JsonLd
        data={webPage({
          name: `${CLINIC.name} 원장 칼럼`,
          description: "진료실에서 자주 받는 질문에 답합니다.",
          path: "/column",
        })}
      />
      <JsonLd data={breadcrumb([{ name: "원장 칼럼", path: "/column" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${SITE_URL}/column#blog`,
          isPartOf: { "@id": `${SITE_URL}/#website` },
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
      <SubHero
        narrow
        current="/column"
        title="진료실에서 자주 받는 질문"
        sub="원장 칼럼"
        lede="묻기 애매해서 그냥 넘어가시는 것들을 먼저 꺼내 정리했습니다."
        icon={<DocIcon />}
      />
      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.5rem,6vw,7rem)] py-12 [&>:first-child]:mt-0">
        {/* 카드. 그림으로 무슨 글인지 먼저 알리고, 아래에 누가 언제 썼는지를 둔다.
            의료 글은 「누가 썼나」가 믿을지를 가르는 첫 단서다 */}
        <ColumnFilter
          tabs={CLINIC.doctors.map((d) => ({ key: d.key, label: `${d.name} 원장` }))}
          items={list.map((c) => {
            const author = CLINIC.doctors.find((d) => d.key === c.authorKey);
            return { key: c.slug, author: c.authorKey, node: (
              <Link
                href={`/column/${c.slug}`}
                className="group flex w-full flex-col overflow-hidden rounded-[1.5rem] bg-surface ring-1 ring-line transition-shadow hover:ring-herb"
              >
                <div className="aspect-[8/5] overflow-hidden bg-tint">
                  {c.image ? (
                    <Image
                      src={c.image.src}
                      width={c.image.w}
                      height={c.image.h}
                      alt={c.image.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {/* 카드 높이를 맞추려고 제목은 한 줄, 요약은 두 줄 높이로 고정한다.
                      잘린 제목은 title 로 전체를 띄운다 */}
                  <h2
                    title={c.title}
                    className="kr truncate text-[19px] font-bold leading-snug transition-colors group-hover:text-herb"
                  >
                    {c.title}
                  </h2>
                  <p className="kr mt-2 line-clamp-2 min-h-[3.5rem] text-[15px] leading-7 text-muted">{c.summary}</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                    {author && (
                      <Image
                        src={author.photo.src}
                        width={author.photo.w}
                        height={author.photo.h}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-full object-cover object-top ring-1 ring-line"
                      />
                    )}
                    <div className="min-w-0 leading-tight">
                      <p className="kr text-[14px] font-semibold">
                        {author ? `${author.name} ${author.role}` : CLINIC.name}
                      </p>
                      <p className="mt-1 font-mono text-[12px] text-faint">
                        <time dateTime={c.date} className="tabular-nums">
                          {fmtDate(c.date)}
                        </time>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ) };
          })}
        />
        <Cta />
      </article>
    </>
  );
}
