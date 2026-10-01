/**
 * WhatsApp iletişim bağlantıları.
 * Numara: 0533 818 29 31 → uluslararası format 90 533 818 29 31
 * wa.me bağlantısı tıklanınca kullanıcının WhatsApp'ında hazır mesajla
 * sohbet ekranı açılır.
 */

const NUMBER = '905338182931'

function buildLink(message: string): string {
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(message)}`
}

/** Genel bilgi / teklif için hazır mesaj */
export const WHATSAPP_URL = buildLink(
  'Merhaba, inşaat / teklif hakkında bilgi almak istiyorum.',
)

/** KamuKent parsel sorguları için hazır mesaj */
export const WHATSAPP_KAMUKENT_URL = buildLink(
  'Merhaba, KamuKent parselim (ada/parsel: ___ ) hakkında bilgi almak istiyorum.',
)
