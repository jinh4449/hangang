# 매뉴얼 웹페이지 만들기

`docs/manual/` 의 마크다운을 직원분들이 폰에서 볼 수 있는 웹페이지 한 장으로 만듭니다.
두 곳에 올립니다.

| 어디 | 주소 | 만드는 법 |
| --- | --- | --- |
| 병원 사이트 | `gimpohangang.com/manual/` | `python3 tools/manual/build.py site` 뒤 push. Netlify 가 받아서 올린다 |
| 아티팩트 | https://claude.ai/code/artifact/e0d21ca0-9a26-4413-a50f-e7b03ef689e4 | `python3 tools/manual/build.py artifact` 뒤 같은 주소에 덮어쓰기 |

병원 사이트 쪽이 본 자리입니다. 병원 사이트가 살아 있는 한 같이 삽니다.
아티팩트는 Claude 계정에 매여 있어 백업으로 둡니다.

## 내용을 고칠 때

1. `docs/manual/` 의 마크다운을 고칩니다.
2. `python3 tools/manual/build.py site`
3. 커밋하고 push 합니다.

주소는 그대로입니다. 직원분들이 저장해 둔 링크를 다시 보낼 일이 없습니다.

## 검색에 안 잡히게 막아 둔 것

진료비와 한약 가격표가 들어 있어 검색 결과에 나오면 안 됩니다. 세 겹으로 막았습니다.

1. `src/app/robots.ts` 의 `PRIVATE` — robots.txt 에서 `/manual/` 을 막습니다. 로봇이 읽어 가지 않습니다.
2. `public/_headers` 와 `netlify.toml` — `X-Robots-Tag: noindex`.
   로봇이 robots.txt 를 무시하고 읽어 가더라도 색인에서 뺍니다.
3. 페이지 자체의 `<meta name="robots" content="noindex, ...">`.

**사이트 어디에서도 이 주소로 링크하지 않습니다.** 링크를 걸면 로봇이 주소를 알게 되고,
그때는 막아 두어도 주소만 검색 결과에 뜰 수 있습니다.
사이트맵(`src/app/sitemap.ts`)과 `llms.txt` 에도 넣지 않습니다.

막은 것은 **검색이지 접근이 아닙니다.** 주소를 아는 사람은 누구나 볼 수 있습니다.
직원분께 직접 전달하고, 단체 대화방에 올릴 때는 방 인원을 확인해주세요.
진짜 로그인을 걸려면 Cloudflare Access(50명까지 무료)로 이메일 인증을 붙일 수 있습니다.

## 무엇을 하는가

- 마크다운 5개를 읽어 한 페이지로 합칩니다. 문서 사이 이동 링크와 목차는
  페이지 탐색이 대신하므로 지웁니다.
- 그림 26장을 담습니다. `site` 는 `public/manual/img/` 에 파일로 두고,
  `artifact` 는 페이지 안에 박아 파일 하나로 끝냅니다.
- 「멘트」, 「※」, 「TIP)」, 「Q. / A.」 를 알아보고 각각 다르게 보여줍니다.
  환자분께 그대로 하는 말을 눈에 띄게 하려는 것입니다.
- 마지막으로 고친 날을 git 기록에서 가져와 아래에 찍습니다. 손으로 적을 것이 없습니다.

## 주의

- `public/manual/` 은 이 도구가 만듭니다. 직접 고치면 다음 빌드에 지워집니다.
- 제목(`##`)을 고치면 목차와 찾기 결과도 자동으로 따라옵니다.
