"use client";

import { useEffect, useRef, useState } from "react";
import { CLINIC } from "@/content/clinic";

/**
 * 주차장 안내.
 *
 * 주차장 이름만 적어 두면 결국 다시 찾아봐야 한다. 주소를 같이 적고,
 * 눌러서 바로 복사되게 한다. 내비게이션에 붙여 넣는 것이 마지막 동작이다.
 *
 * 주소를 아직 확인하지 못한 곳은 지어내지 않는다. 잘못된 주소는 없는 것보다
 * 나쁘다 — 그대로 내비게이션에 찍혀 엉뚱한 곳으로 간다. 그런 곳은 지도 검색으로 보낸다.
 */
export function ParkingList() {
  return (
    <ul className="grid gap-2 sm:grid-cols-3">
      {CLINIC.parkingList.map((pk) => (
        <li key={pk.name} className="rounded-2xl bg-surface p-1.5 ring-1 ring-line">
          <div className="px-3.5 pb-1 pt-3 text-center">
            <span className="kr text-[15px] font-semibold">{pk.name}</span>
          </div>
          {pk.address ? (
            <CopyAddress address={pk.address} />
          ) : (
            <a
              href={`https://map.naver.com/p/search/${encodeURIComponent(`김포 ${pk.name}`)}`}
              target="_blank"
              rel="noopener"
              className="kr block rounded-xl px-3.5 py-2.5 text-center text-[13px] text-muted transition-colors hover:bg-tint hover:text-herb"
            >
              지도에서 보기
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

/** 눌리면 주소를 복사하고, 복사됐다는 것을 잠깐 보여 준다 */
function CopyAddress({ address }: { address: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 화면에서 사라진 뒤에 상태를 건드리지 않도록 정리한다
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      // https 가 아니거나 오래된 브라우저. 옛 방식으로 한 번 더 시도한다
      const ta = document.createElement("textarea");
      ta.value = address;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } finally {
        ta.remove();
      }
    }
    setDone(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group block w-full rounded-xl px-3.5 py-2.5 text-center transition-colors hover:bg-tint"
    >
      <span className="kr block text-[13px] leading-5 text-muted group-hover:text-ink">
        {address}
      </span>
      {/* 손가락으로 쓰는 화면에는 마우스를 올려 보는 동작이 없다.
          안내를 숨겨 두면 누를 수 있다는 것을 알 방법이 없어 늘 보여 준다 */}
      <span
        aria-live="polite"
        className={
          "kr mt-1 block text-[12px] font-medium " +
          (done ? "text-herb" : "text-faint")
        }
      >
        {done ? "복사했습니다" : "눌러서 주소 복사"}
      </span>
    </button>
  );
}
