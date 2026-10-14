import type { Block } from "@/content/types";

/**
 * 칼럼 본문 렌더러. 자유 HTML 을 두지 않아 글마다 형태가 흐트러지지 않는다.
 *
 * 소제목에는 01, 02 번호와 초록→황토 짧은 띠를 붙인다. 긴 글에서 지금
 * 어디쯤인지 눈으로 잡히게 하려는 것이다. 상자는 아래로 옅어지는
 * 그라데이션을 깔아, 흰 바탕에 선만 있을 때보다 덩어리로 읽히게 한다.
 *
 * @param numbered 소제목에 번호를 붙일지. 「김포한강한의원에서는」 처럼
 *                 상자 안에 들어가는 짧은 글에서는 끈다
 */
/** 글 안 강조 표시(**굵게**, ==굵게==)를 입힌다. 표시는 types.ts 의 Block 주석 참고 */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*.+?\*\*|==.+?==)/g);
  return (
    <>
      {parts.map((t, i) => {
        if (t.startsWith("**") && t.endsWith("**") && t.length > 4)
          return (
            <strong key={i} className="font-bold text-ink">
              {t.slice(2, -2)}
            </strong>
          );
        if (t.startsWith("==") && t.endsWith("==") && t.length > 4)
          return (
            <strong key={i} className="font-bold text-ink">
              {t.slice(2, -2)}
            </strong>
          );
        return t;
      })}
    </>
  );
}

