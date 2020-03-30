import React from 'react'

import Header from '../src/components/navigation/Header'
import WipHint from '../src/components/WipHint'
import Footer from '../src/components/navigation/Footer'
import { StyledP } from '../src/components/tags/StyledP'
import { StyledMain } from '../src/components/tags/StyledMain'
import { StyledH1 } from '../src/components/tags/StyledH1'
import { StyledUl } from '../src/components/tags/StyledUl'
import { StyledLi } from '../src/components/tags/StyledLi'
import { StyledA } from '../src/components/tags/StyledA'
import { HSpace } from '../src/components/content/HSpace'

function Index() {
  return (
    <>
      <Header />
      <StyledMain>
        <WipHint part="Startseite" />
        <StyledH1>Startseite</StyledH1>
        <StyledP mb={'slim'}>Links:</StyledP>
        <StyledUl>
          <StyledLi>
            <StyledA href="/mathe">Mathematik lernen</StyledA>
          </StyledLi>
          <StyledLi>
            <StyledA href="/abc">
              Alphabetisierung für NeusprachlerInnen
            </StyledA>
          </StyledLi>
          <StyledLi>
            <StyledA href="/nachhaltigkeit">Nachhaltigkeit lernen</StyledA>
          </StyledLi>
          <StyledLi>
            <StyledA href="/biologie">Biologie lernen</StyledA>
          </StyledLi>
          <StyledLi>
            <StyledA href="/eltern">Einstieg für Eltern</StyledA>
          </StyledLi>
          <StyledLi>
            <StyledA href="/lehrkraefte">Einstieg für LehrerInnen</StyledA>
          </StyledLi>
          <StyledLi>
            <StyledA href="/jobs">Jobs und Engagement</StyledA>
          </StyledLi>
        </StyledUl>
        <HSpace />
      </StyledMain>
      <Footer />
    </>
  )
}

export default Index
