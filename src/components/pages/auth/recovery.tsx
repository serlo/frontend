import {
  SelfServiceRecoveryFlow,
  SubmitSelfServiceRecoveryFlowBody,
} from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Flow, FlowType, handleFlowError } from '@/components/auth/flow'
import { PageTitle } from '@/components/content/page-title'
import { useInstanceData } from '@/contexts/instance-context'
import { kratos, KratosError } from '@/helper/kratos'

export function Recovery() {
  const [flow, setFlow] = useState<SelfServiceRecoveryFlow>()
  const { strings } = useInstanceData()
  const router = useRouter()
  const { flow: flowId, return_to: returnTo } = router.query

  useEffect(() => {
    if (!router.isReady || flow) {
      return
    }

    if (flowId) {
      kratos
        .getSelfServiceRecoveryFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data)
        })
        .catch(handleFlowError(router, FlowType.recovery, setFlow))
      return
    }

    kratos
      .initializeSelfServiceRecoveryFlowForBrowsers()
      .then(({ data }) => {
        setFlow(data)
      })
      .catch(handleFlowError(router, FlowType.recovery, setFlow))
      .catch((err: KratosError) => {
        // If the previous handler did not catch the error it's most likely a form validation error
        if (err.response?.status === 400) {
          setFlow(err.response?.data as SelfServiceRecoveryFlow)
          return
        }

        return Promise.reject(err)
      })
  }, [flowId, router, router.isReady, returnTo, flow])

  const onSubmit = (values: SubmitSelfServiceRecoveryFlowBody) => {
    return router
      .push(`${router.pathname}?flow=${String(flow?.id)}`, undefined, {
        shallow: true,
      })
      .then(() =>
        kratos
          .submitSelfServiceRecoveryFlow(String(flow?.id), values)
          .then(({ data }) => {
            setFlow(data)
          })
          .catch(handleFlowError(router, FlowType.recovery, setFlow))
          .catch((err: KratosError) => {
            switch (err.response?.status) {
              case 400:
                // Status code 400 implies the form validation had an error
                setFlow(err.response?.data as SelfServiceRecoveryFlow)
                return
            }

            throw err
          })
      )
  }
  if (!flow) return null
  return (
    <>
      <PageTitle headTitle title={strings.auth.recoverTitle} />
      <Flow onSubmit={onSubmit} flow={flow} />
    </>
  )
}
