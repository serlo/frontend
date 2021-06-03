import { useState } from 'react'

import { PageTitle } from '../content/page-title'
import { StyledP } from '@/components/tags/styled-p'
import { StyledTd } from '@/components/tags/styled-td'
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

      <StyledP>
        {replacePlaceholders(strings.consent.intro, {
          privacypolicy: (
            <a className="serlo-link" href="/privacy">
              {strings.entities.privacyPolicy}
            </a>
          ),
        })}
      </StyledP>
      <h2 className="serlo-h2">{strings.consent.revokeTitle}</h2>
      <StyledP>{strings.consent.revokeText}</StyledP>
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
        <StyledTd className="text-lg">
          <b>{strings.consent.noConsent}</b>
        </StyledTd>
      </tr>
    )
  }

  function renderTable() {
    return consentedProviders.map((provider) => {
      return (
        <tr key={provider}>
          <StyledTd className="text-lg">
            <b>{provider}</b>
          </StyledTd>
          <StyledTd className="text-lg">
            <button
              className="serlo-button serlo-make-interactive-light"
              onClick={() => {
                revokeConsent(provider)
                updateState({})
              }}
            >
              {strings.consent.revokeConsent}
            </button>
          </StyledTd>
        </tr>
      )
    })
  }
}
