import {
  SelfServiceVerificationFlow,
  SubmitSelfServiceVerificationFlowBody,
} from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { kratos } from '@/auth/kratos'
import { Flow, FlowType, handleFlowError } from '@/components/auth/flow'
import { PageTitle } from '@/components/content/page-title'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'

export function Verification() {
  const [flow, setFlow] = useState<SelfServiceVerificationFlow>()
  const { strings } = useInstanceData()
  const router = useRouter()
  const { flow: flowId, return_to: returnTo } = router.query

  const emailVerifiedSuccessfully = strings.auth.messages[1080002]

  useEffect(() => {
    if (!router.isReady || flow) {
      return
    }

    const flowHandler = async ({
      data,
    }: {
      data: SelfServiceVerificationFlow
    }) => {
      setFlow(data)
      if (data.state === 'passed_challenge') {
        showToastNotice(emailVerifiedSuccessfully, 'success')
        return await router.push(returnTo ? String(returnTo) : '/auth/login')
      }
    }

    if (flowId) {
      kratos
        .getSelfServiceVerificationFlow(String(flowId))
        .then(flowHandler)
        .catch(handleFlowError(router, FlowType.verification, setFlow, strings))
      return
    }

    kratos
      .initializeSelfServiceVerificationFlowForBrowsers()
      .then(flowHandler)
      .catch(handleFlowError(router, FlowType.verification, setFlow, strings))
  }, [
    flowId,
    router.isReady,
    returnTo,
    flow,
    router,
    strings,
    emailVerifiedSuccessfully,
  ])

  const onSubmit = (values: SubmitSelfServiceVerificationFlowBody) => {
    return router
      .push(`${router.pathname}?flow=${String(flow?.id)}`, undefined, {
        shallow: true,
      })
      .then(() =>
        kratos
          .submitSelfServiceVerificationFlow(
            String(flow?.id),
            values,
            undefined
          )
          .then(({ data }) => setFlow(data))
          .catch(
            handleFlowError(
              router,
              FlowType.verification,
              setFlow,
              strings,
              true
            )
          )
      )
  }

  return flow ? (
    <>
      <PageTitle headTitle title={strings.auth.verifyTitle} />
      <Flow onSubmit={onSubmit} flow={flow} />
    </>
  ) : null
}
