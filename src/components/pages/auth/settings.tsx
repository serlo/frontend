import {
  SelfServiceSettingsFlow,
  SubmitSelfServiceSettingsFlowBody,
} from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { settingsUrl } from './utils'
import { fetchAndPersistAuthSession } from '@/auth/cookie/fetch-and-persist-auth-session'
import { kratos } from '@/auth/kratos'
import { useCheckInstance } from '@/auth/use-check-instance'
import { Flow, FlowType, handleFlowError } from '@/components/auth/flow'
import { Messages } from '@/components/auth/messages'
import { PageTitle } from '@/components/content/page-title'
import { Guard } from '@/components/guard'
import { useInstanceData } from '@/contexts/instance-context'

export function Settings() {
  const [flow, setFlow] = useState<SelfServiceSettingsFlow>()
  const router = useRouter()
  const checkInstance = useCheckInstance()
  const { strings } = useInstanceData()

  useEffect(() => {
    checkInstance({ redirect: true })
    void fetchAndPersistAuthSession()
  }, [checkInstance])

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

  const isSuccess = flow && flow.state === 'success'
  const isForm = flow && flow.state === 'show_form'

  return (
    <div className="max-w-[30rem] mx-auto">
      <PageTitle
        headTitle
        title={`${strings.auth.settings.title} ✨`}
        extraBold
      />
      <Guard data={isForm || isSuccess} needsAuth>
        <>
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
        </>
      </Guard>
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
