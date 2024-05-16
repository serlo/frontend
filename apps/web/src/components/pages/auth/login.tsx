import type { LoginFlow, UpdateLoginFlowBody } from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { changeButtonTypeOfSSOProvider, sortKratosUiNodes } from './ory-helper'
import {
  filterUnwantedRedirection,
  loginUrl,
  logoutUrl,
  registrationUrl,
  verificationUrl,
  recoveryUrl,
} from './utils'
import { getAuthPayloadFromSession } from '@/auth/auth-provider'
import { fetchAndPersistAuthSession } from '@/auth/cookie/fetch-and-persist-auth-session'
import { kratos } from '@/auth/kratos'
import { oauthHandler } from '@/auth/oauth-handler'
import type { AxiosError } from '@/auth/types'
import { useAuth } from '@/auth/use-auth'
import { useAuthentication } from '@/auth/use-authentication'
import { useCheckInstance } from '@/auth/use-check-instance'
import { Flow, handleFlowError } from '@/components/auth/flow'
import { FlowType } from '@/components/auth/flow-type'
import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { isProduction } from '@/helper/is-production'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { showToastNotice } from '@/helper/show-toast-notice'

export function Login({ oauth }: { oauth?: boolean }) {
  const [flow, setFlow] = useState<LoginFlow>()
  const router = useRouter()
  const checkInstance = useCheckInstance()
  const auth = useAuthentication()
  const { refreshAuth } = useAuth()
  const { strings } = useInstanceData()
  const loginStrings = strings.auth.login

  const initStarted = useRef<boolean>(false)

  const {
    return_to: returnTo,
    flow: flowId,
    refresh,
    aal,
    login_challenge: loginChallenge,
  } = router.query

  useEffect(() => {
    checkInstance({ redirect: false })

    if (!router.isReady || flow) {
      return
    }

    if (oauth && auth) {
      void oauthHandler('login', String(loginChallenge))
      return
    }

    // Make sure we only init the flow once
    if (initStarted.current) {
      return
    }

    initStarted.current = true

    void (async () => {
      try {
        const response = await kratos.createBrowserLoginFlow({
          refresh: Boolean(refresh),
          aal: aal ? String(aal) : undefined,
          returnTo: returnTo ? String(returnTo) : undefined,
        })

        const data = {
          ...response.data,
          ui: {
            ...response.data.ui,
            nodes: response.data.ui.nodes
              .map(changeButtonTypeOfSSOProvider)
              .sort(sortKratosUiNodes),
          },
        }

        setFlow(data)
      } catch (e) {
        const error = e as AxiosError
        const data = error.response?.data as { error: { id: string } }

        if (oauth && data?.error?.id === 'session_already_available') {
          void oauthHandler('login', String(loginChallenge))
        }
        await handleFlowError(router, FlowType.login, setFlow, strings)(error)
      }
    })()
  }, [
    flowId,
    router,
    router.isReady,
    aal,
    refresh,
    returnTo,
    flow,
    oauth,
    loginChallenge,
    strings,
    checkInstance,
    auth,
    initStarted,
  ])

  const showLogout = aal || refresh

  return (
    <>
      <div className="mx-auto mb-16 max-w-[30rem] pb-6">
        <PageTitle
          headTitle
          title={`${
            loginStrings[flow?.refresh ? 'confirmAction' : 'signIn']
          } 👋`}
          extraBold
        />

        {flow ? (
          <Flow flowType={FlowType.login} flow={flow} onSubmit={onLogin} />
        ) : (
          <LoadingSpinner noText />
        )}
        {showLogout ? <div>{loginStrings.logOut}</div> : null}
        <div className="mx-side mt-20 border-t-2 pt-4">
          {loginStrings.newHere}{' '}
          <Link href={registrationUrl} className="serlo-button-light">
            {loginStrings.registerNewAccount}
          </Link>
        </div>
        <div className="mx-side mt-2 pt-3">
          {replacePlaceholders(loginStrings.forgotPassword, {
            forgotLinkText: (
              <Link href={recoveryUrl} className="font-bold">
                {loginStrings.forgotLinkText}
              </Link>
            ),
          })}
        </div>
      </div>
    </>
  )

  async function onLogin(values: UpdateLoginFlowBody) {
    if (!flow?.id) return

    const redirection = filterUnwantedRedirection({
      desiredPath: sessionStorage.getItem('previousPathname'),
      unwantedPaths: [verificationUrl, logoutUrl, loginUrl, recoveryUrl],
    })

    const hackedValues = // @ts-expect-error try
      values.method === 'nbp' // @ts-expect-error try
        ? ({ ...values, provider: 'nbp' } as UpdateLoginFlowBody)
        : values

    try {
      await kratos
        .updateLoginFlow({ flow: flow.id, updateLoginFlowBody: hackedValues })
        .then(({ data }) => {
          void fetchAndPersistAuthSession(refreshAuth, data.session)
          if (oauth) return oauthHandler('login', String(loginChallenge))
          const username =
            getAuthPayloadFromSession(data.session)?.username ?? 'Jane Doe'
          showToastNotice(
            strings.notices.welcome.replace('%username%', username)
          )
          if (!isProduction) {
            // TODO: wip, only redirect when provider is nbp
            console.log(data)
            // window.location.href =
            //   'https://journey.serlo-staging.dev/willkommen'
          }
          void router.push(flow.return_to ?? redirection)
          return
        })
    } catch (e: unknown) {
      try {
        await handleFlowError(
          router,
          FlowType.login,
          setFlow,
          strings
        )(e as AxiosError<LoginFlow>)
      } catch (e: unknown) {
        const err = e as AxiosError
        if (err.response?.status === 400) {
          setFlow(err.response?.data as LoginFlow)
          return
        }
        throw err
      }
    }
  }
}
