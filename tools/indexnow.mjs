/**
 * 바뀐 페이지를 IndexNow 로 Bing 에 알린다.
 *
 * 사이트맵은 「여기 뭐가 있다」는 목록이고, 이쪽은 「이거 방금 바뀌었으니
 * 와서 보라」는 신호다. Bing 은 이 신호를 받으면 다음 순회를 기다리지 않는다.
 * 네이버와 구글은 IndexNow 를 받지 않아 그쪽은 그대로 기다려야 한다.
 *
 * npm run build 가 끝나면 postbuild 로 저절로 돈다. 하는 일은 둘이다.
 *
 *   1. 페이지마다 내용의 지문을 떠서 out/page-fingerprints.json 에 남긴다.
 *      이 파일은 사이트와 함께 올라가, 다음 배포 때 「지난번 내용」이 된다.
 *   2. Cloudflare 가 main 을 빌드할 때만, 지금 사이트에 올라가 있는 지문과
 *      견주어 달라진 페이지만 알린다. 내 컴퓨터에서 빌드할 때나 다른 브랜치
 *      미리보기에서는 알리지 않는다.
 *
 * 빌드할 때마다 무작위로 바뀌는 이름(빌드 번호, _next/static 아래 파일
 * 이름)은 지문에서 뺀다. 그래야 글을 고친 페이지만 「바뀌었다」고 잡힌다.
 *
 * 무엇이 잘못돼도 빌드를 실패로 만들지 않는다. 알림은 배포의 덤이다.
 *
 * 열쇠는 숨기는 값이 아니다. 사이트 뿌리에 같은 이름의 파일을 두어
 * 「이 주소의 주인이 맞다」를 증명하는 방식이라, 공개돼야 작동한다.
 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const HOST = "gimpohangang.com";
const KEY = "8117106a5b221c0426466efbb47358ca";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const OUT = "out";
const FILE = "page-fingerprints.json";

/** out/ 아래 html 파일을 모두 찾는다 */
function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return e.name === "_next" ? [] : htmlFiles(p);
    return e.name.endsWith(".html") ? [p] : [];
  });
}

/** 파일 경로를 사이트 주소로 옮긴다. 검색에 올릴 페이지가 아니면 null */
function toUrl(file) {
  const p = relative(OUT, file).split("\\").join("/");
  if (/^(404|_not-found)\.html$/.test(p)) return null;
  const path = p.replace(/(^|\/)index\.html$/, "$1").replace(/\.html$/, "");
  return `https://${HOST}/${path}`;
}

function fingerprints() {
  const buildId = readFileSync(".next/BUILD_ID", "utf8").trim();
  const map = {};
  for (const file of htmlFiles(OUT)) {
    const url = toUrl(file);
    if (!url) continue;
    const html = readFileSync(file, "utf8")
      .split(buildId)
      .join("")
      .replace(/\/_next\/static\/[^"'\s)\\]+/g, "");
    map[url] = createHash("sha256").update(html).digest("hex").slice(0, 16);
  }
  return map;
}

async function main() {
  const now = fingerprints();
  writeFileSync(join(OUT, FILE), JSON.stringify(now, null, 1) + "\n");
  console.log(`indexnow — 페이지 ${Object.keys(now).length}개 지문`);

  if (!process.env.WORKERS_CI || process.env.WORKERS_CI_BRANCH !== "main") {
    console.log("indexnow — Cloudflare 의 main 빌드가 아니라 알리지 않음");
    return;
  }

  // 아직 배포 전이라 사이트에는 지난번 판이 올라가 있다
  let before;
  try {
    const res = await fetch(`https://${HOST}/${FILE}?t=${Date.now()}`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    before = await res.json();
  } catch (e) {
    // 처음 한 번은 지난번 지문이 없다. 전부 알리지는 않는다 — 매번 전체를
    // 보내면 신호가 무뎌진다
    console.log(`indexnow — 지난번 지문을 못 읽어 건너뜀 (${e.message})`);
    return;
  }

  // 새로 생긴 페이지도 함께 잡힌다. 없어진 주소는 「와서 보라」고 할 수 없다
  const urls = Object.keys(now).filter((u) => before[u] !== now[u]);
  if (urls.length === 0) {
    console.log("indexnow — 바뀐 페이지 없음");
    return;
  }

  console.log(`indexnow — 알릴 페이지 ${urls.length}개`);
  for (const u of urls.slice(0, 6)) console.log(`  ${u}`);
  if (urls.length > 6) console.log(`  … 그리고 ${urls.length - 6}개`);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls,
    }),
    signal: AbortSignal.timeout(15000),
  });
  // 200 과 202 가 정상이다. 202 는 「받았고 열쇠는 나중에 확인한다」는 뜻
  if (res.ok) console.log(`indexnow — 알렸습니다 (HTTP ${res.status})`);
  else console.log(`indexnow — ⚠ 거절됐습니다 (HTTP ${res.status})`);
}

try {
  await main();
} catch (e) {
  console.log(`indexnow — ⚠ ${e.message} — 배포는 그대로 진행합니다`);
}
