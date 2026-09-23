#!/usr/bin/env python3
"""
Teklif kapsam PDF'leri uretir (public/teklifler/).
NOT: Icerik src/lib/teklifler.ts ile birebir ayni olmali; guncelleme yapinca bu dosyayi
duzenleyip scripti tekrar calistirin. Rakamlar/odeme kosullari PDF_FIYAT notu ile isaretli
yerden eklenecek.
"""
import os
from datetime import date
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, Image as RLImage,
    KeepTogether,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = "/Users/umit/Documents/Kimi/Workspaces/Berraİnşaat/berra-insaat"
OUT_DIR = os.path.join(ROOT, "public", "teklifler")
os.makedirs(OUT_DIR, exist_ok=True)

pdfmetrics.registerFont(TTFont("Arial", "/System/Library/Fonts/Supplemental/Arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", "/System/Library/Fonts/Supplemental/Arial Bold.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Italic", "/System/Library/Fonts/Supplemental/Arial Italic.ttf"))

BRAND = colors.HexColor("#3E5CAA")
NAVY = colors.HexColor("#10162D")
AQUA = colors.HexColor("#4F9B99")
MUTED = colors.HexColor("#6B7280")

CONTACT_LINE = (
    "Kazım Karabekir Cad. No: 28, Mordoğan Mah. Karaburun / İzmir   •   "
    "Tel: 0533 818 29 31   •   info@berramuhendislik.com   •   berramuhendislik.com"
)

TEKLIFLER = [
    {
        "file": "teklif-bodrumsuz-kaba.pdf",
        "title": "Bodrumsuz Kaba İnşaat",
        "summary": "Bodrum bulunmayan arsalarda; hafriyat, temel, betonarme karkas ve çatının kaba imalatını kapsar.",
        "groups": [
            ("Hafriyat ve Temel", [
                "Şantiye kurulumu ve tesfiye hafriyatı",
                "Grobeton ve temel yalıtım membranı",
                "Radye temel betonu",
                "Temel dolgusu ve sıkıştırması",
            ]),
            ("Kaba Yapı", [
                "Betonarme karkas imalatı (kalıp, demir, beton)",
                "Dış dolgu duvarları (bims blok)",
                "İç bölme duvarları (bims blok)",
                "Betonarme merdiven ve sahanlıklar",
            ]),
            ("Çatı", ["Projesine uygun çatı imalatı", "Çatı yalıtım membranı"]),
        ],
    },
    {
        "file": "teklif-bodrumlu-kaba.pdf",
        "title": "Bodrumlu Kaba İnşaat",
        "summary": "Bodrum katı bulunan arsalarda; bodrum hafriyatı, radye temel, bodrum perdeleri ve kaba yapı imalatlarını kapsar.",
        "groups": [
            ("Hafriyat ve Temel", [
                "Şantiye kurulumu ve bodrum hafriyatı",
                "Zemin iyileştirme ve sıkıştırma",
                "Grobeton ve temel yalıtım membranı",
                "Radye temel betonu",
            ]),
            ("Bodrum İmalatları", [
                "Bodrum perde betonu",
                "Bodrum dış cephe yalıtımı ve koruma sıvası",
                "Çevre drenaj hattı",
                "Bodrum iç duvarları, sahanlık ve basamaklar",
            ]),
            ("Kaba Yapı", [
                "Betonarme karkas imalatı (kalıp, demir, beton)",
                "Dış dolgu duvarları (bims blok)",
                "İç bölme duvarları (bims blok)",
                "Betonarme merdiven ve sahanlıklar",
            ]),
            ("Çatı", ["Projesine uygun çatı imalatı", "Çatı yalıtım membranı"]),
        ],
    },
    {
        "file": "teklif-bodrumsuz-ileri-kaba.pdf",
        "title": "Bodrumsuz İleri Kaba İnşaat",
        "summary": "Bodrumsuz kaba inşaatın üzerine; sıva, şap ve tesisat geçişlerini de ekleyen teslim seviyesidir. (Kapı ve doğrama dahil değildir.)",
        "groups": [
            ("Hafriyat ve Temel", [
                "Şantiye kurulumu ve tesfiye hafriyatı",
                "Grobeton ve temel yalıtım membranı",
                "Radye temel betonu",
                "Temel dolgusu ve sıkıştırması",
            ]),
            ("Kaba Yapı", [
                "Betonarme karkas imalatı (kalıp, demir, beton)",
                "Dış dolgu duvarları (bims blok)",
                "İç bölme duvarları (bims blok)",
                "Betonarme merdiven ve sahanlıklar",
            ]),
            ("Sıva ve Şap", [
                "İç sıva imalatları",
                "Dış sıva imalatları",
                "Şap imalatları (yer kaplaması altı)",
            ]),
            ("Tesisat", [
                "Elektrik ve sıhhi tesisat kalıp içi geçiş boruları",
                "Çatı kaplaması ve yalıtımı",
            ]),
        ],
    },
    {
        "file": "teklif-bodrumlu-ileri-kaba.pdf",
        "title": "Bodrumlu İleri Kaba İnşaat",
        "summary": "Bodrumlu kaba inşaatın üzerine; sıva, şap ve tesisat geçişlerini de ekleyen en kapsamlı kaba teslim seviyesidir. (Kapı ve doğrama dahil değildir.)",
        "groups": [
            ("Hafriyat ve Temel", [
                "Şantiye kurulumu ve bodrum hafriyatı",
                "Zemin iyileştirme ve sıkıştırma",
                "Grobeton ve temel yalıtım membranı",
                "Radye temel betonu",
            ]),
            ("Bodrum İmalatları", [
                "Bodrum perde betonu",
                "Bodrum dış cephe yalıtımı ve koruma sıvası",
                "Çevre drenaj hattı",
                "Bodrum iç duvarları, sahanlık ve basamaklar",
            ]),
            ("Kaba Yapı", [
                "Betonarme karkas imalatı (kalıp, demir, beton)",
                "Dış dolgu duvarları (bims blok)",
                "İç bölme duvarları (bims blok)",
                "Betonarme merdiven ve sahanlıklar",
            ]),
            ("Sıva, Şap ve Tesisat", [
                "İç ve dış sıva imalatları",
                "Şap imalatları (yer kaplaması altı)",
                "Elektrik ve sıhhi tesisat kalıp içi geçiş boruları",
                "Çatı kaplaması ve yalıtımı",
            ]),
        ],
    },
]

