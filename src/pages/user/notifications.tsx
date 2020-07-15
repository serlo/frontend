import { NextPage } from 'next'
import React from 'react'

import { NotificationsList } from '@/components/notifications/notifications-list'
import { shouldUseNewAuth } from '@/helper/feature-auth'

const Notifications: NextPage = () => {
  const [mounted, setMounted] = React.useState(!shouldUseNewAuth())
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? <NotificationsList /> : null
}

export default Notifications
