/**
 * 지금 만든 판이 무엇인지 out/version.txt 에 남긴다.
 *
 * 「고쳤는데 왜 그대로냐」 를 물을 때 사이트의 /version.txt 하나로 답이
 * 나오게 하려는 것이다. npm run build 가 끝나면 postbuild 로 저절로 돈다.
 *
 * 커밋 번호는 git 에서 읽고, git 이 없으면 Cloudflare 가 넣어 주는
 * WORKERS_CI_COMMIT_SHA 를 쓴다.
 */
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

function git(args) {
  try {
    return execSync(`git ${args}`, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "";
  }
}

const commit =
  git("rev-parse --short HEAD") || (process.env.WORKERS_CI_COMMIT_SHA ?? "").slice(0, 7) || "unknown";
const note = git("log -1 --format=%s") || "-";
const built = new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC";

writeFileSync("out/version.txt", `commit  ${commit}\nbuilt   ${built}\nnote    ${note}\n`);
console.log(`version.txt — ${commit}`);
