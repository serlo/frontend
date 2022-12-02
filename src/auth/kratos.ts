import { Configuration as KratosConfig, V0alpha2Api } from '@ory/client'

export const kratos = new V0alpha2Api(
  new KratosConfig({ basePath: `/api/.ory` })
)
