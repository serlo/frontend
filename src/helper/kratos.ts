import { Configuration as KratosConfig, V0alpha2Api } from '@ory/kratos-client'
import { AdminApi, Configuration as HydraConfig } from '@oryd/hydra-client'

import { frontendOrigin } from './urls/frontent-origin'

export const kratos = new V0alpha2Api(
  new KratosConfig({
    basePath:
      // TODO: remove staging check when done with testing
      process.env.NEXT_PUBLIC_ENV === 'staging'
        ? 'https://kratos-vercel.serlo-staging.dev/api/.ory'
        : `${frontendOrigin}/api/.ory`,
  })
)

export const hydra = new AdminApi(
  new HydraConfig({
    basePath:
      process.env.NEXT_PUBLIC_ENV === 'local'
        ? 'http://localhost:4445'
        : 'https://admin.hydra.serlo-staging.dev', // TODO: use envvar
    ...(process.env.MOCK_TLS_TERMINATION
      ? {
          baseOptions: {
            headers: process.env.MOCK_TLS_TERMINATION
              ? 'X-Forwarded-Proto'
              : 'https',
          },
        }
      : {}),
  })
)
