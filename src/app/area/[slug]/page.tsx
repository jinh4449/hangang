import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { AREAS, getArea } from "@/content/area";
import { getSymptom } from "@/content/symptoms";
import { CLINIC } from "@/content/clinic";
import { PageHead, Section, Cta, Bezel, JsonLd, MapLinks } from "@/components/site";
import { breadcrumb } from "@/content/schema";
import { SITE_URL } from "@/content/clinic";

export const generateStaticParams = () => AREAS.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: PageProps<"/area/[slug]">): Promise<Metadata> {
  const a = getArea((await params).slug);
  if (!a) return {};
  return { title: `${a.title} — ${CLINIC.name}`, description: a.lede.slice(0, 150) };
}

export default async function AreaPage({ params }: PageProps<"/area/[slug]">) {
  const a = getArea((await params).slug);
  if (!a) notFound();

  return (
    <>
      {/* 병원 엔티티는 레이아웃에 하나만 두고 여기서는 @id 로 참조한다.
          같은 페이지에 MedicalClinic 을 두 번 쓰면 병원이 둘인 것으로 읽힌다. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: a.title,
          description: a.lede,
          url: `${SITE_URL}/area/${a.slug}`,
          inLanguage: "ko",
          provider: { "@id": `${SITE_URL}/#clinic` },
          about: { "@type": "Place", name: a.name },
          significantLink: a.focusSlugs.map((f) => `${SITE_URL}/care/${f}`),
        }}
      />
      <JsonLd data={breadcrumb([{ name: a.title, path: `/area/${a.slug}` }])} />
      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.25rem,4vw,4rem)] py-12">
        <PageHead eyebrow="오시는 길" title={a.title} lede={a.lede} />

        <Section title="찾아오시는 방법">
          <Bezel>
            <dl className="divide-y divide-line p-2">
              {a.access.map((ac) => (
                <div key={ac.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[6rem_1fr] sm:gap-5">
                  <dt className="text-sm font-medium text-herb">{ac.label}</dt>
                  <dd className="kr text-[15px] leading-7 text-muted">{ac.detail}</dd>
                </div>
              ))}
            </dl>
          </Bezel>
          <p className="kr mt-4 text-sm leading-7 text-muted">
            {CLINIC.address} · {CLINIC.landmark}
          </p>
          <div className="mt-5">
            <MapLinks />
          </div>
        </Section>

        {a.local.map((l) => (
          <Section key={l.title} title={l.title}>
            <p className="kr max-w-[58ch] text-[15px] leading-8 text-muted">{l.body}</p>
          </Section>
        ))}

        <Section title="이 지역에서 많이 찾는 진료">
          <div className="grid gap-2">
            {a.focusSlugs.map((fs) => {
              const s = getSymptom(fs);
              if (!s) return null;
              return (
                <Link
                  key={fs}
                  href={`/care/${fs}`}
                  className="tile block bg-surface px-5 py-4"
                >
                  <span className="kr font-semibold">{s.name}</span>
                  <span className="kr mt-1 block text-sm text-muted">{s.summary}</span>
                </Link>
              );
            })}
          </div>
        </Section>

        <Cta />
      </article>
    </>
  );
}
