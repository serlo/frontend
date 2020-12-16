import React from 'react'
import Notification, { notify } from 'react-notify-toast'

import { useAuth } from '@/auth/use-auth'
import { theme } from '@/theme'

export function ToastNotice() {
  const auth = useAuth()

  const notifyColor = {
    background: theme.colors.brand,
    text: '#fff',
  }
  const showTime = 2000

  React.useEffect(() => {
    if (window.location.hash === '#auth') {
      // Remove auth URI fragment
      history.replaceState(null, '', window.location.href.split('#')[0])
      const toastText = auth.current
        ? `👋 Willkommen ${auth.current.username}!`
        : `👋 Bis bald!`
      notify.show(toastText, 'custom', showTime, notifyColor)
    }
  })

  return <Notification />
}
