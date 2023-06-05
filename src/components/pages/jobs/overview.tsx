import clsx from 'clsx'
import { default as NextLink } from 'next/link'
import { Fragment } from 'react'

import { Link } from '@/components/content/link'
import { HeadTags } from '@/components/head-tags'
import { UserTools } from '@/components/user-tools/user-tools'
import { CommunityWallPerson } from '@/data/de/community-people'
import { breakpoints } from '@/helper/breakpoints'
import { tw } from '@/helper/tw'
// eslint-disable-next-line import/extensions
import { PersonioPosition } from '@/pages/jobs/[[...jobId]]'

const testimonials = [
  {
    name: 'Kathi',
    role: 'Mitgründerin',
    imgSrc:
      'https://assets.serlo.org/5fc6113cd6220_e761872fa96f411d8ed4f41b527dcc1318651373.jpg',
    subjects: [
      'Bei Serlo kann ich eine Arbeitsumgebung mitgestalten, in der ich ich selbst sein kann und mich wohlfühle. Wir gestalten Arbeit nicht basierend auf dem Status Quo anderer Unternehmen, sondern so, wie wir es fair finden.',
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
    name: 'Anne',
    role: 'Community-Support',
    imgSrc: '/_assets/img/jobs/anne.jpg',
    subjects: [
      'Serlo hat eine Feedbackkultur geschaffen, in der man sich ausprobieren kann und dabei immer etwas Neues lernt. Eine solche Umgebung wünsche ich mir auch für alle Schüler*innen beim Lernen!',
    ],
  },
]

const specials = [
  {
    src: '/_assets/img/jobs/impact.svg',
    title: 'Impact',
    content: (
      <>
        Unsere Mission ist nicht weniger als das: Freien Zugang zu richtig guter
        Bildung schaffen – für alle weltweit. Und zwar jetzt!
      </>
    ),
  },
  {
    src: '/_assets/img/jobs/arbeit-mit-sinn.svg',
    title: 'Arbeit mit Sinn',
    content: (
      <>
        Bei uns hast du eine verantwortungsvolle Aufgabe und du weißt jeden Tag,
        was dein Beitrag zu einer gerechteren Welt ist.
      </>
    ),
  },

  {
    src: '/_assets/img/jobs/arbeit-mit-unsinn.svg',
    title: '.&thinsp;.&thinsp;. und Unsinn',
    content: (
      <>
        Wir feiern unsere Erfolge und unser Team. Für verrückte Ideen ist bei
        uns immer Platz!
      </>
    ),
  },

  {
    src: '/_assets/img/jobs/new-work-richtig.svg',
    title: 'New Work – aber richtig',
    content: (
      <>
        Wir führen Serlo gemeinsam und gleichzeitig effizient, mit viel Raum für
        eigenverantwortliches Arbeiten jeder*s Einzelnen.
      </>
    ),
  },

  {
    src: '/_assets/img/jobs/gemeinsam.svg',
    title: 'Gemeinsam',
    content: (
      <>
        Wir lernen täglich voneinander und lassen uns inspirieren von der
        Diversität unseres Teams.
      </>
    ),
  },

  {
    src: '/_assets/img/jobs/weiterbildung.svg',
    title: 'Weiterbildung',
    content: (
      <>
        Wir fördern unsere Talente. Entwickle dich mit uns weiter, wir bieten
        dir Coaching-Programme und Fortbildungen für deine Wunschthemen.
      </>
    ),
  },
]

const h2Class = tw`text-center text-4xl font-extrabold leading-cozy tracking-tight`
const h3Class = tw`text-[1.3rem] font-extrabold text-gray-700`
const italicClass = tw`font-handwritten text-3xl italic text-brand`

// type CategorizedJobsProps = Record<string, PersonioPosition[]>
export interface JobsOverviewProps {
  jobs: PersonioPosition[]
  internships: PersonioPosition[]
  volunteers: PersonioPosition[]
}

export function Overview({ jobs, internships, volunteers }: JobsOverviewProps) {
  return (
    <>
      <HeadTags data={{ title: 'Jobs bei Serlo' }} />

      <div
        className={tw`
          -mt-12 w-[100vw]
          text-center text-gray-700 md:relative md:left-[calc(-50vw+50%)]
          md:ml-0 md:max-w-[100vw]
          md:text-left
        `}
      >
        <div className="mt-16 md:mt-[11vh]">
          <UserTools aboveContent />
        </div>
        <section
          className={tw`
            font-bold sm:flex
            sm:flex-row-reverse sm:text-left
          `}
        >
          <div className="mt-12 w-full px-2 sm:mt-32 sm:ml-10">
            <p
              className={clsx(
                italicClass,
                'landing-button-with-wings landing-button-with-wink p-with-wink mr-6'
              )}
            >
              Hey du
            </p>
            <h1
              className={tw`
                mx-auto mt-3 mb-6 max-w-md
                text-5xl font-extrabold leading-tight tracking-tight sm:ml-0
              `}
            >
              Digitale Bildung braucht{' '}
              <span className="underlined !pr-0">dich&thinsp;!</span>
            </h1>
          </div>
          <aside className="w-full">
            <img
              src="/_assets/img/jobs/jobs-header.jpg"
              className={tw`
                mx-side mx-auto aspect-square w-[90vw] max-w-[28rem]
                rounded-full object-cover object-left
                sm:mx-0 sm:ml-auto sm:h-[28rem] sm:w-[28rem]
              `}
            />
          </aside>
        </section>

        <section className="mt-3 px-2 text-center">
          <h3
            style={{ hyphens: 'auto' }}
            className={clsx(h2Class, 'mt-12 inline-block pb-3')}
            id="stellen"
          >
            Unsere offenen Stellen
          </h3>
          <div className="mt-5 justify-center px-side pt-8 text-left sm:flex">
            <div className="mx-auto w-full max-w-xl sm:mr-4">
              <h3 className={clsx(h3Class, 'ml-5 mb-2')}>Hauptamtlich</h3>
              {renderPositions(jobs)}
            </div>
            <div className="mx-auto w-full max-w-xl sm:ml-4">
              <div>
                <h3 className={clsx(h3Class, 'ml-5 mb-2 mt-16 sm:mt-0')}>
                  Ehrenamtlich
                </h3>
                {renderPositions(volunteers)}
              </div>
              <div className="mt-16">
                <h3 className={clsx(h3Class, 'ml-5 mb-2')}>Praktika</h3>
                {renderPositions(internships)}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 bg-orangeBow bg-100% !pt-12">
          <h3
            className={tw`
              mx-auto text-center text-4xl font-bold
              leading-cozy tracking-tight
              text-almost-black
            `}
          >
            <p className={clsx(h2Class, 'mt-8 px-1')}>
              Das erwartet dich bei uns
            </p>
          </h3>
          <div
            className={tw`
              relative mx-auto mb-12 grid max-w-2xl
              grid-cols-2 pb-16 pt-4
              text-left text-[1.3rem] md:max-w-4xl md:grid-cols-3 md:pb-16 lg:mb-16
            `}
          >
            {specials.map(({ src, title, content }) => {
              return (
                <div
                  key={title}
                  className="-mb-5 w-full px-2 tracking-slightly-tighter mobile:text-center sm:mb-4"
                >
                  <img src={src} className="max-h-32 mobile:mx-auto" />
                  <h4
                    className="font-extrabold leading-cozy text-almost-black"
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                  <p className="serlo-p mx-auto mt-2 max-w-65 text-lg font-normal leading-snug special-hyphens-initial">
                    {content}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        <section className={clsx('mt-18 -mb-8')}>
          <div className="mx-auto max-w-4xl text-center">
            <p className={clsx(h2Class, 'mt-8')}>Noch Fragen?</p>
            <p className="mt-3 text-[1.3rem]">
              Dann schreib uns an{' '}
              <a className="text-brand underline" href="mailto:jobs@serlo.org">
                jobs@serlo.org
              </a>
              <br />
              Wir freuen uns von dir zu hören.
            </p>
          </div>
        </section>

        <section className="mt-24 bg-blueWave bg-100% !pt-16 pb-16">
          <div className="mx-auto max-w-4xl text-center text-3xl leading-cozy">
            <img
              src="/_assets/img/landing/birds.svg"
              className="mx-auto my-5"
            />
            <p className="mx-auto mb-8 max-w-2xl px-2 font-bold">
              Zusammen setzen wir uns für mehr Bildungsgerechtigkeit und die
              digitale Transformation unserer Schulen ein.
            </p>
            <Link
              className="landing-button-with-wings serlo-new-landing-button inline"
              href="/serlo"
            >
              Mehr über Serlo
            </Link>
          </div>

          <div className="mt-6 sm:flex sm:justify-center">
            {testimonials.map(renderPerson)}
          </div>
        </section>
        <UserTools />
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

  function renderPositions(positions?: PersonioPosition[]) {
    if (!positions || !positions.length)
      return "Probier's doch später noch mal!"

    return (
      <ul className="-mb-6">
        {positions.map((position) => {
          const { id, name } = position
          // const showCategory =
          //   index === 0 || positions[index - 1]?.department !== department
          return (
            <Fragment key={id}>
              {/* {showCategory ? (
                  <h4 className="ml-auto mr-5 mt-4 text-lg text-right">
                    {department ?? 'Sonstige'}
                  </h4>
                ) : null} */}
              <li key={id}>
                <NextLink
                  className={tw`
                    mb-5 block rounded-xl px-5
                    py-4 text-lg shadow-menu transition-colors
                    hover:bg-brand/5
                  `}
                  href={`/jobs/${id}`}
                >
                  <span className="font-bold text-brand">{name}</span>
                  <br />
                  {renderSubline(position)}
                </NextLink>
              </li>
            </Fragment>
          )
        })}
      </ul>
    )
  }

  function renderPerson({ name, imgSrc, role, subjects }: CommunityWallPerson) {
    return (
      <figure
        key={name}
        className={tw`
          group mx-auto mt-12
          max-w-[20rem]
          text-center sm:w-1/3v
        `}
      >
        <div className="relative w-full">
          <div
            className={tw`
              absolute left-5 top-5 right-12 bg-wiggle bg-contain
              bg-no-repeat pb-6/5 opacity-0 transition-all
              duration-200 ease-linear group-hover:rotate-1 group-hover:opacity-100
            `}
          ></div>
        </div>
        <img
          src={imgSrc}
          alt={`Avatar von ${name}`}
          className="relative z-10 -mb-12 aspect-square w-full rounded-full object-cover p-12"
        />
        <p className="mt-2 text-base font-bold">@{name}</p>
        <span
          className={tw`
            rounded-2xl px-2 py-1 font-handwritten
            text-xl font-bold text-brand
          `}
        >
          {role}
        </span>
        <p className="serlo-p mt-5 special-hyphens-initial">{subjects[0]}</p>
      </figure>
    )
  }
}

export function renderSubline({
  employmentType,
  office,
  department,
  schedule,
}: PersonioPosition) {
  return (
    <>
      {department ? department : ''}
      {employmentType === 'trainee' ? null : renderSchedule(schedule)} •{' '}
      {office}
    </>
  )
  function renderSchedule(schedule?: string) {
    return schedule === 'full-or-part-time'
      ? ' • Voll- oder Teilzeit'
      : schedule === 'full-time'
      ? ' • Vollzeit'
      : schedule === 'part-time'
      ? ' • Teilzeit'
      : ''
  }
}
