/**
 * 한국어 조사 선택.
 * 마지막 글자의 받침 유무로 결정한다. 한글 유니코드에서 (코드 - 0xAC00) % 28 이 0이면 받침이 없다.
 */
const PAIRS = {
  은는: ["은", "는"],
  이가: ["이", "가"],
  을를: ["을", "를"],
  과와: ["과", "와"],
  으로로: ["으로", "로"],
} as const;

function hasFinal(word: string) {
  const ch = word.trim().at(-1);
  if (!ch) return false;
  const code = ch.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return false; // 한글이 아니면 받침 없음으로 본다
  const final = (code - 0xac00) % 28;
  // '로/으로' 는 ㄹ 받침(코드 8)도 '로' 를 쓴다
  return final !== 0;
}

export function josa(word: string, kind: keyof typeof PAIRS) {
  const [withFinal, withoutFinal] = PAIRS[kind];
  if (kind === "으로로") {
    const ch = word.trim().at(-1);
    const code = ch ? ch.charCodeAt(0) : 0;
    const final = code >= 0xac00 && code <= 0xd7a3 ? (code - 0xac00) % 28 : 0;
    return final === 0 || final === 8 ? withoutFinal : withFinal;
  }
  return hasFinal(word) ? withFinal : withoutFinal;
}

/** 단어와 조사를 붙여서 돌려준다 */
export const withJosa = (word: string, kind: keyof typeof PAIRS) => word + josa(word, kind);
