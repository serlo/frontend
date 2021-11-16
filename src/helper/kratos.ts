import { Configuration, V0alpha2Api } from '@ory/kratos-client'

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
  new Configuration({
    basePath: `/api/.ory`,
  })
)
