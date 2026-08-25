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
