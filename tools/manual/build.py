import re, os, base64, json, html

SRC = '/home/user/hangang/docs/manual'
DOCS = [
    ('home',    'README.md',         '첫 장',      '김포한강한의원 업무 매뉴얼'),
    ('desk',    'desk.md',           '데스크',     '데스크 매뉴얼'),
    ('room',    'treatment-room.md', '치료실',     '치료실 매뉴얼'),
    ('herbal',  'herbal.md',         '한약 · 탕전', '한약 · 탕전 매뉴얼'),
    ('admin',   'admin.md',          '원무 · 정산', '원무 · 정산 · 재고 매뉴얼'),
]
FILE2KEY = {f: k for k, f, _, _ in DOCS}

imgs = {}
for fn in sorted(os.listdir(os.path.join(SRC, 'images'))):
    if fn.endswith('.png'):
        b = open(os.path.join(SRC, 'images', fn), 'rb').read()
        imgs[fn] = 'data:image/png;base64,' + base64.b64encode(b).decode()

def slug(t):
    t = t.strip().lower()
    t = re.sub(r'[^\w\s-]', '', t, flags=re.UNICODE)
    return t.replace(' ', '-')

def esc(t):
    return html.escape(t, quote=False)

def inline(t, key):
    out, i = [], 0
    pat = re.compile(r'!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`')
    for m in pat.finditer(t):
        out.append(esc(t[i:m.start()]))
        if m.group(2) is not None:                      # image
            src = m.group(2).split('/')[-1]
            out.append(f'<figure class="shot"><img src="{imgs.get(src,"")}" alt="{esc(m.group(1))}" loading="lazy"><figcaption>{esc(m.group(1))}</figcaption></figure>')
        elif m.group(4) is not None:                    # link
            href, label = m.group(4), esc(m.group(3))
            if href.startswith('./') and '.md' in href:
                f, _, a = href[2:].partition('#')
                tgt = FILE2KEY.get(f, key)
                href = f'#{tgt}' + (f'--{a}' if a else '')
                out.append(f'<a class="xref" href="{href}">{label}</a>')
            elif href.startswith('#'):
                out.append(f'<a class="xref" href="#{key}--{href[1:]}">{label}</a>')
            else:
                out.append(f'<a href="{href}" target="_blank" rel="noopener">{label}</a>')
        elif m.group(5) is not None:
            out.append(f'<strong>{esc(m.group(5))}</strong>')
        else:
            out.append(f'<code>{esc(m.group(6))}</code>')
        i = m.end()
    out.append(esc(t[i:]))
    return ''.join(out)

def flow(lines, key):
    """멘트 / ※ / TIP) / Q. A. 를 알아보고 문단을 나눈다."""
    out, buf, mode = [], [], 'p'
    def flush():
        nonlocal buf, mode
        if not buf: return
        body = '<br>'.join(inline(l, key) for l in buf)
        if mode == 'ment':
            out.append(f'<blockquote class="ment"><span class="ment-tag">멘트</span><p>{body}</p></blockquote>')
        elif mode == 'note':
            cls = 'note tip' if buf[0].startswith('TIP)') else 'note'
            out.append(f'<aside class="{cls}"><p>{body}</p></aside>')
        elif mode == 'qa':
            out.append(f'<div class="qa"><p>{body}</p></div>')
        else:
            out.append(f'<p>{body}</p>')
        buf, mode = [], 'p'
    for l in lines:
        s = l.strip()
        if s.startswith('멘트 ') or s.startswith('멘트"'):
            flush(); mode = 'ment'; buf.append(re.sub(r'^멘트\s*', '', s))
        elif s.startswith('※') or s.startswith('TIP)'):
            flush(); mode = 'note'; buf.append(s)
        elif s.startswith('Q. '):
            flush(); mode = 'qa'; buf.append(s)
        elif mode == 'qa' and s.startswith('A. '):
            buf.append(s)
        elif mode in ('ment', 'note', 'qa'):
            buf.append(s)
        else:
            buf.append(s)
    flush()
    return out

