import {
  faChevronUp,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { footerNavEntries } from '../../data/footer'
import { makeResponsivePadding, makeDefaultButton } from '../../helper/css'
import { FooterNav } from './footer-nav'

export function Footer() {
  return (
    <>
      <About />
      <FooterNav navEntries={footerNavEntries} />
    </>
  )
}

function About() {
  return (
    <AboutContainer>
      <LogoContainer>
        <TopButton onClick={() => window.scrollTo(0, 0)} title="Nach oben">
          <FontAwesomeIcon icon={faChevronUp} size="lg" />
        </TopButton>
      </LogoContainer>
      <InfoContainer>
        <Summary>
          <SummaryHeading>
            <SerloLink href="/">Serlo.org</SerloLink> ist die Wikipedia fürs
            Lernen
          </SummaryHeading>
          <SummaryText>
            Wir sind eine engagierte Gemeinschaft, die daran arbeitet,
            hochwertige Bildung weltweit frei verfügbar zu machen.
          </SummaryText>
          <SummaryButtonBox>
            <SummaryButton href="/serlo">
              <FontAwesomeIcon icon={faChevronCircleRight} size="sm" /> Mehr
              Erfahren
            </SummaryButton>
          </SummaryButtonBox>
        </Summary>
        <Support>
          <ImageLink href="/mitmachen">
            <img
              alt="Icon: Participate"
              src="/_assets/img/footer-participate.svg"
            />
            <SupportButton>Mitmachen</SupportButton>
          </ImageLink>
          <ImageLink href="/spenden">
            <img alt="Icon: Spenden" src="/_assets/img/footer-donate.svg" />
            <SupportButton>Spenden</SupportButton>
          </ImageLink>
        </Support>
      </InfoContainer>
    </AboutContainer>
  )
}

const AboutContainer = styled.div`
  margin-top: 32px;
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`

const LogoContainer = styled.div`
  background-color: ${(props) => props.theme.colors.brand};
  position: relative;
  min-height: 54px;
  width: 100%;
`

const TopButton = styled.div`
  right: 16px;
  top: 7px;
  height: 40px;
  width: 40px;
  position: absolute;
  color: white;
  &:hover {
    background-color: ${(props) => props.theme.colors.lightblue};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  transition: background-color 0.2s;
  cursor: pointer;
`

const InfoContainer = styled.div`
  flex-shrink: 2;
  width: 100%;
`

const Summary = styled.div`
  background-color: ${(props) => props.theme.colors.lightblue};
  padding-top: 32px;
  padding-bottom: 16px;
  ${makeResponsivePadding}
  font-size: 18px;
  line-height: 24px;
  color: white;
`

const SummaryHeading = styled.div`
  font-weight: bold;
  margin-top: 4px;
  margin-bottom: 6px;
`

const SerloLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
  color: white;
  text-decoration: none;
`

const SummaryText = styled.div`
  margin: 16px 0;
`
const SummaryButtonBox = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`

const SummaryButton = styled.a`
  ${makeDefaultButton}
  color: #fff;
`

const Support = styled.div`
  background-color: ${(props) => props.theme.colors.brandGreen};
  display: flex;
  justify-content: space-around;
  padding-top: 16px;
  padding-bottom: 16px;
  color: white;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    justify-content: start;
  }
`

const ImageLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  > img {
    width: 60px;
  }
  cursor: pointer;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    &:first-child {
      ${makeResponsivePadding}
      margin-left: -6px;
    }
  }
`

const SupportButton = styled.div`
  margin-top: 3px;
  ${makeDefaultButton}
  color: #fff;
  ${ImageLink}:hover & {
    background-color: ${(props) => props.theme.colors.brand};
  }
  transition: background-color 0.2s;
`
