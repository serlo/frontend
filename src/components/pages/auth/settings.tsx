import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import {
  SelfServiceSettingsFlow,
  SubmitSelfServiceSettingsFlowBody,
} from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { fetchAndPersistAuthSession } from '@/auth/fetch-auth-session'
import { kratos } from '@/auth/kratos'
import { Flow, FlowType, handleFlowError } from '@/components/auth/flow'
import { PageTitle } from '@/components/content/page-title'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'

export function Settings() {
  const [flow, setFlow] = useState<SelfServiceSettingsFlow>()
  const router = useRouter()
  const { strings } = useInstanceData()

  useEffect(() => {
    // quick hack to fix non authed header state
    void fetchAndPersistAuthSession().then(() => {
      const { href } = window.location
      if (href.includes('flow=') && !href.includes('#refreshed')) {
        window.location.href = window.location.href + '#refreshed'
        window.location.reload()
      }
    })
  }, [])

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
    <div className="max-w-md mx-auto">
      <PageTitle headTitle title={`${strings.auth.settings.title} ✨`} />

      <p className="serlo-p">{strings.auth.settings.instruction}</p>

      {flow ? (
        <Flow
          // hideGlobalMessages
          onSubmit={onSubmit}
          only="password"
          flow={flow}
        />
      ) : null}
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
