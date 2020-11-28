import {
  RequestMethod,
  ApiInterface,
  Options,
  ApiResponse,
  ContentType
} from 'app/api'

export class Api implements ApiInterface {
  url: string

  constructor(url: string) {
    this.url = url
  }

  request(options: Options, timeout = 10000): Promise<ApiResponse> {
    const { method, body, path, contentType } = options

    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest()

      xhr.open(method, this.url + path)

      xhr.withCredentials = true

      if (!contentType) {
        xhr.setRequestHeader('Content-Type', ContentType.json)
      }

      xhr.timeout = timeout

      xhr.onload = function onload() {
        res(xhr)
      }

      xhr.onabort = rej

      xhr.onerror = rej

      xhr.ontimeout = rej

      if (method === RequestMethod.get || !body) {
        xhr.send()
      } else if (contentType === ContentType.formData) {
        xhr.send(body)
      } else {
        xhr.send(body)
      }
    })
  }

  get(path: string): Promise<ApiResponse> {
    return this.request({
      path,
      method: RequestMethod.get
    })
  }

  post(path: string, body: string): Promise<ApiResponse> {
    return this.request({
      path,
      body,
      method: RequestMethod.post
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
  ): Promise<ApiResponse> {
    return this.request({
      path,
      body,
      method: RequestMethod.put,
      contentType
    })
  }

  delete(
    path: string,
    body: string,
    contentType: string
  ): Promise<ApiResponse> {
    return this.request({
      path,
      body,
      method: RequestMethod.delete,
      contentType
    })
  }
}
