import { FlowError } from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { kratos } from '@/auth/kratos'
import type { AxiosError } from '@/auth/types'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { triggerSentry } from '@/helper/trigger-sentry'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Error />
  </FrontendClientBase>
))

function Error() {
  const [error, setError] = useState<FlowError | string>()
  const router = useRouter()
  const { id } = router.query

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

  return error ? <pre>{JSON.stringify(error, null, 2)}</pre> : null
}
