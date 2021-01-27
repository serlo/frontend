import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { Donations } from '@/components/pages/donations'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase noHeaderFooter noContainers>
    <Donations />
  </FrontendClientBase>
))
