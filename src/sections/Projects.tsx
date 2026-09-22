import { Building2, Camera, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'

export default function Projects() {
  return (
    <section id="projeler" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Tamamlanan Yapılar
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            İmzamızı taşıyan yapılar
          </h2>
        </Reveal>

        {/* Fotograflar henuz eklenmedi — bos durum */}
        <Reveal delay={120}>
          <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center rounded-[2rem] border-2 border-dashed border-neutral-200 bg-neutral-50/60 px-8 py-16 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand/10 text-brand">
              <Camera className="h-8 w-8" />
            </div>
            <h3 className="font-display mt-6 text-xl font-semibold text-neutral-900">
              Fotoğraflar yakında eklenecek
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600 sm:text-base">
              Tamamlanan yapılarımıza ait fotoğraflar yakında bu sayfada
              yayınlanacaktır. Güncel çalışmalarımız ve hizmetlerimiz hakkında
              bilgi almak için bize ulaşabilirsiniz.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-full bg-neutral-900 px-6 text-sm font-semibold text-white hover:bg-neutral-700">
                <a href="#iletisim">
                  Bize Ulaşın
                  <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-neutral-300 px-6 text-sm font-semibold text-neutral-900 hover:bg-brand hover:text-white hover:border-brand"
              >
                <a href="#kamukent">
                  <Building2 className="mr-1.5 h-4 w-4" />
                  KamuKent'i İnceleyin
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
