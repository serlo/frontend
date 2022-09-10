import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
} from '@ory/client'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { AuthSessionCookie } from '@/auth/auth-session-cookie'
import { Flow, FlowType, handleFlowError } from '@/components/auth/flow'
import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { FaIcon } from '@/components/fa-icon'
import { kratos } from '@/helper/kratos'

export function Login({ oauth }: { oauth?: boolean }) {
  const [flow, setFlow] = useState<SelfServiceLoginFlow>()
  const router = useRouter()
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
        .then(({ data }) => {
          setFlow(data)
        })
        .catch(handleFlowError(router, FlowType.login, setFlow))
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
        const data = error.response?.data as {
          error: {
            id: string
          }
        }
        if (oauth && data.error?.id === 'session_already_available') {
          await router.push(
            `/api/oauth/accept-login?login_challenge=${String(login_challenge)}`
          )
        }
        await handleFlowError(router, FlowType.login, setFlow)(error)
      })
  }, [flowId, router, router.isReady, aal, refresh, returnTo, flow])

  const showLogout = aal || refresh

  return (
    <>
      <PageTitle
        headTitle
        icon={<FaIcon icon={faUser} />}
        title={(() => {
          if (flow?.refresh) {
            return 'Confirm Action'
          } else if (flow?.requested_aal === 'aal2') {
            return 'Two-Factor Authentication'
          }
          return 'Sign In'
        })()}
      />

      {flow ? <Flow flow={flow} onSubmit={onLogin} /> : null}

      {showLogout ? <div>Log out</div> : ''}

      <div className="mx-side mt-20 border-t-2 pt-4">
        Bist du neu hier?{' '}
        <Link href="/auth/registration" className="serlo-button-light">
          Neuen Account registrieren
        </Link>
      </div>

      <div className="mx-side mt-2 pt-4">
        Hast du dein{' '}
        <Link href="/auth/recovery" className="font-bold">
          Passwort vergessen
        </Link>
        ?
      </div>
    </>
  )

  async function onLogin(values: SubmitSelfServiceLoginFlowBody) {
    if (!flow?.id) return
    const originalPreviousPath = sessionStorage.getItem('previousPathname')
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
          AuthSessionCookie.set(data.session)

          if (oauth) {
            return await router.push(
              `/api/oauth/accept-login?login_challenge=${String(
                login_challenge
              )}`
            )
          }

          if (flow?.return_to) {
            window.location.href = flow?.return_to
            return
          }

          window.location.href = `${originalPreviousPath ?? '/'}#auth`
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
        await handleFlowError(router, FlowType.login, setFlow)(e as AxiosError)
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
