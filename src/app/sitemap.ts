import type { MetadataRoute } from "next";
import { SYMPTOMS } from "@/content/symptoms";
import { COMPARES } from "@/content/compare";
import { AREAS } from "@/content/area";
import { COLUMNS } from "@/content/column";
import { TREATMENTS } from "@/content/treatment";
import { PARTS } from "@/content/part";
import { INTENTS } from "@/content/types";
import { SITE_URL } from "@/content/clinic";

/** 진료과목을 추가하면 사이트맵도 자동으로 늘어난다. 손으로 관리하지 않는다. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    // 진료비는 검색 유입이 많은 페이지라 우선순위를 높게 둔다
    { url: `${SITE_URL}/cost`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/care`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/reservation`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/directions`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  for (const s of SYMPTOMS) {
    for (const i of INTENTS) {
      entries.push({
        url: `${SITE_URL}${i.base}/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: i.key === "care" ? 0.9 : 0.8,
      });
    }
  }
  for (const a of AREAS) {
    entries.push({
      url: `${SITE_URL}/area/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }
  for (const [base, items, pr] of [
    ["/treatment", TREATMENTS, 0.9],
    ["/part", PARTS, 0.9],
  ] as const) {
    entries.push({ url: `${SITE_URL}${base}`, lastModified: now, changeFrequency: "monthly", priority: pr });
    for (const it of items)
      entries.push({
        url: `${SITE_URL}${base}/${it.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: pr,
      });
  }
  entries.push({
    url: `${SITE_URL}/column`,
    lastModified: now,
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
  for (const c of COMPARES) {
    entries.push({
      url: `${SITE_URL}/compare/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  return entries;
}
