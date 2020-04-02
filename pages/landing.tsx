import Header from '../src/components/navigation/Header'
import LandingSubjects from '../src/components/landing/LandingSubjects'
import LandingAbout from '../src/components/landing/LandingAbout'
import Footer from '../src/components/navigation/Footer'
import styled from 'styled-components'
import { StyledH2 } from '../src/components/tags/StyledH2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import {
  makeDefaultButton,
  makeResponsivePadding
} from '../src/helper/csshelper'
import PrinciplesSVG from '../public/img/landing_principles_graphic.svg'
import DonateSVG from '../public/img/footer_donate.svg'
import ParticipateSVG from '../public/img/footer_participate.svg'

// import CloseSVG from '../public/img/serlo-logo.svg'
export default function Landing(props) {
  const { data } = props
  return (
    <>
      <Header />
      <RelatveContainer>
        <Section>
          <LandingSubjects />
        </Section>

        <AboutSection>
          <LandingAbout />
        </AboutSection>

        <Section>
          <_StyledH2>Serlo.org ist die Wikipedia fürs Lernen</_StyledH2>
          <img
            src="https://packages.serlo.org/serlo-org-static-assets@1/home/participate.svg"
            alt="together"
          />
          <p>
            Wir suchen LehrerInnen mit Begeisterung für ihr Fach. Werden Sie
            AutorIn auf serlo.org, erstellen Sie <b>neue Inhalte</b> und helfen
            Sie uns, die <b>Qualität</b> der Lernplattform zu sichern.
          </p>
          <Button href="/community">
            Zur Startseite für AutorInnen{' '}
            <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
          </Button>

          <p>
            Wir suchen neue hauptamtliche und ehrenamtliche Teammitglieder für
            die Bereiche <b>Softwareentwicklung</b>, <b>Redaktion</b> und{' '}
            <b>NGO-Management</b>.
          </p>
          <Button href="/jobs">
            Jobs und Engagement{' '}
            <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
          </Button>
        </Section>

        <PrinciplesSection>
          <PrinciplesSVG />
        </PrinciplesSection>

        <Section>
          <_StyledH2>
            Werden Sie Teil unserer Bewegung für freie Bildung
          </_StyledH2>
          <DonateIcon />
          <p>
            Bildung gehört uns allen! Werden Sie Mitglied in unserer
            Organisation Serlo Education e.V. und so zu MitherausgeberIn der
            freien Lernplattform.
          </p>
          <Button href="/beitreten">
            Mitglied werden{' '}
            <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
          </Button>

          <p>
            Softwareentwicklung und Lerninhalte erstellen kostet Geld. Wir
            freuen uns sehr, wenn Sie Serlo mit einer Spende unterstützen.
          </p>
          <Button href="/spenden">
            spenden <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
          </Button>
        </Section>
      </RelatveContainer>
      <Footer />
    </>
  )
}

const RelatveContainer = styled.div`
  position: relative;
`

const Section = styled.section``

const AboutSection = styled.section`
  margin-top: 50px;
  display: flex;
  flex-direction: column;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: row;
  }
`
const _StyledH2 = styled(StyledH2)`
  color: ${props => props.theme.colors.brand};
  border: 0;
`

const Button = styled.a`
  ${makeDefaultButton}
  font-weight: bold;
  padding-top: 3px;
  padding-top: 3px;
  background-color: ${props => props.theme.colors.lightBlueBackground};
`
const PrinciplesSection = styled.section`
  background-color: ${props => props.theme.colors.brand};
  text-align: center;
  ${makeResponsivePadding}
  padding-top: 70px;
  padding-bottom: 70px;

  > svg {
    height: 450px;
    width: 100%;
  }
`

const DonateIcon = styled(DonateSVG)`
  > path {
    fill: ${props => props.theme.colors.brandGreen};
  }
  width: 120px;
`
