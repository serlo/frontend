import clsx from 'clsx'
import Head from 'next/head'
import styled from 'styled-components'

import { HeadTags } from '../head-tags'
import { CommunityWall } from '../landing/rework/community-wall'
import { FooterNew } from '../landing/rework/footer-new'
import { HeaderNew } from '../landing/rework/header-new'
import { PartnerListNew } from '../landing/rework/partner-list-new'
import { Link } from '@/components/content/link'
import { LandingSubjectsNew } from '@/components/landing/rework/landing-subjects-new'
import { SearchInputNew } from '@/components/landing/rework/search-input-new'
import { Separator } from '@/components/landing/rework/separator'
import { InstanceLandingData } from '@/data-types'

export interface LandingDEProps {
  data: InstanceLandingData
}

export function LandingDE({ data }: LandingDEProps) {
  const subjectsData = data.subjectsData

  return (
    <>
      <Head>
        <link href="_assets/landing-fonts.css" rel="stylesheet" />
      </Head>
      <HeadTags data={{ title: 'Serlo – Die freie Lernplattform' }} />

      <section className="text-center max-w-3xl mx-auto mt-20 font-bold">
        <PWithWink
          as="p"
          className="text-brand italic font-handwritten text-3xl"
        >
          Schön dich heute zu sehen.
        </PWithWink>
        <h1
          className={clsx(
            'text-center text-5xl font-extrabold text-truegray-700',
            'tracking-tight',
            'max-w-2xl mt-3 mb-6 mx-auto'
          )}
        >
          Was möchtest du <Underlined className="pb-2">Lernen ?</Underlined>
        </h1>
        <div className="md:hidden mt-10 mb-8">
          <SearchInputNew />
        </div>
        <p className="text-3xl leading-cozy">
          Hier auf Serlo findest du{' '}
          <b className="tracking-tight">einfache Erklärungen,</b> ausgewählte{' '}
          <b className="tracking-tight">Lernvideos</b> und interaktive{' '}
          <b className="tracking-tight">Übungsaufgaben</b> mit Musterlösungen.
        </p>
      </section>

      <section className="mt-10">
        <LandingSubjectsNew data={subjectsData} />
      </section>

      <AboutSection>
        <div
          className={clsx(
            'text-center text-4xl text-truegray-700',
            'tracking-tight font-bold',
            'max-w-2xl mt-7 mx-auto'
          )}
        >
          <p className="mb-8">
            Unsere Lernplattform ist gemeinnützig und damit komplett kostenlos,
            werbefrei und frei lizenziert.{' '}
            <Underlined
              className="font-handwritten text-brand"
              style={{ fontSize: '1.2em' }}
            >
              Für immer!
            </Underlined>
          </p>
          <p className="font-extrabold mb-8">
            Jeden Monat lernen über 1.5 Millionen Schüler*innen und Lehrkräfte
            gemeinsam mit Serlo.
          </p>
          <ButtonWithWings
            className={clsx(
              'text-white font-bold text-xl bg-brand rounded-lg',
              'px-8 py-4 tracking-tight',
              'hover:bg-brand-light hover:no-underline'
            )}
            href="/serlo"
          >
            Mehr über uns
          </ButtonWithWings>
        </div>
      </AboutSection>

      <CommunityWall />

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

      <PartnerSection className="text-center">
        <h3
          className={clsx(
            'text-center text-4xl text-truegray-700 font-bold',
            'leading-cozy tracking-tight',
            'max-w-2xl mt-32 mx-auto relative z-10 mb-16'
          )}
        >
          Partner und Förderer
        </h3>
        <PartnerListNew />
        <ButtonWithWink
          className={clsx(
            'hidden md:inline-block mx-auto',
            'text-truegray-700 font-bold text-xl rounded-lg',
            'px-8 py-4 tracking-tight border-truegray-700 border-solid border-2',
            'hover:border-brand-light hover:no-underline hover:text-brand-light'
          )}
          href="/partner"
        >
          Alle Förderer ansehen
        </ButtonWithWink>
        <Separator />
      </PartnerSection>

      <FooterNew />
    </>
  )
}

const AboutSection = styled.section`
  padding-top: 11rem;
  padding-bottom: 9rem;
  margin: 6rem 0 0 0;
  background-image: url('/_assets/img/landing/about-big-arrow.svg'),
    url('/_assets/img/landing/about-container.svg');
  background-position: 20% 19%;
  background-repeat: no-repeat, no-repeat;
  background-size: 82%, 100vw 100%;
`

const Underlined = styled.i`
  padding-right: 1rem;
  background: url('/_assets/img/landing/simple-underline.svg') no-repeat bottom;
`

const ButtonWithWings = styled(Link)`
  &:after,
  &:before {
    content: ' ';
    background: url('/_assets/img/landing/wing-left.svg') no-repeat;
    position: absolute;
    margin-top: -0.6rem;
    width: 4rem;
    height: 4rem;
    pointer-events: none;
    opacity: 0;
    transition: opacity ease-in 0.2s;
  }

  &:after {
    margin-left: 1rem;
    transform: scaleX(-1);
  }

  &:before {
    margin-left: -5rem;
  }

  &:hover {
    &:after,
    &:before {
      opacity: 1;
    }
  }
`

const ButtonWithWink = styled(ButtonWithWings)`
  &:after,
  &:before {
    background: url('/_assets/img/landing/wink-left.svg') no-repeat;
    margin-top: -2rem;
    background-size: 65%;
  }
`

const PWithWink = styled(ButtonWithWink)`
  &:after,
  &:before {
    margin-top: -1rem;
    background-size: 75%;
    width: 2.5rem;
    height: 2.5rem;
    opacity: 1;
  }
  &:after {
    margin-left: -0.5rem;
  }
  &:before {
    margin-left: -1.5rem;
  }
`

const PartnerSection = styled.footer`
  padding-top: 1rem;
  background: url('/_assets/img/landing/footer-container.svg') no-repeat;
  background-size: 100% 100%;
`
