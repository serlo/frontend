import clsx from 'clsx'

import { HeadTags } from '../head-tags'
import { FooterNew } from '../landing/rework/footer-new'
import { SubjectIcon } from '../landing/rework/subject-icon'
import { CommunityWallSubjectLanding } from '../landing/subjects/community-wall-subject-landing'
import { SubjectLandingFeatured } from '../landing/subjects/subject-landing-featured'
import { SubjectLandingTopicOverview } from '../landing/subjects/subject-landing-topic-overview'
import { Header } from '../navigation/header/header'
import { Quickbar } from '../navigation/quickbar'
import { deSubjectLandingSubjects } from './subject-landing'
import { useInstanceData } from '@/contexts/instance-context'
import { TaxonomySubTerm } from '@/data-types'
import { deSubjectLandingData } from '@/data/de/de-subject-landing-data'
import { Instance } from '@/fetcher/graphql-types/operations'
import { breakpoints } from '@/helper/breakpoints'
import { getServerSideStrings } from '@/helper/feature-i18n'
import { serloDomain } from '@/helper/urls/serlo-domain'

interface SubjectLandingContentProps {
  subject: deSubjectLandingSubjects
  subterms: TaxonomySubTerm[]
}

export function SubjectLandingContent({
  subterms,
  subject,
}: SubjectLandingContentProps) {
  const { lang } = useInstanceData()

  if (lang !== Instance.De) return null
  const instanceData = getServerSideStrings(lang)

  const data = deSubjectLandingData[subject]

  return (
    <>
      <HeadTags
        data={{
          title: `${data.title} Startseite  - ${instanceData.title}`,
          metaImage: `https://de.${serloDomain}/_assets/img/meta/${subject}.png`,
        }}
      />
      <Header />
      <main id="content" className="text-almost-black">
        <section
          className={clsx(
            'mx-auto mt-16 max-w-3xl',
            'sm:flex md:mt-14',
            'text-center sm:text-left'
          )}
        >
          <div>
            <h1
              className={clsx(
                'text-4xl font-extrabold sm:text-6xl',
                'tracking-tight',
                'mt-3 mb-10'
              )}
            >
              <span className="underlined inline-block w-min max-w-[27rem] !whitespace-normal pb-3">
                {data.title}
              </span>
            </h1>
            <p className="text-2xl leading-cozy text-almost-black">
              {data.subline1}
              <br /> {data.subline2}
            </p>
          </div>
          {renderIcon()}
        </section>

        <section className="mx-auto mt-10 max-w-3xl text-center sm:mt-16 sm:text-left">
          <h2 className="mb-2 text-lg font-bold text-almost-black">
            Durchsuche den Bereich {data.title}
          </h2>

          <Quickbar
            subject={data.title}
            className="max-w-sm sm:-ml-1 sm:px-0 md:max-w-2xl md:pr-4"
          />
        </section>

        <section className={clsx('text-center', 'themen')}>
          <p className="mt-4 mb-12 text-3xl font-extrabold tracking-tight">
            <span>Was darf&apos;s denn heute sein?</span>
          </p>
          <SubjectLandingTopicOverview subterms={subterms} subject={subject} />
        </section>

        <section className={clsx('text-center', 'mt-20 mb-8')}>
          <h2
            className={clsx(
              'text-3xl font-extrabold',
              'tracking-tight',
              'mx-auto mt-3 max-w-2xl pb-10'
            )}
          >
            <span className="pb-2">Beliebte Inhalte</span>
          </h2>

          <SubjectLandingFeatured subject={subject} />
        </section>

        <section className="bg-blueWave bg-100% pt-4 text-center">
          <CommunityWallSubjectLanding subject={subject} />
        </section>
      </main>
      <FooterNew />
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
        .themen,
        .community {
          padding-top: 3rem;
          padding-bottom: 1rem;
          margin: 4rem 0 0 0;
          background-image: url('/_assets/img/landing/about-container.svg');
          background-repeat: no-repeat;
          background-position: 77% 12%;
          background-size: 100vw 100%;
        }
        @media (min-width: ${breakpoints.sm}) {
          .themen,
          .community {
            padding-top: 4rem;
            margin: 4rem 0 0 0;
            background-position: 20% 19%;
            background-size: 100vw 100%;
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

  function renderIcon() {
    return (
      <>
        <div className="landing-subjects group mx-auto -mt-3">
          <SubjectIcon subject={subject} />
        </div>
        <style jsx global>{`
          .landing-subjects svg.serlo-subject-icon {
            display: block;
            margin: 0 auto;
            min-width: 16rem;

            width: 13rem;
            height: 13rem;
          }
        `}</style>
      </>
    )
  }
}
