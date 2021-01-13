import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeaderFooter } from '@/components/header-footer'
import { ProfileRedirectMe } from '@/components/pages/user/profile-redirect-me'

export default function Page() {
  return (
    <FrontendClientBase>
      <HeaderFooter>
        <ProfileRedirectMe />
      </HeaderFooter>
    </FrontendClientBase>
  )
}
