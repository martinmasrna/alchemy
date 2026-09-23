// Minimal offline cache so the game works as a home-screen app.
// Bump VERSION whenever any file changes.
const VERSION = "w1-15";
const FILES = ["./", "./index.html", "./app.js", "./config.js", "./worlds/world1.js", "./icons/world1.js", "./manifest.webmanifest", "./icon.svg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Network first, cache as fallback: updates land immediately when online. The game's own files
// are revalidated every time, because GitHub Pages lets browsers keep them for ten minutes and
// a phone would otherwise play the previous version after a deploy.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const own = new URL(e.request.url).origin === self.location.origin;
  e.respondWith(
    fetch(own ? new Request(e.request.url, { cache: "no-cache" }) : e.request).then((res) => {
      const copy = res.clone();
      caches.open(VERSION).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
