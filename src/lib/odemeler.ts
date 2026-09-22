/**
 * Ruhsat aşaması ödeme bilgileri.
 * Kaynak: Ödemeler.pdf — güncellendiğinde bu dosyayı düzenlemeniz yeterli.
 */

export interface MuellifOdemeleri {
  label: string
  items: string[]
  total: string
  notes: string[]
}

export const PROJE_MUELLIF_ODEMELERI: Record<'bodrumsuz' | 'bodrumlu', MuellifOdemeleri> = {
  bodrumsuz: {
    label: 'Bodrumsuz Binalar İçin Proje Müellifleri Ödemeleri',
    items: [
      'Mimar Muvafakatnamesi ve Tus',
      'İnşaat Mühendisi — Statik Proje, Proje Müellifliği ve Tus',
      'Elektrik Mühendisi Proje Müellifliği ve Tus',
      'Makina Mühendisi Proje Müellifliği ve Tus',
    ],
    total: '130.000 ₺',
    notes: [
      'Harita Mühendisi için yapılacak ödemeleri Harita Mühendisi ile görüşmeniz gerekmektedir.',
    ],
  },
  bodrumlu: {
    label: 'Bodrumlu Binalar İçin Proje Müellifleri Ödemeleri',
    items: [
      'Mimar Muvafakatnamesi',
      'İnşaat Mühendisi — Statik Proje ve Proje Müellifliği',
      'Elektrik Mühendisi Proje Müellifliği',
      'Makina Mühendisi Proje Müellifliği',
    ],
    total: '97.500 ₺',
    notes: [
      'Harita Mühendisi için yapılacak ödemeler hariç olup Harita Mühendisi ile görüşmeniz gerekmektedir.',
      'Yapı denetim firmasına yapılacak ödemeler hariç olup Yapı Denetim Firması ile görüşmeniz gerekmektedir.',
    ],
  },
}

export const DIGER_ODEMELER = [
  'Şantiye Şefi',
  'Numarataj Krokisi ve Belgesi',
  'İZSU Kanal Katılım Belgesi',
  'Belediye Harcı',
  'İş Takip Bedeli',
]

export const DIGER_ODEMELER_NOTU =
  'Yukarıdaki kişi ve kurumlara yapılacak ödemeler ilgili kişi ve kurumlar ile görüşmeniz gerekmektedir.'
