/* eslint-disable */

const CACHE_VERSION = 'goty-v1'

const checkResponse = (response) => {
  return response && response.status >= 200 && response.status < 300
}

const installHandler = (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(self.__WB_MANIFEST.map((it) => it.url)))
  )
}

const fetchHandler = (event) => {
  const { request } = event

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse !== undefined) {
        return cachedResponse
      }

      return fetch(request).then((response) => {
        if (!checkResponse(response) || request.method !== 'GET') {
          return response
        }

        const clonedResponse = response.clone()
        caches.open(CACHE_VERSION).then((cache) => {
          cache.put(event.request, clonedResponse)
        })

        return response
      })
    })
  )
}

self.addEventListener('install', installHandler)

self.addEventListener('fetch', fetchHandler)
