import {
  SelfServiceVerificationFlow,
  SubmitSelfServiceVerificationFlowBody,
} from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { kratos } from '@/auth/kratos'
import type { AxiosError } from '@/auth/types'
import { useAuthentication } from '@/auth/use-authentication'
import { Flow, FlowType, handleFlowError } from '@/components/auth/flow'
import { PageTitle } from '@/components/content/page-title'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'

export function Verification() {
  const [flow, setFlow] = useState<SelfServiceVerificationFlow>()
  const { strings } = useInstanceData()
  const router = useRouter()
  const { flow: flowId, return_to: returnTo } = router.query
  const auth = useAuthentication()

  useEffect(() => {
    if (!router.isReady || flow) {
      return
    }

    if (auth.current?.isEmailVerified) {
      showToastNotice(strings.notices.emailVerifiedSuccessfully)
      void router.push(returnTo ? String(returnTo) : '/')
      return
    }

    if (flowId) {
      kratos
        .getSelfServiceVerificationFlow(String(flowId))
        .then(async ({ data }) => {
          setFlow(data)
          if (data.state === 'passed_challenge') {
            showToastNotice(strings.notices.emailVerifiedSuccessfully)

            return await router.push(
              returnTo ? String(returnTo) : '/auth/login'
            )
          }
        })
        .catch(handleFlowError(router, FlowType.verification, setFlow))
      return
    }
    kratos
      .initializeSelfServiceVerificationFlowForBrowsers()
      .then(({ data }) => {
        setFlow(data)
      })
      .catch(handleFlowError(router, FlowType.verification, setFlow))
      .catch((err: AxiosError) => {
        if (err.response?.status === 400) {
          setFlow(err.response?.data as SelfServiceVerificationFlow)
          return
        }

        return Promise.reject(err)
      })
  }, [flowId, router, router.isReady, returnTo, flow, auth])

  const onSubmit = (values: SubmitSelfServiceVerificationFlowBody) => {
    return router
      .push(`${router.pathname}?flow=${String(flow?.id)}`, undefined, {
        shallow: true,
      })
      .then(() =>
        kratos
          .submitSelfServiceVerificationFlow(
            String(flow?.id),
            values,
            undefined
          )
          .then(({ data }) => {
            setFlow(data)
          })
          .catch(handleFlowError(router, FlowType.verification, setFlow))
          .catch((err: AxiosError) => {
            switch (err.response?.status) {
              case 400: {
                // Status code 400 implies the form validation had an error
                setFlow(err.response?.data as SelfServiceVerificationFlow)
                return
              }
            }

            throw err
          })
      )
  }
  if (!flow) {
    return null
  }
  return (
    <>
      <PageTitle headTitle title={strings.auth.verifyTitle} />
      <Flow onSubmit={onSubmit} flow={flow} />
    </>
  )
}
