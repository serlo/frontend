import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle'
import {
  SelfServiceVerificationFlow,
  SelfServiceVerificationFlowState,
  SubmitSelfServiceVerificationFlowBody,
} from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { loginUrl } from './utils'
import { kratos } from '@/auth/kratos'
import { useAuthentication } from '@/auth/use-authentication'
import { useCheckInstance } from '@/auth/use-check-instance'
import { Flow, FlowType, handleFlowError } from '@/components/auth/flow'
import { PageTitle } from '@/components/content/page-title'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { StaticInfoPanel } from '@/components/static-info-panel'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'

export function Verification() {
  const [flow, setFlow] = useState<SelfServiceVerificationFlow>()
  const { strings } = useInstanceData()
  const router = useRouter()
  const auth = useAuthentication()
  const checkInstance = useCheckInstance()
  const { flow: flowId, return_to: returnTo } = router.query

  const emailVerifiedSuccessfully = strings.auth.messages.code1080002
  const verifyStrings = strings.auth.verify

  useEffect(() => {
    checkInstance({ redirect: true })

    if (!router.isReady || flow) {
      return
    }

    const flowHandler = async ({
      data,
    }: {
      data: SelfServiceVerificationFlow
    }) => {
      setFlow(data)
      if (data.state === SelfServiceVerificationFlowState.PassedChallenge) {
        showToastNotice(emailVerifiedSuccessfully, 'success')
        return await router.push(returnTo ? String(returnTo) : loginUrl)
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
    checkInstance,
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

  return (
    <div className="max-w-[30rem] mx-auto">
      <PageTitle headTitle title={`${verifyStrings.title} ✅`} extraBold />

      {auth ? (
        <StaticInfoPanel type="info" icon={faInfoCircle}>
          {verifyStrings.alreadyDone}
        </StaticInfoPanel>
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
      <style jsx>{`
        @font-face {
          font-family: 'Karmilla';
          font-style: bolder;
          font-weight: 800;
          src: url('/_assets/fonts/karmilla/karmilla-bolder.woff2')
              format('woff2'),
            url('/_assets/fonts/karmilla/karmilla-bold.woff') format('woff');
          font-display: swap;
        }
      `}</style>
    </div>
  )
}
