import clsx from 'clsx'
import Head from 'next/head'
import { Fragment } from 'react'
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
    { name: 'menuja', role: 'Autorin' },
    { name: 'LinaMaria', role: 'Spenderin' },
    { name: 'Wolfgang', role: 'Botschaftler' },
    { name: 'wanda', role: 'Autorin' },
    { name: 'kathongi', role: 'Redaktion' },
    { name: 'inyono', role: 'Entwickler' },
    { name: 'nish', role: 'Support' },
    { name: 'ole', role: 'Sanitär' },
    { name: 'dal', role: 'Entwickler' },
    { name: 'jakobwes', role: 'Autor' },
  ]

  const positions = [
    ['8%', '-5%'],
    ['80%', '2%'],
    ['38%', '12%'],
    ['60%', '18%'],
    ['19%', '36%'],
    ['49%', '59%'],
    ['75%', '48%'],
    ['4%', '74%'],
    ['30%', '84%'],
    ['65%', '89%'],
  ]

  return (
    <div className="overflow-hidden">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat"
          rel="stylesheet"
        />
      </Head>
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
            'max-w-2xl mt-40 mx-auto relative z-10'
          )}
        >
          Wir sind eine große, ehrenamtliche Community und gestalten Serlo
          <p className="text-brand italic font-handwritten">gemeinsam.</p>
        </h3>
        <div className="relative z-0 h-0 w-full mt-1">
          <div
            className={clsx(
              'absolute inset-0 -mt-14 h-32 ml-5',
              'bg-circled-and-arrow bg-no-repeat bg-top bg-contain'
            )}
          ></div>
        </div>

        <div className="mt-16 z-10 flex justify-center relative">
          <div className="group text-center">
            <Link
              className={clsx(
                'text-white font-bold text-xl bg-brand rounded',
                'px-8 py-4 tracking-tight',
                'group-hover:bg-brand-light hover:no-underline'
              )}
              href="/mitmachen"
            >
              Magst du mitmachen?
            </Link>
            <div className="relative">
              <div className="absolute flex justify-center inset-0">
                <div
                  className={clsx(
                    'pointer-events-none select-none w-72 h-5 mt-6',
                    'group-hover:opacity-100 opacity-0 group-hover:transform group-hover:rotate-1',
                    'transition-all ease-linear duration-200',
                    'bg-underlined bg-contain bg-no-repeat bg-top'
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <PersonsWrap className="mb-52 flex flex-wrap justify-evenly md:relative md:block md:h-3/5">
          {renderPersons()}
        </PersonsWrap>
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
    // const randomPositions = positions.sort(() => 0.5 - Math.random()) // good enough
    return persons.map(({ name, role }, index) => {
      const lineBreak = index === 1 || index === 6
      const pos = positions[index]
      return (
        <Fragment key={name}>
          <PersonWrap
            className="mt-12 mx-1 text-center md:serlo-landing-wiggle"
            style={{ left: pos[0], top: pos[1] }}
          >
            <Link className="hover:no-underline" href={`/user/profile/${name}`}>
              <img
                src={`https://community.serlo.org/avatar/${name}`}
                className="rounded-full w-full"
              />
              <p className="text-base mt-2 mb-2 font-bold text-gray-700">
                @{name}
              </p>
              <span className="text-white text-base font-bold px-2 py-1 bg-yellow-500 rounded-2xl">
                {role}
              </span>
            </Link>
          </PersonWrap>
          {lineBreak && (
            <div
              className="md:hidden"
              style={{ height: '0', flexBasis: '100%' }}
            ></div>
          )}
        </Fragment>
      )
    })
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

const PersonsWrap = styled.div`
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    height: 630px;
    margin-bottom: 290px;
  }
`

const PersonWrap = styled.div`
  width: 24vw;
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    width: 12vw;
    position: absolute;
  }
`
