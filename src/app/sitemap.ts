import type { MetadataRoute } from "next";
import { SYMPTOMS } from "@/content/symptoms";
import { COMPARES } from "@/content/compare";
import { AREAS } from "@/content/area";
import { INTENTS } from "@/content/types";
import { SITE_URL } from "./layout";

/** 진료과목을 추가하면 사이트맵도 자동으로 늘어난다. 손으로 관리하지 않는다. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
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