export function Blocks({ blocks, numbered = true }: { blocks: Block[]; numbered?: boolean }) {
  // 소제목 번호. 렌더 중에 세지 않고 먼저 매겨 둔다
  const nth = blocks.map((b, i) => blocks.slice(0, i + 1).filter((x) => x.t === "h").length);
  return (
    <div className="mt-10 flex flex-col gap-5">
      {blocks.map((b, i) => {
        if (b.t === "h") {
          return (
            <h2 key={i} className="mt-8 first:mt-0">
              <span className="flex items-baseline gap-3">
                {numbered && (
                  <span className="font-display text-[15px] font-semibold tabular-nums text-ochre">
                    {String(nth[i]).padStart(2, "0")}
                  </span>
                )}
                <span className="kr text-[18px] font-bold leading-snug tracking-tight sm:text-[20px]">
                  {b.text}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="mt-3 block h-[3px] w-14 rounded-full bg-gradient-to-r from-herb to-grad-b"
              />
            </h2>
          );
        }
        if (b.t === "p")
          return (
            <p key={i} className="kr max-w-[58ch] text-[16.5px] leading-8 text-ink/85">
              <Rich text={b.text} />
            </p>
          );
        if (b.t === "summary")
          return (
            <aside
              key={i}
              className="max-w-[58ch] rounded-2xl border border-herb-line/60 border-l-[6px] border-l-herb-light bg-gradient-to-br from-tint via-tint/50 to-surface p-6"
            >
              <p className="kr font-bold text-herb">{b.title ?? "3줄 요약"}</p>
              <ul className="mt-3 flex flex-col gap-3">
                {b.items.map((it) => (
                  <li key={it} className="kr flex gap-3 text-[16px] leading-8 text-ink/85">
                    <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-ochre/70" aria-hidden="true" />
                    <span>
                      <Rich text={it} />
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          );
        if (b.t === "ol")
          return (
            <ol key={i} className="flex max-w-[58ch] flex-col gap-3">
              {b.items.map((it, j) => (
                <li key={it} className="kr flex gap-3 text-[16px] leading-8 text-ink/85">
                  <span
                    className="font-display mt-[0.3rem] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ochre-soft text-[13px] font-semibold text-ochre ring-1 ring-ochre-line"
                    aria-hidden="true"
                  >
                    {j + 1}
                  </span>
                  <span>
                    <Rich text={it} />
                  </span>
                </li>
              ))}
            </ol>
          );
        if (b.t === "ul")
          return (
            <ul
              key={i}
              className="flex max-w-[58ch] flex-col gap-2.5 rounded-2xl bg-gradient-to-br from-surface-2 to-surface p-5 ring-1 ring-line"
            >
              {b.items.map((it) => (
                <li key={it} className="kr flex gap-3 text-[16px] leading-8 text-ink/85">
                  <span
                    className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-herb to-herb-light"
                    aria-hidden="true"
                  />
                  <span>
                    <Rich text={it} />
                  </span>
                </li>
              ))}
            </ul>
          );
        if (b.t === "table")
          return (
            <figure key={i} className="max-w-[58ch]">
              {b.title && (
                <figcaption className="kr mb-2 text-[15px] font-bold text-herb">{b.title}</figcaption>
              )}
              <div className="overflow-x-auto rounded-2xl ring-1 ring-line">
                <table className="kr w-full border-collapse text-left text-[14.5px] leading-7 sm:text-[15px]">
                  <thead>
                    <tr className="bg-gradient-to-r from-herb to-herb-light text-white">
                      {b.head.map((h) => (
                        <th key={h} scope="col" className="px-3 py-3 font-bold sm:px-4">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r) => (
                      <tr key={r[0]} className="border-t border-line odd:bg-surface even:bg-surface-2">
                        {r.map((c, j) =>
                          j === 0 ? (
                            <th key={j} scope="row" className="px-3 py-3 align-top font-bold text-ink sm:px-4">
                              <Rich text={c} />
                            </th>
                          ) : (
                            <td key={j} className="px-3 py-3 align-top text-ink/85 sm:px-4">
                              <Rich text={c} />
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </figure>
          );
        if (b.t === "steps")
          return (
            <ol key={i} className="flex max-w-[58ch] flex-col gap-4 rounded-2xl bg-gradient-to-br from-surface-2 to-surface p-5 ring-1 ring-line">
              {b.items.map((it, j) => (
                <li key={it.title} className="flex gap-4">
                  <span
                    className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-herb to-herb-light text-[15px] font-semibold text-white"
                    aria-hidden="true"
                  >
                    {j + 1}
                  </span>
                  <span className="kr text-[16px] leading-8 text-ink/85">
                    <strong className="text-ink">{it.title}</strong>
                    <br />
                    <Rich text={it.text} />
                  </span>
                </li>
              ))}
            </ol>
          );
        // note
        const box = {
          warn: "border-rust-line bg-gradient-to-br from-rust-soft to-surface",
          check: "border-ochre-line bg-gradient-to-br from-ochre-soft via-ochre-soft/60 to-surface",
          info: "border-herb-line/70 bg-gradient-to-br from-tint via-tint/60 to-surface",
        }[b.tone];
        const ink = { warn: "text-rust", check: "text-ochre", info: "text-herb" }[b.tone];
        const dot = { warn: "bg-rust", check: "bg-ochre", info: "bg-herb" }[b.tone];
        return (
          <aside key={i} className={"rounded-2xl border p-6 shadow-[0_12px_30px_-22px_rgba(23,26,24,0.25)] " + box}>
            <p className={"kr flex items-center gap-2.5 font-bold " + ink}>
              <span className={"h-2 w-2 shrink-0 rounded-full " + dot} aria-hidden="true" />
              {b.title}
            </p>
            <p className="kr mt-2 text-[15.5px] leading-8 text-ink/85">
              <Rich text={b.text} />
            </p>
          </aside>
        );
      })}
    </div>
  );
}

/** 읽는 데 걸리는 시간. 한국어는 분당 약 500자로 잡는다 */
export function readingMinutes(blocks: Block[]) {
  const chars = blocks.reduce((n, b) => {
    if (b.t === "ul" || b.t === "ol" || b.t === "summary") return n + b.items.join("").length;
    if (b.t === "note") return n + b.title.length + b.text.length;
    if (b.t === "table") return n + [...b.head, ...b.rows.flat()].join("").length;
    if (b.t === "steps") return n + b.items.map((x) => x.title + x.text).join("").length;
    return n + b.text.length;
  }, 0);
  return Math.max(1, Math.round(chars / 500));
}
