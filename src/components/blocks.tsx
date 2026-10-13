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
                <span className="kr text-[21px] font-bold leading-snug tracking-tight sm:text-[23px]">
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
              {b.text}
            </p>
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
                  <span>{it}</span>
                </li>
              ))}
            </ul>
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
            <p className="kr mt-2 text-[15.5px] leading-8 text-ink/85">{b.text}</p>
          </aside>
        );
      })}
    </div>
  );
}

/** 읽는 데 걸리는 시간. 한국어는 분당 약 500자로 잡는다 */
export function readingMinutes(blocks: Block[]) {
  const chars = blocks.reduce((n, b) => {
    if (b.t === "ul") return n + b.items.join("").length;
    if (b.t === "note") return n + b.title.length + b.text.length;
    return n + b.text.length;
  }, 0);
  return Math.max(1, Math.round(chars / 500));
}
