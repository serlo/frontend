import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { ProfileRedirectMe } from '@/components/pages/user/profile-redirect-me'

export default function Page() {
  return (
    <FrontendClientBase>
      <ProfileRedirectMe />
    </FrontendClientBase>
  )
}
