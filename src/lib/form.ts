/**
 * Form gönderimleri — FormSubmit.co üzerinden info@berramuhendislik.com adresine iletilir.
 * İlk gönderimde bu adrese bir "Activate Form" onay maili gider; onaylandıktan sonra
 * tüm talepler doğrudan mail kutusuna düşer.
 */

const ENDPOINT = 'https://formsubmit.co/ajax/info@berramuhendislik.com'

export async function sendForm(
  fields: Record<string, FormDataEntryValue | null>,
  subject: string,
): Promise<boolean> {
  const body: Record<string, string> = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    _replyto: '',
  }
  for (const [key, value] of Object.entries(fields)) {
    if (value != null && String(value).trim() !== '') body[key] = String(value)
  }
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
    return res.ok
  } catch {
    return false
  }
}
