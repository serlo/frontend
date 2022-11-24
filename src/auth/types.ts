// from 'axios'

export type AxiosResponseHeaders = Record<string, string> & {
  'set-cookie'?: string[]
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: AxiosResponseHeaders
  config: unknown
  request?: any
}

export interface AxiosError<T = unknown> extends Error {
  config: unknown
  code?: string
  request?: any
  response?: AxiosResponse<T>
  isAxiosError: boolean
  status?: string
  toJSON: () => object
  ERR_FR_TOO_MANY_REDIRECTS: 'ERR_FR_TOO_MANY_REDIRECTS'
  ERR_BAD_OPTION_VALUE: 'ERR_BAD_OPTION_VALUE'
  ERR_BAD_OPTION: 'ERR_BAD_OPTION'
  ERR_NETWORK: 'ERR_NETWORK'
  ERR_DEPRECATED: 'ERR_DEPRECATED'
  ERR_BAD_RESPONSE: 'ERR_BAD_RESPONSE'
  ERR_BAD_REQUEST: 'ERR_BAD_REQUEST'
  ERR_CANCELED: 'ERR_CANCELED'
  ECONNABORTED: 'ECONNABORTED'
  ETIMEDOUT: 'ETIMEDOUT'
}
