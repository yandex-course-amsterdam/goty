export interface OptionsInterface {
  method: string
  body?:
    | string
    | FormData
    | Document
    | Blob
    | ArrayBufferView
    | ArrayBuffer
    | URLSearchParams
    | ReadableStream<Uint8Array>
  path: string
  contentType?: string
}
