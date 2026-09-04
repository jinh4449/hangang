# 약침 할인이벤트 안내 이미지 (A4 가로)

원내 게시물의 내용을 옮긴 안내 이미지다. 원본에서 아래 두 가지는 뺐다.

- **시행일**("3월 18일부터") — 날짜가 없어야 시행일이 바뀌어도 계속 쓸 수 있다
- **10회 결제 시 한 달 무제한 약침치료** 문구

시술 두 가지(소염·특수) × 혜택 두 가지(1회 무료시술·30% 할인)와 금액은 원본 그대로다.
`25,000원 (5+1회)` 는 금액과 횟수를 위아래로 나눠 배치했을 뿐 값은 같다.

하단의 "선결제 후 원하시는 혜택을 말씀해 주세요"는 원본에 없던 안내 문구다. 필요 없으면 `.tail` 문단을 지우면 된다.

- `yakchim-event.html` — 문구·금액 수정용 원본
- `yakchim-event.png` — 3507×2481. **A4 가로(297×210mm) 300dpi** 라 그대로 인쇄하면 된다

## 판형과 배율

`body` 를 1169×827px(A4 가로 @100dpi)로 잡고 `html { zoom: 3 }` 으로 300dpi를 만든다.
그래서 창 크기도 3배(3507×2481)로 줘야 한다. `--force-device-scale-factor` 로 키우면 아래가 잘린다.

다른 해상도가 필요하면 `zoom` 과 `--window-size` 를 같은 배수로 함께 바꾼다.
`zoom: 2` + `--window-size=2338,1654` 면 200dpi다.

## 로고

왼쪽 판의 로고는 심벌 + 「김포한강한의원」 + 영문 한 줄로 짠 것이다.
심벌 경로는 `brand/mark.svg` 의 벡터를 그대로 붙였다 — **눈으로 다시 그리지 말 것.**
원본을 다시 뽑는 방법은 `brand/README.md` 에 있다.

글자 부분은 원본 로고의 레터링이 아니라 Noto Sans KR 900 으로 짠 것이다.
정확한 워드마크가 필요하면 `brand/logo.ai` 에서 글자 벡터를 따로 뽑아 넣어야 한다.

색은 옥색 판 위라 흰색으로 뒤집었다. 원본 청록(`#0A777E`)은 쓰지 않는다 —
홈페이지가 `#1E5B45` 로 짜여 있어 두 초록이 부딪힌다(`brand/README.md`).

## 글꼴

전부 고딕(Noto Sans KR)이다. 명조는 쓰지 않는다 — 한의원 안내물이 옛날 느낌으로 읽히기 쉬워서다.
옥색은 `src/app/globals.css` 의 `--herb` 계열과 같은 값이다.
폰트가 `~/.fonts` 에 없으면 먼저 받는다.

```bash
curl -s "https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700,900&subset=korean" -A "" -o /tmp/kr.css
mkdir -p ~/.fonts && i=0; for w in 400 700 900; do
  i=$((i+1)); u=$(grep -o "https://[^)]*" /tmp/kr.css | sed -n "${i}p")
  curl -s -o ~/.fonts/NotoSansKR-$w.ttf "$u"
done && fc-cache -f
```

## 다시 뽑는 법

```bash
/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
  --headless=new --no-sandbox --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=3507,2481 \
  --virtual-time-budget=6000 \
  --screenshot=tools/poster/yakchim-event.png \
  file://$PWD/tools/poster/yakchim-event.html
```
