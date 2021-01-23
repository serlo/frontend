import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { Notifications } from '@/components/pages/user/notifications'

export default function Page() {
  return (
    <FrontendClientBase>
      <Notifications />
    </FrontendClientBase>
  )
}
