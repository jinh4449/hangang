"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/content/nav";
import { CLINIC } from "@/content/clinic";
import { ClinicStatus } from "./clinic-status";

/**
 * 좁은 화면의 메뉴.
 *
 * 가로가 1024px 밑으로 내려가면 헤더의 다섯 메뉴가 전부 숨는다. 자리가 없어서인데,
 * 그 자리에 아무것도 두지 않으면 헤더에 로고와 예약 버튼만 남아 메뉴가 사라진 것처럼 보인다.
 * 실제로도 사라진 것이라, 그 화면의 방문자는 푸터까지 내려가야 다른 페이지로 갈 수 있었다.
 *
 * 그래서 같은 메뉴를 접었다 펴는 형태로 둔다. 헤더는 어느 폭에서도 갈 곳을 알려 준다.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // 페이지를 옮기면 닫는다. 열어 둔 채로 넘어가면 새 페이지를 가린다
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    // 뒤 페이지가 같이 밀리지 않게 잠근다
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        className="press grid h-10 w-10 place-items-center rounded-full text-ink ring-1 ring-line"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          {open ? (
            <path
              d="m6 6 12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open && (
        /* 헤더 높이를 숫자로 적지 않는다. 헤더 자신을 기준으로 바로 아래에 붙인다 */
        <>
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="absolute inset-x-0 top-full h-[100dvh] bg-ink/25"
          />
          <div
            id="mobile-nav"
            className="absolute inset-x-0 top-full max-h-[82dvh] overflow-y-auto border-b border-line bg-surface px-[clamp(1.25rem,4vw,4rem)] pb-28 pt-6"
          >
            <ClinicStatus />
            <nav aria-label="전체 메뉴" className="mt-5 grid gap-7">
              {NAV.map((entry) => (
                <div key={entry.label}>
                  <Link
                    href={entry.href}
                    className="kr block text-[17px] font-bold"
                    onClick={() => setOpen(false)}
                  >
                    {entry.label}
                  </Link>
                  <div className="mt-3 grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
                    {entry.groups
                      .flatMap((g) => g.links)
                      .map((l) => (
                        <Link
                          key={l.href + l.label}
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="kr text-[16px] text-muted"
                        >
                          {l.label}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </nav>
            <p className="kr mt-8 border-t border-line pt-5 text-[15px] text-muted">
              {CLINIC.address}
              <span className="block">{CLINIC.transit}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
