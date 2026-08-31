import Link from "next/link";
import { AREAS, AREA_GROUPS, areasIn } from "@/content/area";

/**
 * 동네 목록.
 *
 * 「어느 동네에서 오시나요?」에 답을 고르는 자리다. 이름만 늘어놓으면
 * 어디를 눌러야 할지는 알아도 얼마나 걸리는지는 들어가 봐야 안다.
 * 그래서 칩에 소요 시간을 같이 찍는다. 누르기 전에 답이 보이게 한다.
 *
 * @param exclude 지금 보고 있는 동네. 자기 자신으로 가는 링크는 빼둔다
 */
export function AreaChips({ exclude }: { exclude?: string }) {
  return (
    <div className="grid gap-7">
      {AREA_GROUPS.map((g) => {
        const list = areasIn(g).filter((a) => a.slug !== exclude);
        if (!list.length) return null;
        return (
          <div key={g}>
            <p className="kr text-[12px] font-medium uppercase tracking-[0.15em] text-faint">{g}</p>
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {list.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/area/${a.slug}`}
                    className="tile flex items-baseline justify-between gap-2 bg-surface px-4 py-3.5"
                  >
                    <span className="kr text-[15px] font-semibold">{a.name}</span>
                    <span className="kr shrink-0 text-[13px] text-faint">{a.chip}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/** 동네 수. 안내 문구에 손으로 적어 두면 목록을 늘릴 때 어긋난다 */
export const AREA_COUNT = AREAS.length;
