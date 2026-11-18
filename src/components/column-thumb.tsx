import type { Column } from "@/content/types";
import { CLINIC } from "@/content/clinic";
import { LogoMark } from "./logo";

/**
 * 칼럼 카드의 글자 썸네일. 삽화 대신 제목을 크게 세운다.
 *
 * 원장님 요청(2026-11-18): 손으로 그린 삽화가 허술해 보인다. 제목이 곧
 * 환자가 검색한 말이라, 그림보다 제목이 먼저 보여야 자기 이야기인 줄 안다.
 *
 * 제목은 「검색어, 질문?」 꼴이라 쉼표 앞 검색어를 초록으로 짚고 나머지를 잇는다.
 * 쉼표가 없는 옛 제목은 통째로 세운다. 카드 폭이 화면마다 달라 글자 크기는
 * 컨테이너 폭(cqw)에 맞춘다. 같은 제목이 카드 글에도 있으므로 화면 읽기
 * 프로그램에는 숨긴다.
 */
export function ColumnThumb({
  column,
  showAuthor = true,
}: {
  column: Pick<Column, "title" | "authorKey">;
  /** 카드 아래에 이미 원장 사진·이름이 있으면 끈다 */
  showAuthor?: boolean;
}) {
  const i = column.title.indexOf(",");
  const lead = i > 0 ? column.title.slice(0, i + 1) : "";
  const rest = i > 0 ? column.title.slice(i + 1).trim() : column.title;
  const author =
    showAuthor && CLINIC.doctors.find((d) => d.key === column.authorKey);

  return (
    <div
      aria-hidden="true"
      className="@container relative aspect-[8/5] w-full overflow-hidden bg-tint"
    >
      {/* cqw 는 컨테이너의 내용 폭을 잰다. 바깥에 패딩을 주면 그만큼 글자가
          작아지므로, 패딩은 안쪽 판에 둔다 */}
      <div className="absolute inset-0 flex flex-col p-[7cqw]">
        <span className="pointer-events-none absolute -right-[14cqw] -top-[14cqw] h-[42cqw] w-[42cqw] rounded-full border-[3.2cqw] border-herb-line/70" />
        <span className="relative flex items-center gap-[1.6cqw] text-[3.6cqw] font-bold text-herb">
          <LogoMark className="h-[5cqw] w-[5cqw]" />
          원장 칼럼
        </span>
        <p className="kr relative mt-auto text-[7.2cqw] font-extrabold leading-[1.3] tracking-[-0.04em] text-ink">
          {lead && (
            <>
              <span className="text-herb [box-shadow:inset_0_-1.6cqw_0_var(--ochre-line)]">
                {lead}
              </span>
              <br />
            </>
          )}
          {rest}
        </p>
        {author && (
          <span className="relative mt-[3cqw] text-[3.4cqw] font-semibold text-muted">
            {author.name} {author.role}
          </span>
        )}
      </div>
    </div>
  );
}
