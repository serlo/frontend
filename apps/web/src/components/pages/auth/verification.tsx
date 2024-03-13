import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import {
  type VerificationFlow,
  VerificationFlowState,
  type UpdateVerificationFlowBody,
} from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { loginUrl } from './utils'
import { kratos } from '@/auth/kratos'
import { useAuthentication } from '@/auth/use-authentication'
import { useCheckInstance } from '@/auth/use-check-instance'
import { Flow, handleFlowError } from '@/components/auth/flow'
import { FlowType } from '@/components/auth/flow-type'
import { PageTitle } from '@/components/content/page-title'
import { InfoPanel } from '@/components/info-panel'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'

export function Verification() {
  const [flow, setFlow] = useState<VerificationFlow>()
  const { strings } = useInstanceData()
  const router = useRouter()
  const auth = useAuthentication()
  const checkInstance = useCheckInstance()
  const { flow: flowId, return_to: returnTo } = router.query

  const emailVerifiedSuccessfully = strings.auth.messages.code1080002
  const verifyStrings = strings.auth.verify

  useEffect(() => {
    checkInstance({ redirect: true })

    if (!router.isReady || flow) return

    const flowHandler = async ({ data }: { data: VerificationFlow }) => {
      setFlow(data)
      if (data.state === VerificationFlowState.PassedChallenge) {
        showToastNotice(emailVerifiedSuccessfully, 'success')
        return await router.push(returnTo ? String(returnTo) : loginUrl)
      }
    }

    if (flowId) {
      kratos
        .getVerificationFlow({ id: String(flowId) })
        .then(flowHandler)
        .catch(handleFlowError(router, FlowType.verification, setFlow, strings))
      return
    }

    kratos
      .createBrowserVerificationFlow()
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
    checkInstance,
  ])

  const onSubmit = async (values: UpdateVerificationFlowBody) => {
    return kratos
      .updateVerificationFlow({
        flow: String(flow?.id),
        updateVerificationFlowBody: values,
      })
      .then(({ data }) => setFlow(data))
      .catch(
        handleFlowError(router, FlowType.verification, setFlow, strings, true)
      )
  }

  return (
    <div className="mx-auto max-w-[30rem]">
      <PageTitle headTitle title={`${verifyStrings.title} ✅`} extraBold />

      {auth ? (
        <InfoPanel type="info" icon={faInfoCircle}>
          {verifyStrings.alreadyDone}
        </InfoPanel>
      ) : null}
      {flow ? (
        <>
          <p className="serlo-p">{verifyStrings.instructions}</p>
          <Flow
            onSubmit={onSubmit}
            flow={flow}
            flowType={FlowType.verification}
          />
        </>
      ) : (
        <LoadingSpinner noText />
      )}
    </div>
  )
}
