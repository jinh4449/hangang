import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SYMPTOMS, getSymptom } from "@/content/symptoms";
import { IntentNav, PageHead, Section, Cta } from "@/components/site";

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
      <article className="mx-auto max-w-3xl px-5 py-12">
        <PageHead eyebrow="솔직한 답변" title={doubt.question} lede={doubt.lede} />

        {/* 한계를 먼저 놓는다. 효과부터 말하면 광고로 읽히고, 한계부터 말하면 설명으로 읽힌다. */}
        <Section
          title="이런 경우에는 다른 과로 안내해 드립니다"
          note="아래에 해당하면 한방치료를 권하지 않습니다. 진찰 후 적절한 곳으로 안내해 드립니다."
        >
          <ul className="grid gap-2">
            {doubt.limitsOf.map((l) => (
              <li
                key={l}
                className="rounded border border-rust-line bg-rust-soft px-5 py-3.5 text-[15px] leading-7"
              >
                {l}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="도움이 되는 경우">
          <ul className="grid gap-2 sm:grid-cols-2">
            {doubt.worksFor.map((w) => (
              <li
                key={w}
                className="rounded border border-jade-line bg-jade-soft px-4 py-3 text-[15px] leading-7"
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
          <Link href={`/care/${s.slug}`} className="text-jade underline underline-offset-4">
            {s.name} 치료 안내
          </Link>
          를, 비용이 궁금하시면{" "}
          <Link href={`/cost/${s.slug}`} className="text-jade underline underline-offset-4">
            비용·보험 안내
          </Link>
          를 확인해 주세요.
        </p>

        <Cta label="상태부터 확인해 보세요" />
      </article>
    </>
  );
}
