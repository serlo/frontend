import { Configuration as KratosConfig, V0alpha2Api } from '@ory/client'

import { frontendOrigin } from '../helper/urls/frontent-origin'

export const kratos = new V0alpha2Api(
  new KratosConfig({
    basePath: `${frontendOrigin}/api/.ory`,
  })
)
