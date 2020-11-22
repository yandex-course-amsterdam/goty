/* eslint-disable */

const CACHE_VERSION = 'goty-v1'
const ALLOW_LIST = ['https://ya-praktikum.tech/api/']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(self.__WB_MANIFEST.map((it) => it.url)))
  )
})

self.addEventListener('fetch', (event) => {
  if (!ALLOW_LIST.some((url) => event.request.url.indexOf(url) !== -1)) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response !== undefined) {
          return response
        } else {
          return fetch(event.request).then(function (response) {
            // caches.open(CACHE_VERSION).then(function (cache) {
            //   cache.put(event.request, responseClone)
            // })
            return response
          })
        }
      })
    )
  }
})
