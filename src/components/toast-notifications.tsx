import React from 'react'
import Notification, { notify } from 'react-notify-toast'

import { useAuth } from '@/auth/use-auth'
import { theme } from '@/theme'

export function ToastNotifications() {
  const auth = useAuth()

  const notifyColor = {
    background: theme.colors.brand,
    text: '#fff',
  }
  // const queue = notify.createShowQueue()
  const showTime = 2000

  React.useEffect(() => {
    if (window.location.hash === '#auth') {
      //leave no trace
      history.pushState(null, '', window.location.href.split('#')[0])
      const toastText = auth
        ? `👋 Willkommen ${auth.username}!`
        : `👋 Bis bald!`
      notify.show(toastText, 'custom', showTime, notifyColor)
    }
  })

  return <Notification />
}
