import React from 'react'
import Notification, { notify } from 'react-notify-toast'

import { useAuth } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import { theme } from '@/theme'

export function ToastNotice() {
  const auth = useAuth()
  const { strings } = useInstanceData()

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
          ? strings.notices.welcome.replace('%username%', auth.current.username)
          : strings.notices.bye
      )
    }

    //Temporary helpers until we use mutations and or implement edtr into the frontend directly
    if (window.location.hash.startsWith('#revision-')) {
      const getText = function () {
        switch (window.location.hash) {
          case '#revision-saved':
            return strings.notices.revisionSaved
          case '#revision-accepted':
            return strings.notices.revisionAccepted
          case '#revision-rejected':
            return strings.notices.revisionRejected
          case '#revision-saved-accepted':
            return strings.notices.revisionSavedAccepted
        }
        return 'Are aliens real?'
      }
      showToast(getText())
      setTimeout(() => {
        window.location.hash = ''
        window.location.reload()
      }, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Notification />
}
