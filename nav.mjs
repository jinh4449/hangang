import { chromium } from "playwright-core";
const B="http://localhost:4360";
const br=await chromium.launch({executablePath:"/opt/pw-browsers/chromium"});
const ctx=await br.newContext({viewport:{width:1440,height:900}});
const p=await ctx.newPage();
const reqs=[];
p.on("request",r=>{ if(/\.txt|_next\/[A-Za-z0-9]/.test(r.url())) reqs.push(r.url().replace(B,"")); });

console.log("① 주소로 바로 열기");
await p.goto(B+"/care/pain",{waitUntil:"networkidle"});
let t=await p.innerText("main");
console.log("   되살린 내용:", t.includes("이런 경우에 도움이 됩니다")?"✅ 있음":"❌ 없음", `· ${t.length}자`);

console.log("\n② 메인 → 통증치료 링크 클릭");
await p.goto(B+"/",{waitUntil:"networkidle"});
reqs.length=0;
const link=p.locator('a[href="/care/pain"]:visible').first();
await link.scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
await link.click();
await p.waitForTimeout(2500);
console.log("   주소:", p.url().replace(B,""));
t=await p.innerText("main");
console.log("   되살린 내용:", t.includes("이런 경우에 도움이 됩니다")?"✅ 있음":"❌ 없음", `· ${t.length}자`);
console.log("   이동 중 받은 데이터 파일:"); [...new Set(reqs)].forEach(u=>console.log("      "+u));
const hs=await p.$$eval("main h2",h=>h.map(x=>x.innerText.trim()));
console.log("   섹션:", hs.join(" / "));
await br.close();
