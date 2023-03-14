import clsx from 'clsx'
import { GetStaticProps } from 'next'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { FooterNew } from '@/components/landing/rework/footer-new'
import { CommunityWallMitmachen } from '@/components/mitmachen/community-wall-mitmachen'
import { Header } from '@/components/navigation/header/header'
import { breakpoints } from '@/helper/breakpoints'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { serloDomain } from '@/helper/urls/serlo-domain'

export default renderedPageNoHooks(() => {
  return (
    <FrontendClientBase noContainers noHeaderFooter>
      <Content />
    </FrontendClientBase>
  )
})

function Content() {
  return (
    <>
      <Header />
      <main id="content" className="text-truegray-700"></main>
      <HeadTags
        data={{
          title: 'Mitmachen bei Serlo – Die freie Lernplattform',
          metaImage: `https://de.${serloDomain}/_assets/img/meta/community.png`,
        }}
      />

      <section className="text-center max-w-3xl mx-auto mt-20 md:mt-[11vh] px-2">
        <p className="text-brand font-handwritten text-3xl landing-button-with-wings landing-button-with-wink p-with-wink">
          Hilf anderen beim Lernen
        </p>
        <h1
          className={clsx(
            'text-center text-5xl font-extrabold',
            'tracking-tight',
            'max-w-2xl mt-3 mb-6 mx-auto'
          )}
        >
          Bei Serlo <span className="pb-2 underlined">mitmachen</span>!
        </h1>
      </section>

      <section className="mt-24 text-center px-side">
        <p className=" text-2xl leading-cozy text-truegray-700">
          Werde Teil der Serlo Community und gestalte kostenlose Lerninhalte für
          über eine Million Lernende!
        </p>
        <Link
          href="/auth/registration"
          className="serlo-new-landing-button inline-block landing-button-with-wings bg-brandgreen hover:bg-brandgreen-400  before:!mt-[-1.1rem] after:!mt-[-1.1rem] mt-5 rounded-full"
        >
          Jetzt Registrieren
        </Link>
      </section>

      <section
        className={clsx(
          'bg-orangeBow bg-100% px-4 mt-16 mb-20 !pt-16 pb-20 text-left'
        )}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl mt-4 font-extrabold tracking-tight">
            <span>Was gibt&apos;s zu tun?</span>
          </h2>

          <div className="sm:flex sm:gap-6">
            <div className="text-left mt-12">
              <b className="text-brand font-handwritten text-3xl block mb-2">
                Nach Fächern
              </b>
              <p className="text-xl leading-cozy text-truegray-700 max-w-xl mb-2">
                Du kannst in verschiedenen Fächern Lernmaterialien verbessern
                und neu erstellen. Such dir dein Lieblingsfach aus und erfahre,
                was es dort zu tun gibt.
              </p>
              <Link
                className="serlo-button-blue text-xl mr-4 mt-2"
                href="/19880/neu-hier"
              >
                Mathematik
              </Link>
              <Link
                className="serlo-button-blue text-xl mr-4 mt-2"
                href="/25017/neu-hier"
              >
                Nachhaltigkeit
              </Link>
              <Link
                className="serlo-button-blue text-xl mr-4 mt-2"
                href="/49982/neu-hier"
              >
                Biologie
              </Link>
              <Link
                className="serlo-button-blue text-xl mr-4 mt-2"
                href="/25294/neu-hier"
              >
                Chemie
              </Link>
              <Link
                className="serlo-button-blue text-xl mr-4 mt-2"
                href="/26633/neu-hier"
              >
                Informatik
              </Link>
              <Link
                className="serlo-button-blue text-xl mr-4 mt-2"
                href="/253504"
              >
                Fächer im Aufbau
              </Link>
            </div>

            <div className="text-left mt-12 h-auto flex flex-col">
              <b className="text-brand font-handwritten text-3xl block mb-2">
                Schreibe Kommentare
              </b>
              <p className="text-xl leading-cozy text-truegray-700 max-w-xl">
                Alle Lerninhalte kannst du kommentieren. Unterstütze so
                Schüler*innen bei ihren Fragen, gib Feedback oder diskutiere mit
                Communitymitgliedern über ihre Verbesserungsvorschläge.
              </p>
              <Link
                className="serlo-button-blue text-xl mt-4 sm:mt-auto w-fit"
                href="/discussions"
              >
                Neueste Kommentare
              </Link>
            </div>

            <div className="text-left mt-12 sm:h-auto sm:flex sm:flex-col">
              <b className="text-brand font-handwritten text-3xl block mb-2">
                Überprüfe Bearbeitungen
              </b>
              <p className="text-xl leading-cozy text-truegray-700 max-w-xl">
                Jede deiner Bearbeitungen wird nochmals überprüft, bevor sie für
                alle sichtbar wird. Dies machen erfahrene Communitymitglieder,
                sogenannte Reviewer*innen. Schau dir hier an, welche neuen
                Bearbeitungen es gerade gibt.
              </p>
              <Link
                className="serlo-button-blue text-xl mt-4 w-fit"
                href="/entity/unrevised"
              >
                Jetzt überprüfen
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24 text-left max-w-6xl mx-auto mb-12 px-side">
        <h2 className="text-3xl mt-4 font-extrabold tracking-tight">
          <span>Zusammenarbeit</span>
        </h2>

        <div className="sm:flex sm:gap-6">
          <div className="text-left mt-12 sm:flex-1">
            <b className="text-brand font-handwritten text-3xl block mb-2">
              Communitychat
            </b>
            <p className="text-xl leading-cozy text-truegray-700 max-w-xl">
              Im Serlo Communitychat kannst du dich mit anderen austauschen, die
              serlo.org mitgestalten und verbessern. Dort kannst du auch deine
              Fragen stellen und Probleme melden.
            </p>
            <Link
              className="serlo-button-light text-xl mt-2 justify-end"
              href="https://community.serlo.org/channel/general"
            >
              Zum Community-Chat
            </Link>
          </div>

          <div className="text-left  mt-12 sm:flex-1">
            <b className="text-brand font-handwritten text-3xl block mb-2">
              Veranstaltungen
            </b>
            <img
              src="https://assets.serlo.org/a1754820-7ae9-11ed-9a2b-2f02b04c9535/community.png"
              alt="REPLACE"
            />
            <Link
              className="serlo-button-light text-xl mt-2"
              href="/community/145470/veranstaltungs%C3%BCbersicht"
            >
              Treffe uns virtuell oder vor Ort!
            </Link>
          </div>

          <div className="text-left  mt-12 sm:flex-1">
            <b className="text-brand font-handwritten text-3xl block mb-2">
              Hilfe
            </b>
            <img
              src="https://assets.serlo.org/823a3770-7aeb-11ed-9a2b-2f02b04c9535/community.png"
              alt="REPLACE"
            />
            <Link
              className="serlo-button-light text-xl mt-2"
              href="/discussions"
            >
              Zum Hilfebereich
            </Link>
          </div>
        </div>
      </section>

      <section className="text-center bg-blueWave bg-100% pt-4 pb-12">
        <CommunityWallMitmachen />
      </section>

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

export const getStaticProps: GetStaticProps<{}> = async (context) => {
  if (context.locale !== 'de') return { notFound: true }
  return { props: {} }
}
