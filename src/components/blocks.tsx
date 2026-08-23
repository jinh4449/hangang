import type { Block } from "@/content/types";

/** 칼럼 본문 렌더러. 자유 HTML 을 두지 않아 글마다 형태가 흐트러지지 않는다 */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mt-10 flex flex-col gap-5">
      {blocks.map((b, i) => {
        if (b.t === "h")
          return (
            <h2 key={i} className="kr mt-6 text-xl font-bold tracking-tight">
              {b.text}
            </h2>
          );
        if (b.t === "p")
          return (
            <p key={i} className="kr max-w-[58ch] text-[16.5px] leading-8 text-ink/85">
              {b.text}
            </p>
          );
        if (b.t === "ul")
          return (
            <ul key={i} className="flex max-w-[58ch] flex-col gap-2.5">
              {b.items.map((it) => (
                <li key={it} className="kr flex gap-3 text-[16.5px] leading-8 text-ink/85">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-herb" aria-hidden="true" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          );
        // note
        const warn = b.tone === "warn";
        return (
          <aside
            key={i}
            className={
              "rounded-2xl border-l-[3px] p-6 " +
              (warn
                ? "border border-rust-line border-l-rust bg-rust-soft"
                : "border border-herb/15 border-l-herb bg-tint")
            }
          >
            <p className={"kr font-bold " + (warn ? "text-rust" : "text-herb")}>{b.title}</p>
            <p className="kr mt-2 text-[15px] leading-8">{b.text}</p>
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
