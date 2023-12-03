import Image from 'next/image'
import { default as NextLink } from 'next/link'
import { Fragment } from 'react'

import { Link } from '@/components/content/link'
import { HeadTags } from '@/components/head-tags'
import { UserTools } from '@/components/user-tools/user-tools'
import type { CommunityWallPerson } from '@/data/de/community-people'
import { breakpoints } from '@/helper/breakpoints'
import { cn } from '@/helper/cn'
// import type { PersonioPosition } from '@/pages/jobs/[[...jobId]]'

interface PersonioPosition {
  id: number
  name: string
  office: string
  employmentType: string
  department?: string
  recruitingCategory?: string
  jobDescriptions?: {
    jobDescription?: PersonioJobDescription[]
  }
  seniority?: string
  schedule?: string
  yearsOfExperience?: string
  occupation?: string
  occupationCategory?: string
  createdAt?: string
}

export interface PersonioJobDescription {
  name: string
  value: string
}

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

const h2Class = cn(
  `text-center text-4xl font-extrabold leading-cozy tracking-tight`
)
const h3Class = cn(`text-[1.3rem] font-extrabold text-gray-700`)
const italicClass = cn(`font-handwritten text-3xl italic text-brand`)

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
        className={cn(`
          -mt-12 w-[100vw]
          text-center text-gray-700 md:relative md:left-[calc(-50vw+50%)]
          md:ml-0 md:max-w-[100vw]
          md:text-left
        `)}
      >
        <div className="mt-16 md:mt-[11vh]">
          <UserTools aboveContent />
        </div>
        <section
          className={cn(`
            font-bold sm:flex
            sm:flex-row-reverse sm:text-left
          `)}
        >
          <div className="mt-12 w-full px-2 sm:ml-10 sm:mt-32">
            <p className={cn(italicClass, 'serlo-add-eyebrows mr-6')}>Hey du</p>
            <h1
              className={cn(`
                mx-auto mb-6 mt-3 max-w-md
                text-5xl font-extrabold leading-tight tracking-tight sm:ml-0
              `)}
            >
              Digitale Bildung braucht{' '}
              <span className="serlo-underlined !pr-0">dich&thinsp;!</span>
            </h1>
          </div>
          <aside className="w-full">
            <div className="relative mx-auto aspect-square w-[90vw] max-w-[28rem] sm:mx-0 sm:ml-auto sm:mr-side sm:h-[28rem] sm:w-[28rem]">
              <Image
                src="/_assets/img/jobs/jobs-header.jpg"
                alt="Zwei Menschen beim Arbeiten"
                fill
                className={cn(`
              rounded-full object-cover object-left
              `)}
              />
            </div>
          </aside>
        </section>

        <section className="mt-3 px-2 text-center">
          <h3
            className={cn(h2Class, 'mt-12 inline-block hyphens-auto pb-3')}
            id="stellen"
          >
            Unsere offenen Stellen
          </h3>
          <div className="mt-5 justify-center px-side pt-8 text-left sm:flex">
            <div className="mx-auto w-full max-w-xl sm:mr-4">
              <h3 className={cn(h3Class, 'mb-2 ml-5')}>Hauptamtlich</h3>
              {renderPositions(jobs)}
            </div>
            <div className="mx-auto w-full max-w-xl sm:ml-4">
              <div>
                <h3 className={cn(h3Class, 'mb-2 ml-5 mt-16 sm:mt-0')}>
                  Ehrenamtlich
                </h3>
                {renderPositions(volunteers)}
              </div>
              <div className="mt-16">
                <h3 className={cn(h3Class, 'mb-2 ml-5')}>Praktika</h3>
                {renderPositions(internships)}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 bg-orangeBow bg-100% !pt-12">
          <h3
            className={cn(`
              mx-auto text-center text-4xl font-bold
              leading-cozy tracking-tight
              text-almost-black
            `)}
          >
            <p className={cn(h2Class, 'mt-8 px-1')}>
              Das erwartet dich bei uns
            </p>
          </h3>
          <div
            className={cn(`
              relative mx-auto mb-12 grid max-w-2xl
              grid-cols-2 pb-16 pt-4
              text-left text-[1.3rem] md:max-w-4xl md:grid-cols-3 md:pb-16 lg:mb-16
            `)}
          >
            {specials.map(({ src, title, content }) => {
              return (
                <div
                  key={title}
                  className="-mb-5 w-full px-2 tracking-slightly-tighter mobile:text-center sm:mb-4"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} className="max-h-32 mobile:mx-auto" />
                  <h4
                    className="font-extrabold leading-cozy text-almost-black"
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                  <p className="serlo-p mx-auto mt-2 max-w-65 hyphens-manual text-lg font-normal leading-snug">
                    {content}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        <section className={cn('mt-18 -mb-8')}>
          <div className="mx-auto max-w-4xl text-center">
            <p className={cn(h2Class, 'mt-8')}>Noch Fragen?</p>
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/_assets/img/landing/birds.svg"
              className="mx-auto my-5"
            />
            <p className="mx-auto mb-8 max-w-2xl px-2 font-bold">
              Zusammen setzen wir uns für mehr Bildungsgerechtigkeit und die
              digitale Transformation unserer Schulen ein.
            </p>
            <Link
              className="serlo-new-landing-button serlo-button-with-wings inline"
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
                  className={cn(`
                    mb-5 block rounded-xl px-5
                    py-4 text-lg shadow-menu transition-colors
                    hover:bg-brand/5
                  `)}
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
        className={cn(`
          group relative mx-auto
          mt-12 max-w-[20rem]
          text-center sm:w-1/3v
        `)}
      >
        <div className="relative w-full">
          <div
            className={cn(`
              absolute left-5 right-12 top-5 bg-wiggle bg-contain
              bg-no-repeat pb-6/5 opacity-0 transition-all
              duration-200 ease-linear group-hover:rotate-1 group-hover:opacity-100
            `)}
          ></div>
        </div>
        <Image
          src={imgSrc}
          alt={`Avatar von ${name}`}
          width={180}
          height={180}
          className="z-10 mx-auto rounded-full"
        />
        <p className="mt-3 text-base font-bold">@{name}</p>
        <span
          className={cn(`
            rounded-2xl px-2 py-1 font-handwritten
            text-xl font-bold text-brand
          `)}
        >
          {role}
        </span>
        <p className="serlo-p mt-5 hyphens-manual">{subjects[0]}</p>
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
