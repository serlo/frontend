import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
} from '@ory/kratos-client'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Flow, FlowType, handleFlowError } from '@/components/auth/flow'
import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { FaIcon } from '@/components/fa-icon'
import { kratos } from '@/helper/kratos'

// See https://github.com/ory/kratos-selfservice-ui-react-nextjs/blob/master/pages/login.tsx

export function Login() {
  const [flow, setFlow] = useState<SelfServiceLoginFlow>()
  const router = useRouter()
  const { return_to: returnTo, flow: flowId, refresh, aal } = router.query

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
      .catch(handleFlowError(router, FlowType.login, setFlow))
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

      {/* TODO?: instead of making it generic, we are probably better of hard-coding the form here */}
      {flow ? <Flow flow={flow} onSubmit={onLogin} /> : null}

      {showLogout ? <div>Log out</div> : ''}

      <div className="mx-side mt-20 border-t-2 pt-4">
        Bist du neu hier?{' '}
        <Link href="/auth/registration" className="serlo-button-light">
          Neuen Account registeren
        </Link>
      </div>

      <div className="mx-side mt-2 pt-4">
        Hast du dein{' '}
        <Link href="/auth/recovery" className="font-bold">
          Passwort vergessen
        </Link>
        ? (not implemented)
      </div>
    </>
  )

  async function onLogin(values: SubmitSelfServiceLoginFlowBody) {
    if (!flow?.id) return

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
        .then(async (_) => {
          if (flow?.return_to) {
            window.location.href = flow?.return_to
            return
          }
          await router.push('/api/auth/login')
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
