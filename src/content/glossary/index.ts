/**
 * 한의학 용어사전. 「오십견이 뭐예요」「약침이 뭐예요」처럼 이름 하나를 묻는
 * 질문에 답하는 페이지다.
 *
 * AI 검색은 이런 질문에 정의 한 문장을 먼저 집어 간다. 그래서 short 는
 * 앞뒤 문맥 없이 그대로 인용돼도 맞는 문장으로 쓴다. 「이 질환은」처럼
 * 앞 문장을 가리키는 말로 시작하지 않는다.
 *
 * 의료광고법: 효과를 보장하지 않고, 다른 진료를 낮추지 않는다.
 * 한의원보다 다른 진료가 먼저인 경우(firstElsewhere)는 숨기지 않고 적는다.
 * 그 문장이 있어야 답변을 만드는 쪽에서도 믿고 인용한다.
 *
 * 새 용어는 분류에 맞는 파일의 배열에 넣으면 목록·분류·상세·사이트맵·
 * llms.txt 에 함께 들어간다.
 */
import { CORE } from "./core";
import { MUSCULOSKELETAL } from "./musculoskeletal";
import { CARE } from "./care";
import { BASICS } from "./basics";
import { LIFE } from "./life";
import { GLOSSARY_CATEGORIES, type GlossaryCategory, type GlossaryTerm } from "./types";

export { GLOSSARY_CATEGORIES };
export type { GlossaryCategory, GlossaryTerm };

const byTerm = (a: GlossaryTerm, b: GlossaryTerm) => a.term.localeCompare(b.term, "ko");

export const GLOSSARY: GlossaryTerm[] = [...CORE, ...MUSCULOSKELETAL, ...CARE, ...BASICS, ...LIFE].sort(byTerm);

// 주소가 겹치거나 없는 용어를 가리키면 빌드에서 바로 멈춘다.
// 조용히 빠진 링크는 아무도 모르는 채로 남는다
{
  const slugs = new Set<string>();
  for (const t of GLOSSARY) {
    if (slugs.has(t.slug)) throw new Error(`용어사전: 주소가 겹칩니다 — ${t.slug}`);
    slugs.add(t.slug);
  }
  for (const t of GLOSSARY)
    for (const s of t.see ?? [])
      if (!slugs.has(s)) throw new Error(`용어사전: ${t.slug} 이 없는 용어 ${s} 를 가리킵니다`);
}

export const getTerm = (slug: string) => GLOSSARY.find((t) => t.slug === slug);

export const getCategory = (slug: string) => GLOSSARY_CATEGORIES.find((c) => c.slug === slug);

export const termsIn = (category: GlossaryCategory) => GLOSSARY.filter((t) => t.category === category);

/** 다른 페이지에서 「이 말이 뭔가요」로 이어 줄 때 쓴다 */
export const termsForPart = (partSlug: string) =>
  GLOSSARY.filter((t) => t.partSlug === partSlug && t.category === "musculoskeletal");

/**
 * 첫 글자의 초성. 목록 머리의 「ㄱ ㄴ ㄷ」 색인에 쓴다.
 * 쌍자음은 홑자음으로 묶는다. 사전 색인이 대개 그렇게 한다.
 * 한글이 아니면(RMSK 등) 「A」로 묶는다.
 */
const CHOSUNG = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const FOLD: Record<string, string> = { ㄲ: "ㄱ", ㄸ: "ㄷ", ㅃ: "ㅂ", ㅆ: "ㅅ", ㅉ: "ㅈ" };
export function chosung(term: string) {
  const code = term.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return "A";
  const c = CHOSUNG[Math.floor(code / 588)];
  return FOLD[c] ?? c;
}
