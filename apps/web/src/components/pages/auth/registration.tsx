import type { RegistrationFlow, UpdateRegistrationFlowBody } from '@ory/client'
import { cn } from '@serlo/tailwind/helper/cn'
import { useRouter } from 'next/router'
import nProgress from 'nprogress'
import { useEffect, useState } from 'react'

import { changeButtonTypeOfSSOProvider, sortKratosUiNodes } from './ory-helper'
import { verificationUrl, VALIDATION_ERROR_TYPE } from './utils'
import { kratos } from '@/auth/kratos'
import { useCheckInstance } from '@/auth/use-check-instance'
import { Flow, handleFlowError } from '@/components/auth/flow'
import { FlowType } from '@/components/auth/flow-type'
import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { InfoPanel } from '@/components/info-panel'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'

export function Registration() {
  const [isConsentCheckboxChecked, setIsConsentCheckboxChecked] =
    useState(false)
  const [
    hasValidationErrorMissingConsent,
    setHasValidationErrorMissingConsent,
  ] = useState(false)

  const [flow, setFlow] = useState<RegistrationFlow>()
  const router = useRouter()
  const checkInstance = useCheckInstance()
  const { lang, strings } = useInstanceData()
  const { return_to: returnTo, flow: flowId } = router.query
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false)

  const reorderAndSetFlow = (origFlow?: RegistrationFlow) => {
    if (!origFlow) return

    const reorderedNodes = origFlow.ui.nodes
      .map(changeButtonTypeOfSSOProvider)
      .sort(sortKratosUiNodes)
    const newFlow = {
      ...origFlow,
      ui: { ...origFlow.ui, nodes: reorderedNodes },
    }
    setFlow(newFlow)
  }

  useEffect(() => {
    checkInstance({ redirect: false })
    if (!router.isReady || flow) return

    if (flowId) {
      kratos
        .getRegistrationFlow({ id: String(flowId) })
        .then(({ data }) => reorderAndSetFlow(data))
        .catch(
          handleFlowError(
            router,
            FlowType.registration,
            reorderAndSetFlow,
            strings
          )
        )
      return
    }

    kratos
      .createBrowserRegistrationFlow({
        returnTo: returnTo ? String(returnTo) : undefined,
      })
      .then(({ data }) => {
        reorderAndSetFlow(data)
      })
      .catch(
        handleFlowError(
          router,
          FlowType.registration,
          reorderAndSetFlow,
          strings
        )
      )
  }, [flowId, router, router.isReady, returnTo, flow, strings, checkInstance])

  async function onSubmit(values: UpdateRegistrationFlowBody) {
    const valuesWithLanguage = { ...values, 'traits.language': lang }
    nProgress.start()
    return kratos
      .updateRegistrationFlow({
        flow: String(flow?.id),
        updateRegistrationFlowBody: valuesWithLanguage,
      })
      .then(() => {
        setIsSuccessfullySubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
      .catch(
        handleFlowError(
          router,
          FlowType.registration,
          reorderAndSetFlow,
          strings
        )
      )
      .finally(() => {
        nProgress.done()
      })
  }

  return (
    <>
      <PageTitle
        headTitle
        title={strings.auth.register.registerTitle}
        extraBold
      />

      <p className="serlo-p">
        {replacePlaceholders(strings.auth.register.registerIntro, {
          break: <br />,
        })}{' '}
        👍
      </p>
      {isSuccessfullySubmitted ? (
        <InfoPanel key={1} type="info">
          🎉 {strings.auth.messages.code1080001} <br />
          <br />
          <span className="font-normal">
            {strings.auth.verificationProblem}:<br />
            <Link
              className="serlo-link font-bold text-brand"
              href={verificationUrl}
            >
              {strings.auth.verificationLinkText}
            </Link>
          </span>
        </InfoPanel>
      ) : null}

      {flow ? (
        <div
          className={cn(
            'mx-auto flex pb-8',
            isSuccessfullySubmitted && 'opacity-40'
          )}
        >
          <Flow
            flow={flow}
            flowType={FlowType.registration}
            onSubmit={
              isConsentCheckboxChecked
                ? onSubmit
                : () => {
                    // This wouldn't need Promise.reject necessarily but it
                    // simplifies the types and also allows the flow component
                    // to react to validation errors in the future
                    setHasValidationErrorMissingConsent(true)
                    return Promise.reject({
                      type: VALIDATION_ERROR_TYPE,
                    })
                  }
            }
            contentAfterLastTrait={renderAgreement()}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/_assets/img/community-menu-bird.svg"
            className="-mt-44 hidden w-[33vw] px-side mobile:block md:w-64"
          />
        </div>
      ) : (
        <LoadingSpinner noText />
      )}
    </>
  )

  function renderAgreement() {
    const text = replacePlaceholders(
      strings.auth.registrationCheckboxAgreement,
      {
        privacypolicy: (
          <a
            className="serlo-link font-bold text-brand"
            href="/privacy"
            target="_blank"
          >
            {strings.entities.privacyPolicy}
          </a>
        ),
        terms: (
          <a
            className="serlo-link font-bold text-brand"
            href="/21654"
            target="_blank"
          >
            {strings.auth.terms}
          </a>
        ),
      }
    )

    return (
      <div className="serlo-p mx-0 mt-12 text-base">
        <label className="flex">
          <input
            // min-width should fix ios problem with rendering the checkbox
            // super tiny, see
            // https://stackoverflow.com/questions/64227252/my-checkbox-inputs-stays-ridiculously-small-on-ios-13-7
            className="mr-2 h-4 w-4 min-w-[14px] scale-125 accent-brand"
            type="checkbox"
            checked={isConsentCheckboxChecked}
            onChange={() => {
              if (hasValidationErrorMissingConsent) {
                setHasValidationErrorMissingConsent(false)
              }
              setIsConsentCheckboxChecked(
                (isCurrentlyChecked) => !isCurrentlyChecked
              )
            }}
          />
          <span className="leading-5">{text}</span>
        </label>
        {hasValidationErrorMissingConsent && (
          <span className="mt-2 inline-block text-red-500">
            <i>{strings.auth.consentNeededBeforeProceeding}</i>
          </span>
        )}
      </div>
    )
  }
}
