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
    const watch = (selector: string, cls: string, stagger = false) => {
      const els = document.querySelectorAll(selector);
      if (!els.length) return;
      const io = new IntersectionObserver(
        (entries) => {
          // 같이 들어온 것들끼리는 위에서 아래로, 왼쪽에서 오른쪽으로 차례를 준다.
          // 한 줄에 놓인 칸 여섯이 동시에 뜨면 움직임이 아니라 화면 전환으로 보인다
          const hits = entries
            .filter((e) => e.isIntersecting)
            .sort(
              (a, b) =>
                a.boundingClientRect.top - b.boundingClientRect.top ||
                a.boundingClientRect.left - b.boundingClientRect.left,
            );
          hits.forEach((e, i) => {
            if (stagger) {
              // 한 묶음이 길어도 기다림이 늘어지지 않게 여섯 번째에서 멈춘다
              const el = e.target as HTMLElement;
              el.style.setProperty("--d", `${Math.min(i, 5) * 90}ms`);
            }
            e.target.classList.add(cls);
            io.unobserve(e.target);
          });
        },
        // 화면 밑단이 아니라 아래에서 4분의 1쯤 올라온 자리에서 켠다.
        // 가장자리에서 켜면 눈에 띄지 않는 곳에서 재생이 끝나 버려,
        // 정작 읽는 자리에 왔을 때는 이미 다 떠 있다.
        // 비율은 크기가 아니라 위치에만 쓴다. 칸 크기로 걸면 큰 칸이
        // 화면에 들어왔는데도 기준을 못 넘겨 빈 자리로 남는다
        { threshold: 0, rootMargin: "0px 0px -24% 0px" },
      );
      els.forEach((el) => io.observe(el));
      observers.push(io);
    };

    watch(".rise", "on", true);
    watch(".ring-host", "ring-go");

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}
