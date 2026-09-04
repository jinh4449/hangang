# 약침 할인이벤트 안내 이미지

원내 게시물의 내용을 옮긴 안내 이미지다. 원본에서 아래 세 가지는 뺐다.

- **시행일**("3월 18일부터") — 날짜가 없어야 시행일이 바뀌어도 계속 쓸 수 있다
- **30% 할인(10회) 항목** — 남은 혜택은 `1회 무료시술` 하나뿐이라 표가 아니라 목록으로 짰다
- **10회 결제 시 한 달 무제한 약침치료** 문구

남긴 문구·금액은 원본 그대로다. `25,000원 (5+1회)` 의 표기만 `25,000원` + `5 + 1회 선결제` 로 나눠 배치했다.

- `yakchim-event.html` — 문구·금액 수정용 원본
- `yakchim-event.png` — 2400×3000 (1200×1500 @2x). 4:5 세로라 인쇄물·인스타그램·카카오톡에 그대로 쓸 수 있다

전부 고딕(Noto Sans KR)이다. 명조는 쓰지 않는다 — 한의원 안내물이 옛날 느낌으로 읽히기 쉬워서다.
큰 제목은 900(Black)에 자간을 -0.05em 까지 좁혀 요즘 톤을 냈다.
옥색은 `src/app/globals.css` 의 `--herb` 계열과 같은 값이다.

## 다시 뽑는 법

한글 폰트가 `~/.fonts` 에 있어야 한다. 없으면 먼저 받는다.

```bash
curl -s "https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700,900&subset=korean" -A "" -o /tmp/kr.css
mkdir -p ~/.fonts && i=0; for w in 400 700 900; do
  i=$((i+1)); u=$(grep -o "https://[^)]*" /tmp/kr.css | sed -n "${i}p")
  curl -s -o ~/.fonts/NotoSansKR-$w.ttf "$u"
done && fc-cache -f
```

`html { zoom: 2 }` 로 2배 확대해 두었으므로 창 크기도 2배로 준다.
`--force-device-scale-factor=2` 를 쓰면 아래쪽이 잘린다.

```bash
/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
  --headless=new --no-sandbox --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=2400,3000 \
  --virtual-time-budget=6000 \
  --screenshot=tools/poster/yakchim-event.png \
  file://$PWD/tools/poster/yakchim-event.html
```

문구를 늘려 아래가 잘리면 `body { height }` 와 `--window-size` 의 세로값(= height × 2)을 같이 키운다.
