import styled from 'styled-components'
import {
  makeResponsivePadding,
  makeDefaultButton
} from '../../helper/csshelper'
import StyledUl from '../tags/StyledUl'
import PartnerList from './PartnerList'
import StyledLi from '../tags/StyledLi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

export default function LandingAbout() {
  return (
    <>
      <AboutCol>
        <PartnerList />
      </AboutCol>
      <TextCol>
        <p>
          Die <b>freie Lernplattform serlo.org</b> bietet:
        </p>
        <StyledUl fullWidth>
          <StyledLi>einfache Erklärungen</StyledLi>
          <StyledLi>Kurse</StyledLi>
          <StyledLi>Lernvideos</StyledLi>
          <StyledLi>tausende Übungsaufgaben mit Musterlösungen</StyledLi>
        </StyledUl>
        <p>
          Wir ermöglichen SchülerInnen und Studierenden selbständig und im
          eigenen Tempo zu lernen – unabhängig von den finanziellen
          Möglichkeiten ihrer Eltern, denn serlo.org ist und bleibt{' '}
          <b>komplett kostenlos</b>.
        </p>
        <p>
          Unsere Vision ist es,{' '}
          <b>hochwertige Bildung weltweit frei verfügbar</b> zu machen.
        </p>
        <AboutButton href={'/serlo'}>
          Mehr erfahren <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
        </AboutButton>
      </TextCol>
    </>
  )
}

const TextCol = styled.div`
  min-height: 35vw;
  background-color: ${props => props.theme.colors.brand};
  font-size: 1.125rem;
  color: #fff;
  ${makeResponsivePadding}
  padding-top: 30px;
  padding-bottom: 45px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    /* should be same ratio as footer, for some reason that's not working as expected, so this is good enough for now: */
    width: 100%;
    ${makeResponsivePadding}
    padding-top: 45px;
    padding-bottom: 60px;
    flex-shrink: 2;
  }
`

const AboutCol = styled.div`
  display: none;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    min-height: 450px;
    width: 100%;
    background-repeat: no-repeat;
    background-position-y: 100%;
    background-size: cover;
    background-image: url('/_assets/img/serlo-learning-md.jpg');
    color: #fff;
    ${makeResponsivePadding}
    display: flex;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    background-image: url('/_assets/img/serlo-learning-lg.jpg');
  }
`

const AboutButton = styled.a`
  ${makeDefaultButton}
  margin-left: -7px;
  margin-top: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  color: #fff;
  font-weight: bold;
  background-color: ${props => props.theme.colors.lightblue};

  &:hover {
    color: ${props => props.theme.colors.brand};
    background-color: #fff;
  }
`

const PartnerWrap = styled.div`
  margin-top: auto;
  margin-bottom: 30px;
  width: 100%;
`

const StyledH2 = styled.h2`
  font-weight: 400;
  font-size: 1.125rem;
  margin-bottom: 20px;
`

const PartnerLogos = styled.div`
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`

const PartnerLogo = styled.img`
  max-height: 40px;
`
