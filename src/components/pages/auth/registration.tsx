import {
  SelfServiceRegistrationFlow,
  SubmitSelfServiceRegistrationFlowBody,
} from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Flow, FlowType, handleFlowError } from '@/components/auth/flow'
import { PageTitle } from '@/components/content/page-title'
import { useInstanceData } from '@/contexts/instance-context'
import { kratos, KratosError } from '@/helper/kratos'

export function Registration() {
  const [flow, setFlow] = useState<SelfServiceRegistrationFlow>()
  const router = useRouter()
  const { lang, strings } = useInstanceData()
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
        .catch(handleFlowError(router, FlowType.registration, setFlow))
      return
    }

    kratos
      .initializeSelfServiceRegistrationFlowForBrowsers(
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data)
      })
      .catch(handleFlowError(router, FlowType.registration, setFlow))
  }, [flowId, router, router.isReady, returnTo, flow])

  async function onSubmit(values: SubmitSelfServiceRegistrationFlowBody) {
    const valuesWithLanguage = { ...values, 'traits.language': lang }

    await router
      .push(`${router.pathname}?flow=${String(flow?.id)}`, undefined, {
        shallow: true,
      })
      .then(() =>
        kratos
          .submitSelfServiceRegistrationFlow(
            String(flow?.id),
            valuesWithLanguage
          )
          .then(async () => {
            return await router
              .push(flow?.return_to || '/auth/login-check')
              .then(() => {})
          })
          .catch(handleFlowError(router, FlowType.registration, setFlow))
          .catch((err: KratosError) => {
            if (err.response?.status === 400) {
              setFlow(err.response?.data as SelfServiceRegistrationFlow)
              return
            }

            return Promise.reject(err)
          })
      )
  }

  return (
    <>
      <PageTitle headTitle title={strings.auth.registerTitle} />
      {flow ? <Flow flow={flow} onSubmit={onSubmit} /> : null}
    </>
  )
}
