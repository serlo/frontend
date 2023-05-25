import clsx from 'clsx'

import { HeadTags } from '../head-tags'
import { CommunityWall } from '../landing/rework/community-wall/community-wall'
import { FooterNew } from '../landing/rework/footer-new'
import { LandingJsonLd } from '../landing/rework/landing-json-ld'
import { PartnerList } from '../landing/rework/partner-list'
import { WelcomeMessage } from '../landing/rework/welcome-message'
import { Header } from '../navigation/header/header'
import { Quickbar } from '../navigation/quickbar'
import { Link } from '@/components/content/link'
import { LandingSubjectsNew } from '@/components/landing/rework/landing-subjects-new'
import { InstanceLandingData } from '@/data-types'
import { breakpoints } from '@/helper/breakpoints'
import { serloDomain } from '@/helper/urls/serlo-domain'

export interface LandingDEProps {
  data: InstanceLandingData
}

export function LandingDE({ data }: LandingDEProps) {
  const subjectsData = data.subjectsData

  return (
    <>
      <HeadTags
        data={{
          title: 'Serlo – Die freie Lernplattform',
          metaImage: `https://de.${serloDomain}/_assets/img/meta/landing.png`,
        }}
      />
      <LandingJsonLd />
      <Header />
      <main id="content" className="text-almost-black">
        <section className="text-center max-w-3xl mx-auto mt-20 md:mt-[11vh] font-bold px-2">
          <p className="text-brand font-handwritten text-3xl serlo-add-eyebrows">
            <WelcomeMessage />
          </p>
          <h1
            className={clsx(
              'text-center text-5xl font-extrabold',
              'tracking-tight',
              'max-w-2xl mt-3 mb-6 mx-auto'
            )}
          >
            Was möchtest du{' '}
            <span className="pb-2 serlo-underlined">lernen ?</span>
          </h1>
          <div className="mt-10 mb-8 text-left font-normal max-w-2xl mx-auto">
            <Quickbar />
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

        <section
          className={clsx(
            'text-center text-4xl',
            'tracking-tight font-bold mt-7',
            'about'
          )}
        >
          <p className="mb-8 max-w-2xl px-2 mx-auto">
            Unsere Lernplattform wird von einem gemeinnützigen Verein
            entwickelt. Sie ist komplett{' '}
            <b className="font-extrabold">
              kostenlos, werbefrei und{' '}
              <span className="whitespace-nowrap">frei lizenziert</span>
            </b>
            .{' '}
            <span
              className="font-handwritten text-brand serlo-underlined"
              style={{ fontSize: '1.2em' }}
            >
              Für immer!
            </span>
          </p>
          <p className="mb-8 max-w-2xl px-2 mx-auto">
            Jeden Monat nutzen über eine Million Schüler*innen und Lehrkräfte
            Serlo.
          </p>
          <Link
            className="serlo-new-landing-button inline serlo-button-with-wings"
            href="/serlo"
          >
            Mehr über uns
          </Link>
        </section>

        <CommunityWall />

        <section className="mt-20 mb-20 mx-side">
          <img src="/_assets/img/landing/birds.svg" className="mx-auto" />
          <h3
            style={{ hyphens: 'auto' }}
            className={clsx(
              'text-center text-4xl font-bold',
              'leading-cozy tracking-tight',
              'max-w-2xl mt-7 mx-auto'
            )}
          >
            Zusammen setzen wir uns für mehr Bildungsgerechtigkeit und die
            digitale Transformation unserer Schulen ein.
          </h3>
        </section>

        <section className="text-center bg-blueWave bg-100% pt-4">
          <h3
            className={clsx(
              'text-center text-4xl font-bold',
              'leading-cozy tracking-tight',
              'max-w-2xl mt-32 mx-auto relative z-10 mb-16'
            )}
          >
            Partner und Förderer
          </h3>
          <PartnerList />
          <Link
            className={clsx(
              'hidden md:inline-block mx-auto mt-12',
              'font-bold text-xl rounded-lg text-almost-black ',
              'px-8 py-4 tracking-tight border-almost-black border-solid border-2',
              'hover:border-brand-500 hover:no-underline hover:text-brand-500',
              'serlo-button-with-eyebrows'
            )}
            href="/partner"
          >
            Alle Partner ansehen
          </Link>
        </section>
      </main>
      <FooterNew />
      <style jsx>{`
        // special donation button on landing
        :global(.navtrigger[href='/spenden']) {
          display: none;
        }
        .about {
          padding-top: 7rem;
          padding-bottom: 5rem;
          margin: 6rem 0 0 0;
          background-image: url('/_assets/img/landing/about-big-arrow.svg'),
            url('/_assets/img/landing/about-container.svg');
          background-repeat: no-repeat, no-repeat;
          background-position: 77% 12%;
          background-size: 200%, 100vw 100%;
        }

        @media (min-width: ${breakpoints.sm}) {
          .about {
            padding-top: 11rem;
            padding-bottom: 9rem;
            background-position: 20% 19%;
            background-size: 82%, 100vw 100%;
          }
        }
      `}</style>
    </>
  )
}
