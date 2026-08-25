/**
 * 실행 중인 dev 서버를 돌며 각 페이지의 렌더된 HTML과 컴파일된 CSS를 모은다.
 *
 *   node tools/preview/crawl.mjs            # 사이트맵에서 경로를 읽는다
 *   node tools/preview/crawl.mjs '["/","/cost"]'
 *
 * 결과는 tools/preview/.cache/crawl.json 에 쌓이고 build.py 가 이어받는다.
 */
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const CACHE = join(HERE, '.cache');
const ORIGIN = process.env.PREVIEW_ORIGIN ?? 'http://localhost:3000';
const BROWSER = process.env.PLAYWRIGHT_CHROMIUM ?? '/opt/pw-browsers/chromium';

/** 사이트맵이 곧 공개 페이지 목록이라 따로 관리하지 않는다 */
async function routesFromSitemap() {
  const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const paths = locs.map((u) => new URL(u).pathname || '/');
  return [...new Set(paths)].sort();
}

const routes = process.argv[2] ? JSON.parse(process.argv[2]) : await routesFromSitemap();
console.error(`${routes.length}개 경로`);

const browser = await chromium.launch({ executablePath: BROWSER });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });

const pages = [];
let css = null;

for (const route of routes) {
  await page.goto(`${ORIGIN}${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // 스크롤 리빌은 캡처 시점에 이미 발동해 있어야 미리보기에서 보인다
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((n) => scrollTo(0, n), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(250);

  const data = await page.evaluate(() => {
    // dev 서버가 주입한 devtools 껍데기는 미리보기에 들어가면 안 된다
    for (const el of document.querySelectorAll('nextjs-portal,script,link[rel=preload]')) el.remove();
    // 애니메이션은 최종 상태로 굳힌다. 정지 화면이므로 중간 프레임이 남으면 안 된다
    for (const el of document.querySelectorAll('[class*="reveal"]')) {
      el.classList.add('on');
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
    for (const el of document.querySelectorAll('.enter')) {
      el.style.animation = 'none';
      el.style.opacity = '1';
      el.style.filter = 'none';
      el.style.transform = 'none';
    }
    return { title: document.title, body: document.body.innerHTML };
  });

  // CSS 는 모든 페이지가 같은 번들을 쓰므로 한 번만 뽑는다
  if (!css) {
    css = await page.evaluate(() =>
      [...document.styleSheets]
        .map((sheet) => {
          try {
            return [...sheet.cssRules].map((r) => r.cssText).join('\n');
          } catch {
            return '';
          }
        })
        .join('\n')
    );
  }

  pages.push({ route, ...data });
  console.error(`  ${route}  ${(data.body.length / 1024).toFixed(0)}KB`);
}

await browser.close();

mkdirSync(CACHE, { recursive: true });
writeFileSync(join(CACHE, 'crawl.json'), JSON.stringify({ css, pages }));
console.error(`css ${(css.length / 1024).toFixed(0)}KB · ${pages.length}개 페이지`);
