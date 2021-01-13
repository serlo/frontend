import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeaderFooter } from '@/components/header-footer'
import { Search } from '@/components/pages/search'

export default function Page() {
  return (
    <FrontendClientBase>
      <HeaderFooter onSearchPage>
        <Search />
      </HeaderFooter>
    </FrontendClientBase>
  )
}
