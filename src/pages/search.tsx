import React from 'react'

import {
  FrontendClientBase,
  IdContext,
} from '@/components/frontend-client-base'
import { HeaderFooter } from '@/components/header-footer'
import { Search } from '@/components/pages/search'

export default function Page() {
  return (
    <FrontendClientBase>
      <IdContext.Provider value={-2}>
        <HeaderFooter onSearchPage>
          <Search />
        </HeaderFooter>
      </IdContext.Provider>
    </FrontendClientBase>
  )
}
