// Berra İnşaat — Cloudflare Worker
// Statik varlıkları (Static Assets) servis eder ve HTML yanıtlarına
// önbellek başlıkları (Cache-Control + ETag) ekler.

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    const contentType = response.headers.get("content-type") || "";
    if (response.status !== 200 || !contentType.includes("text/html")) {
      return response;
    }

    // HEAD gibi gövdesiz yanıtlarda hash boş çıkar; ETag üretme.
    if (request.method !== "GET") {
      const headers = new Headers(response.headers);
      headers.set("Cache-Control", "public, max-age=600, must-revalidate");
      headers.set("X-Berra-Worker", "v1");
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    const body = await response.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", body);
    const hash = Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 16);

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "public, max-age=600, must-revalidate");
    headers.set("ETag", `"${hash}"`);
    headers.set("X-Berra-Worker", "v1");

    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
