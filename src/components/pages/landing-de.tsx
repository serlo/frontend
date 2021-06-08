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

  const persons = [
    { name: 'menuja', role: 'Autorin', pos: [-200, 60] },
    { name: 'LinaMaria', role: 'Spenderin', pos: [200, 90] },
    { name: 'Wolfgang', role: 'Botschaftler', pos: [-700, -140] },
    { name: 'wanda', role: 'Autorin', pos: [600, -110] },
    { name: 'kathongi', role: 'Redaktion', pos: [-550, 250] },
    { name: 'inyono', role: 'Entwickler', pos: [-250, 450] },
    { name: 'nish', role: 'Support', pos: [-250, 450] },
  ]

  return (
    <div className="overflow-hidden">
      <HeadTags data={{ title: 'Serlo – Die freie Lernplattform' }} />
      <SubjectsSection>
        <LandingSubjects data={subjectsData} />
      </SubjectsSection>

      <AboutSection>
        <LandingAbout />
      </AboutSection>

      <section>
        <h3
          className={clsx(
            'text-center text-4xl text-truegray-700 font-bold',
            'leading-cozy tracking-tight',
            'max-w-2xl mt-40 mx-auto'
          )}
        >
          Wir sind eine große, ehrenamtliche Community und gestalten Serlo
          <span className="serlo-landing-circled-and-arrow text-brand italic block">
            gemeinsam.
          </span>
        </h3>

        <div className="mt-16 mb-12 text-center">
          <Link
            className={clsx(
              'text-white font-bold text-xl bg-brand rounded',
              'px-8 py-4 tracking-tight',
              'hover:serlo-landing-underlined hover:bg-brand-light hover:no-underline'
            )}
            href="/mitmachen"
          >
            Magst du mitmachen?
          </Link>
        </div>

        <div className="mb-60 bg-truegray-50">
          <div className="flex flex-wrap justify-evenly">{renderPersons()}</div>
        </div>
      </section>

      <section className="mt-36 mb-20">
        <img src="/_assets/img/landing/birds.svg" className="mx-auto" />

        <h3
          className={clsx(
            'text-center text-4xl text-truegray-700 font-bold',
            'leading-cozy tracking-tight',
            'max-w-2xl mt-7 mx-auto'
          )}
        >
          Zusammen setzen wir uns dafür ein, dass gute Bildung nicht abhängig
          vom Geldbeutel der Eltern ist.
        </h3>
      </section>
    </div>
  )

  function renderPersons() {
    return persons
      .sort(() => 0.5 - Math.random())
      .map(({ name, role }, index) => {
        const lineBreak = index === 1 || index === 6
        return (
          <>
            <div
              key={name}
              className="mt-12 mx-1 text-center sm:!w-40"
              style={{ width: '24vw' }}
            >
              <img
                src={`https://community.serlo.org/avatar/${name}`}
                className="rounded-full w-full"
              />
              <p className="text-lg mt-3 font-bold text-gray-700">@{name}</p>
              <p className={clsx('text-white text-lg font-bold mt-3')}>
                <span className="px-2 py-1 bg-yellow-500 rounded-2xl">
                  {role}
                </span>
              </p>
            </div>
            {lineBreak && (
              <div
                className="sm:hidden"
                style={{ height: '0', flexBasis: '100%' }}
              ></div>
            )}
          </>
        )
      })
  }
  /*
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
  } */
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
