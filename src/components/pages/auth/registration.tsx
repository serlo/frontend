import {
  SelfServiceRegistrationFlow,
  SubmitSelfServiceRegistrationFlowBody,
} from '@ory/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { kratos } from '@/auth/kratos'
import { Flow, FlowType, handleFlowError } from '@/components/auth/flow'
import { PageTitle } from '@/components/content/page-title'
import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { showToastNotice } from '@/helper/show-toast-notice'

export function Registration() {
  const [flow, setFlow] = useState<SelfServiceRegistrationFlow>()
  const router = useRouter()
  const { lang, strings } = useInstanceData()
  const { return_to: returnTo, flow: flowId } = router.query

  useEffect(() => {
    if (!router.isReady || flow) return

    if (flowId) {
      kratos
        .getSelfServiceRegistrationFlow(String(flowId))
        .then(({ data }) => setFlow(data))
        .catch(handleFlowError(router, FlowType.registration, setFlow, strings))
      return
    }

    kratos
      .initializeSelfServiceRegistrationFlowForBrowsers(
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => setFlow(data))
      .catch(handleFlowError(router, FlowType.registration, setFlow, strings))
  }, [flowId, router, router.isReady, returnTo, flow, strings])

  async function onSubmit(values: SubmitSelfServiceRegistrationFlowBody) {
    const valuesWithLanguage = { ...values, 'traits.language': lang }

    await router
      .push(`${router.pathname}?flow=${String(flow?.id)}`, undefined, {
        shallow: true,
      })
      .then(() =>
        kratos
          .submitSelfServiceRegistrationFlow(
            String(flow?.id),
            valuesWithLanguage
          )
          .then(() => {
            // it would be better to hide the registration fields and show the instruction
            showToastNotice(strings.auth.messages[1080001])
          })
          .catch(
            handleFlowError(router, FlowType.registration, setFlow, strings)
          )
      )
  }

  return (
    <>
      <PageTitle headTitle title={strings.auth.registerTitle} />
      {flow ? <Flow flow={flow} onSubmit={onSubmit} /> : null}
      {renderAgreement()}
    </>
  )

  function renderAgreement() {
    return replacePlaceholders(strings.auth.registrationAgreement, {
      signup: <em>{strings.auth.signUp}</em>,
      privacypolicy: (
        <a
          className="text-brand serlo-link font-bold"
          href="/privacy"
          target="_blank"
        >
          {strings.entities.privacyPolicy}
        </a>
      ),
      terms: (
        <a
          className="text-brand serlo-link font-bold"
          href="/21654"
          target="_blank"
        >
          {strings.auth.terms}
        </a>
      ),
    })
  }
}
