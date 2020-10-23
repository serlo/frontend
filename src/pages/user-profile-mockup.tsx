import { faPencilAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { Footer } from '@/components/navigation/footer'
import { Header } from '@/components/navigation/header'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { RelativeContainer } from '@/components/navigation/relative-container'
import {
  AbsoluteWrapper,
  BoxWrapper,
  IconButton,
} from '@/components/navigation/user-tools'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledH2 } from '@/components/tags/styled-h2'
import { StyledLi } from '@/components/tags/styled-li'
import { StyledP } from '@/components/tags/styled-p'
import { StyledUl } from '@/components/tags/styled-ul'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'
import { OriginProvider } from '@/contexts/origin-context'
import { instanceData } from '@/data/de'

function TestPage() {
  return (
    <>
      <OriginProvider value={null}>
        <InstanceDataProvider value={instanceData}>
          <LoggedInDataProvider value={null}>
            <Header />
            <RelativeContainer>
              <MaxWidthDiv showNav={false}>
                <main style={{ marginTop: 40 }}>
                  <Content />
                </main>
              </MaxWidthDiv>
            </RelativeContainer>
            <Footer />
          </LoggedInDataProvider>
        </InstanceDataProvider>
      </OriginProvider>
    </>
  )
}

function Content() {
  return (
    <>
      <HorizontalLine>
        <img
          style={{ width: 170, borderRadius: 85 }}
          src="https://assets.serlo.org/5996d7a3e84ff_7c59204083b1095e2995638232d83b0b608cb910.jpg"
        />
      </HorizontalLine>
      <StyledH1 style={{ textAlign: 'center' }}>Nish</StyledH1>
      <Badges>
        <img src="https://packages.serlo.org/serlo-org-static-assets@2/feature-prototypes/donation-profiles/reviewers.png" />
        <img src="https://packages.serlo.org/serlo-org-static-assets@2/feature-prototypes/donation-profiles/authors.png" />
        <img src="https://packages.serlo.org/serlo-org-static-assets@2/feature-prototypes/donation-profiles/donors.png" />
      </Badges>
      <StyledH2>Über mich</StyledH2>
      <StyledP>
        Ich heiße Nishanth (25) und bin seit meiner Teilnahme an der Summer
        Academy 2014 im Mathematik-Team von Serlo mit dabei. Meine Eltern kommen
        aus Sri Lanka. Ich bin aber in München geboren. Ich studiere Mathematik
        im Bachelor an der TU München.
      </StyledP>
      <StyledP>
        In meiner Freizeit gehe ich gerne Fussball spielen, unternehme was mit
        Freuden oder höre gerne Musik.
      </StyledP>
      <StyledH2>Motivation</StyledH2>
      <StyledP>
        Die Arbeit bei Serlo macht mir sehr viel Spaß! Ich lerne viel Neues
        durch meine Arbeit bei Serlo kennen und kann mein Know-How mit
        einbringen.
      </StyledP>
      <StyledP>
        Darüberhinaus habe ich nicht nur die Möglichkeit die verschiedenen
        Bereiche bei Serlo kennenzulernen, sondern auch gleich mitzugestalten.
        Man lernt voneinander und hat die Möglichkeit seine Soft Skills zu
        prüfen und zu verbessern! Das gesamte Serlo-Team ist einfach großartig!
        Die Menschen bei Serlo sind super nett, offen und aufgeschlossen. Es
        herrscht eine sehr angenehme, freundschaftliche, aber auch eine sehr
        produktive Arbeitsatmosphäre :)
      </StyledP>
      <StyledP>
        Außerdem möchte ich Serlo dabei unterstützen, in Deutschland und auf der
        Welt, mehr Chancengleichheit zu schaffen und demokratische Bildung zu
        fördern. Denn Bildung ist für jeden Menschen eine der wichtigsten
        Grundlagen, um das Leben so zu gestalten, wie man selbst möchte.
      </StyledP>
      <StyledP>
        Serlo ermöglicht jedem/-r SchülerIn durch die frei zugänglichen und
        kostenlosen Lernmaterialien selbstbestimmt und eigenverantwortlich zu
        lernen und dieses auch zu fördern. Es ist mir wichtig, dass Schüler, die
        Schwierigkeiten in einem Schulfach haben, in ihrem <b>eigenem Tempo</b>{' '}
        lernen und ihre Lücken v.a. <b>selbständig</b> schließen können. Dann
        habe ich hier noch die Möglichkeit, soweit mir mein Mathe-Studium es
        zulässt, meinem Spaß an der Mathematik an Schülern und andere
        weiterzugeben bzw. mit Ihnen zu teilen.
      </StyledP>
      <StyledH2>Mein Engagement auf serlo.org</StyledH2>
      <StyledUl>
        <StyledLi>
          Organisation des Zielgruppenkontakts: Wir holen Feedback zu den
          Mathematik-Inhalten und zur Usability der Lernseite an Schulen oder
          bei Nachmittagsbetreuungen in München ein, um den Mathebereich und die
          Lernseite weiter zu verbessern. Dabei zeigen wir diesen Schülern auch
          gleich, wie sie Serlo beim Lernen am Besten nutzen können.
        </StyledLi>
        <StyledLi>
          Community-Support: Überprüfen der neuen Bearbeitungen im Bereich
          Mathematik,Beantworten neuer Diskussionen
        </StyledLi>
        <StyledLi>
          inhaltliche/redaktionelle Arbeit im Mathe-Team (Artikel, Aufgaben oder
          Kurse schreiben und insbesondere vorhandene verbessern)
        </StyledLi>
      </StyledUl>
      <StyledH2>Statistiken</StyledH2>
      <ImageContent>
        <img src="/_assets/mvp-profile/statistik.png" />
      </ImageContent>
      <StyledH2>Aktivitäten</StyledH2>
      <ImageContent>
        <img src="/_assets/mvp-profile/aktivitaeten.png" />
      </ImageContent>
      <AbsoluteWrapper>
        <BoxWrapper>
          <IconButton href="#">
            <FontAwesomeIcon icon={faEnvelope} size="1x" /> Nachricht senden
          </IconButton>
          <IconButton href="#">
            <FontAwesomeIcon icon={faPencilAlt} size="1x" /> Profil bearbeiten
          </IconButton>
        </BoxWrapper>
      </AbsoluteWrapper>
    </>
  )
}

const HorizontalLine = styled.div`
  display: flex;
  flex-direction: row;

  &:before,
  &:after {
    content: '';
    flex: 1 1;
    border-bottom: 1px solid #000;
    margin: auto;
  }

  &:before {
    margin-right: 10px;
  }

  &:after {
    margin-left: 10px;
  }
`

const Badges = styled.div`
  text-align: center;

  img {
    width: 30px;
    display: inline-block;
    margin: 0 10px;
  }
`

const ImageContent = styled.div`
  text-align: center;

  img {
    max-width: 100%;
  }
`

export default TestPage
