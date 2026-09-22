import { ShieldCheck, Compass, Leaf, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Güven ve Şeffaflık',
    text: 'Sözleşmeden teslime kadar her aşamada açık iletişim, net bütçe ve zamanında teslim.',
  },
  {
    icon: Compass,
    title: 'Mühendislik Disiplini',
    text: 'Her proje; deprem yönetmeliği, sürdürülebilirlik ve insan odaklı tasarım ilkeleriyle yürütülür.',
  },
  {
    icon: Leaf,
    title: 'Sürdürülebilirlik',
    text: 'Enerji verimli sistemler ve çevreye saygılı malzeme seçimiyle geleceğe değer katarız.',
  },
]

export default function About() {
  return (
    <section id="hakkimizda" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Metin */}
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                Hakkımızda
              </p>
              <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                Karaburun'da
                <br />
                güvenle büyüyen mühendislik.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
                2016 yılında İzmir Karaburun'da kurulan Berra Proje ve İnşaat;
                S.S. KamuKent Arsa ve Konut Yapı Kooperatifi'nde betonarme proje
                müellifliği, şantiyelerde fenni mesul görevi ve Enerji Kimlik
                Belgesi düzenlenmesi başta olmak üzere yapı süreçlerinin teknik
                yükünü üstlenmektedir.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 inline-flex items-center gap-4 rounded-2xl bg-neutral-950 px-7 py-5 text-white">
                <p className="font-display text-3xl font-bold text-brand-aqua">2016</p>
                <p className="text-xs uppercase tracking-widest text-white/60">
                  Kuruluş Yılı
                  <br />
                  Karaburun / İzmir
                </p>
              </div>
            </Reveal>
          </div>

          {/* Değerler */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              {VALUES.map((value, i) => (
                <Reveal key={value.title} delay={i * 100}>
                  <div className="flex gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/60 p-6">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                      <value.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">{value.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-600">{value.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <Button asChild className="mt-8 w-fit rounded-full bg-neutral-900 px-6 text-sm font-semibold text-white hover:bg-neutral-700">
                <a href="#iletisim">
                  Bizimle Çalışın
                  <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
