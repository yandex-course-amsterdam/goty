import { OptionsInterface } from './options'
import { PromiseInterface } from './promise'

export interface ApiInterface {
  request(options: OptionsInterface, timeout: number): Promise<PromiseInterface>
  get(path: string): Promise<PromiseInterface>
  post(path: string, body: string): Promise<PromiseInterface>
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
  ): Promise<PromiseInterface>
  delete(path: string, body: string, contentType: string): Promise<PromiseInterface>
}
