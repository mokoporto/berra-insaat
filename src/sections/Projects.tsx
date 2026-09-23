import { useCallback, useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

const PHOTOS = Array.from(
  { length: 41 },
  (_, i) => `/images/projects/proje-${String(i + 1).padStart(2, '0')}.jpg`,
)

export default function Projects() {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + PHOTOS.length) % PHOTOS.length,
      ),
    [],
  )

  useEffect(() => {
    if (active === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, close, step])

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
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Şantiyelerimizden ve teslim ettiğimiz yapılardan kareler.
            Fotoğrafların üzerine tıklayarak büyütebilirsiniz.
          </p>
        </Reveal>

        {/* Galeri */}
        <Reveal delay={100}>
          <div className="mt-14 columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
            {PHOTOS.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                className="group block w-full break-inside-avoid overflow-hidden rounded-2xl bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                aria-label={`Fotoğraf ${i + 1} büyüt`}
              >
                <img
                  src={src}
                  alt={`Berra Proje ve İnşaat — tamamlanan yapı ${i + 1}`}
                  loading="lazy"
                  className="w-full transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Kapat"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            aria-label="Önceki fotoğraf"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img
            src={PHOTOS[active]}
            alt={`Berra Proje ve İnşaat — tamamlanan yapı ${active + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            aria-label="Sonraki fotoğraf"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white">
            {active + 1} / {PHOTOS.length}
          </p>
        </div>
      )}
    </section>
  )
}
