import { Search, PenTool, Truck, KeyRound } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

const STEPS = [
  {
    icon: Search,
    step: '01',
    title: 'Keşif ve Analiz',
    text: 'Arsa etüdü, ihtiyaç analizi ve fizibilite çalışmasıyla projenin zemini sağlam atılır.',
  },
  {
    icon: PenTool,
    step: '02',
    title: 'Tasarım ve Planlama',
    text: 'Mimari konsept, statik proje ve detay çizimler; onayınızdan geçerek netleşir.',
  },
  {
    icon: Truck,
    step: '03',
    title: 'Uygulama ve Denetim',
    text: 'Haftalık raporlama ve fotoğraflı saha takibiyle şantiye süreci tam şeffaflıkla ilerler.',
  },
  {
    icon: KeyRound,
    step: '04',
    title: 'Teslim ve Destek',
    text: 'Zamanında teslim, iskan ve garanti belgeleriyle birlikte; teslim sonrası destek sürekli devam eder.',
  },
]

export default function Process() {
  return (
    <section id="surec" className="bg-neutral-950 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-aqua">
            Nasıl Çalışıyoruz
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Dört adımda anahtar teslim
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((item, i) => (
            <Reveal key={item.step} delay={i * 120}>
              <div className="relative">
                {/* Bağlantı çizgisi */}
                {i < STEPS.length - 1 && (
                  <span className="absolute left-full top-8 hidden w-6 border-t border-dashed border-white/20 lg:block" />
                )}
                <p className="font-display text-5xl font-bold text-white/10">{item.step}</p>
                <div className="mt-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-aqua/15 text-brand-aqua">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/60">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
