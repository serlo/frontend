import type { deSubjectLandingSubjects } from './subject-landing'
import { Link } from '../content/link'
import { HeadTags } from '../head-tags'
import { FooterNew } from '../landing/rework/footer-new'
import { SubjectIcon } from '../landing/rework/subject-icon'
import { CommunityWallSubjectLanding } from '../landing/subjects/community-wall-subject-landing'
import { SubjectLandingFeatured } from '../landing/subjects/subject-landing-featured'
import { SubjectLandingTopicOverview } from '../landing/subjects/subject-landing-topic-overview'
import { Header } from '../navigation/header/header'
import { Quickbar } from '../navigation/quickbar'
import { useInstanceData } from '@/contexts/instance-context'
import { deSubjectLandingData } from '@/data/de/de-subject-landing-data'
import type { TaxonomySubTerm } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { breakpoints } from '@/helper/breakpoints'
import { cn } from '@/helper/cn'
import { getServerSideStrings } from '@/helper/feature-i18n'
import { submitEvent } from '@/helper/submit-event'
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
          className={cn(`
            mx-auto mt-16 max-w-3xl
            text-center sm:flex
            sm:text-left md:mt-14
          `)}
        >
          <div>
            <h1
              className={cn(`
                mb-10 mt-3 text-4xl
                font-extrabold
                tracking-tight sm:text-6xl
              `)}
            >
              <span className="serlo-underlined inline-block w-min max-w-[27rem] !whitespace-normal pb-3">
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
        {subject === 'mathe' ? (
          <Link
            onClick={() => submitEvent('oam-banner-click-math-landing')}
            href="/mathe-pruefungen"
            className="group mb-10 mt-10 block bg-newgreen bg-opacity-20 p-3 text-lg text-black hover:!no-underline mobile:text-center sm:py-4 md:text-[22px] lg:mb-0"
          >
            🎓 Ui, schon Prüfungszeit?{' '}
            <b className="serlo-link group-hover:underline">
              Hier geht&apos;s zur Mathe-Prüfungsvorbereitung
            </b>
            .
          </Link>
        ) : null}
        <section className="mx-auto mt-10 max-w-3xl text-center sm:mt-12 sm:text-left">
          <h2 className="mb-2 text-lg font-bold text-almost-black">
            Durchsuche den Bereich {data.title}
          </h2>
          <Quickbar
            subject={data.title}
            className="mx-auto max-w-sm sm:-ml-1 sm:px-0 md:max-w-2xl md:pr-4"
          />
        </section>
        <section className="themen text-center">
          <p className="mb-12 mt-4 text-3xl font-extrabold tracking-tight">
            <span>Was darf&apos;s denn heute sein?</span>
          </p>
          <SubjectLandingTopicOverview subterms={subterms} subject={subject} />
        </section>
        <section className="mb-8 mt-20 text-center">
          <h2
            className={cn(`
              mx-auto mt-3 max-w-2xl
              pb-10 text-3xl font-extrabold tracking-tight
            `)}
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
      `}</style>
    </>
  )

  function renderIcon() {
    return (
      <>
        <div className="landing-subjects group mx-auto mt-2 sm:-mt-3">
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
