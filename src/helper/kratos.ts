import { Configuration as KratosConfig, V0alpha2Api } from '@ory/client'

import { frontendOrigin } from './urls/frontent-origin'

export const kratos = new V0alpha2Api(
  new KratosConfig({
    basePath: `${frontendOrigin}/api/.ory`,
    // // TODO: remove staging check when done with testing
    // basePath:
    //   process.env.NEXT_PUBLIC_ENV === 'staging'
    //     ? 'https://kratos-vercel.serlo-staging.dev/api/.ory'
    //     : `${frontendOrigin}/api/.ory`,
  })
)

// Kratos SDK uses AxiosError, but in order to not have to import the axios lib
// just for the this error, we kind of imitate it here
export class KratosError<T = unknown> extends Error {
  code?: string
  request?: any
  response?: {
    data: T
    status: number
    statusText: string
    headers: Record<string, string> & {
      'set-cookie'?: string[]
    }
    request?: any
  }
  status?: string
}
