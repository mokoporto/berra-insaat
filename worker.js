// Berra İnşaat — Cloudflare Worker
// Statik varlıkları (Static Assets) servis eder ve HTML yanıtlarına
// önbellek başlıkları (Cache-Control + Last-Modified) ekler.
//
// v2: Yanıt gövdesi akılar (stream) döndürülür; içerik tamponda
// okunup hash'lenmez. Böylece ilk bayt süresi (TTFB) kısalır.

// İçerik güncellendiğinde bu tarihi de güncelle.
const LAST_MODIFIED = "Sat, 04 Oct 2026 00:00:00 GMT";

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    const contentType = response.headers.get("content-type") || "";
    if (response.status !== 200 || !contentType.includes("text/html")) {
      return response;
    }

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "public, max-age=600, must-revalidate");
    headers.set("Last-Modified", LAST_MODIFIED);
    headers.set("X-Berra-Worker", "v2");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
