import clsx from 'clsx'
import { GetStaticProps } from 'next'

import { Entity } from '@/components/content/entity'
import { Link } from '@/components/content/link'
import { EntityBase } from '@/components/entity-base'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { SingleEntityPage, SlugProps } from '@/data-types'
import { CommunityWallPerson } from '@/data/de/community-people'
import { fetchPageData } from '@/fetcher/fetch-page-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'

const jobsPageId = 21563

const testimonials = [
  {
    name: 'Anne',
    role: 'Community-Support',
    imgSrc:
      'https://assets.serlo.org/59ee046dc2532_c1ce1c91105cb8630656d080614ad83eacccafe7.jpg',
    subjects: [
      'Serlo hat eine Feedbackkultur geschaffen, in der man sich ausprobieren kann und dabei immer etwas Neues lernt. Eine solche Umgebung wünsche ich mir auch für alle Schüler*innen beim Lernen!',
    ],
  },
  {
    name: 'Hugo',
    role: 'Softwareentwickler',
    imgSrc:
      'https://assets.serlo.org/5fa26c949d3c5_e9a0b46b1988589b36cfa85696530c7a582e7b0d.jpg',
    subjects: [
      'Serlos politisches Engagement für Bildungsgerechtigkeit und der moderne Tech Stack motivieren mich jeden Tag hier zu arbeiten.',
    ],
  },
  {
    name: 'Kathi',
    role: 'Mitgründerin',
    imgSrc:
      'https://assets.serlo.org/5fc6113cd6220_e761872fa96f411d8ed4f41b527dcc1318651373.jpg',
    subjects: [
      'Bei Serlo kann ich eine Arbeitsumgebung mitgestalten, in der ich, ich selbst sein kann und mich wohlfühle. Wir gestalten Arbeit nicht basierend auf dem Status Quo anderer Unternehmen, sondern so, wie wir es fair finden.',
    ],
  },
]

export default renderedPageNoHooks<{ pageData: SingleEntityPage }>(
  ({ pageData }) => {
    return (
      <FrontendClientBase
        noContainers
        entityId={pageData.entityData.id}
        authorization={pageData.authorization}
      >
        <EntityBase
          page={{
            ...pageData,
            entityData: { ...pageData.entityData, title: undefined },
            secondaryMenuData: undefined,
            breadcrumbsData: undefined,
            horizonData: undefined,
          }}
          entityId={pageData.entityData.id}
        >
          <Entity data={pageData.entityData}>
            <Content pageData={pageData} />
          </Entity>
        </EntityBase>
      </FrontendClientBase>
    )
  }
)

const h2Class =
  'text-center text-4xl font-extrabold leading-cozy tracking-tight'
const italicClass = 'text-brand italic font-handwritten text-3xl'

