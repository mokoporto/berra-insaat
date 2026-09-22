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
}

export const TEKLIF_SEKILLERI: TeklifSekli[] = [
  {
    id: 'bodrumsuz-kaba',
    title: 'Bodrumsuz Kaba İnşaat',
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
          'Dış dolgu duvarları (gazbeton/blok)',
          'İç bölme duvarları (gazbeton/blok)',
          'Betonarme merdiven ve sahanlıklar',
        ],
      },
      {
        title: 'Çatı',
        items: ['Çatı betonarmesi', 'Çatı yalıtım membranı'],
      },
    ],
  },
  {
    id: 'bodrumlu-kaba',
    title: 'Bodrumlu Kaba İnşaat',
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
          'Dış dolgu duvarları (gazbeton/blok)',
          'İç bölme duvarları (gazbeton/blok)',
          'Betonarme merdiven ve sahanlıklar',
        ],
      },
      {
        title: 'Çatı',
        items: ['Çatı betonarmesi', 'Çatı yalıtım membranı'],
      },
    ],
  },
  {
    id: 'bodrumsuz-ileri-kaba',
    title: 'Bodrumsuz İleri Kaba İnşaat',
    summary:
      'Bodrumsuz kaba inşaatın üzerine; sıva, şap, tesisat geçişleri ve doğrama montajını da ekleyen teslim seviyesidir.',
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
          'Dış dolgu duvarları (gazbeton/blok)',
          'İç bölme duvarları (gazbeton/blok)',
          'Betonarme merdiven ve sahanlıklar',
        ],
      },
      {
        title: 'Sıva ve Şap',
        items: ['İç sıva imalatları', 'Dış sıva imalatları', 'Şap imalatları (yer kaplaması altı)'],
      },
      {
        title: 'Tesisat ve Doğrama',
        items: [
          'Elektrik ve sıhhi tesisat kalıp içi geçiş boruları',
          'Pencere ve kapı doğrama montajı',
          'Çatı kaplaması ve yalıtımı',
        ],
      },
    ],
  },
  {
    id: 'bodrumlu-ileri-kaba',
    title: 'Bodrumlu İleri Kaba İnşaat',
    summary:
      'Bodrumlu kaba inşaatın üzerine; sıva, şap, tesisat geçişleri ve doğrama montajını da ekleyen en kapsamlı kaba teslim seviyesidir.',
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
          'Dış dolgu duvarları (gazbeton/blok)',
          'İç bölme duvarları (gazbeton/blok)',
          'Betonarme merdiven ve sahanlıklar',
        ],
      },
      {
        title: 'Sıva, Şap ve Doğrama',
        items: [
          'İç ve dış sıva imalatları',
          'Şap imalatları (yer kaplaması altı)',
          'Elektrik ve sıhhi tesisat kalıp içi geçiş boruları',
          'Pencere ve kapı doğrama montajı',
          'Çatı kaplaması ve yalıtımı',
        ],
      },
    ],
  },
]
