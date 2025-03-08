/// <reference lib="webworker" />

// Este archivo debe estar en la carpeta 'public' para Next.js
// Aquí solo mostramos el contenido que iría en ese archivo

const sw = self as unknown as ServiceWorkerGlobalScope

sw.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "/",
        "/services",
        "/bookings",
        "/profile",
        "/manifest.json",
        "/icons/icon-192x192.png",
        "/icons/icon-512x512.png",
      ])
    }),
  )
})

sw.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    }),
  )
})

sw.addEventListener("activate", (event) => {
  const cacheWhitelist = ["v1"]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

