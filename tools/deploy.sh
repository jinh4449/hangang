#!/usr/bin/env bash
#
# 고친 내용을 배포 저장소까지 한 번에 올린다.
#
#   ./tools/deploy.sh "무엇을 고쳤는지"
#
# 하는 일
#   1. 원본을 빌드해 out/ 에 HTML 을 만든다
#   2. 배포 저장소(hangangclinic)의 옛 파일을 지우고 새 파일로 채운다
#   3. 두 저장소에 각각 커밋하고 푸시한다
#   4. 바뀐 페이지를 IndexNow 로 Bing 에 알린다
#
# 2번에서 지우는 것이 중요하다. 덮어쓰기만 하면 지운 페이지가 배포본에
# 남아, 사이트에서 뺐는데도 주소를 아는 사람에게는 계속 보인다.

set -euo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${SRC}/out"
DEPLOY="${DEPLOY_REPO:-/home/user/hangangclinic}"
MSG="${1:-내용 갱신}"

step() { printf "\n\033[1m▸ %s\033[0m\n" "$1"; }

[ -d "${DEPLOY}/.git" ] || { echo "배포 저장소가 없습니다: ${DEPLOY}"; exit 1; }

step "1/5  빌드"
cd "${SRC}"
npm run build
HTML=$(find "${OUT}" -name '*.html' | wc -l | tr -d ' ')
[ "${HTML}" -gt 0 ] || { echo "HTML 이 만들어지지 않았습니다"; exit 1; }
echo "   HTML ${HTML}개"

step "2/5  원본 저장소 커밋·푸시"
# 채우기보다 먼저 한다. 그래야 version.txt 에 이번 판의 커밋 번호가 찍힌다
cd "${SRC}"
if [ -n "$(git status --porcelain)" ]; then
  git add -A && git commit -q -m "${MSG}"
  git push -q -u origin "$(git branch --show-current)"
  echo "   $(git log --oneline -1)"
else
  echo "   바뀐 것 없음 — 건너뜀"
fi

step "3/5  배포 저장소 채우기"
cd "${DEPLOY}"
# .git 과 저장소에만 두는 파일은 남기고 나머지를 비운다
find . -mindepth 1 -maxdepth 1 \
  ! -name '.git' ! -name 'README.md' ! -name 'netlify.toml' ! -name '.nojekyll' \
  -exec rm -rf {} +
cp -r "${OUT}/." .

# 지금 올라간 것이 어느 판인지 사이트에서 바로 확인할 수 있게 표식을 남긴다.
# 「고쳤는데 왜 그대로냐」 를 물을 때, 주소 하나로 답이 나온다
{
  echo "commit  $(git -C "${SRC}" rev-parse --short HEAD)"
  echo "built   $(date -u '+%Y-%m-%d %H:%M UTC')"
  echo "note    ${MSG}"
} > version.txt
echo "   HTML $(find . -name '*.html' -not -path './.git/*' | wc -l | tr -d ' ')개 · $(du -sh --exclude=.git . | cut -f1)"
echo "   표식: /version.txt"

step "4/5  배포 저장소 커밋·푸시"
cd "${DEPLOY}"
# 커밋하기 전에 무엇이 바뀌었는지 받아 둔다. 커밋한 뒤에는 알 수 없다.
# 지운 파일(D)은 뺀다 — 없어진 주소를 「와서 보라」고 할 수는 없다.
# 이름이 바뀐 줄은 「R 옛이름 -> 새이름」 이라 마지막 칸을 쓴다
CHANGED="$(mktemp)"
trap 'rm -f "${CHANGED}"' EXIT
git status --porcelain \
  | grep -v '^.D' | grep -v '^D' \
  | awk '{print $NF}' | grep '\.html$' > "${CHANGED}" || true

if [ -n "$(git status --porcelain)" ]; then
  git add -A && git commit -q -m "${MSG}"
  git push -q -u origin "$(git branch --show-current)"
  echo "   $(git log --oneline -1)"
else
  echo "   바뀐 것 없음 — 건너뜀"
  : > "${CHANGED}"
fi

step "5/5  Bing 에 알리기"
# Cloudflare 가 올리기 전에 Bing 이 오면 옛 내용을 읽는다. 다만 Bing 은
# 신호를 받고도 대개 한참 뒤에 오고, Cloudflare 는 1분 안에 끝나므로
# 앞뒤가 뒤집힐 일은 드물다. INDEXNOW=0 을 주면 이 단계를 건너뛴다
if [ "${INDEXNOW:-1}" = "0" ]; then
  echo "   INDEXNOW=0 — 건너뜀"
elif [ -s "${CHANGED}" ]; then
  node "${SRC}/tools/indexnow.mjs" "${DEPLOY}" "${CHANGED}"
else
  echo "   바뀐 페이지 없음 — 건너뜀"
fi

printf "\n\033[1m완료.\033[0m Cloudflare 가 곧 새 내용을 올립니다.\n"
