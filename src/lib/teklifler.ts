/**
 * Teklif şablonları (fiyatsız kapsam listeleri).
 * İçerikleri güncellemek için yalnızca bu dosyayı düzenlemeniz yeterli.
 */

export interface TeklifGrup {
  title: string
  items: string[]
}

export interface TeklifSekli {
  id: string
  title: string
  summary: string
  groups: TeklifGrup[]
  /** Kapsam PDF'sinin public/ altındaki yolu */
  pdf: string
}

export const TEKLIF_SEKILLERI: TeklifSekli[] = [
  {
    id: 'bodrumsuz-kaba',
    title: 'Bodrumsuz Kaba İnşaat',
    pdf: '/teklifler/teklif-bodrumsuz-kaba.pdf',
    summary:
      'Bodrum bulunmayan arsalarda; hafriyat, temel, betonarme karkas ve çatının kaba imalatını kapsar.',
    groups: [
      {
        title: 'Hafriyat ve Temel',
        items: [
          'Şantiye kurulumu ve tesfiye hafriyatı',
          'Grobeton ve temel yalıtım membranı',
          'Radye temel betonu',
          'Temel dolgusu ve sıkıştırması',
        ],
      },
      {
        title: 'Kaba Yapı',
        items: [
          'Betonarme karkas imalatı (kalıp, demir, beton)',
          'Dış dolgu duvarları (bims blok)',
          'İç bölme duvarları (bims blok)',
          'Betonarme merdiven ve sahanlıklar',
        ],
      },
      {
        title: 'Çatı',
        items: ['Projesine uygun çatı imalatı', 'Çatı yalıtım membranı'],
      },
    ],
  },
  {
    id: 'bodrumlu-kaba',
    title: 'Bodrumlu Kaba İnşaat',
    pdf: '/teklifler/teklif-bodrumlu-kaba.pdf',
    summary:
      'Bodrum katı bulunan arsalarda; bodrum hafriyatı, radye temel, bodrum perdeleri ve kaba yapı imalatlarını kapsar.',
    groups: [
      {
        title: 'Hafriyat ve Temel',
        items: [
          'Şantiye kurulumu ve bodrum hafriyatı',
          'Zemin iyileştirme ve sıkıştırma',
          'Grobeton ve temel yalıtım membranı',
          'Radye temel betonu',
        ],
      },
      {
        title: 'Bodrum İmalatları',
        items: [
          'Bodrum perde betonu',
          'Bodrum dış cephe yalıtımı ve koruma sıvası',
          'Çevre drenaj hattı',
          'Bodrum iç duvarları, sahanlık ve basamaklar',
        ],
      },
      {
        title: 'Kaba Yapı',
        items: [
          'Betonarme karkas imalatı (kalıp, demir, beton)',
          'Dış dolgu duvarları (bims blok)',
          'İç bölme duvarları (bims blok)',
          'Betonarme merdiven ve sahanlıklar',
        ],
      },
      {
        title: 'Çatı',
        items: ['Projesine uygun çatı imalatı', 'Çatı yalıtım membranı'],
      },
    ],
  },
  {
    id: 'bodrumsuz-ileri-kaba',
    title: 'Bodrumsuz İleri Kaba İnşaat',
    pdf: '/teklifler/teklif-bodrumsuz-ileri-kaba.pdf',
    summary:
      'Bodrumsuz kaba inşaatın üzerine; sıva, şap ve tesisat geçişlerini de ekleyen teslim seviyesidir. (Kapı ve doğrama dahil değildir.)',
    groups: [
      {
        title: 'Hafriyat ve Temel',
        items: [
          'Şantiye kurulumu ve tesfiye hafriyatı',
          'Grobeton ve temel yalıtım membranı',
          'Radye temel betonu',
          'Temel dolgusu ve sıkıştırması',
        ],
      },
      {
        title: 'Kaba Yapı',
        items: [
          'Betonarme karkas imalatı (kalıp, demir, beton)',
          'Dış dolgu duvarları (bims blok)',
          'İç bölme duvarları (bims blok)',
          'Betonarme merdiven ve sahanlıklar',
        ],
      },
      {
        title: 'Sıva ve Şap',
        items: ['İç sıva imalatları', 'Dış sıva imalatları', 'Şap imalatları (yer kaplaması altı)'],
      },
      {
        title: 'Tesisat',
        items: [
          'Elektrik ve sıhhi tesisat kalıp içi geçiş boruları',
          'Çatı kaplaması ve yalıtımı',
        ],
      },
    ],
  },
  {
    id: 'bodrumlu-ileri-kaba',
    title: 'Bodrumlu İleri Kaba İnşaat',
    pdf: '/teklifler/teklif-bodrumlu-ileri-kaba.pdf',
    summary:
      'Bodrumlu kaba inşaatın üzerine; sıva, şap ve tesisat geçişlerini de ekleyen en kapsamlı kaba teslim seviyesidir. (Kapı ve doğrama dahil değildir.)',
    groups: [
      {
        title: 'Hafriyat ve Temel',
        items: [
          'Şantiye kurulumu ve bodrum hafriyatı',
          'Zemin iyileştirme ve sıkıştırma',
          'Grobeton ve temel yalıtım membranı',
          'Radye temel betonu',
        ],
      },
      {
        title: 'Bodrum İmalatları',
        items: [
          'Bodrum perde betonu',
          'Bodrum dış cephe yalıtımı ve koruma sıvası',
          'Çevre drenaj hattı',
          'Bodrum iç duvarları, sahanlık ve basamaklar',
        ],
      },
      {
        title: 'Kaba Yapı',
        items: [
          'Betonarme karkas imalatı (kalıp, demir, beton)',
          'Dış dolgu duvarları (bims blok)',
          'İç bölme duvarları (bims blok)',
          'Betonarme merdiven ve sahanlıklar',
        ],
      },
      {
        title: 'Sıva, Şap ve Tesisat',
        items: [
          'İç ve dış sıva imalatları',
          'Şap imalatları (yer kaplaması altı)',
          'Elektrik ve sıhhi tesisat kalıp içi geçiş boruları',
          'Çatı kaplaması ve yalıtımı',
        ],
      },
    ],
  },
]
