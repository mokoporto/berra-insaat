import { useState } from 'react'
import { CheckCircle2, FileText, ArrowUpRight, Info } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { TEKLIF_SEKILLERI } from '@/lib/teklifler'

export default function Teklifler() {
  const [active, setActive] = useState(TEKLIF_SEKILLERI[0].id)
  const current = TEKLIF_SEKILLERI.find((t) => t.id === active) ?? TEKLIF_SEKILLERI[0]

  return (
    <section id="teklifler" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Teklif Şablonları
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Kapsamlarımızı inceleyin
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Dört farklı teslim seviyesi için standart teklif kapsamlarımız aşağıdadır.
            Fiyatlar arsa durumuna ve projeye göre belirlendiği için net teklif için
            bizimle iletişime geçin.
          </p>
        </Reveal>

        {/* Şablon seçici */}
        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            <div className="inline-flex flex-wrap justify-center gap-1 rounded-2xl bg-neutral-100 p-1.5 sm:rounded-full">
              {TEKLIF_SEKILLERI.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActive(t.id)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    active === t.id
                      ? 'bg-brand text-white shadow'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Aktif şablon */}
        <Reveal delay={140}>
          <div className="mx-auto mt-8 max-w-5xl rounded-[2rem] border border-neutral-100 bg-neutral-50/60 p-8 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-neutral-900">
                    {current.title}
                  </h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-600">
                    {current.summary}
                  </p>
                </div>
              </div>
              <Button asChild className="rounded-full bg-brand text-sm font-semibold text-white hover:bg-brand-navy">
                <a href="#kamukent-teklif">
                  Bu Kapsamda Teklif Al
                  <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {current.groups.map((group) => (
                <div key={group.title} className="rounded-2xl border border-neutral-100 bg-white p-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-brand">
                    {group.title}
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-aqua" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-neutral-500">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Liste temel kapsamı gösterir; arsa imar durumu, zemin koşulları ve proje
              detaylarına göre kalemler değişebilir.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
