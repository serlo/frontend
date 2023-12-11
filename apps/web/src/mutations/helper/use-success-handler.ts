import { useRouter } from 'next/router'
import NProgress from 'nprogress'

import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { loggedInData } from '@/data/en'
import { showToastNotice } from '@/helper/show-toast-notice'
import { successHash } from '@/helper/use-leave-confirm'

interface SuccessHandlerInput {
  success: boolean | number
  toastKey?: keyof typeof loggedInData.strings.mutations.success
  redirectUrl?: string
  timeout?: number
  useHardRedirect?: boolean
  delay?: number
  stopNProgress?: boolean
}
export function useSuccessHandler() {
  const loggedInData = useLoggedInData()
  const router = useRouter()

  function successHandler({
    success,
    toastKey,
    redirectUrl,
    timeout,
    useHardRedirect,
    delay,
    stopNProgress,
  }: SuccessHandlerInput): boolean {
    if (!loggedInData) return false
    const successStrings = loggedInData.strings.mutations.success
    if (!success) return false

    setTimeout(
      () => {
        if (toastKey) showToastNotice(successStrings[toastKey], 'success')

        if (redirectUrl) {
          if (useHardRedirect) window.location.href = redirectUrl
          else {
            setTimeout(
              () => router.push(redirectUrl + successHash),
              timeout ? timeout : 500
            )
          }
        }

        if (stopNProgress) NProgress.done()
      },
      delay ? delay : 0
    )
    return true
  }

  return successHandler
}
