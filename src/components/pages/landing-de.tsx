import clsx from 'clsx'
import styled from 'styled-components'

import { Link } from '../content/link'
import { HeadTags } from '../head-tags'
import { LandingAbout } from '@/components/landing/landing-about'
import { LandingSubjects } from '@/components/landing/landing-subjects'
import { InstanceLandingData } from '@/data-types'

export interface LandingDEProps {
  data: InstanceLandingData
}

export function LandingDE({ data }: LandingDEProps) {
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

const AboutSection = styled.section`
  margin-top: 50px;
  display: flex;
  flex-direction: column;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: row;
  }
`
