import { useEffect } from 'react'
import Notification from 'react-notify-toast'

import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'

export function ToastNotice() {
  const auth = useAuthentication()
  const { strings } = useInstanceData()

  function removeHash() {
    history.replaceState(
      null,
      document.title,
      window.location.pathname + window.location.search
    )
  }

  const showTime = 4000

  useEffect(() => {
    if (window.location.hash === '#auth') {
      setTimeout(removeHash, 3000)
      showToastNotice(
        auth.current
          ? strings.notices.welcome.replace('%username%', auth.current.username)
          : strings.notices.bye,
        'default',
        showTime
      )
      if (!auth.current) {
        // quick fix: force legacy logout
        fetch('/auth/logout', { credentials: 'same-origin' }).catch(() => {})
      }
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
        window.location.hash = '#flush-legacy'
        window.location.reload()
      }, 1000)
    }

    if (window.location.hash == '#flush-legacy') {
      // fetch a legacy page to flush flash messages - then reload page
      fetch('/auth/password/change')
        .then((res) => res.text())
        .then(() => {
          removeHash()
        })
        .catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Notification />
}
