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
  Wallet,
  Zap,
} from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  CONSTRUCTION_TYPES,
  KAT_OPTIONS,
  IMAR_LABELS,
  queryParcel,
} from '@/lib/kamukent'
import type { KatType, RuhsatKat } from '@/lib/kamukent'
import {
  PROJE_MUELLIF_ODEMELERI,
  DIGER_ODEMELER,
  DIGER_ODEMELER_NOTU,
} from '@/lib/odemeler'

type QueryResult = { kind: 'found'; kat: KatType } | { kind: 'empty' } | { kind: 'notfound' } | null

export default function KamuKent() {
  const [ada, setAda] = useState('')
  const [parsel, setParsel] = useState('')
  const [result, setResult] = useState<QueryResult>(null)
  const [kat, setKat] = useState<RuhsatKat>('3.5')
  const [sent, setSent] = useState(false)

  function handleQuery(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const r = queryParcel(ada, parsel)
    if (r === 'empty') setResult({ kind: 'empty' })
    else if (r === 'notfound') setResult({ kind: 'notfound' })
    else {
      setResult({ kind: 'found', kat: r })
      setKat(r === '3.5' ? '3.5' : '2.5')
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
            ruhsat sürecini inceleyin ve teklif alın.
          </p>
        </Reveal>

        {/* 1. İMAR SORGUSU */}
        <Reveal delay={100}>
          <div id="kamukent-sorgu" className="mx-auto mt-14 max-w-4xl scroll-mt-24 rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-xl shadow-neutral-900/5 sm:p-10">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-neutral-900">İmar Sorgusu</h3>
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

        {/* 3. RUHSAT REHBERİ */}
        <Reveal delay={120}>
          <div id="kamukent-ruhsat" className="mx-auto mt-20 max-w-4xl scroll-mt-24">
            <h3 className="font-display text-center text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Ruhsat aşamasında neler isteniyor?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-center text-neutral-600">
              Kat seçeneğinize göre ruhsat sürecinde istenen belgeleri inceleyin.
            </p>

            {/* Kat seçici */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <div className="inline-flex flex-wrap justify-center gap-1 rounded-2xl bg-neutral-100 p-1.5 sm:rounded-full">
                {(Object.keys(KAT_OPTIONS) as RuhsatKat[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKat(k)}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                      kat === k ? 'bg-brand text-white shadow' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {KAT_OPTIONS[k].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-xl shadow-neutral-900/5 sm:p-10">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    {KAT_OPTIONS[kat].label} — Ruhsat Süreci
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{KAT_OPTIONS[kat].description}</p>
                </div>
              </div>
              <Accordion type="single" collapsible className="mt-6">
                {KAT_OPTIONS[kat].ruhsatItems.map((item, i) => (
                  <AccordionItem key={item.title} value={`item-${i}`} className="border-neutral-100">
                    <AccordionTrigger className="text-left text-sm font-semibold text-neutral-900 hover:text-brand">
                      <span className="flex items-center gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                          {i + 1}
                        </span>
                        {item.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10 text-sm leading-relaxed text-neutral-600">
                      <p>{item.detail}</p>
                      {item.subItems && (
                        <ul className="mt-3 space-y-1.5">
                          {item.subItems.map((sub, j) => (
                            <li key={sub} className="flex gap-2">
                              <span className="shrink-0 font-semibold text-neutral-400">
                                {String.fromCharCode(97 + j)})
                              </span>
                              {sub}
                            </li>
                          ))}
                        </ul>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Ödemeler */}
              <div className="mt-10 border-t border-neutral-100 pt-8">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-neutral-900">
                      Ruhsat Aşaması Ödemeleri
                    </h4>
                    <p className="text-sm text-neutral-500">
                      Proje müellifleri ödemeleri ve diğer giderler
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {(['bodrumsuz', 'bodrumlu'] as const).map((key) => {
                    const o = PROJE_MUELLIF_ODEMELERI[key]
                    return (
                      <div key={key} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
                        <h5 className="text-sm font-semibold uppercase tracking-wider text-brand">
                          {o.label}
                        </h5>
                        <ul className="mt-4 space-y-2">
                          {o.items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-700">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-4 border-t border-neutral-200 pt-3 text-sm text-neutral-500">
                          Toplam:{' '}
                          <span className="font-display text-lg font-bold text-neutral-900">{o.total}</span>
                        </p>
                        {o.notes.map((note) => (
                          <p key={note} className="mt-2 text-xs leading-relaxed text-neutral-500">
                            Not: {note}
                          </p>
                        ))}
                      </div>
                    )
                  })}
                </div>

                <div className="mt-5 rounded-2xl border border-neutral-100 bg-white p-6">
                  <h5 className="text-sm font-semibold uppercase tracking-wider text-brand">
                    Ruhsat İçin Gerekli Diğer Ödemeler
                  </h5>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {DIGER_ODEMELER.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-500">
                    Not: {DIGER_ODEMELER_NOTU}
                  </p>
                </div>

                <div className="mt-7 flex justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-brand px-8 text-sm font-semibold text-white hover:bg-brand-navy"
                  >
                    <a href="#kamukent-teklif">
                      <Zap className="mr-2 h-4 w-4" />
                      Anında Teklif Al
                    </a>
                  </Button>
                </div>
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
                  <h3 className="font-display text-xl font-semibold">Teklif Alın</h3>
                  <p className="text-sm text-white/60">24 saat içinde size dönüş yapalım</p>
                </div>
              </div>

              {sent ? (
                <div className="flex min-h-64 flex-col items-center justify-center py-10 text-center">
                  <CheckCircle2 className="h-12 w-12 text-brand-aqua" />
                  <p className="font-display mt-4 text-xl font-semibold">Teklif talebiniz alındı</p>
                  <p className="mt-2 max-w-sm text-sm text-white/60">
                    En kısa sürede sizi arayalım. Acil durumlar için doğrudan telefonumuzu kullanabilirsiniz.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSent(true)
                  }}
                  className="mt-7 grid gap-4 sm:grid-cols-2"
                >
                  <div className="space-y-2">
                    <Label htmlFor="kk-name" className="text-white/80">Ad Soyad *</Label>
                    <Input id="kk-name" required placeholder="Adınız Soyadınız" className="rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/40" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kk-phone" className="text-white/80">Telefon *</Label>
                    <Input id="kk-phone" required type="tel" placeholder="05XX XXX XX XX" className="rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/40" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kk-ada" className="text-white/80">Ada No</Label>
                    <Input id="kk-ada" inputMode="numeric" placeholder="Örn. 12" defaultValue={ada} className="rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/40" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kk-parsel" className="text-white/80">Parsel No</Label>
                    <Input id="kk-parsel" inputMode="numeric" placeholder="Örn. 3" defaultValue={parsel} className="rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/40" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kk-kat" className="text-white/80">Kat İmarı</Label>
                    <select
                      id="kk-kat"
                      value={kat}
                      onChange={(e) => setKat(e.target.value as RuhsatKat)}
                      className="h-10 w-full rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white [&>option]:text-neutral-900"
                    >
                      <option value="2.5">2.5 Kat</option>
                      <option value="3.5">3.5 Kat</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kk-type" className="text-white/80">İnşaat Türü</Label>
                    <select
                      id="kk-type"
                      className="h-10 w-full rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white [&>option]:text-neutral-900"
                      defaultValue="anahtar-teslim"
                    >
                      {CONSTRUCTION_TYPES.map((t) => (
                        <option key={t.id} value={t.id}>{t.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="kk-msg" className="text-white/80">Mesajınız</Label>
                    <Textarea
                      id="kk-msg"
                      rows={4}
                      placeholder="Arsanızdan ve hedefinizden kısaca bahsedin..."
                      className="resize-none rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/40"
                    />
                  </div>
                  <Button type="submit" size="lg" className="rounded-full bg-brand-aqua text-sm font-semibold text-neutral-950 hover:bg-white sm:col-span-2">
                    Teklif Talebi Gönder
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
