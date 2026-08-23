import { columnsByDate } from "@/content/column";
import { CLINIC, SITE_URL } from "@/content/clinic";

/** RSS 피드. 새 칼럼이 검색엔진과 AI 크롤러에 빨리 잡히는 통로가 된다 */

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const dynamic = "force-static";

export function GET() {
  const items = columnsByDate();
  const build = items[0] ? new Date(items[0].date).toUTCString() : new Date(0).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(CLINIC.name)} 원장 칼럼</title>
    <link>${SITE_URL}/column</link>
    <description>${esc(`${CLINIC.name} 진료실에서 자주 받는 질문에 답합니다.`)}</description>
    <language>ko</language>
    <lastBuildDate>${build}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items
  .map((c) => {
    const author = CLINIC.doctors.find((d) => d.key === c.authorKey);
    return `    <item>
      <title>${esc(c.title)}</title>
      <link>${SITE_URL}/column/${c.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/column/${c.slug}</guid>
      <description>${esc(c.summary)}</description>
      <pubDate>${new Date(c.date).toUTCString()}</pubDate>
      <category>${esc(author ? `${author.name} ${author.role}` : CLINIC.name)}</category>
    </item>`;
  })
  .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
