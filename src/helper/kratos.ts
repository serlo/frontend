import { Configuration as KratosConfig, V0alpha2Api } from '@ory/kratos-client'
import { AdminApi, Configuration as HydraConfig } from '@oryd/hydra-client'
// export const kratos = new V0alpha2Api(
//   new Configuration({
//     basePath: 'https://kratos.serlo-staging.dev',
//     baseOptions: {
//       // Ensure we send credentials over CORS
//       withCredentials: true,
//     },
//   })
// )
// CORS didn't work with that, though. Need to fix that somehow maybe?
// Top fails because of missing Cookies

export const kratos = new V0alpha2Api(
  new KratosConfig({
    basePath: `/api/.ory`,
  })
)

export const hydra = new AdminApi(
  new HydraConfig({
    basePath: 'http://localhost:4445',
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
