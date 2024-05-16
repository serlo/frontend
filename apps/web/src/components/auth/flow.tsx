import type {
  LoginFlow,
  RecoveryFlow,
  RegistrationFlow,
  SettingsFlow,
  VerificationFlow,
  UpdateLoginFlowBody,
  UpdateRecoveryFlowBody,
  UpdateRegistrationFlowBody,
  UpdateSettingsFlowBody,
  UpdateVerificationFlowBody,
  Session,
} from '@ory/client'
import { getNodeId, isUiNodeInputAttributes } from '@ory/integrations/ui'
import type { NextRouter } from 'next/router'
import NProgress from 'nprogress'
import {
  type Dispatch,
  type FormEvent,
  Fragment,
  type ReactNode,
  type SetStateAction,
  useState,
} from 'react'

import { FlowType } from './flow-type'
import { Messages } from './messages'
import {
  changeButtonTypeOfSSOProvider,
  sortKratosUiNodes,
} from '../pages/auth/ory-helper'
import {
  filterUnwantedRedirection,
  loginUrl,
  registrationUrl,
  VALIDATION_ERROR_TYPE,
  verificationUrl,
} from '../pages/auth/utils'
import { checkLoggedIn } from '@/auth/cookie/check-logged-in'
import { fetchAndPersistAuthSession } from '@/auth/cookie/fetch-and-persist-auth-session'
import type { AxiosError } from '@/auth/types'
import { Node } from '@/components/auth/node'
import type { InstanceData } from '@/data-types'
import { isProduction } from '@/helper/is-production'
import { showToastNotice } from '@/helper/show-toast-notice'
import { triggerSentry } from '@/helper/trigger-sentry'

export interface FlowProps<T extends SubmitPayload> {
  flow:
    | LoginFlow
    | RegistrationFlow
    | RecoveryFlow
    | SettingsFlow
    | VerificationFlow
  onSubmit: (values: T) => Promise<void>
  only?: string
  contentAfterLastTrait?: ReactNode
}

export type SubmitPayload =
  | UpdateLoginFlowBody
  | UpdateRegistrationFlowBody
  | UpdateRecoveryFlowBody
  | UpdateSettingsFlowBody
  | UpdateVerificationFlowBody

export function Flow<T extends SubmitPayload>({
  flow,
  flowType,
  only,
  onSubmit,
  contentAfterLastTrait,
}: FlowProps<T> & { flowType: FlowType }) {
  const [isLoading, setIsLoading] = useState(false)

  const { action, method, nodes, messages } = flow.ui
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
          node.attributes.type === 'button' ||
          node.attributes.type === 'checkbox'
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
      <Messages messages={messages} />

      <div className="mx-side">
        {filteredNodes.map((node, index) => {
          const isLastTrait =
            Object.hasOwn(node.attributes, 'name') &&
            node.attributes.name === 'traits.interest'
          const id = getNodeId(node)
          return (
            <Fragment key={id + index}>
              <Node
                node={node}
                disabled={isLoading}
                isLoading={isLoading}
                value={values[id]}
                flowType={flowType}
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
              {isLastTrait ? contentAfterLastTrait : null}
            </Fragment>
          )
        })}
      </div>
    </form>
  )

  function handleSubmit(e: FormEvent | MouseEvent, method?: string) {
    e.stopPropagation()
    e.preventDefault()

    if (isLoading) {
      return Promise.resolve()
    }
    NProgress.start()
    setIsLoading(true)

    return onSubmit({
      ...values,
      ...(method === undefined ? {} : { method }),
    } as T)
      .catch((error: { type?: string }) => {
        // Right now there is nothing for us to do here when a validation error
        // is thrown.
        if (error?.type !== VALIDATION_ERROR_TYPE) {
          throw error
        }
      })
      .finally(() => {
        NProgress.done()
        setIsLoading(false)
      })
  }
}

// A small function to help us deal with errors coming from fetching a flow.
export function handleFlowError<S>(
  router: NextRouter,
  flowType: FlowType,
  setFlow:
    | Dispatch<SetStateAction<S | undefined>>
    | ((flow?: RegistrationFlow | LoginFlow) => void),
  strings: InstanceData['strings'],
  throwError?: boolean
) {
  return async (error: AxiosError) => {
    // eslint-disable-next-line no-console
    console.error(error)
    triggerSentry({ message: 'Auth error', code: error.response?.status })

    const data = error.response?.data as {
      redirect_browser_to: string
      error: {
        id: string
      }
    }

    // at moment all flows are in the same folder. Adjust if they were moved somewhere else
    const flowPath = `/auth/${flowType}`

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    switch (data.error?.id) {
      case 'session_aal2_required':
        // 2FA is enabled and enforced, but user did not perform 2fa yet!
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        window.location.href = data.redirect_browser_to
        return
      case 'session_already_available': {
        let session: Session | null = null
        if (!checkLoggedIn()) session = await fetchAndPersistAuthSession()
        showToastNotice(strings.notices.alreadyLoggedIn, 'default', 3000)

        const redirection = filterUnwantedRedirection({
          desiredPath: sessionStorage.getItem('previousPathname'),
          unwantedPaths: [verificationUrl, loginUrl, registrationUrl],
        })
        setTimeout(() => {
          if (!isProduction) {
            // TODO: wip, only redirect when provider is nbp
            console.log('flow')
            console.log(data.redirect_browser_to)
            console.log(data.error)
            console.log(session)

            void router.push(data.redirect_browser_to ?? redirection)
            return
          }
          window.location.href = redirection
        }, 3000)

        return
      }
      case 'session_refresh_required':
        // We need to re-authenticate to perform this action
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        window.location.href = data.redirect_browser_to
        return
      case 'self_service_flow_return_to_forbidden':
        // The flow expired, let's request a new one.
        // toast.error('The return_to address is not allowed.')
        setFlow(undefined)
        await router.push(flowPath)
        return
      case 'self_service_flow_expired':
        // The flow expired, let's request a new one.
        setFlow(undefined)
        await router.push(flowPath)
        return
      case 'security_csrf_violation':
        // A CSRF violation occurred. Best to just refresh the flow!
        setFlow(undefined)
        await router.push(flowPath)
        return
      case 'security_identity_mismatch':
        // The requested item was intended for someone else. Let's request a new flow...
        setFlow(undefined)
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
        setFlow(undefined)
        await router.push(flowPath)
        return
      case 400:
        // eslint-disable-next-line no-case-declarations
        const registrationFlowMessages =
          flowType === FlowType.registration &&
          error.response &&
          Object.hasOwn(error.response, 'data')
            ? (error.response.data as RegistrationFlow).ui.messages
            : undefined
        if (
          registrationFlowMessages &&
          registrationFlowMessages.length === 1 &&
          registrationFlowMessages[0].id === 4000007
        ) {
          const newFlow = error.response?.data as RegistrationFlow
          newFlow.ui.messages = []
          // @ts-expect-error workaround
          setFlow(newFlow)
          showToastNotice(strings.auth.messages.code4000007, 'warning', 6000)
        } else {
          const data = error.response?.data as RegistrationFlow | LoginFlow
          // @ts-expect-error workaround
          setFlow({
            ...data,
            ui: {
              ...data?.ui,
              nodes: data?.ui?.nodes
                .sort(sortKratosUiNodes)
                .map(changeButtonTypeOfSSOProvider),
            },
          })
        }

        return
    }

    if (throwError) throw error

    // We are not able to handle the error? Return it.
    return Promise.reject(error)
  }
}
