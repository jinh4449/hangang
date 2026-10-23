/**
 * 빌드 전에 git 기록을 끝까지 받아 둔다.
 *
 * sitemap.xml 의 날짜를 「그 페이지 파일이 마지막으로 바뀐 날」로 넣는데,
 * Cloudflare 처럼 기록을 몇 개만 받아 오는(얕은) 복제에서는 오래된 파일의
 * 날짜를 알 수 없다. 그래서 얕으면 한 번 더 받아 온다.
 *
 * 실패해도 빌드는 멈추지 않는다. 그때 sitemap 은 받아 둔 기록 안에서 고르고,
 * 그것도 없으면 빌드 시각을 쓴다.
 */
import { execSync } from "node:child_process";

function git(args, timeout = 5000) {
  try {
    return execSync(`git ${args}`, { stdio: ["ignore", "pipe", "ignore"], timeout }).toString().trim();
  } catch {
    return null;
  }
}

if (git("rev-parse --is-shallow-repository") === "true") {
  const ok = git("fetch --unshallow --quiet", 60000) !== null;
  console.log(ok ? "git 기록을 모두 받았습니다(sitemap 날짜용)" : "git 기록을 더 받지 못했습니다 — sitemap 은 있는 기록으로 만듭니다");
}
