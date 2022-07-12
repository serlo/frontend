import {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
} from '@ory/kratos-client'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Flow, handleFlowError } from '@/components/auth/flow'
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
        .catch(handleFlowError(router, 'login', setFlow))
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
      .catch(handleFlowError(router, 'login', setFlow))
  }, [flowId, router, router.isReady, aal, refresh, returnTo, flow])

  return (
    <>
      {(() => {
        if (flow?.refresh) {
          return 'Confirm Action'
        } else if (flow?.requested_aal === 'aal2') {
          return 'Two-Factor Authentication'
        }
        return 'Sign In'
      })()}
      {/* TODO?: instead of making it generic, we are probably better of hard-coding the form here */}
      {flow ? <Flow flow={flow} onSubmit={onLogin} /> : null}
      {aal || refresh ? <div>Log out</div> : ''}
      <div>
        <a href="/registration">Register</a>
      </div>
      {/*<div>
          {/*  <Link href="/recovery" passHref>*/}
      {/*    <div>Recover your account</div>*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </>
  )

  async function onLogin(values: SubmitSelfServiceLoginFlowBody) {
    if (!flow?.id) return

    await router.push(`/login?flow=${flow.id}`, undefined, { shallow: true })

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
        await handleFlowError(router, 'login', setFlow)(e as AxiosError)
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
