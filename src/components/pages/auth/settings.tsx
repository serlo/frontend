import type { SettingsFlow, UpdateSettingsFlowBody } from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { fetchAndPersistAuthSession } from '@/auth/cookie/fetch-and-persist-auth-session'
import { kratos } from '@/auth/kratos'
import { useAuth } from '@/auth/use-auth'
import { useCheckInstance } from '@/auth/use-check-instance'
import { Flow, handleFlowError } from '@/components/auth/flow'
import { FlowType } from '@/components/auth/flow-type'
import { Messages } from '@/components/auth/messages'
import { PageTitle } from '@/components/content/page-title'
import { Guard } from '@/components/guard'
import { useInstanceData } from '@/contexts/instance-context'

export function Settings() {
  const [flow, setFlow] = useState<SettingsFlow>()
  const router = useRouter()
  const checkInstance = useCheckInstance()
  const { strings } = useInstanceData()
  const { refreshAuth } = useAuth()

  useEffect(() => {
    checkInstance({ redirect: true })
  }, [checkInstance])

  const { flow: flowId, return_to: returnTo } = router.query

  useEffect(() => {
    if (!router.isReady || flow) return

    if (flowId) {
      kratos
        .getSettingsFlow({ id: String(flowId) })
        .then(({ data }) => {
          setFlow(data)
          void fetchAndPersistAuthSession(refreshAuth, {
            ...data,
            active: undefined,
          })
        })
        .catch(handleFlowError(router, FlowType.settings, setFlow, strings))
      return
    }

    kratos
      .createBrowserSettingsFlow({
        returnTo: returnTo ? String(returnTo) : undefined,
      })
      .then(({ data }) => setFlow(data))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  }, [
    flowId,
    router,
    router.isReady,
    returnTo,
    flow,
    strings,
    checkInstance,
    refreshAuth,
  ])

  const isSuccess = flow && flow.state === 'success'
  const isForm = flow && flow.state === 'show_form'

  return (
    <div className="mx-auto max-w-[30rem]">
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
    </div>
  )

  async function onSubmit(values: UpdateSettingsFlowBody) {
    if (!flow) return Promise.reject()
    return kratos
      .updateSettingsFlow({
        flow: String(flow.id),
        updateSettingsFlowBody: values,
      })
      .then(({ data }) => setFlow(data))
      .catch(handleFlowError(router, FlowType.settings, setFlow, strings))
  }
}
