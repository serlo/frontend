import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { ConsentPage } from '@/components/pages/consent-page'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <ConsentPage />
  </FrontendClientBase>
))
