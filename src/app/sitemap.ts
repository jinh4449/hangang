import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { SYMPTOMS } from "@/content/symptoms";
import { COMPARES } from "@/content/compare";
import { COLUMNS } from "@/content/column";
import { PARTS } from "@/content/part";
import { AREAS } from "@/content/area";
import { SITE_URL } from "@/content/clinic";
import { GLOSSARY, GLOSSARY_CATEGORIES, termsIn } from "@/content/glossary";

/** 진료과목을 추가하면 사이트맵도 자동으로 늘어난다. 손으로 관리하지 않는다. */
// 정적 내보내기에서는 빌드 때 한 번만 만든다고 알려 줘야 한다
export const dynamic = "force-static";

/**
 * 그 페이지를 만드는 파일이 마지막으로 바뀐 날.
 *
 * 전에는 모든 줄에 빌드한 시각을 넣었다. 그러면 배포할 때마다 전 페이지가
 * 「오늘 바뀜」이 되어, 검색엔진이 이 날짜를 믿지 않고 무시한다. 실제로 바뀐
 * 페이지만 날짜가 움직여야 「이 페이지를 먼저 다시 읽어라」는 신호가 된다.
 *
 * git 기록에서 읽는다. 공통 틀(layout, site.tsx)은 넣지 않는다. 머리글 하나
 * 고쳤다고 전 페이지가 바뀐 것으로 잡히면 같은 문제로 돌아간다.
 * git 이 없거나 기록이 얕으면(package.json 의 prebuild 가 먼저 늘려 둔다)
 * 빌드 시각으로 물러난다.
 */
const BUILT = new Date();
const seen = new Map<string, Date>();
function changed(...paths: string[]): Date {
  const key = paths.join("|");
  const hit = seen.get(key);
  if (hit) return hit;
  let d = BUILT;
  try {
    // [symptom] 같은 폴더 이름이 glob 으로 읽히지 않게 literal 로 넘긴다
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths.map((x) => `:(literal)${x}`)], {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (out) d = new Date(out);
  } catch {}
  seen.set(key, d);
  return d;
}

const CLINIC_SRC = "src/content/clinic.ts";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: changed("src/app/page.tsx", CLINIC_SRC, "src/content/symptoms", "src/content/column"), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/care`, lastModified: changed("src/app/care/page.tsx", "src/content/symptoms"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/reservation`, lastModified: changed("src/app/reservation", CLINIC_SRC), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/directions`, lastModified: changed("src/app/directions", CLINIC_SRC), changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: changed("src/app/about", CLINIC_SRC), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/doctors`, lastModified: changed("src/app/doctors", CLINIC_SRC), changeFrequency: "monthly", priority: 0.8 },
  ];

  for (const s of SYMPTOMS) {
    entries.push({
      url: `${SITE_URL}/care/${s.slug}`,
      lastModified: changed("src/app/care/[symptom]", `src/content/symptoms/${s.slug}.ts`, "src/content/symptoms/departments.ts"),
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }
  entries.push({
    url: `${SITE_URL}/treatment`,
    lastModified: changed("src/app/treatment", "src/content/treatment"),
    changeFrequency: "monthly",
    priority: 0.8,
  });
  for (const [base, items, pr] of [
    ["/part", PARTS, 0.9],
  ] as const) {
    const partDate = changed("src/app/part", "src/content/part");
    entries.push({ url: `${SITE_URL}${base}`, lastModified: partDate, changeFrequency: "monthly", priority: pr });
    for (const it of items)
      entries.push({
        url: `${SITE_URL}${base}/${it.slug}`,
        lastModified: partDate,
        changeFrequency: "monthly",
        priority: pr,
      });
  }
  // 동네별 안내. 지역 검색으로 들어오는 길목이라 색인에서 빠지면 안 된다
  entries.push({
    url: `${SITE_URL}/area`,
    lastModified: changed("src/app/area", "src/content/area"),
    changeFrequency: "monthly",
    priority: 0.8,
  });
  for (const a of AREAS) {
    entries.push({
      url: `${SITE_URL}/area/${a.slug}`,
      lastModified: changed("src/app/area", "src/content/area"),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  entries.push({
    url: `${SITE_URL}/column`,
    lastModified: changed("src/app/column/page.tsx", "src/content/column"),
    changeFrequency: "weekly",
    priority: 0.8,
  });
  for (const c of COLUMNS) {
    entries.push({
      url: `${SITE_URL}/column/${c.slug}`,
      lastModified: new Date(c.updated ?? c.date),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  // 용어사전. 「오십견이 뭐예요」처럼 이름 하나를 묻는 검색을 받는다
  const glossaryDate = changed("src/app/glossary", "src/content/glossary");
  entries.push({ url: `${SITE_URL}/glossary`, lastModified: glossaryDate, changeFrequency: "monthly", priority: 0.8 });
  for (const c of GLOSSARY_CATEGORIES) {
    if (termsIn(c.slug).length === 0) continue;
    entries.push({
      url: `${SITE_URL}/glossary/category/${c.slug}`,
      lastModified: glossaryDate,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const t of GLOSSARY) {
    entries.push({
      url: `${SITE_URL}/glossary/${t.slug}`,
      lastModified: glossaryDate,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  for (const c of COMPARES) {
    entries.push({
      url: `${SITE_URL}/compare/${c.slug}`,
      lastModified: changed("src/app/compare", "src/content/compare"),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  return entries;
}
