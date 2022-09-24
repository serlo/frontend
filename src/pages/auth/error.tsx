import { SelfServiceError } from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { kratos } from '@/auth/kratos'
import type { AxiosError } from '@/auth/types'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Error />
  </FrontendClientBase>
))

function Error() {
  const [error, setError] = useState<SelfServiceError | string>()

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!router.isReady || error) {
      return
    }

    kratos
      .getSelfServiceError(String(id))
      .then(({ data }) => {
        setError(data)
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
            // The error id could not be found. Let's just redirect home!
            return router.push('/')
          case 403:
            // The error id could not be fetched due to e.g. a CSRF issue. Let's just redirect home!
            return router.push('/')
          case 410:
            // The error id expired. Let's just redirect home!
            return router.push('/')
        }

        return Promise.reject(err)
      })
  }, [id, router, router.isReady, error])

  if (!error) {
    return null
  }

  return (
    <>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </>
  )
}
