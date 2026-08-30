"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * 솟아오르는 요소들을 켠다.
 *
 * 재생은 CSS 가 스크롤 위치에 물려서 한다. 여기서는 두 가지만 맡는다.
 *
 * 하나, 화면보다 큰 덩어리를 골라 둔다. 그런 것은 가리개를 쓰면 끝까지
 * 올라오지 못해 반쯤 가려진 채로 남는다.
 *
 * 둘, 스크롤 연동을 모르는 브라우저를 위해 표시를 붙여 둔다. 어느 쪽을
 * 쓸지는 여기서 고르지 않는다. 표시는 늘 붙이고 CSS 가 덮어쓴다.
 *
 * 원 그래픽은 스크롤에 물리지 않는다. 원을 그리는 것 자체가 등장 동작이라
 * 화면에 들어올 때 한 번 돌면 된다.
 *
 * 페이지를 옮길 때마다 다시 세운다. 이건 레이아웃에 있어서 링크로 이동해도
 * 다시 마운트되지 않는다. 한 번만 세우면 처음 연 페이지의 글자만 켜지고,
 * 그 뒤에 링크로 들어간 페이지의 글자는 아무도 켜 주지 않아 숨은 채로 남는다.
 */
export function RiseInit() {
  // 주소가 바뀌면 그 페이지의 요소를 새로 찾아 관찰한다
  const pathname = usePathname();

  useEffect(() => {
    /* 화면보다 큰 덩어리를 골라 둔다. 제 높이만큼 밀어 두면 화면 안에서는
       끝까지 올라올 수가 없어, 스크롤이 끝나도 반쯤 가려진 채로 남는다.
       그런 것들은 가리지 않고 살짝 들어 올리기만 한다. 창 크기가 바뀌면
       기준도 바뀌므로 다시 센다 */
    const markTall = () => {
      // 화면 절반을 넘는 것부터. 큰 칸일수록 올라올 거리가 길어 늦게 끝나는데,
      // 늦게 끝나면 읽는 자리에 들어와서까지 반쯤 가려져 있다
      const limit = window.innerHeight * 0.55;
      document.querySelectorAll<HTMLElement>(".rise").forEach((el) => {
        el.classList.toggle("rise-tall", el.getBoundingClientRect().height > limit);
      });
    };
    markTall();
    window.addEventListener("resize", markTall);

    const observers: IntersectionObserver[] = [];
    const watch = (selector: string, cls: string, stagger = false) => {
      const els = document.querySelectorAll(selector);
      if (!els.length) return;
      const io = new IntersectionObserver(
        (entries) => {
          // 같이 들어온 것들끼리는 위에서 아래로, 왼쪽에서 오른쪽으로 차례를 준다.
          // 스크롤에 물리는 브라우저에서는 스크롤 위치가 이미 차례를 정하므로
          // 이 지연은 무시된다. 관찰자로 도는 브라우저에서만 쓰인다
          const hits = entries
            .filter((e) => e.isIntersecting)
            .sort(
              (a, b) =>
                a.boundingClientRect.top - b.boundingClientRect.top ||
                a.boundingClientRect.left - b.boundingClientRect.left,
            );
          hits.forEach((e, i) => {
            const el = e.target as HTMLElement;
            // 화면에서 이미 차례를 정해 둔 것은 그대로 둔다
            if (stagger && !el.style.getPropertyValue("--d")) {
              el.style.setProperty("--d", `${Math.min(i, 5) * 90}ms`);
            }
            e.target.classList.add(cls);
            io.unobserve(e.target);
          });
        },
        { threshold: 0, rootMargin: "0px 0px -12% 0px" },
      );
      els.forEach((el) => io.observe(el));
      observers.push(io);
    };

    watch(".rise", "on", true);
    watch(".seq", "on");
    watch(".ring-host", "ring-go");

    return () => {
      window.removeEventListener("resize", markTall);
      observers.forEach((o) => o.disconnect());
    };
  }, [pathname]);

  return null;
}
