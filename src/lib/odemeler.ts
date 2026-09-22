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

export const DIGER_ODEMELER: { title: string; detail: string }[] = [
  {
    title: 'Şantiye Şefi',
    detail: '1 senelik şantiye şefi ücreti yaklaşık 80.000 ₺ – 100.000 ₺ aralığındadır.',
  },
  {
    title: 'Numarataj Krokisi ve Belgesi',
    detail: 'Belediye harcı ödemesi ile alınır.',
  },
  {
    title: 'İZSU Kanal Katılım Belgesi',
    detail:
      'Ücret İZSU tarafından hesaplanır; ortalama 100.000 ₺ civarında çıkmaktadır. Son durumu kontrol ediniz.',
  },
  {
    title: 'Belediye Harcı',
    detail: '',
  },
  {
    title: 'İş Takip Bedeli',
    detail: '',
  },
]

export const DIGER_ODEMELER_NOTU =
  'Yukarıdaki kişi ve kurumlara yapılacak ödemeler ilgili kişi ve kurumlar ile görüşmeniz gerekmektedir.'
