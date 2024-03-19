import { useEffect, useState } from 'react'

import { Link } from '../content/link'
import { PageTitle } from '../content/page-title'
import { useInstanceData } from '@/contexts/instance-context'
import { isProduction } from '@/helper/is-production'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { ExternalProvider, useConsent } from '@/helper/use-consent'

export function ConsentPage() {
  const { checkConsent, revokeConsent } = useConsent()
  const [mounted, setMounted] = useState(false)
  const [, updateState] = useState({})
  const { strings } = useInstanceData()

  useEffect(() => setMounted(true), [])

  const consentedProviders = Object.values(ExternalProvider)

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
      {mounted ? (
        <table className="serlo-table border-l-3 border-t-3 border-brand-200">
          <tbody>{renderTable()}</tbody>
        </table>
      ) : (
        '…'
      )}
    </>
  )

  function renderTable() {
    return consentedProviders
      .filter((provider) =>
        isProduction ? provider !== ExternalProvider.Vocaroo : true
      )
      .map((provider) => {
        return (
          <tr key={provider}>
            <td className="serlo-td text-lg">
              <b>{provider}</b>
            </td>
            <td className="serlo-td text-lg">
              {checkConsent(provider) ? (
                <button
                  className="serlo-button-light"
                  onClick={() => {
                    revokeConsent(provider)
                    updateState({})
                  }}
                >
                  {strings.consent.revokeConsent}
                </button>
              ) : (
                <span className="ml-1 text-gray-600">
                  ({strings.consent.noConsent})
                </span>
              )}
            </td>
          </tr>
        )
      })
  }
}
