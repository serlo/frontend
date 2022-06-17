import { useEffect, useState } from 'react'
import {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
} from '@ory/kratos-client'
import { useRouter } from 'next/router'
import { kratos } from '@/helper/kratos'
import { Flow, handleFlowError } from '@/components/auth/flow'
import { AxiosError } from 'axios'

export function Login() {
  const [flow, setFlow] = useState<SelfServiceLoginFlow>()
  console.log(flow)

  // Get ?flow=... from the URL
  const router = useRouter()

  const {
    return_to: returnTo,
    flow: flowId,
    // Refresh means we want to refresh the session. This is needed, for example, when we want to update the password
    // of a user.
    refresh,
    // AAL = Authorization Assurance Level. This implies that we want to upgrade the AAL, meaning that we want
    // to perform two-factor authentication/verification.
    aal,
  } = router.query

  // This might be confusing, but we want to show the user an option
  // to sign out if they are performing two-factor authentication!
  // const onLogout = createLogoutHandler([aal, refresh])

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      kratos
        .getSelfServiceLoginFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data)
        })
        .catch(handleFlowError(router, 'login', setFlow))
      return
    }

    // Otherwise we initialize it
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
      {/* TODO: instead of making it generic, we are probably better of hard-coding the form here */}
      {flow ? <Flow flow={flow} onSubmit={onSubmit} /> : null}
      {aal || refresh ? (
        <div>Log out</div>
      ) : (
        // <ActionCard>
        //   <CenterLink data-testid="logout-link" onClick={onLogout}>
        //     Log out
        //   </CenterLink>
        // </ActionCard>
        <>
          <div>Create account</div>
          <div>Recover account</div>
          {/*<ActionCard>*/}
          {/*  <Link href="/registration" passHref>*/}
          {/*    <CenterLink>Create account</CenterLink>*/}
          {/*  </Link>*/}
          {/*</ActionCard>*/}
          {/*<ActionCard>*/}
          {/*  <Link href="/recovery" passHref>*/}
          {/*    <CenterLink>Recover your account</CenterLink>*/}
          {/*  </Link>*/}
          {/*</ActionCard>*/}
        </>
      )}
    </>
  )

  async function onSubmit(values: SubmitSelfServiceLoginFlowBody) {
    console.log('submitting values', values)
    if (!flow?.id) return
    const id = flow.id

    await router.push(`/login?flow=${id}`, undefined, { shallow: true })
    try {
      await kratos.submitSelfServiceLoginFlow(id, undefined, values)
      if (flow?.return_to) {
        window.location.href = flow?.return_to
        return
      }

      await router.push('/')
    } catch (e: unknown) {
      try {
        await handleFlowError(router, 'login', setFlow)(e as AxiosError)
      } catch (e: unknown) {
        const err = e as AxiosError
        if (err.response?.status === 400) {
          setFlow(err.response?.data)
          return
        }

        throw err
      }
    }
  }
}
