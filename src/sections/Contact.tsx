import { useState } from 'react'
import type { FormEvent } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CONTACT } from '@/lib/site'
import { sendForm } from '@/lib/form'
import { WHATSAPP_URL } from '@/lib/whatsapp'
import { WhatsAppIcon } from '@/components/WhatsAppFloat'

const INFO = [
  { icon: MapPin, label: 'Adres', value: CONTACT.address },
  { icon: Phone, label: 'Telefon', value: CONTACT.phone },
  { icon: Mail, label: 'E-posta', value: CONTACT.email },
  { icon: Clock, label: 'Çalışma Saatleri', value: CONTACT.hours },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setSendError(false)
    const data = new FormData(e.currentTarget)
    const ok = await sendForm(
      {
        'Ad Soyad': data.get('name'),
        Telefon: data.get('phone'),
        'E-posta': data.get('email'),
        Konu: data.get('subject'),
        Mesaj: data.get('message'),
      },
      'İletişim Formu — berramuhendislik.com',
    )
    setSending(false)
    if (ok) setSent(true)
    else setSendError(true)
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

            <Reveal delay={350}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 transition hover:border-emerald-300 hover:bg-emerald-100/70"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#25D366] text-white">
                  <WhatsAppIcon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-semibold text-neutral-900">
                    WhatsApp'tan Sorun
                  </span>
                  <span className="block text-sm text-neutral-600">
                    Sorularınızı yazın, hemen yanıtlayalım — 0533 818 29 31
                  </span>
                </span>
              </a>
            </Reveal>
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
                      <Input id="name" name="name" required placeholder="Adınız Soyadınız" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input id="phone" name="phone" required type="tel" placeholder="05XX XXX XX XX" className="rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta *</Label>
                    <Input id="email" name="email" required type="email" placeholder="ornek@eposta.com" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Konu</Label>
                    <Input id="subject" name="subject" placeholder="Örn. Konut projesi teklifi" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mesajınız *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Projenizden kısaca bahsedin: konum, kapsam, hedef takvim..."
                      className="resize-none rounded-xl"
                    />
                  </div>
                  {sendError && (
                    <p className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      Gönderim başarısız oldu. Lütfen tekrar deneyin veya bizi telefonla arayın.
                    </p>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={sending}
                    className="w-full rounded-full bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-700 disabled:opacity-60"
                  >
                    {sending ? 'Gönderiliyor…' : 'Mesajı Gönder'}
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
