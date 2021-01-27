import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { Donations } from '@/components/pages/donations'
import { PageWithWrapper } from '@/data-types'

export default function Page() {
  return <Donations />
}

;(Page as typeof Page &
  // eslint-disable-next-line react/display-name
  PageWithWrapper).wrapper = (child) => {
  return (
    <FrontendClientBase noHeaderFooter noContainers>
      {child}
    </FrontendClientBase>
  )
}
