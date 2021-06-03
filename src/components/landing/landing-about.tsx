import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { makeResponsivePadding, makeTransparentButton } from '../../helper/css'
import { Link } from '../content/link'
import { PartnerList } from './partner-list'

export function LandingAbout() {
  return (
    <>
      <AboutCol>
        <PartnerList />
      </AboutCol>
      <TextCol>
        <p>
          Die <b>freie Lernplattform serlo.org</b> bietet:
        </p>
        <ul className="serlo-ul mx-0">
          <li className="serlo-li">einfache Erklärungen</li>
          <li className="serlo-li">Kurse</li>
          <li className="serlo-li">Lernvideos</li>
          <li className="serlo-li">
            tausende Übungsaufgaben mit Musterlösungen
          </li>
        </ul>
        <p>
          Wir ermöglichen Schüler*innen und Studierenden selbständig und im
          eigenen Tempo zu lernen – unabhängig von den finanziellen
          Möglichkeiten ihrer Eltern, denn serlo.org ist und bleibt{' '}
          <b>komplett kostenlos</b>.
        </p>
        <p>
          Unsere Vision ist es,{' '}
          <b>hochwertige Bildung weltweit frei verfügbar</b> zu machen.
        </p>
        <AboutButton href="/serlo">
          <>
            Mehr erfahren{' '}
            <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />
          </>
        </AboutButton>
      </TextCol>
    </>
  )
}

const TextCol = styled.div`
  min-height: 35vw;
  background-color: ${(props) => props.theme.colors.brand};
  font-size: 1.125rem;
  color: #fff;
  ${makeResponsivePadding}
  padding-top: 30px;
  padding-bottom: 45px;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
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

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
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

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    background-image: url('/_assets/img/serlo-learning-lg.jpg');
  }
`

const AboutButton = styled(Link)`
  ${makeTransparentButton}
  margin-left: -7px;
  margin-top: 10px;
  padding-top: 3px;
  padding-bottom: 3px;

  color: #fff;
  background-color: ${(props) => props.theme.colors.lightblue};

  &:hover {
    color: ${(props) => props.theme.colors.brand};
    background-color: #fff;
  }
`
