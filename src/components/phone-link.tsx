"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CLINIC } from "@/content/clinic";

/**
 * 전화번호 링크.
 *
 * `tel:` 는 전화 앱이 있는 기기에서만 열린다. PC 브라우저는 처리할 앱이 없어
 * 빈 창이나 오류 화면을 띄우는데, 그건 누른 사람 잘못이 아니라 링크 잘못이다.
 *
 * 그래서 누른 기기를 보고 갈라 준다.
 *   전화 앱이 있는 기기 — 그대로 tel: 로 넘겨 번호가 입력된 다이얼 화면을 띄운다
 *   PC               — 이동하지 않고 번호를 클립보드에 복사하고 그 사실을 알린다
 *
 * 판단은 클릭 시점에 한다. 렌더 시점에 기기를 물어보면 서버와 답이 달라져
 * 하이드레이션이 깨진다.
 *
 * href 는 두 경우 모두 tel: 로 둔다. 우클릭 복사와 스크린리더의 "전화 링크"
 * 안내가 여기서 나오기 때문에, 동작을 바꾼다고 href 까지 없애면 손해다.
 */

/** 전화 앱으로 넘길 수 있는 기기인가 */
function canDial() {
  if (typeof window === "undefined") return true;
  // 마우스가 있고 호버가 되는 기기 = PC. 그 외에는 전화 앱이 있다고 본다
  return !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // 보안 컨텍스트가 아니거나 권한이 없는 경우
    return false;
  }
}

export function PhoneLink({
  className = "",
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"a">) {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const show = (message: string) => {
    setToast(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2600);
  };

  return (
    <>
      <a
        {...rest}
        href={CLINIC.phoneHref}
        className={className}
        onClick={async (e) => {
          if (canDial()) return; // 전화 앱이 받는다
          e.preventDefault();
          show(
            (await copy(CLINIC.phone))
              ? `전화번호를 복사했습니다 · ${CLINIC.phone}`
              : `전화번호는 ${CLINIC.phone} 입니다`,
          );
        }}
      >
        {children ?? CLINIC.phone}
      </a>
      {toast !== null && <Toast>{toast}</Toast>}
    </>
  );
}

/**
 * 알림은 화면 아래에 고정한다.
 * 헤더처럼 backdrop-filter 가 걸린 조상 안에서는 fixed 의 기준이 그 조상으로
 * 바뀌므로, body 로 빼내지 않으면 엉뚱한 자리에 뜬다.
 */
function Toast({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className="phone-toast pointer-events-none fixed inset-x-0 bottom-8 z-[60] flex justify-center px-5"
    >
      <span className="kr rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper shadow-[var(--shadow-ambient)]">
        {children}
      </span>
    </div>,
    document.body,
  );
}
