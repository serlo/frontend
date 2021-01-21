import React from 'react'
import styled from 'styled-components'

import { HSpace } from '@/components/content/h-space'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeaderFooter } from '@/components/header-footer'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { RelativeContainer } from '@/components/navigation/relative-container'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledH2 } from '@/components/tags/styled-h2'
import { StyledP } from '@/components/tags/styled-p'
import { StyledTable } from '@/components/tags/styled-table'
import { StyledTd } from '@/components/tags/styled-td'
import { StyledTr } from '@/components/tags/styled-tr'
import { makeLightButton } from '@/helper/css'
import { ExternalProvider, useConsent } from '@/helper/use-consent'

export default function Page() {
  const { checkConsent, revokeConsent } = useConsent()
  const [, updateState] = React.useState({})

  const consentedProviders = Object.values(
    ExternalProvider
  ).filter((provider) => checkConsent(provider))

  return (
    <FrontendClientBase>
      <RelativeContainer>
        <HeaderFooter>
          <MaxWidthDiv>
            <HSpace amount={100} />
            <StyledH1>Einwilligungen für Services</StyledH1>

            <StyledP>
              Während dem Benutzen der Seite hast du uns vielleicht erlaubt,
              dass wir Inhalte von externen Anbietern laden. Die Details kannst
              du in unserer <a href="/privacy">Datenschutzerklärung</a>{' '}
              nachlesen.
            </StyledP>
            <StyledH2>Widerrufen</StyledH2>
            <StyledP>
              Hier hast du die Möglichkeit mit einem Klick deine Einwilligung
              zurückzuziehen.
              <br />
              In dem Fall fragen wir wieder nach, bevor wir etwas laden.
            </StyledP>
            <StyledTable>
              <tbody>
                {consentedProviders.length > 0 ? renderTable() : renderEmpty()}
              </tbody>
            </StyledTable>
          </MaxWidthDiv>
        </HeaderFooter>
      </RelativeContainer>
    </FrontendClientBase>
  )

  function renderEmpty() {
    return (
      <StyledTr>
        <_StyledTd>
          <b>Keine Einwilligungen gespeichert</b>
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
              Nicht mehr erlauben
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
