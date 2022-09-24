import { useEffect } from 'react'
import Notification from 'react-notify-toast'

import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'

export function ToastNotice() {
  const { strings } = useInstanceData()

  const showTime = 4000

  useEffect(() => {
    if (
      window.location.hash === '#profile-refresh' ||
      window.location.hash === '#reload'
    ) {
      showToastNotice(strings.loading.oneMomentPlease, 'default', showTime)

      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }

    if (document.referrer.includes('/taxonomy/term/organize/')) {
      setTimeout(() => {
        window.location.reload()
      }, 200)
    }
  }, [])

  return <Notification />
}
