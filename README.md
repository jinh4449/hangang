# 김포한강한의원 홈페이지

https://gimpohangang.com 의 원본입니다. Next.js 로 만들고, 빌드하면 전부
정적 HTML 이 됩니다.

## 고치고 올리기

`main` 에 push 하면 끝입니다. Cloudflare 의 `hangang` Worker 가 이 저장소를
지켜보다가 직접 빌드해서 1~3분 안에 올립니다.

글과 진료시간 같은 내용은 `src/content/` 안에 모여 있습니다.

```bash
npm run dev     # http://localhost:3000 에서 미리 보기
npm run build   # out/ 에 사이트가 만들어진다
```

## 어디에 올라가 있나

| 주소 | |
|---|---|
| https://gimpohangang.com | 정본 |
| https://www.gimpohangang.com | 위로 넘어감 |
| https://hangang.jinh4449.workers.dev | Cloudflare 가 준 주소 |

Cloudflare 설정은 `wrangler.jsonc` 에 있습니다. 대시보드에는 빌드 명령
`npm run build`, 배포 명령 `npx wrangler deploy`, 브랜치 `main` 만 넣어 두었습니다.

캐시 규칙은 `public/_headers` 에 있습니다. `netlify.toml` 은 Netlify 로
되돌아갈 때를 위해 남겨 두었습니다. Cloudflare 는 이 파일을 읽지 않습니다.

## 제대로 올라갔는지 확인

`/version.txt` 를 열면 지금 올라가 있는 판의 커밋 번호와 만든 시각이 나옵니다.
「고쳤는데 왜 그대로냐」 싶을 때 이 주소부터 보십시오. Cloudflare 대시보드의
`hangang` → Deployments 에서 빌드가 실패하지 않았는지도 함께 보십시오.

## 검색엔진에 알리기

`main` 을 빌드할 때마다 `tools/indexnow.mjs` 가 지난번과 내용이 달라진
페이지만 골라 Bing 에 알립니다(IndexNow). 따로 할 일은 없습니다.
무엇을 알렸는지는 Cloudflare 빌드 로그에서 `indexnow` 줄을 보면 나옵니다.
네이버와 구글은 IndexNow 를 받지 않아 사이트맵을 보고 찾아옵니다.

## 예전 방식

예전에는 여기서 빌드한 HTML 을 `jinh4449/hangangclinic` 저장소에 따로 올려
배포했습니다. 이제는 쓰지 않습니다.
