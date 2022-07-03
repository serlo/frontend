import {
  SelfServiceRegistrationFlow,
  SubmitSelfServiceRegistrationFlowBody,
} from '@ory/kratos-client'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Flow, handleFlowError } from '@/components/auth/flow'
import { kratos } from '@/helper/kratos'
import { serloDomain } from '@/helper/urls/serlo-domain'

// See https://github.com/ory/kratos-selfservice-ui-react-nextjs/blob/master/pages/registration.tsx

export function Registration() {
  const [flow, setFlow] = useState<SelfServiceRegistrationFlow>()
  const router = useRouter()

  const { return_to: returnTo, flow: flowId } = router.query

  useEffect(() => {
    if (!router.isReady || flow) {
      return
    }

    if (flowId) {
      kratos
        .getSelfServiceRegistrationFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data)
        })
        .catch(handleFlowError(router, 'registration', setFlow))
      return
    }

    kratos
      .initializeSelfServiceRegistrationFlowForBrowsers(
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data)
      })
      .catch(handleFlowError(router, 'registration', setFlow))
  }, [flowId, router, router.isReady, returnTo, flow])

  async function onSubmit(values: SubmitSelfServiceRegistrationFlowBody) {
    await router
      .push(`/registration?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        kratos
          .submitSelfServiceRegistrationFlow(String(flow?.id), values)
          .then(async ({ data }) => {
            const apiKratosEndpoint =
              process.env.NEXT_PUBLIC_ENV === 'local'
                ? 'http://localhost:3001/kratos'
                : `https://api.${serloDomain}/kratos`

            await fetch(`${apiKratosEndpoint}/register`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId: data.identity.id }),
              credentials: 'same-origin',
            })
            return router.push(flow?.return_to || '/').then(() => {})
          })
          .catch(handleFlowError(router, 'registration', setFlow))
          .catch((err: AxiosError) => {
            if (err.response?.status === 400) {
              setFlow(err.response?.data)
              return
            }

            return Promise.reject(err)
          })
      )
  }

  return <>{flow ? <Flow flow={flow} onSubmit={onSubmit} /> : null}</>
}
