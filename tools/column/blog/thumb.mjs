// 네이버 블로그 대표 이미지(1080×1080)를 글 제목으로 만든다.
//
//   node tools/column/blog/thumb.mjs <블로그 글.md>
//
// 글 파일의 「## 제목」 아래 줄과 첫머리의 「(○○○ 원장)」을 읽어
// 같은 이름의 PNG 를 tools/column/blog/thumbs/ 에 둔다.
// 홈페이지 칼럼 카드(src/components/column-thumb.tsx)와 같은 결로 맞췄다:
// 쉼표 앞 검색어를 초록으로 짚고, 뒤 질문을 크게 잇는다.
import { readFileSync, mkdirSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const src = process.argv[2];
if (!src) {
  console.error("사용법: node tools/column/blog/thumb.mjs <블로그 글.md>");
  process.exit(1);
}
const md = readFileSync(src, "utf8");
const title = md.match(/^## 제목\s*\n+(.+)$/m)?.[1].trim();
const author = md.match(/\((\S+) 원장\)/)?.[1];
if (!title) throw new Error("「## 제목」 아래 줄을 찾지 못했습니다");

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const i = title.indexOf(",");
const lead = i > 0 ? title.slice(0, i + 1) : "";
const rest = i > 0 ? title.slice(i + 1).trim() : title;

const FONT = join(ROOT, "node_modules/pretendard/dist/web/static/woff2");
const mark = readFileSync(join(ROOT, "brand/mark.svg"), "utf8").replaceAll("#0A777E", "#1e5b45");

const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:P;font-weight:600;src:url(file://${FONT}/Pretendard-SemiBold.woff2)}
@font-face{font-family:P;font-weight:800;src:url(file://${FONT}/Pretendard-ExtraBold.woff2)}
html,body{margin:0}
.c{width:1080px;height:1080px;box-sizing:border-box;padding:110px 100px;background:#eef4f0;font-family:P;color:#171a18;display:flex;flex-direction:column;position:relative;overflow:hidden;word-break:keep-all}
.ring{position:absolute;right:-150px;top:-150px;width:450px;height:450px;border-radius:50%;border:34px solid #bcd8ca;opacity:.7}
.k{display:flex;align-items:center;gap:16px;font-weight:800;font-size:36px;color:#1e5b45;position:relative}
.k svg{width:52px;height:52px}
.t{margin-top:auto;font-weight:800;font-size:96px;line-height:1.28;letter-spacing:-.045em;position:relative}
.t em{font-style:normal;color:#1e5b45;box-shadow:inset 0 -22px 0 #e0cca6}
.f{margin-top:44px;font-weight:600;font-size:36px;color:#5c665f;position:relative}
</style><div class="c"><div class="ring"></div>
<div class="k">${mark}원장 칼럼</div>
<div class="t">${lead ? `<em>${esc(lead)}</em><br>` : ""}${esc(rest)}</div>
<div class="f">김포한강한의원${author ? ` · ${esc(author)} 원장` : ""}</div>
</div>`;

const outDir = join(dirname(resolve(src)), "thumbs");
mkdirSync(outDir, { recursive: true });
const out = join(outDir, basename(src, ".md") + ".png");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
// setContent 의 about:blank 에서는 file:// 글꼴을 읽지 못해 임시 파일로 연다
const tmp = mkdtempSync(join(tmpdir(), "thumb-"));
writeFileSync(join(tmp, "t.html"), html);
await page.goto("file://" + join(tmp, "t.html"));
await page.evaluate(() => document.fonts.ready);
writeFileSync(out, await page.screenshot());
await browser.close();
rmSync(tmp, { recursive: true, force: true });
console.log(out);