def convert(md, key):
    lines = md.split('\n')
    out, secs, i, title = [], [], 0, ''
    para = []
    def flushp():
        nonlocal para
        if para: out.extend(flow(para, key)); para = []
    while i < len(lines):
        l = lines[i]
        s = l.strip()
        # 문서 사이 이동 링크 줄과 목차 블록은 페이지 탐색이 대신하므로 지운다
        if s.startswith('[매뉴얼 첫 장]') or (s.startswith('[') and '](./'in s and '·' in s):
            i += 1; continue
        if s == '## 목차':
            i += 1
            while i < len(lines) and not lines[i].startswith('## '):
                i += 1
            continue
        if s.startswith('# '):
            flushp(); title = s[2:].strip(); i += 1; continue
        if s.startswith('## '):
            flushp(); t = s[3:].strip(); a = f'{key}--{slug(t)}'
            secs.append((t, a))
            out.append(f'<h2 id="{a}"><a class="hlink" href="#{a}">{esc(t)}</a></h2>'); i += 1; continue
        if s.startswith('### '):
            flushp(); t = s[4:].strip()
            out.append(f'<h3 id="{key}--{slug(t)}">{esc(t)}</h3>'); i += 1; continue
        if s == '---' or s == '':
            flushp(); i += 1; continue
        if s.startswith('|'):
            flushp()
            rows = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')]); i += 1
            head, body = rows[0], rows[2:]
            th = ''.join(f'<th>{inline(c, key)}</th>' for c in head)
            tb = ''.join('<tr>' + ''.join(f'<td>{inline(c, key)}</td>' for c in r) + '</tr>' for r in body)
            out.append(f'<div class="tw"><table><thead><tr>{th}</tr></thead><tbody>{tb}</tbody></table></div>')
            continue
        m = re.match(r'^(\d+)\.\s+(.*)$', s)
        if s.startswith('- ') or m:
            flushp()
            ordered = bool(m)
            items = []
            while i < len(lines):
                cur = lines[i]
                cs = cur.strip()
                mm = re.match(r'^(\d+)\.\s+(.*)$', cs)
                if cs.startswith('- '):
                    items.append([cs[2:]])
                elif mm:
                    items.append([mm.group(2)])
                elif cur.startswith('  ') and cs and items:
                    items[-1].append(cs)
                else:
                    break
                i += 1
            def li(parts):
                first = inline(parts[0], key)
                rest = ''
                for p in parts[1:]:
                    cls = ' class="sub-note"' if p.startswith('※') else ''
                    rest += f'<span{cls}>{inline(p, key)}</span>'
                return f'<li>{first}{rest}</li>'
            tag = 'ol' if ordered else 'ul'
            out.append(f'<{tag}>' + ''.join(li(p) for p in items) + f'</{tag}>')
            continue
        para.append(s); i += 1
    flushp()
    return title, secs, '\n'.join(out)

docs, nav = [], []
for key, fn, tab, name in DOCS:
    md = open(os.path.join(SRC, fn), encoding='utf-8').read()
    title, secs, body = convert(md, key)
    docs.append((key, tab, name, secs, body))
    for t, a in secs:
        nav.append({'doc': key, 'tab': tab, 'title': t, 'anchor': a})

tabs = ''.join(
    f'<button class="tab" data-doc="{k}" role="tab" aria-selected="{"true" if k=="home" else "false"}">{esc(tab)}</button>'
    for k, tab, _, _, _ in docs)

sections = []
for key, tab, name, secs, body in docs:
    toc = ''.join(f'<li><a href="#{a}">{esc(t)}</a></li>' for t, a in secs)
    sections.append(f'''<section class="doc" id="{key}"{'' if key=='home' else ' hidden'}>
  <header class="doc-head">
    <p class="eyebrow">김포한강한의원</p>
    <h1>{esc(name)}</h1>
  </header>
  <div class="doc-body">
    <nav class="toc" aria-label="{esc(name)} 목차">
      <details id="toc-{key}">
        <summary>이 문서의 목차 <span class="cnt">{len(secs)}</span></summary>
        <ol class="toc-list">{toc}</ol>
      </details>
    </nav>
    <article class="prose">{body}</article>
  </div>
</section>''')

