import { cn } from '@serlo/tailwind/helper/cn'

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
        <section className="mx-auto mt-20 max-w-3xl px-2 text-center font-bold md:mt-[11vh]">
          <p className="serlo-add-eyebrows font-handwritten text-3xl text-brand">
            <WelcomeMessage />
          </p>
          <h1
            className={cn(`
              mx-auto mb-6 mt-3 max-w-2xl
              text-center text-5xl font-extrabold tracking-tight
            `)}
          >
            Was möchtest du{' '}
            <span className="serlo-underlined pb-2">lernen ?</span>
          </h1>
          <div className="mx-auto mb-8 mt-10 max-w-2xl text-left font-normal">
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
          className={cn(`
            about mt-7
            text-center text-4xl font-bold
            tracking-tight
          `)}
        >
          <p className="mx-auto mb-8 max-w-2xl px-2">
            Unsere Lernplattform wird von einem gemeinnützigen Verein
            entwickelt. Sie ist komplett{' '}
            <b className="font-extrabold">
              kostenlos, werbefrei und{' '}
              <span className="whitespace-nowrap">frei lizenziert</span>
            </b>
            .{' '}
            <span className="serlo-underlined font-handwritten text-[1.2em] text-brand">
              Für immer!
            </span>
          </p>
          <p className="mx-auto mb-8 max-w-2xl px-2">
            Monatlich nutzen rund eine Million Schüler*innen und Lehrkräfte
            Serlo.
          </p>
          <Link
            className="serlo-new-landing-button serlo-button-with-wings inline"
            href="/serlo"
          >
            Mehr über uns
          </Link>
        </section>

        <CommunityWall />

        <section className="mx-side mb-20 mt-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/_assets/img/landing/birds.svg" className="mx-auto" />
          <h3
            className={cn(`
              mx-auto mt-7 max-w-2xl
              hyphens-auto text-center text-4xl
              font-bold leading-cozy tracking-tight
            `)}
          >
            Zusammen setzen wir uns für mehr Bildungsgerechtigkeit und die
            digitale Transformation unserer Schulen ein.
          </h3>
        </section>

        <section className="bg-blueWave bg-100% pt-4 text-center">
          <h3
            className={cn(`
              relative z-10 mx-auto
              mb-16 mt-32
              max-w-2xl text-center text-4xl font-bold leading-cozy tracking-tight
            `)}
          >
            Partner und Förderer
          </h3>
          <PartnerList />
          <Link
            className={cn(`
              serlo-button-with-eyebrows mx-auto mt-12 hidden
              rounded-lg border-2 border-solid border-almost-black
              px-8 py-4 text-xl font-bold tracking-tight text-almost-black
              hover:border-brand-500 hover:text-brand-500 hover:no-underline
              md:inline-block
            `)}
            href="/partner"
          >
            Alle Partner ansehen
          </Link>
        </section>
      </main>
      <FooterNew />
      <style jsx>{`
        /* special donation button on landing */
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
          background-size:
            200%,
            100vw 100%;
        }

        @media (min-width: ${breakpoints.sm}) {
          .about {
            padding-top: 11rem;
            padding-bottom: 9rem;
            background-position: 20% 19%;
            background-size:
              82%,
              100vw 100%;
          }
        }
      `}</style>
    </>
  )
}
