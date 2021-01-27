import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { Search } from '@/components/pages/search'
import { PageWithWrapper } from '@/data-types'

export default function Page() {
  return (
    <FrontendClientBase>
      <Search />
    </FrontendClientBase>
  )
}

;(Page as typeof Page &
  // eslint-disable-next-line react/display-name
  PageWithWrapper).wrapper = (child) => {
  return <FrontendClientBase>{child}</FrontendClientBase>
}
