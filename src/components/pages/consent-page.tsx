import { useState } from 'react'
import styled from 'styled-components'

import { PageTitle } from '../content/page-title'
import { StyledA } from '../tags/styled-a'
import { StyledH2 } from '@/components/tags/styled-h2'
import { StyledP } from '@/components/tags/styled-p'
import { StyledTable } from '@/components/tags/styled-table'
import { StyledTd } from '@/components/tags/styled-td'
import { StyledTr } from '@/components/tags/styled-tr'
import { useInstanceData } from '@/contexts/instance-context'
import { makeLightButton } from '@/helper/css'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { ExternalProvider, useConsent } from '@/helper/use-consent'

export function ConsentPage() {
  const { checkConsent, revokeConsent } = useConsent()
  const [, updateState] = useState({})
  const { strings } = useInstanceData()

  const consentedProviders = Object.values(
    ExternalProvider
  ).filter((provider) => checkConsent(provider))

  return (
    <>
      <PageTitle title={strings.consent.title} headTitle />

      <StyledP>
        {replacePlaceholders(strings.consent.intro, {
          privacypolicy: (
            <StyledA href="/privacy">{strings.entities.privacyPolicy}</StyledA>
          ),
        })}
      </StyledP>
      <StyledH2>{strings.consent.revokeTitle}</StyledH2>
      <StyledP>{strings.consent.revokeText}</StyledP>
      <StyledTable>
        <tbody>
          {consentedProviders.length > 0 ? renderTable() : renderEmpty()}
        </tbody>
      </StyledTable>
    </>
  )

  function renderEmpty() {
    return (
      <StyledTr>
        <_StyledTd>
          <b>{strings.consent.noConsent}</b>
        </_StyledTd>
      </StyledTr>
    )
  }

  function renderTable() {
    return consentedProviders.map((provider) => {
      return (
        <StyledTr key={provider}>
          <_StyledTd>
            <b>{provider}</b>
          </_StyledTd>
          <_StyledTd>
            <Button
              onClick={() => {
                revokeConsent(provider)
                updateState({})
              }}
            >
              {strings.consent.revokeConsent}
            </Button>
          </_StyledTd>
        </StyledTr>
      )
    })
  }
}

const Button = styled.button`
  ${makeLightButton};
`

const _StyledTd = styled(StyledTd)`
  font-size: 1.125rem;
`
