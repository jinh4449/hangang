import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { AREAS, getArea } from "@/content/area";
import { getSymptom } from "@/content/symptoms";
import { CLINIC } from "@/content/clinic";
import { PageHead, Section, Cta, Bezel, JsonLd, MapLinks } from "@/components/site";

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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          name: CLINIC.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: CLINIC.addressShort,
            addressLocality: CLINIC.locality,
            addressRegion: CLINIC.region,
            addressCountry: "KR",
          },
          telephone: "+82-31-8049-7541",
          areaServed: { "@type": "Place", name: a.name },
          publicAccess: true,
        }}
      />
      <article className="mx-auto max-w-3xl px-5 py-12">
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
                  className="rounded-2xl bg-surface px-5 py-4 ring-1 ring-line transition-colors hover:ring-herb"
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
