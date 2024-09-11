import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import dynamic from 'next/dynamic'

import { EditorContact } from '../editor-contact'
import { EditorFeatures } from '../editor-features'
import { EditorPartnerList, partners } from '../editor-partner-list'
import { EditorRoadmap } from '../editor-roadmap'
import { EditorTeam, teamDataVicky } from '../editor-team'
import { Lazy } from '@/components/content/lazy'
import { Link } from '@/components/content/link'
import { HeadTags } from '@/components/head-tags'
import { Logo } from '@/components/navigation/header/logo'
import { breakpoints } from '@/helper/breakpoints'
import { cn } from '@/helper/cn'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'

const EducationPlugins = dynamic(() =>
  import('../education-plugins').then((mod) => mod.EducationPlugins)
)
const h2Class =
  'text-center text-4xl leading-cozy tracking-tight font-extrabold'
const h3Class = 'text-gray-700 text-[1.3rem] font-extrabold'

export function EditorPresentationDe() {
  editorRenderers.init(createRenderers())

  const title =
    'Serlo Editor: Intuitive Erstellung von digitalen Lernressourcen'
  return (
    <>
      <HeadTags data={{ title }} />
      <header className="px-side pb-8 pt-6 lg:px-side-lg">
        <Logo />
        {renderSupporterLogos()}
      </header>

      <div
        className={cn(`
          -mt-12 text-gray-700
          sm:text-center md:relative
          md:left-[calc(-50vw+50%)] md:ml-0
          md:text-left
        `)}
      >
        <section className="mt-20 px-4 text-center font-bold">
          <h1
            className={cn(`
              mx-auto mt-3
              text-5xl font-extrabold
              leading-tight tracking-tight
            `)}
          >
            <span className="serlo-underlined !pr-0 pb-2">Serlo Editor</span>
          </h1>
        </section>

        <section className="mx-auto mb-16 mt-16 max-w-5xl px-4 text-left">
          <div className="sm:flex sm:justify-between">
            <div className="pr-2 text-xl leading-cozy sm:mx-auto sm:max-w-[31rem]">
              <h2 className={cn(h3Class, 'tracking-tight')}>
                <br />
                Intuitive Erstellung von digitalen Lernressourcen
              </h2>
              <p className="mt-4">
                Mit dem Serlo Editor können Lehrkräfte{' '}
                <b className="tracking-tight">
                  multimediale und interaktive digitale Lernmaterialien
                </b>{' '}
                einfach und intuitiv erstellen. Per Drag & Drop kannst Du
                Inhaltselemente einfach dorthin ziehen, wo Du sie benötigst und
                alles direkt wie in Google Docs bearbeiten.
              </p>
              <p className="mt-4">
                Aufgrund der{' '}
                <b className="tracking-tight">flexiblen Plugin-Architektur</b>{' '}
                kann unser <b className="tracking-tight">Open Source</b> Serlo
                Editor an dein LMS angepasst werden.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20 mt-0 bg-orangeBow bg-100% px-2 !pt-16">
          <div className="mx-auto mt-2 max-w-4xl px-4 pb-16 text-center text-xl sm:flex sm:gap-1">
            <div className="mt-5 flex-1">
              <b className="font-handwritten text-4xl text-brand">20,000+</b>
              <br />
              Lernmaterialien wurden bisher mit dem Serlo Editor erstellt
            </div>
            <div className="mt-5 flex-1">
              <b className="font-handwritten text-4xl text-brand">750 000+</b>
              <br />
              Schüler*innen und Lehrkräfte nutzen jeden Monat Serlo Editor
              Inhalte.
            </div>
            <div className="mt-5 flex-1">
              <b className="font-handwritten text-4xl text-brand">500+</b>
              <br />
              Autor*innen haben bisher den Editor genutzt, um freie
              Lernmaterialien (OER) zu erstellen
            </div>
          </div>
        </section>

        <section className="-mb-6 px-4">
          <div className="mx-auto mb-28 max-w-7xl">
            <Lazy>
              <EducationPlugins />
            </Lazy>
          </div>
        </section>

        <section className="mb-20 mt-12 bg-orangeBow bg-100% px-4 !pt-20 pb-20">
          <div className="mx-auto max-w-7xl">
            <EditorFeatures lang="de" />
          </div>
        </section>

        <section id="roadmap" className={cn('mt-24 pb-16')}>
          <div className="mx-auto max-w-4xl text-center text-3xl leading-cozy">
            <h2 className={cn(h2Class, 'mb-4')}>Roadmap</h2>
            <EditorRoadmap />
            <p className="mt-12 sm:mt-0">{renderStayInTouch()}</p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl text-center text-3xl leading-cozy">
            <h2 className={cn(h2Class, 'mb-8')}>
              Der Serlo Editor in Deinem LMS
            </h2>

            <div className="mx-side text-left">
              <p className="mt-4 flex-1 text-xl leading-cozy">
                Unser Open Source Serlo Editor ist kostenfrei. Wir bieten alle
                von der Community gewünschten Integrationsoptionen an:
              </p>
              <ul className="serlo-ul text-xl">
                <li>JavaScript/Typescript über eine npm library</li>
                <li>Plugins für die gängigsten LMS (Moodle & edu-sharing)</li>
                <li>Software as a Service (SaaS)</li>
              </ul>
              <p className="mt-20 flex-1 text-center text-xl leading-cozy">
                <b className="tracking-tight">
                  Möchtest Du den Serlo Editor in dein LMS integrieren? Hast Du
                  Feature-Wünsche?
                </b>
                <br />
                Dann melde Dich bei:
              </p>
              <div className="mt-8 text-center">
                <EditorContact contact={teamDataVicky} />
              </div>
            </div>
          </div>
        </section>

        <section
          className={cn(`
            bg-size mt-8 bg-brand-100 bg-topWaveFromWhite bg-contain bg-top
            bg-no-repeat px-2 pt-20 sm:bg-[length:100%_3vw] md:pt-28
          `)}
        >
          <h2 className={cn(h2Class, 'mb-8')}>Über uns</h2>
          <div className="mx-side max-w-4xl text-left sm:mx-auto">
            <p className="mt-4 flex-1 text-xl leading-cozy">
              Der Serlo Editor wurde von Serlo Education entwickelt, einer
              gemeinnützigen Organisation, die es sich zur Aufgabe gemacht hat,
              Schüler*innen und Lehrer*innen weltweit qualitativ hochwertige,
              kostenlose und Open Source Lernmaterialien zur Verfügung zu
              stellen. Erfahre mehr über uns auf{' '}
              <Link href="/serlo">serlo.org/serlo</Link>.
            </p>
          </div>

          <h3 className={cn(h2Class, 'mb-8 mt-20 font-handwritten text-brand')}>
            Partner
          </h3>
          <div className="mx-auto max-w-[60rem]">
            <EditorPartnerList />
          </div>

          <h3 className={cn(h2Class, 'mb-8 mt-3 font-handwritten text-brand')}>
            Team
          </h3>
          <div className="mx-auto max-w-7xl px-4">
            <EditorTeam />
            <div className="mb-24 text-center">
              <h2 className={cn(h2Class)}>In Kontakt bleiben</h2>

              <p className="mt-4 flex-1 text-xl leading-cozy">
                Lass uns deine E-Mail-Adresse da und wir schicken dir ab und zu
                Updates zum Serlo Editor.
              </p>
              <p className="mt-8">{renderStayInTouch(true)}</p>
            </div>
          </div>
          <footer>
            <div className="text-md py-8 pb-[3.5rem] text-center text-brand ">
              <a
                className="hover:underline"
                href="/datenschutz"
                target="_blank"
              >
                Datenschutz
              </a>
              {' • '}
              <a className="hover:underline" href="/legal" target="_blank">
                Impressum
              </a>
            </div>
          </footer>
        </section>
      </div>

      <style jsx>{`
        :global(main > h1.serlo-h1) {
          display: none;
        }
        .about {
          padding-top: 7rem;
          padding-bottom: 5rem;
          margin-top: 6rem 0 0 0;
          background-image: url('/_assets/img/landing/about-container.svg');
          background-repeat: no-repeat;
          background-size: 100vw 100%;
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
        :global(body) {
          max-width: 100vw;
          overflow-x: hidden;
          background: white;
        }
        :global(html) {
          background-color: #eff7fb;
        }
      `}</style>
    </>
  )

  function renderStayInTouch(final?: boolean) {
    return (
      <a
        href="https://forms.gle/A6qZrkHoW4Q5K3Mb6"
        target="_blank"
        rel="noreferrer"
        className={cn(
          `
            serlo-new-landing-button serlo-button-with-wings
            !mb-8 inline-block rounded-full transition-colors
            before:!mt-[-1.1rem] after:!mt-[-1.1rem]
          `,
          final ? '' : 'bg-brand-200 text-brand hover:text-white'
        )}
      >
        Für Updates anmelden
      </a>
    )
  }

  function renderSupporterLogos() {
    const { padding, logo, name } = partners[0]

    const euLogo = {
      name: 'European Union',
      logo: '/_assets/img/editor/partners/logo_eu.svg',
      padding: 2,
    }
    return (
      <div className="hidden sm:absolute sm:right-8 sm:top-5 sm:block sm:w-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="sm:ml-auto"
          style={{
            paddingTop: `${padding}px`,
            paddingBottom: `${padding}px`,
          }}
          src={logo}
          alt={`Logo von ${name}`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="sm:-mt-8 sm:ml-auto"
          style={{
            paddingTop: `3px`,
            paddingBottom: `3px`,
          }}
          src={euLogo.logo}
          alt={`Logo von ${euLogo.name}`}
        />
      </div>
    )
  }
}
