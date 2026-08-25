# 홈페이지 미리보기 만들기

49개 페이지를 **아티팩트 한 장**으로 묶어 배포 없이 확인할 수 있게 한다.
링크 하나로 전체 사이트를 열람하고, 우측 하단 드롭다운으로 페이지를 옮긴다.

## 쓰는 법

```bash
npm run dev &                      # 미리보기는 실행 중인 서버를 크롤한다
node tools/preview/crawl.mjs       # 렌더된 HTML + CSS 수집 → .cache/crawl.json
python3 tools/preview/build.py     # 폰트 서브셋 + 조립 → .cache/preview.html
```

나온 `.cache/preview.html` 을 아티팩트로 게시한다. **항상 같은 URL 에 덮어써야**
북마크가 유지된다 — 새로 게시하면 별도 아티팩트가 생긴다.

특정 페이지만 볼 때는 경로를 직접 넘긴다.

```bash
node tools/preview/crawl.mjs '["/","/cost","/reservation"]'
```

## 필요한 것

| | 설치 |
|---|---|
| playwright-core | `npm i -D playwright-core` (크로미움 경로는 `PLAYWRIGHT_CHROMIUM`) |
| fonttools · brotli | `pip install fonttools brotli` |

`PREVIEW_ORIGIN` 으로 서버 주소를 바꿀 수 있다. 기본값은 `http://localhost:3000`.

## 알아둘 제약

- **지도 iframe 은 뜨지 않는다.** 아티팩트 CSP 가 외부 프레임을 막아서, 자리에
  안내 문구만 남긴다. 실제 사이트에서는 정상 표시된다.
- **모바일 토글은 없다.** CSS 미디어 쿼리는 컨테이너가 아니라 실제 뷰포트 폭을
  읽어서, 무대를 좁혀도 모바일 레이아웃이 발동하지 않는다. 브라우저 창을
  좁혀서 확인한다.
- **정지 화면이다.** 스크롤 리빌과 진입 애니메이션은 최종 상태로 굳혀서 담는다.
- 폰트는 실제 쓰인 글자만 남긴다. 통째로 담으면 6MB 가 넘는다 (지금 약 1.6MB).

## 왜 이렇게 만들었나

한때 미리보기 무대가 `width:1280px` 로 고정돼 있어서, 넓은 화면에서 오른쪽이
비어 보였다. 사이트 코드가 아니라 껍데기의 문제라 아무리 고쳐도 그 화면은
바뀌지 않았다. 그래서 지금은 **껍데기가 폭을 일절 잡지 않는다.**
