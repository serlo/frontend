import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle'
import {
  SelfServiceLoginFlow,
  SelfServiceRecoveryFlow,
  SelfServiceRegistrationFlow,
  SelfServiceSettingsFlow,
  SubmitSelfServiceLoginFlowBody,
  SubmitSelfServiceRecoveryFlowBody,
  SubmitSelfServiceRegistrationFlowBody,
  SubmitSelfServiceSettingsFlowBody,
} from '@ory/client'
import { getNodeId, isUiNodeInputAttributes } from '@ory/integrations/ui'
import type { AxiosError } from 'axios'
import { NextRouter } from 'next/router'
import NProgress from 'nprogress'
import { Dispatch, FormEvent, Fragment, SetStateAction, useState } from 'react'

import { StaticInfoPanel } from '../static-info-panel'
import { Node } from '@/components/auth/node'
import { useInstanceData } from '@/contexts/instance-context'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { triggerSentry } from '@/helper/trigger-sentry'

export interface FlowProps<T extends SubmitPayload> {
  flow:
    | SelfServiceLoginFlow
    | SelfServiceRegistrationFlow
    | SelfServiceRecoveryFlow
    | SelfServiceSettingsFlow
  onSubmit: (values: T) => Promise<void>
  only?: string
}

export enum FlowType {
  login = 'login',
  registration = 'registration',
  settings = 'settings',
  recovery = 'recovery',
  verification = 'verification',
}

export type SubmitPayload =
  | SubmitSelfServiceLoginFlowBody
  | SubmitSelfServiceRegistrationFlowBody
  | SubmitSelfServiceRecoveryFlowBody
  | SubmitSelfServiceSettingsFlowBody

export function Flow<T extends SubmitPayload>({
  flow,
  only,
  onSubmit,
}: FlowProps<T>) {
  const { strings } = useInstanceData()
  const [isLoading, setIsLoading] = useState(false)

  const { action, method, messages, nodes } = flow.ui
  const filteredNodes = only
    ? nodes.filter((node) => node.group === 'default' || node.group === only)
    : nodes

  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const values: Record<string, unknown> = {}
    filteredNodes.forEach((node) => {
      if (isUiNodeInputAttributes(node.attributes)) {
        if (
          node.attributes.type === 'hidden' ||
          node.attributes.type === 'submit' ||
          node.attributes.type === 'button'
        ) {
          values[getNodeId(node)] = node.attributes.value
        }
      }
    })
    return values
  })

  return (
    <form
      action={action}
      method={method}
      onSubmit={(e) => {
        void handleSubmit(e)
      }}
    >
      {renderMessages()}

      <div className="mx-side max-w-[18rem]">
        {filteredNodes.map((node) => {
          const id = getNodeId(node)

          return (
            <Fragment key={id}>
              <Node
                node={node}
                disabled={isLoading}
                isLoading={isLoading}
                value={values[id]}
                onChange={(value) => {
                  setValues((values) => {
                    return {
                      ...values,
                      [id]: value,
                    }
                  })
                }}
                onSubmit={handleSubmit}
              />
            </Fragment>
          )
        })}
      </div>
    </form>
  )

  function renderMessages() {
    return (
      <div className="mx-side">
        {messages
          ? messages.map((node) => {
              const { id, text, type } = node

              const panelType = type === 'info' ? 'info' : 'warning'
              const hasTranslatedMessage = hasOwnPropertyTs(
                strings.auth.messages,
                id
              )
              const rawMessage = hasTranslatedMessage
                ? strings.auth.messages[
                    id as keyof typeof strings.auth.messages
                  ]
                : text

              // TODO: check context
              const message = replacePlaceholders(rawMessage, { reason: text })

              if (!hasTranslatedMessage) {
                triggerSentry({
                  message: 'kratos-untranslated-message',
                  code: id,
                })
              }

              return (
                <StaticInfoPanel
                  key={id}
                  type={panelType}
                  icon={type === 'info' ? faInfoCircle : faWarning}
                >
                  {message}
                </StaticInfoPanel>
              )
            })
          : null}
      </div>
    )
  }

  function handleSubmit(e: FormEvent | MouseEvent, method?: string) {
    e.stopPropagation()
    e.preventDefault()

    if (isLoading) return Promise.resolve()
    NProgress.start()
    setIsLoading(true)

    return onSubmit({
      ...values,
      ...(method === undefined ? {} : { method }),
    } as T).finally(() => {
      NProgress.done()
      setIsLoading(false)
    })
  }
}

// A small function to help us deal with errors coming from fetching a flow.
export function handleFlowError<S>(
  router: NextRouter,
  flowType: FlowType,
  resetFlow: Dispatch<SetStateAction<S | undefined>>
) {
  return async (error: AxiosError) => {
    const data = error.response?.data as {
      redirect_browser_to: string
      error: {
        id: string
      }
    }

    // at moment all flows are in the same folder. Ajust if they were moved somewhere else
    const flowPath = `/auth/${flowType}`

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    switch (data.error?.id) {
      case 'session_aal2_required':
        // 2FA is enabled and enforced, but user did not perform 2fa yet!
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        window.location.href = data.redirect_browser_to
        return
      case 'session_already_available':
        // User is already signed in, let's redirect them home!
        await router.push('/auth/login-check')
        return
      case 'session_refresh_required':
        // We need to re-authenticate to perform this action
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        window.location.href = data.redirect_browser_to
        return
      case 'self_service_flow_return_to_forbidden':
        // The flow expired, let's request a new one.
        // toast.error('The return_to address is not allowed.')
        resetFlow(undefined)
        await router.push(flowPath)
        return
      case 'self_service_flow_expired':
        // The flow expired, let's request a new one.
        // toast.error('Your interaction expired, please fill out the form again.')
        resetFlow(undefined)
        await router.push(flowPath)
        return
      case 'security_csrf_violation':
        // A CSRF violation occurred. Best to just refresh the flow!
        // toast.error(
        //   'A security violation was detected, please fill out the form again.'
        // )
        resetFlow(undefined)
        await router.push(flowPath)
        return
      case 'security_identity_mismatch':
        // The requested item was intended for someone else. Let's request a new flow...
        resetFlow(undefined)
        await router.push(flowPath)
        return
      case 'browser_location_change_required':
        // Ory Kratos asked us to point the user to this URL.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        window.location.href = data.redirect_browser_to
        return
    }

    switch (error.response?.status) {
      case 410:
        // The flow expired, let's request a new one.
        resetFlow(undefined)
        await router.push(flowPath)
        return
    }

    // We are not able to handle the error? Return it.
    return Promise.reject(error)
  }
}
