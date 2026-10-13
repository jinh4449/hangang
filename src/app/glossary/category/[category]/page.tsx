import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { GLOSSARY_CATEGORIES, getCategory, termsIn } from "@/content/glossary";
import { PageHead, Cta, JsonLd } from "@/components/site";
import { webPage, breadcrumb } from "@/content/schema";

export const generateStaticParams = () =>
  GLOSSARY_CATEGORIES.filter((c) => termsIn(c.slug).length > 0).map((c) => ({ category: c.slug }));

export async function generateMetadata({
  params,
}: PageProps<"/glossary/category/[category]">): Promise<Metadata> {
  const c = getCategory((await params).category);
  if (!c) return {};
  const terms = termsIn(c.slug);
  return {
    title: `${c.name} 용어 ${terms.length}개 — 한의학 용어사전`,
    description: `${c.blurb}. ${terms
      .slice(0, 6)
      .map((t) => t.term)
      .join(", ")} 등 ${terms.length}개를 한 문장씩 풀었습니다.`,
    alternates: { canonical: `/glossary/category/${c.slug}` },
  };
}

export default async function GlossaryCategoryPage({
  params,
}: PageProps<"/glossary/category/[category]">) {
  const c = getCategory((await params).category);
  if (!c) notFound();
  const terms = termsIn(c.slug);
  if (terms.length === 0) notFound();
  const path = `/glossary/category/${c.slug}`;

  return (
    <>
      <JsonLd data={webPage({ name: `${c.name} — 한의학 용어사전`, description: c.blurb, path })} />
      <JsonLd
        data={breadcrumb([
          { name: "한의학 용어사전", path: "/glossary" },
          { name: c.name, path },
        ])}
      />
      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.5rem,6vw,7rem)] py-12">
        <Link href="/glossary" className="font-mono text-xs text-herb hover:underline">
          ← 한의학 용어사전
        </Link>
        <div className="mt-6">
          <PageHead eyebrow={`한의학 용어사전 · ${terms.length}개`} title={c.name} lede={`${c.blurb}.`} />
        </div>
        <div className="mt-10 border-t border-line">
          {terms.map((t) => (
            <Link key={t.slug} href={`/glossary/${t.slug}`} className="group block border-b border-line py-5">
              <span className="kr block text-[18px] font-bold leading-snug group-hover:text-herb">
                {t.term}
                {t.aka && t.aka.length > 0 && (
                  <span className="ml-2 text-[15px] font-normal text-faint">{t.aka.slice(0, 3).join(" · ")}</span>
                )}
              </span>
              <span className="kr mt-1.5 block text-[16px] leading-7 text-muted">{t.short}</span>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {GLOSSARY_CATEGORIES.filter((o) => o.slug !== c.slug && termsIn(o.slug).length > 0).map((o) => (
            <Link
              key={o.slug}
              href={`/glossary/category/${o.slug}`}
              className="badge inline-block rounded-full border border-line bg-surface px-5 py-2.5 text-sm hover:border-herb"
            >
              {o.name}
            </Link>
          ))}
        </div>
        <Cta />
      </article>
    </>
  );
}
