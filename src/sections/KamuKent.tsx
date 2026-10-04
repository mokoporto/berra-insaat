import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Search,
  MapPin,
  FileText,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  Home,
  KeyRound,
  Landmark,
  Zap,
  FileDown,
  Eye,
  ArrowUpRight,
} from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  CONSTRUCTION_TYPES,
  IMAR_LABELS,
  queryParcel,
} from '@/lib/kamukent'
import type { KatType, RuhsatKat } from '@/lib/kamukent'
import { sendForm } from '@/lib/form'

type QueryResult = { kind: 'found'; kat: KatType } | { kind: 'empty' } | { kind: 'notfound' } | null

export default function KamuKent() {
  const [ada, setAda] = useState('')
  const [parsel, setParsel] = useState('')
  const [result, setResult] = useState<QueryResult>(null)
  // Teklif formu sonrası otomatik kat tespiti: null = henüz gönderilmedi
  const [teklifKat, setTeklifKat] = useState<RuhsatKat | 'notfound' | null>(null)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)

  const TEKLIF_PDFLERI: { kat: RuhsatKat; title: string; desc: string; file: string }[] = [
    {
      kat: '2.5',
      title: '2.5 Katlı Teklif',
      desc: 'A ve B tipi parseller — bodrumsuz projeler için kaba / ileri kaba inşaat kapsamı, 120 günlük iş programı ve ödeme koşulları.',
      file: '/teklifler/kamukent-2-5-katli-teklif.pdf',
    },
    {
      kat: '3.5',
      title: '3.5 Katlı Teklif',
      desc: 'C tipi parseller — bodrumlu projeler için kaba / ileri kaba inşaat kapsamı, 120 günlük iş programı ve ödeme koşulları.',
      file: '/teklifler/kamukent-3-5-katli-teklif.pdf',
    },
  ]

  async function handleTeklif(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setSendError(false)
    const data = new FormData(e.currentTarget)
    // Parselin kat durumu otomatik tespit edilir; müşteri PDF'e yalnızca
    // formu gönderdikten sonra ulaşır.
    const r = queryParcel(String(data.get('ada') ?? ''), String(data.get('parsel') ?? ''))
    const katEtiket =
      r === '3.5' ? '3.5 Kat (C tipi)' :
      r === '2.5A' ? '2.5 Kat A tipi' :
      r === '2.5B' ? '2.5 Kat B tipi' :
      'Sorguda bulunamadı — ekip teyit edecek'
    if (r === '3.5') setTeklifKat('3.5')
    else if (r === '2.5A' || r === '2.5B') setTeklifKat('2.5')
    else setTeklifKat('notfound')
    const ok = await sendForm(
      {
        'Ad Soyad': data.get('name'),
        Telefon: data.get('phone'),
        'Ada No': data.get('ada'),
        'Parsel No': data.get('parsel'),
        'Kat İmarı (otomatik sorgu)': katEtiket,
        'İnşaat Türü': data.get('type'),
        Mesaj: data.get('message'),
      },
      'KamuKent Teklif Talebi — berramuhendislik.com',
    )
    setSending(false)
    if (ok) setSent(true)
    else setSendError(true)
  }

  function handleQuery(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const r = queryParcel(ada, parsel)
    if (r === 'empty') setResult({ kind: 'empty' })
    else if (r === 'notfound') setResult({ kind: 'notfound' })
    else {
      setResult({ kind: 'found', kat: r })
    }
  }

  return (
    <section id="kamukent" className="bg-neutral-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Başlık */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">KamuKent</p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Arsanız kaç kat? Hemen öğrenin
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Ada ve parsel numaranızı girin, Mordoğan'daki parselinizin 2.5 kat A tipi mi,
            2.5 kat B tipi mi yoksa 3.5 katlı mimariye mi sahip olduğunu öğrenin;
            ruhsat sürecini inceleyin ve <strong>1 dk içinde teklifinizi indirin</strong>.
          </p>
          <p className="mt-4">
            <a
              href="/kamukent"
              className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand/10"
            >
              KamuKent parsel haritası ve sık sorulan sorular →
            </a>
          </p>
          <div className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              { href: '/kamukent-insaat', label: 'KamuKent inşaat — teslim seviyeleri ve karşılaştırma' },
              { href: '/kamukent-arsa', label: "KamuKent'te arsa alınır mı? Fiyatlar ve kontrol listesi" },
              { href: '/kamukent-ruhsat', label: 'KamuKent ruhsat süreci — evraklar ve ücretler' },
              { href: '/kamukent-haberler', label: 'Mordoğan Kamukent son gelişmeler' },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-3.5 text-left text-sm font-semibold text-neutral-800 transition hover:border-brand/40 hover:bg-brand/5"
              >
                {l.label}
                <ArrowUpRight className="h-4 w-4 shrink-0 text-brand" />
              </a>
            ))}
          </div>
        </Reveal>

        {/* 1. ARSAM KAÇ KATLI SORGUSU */}
        <Reveal delay={100}>
          <div id="kamukent-sorgu" className="mx-auto mt-14 max-w-4xl scroll-mt-24 rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-xl shadow-neutral-900/5 sm:p-10">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-neutral-900">Arsam Kaç Katlı?</h3>
                <p className="text-sm text-neutral-500">Ada ve parsel numaranızı girin</p>
              </div>
            </div>

            <form onSubmit={handleQuery} className="mt-7">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="il">İl</Label>
                  <Input id="il" value="İzmir" disabled className="rounded-xl bg-neutral-50 text-neutral-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ilce">İlçe</Label>
                  <Input id="ilce" value="Karaburun" disabled className="rounded-xl bg-neutral-50 text-neutral-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ada">Ada No *</Label>
                  <Input
                    id="ada"
                    required
                    inputMode="numeric"
                    placeholder="Örn. 12"
                    value={ada}
                    onChange={(e) => setAda(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parsel">Parsel No *</Label>
                  <Input
                    id="parsel"
                    required
                    inputMode="numeric"
                    placeholder="Örn. 3"
                    value={parsel}
                    onChange={(e) => setParsel(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>
              <Button type="submit" className="mt-6 w-full rounded-full bg-brand text-sm font-semibold text-white hover:bg-brand-navy sm:w-auto">
                <Search className="mr-2 h-4 w-4" />
                Sorgula
              </Button>
            </form>

            {/* Sorgu sonucu */}
            {result?.kind === 'found' && (
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand/5 p-6 ring-1 ring-brand/20">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-brand" />
                  <div>
                    <p className="font-display text-lg font-semibold text-neutral-900">
                      {IMAR_LABELS[result.kat]}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600">
                      Ada {ada} · Parsel {parsel} · Ruhsat rehberini inceleyin ve ücretsiz teklif alın.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button asChild variant="outline" className="rounded-full border-brand/30 text-brand hover:bg-brand/10 hover:text-brand-navy">
                    <a href="#kamukent-ruhsat">Ruhsat Bilgileri</a>
                  </Button>
                  <Button asChild className="rounded-full bg-brand text-white hover:bg-brand-navy">
                    <a href="#kamukent-teklif">Teklif Al</a>
                  </Button>
                </div>
              </div>
            )}
            {result?.kind === 'empty' && (
              <div className="mt-7 flex items-start gap-3 rounded-2xl bg-neutral-50 p-6 ring-1 ring-neutral-200">
                <Clock className="mt-0.5 h-6 w-6 shrink-0 text-neutral-400" />
                <div>
                  <p className="font-semibold text-neutral-900">Ada/parsel listesi yakında yüklenecek</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    İmar kayıtlarımız henüz sisteme yüklenmedi. İmar durumunuz hakkında bilgi almak
                    için bizi arayabilir veya aşağıdaki teklif formunu doldurabilirsiniz.
                  </p>
                </div>
              </div>
            )}
            {result?.kind === 'notfound' && (
              <div className="mt-7 flex items-start gap-3 rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-200">
                <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-amber-500" />
                <div>
                  <p className="font-semibold text-neutral-900">Kayıt bulunamadı</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Ada {ada} · Parsel {parsel} için kaydımız bulunmuyor. İmar durumunuzu belediyeden
                    teyit edebilir veya bize danışmak için teklif formunu kullanabilirsiniz.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {/* 2. İNŞAAT TÜRLERİ */}
        <Reveal delay={120}>
          <div id="kamukent-turler" className="mt-20 scroll-mt-24">
            <h3 className="font-display text-center text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Hangi inşaat modeli size uygun?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-center text-neutral-600">
              Üç farklı teslim seviyesi sunuyoruz; bütçenize ve yönetmek istediğiniz sürece göre seçin.
            </p>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {CONSTRUCTION_TYPES.map((type, i) => {
                const icons = [Home, Landmark, KeyRound]
                const Icon = icons[i]
                return (
                  <div key={type.id} className="flex h-full flex-col rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-display mt-5 text-lg font-semibold text-neutral-900">{type.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{type.summary}</p>
                    <ul className="mt-5 flex-1 space-y-2.5">
                      {type.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-aqua" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 border-t border-neutral-100 pt-4 text-xs leading-relaxed text-neutral-500">
                      {type.idealFor}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* 3. RUHSAT REHBERİ — özet (tamamı /kamukent-ruhsat sayfasında) */}
        <Reveal delay={120}>
          <div id="kamukent-ruhsat" className="mx-auto mt-20 max-w-4xl scroll-mt-24">
            <h3 className="font-display text-center text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Ruhsat aşamasında neler isteniyor?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-center text-neutral-600">
              Kat seçeneğinize göre değişen evrak listesi, harçlar ve ödemeler — hepsi ayrıntılı
              ruhsat rehberimizde.
            </p>

            <div className="mt-8 rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-xl shadow-neutral-900/5 sm:p-10">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    2.5 kat ile 3.5 kat için farklı evrak listeleri istenir
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    2.5 kat A tipi ile B tipi arasında fark yalnızca mimari projededir; ruhsatta
                    istenen belgeler, harçlar ve ödemeler her ikisi için de aynıdır. 3.5 katlı
                    (bodrumlu) parsellerde ise yapı denetim zorunluluğu ile liste genişler.
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-2.5">
                {[
                  '2.5 kat (A ve B tipi): 12 kalem evrak — dilekçeden fenni mesul evraklarına',
                  '3.5 kat (C tipi): yapı denetim evrakları ile genişletilmiş liste',
                  'Proje müellifleri ödemeleri: bodrumsuz 130.000 ₺ · bodrumlu 97.500 ₺',
                  'Diğer ödemeler: şantiye şefi (yaklaşık 80.000 – 100.000 ₺), numarataj harcı, İZSU kanal katılım belgesi',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-aqua" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-brand px-8 text-sm font-semibold text-white hover:bg-brand-navy"
                >
                  <a href="/kamukent-ruhsat">
                    Ruhsat Rehberini İnceleyin
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-brand/30 px-8 text-sm font-semibold text-brand hover:bg-brand/10 hover:text-brand-navy"
                >
                  <a href="#kamukent-teklif">
                    <Zap className="mr-2 h-4 w-4" />
                    1 dk'da Teklif Al
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4. TEKLİF FORMU */}
        <Reveal delay={120}>
          <div id="kamukent-teklif" className="mx-auto mt-20 max-w-4xl scroll-mt-24">
            <div className="rounded-[2rem] bg-neutral-900 p-8 text-white sm:p-10">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-aqua/15 text-brand-aqua">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">1 dk'da Teklif Alın</h3>
                  <p className="text-sm text-white/60">KamuKent üyelerine özel — formu doldurun; parselinizin kat durumu otomatik tespit edilsin, teklifiniz anında açılsın</p>
                </div>
              </div>

              {sent ? (
                teklifKat && teklifKat !== 'notfound' ? (
                  <div className="py-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-brand-aqua" />
                      <div>
                        <p className="font-display text-lg font-semibold">Parseliniz {teklifKat === '3.5' ? '3.5 katlı (C tipi)' : '2.5 katlı (A/B tipi)'} — teklifiniz hazır</p>
                        <p className="mt-1 text-sm text-white/60">
                          Talebiniz bize ulaştı; en kısa sürede sizi arıyoruz. Parselinize uygun
                          fiyat ve teknik teklifi aşağıdan indirebilir veya indirmeden inceleyebilirsiniz.
                        </p>
                      </div>
                    </div>
                    {(() => {
                      const t = TEKLIF_PDFLERI.find((x) => x.kat === teklifKat)!
                      return (
                        <div className="mt-6 rounded-xl border border-brand-aqua/50 bg-brand-aqua/10 p-5">
                          <p className="font-display text-base font-semibold">{t.title}</p>
                          <p className="mt-1.5 text-xs leading-relaxed text-white/55">{t.desc}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <a
                              href={t.file}
                              download
                              className="inline-flex items-center gap-1.5 rounded-full bg-brand-aqua px-4 py-2 text-xs font-bold text-neutral-950 transition hover:bg-white"
                            >
                              <FileDown className="h-3.5 w-3.5" />
                              PDF'i İndir
                            </a>
                            <a
                              href={t.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/85 transition hover:border-white/40 hover:text-white"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              İndirmeden Aç
                            </a>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                ) : (
                  <div className="flex min-h-64 flex-col items-center justify-center py-10 text-center">
                    <CheckCircle2 className="h-12 w-12 text-brand-aqua" />
                    <p className="font-display mt-4 text-xl font-semibold">Talebiniz alındı</p>
                    <p className="mt-2 max-w-sm text-sm text-white/60">
                      Ada/parsel kaydımızda eşleşme bulunamadı; ekibimiz imar durumunuzu teyit
                      edip en kısa sürede size dönüş yapacak. Acil durumlar için bizi telefonla
                      arayabilirsiniz.
                    </p>
                  </div>
                )
              ) : (
                <form
                  onSubmit={handleTeklif}
                  className="mt-7 grid gap-4 sm:grid-cols-2"
                >
                  <div className="space-y-2">
                    <Label htmlFor="kk-name" className="text-white/80">Ad Soyad *</Label>
                    <Input id="kk-name" name="name" required placeholder="Adınız Soyadınız" className="rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/40" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kk-phone" className="text-white/80">Telefon *</Label>
                    <Input id="kk-phone" name="phone" required type="tel" placeholder="05XX XXX XX XX" className="rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/40" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kk-ada" className="text-white/80">Ada No *</Label>
                    <Input id="kk-ada" name="ada" required inputMode="numeric" placeholder="Örn. 12" defaultValue={ada} className="rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/40" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kk-parsel" className="text-white/80">Parsel No *</Label>
                    <Input id="kk-parsel" name="parsel" required inputMode="numeric" placeholder="Örn. 3" defaultValue={parsel} className="rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/40" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kk-type" className="text-white/80">İnşaat Türü</Label>
                    <select
                      id="kk-type"
                      name="type"
                      className="h-10 w-full rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white [&>option]:text-neutral-900"
                      defaultValue="anahtar-teslim"
                    >
                      {CONSTRUCTION_TYPES.map((t) => (
                        <option key={t.id} value={t.title}>{t.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="kk-msg" className="text-white/80">Mesajınız</Label>
                    <Textarea
                      id="kk-msg"
                      name="message"
                      rows={4}
                      placeholder="Arsanızdan ve hedefinizden kısaca bahsedin..."
                      className="resize-none rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/40"
                    />
                  </div>
                  {sendError && (
                    <p className="flex items-center gap-2 text-sm text-red-300 sm:col-span-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      Gönderim başarısız oldu. Lütfen tekrar deneyin veya bizi telefonla arayın.
                    </p>
                  )}
                  <Button type="submit" size="lg" disabled={sending} className="rounded-full bg-brand-aqua text-sm font-semibold text-neutral-950 hover:bg-white sm:col-span-2 disabled:opacity-60">
                    {sending ? 'Gönderiliyor…' : 'Teklif Talebi Gönder'}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Reveal>

        {/* Konum notu */}
        <Reveal delay={100}>
          <p className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2 text-center text-sm text-neutral-500">
            <MapPin className="h-4 w-4 shrink-0 text-brand" />
            Sorgular şimdilik Mordoğan Mahallesi (Karaburun / İzmir) kapsamındadır.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
