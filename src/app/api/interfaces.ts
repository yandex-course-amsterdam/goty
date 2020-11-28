export interface Options {
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

export interface ApiResponse {
  response: string
  status: number
}

export interface ApiInterface {
  request(options: Options, timeout: number): Promise<ApiResponse>
  get(path: string): Promise<ApiResponse>
  post(path: string, body: string): Promise<ApiResponse>
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
  ): Promise<ApiResponse>
  delete(path: string, body: string, contentType: string): Promise<ApiResponse>
}

export interface UsersApiInterface {
  updateProfile(body: string): Promise<ApiResponse>
  updatePass(body: string): Promise<ApiResponse>
  updateAvatar(body: FormData): Promise<ApiResponse>
}
