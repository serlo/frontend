import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { PageBaseDefault } from '@/components/page-base-default'
import { ProfileRedirectMe } from '@/components/pages/user/profile-redirect-me'

export default function Page() {
  return (
    <FrontendClientBase>
      <PageBaseDefault>
        <ProfileRedirectMe />
      </PageBaseDefault>
    </FrontendClientBase>
  )
}
