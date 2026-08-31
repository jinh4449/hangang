import { chromium } from "playwright-core";
// 링크를 눌러 옮겨 다니는 경우를 시험한다.
//
// goto() 로 매번 새로 여는 검사는 이 문제를 못 잡는다. 새로 열면 레이아웃이
// 다시 마운트되어 애니메이션을 켜는 코드가 다시 돌기 때문이다. 사람은 그렇게
// 다니지 않는다. 메인에서 링크를 눌러 들어간다.
//
//   node tools/check/click-nav.mjs http://localhost:3000
const B = process.argv[2] || "http://localhost:3000";
const br=await chromium.launch({executablePath:"/opt/pw-browsers/chromium"});
const bad=[];
// 사람처럼 메인에서 링크를 눌러 옮겨 다닌다 (goto 로 새로 여는 게 아님)
const HOPS=["/care/pain","/care/car-accident","/care/diet","/care/indigestion","/care/fatigue",
            "/doctors","/treatment","/part","/column","/directions","/reservation","/area"];
// 동네 페이지는 메인이 아니라 /area 에서 눌러 들어간다
const AREA_HOPS=["/area/janggi","/area/pungmu","/area/gochon"];
for(const [w,h,tag] of [[1440,900,"PC"],[390,844,"모바일"]]){
  const ctx=await br.newContext({viewport:{width:w,height:h},isMobile:tag==="모바일",hasTouch:tag==="모바일"});
  const p=await ctx.newPage();
  p.on("pageerror",e=>bad.push(`${tag} 오류: ${e.message.slice(0,60)}`));
  await p.goto(B+"/",{waitUntil:"networkidle"});
  for(const href of HOPS){
    // 먼저 메인으로 (링크 클릭으로)
    if(p.url()!==B+"/"){
      const home=p.locator('a[href="/"]:visible').first();
      if(await home.count()) { await home.click(); await p.waitForTimeout(900); }
      else { await p.goBack(); await p.waitForTimeout(900); }
    }
    const link=p.locator(`a[href="${href}"]:visible`).first();
    if(!(await link.count())){ continue; }
    await link.scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
    await link.click();
    await p.waitForTimeout(2600);           // 애니메이션이 끝날 시간
    if(!p.url().endsWith(href)){ bad.push(`${tag} ${href} 이동 실패 → ${p.url()}`); continue; }
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=250){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,30));}});
    await p.waitForTimeout(2200);
    const hidden=await p.evaluate(()=>[...document.querySelectorAll(".rise,.seq")].filter(e=>{
      const i=e.firstElementChild;
      return !i||Math.abs(new DOMMatrixReadOnly(getComputedStyle(i).transform).m42)>2;})
      .map(e=>(e.innerText||"(그림)").trim().slice(0,20).replace(/\n/g," ")));
    if(hidden.length) bad.push(`${tag} ${href} 링크로 들어가니 글자 ${hidden.length}개 안 뜸: ${hidden.slice(0,3).join(", ")}`);
    else console.log(`  ${tag} ${href}  ✅`);
  }
  // 동네 목록에서 각 동네로 눌러 들어가는 경우
  await p.goto(B+"/area",{waitUntil:"networkidle"});
  for(const href of AREA_HOPS){
    if(!p.url().endsWith("/area")){ await p.goBack(); await p.waitForTimeout(900); }
    const link=p.locator(`a[href="${href}"]:visible`).first();
    if(!(await link.count())){ bad.push(`${tag} /area 에 ${href} 링크 없음`); continue; }
    await link.scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
    await link.click(); await p.waitForTimeout(2600);
    if(!p.url().endsWith(href)){ bad.push(`${tag} ${href} 이동 실패 → ${p.url()}`); continue; }
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=250){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,30));}});
    await p.waitForTimeout(2200);
    const hidden=await p.evaluate(()=>[...document.querySelectorAll(".rise,.seq")].filter(e=>{
      const i=e.firstElementChild;
      return !i||Math.abs(new DOMMatrixReadOnly(getComputedStyle(i).transform).m42)>2;})
      .map(e=>(e.innerText||"(그림)").trim().slice(0,20).replace(/\n/g," ")));
    if(hidden.length) bad.push(`${tag} ${href} 링크로 들어가니 글자 ${hidden.length}개 안 뜸: ${hidden.slice(0,3).join(", ")}`);
    else console.log(`  ${tag} ${href}  ✅`);
  }
  await ctx.close();
}
await br.close();
console.log(bad.length?"\n❌ 문제 "+bad.length+"건:\n"+bad.slice(0,10).join("\n"):"\n✅ 링크로 이동해도 전부 정상");
