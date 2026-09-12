/**
 * 바뀐 페이지를 IndexNow 로 알린다.
 *
 * 사이트맵은 「여기 뭐가 있다」는 목록이고, 이쪽은 「이거 방금 바뀌었으니
 * 와서 보라」는 신호다. Bing 은 이 신호를 받으면 다음 순회를 기다리지 않는다.
 * 네이버와 구글은 IndexNow 를 받지 않아 그쪽은 그대로 기다려야 한다.
 *
 *   node tools/indexnow.mjs <배포저장소경로> [바뀐파일목록파일]
 *
 * 목록 파일이 없으면 아무것도 보내지 않는다. 「바뀐 것이 없으면 찔러도
 * 소용없다」가 기본값이어야 한다 — 매번 전체를 보내면 신호가 무뎌진다.
 *
 * 열쇠는 숨기는 값이 아니다. 사이트 뿌리에 같은 이름의 파일을 두어
 * 「이 주소의 주인이 맞다」를 증명하는 방식이라, 공개돼야 작동한다.
 */
import { readFileSync } from "node:fs";

const HOST = "gimpohangang.com";
const KEY = "8117106a5b221c0426466efbb47358ca";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const listFile = process.argv[3];
if (!listFile) {
  console.log("   바뀐 페이지 없음 — 건너뜀");
  process.exit(0);
}

/** 배포본의 파일 경로를 사이트 주소로 옮긴다 */
function toUrl(p) {
  const clean = p.replace(/^\.\//, "");
  if (!clean.endsWith(".html")) return null;
  // 404 는 검색에 올릴 페이지가 아니다
  if (/^(404|_not-found)\.html$/.test(clean)) return null;
  const path = clean.replace(/(^|\/)index\.html$/, "$1").replace(/\.html$/, "");
  return `https://${HOST}/${path}`.replace(/\/+$/, "/");
}

const urls = [
  ...new Set(
    readFileSync(listFile, "utf8")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map(toUrl)
      .filter(Boolean),
  ),
];

if (urls.length === 0) {
  console.log("   바뀐 페이지 없음 — 건너뜀");
  process.exit(0);
}

// 한 번에 1만 개까지 받지만 우리는 50 페이지라 나눌 일이 없다
const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: urls,
};

console.log(`   알릴 페이지 ${urls.length}개`);
for (const u of urls.slice(0, 6)) console.log(`     ${u}`);
if (urls.length > 6) console.log(`     … 그리고 ${urls.length - 6}개`);

try {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  });
  // 200 과 202 가 정상이다. 202 는 「받았고 열쇠는 나중에 확인한다」는 뜻
  if (res.ok) console.log(`   알렸습니다 (HTTP ${res.status})`);
  else console.log(`   ⚠ 거절됐습니다 (HTTP ${res.status}) — 배포는 정상입니다`);
} catch (e) {
  // 여기서 배포를 실패로 만들지 않는다. 알림은 배포의 덤이다
  console.log(`   ⚠ 알리지 못했습니다: ${e.message} — 배포는 정상입니다`);
}
