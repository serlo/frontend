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
  const showTime = 4000

  function removeHash() {
    history.replaceState(null, '', window.location.href.split('#')[0])
  }

  function showToast(text: string) {
    notify.show(text, 'custom', showTime, notifyColor)
  }

  React.useEffect(() => {
    if (window.location.hash === '#auth') {
      removeHash()
      showToast(
        auth.current
          ? `👋 Willkommen ${auth.current.username}!`
          : `👋 Bis bald!`
      )
    }

    //Temporary helpers until we use mutations and or implement edtr into the frontend directly
    if (window.location.hash.startsWith('#revision-')) {
      const getText = function () {
        switch (window.location.hash) {
          case '#revision-saved':
            return 'Revision is saved and will be reviewed soon'
          case '#revision-accepted':
            return 'Revision was successfully accepted'
          case '#revision-rejected':
            return 'Revision was successfully rejected'
          case '#revision-saved-accepted':
            return 'Revision was successfully saved and accepted'
        }
        return 'Are aliens real?'
      }
      showToast(getText())
      removeHash()
    }
  })

  return <Notification />
}
