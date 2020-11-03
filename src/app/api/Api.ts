import { PromiseInterface } from 'app/interfaces/promise'

import { ApiInterface } from '../interfaces/api'

import { OptionsInterface } from '../interfaces/options'

import { method as regMethod } from './methods'

export class Api implements ApiInterface {
  url: string

  constructor(url: string) {
    this.url = url
  }

  request(options: OptionsInterface, timeout = 10000): Promise<PromiseInterface> {
    const { method, body, path, contentType } = options

    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest()

      xhr.open(method, this.url + path)

      xhr.withCredentials = true

      if (!contentType) {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
      }

      xhr.timeout = timeout

      xhr.onload = function onload() {
        res(xhr)
      }

      xhr.onabort = rej

      xhr.onerror = rej

      xhr.ontimeout = rej

      if (method === 'GET' || !body) {
        xhr.send()
      } else if (contentType === 'multipart/form-data') {
        xhr.send(body)
      } else {
        xhr.send(body)
      }
    })
  }

  get(path: string): Promise<PromiseInterface> {
    return this.request({
      path,
      method: regMethod.get
    })
  }

  post(path: string, body: string): Promise<PromiseInterface> {
    return this.request({
      path,
      body,
      method: regMethod.post
    })
  }

  put(
    path: string,
    body:
      | string
      | FormData
      | Document
      | Blob
      | ArrayBufferView
      | ArrayBuffer
      | URLSearchParams
      | ReadableStream<Uint8Array>,
    contentType: string
  ): Promise<PromiseInterface> {
    return this.request({
      path,
      body,
      method: regMethod.put,
      contentType
    })
  }

  delete(path: string, body: string, contentType: string): Promise<PromiseInterface> {
    return this.request({
      path,
      body,
      method: regMethod.delete,
      contentType
    })
  }
}
