import React from 'react'

import { PageBaseDefault } from '@/components/page-base-default'
import { ManageSubscriptions } from '@/components/pages/manage-subscriptions'

export default function Page() {
  return (
    <PageBaseDefault>
      <ManageSubscriptions />
    </PageBaseDefault>
  )
}
