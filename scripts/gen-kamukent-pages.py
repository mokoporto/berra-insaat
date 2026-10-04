# -*- coding: utf-8 -*-
"""
KamuKent SEO alt sayfalarını ortak şablondan üretir.
Çalıştırma: python3 scripts/gen-kamukent-pages.py
Çıktılar: public/kamukent-insaat.html, kamukent-arsa.html, kamukent-ruhsat.html,
          kamukent-haberler.html, kamukent-haberler/parsel-sorgulama-yayinda.html
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

SITE = "https://berrayapi.com"
PHONE_DISPLAY = "0533 818 29 31"
PHONE_TEL = "+905338182931"
EMAIL = "info@berramuhendislik.com"
ADDRESS = "Kazım Karabekir Cad. No: 28, Mordoğan Mah. Karaburun / İzmir"
WA_LINK = ("https://wa.me/905338182931?text="
           "Merhaba%2C%20KamuKent%20parselim%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.")
WA_SVG = ('<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-'
          '.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173'
          '.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173'
          '-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05'
          '-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371'
          '-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213'
          ' 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118'
          '.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347'
          'm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86'
          ' 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825'
          ' 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0'
          ' 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882'
          ' 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48'
          '-8.413Z"/></svg>')

CSS_EXTRA = """
.breadcrumb{background:var(--bg-soft);border-bottom:1px solid var(--line);font-size:.85rem;padding:.6rem 0;}
.breadcrumb ol{list-style:none;display:flex;flex-wrap:wrap;gap:.4rem;margin:0 auto;padding:0 1.25rem;max-width:50rem;}
.breadcrumb li{display:flex;align-items:center;gap:.4rem;color:var(--muted);}
.breadcrumb li+li::before{content:'›';color:var(--muted);}
.breadcrumb a{color:var(--brand);text-decoration:none;}
.breadcrumb [aria-current]{color:var(--ink);font-weight:600;}
.knav{display:grid;gap:.6rem;margin:1.25rem 0;}@media(min-width:640px){.knav{grid-template-columns:repeat(2,1fr);}}
.knav a{display:flex;align-items:center;justify-content:space-between;gap:.6rem;border:1px solid var(--line);border-radius:.9rem;padding:.85rem 1.1rem;text-decoration:none;font-weight:600;color:var(--navy);transition:border-color .2s,background .2s;}
.knav a:hover{border-color:var(--aqua);background:var(--bg-soft);}
.knav a span{color:var(--aqua);font-weight:700;}
table.cmp{border-collapse:collapse;width:100%;font-size:.88rem;margin:1.25rem 0;background:#fff;}
table.cmp th,table.cmp td{border:1px solid var(--line);padding:.6rem .8rem;text-align:left;vertical-align:top;}
table.cmp thead th{background:var(--navy);color:#fff;font-family:'Sora',sans-serif;}
table.cmp td.yes{color:#1a7f4b;font-weight:700;}
table.cmp td.no{color:#b04444;}
table.cmp td.opt{color:#a06a00;}
.galeri{display:grid;gap:.75rem;grid-template-columns:repeat(2,1fr);margin:1.25rem 0;}@media(min-width:768px){.galeri{grid-template-columns:repeat(4,1fr);}}
.galeri figure{margin:0;}
.galeri img{width:100%;height:11rem;object-fit:cover;border-radius:.8rem;display:block;}
.galeri figcaption{font-size:.75rem;color:var(--muted);margin-top:.3rem;}
.haber-list{display:grid;gap:1rem;margin:1.25rem 0;}
.haber-kart{display:block;border:1px solid var(--line);border-radius:1rem;padding:1.25rem 1.4rem;text-decoration:none;color:inherit;transition:border-color .2s,box-shadow .2s;}
.haber-kart:hover{border-color:var(--aqua);box-shadow:0 6px 20px rgba(16,22,45,.08);}
.haber-kart time{font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--aqua);}
.haber-kart h2,.haber-kart h3{color:var(--navy);margin:.35rem 0 .4rem;font-size:1.15rem;}
.haber-kart p{margin:0;color:var(--muted);font-size:.93rem;}
.form-card{border:1px solid var(--line);border-radius:1.25rem;padding:1.5rem;margin:2.5rem 0 1rem;background:#fff;}
.form-card h2{margin-top:0;}
.form-grid{display:grid;gap:.9rem;}@media(min-width:640px){.form-grid{grid-template-columns:1fr 1fr;}}
.form-grid .full{grid-column:1/-1;}
.form-grid label{display:block;font-size:.85rem;font-weight:600;color:var(--navy);margin-bottom:.3rem;}
.form-grid input,.form-grid select,.form-grid textarea{width:100%;border:1px solid var(--line);border-radius:.7rem;padding:.65rem .85rem;font-size:.95rem;font-family:inherit;color:var(--ink);background:#fff;}
.form-grid input:focus,.form-grid select:focus,.form-grid textarea:focus{outline:2px solid var(--aqua);outline-offset:1px;border-color:var(--aqua);}
.form-grid textarea{resize:vertical;}
.form-grid .btn{border:none;cursor:pointer;font-family:inherit;}
.form-note{font-size:.82rem;color:var(--muted);margin:.8rem 0 0;}
.ok-box{display:none;border:1px solid #9fd8b4;background:#eefaf1;border-radius:.9rem;padding:1rem 1.2rem;margin-top:1rem;color:#1a5c36;font-weight:600;}
.err-box{display:none;border:1px solid #e5b6b6;background:#fdeeee;border-radius:.9rem;padding:1rem 1.2rem;margin-top:1rem;color:#8c2f2f;}
.meta{font-size:.82rem;color:var(--muted);}
"""

BUSINESS = {
    "@type": "GeneralContractor",
    "@id": f"{SITE}/#isletme",
    "name": "Berra Proje ve İnşaat",
    "url": f"{SITE}/",
    "logo": f"{SITE}/images/logo.png",
    "image": f"{SITE}/images/og-image.jpg",
    "description": ("Karaburun / İzmir merkezli mühendislik ve inşaat firması. Kaba inşaat, ileri kaba "
                    "inşaat, anahtar teslim inşaat, restorasyon, yapı ruhsatı ve yapı kullanma aşamaları, "
                    "betonarme proje müellifliği, fenni mesul görevi ve Enerji Kimlik Belgesi hizmetleri."),
    "telephone": "+90 533 818 29 31",
    "email": EMAIL,
    "foundingDate": "2016",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kazım Karabekir Cad. No: 28, Mordoğan Mah.",
        "addressLocality": "Karaburun",
        "addressRegion": "İzmir",
        "postalCode": "35970",
        "addressCountry": "TR",
    },
    "geo": {"@type": "GeoCoordinates", "latitude": 38.6383, "longitude": 26.5136},
    "areaServed": [
        {"@type": "Place", "name": "Mordoğan"},
        {"@type": "Place", "name": "Karaburun"},
        {"@type": "City", "name": "İzmir"},
    ],
    "openingHours": "Mo-Sa 08:30-18:30",
    "sameAs": [],
}

WEBSITE = {
    "@type": "WebSite",
    "@id": f"{SITE}/#website",
    "url": f"{SITE}/",
    "name": "Berra Proje ve İnşaat",
    "inLanguage": "tr-TR",
}


def breadcrumb_json(slug: str, name: str) -> dict:
    items = [
        {"@type": "ListItem", "position": 1, "name": "Anasayfa", "item": f"{SITE}/"},
        {"@type": "ListItem", "position": 2, "name": "KamuKent", "item": f"{SITE}/kamukent"},
    ]
    if slug != "kamukent":
        items.append({"@type": "ListItem", "position": 3, "name": name, "item": f"{SITE}/{slug}"})
    return {"@type": "BreadcrumbList", "itemListElement": items}


def breadcrumb_html(current: str) -> str:
    return (
        '<nav class="breadcrumb" aria-label="Sayfa yolu">'
        '<ol><li><a href="/">Anasayfa</a></li>'
        '<li><a href="/kamukent">KamuKent</a></li>'
        f'<li><span aria-current="page">{current}</span></li></ol></nav>'
    )


def faq_json(faqs) -> dict:
    return {
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q,
             "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in faqs
        ],
    }


def sss_html(faqs) -> str:
    items = "".join(
        f"<details><summary>{q}</summary><p>{a}</p></details>" for q, a in faqs
    )
    return f'<h2>Sık sorulan sorular</h2>{items}'


FORM_HTML = f"""
<div class="form-card" id="teklif">
  <h2>Teklif Alın — 1 dk'da</h2>
  <p>Ada ve parsel numaranızı yazın; kat durumunuzu birlikte teyit edelim, size özel fiyat ve
     ödeme planını iletelim. Formu doldurmanız <strong>1 dakikadan kısa</strong> sürer.</p>
  <form id="teklif-form" action="https://formsubmit.co/{EMAIL}" method="POST">
    <input type="hidden" name="_subject" value="KamuKent Teklif Talebi — berrayapi.com" />
    <input type="hidden" name="_template" value="table" />
    <input type="hidden" name="_captcha" value="false" />
    <div class="form-grid">
      <div><label for="f-name">Ad Soyad *</label>
        <input id="f-name" name="Ad Soyad" required placeholder="Adınız Soyadınız" /></div>
      <div><label for="f-phone">Telefon *</label>
        <input id="f-phone" name="Telefon" type="tel" required placeholder="05XX XXX XX XX" /></div>
      <div><label for="f-ada">Ada No *</label>
        <input id="f-ada" name="Ada No" inputmode="numeric" required placeholder="Örn. 470" /></div>
      <div><label for="f-parsel">Parsel No *</label>
        <input id="f-parsel" name="Parsel No" inputmode="numeric" required placeholder="Örn. 3" /></div>
      <div><label for="f-kat">Kat İmarı</label>
        <select id="f-kat" name="Kat İmarı">
          <option value="Bilmiyorum">Bilmiyorum (sorguda belirlenir)</option>
          <option value="2.5 Kat">2.5 Kat</option>
          <option value="3.5 Kat">3.5 Kat</option>
        </select></div>
      <div><label for="f-type">İnşaat Türü</label>
        <select id="f-type" name="İnşaat Türü">
          <option>Anahtar Teslim İnşaat</option>
          <option>İleri Kaba İnşaat</option>
          <option>Kaba İnşaat</option>
          <option>Henüz kararsızım</option>
        </select></div>
      <div class="full"><label for="f-msg">Mesajınız</label>
        <textarea id="f-msg" name="Mesaj" rows="3" placeholder="Arsanızdan ve hedefinizden kısaca bahsedin..."></textarea></div>
      <div class="full"><button type="submit" class="btn btn-aqua">Teklif Talebi Gönder</button></div>
    </div>
    <p class="form-note">Bilgileriniz yalnızca teklif için kullanılır; üçüncü kişilerle paylaşılmaz.</p>
  </form>
  <div class="ok-box" id="form-ok">Talebiniz alındı — en kısa sürede sizi arıyoruz. Teşekkürler.</div>
  <div class="err-box" id="form-err">Gönderim başarısız oldu. Lütfen tekrar deneyin veya bizi telefonla arayın.</div>
</div>
"""

FORM_JS = """
<script>
(function () {
  var form = document.getElementById('teklif-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var body = { _subject: data.get('_subject'), _template: 'table', _captcha: 'false' };
    data.forEach(function (v, k) { if (k.charAt(0) !== '_' && String(v).trim() !== '') body[k] = v; });
    fetch('https://formsubmit.co/ajax/info@berramuhendislik.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    }).then(function (r) {
      if (r.ok) { form.style.display = 'none'; document.getElementById('form-ok').style.display = 'block'; }
      else { document.getElementById('form-err').style.display = 'block'; }
    }).catch(function () { document.getElementById('form-err').style.display = 'block'; });
  });
})();
</script>
"""

FOOTER_LINKS = """
<nav>
  <a href="/">Anasayfa</a>
  <a href="/kamukent">KamuKent Parsel Sorgulama</a>
  <a href="/kamukent-insaat">KamuKent İnşaat</a>
  <a href="/kamukent-arsa">KamuKent Arsa</a>
  <a href="/kamukent-ruhsat">KamuKent Ruhsat</a>
  <a href="/kamukent-haberler">KamuKent Haberler</a>
  <a href="/hakkimizda">Hakkımızda</a>
  <a href="/iletisim">İletişim</a>
  <a href="/gizlilik">Gizlilik Politikası</a>
</nav>
"""


def page(*, slug: str, title: str, description: str, badge: str, h1: str, lead: str,
         ctas: str, content: str, jsonld_extra=None, jsonld_graph_extra=None,
         modified: str = "2026-10-04", published: str = "2026-10-04",
         hero_class: str = "") -> str:
    graph = [BUSINESS, WEBSITE, breadcrumb_json(slug, title.split("|")[0].strip())]
    if jsonld_extra:
        graph.extend(jsonld_extra)
    if jsonld_graph_extra:
        graph.append(jsonld_graph_extra)
    webpage = {
        "@type": "WebPage",
        "@id": f"{SITE}/{slug}#sayfa",
        "url": f"{SITE}/{slug}",
        "name": title,
        "inLanguage": "tr-TR",
        "datePublished": published,
        "dateModified": modified,
        "isPartOf": {"@id": f"{SITE}/#website"},
        "about": {"@id": f"{SITE}/#isletme"},
    }
    graph.append(webpage)
    ld = {"@context": "https://schema.org", "@graph": graph}

    og_title = title
    return f"""<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content="{description}" />
    <link rel="preload" as="style" href="/fonts/fonts.css" />
    <link href="/fonts/fonts.css" rel="stylesheet" />
    <link rel="canonical" href="{SITE}/{slug}" />
    <link rel="privacy-policy" href="/gizlilik" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#10162d" />
    <meta name="author" content="Berra Proje ve İnşaat Mühendislik Ekibi" />
    <meta property="article:published_time" content="{published}" />
    <meta property="article:modified_time" content="{modified}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Berra Proje ve İnşaat" />
    <meta property="og:locale" content="tr_TR" />
    <meta property="og:url" content="{SITE}/{slug}" />
    <meta property="og:title" content="{og_title}" />
    <meta property="og:description" content="{description}" />
    <meta property="og:image" content="{SITE}/images/og-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{og_title}" />
    <meta name="twitter:description" content="{description}" />
    <link rel="icon" type="image/png" href="/images/mark.png" />
    <style>{CSS_EXTRA}</style>
    <script type="application/ld+json">
{json.dumps(ld, ensure_ascii=False, indent=2)}
    </script>
  </head>
  <body>
    <!--email_off-->
    <header class="hero {hero_class}">
      <div class="wrap">
        <span class="badge">{badge}</span>
        <h1>{h1}</h1>
        <p class="lead">{lead}</p>
        <div class="cta-row">{ctas}</div>
      </div>
    </header>
    {breadcrumb_html(title.split("|")[0].strip())}
    <main class="wrap">
{content}
      <div class="contact-band">
        <h2>Sorunuz mu var?</h2>
        <p>Telefon: <a href="tel:{PHONE_TEL}" style="color:#fff">{PHONE_DISPLAY}</a> · E-posta: <a href="mailto:{EMAIL}" style="color:#fff">{EMAIL}</a></p>
        <p>{ADDRESS}</p>
        <div class="cta-row" style="justify-content:center;">
          <a class="btn btn-aqua" href="/#kamukent-teklif">1 dk'da Teklif Alın</a>
          <a class="btn" href="{WA_LINK}" target="_blank" rel="noopener noreferrer" style="background:#25D366;">WhatsApp'tan Sorun</a>
        </div>
      </div>
      {FORM_HTML}
    </main>
    <a class="wa-float" href="{WA_LINK}" target="_blank" rel="noopener noreferrer">
      {WA_SVG}<span>WhatsApp'tan Sorun</span>
    </a>
    <footer class="site">
      <div class="wrap">
        {FOOTER_LINKS}
        <p>© 2026 Berra Proje ve İnşaat — Karaburun / İzmir</p>
      </div>
    </footer>
    {FORM_JS}
  </body>
</html>
"""


# --------------------------------------------------------------------------- #
# 1) /kamukent-insaat                                                          #
# --------------------------------------------------------------------------- #

INSAAT_FAQS = [
    ("KamuKent'te inşaat yaptırmak ne kadar sürer?",
     "Teslim süresi parselin imar durumuna ve seçilen teslim seviyesine göre belirlenir; "
     "standart tekliflerimizde iş programı 7 aşamalıdır ve toplam süre 120 gündür. Süre, "
     "teklifinizde madde madde iş programıyla birlikte yazılır."),
    ("KamuKent'te kaba inşaat kapsamında neler var?",
     "Hafriyat ve temel imalatı, betonarme karkas (kaba yapı), bims blok dış ve iç dolgu "
     "duvarları ile projesine uygun çatı imalatı kapsamdadır."),
    ("İleri kaba inşaat ile kaba inşaat arasındaki fark nedir?",
     "İleri kaba inşaat; kaba inşaatın üzerine sıva ve şap imalatlarını da ekler; kapı ve "
     "doğrama dahil değildir. İnce işe (boya, zemin, tesisat) hazır bir yapı teslim edilir."),
    ("Anahtar teslim inşaat neyi içeriyor?",
     "Ruhsat ve proje süreçlerinin tamamı, ileri kaba inşaat kapsamı, elektrik-sıhhi tesisat "
     "ve mekanik imalatlar ile boya, zemin kaplama, mutfak ve banyo dolaplarını içerir; "
     "çantanızı alıp taşınmaya hazır teslim edilir."),
    ("Ödemeler nasıl işliyor?",
     "Ödemeler, iş programındaki aşamalara bağlı olarak aşamalı olarak planlanır. Güncel fiyat "
     "ve ödeme koşulları teklif dosyanızda madde madde yer alır; sayfadaki formdan 1 dk içinde talep edebilirsiniz."),
    ("SGK yükümlülükleri kimin sorumluluğunda?",
     "Şantiyedeki SGK bildirim ve prim yükümlülükleri firmamızca yürütülür; yapı sahibi bu "
     "yükümlülüklerle uğraşmaz."),
    ("Gazbeton kullanıyor musunuz?",
     "Hayır. Hiçbir inşaatta gazbeton kullanılmaz; duvar dolgularında bims blok kullanılır."),
    ("Taşıyıcı sistem için garanti veriyor musunuz?",
     "Evet. Taşıyıcı sistem için 15 yıl sorumluluk kapsarız; tüm malzemeler TSE belgelidir ve "
     "imalatlar onaylı projeye uygun yürütülür."),
]

insaat_content = """
      <h2>KamuKent'te hangi parsel tipiyle çalışıyoruz?</h2>
      <p>
        S.S. KamuKent Arsa ve Konut Yapı Kooperatifi'nin Mordoğan'daki (Karaburun / İzmir)
        yerleşiminde <strong>117 ada ve 1.148 parsel</strong> bulunur. Parselinizin tipini
        bilmiyorsanız önce <a href="/#kamukent">ücretsiz parsel sorgulaması</a> yapın:
      </p>
      <div class="tip-grid">
        <div class="tip"><strong>2.5 Kat — A Tipi</strong>A grubu parsellerde uygulanan mimari projedir; bodrumsuzdur.</div>
        <div class="tip"><strong>2.5 Kat — B Tipi</strong>B grubu parsellerde uygulanan mimari projedir; bodrumsuzdur.</div>
        <div class="tip"><strong>3.5 Kat — C Tipi</strong>C grubu parsellerde uygulanan, bodrumlu projedir; ek kat imkânı sağlar.</div>
      </div>

      <h2>Üç teslim seviyesi: kaba, ileri kaba ve anahtar teslim</h2>
      <p>
        Bütçenize ve yönetmek istediğiniz sürece göre üç teslim seviyesi sunuyoruz.
        Aşağıdaki tabloda kapsamları karşılaştırabilirsiniz; dört standart teklif şablonumuz
        (bodrumlu/bodrumsuz × kaba/ileri kaba) <a href="/#teklifler">teklifler sayfasında</a>
        PDF olarak indirilebilir:
      </p>
      <table class="cmp">
        <thead>
          <tr><th>İmalat / hizmet</th><th>Kaba İnşaat</th><th>İleri Kaba İnşaat</th><th>Anahtar Teslim</th></tr>
        </thead>
        <tbody>
          <tr><td>Hafriyat ve temel imalatı</td><td class="yes">Dahil</td><td class="yes">Dahil</td><td class="yes">Dahil</td></tr>
          <tr><td>Betonarme karkas (kaba yapı)</td><td class="yes">Dahil</td><td class="yes">Dahil</td><td class="yes">Dahil</td></tr>
          <tr><td>Bims blok dolgu duvarları</td><td class="yes">Dahil</td><td class="yes">Dahil</td><td class="yes">Dahil</td></tr>
          <tr><td>Projesine uygun çatı imalatı</td><td class="yes">Dahil</td><td class="yes">Dahil</td><td class="yes">Dahil</td></tr>
          <tr><td>İç ve dış sıva</td><td class="no">—</td><td class="yes">Dahil</td><td class="yes">Dahil</td></tr>
          <tr><td>Şap imalatları</td><td class="no">—</td><td class="yes">Dahil</td><td class="yes">Dahil</td></tr>
          <tr><td>Tesisat geçiş hatları</td><td class="no">—</td><td class="yes">Dahil</td><td class="yes">Dahil</td></tr>
          <tr><td>Kapı ve doğrama</td><td class="no">—</td><td class="no">Dahil değil</td><td class="yes">Dahil</td></tr>
          <tr><td>Elektrik, sıhhi tesisat, mekanik</td><td class="no">—</td><td class="no">—</td><td class="yes">Dahil</td></tr>
          <tr><td>Boya, zemin kaplama, mutfak ve banyo dolapları</td><td class="no">—</td><td class="no">—</td><td class="yes">Dahil</td></tr>
          <tr><td>Yapı ruhsatı ve proje süreçleri</td><td class="opt">İsteğe bağlı</td><td class="opt">İsteğe bağlı</td><td class="yes">Dahil</td></tr>
        </tbody>
      </table>
      <div class="not-box">
        <strong>Not:</strong> ileri kaba inşaat tesliminde kapı ve doğrama dahil değildir.
        İmar durumunuza uygun tam kapsam, teklif dosyanızda madde madde yazılır.
      </div>

      <h2>İş programı: 7 aşama, 120 gün</h2>
      <p>
        Standart projelerimizde imalat, <strong>7 aşamalı iş programı</strong> ile yürütülür ve
        teslim süresi <strong>120 gün</strong> olarak planlanır. Her aşamanın tamamlanmasıyla
        birlikte <strong>drone fotoğraflı ilerleme raporu</strong> alırsınız; şantiyeyi yerinde
        görmek istediğinizde randevu ile birlikte çalışırız.
      </p>

      <h2>Ödeme, SGK ve malzeme güvencesi</h2>
      <ul class="dash">
        <li><strong>Aşamalı ödeme:</strong> ödemeler iş programındaki aşamalara bağlanır; koşullar teklifte yazılıdır.</li>
        <li><strong>SGK sorumluluğu firmamızda:</strong> şantiye bildirim ve prim yükümlülükleri tarafımızca yürütülür.</li>
        <li><strong>Malzeme:</strong> tüm malzemeler TSE belgelidir; duvarlarda gazbeton yerine bims blok kullanılır.</li>
        <li><strong>Çatı:</strong> projesine uygun imalat yapılır.</li>
        <li><strong>15 yıl taşıyıcı sistem sorumluluğu:</strong> betonarme taşıyıcı sistem için 15 yıl sorumluluk kapsarız.</li>
        <li><strong>Tek muhatap:</strong> yapı ruhsatı aşamasından yapı kullanma (iskân) aşamasına kadar tüm evrak ve ödeme takibi bizde kalır.</li>
      </ul>

      <h2>Neden Berra Proje ve İnşaat?</h2>
      <p>
        2016'dan beri Karaburun merkezliyiz; bugüne kadar <strong>123 adet</strong> kaba inşaat,
        ileri kaba inşaat ve anahtar teslim inşaat teslim ettik. S.S. KamuKent Arsa ve Konut Yapı
        Kooperatifi'nin konut projelerinde <strong>betonarme proje müellifliği</strong> ve şantiyelerde
        <strong>fenni mesul</strong> görevini yürütüyoruz — yani KamuKent'te hem projeyi çizen hem de
        inşaatı teslim eden firmayız. Enerji Kimlik Belgesi dahil tüm ruhsat ve kullanma aşamalarında
        yanınızdayız.
      </p>

      <h2>Şantiyelerimizden görüntüler</h2>
      <p>Tamamlanan ve devam eden yapılarımızdan örnekler:</p>
      <div class="galeri">
        <figure><img src="/images/projects/proje-01.webp" alt="KamuKent bölgesinde teslim edilen yapının betonarme kaba inşaatı" loading="lazy" width="1600" height="720" /></figure>
        <figure><img src="/images/projects/proje-06.webp" alt="Mordoğan'da ileri kaba inşaat aşamasındaki villa şantiyesi" loading="lazy" width="1600" height="900" /></figure>
        <figure><img src="/images/projects/proje-08.webp" alt="Karaburun'da tamamlanan anahtar teslim konut" loading="lazy" width="1600" height="900" /></figure>
        <figure><img src="/images/projects/proje-17.webp" alt="KamuKent şantiyesinde bims blok duvar imalatı" loading="lazy" width="1600" height="900" /></figure>
      </div>
      <p>
        Tüm galeri için: <a href="/#projeler">yapılarımız bölümüne göz atın →</a> ·
        Ruhsat evrakları için: <a href="/kamukent-ruhsat">KamuKent ruhsat rehberi →</a>
      </p>
""" + sss_html(INSAAT_FAQS)

page_insaat = page(
    slug="kamukent-insaat",
    title="Kamukent İnşaat Firması | Kaba, İleri Kaba, Anahtar Teslim – Berra",
    description=("KamuKent'te (Mordoğan / Karaburun) 2.5 kat A-B ve 3.5 kat C tipi parseller için kaba, "
                 "ileri kaba ve anahtar teslim inşaat. 7 aşamalı iş programı, 120 gün, aşamalı ödeme, "
                 "SGK firmada, TSE malzemeler, 15 yıl taşıyıcı sistem sorumluluğu. 1 dk'da teklif alın."),
    badge="KamuKent üyelerine özel",
    h1="KamuKent İnşaat — Kaba, İleri Kaba ve Anahtar Teslim",
    lead=("KamuKent'te arsanıza müteahhit arıyorsanız doğru yerdesiniz: 2.5 kat A/B ve 3.5 kat C tipi "
          "parsellerde kaba inşaat, ileri kaba inşaat ve anahtar teslim inşaat yürütüyoruz. "
          "Teklifinizi <strong>1 dakikada</strong> alın."),
    ctas=('<a class="btn btn-aqua" href="#teklif">1 dk\'da Teklif Alın</a>'
          '<a class="btn btn-ghost" href="/#kamukent">Parsel Sorgulayın</a>'),
    content=insaat_content,
    jsonld_extra=[faq_json(INSAAT_FAQS)],
)

# --------------------------------------------------------------------------- #
# 2) /kamukent-arsa                                                            #
# --------------------------------------------------------------------------- #

ARSA_FAQS = [
    ("KamuKent'te arsa alınır mı?",
     "KamuKent, altyapısı planlı şekilde gelişen bir kooperatif yerleşimidir; 117 ada ve 1.148 "
     "parseliyle Mordoğan'da (Karaburun / İzmir) konut yatırımı için en organize bölgelerden "
     "biridir. Doğru parsel seçimiyle arsa yatırımı değerini korur ve geliştirir."),
    ("KamuKent arsa fiyatları ne kadar?",
     "Arsa fiyatları ada, parsel, cephe ve kat imarına (2.5 kat A/B tipi veya 3.5 kat) göre "
     "değişir ve piyasayla birlikte sürekli güncellenir. Güncel fiyat aralığı için bize ulaşın; "
     "parselinizin imar durumuna göre toplam yatırım maliyetini birlikte hesaplayalım."),
    ("KamuKent'te kaç parsel var, kaç katlı?",
     "Toplam 1.148 parsel vardır: 508 parsel 2.5 kat A tipi, 117 parsel 2.5 kat B tipi, 523 parsel "
     "3.5 katlı mimariye sahiptir. Parselinizin tipini ada/parsel numarasıyla ücretsiz sorgulayabilirsiniz."),
    ("Arsa alırken nelere dikkat etmeliyim?",
     "İmar tipi ve kat durumu, kooperatif aidat/borç durumu, yapı ruhsatı alınabilirliği ve İZSU "
     "altyapı durumu en kritik dört başlıktır. Satın almadan önce bu kontrolleri yapmak ileride "
     "maliyetli sürprizlerin önüne geçer."),
    ("Arsamı inşaata hazır hale getirmek ne kadara mal olur?",
     "Toplam maliyet; arsa bedeli, seçtiğiniz teslim seviyesine göre inşaat bedeli ve ruhsat "
     "aşamasındaki evrak/harç ödemelerinden oluşur. Kalem kalem döküm için teklif formunu doldurmanız yeterli."),
]

arsa_content = """
      <h2>KamuKent arsa: genel görünüm</h2>
      <p>
        S.S. KamuKent Arsa ve Konut Yapı Kooperatifi, İzmir / Karaburun / Mordoğan'da
        <strong>117 ada ve 1.148 parsel</strong> üzerinde planlı bir konut yerleşimi geliştiriyor.
        Parseller üç mimari tipe ayrılmıştır:
      </p>
      <div class="tip-grid">
        <div class="tip"><strong>2.5 Kat A Tipi</strong>508 parsel — A tipi mimari projeye sahiptir.</div>
        <div class="tip"><strong>2.5 Kat B Tipi</strong>117 parsel — B tipi mimari projeye sahiptir.</div>
        <div class="tip"><strong>3.5 Kat</strong>523 parsel — C tipi, bodrumlu ve ek kat imkânlı projeye sahiptir.</div>
      </div>
      <p>
        Almak istediğiniz parselin tipini öğrenmek için
        <a href="/#kamukent">ücretsiz parsel sorgulama aracını kullanın →</a>
        Ada listesi ve tip dağılımı için <a href="/kamukent">KamuKent parsel haritası sayfasına göz atın →</a>
      </p>

      <h2>Arsa alırken kontrol listesi</h2>
      <ol class="steps">
        <li><strong>İmar tipi ve kat durumu:</strong> parselin 2.5 kat A, 2.5 kat B veya 3.5 kat olduğunu sorgulayın; bu, yapılabilecek metrekareyi ve inşaat maliyetini doğrudan etkiler.</li>
        <li><strong>Kooperatif borcu ve aidat durumu:</strong> S.S. KamuKent kooperatifine olan aidat/borç yükümlülüklerinin kapatıldığından emin olun.</li>
        <li><strong>Yapı ruhsatı alınabilirliği:</strong> parselde imar, yol ve altyapı engeli olup olmadığını kontrol edin; gerekirse ruhsat evrak listesini önceden inceleyin (<a href="/kamukent-ruhsat">ruhsat rehberi →</a>).</li>
        <li><strong>İZSU altyapısı:</strong> su ve kanal bağlantı durumu ile kanal katılım bedelini öğrenin (İZSU tarafından hesaplanır).</li>
        <li><strong>Toplam maliyet projeksiyonu:</strong> arsa bedelinin yanında inşaat ve ruhsat maliyetlerini de hesaba katın; bölgeyi tanıyan bir müteahhit ile ön keşif yaptırın.</li>
      </ol>

      <h2>Toplam yatırım maliyeti kalemleri</h2>
      <table class="cmp">
        <thead><tr><th>Kalem</th><th>Açıklama</th></tr></thead>
        <tbody>
          <tr><td>Arsa bedeli</td><td>Ada, parsel, cephe ve kat imarına göre değişir. <em>[Güncel fiyat aralığı: bize ulaşın]</em></td></tr>
          <tr><td>İnşaat bedeli</td><td>Seçilen teslim seviyesine göre belirlenir: kaba, ileri kaba veya anahtar teslim (<a href="/kamukent-insaat">teslim seviyeleri →</a>).</td></tr>
          <tr><td>Ruhsat evrak ve ödeme kalemleri</td><td>Proje müellif ödemeleri, şantiye şefi ücreti, numarataj harcı, İZSU kanal katılım bedeli, belediye harcı (<a href="/kamukent-ruhsat">tam liste →</a>).</td></tr>
          <tr><td>Enerji Kimlik Belgesi</td><td>Yeni yapılarda yasal zorunluluk; düzenlenmesini tarafımızdan talep edebilirsiniz.</td></tr>
        </tbody>
      </table>

      <h2>Arsanızı değerlendirelim</h2>
      <p>
        Eldeki arsanızı mı değerlendirmek istiyorsunuz? Parsel numaranızı paylaşın; imar durumunu
        sorgulayalım, inşaat maliyeti ve geri dönüş potansiyeli hakkında ücretsiz ön değerlendirme
        yapalım. Karar vermeden önce mutlaka
        <a href="/#kamukent">parselinizin kaç katlı olduğunu öğrenin →</a>
      </p>
      <div class="cta-row" style="margin-top:1rem;">
        <a class="btn btn-brand" href="/#kamukent">Parsel Sorgula (Ücretsiz)</a>
        <a class="btn btn-aqua" href="#teklif">Arsa Değerlendirme Talebi</a>
      </div>
""" + sss_html(ARSA_FAQS)

page_arsa = page(
    slug="kamukent-arsa",
    title="Kamukent'te Arsa Alınır mı? Arsa Fiyatları ve Dikkat Edilecekler (2026)",
    description=("KamuKent'te (Mordoğan / Karaburun) arsa alım rehberi: 117 ada, 1.148 parsel "
                 "(A 508, B 117, C 523). Alırken kontrol listesi, toplam maliyet kalemleri ve arsa "
                 "fiyatları hakkında güncel bilgi. Parselinizi ücretsiz sorgulayın."),
    badge="KamuKent Arsa Rehberi",
    h1="KamuKent'te Arsa Alınır mı? Fiyatlar ve Dikkat Edilecekler",
    lead=("KamuKent (Mordoğan / Karaburun) 117 ada ve 1.148 parselle İzmir'in en organize "
          "kooperatif yerleşimlerinden. Arsa almadan önce imar tipini, kooperatif borcunu ve "
          "toplam yatırım maliyetini birlikte hesaplayalım."),
    ctas=('<a class="btn btn-aqua" href="/#kamukent">Parsel Sorgula (Ücretsiz)</a>'
          '<a class="btn btn-ghost" href="#teklif">Arsa Değerlendirmesi İsteyin</a>'),
    content=arsa_content,
    jsonld_extra=[faq_json(ARSA_FAQS)],
)

# --------------------------------------------------------------------------- #
# 3) /kamukent-ruhsat                                                          #
# --------------------------------------------------------------------------- #

RUHSAT_25 = [
    ("Dilekçe", "Belediyeye yapılacak ruhsat başvuru dilekçesi."),
    ("Vekaletname", "Yapı sahibi adına işlem yapacak kişi için noterden alınmış vekaletname."),
    ("Tapu", "Parsale ait güncel tapu senedi."),
    ("İmar durumu belgesi", "Belediyeden alınan güncel imar durumu belgesi."),
    ("Numarataj krokisi ve belgesi", "Numarataj biriminden alınan kroki ve belge."),
    ("İZSU Kanal katılım belgesi", "İZSU'dan alınan kanal katılım belgesi."),
    ("Yapı müteahhiti evrakları", "Yapı sahibi-müteahhit sözleşmesi, müteahhitlik taahhütnamesi, ticaret odası kayıt belgesi, vergi levhası, yetki belgesi, imza sirküsü."),
    ("Şantiye şefi evrakları", "Diploma / oda kayıt belgesi, şantiye şefi taahhütnamesi, ikametgah belgesi, şantiye şefi hizmet sözleşmesi."),
    ("Proje müellifleri taahhütnameleri ve büro tescil belgeleri", "Tüm proje müelliflerine ait taahhütnameler ve büro tescil belgeleri."),
    ("Mimari müellif muvafakatnamesi", "Mimari projenin müellifi tarafından düzenlenen muvafakatname."),
    ("Betonarme, iskele projesi ve raporları", "Onaylı betonarme ve iskele projeleri ile ilgili raporlar."),
    ("Fenni mesul evrakları", "Fenni mesul taahhütnamesi, yapı sahibi-fenni mesul sözleşmesi, oda kayıt belgeleri, noter tasdikli imza sirküleri."),
]

RUHSAT_35 = RUHSAT_25[:9] + [
    ("Betonarme, iskele projesi ve raporları", "Onaylı betonarme ve iskele projeleri ile ilgili raporlar."),
    ("Yapı denetim evrakları", "Yapı denetim proje kontrol föyleri, yapı denetim hizmet sözleşmesi, yapı denetim banka dekontu, yapıya ilişkin bilgi formu (YİBF), yapı denetim kuruluşu taahhütnamesi."),
]


def ruhsat_list(items) -> str:
    lis = "".join(f"<li><strong>{t}:</strong> {d}</li>" for t, d in items)
    return f'<ul class="dash">{lis}</ul>'


ruhsat_content = f"""
      <h2>Ruhsat süreci adım adım</h2>
      <ol class="steps">
        <li><strong>Parsel sorgusu:</strong> arsanızın 2.5 kat A, 2.5 kat B veya 3.5 kat olduğunu öğrenin (<a href="/#kamukent">ücretsiz sorgu →</a>).</li>
        <li><strong>Proje hazırlığı ve tasdik:</strong> mimari, statik, elektrik ve makine projeleri hazırlanır; müellif taahhütnameleri düzenlenir.</li>
        <li><strong>Evrak toplama:</strong> aşağıdaki listedeki belgeler tamamlanır.</li>
        <li><strong>Ödeme ve harçlar:</strong> proje müellif ödemeleri, şantiye şefi ücreti, numarataj harcı ve İZSU kanal katılım bedeli ödenir.</li>
        <li><strong>Belediyeye başvuru:</strong> dosya teslim edilir, eksiklik varması halinde takip edilir ve ruhsat alınır.</li>
        <li><strong>İnşaat ve iskân:</strong> ruhsat sonrası imalat yürütülür; yapı kullanma izni (iskân) için dosya hazırlanır.</li>
      </ol>
      <div class="not-box">
        <strong>Ruhsatınız aktif değilse endişelenmeyin:</strong> tüm evrak hazırlığını, ödeme ve
        harç takibini, belediye ve kurum başvurularını sizin adınıza biz yürütürüz. Tek muhatap
        olarak ruhsattan iskâna kadar yanınızdayız.
      </div>

      <h2>2.5 kat parseller (A ve B tipi) — istenen evraklar</h2>
      <p>
        2.5 kat A tipi ile 2.5 kat B tipi arasındaki fark yalnızca mimari projededir;
        <strong>ruhsatta istenen belgeler, harçlar ve ödemeler her iki tip için de aynıdır</strong>.
      </p>
      {ruhsat_list(RUHSAT_25)}
      <h3>2.5 kat — proje müellifleri ödemeleri (bodrumsuz)</h3>
      <ul class="dash">
        <li>Mimar muvafakatnamesi ve tus</li>
        <li>İnşaat mühendisi — statik proje, proje müellifliği ve tus</li>
        <li>Elektrik mühendisi proje müellifliği ve tus</li>
        <li>Makina mühendisi proje müellifliği ve tus</li>
      </ul>
      <p>Toplam: <strong>130.000 ₺</strong> — harita mühendisi ödemeleri hariçtir (harita mühendisi ile görüşülmelidir).</p>

      <h2>3.5 kat parseller (C tipi) — istenen evraklar</h2>
      <p>3.5 katlı (bodrumlu) projelerde ek kat ve yapı denetim zorunluluğu nedeniyle evrak listesi genişler:</p>
      {ruhsat_list(RUHSAT_35)}
      <h3>3.5 kat — proje müellifleri ödemeleri (bodrumlu)</h3>
      <ul class="dash">
        <li>Mimar muvafakatnamesi</li>
        <li>İnşaat mühendisi — statik proje ve proje müellifliği</li>
        <li>Elektrik mühendisi proje müellifliği</li>
        <li>Makina mühendisi proje müellifliği</li>
      </ul>
      <p>Toplam: <strong>97.500 ₺</strong> — harita mühendisi ve yapı denetim firması ödemeleri hariçtir.</p>

      <h2>Ruhsat için gerekli diğer ödemeler</h2>
      <ul class="dash">
        <li><strong>Şantiye şefi:</strong> 1 senelik şantiye şefi ücreti yaklaşık 80.000 – 100.000 ₺ aralığındadır.</li>
        <li><strong>Numarataj krokisi ve belgesi:</strong> belediye harcı ödemesi ile alınır.</li>
        <li><strong>İZSU kanal katılım belgesi:</strong> ücret İZSU tarafından hesaplanır; ortalama 100.000 ₺ civarında çıkmaktadır. Son durumu kontrol ediniz.</li>
        <li><strong>Belediye harcı</strong> ve <strong>iş takip bedeli</strong> ilgili kurumlarla görüşülür.</li>
      </ul>
      <div class="not-box">
        Yukarıdaki kişi ve kurumlara yapılacak ödemeler ilgili kişi ve kurumlar ile görüşmeniz
        gerekmektedir. Parselinize özel güncel döküm için formu doldurun, 1 dk içinde size dönelim.
      </div>
      <p>
        Devam eden güncellemeler için: <a href="/kamukent-haberler">KamuKent haberler sayfası →</a> ·
        İnşaat kapsamları için: <a href="/kamukent-insaat">teslim seviyeleri karşılaştırması →</a>
      </p>
"""

RUHSAT_FAQS = [
    ("KamuKent'te 2.5 kat A tipi ile B tipi ruhsat evrakları aynı mı?",
     "Evet. İki tip arasındaki fark yalnızca mimari projededir; ruhsat aşamasında istenen belgeler, harçlar ve ödemeler aynıdır."),
    ("3.5 katlı parselde ruhsat neden farklı?",
     "3.5 katlı (bodrumlu) projelerde ek kat nedeniyle yapı denetim zorunluluğu doğar ve evrak listesi genişler; proje müellif ödeme kalemleri de farklılaşır."),
    ("Ruhsat süreci ne kadar sürer?",
     "Süre, evrakların tamamlanma hızına ve belediye sürecine bağlıdır. Tüm belgeler hazır olduğunda başvuru yapılır; takip tarafımızca yürütülür."),
    ("Ruhsat başvurusunu siz mi yapıyorsunuz?",
     "Evet. Proje tasdikinden başvuru dosyasına, harç ve ödeme takibinden iskân dosyasına kadar tüm süreci sizin adınıza yürütürüz."),
]

page_ruhsat = page(
    slug="kamukent-ruhsat",
    title="Kamukent Ruhsat Süreci 2026: Evraklar, Ücretler ve Süre",
    description=("KamuKent'te (Mordoğan / Karaburun) yapı ruhsatı: 2.5 kat A/B ve 3.5 kat C tipi "
                 "parseller için istenen evrak listeleri, proje müellif ödemeleri, şantiye şefi "
                 "ücreti, numarataj harcı ve İZSU kanal katılım bedeli. Tüm takip bizde."),
    badge="KamuKent Ruhsat Rehberi",
    h1="KamuKent Ruhsat Süreci: Evraklar, Ücretler ve Süre",
    lead=("KamuKent'te ruhsat başvurusu kat imarınıza göre değişir. 2.5 kat ve 3.5 kat için istenen "
          "evrakları, ödeme kalemlerini ve adım adım süreci burada bulabilirsiniz; takibini dilerseniz "
          "tamamen bize devredebilirsiniz."),
    ctas=('<a class="btn btn-aqua" href="#teklif">Ruhsat Takibi İçin Bize Ulaşın</a>'
          '<a class="btn btn-ghost" href="/#kamukent">Önce Parsel Sorgulayın</a>'),
    content=ruhsat_content + sss_html(RUHSAT_FAQS),
    jsonld_extra=[faq_json(RUHSAT_FAQS)],
    published="2026-09-30",
)

# --------------------------------------------------------------------------- #
# 4) /kamukent-haberler + ilk yazı                                             #
# --------------------------------------------------------------------------- #

haberler_content = """
      <h2>Güncellemeler</h2>
      <p>
        KamuKent yerleşimindeki proje, ruhsat ve inşaat gelişmelerini bu sayfadan takip
        edebilirsiniz. Yazılar bizzat sahada yürütülen projelerden derlenir.
      </p>
      <div class="haber-list">
        <a class="haber-kart" href="/kamukent-haberler/parsel-sorgulama-yayinda">
          <time datetime="2026-10-04">4 Ekim 2026</time>
          <h2>KamuKent parsel sorgulama aracı yayına alındı</h2>
          <p>Mordoğan'daki 1.148 parselin tamamı için ada/parsel bazlı kat sorgulama aracı sitemize eklendi.</p>
        </a>
        <a class="haber-kart" href="/kamukent">
          <time datetime="2026-09-30">30 Eylül 2026</time>
          <h2>Ruhsat evrak ve ödeme rehberi güncellendi</h2>
          <p>2.5 kat ve 3.5 kat parseller için ruhsat evrakları ile güncel ödeme kalemleri rehbere eklendi.</p>
        </a>
      </div>
      <p class="meta">
        Yeni yazıları kaçırmamak için bizi takip edin:
        <a href="/#iletisim">iletişim sayfasından</a> kaydolabilir veya
        <a href="https://berrayapi.com/sitemap.xml">site haritasına</a> göz atabilirsiniz.
      </p>
"""

page_haberler = page(
    slug="kamukent-haberler",
    title="Mordoğan Kamukent Son Gelişmeler",
    description=("Mordoğan / Karaburun KamuKent yerleşimindeki son gelişmeler: parsel sorgulama "
                 "aracı, ruhsat rehberi güncellemeleri, proje ve inşaat haberleri. Berra Proje ve "
                 "İnşaat'tan güncel duyurular."),
    badge="KamuKent Güncellemeleri",
    h1="Mordoğan Kamukent — Son Gelişmeler",
    lead=("KamuKent'teki parsel, ruhsat ve inşaat gelişmelerini sahada yürüten ekip olarak "
          "doğrudan buradan paylaşıyoruz."),
    ctas=('<a class="btn btn-aqua" href="/#kamukent">Parsel Sorgulayın</a>'
          '<a class="btn btn-ghost" href="/kamukent">KamuKent Rehberi</a>'),
    content=haberler_content,
)

ARTICLE_BODY = """
      <article>
        <p class="meta">Yayın: <time datetime="2026-10-04">4 Ekim 2026</time> · Berra Proje ve İnşaat Mühendislik Ekibi</p>
        <h2>Ne yapıyor?</h2>
        <p>
          KamuKent'teki 1.148 parselin tamamı için ada ve parsel numarası bazlı kat sorgulama
          aracı berrayapi.com'a eklendi. Artık Mordoğan'daki arsanızın <strong>2.5 kat A tipi</strong>,
          <strong>2.5 kat B tipi</strong> veya <strong>3.5 katlı</strong> mimariye sahip olup
          olmadığını saniyeler içinde, ücretsiz öğrenebiliyorsunuz.
        </p>
        <h2>Neden önemli?</h2>
        <p>
          Parselinizin kat imarı; ruhsatta istenecek evrakları, yapılabilecek inşaat metrekaresini
          ve toplam yatırım maliyetini doğrudan etkiler. 2.5 kat A ve B tipleri arasında ruhsat
          evrakı ve ödemeler aynı olmakla birlikte mimari projeler farklıdır; 3.5 katlı (C tipi)
          parsellerde ise bodrumlu proje ve yapı denetim zorunluluğu devreye girer. Doğru bilgiyle
          başlamak, sürecin hem süresini hem bütçesini kontrol altında tutmanın ilk adımıdır.
        </p>
        <h2>Nasıl kullanılır?</h2>
        <ol class="steps">
          <li>Anasayfadaki <a href="/#kamukent">KamuKent bölümüne</a> gidin.</li>
          <li>Ada ve parsel numaranızı girin (il/ilçe otomatik gelir).</li>
          <li>Parselinizin kat tipini görün; dilerseniz ruhsat rehberini inceleyin veya 1 dk'da teklif alın.</li>
        </ol>
        <h2>Sonraki adımlar</h2>
        <p>
          Aracı parsel haritası ve ada listesiyle birlikte
          <a href="/kamukent">KamuKent rehber sayfamızda</a> da kullanabilirsiniz. Ruhsat evrakları
          ve ödemeler için <a href="/kamukent-ruhsat">ruhsat rehberimize</a>, teslim seviyeleri
          karşılaştırması için <a href="/kamukent-insaat">inşaat sayfamıza</a> göz atın.
        </p>
      </article>
"""

article_graph = {
    "@type": "Article",
    "@id": f"{SITE}/kamukent-haberler/parsel-sorgulama-yayinda#yazi",
    "headline": "KamuKent parsel sorgulama aracı yayına alındı",
    "description": "Mordoğan'daki 1.148 parsel için ada/parsel bazlı ücretsiz kat sorgulama aracı yayında.",
    "inLanguage": "tr-TR",
    "datePublished": "2026-10-04",
    "dateModified": "2026-10-04",
    "author": {"@id": f"{SITE}/#isletme"},
    "publisher": {"@id": f"{SITE}/#isletme"},
    "mainEntityOfPage": f"{SITE}/kamukent-haberler/parsel-sorgulama-yayinda",
    "about": {"@id": f"{SITE}/#isletme"},
}

page_article = page(
    slug="kamukent-haberler/parsel-sorgulama-yayinda",
    title="KamuKent Parsel Sorgulama Aracı Yayında | Berra İnşaat",
    description=("Mordoğan / Karaburun KamuKent'teki 1.148 parsel için ada/parsel bazlı ücretsiz kat "
                 "sorgulama aracı yayına alındı. 2.5 kat A, 2.5 kat B ve 3.5 kat imarını saniyeler "
                 "içinde öğrenin."),
    badge="KamuKent Haberleri",
    h1="KamuKent Parsel Sorgulama Aracı Yayına Alındı",
    lead=("Mordoğan'daki arsanız kaç katlı? Artık ada ve parsel numaranızı girerek saniyeler içinde, "
          "ücretsiz öğrenebilirsiniz."),
    ctas=('<a class="btn btn-aqua" href="/#kamukent">Sorgulamayı Deneyin</a>'
          '<a class="btn btn-ghost" href="/kamukent-haberler">Tüm Haberler</a>'),
    content=ARTICLE_BODY,
    jsonld_graph_extra=article_graph,
)

# --------------------------------------------------------------------------- #
# Yaz                                                                         #
# --------------------------------------------------------------------------- #

outputs = {
    "kamukent-insaat.html": page_insaat,
    "kamukent-arsa.html": page_arsa,
    "kamukent-ruhsat.html": page_ruhsat,
    "kamukent-haberler.html": page_haberler,
    "kamukent-haberler/parsel-sorgulama-yayinda.html": page_article,
}

for rel, html in outputs.items():
    path = PUBLIC / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html, encoding="utf-8")
    print(f"yazıldı: public/{rel} ({len(html)} bayt)")

print("tamam")
