import clsx from 'clsx'
import { GetStaticProps } from 'next'
// import dynamic from 'next/dynamic'
import { useState } from 'react'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { Footer } from '@/components/navigation/footer'
import { Header } from '@/components/navigation/header'
// import { InviteModalProps } from '@/components/user-tools/invite-modal'
// import { ShareModalProps } from '@/components/user-tools/share-modal'
import { UserTools } from '@/components/user-tools/user-tools'
import { SingleEntityPage, SlugProps } from '@/data-types'
import { CommunityWallPerson } from '@/data/de/community-people'
import { fetchPageData } from '@/fetcher/fetch-page-data'
// import { FrontendContentNode } from '@/frontend-node-types'
import { renderedPageNoHooks } from '@/helper/rendered-page'
// import { renderArticle } from '@/schema/article-renderer'

const jobsPageId = 226222 //21563

// const ShareModal = dynamic<ShareModalProps>(() =>
//   import('@/components/user-tools/share-modal').then((mod) => mod.ShareModal)
// )

// const InviteModal = dynamic<InviteModalProps>(() =>
//   import('@/components/user-tools/invite-modal').then((mod) => mod.InviteModal)
// )

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
        noHeaderFooter
        entityId={jobsPageId}
        authorization={pageData.authorization}
      >
        <div className="min-h-[68vh] max-w-full overflow-x-hidden sm:overflow-visible">
          <Content pageData={pageData} />
        </div>
      </FrontendClientBase>
    )
  }
)

const h2Class =
  'text-center text-4xl font-extrabold leading-cozy tracking-tight'
const italicClass = 'text-brand italic font-handwritten text-3xl'

function Content({ pageData }: { pageData: SingleEntityPage }) {
  const [shareOpen, setShareOpen] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)

  console.log(shareOpen)
  console.log(inviteOpen)
  const { entityData: data } = pageData

  return (
    <>
      <Header />
      <HeadTags data={{ title: 'Jobs bei Serlo' }} />
      {renderUserTools({ aboveContent: true })}
      <main className="text-truegray-700">
        <section
          className={clsx(
            'mt-20 md:mt-[11vh] px-2',
            'flex',
            'text-left font-bold'
          )}
        >
          <aside className="w-full">
            <img src="/_assets/img/jobs/jobs-header.jpg" className="ml-8" />
          </aside>
          <div className="w-full mt-10 ml-3">
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

        <section className={clsx('text-center mt-32')}>
          <h3
            style={{ hyphens: 'auto' }}
            className={clsx(h2Class, 'inline-block mt-7 pb-3')}
          >
            Unsere offenen Stellen
          </h3>
          <div className="sm:flex pt-8 justify-center text-left">
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

        <section
          className={clsx(
            'partner strech-wide relative px-side',
            'sm:text-left sm:mx-0 sm:max-w-[100vw]',
            'mt-24 !pt-16'
          )}
        >
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
            {/* <div className="relative z-0 h-0 w-full mt-1">
              <div
                className={clsx(
                  'absolute inset-0 mt-[-4.3rem] h-40 ml-5 opacity-50',
                  'bg-circled-and-arrow bg-no-repeat bg-top bg-contain'
                )}
              ></div>
            </div> */}
            <div className="grid mobile:grid-cols-2 md:grid-cols-3 relative py-6 text-2xl lg:py-10 lg:mb-16 text-center">
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

        <section
          className={clsx(
            'sm:text-left sm:mx-0 sm:max-w-[100vw]',
            'mt-18 -mb-4'
          )}
        >
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
          className={clsx(
            'partner about-serlo strech-wide  relative px-side',
            'sm:text-left sm:mx-0 sm:max-w-[100vw]',
            'mt-24 !pt-16 -mb-8 pb-16'
          )}
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

          <div className="mt-6 mx-24 flex justify-center">
            {testimonials.map(renderPerson)}
          </div>
        </section>
      </main>
      <Footer />
      {/* 
      {renderUserTools()}
      {renderShareModal()}
      {renderInviteModal()} */}

      <style jsx>{`
        @font-face {
          font-family: 'Karmilla';
          font-style: bolder;
          font-weight: 800;
          src: url('/_assets/fonts/karmilla/karmilla-bolder.woff2')
              format('woff2'),
            url('/_assets/fonts/karmilla/karmilla-bold.woff') format('woff');
          font-display: swap;
        }
        .strech-wide {
          left: calc(-50vw + 50%);
        }

        .about {
          padding-top: 7rem;
          padding-bottom: 5rem;
          margin: 6rem 0 0 0;
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
          'w-1/3v sm:w-1/4v md:w-1/4v',
          'max-w-[20rem]'
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

  function renderUserTools(setting?: { aboveContent?: boolean }) {
    return (
      <UserTools
        onShare={() => setShareOpen(true)}
        onInvite={() => setInviteOpen(true)}
        aboveContent={setting?.aboveContent}
        id={data.id}
        unrevisedRevisions={data.unrevisedRevisions}
        data={{
          type: data.typename,
          id: data.id,
          alias: data.alias,
          trashed: data.trashed,
        }}
      />
    )
  }

  // function renderShareModal() {
  //   const showPdf = [
  //     UuidType.Page,
  //     UuidType.Article,
  //     UuidType.CoursePage,
  //     UuidType.ExerciseGroup,
  //     UuidType.Exercise,
  //     UuidType.Solution,
  //   ].includes(data.typename)
  //   return (
  //     <ShareModal
  //       isOpen={shareOpen}
  //       onClose={() => setShareOpen(false)}
  //       showPdf={showPdf}
  //     />
  //   )
  // }

  // function renderInviteModal() {
  //   return (
  //     <InviteModal isOpen={inviteOpen} onClose={() => setInviteOpen(false)} />
  //   )
  // }

  // function renderContent(value: FrontendContentNode[]) {
  //   const content = renderArticle(value, `entity${data.id}`)
  //   if (data.schemaData?.setContentAsSection) {
  //     return <section itemProp="articleBody">{content}</section>
  //   }
  //   return content
  // }
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