CSS = r'''
:root{
  --ground:#FAFAF8; --surface:#FFFFFF; --raise:#F3F5F2;
  --ink:#1C211E; --ink-2:#4C554F; --ink-3:#7C867F;
  --line:#E1E5E0; --line-2:#EDF0EC;
  --accent:#2E6A4E; --accent-ink:#245840; --accent-soft:#E9F1EC;
  --mark:#9C4A23; --mark-soft:#F8EEE8;
  --shadow:0 1px 2px rgba(28,33,30,.05), 0 8px 24px -16px rgba(28,33,30,.25);
  --measure:64ch; --bar-h:152px;
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --ground:#111512; --surface:#181D19; --raise:#1E241F;
    --ink:#E5EAE5; --ink-2:#AAB4AD; --ink-3:#7F8A83;
    --line:#2A312C; --line-2:#222822;
    --accent:#7EBA97; --accent-ink:#9BD0B1; --accent-soft:#1B2A21;
    --mark:#DB9068; --mark-soft:#2B2019;
    --shadow:0 1px 2px rgba(0,0,0,.4), 0 8px 24px -16px rgba(0,0,0,.8);
  }
}
:root[data-theme="dark"]{
  --ground:#111512; --surface:#181D19; --raise:#1E241F;
  --ink:#E5EAE5; --ink-2:#AAB4AD; --ink-3:#7F8A83;
  --line:#2A312C; --line-2:#222822;
  --accent:#7EBA97; --accent-ink:#9BD0B1; --accent-soft:#1B2A21;
  --mark:#DB9068; --mark-soft:#2B2019;
  --shadow:0 1px 2px rgba(0,0,0,.4), 0 8px 24px -16px rgba(0,0,0,.8);
}

*{box-sizing:border-box}
body{
  margin:0; background:var(--ground); color:var(--ink);
  font-family:'IBM Plex Sans KR','Apple SD Gothic Neo','Malgun Gothic',system-ui,sans-serif;
  font-size:16px; line-height:1.75; -webkit-text-size-adjust:100%;
}
a{color:var(--accent-ink); text-underline-offset:.18em; text-decoration-thickness:.06em}
:focus-visible{outline:2px solid var(--accent); outline-offset:2px; border-radius:3px}

/* ── 상단 막대 ── */
.bar{
  position:sticky; top:0; z-index:20; background:var(--surface);
  border-bottom:1px solid var(--line);
}
.bar-in{max-width:1180px; margin:0 auto; padding:0 20px}
.brand{display:flex; align-items:center; gap:10px; padding:12px 0 10px}
.leaf{width:20px;height:20px;flex:none;color:var(--accent)}
.brand b{font-weight:600; font-size:.94rem; letter-spacing:-.01em}
.brand span{color:var(--ink-3); font-size:.8rem; margin-left:auto; font-variant-numeric:tabular-nums}
.tabs{display:flex; gap:2px; overflow-x:auto; scrollbar-width:none}
.tabs::-webkit-scrollbar{display:none}
.tab{
  appearance:none; border:0; background:none; cursor:pointer; white-space:nowrap;
  font:inherit; font-size:.9rem; font-weight:500; color:var(--ink-3);
  padding:9px 12px 11px; border-bottom:2px solid transparent; border-radius:4px 4px 0 0;
}
.tab:hover{color:var(--ink-2); background:var(--raise)}
.tab[aria-selected="true"]{color:var(--accent-ink); border-bottom-color:var(--accent)}

/* ── 찾기 ── */
.find{padding:10px 0 12px; position:relative}
.find input{
  width:100%; font:inherit; font-size:.92rem; color:var(--ink);
  background:var(--raise); border:1px solid var(--line); border-radius:9px;
  padding:9px 12px 9px 34px;
}
.find input::placeholder{color:var(--ink-3)}
.find svg{position:absolute; left:11px; top:50%; transform:translateY(-50%); width:15px;height:15px; color:var(--ink-3)}
.hits{
  position:absolute; z-index:30; left:0; right:0; top:calc(100% - 4px);
  background:var(--surface); border:1px solid var(--line); border-radius:11px;
  box-shadow:var(--shadow); padding:6px; margin:0; list-style:none;
  max-height:min(60vh,420px); overflow:auto;
}
.hits li a{display:flex; gap:10px; align-items:baseline; padding:8px 10px; border-radius:7px; text-decoration:none; color:var(--ink)}
.hits li a:hover,.hits li a:focus-visible{background:var(--accent-soft)}
.hits .in{color:var(--ink-3); font-size:.78rem; margin-left:auto; white-space:nowrap}
.hits .none{padding:10px; color:var(--ink-3); font-size:.9rem}

/* ── 문서 ── */
.doc-head{max-width:1180px; margin:0 auto; padding:34px 20px 0}
.eyebrow{
  margin:0 0 6px; font-size:.72rem; font-weight:600; letter-spacing:.14em;
  color:var(--accent); text-transform:uppercase;
}
.doc-head h1{
  font-family:'Nanum Myeongjo',serif; font-weight:700; letter-spacing:-.02em;
  font-size:clamp(1.7rem,5vw,2.3rem); line-height:1.25; margin:0; text-wrap:balance;
}
.doc-body{max-width:1180px; margin:0 auto; padding:0 20px 80px; display:grid; gap:26px}
@media (min-width:1000px){
  .doc-body{grid-template-columns:230px minmax(0,1fr); gap:48px; align-items:start; padding-top:8px}
  .toc{position:sticky; top:calc(var(--bar-h) + 20px); max-height:calc(100vh - var(--bar-h) - 40px); overflow-y:auto}
}

/* 목차 */
.toc{padding-top:22px}
.toc details{border:1px solid var(--line); border-radius:12px; background:var(--surface); overflow:hidden}
.toc summary{
  cursor:pointer; list-style:none; padding:11px 14px; font-size:.86rem; font-weight:600;
  color:var(--ink-2); display:flex; align-items:center; gap:8px;
}
.toc summary::-webkit-details-marker{display:none}
.toc summary::after{content:'▾'; margin-left:auto; color:var(--ink-3); transition:transform .15s}
.toc details[open] summary::after{transform:rotate(180deg)}
.cnt{
  font-size:.72rem; font-weight:600; color:var(--accent-ink); background:var(--accent-soft);
  border-radius:99px; padding:1px 7px; font-variant-numeric:tabular-nums;
}
.toc-list{margin:0; padding:2px 8px 10px; list-style:none; counter-reset:t}
.toc-list li{counter-increment:t}
.toc-list a{
  display:flex; gap:9px; padding:5px 8px; border-radius:7px; font-size:.86rem;
  color:var(--ink-2); text-decoration:none; line-height:1.45;
}
.toc-list a::before{
  content:counter(t,decimal-leading-zero); color:var(--ink-3); font-size:.74rem;
  font-variant-numeric:tabular-nums; padding-top:.18em;
}
.toc-list a:hover{background:var(--raise); color:var(--ink)}
.toc-list a.on{background:var(--accent-soft); color:var(--accent-ink); font-weight:600}
@media (min-width:1000px){
  .toc summary{display:none}
  .toc details{border:0; background:none}
  .toc-list{padding:0}
}

/* ── 본문 ── */
.prose{max-width:var(--measure); min-width:0}
.prose h2{
  scroll-margin-top:calc(var(--bar-h) + 14px);
  font-size:1.3rem; font-weight:600; letter-spacing:-.015em; line-height:1.35;
  margin:56px 0 4px; padding-top:20px; border-top:1px solid var(--line); text-wrap:balance;
}
.prose h2:first-child{margin-top:22px; border-top:0; padding-top:0}
.hlink{color:inherit; text-decoration:none}
.hlink:hover{color:var(--accent-ink)}
.prose h3{
  scroll-margin-top:calc(var(--bar-h) + 14px);
  font-size:1.02rem; font-weight:600; color:var(--accent-ink);
  margin:34px 0 2px; letter-spacing:-.01em;
}
.prose p{margin:14px 0}
.prose ul,.prose ol{margin:14px 0; padding-left:1.35em}
.prose li{margin:7px 0}
.prose li::marker{color:var(--ink-3)}
.prose li span{display:block; color:var(--ink-2); font-size:.95em}
.prose li span.sub-note{color:var(--mark)}
.prose strong{font-weight:600}
code{
  font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,monospace;
  font-size:.86em; background:var(--raise); border:1px solid var(--line-2);
  border-radius:5px; padding:.1em .35em;
}

/* 멘트 — 환자분께 그대로 하는 말 */
.ment{
  margin:16px 0; padding:13px 16px 13px 17px; background:var(--surface);
  border-left:3px solid var(--accent); border-radius:0 10px 10px 0; box-shadow:var(--shadow);
}
.ment-tag{
  display:inline-block; font-size:.68rem; font-weight:600; letter-spacing:.12em;
  color:var(--accent); margin-bottom:3px;
}
.ment p{margin:0; font-size:1.02rem; line-height:1.7}

/* ※ 짚고 갈 것 */
.note{
  margin:16px 0; padding:11px 14px; background:var(--mark-soft);
  border-radius:10px; color:var(--ink-2); font-size:.95rem;
}
.note p{margin:0}
.note.tip{background:var(--accent-soft); color:var(--ink-2)}

/* Q · A */
.qa{margin:14px 0; padding-left:14px; border-left:2px solid var(--line)}
.qa p{margin:0; font-size:.96rem}

/* 표 */
.tw{overflow-x:auto; margin:18px 0; border:1px solid var(--line); border-radius:11px; background:var(--surface)}
table{border-collapse:collapse; width:100%; font-size:.92rem; font-variant-numeric:tabular-nums}
th,td{padding:9px 13px; text-align:left; border-bottom:1px solid var(--line-2); vertical-align:top}
th{font-weight:600; color:var(--ink-2); font-size:.82rem; letter-spacing:.02em; background:var(--raise); white-space:nowrap}
tbody tr:last-child td{border-bottom:0}

/* 화면 그림 */
.shot{margin:18px 0; display:block}
.shot img{
  display:block; max-width:100%; height:auto; border:1px solid var(--line);
  border-radius:9px; background:var(--surface); cursor:zoom-in;
}
.shot figcaption{margin-top:7px; font-size:.8rem; color:var(--ink-3)}
dialog.lb{border:0; padding:0; background:none; max-width:96vw; max-height:96vh}
dialog.lb::backdrop{background:rgba(10,14,11,.86)}
dialog.lb img{max-width:96vw; max-height:92vh; border-radius:10px; display:block}
dialog.lb button{
  position:fixed; top:14px; right:16px; font:inherit; font-size:.85rem; cursor:pointer;
  background:var(--surface); color:var(--ink); border:1px solid var(--line);
  border-radius:8px; padding:6px 12px;
}

.foot{
  max-width:1180px; margin:0 auto; padding:26px 20px 60px; color:var(--ink-3);
  font-size:.82rem; border-top:1px solid var(--line);
}
@media (max-width:640px){
  :root{--bar-h:140px}
  .brand{padding:9px 0 7px}
  .brand b{font-size:.88rem}
  .find{padding:6px 0 9px}
}
@media print{
  .bar,.toc,.foot{display:none}
  .doc[hidden]{display:block !important}
  .prose{max-width:none}
  .shot img{border-color:#ccc}
}
@media (prefers-reduced-motion:reduce){*{transition:none !important; animation:none !important}}
'''

