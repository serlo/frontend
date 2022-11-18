import type {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
} from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { filterUnwantedRedirection } from './utils'
import { fetchAndPersistAuthSession } from '@/auth/fetch-auth-session'
import { kratos } from '@/auth/kratos'
import type { AxiosError } from '@/auth/types'
import { Flow, FlowType, handleFlowError } from '@/components/auth/flow'
import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { showToastNotice } from '@/helper/show-toast-notice'

export function Login({ oauth }: { oauth?: boolean }) {
  const [flow, setFlow] = useState<SelfServiceLoginFlow>()
  const router = useRouter()
  const { strings } = useInstanceData()
  const loginStrings = strings.auth.login

  const {
    return_to: returnTo,
    flow: flowId,
    refresh,
    aal,
    login_challenge,
  } = router.query

  useEffect(() => {
    if (!router.isReady || flow) {
      return
    }

    if (flowId) {
      kratos
        .getSelfServiceLoginFlow(String(flowId))
        .then(({ data }) => setFlow(data))
        .catch(handleFlowError(router, FlowType.login, setFlow, strings))
      return
    }

    kratos
      .initializeSelfServiceLoginFlowForBrowsers(
        Boolean(refresh),
        aal ? String(aal) : undefined,
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data)
      })
      .catch(async (error: AxiosError) => {
        const data = error.response?.data as { error: { id: string } }

        if (oauth && data.error?.id === 'session_already_available') {
          await router.push(
            `/api/oauth/accept-login?login_challenge=${String(login_challenge)}`
          )
        }
        await handleFlowError(router, FlowType.login, setFlow, strings)(error)
      })
  }, [
    flowId,
    router,
    router.isReady,
    aal,
    refresh,
    returnTo,
    flow,
    oauth,
    login_challenge,
    strings,
  ])

  const showLogout = aal || refresh

  return (
    <>
      <div className="mb-16 max-w-[30rem] pb-6 mx-auto">
        <PageTitle
          headTitle
          title={`${
            loginStrings[flow?.refresh ? 'confirmAction' : 'signIn']
          } 👋`}
          extraBold
        />

        {flow ? (
          <Flow flow={flow} onSubmit={onLogin} />
        ) : (
          <LoadingSpinner noText />
        )}
        {showLogout ? <div>{loginStrings.logOut}</div> : null}
        <div className="mx-side mt-20 border-t-2 pt-4">
          {loginStrings.newHere}{' '}
          <Link href="/auth/registration" className="serlo-button-light">
            {loginStrings.registerNewAccount}
          </Link>
        </div>
        <div className="mx-side mt-2 pt-3">
          {replacePlaceholders(loginStrings.forgotPassword, {
            forgotLinkText: (
              <Link href="/auth/recovery" className="font-bold">
                {loginStrings.forgotLinkText}
              </Link>
            ),
          })}
        </div>
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
    </>
  )

  async function onLogin(values: SubmitSelfServiceLoginFlowBody) {
    if (!flow?.id) return
    const redirection = filterUnwantedRedirection({
      desiredPath: sessionStorage.getItem('previousPathname'),
      unwantedPaths: ['auth/verification', 'auth/logout'],
    })

    await router.push(
      `${router.pathname}?flow=${String(flow?.id)}`,
      undefined,
      {
        shallow: true,
      }
    )

    try {
      await kratos
        .submitSelfServiceLoginFlow(flow.id, values)
        .then(async ({ data }) => {
          void fetchAndPersistAuthSession(data.session)
          if (oauth) {
            await router.push(
              `/api/oauth/accept-login?login_challenge=${String(
                login_challenge?.toString
              )}`
            )
            return
          }

          showToastNotice(
            strings.notices.welcome.replace(
              '%username%',
              (data.session.identity.traits as { username: string })?.username
            )
          )

          setTimeout(() => {
            // TODO: make sure router.push() also rerenders authed components (e.g. header)
            window.location.href = flow?.return_to ?? redirection
          }, 1000)

          return
        })
        .catch((e: Error) => {
          throw e
        })

      if (flow?.return_to) {
        window.location.href = flow?.return_to
        return
      }
    } catch (e: unknown) {
      try {
        await handleFlowError(
          router,
          FlowType.login,
          setFlow,
          strings
        )(e as AxiosError)
      } catch (e: unknown) {
        const err = e as AxiosError
        if (err.response?.status === 400) {
          setFlow(err.response?.data as SelfServiceLoginFlow)
          return
        }

        throw err
      }
    }
  }
}
