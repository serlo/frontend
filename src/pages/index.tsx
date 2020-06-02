import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'

import Header from '@/components/navigation/Header'
import LandingSubjects from '@/components/landing/LandingSubjects'
import LandingAbout from '@/components/landing/LandingAbout'
import Footer from '@/components/navigation/Footer'

import { makeDefaultButton, makeResponsivePadding } from '@/helper/csshelper'

import PrinciplesSVG from '../public/_assets/img/landing-principles-graphic.svg'
import DonateSVG from '../public/_assets/img/footer-donate.svg'
import ParticipateSVG from '../public/_assets/img/footer-participate.svg'
import CookieBar from '@/components/content/CookieBar'

export default function Landing() {
  return (
    <>
      <Head>
        <title>Serlo.org - Die freie Lernplattform</title>
      </Head>
      <Header />
      <SubjectsSection>
        <LandingSubjects />
      </SubjectsSection>

      <AboutSection>
        <LandingAbout />
      </AboutSection>

      <Section>
        <StyledH2>Serlo.org ist die Wikipedia fürs Lernen</StyledH2>
        <IconStyle>
          <ParticipateSVG />
        </IconStyle>
        <Col>
          <p>
            Wir suchen LehrerInnen mit Begeisterung für ihr Fach. Werden Sie
            AutorIn auf serlo.org, erstellen Sie <b>neue Inhalte</b> und helfen
            Sie uns, die <b>Qualität</b> der Lernplattform zu sichern.
          </p>
          <Button href="/community">
            Zur Startseite für AutorInnen{' '}
            <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
          </Button>
        </Col>
        <Col>
          <p>
            Wir suchen neue hauptamtliche und ehrenamtliche Teammitglieder für
            die Bereiche <b>Softwareentwicklung</b>, <b>Redaktion</b> und{' '}
            <b>NGO-Management</b>.
          </p>
          <Button href="/jobs">
            Jobs und Engagement{' '}
            <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
          </Button>
        </Col>
      </Section>

      <PrinciplesSection>
        <PrinciplesSVG />
      </PrinciplesSection>

      <Section>
        <StyledH2>Werden Sie Teil unserer Bewegung für freie Bildung</StyledH2>
        <IconStyle>
          <DonateSVG />
        </IconStyle>
        <Col>
          <p>
            Bildung gehört uns allen! Werden Sie Mitglied in unserer
            Organisation Serlo Education e.V. und so zu MitherausgeberIn der
            freien Lernplattform.
          </p>
          <Button href="/beitreten">
            Mitglied werden{' '}
            <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
          </Button>
        </Col>
        <Col>
          <p>
            Softwareentwicklung und Lerninhalte erstellen kostet Geld. Wir
            freuen uns sehr, wenn Sie Serlo mit einer Spende unterstützen.
          </p>
          <Button href="/spenden">
            Spenden <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
          </Button>
        </Col>
      </Section>
      <Footer />
      <CookieBar />
    </>
  )
}

const SubjectsSection = styled.section``

const Section = styled.section`
  margin-top: 60px;
  margin-bottom: 60px;
  ${makeResponsivePadding}

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
`

const Col = styled.div`
  margin-top: 40px;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    margin-top: 0;
    margin-right: 30px;
    flex: 1;

    & > p {
      min-height: 80px;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    margin-right: 50px;
  }
`

const AboutSection = styled.section`
  margin-top: 50px;
  display: flex;
  flex-direction: column;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: row;
  }
`

const StyledH2 = styled.h2`
  font-size: 1.66rem;
  color: ${(props) => props.theme.colors.brand};
  border: 0;
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;
  }
`

const Button = styled.a`
  ${makeDefaultButton}
  margin-left: -3px;
  font-weight: bold;
  padding-top: 3px;
  padding-top: 3px;
  background-color: ${(props) => props.theme.colors.lightBlueBackground};
`

const PrinciplesSection = styled.section`
  background-color: ${(props) => props.theme.colors.brand};
  text-align: center;
  ${makeResponsivePadding}
  padding-top: 70px;
  padding-bottom: 70px;

  & > svg {
    height: 450px;
    width: 100%;
    font-family: inherit;
  }
`

const IconStyle = styled.div`
  & > path,
  & .st0 {
    fill: ${(props) => props.theme.colors.brandGreen};
  }
  width: 100px;
  margin-right: 30px;
  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    margin-right: 50px;
    width: 120px;
  }
`
