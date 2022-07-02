import {
  SelfServiceLoginFlow,
  Session,
  SubmitSelfServiceLoginFlowBody,
} from '@ory/kratos-client'
import { AcceptLoginRequest } from '@oryd/hydra-client'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Flow, handleFlowError } from '@/components/auth/flow'
import { hydra, kratos } from '@/helper/kratos'

// See https://github.com/ory/kratos-selfservice-ui-react-nextjs/blob/master/pages/login.tsx

// TODO: remove Hydra, it should be a server side communication
export function Login() {
  const [flow, setFlow] = useState<SelfServiceLoginFlow>()
  const [session] = useState<Session | null>()
  const router = useRouter()

  const {
    return_to: returnTo,
    flow: flowId,
    refresh,
    aal,
    login_challenge,
    consent_challenge,
  } = router.query

  useEffect(() => {
    if (!router.isReady || flow) {
      return
    }

    if (!consent_challenge && !login_challenge) {
      window.location.href = `http://localhost:3000/api/auth/login`
    }

    if (consent_challenge && session) {
      const acceptConsentRequest = {
        grant_scope: ['open_id'],
        grant_access_token_audience: [''],
        session: {
          access_token: session.identity,
          id_token: session.identity,
        },
      }

      hydra
        .acceptConsentRequest(String(consent_challenge), acceptConsentRequest)
        .then(({ data: body }) => {
          window.location.href = `${body.redirect_to}`
        })
        .catch((e: Error) => {
          throw e
        })
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
      {/*<div>
          {/*  <Link href="/recovery" passHref>*/}
      {/*    <div>Recover your account</div>*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </>
  )

  async function onLogin(values: SubmitSelfServiceLoginFlowBody) {
    // console.log('submitting values', values)
    if (!flow?.id) return

    await router.push(`/login?flow=${flow.id}`, undefined, { shallow: true })

    try {
      await kratos
        .submitSelfServiceLoginFlow(flow.id, values)
        .then(async ({ data }) => {
          const { session } = data
          const subject = (
            session.identity.metadata_public as { legacy_id: number }
          ).legacy_id

          const acceptLoginRequest: AcceptLoginRequest =
            {} as AcceptLoginRequest

          // Important: subject has to be string
          acceptLoginRequest.subject = String(subject)
          acceptLoginRequest.context = session

          await hydra
            .acceptLoginRequest(String(login_challenge), acceptLoginRequest)
            .then(({ data: body }) => {
              window.location.href = `${body.redirect_to}`
              return
            })
            .catch((e: Error) => {
              throw e
            })
        })
        .catch((e: Error) => {
          throw e
        })

      if (flow?.return_to) {
        window.location.href = flow?.return_to
        return
      }

      await router.push(`/?login_challenge=${String(login_challenge)}`)
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
