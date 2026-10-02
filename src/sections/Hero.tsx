import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/Reveal'

export default function Hero() {
  return (
    <section
      id="anasayfa"
      className="hero-min relative flex items-end overflow-hidden bg-neutral-950"
    >
      {/* Marka gradyan arka plan */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-neutral-950 to-neutral-950" />
        <div className="absolute -left-40 top-1/4 h-[18rem] w-[18rem] transform-gpu rounded-full bg-brand/25 blur-[70px] sm:h-[34rem] sm:w-[34rem] sm:blur-[140px]" />
        <div className="absolute -right-32 bottom-0 h-[14rem] w-[14rem] transform-gpu rounded-full bg-brand-aqua/15 blur-[60px] sm:h-[28rem] sm:w-[28rem] sm:blur-[140px]" />
      </div>

      {/* Büyük logo işareti (filigran) */}
      <img
        src="/images/mark-white.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 hidden w-[30rem] -translate-y-1/2 opacity-[0.07] lg:block"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-40 sm:px-8 sm:pb-32">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-aqua" />
            2016'dan beri Karaburun merkezli
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Sağlam projeler,
            <br />
            <span className="text-brand-aqua">güvenli yapılar.</span>
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Kaba inşaat, ileri kaba inşaat ve anahtar teslim inşaat seçeneklerimiz ile
            Enerji Kimlik Belgesi hizmetlerimizle; ruhsat aşamasından yapı kullanma
            aşamasına kadar yanınızdayız. Bugüne kadar <strong className="font-semibold text-white">123 adet</strong> kaba
            inşaat, ileri kaba inşaat ve anahtar teslim inşaat teslim edilmiştir.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-brand-aqua px-7 text-sm font-semibold text-neutral-950 hover:bg-white"
            >
              <a href="#hizmetler">
                Hizmetlerimizi İnceleyin
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/15 hover:text-white"
            >
              <a href="#iletisim">Bize Ulaşın</a>
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Aşağı kaydır işareti */}
      <a
        href="#rakamlar"
        aria-label="Aşağı kaydır"
        className="absolute bottom-8 right-8 hidden h-12 w-12 place-items-center rounded-full border border-white/25 text-white/80 backdrop-blur-md transition hover:bg-white/10 sm:grid"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  )
}
