import { ArrowUp } from 'lucide-react'
import { NAV_LINKS, CONTACT } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-5">
          {/* Marka */}
          <div className="md:col-span-2">
            <a href="#anasayfa" className="inline-flex items-center">
              <img src="/images/logo-white.png" alt="Berra Proje ve İnşaat" className="h-10 w-auto" />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              2016'dan beri Karaburun merkezli; kaba, ileri kaba ve anahtar teslim
              inşaat, restorasyon, yapı ruhsatı ve kullanma aşamaları, S.S. KamuKent
              kooperatifinde betonarme proje müellifliği, fenni mesullük ve Enerji
              Kimlik Belgesi hizmetleri.
            </p>
          </div>

          {/* Menü */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">Menü</h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-brand-aqua"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sayfalar */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">Sayfalar</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="/hakkimizda.html" className="text-white/70 transition-colors hover:text-brand-aqua">Hakkımızda</a></li>
              <li><a href="/iletisim.html" className="text-white/70 transition-colors hover:text-brand-aqua">İletişim</a></li>
              <li><a href="/kamukent.html" className="text-white/70 transition-colors hover:text-brand-aqua">KamuKent Parsel Sorgulama</a></li>
              <li><a href="/gizlilik.html" className="text-white/70 transition-colors hover:text-brand-aqua">Gizlilik Politikası</a></li>
              <li><a href="/privacy.html" className="text-white/70 transition-colors hover:text-brand-aqua">Privacy Policy</a></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">İletişim</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>{CONTACT.address}</li>
              <li>
                <a href={`tel:${CONTACT.phone}`} className="hover:text-brand-aqua">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-brand-aqua">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Berra İnşaat. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="/gizlilik.html"
              className="text-xs text-white/40 transition hover:text-brand-aqua"
            >
              Gizlilik Politikası
            </a>
            <a
              href="#anasayfa"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-brand-aqua hover:text-brand-aqua"
              aria-label="Yukarı dön"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
