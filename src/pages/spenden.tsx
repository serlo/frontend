import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { Donations } from '@/components/pages/donations'

export default function Page() {
  return (
    <FrontendClientBase>
      <Donations />
    </FrontendClientBase>
  )
}
