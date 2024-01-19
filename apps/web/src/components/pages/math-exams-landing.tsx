import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useMemo, useState } from 'react'

import { Link } from '../content/link'
import { FaIcon } from '../fa-icon'
import { HeadTags } from '../head-tags'
import { FooterNew } from '../landing/rework/footer-new'
import { SubjectIcon } from '../landing/rework/subject-icon'
import { SubjectLandingFeatured } from '../landing/subjects/subject-landing-featured'
import { Header } from '../navigation/header/header'
import { Quickbar, QuickbarData, quickbarUrl } from '../navigation/quickbar'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance, TaxonomyTermType } from '@/fetcher/graphql-types/operations'
import { breakpoints } from '@/helper/breakpoints'
import { cn } from '@/helper/cn'
import { serloDomain } from '@/helper/urls/serlo-domain'

export function MathExamsLanding() {
  const [quickbarData, setQuickbarData] = useState<QuickbarData | undefined>(
    undefined
  )

  useEffect(() => {
    if (!quickbarData) {
      fetchQuickbarData()
        .then((fetchedData) => fetchedData && setQuickbarData(fetchedData))
        // eslint-disable-next-line no-console
        .catch(console.error)
    }
  }, [quickbarData])

  const hotExamTaxonomies = useMemo(() => {
    return mathExamTaxonomies
      .map(({ id }) => {
        return quickbarData?.find((entry) => entry.id === String(id))
      })
      .filter(Boolean)
      .sort((a, b) => b!.count - a!.count)
      .slice(0, 6)
      .map((entry) => {
        return {
          title: entry!.title,
          type: TaxonomyTermType.Topic,
          url: `/${entry!.id}`,
          img: '',
        }
      })
  }, [quickbarData])

  const { lang } = useInstanceData()
  if (lang !== Instance.De) return null

  return (
    <>
      <HeadTags
        data={{
          title: `Mathe Abschlussprüfungen – lernen mit serlo!`,
          metaImage: `https://de.${serloDomain}/_assets/img/meta/mathe.png`,
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
                Mathe Prüfungen
              </span>
            </h1>
            <p className="text-2xl leading-cozy text-almost-black">
              Hier findest du <b>Übungsaufgaben</b>, <b>Lösungen</b> und{' '}
              <b>Erklärungen</b> für Deine Prüfungen.
              <br />
              <br />
              Du packst das! 🙌
            </p>
          </div>
          {renderIcon()}
        </section>

        <section className="mx-auto mt-10 max-w-3xl text-center sm:mt-16 sm:text-left">
          <h2 className="mb-2 text-lg font-bold text-almost-black">
            Finde deine Prüfungen
          </h2>

          <Quickbar
            subject="mathe"
            className="max-w-sm sm:-ml-1 sm:px-0 md:max-w-2xl md:pr-4"
            customData={quickbarData}
          />
        </section>

        {/* Hier vielleicht eher eine Tabelle? */}
        {/* <section className="themen text-center">
          <p className="mb-12 mt-4 text-3xl font-extrabold tracking-tight">
            <span>Was kommt als nächstes dran?</span>
          </p>
          <SubjectLandingTopicOverview subterms={subterms} subject={subject} />
        </section> */}

        {/* Evtl. Link zum Lerntipps bereich + Discord */}

        <section className="mb-8 mt-20 text-center">
          <h2
            className={cn(`
              mx-auto mt-3 max-w-2xl
              pb-10 text-3xl font-extrabold tracking-tight
            `)}
          >
            <span className="pb-2">Beliebte Inhalte</span>
          </h2>

          {/* make custom version with school type instead of entity type */}
          <SubjectLandingFeatured
            subject="mathe"
            customContent={hotExamTaxonomies}
          />
        </section>

        <section className="bg-blueWave bg-100% pt-24 text-center">
          <p className="mx-auto max-w-xl text-xl leading-cozy text-almost-black">
            Wenn Aufgaben zu Deinem Bundesland oder Deiner Schulform fehlen,
            schreib uns einfach über{' '}
            <a className="serlo-link" href="mailto:de@serlo.org">
              de@serlo.org <FaIcon icon={faEnvelope} />
            </a>{' '}
            oder erstelle als Teil unserer{' '}
            <Link href="/community">Autor*innencommunity</Link> eigenständig
            Aufgaben mit Lösungen.
          </p>

          {/* Banner für Autor*innengewinnung? */}
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
        <div className="landing-subjects group mx-auto -mt-3">
          <SubjectIcon subject="mathe" />
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

const mathExamTaxonomies = [
  {
    id: 220418,
    title: 'Jahrgangsstufentest Mathematik',
  },
  {
    id: 75678,
    title: 'Quali Abschlussprüfungen mit Lösung',
  },
  {
    id: 247427,
    title: 'Mittlerer Schulabschluss an der Mittelschule',
  },
  {
    id: 219731,
    title: 'Jahrgangsstufentest ',
  },
  {
    id: 220404,
    title: 'Grundwissenstest 7. Klasse',
  },
  {
    id: 220648,
    title: 'Jahrgangsstufentest 8. Klasse',
  },
  {
    id: 220649,
    title: 'Jahrgangsstufentest 8. Klasse',
  },
  {
    id: 220680,
    title: 'Grundwissentest 9. Klasse',
  },
  {
    id: 220681,
    title: 'Grundwissentest 9. Klasse',
  },
  {
    id: 75049,
    title: 'Abschlussprüfungen mit Lösung, Zweig I',
  },
  {
    id: 76750,
    title: 'Abschlussprüfungen mit Lösungen, Zweig II und III',
  },
  {
    id: 219775,
    title: 'Jahrgangsstufentest 8. Klasse - BMT 8',
  },
  {
    id: 219737,
    title: 'Jahrgangsstufentest 10. Klasse - BMT 10',
  },
  {
    id: 20852,
    title: 'Abiturprüfungen mit Lösung',
  },
  {
    id: 91252,
    title: 'Fachhochschulreife',
  },
  {
    id: 91253,
    title: 'Fachgebundene Hochschulreife',
  },
]

async function fetchQuickbarData() {
  const req = await fetch(quickbarUrl)
  const data = (await req.json()) as QuickbarData

  data.forEach((entry) => {
    entry.pathLower = entry.path.map((x) => x.toLowerCase())
    entry.titleLower = entry.title.toLowerCase()
  })

  const filteredData = data.filter((entry) => {
    // not math
    if (!entry.root?.toLowerCase().startsWith('mathe')) return false

    if (mathExamTaxonomies.some((tax) => String(tax.id) === entry.id)) {
      return true
    }
    // check pathLower array against taxonomy array titles
    return entry.pathLower.some((pathTitle) =>
      mathExamTaxonomies.some((tax) => tax.title.toLowerCase() === pathTitle)
    )
  })

  return filteredData
}
