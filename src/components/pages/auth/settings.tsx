import {
  SelfServiceSettingsFlow,
  SubmitSelfServiceSettingsFlowBody,
} from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { fetchAndPersistAuthSession } from '@/auth/fetch-auth-session'
import { kratos } from '@/auth/kratos'
import { useAuth } from '@/auth/use-auth'
import { Flow, FlowType, handleFlowError } from '@/components/auth/flow'
import { PageTitle } from '@/components/content/page-title'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'

export function Settings() {
  const [flow, setFlow] = useState<SelfServiceSettingsFlow>()
  const router = useRouter()
  const { refreshAuth } = useAuth()
  const { strings } = useInstanceData()

  useEffect(() => {
    // quick hack to fix non authed header state
    void fetchAndPersistAuthSession(refreshAuth).then(() => {
      const { href } = window.location
      if (href.includes('flow=') && !href.includes('#refreshed')) {
        window.location.href = window.location.href + '#refreshed'
        window.location.reload()
      }
    })
  }, [refreshAuth])

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
      .catch(handleFlowError(router, FlowType.settings, setFlow, strings))
  }, [flowId, router, router.isReady, returnTo, flow, strings])

  return (
    <div className="max-w-[30rem] mx-auto">
      <PageTitle
        headTitle
        title={`${strings.auth.settings.title} ✨`}
        extraBold
      />

      <p className="serlo-p">{strings.auth.settings.instruction}</p>

      {flow ? (
        <Flow
          // hideGlobalMessages
          onSubmit={onSubmit}
          only="password"
          flow={flow}
        />
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

  function onSubmit(values: SubmitSelfServiceSettingsFlowBody) {
    if (!flow) return Promise.reject()
    return router
      .push(`/auth/settings?flow=${flow.id}`, undefined, { shallow: true })
      .then(() =>
        kratos
          .submitSelfServiceSettingsFlow(String(flow.id), values)
          .then(({ data }) => setFlow(data))
          .catch(handleFlowError(router, FlowType.settings, setFlow, strings))
      )
  }
}
