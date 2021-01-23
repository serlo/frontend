import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { PageBaseDefault } from '@/components/page-base-default'
import { Notifications } from '@/components/pages/user/notifications'

export default function Page() {
  return (
    <FrontendClientBase>
      <PageBaseDefault>
        <Notifications />
      </PageBaseDefault>
    </FrontendClientBase>
  )
}
