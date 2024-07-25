import { FlowError } from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { kratos } from '@/auth/kratos'
import type { AxiosError } from '@/auth/types'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { loginUrl } from '@/components/pages/auth/utils'
import { useInstanceData } from '@/contexts/instance-context'
import { isProduction } from '@/helper/is-production'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { showToastNotice } from '@/helper/show-toast-notice'
import { triggerSentry } from '@/helper/trigger-sentry'

export default renderedPageNoHooks(() => (
  <FrontendClientBase noIndex>
    <Error />
  </FrontendClientBase>
))

function Error() {
  const [error, setError] = useState<FlowError>()
  const router = useRouter()
  const { id } = router.query

  const authStrings = useInstanceData().strings.auth

  useEffect(() => {
    if (!router.isReady || error) return

    kratos
      .getFlowError({ id: String(id) })
      .then(({ data }) => setError(data))
      .catch((err: AxiosError) => {
        // eslint-disable-next-line no-console
        console.error(err)
        triggerSentry({ message: 'Auth error', code: err.response?.status })

        switch (err.response?.status) {
          case 404: // The error id could not be found.
          case 403: // The error id could not be fetched due to e.g. a CSRF issue.
          case 410: // The error id expired.
            void router.push('/') // Let's just redirect home!
            return Promise.reject(err)
        }

        return Promise.reject(err)
      })
  }, [id, router, router.isReady, error])

  if (
    hasFlowErrorFieldError(error) &&
    error.error.message.includes('ERR_BAD_ROLE')
  ) {
    showToastNotice(authStrings.badRole, 'warning', 5000)
    return router.push(loginUrl)
  }

  if (isProduction) {
    triggerSentry({ message: 'Auth error in error flow', data: error })
    showToastNotice(authStrings.somethingWrong, 'warning', 5000)
    return router.push(loginUrl)
  }

  return error ? <pre>{JSON.stringify(error, null, 2)}</pre> : null
}

interface FlowErrorWithErrorField extends FlowError {
  error: {
    code: number
    message: string
    status: string
  }
}

function hasFlowErrorFieldError(
  error: FlowError | undefined
): error is FlowErrorWithErrorField {
  return !!error?.error && Object.hasOwn(error.error, 'message')
}
