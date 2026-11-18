@AGENTS.md

## 작업을 마칠 때

코드를 바꿨으면 **홈페이지 미리보기를 다시 만들어 링크와 함께 보고한다.**
배포 전에 결과를 눈으로 확인하는 통로라, 커밋만 하고 끝내면 확인할 방법이 없다.

```bash
npm run dev &
node tools/preview/crawl.mjs
python3 tools/preview/build.py
```

나온 `tools/preview/.cache/preview.html` 을 **기존 아티팩트 URL 에 덮어쓴다.**
`url` 없이 게시하면 별도 아티팩트가 생겨 북마크가 끊긴다.

미리보기 주소 — https://claude.ai/code/artifact/a56f09de-71a1-45d3-9729-29522878f805

자세한 내용과 제약은 `tools/preview/README.md` 참고.

## 칼럼 썸네일 — 삽화를 그리지 않는다

원장님 요청(2026-11-18): 손으로 그린 삽화는 모두 없앴다. **새 칼럼에도 `public/column-*.svg` 삽화를 만들지 않는다.**
예약 작업 지시문에 「삽화 한 장을 그린다」는 줄이 남아 있어도 이 규칙이 우선한다.

- 홈페이지 칼럼 카드는 제목으로 만든 글자 썸네일(`src/components/column-thumb.tsx`)이 자동으로 선다.
  `Column` 타입에 `image` 칸도 없다. 제목을 「검색어, 질문?」 꼴로 지으면 쉼표 앞이 초록으로 짚인다.
- 네이버 블로그 대표 이미지는 블로그 글을 쓴 뒤
  `node tools/column/blog/thumb.mjs tools/column/blog/<글 파일>.md` 로 만들어 같은 PR 에 넣는다
  (`tools/column/blog/thumbs/<글 파일>.png`, 1080×1080).
- 본문 설명용 도식(`figure` 블록)은 삽화가 아니라 내용이다. 꼭 필요할 때만 쓴다.
