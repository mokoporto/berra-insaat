import { DraftingCompass, HardHat, FileBadge, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

const SERVICES = [
  {
    icon: DraftingCompass,
    title: 'Betonarme Proje Müellifliği',
    highlight: 'S.S. KamuKent Arsa ve Konut Yapı Kooperatifi',
    text: 'Kooperatif konut projelerinde betonarme taşıyıcı sistem projelerinin hazırlanması, çizilmesi ve resmi onay süreçlerinin müellif sıfatıyla yürütülmesi.',
    items: [
      'Taşıyıcı sistem (betonarme) projelendirme',
      'Proje onay ve tasdik süreçlerinin takibi',
      'Kooperatif yönetimiyle teknik koordinasyon',
    ],
  },
  {
    icon: HardHat,
    title: 'Fenni Mesul Görevi',
    highlight: 'Şantiye süresince teknik sorumluluk',
    text: 'Yapım aşamasındaki yapılarda fenni mesul olarak görev alınması; imalatların onaylı projeye ve ilgili yönetmeliklere uygunluğunun denetlenmesi.',
    items: [
      'İmalat denetimi ve tutanak takibi',
      'Malzeme ve işçilik kalite kontrolü',
      'İdare ve denetim kurumlarıyla koordinasyon',
    ],
  },
  {
    icon: FileBadge,
    title: 'Enerji Kimlik Belgesi (EKB)',
    highlight: 'Yasal zorunluluk, hızlı düzenleme',
    text: 'Yapınızın ısı yalıtımı, ısıtma-soğutma sistemleri ve enerji tüketiminin yönetmeliklere uygun olarak hesaplanması ve Enerji Kimlik Belgesi\'nin düzenlenmesi.',
    items: [
      'Enerji performansı hesaplamaları',
      'Isıtma, soğutma ve sıhhi tesisat kontrolü',
      'Yasal geçerliliğe sahip EKB düzenlenmesi',
    ],
  },
]

export default function Services() {
  return (
    <section id="hizmetler" className="bg-neutral-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Hizmetlerimiz
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Sunduklarımız
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Kooperatif konut projelerinden bağımsız yapılara; proje müellifliğinden
            enerji kimlik belgesine kadar teknik süreçlerin tamamı tek elden.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 120}>
              <div className="group flex h-full flex-col rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-neutral-900/8">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display mt-6 text-lg font-semibold text-neutral-900">
                  {service.title}
                </h3>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: '#4f9b99' }}>
                  {service.highlight}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{service.text}</p>
                <ul className="mt-5 flex-1 space-y-2.5 border-t border-neutral-100 pt-5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#iletisim"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 transition-colors hover:text-brand"
                >
                  Bilgi ve Teklif Alın
                  <ArrowUpRight className="h-4 w-4 text-brand" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
