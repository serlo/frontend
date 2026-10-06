import { HeadTags } from '../head-tags'
import { CommunityWall } from '../landing/rework/community-wall/community-wall'
import { FooterNew } from '../landing/rework/footer-new'
import { LandingJsonLd } from '../landing/rework/landing-json-ld'
import { WelcomeMessage } from '../landing/rework/welcome-message'
import { Header } from '../navigation/header/header'
import { Quickbar } from '../navigation/quickbar'
import { Link } from '@/components/content/link'
import { LandingSubjectsNew } from '@/components/landing/rework/landing-subjects-new'
import { InstanceLandingData } from '@/data-types'
import { cn } from '@/helper/cn'
import { submitEvent } from '@/helper/submit-event'
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
        <section className="mx-auto mt-10 max-w-3xl px-side sm:mt-0">
          <p className="font-handwritten text-5xl leading-tight text-brand sm:text-7xl">
            <WelcomeMessage />
          </p>
          <h1 className="mb-6 mt-3 text-3xl font-normal sm:text-4xl">
            Was möchtest du lernen?
          </h1>
          <div className="mb-8 max-w-md [&_input]:border-black">
            <Quickbar placeholder="Mathe, Englisch, Deutsch" />
          </div>
        </section>

        <section className="mx-auto mb-10 max-w-3xl px-2 text-center font-bold">
          <p className="text-3xl leading-cozy">
            Hier auf Serlo findest du{' '}
            <b className="tracking-tight">einfache Erklärungen,</b> ausgewählte{' '}
            <b className="tracking-tight">Lernvideos</b> und interaktive{' '}
            <b className="tracking-tight">Übungsaufgaben</b> mit Musterlösungen.
          </p>
        </section>

        <section className="bg-cw-green px-side py-8 text-lg leading-relaxed text-black">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6">
              Huch, hier sieht es anders aus?! Das liegt daran, dass Chancenwerk
              und Serlo nun eins sind. Chancenwerk e.V. führt die Plattform
              Serlo weiter, damit gute Bildung auch in Zukunft für alle frei
              zugänglich bleibt! 🥳
            </p>
            <p>
              Für dich ändert sich nichts: Alle gewohnten Lernmaterialien und
              Erklärungen bleiben weiterhin kostenlos verfügbar. Zudem binden
              wir Schritt für Schritt auch die Lerninhalte von Chancenwerk ein.
              Das Einzige, was sich sonst anpasst, ist der Look: In den nächsten
              Wochen bekommt die Seite nach und nach ein neues Design.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <Link
            onClick={() => submitEvent('oam-banner-click-landing')}
            href="/mathe-pruefungen"
            className="group mb-10 block bg-newgreen bg-opacity-20 p-3 text-lg text-black hover:!no-underline mobile:text-center sm:py-4 md:text-[22px] lg:mb-0"
          >
            🎓 Ui, schon Prüfungszeit?{' '}
            <b className="serlo-link group-hover:underline">
              Hier geht&apos;s zur Mathe-Prüfungsvorbereitung
            </b>
            .
          </Link>
          <LandingSubjectsNew data={subjectsData} />
        </section>

        <section className="mt-20 bg-cw-green px-side py-16 text-center text-black">
          <p className="mx-auto mb-8 max-w-2xl text-2xl leading-snug sm:text-3xl">
            Unsere Lernplattform wird von dem gemeinnützigen Verein Chancenwerk
            e.V. weiterentwickelt. Sie ist komplett kostenlos, werbefrei und
            frei lizenziert.
          </p>
          <p className="mb-10">
            <span className="serlo-underlined pb-2 font-handwritten text-5xl text-brand">
              Für immer!
            </span>
          </p>
          <Link
            className="serlo-new-landing-button inline !font-normal !text-white"
            href="https://www.chancenwerk.de"
            noExternalIcon
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

        <section className="mb-20 mt-20 bg-cw-green px-side py-16 text-center text-black">
          <h3 className="mb-10 text-3xl font-normal">Förderpartner:innen</h3>
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-16 gap-y-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/_assets/img/landing/partner-deloitte.png"
              alt="Deloitte"
              className="h-auto w-64"
            />
            {/* Platzhalter, bis das Fidelity-Logo geklärt ist (PDF S. 10) */}
            <span className="text-5xl">Fidelity</span>
          </div>
        </section>
      </main>
      <FooterNew />
      <style jsx>{`
        {/* :global(body) {
          margin-top: 40px;
        } */}
        /* special donation button on landing */
        :global(.navtrigger[href='/spenden']) {
          display: none;
        }
      `}</style>
    </>
  )
}
