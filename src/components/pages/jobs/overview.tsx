import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { Fragment, useState } from 'react'

import { Link } from '@/components/content/link'
import { HeadTags } from '@/components/head-tags'
import { ShareModalProps } from '@/components/user-tools/share-modal'
import { UserTools } from '@/components/user-tools/user-tools'
import { CommunityWallPerson } from '@/data/de/community-people'
// eslint-disable-next-line import/extensions
import { JobsProps, PersonioPosition } from '@/pages/jobs/[[...jobId]]'

const ShareModal = dynamic<ShareModalProps>(() =>
  import('@/components/user-tools/share-modal').then((mod) => mod.ShareModal)
)

const testimonials = [
  {
    name: 'Kathi',
    role: 'Mitgründerin',
    imgSrc:
      'https://assets.serlo.org/5fc6113cd6220_e761872fa96f411d8ed4f41b527dcc1318651373.jpg',
    subjects: [
      'Bei Serlo kann ich eine Arbeitsumgebung mitgestalten, in der ich, ich selbst sein kann und mich wohlfühle. Wir gestalten Arbeit nicht basierend auf dem Status Quo anderer Unternehmen, sondern so, wie wir es fair finden.',
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
    title: '... und Unsinn',
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

const h2Class =
  'text-center text-4xl leading-cozy tracking-tight font-extrabold'
const h3Class = 'text-gray-700 text-[1.3rem] font-extrabold'
const italicClass = 'text-brand italic font-handwritten text-3xl'

export function Overview({ positions }: JobsProps) {
  const [shareOpen, setShareOpen] = useState(false)

  return (
    <>
      <HeadTags data={{ title: 'Jobs bei Serlo' }} />

      <div
        className={clsx(
          'md:left-[calc(-50vw+50%)] md:relative',
          'md:text-left md:max-w-[100vw] w-[100vw] md:ml-0',
          '-mt-12 text-center',
          'text-gray-700'
        )}
      >
        <div className="mt-16 md:mt-[11vh]">{renderUserTools(true)}</div>
        <section
          className={clsx(
            'sm:flex sm:flex-row-reverse',
            'sm:text-left font-bold'
          )}
        >
          <div className="w-full px-2 mt-12 sm:mt-32 sm:ml-10">
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
                'max-w-md mt-3 mb-6 mx-auto sm:ml-0'
              )}
            >
              Digitale Bildung braucht{' '}
              <span className="underlined !pr-0">dich&thinsp;!</span>
            </h1>
          </div>
          <aside className="w-full">
            <img
              src="/_assets/img/jobs/jobs-header.jpg"
              className={clsx(
                'rounded-full object-cover object-left mx-side aspect-square',
                'w-[90vw] max-w-[28rem] mx-auto',
                'sm:w-[28rem] sm:h-[28rem] sm:mx-0 sm:ml-auto'
              )}
            />
          </aside>
        </section>

        <section className={clsx('text-center mt-3 px-2')}>
          <h3
            style={{ hyphens: 'auto' }}
            className={clsx(h2Class, 'inline-block mt-12 pb-3')}
            id="stellen"
          >
            Unsere offenen Stellen
          </h3>
          <div className="sm:flex pt-8 justify-center text-left px-side mt-5">
            <div className="max-w-xl w-full mx-auto sm:mr-4">
              <h3 className={clsx(h3Class, 'ml-5 mb-2')}>Hauptamptlich</h3>
              {renderPositions(positions)}
            </div>
            <div className="max-w-xl w-full mx-auto sm:ml-4">
              <h3 className={clsx(h3Class, 'ml-5 mb-2 mt-12 sm:mt-0')}>
                Ehrenamtlich
              </h3>
              {renderPositions(positions)}
            </div>
          </div>
        </section>

        <section className={clsx('partner', 'mt-24 !pt-12')}>
          <h3
            className={clsx(
              'text-center text-4xl text-truegray-700 font-bold',
              'leading-cozy tracking-tight',
              'mx-auto'
            )}
          >
            <p className={clsx(h2Class, 'mt-8 px-1')}>
              Das erwartet dich bei uns
            </p>
            <div
              className={clsx(
                'relative text-[1.3rem] text-left pb-16 mb-12',
                'pt-4 lg:mb-16 md:pb-16',
                'grid grid-cols-2 md:grid-cols-3 max-w-2xl md:max-w-4xl mx-auto'
              )}
            >
              {specials.map(({ src, title, content }) => {
                return (
                  <div
                    key={title}
                    className="w-full -mb-5 sm:mb-4 mobile:text-center px-2"
                  >
                    <img src={src} className="max-h-32 mobile:mx-auto" />
                    <b>{title}</b>
                    <br />
                    <p className="serlo-p text-lg font-normal max-w-65 mx-auto mt-1 tracking-slightly-tighter leading-snug special-hyphens-initial">
                      {content}
                    </p>
                  </div>
                )
              })}
            </div>
          </h3>
        </section>

        <section className={clsx('mt-18 -mb-8')}>
          <div className="max-w-4xl text-center mx-auto">
            <p className={clsx(h2Class, 'mt-8')}>Noch Fragen?</p>
            <p className="text-[1.3rem] mt-3">
              Dann schreib uns an{' '}
              <a className="text-brand underline" href="mailto:jobs@serlo.org">
                jobs@serlo.org
              </a>
              <br />
              Wir freuen uns von dir zu hören.
            </p>
          </div>
        </section>

        <section className={clsx('partner about-serlo', 'mt-24 !pt-16 pb-16')}>
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

          <div className="mt-6 sm:flex sm:justify-center">
            {testimonials.map(renderPerson)}
          </div>
        </section>
        {renderUserTools(false)}
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          showPdf={false}
          path="jobs"
        />
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

  function renderUserTools(aboveContent: boolean) {
    return (
      <UserTools
        onShare={() => setShareOpen(true)}
        aboveContent={aboveContent}
      />
    )
  }

  function renderPositions(positions?: PersonioPosition[]) {
    if (!positions || !positions.length)
      return "Probier's doch später noch mal!"

    return (
      <ul className="-mb-6">
        {positions.map(({ id, name, employmentType, office, department }) => {
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
                <Link
                  unstyled
                  className={clsx(
                    'block px-5 py-4 mb-5',
                    'rounded-xl hover:bg-brand/5 transition-colors shadow-menu',
                    'text-lg'
                  )}
                  href={`/jobs/${id}`}
                >
                  <span className="text-brand font-bold">{name}</span>
                  <br />
                  {department ? `${department} • ` : ''}
                  {employmentType === 'permanent'
                    ? 'Festanstellung'
                    : 'Teilzeit'}{' '}
                  • {office}
                </Link>
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
        className={clsx(
          'mt-12 text-center group',
          'sm:w-1/3v',
          'max-w-[20rem] mx-auto'
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
        <p className="text-base mt-2 font-bold">@{name}</p>
        <span
          className={clsx(
            'text-brand font-handwritten text-xl font-bold px-2 py-1',
            'rounded-2xl'
          )}
        >
          {role}
        </span>
        <p className="serlo-p mt-5 special-hyphens-initial">{subjects[0]}</p>
      </figure>
    )
  }
}
