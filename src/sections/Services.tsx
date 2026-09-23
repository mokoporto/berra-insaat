import { DraftingCompass, HardHat, FileBadge, ArrowUpRight, Building2, Layers, KeyRound, Landmark, FileCheck2, Home } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

const SERVICES = [
  {
    icon: Building2,
    title: 'Kaba İnşaat',
    highlight: 'Tesfiyeden çatıya taşıyıcı yapı',
    text: 'Hafriyat, temel, betonarme karkas, bims blok duvar ve projesine uygun çatı imalatı ile ana taşıyıcı yapının teslimi.',
    items: [
      'Hafriyat, grobeton ve radye temel',
      'Betonarme karkas (kalıp, demir, beton)',
      'Bims blok dolgu ve bölme duvarları',
    ],
  },
  {
    icon: Layers,
    title: 'İleri Kaba İnşaat',
    highlight: 'Sıva ve şap dahil teslim',
    text: 'Kaba inşaatın üzerine iç-dış sıva, şap ve tesisat kalıp içi geçiş imalatlarını da ekleyen ara teslim seviyesi.',
    items: [
      'Kaba inşaatın tüm imalatları',
      'İç ve dış sıva, şap imalatları',
      'Tesisat kalıp içi geçiş boruları',
    ],
  },
  {
    icon: KeyRound,
    title: 'Anahtar Teslim İnşaat',
    highlight: 'Teslime hazır, oturulabilir yapı',
    text: 'Projesindeki tüm mimari ve mekanik imalatların tamamlanarak yapının kullanıma hazır şekilde teslim edilmesi.',
    items: [
      'İleri kaba imalatların tamamı',
      'İnce yapı, doğrama, kapı ve kaplama',
      'Tesisat montaj ve testleri',
    ],
  },
  {
    icon: Landmark,
    title: 'Restorasyon',
    highlight: 'Tescilli yapılarda güvenli dönüşüm',
    text: 'Tescilli ve eski yapıların onaylı restorasyon projelerine uygun olarak güçlendirilmesi, onarımı ve işlevlendirilmesi.',
    items: [
      'Restorasyon projesine uygun imalat',
      'Yapı güçlendirme ve onarımlar',
      'Koruma kurullarıyla koordinasyon',
    ],
  },
  {
    icon: FileCheck2,
    title: 'Yapı Ruhsatı Aşamaları',
    highlight: 'Başvurudan ruhsata kadar',
    text: 'Proje tasdiki, belediyeye ruhsat başvurusu, eksik evrak ve harç takibinin tamamının sizin adınıza yürütülmesi.',
    items: [
      'Proje onay ve tasdik süreçleri',
      'Ruhsat başvurusu ve evrak takibi',
      'Harç ve ödeme planlaması',
    ],
  },
  {
    icon: Home,
    title: 'Yapı Kullanma Aşaması',
    highlight: 'İskân (yapı kullanma izni)',
    text: 'Yapının tamamlanması sonrası denetim, tutanak ve yapı kullanma izin belgesi alınması aşamalarının yönetilmesi.',
    items: [
      'Son kontrol ve denetim süreçleri',
      'İlgili kurum tutanaklarının alınması',
      'Yapı kullanma izin belgesi başvurusu',
    ],
  },
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
            Kaba inşaat, ileri kaba inşaat, anahtar teslim inşaat ve restorasyondan;
            yapı ruhsatı ve yapı kullanma aşamalarına, proje müellifliğinden Enerji
            Kimlik Belgesine kadar tüm süreçler tek elden.
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
