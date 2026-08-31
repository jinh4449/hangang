import Link from "next/link";
import { AREAS } from "@/content/area";

/** 가까운 곳부터. 자기 동네를 위쪽에서 찾게 된다 */
const NEAR_FIRST = [...AREAS].sort((a, b) => a.minutes - b.minutes);

/**
 * 동네 목록.
 *
 * 「어느 동네에서 오시나요?」에 답을 고르는 자리다. 권역으로 나누거나
 * 소요 시간을 같이 적으면 고르기 전에 읽을 것이 늘어난다. 여기서는
 * 이름만 늘어놓고, 시간은 들어간 페이지에서 크게 보여 준다.
 *
 * @param exclude 지금 보고 있는 동네. 자기 자신으로 가는 링크는 빼둔다
 */
export function AreaChips({ exclude }: { exclude?: string }) {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {NEAR_FIRST.filter((a) => a.slug !== exclude).map((a) => (
        <li key={a.slug}>
          <Link
            href={`/area/${a.slug}`}
            className="tile block bg-surface px-4 py-3.5 text-center"
          >
            <span className="kr text-[15px] font-semibold">{a.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** 동네 수. 안내 문구에 손으로 적어 두면 목록을 늘릴 때 어긋난다 */
export const AREA_COUNT = AREAS.length;
