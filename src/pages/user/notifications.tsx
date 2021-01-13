import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeaderFooter } from '@/components/header-footer'
import { Notifications } from '@/components/pages/user/notifications'

export default function Page() {
  return (
    <FrontendClientBase>
      <HeaderFooter>
        <Notifications />
      </HeaderFooter>
    </FrontendClientBase>
  )
}
