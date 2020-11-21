/* eslint-disable */

const CACHE_VERSION = 'goty-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(self.__WB_MANIFEST.map((it) => it.url)))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response !== undefined) {
        return response
      } else {
        return fetch(event.request).then(function (response) {
          let responseClone = response.clone()

          caches.open(CACHE_VERSION).then(function (cache) {
            cache.put(event.request, responseClone)
          })
          return response
        })
      }
    })
  )
})
