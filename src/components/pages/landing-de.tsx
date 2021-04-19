import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { Link } from '../content/link'
import { HeadTags } from '../head-tags'
import { PrinciplesGraphic } from '../landing/principles-graphic'
import { StyledP } from '../tags/styled-p'
import DonateSVG from '@/assets-webkit/img/footer-donate.svg'
import ParticipateSVG from '@/assets-webkit/img/footer-participate.svg'
import { LandingAbout } from '@/components/landing/landing-about'
import { LandingSubjects } from '@/components/landing/landing-subjects'
import { InstanceLandingData } from '@/data-types'
import { makeLightButton, makeResponsivePadding } from '@/helper/css'

export interface LandingDEProps {
  data: InstanceLandingData
}

export function LandingDE({ data }: LandingDEProps) {
  const landingStrings = data.strings
  const subjectsData = data.subjectsData

  return (
    <>
      <HeadTags data={{ title: 'Serlo – Die freie Lernplattform' }} />
      <SubjectsSection>
        <LandingSubjects data={subjectsData} />
      </SubjectsSection>

      <AboutSection>
        <LandingAbout />
      </AboutSection>

      <Section>
        <StyledH2>Serlo.org ist die Wikipedia fürs Lernen</StyledH2>
        <IconStyle>
          <ParticipateSVG />
        </IconStyle>
        <FlexCol>
          <LandingP>
            Wir suchen Lehrkräfte mit Begeisterung für ihr Fach. Werden Sie
            Autor*in auf serlo.org, erstellen Sie <b>neue Inhalte</b> und helfen
            Sie uns, die <b>Qualität</b> der Lernplattform zu sichern.
          </LandingP>
          <Button href="/community">
            Zur Startseite für Autor*innen{' '}
            <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
          </Button>
        </FlexCol>
        <FlexCol>
          <LandingP>
            Wir suchen neue hauptamtliche und ehrenamtliche Teammitglieder für
            die Bereiche <b>Softwareentwicklung</b>, <b>Redaktion</b> und{' '}
            <b>NGO-Management</b>.
          </LandingP>
          <Button href="/jobs">
            Jobs und Engagement{' '}
            <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
          </Button>
        </FlexCol>
      </Section>

      <PrinciplesSection>
        <PrinciplesGraphic strings={landingStrings} />
      </PrinciplesSection>

      <Section>
        <StyledH2>Werden Sie Teil unserer Bewegung für freie Bildung</StyledH2>
        <IconStyle>
          <DonateSVG />
        </IconStyle>
        <FlexCol>
          <LandingP>
            Bildung gehört uns allen! Werden Sie Mitglied in unserer
            Organisation Serlo Education e.V. und so zu Mitherausgeber*in der
            freien Lernplattform.
          </LandingP>
          <Button href="/beitreten">
            Mitglied werden{' '}
            <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
          </Button>
        </FlexCol>
        <FlexCol>
          <LandingP>
            Softwareentwicklung und Lerninhalte erstellen kostet Geld. Wir
            freuen uns sehr, wenn Sie Serlo mit einer Spende unterstützen.
          </LandingP>
          <Button href="/spenden">
            Spenden <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
          </Button>
        </FlexCol>
      </Section>
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
  font-weight: bold;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
`

const Button = styled(Link)`
  ${makeLightButton}
  margin-left: -3px;
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

const LandingP = styled(StyledP)`
  margin-left: 0;
`

const FlexCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${Button} {
    margin-top: auto;
  }

  margin-bottom: 60px;
`
