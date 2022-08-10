import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import {
  SelfServiceSettingsFlow,
  SubmitSelfServiceSettingsFlowBody,
} from '@ory/client'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Flow, FlowType, handleFlowError } from '@/components/auth/flow'
import { PageTitle } from '@/components/content/page-title'
import { FaIcon } from '@/components/fa-icon'
import { kratos } from '@/helper/kratos'

// See https://github.com/ory/kratos-selfservice-ui-react-nextjs/blob/master/pages/settings.tsx

export function Settings() {
  const [flow, setFlow] = useState<SelfServiceSettingsFlow>()
  const router = useRouter()
  const { flow: flowId, return_to: returnTo } = router.query

  useEffect(() => {
    if (!router.isReady || flow) return

    if (flowId) {
      kratos
        .getSelfServiceSettingsFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data)
        })
        .catch(handleFlowError(router, FlowType.login, setFlow))
      return
    }

    kratos
      .initializeSelfServiceSettingsFlowForBrowsers(
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data)
      })
      .catch(handleFlowError(router, FlowType.settings, setFlow))
  }, [flowId, router, router.isReady, returnTo, flow])

  return (
    <>
      <PageTitle
        headTitle
        icon={<FaIcon icon={faUser} />}
        title="Profile Management and Security Settings"
      />

      <h2 className="serlo-h3">Change Password</h2>

      {flow ? (
        <Flow
          // hideGlobalMessages
          onSubmit={onSubmit}
          only="password"
          flow={flow}
        />
      ) : null}
    </>
  )

  function onSubmit(values: SubmitSelfServiceSettingsFlowBody) {
    if (!flow) return Promise.reject()
    return router
      .push(`/auth/settings?flow=${flow.id}`, undefined, { shallow: true })
      .then(() =>
        kratos
          .submitSelfServiceSettingsFlow(String(flow.id), values)
          .then(async ({ data }) => {
            // The settings have been saved and the flow was updated. Let's show it to the user!
            setFlow(data)
            await router.push('/api/auth/login')
          })
          .catch(handleFlowError(router, FlowType.settings, setFlow))
          .catch(async (err: AxiosError) => {
            if (err.response?.status === 400) {
              setFlow(err.response?.data as SelfServiceSettingsFlow)
              return Promise.reject()
            }
            return Promise.reject()
          })
      )
  }
}
