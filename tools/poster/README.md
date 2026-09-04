# 약침 할인이벤트 안내 이미지 (A4 가로)

원내 게시물을 바탕으로 만든 안내 이미지다. 원본에서 아래 두 가지는 뺐다.

- **시행일**("3월 18일부터") — 날짜가 없어야 시행일이 바뀌어도 계속 쓸 수 있다
- **10회 결제 시 한 달 무제한 약침치료** 문구

- `yakchim-event.html` — 문구·금액 수정용 원본
- `yakchim-event.png` — 3507×2481. **A4 가로(297×210mm) 300dpi** 라 그대로 인쇄하면 된다

## 금액을 이렇게 적은 이유

우리 병원 값은 **일반 약침 1회 10,000원 / 특수 약침 1회 30,000원** 이다.
사진 속 원본 게시물의 금액(25,000·35,000…)은 다른 병원 것이라 쓰지 않는다.

혜택은 **묶음 결제 총액이 아니라 조건으로** 적었다.
`5회 결제하면 1회 무료시술`, `10회 결제하면 30% 할인` 이다.
1회 정가만 정해져 있으므로 총액(50,000원, 70,000원 …)은 계산해서 넣지 않는다 —
할인이 회당인지 총액인지, 무료 1회를 정가로 칠지에 따라 값이 달라진다.
총액을 적으려면 그 기준부터 정하고 `.perk` 문구를 고쳐야 한다.

효능 태그(염증제거·근육이완·통증완화)는 원본의 「소염 약침」에 붙어 있던 것을
그대로 「일반 약침」에 옮겼다. 맞지 않으면 `.for` 의 `<span>` 을 고친다.

## 문장은 한 줄을 넘지 않는다

모든 문장에 `.oneline`(`white-space: nowrap`)이 걸려 있다.
두 줄로 접히지 않는 대신 **문구를 늘리면 폭을 넘겨 잘린다.**
문구를 고쳤으면 반드시 다시 뽑아 눈으로 확인하고, 넘치면 그 줄의 글자 크기를 줄인다.

## 색과 결

캐주얼한 결로 잡았다. 연한 하늘색 종이(`#e7f2ff`) 위에 흰 카드를 얹고,
모서리를 크게 굴리고(카드 30px, 칸 20px), 강조는 노랑(`#ffd34d`) 하나로 준다.
제목의 노란 띠는 형광펜 자국처럼 글자 뒤에 깐 것이다(`h1 .hl::before`).

배경 동그라미는 `body::before/::after` 다. 본문보다 나중에 그려지므로
**본문 블록에는 `z-index: 1` 이 있어야 한다** — 빼면 꼬리말이 동그라미에 덮여 잘린다.

홈페이지 초록(`--herb`)이나 로고 원본 청록(`#0A777E`)과는 다른 팔레트다 —
이 인쇄물에만 쓰는 색이라 `globals.css` 와 맞출 필요가 없다.

## 로고

심벌 경로는 `brand/mark.svg` 의 벡터를 그대로 붙였다 — **눈으로 다시 그리지 말 것.**
다시 뽑는 방법은 `brand/README.md` 에 있다.
글자 부분은 원본 로고의 레터링이 아니라 Noto Sans KR 900 으로 짠 것이다.
정확한 워드마크가 필요하면 `brand/logo.ai` 에서 글자 벡터를 따로 뽑아 넣어야 한다.

## 글꼴

두 벌을 섞는다.

| 쓰임 | 글꼴 |
|---|---|
| 제목·시술명·금액·혜택 문구 (`.round`) | Jua — 둥근 한글 서체 |
| 안내문·태그·주의사항 | Noto Sans KR |

Jua 는 획이 굵고 자간이 넓어 **잔글씨에 쓰면 뭉갠다.** 큰 글자에만 `.round` 를 건다.
명조는 쓰지 않는다 — 안내물이 옛날 느낌으로 읽힌다.

폰트가 `~/.fonts` 에 없으면 먼저 받는다.

```bash
curl -s "https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700,900&subset=korean" -A "" -o /tmp/kr.css
mkdir -p ~/.fonts && i=0; for w in 400 700 900; do
  i=$((i+1)); u=$(grep -o "https://[^)]*" /tmp/kr.css | sed -n "${i}p")
  curl -s -o ~/.fonts/NotoSansKR-$w.ttf "$u"
done
curl -s "https://fonts.googleapis.com/css?family=Jua&subset=korean" -A "" -o /tmp/jua.css
curl -s -o ~/.fonts/Jua-Regular.ttf "$(grep -o 'https://[^)]*' /tmp/jua.css)"
fc-cache -f
```

## 다시 뽑는 법

`body` 는 1169×827px(A4 가로 @100dpi), `html { zoom: 3 }` 으로 300dpi를 만든다.
창 크기도 3배로 줘야 한다. `--force-device-scale-factor` 로 키우면 아래가 잘린다.
다른 해상도가 필요하면 `zoom` 과 `--window-size` 를 같은 배수로 함께 바꾼다.

```bash
/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
  --headless=new --no-sandbox --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=3507,2481 \
  --virtual-time-budget=6000 \
  --screenshot=tools/poster/yakchim-event.png \
  file://$PWD/tools/poster/yakchim-event.html
```
