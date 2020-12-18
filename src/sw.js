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

const update = (request) => {
  return caches
    .open(CACHE_VERSION)
    .then((cache) =>
      fetch(request).then((response) => cache.put(request, response))
    )
}

const fetchHandler = (event) => {
  const { request } = event
  let isFromNetwork = false

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse !== undefined) {
        return cachedResponse
      }

      isFromNetwork = true // prevent useless second request

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

  if (!isFromNetwork) {
    event.waitUntil(update(event.request))
  }
}

self.addEventListener('install', installHandler)

self.addEventListener('fetch', fetchHandler)
