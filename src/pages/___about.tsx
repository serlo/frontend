import React from 'react'

import { ImgCentered } from '@/components/content/img-centered'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeaderFooter } from '@/components/header-footer'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { RelativeContainer } from '@/components/navigation/relative-container'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledImg } from '@/components/tags/styled-img'
import { StyledP } from '@/components/tags/styled-p'

export default function About() {
  return (
    <FrontendClientBase>
      <HeaderFooter>
        <RelativeContainer>
          <MaxWidthDiv>
            <StyledH1>Infos zu den Daten</StyledH1>
            <StyledP>
              Hier sind die Analytics-Daten vom 1. Januar bis 15. Januar 2021
              dargestellt.
            </StyledP>
            <ImgCentered>
              <StyledImg src="https://user-images.githubusercontent.com/13507950/105002079-047b0300-5a31-11eb-958f-9df89fa5b5e9.png" />
            </ImgCentered>
            <StyledP>
              Auf jeder Seite wird die Anzahl der Aufrufe angezeigt - und
              außerdem woher die Aufrufe kommen. Externe Aufrufe kommen z.B. von
              Google oder einer Verlinkung.
            </StyledP>
            <StyledP>
              Bei den Aufrufen findet sich außerdem bei den Fragezeichen noch
              die Top 5 Seiten, die auf die aktuelle Seite zeigen.
            </StyledP>
            <ImgCentered>
              <StyledImg src="https://user-images.githubusercontent.com/13507950/105002340-63407c80-5a31-11eb-9941-9c13c71412d5.png" />
            </ImgCentered>
            <StyledP>
              Außerdem wird bei jedem Link angezeigt in Klammern angezeigt, wie
              viele Aufrufe von der aktuellen Seite zur Zielseite zeigen. Damit
              kann die Anzahl der Klicks des Links auf dieser Seite geschätzt
              werden.
            </StyledP>
            <StyledP>
              Hinweis: Die Daten sind momentan noch ein bisschen unscharf, weil
              die Datengrundlage noch Großteils aus dem alten Design stammen.
            </StyledP>
          </MaxWidthDiv>
        </RelativeContainer>
      </HeaderFooter>
    </FrontendClientBase>
  )
}
