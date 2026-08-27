import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { COMPARES, getCompare } from "@/content/compare";
import { getSymptom } from "@/content/symptoms";
import { PageHead, Section, Cta, JsonLd } from "@/components/site";
import { medicalWebPage, faqPage, breadcrumb } from "@/content/schema";
import type { ComparePane } from "@/content/types";

export const generateStaticParams = () => COMPARES.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: PageProps<"/compare/[slug]">): Promise<Metadata> {
  const c = getCompare((await params).slug);
  if (!c) return {};
  return { title: c.title, description: c.lede.slice(0, 150) };
}

function Pane({ pane, tone }: { pane: ComparePane; tone: "a" | "b" }) {
  const accent =
    tone === "a" ? "border-ochre-line bg-ochre-soft" : "border-herb-line bg-tint";
  return (
    <div className={`rounded border p-6 ${accent}`}>
      <h3 className="font-serif text-xl font-bold">{pane.name}</h3>
      <p className="mt-3 text-[16px] leading-7 text-muted">{pane.does}</p>
      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
        이런 상황이라면
      </p>
      <ul className="mt-2 grid gap-1.5">
        {pane.betterWhen.map((b) => (
          <li key={b} className="text-[15px] leading-7">
            · {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ComparePage({ params }: PageProps<"/compare/[slug]">) {
  const c = getCompare((await params).slug);
  if (!c) notFound();

  return (
    <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.5rem,6vw,7rem)] py-12">
      <JsonLd
        data={medicalWebPage({
          name: c.title,
          description: c.lede,
          condition: c.title,
          path: `/compare/${c.slug}`,
        })}
      />
      <JsonLd
        data={faqPage([
          {
            q: c.question,
            a:
              `${c.lede} ${c.a.name}: ${c.a.does} ${c.b.name}: ${c.b.does}`,
          },
          { q: "두 가지를 함께 받아도 되나요?", a: c.together },
        ])}
      />
      <JsonLd data={breadcrumb([{ name: "비교", path: `/compare/${c.slug}` }])} />
      <PageHead eyebrow="비교" title={c.title} lede={c.lede} />

      <Section title={c.question}>
        <div className="grid gap-4 md:grid-cols-2">
          <Pane pane={c.a} tone="a" />
          <Pane pane={c.b} tone="b" />
        </div>
      </Section>

      <Section title="함께 받아도 되나요">
        <p className="max-w-[62ch] rounded border border-line bg-surface p-5 text-[15px] leading-8">
          {c.together}
        </p>
      </Section>

      {c.symptomSlugs.length > 0 && (
        <Section title="관련 증상">
          <div className="grid gap-2">
            {c.symptomSlugs.map((ss) => {
              const s = getSymptom(ss);
              if (!s) return null;
              return (
                <Link
                  key={ss}
                  href={`/care/${ss}`}
                  className="rounded border border-line bg-surface px-5 py-4 transition-colors hover:border-herb"
                >
                  <span className="font-semibold">
                    {s.name} <span className="text-muted">({s.clinicalName})</span>
                  </span>
                  <span className="mt-1 block text-[15px] text-muted">{s.summary}</span>
                </Link>
              );
            })}
          </div>
        </Section>
      )}

      <Cta />
    </article>
  );
}
