import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { ConsentPage } from '@/components/pages/consent-page'

export default function Page() {
  return (
    <FrontendClientBase>
      <ConsentPage />
    </FrontendClientBase>
  )
}
