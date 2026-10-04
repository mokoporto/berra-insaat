import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NAV_LINKS, KAMUKENT_PAGES } from '@/lib/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hero üzerindeyken şeffaf, aşağı inince buzlu cam (Apple tarzı)
  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        İçeriğe atla
      </a>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <a href="#anasayfa" className="flex items-center" onClick={() => setOpen(false)}>
          <img
            src={solid ? '/images/logo.png' : '/images/logo-white.png'}
            alt="Berra Proje ve İnşaat"
            className="h-8 w-auto transition-all duration-300"
          />
        </a>

        {/* Masaüstü menü */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) =>
            link.href === '#kamukent' ? (
              <li key={link.href} className="group relative">
                <a
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    solid
                      ? 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                      : 'text-white/85 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
                <ul className="invisible absolute left-0 top-full z-50 w-64 translate-y-1 rounded-2xl border border-neutral-100 bg-white p-2 opacity-0 shadow-xl shadow-neutral-900/10 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {KAMUKENT_PAGES.map((p) => (
                    <li key={p.href}>
                      <a
                        href={p.href}
                        className="block rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-brand/5 hover:text-brand"
                      >
                        {p.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    solid
                      ? 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                      : 'text-white/85 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className={`hidden rounded-full px-5 text-sm font-semibold lg:inline-flex ${
              solid
                ? 'bg-neutral-900 text-white hover:bg-neutral-700'
                : 'bg-white text-neutral-900 hover:bg-white/90'
            }`}
          >
            <a href="#iletisim">
              Teklif Alın
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </Button>

          {/* Mobil menü düğmesi */}
          <button
            aria-label="Menüyü aç/kapat"
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors lg:hidden ${
              solid ? 'text-neutral-900 hover:bg-neutral-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobil menü */}
      <div
        className={`overflow-hidden bg-white/95 backdrop-blur-xl transition-[max-height] duration-500 ease-out lg:hidden ${
          open ? 'max-h-96 shadow-lg' : 'max-h-0'
        }`}
      >
        <ul className="space-y-1 px-5 pb-6 pt-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-100"
              >
                {link.label}
              </a>
              {link.href === '#kamukent' && (
                <ul className="mt-1 space-y-1 border-l-2 border-brand/20 pl-4">
                  {KAMUKENT_PAGES.map((p) => (
                    <li key={p.href}>
                      <a
                        href={p.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100"
                      >
                        {p.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="pt-2">
            <Button asChild className="w-full rounded-full bg-neutral-900 text-white hover:bg-neutral-700">
              <a href="#iletisim" onClick={() => setOpen(false)}>
                Teklif Alın
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  )
}
