import { useEffect } from 'react'
import Notification from 'react-notify-toast'

import { MaintenanceBanner } from './maintenance-banner'
import { useInstanceData } from '@/contexts/instance-context'

export function ToastNotice() {
  const { strings } = useInstanceData()

  useEffect(() => {
    if (document.referrer.includes('/taxonomy/term/organize/')) {
      setTimeout(() => {
        window.location.reload()
      }, 200)
    }
  }, [strings.loading.oneMomentPlease])

  return (
    <>
      <MaintenanceBanner />
      <Notification />
    </>
  )
}