# PDF_FIYAT: Rakamlar ve odeme kosullari verildiginde buraya eklenecek ve script
# yeniden calistirilacak. Ornek:
# {"birim": "15.500 ₺/m²", "toplam": "Proje bazında", "odeme": "Hakediş usulü, ayda bir"}


def build(t: dict):
    path = os.path.join(OUT_DIR, t["file"])
    doc = SimpleDocTemplate(
        path, pagesize=A4,
        leftMargin=20 * mm, rightMargin=20 * mm, topMargin=16 * mm, bottomMargin=16 * mm,
        title=f"Teklif Kapsamı — {t['title']}",
        author="Berra Proje ve İnşaat",
    )

    logo = RLImage(os.path.join(ROOT, "public", "images", "logo.png"), width=34 * mm, height=12 * mm)
    logo.hAlign = "LEFT"

    head_right = ParagraphStyle("headR", fontName="Arial", fontSize=8, textColor=MUTED, alignment=TA_RIGHT, leading=11)
    head = Table(
        [[logo, Paragraph("Mühendislik ve İnşaat<br/>Karaburun / İzmir — Est. 2016", head_right)]],
        colWidths=[40 * mm, 130 * mm],
    )
    head.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "MIDDLE")]))

    title = ParagraphStyle("title", fontName="Arial-Bold", fontSize=20, leading=26, textColor=NAVY, spaceBefore=2, spaceAfter=6)
    sub = ParagraphStyle("sub", fontName="Arial", fontSize=10.5, textColor=MUTED, leading=15)
    group_h = ParagraphStyle("gh", fontName="Arial-Bold", fontSize=11.5, leading=15, textColor=BRAND, spaceBefore=10, spaceAfter=4)
    item = ParagraphStyle("item", fontName="Arial", fontSize=10, textColor=colors.HexColor("#1C1F2A"), leading=15, leftIndent=10)

    story = [
        head,
        HRFlowable(width="100%", thickness=1.2, color=BRAND, spaceBefore=8, spaceAfter=10),
        Paragraph(f"Teklif Kapsamı — {t['title']}", title),
        Paragraph(t["summary"], sub),
    ]

    for gtitle, items in t["groups"]:
        block = [Paragraph(gtitle, group_h)]
        for it in items:
            block.append(Paragraph(f"•  {it}", item))
        story.append(KeepTogether(block))

    fiyat_head = ParagraphStyle("fh", fontName="Arial-Bold", fontSize=11.5, leading=15, textColor=NAVY, spaceBefore=16, spaceAfter=4)
    fiyat_box_style = TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.8, BRAND),
        ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#D6DCEA")),
        ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#F2F5FB")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
    ])
    lbl = ParagraphStyle("lbl", fontName="Arial-Bold", fontSize=9.5, textColor=NAVY)
    val = ParagraphStyle("val", fontName="Arial", fontSize=9.5, textColor=colors.HexColor("#1C1F2A"))
    fiyat = Table(
        [
            [Paragraph("Birim Fiyat", lbl), Paragraph("Güncel fiyat bilgisi için lütfen iletişime geçiniz.", val)],
            [Paragraph("Toplam Bedel", lbl), Paragraph("Arsa ve proje özelliklerine göre belirlenir.", val)],
            [Paragraph("Ödeme Planı", lbl), Paragraph("Hakediş esnekliği ile projeye göre planlanır.", val)],
        ],
        colWidths=[35 * mm, 135 * mm],
    )
    fiyat.setStyle(fiyat_box_style)

    story += [
        Paragraph(
            "Not: Liste temel kapsamı gösterir; arsa imar durumu, zemin koşulları ve proje detaylarına göre kalemler değişebilir.",
            ParagraphStyle("not", fontName="Arial-Italic", fontSize=8.5, textColor=MUTED, spaceBefore=10, leading=12),
        ),
        Paragraph("Yatırım ve Ödeme Koşulları", fiyat_head),
        fiyat,
        Spacer(1, 10),
        HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#D6DCEA"), spaceBefore=6, spaceAfter=6),
        Paragraph(CONTACT_LINE, ParagraphStyle("foot", fontName="Arial", fontSize=8, textColor=MUTED, leading=11)),
        Paragraph(
            f"Bu doküman kapsam tanımıdır; bağlayıcı fiyat teklifi değildir. • {date.today().strftime('%d.%m.%Y')}",
            ParagraphStyle("foot2", fontName="Arial", fontSize=7.5, textColor=MUTED),
        ),
    ]

    doc.build(story)
    print("OK:", t["file"], os.path.getsize(path) // 1024, "KB")


for t in TEKLIFLER:
    build(t)
