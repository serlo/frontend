import React from 'react'

import { PageBaseDefault } from '@/components/page-base-default'
import { ProfileRedirectMe } from '@/components/pages/user/profile-redirect-me'

export default function Page() {
  return (
    <PageBaseDefault>
      <ProfileRedirectMe />
    </PageBaseDefault>
  )
}