JS = r'''
const SECTIONS = __NAV__;
const docs = [...document.querySelectorAll('.doc')];
const tabs = [...document.querySelectorAll('.tab')];

function show(key, anchor){
  docs.forEach(d => d.hidden = d.id !== key);
  tabs.forEach(t => t.setAttribute('aria-selected', String(t.dataset.doc === key)));
  syncToc();
  if(anchor){
    const el = document.getElementById(anchor);
    if(el){ el.scrollIntoView({block:'start'}); return; }
  }
  window.scrollTo(0,0);
}
function route(){
  const h = decodeURIComponent(location.hash.slice(1));
  if(!h) return show('home');
  const key = h.split('--')[0];
  if(docs.some(d => d.id === key)) show(key, h.includes('--') ? h : null);
}
tabs.forEach(t => t.addEventListener('click', () => { location.hash = t.dataset.doc; route(); }));
window.addEventListener('hashchange', route);

/* 목차: 넓은 화면에서는 늘 펼쳐 둔다 */
function syncToc(){
  const wide = window.matchMedia('(min-width:1000px)').matches;
  document.querySelectorAll('.toc details').forEach(d => { if(wide) d.open = true; });
}
window.addEventListener('resize', syncToc);

/* 찾기 */
const box = document.getElementById('q');
const hits = document.getElementById('hits');
function render(list){
  if(!list.length){ hits.innerHTML = '<li class="none">찾는 항목이 없습니다.</li>'; hits.hidden = false; return; }
  hits.innerHTML = list.slice(0,12).map(s =>
    `<li><a href="#${s.anchor}">${s.title}<span class="in">${s.tab}</span></a></li>`).join('');
  hits.hidden = false;
}
box.addEventListener('input', () => {
  const q = box.value.trim();
  if(!q){ hits.hidden = true; return; }
  render(SECTIONS.filter(s => s.title.includes(q) || s.tab.includes(q)));
});
box.addEventListener('focus', () => { if(box.value.trim()) hits.hidden = false; });
hits.addEventListener('click', e => {
  if(e.target.closest('a')){ hits.hidden = true; box.value = ''; box.blur(); }
});
document.addEventListener('click', e => {
  if(!e.target.closest('.find')) hits.hidden = true;
});
box.addEventListener('keydown', e => {
  if(e.key === 'Escape'){ box.value=''; hits.hidden = true; box.blur(); }
  if(e.key === 'Enter'){ const a = hits.querySelector('a'); if(a && !hits.hidden) a.click(); }
});

/* 읽고 있는 절을 목차에서 표시 */
const seen = new Map();
const io = new IntersectionObserver(es => {
  es.forEach(en => seen.set(en.target.id, en.isIntersecting));
  document.querySelectorAll('.toc-list a').forEach(a => {
    a.classList.toggle('on', seen.get(a.getAttribute('href').slice(1)) === true);
  });
}, {rootMargin:'-160px 0px -70% 0px'});
document.querySelectorAll('.prose h2[id]').forEach(h => io.observe(h));

/* 화면 그림 크게 보기 */
const lb = document.getElementById('lb');
const lbImg = lb.querySelector('img');
document.addEventListener('click', e => {
  const img = e.target.closest('.shot img');
  if(img){ lbImg.src = img.src; lbImg.alt = img.alt; lb.showModal(); }
});
lb.addEventListener('click', e => { if(e.target !== lbImg) lb.close(); });

route();
syncToc();
'''

