import { Configuration as KratosConfig, V0alpha2Api } from '@ory/kratos-client'
import { AdminApi, Configuration as HydraConfig } from '@oryd/hydra-client'

import { frontendOrigin } from './urls/frontent-origin'

export const kratos = new V0alpha2Api(
  new KratosConfig({
    basePath: `${frontendOrigin}/api/.ory`,
  })
)

export const hydra = new AdminApi(
  new HydraConfig({
    basePath: 'http://localhost:4445', // TODO: use envvar
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
