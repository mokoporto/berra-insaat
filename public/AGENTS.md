# AGENTS.md — berrayapi.com

Kurumsal tanıtım sitesi (tek sayfa React/Vite uygulaması).

- İçerik verileri `src/lib/` altındaki tek kaynak dosyalarda tutulur
  (`site.ts` iletişim/menü, `kamukent.ts` parselasyon, `odemeler.ts` ödemeler,
  `teklifler.ts` teklif şablonları). Metin değişikliği gerekiyorsa önce oraya bakın.
- Form gönderimleri FormSubmit.co üzerinden info@berramuhendislik.com adresine iletilir.
- KamuKent parsel sorgusu yalnızca istemcide çalışır; parsel verisi `kamukent.ts`
  içindeki PARCEL_MAP üzerinden okunur.
- Bilinmeyen URL'ler 404 döner (MPA modu); yeni statik sayfa eklerken `public/` kullanın.