function Content({ pageData }: { pageData: SingleEntityPage }) {
  const { entityData: data } = pageData
  console.log(data)

  return (
    <>
      <HeadTags data={{ title: 'Jobs bei Serlo' }} />

      <div
        className={clsx(
          'stretch-wide relative',
          'sm:text-left sm:max-w-[100vw] w-[100vw] sm:-ml-2',
          '-mb-[12.7rem] sm:-mb-[9.7rem] -mt-12 text-center'
        )}
      >
        <section
          className={clsx(
            'mt-16 md:mt-[11vh]',
            'sm:flex',
            'sm:text-left font-bold'
          )}
        >
          <aside className="w-full">
            <img
              src="/_assets/img/jobs/jobs-header.jpg"
              className={clsx(
                'rounded-full object-cover object-left ml-auto aspect-square',
                'p-side sm:w-[23rem] sm:h-[23rem]'
              )}
            />
          </aside>
          <div className="w-full mt-12 sm:mt-24 sm:ml-10">
            <p
              className={clsx(
                italicClass,
                'landing-button-with-wings landing-button-with-wink p-with-wink mr-6'
              )}
            >
              Hey du
            </p>
            <h1
              className={clsx(
                'text-5xl font-extrabold',
                'tracking-tight leading-tight',
                'max-w-md mt-3 mb-6 mr-auto'
              )}
            >
              Digitale Bildung braucht{' '}
              <span className="underlined !pr-0">dich&thinsp;!</span>
            </h1>
          </div>
        </section>

        <section className={clsx('text-center mt-12')}>
          <h3
            style={{ hyphens: 'auto' }}
            className={clsx(h2Class, 'inline-block mt-7 pb-3')}
          >
            Unsere offenen Stellen
          </h3>
          <div className="sm:flex pt-8 justify-center text-left px-side">
            <div className="max-w-xl w-full mr-8">
              <h3 className="serlo-h3">Hauptamptlich</h3>
              <div className="border-2 border-brand p-12 rounded-lg text-xl font-bold text-center">
                Fancy Stellenplugin hier
              </div>
              {/* <img
                src="/_assets/img/jobs/jobs-header.jpg"
                className="rounded-lg mt-12"
              /> */}
            </div>
            <div className="max-w-xl w-full">
              <h3 className="serlo-h3">Ehrenamtlich</h3>
              {/* {data.content && renderContent(data.content)} */}
              <div className="border-2 border-brand p-12 rounded-lg text-xl font-bold text-center">
                Imported Content here
              </div>
            </div>
          </div>
        </section>

        <section className={clsx('partner', 'mt-24 !pt-16')}>
          <h3
            className={clsx(
              'text-center text-4xl text-truegray-700 font-bold',
              'leading-cozy tracking-tight',
              'mx-auto'
            )}
          >
            <p className={clsx(italicClass, 'text-4xl')}>
              Das erwartet dich bei uns
            </p>
            <div
              className={clsx(
                'relative text-2xl text-center pt-6 pb-16 mb-12',
                'lg:py-10 lg:mb-16 ',
                'mobile:grid mobile:grid-cols-2 md:grid-cols-3 '
              )}
            >
              <div className="w-full text-center mb-10">
                <img
                  src="/_assets/img/jobs/impact.svg"
                  className="max-h-40 mx-auto"
                />
                <b>Impact</b>
                <br />
                <p className="text-xl font-normal max-w-65 mx-auto mt-2">
                  Unsere Mission ist nicht weniger als das: Freien Zugang zu
                  richtig guter Bildung schaffen – für alle weltweit. Und zwar
                  jetzt!
                </p>
              </div>
              <div className="w-full text-center mb-10">
                <img
                  src="/_assets/img/jobs/arbeit-mit-sinn.svg"
                  className="max-h-40 mx-auto"
                />
                <b>Arbeit mit Sinn</b>
                <br />
                <p className="text-xl font-normal max-w-65 mx-auto mt-2">
                  Bei uns hast eine verantwortungsvolle Aufgabe und weißt jeden
                  Tag, was dein Beitrag zu einer gerechteren Welt ist.
                </p>
              </div>
              <div className="w-full text-center mb-10">
                <img
                  src="/_assets/img/jobs/arbeit-mit-unsinn.svg"
                  className="max-h-40 mx-auto"
                />
                <b>... und Unsinn</b>
                <br />
                <p className="text-xl font-normal max-w-65 mx-auto mt-2">
                  Wir feiern unsere Erfolge und unser Team. Für verrückte Ideen
                  ist bei uns immer Platz!
                </p>
              </div>
              <div className="w-full text-center mb-10">
                <img
                  src="/_assets/img/jobs/new-work-richtig.svg"
                  className="max-h-40 mx-auto"
                />
                <b>New Work – aber richtig</b>
                <br />
                <p className="text-xl font-normal max-w-65 mx-auto mt-2">
                  Wir führen Serlo gemeinsam und gleichzeitig effizient, mit
                  viel Raum für das eigenverantwortliche Arbeiten jeder*s
                  Einzelnen.
                </p>
              </div>
              <div className="w-full text-center mb-10">
                <img
                  src="/_assets/img/jobs/gemeinsam.svg"
                  className="max-h-40 mx-auto"
                />
                <b>Gemeinsam</b>
                <br />
                <p className="text-xl font-normal max-w-65 mx-auto mt-2">
                  Wir lernen stets voneinander und lassen uns inspirieren von
                  der Diversität unseres Teams.
                </p>
              </div>
              <div className="w-full text-center mb-10">
                <img
                  src="/_assets/img/jobs/weiterbildung.svg"
                  className="max-h-40 mx-auto"
                />
                <b>Weiterbildung</b>
                <br />
                <p className="text-xl font-normal max-w-65 mx-auto mt-2">
                  Wir fördern unsere Talente. Entwickle dich mit uns weiter, wir
                  bieten dir Coaching-Programme und Fortbildungen für deine
                  Wunschthemen.
                </p>
              </div>
            </div>
          </h3>
        </section>

        <section className={clsx('mt-18 -mb-4')}>
          <div className="text-3xl leading-cozy max-w-4xl text-center mx-auto">
            <p className="font-bold">
              Noch Fragen? Dann schreib uns an: <br />
              <a className="text-brand underline" href="mailto:jobs@serlo.org">
                jobs@serlo.org
              </a>
              <br />
              <br />
              Wir freuen uns von dir zu hören.
            </p>
          </div>
        </section>

        <section
          className={clsx('partner about-serlo', 'mt-24 !pt-16 -mb-8 pb-16')}
        >
          <div className="text-3xl leading-cozy max-w-4xl text-center mx-auto">
            <img
              src="/_assets/img/landing/birds.svg"
              className="mx-auto my-5"
            />
            <p className="mb-8 max-w-2xl px-2 mx-auto font-bold">
              Zusammen setzen wir uns für mehr Bildungsgerechtigkeit und die
              digitale Transformation unserer Schulen ein.
            </p>
            <Link
              className="serlo-new-landing-button inline landing-button-with-wings"
              href="/serlo"
            >
              Mehr über Serlo
            </Link>
          </div>

          <div className="mt-6 mobile:mx-24 sm:flex sm:justify-center">
            {testimonials.map(renderPerson)}
          </div>
        </section>
      </div>

      <style jsx>{`
        :global(main > h1.serlo-h1) {
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
        .stretch-wide {
          left: calc(-50vw + 50%);
        }
        .about {
          padding-top: 7rem;
          padding-bottom: 5rem;
          margin-top: 6rem 0 0 0;
          background-image: url('/_assets/img/landing/about-container.svg');
          background-repeat: no-repeat;
          background-size: 100vw 100%;

          @screen sm {
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
        :global(.landing-button-with-wings) {
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
        }
        :global(.landing-button-with-wink) {
          &:after,
          &:before {
            background: url('/_assets/img/landing/wink-left.svg') no-repeat !important;
            margin-top: -2rem !important;
            background-size: 65% !important;
          }
        }
        .p-with-wink {
          &:after,
          &:before {
            margin-top: -1rem !important;
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
        }
        .partner {
          padding-top: 1rem;
          background-image: url('/_assets/img/landing/about-container.svg');
          background-size: 100% 100%;
        }
        .about-serlo {
          background-image: url('/_assets/img/landing/footer-container.svg');
        }
      `}</style>
    </>
  )

  function renderPerson({ name, imgSrc, role, subjects }: CommunityWallPerson) {
    return (
      <figure
        key={name}
        className={clsx(
          'mt-12 mx-1 text-center group',
          'mobile:w-1/3v sm:w-1/4v',
          'sm:max-w-[20rem]'
        )}
      >
        <div className="relative w-full">
          <div
            className={clsx(
              'bg-wiggle absolute left-5 top-5 right-12 pb-6/5',
              'bg-no-repeat bg-contain opacity-0 group-hover:opacity-100',
              'transition-all ease-linear duration-200 group-hover:rotate-1'
            )}
          ></div>
        </div>
        <img
          src={imgSrc}
          alt={`Avatar von ${name}`}
          className="relative z-10 rounded-full w-full aspect-square object-cover p-12 -mb-12"
        />
        <p className="text-base mt-2 font-bold text-gray-700">@{name}</p>
        <span
          className={clsx(
            'text-brand font-handwritten text-xl font-bold px-2 py-1',
            'rounded-2xl'
          )}
        >
          {role}
        </span>
        <p className="serlo-p mt-5">{subjects[0]}</p>
      </figure>
    )
  }
}

export const getStaticProps: GetStaticProps<SlugProps> = async (context) => {
  if (context.locale !== 'de') return { notFound: true }

  const pageData = await fetchPageData(`/${jobsPageId}`)

  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as SingleEntityPage,
    },
    revalidate: 60 * 60, // 1h,
    notFound: pageData.kind !== 'single-entity',
  }
}
