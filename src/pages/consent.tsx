import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { PageBaseDefault } from '@/components/page-base-default'
import { ConsentPage } from '@/components/pages/consent-page'

export default function Page() {
  return (
    <FrontendClientBase>
      <PageBaseDefault>
        <ConsentPage />
      </PageBaseDefault>
    </FrontendClientBase>
  )
}
