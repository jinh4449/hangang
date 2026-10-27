"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * 네이버 애널리틱스.
 *
 * 네이버가 주는 코드는 페이지를 열 때 wcs_do() 를 한 번 부르는 꼴이다. 이 사이트는
 * 링크를 누르면 페이지를 새로 불러오지 않고 화면만 바꾸므로, 그대로 붙이면 처음
 * 연 페이지만 잡힌다. 그래서 주소가 바뀔 때마다 다시 부른다.
 *
 * 발급 ID 는 네이버 애널리틱스 → 사이트정보수정에 나온 값이다. 비밀 값이 아니라
 * 누구나 페이지 소스에서 볼 수 있는 값이다.
 */
const NAVER_WA = "bc9924678e0bb0";

type Wcs = { inflow?: (domain?: string) => void };
declare global {
  interface Window {
    wcs?: Wcs;
    wcs_add?: Record<string, string>;
    wcs_do?: () => void;
  }
}

function send() {
  if (!window.wcs_add) window.wcs_add = {};
  window.wcs_add["wa"] = NAVER_WA;
  if (window.wcs && window.wcs_do) window.wcs_do();
}

export function NaverAnalytics() {
  const pathname = usePathname();

  // 링크로 옮겨 간 페이지. 첫 페이지는 스크립트가 다 받아진 뒤 onLoad 에서 보낸다
  useEffect(() => {
    send();
  }, [pathname]);

  return <Script src="https://wcs.pstatic.net/wcslog.js" strategy="afterInteractive" onLoad={send} />;
}
