"""Share images (Open Graph / X cards) for every page: 1200x630 PNGs in og/.

Each image carries the page's H1 as the headline, its section and address,
and the Videngine mark. Run after adding or retitling a page:

    pip install playwright && python -m playwright install chromium
    python3 scripts/og_images.py            # every page
    python3 scripts/og_images.py pricing    # pages whose path contains "pricing"

Fonts load from Google Fonts. Set OG_FONT_DIR to a folder holding
inter-tight-latin-{400,500,600}-normal.woff2 to render offline.
"""
import asyncio, base64, html, os, re, sys
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "og"
SECTIONS = [("youtube/", "YouTube"), ("youtube", "YouTube"), ("explainers/", "Explainers"), ("explainers", "Explainers"), ("training/", "Training"), ("training", "Training"), ("slideshows/", "Slideshows"), ("slideshows", "Slideshows"), ("video-seo/", "Video SEO"), ("video-seo", "Video SEO"), ("glossary", "Glossary"), ("about", "About"), ("industries/", "Industry"), ("industries", "Industries"), ("use-cases/", "Use case"), ("use-cases", "Use cases"), ("notes/", "Guide"), ("vs/", "Comparison"), ("compare", "Comparison"), ("pricing", "Pricing"),
            ("programmatic-video", "Definition"), ("ai-video-tools", "Guide"), ("notes", "Notes"),
            ("terms", "Legal"), ("privacy", "Legal"), ("index", "Programmatic video engine")]

def pages():
    for f in sorted(ROOT.rglob("*.html")):
        rel = f.relative_to(ROOT).as_posix()
        if rel.startswith(("scripts/", "og/", "node_modules/")): continue
        yield f, rel[:-5]

def headline(src: str) -> str:
    m = re.search(r"<h1[^>]*>(.*?)</h1>", src, re.S)
    text = m.group(1) if m else ""
    text = re.sub(r"<br\s*/?>", "\n", text)
    text = html.unescape(re.sub(r"<[^>]+>", "", text))
    return "\n".join(re.sub(r"\s+", " ", l).strip() for l in text.split("\n") if l.strip())

def section(slug: str) -> str:
    return next((label for key, label in SECTIONS if slug.startswith(key) or slug == key), "Videngine")

def address(slug: str) -> str:
    return "videngine.io" + ("" if slug == "index" else "/" + slug)

TEMPLATE = """<!doctype html><html><head><meta charset="utf-8"><style>
{fonts}
*{{margin:0;box-sizing:border-box}}
body{{width:1200px;height:630px;overflow:hidden;background:#fafafa;color:#0b0b0b;font-family:'Inter Tight',Arial,sans-serif;position:relative}}
.brand{{position:absolute;left:84px;top:72px;display:flex;align-items:center;gap:14px;font-size:40px;font-weight:600;letter-spacing:-2px}}
.brand i{{width:46px;height:46px;border-radius:11px;background:#ff6036;display:grid;place-items:center}}
.brand svg{{width:33px;fill:#18191b}} .brand b{{color:#ff6036;font-weight:600}}
h1{{position:absolute;left:84px;top:180px;width:700px;font-size:76px;line-height:1.02;font-weight:600;letter-spacing:-.035em;white-space:pre-line}}
.foot{{position:absolute;left:84px;bottom:66px;display:flex;gap:18px;align-items:baseline;font-size:25px;font-weight:500}}
.foot span{{color:#777773;font-weight:400}}
.tile{{position:absolute;right:-96px;top:118px;width:470px;height:470px;border-radius:108px;background:#ff6036;display:grid;place-items:center}}
.tile svg{{width:250px;margin-left:-40px;fill:#18191b}}
</style></head><body>
<div class="brand"><i><svg viewBox="0 0 24 24"><path d="m8 5 12 7-12 7z"/></svg></i><span>videngine<b>.</b></span></div>
<h1 id="h">{headline}</h1>
<div class="foot">{section}<span>{address}</span></div>
<div class="tile"><svg viewBox="0 0 24 24"><path d="M7 4.2 21 12 7 19.8z"/></svg></div>
<script>
// Fit the headline: largest size (76px down to 46px) that keeps it within four lines and above the footer.
const h=document.getElementById('h');let s=76;
while(s>46&&(h.getBoundingClientRect().bottom>500||h.getBoundingClientRect().height>s*1.02*4+2)){{s-=2;h.style.fontSize=s+'px';}}
</script></body></html>"""

def fonts_css() -> str:
    d = os.environ.get("OG_FONT_DIR")
    if not d:
        return "@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=block');"
    data = lambda w: base64.b64encode(Path(d, f"inter-tight-latin-{w}-normal.woff2").read_bytes()).decode()
    return "".join(f"@font-face{{font-family:'Inter Tight';font-weight:{w};src:url(data:font/woff2;base64,{data(w)}) format('woff2')}}" for w in (400, 500, 600))

async def main(filters):
    OUT.mkdir(exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1200, "height": 630})
        for f, slug in pages():
            if filters and not any(x in slug for x in filters): continue
            body = TEMPLATE.format(fonts=fonts_css(), headline=html.escape(headline(f.read_text("utf8"))),
                                   section=html.escape(section(slug)), address=html.escape(address(slug)))
            await page.set_content(body, wait_until="networkidle")
            await page.evaluate("document.fonts.ready")
            target = OUT / f"{'home' if slug == 'index' else slug}.png"
            target.parent.mkdir(parents=True, exist_ok=True)
            await page.screenshot(path=str(target))
            print(target.relative_to(ROOT))
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main(sys.argv[1:]))
