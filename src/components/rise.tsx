"use client";

import { useEffect } from "react";

/**
 * 솟아오르는 요소들을 켠다.
 *
 * 화면에 들어오면 표시를 붙이고 관찰을 뗀다. 재생은 CSS 가 스스로 하고
 * 한 번 올라온 것은 다시 내려가지 않는다.
 *
 * 스크롤 위치에 재생을 물리는 방법도 있지만 쓰지 않는다. 그러면 스크롤을
 * 멈춘 자리에 따라 글자가 반쯤 가려진 채로 남는다.
 *
 * 원 그래픽도 같은 방식으로 화면에 들어올 때 한 번 돈다.
 */
export function RiseInit() {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const watch = (selector: string, cls: string) => {
      const els = document.querySelectorAll(selector);
      if (!els.length) return;
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.classList.add(cls);
            io.unobserve(e.target);
          }
        },
        // 화면에 조금이라도 걸치면 바로 켠다. 비율로 걸어 두면 큰 칸이
        // 화면에 들어왔는데도 기준을 못 넘겨 빈 자리로 남는다
        { threshold: 0, rootMargin: "0px 0px -40px 0px" },
      );
      els.forEach((el) => io.observe(el));
      observers.push(io);
    };

    watch(".rise", "on");
    watch(".ring-host", "ring-go");

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}
