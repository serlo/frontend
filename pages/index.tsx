import styled from 'styled-components'
import React from 'react'
import Header from '../src/header'
import WipHint from '../src/content-api/wiphint'
import Footer from '../src/footer'
import {
  DummyContainer,
  StyledP,
  StyledUl,
  StyledA,
  StyledLi,
  ArticleHeading,
  HSpace
} from '../src/visuals'

function Index() {
  return (
    <>
      <Header />
      <DummyContainer>
        <WipHint part="Startseite" />
        <ArticleHeading>Startseite</ArticleHeading>
        <StyledP halfslim>Links:</StyledP>
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
      </DummyContainer>
      <Footer />
    </>
  )
}

export default Index
