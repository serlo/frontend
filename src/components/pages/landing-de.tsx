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
import { tw } from '@/helper/tw'
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
          <p className="landing-button-with-wings landing-button-with-wink p-with-wink font-handwritten text-3xl text-brand">
            <WelcomeMessage />
          </p>
          <h1
            className={tw`
              mx-auto mt-3 mb-6 max-w-2xl
              text-center text-5xl font-extrabold tracking-tight
            `}
          >
            Was möchtest du <span className="underlined pb-2">lernen ?</span>
          </h1>
          <div className="mx-auto mt-10 mb-8 max-w-2xl text-left font-normal">
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
          className={tw`
            about mt-7
            text-center text-4xl font-bold
            tracking-tight
          `}
        >
          <p className="mx-auto mb-8 max-w-2xl px-2">
            Unsere Lernplattform wird von einem gemeinnützigen Verein
            entwickelt. Sie ist komplett{' '}
            <b className="font-extrabold">
              kostenlos, werbefrei und{' '}
              <span className="whitespace-nowrap">frei lizenziert</span>
            </b>
            .{' '}
            <span
              className="underlined font-handwritten text-brand"
              style={{ fontSize: '1.2em' }}
            >
              Für immer!
            </span>
          </p>
          <p className="mx-auto mb-8 max-w-2xl px-2">
            Jeden Monat nutzen über eine Million Schüler*innen und Lehrkräfte
            Serlo.
          </p>
          <Link
            className="landing-button-with-wings serlo-new-landing-button inline"
            href="/serlo"
          >
            Mehr über uns
          </Link>
        </section>

        <CommunityWall />

        <section className="mx-side mt-20 mb-20">
          <img src="/_assets/img/landing/birds.svg" className="mx-auto" />
          <h3
            style={{ hyphens: 'auto' }}
            className={tw`
              mx-auto mt-7 max-w-2xl
              text-center text-4xl
              font-bold leading-cozy tracking-tight
            `}
          >
            Zusammen setzen wir uns für mehr Bildungsgerechtigkeit und die
            digitale Transformation unserer Schulen ein.
          </h3>
        </section>

        <section className="bg-blueWave bg-100% pt-4 text-center">
          <h3
            className={tw`
              relative z-10 mx-auto
              mt-32 mb-16
              max-w-2xl text-center text-4xl font-bold leading-cozy tracking-tight
            `}
          >
            Partner und Förderer
          </h3>
          <PartnerList />
          <Link
            className={tw`
              landing-button-with-wings landing-button-with-wink mx-auto mt-12
              hidden rounded-lg border-2 border-solid 
              border-almost-black px-8 py-4 text-xl font-bold tracking-tight
              text-almost-black hover:border-brand-500 hover:text-brand-500
              hover:no-underline md:inline-block
            `}
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

        @font-face {
          font-family: 'Karmilla';
          font-style: bolder;
          font-weight: 800;
          src: url('/_assets/fonts/karmilla/karmilla-bolder.woff2')
              format('woff2'),
            url('/_assets/fonts/karmilla/karmilla-bold.woff') format('woff');
          font-display: swap;
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

        .underlined {
          padding-right: 1rem;
          white-space: nowrap;
          background: url('/_assets/img/landing/simple-underline.svg') no-repeat
            bottom;
        }

        :global(.landing-button-with-wings):after,
        :global(.landing-button-with-wings):before {
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

        :global(.landing-button-with-wings):after {
          margin-left: 1rem;
          transform: scaleX(-1);
        }

        :global(.landing-button-with-wings):before {
          margin-left: -5rem;
        }

        :global(.landing-button-with-wings):hover:after,
        :global(.landing-button-with-wings):hover:before {
          opacity: 1;
        }

        :global(.landing-button-with-wink):after,
        :global(.landing-button-with-wink):before {
          background: url('/_assets/img/landing/wink-left.svg') no-repeat !important;
          margin-top: -2rem !important;
          background-size: 65% !important;
        }

        .p-with-wink:after,
        .p-with-wink:before {
          margin-top: -1rem !important;
          background-size: 75%;
          width: 2.5rem;
          height: 2.5rem;
          opacity: 1;
        }

        .p-with-wink:after {
          margin-left: -0.5rem;
        }

        .p-with-wink:before {
          margin-left: -1.5rem;
        }
      `}</style>
    </>
  )
}
