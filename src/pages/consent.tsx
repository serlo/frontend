import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeaderFooter } from '@/components/header-footer'
import { RelativeContainer } from '@/components/navigation/relative-container'
import { ConsentPage } from '@/components/pages/consent-page'

export default function Page() {
  return (
    <FrontendClientBase>
      <RelativeContainer>
        <HeaderFooter>
          <ConsentPage />
        </HeaderFooter>
      </RelativeContainer>
    </FrontendClientBase>
  )
}
