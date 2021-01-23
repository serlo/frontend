import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { Search } from '@/components/pages/search'

export default function Page() {
  return (
    <FrontendClientBase>
      <Search />
    </FrontendClientBase>
  )
}
