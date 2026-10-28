// network first (always newest when online), cache fallback when offline
const C = "sd-cache-v1";
self.addEventListener("install", (e) => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin || u.pathname.endsWith("control.json")) return;
  e.respondWith(fetch(e.request, { cache: "no-store" }).then((r) => { const c = r.clone(); caches.open(C).then((k) => k.put(e.request, c)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
