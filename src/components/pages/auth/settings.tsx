import {
  SelfServiceSettingsFlow,
  SubmitSelfServiceSettingsFlowBody,
} from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { loginUrl, settingsUrl } from './utils'
import { kratos } from '@/auth/kratos'
import { useAuthentication } from '@/auth/use-authentication'
import { useCheckInstance } from '@/auth/use-check-instance'
import { Flow, FlowType, handleFlowError } from '@/components/auth/flow'
import { Messages } from '@/components/auth/messages'
import { PageTitle } from '@/components/content/page-title'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'

export function Settings() {
  const [flow, setFlow] = useState<SelfServiceSettingsFlow>()
  const router = useRouter()
  const checkInstance = useCheckInstance()
  const { strings } = useInstanceData()
  const auth = useAuthentication()

  useEffect(() => {
    if (!auth) window.location.href = loginUrl
    checkInstance({ redirect: true })
  }, [auth, checkInstance])

  const { flow: flowId, return_to: returnTo } = router.query

  useEffect(() => {
    if (!router.isReady || flow) return

    if (flowId) {
      kratos
        .getSelfServiceSettingsFlow(String(flowId))
        .then(({ data }) => setFlow(data))
        .catch(handleFlowError(router, FlowType.settings, setFlow, strings))
      return
    }

    kratos
      .initializeSelfServiceSettingsFlowForBrowsers(
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => setFlow(data))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  }, [flowId, router, router.isReady, returnTo, flow, strings, checkInstance])

  const loading = !flow
  const isSuccess = flow && flow.state === 'success'
  const isForm = flow && flow.state === 'show_form'

  return (
    <div className="max-w-[30rem] mx-auto">
      <PageTitle
        headTitle
        title={`${strings.auth.settings.title} ✨`}
        extraBold
      />
      {loading ? <LoadingSpinner noText /> : null}
      {isSuccess ? <Messages messages={flow.ui.messages} /> : null}
      {isForm ? (
        <div className={isSuccess ? 'hidden' : undefined}>
          <p className="serlo-p">{strings.auth.settings.instruction}</p>
          <Flow
            // hideGlobalMessages
            onSubmit={onSubmit}
            only="password"
            flow={flow}
            flowType={FlowType.settings}
          />
        </div>
      ) : null}
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

  function onSubmit(values: SubmitSelfServiceSettingsFlowBody) {
    if (!flow) return Promise.reject()
    return router
      .push(`${settingsUrl}?flow=${flow.id}`, undefined, { shallow: true })
      .then(() =>
        kratos
          .submitSelfServiceSettingsFlow(String(flow.id), values)
          .then(({ data }) => setFlow(data))
          .catch(handleFlowError(router, FlowType.settings, setFlow, strings))
      )
  }
}
