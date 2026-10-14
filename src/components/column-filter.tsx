"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";

/**
 * 원장 칼럼을 글쓴이로 거르는 단추.
 *
 * 카드는 서버에서 다 그려 넘긴다. 검색엔진과 AI 크롤러는 스크립트를 돌리지
 * 않으니 처음 화면에는 전체 목록이 있어야 한다. 단추는 그 위에서 숨기기만 한다.
 *
 * data-* 는 미리보기(tools/preview)용이다. 미리보기는 React 를 걷어낸 정지
 * 화면이라, 같은 거르기를 이 표시를 보고 작은 스크립트로 흉내 낸다.
 */
export function ColumnFilter({
  tabs,
  items,
}: {
  tabs: { key: string; label: string; photo?: string }[];
  items: { key: string; author: string; node: ReactNode }[];
}) {
  const [who, setWho] = useState("");

  // 한 덩어리 알약 안에서 고른 칸만 초록으로 채운다(세그먼트 단추)
  const seg = (on: boolean) =>
    "kr inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13.5px] font-medium transition-all " +
    (on ? "bg-herb text-white shadow-sm" : "text-muted hover:text-ink");

  return (
    <div data-column-filter>
      <div className="mt-10 flex justify-center">
        <div
          role="group"
          aria-label="원장별로 보기"
          className="inline-flex items-center gap-0.5 rounded-full bg-surface p-1 ring-1 ring-line"
        >
          {[{ key: "", label: "전체", photo: undefined }, ...tabs].map((t) => (
            <button
              key={t.key}
              type="button"
              data-author-btn={t.key}
              onClick={() => setWho(t.key)}
              aria-pressed={who === t.key}
              className={seg(who === t.key)}
            >
              {/* 원본이 상반신 세로 사진이라 얼굴 쪽으로 당겨 작은 원 안에서도 알아보게 한다 */}
              {t.photo && (
                <span className="h-5 w-5 shrink-0 overflow-hidden rounded-full bg-tint ring-1 ring-black/10">
                  <Image
                    src={t.photo}
                    width={60}
                    height={60}
                    alt=""
                    className="h-full w-full origin-[50%_12%] scale-[1.7] object-cover object-top"
                  />
                </span>
              )}
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {items.map((it) => (
          <div key={it.key} data-author={it.author} hidden={who !== "" && who !== it.author} className="flex">
            {it.node}
          </div>
        ))}
      </div>
    </div>
  );
}
