# 약침 할인이벤트 안내 이미지

원내 게시물(약침 할인이벤트 안내판)을 그대로 옮긴 이미지다.
**날짜(시행일) 문구는 뺐다** — 시행일이 바뀌어도 그대로 쓸 수 있게 하기 위해서다.

- `yakchim-event.html` — 원본. 문구·금액을 고칠 때 이 파일만 고친다.
- `yakchim-event.png` — 3000×1980 (1500×990 @2x)

## 다시 뽑는 법

한글 폰트(Noto Sans KR)가 `~/.fonts` 에 있어야 한다. 없으면 먼저 받는다.

```bash
curl -s "https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700,900&subset=korean" -A "" -o /tmp/kr.css
mkdir -p ~/.fonts && i=0; for w in 400 700 900; do
  i=$((i+1)); u=$(grep -o "https://[^)]*" /tmp/kr.css | sed -n "${i}p")
  curl -s -o ~/.fonts/NotoSansKR-$w.ttf "$u"
done && fc-cache -f
```

`html { zoom: 2 }` 로 2배 확대해 두었으므로 창 크기도 2배(3000×1980)로 준다.
`--force-device-scale-factor=2` 를 쓰면 아래쪽이 잘린다.

```bash
/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
  --headless=new --no-sandbox --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=3000,1980 \
  --virtual-time-budget=5000 \
  --screenshot=tools/poster/yakchim-event.png \
  file://$PWD/tools/poster/yakchim-event.html
```

높이를 바꿨다면 `body { height }` 값과 `--window-size` 의 세로값(= height × 2)을 같이 맞춘다.
