import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SYMPTOMS, getSymptom } from "@/content/symptoms";
import { IntentNav, PageHead, Section, Cta, JsonLd } from "@/components/site";
import { medicalWebPage, faqPage, breadcrumb } from "@/content/schema";

export const generateStaticParams = () => SYMPTOMS.map((s) => ({ symptom: s.slug }));

export async function generateMetadata({ params }: PageProps<"/doubt/[symptom]">): Promise<Metadata> {
  const s = getSymptom((await params).symptom);
  if (!s) return {};
  return { title: s.doubt.question, description: s.doubt.lede.slice(0, 150) };
}

export default async function DoubtPage({ params }: PageProps<"/doubt/[symptom]">) {
  const s = getSymptom((await params).symptom);
  if (!s) notFound();
  const { doubt } = s;

  return (
    <>
      <IntentNav slug={s.slug} name={s.name} current="doubt" />
      <JsonLd
        data={medicalWebPage({
          name: doubt.question,
          description: doubt.lede,
          condition: s.clinicalName,
          path: `/doubt/${s.slug}`,
        })}
      />
      {/* 아래 문답은 모두 이 페이지에 실제로 표시되는 내용이다 */}
      <JsonLd
        data={faqPage([
          { q: doubt.question, a: `${doubt.lede} 도움이 되는 경우는 다음과 같습니다. ${doubt.worksFor.join(". ")}.` },
          { q: `${s.name}에서 다른 과로 가야 하는 경우는 언제인가요?`, a: doubt.limitsOf.join(". ") + "." },
          { q: "부작용이나 불편은 없나요?", a: doubt.sideEffects.join(". ") + "." },
        ])}
      />
      <JsonLd
        data={breadcrumb([
          { name: s.name, path: `/care/${s.slug}` },
          { name: "효과 있나요", path: `/doubt/${s.slug}` },
        ])}
      />
      <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.25rem,4vw,4rem)] py-12">
        <PageHead eyebrow="솔직한 답변" title={doubt.question} lede={doubt.lede} />

        <Section title="도움이 되는 경우">
          <ul className="grid gap-2 sm:grid-cols-2">
            {doubt.worksFor.map((w) => (
              <li
                key={w}
                className="rounded border border-herb-line bg-tint px-4 py-3 text-[15px] leading-7"
              >
                {w}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="무엇을 근거로 말씀드리나">
          <div className="grid gap-3">
            {doubt.grounds.map((g) => (
              <div key={g.title} className="rounded border border-line bg-surface p-5">
                <h3 className="font-semibold">{g.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-muted">{g.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="있을 수 있는 불편" note="드물지만 다음과 같은 반응이 나타날 수 있습니다.">
          <ul className="grid gap-1.5">
            {doubt.sideEffects.map((e) => (
              <li key={e} className="text-[15px] leading-8 text-muted">
                · {e}
              </li>
            ))}
          </ul>
        </Section>

        <p className="mt-10 text-sm leading-7 text-muted">
          치료 방법이 궁금하시면{" "}
          <Link href={`/care/${s.slug}`} className="text-herb underline underline-offset-4">
            {s.name} 치료 안내
          </Link>
          를, 비용이 궁금하시면{" "}
          <Link href={`/cost/${s.slug}`} className="text-herb underline underline-offset-4">
            비용·보험 안내
          </Link>
          를 확인해 주세요.
        </p>

        <Cta label="상태부터 확인해 보세요" />
      </article>
    </>
  );
}
