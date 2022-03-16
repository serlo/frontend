import { useState } from 'react'

import { Link } from '../content/link'
import { PageTitle } from '../content/page-title'
import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { ExternalProvider, useConsent } from '@/helper/use-consent'

export function ConsentPage() {
  const { checkConsent, revokeConsent } = useConsent()
  const [, updateState] = useState({})
  const { strings } = useInstanceData()

  const consentedProviders = Object.values(ExternalProvider).filter(
    (provider) => checkConsent(provider)
  )

  return (
    <>
      <PageTitle title={strings.consent.title} headTitle />

      <p className="serlo-p">
        {replacePlaceholders(strings.consent.intro, {
          privacypolicy: (
            <Link href="/privacy">{strings.entities.privacyPolicy}</Link>
          ),
        })}
      </p>
      <h2 className="serlo-h2">{strings.consent.revokeTitle}</h2>
      <p className="serlo-p">{strings.consent.revokeText}</p>
      <table className="serlo-table">
        <tbody>
          {consentedProviders.length > 0 ? renderTable() : renderEmpty()}
        </tbody>
      </table>
    </>
  )

  function renderEmpty() {
    return (
      <tr>
        <td className="serlo-td text-lg">
          <b>{strings.consent.noConsent}</b>
        </td>
      </tr>
    )
  }

  function renderTable() {
    return consentedProviders.map((provider) => {
      return (
        <tr key={provider}>
          <td className="serlo-td text-lg">
            <b>{provider}</b>
          </td>
          <td className="serlo-td text-lg">
            <button
              className="serlo-button serlo-make-interactive-light"
              onClick={() => {
                revokeConsent(provider)
                updateState({})
              }}
            >
              {strings.consent.revokeConsent}
            </button>
          </td>
        </tr>
      )
    })
  }
}
