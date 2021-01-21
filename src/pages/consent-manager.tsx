import React from 'react'
import styled from 'styled-components'

import { HSpace } from '@/components/content/h-space'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeaderFooter } from '@/components/header-footer'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { RelativeContainer } from '@/components/navigation/relative-container'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledTable } from '@/components/tags/styled-table'
import { StyledTd } from '@/components/tags/styled-td'
import { StyledTr } from '@/components/tags/styled-tr'
import { makeLightButton } from '@/helper/css'
import { ExternalProvider, useConsent } from '@/helper/use-consent'

export default function Page() {
  const { checkConsent, revokeConsent } = useConsent()
  const [, updateState] = React.useState({})

  return (
    <FrontendClientBase>
      <RelativeContainer>
        <HeaderFooter>
          <MaxWidthDiv>
            <HSpace amount={100} />
            <StyledH1>Consent options</StyledH1>

            <StyledTable>
              <tbody>
                {Object.values(ExternalProvider).map((provider) => {
                  const consent = checkConsent(provider)
                  if (!consent) return null
                  return (
                    <StyledTr key={provider}>
                      <StyledTd>{provider}</StyledTd>
                      <StyledTd>
                        <Button
                          onClick={() => {
                            revokeConsent(provider)
                            updateState({})
                          }}
                        >
                          revoke
                        </Button>
                      </StyledTd>
                    </StyledTr>
                  )
                })}
              </tbody>
            </StyledTable>
          </MaxWidthDiv>
        </HeaderFooter>
      </RelativeContainer>
    </FrontendClientBase>
  )
}

const Button = styled.button`
  ${makeLightButton};
`
