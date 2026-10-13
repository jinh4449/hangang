"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type BrowserTerm = {
  slug: string;
  term: string;
  aka: string[];
  short: string;
  /** 첫 글자의 초성. 색인 단추가 거른다 */
  ch: string;
  /** 이름과 다른 이름 전체의 초성. 「ㅇㅅㄱ」 으로 「오십견」 을 찾게 한다 */
  initials: string;
};

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "");
const ONLY_JAMO = /^[ㄱ-ㅎ]+$/;

/**
 * 용어사전 검색과 가나다 색인.
 *
 * 처음에는 모든 용어가 서버에서 그려진 채로 나온다. 검색엔진과 AI 크롤러는
 * 스크립트를 돌리지 않으니, 걸러진 화면이 아니라 전체 목록을 봐야 한다.
 *
 * 초성은 앵커(#ㄱ)가 아니라 거르는 단추로 둔다. 앵커는 미리보기의 해시
 * 라우팅과 부딪혀 첫 화면으로 튀었고, 용어가 늘면 내려가서 찾는 것보다
 * 그 자음만 남기는 편이 빠르다.
 */
export function GlossaryBrowser({ terms }: { terms: BrowserTerm[] }) {
  const [q, setQ] = useState("");
  const [ch, setCh] = useState<string | null>(null);

  const keys = useMemo(() => [...new Set(terms.map((t) => t.ch))], [terms]);

  const shown = useMemo(() => {
    const n = norm(q);
    return terms.filter((t) => {
      if (ch && t.ch !== ch) return false;
      if (!n) return true;
      if (ONLY_JAMO.test(n)) return t.initials.includes(n);
      return [t.term, ...t.aka, t.short].some((s) => norm(s).includes(n));
    });
  }, [terms, q, ch]);

  const groups = useMemo(() => {
    const m = new Map<string, BrowserTerm[]>();
    for (const t of shown) m.set(t.ch, [...(m.get(t.ch) ?? []), t]);
    return [...m.entries()];
  }, [shown]);

  const chip = (on: boolean) =>
    "grid h-9 min-w-9 place-items-center rounded-full border px-2.5 text-sm transition-colors " +
    (on ? "border-herb bg-herb text-white" : "border-line bg-surface hover:border-herb");

  return (
    <div>
      <label className="block">
        <span className="sr-only">용어 검색</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="용어를 검색하세요 — 예: 오십견, 추나, 실비, ㅇㅅㄱ"
          className="kr w-full rounded-full border border-line bg-surface px-5 py-3.5 text-[16px] outline-none focus:border-herb"
        />
      </label>

      <div role="group" aria-label="초성으로 거르기" className="mt-4 flex flex-wrap gap-1.5">
        <button type="button" onClick={() => setCh(null)} aria-pressed={ch === null} className={chip(ch === null)}>
          전체
        </button>
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setCh(ch === k ? null : k)}
            aria-pressed={ch === k}
            className={chip(ch === k)}
          >
            {k}
          </button>
        ))}
      </div>

      <p className="kr mt-4 text-sm text-faint" aria-live="polite">
        {shown.length === terms.length ? `${terms.length}개 용어` : `${shown.length}개 찾음`}
      </p>

      {shown.length === 0 ? (
        <p className="kr mt-6 rounded-2xl bg-surface p-6 text-[15px] leading-7 text-muted ring-1 ring-line">
          찾는 용어가 아직 없습니다. 진료 때 물어봐 주시면 설명드리고, 자주 묻는 말은 사전에 더해 두겠습니다.
        </p>
      ) : (
        <div className="mt-6 grid gap-8">
          {groups.map(([k, list]) => (
            <div key={k}>
              <h3 className="font-serif text-xl font-bold text-herb">{k}</h3>
              <div className="mt-2 border-t border-line">
                {list.map((t) => (
                  <Link key={t.slug} href={`/glossary/${t.slug}`} className="group block border-b border-line py-4">
                    <span className="kr block text-[17px] font-bold leading-snug group-hover:text-herb">
                      {t.term}
                      {t.aka.length > 0 && (
                        <span className="ml-2 text-[14px] font-normal text-faint">{t.aka.slice(0, 2).join(" · ")}</span>
                      )}
                    </span>
                    <span className="kr mt-1 block text-[15px] leading-7 text-muted">{t.short}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