nav_json = json.dumps(nav, ensure_ascii=False)
page = f'''<title>김포한강한의원 업무 매뉴얼</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600&family=IBM+Plex+Mono:wght@400&family=Nanum+Myeongjo:wght@700&display=swap">
<style>{CSS}</style>

<header class="bar">
  <div class="bar-in">
    <div class="brand">
      <svg class="leaf" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
      </svg>
      <b>김포한강한의원 업무 매뉴얼</b>
      <span>031-8049-7541</span>
    </div>
    <nav class="tabs" role="tablist" aria-label="매뉴얼">{tabs}</nav>
    <div class="find">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg>
      <input id="q" type="search" placeholder="찾기 — 자보, 탕전, 수납, 예약…" autocomplete="off" aria-label="항목 찾기">
      <ul class="hits" id="hits" hidden></ul>
    </div>
  </div>
</header>

<main>
{"".join(sections)}
</main>

<footer class="foot">
  실제로 하는 일과 다르면 문서가 틀린 것입니다. 고칠 부분은 원장님께 알려주세요.<br>
  「※ 확인 필요」라고 적힌 곳은 아직 정해지지 않은 부분입니다.
</footer>

<dialog class="lb" id="lb"><button type="button" onclick="document.getElementById('lb').close()">닫기</button><img src="" alt=""></dialog>

<script>{JS.replace("__NAV__", nav_json)}</script>
'''

out = '/tmp/claude-0/-home-user-hangang/ae04bd92-914f-5ef1-b1a8-20c7cacfebd6/scratchpad/site/manual.html'
open(out, 'w', encoding='utf-8').write(page)
print('절', len(nav), '· 그림', len(imgs), '· 용량', round(len(page.encode())/1024/1024, 2), 'MB')
