import { Reveal } from '@/components/Reveal'

const STATS = [
  { value: '2016', label: 'Kuruluş Yılı' },
  { value: '10+', label: 'Yıllık Deneyim' },
  { value: 'Karaburun', label: 'İzmir Merkezli' },
  { value: 'EKB', label: 'Enerji Kimlik Belgesi' },
]

export default function Stats() {
  return (
    <section id="rakamlar" className="border-b border-neutral-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-16 sm:px-8 lg:grid-cols-4 lg:py-20">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 100} className="text-center">
            <p className="font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-widest text-neutral-500">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
