import { Configuration, FrontendApi } from '@ory/client'

const config = new Configuration({
  basePath: '/api/.ory',
})

export const kratos = new FrontendApi(config)
