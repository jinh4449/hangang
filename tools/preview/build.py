"""크롤한 페이지를 아티팩트로 올릴 단일 HTML 한 장으로 묶는다.

    python3 tools/preview/build.py

crawl.mjs 가 만든 .cache/crawl.json 을 읽어 .cache/preview.html 을 낸다.

주의할 점 두 가지.
  - 미리보기 껍데기는 폭을 잡지 않는다. 페이지가 제 반응형 규칙대로 화면을
    다 써야 한다. 무대를 고정폭으로 두면 넓은 화면에서 한쪽이 비어 보인다.
  - 폰트는 실제 쓰인 글자만 남겨 심는다. 통째로 넣으면 6MB가 넘는다.
"""

import base64
import html as html_mod
import io
import json
import re
from pathlib import Path
from urllib.parse import unquote

from fontTools import subset

HERE = Path(__file__).parent
CACHE = HERE / ".cache"
ROOT = HERE.parent.parent
FONT_DIR = ROOT / "node_modules/pretendard/dist/web/static/woff2"

WEIGHTS = {400: "Regular", 500: "Medium", 600: "SemiBold", 700: "Bold", 800: "ExtraBold", 900: "Black"}

data = json.loads((CACHE / "crawl.json").read_text())
css, pages = data["css"], data["pages"]

# ── 실제로 쓰인 글자만 모은다 ─────────────────────────────────
text = "".join(p["body"] for p in pages)
chars = set(text)
# 눈에 안 띄는 자리에서 두부가 뜨지 않도록 기본 라틴은 통째로 넣는다
chars |= {chr(c) for c in range(0x20, 0x7F)}
unicodes = sorted(ord(c) for c in chars if ord(c) > 31)
print(f"글자 {len(unicodes)}자")

# ── 그 글자만 남기고 폰트를 깎는다 ────────────────────────────
faces = []
for weight, name in WEIGHTS.items():
    src = FONT_DIR / f"Pretendard-{name}.woff2"
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.desubroutinize = True
    opts.layout_features = ["kern", "liga", "calt"]
    opts.notdef_outline = False
    font = subset.load_font(str(src), opts)
    subsetter = subset.Subsetter(options=opts)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    buf = io.BytesIO()
    subset.save_font(font, buf, opts)
    font.close()
    raw = buf.getvalue()
    print(f"  {weight:>3} {src.stat().st_size // 1024:>4}KB → {len(raw) // 1024:>3}KB")
    faces.append(
        "@font-face{font-family:Pretendard;font-style:normal;font-display:swap;"
        f"font-weight:{weight};"
        f"src:url(data:font/woff2;base64,{base64.b64encode(raw).decode()}) format('woff2')}}"
    )

# ── 로컬 서버를 가리키는 참조를 걷어낸다 ──────────────────────
css = re.sub(r"@font-face\s*\{[^}]*\}", "", css)
css = re.sub(r"url\((['\"]?)(?:https?://localhost:\d+)?/_next/[^)]*\)", "url()", css)
# Outfit(next/font)은 구글 폰트로 대체한다. 아티팩트가 허용하는 유일한 외부 호스트다
css = css.replace("var(--font-outfit)", "'Outfit'")

# ── 내부 링크를 해시 라우팅으로 바꾼다 ────────────────────────
known = {p["route"] for p in pages}


def rewrite(html: str) -> str:
    def sub(m):
        href = m.group(1)
        if href in known:
            return f'href="#{href}"'
        if href.startswith("/") and not href.startswith("//"):
            # 미리보기에 없는 페이지는 죽은 링크로 두지 않고 표시만 남긴다
            return f'href="#" data-missing="{href}"'
        return m.group(0)

    html = re.sub(r'href="(/[^"]*)"', sub, html)
    # 지도 iframe 은 아티팩트 CSP 가 막는다. 자리만 알려 준다
    html = re.sub(
        r"<iframe[^>]*></iframe>",
        '<div class="pv-noembed">지도는 미리보기에서 표시되지 않습니다 · '
        "실제 사이트에서는 정상 표시됩니다</div>",
        html,
    )
    return embed_images(html)


# ── public/ 이미지를 통째로 심는다 ───────────────────────────
# next/image 는 /_next/image?url=... 로 서빙하는데 아티팩트에는 그 경로가 없다.
# 원본을 data URI 로 바꿔야 사진이 뜬다.
PUBLIC = ROOT / "public"
_MIME = {".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
         ".svg": "image/svg+xml", ".avif": "image/avif", ".gif": "image/gif"}
_embedded: dict[str, str] = {}


def _data_uri(name: str) -> str | None:
    if name in _embedded:
        return _embedded[name]
    path = PUBLIC / name.lstrip("/")
    mime = _MIME.get(path.suffix.lower())
    if not path.is_file() or mime is None:
        return None
    uri = f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"
    _embedded[name] = uri
    print(f"  이미지 {name}  {path.stat().st_size // 1024}KB")
    return uri


