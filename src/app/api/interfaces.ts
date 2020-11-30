export interface IOptions {
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

export interface IApiResponse {
  response: string
  status: number
}

export interface IApi {
  request(options: IOptions, timeout: number): Promise<IApiResponse>
  get(path: string): Promise<IApiResponse>
  post(path: string, body: string): Promise<IApiResponse>
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
  ): Promise<IApiResponse>
  delete(path: string, body: string, contentType: string): Promise<IApiResponse>
}

export interface IUserApi {
  updateProfile(body: string): Promise<IApiResponse>
  updatePass(body: string): Promise<IApiResponse>
  updateAvatar(body: FormData): Promise<IApiResponse>
}
