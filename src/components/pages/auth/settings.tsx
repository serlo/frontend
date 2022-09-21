import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import {
  SelfServiceSettingsFlow,
  SubmitSelfServiceSettingsFlowBody,
} from '@ory/client'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { AuthSessionCookie } from '@/auth/auth-session-cookie'
import { useAuthentication } from '@/auth/use-authentication'
import { Flow, FlowType, handleFlowError } from '@/components/auth/flow'
import { PageTitle } from '@/components/content/page-title'
import { FaIcon } from '@/components/fa-icon'
import { kratos } from '@/helper/kratos'

export function Settings() {
  const [flow, setFlow] = useState<SelfServiceSettingsFlow>()
  const router = useRouter()

  // The idea is to show to the user that they are logged it,
  // because auth-session cookie is used to initialize auth.current
  // but it is only working after refresh
  async function setAuthSessionCookie() {
    await kratos
      .toSession()
      .then(({ data }) => {
        AuthSessionCookie.set(data)
      })
      .catch(() => {
        // user is most likely just not logged in
        AuthSessionCookie.remove()
      })
  }

  void setAuthSessionCookie()

  useAuthentication()

  const { flow: flowId, return_to: returnTo } = router.query

  useEffect(() => {
    if (!router.isReady || flow) return

    if (flowId) {
      kratos
        .getSelfServiceSettingsFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data)
        })
        .catch(handleFlowError(router, FlowType.settings, setFlow))
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
          .then(({ data }) => {
            setFlow(data)
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
