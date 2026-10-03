// Berra İnşaat — Cloudflare Worker
// Statik varlıkları (Static Assets) servis eder ve HTML yanıtlarına
// önbellek başlıkları (Cache-Control + ETag + Last-Modified) ekler.

// İçerik güncellendiğinde bu tarihi de güncelle.
const LAST_MODIFIED = "Fri, 03 Oct 2026 00:00:00 GMT";

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    // HEAD gibi gövdesiz istemciler için gövdeyi GET ile üretip
    // doğru ETag üretiriz; yanıtı gövdesiz döndürürüz.
    const isHead = request.method !== "GET";
    const assetRequest = isHead
      ? new Request(request.url, { method: "GET" })
      : request;
    const assetResponse = isHead
      ? await env.ASSETS.fetch(assetRequest)
      : response;

    const contentType = assetResponse.headers.get("content-type") || "";
    if (assetResponse.status !== 200 || !contentType.includes("text/html")) {
      return response;
    }

    const body = await assetResponse.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", body);
    const hash = Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 16);

    const headers = new Headers(assetResponse.headers);
    headers.set("Cache-Control", "public, max-age=600, must-revalidate");
    headers.set("ETag", `"${hash}"`);
    headers.set("Last-Modified", LAST_MODIFIED);
    headers.set("X-Berra-Worker", "v1");

    return new Response(isHead ? null : body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers,
    });
  },
};
