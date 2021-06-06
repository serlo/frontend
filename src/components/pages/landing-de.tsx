import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { Link } from '../content/link'
import { HeadTags } from '../head-tags'
import { PrinciplesGraphic } from '../landing/principles-graphic'
import DonateSVG from '@/assets-webkit/img/footer-donate.svg'
import ParticipateSVG from '@/assets-webkit/img/footer-participate.svg'
import { LandingAbout } from '@/components/landing/landing-about'
import { LandingSubjects } from '@/components/landing/landing-subjects'
import { InstanceLandingData } from '@/data-types'
import { makeLightButton, makeResponsivePadding } from '@/helper/css'
import clsx from 'clsx'

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

      <div
        className={clsx(
          'text-center mt-40 text-4xl text-truegray-700 font-bold',
          'leading-normal'
        )}
      >
        <p>Wir sind eine große, ehrenamtliche</p>
        <p>Community und gestalten Serlo</p>
        <p className="text-brand italic">gemeinsam.</p>
      </div>

      <div className="my-12 text-center">
        <Link href="/mitmachen">
          <a
            className={clsx(
              'text-white font-bold text-xl bg-brand rounded',
              'px-8 py-4'
            )}
          >
            Magst du mitmachen?
          </a>
        </Link>
      </div>

      <div className="mb-60">
        <div className="relative w-0 mx-auto" style={{ height: '700px' }}>
          {renderPerson('menuja', 'Autorin', -200, 60)}
          {renderPerson('LinaMaria', 'Spenderin', 200, 90)}
          {renderPerson('Wolfgang', 'Botschaftler', -700, -140)}
          {renderPerson('wanda', 'Autorin', 600, -110)}
          {renderPerson('kathongi', 'Autorin', -550, 250)}
        </div>
      </div>

      <div className="mt-36">
        <img src="/_assets/img/crosses.png" className="mx-auto" />
      </div>

      <div
        className={clsx(
          'text-center mt-4 text-4xl text-truegray-700 font-bold',
          'leading-normal mb-40'
        )}
      >
        <p>Zusammen setzen wir uns dafür ein, dass</p>
        <p>gute Bildung nicht abhängig vom</p>
        <p>Geldbeutel der Eltern ist.</p>
      </div>
    </>
  )

  function renderPerson(
    name: string,
    role: string,
    posx: number,
    posy: number
  ) {
    return (
      <div
        style={{ left: `${posx}px`, top: `${posy}px` }}
        className="absolute w-52 text-center"
      >
        <img
          src={`https://community.serlo.org/avatar/${name}`}
          className="rounded-full w-full"
        />
        <p className="text-lg mt-3 font-bold text-gray-700">@{name}</p>
        <p className={clsx('text-white text-lg font-bold mt-3')}>
          <span className="px-2 py-1 bg-yellow-500 rounded-2xl">{role}</span>
        </p>
      </div>
    )
  }
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

const FlexCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${Button} {
    margin-top: auto;
  }

  margin-bottom: 60px;
`
