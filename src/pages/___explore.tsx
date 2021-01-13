import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeaderFooter } from '@/components/header-footer'
import { Explore } from '@/components/pages/explore'

export default function Page() {
  return (
    <FrontendClientBase>
      <HeaderFooter>
        <Explore />
      </HeaderFooter>
    </FrontendClientBase>
  )
}
