"use client";

import { useEffect, useState } from "react";
import { CLINIC } from "@/content/clinic";
import { MapPinIcon } from "./icons";

/**
 * 지도 삽입 틀.
 *
 * 지도는 남의 서버에서 온다. 차단하는 사내망이나 확장 프로그램을 쓰는 방문자에게는
 * 이 칸이 통째로 안 뜨는데, 그때 회색 상자에 깨진 문서 아이콘만 남으면
 * 「이 병원 홈페이지 고장 났다」로 읽힌다.
 *
 * iframe 의 onLoad 로는 이걸 가려낼 수 없다. 크로미움은 연결이 실패해도
 * 오류 화면을 「불러왔다」고 보고 load 를 쏜다. 교차 출처라 안을 들여다볼 수도 없다.
 *
 * 그래서 지도를 걸기 전에 작은 이미지 하나로 그 서버에 닿는지 먼저 물어본다.
 * 이미지의 onerror 는 연결 실패에 정직하게 반응한다.
 * 닿지 않으면 지도를 아예 걸지 않고, 주소와 길 안내를 그대로 보여 준다.
 */

const PROBE = "https://maps.gstatic.com/favicon.ico";

export function MapFrame() {
  const [reachable, setReachable] = useState<boolean | null>(null);
  const q = encodeURIComponent(`${CLINIC.address} ${CLINIC.name}`);

  useEffect(() => {
    const img = new Image();
    let done = false;
    const settle = (ok: boolean) => {
      if (!done) {
        done = true;
        setReachable(ok);
      }
    };
    img.onload = () => settle(true);
    img.onerror = () => settle(false);
    // 응답이 없는 채로 붙잡혀 있는 경우까지 포함해 끊는다
    const t = setTimeout(() => settle(false), 4000);
    img.src = `${PROBE}?_=${CLINIC.name.length}`;
    return () => {
      clearTimeout(t);
      img.onload = img.onerror = null;
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface-2">
      {/* 지도를 못 걸 때 남는 화면. 주소와 길 안내는 바로 아래에 그대로 있다 */}
      <div className="flex h-[22rem] flex-col items-center justify-center px-8 text-center">
        <MapPinIcon className="h-9 w-9 text-herb" />
        <p className="kr mt-4 text-lg font-bold">{CLINIC.name}</p>
        <p className="kr mt-2 max-w-[34ch] text-[16px] leading-7 text-muted">
          지도를 불러오지 못했습니다. 아래 주소와 지도 앱 버튼으로 길을 찾으실 수
          있습니다.
        </p>
      </div>

      {reachable && (
        <iframe
          title={`${CLINIC.name} 위치`}
          src={`https://www.google.com/maps?q=${q}&hl=ko&z=17&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 block h-full w-full border-0"
        />
      )}
    </div>
  );
}
