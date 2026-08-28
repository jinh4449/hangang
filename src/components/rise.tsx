"use client";

import { useEffect } from "react";

/**
 * 스크롤에 맞춰 떠오르는 요소들을 켠다.
 *
 * 요즘 브라우저는 CSS 만으로 스크롤 위치에 애니메이션을 물릴 수 있다
 * (animation-timeline: view()). 스크롤을 멈추면 애니메이션도 그 자리에 멈추고,
 * 천천히 내리면 천천히 떠오른다. 그때는 여기서 할 일이 없다.
 *
 * 그걸 모르는 브라우저를 위해 관찰자로도 한 번씩 켜 준다. 어느 쪽을 쓸지는
 * 여기서 고르지 않는다. 표시는 늘 붙이고, 스크롤 연동을 아는 브라우저에서는
 * CSS 가 그 표시를 덮어쓴다. 자바스크립트와 CSS 의 판단이 어긋나 글자가
 * 영영 안 보이는 경우를 아예 만들지 않기 위해서다.
 *
 * 원 그래픽은 방식과 무관하게 화면에 들어올 때 한 번 돌면 되므로 항상 관찰자로 켠다.
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
