# 로고 원본

| 파일 | 무엇 |
|---|---|
| `logo.ai` | 디자이너가 준 원본. 일러스트레이터 파일이지만 속은 PDF 다 |
| `mark.svg` | 그중 심벌만 뽑아 100×100 으로 맞춘 것. 원본 청록(`#0A777E`) |

이 폴더는 **홈페이지에 올라가지 않는다.** 보관용이다.
화면에 쓰는 것은 `src/components/logo.tsx` 의 `LogoMark` 이고,
브라우저 탭 아이콘은 `src/app/icon.svg`, 홈 화면 아이콘은 `src/app/apple-icon.tsx` 다.
셋 다 같은 경로를 쓰므로 **한쪽만 고치면 서로 다른 그림이 된다.**

## 색

| 쓰임 | 색 |
|---|---|
| 로고 원본 | `#0A777E` 청록 |
| 홈페이지 | `#1E5B45` 초록 (`--herb`) |

홈페이지에서는 원본 청록을 쓰지 않는다. 사이트 전체가 `#1E5B45` 로 짜여 있어
청록을 섞으면 두 초록이 부딪힌다. 아이콘은 초록 판에 흰 마크로 뒤집어 쓴다.

## 경로를 다시 뽑아야 하면

`logo.ai` 안의 벡터를 그대로 꺼내는 방법이다. 눈으로 그리지 말 것.

```bash
pip install pymupdf
```

```python
import pymupdf
d = pymupdf.open("brand/logo.ai")
p = d[0]
# 좌상단 심벌만 고른다. 페이지에 로고 변형이 여섯 벌 들어 있다
box = pymupdf.Rect(240, 175, 356, 275)
paths = [g for g in p.get_drawings() if box.contains(g["rect"])]
# g["items"] 의 ("l", a, b) 와 ("c", a, c1, c2, b) 를 SVG 의 L·C 로 옮긴다
```

심벌은 채움(fill) 도형 5개로 되어 있고 선(stroke)은 없다.
고리 모양인 바깥 원 때문에 `fill-rule="evenodd"` 가 필요하다.

## 획을 굵게 하고 싶으면

마크는 선이 아니라 **채운 도형**이라 굵기 값이 따로 없다.
`LogoMark` 의 `weight` 로 같은 색 테두리를 덧대 바깥으로 불린다.

```tsx
<LogoMark weight={2} />   // 헤더에서 쓰는 값
```

0 이 원본 그대로다. 3 을 넘기면 「ㅎ」의 빈 곳이 메워져 뭉갠다.