def embed_images(html: str) -> str:
    # srcset 은 여러 폭을 나열하는데 원본 한 장으로 충분하다. 통째로 지운다
    html = re.sub(r'\ssrcsets?="[^"]*"', "", html)

    def sub(m):
        raw = html_mod.unescape(m.group(1))
        # /_next/image?url=%2Fclinic-interior.jpg&w=... 에서 원본 경로를 되찾는다
        hit = re.search(r"[?&]url=([^&]+)", raw)
        name = unquote(hit.group(1)) if hit else raw
        uri = _data_uri(name)
        return f'src="{uri}"' if uri else m.group(0)

    return re.sub(r'src="(/[^"]*)"', sub, html)


sections = "".join(
    f'<div class="pv-page" data-route="{p["route"]}" hidden>{rewrite(p["body"])}</div>' for p in pages
)
options = "".join(
    f'<option value="{p["route"]}">{p["route"]}</option>'
    for p in sorted(pages, key=lambda x: x["route"])
)

SHELL = """
/* 껍데기는 폭을 잡지 않는다. 페이지가 제 반응형 규칙대로 화면을 다 쓴다 */
.pv-page{width:100%}
.pv-toast{position:fixed;left:50%;bottom:5rem;transform:translateX(-50%);z-index:70;
  background:#171a18;color:#fbfbf9;border-radius:9999px;padding:.75rem 1.5rem;
  font-size:.9375rem;font-weight:500;box-shadow:0 12px 32px rgba(0,0,0,.22)}
.pv-noembed{display:flex;align-items:center;justify-content:center;min-height:14rem;
  border:1px dashed var(--line,#e6e8e3);border-radius:1rem;background:var(--surface-2,#f5f6f4);
  color:var(--faint,#8d958f);font-size:.8125rem;text-align:center;padding:1.5rem;line-height:1.7}
.pv-bar{position:fixed;right:1rem;bottom:1rem;z-index:2147483647;display:flex;gap:.5rem;
  align-items:center;padding:.5rem .625rem;border-radius:999px;background:#171a18;
  box-shadow:0 6px 24px rgba(0,0,0,.28)}
.pv-bar select{appearance:none;border:0;border-radius:999px;background:#2a2f2c;color:#fff;
  font:inherit;font-size:.75rem;padding:.375rem .75rem;width:11rem;cursor:pointer;
  text-overflow:ellipsis}
.pv-bar span{color:#8d958f;font-size:.6875rem;letter-spacing:.08em;text-transform:uppercase}
@media print{.pv-bar{display:none}}
"""

JS = """
(function(){
  var pages=[].slice.call(document.querySelectorAll('.pv-page'));
  var sel=document.getElementById('pv-route');
  function show(route){
    var hit=false;
    pages.forEach(function(el){
      var on=el.dataset.route===route;
      el.hidden=!on; if(on)hit=true;
    });
    if(!hit&&pages.length){pages[0].hidden=false;route=pages[0].dataset.route;}
    sel.value=route;
    window.scrollTo(0,0);
  }
  function fromHash(){
    var h=decodeURIComponent(location.hash.replace(/^#/,''))||'/';
    show(h.charAt(0)==='/'?h:'/');
  }
  // 크롤러가 애니메이션을 최종 상태로 굳혀 담기 때문에, 움직임을 보여주려면
  // 미리보기에서 다시 걸어줘야 한다. 화면에 들어올 때 한 번씩 재생한다
  if (window.IntersectionObserver) {
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(!e.isIntersecting) return;
        var el=e.target;
        el.style.animation='none';
        // SVG 요소에는 offsetWidth 가 없다. 리플로우는 이걸로 강제한다
        el.getBoundingClientRect();
        el.style.animation='';
      });
    },{threshold:.35});
    document.querySelectorAll('.ring-arc,.ring-label').forEach(function(el){io.observe(el);});
  }

  sel.addEventListener('change',function(){location.hash=sel.value;});
  window.addEventListener('hashchange',fromHash);
  document.addEventListener('click',function(e){
    if(!e.target.closest)return;
    var a=e.target.closest('a[data-missing]');
    if(a){e.preventDefault();return;}
    /* 미리보기는 정적 스냅샷이라 PhoneLink 가 붙지 않는다.
       tel: 을 그대로 두면 샌드박스가 오류 화면을 띄우므로 여기서 막고
       실제 사이트에서 PC 가 하는 일(복사)을 흉내 낸다 */
    var t=e.target.closest('a[href^="tel:"]');
    if(t){
      e.preventDefault();
      var num=t.getAttribute('href').slice(4);
      if(navigator.clipboard)navigator.clipboard.writeText(num).catch(function(){});
      var el=document.createElement('div');
      el.className='pv-toast';
      el.textContent='전화번호를 복사했습니다 · '+num;
      document.body.appendChild(el);
      setTimeout(function(){el.remove();},2600);
    }
  });
  fromHash();
})();
"""

html = f"""<title>김포한강한의원 미리보기</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>{"".join(faces)}</style>
<style>{css}</style>
<style>{SHELL}</style>
{sections}
<div class="pv-bar"><span>미리보기</span><select id="pv-route" aria-label="페이지 선택">{options}</select></div>
<script>{JS}</script>
"""

out = CACHE / "preview.html"
out.write_text(html)
print(f"\n{out}  {out.stat().st_size / 1024 / 1024:.2f}MB")
