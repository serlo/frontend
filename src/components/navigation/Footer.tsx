import styled from 'styled-components'
import { transparentize, lighten } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronUp,
  faChevronCircleRight
} from '@fortawesome/free-solid-svg-icons'

import { footerNavEntries } from '../../footerdata'
import { FooterNav } from './FooterNav'
import { makeResponsivePadding } from '../../helper/csshelper'

export default function Footer() {
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
            <SerloLink href="#">Serlo.org</SerloLink> ist die Wikipedia fürs
            Lernen
          </SummaryHeading>
          <SummaryText>
            Wir sind eine engagierte Gemeinschaft, die daran arbeitet,
            hochwertige Bildung weltweit frei verfügbar zu machen.
          </SummaryText>
          <SummaryButtonBox>
            <SummaryButton>
              <FontAwesomeIcon icon={faChevronCircleRight} size="sm" /> Mehr
              Erfahren
            </SummaryButton>
          </SummaryButtonBox>
        </Summary>
        <Support>
          <ImageLink>
            <img alt="Icon: Participate" src={'/img/footer_participate.svg'} />
            <SupportButton>Mitmachen</SupportButton>
          </ImageLink>
          <ImageLink>
            <img alt="Icon: Spenden" src={'/img/footer_donate.svg'} />
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
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`

const LogoContainer = styled.div`
  background-color: ${props => props.theme.colors.brand};
  position: relative;
  min-height: 54px;
  width: 100%;
`

const Subline = styled.p`
  margin-left: 55px;
  color: ${transparentize(0.6, 'white')};
  font-size: 1.66rem;
  a {
    color: inherit;
    text-decoration: none;
  }
  &:hover {
    color: white;
  }
`

const Image = styled.img`
  width: 144px;
  padding-left: 12px;
  padding-top: 32px;
`

const TopButton = styled.div`
  right: 16px;
  top: 7px;
  height: 40px;
  width: 40px;
  position: absolute;
  color: white;
  &:hover {
    background-color: ${props => props.theme.colors.lightblue};
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
  background-color: ${props => props.theme.colors.lightblue};
  padding: 32px 0 16px;
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
    background-color: ${props => props.theme.colors.brand};
  }
  border-radius: 4px;
  color: white;
  text-decoration: none;
  padding: 2px;
`

const SummaryText = styled.div`
  margin: 16px 0;
`
const SummaryButtonBox = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`

const SummaryButton = styled.button`
  border-radius: 80px;
  padding: 3px 6px;
  border: none;
  background-color: transparent;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  &:hover {
    background-color: ${props => props.theme.colors.brand};
  }
  cursor: pointer;
`

const Support = styled.div`
  background-color: ${props => props.theme.colors.brandGreen};
  display: flex;
  justify-content: space-around;
  padding-top: 16px;
  padding-bottom: 16px;
  color: white;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: start;
  }
`

const ImageLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  > img {
    width: 60px;
  }
  cursor: pointer;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    &:first-child {
      ${makeResponsivePadding}
      margin-left: -6px;
    }
  }
`

const SupportButton = styled.div`
  margin-top: 3px;
  border-radius: 80px;
  padding: 6px 6px;
  ${ImageLink}:hover & {
    background-color: ${props => props.theme.colors.brand};
  }
  transition: background-color 0.2s;
`
