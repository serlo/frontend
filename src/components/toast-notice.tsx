import { useEffect } from 'react'
import Notification from 'react-notify-toast'

import { useAuth } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'

export function ToastNotice() {
  const auth = useAuth()
  const { strings } = useInstanceData()

  function removeHash() {
    history.replaceState(null, '', window.location.href.split('#')[0])
  }

  const showTime = 4000

  useEffect(() => {
    if (window.location.hash === '#auth') {
      removeHash()
      showToastNotice(
        auth.current
          ? strings.notices.welcome.replace('%username%', auth.current.username)
          : strings.notices.bye,
        'default',
        showTime
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
      showToastNotice(getText(), 'default', showTime)

      setTimeout(() => {
        window.location.hash = ''
        window.location.reload()
      }, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Notification />
}
