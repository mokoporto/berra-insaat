import { useState } from 'react'
import type { FormEvent } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CONTACT } from '@/lib/site'

const INFO = [
  { icon: MapPin, label: 'Adres', value: CONTACT.address },
  { icon: Phone, label: 'Telefon', value: CONTACT.phone },
  { icon: Mail, label: 'E-posta', value: CONTACT.email },
  { icon: Clock, label: 'Çalışma Saatleri', value: CONTACT.hours },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="iletisim" className="bg-neutral-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-5 lg:gap-20">
          {/* Sol: başlık + iletişim bilgileri */}
          <div className="lg:col-span-2">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                İletişim
              </p>
              <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                Projenizi birlikte konuşalım
              </h2>
              <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
                Keşif, teklif veya danışmanlık için formu doldurun; mesai saatleri
                içinde en geç 24 saat içinde dönüş yapalım.
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              {INFO.map((item, i) => (
                <Reveal key={item.label} delay={i * 80}>
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-sm">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                        {item.label}
                      </p>
                      <p className="mt-1 font-medium text-neutral-900">{item.value}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Sağ: form */}
          <Reveal delay={150} className="lg:col-span-3">
            <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-xl shadow-neutral-900/5 sm:p-10">
              {sent ? (
                <div className="flex min-h-96 flex-col items-center justify-center text-center">
                  <CheckCircle2 className="h-14 w-14 text-emerald-500" />
                  <h3 className="font-display mt-5 text-2xl font-bold text-neutral-900">
                    Mesajınız alındı
                  </h3>
                  <p className="mt-3 max-w-sm text-neutral-600">
                    En kısa sürede size dönüş yapacağız. Acil konular için doğrudan
                    telefon numaramızdan bize ulaşabilirsiniz.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8 rounded-full"
                    onClick={() => setSent(false)}
                  >
                    Yeni Mesaj Gönder
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ad Soyad *</Label>
                      <Input id="name" required placeholder="Adınız Soyadınız" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input id="phone" required type="tel" placeholder="05XX XXX XX XX" className="rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta *</Label>
                    <Input id="email" required type="email" placeholder="ornek@eposta.com" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Konu</Label>
                    <Input id="subject" placeholder="Örn. Konut projesi teklifi" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mesajınız *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Projenizden kısaca bahsedin: konum, kapsam, hedef takvim..."
                      className="resize-none rounded-xl"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-700"
                  >
                    Mesajı Gönder
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-center text-xs text-neutral-400">
                    Bilgileriniz yalnızca size dönüş yapmak amacıyla kullanılır.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
